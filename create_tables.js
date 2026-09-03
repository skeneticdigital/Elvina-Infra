const mysql = require('mysql2/promise');

async function main() {
  const connection = await mysql.createConnection({
    host: 'gateway01.ap-southeast-1.prod.aws.tidbcloud.com',
    port: 4000,
    user: '3BGK8YW7gsrXeJm.root',
    password: 'N2hUBMniegdhaqVc',
    database: 'test',
    ssl: {
      rejectUnauthorized: true
    }
  });

  console.log('Connected to TiDB!');

  await connection.execute(`
    CREATE TABLE IF NOT EXISTS Project (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      category VARCHAR(255) NOT NULL,
      status VARCHAR(255) NOT NULL,
      location VARCHAR(255) NOT NULL,
      image TEXT NOT NULL,
      featured BOOLEAN NOT NULL DEFAULT false,
      createdAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
      updatedAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)
    )
  `);
  console.log('Created Project table');

  await connection.execute(`
    CREATE TABLE IF NOT EXISTS Inquiry (
      id VARCHAR(191) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      phone VARCHAR(255),
      projectType VARCHAR(255),
      message TEXT NOT NULL,
      status VARCHAR(255) NOT NULL DEFAULT 'Unread',
      timestamp DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
    )
  `);
  console.log('Created Inquiry table');

  await connection.execute(`
    CREATE TABLE IF NOT EXISTS Faq (
      id INT AUTO_INCREMENT PRIMARY KEY,
      question VARCHAR(255) NOT NULL,
      answer TEXT NOT NULL,
      createdAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
      updatedAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)
    )
  `);
  console.log('Created Faq table');

  await connection.end();
}

main().catch(console.error);
