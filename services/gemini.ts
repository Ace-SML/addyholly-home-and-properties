
import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

const SYSTEM_INSTRUCTION = `
You are the AddyHolly Real Estate Assistant. Your goal is to help users find their dream homes and provide expert real estate advice.
Company Name: AddyHolly Homes & Properties.
Your tone: Professional, friendly, elite, and helpful.
You have access to current real estate trends and general knowledge about buying, selling, and renting properties.
If asked about specific listings on the site, refer to popular cities like Malibu, Chicago, Aspen, Austin, and Beverly Hills.
Always mention that AddyHolly stands for integrity and excellence in property management.
Keep responses concise but informative.
`;

export const getGeminiResponse = async (history: ChatMessage[], message: string) => {
  try {
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });

    // Send history if needed, but for simplicity we'll just send the current message
    // and let the internal state (if any) or basic prompt handle it.
    const result = await chat.sendMessage({ message });
    return result.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm sorry, I'm having trouble connecting to my property database right now. Please try again in a moment.";
  }
};
