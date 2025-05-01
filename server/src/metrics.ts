import { register, Counter, Gauge, Histogram } from 'prom-client';

// Create a registry to hold metrics
const registry = register;

// Define metrics
const httpRequestDuration = new Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.1, 0.5, 1, 2, 5]
});

const activeUsers = new Gauge({
  name: 'active_users',
  help: 'Number of active users in the system',
  collect() {
    // This will be updated by the metrics endpoint
    this.set(0);
  }
});

const tasksByStatus = new Gauge({
  name: 'tasks_by_status',
  help: 'Number of tasks by status',
  labelNames: ['status'],
  collect() {
    // This will be updated by the metrics endpoint
    this.set({ status: 'todo' }, 0);
    this.set({ status: 'in-progress' }, 0);
    this.set({ status: 'done' }, 0);
  }
});

const projectsCount = new Gauge({
  name: 'projects_count',
  help: 'Total number of projects',
  collect() {
    // This will be updated by the metrics endpoint
    this.set(0);
  }
});

const teamsCount = new Gauge({
  name: 'teams_count',
  help: 'Total number of teams',
  collect() {
    // This will be updated by the metrics endpoint
    this.set(0);
  }
});

// Export metrics and registry
export {
  registry,
  httpRequestDuration,
  activeUsers,
  tasksByStatus,
  projectsCount,
  teamsCount
}; 