"use client";
import { useState } from "react";
import { Bot, MessageCircle } from "lucide-react";
import ContactForm from "@/components/contactForm";
import AIChatBot from "@/components/chatBot";

export default function FixedIcons() {
  const [openForm, setOpenForm] = useState<string | null>(null);

  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-between items-center p-4">
      {/* Contact Form on Left-Bottom */}
      <div className="relative">
        <div onClick={() => setOpenForm(openForm === "bot" ? null : "bot")} className="cursor-pointer">
          <MessageCircle className="h-6 w-6 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors" />
        </div>
        {openForm === "bot" && (
          <div className="absolute bottom-12 left-0 w-72">
            <ContactForm />
          </div>
        )}
      </div>

      {/* AI Chatbot on Right-Bottom */}
      <div className="relative">
        <div onClick={() => setOpenForm(openForm === "message" ? null : "message")} className="cursor-pointer">
          <Bot className="h-6 w-6 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors" />
        </div>
        {openForm === "message" && (
          <div className="absolute bottom-12 right-0 w-72">
            <AIChatBot />
          </div>
        )}
      </div>
    </div>
  );
}