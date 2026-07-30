import { NextResponse } from "next/server";
import { ai } from "@/lib/gemini";

const SYSTEM_INSTRUCTION = `You are the friendly, intelligent AI Health & Homeopathy Consultation Assistant for Dev Homeopathy Clinic.
Your goal is to provide helpful, accurate, and reassuring information about homeopathic principles, natural wellness, common health conditions treated by homeopathy, and clinic services.

Guidelines:
1. Maintain a compassionate, professional, and holistic medical tone.
2. Explain homeopathic perspectives clearly (e.g., individualized care, holistic healing, root-cause treatment, minimal side effects).
3. Always include a short standard medical disclaimer when answering symptom-related questions (e.g., "Note: This information is for educational purposes. A personalized consultation with our qualified homeopathic physician is recommended for accurate diagnosis and prescription.").
4. Whenever appropriate, invite the patient to book an appointment with the clinic.
5. Keep responses concise, well-formatted with markdown bullet points if helpful, and easy to read on mobile devices.`;

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        {
          error: "API Key Not Configured",
          text: "The AI Assistant is currently in demo mode. Please configure `GEMINI_API_KEY` in your `.env` file to activate live Gemini AI responses.",
        },
        { status: 200 } // Return 200 with fallback info so UI gracefully handles missing key
      );
    }

    const { prompt, history } = await req.json();

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    // Prepare contents with user prompt
    const contents = prompt;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    return NextResponse.json({
      text: response.text ?? "I'm sorry, I couldn't generate a response. Please try again or contact the clinic.",
    });
  } catch (error: any) {
    console.error("Gemini AI API error:", error);
    return NextResponse.json(
      {
        error: "Failed to process request",
        text: "Sorry, I encountered an issue while retrieving information. Please try asking again or book a direct consultation with our doctors.",
      },
      { status: 500 }
    );
  }
}
