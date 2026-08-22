const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'ezgif-5d4056b622e73fa6-jpg');
const destDir = path.join(__dirname, '..', 'public', 'images', 'building');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const files = fs.readdirSync(srcDir)
  .filter(f => f.toLowerCase().endsWith('.jpg'))
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));

console.log(`Found ${files.length} source files`);

const TARGET_FRAMES = 180;

for (let i = 1; i <= TARGET_FRAMES; i++) {
  const ratio = (i - 1) / (TARGET_FRAMES - 1);
  const srcIndex = Math.min(Math.floor(ratio * files.length), files.length - 1);
  const srcFile = path.join(srcDir, files[srcIndex]);
  const destFile = path.join(destDir, `${i}.jpg`);
  fs.copyFileSync(srcFile, destFile);
}

console.log(`Successfully mapped and copied ${TARGET_FRAMES} frames into public/images/building/`);
