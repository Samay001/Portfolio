import { useState } from "react";
import emailjs from "emailjs-com";
import dotenv from "dotenv";
dotenv.config();

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [buttonText, setButtonText] = useState("Submit");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  interface EmailParams {
    [key: string]: string;
    from_name: string;
    from_email: string;
    message: string;
  }

  interface HandleSubmitEvent extends React.FormEvent<HTMLFormElement> {}

  const handleSubmit = async (e: HandleSubmitEvent): Promise<void> => {
    e.preventDefault();

    setButtonText("Submitting...");

    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const userId = process.env.NEXT_PUBLIC_EMAILJS_USER_ID;

      if (!serviceId || !templateId || !userId) {
        console.error("EmailJS environment variables are not defined");
        setButtonText("Submit");
        return;
      }

      const emailParams: EmailParams = {
        from_name: name,
        from_email: email,
        message: message,
      };

      await emailjs.send(serviceId, templateId, emailParams, userId);

      setButtonText("Submitted");
      setIsSubmitted(true);

      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      console.error("Failed to send email:", error);
      setButtonText("Submit");
    }
  };

  return (
    <div className="fixed bottom-5 left-5 z-50">
      {/* Contact Form Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 bg-gray-900 hover:bg-gray-800 text-white rounded-full flex items-center justify-center shadow-lg border border-gray-700 transition-all duration-300"
        aria-label={isOpen ? "Close contact form" : "Open contact form"}
      >
        {isOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        )}
      </button>

      {/* Contact Form Window */}
      {isOpen && (
        <div className="absolute bottom-16 left-0 w-[90vw] sm:w-96 h-auto max-h-[80vh] bg-gray-900 rounded-lg shadow-xl border border-gray-700 flex flex-col overflow-hidden transition-all duration-300">
          {/* Contact Form Header */}
          <div className="p-3 bg-gray-800 border-b border-gray-700 flex justify-between items-center">
            <div className="flex items-center">
              <h3 className="text-white font-medium">Let's Connect</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-200"
              aria-label="Close contact form"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          {/* Contact Form Content */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-900">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-white">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2 bg-gray-700 text-white placeholder-gray-400 rounded-lg outline-none"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-white">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 bg-gray-700 text-white placeholder-gray-400 rounded-lg outline-none"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-white">
                  Message
                </label>
                <textarea
                  id="message"
                  placeholder="Type your message here..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-2 bg-gray-700 text-white placeholder-gray-400 rounded-lg outline-none"
                  required
                />
              </div>
              <button
                type="submit"
                className={`w-full p-2 transition-colors duration-300 text-white ${
                  isSubmitted || !name || !email || !message
                    ? "bg-blue-500 opacity-50 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
                disabled={isSubmitted || !name || !email || !message}
              >
                {buttonText}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}