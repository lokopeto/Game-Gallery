const fs = require('fs');
const path = require('path');

exports.handler = async () => {
    const galleryDir = path.join(__dirname, 'gallery'); // Adjust if needed after testing
    const images = [];

    try {
        const folders = fs.readdirSync(galleryDir);
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

        return {
            statusCode: 200,
            body: JSON.stringify(images),
        };
    } catch (error) {
        console.error('Error accessing gallery:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to load images', details: error.message }),
        };
    }
};
