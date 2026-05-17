const sharp = require('sharp');
const fs = require('fs');

async function compressImage() {
  try {
    await sharp('images/rug_floor_small.webp')
      .webp({ quality: 60 })
      .toFile('images/rug_floor_small_compressed.webp');
    
    fs.renameSync('images/rug_floor_small_compressed.webp', 'images/rug_floor_small.webp');
    console.log("Successfully compressed the image.");
  } catch (error) {
    console.error("Error compressing image:", error);
  }
}

compressImage();
