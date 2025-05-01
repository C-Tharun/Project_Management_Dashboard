import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";
const prisma = new PrismaClient();

async function deleteAllData(orderedFileNames: string[]) {
  const modelNames = orderedFileNames.map((fileName) => {
    const modelName = path.basename(fileName, path.extname(fileName));
    return modelName.charAt(0).toUpperCase() + modelName.slice(1);
  });

  for (const modelName of modelNames) {
    const model: any = prisma[modelName as keyof typeof prisma];
    try {
      await model.deleteMany({});
      console.log(`Cleared data from ${modelName}`);
    } catch (error) {
      console.error(`Error clearing data from ${modelName}:`, error);
    }
  }
}

async function main() {
  const dataDirectory = path.join(__dirname, "seedData");

  const orderedFileNames = [
    "team.json",
    "project.json",
    "projectTeam.json",
    "user.json",
    "task.json",
    "attachment.json",
    "comment.json",
    "taskAssignment.json",
  ];

  await deleteAllData(orderedFileNames);

  for (const fileName of orderedFileNames) {
    const filePath = path.join(dataDirectory, fileName);
    const jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    const modelName = path.basename(fileName, path.extname(fileName));
    const model: any = prisma[modelName as keyof typeof prisma];

    try {
      for (const data of jsonData) {
        await model.create({ data });
      }
      console.log(`Seeded ${modelName} with data from ${fileName}`);
    } catch (error) {
      console.error(`Error seeding data for ${modelName}:`, error);
    }
  }

  // Create a user
  const user = await prisma.user.create({
    data: {
      email: 'test@example.com',
      name: 'Test User',
      password: 'password123', // In a real app, this would be hashed
    },
  });

  // Create a team
  const team = await prisma.team.create({
    data: {
      name: 'Development Team',
      description: 'Main development team',
      members: {
        create: {
          userId: user.id,
          role: 'DEVELOPER',
        },
      },
    },
  });

  // Create a project
  const project = await prisma.project.create({
    data: {
      name: 'Project Management System',
      description: 'A system to manage projects and tasks',
      teamId: team.id,
    },
  });

  // Create tasks with different statuses
  await prisma.task.createMany({
    data: [
      {
        title: 'Implement user authentication',
        description: 'Add login and registration functionality',
        status: 'todo',
        projectId: project.id,
        assignedToId: user.id,
      },
      {
        title: 'Create project dashboard',
        description: 'Design and implement the main dashboard',
        status: 'in-progress',
        projectId: project.id,
        assignedToId: user.id,
      },
      {
        title: 'Set up database',
        description: 'Configure database and initial schema',
        status: 'done',
        projectId: project.id,
        assignedToId: user.id,
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });