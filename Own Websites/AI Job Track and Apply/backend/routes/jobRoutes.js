import express from 'express';
import { getJobs, updateJobStatus, addJob } from '../controllers/jobController.js';
import { runAllScrapers } from '../services/scraperService.js';

const router = express.Router();

router.post('/scrape', async (req, res) => {
    runAllScrapers(); // run in background
    res.json({ message: 'Scraping started in the background.' });
});

// GET /api/jobs -> Get all jobs
router.get('/', getJobs);

// POST /api/jobs -> Add a new job
router.post('/', addJob);

// PATCH /api/jobs/:id -> Update job status
router.patch('/:id/status', updateJobStatus);

export default router;
