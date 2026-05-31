const fs = require('fs');
const path = require('path');

const projectDir = path.resolve(__dirname, '..');
const productsFilePath = path.join(projectDir, 'data', 'all-products.json');
const sitemapFilePath = path.join(projectDir, 'sitemap.xml');

// 1. Read products
let products = [];
try {
  const data = fs.readFileSync(productsFilePath, 'utf8');
  products = JSON.parse(data);
} catch (e) {
  console.error("Failed to read products json:", e);
}

// 2. Generate sitemap.xml
const staticUrls = [
  { loc: 'https://www.chchandloom.in/', lastmod: '2026-05-10', changefreq: 'daily', priority: '1.0' },
  { loc: 'https://www.chchandloom.in/our-story.html', lastmod: '2026-05-10', changefreq: 'monthly', priority: '0.9' },
  { loc: 'https://www.chchandloom.in/lookbook.html', lastmod: '2026-05-10', changefreq: 'weekly', priority: '0.9' },
  { loc: 'https://www.chchandloom.in/bedsheetscollections.html', lastmod: '2026-05-10', changefreq: 'weekly', priority: '0.8' },
  { loc: 'https://www.chchandloom.in/curtaincollections.html', lastmod: '2026-05-10', changefreq: 'weekly', priority: '0.8' },
  { loc: 'https://www.chchandloom.in/blanketscollection.html', lastmod: '2026-05-12', changefreq: 'weekly', priority: '0.8' },
  { loc: 'https://www.chchandloom.in/comforterscollection.html', lastmod: '2026-05-12', changefreq: 'weekly', priority: '0.8' },
  { loc: 'https://www.chchandloom.in/cotton-guide.html', lastmod: '2026-05-10', changefreq: 'monthly', priority: '0.7' },
  { loc: 'https://www.chchandloom.in/handloom-process.html', lastmod: '2026-05-10', changefreq: 'monthly', priority: '0.7' },
  { loc: 'https://www.chchandloom.in/fabric-care.html', lastmod: '2026-05-10', changefreq: 'monthly', priority: '0.7' }
];

let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

staticUrls.forEach(url => {
  xml += '  <url>\n';
  xml += `    <loc>${url.loc}</loc>\n`;
  xml += `    <lastmod>${url.lastmod}</lastmod>\n`;
  xml += `    <changefreq>${url.changefreq}</changefreq>\n`;
  xml += `    <priority>${url.priority}</priority>\n`;
  xml += '  </url>\n';
});

xml += '  <!-- Dynamic Product Pages -->\n';
products.forEach(p => {
  if (p.slug) {
    const lastmod = p.createdAt ? p.createdAt.split('T')[0] : '2026-05-31';
    xml += '  <url>\n';
    xml += `    <loc>https://www.chchandloom.in/product.html?slug=${p.slug}</loc>\n`;
    xml += `    <lastmod>${lastmod}</lastmod>\n`;
    xml += '    <changefreq>weekly</changefreq>\n';
    xml += '    <priority>0.8</priority>\n';
    xml += '  </url>\n';
  }
});

xml += '</urlset>\n';

fs.writeFileSync(sitemapFilePath, xml, 'utf8');
console.log('✅ Re-generated sitemap.xml');

// 3. Inject noscript blocks to collection files
const collections = [
  { file: 'bedsheetscollections.html', category: 'bedsheets' },
  { file: 'curtaincollections.html', category: 'curtains' },
  { file: 'blanketscollection.html', category: 'blankets' },
  { file: 'comforterscollection.html', category: 'comforters' }
];

collections.forEach(col => {
  const colPath = path.join(projectDir, col.file);
  if (!fs.existsSync(colPath)) return;

  let content = fs.readFileSync(colPath, 'utf8');

  // Filter products for this category
  const catProducts = products.filter(p => p.category && p.category.toLowerCase().trim() === col.category);

  let noscriptContent = '<!-- SEO_NOSCRIPT_START -->\n    <noscript>\n        <div class="static-products-seo-links" style="display: none;">\n';
  noscriptContent += '            <h3>Our Collection Products</h3>\n            <ul>\n';
  catProducts.forEach(p => {
    noscriptContent += `                <li><a href="product.html?slug=${p.slug}">${p.title}</a></li>\n`;
  });
  noscriptContent += '            </ul>\n        </div>\n    </noscript>\n    <!-- SEO_NOSCRIPT_END -->';

  // Check if placeholder comments exist in the HTML
  if (content.includes('<!-- SEO_NOSCRIPT_START -->')) {
    // Replace existing block
    const regex = /<!-- SEO_NOSCRIPT_START -->[\s\S]*?<!-- SEO_NOSCRIPT_END -->/;
    content = content.replace(regex, noscriptContent);
  } else {
    // Insert inside productsGrid if comments do not exist
    const gridRegex = /(<div[^>]*?id="productsGrid"[^>]*?>)/i;
    if (gridRegex.test(content)) {
      content = content.replace(gridRegex, `$1\n    ${noscriptContent}`);
    } else {
      console.warn(`Could not find productsGrid ID in ${col.file}`);
    }
  }

  fs.writeFileSync(colPath, content, 'utf8');
  console.log(`✅ Injected noscript fallback links into ${col.file} (${catProducts.length} products)`);
});
