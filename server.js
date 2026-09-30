const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { GoogleGenAI } = require("@google/genai");

const app = express();

app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

app.get("/", (req, res) => {
    res.send("Ava AI Student Assistant server is running!");
});

app.post("/api/chat", async (req, res) => {

    try {

        const question = req.body.question;

        if (!question) {
            return res.status(400).json({
                answer: "Please type a question 😊"
            });
        }

        const response = await ai.models.generateContent({
           model: "gemini-3.5-flash-lite",
           contents: question
        });

        res.json({
            answer: response.text
        });

    } catch (error) {

        console.error("Gemini API Error:", error);

        res.status(500).json({
            answer: "Sorry 😊 I could not get a response from Gemini right now."
        });

    }

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Ava AI server is running on port ${PORT}`);
});