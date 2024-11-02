import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';

const ForumPage = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "posts"));
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
        <div className="p-4 max-w-4xl mx-auto">
            <h1 className="text-2xl font-semibold mb-6">Forum Posts</h1>
            <div className="space-y-4">
                {posts.map(post => (
                    <div key={post.id} className="p-4 bg-white shadow-md rounded-lg">
                        <h2 className="text-lg font-bold">{post.title}</h2>
                        <p className="text-gray-700">{post.content}</p>
                        <p className="text-sm text-gray-500 mt-2">
                            {post.createdAt ? new Date(post.createdAt.seconds * 1000).toLocaleString() : 'No date available'}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ForumPage;