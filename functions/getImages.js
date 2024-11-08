exports.handler = async (event, context) => {
    const galleryDir = path.join(__dirname, '../public/gallery');
    console.log('Resolved gallery path:', galleryDir);

    const images = [];
    try {
        const folders = fs.readdirSync(galleryDir);
        console.log('Folders found:', folders);

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
