let editIndex = null;
let uploadedImage = null;

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeImageUpload();
    initializeCharacterCount();
    initializeTabs();
    renderList();
});

// ========== Local Storage Functions ==========
function getPosts() {
    return JSON.parse(localStorage.getItem("posts")) || [];
}

// ========== Save Post Function ==========
function savePost(event) {
    if (event) {
        event.preventDefault();
    }

    const title = document.getElementById('title').value.trim();
    const brief = document.getElementById('brief').value.trim();
    const imageInput = document.getElementById('image').value.trim();
    const content = document.getElementById('content').value.trim();

    // Validate required fields
    if (!title || !brief || !content) {
        showToast('Please fill in all required fields', 'error');
        return;
    }

    let posts = getPosts();

    // Determine image URL (uploaded file or URL input)
    let imageUrl = imageInput;
    if (uploadedImage) {
        imageUrl = uploadedImage;
    }
    
    // Use default image if no image provided
    if (!imageUrl) {
        imageUrl = "img/html.jpg";
    }

    let post = {
        title: title,
        brief: brief,
        content: content,
        image: imageUrl,
        date: new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        }),
        id: Date.now()
    };

    if (editIndex !== null) {
        // Update existing post
        posts[editIndex] = post;
        showToast('Post updated successfully!', 'success');
    } else {
        // Add new post
        posts.unshift(post);
        showToast('Post created successfully!', 'success');
    }

    localStorage.setItem("posts", JSON.stringify(posts));
    clearForm();
    renderList();
}

// ========== Clear Form ==========
function clearForm() {
    document.getElementById('title').value = "";
    document.getElementById('brief').value = "";
    document.getElementById('image').value = "";
    document.getElementById('content').value = "";
    
    // Clear uploaded image
    uploadedImage = null;
    document.getElementById('imagePreview').classList.remove('show');
    document.getElementById('uploadArea').style.display = 'block';
    
    // Reset edit mode
    editIndex = null;
    
    // Reset character counts
    document.getElementById('briefCount').textContent = '0';
    document.getElementById('contentCount').textContent = '0';
    
    // Reset form button
    const saveBtn = document.querySelector('.btn-save');
    saveBtn.innerHTML = '<i class="fa fa-save"></i> Save Post';
}

// ========== Render Posts List ==========
function renderList() {
    let posts = getPosts();
    const listContainer = document.getElementById('list');
    const postsCount = document.getElementById('postsCount');
    
    // Update posts count
    postsCount.textContent = `${posts.length} post${posts.length !== 1 ? 's' : ''}`;

    if (posts.length === 0) {
        listContainer.innerHTML = `
            <div class="empty-state">
                <i class="fa fa-folder-open"></i>
                <h4>No posts yet</h4>
                <p>Create your first blog post using the form above</p>
            </div>
        `;
        return;
    }

    listContainer.innerHTML = "";
    
    posts.forEach((p, i) => {
        const card = document.createElement('div');
        card.className = 'post-card';
        card.style.animationDelay = `${i * 0.1}s`;
        
        // Get image URL or use placeholder
        const imageUrl = p.image && p.image !== "" ? p.image : "img/html.jpg";
        
        card.innerHTML = `
            <div class="post-thumbnail">
                <img src="${imageUrl}" alt="${p.title}" onerror="this.src='img/html.jpg'">
            </div>
            <div class="post-info">
                <h4>${escapeHtml(p.title)}</h4>
                <p>${escapeHtml(p.brief)}</p>
                <div class="post-meta">
                    <span><i class="fa fa-calendar"></i> ${p.date}</span>
                </div>
            </div>
            <div class="post-actions">
                <button class="action-btn btn-edit" onclick="editPost(${i})" title="Edit">
                    <i class="fa fa-edit"></i>
                </button>
                <button class="action-btn btn-delete" onclick="deletePost(${i})" title="Delete">
                    <i class="fa fa-trash"></i>
                </button>
            </div>
        `;
        
        listContainer.appendChild(card);
    });
}

// ========== Edit Post ==========
function editPost(i) {
    let p = getPosts()[i];
    
    document.getElementById('title').value = p.title;
    document.getElementById('brief').value = p.brief;
    document.getElementById('content').value = p.content;
    
    // Handle image
    if (p.image && p.image.startsWith('data:')) {
        // It's a base64 uploaded image
        uploadedImage = p.image;
        showImagePreview(p.image);
    } else {
        // It's a URL
        document.getElementById('image').value = p.image;
    }
    
    editIndex = i;
    
    // Update button text
    const saveBtn = document.querySelector('.btn-save');
    saveBtn.innerHTML = '<i class="fa fa-sync-alt"></i> Update Post';
    
    // Scroll to form
    document.querySelector('.blog-form').scrollIntoView({ behavior: 'smooth' });
    
    showToast('Editing post - make changes and save', 'success');
}

// ========== Delete Post ==========
function deletePost(i) {
    if (confirm('Are you sure you want to delete this post?')) {
        let posts = getPosts();
        posts.splice(i, 1);
        localStorage.setItem("posts", JSON.stringify(posts));
        renderList();
        showToast('Post deleted successfully', 'success');
    }
}

// ========== Image Upload Functions ==========
function initializeImageUpload() {
    const uploadArea = document.getElementById('uploadArea');
    const imageFile = document.getElementById('imageFile');
    
    // Click to upload
    uploadArea.addEventListener('click', () => {
        imageFile.click();
    });
    
    // File input change
    imageFile.addEventListener('change', (e) => {
        if (e.target.files && e.target.files[0]) {
            handleImageUpload(e.target.files[0]);
        }
    });
    
    // Drag and drop
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });
    
    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('dragover');
    });
    
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleImageUpload(e.dataTransfer.files[0]);
        }
    });
}

function handleImageUpload(file) {
    // Validate file type
    if (!file.type.startsWith('image/')) {
        showToast('Please select an image file', 'error');
        return;
    }
    
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
        showToast('Image size must be less than 5MB', 'error');
        return;
    }
    
    const reader = new FileReader();
    
    reader.onload = (e) => {
        uploadedImage = e.target.result;
        showImagePreview(uploadedImage);
        showToast('Image uploaded successfully!', 'success');
    };
    
    reader.readAsDataURL(file);
}

function showImagePreview(src) {
    const preview = document.getElementById('imagePreview');
    const uploadArea = document.getElementById('uploadArea');
    const previewImg = document.getElementById('previewImg');
    
    previewImg.src = src;
    preview.classList.add('show');
    uploadArea.style.display = 'none';
}

function removeImage() {
    uploadedImage = null;
    document.getElementById('imagePreview').classList.remove('show');
    document.getElementById('uploadArea').style.display = 'block';
    document.getElementById('imageFile').value = '';
}

// ========== Tab Functions ==========
function initializeTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and content
            tabBtns.forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            btn.classList.add('active');
            const tabId = btn.getAttribute('data-tab');
            document.getElementById(tabId + '-tab').classList.add('active');
        });
    });
}

// ========== Character Count Functions ==========
function initializeCharacterCount() {
    const briefInput = document.getElementById('brief');
    const contentTextarea = document.getElementById('content');
    const briefCount = document.getElementById('briefCount');
    const contentCount = document.getElementById('contentCount');
    
    briefInput.addEventListener('input', () => {
        briefCount.textContent = briefInput.value.length;
    });
    
    contentTextarea.addEventListener('input', () => {
        contentCount.textContent = contentTextarea.value.length;
    });
}

// ========== Toast Notification ==========
function showToast(message, type = 'success') {
    // Remove existing toast
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <i class="fa ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(toast);
    
    // Show toast
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    // Hide toast after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 400);
    }, 3000);
}

// ========== Utility Functions ==========
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}



/*---------------مؤشر الماوس------------*/
const cursor = document.querySelector('.cursor');
const cursorDot = document.querySelector('.cursor-dot');

document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';

  cursorDot.style.left = e.clientX + 'px';
  cursorDot.style.top = e.clientY + 'px';
});