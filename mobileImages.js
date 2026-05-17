const sharp = require('sharp');

async function fixMobileImages() {
  try {
    // cozy_bedroom variants
    await sharp('images/cozy_bedroom.webp').resize({ width: 400 }).webp({ quality: 80 }).toFile('images/cozy_bedroom_mobile.webp');
    await sharp('images/cozy_bedroom.webp').resize({ width: 600 }).webp({ quality: 80 }).toFile('images/cozy_bedroom_medium.webp'); // Overwrite with 600w
    
    // fabric_texture variants
    await sharp('images/fabric_texture.webp').resize({ width: 220 }).webp({ quality: 80 }).toFile('images/fabric_texture_mobile.webp');
    
    console.log("Mobile images generated");
  } catch(err) {
    console.error(err);
  }
}
fixMobileImages();
