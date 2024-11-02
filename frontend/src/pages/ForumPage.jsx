import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { Link } from 'react-router-dom';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

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
        <div className="p-4 max-w-4xl mx-auto">
            <h1 className="text-2xl font-semibold mb-6">Forum Posts</h1>
            <div className="space-y-4">
                {posts.map(post => (
                    <div key={post.id} className="p-4 bg-white shadow-md rounded-lg">
                        <Link to={`/forum/${post.id}`} className="text-lg font-bold text-blue-500 hover:underline">
                            {post.title}
                        </Link>
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