import AIResponse from "./AIResponse";
import Footer from "./Footer";
import Header from "./Header";
import SubjectSelector from "./SubjectSelect";
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";

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
        const response = await fetch(
          "https://your-ai-api-endpoint.com/generate-lesson-plan",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ subject: selectedSubject }),
          }
        );

        if (!response.ok) {
          throw new Error("API request failed");
        }

        const data = await response.json();
        setAiResponse(data.lessonPlan);
      } catch (error) {
        console.error("Error fetching AI response:", error);
        setAiResponse(
          "Sorry, there was an error generating the lesson plan. Please try again."
        );
      } finally {
        setIsLoading(false);
      }
    } else {
      setAiResponse("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-xl overflow-hidden">
        <Header />
        <div className="p-8">
          <SubjectSelector
            subject={subject}
            onSubjectChange={handleSubjectChange}
            isLoading={isLoading}
          />
          <AIResponse response={aiResponse} isLoading={isLoading} />
        </div>
        <Footer />
      </div>
    </div>
  );
}
