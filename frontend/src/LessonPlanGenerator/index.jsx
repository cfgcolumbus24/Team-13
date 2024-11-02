import React, { useState } from "react";
import { db } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import AIResponse from "./AiResponse";
import Footer from "./Footer";
import Header from "./Header";
import SubjectSelector from "./SubjectSelect";
import ReactMarkdown from 'react-markdown';
import './../App.css';

export default function LessonPlannerChatbox() {
  const [subject, setSubject] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("generate");
  const [feedbackPrompt, setFeedbackPrompt] = useState("");
  const navigate = useNavigate();

  const handleSubjectChange = async (event) => {
    const selectedSubject = event.target.value;
    setSubject(selectedSubject);
    if (selectedSubject) {
      setAiResponse(""); // Clear previous AI response when subject changes
    }
  };

  const handleGenerate = async () => {
    if (!subject) return; // Don't proceed if no subject is selected
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:3000/api/lesson", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt: subject }),
      });

      if (!response.ok) {
        throw new Error("API request failed");
      }

      const data = await response.json();
      const txt = data.data;
      setAiResponse(txt);
      await postToForum("Lesson Plan", txt); // Post the lesson plan
      console.log("Lesson plan generated successfully:", txt);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setAiResponse("Sorry, there was an error generating the lesson plan. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFeedbackSubmit = async (event) => {
    event.preventDefault();
    if (feedbackPrompt.trim() === "" || subject.trim() === "") return; // Ensure both prompt and subject are checked

    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:3000/api/giveFeedback", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt: feedbackPrompt, subject }), // Include subject in the body
      });

      if (!response.ok) {
        throw new Error("API request failed");
      }

      const data = await response.json();
      const txt = data.data;
      setAiResponse(txt);
      await postToForum("User Feedback", txt); // Post the feedback
      console.log("Feedback received successfully:", txt);
    } catch (error) {
      console.error("Error fetching feedback:", error);
      setAiResponse("Sorry, there was an error fetching feedback. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const postToForum = async (title, content) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) {
        alert("You must be logged in to post to the forum.");
        return;
      }

      const post = {
        title: title,
        content: content,
        category: subject, 
        createdAt: new Date(),
        author: user.username,
      }
      await addDoc(collection(db, "posts"), post);
      console.log(post);
      console.log("Post added to the forum successfully.");
    } catch (error) {
      console.error("Error posting to forum:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-xl overflow-hidden">
        <Header />
        <div className="p-8">
          <div className="tabs">
            <button 
              className={`tab ${activeTab === "generate" ? "active" : ""}`}
              onClick={() => {
                setActiveTab("generate");
                setAiResponse(""); // Clear response when switching tabs
              }}
            >
              Generate Lesson Plan
            </button>
            <button 
              className={`tab ${activeTab === "feedback" ? "active" : ""}`}
              onClick={() => {
                setActiveTab("feedback");
                setAiResponse(""); // Clear response when switching tabs
              }}
            >
              Get Feedback
            </button>
          </div>

          {activeTab === "generate" && (
            <>
              <SubjectSelector
                subject={subject}
                onSubjectChange={handleSubjectChange}
                isLoading={isLoading}
              />
              <button
                onClick={handleGenerate}
                className="mt-2 bg-blue-500 text-white rounded px-4 py-2"
                disabled={isLoading}
              >
                Generate Lesson Plan
              </button>
              <ReactMarkdown>{aiResponse}</ReactMarkdown>
            </>
          )}

          {activeTab === "feedback" && (
            <>
              <SubjectSelector
                subject={subject}
                onSubjectChange={handleSubjectChange}
                isLoading={isLoading}
              />
              <form onSubmit={handleFeedbackSubmit}>
                <textarea
                  value={feedbackPrompt}
                  onChange={(e) => setFeedbackPrompt(e.target.value)}
                  placeholder="Type your feedback prompt here..."
                  className="w-full p-2 border rounded"
                  rows={4}
                />
                <button
                  type="submit"
                  className="mt-2 bg-blue-500 text-white rounded px-4 py-2"
                  disabled={isLoading}
                >
                  Submit
                </button>
              </form>
              <ReactMarkdown>{aiResponse}</ReactMarkdown>
            </>
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
}
