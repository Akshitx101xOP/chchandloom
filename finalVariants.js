const sharp = require('sharp');
const fs = require('fs');

async function createFinalVariants() {
  try {
    // cozy_bedroom variants
    await sharp('images/cozy_bedroom.webp').resize({ width: 320 }).webp({ quality: 80 }).toFile('images/cozy_bedroom_mobile.webp');
    await sharp('images/cozy_bedroom.webp').resize({ width: 600 }).webp({ quality: 80 }).toFile('images/cozy_bedroom_tablet.webp');
    await sharp('images/cozy_bedroom.webp').resize({ width: 900 }).webp({ quality: 80 }).toFile('images/cozy_bedroom_desktop.webp');
    
    // Convert the stray JPG from telegram to webp
    const jpgPath = 'images/products/abhinav-tst-1001-1778355139044.jpg';
    if (fs.existsSync(jpgPath)) {
      await sharp(jpgPath).resize({ width: 900 }).webp({ quality: 72 }).toFile('images/products/abhinav-tst-1001-1778355139044.webp');
      console.log('Converted JPG to WebP');
    }

    console.log("Final variants generated");
  } catch(err) {
    console.error(err);
  }
}
createFinalVariants();
