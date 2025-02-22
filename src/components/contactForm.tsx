import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import emailjs from "emailjs-com";
import dotenv from "dotenv";
dotenv.config();

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [buttonText, setButtonText] = useState("Submit");
  const [isSubmitted, setIsSubmitted] = useState(false);

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
        // console.log(serviceId, templateId, userId);
        
        if (!serviceId || !templateId || !userId) {
            console.log(serviceId, templateId, userId);
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
    <div className="flex justify-center items-center p-4 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-black">
      <Card className="w-full max-w-md bg-black text-white border-none">
        <CardContent className="space-y-4">
          <h2 className="text-2xl font-bold text-center">Contact Us</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                className="border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-black"
                id="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                className="border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-black"
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                className="border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-black"
                id="message"
                placeholder="Type your message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitted}
            >
              {buttonText}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}