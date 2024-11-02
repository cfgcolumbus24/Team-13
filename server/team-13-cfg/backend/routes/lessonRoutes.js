import express from 'express';
import { processLesson, processFeedback } from '../controllers/LessonController.js';

const router = express.Router();

router.post('/lesson', processLesson);
router.post('/giveFeedback', processFeedback); 

export default router;
