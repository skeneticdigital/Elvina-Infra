import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const prisma = new PrismaClient();

async function main() {
  console.log('Creating tables using Prisma...');
  try {
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS Project (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        category VARCHAR(100) NOT NULL,
        status VARCHAR(50) NOT NULL,
        location VARCHAR(255) NOT NULL,
        image TEXT NOT NULL,
        featured BOOLEAN DEFAULT false,
        createdAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
        updatedAt DATETIME(3) NOT NULL
      )
    `);
    console.log('Project table created.');

    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS Inquiry (
        id VARCHAR(191) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        projectType VARCHAR(100),
        message TEXT NOT NULL,
        status VARCHAR(50) NOT NULL DEFAULT 'Unread',
        timestamp DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
      )
    `);
    console.log('Inquiry table created.');

    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS Faq (
        id INT AUTO_INCREMENT PRIMARY KEY,
        question VARCHAR(255) NOT NULL,
        answer TEXT NOT NULL,
        createdAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
        updatedAt DATETIME(3) NOT NULL
      )
    `);
    console.log('Faq table created.');

    console.log('All tables created successfully.');
  } catch (error) {
    console.error('Error creating tables:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
