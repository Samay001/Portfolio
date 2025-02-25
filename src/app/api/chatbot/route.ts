import { NextResponse } from 'next/server';
import axios from 'axios';
import portfolioData from '@/lib/knowledge.json';

// Types
// interface Message {
//   id: string;
//   content: string;
//   sender: 'user' | 'bot';
//   timestamp: Date;
// }

// interface ChatResponse {
//   message: Message;
//   error?: string;
// }

interface PortfolioData {
  about?: string;
  skills?: string[];
  projects?: { title: string; description: string }[];
  experience?: { role: string; company: string; duration: string }[];
  education?: { degree: string; institution: string; year: string }[];
  contact?: { email: string };
}

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

// Generate fallback response when API fails or no data is available
function generateFallbackResponse(query: string): string {
  const data: PortfolioData = portfolioData as PortfolioData;
  if (!data) return "I'm sorry, I couldn't load the portfolio data.";

  const lowercaseQuery = query.toLowerCase();

  if (lowercaseQuery.includes('about')) return data.about || 'No about info.';
  if (lowercaseQuery.includes('skill')) return data.skills ? `Skills: ${data.skills.join(', ')}` : 'No skills info.';
  if (lowercaseQuery.includes('project'))
    return data.projects?.length
      ? `Projects: ${data.projects.map((p) => `${p.title} - ${p.description.substring(0, 100)}...`).join('\n\n')}`
      : 'No projects info.';
  if (lowercaseQuery.includes('experience'))
    return data.experience?.length
      ? `Experience: ${data.experience.map((e) => `${e.role} at ${e.company} (${e.duration})`).join('\n')}`
      : 'No experience info.';
  if (lowercaseQuery.includes('education'))
    return data.education?.length
      ? `Education: ${data.education.map((e) => `${e.degree} from ${e.institution} (${e.year})`).join('\n')}`
      : 'No education info.';
  if (lowercaseQuery.includes('contact')) return `Contact: ${data.contact?.email || 'No contact info.'}`;

  return "I'm not sure about that. Try asking about skills, projects, experience, or contact information.";
}

// Send message to Gemini API using axios
async function sendToGemini(userMessage: string): Promise<string> {
  if (!GEMINI_API_KEY) {
    console.warn('Gemini API key not found, using fallback response.');
    return generateFallbackResponse(userMessage);
  }

  try {
    const response = await axios.post(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: `You are an AI assistant for a developer's portfolio website. Answer questions based on the provided portfolio information. 
                
                User question: ${userMessage}
                
                Keep responses concise and informative.Please format your responses using markdown.Use **bold** and other markdown when important`,
              },
            ],
          },
        ],
        generationConfig: { temperature: 0.2, maxOutputTokens: 1000 },
      },
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );

    const result = response.data;
    if (!result.candidates?.[0]?.content?.parts?.[0]?.text) {
      console.error('Gemini API error:', result);
      return generateFallbackResponse(userMessage);
    }

    return result.candidates[0].content.parts[0].text;
  } catch (err) {
    console.error('Error calling Gemini API:', err);
    return generateFallbackResponse(userMessage);
  }
}

// POST Handler
export async function POST(request: Request) {
  try {
    const { message } = await request.json();
    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        {
          message: {
            id: Date.now().toString(),
            content: 'Invalid request.',
            sender: 'bot',
            timestamp: new Date(),
          },
          error: 'Invalid request',
        },
        { status: 400 }
      );
    }

    // Get AI-generated response
    const responseContent = await sendToGemini(message);

    return NextResponse.json({
      message: {
        id: Date.now().toString(),
        content: responseContent,
        sender: 'bot',
        timestamp: new Date(),
      },
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      {
        message: {
          id: Date.now().toString(),
          content: 'Server error. Try again.',
          sender: 'bot',
          timestamp: new Date(),
        },
        error: 'Internal server error',
      },
      { status: 500 }
    );
  }
}
