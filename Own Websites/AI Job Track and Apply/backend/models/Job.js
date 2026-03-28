import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, required: true },
    experience: { type: String },
    skills: [{ type: String }],
    description: { type: String },
    applyLink: { type: String, required: true, unique: true },
    datePosted: { type: String },
    status: {
        type: String,
        enum: ['Not Applied', 'Applied', 'Interview Scheduled', 'Rejected'],
        default: 'Not Applied'
    },
    tags: [{ type: String }], // Frontend, Backend, Full Stack, MERN
    source: { type: String } // Naukri, LinkedIn, etc.
}, { timestamps: true });

export default mongoose.model('Job', JobSchema);
