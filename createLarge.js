const sharp = require('sharp');
const fs = require('fs');

async function createLarge() {
  try {
    await sharp('images/cozy_bedroom.webp')
      .resize({ width: 1200 })
      .webp({ quality: 80 })
      .toFile('images/cozy_bedroom_large.webp');
    console.log("Created cozy_bedroom_large.webp");
  } catch (err) {
    console.error(err);
  }
}
createLarge();
