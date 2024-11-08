async function fetchSubfolders() {
    try {
        const response = await fetch('/subfolders');
        const subfolders = await response.json();

        const container = document.getElementById('folder-container');
        subfolders.forEach((folder, index) => {
            const div = document.createElement('div');
            div.className = `folder-item folder-item-${index}`;
            div.textContent = folder;
            container.appendChild(div);
        });
    } catch (error) {
        console.error('Error fetching subfolders:', error);
    }
}

fetchSubfolders();
