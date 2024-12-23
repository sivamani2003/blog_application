const Blog = require('../models/blog');
const User = require('../models/user'); // Assuming you're associating posts with users

// Create a new blog post (without file upload)
const createBlog = async (req, res) => {
  const { title, content, imageUrl } = req.body;
  const userId = req.userId; // Assuming JWT for user identification

  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }

  try {
    const newBlog = new Blog({
      title,
      content,
      imageUrl, // Store the image URL
      userId,
    });

    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error during blog creation' });
  }
};


// Get all blog posts, including user data
const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate('userId', 'name username'); // Populate user info for author
    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json({ error: 'Server error during fetching blogs' });
  }
};

// Get a single blog post by ID
const getBlog = async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findById(id).populate('userId', 'name username');
    
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json({ error: 'Server error during fetching the blog' });
  }
};

// Edit a blog post
const editBlog = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  try {
    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    // Check if user is the author of the blog
    if (blog.userId.toString() !== req.userId) {
      return res.status(403).json({ error: 'Not authorized to edit this blog' });
    }

    blog.title = title || blog.title;
    blog.content = content || blog.content;

    await blog.save();
    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json({ error: 'Server error during blog editing' });
  }
};

// Delete a blog post
const deleteBlog = async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    // Check if user is the author of the blog
    if (blog.userId.toString() !== req.userId) {
      return res.status(403).json({ error: 'Not authorized to delete this blog' });
    }

    await Blog.deleteOne({ _id: id });
    res.status(200).json({ message: 'Blog deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error during blog deletion' });
  }
};

// Like a blog post
const likeBlog = async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    blog.likes += 1; // Increase like count by 1
    await blog.save();
    
    res.status(200).json({ likes: blog.likes });
  } catch (err) {
    res.status(500).json({ error: 'Server error during like operation' });
  }
};

// Dislike a blog post
const dislikeBlog = async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    blog.dislikes += 1; // Increase dislike count by 1
    await blog.save();
    
    res.status(200).json({ dislikes: blog.dislikes });
  } catch (err) {
    res.status(500).json({ error: 'Server error during dislike operation' });
  }
};

// Exporting the controller
module.exports = {
  createBlog,
  getBlogs,
  getBlog,
  editBlog,
  deleteBlog,
  likeBlog,
  dislikeBlog
};
