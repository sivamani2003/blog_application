import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import Footer from './Footer'
const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  // Fetch blogs and sort them by createdAt in descending order
  const fetchBlogs = async () => {
    try {
      const response = await axios.get('http://localhost:5003/api/blogs');
      const sortedBlogs = response.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt) // Sort by newest first
      );
      setBlogs(sortedBlogs);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  // Like a blog post
  const likeBlog = async (id) => {
    try {
      await axios.post(`http://localhost:5003/api/blogs/${id}/like`);
      fetchBlogs();
    } catch (error) {
      console.error('Error liking blog:', error);
    }
  };

  // Dislike a blog post
  const dislikeBlog = async (id) => {
    try {
      await axios.post(`http://localhost:5003/api/blogs/${id}/dislike`);
      fetchBlogs();
    } catch (error) {
      console.error('Error disliking blog:', error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div>
        <div className="container mx-auto py-8">
      <h1 className="text-4xl font-extrabold text-center text-primary mb-8">Latest Blogs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-white shadow-xl rounded-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-2xl"
          >
            <img
              src={blog.imageUrl} // You can replace this with actual images in blog data
              alt="Blog"
              className="w-full h-48 object-cover object-center"
            />
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{blog.title}</h2>
              <p className="text-gray-600 text-base mb-4">{blog.content.slice(0, 120)}...</p>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => likeBlog(blog._id)}
                    className="flex items-center text-blue-500 font-medium hover:scale-105 transition duration-200"
                  >
                    <FaThumbsUp className="mr-2 text-lg" />
                    {blog.likes}
                  </button>
                  <button
                    onClick={() => dislikeBlog(blog._id)}
                    className="flex items-center text-red-500 font-medium hover:scale-105 transition duration-200"
                  >
                    <FaThumbsDown className="mr-2 text-lg" />
                    {blog.dislikes}
                  </button>
                </div>
                <span className="text-gray-500 text-sm">
                  {new Date(blog.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
        <Footer/>
    </div>
  );
};

export default BlogList;
