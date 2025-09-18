// Layout control function
function updateLayout() {
    const currentTheme = document.getElementById("mainStyleSheet").getAttribute("href");
    const lightLayout = document.getElementById("lightLayout");
    const darkLayout = document.getElementById("darkLayout");

    if (currentTheme === "light.css") {
        lightLayout.style.display = "block";
        darkLayout.style.display = "none";
    } else if (currentTheme === "dark.css") {
        lightLayout.style.display = "none";
        darkLayout.style.display = "block";
    }
}

// Portfolio Flashcard Functionality (Dark Mode Only)
function initializePortfolioFlashcards() {
    const currentTheme = document.getElementById("mainStyleSheet").getAttribute("href");
    const isPortfolioPage = window.location.pathname.includes('portfolio.html') ||
        document.title === 'Portfolio';

    if (currentTheme === "dark.css" && isPortfolioPage) {
        const projectCards = document.querySelectorAll('.project-card');

        projectCards.forEach(card => {
            card.removeEventListener('click', handleCardClick);
            card.addEventListener('click', handleCardClick);

            card.addEventListener('mouseenter', function () {
                this.style.transform = 'translateY(-5px)';
            });

            card.addEventListener('mouseleave', function () {
                if (!this.classList.contains('flipped')) {
                    this.style.transform = 'translateY(0)';
                }
            });
        });
    }
}

// Service Flashcard Functionality (Dark Mode Only)
function initializeServiceFlashcards() {
    const currentTheme = document.getElementById("mainStyleSheet").getAttribute("href");
    const isServicePage = window.location.pathname.includes('service.html') ||
        document.title === 'Services';

    if (currentTheme === "dark.css" && isServicePage) {
        const serviceCards = document.querySelectorAll('.service-card');

        serviceCards.forEach(card => {
            card.removeEventListener('click', handleServiceCardClick);
            card.addEventListener('click', handleServiceCardClick);

            card.addEventListener('mouseenter', function () {
                this.style.transform = 'translateY(-5px)';
            });

            card.addEventListener('mouseleave', function () {
                if (!this.classList.contains('flipped')) {
                    this.style.transform = 'translateY(0)';
                }
            });
        });
    }
}

// Handle card click to flip - Portfolio cards
function handleCardClick(e) {
    // Check if the clicked element is a link or inside a link
    if (e.target.tagName === 'A' || e.target.closest('a')) {
        return;
    }

    // Check if clicking on other interactive elements
    if (e.target.tagName === 'BUTTON' || e.target.closest('button')) {
        return;
    }

    e.preventDefault();
    const card = e.currentTarget;

    // Toggle flipped class
    card.classList.toggle('flipped');
}

// Handle service card click to flip
function handleServiceCardClick(e) {
    // Check if the clicked element is a link or inside a link
    if (e.target.tagName === 'A' || e.target.closest('a')) {
        return;
    }

    // Check if clicking on other interactive elements
    if (e.target.tagName === 'BUTTON' || e.target.closest('button')) {
        return;
    }

    e.preventDefault();
    const card = e.currentTarget;

    // Toggle flipped class
    card.classList.toggle('flipped');
}

// Initialize flashcards when page loads
document.addEventListener('DOMContentLoaded', function () {
    initializePortfolioFlashcards();
    initializeServiceFlashcards();
});

// Re-initialize when theme changes
function updateLayout() {
    const currentTheme = document.getElementById("mainStyleSheet").getAttribute("href");
    const lightLayout = document.getElementById("lightLayout");
    const darkLayout = document.getElementById("darkLayout");

    if (currentTheme === "light.css") {
        lightLayout.style.display = "block";
        darkLayout.style.display = "none";

        // Remove flashcard functionality in light mode
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            card.removeEventListener('click', handleCardClick);
            card.classList.remove('flipped');
        });

        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach(card => {
            card.removeEventListener('click', handleServiceCardClick);
            card.classList.remove('flipped');
        });

    } else if (currentTheme === "dark.css") {
        lightLayout.style.display = "none";
        darkLayout.style.display = "block";

        // Initialize flashcard functionality in dark mode
        setTimeout(() => {
            initializePortfolioFlashcards();
            initializeServiceFlashcards();
        }, 100);
    }
}

// Switch to light mode
function toggleLight() {
    const element = document.getElementById("mainStyleSheet");
    const currStyle = element.getAttribute("href");

    if (currStyle !== "light.css") {
        element.setAttribute("href", "light.css");
        // Check if localStorage is available before using it
        try {
            localStorage.setItem("stylesheet", "light.css");
        } catch (e) {
            console.log("localStorage not available");
        }
        updateLayout();
    }
}

// Switch to dark mode
function toggleDark() {
    const element = document.getElementById("mainStyleSheet");
    const currStyle = element.getAttribute("href");

    if (currStyle !== "dark.css") {
        element.setAttribute("href", "dark.css");
        // Check if localStorage is available before using it
        try {
            localStorage.setItem("stylesheet", "dark.css");
        } catch (e) {
            console.log("localStorage not available");
        }
        updateLayout();
    }
}

// Page load handler
window.onload = function () {
    // Get stylesheet name from local storage with error handling
    let currName = null;
    try {
        currName = localStorage.getItem("stylesheet");
    } catch (e) {
        console.log("localStorage not available");
    }

    // Check if a stylesheet name exists in local storage
    if (currName) {
        // Get html style element by ID
        const element = document.getElementById("mainStyleSheet");

        element.setAttribute("href", currName);
    }

    // Update layout based on current theme
    updateLayout();
}

window.addEventListener('DOMContentLoaded', function () {
    let savedTheme = null;
    try {
        savedTheme = localStorage.getItem("stylesheet");
    } catch (e) {
        console.log("localStorage not available");
    }

    if (savedTheme) {
        document.getElementById("mainStyleSheet").setAttribute("href", savedTheme);
    }
    updateLayout();
});