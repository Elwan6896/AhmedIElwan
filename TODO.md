# GitHub Pages Fix - TODO

## ✅ Phase 1: Create Data Files - COMPLETED
- ✅ Created `data/` directory
- ✅ Created `data/posts.json` with sample posts
- ✅ Created `data/courses.json` with sample courses

## ✅ Phase 2: Modify JavaScript Files - COMPLETED
- ✅ Updated `js/data.js` to use fetch() for JSON loading
- ✅ Updated `js/blogs.js` to load posts from JSON
- ✅ Updated `js/blog.js` to load single blog post from JSON
- ✅ Updated `js/courses.js` to load courses from JSON
- ✅ Simplified `js/admin-auth.js` authentication (session-only)

## ✅ Phase 3: Update Admin Pages - COMPLETED
- ✅ Updated `admin-dashboard.html` with instructions
- ✅ Updated `admin-blog.html` as read-only view
- ✅ Updated `admin-courses.html` as read-only view
- ✅ Updated `courses.html` to load courses from JSON

## 🔄 Phase 4: Testing - PENDING
- [ ] Test blogs page loads posts from JSON
- [ ] Test blog single page
- [ ] Test courses page
- [ ] Test admin pages show data correctly
- [ ] Test deployment to GitHub Pages

## 📝 Phase 5: Documentation - COMPLETED
- ✅ Create README with editing instructions
- ✅ Document how to add/edit content via JSON files

---

## How to Deploy to GitHub Pages

1. Push changes to GitHub:
```bash
git add .
git commit -m "Fix: Convert to static JSON for GitHub Pages compatibility"
git push origin main
```

2. Go to your repository on GitHub
3. Navigate to Settings > Pages
4. Ensure source is set to "main" branch
5. Your site will be live at `https://yourusername.github.io/repository-name/`

## How to Edit Content

### Edit Blog Posts
1. Go to `data/posts.json` on GitHub
2. Click the edit button (pencil icon)
3. Add or modify posts following the existing format
4. Commit changes
5. Your blog page will update automatically!

### Edit Courses
1. Go to `data/courses.json` on GitHub
2. Click the edit button (pencil icon)
3. Add or modify courses following the existing format
4. Commit changes
5. Your courses page will update automatically!

## JSON Format Guide

### Blog Post Format
```json
{
    "id": 1704067200000,
    "title": "Your Post Title",
    "brief": "Short description (appears in blog slider)",
    "content": "Full post content with newlines",
    "image": "img/your-image.jpg",
    "date": "2024-01-01"
}
```

### Course Format
```json
{
    "id": "unique-id",
    "title": "Course Title",
    "subtitle": "Course description",
    "image": "img/course-image.jpg",
    "level": "beginner|intermediate|advanced",
    "duration": "8 Weeks",
    "lessons": "36 Lessons",
    "topics": ["Topic 1", "Topic 2"],
    "previewVideos": [
        {
            "title": "Video Title",
            "duration": "15:30",
            "description": "Video description"
        }
    ],
    "includes": ["Feature 1", "Feature 2"]
}
```

