import React, { useState } from 'react';
import { db } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';

const PostForm = ({ onSubmit }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            // Add a new document with a generated ID
            await addDoc(collection(db, "posts"), {
                title: title,
                content: content,
                createdAt: new Date()  // Optional, to track post creation time
            });
            alert("Post created successfully!");
            setTitle('');  // Clear form fields
            setContent('');
        } catch (e) {
            console.error("Error adding document: ", e);
            alert("Error creating post");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Content</label>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Create Post</button>
        </form>
    );
};

export default PostForm;
