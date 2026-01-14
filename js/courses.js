/**
 * Courses Page JavaScript
 * Handles course loading from JSON file
 * Compatible with GitHub Pages static hosting
 */

// ============================================
// GET COURSE ID FROM URL
// ============================================

function getCourseIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('course');
}

// ============================================
// LOAD COURSE DATA FROM JSON
// ============================================

async function loadCourseData(courseId) {
    try {
        const course = await window.DataModule.getCourseById(courseId);
        
        if (!course) {
            console.warn(`Course with ID "${courseId}" not found.`);
            return false;
        }
        
        // Update page title
        document.title = `${window.DataModule.escapeHtml(course.title)} - Elwan-Portfolio`;
        
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
            image.onerror = function() { this.src = 'img/html.jpg'; };
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
        
        // Update preview videos section
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
    } catch (error) {
        console.error('Error loading course:', error);
        return false;
    }
}

// ============================================
// CONTACT INFO
// ============================================

const contactInfo = {
    whatsapp: 'https://wa.me/201002076939',
    message: 'Hi Ahmed, I\'m interested in joining your course. Please add me to the course group.'
};

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

// Export functions
window.loadCourseData = loadCourseData;
window.getCourseIdFromUrl = getCourseIdFromUrl;

