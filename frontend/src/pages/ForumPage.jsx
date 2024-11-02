import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { Link } from 'react-router-dom';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

import ReactMarkdown from 'react-markdown';

const ForumPage = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const postsQuery = query(collection(db, "posts"), orderBy("createdAt", "desc"));
                const querySnapshot = await getDocs(postsQuery);
                const postsData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setPosts(postsData);
            } catch (error) {
                console.error("Error fetching posts: ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (loading) return <p>Loading posts...</p>;

    return (
        <div className="p-4 max-w-3xl mx-auto">
            <header className="bg-gray-800 p-8 shadow-md fixed left-0 w-full z-50 mt-10"> {/* mt-8 is equal to 2rem, adjust as necessary */}
            <h1 className="text-5xl font-extrabold text-center text-pink-600">Forum Posts</h1>
                <p className="text-lg text-center text-pink-600 opacity-75 mt-2">Share your thoughts</p>
            </header>
        
            <div className="space-y-4">
                {posts.map(post => (
                    <div key={post.id} className="p-4 bg-white shadow-md rounded-lg mt-40">
                        <Link to={`/posts/${post.id}`} className="text-lg font-bold text-teal-700 hover:underline">
                            {post.title}
                            <p className="text-gray-700">{post.category}</p>
                        </Link>
                        <p className="text-gray-700"><ReactMarkdown>{post.content}</ReactMarkdown></p>
                        <p className="text-sm text-gray-500 mt-40">
                            {post.createdAt ? new Date(post.createdAt.seconds * 1000).toLocaleString() : 'No date available'}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ForumPage;