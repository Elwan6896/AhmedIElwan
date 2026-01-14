
// Default posts - Empty by default, users add their own blogs via Admin Blog page
let posts = [];

// Function to open a blog post
function openBlog(i) {
 localStorage.setItem("currentBlog", i);
 location.href = "blog-single.html";
}

// Initialize blog single page
document.addEventListener('DOMContentLoaded', function() {
  // Check if we're on the blog-single page
  const blogSingleSection = document.getElementById('blog-single');
  
  if (blogSingleSection) {
    loadBlogPost();
  }
  
  // Initialize Swiper slider for blog.html page
  if (document.querySelector('.blog-slider')) {
    initBlogSlider();
  }
});

// Load blog post on blog-single.html
function loadBlogPost() {
  const currentBlogIndex = localStorage.getItem("currentBlog");
  const posts = JSON.parse(localStorage.getItem("posts")) || window.posts || [];
  
  // Elements to populate
  const blogTitle = document.getElementById('blog-title');
  const blogFeaturedImage = document.getElementById('blog-featured-image');
  const blogDate = document.getElementById('blog-date');
  const blogReadingTime = document.getElementById('blog-reading-time');
  const blogContent = document.getElementById('blog-content');
  const blogCategory = document.querySelector('.blog-category span');
  const relatedBlogsGrid = document.getElementById('related-blogs-grid');
  
  if (currentBlogIndex !== null && posts[currentBlogIndex]) {
    const post = posts[currentBlogIndex];
    
    // Populate blog data
    blogTitle.textContent = post.title;
    blogFeaturedImage.src = post.image;
    blogFeaturedImage.alt = post.title;
    blogDate.querySelector('span').textContent = post.date;
    blogCategory.textContent = post.category || 'General';
    
    // Calculate reading time
    const wordCount = post.content ? post.content.split(/\s+/).length : 0;
    const readingTime = Math.max(1, Math.ceil(wordCount / 200));
    blogReadingTime.querySelector('span').textContent = `${readingTime} min read`;
    
    // Populate content with HTML support
    blogContent.innerHTML = post.content || '<p>No content available.</p>';
    
    // Update page title
    document.title = `${post.title} - Elwan-Portfolio`;
    
    // Load related blogs (excluding current)
    loadRelatedBlogs(posts, currentBlogIndex, relatedBlogsGrid);
    
    // Show blog section, hide home section
    const homeSection = document.querySelector('.home-section');
    const blogSingle = document.querySelector('.blog-single-section');
    
    if (homeSection) homeSection.classList.remove('active');
    if (blogSingle) blogSingle.classList.add('active');
    
  } else {
    // Show error state
    showNoBlogFound();
  }
}

// Load related blogs
function loadRelatedBlogs(posts, currentIndex, container) {
  if (!container) return;
  
  // Get 3 related blogs (excluding current)
  const relatedPosts = posts
    .map((post, index) => ({ ...post, index }))
    .filter(item => item.index !== parseInt(currentIndex))
    .slice(0, 3);
  
  if (relatedPosts.length === 0) {
    container.innerHTML = '<p class="no-related">No related articles found.</p>';
    return;
  }
  
  let html = '';
  relatedPosts.forEach(post => {
    html += `
      <div class="related-blog-card" onclick="openBlog(${post.index})">
        <div class="card-image">
          <img src="${post.image}" alt="${post.title}">
        </div>
        <div class="card-content">
          <h4>${post.title}</h4>
          <div class="card-meta">
            <span><i class="far fa-calendar"></i> ${post.date}</span>
          </div>
        </div>
      </div>
    `;
  });
  
  container.innerHTML = html;
}

// Show no blog found state
function showNoBlogFound() {
  const blogHero = document.getElementById('blog-hero');
  const blogContent = document.getElementById('blog-content');
  
  if (blogHero) blogHero.style.display = 'none';
  if (blogContent) {
    blogContent.innerHTML = `
      <div class="no-blog-found">
        <i class="far fa-file-alt"></i>
        <h2>Blog Not Found</h2>
        <p>The blog post you're looking for doesn't exist or has been removed.</p>
        <a href="blog.html" class="blog-slider__button">Browse All Blogs</a>
      </div>
    `;
  }
}

// Share functions
function shareOnTwitter(e) {
  e.preventDefault();
  const post = getCurrentPost();
  if (post) {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(post.title);
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
  }
}

function shareOnLinkedIn(e) {
  e.preventDefault();
  const url = encodeURIComponent(window.location.href);
  window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
}

function shareOnFacebook(e) {
  e.preventDefault();
  const url = encodeURIComponent(window.location.href);
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
}

function copyLink(e) {
  e.preventDefault();
  navigator.clipboard.writeText(window.location.href).then(() => {
    const btn = e.currentTarget;
    const originalHTML = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check"></i>';
    setTimeout(() => {
      btn.innerHTML = originalHTML;
    }, 2000);
  });
}

// Get current post data
function getCurrentPost() {
  const currentBlogIndex = localStorage.getItem("currentBlog");
  const posts = JSON.parse(localStorage.getItem("posts")) || window.posts || [];
  if (currentBlogIndex !== null && posts[currentBlogIndex]) {
    return posts[currentBlogIndex];
  }
  return null;
}

// Initialize Swiper slider when DOM is ready (for blog.html)
function initBlogSlider() {
  // Check if Swiper is loaded
  if (typeof Swiper !== 'undefined') {
    const container = document.querySelector(".blog-slider__wrp");
    
    if (container) {
      let html = "";
      posts.forEach((p, i) => {
        html += `
          <div class="blog-slider__item swiper-slide">
            <div class="blog-slider__img">
              <img src="${p.image}" alt="${p.title}">
            </div>
            <div class="blog-slider__content">
              <span class="blog-slider__code">${p.date}</span>
              <div class="blog-slider__title">${p.title}</div>
              <div class="blog-slider__text">${p.brief}</div>
              <a href="#" onclick="openBlog(${i})" class="blog-slider__button">READ MORE</a>
            </div>
          </div>
        `;
      });
      container.innerHTML = html;
    }
    
    const swiper = new Swiper('.blog-slider', {
      // Optional parameters
      direction: 'horizontal',
      loop: true,
      speed: 800,
      grabCursor: true,
      effect: 'coverflow',
      coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 100,
        modifier: 2,
        slideShadows: false,
      },
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      spaceBetween: 30,
      slidesPerView: 1,
      
      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      
      // Pagination
      pagination: {
        el: '.blog-slider__pagination',
        clickable: true,
        dynamicBullets: false,
        renderBullet: function (index, className) {
          return '<span class="' + className + '"></span>';
        },
      },
      
      // Mouse wheel support
      mousewheel: {
        sensitivity: 1,
        eventsTarget: '.blog-slider',
      },
      
      // Keyboard support
      keyboard: {
        enabled: true,
        onlyInViewport: true,
      },
      
      // Breakpoints
      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 1,
          spaceBetween: 30,
        },
        1024: {
          slidesPerView: 1,
          spaceBetween: 30,
        },
      },
      
      // Effect transitions
      on: {
        init: function () {
          const firstSlide = this.slides[0];
          if (firstSlide) {
            firstSlide.classList.add('swiper-slide-active');
          }
        },
        slideChangeTransitionStart: function () {
          const activeSlide = this.slides[this.activeIndex];
          if (activeSlide) {
            activeSlide.style.opacity = '1';
          }
        },
      },
    });
    
    // Pause autoplay on hover
    const sliderContainer = document.querySelector('.blog-slider');
    if (sliderContainer) {
      sliderContainer.addEventListener('mouseenter', function() {
        swiper.autoplay.stop();
      });
      sliderContainer.addEventListener('mouseleave', function() {
        swiper.autoplay.start();
      });
    }
    
    console.log('Blog slider initialized successfully');
  } else {
    console.error('Swiper not loaded. Please check the CDN link.');
  }
}

// Initialize on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function() {
    initBlogSlider();
  });
} else {
  initBlogSlider();
}

