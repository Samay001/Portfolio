import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function AIChatBot() {
  return (
    <div className="flex justify-center items-center p-4 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-black">
      <Card className="w-full max-w-md bg-black text-white border-none">
        <CardContent className="space-y-4">
          <h2 className="text-2xl font-bold text-center">AI Chatbot</h2>
          <div className="space-y-2">
            <Label htmlFor="query">Your Query</Label>
            <Textarea className="border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-black" id="query" placeholder="Ask me anything..." />
          </div>
          <Button className="w-full">Send</Button>
        </CardContent>
      </Card>
    </div>
  );
}
