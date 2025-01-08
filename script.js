const canvas = document.getElementById("paintCanvas");
const ctx = canvas.getContext("2d");
let painting = false;
let currentColor = getRandomColor(); // Initialize with a random color

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function getRandomColor() {
    const hue = Math.floor(Math.random() * 360);
    const saturation = Math.floor(Math.random() * 61) + 40 + '%';
    const lightness = Math.floor(Math.random() * 41) + 40 + '%';
    return `hsl(${hue}, ${saturation}, ${lightness})`;
}

function startPosition(e) {
    painting = true;
    draw(e);
}

function endPosition() {
    painting = false;
    ctx.beginPath();
    currentColor = getRandomColor(); // Change color on mouse release
}

function draw(e) {
    if (!painting) return;
    ctx.lineWidth = 20;
    ctx.lineCap = "round";
    ctx.strokeStyle = currentColor;
    ctx.lineTo(e.clientX, e.clientY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX, e.clientY);
}

canvas.addEventListener("mousedown", startPosition);
canvas.addEventListener("mouseup", endPosition);
canvas.addEventListener("mousemove", draw);

// Menu interaction: Toggle 'about' paragraph visibility
const aboutItem = document.querySelector('.menu-item a[href="#about"]');
const aboutParagraph = document.getElementById("aboutParagraph");
const musicItem = document.querySelector('.menu-item a[href="#music"]'); // Select music item
const clickableItems = document.querySelector('.clickable-items'); // Select the clickable items container

aboutItem.addEventListener('click', (e) => {
    e.preventDefault();
    aboutParagraph.style.display = aboutParagraph.style.display === "none" ? "block" : "none"; // Toggle about paragraph
    updateActiveMenuItem(aboutItem, aboutParagraph.style.display === "block");
});

musicItem.addEventListener('click', (e) => {
    e.preventDefault();
    clickableItems.style.display = clickableItems.style.display === "none" ? "flex" : "none"; // Toggle clickable items
    updateActiveMenuItem(musicItem, clickableItems.style.display === "flex");
});

// Full stop toggling feature for clickable items
let selectedClickableItem = null; // Track the currently selected item

const clickableItemsList = document.querySelectorAll('.clickable-items .item'); // Select all clickable items
clickableItemsList.forEach(item => {
    item.addEventListener('click', () => {
        const itemText = item.textContent.replace(/^\. /, ''); // Remove existing full stop if present

        // If the clicked item is already selected, remove the full stop
        if (selectedClickableItem === item) {
            item.textContent = itemText; // Remove the full stop
            selectedClickableItem = null; // Deselect the item
        } else {
            // If another item was selected, remove its full stop
            if (selectedClickableItem) {
                selectedClickableItem.textContent = selectedClickableItem.textContent.replace(/^\. /, ''); // Remove full stop from the previously selected item
            }
            // Set the new selected item and add a full stop
            item.textContent = '. ' + itemText; // Add the full stop to the newly selected item
            selectedClickableItem = item; // Update the reference to the currently selected item
        }
    });
});

function updateActiveMenuItem(selectedItem, isVisible) {
    const menuItems = document.querySelectorAll('.menu-item a');
    
    menuItems.forEach(item => {
        if (item === selectedItem) {
            if (isVisible) {
                item.textContent = item.textContent.endsWith('.') ? item.textContent : item.textContent + '.';
            } else {
                item.textContent = item.textContent.replace(/\.$/, '');
            }
        } else {
            item.textContent = item.textContent.replace(/\.$/, '');
        }
    });

    // Ensure the correct full stop display based on visibility
    aboutItem.textContent = aboutParagraph.style.display === "block" ? "about." : "about";
    musicItem.textContent = clickableItems.style.display === "flex" ? "music." : "music";
}

// Click the name to refresh the page
const nameSection = document.querySelector('.name');
nameSection.addEventListener('click', () => {
    location.reload();
});

// Toggle button for dark mode
const toggleButton = document.getElementById('toggleButton');
toggleButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});
