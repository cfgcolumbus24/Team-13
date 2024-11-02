import React from 'react';
import Navbar from '../components/Navbar';
import PostForm from '../components/PostForm';

const CreatePostPage = () => {
    const handlePostSubmit = (postData) => {
        console.log("Post data submitted:", postData);
    };

    return (
        <div>
            <Navbar />
            <main style={{ paddingTop: '60px !important'}}> 
                <PostForm onSubmit={handlePostSubmit} />
            </main>
        </div>
    );
};

export default CreatePostPage;
