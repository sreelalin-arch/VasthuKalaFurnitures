// Copies the PDF libraries and fonts from node_modules into www/lib so the app works offline.
const fs = require('fs'), path = require('path');
const lib = path.join(__dirname, '..', 'www', 'lib');
const nm = p => path.join(__dirname, '..', 'node_modules', p);
fs.mkdirSync(path.join(lib, 'fonts'), { recursive: true });
fs.copyFileSync(nm('html2canvas/dist/html2canvas.min.js'), path.join(lib, 'html2canvas.min.js'));
fs.copyFileSync(nm('jspdf/dist/jspdf.umd.min.js'), path.join(lib, 'jspdf.umd.min.js'));
const faces = [['bitter', 'Bitter', 600], ['bitter', 'Bitter', 800], ['tinos', 'Tinos', 400], ['tinos', 'Tinos', 700], ['public-sans', 'Public Sans', 400], ['public-sans', 'Public Sans', 600]];
let css = '';
for (const [pkg, fam, w] of faces) {
  const f = `${pkg}-latin-${w}-normal.woff2`;
  fs.copyFileSync(nm(`@fontsource/${pkg}/files/${f}`), path.join(lib, 'fonts', f));
  css += `@font-face{font-family:"${fam}";font-style:normal;font-weight:${w};font-display:swap;src:url("fonts/${f}") format("woff2")}\n`;
}
fs.writeFileSync(path.join(lib, 'fonts.css'), css);
console.log('Assets ready in www/lib');
