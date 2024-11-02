import React, { useState, useEffect } from 'react';

function NewsletterPage() {
  const [currentPost, setCurrentPost] = useState('');
  const [posts, setPosts] = useState([]);

  // Load posts from localStorage on component mount
  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem('posts'));
    if (savedPosts) setPosts(savedPosts);
  }, []);

  // Handle new post submission
  const handlePost = () => {
    if (currentPost.trim() === '') return; // Don't allow empty posts

    const newPost = {
      id: Date.now(), // unique ID for each post
      content: currentPost,
      timestamp: new Date().toLocaleString(),
    };

    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
    setCurrentPost(''); // Clear the input after posting

    // Save updated posts to localStorage
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', color: '#333' }}>
      <h1>Weekly Updates</h1>

      {/* Input Area for New Post */}
      <textarea
        value={currentPost}
        onChange={(e) => setCurrentPost(e.target.value)}
        placeholder="Write your update here..."
        style={{
          width: '100%',
          height: '100px',
          marginBottom: '10px',
          padding: '10px',
          fontSize: '1em',
          lineHeight: '1.5',
        }}
      />

      {/* Post Button */}
      <button
        onClick={handlePost}
        style={{ padding: '10px 20px', marginBottom: '20px', fontSize: '1em', cursor: 'pointer' }}
      >
        Post
      </button>

      {/* Feed Display */}
      <div>
        {posts.length === 0 ? (
          <p>No updates yet. Start by posting your first update!</p>
        ) : (
          posts.map((post) => (
            <div
              key={post.id}
              style={{
                border: '1px solid #ddd',
                padding: '15px',
                marginBottom: '10px',
                backgroundColor: '#f9f9f9',
                borderRadius: '5px',
              }}
            >
              <p style={{ margin: '0 0 10px', fontSize: '0.9em', color: '#666' }}>{post.timestamp}</p>
              <p style={{ margin: '0', whiteSpace: 'pre-wrap' }}>{post.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default NewsletterPage;
