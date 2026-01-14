# TODO: Make admin dashboard cards open in new tabs

## Task Analysis
The admin dashboard has two cards ("Manage Blogs" and "Manage Courses") that currently navigate in the same tab. Need to change them to open in new tabs.

## Files to Edit
- admin-dashboard.html

## Changes Required
1. **Manage Blogs card**: Change `onclick="window.location.href='admin-blog.html'"` to `onclick="window.open('admin-blog.html', '_blank')"`
2. **Manage Courses card**: Change `onclick="window.location.href='admin-courses.html'"` to `onclick="window.open('admin-courses.html', '_blank')"`

## Steps Completed
- [x] Update Manage Blogs card to open in new tab
- [x] Update Manage Courses card to open in new tab

## Followup
- No installation or testing required - simple HTML/JS change

