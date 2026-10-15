import fs from 'fs';
import path from 'path';

const userUploadedDir = 'C:\\Users\\panda\\.gemini\\antigravity-ide\\brain\\c6c50bc1-56a5-4554-9f35-343d71d7208b\\.user_uploaded';
const targetDir = path.resolve('public', 'images');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const filesToCopy = [
  { src: 'media_1791959762943.jpg', dest: 'dr-ishwar-chandra-behera.jpg' },
  { src: 'media_1791952901629.png', dest: 'dr-ishwar-formal.png' },
  { src: 'media_1791959808457.png', dest: 'clinic-features.png' },
];

for (const item of filesToCopy) {
  const srcPath = path.join(userUploadedDir, item.src);
  const destPath = path.join(targetDir, item.dest);
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${item.src} to ${item.dest}`);
  } else {
    console.warn(`File not found: ${srcPath}`);
  }
}
