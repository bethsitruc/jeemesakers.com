#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const DIST_DIR = path.join(ROOT, 'dist');
const POSTS_DIR = path.join(ROOT, 'src', 'posts');
const INDEX_PATH = path.join(DIST_DIR, 'index.html');

const staticRoutes = [
  'about',
  'artwork',
  'books',
  'contact',
  'testimonials',
  'writings',
];

function writeRoutePage(route, html) {
  const routeDir = path.join(DIST_DIR, ...route.split('/'));
  fs.mkdirSync(routeDir, { recursive: true });
  fs.writeFileSync(path.join(routeDir, 'index.html'), html);
}

if (!fs.existsSync(INDEX_PATH)) {
  throw new Error(`Missing Vite build output: ${INDEX_PATH}`);
}

const html = fs.readFileSync(INDEX_PATH, 'utf8');
const postRoutes = fs
  .readdirSync(POSTS_DIR)
  .filter((filename) => filename.endsWith('.mdx'))
  .map((filename) => `posts/${path.basename(filename, '.mdx')}`);

const routes = [...staticRoutes, ...postRoutes];
routes.forEach((route) => writeRoutePage(route, html));

console.log(`Generated ${routes.length} direct route pages.`);
