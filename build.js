const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

async function build() {
  console.log('Building PelliScope...');

  // 1. Clean dist directory
  const distDir = path.join(__dirname, 'dist');
  if (fs.existsSync(distDir)) {
    fs.rmSync(distDir, { recursive: true, force: true });
  }

  // 2. Run esbuild
  try {
    const result = await esbuild.build({
      entryPoints: ['src/main.jsx'],
      bundle: true,
      minify: true,
      sourcemap: true,
      entryNames: '[name]-[hash]', // This adds the hash to the filename
      outdir: 'dist',
      publicPath: './dist/',
      target: 'es2017',
      loader: {
        '.png': 'file',
        '.jpg': 'file',
        '.jpeg': 'file',
        '.mp4': 'file',
      },
      metafile: true, // Needed to find the output filename
      logLevel: 'info',
    });

    // 3. Find the generated JS file
    const outputs = Object.keys(result.metafile.outputs);
    const mainJs = outputs.find(o => o.endsWith('.js') && !o.endsWith('.css')); // Adjust if you have CSS bundles

    if (!mainJs) {
      throw new Error('Could not find generated JavaScript file.');
    }

    const mainJsFilename = path.basename(mainJs);
    console.log(`Build successful! Generated: ${mainJsFilename}`);

    // 4. Update index.html
    const indexHtmlPath = path.join(__dirname, 'index.html');
    let html = fs.readFileSync(indexHtmlPath, 'utf8');

    // Regex to match the existing script tag src
    // Valid for: src="./dist/main.js", src="./dist/main.js?v=...", src="./dist/main-HASH.js", etc.
    const scriptRegex = /src="\.\/dist\/main.*\.js.*?"/;

    if (scriptRegex.test(html)) {
      html = html.replace(scriptRegex, `src="./dist/${mainJsFilename}"`);
    } else {
      console.warn('WARNING: Could not find script tag in index.html to update.');
    }

    // Optional: Update favicon version to force refresh if it changed
    const faviconRegex = /href="\.\/assets\/img\/pelliscope\.png.*?"/;
    if (faviconRegex.test(html)) {
      html = html.replace(faviconRegex, `href="./assets/img/pelliscope.png?v=${Date.now()}"`);
    }

    fs.writeFileSync(indexHtmlPath, html);
    console.log('Updated index.html with new bundle filename.');

  } catch (e) {
    console.error('Build failed:', e);
    process.exit(1);
  }
}

build();
