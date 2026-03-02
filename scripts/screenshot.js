import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

(async () => {
  const url = 'https://products-showcase-c4a87.web.app/login';
  const outDir = path.resolve(__dirname, '..', 'screenshots');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  const outFile = path.join(outDir, 'login.png');

  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 900 });
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
    // Esperar un momento para que animaciones / recursos terminen
    await new Promise((res) => setTimeout(res, 1000));
    // Tomar captura del formulario; si la página es más larga, usar fullPage: true
    await page.screenshot({ path: outFile, fullPage: false });
    console.log('Screenshot saved to', outFile);
  } catch (err) {
    console.error('Screenshot failed:', err);
    process.exitCode = 2;
  } finally {
    await browser.close();
  }
})();
