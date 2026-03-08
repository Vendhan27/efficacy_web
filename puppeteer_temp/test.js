const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.toString()));

  console.log('Navigating to http://localhost:5174...');
  try {
    await page.goto('http://localhost:5174/', { waitUntil: 'networkidle2' });
    console.log('Page loaded.');
    
    console.log('Clicking About link...');
    await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('a'));
      const aboutLink = links.find(a => a.href.includes('/about') && !a.className.includes('hero-btn'));
      if (aboutLink) aboutLink.click();
    });
    
    await new Promise(r => setTimeout(r, 2000));
    console.log('Current URL after click:', page.url());
    
    console.log('Clicking Events link...');
    await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('a'));
      const eventLink = links.find(a => a.href.includes('/events') && !a.className.includes('hero-btn'));
      if (eventLink) eventLink.click();
    });
    
    await new Promise(r => setTimeout(r, 2000));
    console.log('Current URL after click:', page.url());
  } catch (err) {
    console.error('Error during test:', err);
  } finally {
    await browser.close();
  }
})();
