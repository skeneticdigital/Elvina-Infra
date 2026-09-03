const fs = require('fs');

const REPO = 'skeneticdigital/ElvinaInfra';
const TOKEN = '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';
const BRANCH = 'main';

const filesToStage = [
  'components/ProjectShowcase.tsx',
  'components/Footer.tsx',
  'components/FloatingContact.tsx',
  'components/Navbar.tsx',
  'components/ConstructionSequence.tsx',
  'app/api/inquiries/route.ts',
  'app/contact/page.tsx',
  'app/admin/page.tsx',
  'app/page.tsx',
  'next.config.mjs',
  'public/hero-video.mp4'
];

async function api(path, method = 'GET', body = null) {
  const url = `https://api.github.com/repos/${REPO}/${path}`;
  const options = {
    method,
    headers: {
      'Authorization': `token ${TOKEN}`,
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'NodeJS-Script'
    }
  };
  if (body) {
    options.body = JSON.stringify(body);
  }
  const res = await fetch(url, options);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API Error ${res.status}: ${text}`);
  }
  return res.json();
}

async function push() {
  console.log('Fetching main branch ref...');
  const refData = await api(`git/refs/heads/${BRANCH}`);
  const latestCommitSha = refData.object.sha;

  console.log('Fetching latest commit tree...');
  const commitData = await api(`git/commits/${latestCommitSha}`);
  const baseTreeSha = commitData.tree.sha;

  console.log('Creating blobs for changed files...');
  const tree = [];
  for (const filePath of filesToStage) {
    try {
      const isBinary = filePath.endsWith('.mp4');
      const content = fs.readFileSync(filePath, isBinary ? 'base64' : 'utf8');
      
      const blobData = await api('git/blobs', 'POST', {
        content: content,
        encoding: isBinary ? 'base64' : 'utf-8'
      });
      tree.push({
        path: filePath,
        mode: '100644',
        type: 'blob',
        sha: blobData.sha
      });
      console.log(`Uploaded ${filePath}`);
    } catch(e) {
      console.log(`Skipped ${filePath}: ${e.message}`);
    }
  }

  // To trigger Vercel natively via GitHub, we should push this commit as usual.
  console.log('Creating new tree...');
  const newTreeData = await api('git/trees', 'POST', {
    base_tree: baseTreeSha,
    tree: tree
  });
  const newTreeSha = newTreeData.sha;

  console.log('Creating commit...');
  const newCommitData = await api('git/commits', 'POST', {
    message: 'fix: add missing page.tsx to display ProjectShowcase',
    tree: newTreeSha,
    parents: [latestCommitSha]
  });
  const newCommitSha = newCommitData.sha;

  console.log('Updating branch reference...');
  await api(`git/refs/heads/${BRANCH}`, 'PATCH', {
    sha: newCommitSha
  });

  console.log('Successfully pushed to GitHub!');
}

push().catch(console.error);
