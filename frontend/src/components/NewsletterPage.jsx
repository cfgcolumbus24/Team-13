import React, { useState, useEffect } from 'react';

function NewsletterPage() {
  const [postHeading, setPostHeading] = useState('');
  const [currentPost, setCurrentPost] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [posts, setPosts] = useState([]);

  // Load posts from localStorage on component mount
  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem('posts'));
    if (savedPosts) setPosts(savedPosts);
  }, []);

  const handlePost = () => {
    if (postHeading.trim() === '' && currentPost.trim() === '' && !imageFile) return;

    const newPost = {
      id: Date.now(),
      heading: postHeading,
      content: currentPost,
      image: imageFile ? URL.createObjectURL(imageFile) : null,
      timestamp: new Date().toLocaleString(),
    };

    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
    setPostHeading('');
    setCurrentPost('');
    setImageFile(null);

    localStorage.setItem('posts', JSON.stringify(updatedPosts));
  };

  const handleDelete = (id) => {
    const updatedPosts = posts.filter((post) => post.id !== id);
    setPosts(updatedPosts);
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
  };

  return (
    <div className="min-h-screen flex flex-col items-center">
      {/* Fixed Header */}
      <header className="bg-gradient-to-r from-indigo-600 to-purple-700 p-8 shadow-md fixed top-0 left-0 w-full z-50">
        <h1 className="text-5xl font-extrabold text-center text-white">Newsletter</h1>
        <p className="text-lg text-center text-white opacity-75 mt-2">Stay updated with our weekly posts</p>
      </header>

      {/* Main Content Area */}
      <main className="pt-48 pb-16 px-4 md:px-10 w-full max-w-7xl flex flex-col md:flex-row gap-8 md:gap-12">
        {/* Left Column for Input */}
        <div className="w-full md:w-2/5 bg-gray-200 p-6 md:p-8 rounded-lg shadow-lg space-y-4 md:space-y-6">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">Create a Post</h2>
          {/* Heading Input */}
          <input
            type="text"
            value={postHeading}
            onChange={(e) => setPostHeading(e.target.value)}
            placeholder="Post Heading"
            className="w-full p-3 md:p-4 text-base md:text-lg text-gray-800 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {/* General Text Area */}
          <textarea
            value={currentPost}
            onChange={(e) => setCurrentPost(e.target.value)}
            placeholder="Write your update here..."
            className="w-full h-32 md:h-48 p-3 md:p-4 text-base md:text-lg text-gray-800 bg-white border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {/* Image Upload Input */}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            className="w-full text-gray-600"
          />
          <button
            onClick={handlePost}
            className="w-full py-2 md:py-3 text-base md:text-lg font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition transform hover:scale-105 focus:ring-2 focus:ring-indigo-500 shadow-md"
          >
            Post
          </button>
        </div>

        {/* Right Column for Scrollable Posts */}
        <div className="w-full md:w-3/5 h-auto md:h-[65vh] overflow-y-auto space-y-4 md:space-y-6">
          {posts.length === 0 ? (
            <p className="text-xl text-gray-600 text-center">No updates yet. Start by posting your first update!</p>
          ) : (
            posts.map((post) => (
              <div
                key={post.id}
                className="p-4 md:p-6 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-lg shadow-md hover:shadow-lg transition flex flex-col space-y-2"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    {post.heading && <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">{post.heading}</h3>}
                    <p className="text-sm text-gray-500 mb-2">{post.timestamp}</p>
                    <p className="text-base md:text-lg text-gray-800 whitespace-pre-wrap">{post.content}</p>
                  </div>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="mt-2 md:mt-0 ml-4 px-4 py-1 text-red-600 bg-white border border-red-300 rounded-full hover:bg-red-100 font-semibold transition"
                  >
                    Delete
                  </button>
                </div>
                {post.image && (
                  <img
                    src={post.image}
                    alt="Uploaded"
                    className="w-full rounded-lg shadow-md object-cover"
                  />
                )}
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}

export default NewsletterPage;
