import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputImage = path.join(__dirname, 'LOGO.png');
const outputDir = path.join(__dirname, 'public');

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}

async function generateIcons() {
    try {
        await sharp(inputImage)
            .resize(192, 192, {
                fit: 'contain',
                background: { r: 255, g: 255, b: 255, alpha: 0 }
            })
            .toFile(path.join(outputDir, 'pwa-192x192.png'));

        await sharp(inputImage)
            .resize(512, 512, {
                fit: 'contain',
                background: { r: 255, g: 255, b: 255, alpha: 0 }
            })
            .toFile(path.join(outputDir, 'pwa-512x512.png'));

        await sharp(inputImage)
            .resize(512, 512, {
                fit: 'contain',
                background: { r: 255, g: 255, b: 255, alpha: 1 } // Non-transparent for apple touch
            })
            .toFile(path.join(outputDir, 'apple-touch-icon.png'));

        console.log('Icons generated successfully.');
    } catch (err) {
        console.error('Error generating icons:', err);
    }
}

generateIcons();
