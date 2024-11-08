const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to get subfolders
app.get('/subfolders', (req, res) => {
    const folderPath = path.join(__dirname, 'your-folder'); // Update with your folder path

    fs.readdir(folderPath, { withFileTypes: true }, (err, files) => {
        if (err) {
            return res.status(500).send('Error reading folder');
        }

        const subfolders = files
            .filter(file => file.isDirectory())
            .map(folder => folder.name);

        res.json(subfolders);
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
