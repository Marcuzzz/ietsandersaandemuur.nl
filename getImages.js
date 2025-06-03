const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, 'images');
const outputFile = path.join(__dirname, 'json', 'main.json');

fs.readdir(imagesDir, (err, files) => {
  if (err) {
    console.error('Error reading images directory:', err);
    return;
  }

  const jpgs = files
    .filter(file => file.toLowerCase().endsWith('.jpg'))
    .map(file => `images/${file}`);

  const jsonData = {
    images: jpgs
  };

  // Ensure the output directory exists
  fs.mkdir(path.dirname(outputFile), { recursive: true }, (err) => {
    if (err) {
      console.error('Error creating output directory:', err);
      return;
    }

    fs.writeFile(outputFile, JSON.stringify(jsonData, null, 2), (err) => {
      if (err) {
        console.error('Error writing JSON file:', err);
      } else {
        console.log(`JSON written to ${outputFile}`);
      }
    });
  });
});