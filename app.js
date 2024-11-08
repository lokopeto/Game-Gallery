const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve static files from the gallery and public folders
app.use('/gallery', express.static(path.join(__dirname, 'gallery')));
app.use(express.static(path.join(__dirname, 'public')));

// Serve the index.html file at the root
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/images', (req, res) => {
    const galleryDir = path.join(__dirname, 'gallery');
    const folders = fs.readdirSync(galleryDir);
    const images = [];

    folders.forEach(folder => {
        const folderPath = path.join(galleryDir, folder);
        if (fs.lstatSync(folderPath).isDirectory()) {
            const files = fs.readdirSync(folderPath);
            files.forEach(file => {
                const fileExt = path.extname(file).toLowerCase();
                if (['.jpg', '.jpeg', '.png', '.gif'].includes(fileExt)) {
                    images.push(`/gallery/${folder}/${file}`);
                }
            });
        }
    });
    res.json(images);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
