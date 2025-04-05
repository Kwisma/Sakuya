import fs from 'fs'
import path from 'path'
import sharp from 'sharp';
// 支持的图片扩展名列表
const SUPPORTED_EXT = ['.jpg', '.jpeg', '.png', '.tif', '.tiff', '.gif', '.webp', '.svg'];

async function convertToWebp(inputPath, outputPath, quality = 80) {
    try {
        await sharp(inputPath)
            .toFormat('webp', {
                quality: quality,
                lossless: false,
                alphaQuality: 100
            })
            .toFile(outputPath);

        const beforeSize = fs.statSync(inputPath).size;
        const afterSize = fs.statSync(outputPath).size;
        console.log(`[OK] ${path.relative(process.cwd(), inputPath)} → ${(beforeSize / 1024).toFixed(1)}KB → ${(afterSize / 1024).toFixed(1)}KB (${((beforeSize - afterSize) / beforeSize * 100).toFixed(1)}% saved)`);
    } catch (err) {
        console.error(`[ERROR] ${inputPath}: ${err.message}`);
    }
}

function processDirectory(inputDir, outputDir, quality) {
    // 创建输出根目录
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    // 递归遍历目录
    const entries = fs.readdirSync(inputDir, { withFileTypes: true });

    for (const entry of entries) {
        const srcPath = path.join(inputDir, entry.name);
        const destPath = path.join(outputDir, entry.name);

        if (entry.isDirectory()) {
            processDirectory(srcPath, destPath, quality);
        } else if (entry.isFile()) {
            const ext = path.extname(entry.name).toLowerCase();
            if (SUPPORTED_EXT.includes(ext)) {
                const webpFilename = path.basename(entry.name, ext) + '.webp';
                const webpPath = path.join(outputDir, webpFilename);

                // 创建子目录（如果不存在）
                const parentDir = path.dirname(webpPath);
                if (!fs.existsSync(parentDir)) {
                    fs.mkdirSync(parentDir, { recursive: true });
                }

                convertToWebp(srcPath, webpPath, quality);
            }
        }
    }
}

// 命令行参数处理
const args = process.argv.slice(2);
if (args.length < 2) {
    console.log('使用方法: node converter.js <输入目录> <输出目录> [质量 1-100]');
    console.log('示例: node converter.js ./images ./output 85');
    process.exit(1);
}

const inputDir = path.resolve(args[0]);
const outputDir = path.resolve(args[1]);
const quality = args[2] ? Math.min(Math.max(parseInt(args[2]), 1, 100)) : 80;

// 启动处理
if (!fs.existsSync(inputDir)) {
    console.error(`输入目录不存在: ${inputDir}`);
    process.exit(1);
}

console.log(`开始转换目录: ${inputDir}`);
console.log(`输出目录: ${outputDir}`);
console.log(`质量设置: ${quality}\n`);

processDirectory(inputDir, outputDir, quality);
