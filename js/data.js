/**
 * Data Module - Handles loading posts and courses from JSON files
 * Works with GitHub Pages static hosting
 */

// Cache for loaded data
let cachedPosts = null;
let cachedCourses = null;

// ========== POSTS (BLOGS) ==========

/**
 * Fetch all posts from JSON file
 * @returns {Promise<Array>} Array of post objects
 */
async function getPosts() {
    if (cachedPosts !== null) {
        return cachedPosts;
    }
    
    try {
        const response = await fetch('data/posts.json');
        if (!response.ok) {
            throw new Error('Failed to load posts');
        }
        cachedPosts = await response.json();
        return cachedPosts;
    } catch (error) {
        console.error('Error loading posts:', error);
        return [];
    }
}

/**
 * Get a single post by ID
 * @param {number} id - Post ID
 * @returns {Promise<Object|null>} Post object or null
 */
async function getPostById(id) {
    const posts = await getPosts();
    return posts.find(post => post.id == id) || null;
}

/**
 * Get posts count
 * @returns {Promise<number>} Number of posts
 */
async function getPostsCount() {
    const posts = await getPosts();
    return posts.length;
}

// ========== COURSES ==========

/**
 * Fetch all courses from JSON file
 * @returns {Promise<Array>} Array of course objects
 */
async function getCourses() {
    if (cachedCourses !== null) {
        return cachedCourses;
    }
    
    try {
        const response = await fetch('data/courses.json');
        if (!response.ok) {
            throw new Error('Failed to load courses');
        }
        cachedCourses = await response.json();
        return cachedCourses;
    } catch (error) {
        console.error('Error loading courses:', error);
        return [];
    }
}

/**
 * Get a single course by ID
 * @param {string} id - Course ID
 * @returns {Promise<Object|null>} Course object or null
 */
async function getCourseById(id) {
    const courses = await getCourses();
    return courses.find(course => course.id === id) || null;
}

/**
 * Get courses count
 * @returns {Promise<number>} Number of courses
 */
async function getCoursesCount() {
    const courses = await getCourses();
    return courses.length;
}

// ========== UTILITY FUNCTIONS ==========

/**
 * Escape HTML to prevent XSS
 * @param {string} text - Text to escape
 * @returns {string} Escaped text
 */
function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Format date string
 * @param {string} dateString - Date string
 * @returns {string} Formatted date
 */
function formatDate(dateString) {
    if (!dateString) return '';
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Export for use in other scripts
window.DataModule = {
    getPosts,
    getPostById,
    getPostsCount,
    getCourses,
    getCourseById,
    getCoursesCount,
    escapeHtml,
    formatDate
};

