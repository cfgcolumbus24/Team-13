import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../firebase'; // Ensure this path is correct
import { doc, getDoc, collection, getDocs, query, orderBy, addDoc } from 'firebase/firestore';

const PostDetail = () => {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newComment, setNewComment] = useState("");

    useEffect(() => {
        const fetchPostAndComments = async () => {
            try {
                // Fetch the post
                const postDoc = await getDoc(doc(db, "posts", postId));
                if (postDoc.exists()) {
                    setPost({ id: postDoc.id, ...postDoc.data() });
                }

                // Fetch comments from the subcollection
                const commentsQuery = query(collection(db, "posts", postId, "comments"), orderBy("createdAt", "desc"));
                const commentsSnapshot = await getDocs(commentsQuery);
                const commentsData = commentsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setComments(commentsData);
            } catch (error) {
                console.error("Error fetching post or comments: ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPostAndComments();
    }, [postId]);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!newComment) return;

        try {
            // Add a new comment to the comments subcollection
            await addDoc(collection(db, "posts", postId, "comments"), {
                content: newComment,
                createdAt: new Date(),
                author: "Your Name", // Replace with actual user info if available
            });
            setNewComment(""); // Clear input
            // Optionally, you can fetch comments again to show the new comment without refreshing
        } catch (error) {
            console.error("Error adding comment: ", error);
        }
    };

    if (loading) return <p>Loading post...</p>;
    if (!post) return <p>Post not found.</p>;

    return (
        <div className="p-4 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
            <p className="text-gray-700 mb-4">{post.content}</p>
            <p className="text-sm text-gray-500">
                {post.createdAt ? new Date(post.createdAt.seconds * 1000).toLocaleString() : 'No date available'}
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">Comments</h2>
            <form onSubmit={handleCommentSubmit} className="mb-4">
                <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="border rounded p-2 w-full"
                    rows="3"
                    placeholder="Add a comment..."
                />
                <button type="submit" className="mt-2 bg-blue-500 text-white py-1 px-3 rounded">Submit</button>
            </form>
            <div className="space-y-2">
                {comments.map(comment => (
                    <div key={comment.id} className="p-2 border-b">
                        <p className="font-semibold">{comment.author}</p>
                        <p>{comment.content}</p>
                        <p className="text-sm text-gray-500">
                            {new Date(comment.createdAt.seconds * 1000).toLocaleString()}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PostDetail;