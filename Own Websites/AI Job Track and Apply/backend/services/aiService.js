import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
dotenv.config();

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY || 'dummy_key'
});

export const processJobDescription = async (description) => {
    try {
        const prompt = `
            Analyze the following Job Description (JD) and extract details into a JSON object exactly like this:
            {
                "extractedSkills": ["skill1", "skill2"],
                "techStack": ["tech1"],
                "experienceLevel": "Entry Level / Mid / Senior",
                "roleTag": "Frontend / Backend / Full Stack / MERN / Other"
            }
            
            JD:
            ${description}
            
            IMPORTANT: Return ONLY raw JSON. No markdown backticks or extra text.
        `;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        const textOutput = response.text.replace(/```json/gi, '').replace(/```/g, '').trim();
        return JSON.parse(textOutput);
    } catch (error) {
        console.error("AI Service Error:", error);
        return null;
    }
};

export const generateOutreachMessage = async (jobTitle, company, skills) => {
    try {
        const prompt = `
            Write a concise, professional LinkedIn DM / Email to a recruiter at ${company} for the "${jobTitle}" position.
            I possess the following skills: ${skills.join(', ')}.
            Keep it under 100 words, highly personalized, entry-level friendly but confident. Don't use markdown formatting.
        `;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        return response.text.trim();
    } catch (error) {
        console.error("Error generating message:", error);
        return "Failed to generate message. Please check your Gemini API key in the backend/.env file.";
    }
};
