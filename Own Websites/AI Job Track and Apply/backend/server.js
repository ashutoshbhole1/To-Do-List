import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cron from 'node-cron';
import jobRoutes from './routes/jobRoutes.js';
import { runAllScrapers } from './services/scraperService.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/jobs', jobRoutes);

// Basic Route
app.get('/', (req, res) => {
    res.send('AI Job Hunter Backend API is running');
});

// Database Connection
mongoose
    .connect(process.env.MONGO_URI || 'mongodb://localhost:27017/ai-job-hunter')
    .then(() => {
        console.log('Connected to MongoDB');
        
        // Schedule Scraper to run at midnight and noon (0 0,12 * * *)
        cron.schedule('0 0,12 * * *', async () => {
            console.log('Running scheduled scraper...');
            await runAllScrapers();
        });

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Failed to connect to MongoDB', err);
    });
