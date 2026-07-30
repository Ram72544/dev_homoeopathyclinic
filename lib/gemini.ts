import { GoogleGenAI } from "@google/genai";

// Initialize Google Gen AI SDK client
export const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
});
