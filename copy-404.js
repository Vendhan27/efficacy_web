/* global process */
import fs from 'fs';
import path from 'path';

const src = path.resolve('dist', 'index.html');
const dest = path.resolve('dist', '404.html');

try {
  fs.copyFileSync(src, dest);
  console.log('Successfully copied dist/index.html to dist/404.html for SPA routing fallback');
} catch (err) {
  console.error('Error copying 404.html:', err.message);
  process.exit(1);
}
