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

async function callGoogleGeminiAPI(context, question) {
    const result = await model.generateContent([context, question]);
    const txt = result.response.text();
    console.log(txt);
    return txt;
}

const filePath = path.join(__dirname, 'pathways.txt'); 

readTextFile(filePath)
    .then(context => {
        const question = "I want to write a lesson plan in general for one day of instruction for 4th grade math students. Don't be too ambitious only have about 2-3 tasks. use the context to help out and only return that lesson plan in plain text";
        return callGoogleGeminiAPI(context, question);
    })
    .catch(err => {
        console.error('Error reading file:', err);
    });