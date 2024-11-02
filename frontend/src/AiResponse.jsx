// components/LessonPlanGenerator/AiResponse.jsx
// eslint-disable-next-line react/prop-types
export default function AiResponse({ subject, aiResponse }) {
  if (!subject) return null;

  // text for when we request an Ai response
  // hard coded besides the subject
  return (
    <div className="mt-4 bg-gray-50 rounded-md p-4">
      <h3 className="text-sm font-medium text-gray-700 mb-2">AI Response</h3>
      <p className="text-sm text-gray-600">{aiResponse}</p>
    </div>
  );
}
