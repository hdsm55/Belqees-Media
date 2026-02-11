#!/usr/bin/env node

import { exec } from 'child_process';
import { promisify } from 'util';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const execAsync = promisify(exec);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.join(__dirname, '..');
const videosDir = path.join(projectRoot, 'public', 'videos');
const optimizedDir = path.join(projectRoot, 'public', 'videos-optimized');

// Ensure optimized directory exists
if (!fs.existsSync(optimizedDir)) {
    fs.mkdirSync(optimizedDir, { recursive: true });
}

async function compressVideo(inputFile, outputFile, format) {
    const inputPath = path.join(videosDir, inputFile);
    const outputPath = path.join(optimizedDir, outputFile);

    if (!fs.existsSync(inputPath)) {
        console.error(`❌ Input file not found: ${inputPath}`);
        return false;
    }

    try {
        let command;

        if (format === 'mp4') {
            // Compress to 720p MP4 with H.264
            command = `ffmpeg -i "${inputPath}" -vf scale=-2:720 -c:v libx264 -crf 28 -preset medium -c:a aac -b:a 128k -movflags +faststart "${outputPath}"`;
        } else if (format === 'webm') {
            // Compress to 720p WebM with VP9
            command = `ffmpeg -i "${inputPath}" -vf scale=-2:720 -c:v libvpx-vp9 -crf 35 -b:v 0 -c:a libopus -b:a 128k "${outputPath}"`;
        }

        console.log(`🎬 Compressing ${inputFile} to ${format.toUpperCase()}...`);

        await execAsync(command);

        // Get file sizes
        const originalSize = fs.statSync(inputPath).size;
        const compressedSize = fs.statSync(outputPath).size;
        const reduction = ((1 - compressedSize / originalSize) * 100).toFixed(1);

        console.log(`✅ Created ${outputFile}`);
        console.log(`   Original: ${(originalSize / 1024 / 1024).toFixed(2)} MB`);
        console.log(`   Compressed: ${(compressedSize / 1024 / 1024).toFixed(2)} MB`);
        console.log(`   Reduction: ${reduction}%\n`);

        return true;
    } catch (error) {
        console.error(`❌ Failed to compress ${inputFile}:`, error.message);
        return false;
    }
}

async function main() {
    console.log('🎥 Starting video optimization...\n');

    const videos = [
        { input: 'hero-video.mp4', output: 'hero-video-720p.mp4', format: 'mp4' },
        { input: 'hero-video.mp4', output: 'hero-video-720p.webm', format: 'webm' }
    ];

    let successful = 0;
    let failed = 0;

    for (const video of videos) {
        const success = await compressVideo(video.input, video.output, video.format);
        if (success) {
            successful++;
        } else {
            failed++;
        }
    }

    console.log('\n📊 Video optimization complete!');
    console.log(`✅ Successful: ${successful}`);
    console.log(`❌ Failed: ${failed}`);
}

main().catch(console.error);
