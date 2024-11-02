import React, { useState } from "react";
import {
  ChevronDownIcon,
  ChatBubbleLeftRightIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const CategoryForum = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categoryComments, setCategoryComments] = useState([]);
  const [newCategoryComment, setNewCategoryComment] = useState("");
  const [showCategoryComments, setShowCategoryComments] = useState(false);

  const categories = [
    {
      id: "math",
      name: "Math",
      document: "This is a document about Mathematics.",
    },
    {
      id: "science",
      name: "Science",
      document: "This is a document about Science.",
    },
    {
      id: "reading",
      name: "Reading",
      document: "This is a document about Reading.",
    },
    {
      id: "writing",
      name: "Writing",
      document: "This is a document about Writing.",
    },
  ];

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setCategoryComments([]);
    setShowCategoryComments(false);
  };

  const handleCategoryCommentSubmit = (event) => {
    event.preventDefault();
    if (newCategoryComment.trim()) {
      setCategoryComments([
        ...categoryComments,
        { id: Date.now(), text: newCategoryComment },
      ]);
      setNewCategoryComment("");
    }
  };

  const toggleCategoryComments = () => {
    setShowCategoryComments(!showCategoryComments);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          <div className="p-6 bg-pink-600">
            <h2 className="text-3xl font-bold text-white text-center">
              Category-based Questions
            </h2>
          </div>
          <div className="p-6">
            <div className="mb-6">
              <label
                htmlFor="category-select"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Select a category:
              </label>
              <div className="relative">
                <select
                  id="category-select"
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                  className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Choose a category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <ChevronDownIcon className="h-5 w-5" />
                </div>
              </div>
            </div>
            {selectedCategory && (
              <>
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Document
                  </h3>
                  <p className="text-gray-600 bg-gray-100 p-4 rounded-lg">
                    {categories.find((c) => c.id === selectedCategory).document}
                  </p>
                </div>
                <div className="mb-4">
                  <button
                    onClick={toggleCategoryComments}
                    className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full flex items-center space-x-2 hover:bg-blue-200 transition-colors"
                  >
                    {showCategoryComments ? (
                      <>
                        <XMarkIcon className="h-5 w-5" />
                        <span>Hide Comments</span>
                      </>
                    ) : (
                      <>
                        <ChatBubbleLeftRightIcon className="h-5 w-5" />
                        <span>Show Comments</span>
                      </>
                    )}
                  </button>
                </div>
                {showCategoryComments && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">
                      Comments
                    </h3>
                    <div className="space-y-4 mb-4">
                      {categoryComments.map((comment) => (
                        <div
                          key={comment.id}
                          className="bg-gray-100 p-3 rounded-lg"
                        >
                          <p className="text-gray-700">{comment.text}</p>
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
                        className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
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
      </div>
    </div>
  );
};

export default CategoryForum;
