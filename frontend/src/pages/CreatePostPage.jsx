import React from 'react';
import PostForm from '../components/PostForm';

const CreatePostPage = () => {
    const handlePostSubmit = (postData) => {
        console.log("Post data submitted:", postData);
        // Here, you'd send postData to your backend or API
    };

    return (
        <div>
            <h1>Create a New Post</h1>
            <PostForm onSubmit={handlePostSubmit} />
        </div>
    );
};

export default CreatePostPage;
