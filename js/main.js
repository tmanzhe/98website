document.addEventListener('DOMContentLoaded', function() {
    const startButton = document.getElementById('start-button');
    const startMenu = document.getElementById('start-menu');

    startButton.addEventListener('click', function() {
        startMenu.style.display = startMenu.style.display === 'block' ? 'none' : 'block';
    });

    // Close the start menu when clicking outside of it
    document.addEventListener('click', function(event) {
        if (!startButton.contains(event.target) && !startMenu.contains(event.target)) {
            startMenu.style.display = 'none';
        }
    });
});
