const sharp = require('sharp');
const fs = require('fs');

async function processRug() {
  try {
    await sharp('images/rug_floor_small.webp')
      .webp({ quality: 50 })
      .toFile('images/rug_floor_small_temp2.webp');
    console.log("Recompressed rug_floor_small.webp");
  } catch (err) {
    console.error("Error processing images:", err);
  }
}

processRug();
