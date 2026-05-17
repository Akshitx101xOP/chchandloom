const sharp = require('sharp');
const fs = require('fs');

async function createResponsiveImages() {
  try {
    // cozy_bedroom variants
    await sharp('images/cozy_bedroom.webp').resize({ width: 300 }).webp({ quality: 80 }).toFile('images/cozy_bedroom_small.webp');
    await sharp('images/cozy_bedroom.webp').resize({ width: 500 }).webp({ quality: 80 }).toFile('images/cozy_bedroom_medium.webp');
    await sharp('images/cozy_bedroom.webp').resize({ width: 800 }).webp({ quality: 80 }).toFile('images/cozy_bedroom_large.webp');
    
    // fabric_texture variants
    await sharp('images/fabric_texture.webp').resize({ width: 180 }).webp({ quality: 80 }).toFile('images/fabric_texture_small.webp');
    await sharp('images/fabric_texture.webp').resize({ width: 320 }).webp({ quality: 80 }).toFile('images/fabric_texture_medium.webp');

    console.log("Images created successfully");
  } catch(err) {
    console.error(err);
  }
}
createResponsiveImages();
