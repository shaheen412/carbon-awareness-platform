import express from 'express';
import cors from 'cors';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

app.post('/api/calculate-awareness', async (req, res) => {
    try {
        const { electricity, petrol } = req.body;

        // Simple Math Engine
        const electricityEmissions = electricity * 0.82 * 12; 
        const fuelEmissions = petrol * 2.3 * 12;
        const totalTons = ((electricityEmissions + fuelEmissions) / 1000).toFixed(2);

        // Sending prompt to Gemini AI
        // Upgraded Emotional Prompt for the Judges
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `
                You are a deeply empathetic, poetic environmental storyteller from India. 
                A user has a carbon footprint of ${totalTons} tons of CO2 per year. 
                They use ${electricity} kWh of electricity and ${petrol} liters of petrol every month.
                
                The urban Indian baseline average is 1.5 to 2 tons. 
                
                Write a beautiful, moving 2-sentence message. 
                Sentence 1: Use a powerful emotional metaphor (e.g., how many mature trees need to work for a lifetime to breathe this in, or the clean air our grandparents breathed).
                Sentence 2: Give them one gentle, soulful action they can do today (like unplugging electronics before sleeping, or choosing a walk under local neem trees) to restore balance. 
                Keep the tone warm, comforting, yet striking. Do not use corporate jargon.
            `,
        });

        res.status(200).json({ success: true, score: totalTons, nudge: response.text });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
});

app.listen(5000, () => console.log("Server running on port 5000"));