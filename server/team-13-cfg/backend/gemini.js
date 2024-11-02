import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

const __dirname = path.dirname(new URL(import.meta.url).pathname);
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

const genAI = new GoogleGenerativeAI(process.env.GEM_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-8b" });

function readTextFile(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf-8', (err, data) => {
            if (err) {
                return reject(err);
            }
            resolve(data.trim());
        });
    });
}

async function callGoogleGeminiAPI(context, subject) {
    const question = `make a 1000 word lesson plan using the context pdf for 4th graders studying ${subject}. use plain text and paragraphs`
    const result = await model.generateContent([context, question]); 
    const txt = result.response.text(); 
    return txt;
}

export async function processLessonPlan(subject) {
    const filePath = path.join(__dirname, 'pathways.txt');
    
    try {
        const context = await readTextFile(filePath);
        const lessonPlan = await callGoogleGeminiAPI(context, subject);
        return lessonPlan;
    } catch (err) {
        console.error('Error:', err);
    }
}