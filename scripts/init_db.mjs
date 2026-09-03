import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function initDb() {
  console.log('Connecting to TiDB...');
  
  try {
    const connection = await mysql.createConnection({
      host: process.env.TIDB_HOST,
      port: parseInt(process.env.TIDB_PORT || '4000', 10),
      user: process.env.TIDB_USER,
      password: process.env.TIDB_PASSWORD,
      database: process.env.TIDB_DATABASE,
      ssl: {
        minVersion: 'TLSv1.2',
        rejectUnauthorized: true,
      }
    });

    console.log('Connected. Creating tables if not exist...');

    // Projects table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS projects (
        id VARCHAR(255) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        category VARCHAR(100) NOT NULL,
        status VARCHAR(50) NOT NULL,
        location VARCHAR(255),
        image TEXT,
        featured BOOLEAN DEFAULT false
      )
    `);
    console.log('Created projects table.');

    // Inquiries table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS inquiries (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        projectType VARCHAR(100),
        message TEXT NOT NULL,
        status VARCHAR(50) DEFAULT 'New',
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Created inquiries table.');

    // FAQs table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS faqs (
        id VARCHAR(255) PRIMARY KEY,
        question TEXT NOT NULL,
        answer TEXT NOT NULL
      )
    `);
    console.log('Created faqs table.');

    console.log('Database initialization complete.');
    await connection.end();
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
}

initDb();
