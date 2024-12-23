const express = require('express');
const { createBlog, getBlogs, getBlog, editBlog, deleteBlog,likeBlog,dislikeBlog } = require('../controllers/blogControlller');
const verifyToken = require('../middleware/verifyToken'); // Assuming this middleware is in place

const router = express.Router();

// Create blog (Requires Auth)
router.post('/', verifyToken, createBlog);

// Get all blogs (No Auth required, but you can protect if needed)
router.get('/', getBlogs);

// Get specific blog by ID
router.get('/:id', getBlog);

// Edit a blog post
router.put('/:id', verifyToken, editBlog);

// Delete a blog post
router.delete('/:id', verifyToken, deleteBlog);
router.post('/:id/like', likeBlog);
router.post('/:id/dislike', dislikeBlog);

module.exports = router;
