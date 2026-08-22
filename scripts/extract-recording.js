const { execSync } = require('child_process');
const ffmpegPath = require('ffmpeg-static');
const path = require('path');
const fs = require('fs');

const videoPath = path.join(__dirname, '..', 'public', 'images', 'Recording 2026-08-19 222545.mp4');
const outDir = path.join(__dirname, '..', 'public', 'images', 'recording-frames');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

console.log('Extracting frames using ffmpeg:', ffmpegPath);
// Extract 1 frame every second
execSync(`"${ffmpegPath}" -i "${videoPath}" -vf fps=1 "${path.join(outDir, 'frame_%03d.jpg')}" -y`);
console.log('Extracted frames successfully!');
