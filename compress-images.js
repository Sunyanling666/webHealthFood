// compress-images.js
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const compressImage = async (inputPath, outputPath, quality = 80) => {
  await sharp(inputPath)
    .jpeg({ quality }) // 转为更高效的jpg格式
    .toFile(outputPath);
  console.log(`Compressed: ${inputPath} -> ${outputPath}`);
};

// 处理项目中的所有图片
const processImages = async () => {
  const imgDir = path.join(__dirname, 'img');
  const files = fs.readdirSync(imgDir);

  for (const file of files) {
    if (/\.(png|jpe?g)$/i.test(file)) {
      const input = path.join(imgDir, file);
      const output = path.join(imgDir, file.replace(/\.png$/i, '.jpg'));
      await compressImage(input, output);
    }
  }
};

processImages();
