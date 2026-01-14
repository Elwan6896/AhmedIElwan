/**
 * Blogs Page JavaScript
 * Loads and displays blog posts from JSON file
 * Compatible with GitHub Pages static hosting
 */

// Utility function to escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Load and display blog posts
async function loadBlogPosts() {
    const container = document.getElementById("blogsContainer");
    if (!container) {
        console.error('Blogs container not found');
        return;
    }

    try {
        const posts = await window.DataModule.getPosts();
        
        let html = "";

        // Check if there are posts
        if (posts.length === 0) {
            html = `
                <div class="blog-slider__item swiper-slide">
                    <div class="blog-slider__content" style="text-align: center; padding: 40px;">
                        <div class="blog-slider__title" style="margin-bottom: 20px;">No Blog Posts Yet</div>
                        <div class="blog-slider__text">
                            Check back soon for new content!
                        </div>
                    </div>
                </div>
            `;
        } else {
            posts.forEach((p, i) => {
                const imageUrl = p.image && p.image !== "" ? p.image : "img/html.jpg";
                const date = window.DataModule.formatDate(p.date);
                html += `
                    <div class="blog-slider__item swiper-slide">
                        <div class="blog-slider__img">
                            <img src="${imageUrl}" alt="${escapeHtml(p.title)}" onerror="this.src='img/html.jpg'">
                        </div>
                        <div class="blog-slider__content">
                            <span class="blog-slider__code">${date}</span>
                            <div class="blog-slider__title">${escapeHtml(p.title)}</div>
                            <div class="blog-slider__text">${escapeHtml(p.brief)}</div>
                            <a href="blog.html?id=${p.id}" class="blog-slider__button">READ MORE</a>
                        </div>
                    </div>
                `;
            });
        }

        container.innerHTML = html;

        // Initialize Swiper after content is loaded
        if (posts.length > 0) {
            initializeSwiper();
        }
    } catch (error) {
        console.error('Error loading blog posts:', error);
        container.innerHTML = '<p>Error loading blog posts. Please try again later.</p>';
    }
}

// Swiper Initialization
function initializeSwiper() {
    // Wait for Swiper to be available
    if (typeof Swiper !== 'undefined') {
        const swiper = new Swiper('.blog-slider__container', {
            effect: 'coverflow',
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: 'auto',
            spaceBetween: 30,
            loop: true,
            coverflowEffect: {
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
            },
            pagination: {
                el: '.blog-slider__pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.blog-slider-button-next',
                prevEl: '.blog-slider-button-prev',
            },
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            speed: 600,
            breakpoints: {
                320: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                },
                480: {
                    slidesPerView: 1,
                    spaceBetween: 30,
                },
                768: {
                    slidesPerView: 1,
                    spaceBetween: 30,
                },
                992: {
                    slidesPerView: 1,
                    spaceBetween: 30,
                },
                1200: {
                    slidesPerView: 1,
                    spaceBetween: 30,
                }
            }
        });
    } else {
        // Retry if Swiper not loaded yet
        setTimeout(initializeSwiper, 100);
    }
}

// Fallback navigation functions
function prev() {
    const swiperEl = document.querySelector('.blog-slider__container');
    if (swiperEl && swiperEl.swiper) {
        swiperEl.swiper.slidePrev();
    }
}

function next() {
    const swiperEl = document.querySelector('.blog-slider__container');
    if (swiperEl && swiperEl.swiper) {
        swiperEl.swiper.slideNext();
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', loadBlogPosts);

