posts = JSON.parse(localStorage.getItem("posts")) || [];

// ========== COURSES STORAGE ==========
const defaultCourses = [
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

// Initialize courses in localStorage if empty
function initializeCourses() {
    if (!localStorage.getItem('courses')) {
        localStorage.setItem('courses', JSON.stringify(defaultCourses));
    }
}

// Get all courses from localStorage
function getCourses() {
    initializeCourses();
    return JSON.parse(localStorage.getItem('courses')) || [];
}

// Get a single course by ID
function getCourseById(id) {
    const courses = getCourses();
    return courses.find(course => course.id === id);
}

// Save courses to localStorage
function saveCourses(courses) {
    localStorage.setItem('courses', JSON.stringify(courses));
}

// Add a new course
function addCourse(course) {
    const courses = getCourses();
    courses.push(course);
    saveCourses(courses);
    return courses;
}

// Update an existing course
function updateCourse(index, course) {
    const courses = getCourses();
    if (index >= 0 && index < courses.length) {
        courses[index] = course;
        saveCourses(courses);
    }
    return courses;
}

// Delete a course
function deleteCourse(index) {
    const courses = getCourses();
    if (index >= 0 && index < courses.length) {
        courses.splice(index, 1);
        saveCourses(courses);
    }
    return courses;
}

// Initialize courses on load
initializeCourses();
