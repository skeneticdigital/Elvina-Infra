const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'ezgif-5d4056b622e73fa6-jpg');
const destDir = path.join(__dirname, '..', 'public', 'images', 'building');

// Clean and recreate destination
if (fs.existsSync(destDir)) {
  fs.rmSync(destDir, { recursive: true, force: true });
}
fs.mkdirSync(destDir, { recursive: true });

const files = fs.readdirSync(srcDir)
  .filter(f => f.toLowerCase().endsWith('.jpg'))
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));

console.log(`Copying exactly ${files.length} frames (1.jpg to ${files.length}.jpg)...`);

files.forEach((file, index) => {
  const src = path.join(srcDir, file);
  const dest = path.join(destDir, `${index + 1}.jpg`);
  fs.copyFileSync(src, dest);
});

console.log(`Done! Exactly ${files.length} frames copied into public/images/building/`);
