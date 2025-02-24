import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import aboutMe from "@/lib/knowledge.json"; 

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    // Initialize the Gemini model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Construct the prompt with predefined data
    const prompt = `
      You are a helpful assistant. Use the following information about Samay Rathod to answer user queries:

      About Samay Rathod:
      - Name: ${aboutMe.name}
      - Role: ${aboutMe.role}
      - Skills: ${aboutMe.skills.join(", ")}
      - Contact: Email (${aboutMe.contact.email}), Phone (${aboutMe.contact.phone})
      - Bio: ${aboutMe.bio}

      User Query: ${message}
    `;

    // Send the prompt to Gemini
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ reply: text });
  } catch (error) {
    console.error("Error:", error);

    // Handle quota exceeded or other errors
    if (error instanceof Error && error.message.includes("quota")) {
      return NextResponse.json(
        { error: "You've exceeded your Gemini API quota. Please check your billing plan." },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}