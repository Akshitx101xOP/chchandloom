const sharp = require('sharp');
const fs = require('fs');

async function processImages() {
  try {
    // 1. Create cozy_bedroom_medium.webp (800px)
    await sharp('images/cozy_bedroom.webp')
      .resize({ width: 800 })
      .webp({ quality: 80 })
      .toFile('images/cozy_bedroom_medium.webp');
    console.log("Created cozy_bedroom_medium.webp");

    // 2. Create curtains_small.webp (400px)
    await sharp('images/curtains.webp')
      .resize({ width: 400 })
      .webp({ quality: 80 })
      .toFile('images/curtains_small.webp');
    console.log("Created curtains_small.webp");

    // 3. Create cushions_small.webp (400px)
    await sharp('images/cushions_throws.webp')
      .resize({ width: 400 })
      .webp({ quality: 80 })
      .toFile('images/cushions_small.webp'); // User called it cushions_small.webp
    console.log("Created cushions_small.webp");

    // 4. Recompress styled_home_small.webp
    await sharp('images/styled_home_small.webp')
      .webp({ quality: 58 })
      .toFile('images/styled_home_small_temp.webp');
    fs.unlinkSync('images/styled_home_small.webp');
    fs.renameSync('images/styled_home_small_temp.webp', 'images/styled_home_small.webp');
    console.log("Recompressed styled_home_small.webp");

    // 5. Recompress rug_floor_small.webp
    await sharp('images/rug_floor_small.webp')
      .webp({ quality: 50 })
      .toFile('images/rug_floor_small_temp.webp');
    fs.unlinkSync('images/rug_floor_small.webp');
    fs.renameSync('images/rug_floor_small_temp.webp', 'images/rug_floor_small.webp');
    console.log("Recompressed rug_floor_small.webp");

  } catch (err) {
    console.error("Error processing images:", err);
  }
}

processImages();
