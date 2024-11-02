import express from 'express';
import { processLesson } from '../controllers/LessonController.js';

const router = express.Router();

router.post('/lesson', processLesson);

export default router;
