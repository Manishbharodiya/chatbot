"use client";

import { useState } from "react";
import PDFUploader from "@/components/PDFUploader";
import ChatWindow from "@/components/ChatWindow";
import InputBar from "@/components/InputBar";
import { Message } from "@/types";
import { uploadPDF, sendChatMessage } from "@/lib/api";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [docId, setDocId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleUpload = async (uploadedFile: File) => {
    setFile(uploadedFile);
    setIsLoading(true);
    
    try {
      const documentId = await uploadPDF(uploadedFile);
      setDocId(documentId);
      setMessages([
        {
          id: "welcome",
          role: "assistant",
          content: `I have successfully processed "${uploadedFile.name}". Ask me anything about it!`,
        },
      ]);
    } catch (error) {
      console.error("Upload error:", error);
      setFile(null); // Revert UI
      alert("Failed to upload the document. Is your backend running?");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (content: string) => {
    if (!docId) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
    };
    
    setMessages((prev) => [...prev, newMessage]);
    setIsLoading(true);

    try {
      const answer = await sendChatMessage(docId, content, messages);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: answer,
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
       console.error("Chat error:", error);
       const errorMessage: Message = {
         id: (Date.now() + 1).toString(),
         role: "assistant",
         content: "Sorry, I ran into an issue connecting to the AI.",
       };
       setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
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
