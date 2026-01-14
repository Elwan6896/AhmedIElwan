/**
 * Admin Courses Management JavaScript
 * Handles CRUD operations for courses with preview videos
 */

let editIndex = null;
let uploadedImage = null;
let previewVideos = [];

// Default courses data to initialize localStorage if empty
const adminDefaultCourses = [
    {
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
    {
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
    {
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
    {
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
];

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeImageUpload();
    initializeTabs();
    initializeDefaultCourses();
    renderCoursesList();
    
    // Add initial preview video
    addPreviewVideo();
    addPreviewVideo();
});

// ========== Local Storage Functions ==========

function initializeDefaultCourses() {
    let courses = getCourses();
    if (courses.length === 0) {
        localStorage.setItem("courses", JSON.stringify(adminDefaultCourses));
    }
}

function getCourses() {
    return JSON.parse(localStorage.getItem("courses")) || [];
}

function setCourses(courses) {
    localStorage.setItem("courses", JSON.stringify(courses));
}

// ========== Save Course Function ==========

function saveCourse(event) {
    console.log('Save course function called');
    if (event) {
        event.preventDefault();
        console.log('Event prevented');
    }

    try {
        const courseId = document.getElementById('courseId').value.trim();
        const courseTitle = document.getElementById('courseTitle').value.trim();
        const courseSubtitle = document.getElementById('courseSubtitle').value.trim();
        const courseLevel = document.getElementById('courseLevel').value;
        const courseDuration = document.getElementById('courseDuration').value.trim();
        const courseLessons = document.getElementById('courseLessons').value.trim();
        const courseTopicsInput = document.getElementById('courseTopics').value.trim();
        const courseIncludesInput = document.getElementById('courseIncludes').value.trim();
        const imageInput = document.getElementById('courseImage').value.trim();

        console.log('Form data collected:', { courseId, courseTitle, courseLevel, courseDuration, courseLessons });

        // Validate required fields
        if (!courseId || !courseTitle || !courseSubtitle || !courseDuration || !courseLessons) {
            showToast('Please fill in all required fields', 'error');
            console.log('Validation failed: missing required fields');
            return;
        }

        // Get existing courses
        let courses = getCourses();
        console.log('Current courses count:', courses.length);

        // Check for duplicate ID (except when editing)
        const existingIndex = courses.findIndex(c => c.id === courseId);
        if (existingIndex !== -1 && editIndex !== existingIndex) {
            showToast('A course with this ID already exists. Please use a different ID.', 'error');
            return;
        }

        // Determine image URL (uploaded file or URL input)
        let imageUrl = imageInput;
        if (uploadedImage) {
            imageUrl = uploadedImage;
        }
        
        // Use default image if no image provided
        if (!imageUrl) {
            imageUrl = "img/html.jpg";
        }

        // Parse topics
        const topics = courseTopicsInput ? courseTopicsInput.split(',').map(t => t.trim()).filter(t => t) : [];
        
        // Parse includes
        const includes = courseIncludesInput ? courseIncludesInput.split(',').map(i => i.trim()).filter(i => i) : [];

        // Build course object
        let course = {
            id: courseId,
            title: courseTitle,
            subtitle: courseSubtitle,
            image: imageUrl,
            level: courseLevel,
            levelText: courseLevel.charAt(0).toUpperCase() + courseLevel.slice(1) + ' Level',
            duration: courseDuration,
            lessons: courseLessons,
            price: 'Premium Course',
            topics: topics,
            previewVideos: previewVideos,
            includes: includes
        };

        if (editIndex !== null && editIndex < courses.length) {
            // Update existing course
            courses[editIndex] = course;
            showToast('Course updated successfully!', 'success');
            console.log('Course updated:', course.title);
        } else {
            // Add new course
            courses.push(course);
            showToast('Course created successfully!', 'success');
            console.log('New course created:', course.title);
        }

        setCourses(courses);
        clearForm();
        renderCoursesList();
        console.log('Save course completed successfully');
    } catch (error) {
        console.error('Error saving course:', error);
        showToast('Error saving course: ' + error.message, 'error');
    }
}

// ========== Clear Form ==========

function clearForm() {
    console.log('Clearing form...');
    try {
        document.getElementById('courseId').value = "";
        document.getElementById('courseTitle').value = "";
        document.getElementById('courseSubtitle').value = "";
        document.getElementById('courseLevel').value = "beginner";
        document.getElementById('courseDuration').value = "";
        document.getElementById('courseLessons').value = "";
        document.getElementById('courseTopics').value = "";
        document.getElementById('courseIncludes').value = "";
        document.getElementById('courseImage').value = "";
        
        // Clear uploaded image
        uploadedImage = null;
        const imagePreview = document.getElementById('courseImagePreview');
        const uploadArea = document.getElementById('courseUploadArea');
        if (imagePreview) imagePreview.classList.remove('show');
        if (uploadArea) uploadArea.style.display = 'block';
        
        // Reset edit mode
        editIndex = null;
        
        // Clear preview videos and re-add defaults
        previewVideos = [];
        const videosContainer = document.getElementById('previewVideosContainer');
        if (videosContainer) videosContainer.innerHTML = '';
        addPreviewVideo();
        addPreviewVideo();
        
        // Reset form button
        const saveBtn = document.querySelector('.btn-save');
        if (saveBtn) saveBtn.innerHTML = '<i class="fa fa-save"></i> Save Course';
        
        // Enable course ID field
        const courseIdField = document.getElementById('courseId');
        if (courseIdField) courseIdField.disabled = false;
        
        console.log('Form cleared successfully');
    } catch (error) {
        console.error('Error clearing form:', error);
    }
}

// ========== Render Courses List ==========

function renderCoursesList() {
    let courses = getCourses();
    const listContainer = document.getElementById('coursesList');
    const coursesCount = document.getElementById('coursesCount');
    
    // Update courses count
    coursesCount.textContent = `${courses.length} course${courses.length !== 1 ? 's' : ''}`;

    if (courses.length === 0) {
        listContainer.innerHTML = `
            <div class="empty-state">
                <i class="fa fa-graduation-cap"></i>
                <h4>No courses yet</h4>
                <p>Create your first course using the form above</p>
            </div>
        `;
        return;
    }

    listContainer.innerHTML = "";
    
    courses.forEach((course, i) => {
        const card = document.createElement('div');
        card.className = 'course-admin-card';
        card.style.animationDelay = `${i * 0.1}s`;
        
        // Get image URL or use placeholder
        const imageUrl = course.image && course.image !== "" ? course.image : "img/html.jpg";
        
        // Format topics
        const topicsText = course.topics ? course.topics.slice(0, 4).join(', ') : 'No topics';
        
        card.innerHTML = `
            <div class="course-admin-thumbnail">
                <img src="${imageUrl}" alt="${course.title}" onerror="this.src='img/html.jpg'">
                <span class="course-level-badge ${course.level}">${course.level}</span>
            </div>
            <div class="course-admin-info">
                <h4>${escapeHtml(course.title)}</h4>
                <p>${escapeHtml(course.subtitle)}</p>
                <div class="course-admin-meta">
                    <span><i class="fa fa-clock"></i> ${course.duration}</span>
                    <span><i class="fa fa-video"></i> ${course.lessons}</span>
                    <span><i class="fa fa-play-circle"></i> ${course.previewVideos ? course.previewVideos.length : 0} videos</span>
                </div>
                <div class="course-admin-topics">
                    <strong>Topics:</strong> ${escapeHtml(topicsText)}
                </div>
            </div>
            <div class="course-admin-actions">
                <button class="action-btn btn-edit" onclick="editCourse(${i})" title="Edit">
                    <i class="fa fa-edit"></i>
                </button>
                <button class="action-btn btn-delete" onclick="deleteCourse(${i})" title="Delete">
                    <i class="fa fa-trash"></i>
                </button>
                <a href="courses-single.html?course=${course.id}" target="_blank" class="action-btn btn-view" title="View">
                    <i class="fa fa-eye"></i>
                </a>
            </div>
        `;
        
        listContainer.appendChild(card);
    });
}

// ========== Edit Course ==========

function editCourse(i) {
    console.log('Editing course at index:', i);
    try {
        let courses = getCourses();
        let course = courses[i];
        
        document.getElementById('courseId').value = course.id;
        document.getElementById('courseTitle').value = course.title;
        document.getElementById('courseSubtitle').value = course.subtitle;
        document.getElementById('courseLevel').value = course.level || 'beginner';
        document.getElementById('courseDuration').value = course.duration;
        document.getElementById('courseLessons').value = course.lessons;
        document.getElementById('courseTopics').value = course.topics ? course.topics.join(', ') : '';
        document.getElementById('courseIncludes').value = course.includes ? course.includes.join(', ') : '';
        
        // Handle image
        if (course.image) {
            if (course.image.startsWith('data:')) {
                // It's a base64 uploaded image
                uploadedImage = course.image;
                showCourseImagePreview(course.image);
            } else {
                // It's a URL
                document.getElementById('courseImage').value = course.image;
            }
        }
        
        // Load preview videos
        previewVideos = course.previewVideos || [];
        renderPreviewVideos();
        
        editIndex = i;
        
        // Disable course ID field (can't change ID)
        document.getElementById('courseId').disabled = true;
        
        // Update button text
        const saveBtn = document.querySelector('.btn-save');
        saveBtn.innerHTML = '<i class="fa fa-sync-alt"></i> Update Course';
        
        // Scroll to form
        document.querySelector('.course-form').scrollIntoView({ behavior: 'smooth' });
        
        showToast('Editing course - make changes and save', 'success');
        console.log('Course loaded for editing:', course.title);
    } catch (error) {
        console.error('Error editing course:', error);
        showToast('Error loading course for editing', 'error');
    }
}

// ========== Delete Course ==========

function deleteCourse(i) {
    console.log('Deleting course at index:', i);
    try {
        if (confirm('Are you sure you want to delete this course?')) {
            let courses = getCourses();
            const courseTitle = courses[i] ? courses[i].title : 'this course';
            courses.splice(i, 1);
            setCourses(courses);
            renderCoursesList();
            showToast('Course deleted successfully', 'success');
            console.log('Course deleted:', courseTitle);
        }
    } catch (error) {
        console.error('Error deleting course:', error);
        showToast('Error deleting course', 'error');
    }
}

// ========== Preview Videos Management ==========

function addPreviewVideo() {
    console.log('Adding preview video...');
    try {
        const videoIndex = previewVideos.length;
        const video = {
            title: '',
            duration: '',
            description: ''
        };
        previewVideos.push(video);
        renderPreviewVideos();
        console.log('Preview video added successfully. Total:', previewVideos.length);
        showToast('Preview video added', 'success');
    } catch (error) {
        console.error('Error adding preview video:', error);
        showToast('Error adding preview video', 'error');
    }
}

function removePreviewVideo(index) {
    console.log('Removing preview video at index:', index);
    try {
        if (previewVideos.length <= 1) {
            showToast('You need at least one preview video', 'error');
            return;
        }
        previewVideos.splice(index, 1);
        renderPreviewVideos();
        console.log('Preview video removed successfully. Total:', previewVideos.length);
        showToast('Preview video removed', 'success');
    } catch (error) {
        console.error('Error removing preview video:', error);
        showToast('Error removing preview video', 'error');
    }
}

function updatePreviewVideo(index, field, value) {
    try {
        if (previewVideos[index]) {
            previewVideos[index][field] = value;
        }
    } catch (error) {
        console.error('Error updating preview video:', error);
    }
}

function renderPreviewVideos() {
    const container = document.getElementById('previewVideosContainer');
    
    if (previewVideos.length === 0) {
        container.innerHTML = `
            <div class="empty-videos">
                <i class="fa fa-play-circle"></i>
                <p>No preview videos added yet</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = previewVideos.map((video, index) => `
        <div class="preview-video-form-card outer-shadow">
            <div class="video-form-header">
                <span class="video-number">${index + 1}</span>
                <h4>Preview Video ${index + 1}</h4>
                ${previewVideos.length > 1 ? `
                    <button type="button" class="btn-remove-video" onclick="removePreviewVideo(${index})">
                        <i class="fa fa-trash"></i>
                    </button>
                ` : ''}
            </div>
            <div class="video-form-body">
                <div class="form-group">
                    <label>Video Title</label>
                    <input type="text" 
                           value="${escapeHtml(video.title)}" 
                           onchange="updatePreviewVideo(${index}, 'title', this.value)"
                           placeholder="e.g., Introduction to Web Development">
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Duration</label>
                        <input type="text" 
                               value="${escapeHtml(video.duration)}" 
                               onchange="updatePreviewVideo(${index}, 'duration', this.value)"
                               placeholder="e.g., 15:30">
                    </div>
                </div>
                <div class="form-group">
                    <label>Description</label>
                    <textarea 
                        onchange="updatePreviewVideo(${index}, 'description', this.value)"
                        placeholder="Describe what this video covers...">${escapeHtml(video.description)}</textarea>
                </div>
            </div>
        </div>
    `).join('');
}

// ========== Image Upload Functions ==========

function initializeImageUpload() {
    console.log('Initializing image upload...');
    try {
        const uploadArea = document.getElementById('courseUploadArea');
        const imageFile = document.getElementById('courseImageFile');
        
        if (!uploadArea || !imageFile) {
            console.error('Image upload elements not found');
            return;
        }
        
        // Click to upload
        uploadArea.addEventListener('click', () => {
            console.log('Upload area clicked');
            imageFile.click();
        });
        
        // File input change
        imageFile.addEventListener('change', (e) => {
            console.log('File input changed:', e.target.files[0]);
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
                console.log('File dropped:', e.dataTransfer.files[0]);
                handleImageUpload(e.dataTransfer.files[0]);
            }
        });
        
        console.log('Image upload initialized successfully');
    } catch (error) {
        console.error('Error initializing image upload:', error);
    }
}

function handleImageUpload(file) {
    console.log('Processing image upload:', file.name, 'Size:', file.size);
    try {
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
            showCourseImagePreview(uploadedImage);
            showToast('Image uploaded successfully!', 'success');
            console.log('Image uploaded and preview shown');
        };
        
        reader.onerror = (error) => {
            console.error('Error reading file:', error);
            showToast('Error reading file', 'error');
        };
        
        reader.readAsDataURL(file);
    } catch (error) {
        console.error('Error handling image upload:', error);
        showToast('Error uploading image', 'error');
    }
}

function showCourseImagePreview(src) {
    const preview = document.getElementById('courseImagePreview');
    const uploadArea = document.getElementById('courseUploadArea');
    const previewImg = document.getElementById('coursePreviewImg');
    
    if (preview && uploadArea && previewImg) {
        previewImg.src = src;
        preview.classList.add('show');
        uploadArea.style.display = 'none';
        console.log('Image preview shown');
    }
}

function removeCourseImage() {
    console.log('Removing uploaded image');
    try {
        uploadedImage = null;
        const preview = document.getElementById('courseImagePreview');
        const uploadArea = document.getElementById('courseUploadArea');
        const imageFile = document.getElementById('courseImageFile');
        
        if (preview) preview.classList.remove('show');
        if (uploadArea) uploadArea.style.display = 'block';
        if (imageFile) imageFile.value = '';
        
        showToast('Image removed', 'success');
    } catch (error) {
        console.error('Error removing image:', error);
    }
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
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

