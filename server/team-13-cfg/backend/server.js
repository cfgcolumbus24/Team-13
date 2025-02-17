import express from 'express';
import lessonRoutes from './routes/lessonRoutes.js';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json()); 

app.use('/api', lessonRoutes); 

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});