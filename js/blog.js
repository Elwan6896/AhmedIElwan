
posts = JSON.parse(localStorage.getItem("posts")) || [
  {
    title: "HTML5 Fundamentals",
    brief: "Learn the basics of HTML5 including semantic elements, forms, and multimedia support. Master the building blocks of web development.",
    date: "26 December 2019",
    image: "img/html.jpg",
    category: "Web Development",
    content: `
      <h2>Introduction to HTML5</h2>
      <p>HTML5 is the foundation of modern web development. It introduces new semantic elements, improved APIs, and better support for multimedia. In this comprehensive guide, we'll explore everything you need to know to master HTML5.</p>
      
      <h3>Semantic Elements</h3>
      <p>HTML5 introduced several semantic elements that help structure your content more meaningfully:</p>
      <ul>
        <li><code><header></code> - Represents introductory content</li>
        <li><code><nav></code> - Defines navigation links</li>
        <li><code><main></code> - Specifies the main content</li>
        <li><code><article></code> - Represents self-contained content</li>
        <li><code><section></code> - Groups thematically related content</li>
        <li><code><footer></code> - Represents a footer</li>
      </ul>
      
      <h3>Code Example</h3>
      <p>Here's a basic HTML5 document structure:</p>
      <pre><code><!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Website</title>
</head>
<body>
    <header>
        <h1>Welcome to My Website</h1>
    </header>
    <main>
        <article>
            <h2>Article Title</h2>
            <p>Article content goes here...</p>
        </article>
    </main>
    <footer>
        <p>&copy; 2024 My Website</p>
    </footer>
</body>
</html></code></pre>
      
      <h3>Forms and Input Types</h3>
      <p>HTML5 enhanced forms with new input types:</p>
      <ul>
        <li><code>email</code> - For email addresses</li>
        <li><code>url</code> - For URLs</li>
        <li><code>number</code> - For numeric input</li>
        <li><code>range</code> - For sliders</li>
        <li><code>date</code> - For date selection</li>
        <li><code>color</code> - For color picking</li>
      </ul>
      
      <blockquote>
        <p>"HTML5 is not just about new features, it's about building a better web for everyone."</p>
      </blockquote>
      
      <h3>Conclusion</h3>
      <p>Mastering HTML5 is essential for any web developer. It provides the structural foundation for all modern websites and web applications. Start practicing with semantic elements today!</p>
    `
  },
  {
    title: "CSS3 Advanced Techniques",
    brief: "Discover advanced CSS3 features like flexbox, grid, animations, and responsive design patterns for modern websites.",
    date: "26 December 2019",
    image: "img/css.png",
    category: "CSS",
    content: `
      <h2>Mastering CSS3</h2>
      <p>CSS3 has revolutionized web design with powerful features that enable stunning layouts and animations without JavaScript.</p>
      
      <h3>Flexbox Layout</h3>
      <p>Flexbox is a one-dimensional layout method for arranging items in rows or columns:</p>
      <pre><code>.container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    flex-wrap: wrap;
}

.item {
    flex: 1 1 300px;
    max-width: 400px;
}</code></pre>
      
      <h3>CSS Grid</h3>
      <p>CSS Grid is a two-dimensional layout system:</p>
      <pre><code>.grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
    grid-template-areas:
        "header header"
        "sidebar main"
        "footer footer";
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.footer { grid-area: footer; }</code></pre>
      
      <h3>Animations</h3>
      <p>Create smooth animations with CSS keyframes:</p>
      <pre><code>@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.element {
    animation: slideIn 0.5s ease forwards;
}</code></pre>
      
      <h3>Custom Properties (Variables)</h3>
      <p>CSS variables make it easy to maintain consistent theming:</p>
      <pre><code>:root {
    --primary-color: #6c5ce7;
    --secondary-color: #00b894;
    --text-color: #2d3436;
    --spacing: 16px;
}

.button {
    background: var(--primary-color);
    padding: var(--spacing) calc(var(--spacing) * 2);
}</code></pre>
    `
  },
  {
    title: "JavaScript Essentials",
    brief: "Explore JavaScript fundamentals, DOM manipulation, ES6+ features, and best practices for clean, efficient code.",
    date: "26 December 2019",
    image: "img/js.png",
    category: "JavaScript",
    content: `
      <h2>JavaScript Essentials</h2>
      <p>JavaScript is the programming language of the web. Let's explore the essential concepts every developer should know.</p>
      
      <h3>ES6+ Features</h3>
      <p>Modern JavaScript introduces powerful features:</p>
      <ul>
        <li><strong>Arrow Functions</strong> - Concise function syntax</li>
        <li><strong>Destructuring</strong> - Extract values from arrays/objects</li>
        <li><strong>Spread Operator</strong> - Expand arrays and objects</li>
        <li><strong>Classes</strong> - Object-oriented programming</li>
        <li><strong>Async/Await</strong> - Cleaner asynchronous code</li>
      </ul>
      
      <h3>Code Examples</h3>
      <pre><code>// Arrow Functions
const add = (a, b) => a + b;

// Destructuring
const user = { name: 'John', age: 30 };
const { name, age } = user;

// Spread Operator
const numbers = [1, 2, 3];
const newNumbers = [...numbers, 4, 5];

// Async/Await
async function fetchData() {
    try {
        const response = await fetch('/api/data');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}</code></pre>
      
      <h3>DOM Manipulation</h3>
      <p>Interact with web pages using the DOM:</p>
      <pre><code>// Selecting elements
const element = document.querySelector('.class');
const elements = document.querySelectorAll('.items');

// Creating elements
const div = document.createElement('div');
div.textContent = 'Hello World';
div.classList.add('highlight');

// Event handling
element.addEventListener('click', (e) => {
    console.log('Clicked!', e.target);
});</code></pre>
      
      <h3>Best Practices</h3>
      <p>Follow these guidelines for clean JavaScript code:</p>
      <ol>
        <li>Use const by default, let when needed</li>
        <li>Prefer arrow functions for callbacks</li>
        <li>Use template literals for string formatting</li>
        <li>Handle errors with try/catch</li>
        <li>Use async/await for asynchronous operations</li>
      </ol>
    `
  },
  {
    title: "Web Performance Optimization",
    brief: "Learn techniques to improve website speed and performance including lazy loading, caching, and code optimization.",
    date: "15 January 2020",
    image: "img/portfolio.png",
    category: "Performance",
    content: `
      <h2>Web Performance Optimization</h2>
      <p>Fast websites provide better user experience and better SEO rankings. Learn essential optimization techniques.</p>
      
      <h3>Image Optimization</h3>
      <p>Images often account for most of the bandwidth. Optimize them with:</p>
      <ul>
        <li>Use modern formats (WebP, AVIF)</li>
        <li>Compress images without quality loss</li>
        <li>Implement lazy loading</li>
        <li>Use responsive images with srcset</li>
      </ul>
      
      <pre><code><img 
    src="image.webp" 
    alt="Description"
    loading="lazy"
    width="800"
    height="600"
></code></pre>
      
      <h3>Code Splitting</h3>
      <p>Break your JavaScript into smaller chunks:</p>
      <pre><code>// Dynamic imports
const module = await import('./module.js');

// React lazy loading
const HeavyComponent = React.lazy(() => 
    import('./HeavyComponent')
);</code></pre>
      
      <h3>Caching Strategies</h3>
      <p>Use browser caching to reduce load times:</p>
      <pre><code>// Service Worker caching
self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request)
            .then(response => response || fetch(e.request))
    );
});</code></pre>
      
      <h3>Critical Performance Metrics</h3>
      <ul>
        <li><strong>LCP</strong> - Largest Contentful Paint</li>
        <li><strong>FID</strong> - First Input Delay</li>
        <li><strong>CLS</strong> - Cumulative Layout Shift</li>
        <li><strong>FCP</strong> - First Contentful Paint</li>
      </ul>
    `
  },
  {
    title: "Responsive Design Principles",
    brief: "Master the art of creating websites that look great on all devices using media queries and fluid layouts.",
    date: "20 February 2020",
    image: "img/problem-solving.png",
    category: "Responsive Design",
    content: `
      <h2>Responsive Design Principles</h2>
      <p>With users accessing websites from countless devices, responsive design is no longer optional—it's essential.</p>
      
      <h3>Mobile-First Approach</h3>
      <p>Design for mobile first, then enhance for larger screens:</p>
      <pre><code>/* Base styles for mobile */
.card {
    padding: 16px;
    margin-bottom: 16px;
}

/* Tablet styles */
@media (min-width: 768px) {
    .card {
        padding: 24px;
        margin-bottom: 24px;
    }
}

/* Desktop styles */
@media (min-width: 1024px) {
    .card {
        padding: 32px;
        display: flex;
        gap: 32px;
    }
}</code></pre>
      
      <h3>Fluid Grids</h3>
      <p>Use relative units instead of fixed pixels:</p>
      <pre><code>.container {
    width: 90%;
    max-width: 1200px;
    margin: 0 auto;
}

.element {
    width: calc(100% - 40px);
    padding: 2rem;
    font-size: clamp(1rem, 2vw, 1.5rem);
}</code></pre>
      
      <h3>Flexible Images</h3>
      <pre><code>img {
    max-width: 100%;
    height: auto;
    display: block;
}

/* Responsive images with picture */
<picture>
    <source media="(min-width: 1024px)" srcset="large.jpg">
    <source media="(min-width: 768px)" srcset="medium.jpg">
    <img src="small.jpg" alt="Responsive image">
</picture></code></pre>
      
      <h3>Testing Tools</h3>
      <ul>
        <li>Browser DevTools Device Mode</li>
        <li>Chrome Lighthouse</li>
        <li>PageSpeed Insights</li>
        <li>BrowserStack or similar services</li>
      </ul>
    `
  }
];

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

