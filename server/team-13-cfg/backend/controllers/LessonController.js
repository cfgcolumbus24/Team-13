import { processLessonPlan } from '../gemini.js';

export const processLesson = async (req, res) => {
    try {
        const { prompt } = req.body; 
        if (!prompt) {
            return res.status(400).json({ success: false, message: 'Prompt is required.' });
        }

        const lessonPlan = await processLessonPlan(prompt);
        console.log("Generated Lesson Plan:", lessonPlan); 
        res.status(200).json({ success: true, data: lessonPlan });
    } catch (error) {
        console.error('Error processing lesson plan:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};
