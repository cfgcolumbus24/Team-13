// components/LessonPlanGenerator/AiResponse.jsx
// eslint-disable-next-line react/prop-types
export default function AiResponse({ subject, aiResponse, isLoading }) {
  if (!subject) return null;

  // text for when we request an Ai response
  // hard coded besides the subject
  return (
    <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 shadow-inner">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        AI Generated Lesson Plan
      </h3>
      {isLoading ? (
        <p className="text-gray-600">Generating your lesson plan...</p>
      ) : (
        <p className="text-gray-600 whitespace-pre-line">{aiResponse}</p>
      )}
    </div>
  );
}
