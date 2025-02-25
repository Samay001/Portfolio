"use client";
import ContactForm from "@/components/contactForm";
import ChatBotUi from "@/components/chatBotUi";

export default function FixedIcons() {

  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-between items-center p-4" style={{ zIndex: 2 }}>
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
