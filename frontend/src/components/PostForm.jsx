import React, { useState } from "react";
import {
  ChevronDownIcon,
  ChatBubbleLeftRightIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

// Try to import ReplyIcon, but provide a fallback
let ReplyIcon;
try {
  ReplyIcon = require("@heroicons/react/24/outline").ReplyIcon;
} catch (error) {
  // If ReplyIcon is not available, we'll use a custom SVG
  ReplyIcon = ({ className }) => (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
      />
    </svg>
  );
}

const DualForum = () => {
  const [view, setView] = useState("main");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categoryComments, setCategoryComments] = useState([]);
  const [newCategoryComment, setNewCategoryComment] = useState("");
  const [showCategoryComments, setShowCategoryComments] = useState(false);
  const [openQuestions, setOpenQuestions] = useState([]);
  const [newOpenQuestion, setNewOpenQuestion] = useState("");

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

  const handleOpenQuestionSubmit = (event) => {
    event.preventDefault();
    if (newOpenQuestion.trim()) {
      setOpenQuestions([
        ...openQuestions,
        { id: Date.now(), text: newOpenQuestion, comments: [] },
      ]);
      setNewOpenQuestion("");
    }
  };

  const handleOpenQuestionCommentSubmit = (questionId, commentText) => {
    setOpenQuestions(
      openQuestions.map((question) =>
        question.id === questionId
          ? {
              ...question,
              comments: [
                ...question.comments,
                { id: Date.now(), text: commentText },
              ],
            }
          : question
      )
    );
  };

  const renderMainView = () => (
    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
      <div className="w-full md:w-1/2 bg-white rounded-lg shadow-xl p-6 flex flex-col justify-between">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Category-based Questions
        </h2>
        <p className="text-gray-600 mb-4">
          For category-based questions, click here to select a specific topic
          and view related documents.
        </p>
        <button
          onClick={() => setView("category")}
          className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Go to Categories
        </button>
      </div>
      <div className="w-full md:w-1/2 bg-white rounded-lg shadow-xl p-6 flex flex-col justify-between">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Open Question Forum
        </h2>
        <p className="text-gray-600 mb-4">
          Click here to ask any questions about anything in our open forum.
        </p>
        <button
          onClick={() => setView("open")}
          className="w-full py-2 px-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
        >
          Go to Open Forum
        </button>
      </div>
    </div>
  );

  const renderCategoryView = () => (
    <div className="bg-white rounded-lg shadow-xl overflow-hidden">
      <div className="p-6 bg-gradient-to-r from-blue-600 to-indigo-600 flex justify-between items-center">
        <h2 className="text-3xl font-bold text-white">
          Category-based Questions
        </h2>
        <button
          onClick={() => setView("main")}
          className="bg-white text-blue-600 px-4 py-2 rounded-full hover:bg-blue-50 transition-colors"
        >
          Back to Main
        </button>
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
              className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
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
              <p className="text-gray-600">
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
