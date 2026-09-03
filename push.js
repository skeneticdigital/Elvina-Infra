const fs = require('fs');
const path = require('path');
const git = require('isomorphic-git');
const http = require('isomorphic-git/http/node');

const dir = process.cwd();

async function main() {
  console.log('Initializing git...');
  try {
    await git.init({ fs, dir });
  } catch (e) {
    console.log('Git already initialized or error:', e);
  }

  console.log('Adding files...');
  // We need to add all files manually since isomorphic-git doesn't have an exact `git add .` that works well in one line for everything sometimes
  // Actually, we can use git.add with filepath: '.' but we need to list them or let it process.
  
  // Let's get the list of all files in the directory recursively (ignoring node_modules and .next)
  async function getFiles(dirPath, filesList = []) {
    const files = fs.readdirSync(dirPath);
    for (const file of files) {
      const fullPath = path.join(dirPath, file);
      if (fs.statSync(fullPath).isDirectory()) {
        if (file !== 'node_modules' && file !== '.next' && file !== '.git') {
          await getFiles(fullPath, filesList);
        }
      } else {
        if (file !== 'push.js') {
          filesList.push(fullPath);
        }
      }
    }
    return filesList;
  }

  const allFiles = await getFiles(dir);
  for (const file of allFiles) {
    const relPath = path.relative(dir, file).replace(/\\/g, '/');
    try {
      await git.add({ fs, dir, filepath: relPath });
    } catch(e) {}
  }

  console.log('Committing...');
  await git.commit({
    fs,
    dir,
    author: {
      name: 'GitHub User',
      email: 'user@github.com',
    },
    message: 'feat: update Elvina Infra UI'
  });

  console.log('Adding remote...');
  try {
    await git.addRemote({
      fs,
      dir,
      remote: 'origin',
      url: 'https://github.com/skeneticdigital/ElvinaInfra.git'
    });
  } catch (e) {}

  console.log('Pushing to GitHub...');
  // await git.branch({ fs, dir, ref: 'main' });
  let pushResult = await git.push({
    fs,
    http,
    dir,
    remote: 'origin',
    ref: 'main',
    onAuth: () => ({ username: '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' }),
    force: true // just in case
  });

  console.log('Push successful:', pushResult);
}

main().catch(console.error);
