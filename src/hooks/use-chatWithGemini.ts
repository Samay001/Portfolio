// hooks/useChatWithGemini.ts
import { useState, useCallback, useEffect } from 'react';
import portfolioData from '@/lib/knowledge.json';

// Types
interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface PortfolioData {
  about: string;
  skills: string[];
  projects: {
    title: string;
    description: string;
    technologies: string[];
    link?: string;
  }[];
  experience: {
    company: string;
    role: string;
    duration: string;
    description: string;
  }[];
  education: {
    institution: string;
    degree: string;
    year: string;
  }[];
  contact: {
    email: string;
    linkedin?: string;
    github?: string;
  };
  // Add other fields as needed
}

const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

const useChatWithGemini = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hi there! I'm your AI assistant. Ask me anything about this portfolio!",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<PortfolioData | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Load portfolio data
  useEffect(() => {
    try {
      // Use the imported JSON directly
      setData(portfolioData as PortfolioData);
    } catch (err) {
      setError('Failed to load portfolio data');
      console.error('Error loading portfolio data:', err);
    }
  }, []);

  // Add a message to the chat
  const addMessage = useCallback((content: string, sender: 'user' | 'bot') => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      sender,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newMessage]);
    return newMessage;
  }, []);

  // Fallback response when API fails or no data available
  const generateFallbackResponse = useCallback((query: string) => {
    if (!data) {
      return "I'm sorry, I couldn't load the portfolio data. Please try again later.";
    }

    const lowercaseQuery = query.toLowerCase();
    
    // Generate response based on keywords
    if (lowercaseQuery.includes('about') || lowercaseQuery.includes('who')) {
      return data.about || "I don't have information about the portfolio owner yet.";
    }
    
    if (lowercaseQuery.includes('skill') || lowercaseQuery.includes('tech') || lowercaseQuery.includes('stack')) {
      return data.skills 
        ? `The skills include: ${data.skills.join(', ')}.`
        : "I don't have information about the skills yet.";
    }
    
    if (lowercaseQuery.includes('project')) {
      if (!data.projects || data.projects.length === 0) {
        return "I don't have information about the projects yet.";
      }
      
      return `Here are some projects: ${data.projects.map(p => 
        `${p.title} - ${p.description.substring(0, 100)}...`
      ).join('\n\n')}`;
    }
    
    if (lowercaseQuery.includes('experience') || lowercaseQuery.includes('work')) {
      if (!data.experience || data.experience.length === 0) {
        return "I don't have information about the work experience yet.";
      }
      
      return `Here's some work experience: ${data.experience.map(e => 
        `${e.role} at ${e.company} (${e.duration})`
      ).join('\n')}`;
    }
    
    if (lowercaseQuery.includes('education') || lowercaseQuery.includes('study')) {
      if (!data.education || data.education.length === 0) {
        return "I don't have information about the education yet.";
      }
      
      return `Education: ${data.education.map(e => 
        `${e.degree} from ${e.institution} (${e.year})`
      ).join('\n')}`;
    }
    
    if (lowercaseQuery.includes('contact') || lowercaseQuery.includes('email') || lowercaseQuery.includes('reach')) {
      return data.contact 
        ? `You can contact at: ${data.contact.email}${data.contact.linkedin ? ` or LinkedIn: ${data.contact.linkedin}` : ''}`
        : "I don't have contact information yet.";
    }
    
    // Default response
    return "I'm not sure about that. Try asking about skills, projects, experience, or contact information.";
  }, [data]);

  // Send message to Gemini API
  const sendToGemini = useCallback(async (userMessage: string) => {
    if (!GEMINI_API_KEY) {
      console.warn('Gemini API key not found, using fallback response');
      return generateFallbackResponse(userMessage);
    }
    
    try {
      // Create context from portfolio data
      const portfolioContext = data 
        ? `
          About: ${data.about}
          
          Skills: ${data.skills?.join(', ')}
          
          Projects: ${data.projects?.map(p => 
            `${p.title}: ${p.description} (Technologies: ${p.technologies.join(', ')})`
          ).join('\n')}
          
          Experience: ${data.experience?.map(e => 
            `${e.role} at ${e.company} (${e.duration}): ${e.description}`
          ).join('\n')}
          
          Education: ${data.education?.map(e => 
            `${e.degree} from ${e.institution} (${e.year})`
          ).join('\n')}
          
          Contact: ${data.contact?.email}
        `
        : 'No portfolio data available';
      
      const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `You are an AI assistant for a developer's portfolio website. Answer questions based only on the following portfolio information:
                  
                  ${portfolioContext}
                  
                  User question: ${userMessage}
                  
                  Keep your answers concise, friendly, and informative. Don't make up information that isn't in the portfolio data.`
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.2,
            maxOutputTokens: 1000,
          }
        })
      });
      
      const result = await response.json();
      
      if (response.ok && result.candidates && result.candidates[0].content.parts[0].text) {
        return result.candidates[0].content.parts[0].text;
      } else {
        console.error('Gemini API error:', result);
        throw new Error('Failed to get response from AI');
      }
    } catch (err) {
      console.error('Error calling Gemini API:', err);
      return generateFallbackResponse(userMessage);
    }
  }, [data, generateFallbackResponse]);

  // Send message
  const sendMessage = useCallback(async (userInput: string) => {
    if (!userInput.trim()) return;
    
    // Add user message
    addMessage(userInput, 'user');
    setIsLoading(true);
    
    try {
      // Get response from Gemini or fallback
      const aiResponse = await sendToGemini(userInput);
      addMessage(aiResponse, 'bot');
    } catch (err) {
      console.error('Error getting AI response:', err);
      addMessage('Sorry, I encountered an error. Please try again.', 'bot');
    } finally {
      setIsLoading(false);
    }
  }, [addMessage, sendToGemini]);

  return {
    messages,
    isLoading,
    sendMessage,
    error
  };
};

export default useChatWithGemini;