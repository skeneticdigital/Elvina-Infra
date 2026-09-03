const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
  // Migrate Projects
  try {
    const projectsPath = path.join(__dirname, 'projects.json');
    if (fs.existsSync(projectsPath)) {
      const projects = JSON.parse(fs.readFileSync(projectsPath, 'utf8'));
      console.log(`Found ${projects.length} projects to migrate...`);
      for (const p of projects) {
        await prisma.project.create({
          data: {
            title: p.title,
            category: p.category,
            status: p.status,
            location: p.location,
            image: p.image || '',
            featured: p.featured || false,
          }
        });
      }
      console.log('Projects migrated.');
    }
  } catch (e) {
    console.error('Error migrating projects:', e);
  }

  // Migrate FAQs
  try {
    const faqsPath = path.join(__dirname, 'chatbot_faqs.json');
    if (fs.existsSync(faqsPath)) {
      const faqs = JSON.parse(fs.readFileSync(faqsPath, 'utf8'));
      console.log(`Found ${faqs.length} FAQs to migrate...`);
      for (const f of faqs) {
        await prisma.faq.create({
          data: {
            question: f.question,
            answer: f.answer,
          }
        });
      }
      console.log('FAQs migrated.');
    }
  } catch (e) {
    console.error('Error migrating FAQs:', e);
  }

  console.log('Migration complete!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
