import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const srcDir = path.join(__dirname, 'src');

const imagesToCompress = [
    'product1.png',
    'product2.png',
    'product3.png',
    'product4.png',
    'product5.png',
    'product6.png',
];

async function compressImages() {
    for (const imgName of imagesToCompress) {
        const inputPath = path.join(srcDir, imgName);
        const outputPath = path.join(srcDir, imgName.replace('.png', '.webp'));

        if (fs.existsSync(inputPath)) {
            try {
                console.log(`Compressing ${imgName}...`);
                // Resize to a max reasonable width for web and convert to high-quality WebP
                await sharp(inputPath)
                    .resize({ width: 1400, withoutEnlargement: true })
                    .webp({ quality: 80, effort: 6 }) // effort 6 for best compression
                    .toFile(outputPath);

                const origSize = fs.statSync(inputPath).size / (1024 * 1024);
                const newSize = fs.statSync(outputPath).size / (1024 * 1024);
                console.log(`✅ ${imgName} compressed from ${origSize.toFixed(2)}MB to ${newSize.toFixed(2)}MB.`);
            } catch (err) {
                console.error(`❌ Failed to compress ${imgName}:`, err);
            }
        } else {
            console.warn(`⚠️ Warning: ${imgName} not found in src/`);
        }
    }
}

compressImages();
