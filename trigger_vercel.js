const REPO = 'skeneticdigital/ElvinaInfra';
const TOKEN = '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';
const BRANCH = 'main';

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

async function triggerWebhook() {
  console.log('Fetching README.md to get its SHA...');
  let fileSha;
  let content = '';
  try {
    const data = await api('contents/README.md?ref=' + BRANCH);
    fileSha = data.sha;
    content = Buffer.from(data.content, 'base64').toString('utf8');
  } catch (e) {
    console.log('README.md not found, creating one...');
  }

  // Append a hidden character or just a space to trigger a change
  content += ' ';
  
  console.log('Pushing update to README.md to trigger Vercel webhook...');
  await api('contents/README.md', 'PUT', {
    message: 'chore: trigger vercel deployment',
    content: Buffer.from(content).toString('base64'),
    sha: fileSha,
    branch: BRANCH
  });

  console.log('Webhook triggered successfully!');
}

triggerWebhook().catch(console.error);
