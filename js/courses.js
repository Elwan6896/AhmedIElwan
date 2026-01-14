/**
 * Courses Page JavaScript
 * Handles course preview with contact-to-join functionality
 * Loads courses from localStorage (managed by admin-courses.html)
 */

// ============================================
// DYNAMIC COURSE LOADING FROM LOCALSTORAGE
// ============================================

// Get course ID from URL parameters
function getCourseIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('course');
}

// Load course data from localStorage or use default
function getCoursesData() {
    const storedCourses = localStorage.getItem('courses');
    if (storedCourses) {
        return JSON.parse(storedCourses);
    }
    // Fallback to default courses if localStorage is empty
    return coursesDefaultData;
}

// Default courses data (fallback)
const coursesDefaultData = {
    'web-dev': {
        id: 'web-dev',
        title: 'Web Development Bootcamp',
        subtitle: 'Master HTML, CSS & JavaScript from scratch and build modern, responsive websites',
        image: 'img/html.jpg',
        level: 'beginner',
        levelText: 'Beginner Level',
        duration: '12 Weeks',
        lessons: '48 Lessons',
        price: 'Premium Course',
        topics: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design'],
        previewVideos: [
            {
                title: 'Introduction to Web Development',
                duration: '15:30',
                description: 'Learn the fundamentals of how the web works and set up your development environment.'
            },
            {
                title: 'Your First Web Page',
                duration: '22:45',
                description: 'Build your first HTML page from scratch with proper structure and elements.'
            }
        ],
        includes: ['48 Video Lessons', '12 Weeks Duration', 'Downloadable Resources', 'Mobile Access', 'Certificate of Completion', 'Lifetime Access']
    },
    'javascript': {
        id: 'javascript',
        title: 'JavaScript Mastery',
        subtitle: 'Advanced JavaScript concepts and patterns for building professional applications',
        image: 'img/js.png',
        level: 'intermediate',
        levelText: 'Intermediate Level',
        duration: '8 Weeks',
        lessons: '36 Lessons',
        price: 'Premium Course',
        topics: ['ES6+ Features', 'Data Structures', 'DOM Manipulation', 'API Integration'],
        previewVideos: [
            {
                title: 'ES6+ Modern Features',
                duration: '18:20',
                description: 'Explore modern JavaScript features including arrow functions, destructuring, and template literals.'
            },
            {
                title: 'Deep Dive: Closures & Scope',
                duration: '25:15',
                description: 'Master closures, scope chains, and the `this` keyword for advanced JavaScript development.'
            }
        ],
        includes: ['36 Video Lessons', '8 Weeks Duration', 'Downloadable Resources', 'Mobile Access', 'Certificate of Completion', 'Lifetime Access']
    },
    'react': {
        id: 'react',
        title: 'React & Modern Frontend',
        subtitle: 'Build modern single-page applications with React and related technologies',
        image: 'img/AI.png',
        level: 'advanced',
        levelText: 'Advanced Level',
        duration: '10 Weeks',
        lessons: '42 Lessons',
        price: 'Premium Course',
        topics: ['React Fundamentals', 'State Management', 'Performance', 'Deployment'],
        previewVideos: [
            {
                title: 'Introduction to React',
                duration: '20:00',
                description: 'Learn the core concepts of React and understand why it\'s the most popular frontend framework.'
            },
            {
                title: 'Components & Props Deep Dive',
                duration: '28:30',
                description: 'Master React components, props, and how to build reusable UI elements.'
            }
        ],
        includes: ['42 Video Lessons', '10 Weeks Duration', 'Downloadable Resources', 'Mobile Access', 'Certificate of Completion', 'Lifetime Access']
    },
    'wordpress': {
        id: 'wordpress',
        title: 'WordPress Development',
        subtitle: 'Create custom themes, plugins, and e-commerce solutions with WordPress',
        image: 'img/wordpress.png',
        level: 'beginner',
        levelText: 'Beginner Level',
        duration: '6 Weeks',
        lessons: '24 Lessons',
        price: 'Premium Course',
        topics: ['WordPress Setup', 'Theme Customization', 'Plugin Development', 'WooCommerce'],
        previewVideos: [
            {
                title: 'WordPress Installation & Setup',
                duration: '12:45',
                description: 'Install and configure WordPress locally and on your server for development.'
            },
            {
                title: 'Dashboard Overview & Content Management',
                duration: '18:20',
                description: 'Navigate the WordPress dashboard and learn to manage posts, pages, and media.'
            }
        ],
        includes: ['24 Video Lessons', '6 Weeks Duration', 'Downloadable Resources', 'Mobile Access', 'Certificate of Completion', 'Lifetime Access']
    }
};

// Contact info for joining course group
const contactInfo = {
    whatsapp: 'https://wa.me/201002076939',
    message: 'Hi Ahmed, I\'m interested in joining your course. Please add me to the course group.'
};

// Load course data into the page
function loadCourseData(courseId) {
    // Try to get course from localStorage first
    let course = null;
    const storedCourses = getCoursesData();
    
    if (Array.isArray(storedCourses)) {
        // Find course in array by ID
        course = storedCourses.find(c => c.id === courseId);
    } else if (storedCourses && storedCourses[courseId]) {
        // Course is stored as object with ID as key
        course = storedCourses[courseId];
    }
    
    // Fallback to default if not found
    if (!course && coursesDefaultData[courseId]) {
        course = coursesDefaultData[courseId];
    }
    
    if (!course) {
        console.warn(`Course with ID "${courseId}" not found.`);
        return false;
    }
    
    // Update page title
    document.title = `${course.title} - Elwan-Portfolio`;
    
    // Update course header
    const levelBadge = document.getElementById('courseLevelBadge');
    if (levelBadge) {
        levelBadge.textContent = course.level.charAt(0).toUpperCase() + course.level.slice(1);
        levelBadge.className = `course-level-badge ${course.level}`;
    }
    
    const title = document.getElementById('courseTitle');
    if (title) title.textContent = course.title;
    
    const subtitle = document.getElementById('courseSubtitle');
    if (subtitle) subtitle.textContent = course.subtitle;
    
    const image = document.getElementById('courseImage');
    if (image) {
        image.src = course.image;
        image.alt = course.title;
    }
    
    // Update meta info
    if (document.getElementById('courseDuration')) document.getElementById('courseDuration').textContent = course.duration;
    if (document.getElementById('courseLessons')) document.getElementById('courseLessons').textContent = course.lessons;
    if (document.getElementById('courseLevel')) document.getElementById('courseLevel').textContent = course.levelText;
    
    // Update modal
    const modalCourseName = document.getElementById('modalCourseName');
    if (modalCourseName) modalCourseName.textContent = course.title;
    
    // Update price
    const priceElement = document.querySelector('.price-tag .price');
    if (priceElement) priceElement.textContent = course.price;
    
    // Update course includes in sidebar
    const includesList = document.querySelector('.course-includes ul');
    if (includesList && course.includes) {
        includesList.innerHTML = course.includes.map(item => `<li><i class="fas fa-check"></i> ${item}</li>`).join('');
    }
    
    // Update preview videos section - Load from admin page data
    const previewSection = document.getElementById('previewVideosSection');
    const previewList = document.getElementById('previewVideosList');
    if (previewSection && previewList && course.previewVideos) {
        previewList.innerHTML = course.previewVideos.map((video, index) => `
            <div class="preview-video-card outer-shadow">
                <div class="video-thumbnail">
                    <div class="play-icon">
                        <i class="fas fa-play"></i>
                    </div>
                    <span class="video-duration">${video.duration}</span>
                </div>
                <div class="video-info">
                    <span class="video-number">${index + 1}</span>
                    <h4>${video.title}</h4>
                    <p>${video.description}</p>
                </div>
            </div>
        `).join('');
    }
    
    return true;
}

// ============================================
// MAIN INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Load course data if on courses-single.html
    const courseId = getCourseIdFromUrl();
    if (courseId) {
        loadCourseData(courseId);
    }
    
    // DOM Elements
    const enrollBtn = document.getElementById('enrollBtn');
    const modalClose = document.getElementById('modalClose');
    const enrollModal = document.getElementById('enrollModal');
    
    // ============================================
    // MODAL FUNCTIONALITY
    // ============================================
    
    // Open Modal - Redirect to WhatsApp
    if (enrollBtn) {
        enrollBtn.addEventListener('click', function() {
            // Open WhatsApp directly
            const whatsappUrl = `${contactInfo.whatsapp}?text=${encodeURIComponent(contactInfo.message)}`;
            window.open(whatsappUrl, '_blank');
        });
    }
    
    // Close Modal
    function closeModal() {
        if (enrollModal) {
            enrollModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
    
    // Close on overlay click
    if (enrollModal) {
        enrollModal.addEventListener('click', function(e) {
            if (e.target === enrollModal) {
                closeModal();
            }
        });
    }
    
    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && enrollModal && enrollModal.classList.contains('active')) {
            closeModal();
        }
    });
    
    // ============================================
    // SCROLL EFFECTS
    // ============================================
    
    // Header image parallax effect on scroll
    const courseHeaderImage = document.querySelector('.course-header-image');
    
    if (courseHeaderImage) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.3;
            
            if (scrolled < 500) {
                courseHeaderImage.style.transform = `translateY(${rate}px)`;
            }
        });
    }
    
    // Smooth scroll for back link
    const backLink = document.querySelector('.back-link');
    
    if (backLink) {
        backLink.addEventListener('click', function(e) {
            e.preventDefault();
            window.history.back();
        });
    }
    
    // ============================================
    // ANIMATE ON SCROLL
    // ============================================
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe course blocks
    const courseBlocks = document.querySelectorAll('.course-block, .course-sidebar > div');
    
    courseBlocks.forEach((block, index) => {
        block.style.opacity = '0';
        block.style.transform = 'translateY(30px)';
        block.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(block);
    });
});

// ============================================
// ADD ANIMATION KEYFRAMES
// ============================================

const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOut {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
    
    @keyframes fadeInLeft {
        from {
            opacity: 0;
            transform: translateX(-30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes fadeInRight {
        from {
            opacity: 0;
            transform: translateX(30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes scaleIn {
        from {
            opacity: 0;
            transform: scale(0);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
`;
document.head.appendChild(style);

