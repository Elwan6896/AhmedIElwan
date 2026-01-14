/**
 * Admin Authentication Module (Simplified for GitHub Pages)
 * Uses client-side validation without server persistence
 */

(function() {
    'use strict';

    // Simple Base64 encode/decode for obfuscation
    function encode(str) {
        return btoa(str);
    }
    
    function decode(str) {
        return atob(str);
    }

    // Default credentials (obfuscated)
    const CREDENTIALS = {
        username: encode('admin'),
        password: encode('elwan123')
    };

    // Login state (session-only, not persisted)
    let isLoggedIn = false;
    let currentUser = null;

    /**
     * Validate credentials
     */
    function validateCredentials(username, password) {
        return encode(username) === CREDENTIALS.username && 
               encode(password) === CREDENTIALS.password;
    }

    /**
     * Perform login
     */
    function login(username, password) {
        return new Promise((resolve, reject) => {
            if (!username || !password) {
                reject({ success: false, message: 'Please enter username and password.' });
                return;
            }
            
            if (validateCredentials(username, password)) {
                isLoggedIn = true;
                currentUser = username;
                sessionStorage.setItem('admin_logged_in', 'true');
                sessionStorage.setItem('admin_user', username);
                resolve({ success: true, message: 'Login successful!' });
            } else {
                reject({ success: false, message: 'Invalid username or password.' });
            }
        });
    }

    /**
     * Perform logout
     */
    function logout() {
        isLoggedIn = false;
        currentUser = null;
        sessionStorage.removeItem('admin_logged_in');
        sessionStorage.removeItem('admin_user');
        return { success: true, message: 'Logged out successfully.' };
    }

    /**
     * Check if user is authenticated
     */
    function isAuthenticated() {
        // Check session storage first
        const sessionAuth = sessionStorage.getItem('admin_logged_in');
        if (sessionAuth === 'true') {
            isLoggedIn = true;
            currentUser = sessionStorage.getItem('admin_user');
            return true;
        }
        return isLoggedIn;
    }

    /**
     * Get current username
     */
    function getUsername() {
        if (isAuthenticated()) {
            return currentUser || sessionStorage.getItem('admin_user');
        }
        return null;
    }

    /**
     * Require authentication - redirect if not logged in
     */
    function requireAuth(redirectUrl) {
        if (!isAuthenticated()) {
            if (redirectUrl) {
                window.location.href = redirectUrl;
            }
            return false;
        }
        return true;
    }

    /**
     * Show notification
     */
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `admin-notification ${type || 'info'}`;
        notification.innerHTML = `
            <i class="fa ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-times-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        `;
        
        // Remove any existing notifications
        const existing = document.querySelectorAll('.admin-notification');
        existing.forEach(n => n.remove());
        
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Hide after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    // Expose functions globally
    window.AdminAuth = {
        login: login,
        logout: logout,
        isAuthenticated: isAuthenticated,
        getUsername: getUsername,
        requireAuth: requireAuth,
        showNotification: showNotification
    };

    // Auto-initialize on page load
    document.addEventListener('DOMContentLoaded', function() {
        // Check if we're on login page
        if (document.getElementById('adminLoginForm')) {
            initLoginForm();
        }
    });

    // Initialize login form
    function initLoginForm() {
        const form = document.getElementById('adminLoginForm');
        if (!form) return;
        
        const usernameInput = document.getElementById('adminUsername');
        const passwordInput = document.getElementById('adminPassword');
        const errorDiv = document.getElementById('loginError');
        
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const username = usernameInput.value.trim();
            const password = passwordInput.value;
            
            try {
                const result = await window.AdminAuth.login(username, password);
                showNotification(result.message, 'success');
                setTimeout(function() {
                    window.location.href = 'admin-dashboard.html';
                }, 1000);
            } catch (error) {
                if (error.message && errorDiv) {
                    errorDiv.textContent = error.message;
                    errorDiv.style.display = 'block';
                }
                showNotification(error.message, 'error');
            }
        });
        
        // Clear error on input
        usernameInput.addEventListener('input', function() {
            if (errorDiv) errorDiv.style.display = 'none';
        });
        passwordInput.addEventListener('input', function() {
            if (errorDiv) errorDiv.style.display = 'none';
        });
    }

})();

