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
            <header className="bg-gradient-to-r from-indigo-600 to-purple-700 p-8 shadow-md fixed left-0 w-full z-50 mt-10"> {/* mt-8 is equal to 2rem, adjust as necessary */}
                <h1 className="text-5xl font-extrabold text-center text-white">Create Post</h1>
                <p className="text-lg text-center text-white opacity-75 mt-2">Share your thoughts!</p>
            </header>

            {/* Main Content Area */}
            <main className="pt-24 pb-16 px-4 md:px-10 w-full max-w-md flex flex-col items-center mt-16">
                <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md space-y-4 w-full mt-10">
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
                            className="w-full p-3 text-base text-gray-800 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            rows="5"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-2">Category</label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            required
                            className="w-full p-3 text-base text-gray-800 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="" disabled>Select a category</option>
                            <option value="Math">Math</option>
                            <option value="Science">Science</option>
                            <option value="Reading">Reading</option>
                            <option value="Writing">Music</option>
                        </select>
                    </div>
                  ))}
                </div>
                <form
                  onSubmit={handleCategoryCommentSubmit}
                  className="space-y-2"
                >
                  <textarea
                    value={newCategoryComment}
                    onChange={(e) => setNewCategoryComment(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="3"
                    placeholder="Write a comment..."
                  ></textarea>
                  <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  >
                    Post Comment
                  </button>
                </form>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );

  const renderOpenForumView = () => (
    <div className="bg-white rounded-lg shadow-xl overflow-hidden">
      <div className="p-6 bg-gradient-to-r from-green-600 to-teal-600 flex justify-between items-center">
        <h2 className="text-3xl font-bold text-white">Open Question Forum</h2>
        <button
          onClick={() => setView("main")}
          className="bg-white text-green-600 px-4 py-2 rounded-full hover:bg-green-50 transition-colors"
        >
          Back to Main
        </button>
      </div>
      <div className="p-6">
        <form onSubmit={handleOpenQuestionSubmit} className="space-y-2 mb-6">
          <textarea
            value={newOpenQuestion}
            onChange={(e) => setNewOpenQuestion(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            rows="3"
            placeholder="Ask any question..."
          ></textarea>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          >
            Post Question
          </button>
        </form>
        <div className="space-y-6">
          {openQuestions.map((question) => (
            <div key={question.id} className="bg-gray-100 p-4 rounded-lg">
              <p className="text-gray-700 mb-4">{question.text}</p>
              <div className="pl-4 border-l-2 border-gray-300">
                {question.comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="bg-white p-3 rounded-lg mb-2"
                  >
                    <p className="text-gray-600">{comment.text}</p>
                  </div>
                ))}
              </div>
              <CommentForm
                onSubmit={(commentText) =>
                  handleOpenQuestionCommentSubmit(question.id, commentText)
                }
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {view === "main" && renderMainView()}
        {view === "category" && renderCategoryView()}
        {view === "open" && renderOpenForumView()}
      </div>
    </div>
  );
};

const CommentForm = ({ onSubmit }) => {
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      onSubmit(comment);
      setComment("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-2">
      <div className="flex items-center">
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="flex-grow p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Write a comment..."
        />
        <button
          type="submit"
          className="p-2 bg-green-600 text-white rounded-r-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
        >
          <ReplyIcon className="h-5 w-5" />
        </button>
      </div>
    </form>
  );
};

export default DualForum;
