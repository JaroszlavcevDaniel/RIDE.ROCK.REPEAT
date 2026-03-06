import 'zone.js/node';
import { join } from 'path';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { renderModule } from '@angular/platform-server';
import AppServerModule from '../src/main.server';

const articlesJsonPath = join(process.cwd(), 'src/assets/cikkek.json');
const articles = JSON.parse(readFileSync(articlesJsonPath, 'utf-8'));

const routes = ['/', ...articles.map((a: any) => `/${a.slug}`)];
const distFolder = join(process.cwd(), 'dist/riderockrepeat/browser');

async function prerender() {
  for (const route of routes) {
    const html = await renderModule(AppServerModule, {
      document: readFileSync(join(distFolder, 'index.html')).toString(),
      url: route,
    });

    let filePath = route === '/' 
      ? join(distFolder, 'index.html') 
      : join(distFolder, route.slice(1), 'index.html');

    const folder = filePath.replace(/\/index\.html$/, '');
    if (!existsSync(folder)) mkdirSync(folder, { recursive: true });

    writeFileSync(filePath, html);
    console.log(`Prerendered: ${route}`);
  }
  console.log('✅ Prerender kész.');
}

prerender().catch(err => {
  console.error(err);
  process.exit(1);
});