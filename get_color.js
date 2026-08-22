const { Jimp } = require('jimp');
Jimp.read('f:/Elvira infr/Elvira infr/public/images/logo.jpg').then(img => {
  const color = img.getPixelColor(0, 0);
  console.log('COLOR_HEX:', color.toString(16));
}).catch(console.error);
