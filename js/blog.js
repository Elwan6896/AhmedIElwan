/**
 * Blog Single Page JavaScript
 * Loads and displays a single blog post from JSON file
 * Compatible with GitHub Pages static hosting
 */

// Utility function to escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Initialize blog single page
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the blog-single page
    const blogSingleSection = document.getElementById('blog-single');
    
    if (blogSingleSection) {
        loadBlogPost();
    }
});

// Load blog post on blog-single.html
async function loadBlogPost() {
    // Get blog ID from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const blogId = urlParams.get('id');
    
    // Elements to populate
    const blogTitle = document.getElementById('blog-title');
    const blogFeaturedImage = document.getElementById('blog-featured-image');
    const blogDate = document.getElementById('blog-date');
    const blogReadingTime = document.getElementById('blog-reading-time');
    const blogContent = document.getElementById('blog-content');
    const blogCategory = document.querySelector('.blog-category span');
    const relatedBlogsGrid = document.getElementById('related-blogs-grid');
    
    if (!blogId) {
        showNoBlogFound();
        return;
    }
    
    try {
        // Load all posts to find the one with matching ID
        const posts = await window.DataModule.getPosts();
        const post = posts.find(p => p.id == blogId);
        
        if (post) {
            // Populate blog data
            blogTitle.textContent = escapeHtml(post.title);
            blogFeaturedImage.src = post.image;
            blogFeaturedImage.alt = escapeHtml(post.title);
            blogFeaturedImage.onerror = function() { this.src = 'img/html.jpg'; };
            
            const formattedDate = window.DataModule.formatDate(post.date);
            if (blogDate) {
                const dateSpan = blogDate.querySelector('span');
                if (dateSpan) dateSpan.textContent = formattedDate;
            }
            
            if (blogCategory) blogCategory.textContent = 'Blog';
            
            // Calculate reading time
            const wordCount = post.content ? post.content.split(/\s+/).length : 0;
            const readingTime = Math.max(1, Math.ceil(wordCount / 200));
            if (blogReadingTime) {
                const timeSpan = blogReadingTime.querySelector('span');
                if (timeSpan) timeSpan.textContent = `${readingTime} min read`;
            }
            
            // Populate content with HTML support
            if (blogContent) {
                blogContent.innerHTML = post.content ? escapeHtml(post.content).replace(/\n/g, '<br>') : '<p>No content available.</p>';
            }
            
            // Update page title
            document.title = `${escapeHtml(post.title)} - Elwan-Portfolio`;
            
            // Load related blogs (excluding current)
            await loadRelatedBlogs(posts, blogId, relatedBlogsGrid);
            
            // Show blog section, hide home section
            const homeSection = document.querySelector('.home-section');
            const blogSingle = document.querySelector('.blog-single-section');
            
            if (homeSection) homeSection.classList.remove('active');
            if (blogSingle) blogSingle.classList.add('active');
        } else {
            showNoBlogFound();
        }
    } catch (error) {
        console.error('Error loading blog post:', error);
        showNoBlogFound();
    }
}

// Load related blogs
async function loadRelatedBlogs(posts, currentId, container) {
    if (!container) return;
    
    // Get 3 related blogs (excluding current)
    const relatedPosts = posts
        .filter(post => post.id != currentId)
        .slice(0, 3);
    
    if (relatedPosts.length === 0) {
        container.innerHTML = '<p class="no-related">No related articles found.</p>';
        return;
    }
    
    let html = '';
    relatedPosts.forEach(post => {
        const imageUrl = post.image && post.image !== "" ? post.image : "img/html.jpg";
        const formattedDate = window.DataModule.formatDate(post.date);
        html += `
            <div class="related-blog-card" onclick="window.location.href='blog.html?id=${post.id}'">
                <div class="card-image">
                    <img src="${imageUrl}" alt="${escapeHtml(post.title)}" onerror="this.src='img/html.jpg'">
                </div>
                <div class="card-content">
                    <h4>${escapeHtml(post.title)}</h4>
                    <div class="card-meta">
                        <span><i class="far fa-calendar"></i> ${formattedDate}</span>
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
            <div class="no-blog-found" style="text-align: center; padding: 60px 20px;">
                <i class="far fa-file-alt" style="font-size: 64px; color: var(--skin-color); margin-bottom: 20px;"></i>
                <h2 style="color: var(--text-black-900); margin-bottom: 15px;">Blog Not Found</h2>
                <p style="color: var(--text-black-700); margin-bottom: 30px;">The blog post you're looking for doesn't exist or has been removed.</p>
                <a href="blog.html" class="blog-slider__button" style="display: inline-block;">Browse All Blogs</a>
            </div>
        `;
    }
}

// Share functions
function shareOnTwitter(e) {
    e.preventDefault();
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${title}`, '_blank');
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
        const icon = btn.querySelector('i');
        if (icon) {
            const originalClass = icon.className;
            icon.className = 'fas fa-check';
            setTimeout(() => {
                icon.className = originalClass;
            }, 2000);
        }
    });
}

// Make functions globally available
window.loadBlogPost = loadBlogPost;
window.showNoBlogFound = showNoBlogFound;
window.shareOnTwitter = shareOnTwitter;
window.shareOnLinkedIn = shareOnLinkedIn;
window.shareOnFacebook = shareOnFacebook;
window.copyLink = copyLink;

