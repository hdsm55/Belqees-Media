const fs = require('fs');
const path = require('path');

function ensureCopy(src, dest) {
  try {
    if (!fs.existsSync(src)) {
      console.warn(`source not found: ${src}`);
      return;
    }
    const dir = path.dirname(dest);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.copyFileSync(src, dest);
    console.log(`copied ${src} -> ${dest}`);
  } catch (err) {
    console.error('error copying manifest:', err);
    process.exitCode = 1;
  }
}

const projectRoot = process.cwd();
const builtAppRoot = path.join(projectRoot, '.next', 'server', 'app');

// main top-level manifest
const topManifest = path.join(builtAppRoot, 'page_client-reference-manifest.js');
const expectedMainManifest = path.join(builtAppRoot, '(main)', 'page_client-reference-manifest.js');

ensureCopy(topManifest, expectedMainManifest);

// Copy route-group manifests if any are missing (useful for pages grouped under (main))
// Scan existing manifests and ensure parallel (main) copies exist
try {
  const files = fs.readdirSync(builtAppRoot);
  files.forEach((f) => {
    if (f.endsWith('page_client-reference-manifest.js')) {
      const src = path.join(builtAppRoot, f);
      const dest = path.join(builtAppRoot, '(main)', f);
      if (!fs.existsSync(dest)) {
        ensureCopy(src, dest);
      }
    }
  });
} catch (e) {
  // ignore
}

console.log('fix-client-manifest: finished');
