import AIResponse from "./AiResponse";
import Footer from "./Footer";
import Header from "./Header";
import SubjectSelector from "./SubjectSelect";
import React, { useState } from "react";
import ReactMarkdown from 'react-markdown';
import './../App.css'

export default function LessonPlannerChatbox() {
  const [subject, setSubject] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("generate");
  const [feedbackPrompt, setFeedbackPrompt] = useState("");

  const handleSubjectChange = async (event) => {
    const selectedSubject = event.target.value;
    setSubject(selectedSubject);

    if (selectedSubject) {
      setIsLoading(true);
      try {
        console.log("Fetching AI response...");
        const response = await fetch("http://localhost:3000/api/lesson", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ prompt: selectedSubject }),
        });

        if (!response.ok) {
          throw new Error("API request failed");
        }

        const data = await response.json();
        const txt = data.data;
        setAiResponse(txt);

        console.log("Lesson plan generated successfully:", txt);
      } catch (error) {
        console.error("Error fetching AI response:", error);
        setAiResponse("Sorry, there was an error generating the lesson plan. Please try again.");
      } finally {
        setIsLoading(false);
      }
    } else {
      setAiResponse("");
      console.log("No subject selected, cleared AI response");
    }
  };

  const handleFeedbackSubmit = async (event) => {
    event.preventDefault();
    if (feedbackPrompt.trim() === "") return;

    setIsLoading(true);
    try {
      console.log("Fetching feedback...");
      const response = await fetch("http://localhost:3000/api/giveFeedback", { // Updated to use new endpoint
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt: feedbackPrompt }),
      });

      if (!response.ok) {
        throw new Error("API request failed");
      }

      const data = await response.json();
      const txt = data.data;
      setAiResponse(txt);

      console.log("Feedback received successfully:", txt);
    } catch (error) {
      console.error("Error fetching feedback:", error);
      setAiResponse("Sorry, there was an error fetching feedback. Please try again.");
    } finally {
      setIsLoading(false);
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
              onClick={() => setActiveTab("generate")}
            >
              Generate Lesson Plan
            </button>
            <button 
              className={`tab ${activeTab === "feedback" ? "active" : ""}`}
              onClick={() => setActiveTab("feedback")}
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
              <ReactMarkdown>{aiResponse}</ReactMarkdown>
            </>
          )}

          {activeTab === "feedback" && (
            <>
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
