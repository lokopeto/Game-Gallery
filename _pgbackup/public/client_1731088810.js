document.addEventListener("DOMContentLoaded", async () => {
    const galleryContainer = document.getElementById("gallery");

    try {
        // Fetch the list of image paths from the /images endpoint
        const response = await fetch('/images');
        const images = await response.json();

        // Function to format folder names
        const formatFolderName = (name) => {
            return name
                .replace(/[-_]/g, ' ')               // Replace hyphens and underscores with spaces
                .replace(/\b\w/g, char => char.toUpperCase()); // Capitalize first letter of each word
        };

        // Group images by folder name
        const folderMap = {};
        images.forEach(imageSrc => {
            // Extract folder name from the image path
            const parts = imageSrc.split('/');
            const folderName = parts[2]; // Assuming the folder name is at index 2

            if (!folderMap[folderName]) {
                folderMap[folderName] = [];
            }
            folderMap[folderName].push(imageSrc);
        });

        // Create elements for each folder and add images
        Object.keys(folderMap).forEach(folderName => {
            // Create a heading with the formatted folder name
            const folderHeading = document.createElement("h2");
            folderHeading.classList.add("gallery-name");
            folderHeading.textContent = formatFolderName(folderName);

            // Create a container div for the images in this folder
            const folderDiv = document.createElement("div");
            folderDiv.classList.add("folder");

            // Add images to the folder div
            folderMap[folderName].forEach(imageSrc => {
                const imgElement = document.createElement("img");
                imgElement.src = imageSrc;
                imgElement.classList.add("image-item"); // Optional class for styling
                folderDiv.appendChild(imgElement);
            });

            // Append the heading and folder div to the gallery container
            galleryContainer.appendChild(folderHeading);
            galleryContainer.appendChild(folderDiv);
        });
    } catch (error) {
        console.error("Error fetching images:", error);
    }
});
