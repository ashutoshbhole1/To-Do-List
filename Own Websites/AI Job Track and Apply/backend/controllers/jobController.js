import Job from '../models/Job.js';

// Get all jobs with optional filters
export const getJobs = async (req, res) => {
    try {
        const { role, location, experience, status } = req.query;
        let query = {};

        if (role) query.tags = { $in: [new RegExp(role, 'i')] };
        if (location) query.location = new RegExp(location, 'i');
        if (experience) query.experience = new RegExp(experience, 'i');
        if (status) query.status = status;

        const jobs = await Job.find(query).sort({ createdAt: -1 });
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update job status
export const updateJobStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const updatedJob = await Job.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!updatedJob) return res.status(404).json({ message: 'Job not found' });
        res.status(200).json(updatedJob);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add a single job manually (or from scraper)
export const addJob = async (req, res) => {
    try {
        const newJob = new Job(req.body);
        const savedJob = await newJob.save();
        res.status(201).json(savedJob);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
