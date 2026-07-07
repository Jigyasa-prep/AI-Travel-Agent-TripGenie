import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(
  import.meta.env.VITE_GEMINI_API_KEY
);

// Select Gemini model
const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

// Function to generate trip plan
export async function generateTripPlan(prompt) {
  const result = await model.generateContent(prompt);
  return result.response.text();
}