import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';  // Import icons
import Footer from './Footer'

const Admin = () => {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({ title: '', content: '', imageUrl: '' });
  const [editingBlog, setEditingBlog] = useState(null);

  // Fetch all blogs
  const fetchBlogs = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5003/api/blogs', {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Sort blogs by 'createdAt' in descending order (latest first)
      const sortedBlogs = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setBlogs(sortedBlogs);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  // Add a new blog
  const handleAddBlog = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:5003/api/blogs',
        newBlog,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // Add new blog at the start of the list (new post appears first)
      setBlogs([response.data, ...blogs]);
      setNewBlog({ title: '', content: '', imageUrl: '' });
    } catch (error) {
      console.error('Error adding blog:', error);
    }
  };

  // Edit an existing blog
  const handleEditBlog = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `http://localhost:5003/api/blogs/${editingBlog._id}`,
        editingBlog,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setBlogs(blogs.map((blog) => (blog._id === editingBlog._id ? response.data : blog)));
      setEditingBlog(null);
    } catch (error) {
      console.error('Error editing blog:', error);
    }
  };

  // Delete a blog
  const handleDeleteBlog = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5003/api/blogs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBlogs(blogs.filter((blog) => blog._id !== id));
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
   <div>
     <div className="container mx-auto py-8 px-4">


      {/* Add New Blog Card */}
      <div className="bg-white shadow-lg rounded-xl p-6 mb-8 hover:scale-105 transition transform duration-300 max-w-xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Blog</h2>
        <form onSubmit={handleAddBlog} className="space-y-4">
          <input
            type="text"
            placeholder="Blog Title"
            value={newBlog.title}
            onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
            className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
          <textarea
            placeholder="Content"
            value={newBlog.content}
            onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
            className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          ></textarea>
          <input
            type="text"
            placeholder="Image URL"
            value={newBlog.imageUrl}
            onChange={(e) => setNewBlog({ ...newBlog, imageUrl: e.target.value })}
            className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <button
            type="submit"
            className="w-full py-2 bg-[#36454F] text-white font-bold rounded-md hover:bg-blue-700 transition duration-300"
          >
            Add Blog
          </button>
        </form>
      </div>

      {/* Blog List Cards */}
      <div className="max-w-screen-xl mx-auto p-16">
  <div className="sm:grid lg:grid-cols-3 sm:grid-cols-2 gap-10">
    {blogs.map((blog) => (
      <div
        key={blog._id}
        className="hover:scale-105 hover:shadow-xl hover:shadow-blue-500/50 transition-transform duration-300 ease-in-out max-w-sm rounded-lg overflow-hidden bg-white shadow-lg mt-4 sm:mt-6"  // Added margin-top here
      >
        <div className="py-4 px-8">
          <h4 className="text-xl font-semibold text-gray-800 mb-3 leading-tight">{blog.title}</h4>

          {blog.imageUrl && (
            <img
              src={blog.imageUrl}
              alt={blog.title}
              className="w-full h-48 object-cover mb-4 rounded-md transition-transform duration-300 ease-in-out"
            />
          )}

          <p className="mb-4 text-sm text-gray-600 leading-relaxed line-clamp-3">
            {blog.content}
          </p>

          <div className="flex space-x-4 text-sm font-medium text-blue-500">
            <button
              onClick={() => setEditingBlog(blog)}
              className="hover:text-blue-600 transition-colors"
            >
              <FaEdit size={20} color="#36454F" />  {/* Edit icon */}
            </button>
            <button
              onClick={() => handleDeleteBlog(blog._id)}
              className="hover:text-red-500 transition-colors"
            >
              <FaTrashAlt size={20} color="#36454F" />  {/* Delete icon */}
            </button>
            <span className="text-gray-500 text-sm text-">
              {new Date(blog.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>


      {/* Edit Blog Modal */}
      {editingBlog && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white shadow-lg rounded-xl p-8 max-w-lg w-full">
            <h2 className="text-2xl font-semibold mb-6">Edit Blog</h2>
            <form onSubmit={handleEditBlog} className="space-y-4">
              <input
                type="text"
                value={editingBlog.title}
                onChange={(e) => setEditingBlog({ ...editingBlog, title: e.target.value })}
                className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
              <textarea
                value={editingBlog.content}
                onChange={(e) => setEditingBlog({ ...editingBlog, content: e.target.value })}
                className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              ></textarea>
              <input
                type="text"
                value={editingBlog.imageUrl || ''}
                onChange={(e) => setEditingBlog({ ...editingBlog, imageUrl: e.target.value })}
                className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Image URL"
              />
              <div className="flex justify-end space-x-4">
                <button
                  type="submit"
                  className="bg-green-600 text-white font-bold py-2 px-4 rounded-md hover:bg-green-700 transition duration-300"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setEditingBlog(null)}
                  className="bg-red-600 text-white font-bold py-2 px-4 rounded-md hover:bg-red-700 transition duration-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
    <Footer/>
   </div>
  );
};

export default Admin;
