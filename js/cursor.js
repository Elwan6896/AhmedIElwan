/**
 * Custom Cursor Module
 * Adds custom cursor functionality to all pages
 */

(function() {
    'use strict';

    /**
     * Initialize custom cursor
     * This function checks if cursor elements exist before adding event listeners
     */
    function initCustomCursor() {
        const cursor = document.querySelector('.cursor');
        const cursorDot = document.querySelector('.cursor-dot');

        // Only proceed if cursor elements exist on the page
        if (!cursor || !cursorDot) {
            return;
        }

        // Add mousemove event listener
        document.addEventListener('mousemove', function(e) {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';

            cursorDot.style.left = e.clientX + 'px';
            cursorDot.style.top = e.clientY + 'px';
        });

        // Optional: Add cursor effects on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .btn, .view-project, input, textarea, select');

        interactiveElements.forEach(function(el) {
            el.addEventListener('mouseenter', function() {
                cursor.classList.add('cursor-hover');
                cursorDot.classList.add('cursor-dot-hover');
            });

            el.addEventListener('mouseleave', function() {
                cursor.classList.remove('cursor-hover');
                cursorDot.classList.remove('cursor-dot-hover');
            });
        });

        // Hide cursor when leaving the window
        document.addEventListener('mouseout', function(e) {
            if (e.relatedTarget === null) {
                cursor.style.opacity = '0';
                cursorDot.style.opacity = '0';
            }
        });

        document.addEventListener('mouseover', function(e) {
            if (e.relatedTarget !== null) {
                cursor.style.opacity = '1';
                cursorDot.style.opacity = '1';
            }
        });
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCustomCursor);
    } else {
        initCustomCursor();
    }

    // Also expose a global function for manual initialization
    window.initCustomCursor = initCustomCursor;
})();

