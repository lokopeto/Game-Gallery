const fs = require('fs');
const path = require('path');

const generateFolderHTML = (folderPath) => {
  // Base folder path
  const galleryPath = path.join(__dirname, folderPath);

  // Initialize HTML string
  let html = `<div class="folder-container">\n`;

  try {
    // Read contents of the folder
    const files = fs.readdirSync(galleryPath, { withFileTypes: true });

    // Filter out only directories and create divs for each
    files.forEach((file) => {
      if (file.isDirectory()) {
        html += `  <div class="subfolder">${file.name}</div>\n`;
      }
    });
    
    // Close the main folder container div
    html += `</div>`;
  } catch (err) {
    console.error("Error reading directory:", err);
  }

  return html;
};

// Usage example
const folderHTML = generateFolderHTML('gallery');
console.log(folderHTML);
