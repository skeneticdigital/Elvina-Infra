const fs = require('fs');
const path = require('path');
const git = require('isomorphic-git');
const http = require('isomorphic-git/http/node');

const dir = process.cwd();

async function main() {
  console.log('Adding specific files...');
  const filesToStage = [
    'components/ProjectShowcase.tsx',
    'components/Footer.tsx',
    'components/FloatingContact.tsx',
    'app/api/inquiries/route.ts',
    'app/contact/page.tsx',
    'app/admin/page.tsx'
  ];

  for (const file of filesToStage) {
    try {
      await git.add({ fs, dir, filepath: file });
      console.log(`Staged ${file}`);
    } catch(e) {
      console.log(`Failed to stage ${file}`, e);
    }
  }

  console.log('Committing...');
  await git.commit({
    fs,
    dir,
    author: {
      name: 'GitHub User',
      email: 'user@github.com',
    },
    message: 'feat: add admin portal, contact api, and ui updates'
  });

  console.log('Pushing to GitHub...');
  let pushResult = await git.push({
    fs,
    http,
    dir,
    remote: 'origin',
    ref: 'main',
    onAuth: () => ({ username: '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' }),
    force: true
  });

  console.log('Push successful:', pushResult);
}

main().catch(console.error);
