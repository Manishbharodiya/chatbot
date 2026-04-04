"use client";

import { useState } from "react";
import PDFUploader from "@/components/PDFUploader";
import ChatWindow from "@/components/ChatWindow";
import InputBar from "@/components/InputBar";
import { Message } from "@/types";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleUpload = (uploadedFile: File) => {
    setFile(uploadedFile);
    // Optional: Auto-send a welcome message when file is uploaded
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content: `I have successfully processed "${uploadedFile.name}". Ask me anything about it!`,
      },
    ]);
  };

  const handleSendMessage = (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
    };
    
    setMessages((prev) => [...prev, newMessage]);
    setIsLoading(true);

    // Simulate a bot thinking and responding since there's no backend connected yet
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `This is a simulated response based on the PDF. I received your message: "${content}".`,
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-10 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold">
            P
          </div>
          <h1 className="font-semibold text-lg">PDF ChatBot</h1>
        </div>
        {file && (
          <div className="text-xs bg-muted text-muted-foreground px-3 py-1 rounded-full truncate max-w-[200px]">
            {file.name}
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {!file ? (
          <div className="flex-1 flex items-center justify-center p-4">
             <div className="w-full max-w-md">
               <PDFUploader onUpload={handleUpload} />
             </div>
          </div>
        ) : (
          <ChatWindow messages={messages} isLoading={isLoading} />
        )}
      </main>

      {/* Input Area */}
      <InputBar onSend={handleSendMessage} disabled={!file || isLoading} />
    </div>
  );
}
