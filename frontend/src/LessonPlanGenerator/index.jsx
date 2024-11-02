// components/LessonPlannerChatbox/index.jsx
// eslint-disable-next-line no-unused-vars
import AiResponse from "./AiResponse";
import Footer from "./Footer";
import Header from "./Header";
import SubjectSelect from "./SubjectSelect";
import { useState } from "react";

// Ensure Tailwind CSS is being imported

export default function LessonPlannerChatbox() {
  const [subject, setSubject] = useState("");
  const [aiResponse, setAiResponse] = useState("");

  const handleSubjectChange = (event) => {
    const value = event.target.value;
    setSubject(value);
    setAiResponse(`Here's a sample lesson plan for ${value}...`);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <Header />

        <div className="p-6">
          <div className="p-6 space-y-4">
            <SubjectSelect
              subject={subject}
              onSubjectChange={handleSubjectChange}
            />

            {subject && <AiResponse aiResponse={aiResponse} />}
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
