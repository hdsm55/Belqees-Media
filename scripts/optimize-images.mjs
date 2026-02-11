import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const imagesRoot = path.join(process.cwd(), 'public', 'images');
const outputRoot = path.join(process.cwd(), 'public', 'images-optimized');
const supportedExt = new Set(['.jpg', '.jpeg', '.png']);
const skipNames = new Set(['logo.avif']);
const tempDir = path.join(process.cwd(), 'scripts', '.tmp-optimized');

async function collectFiles(dir) {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    const files = [];

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            files.push(...(await collectFiles(fullPath)));
            continue;
        }
        if (skipNames.has(entry.name)) continue;
        const ext = path.extname(entry.name).toLowerCase();
        if (supportedExt.has(ext)) {
            files.push(fullPath);
        }
    }

    return files;
}

async function optimizeImage(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    const relativePath = path.relative(imagesRoot, filePath);
    const outputPath = path.join(outputRoot, relativePath);
    const tempPath = path.join(tempDir, `${path.basename(filePath)}.tmp`);

    const image = sharp(filePath, { failOn: 'none' });
    let outputBuffer;

    if (ext === '.jpg' || ext === '.jpeg') {
        outputBuffer = await image
            .jpeg({ quality: 75, mozjpeg: true })
            .toBuffer();
    } else if (ext === '.png') {
        outputBuffer = await image
            .png({ compressionLevel: 9, adaptiveFiltering: true })
            .toBuffer();
    } else {
        return;
    }

    if (outputBuffer) {
        await fs.mkdir(path.dirname(outputPath), { recursive: true });
        await fs.writeFile(tempPath, outputBuffer);
        await fs.copyFile(tempPath, outputPath);
        await fs.unlink(tempPath);
    }
}

async function run() {
    const files = await collectFiles(imagesRoot);
    if (files.length === 0) {
        console.log('No images found to optimize.');
        return;
    }

    await fs.mkdir(tempDir, { recursive: true });
    console.log(`Optimizing ${files.length} images...`);
    let failed = 0;
    for (const file of files) {
        try {
            await optimizeImage(file);
        } catch (error) {
            failed += 1;
            console.warn(`Failed to optimize: ${path.relative(process.cwd(), file)}`);
            if (process.env.NODE_ENV === 'development') {
                console.warn(error);
            }
        }
    }
    console.log(`Image optimization complete. Failed: ${failed}`);
}

run().catch((error) => {
    console.error('Image optimization failed:', error);
    process.exit(1);
});
