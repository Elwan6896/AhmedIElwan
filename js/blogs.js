// Get posts from localStorage
let posts = JSON.parse(localStorage.getItem("posts")) || [];
let container = document.getElementById("blogsContainer");

let html = "";

// Check if there are posts
if (posts.length === 0) {
    html = `
        <div class="blog-slider__item swiper-slide">
            <div class="blog-slider__content" style="text-align: center; padding: 40px;">
                <div class="blog-slider__title" style="margin-bottom: 20px;">No Blog Posts Yet</div>
                <div class="blog-slider__text">
                    Visit the <a href="admin-blog.html" style="color: var(--skin-color);">Admin Blog page</a> 
                    to create your first blog post.
                </div>
            </div>
        </div>
    `;
} else {
    posts.forEach((p, i) => {
        const imageUrl = p.image && p.image !== "" ? p.image : "img/html.jpg";
        html += `
            <div class="blog-slider__item swiper-slide">
                <div class="blog-slider__img">
                    <img src="${imageUrl}" alt="${p.title}" onerror="this.src='img/html.jpg'">
                </div>
                <div class="blog-slider__content">
                    <span class="blog-slider__code">${p.date}</span>
                    <div class="blog-slider__title">${escapeHtml(p.title)}</div>
                    <div class="blog-slider__text">${escapeHtml(p.brief)}</div>
                    <a href="#" onclick="openBlog(${i})" class="blog-slider__button">READ MORE</a>
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

// Function to open blog post
function openBlog(i) {
    localStorage.setItem("currentBlog", i);
    location.href = "blog.html";
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

// Utility function to escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
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

