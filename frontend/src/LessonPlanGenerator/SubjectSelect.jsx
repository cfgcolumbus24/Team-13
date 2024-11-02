// components/LessonPlanGenerator/SubjectSelect.jsx
// eslint-disable-next-line react/prop-types
export default function SubjectSelect({ subject, handleSubjectChange }) {
  return (
    // this will be hard coded , can change it according to courses
    <div className="flex flex-col sm:flex-row items-center gap-2">
      <p className="text-lg font-medium text-gray-700">
        I want to pre-plan a lesson plan for
      </p>
      <select
        className="mt-1 block w-full sm:w-auto pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        onChange={handleSubjectChange}
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
