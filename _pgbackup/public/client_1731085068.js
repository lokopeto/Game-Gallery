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

        // Create divs for each folder and add images
        Object.keys(folderMap).forEach(folderName => {
            // Create a container div for each folder
            const folderDiv = document.createElement("div");
            folderDiv.classList.add("folder");

            // Add a heading with the formatted folder name
            const folderHeading = document.createElement("h2");
            folderHeading.textContent = formatFolderName(folderName);
            folderDiv.appendChild(folderHeading);

            // Create a div to act as a grid for images
            const imageGrid = document.createElement("div");
            imageGrid.classList.add("image-grid");

            // Add images to the image grid div
            folderMap[folderName].forEach(imageSrc => {
                const imgElement = document.createElement("img");
                imgElement.src = imageSrc;
                imgElement.classList.add("image-item"); // Optional class for styling
                imageGrid.appendChild(imgElement);
            });

            // Append the image grid to the folder div
            folderDiv.appendChild(imageGrid);

            // Append the folder div to the main gallery container
            galleryContainer.appendChild(folderDiv);
        });
    } catch (error) {
        console.error("Error fetching images:", error);
    }
});
