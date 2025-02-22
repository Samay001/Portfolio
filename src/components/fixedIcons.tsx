"use client";
import { useState } from "react";
import { Bot, MessageCircle, X } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";

export default function FixedIcons() {
  const [openForm, setOpenForm] = useState<string | null>(null);
  
  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-between items-center p-4 mb-3">
      {/* AI Bot Icon on the Left */}
      <div className="p-2 cursor-pointer relative" onClick={() => setOpenForm(openForm === "bot" ? null : "bot")}> 
        <Bot className="h-6 w-6 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors" />
        {openForm === "bot" && (
          <div className="absolute bottom-12 left-0 w-72 bg-white dark:bg-gray-800 p-4 shadow-lg rounded-lg border border-gray-300 dark:border-gray-700">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Chat with AI</h2>
              <X className="h-5 w-5 cursor-pointer text-gray-500 hover:text-gray-700" onClick={() => setOpenForm(null)} />
            </div>
            {/* <Input type="text" placeholder="Your Question" className="mb-2" />
            <Button className="w-full">Ask</Button> */}
          </div>
        )}
      </div>

      {/* Message Icon on the Right */}
      <div className="p-2 cursor-pointer relative" onClick={() => setOpenForm(openForm === "message" ? null : "message")}> 
        <MessageCircle className="h-6 w-6 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors" />
        {openForm === "message" && (
          <div className="absolute bottom-12 right-0 w-72 bg-white dark:bg-gray-800 p-4 shadow-lg rounded-lg border border-gray-300 dark:border-gray-700">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Send a Message</h2>
              <X className="h-5 w-5 cursor-pointer text-gray-500 hover:text-gray-700" onClick={() => setOpenForm(null)} />
            </div>
            {/* <Input type="text" placeholder="Your Name" className="mb-2" />
            <Input type="email" placeholder="Your Email" className="mb-2" /> */}
            {/* <Textarea placeholder="Your Message" className="mb-2" />
            <Button className="w-full">Submit</Button> */}
          </div>
        )}
      </div>
    </div>
  );
}
