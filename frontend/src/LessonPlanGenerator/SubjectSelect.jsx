// components/LessonPlanGenerator/SubjectSelect.jsx
 
// eslint-disable-next-line react/prop-types
export default function SubjectSelect({ subject, onSubjectChange }) {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-4">
      <p className="text-lg font-medium text-gray-700">
        I want to pre-plan a lesson plan for
      </p>
      <select
        className="appearance-none w-full sm:w-48 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        onChange={onSubjectChange}
        value={subject}
      >
        <option value="">Select subject</option>
        <option value="science">Science</option>
        <option value="math">Math</option>
        <option value="reading">Reading</option>
        <option value="writing">Writing</option>
      </select>
    </div>
  );
}

// lets ask them for specific courses?
// this will set up our down arrow for the dropdown
