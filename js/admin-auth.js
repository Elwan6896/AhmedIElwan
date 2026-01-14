/**
 * Admin Authentication & Security Module
 * Handles login, session management, and source code protection
 */

(function() {
    'use strict';

    // Configuration
    const CONFIG = {
        STORAGE_KEY: 'admin_auth',
        SESSION_EXPIRY: 30 * 60 * 1000, // 30 minutes
        MAX_LOGIN_ATTEMPTS: 10,
        LOCKOUT_DURATION: 3 * 60 * 1000 // 3 minutes
    };

    // Default credentials (hashed)
    const DEFAULT_CREDENTIALS = {
        username: 'YWRtaW4=', // base64 of 'admin'
        password: 'ZWx3YW4xMjM=' // base64 of 'elwan123'
    };

    // Simple hash function for obfuscation
    function hashString(str) {
        return btoa(str);
    }

    // Get session data
    function getSession() {
        try {
            const session = localStorage.getItem(CONFIG.STORAGE_KEY);
            if (!session) return null;
            
            const sessionData = JSON.parse(atob(session));
            
            // Check if session is expired
            if (sessionData.expiry && Date.now() > sessionData.expiry) {
                clearSession();
                return null;
            }
            
            return sessionData;
        } catch (e) {
            return null;
        }
    }

    // Set session data
    function setSession(username, isPermanent = false) {
        const session = {
            username: username,
            loginTime: Date.now(),
            expiry: isPermanent ? null : Date.now() + CONFIG.SESSION_EXPIRY,
            token: hashString(Date.now() + Math.random().toString(36))
        };
        
        localStorage.setItem(CONFIG.STORAGE_KEY, btoa(JSON.stringify(session)));
        return session;
    }

    // Clear session
    function clearSession() {
        localStorage.removeItem(CONFIG.STORAGE_KEY);
    }

    // Get lockout status
    function getLockoutStatus() {
        const lockoutData = localStorage.getItem('admin_lockout');
        if (!lockoutData) return { locked: false };
        
        const data = JSON.parse(atob(lockoutData));
        
        if (Date.now() > data.unlockTime) {
            localStorage.removeItem('admin_lockout');
            return { locked: false };
        }
        
        return { locked: true, remaining: data.unlockTime - Date.now() };
    }

    // Set lockout
    function setLockout() {
        const data = {
            attempts: (getLockoutStatus().attempts || 0) + 1,
            unlockTime: Date.now() + CONFIG.LOCKOUT_DURATION
        };
        localStorage.setItem('admin_lockout', btoa(JSON.stringify(data)));
    }

    // Clear lockout
    function clearLockout() {
        localStorage.removeItem('admin_lockout');
    }

    // Validate credentials
    function validateCredentials(username, password) {
        const hashedUsername = hashString(username);
        const hashedPassword = hashString(password);
        
        return hashedUsername === DEFAULT_CREDENTIALS.username && 
               hashedPassword === DEFAULT_CREDENTIALS.password;
    }

    // Login function
    function login(username, password, remember = false) {
        return new Promise((resolve, reject) => {
            const lockout = getLockoutStatus();
            
            if (lockout.locked) {
                reject({ 
                    success: false, 
                    message: `Too many failed attempts. Try again in ${Math.ceil(lockout.remaining / 60000)} minutes.` 
                });
                return;
            }
            
            if (!username || !password) {
                reject({ success: false, message: 'Please enter username and password.' });
                return;
            }
            
            if (validateCredentials(username, password)) {
                clearLockout();
                const session = setSession(username, remember);
                resolve({ 
                    success: true, 
                    message: 'Login successful!',
                    session: session
                });
            } else {
                setLockout();
                const attemptsLeft = CONFIG.MAX_LOGIN_ATTEMPTS - ((lockout.attempts || 0) + 1);
                
                if (attemptsLeft <= 0) {
                    reject({ 
                        success: false, 
                        message: 'Too many failed attempts. Account locked for 15 minutes.' 
                    });
                } else {
                    reject({ 
                        success: false, 
                        message: `Invalid credentials. ${attemptsLeft} attempts remaining.` 
                    });
                }
            }
        });
    }

    // Logout function
    function logout() {
        clearSession();
        clearLockout();
        return { success: true, message: 'Logged out successfully.' };
    }

    // Check if authenticated
    function isAuthenticated() {
        return getSession() !== null;
    }

    // Get current username
    function getUsername() {
        const session = getSession();
        return session ? session.username : null;
    }

    // Refresh session
    function refreshSession() {
        const session = getSession();
        if (session) {
            setSession(session.username);
        }
    }

    // Security protection functions
    function initSecurityProtections() {
        // Disable right-click context menu
        document.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            return false;
        });

        // Block keyboard shortcuts
        document.addEventListener('keydown', function(e) {
            // Block F12
            if (e.keyCode === 123) {
                e.preventDefault();
                return false;
            }
            
            // Block Ctrl+Shift+I (DevTools)
            if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
                e.preventDefault();
                return false;
            }
            
            // Block Ctrl+Shift+J (Console)
            if (e.ctrlKey && e.shiftKey && e.keyCode === 74) {
                e.preventDefault();
                return false;
            }
            
            // Block Ctrl+U (View Source)
            if (e.ctrlKey && e.keyCode === 85) {
                e.preventDefault();
                return false;
            }
            
            // Block Ctrl+S (Save)
            if (e.ctrlKey && e.keyCode === 83) {
                e.preventDefault();
                return false;
            }
            
            // Block Ctrl+P (Print)
            if (e.ctrlKey && e.keyCode === 80) {
                e.preventDefault();
                return false;
            }
            
            // Block Ctrl+Shift+C (Inspect)
            if (e.ctrlKey && e.shiftKey && e.keyCode === 67) {
                e.preventDefault();
                return false;
            }
        });

        // Detect DevTools opening
        let devToolsOpened = false;
        const threshold = 160;
        
        setInterval(function() {
            if (window.outerHeight - window.innerHeight > threshold || 
                window.outerWidth - window.innerWidth > threshold) {
                if (!devToolsOpened) {
                    devToolsOpened = true;
                    console.log('%c⚠️ Admin Area - DevTools Detected', 'color: red; font-size: 20px; font-weight: bold;');
                    console.log('%cThis is a protected admin area. Your activity may be logged.', 'color: orange; font-size: 14px;');
                }
            } else {
                devToolsOpened = false;
            }
        }, 1000);

        // Anti-debugging
        let lastTime = Date.now();
        setInterval(function() {
            const currentTime = Date.now();
            if (currentTime - lastTime > 1000) {
                // Possible debugging detected
                console.clear();
            }
            lastTime = currentTime;
        }, 1000);

        // Protect page from being loaded in frame
        if (window.top !== window.self) {
            window.top.location = window.self.location;
        }

        // Disable text selection
        document.addEventListener('selectstart', function(e) {
            if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
                e.preventDefault();
                return false;
            }
        });

        // Disable drag
        document.addEventListener('dragstart', function(e) {
            e.preventDefault();
            return false;
        });
    }

    // Redirect to login if not authenticated
    function requireAuth(redirectUrl = 'admin-dashboard.html') {
        if (!isAuthenticated()) {
            window.location.href = redirectUrl;
            return false;
        }
        return true;
    }

    // Initialize session refresh
    function initSessionRefresh() {
        setInterval(function() {
            refreshSession();
        }, 60000); // Refresh every minute
    }

    // Show notification
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `admin-notification ${type}`;
        notification.innerHTML = `
            <i class="fa ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-times-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(function() {
            notification.classList.add('show');
        }, 10);
        
        setTimeout(function() {
            notification.classList.remove('show');
            setTimeout(function() {
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
        initSecurityProtections: initSecurityProtections,
        initSessionRefresh: initSessionRefresh,
        showNotification: showNotification
    };

    // Auto-initialize on page load
    document.addEventListener('DOMContentLoaded', function() {
        initSecurityProtections();
        
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
        const rememberCheckbox = document.getElementById('adminRemember');
        const errorDiv = document.getElementById('loginError');
        
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const username = usernameInput.value.trim();
            const password = passwordInput.value;
            const remember = rememberCheckbox.checked;
            
            try {
                const result = await window.AdminAuth.login(username, password, remember);
                
                if (result.success) {
                    showNotification(result.message, 'success');
                    setTimeout(function() {
                        window.location.href = 'admin-dashboard.html';
                    }, 1000);
                }
            } catch (error) {
                if (error.message) {
                    errorDiv.textContent = error.message;
                    errorDiv.style.display = 'block';
                    showNotification(error.message, 'error');
                }
            }
        });
        
        // Clear error on input
        usernameInput.addEventListener('input', function() {
            errorDiv.style.display = 'none';
        });
        passwordInput.addEventListener('input', function() {
            errorDiv.style.display = 'none';
        });
    }

})();

