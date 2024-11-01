import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import { extractTextFromPDF } from './pdfHandler.js';
import { appendFile } from 'fs';

dotenv.config();

const app = express();
const port = 3000;


