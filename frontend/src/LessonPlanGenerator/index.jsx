import AIResponse from "./AiResponse";
import Footer from "./Footer";
import Header from "./Header";
import SubjectSelector from "./SubjectSelect";
import React, { useState } from "react";
import ReactMarkdown from 'react-markdown';

export default function LessonPlannerChatbox() {
  const [subject, setSubject] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
            body: JSON.stringify({ prompt: selectedSubject }), // Send 'prompt' here
        });

        if (!response.ok) {
          throw new Error("API request failed");
        }

        const data = await response.json();
        const txt = data.data;
        setAiResponse(txt);

        console.log("Lesson plan generated successfully:", data.lessonPlan);
      } catch (error) {
        console.error("Error fetching AI response:", error);
        setAiResponse(
          "Sorry, there was an error generating the lesson plan. Please try again."
        );
        console.log(
          "Error occurred while generating lesson plan:",
          error.message
        );
      } finally {
        setIsLoading(false);
      }
    } else {
      setAiResponse("");
      console.log("No subject selected, cleared AI response");
    }
  };

  return (
          //<p>{aiResponse}</p>
           // <AIResponse response={aiResponse} isLoading={isLoading} />
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-xl overflow-hidden">
        <Header />
        <div className="p-8">
          <SubjectSelector
            subject={subject}
            onSubjectChange={handleSubjectChange}
            isLoading={isLoading}
          />
          <ReactMarkdown>{aiResponse}</ReactMarkdown>
        </div>
        <Footer />
      </div>
    </div>
  );
}
