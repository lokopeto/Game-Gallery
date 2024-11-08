// server.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware to serve static files
app.use(express.static('public'));

// API endpoint to read folders and files
app.get('/api/folder-structure', (req, res) => {
    const folderPath = path.join(__dirname, 'gallery'); // Replace 'your-folder' with your target folder

    const readFolder = (folder) => {
        let structure = { name: path.basename(folder), files: [], folders: [] };
        
        const items = fs.readdirSync(folder);
        items.forEach(item => {
            const itemPath = path.join(folder, item);
            if (fs.statSync(itemPath).isDirectory()) {
                structure.folders.push(readFolder(itemPath));
            } else {
                structure.files.push(item);
            }
        });

        return structure;
    };

    const folderStructure = readFolder(folderPath);
    res.json(folderStructure);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
