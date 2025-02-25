"use client";
import { useState } from "react";
import { Bot, MessageCircle } from "lucide-react";
import ContactForm from "@/components/contactForm";
import ChatBotUi from "@/components/chatBotUi";

export default function FixedIcons() {
  const [openForm, setOpenForm] = useState<string | null>(null);

  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-between items-center p-4">
      {/* Contact Form on Left-Bottom */}
      <div className="relative">
        <ContactForm />
      </div>
      {/* AI Chatbot on Right-Bottom */}
      <div className="relative">
        <ChatBotUi />
      </div>
    </div>
  );
}
