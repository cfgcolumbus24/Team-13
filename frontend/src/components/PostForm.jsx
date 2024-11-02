import React, { useState } from 'react';
import { db } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const PostForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const user = JSON.parse(localStorage.getItem('user'));
            if (!user) {
                alert("You must be logged in to create a post.");
                return;
            }

            await addDoc(collection(db, "posts"), {
                title: title,
                content: content,
                category: category,
                createdAt: new Date(),
                author: user.username,
            });

            alert("Post created successfully!");
            setTitle('');
            setContent('');
            navigate('/forum'); // Redirect to the forum posts page after submission
        } catch (e) {
            console.error("Error adding document: ", e);
            alert("Error creating post");
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-100">
            {/* Fixed Header */}
            <header className="bg-gray-800 p-8 shadow-md fixed top-0 left-0 w-full z-50 mt-10">
                <h1 className="text-5xl font-extrabold text-center text-pink-600">Create Post</h1>
                <p className="text-lg text-center text-pink-600 opacity-75 mt-2">Share your thoughts</p>
            </header>

            {/* Main Content Area */}
            <main className="pt-24 pb-16 px-4 md:px-10 w-full max-w-md flex flex-col items-center mt-20">
                <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md space-y-4 w-full">
                    <div>
                        <label className="block text-gray-700 mb-2">Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="w-full p-3 text-base text-gray-800 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-2">Content</label>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                            className="w-full p-3 text-base text-gray-800 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-700"
                            rows="5"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-2">Category</label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            required
                            className="w-full p-3 text-base text-gray-800 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-700"
                        >
                            <option value="" disabled>Select a category</option>
                            <option value="Math">Math</option>
                            <option value="Science">Science</option>
                            <option value="Reading">Reading</option>
                            <option value="Writing">Music</option>
                        </select>
                    </div>
                    
                    <button type="submit" className="w-full py-2 text-base font-semibold text-white bg-teal-700 rounded-lg hover:bg-teal-700 transition">
                        Create Post
                    </button>
                </form>
            </main>
        </div>
    );
};

export default PostForm;