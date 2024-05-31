document.addEventListener('DOMContentLoaded', function() {
    const startButton = document.getElementById('start-button');
    const startMenu = document.getElementById('start-menu');
    const taskbar = document.querySelector('.taskbar');

    startButton.addEventListener('click', function() {
        startMenu.style.display = startMenu.style.display === 'block' ? 'none' : 'block';
    });

    // Close the start menu when clicking outside of it
    document.addEventListener('click', function(event) {
        if (!startButton.contains(event.target) && !startMenu.contains(event.target)) {
            startMenu.style.display = 'none';
        }
    });

    // Function to create a new window
    function createWindow(id, title, content) {
        const window = document.createElement('div');
        window.classList.add('window');
        window.id = id;

        const windowHeader = document.createElement('div');
        windowHeader.classList.add('window-header');

        const windowTitle = document.createElement('div');
        windowTitle.innerText = title;
        windowHeader.appendChild(windowTitle);

        const windowControls = document.createElement('div');
        windowControls.classList.add('window-controls');
        
        const minimizeButton = document.createElement('button');
        minimizeButton.innerText = '_';
        minimizeButton.addEventListener('click', () => {
            window.style.display = 'none';
            addTaskbarIcon(id, title);
        });
        windowControls.appendChild(minimizeButton);

        const fullscreenButton = document.createElement('button');
        fullscreenButton.innerText = '□';
        fullscreenButton.addEventListener('click', () => {
            if (window.classList.contains('fullscreen')) {
                window.classList.remove('fullscreen');
                window.style.width = '400px';
                window.style.height = '300px';
            } else {
                window.classList.add('fullscreen');
                window.style.width = '100vw';
                window.style.height = '100vh';
                window.style.top = '0';
                window.style.left = '0';
            }
        });
        windowControls.appendChild(fullscreenButton);

        const closeButton = document.createElement('button');
        closeButton.innerText = 'X';
        closeButton.addEventListener('click', () => {
            window.style.display = 'none';
            removeTaskbarIcon(id);
        });
        windowControls.appendChild(closeButton);

        windowHeader.appendChild(windowControls);
        window.appendChild(windowHeader);

        const windowContent = document.createElement('div');
        windowContent.classList.add('window-content');
        windowContent.innerHTML = content;
        window.appendChild(windowContent);

        document.body.appendChild(window);

        // Make the window draggable
        let isDragging = false;
        let offsetX, offsetY;

        windowHeader.addEventListener('mousedown', function(e) {
            isDragging = true;
            offsetX = e.clientX - window.getBoundingClientRect().left;
            offsetY = e.clientY - window.getBoundingClientRect().top;
            window.style.zIndex = 1001; // Bring to front
        });

        document.addEventListener('mousemove', function(e) {
            if (isDragging) {
                window.style.left = e.clientX - offsetX + 'px';
                window.style.top = e.clientY - offsetY + 'px';
            }
        });

        document.addEventListener('mouseup', function() {
            isDragging = false;
        });

        return window;
    }

    // Show window function
    function showWindow(id, title, content) {
        let window = document.getElementById(id);
        if (!window) {
            window = createWindow(id, title, content);
        }
        window.style.display = 'block';
        addTaskbarIcon(id, title);
    }

    // Add taskbar icon
    function addTaskbarIcon(id, title) {
        let taskbarIcon = document.getElementById(`${id}-taskbar`);
        if (!taskbarIcon) {
            taskbarIcon = document.createElement('div');
            taskbarIcon.classList.add('taskbar-icon');
            taskbarIcon.id = `${id}-taskbar`;
            taskbarIcon.innerText = title;
            taskbarIcon.addEventListener('click', () => {
                const window = document.getElementById(id);
                window.style.display = 'block';
                removeTaskbarIcon(id);
            });
            taskbar.appendChild(taskbarIcon);
        }
    }

    // Remove taskbar icon
    function removeTaskbarIcon(id) {
        const taskbarIcon = document.getElementById(`${id}-taskbar`);
        if (taskbarIcon) {
            taskbar.removeChild(taskbarIcon);
        }
    }

    // Add event listeners to icons
    document.querySelectorAll('.icon').forEach(icon => {
        icon.addEventListener('click', function() {
            const id = this.id + '-window';
            const title = this.innerText;
            const content = `<p>Content for ${title}</p>`;
            showWindow(id, title, content);
        });
    });
});
