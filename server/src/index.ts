import express, { Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import client from 'prom-client'; // Import the Prometheus client
import { PrismaClient } from '@prisma/client';
import { 
  registry, 
  httpRequestDuration, 
  activeUsers, 
  tasksByStatus, 
  projectsCount, 
  teamsCount 
} from './metrics';

/* ROUTE IMPORTS */
import projectRoutes from "./routes/projectRoutes";
import taskRoutes from "./routes/taskRoutes";
import searchRoutes from "./routes/searchRoutes";
import userRoutes from "./routes/userRoutes";
import teamRoutes from "./routes/teamRoutes";

/* CONFIGURATIONS */
dotenv.config();
const app = express();
const prisma = new PrismaClient();
const port = 8000; // Changed from 80 to 8000

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Initialize metrics with default values
activeUsers.set(0);
projectsCount.set(0);
teamsCount.set(0);
tasksByStatus.set({ status: 'todo' }, 0);
tasksByStatus.set({ status: 'in-progress' }, 0);
tasksByStatus.set({ status: 'done' }, 0);

/* Prometheus Metrics Setup */
const register = new client.Registry(); // Create a Registry to register the metrics

// Create a counter metric
const httpRequestCounter = new client.Counter({
    name: 'http_requests_total',
    help: 'Total number of HTTP requests',
    labelNames: ['method', 'route'],
});

// Register the counter
register.registerMetric(httpRequestCounter);

// Middleware to count requests
app.use((req, res, next) => {
    httpRequestCounter.inc({ method: req.method, route: req.url });
    next();
});

// Metrics endpoint
app.get('/metrics', async (req, res) => {
  try {
    // Update metrics with real data
    const users = await prisma.user.count();
    activeUsers.set(users);

    const projects = await prisma.project.count();
    projectsCount.set(projects);

    const teams = await prisma.team.count();
    teamsCount.set(teams);

    const tasks = await prisma.task.groupBy({
      by: ['status'],
      _count: true
    });

    // Reset all task status counts
    tasksByStatus.reset();
    
    // Set new counts
    tasks.forEach(task => {
      tasksByStatus.set({ status: task.status || 'unknown' }, task._count);
    });

    // Set default values for missing statuses
    const statuses = ['todo', 'in-progress', 'done'];
    statuses.forEach(status => {
      if (!tasks.find(t => t.status === status)) {
        tasksByStatus.set({ status }, 0);
      }
    });

    res.set('Content-Type', registry.contentType);
    res.end(await registry.metrics());
  } catch (error) {
    console.error('Error collecting metrics:', error);
    res.status(500).end();
  }
});

// Request duration middleware
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = (Date.now() - start) / 1000;
    httpRequestDuration
      .labels(req.method, req.route?.path || req.path, res.statusCode.toString())
      .observe(duration);
  });
  next();
});

/* ROUTES */
app.get("/", (req, res) => {
  res.send("This is home route");
});

app.use("/projects", projectRoutes);
app.use("/tasks", taskRoutes);
app.use("/search", searchRoutes);
app.use("/users", userRoutes);
app.use("/teams", teamRoutes);

// Start server
app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});