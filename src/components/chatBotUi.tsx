import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function ChatBotUi() {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!query.trim()) return;
    
    const userMessage = { sender: "user", text: query };
    setMessages((prev) => [...prev, userMessage]);
    setQuery("");
    setLoading(true);
    
    try {
      const res = await axios.post("/api/chat", { message: query });
      const botMessage = { sender: "bot", text: res.data.reply };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error fetching response:", error);
      setMessages((prev) => [...prev, { sender: "bot", text: "Something went wrong. Please try again." }]);
    }
    
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center p-1 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 w-full">
      <Card className="w-full max-w-5xl h-[50vh] flex flex-col border-none shadow-2xl dark:shadow-none">
        {/* Heading at the top */}
        <CardHeader className="p-4 bg-blue-500 dark:bg-purple-600 text-white text-center text-xl font-bold rounded-t-lg">
          AI Bot
        </CardHeader>
        <CardContent className="flex-1 overflow-auto p-6 bg-white dark:bg-gray-900">
          {messages.map((msg, index) => (
            <div 
              key={index} 
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} mb-4`}
            >
              <div 
                className={`p-3 rounded-lg max-w-[75%] transition-all duration-300 ease-in-out ${
                  msg.sender === "user" 
                    ? "bg-blue-500 text-white" 
                    : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={chatEndRef}></div>
        </CardContent>
        <div className="p-4 border-t bg-white dark:bg-gray-900 rounded-b-lg flex items-center gap-2">
          <Input 
            className="flex-1 border-gray-300 dark:border-gray-700 bg-transparent dark:bg-gray-800 dark:text-white" 
            placeholder="Type your message..." 
            value={query} 
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <Button 
            onClick={handleSendMessage} 
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 dark:bg-purple-600 dark:hover:bg-purple-700 text-white"
          >
            {loading ? "Thinking..." : "Send"}
          </Button>
        </div>
      </Card>
    </div>
  );
}