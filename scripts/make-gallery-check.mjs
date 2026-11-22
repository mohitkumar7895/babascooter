import fs from 'fs';

const data = JSON.parse(fs.readFileSync('img_report.json', 'utf8'));
let html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Image Sets Overview</title>
<style>
body { background: #0b0f19; color: #fff; font-family: sans-serif; padding: 20px; }
.grp { margin-bottom: 24px; padding: 16px; background: #131b2e; border: 1px solid #233150; border-radius: 12px; }
.imgs { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 10px; }
.card { background: #000; border-radius: 8px; overflow: hidden; text-align: center; border: 1px solid #334155; }
img { width: 180px; height: 180px; object-fit: cover; display: block; }
.meta { font-size: 11px; padding: 4px; color: #94a3b8; }
</style>
</head>
<body>
<h1>27 Image Sets in public/img/</h1>
`;

for (const g of data) {
  html += `
  <div class="grp">
    <h3>Set ${g.index} (${g.time}) - ${g.count} Photos</h3>
    <div class="imgs">
  `;
  for (const item of g.items) {
    html += `
      <div class="card">
        <img src="/img/${encodeURIComponent(item.name)}" alt="${item.name}">
        <div class="meta">${item.w}x${item.h} (${item.sizeKb}KB)</div>
      </div>
    `;
  }
  html += `
    </div>
  </div>
  `;
}

html += `</body></html>`;
fs.writeFileSync('public/gallery-check.html', html, 'utf8');
console.log('Written to public/gallery-check.html successfully!');
