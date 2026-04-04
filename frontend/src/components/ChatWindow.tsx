"use client";

import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import { Message } from "@/types";

interface ChatWindowProps {
  messages: Message[];
  isLoading?: boolean;
}

export default function ChatWindow({ messages, isLoading = false }: ChatWindowProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom whenever new messages arrive or loading state changes
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading]);

  return (
    <div className="flex-1 w-full overflow-y-auto p-4 md:p-6">
      {messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mb-4 opacity-30"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          <p className="text-center max-w-sm">
            Hello! I'm ready to answer questions about your PDF. Please upload a document to get started.
          </p>
        </div>
      ) : (
        <div className="flex flex-col w-full max-w-3xl mx-auto">
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}

          {/* Loading Indicator for Bot Thinking */}
          {isLoading && (
            <div className="flex w-full mb-4 justify-start">
              <div className="bg-muted/30 border border-border px-5 py-4 rounded-2xl rounded-tl-sm flex items-center gap-2 shadow-sm">
                <span
                  className="w-2 h-2 rounded-full bg-primary/60 animate-bounce"
                  style={{ animationDelay: "0ms" }}
                ></span>
                <span
                  className="w-2 h-2 rounded-full bg-primary/60 animate-bounce"
                  style={{ animationDelay: "150ms" }}
                ></span>
                <span
                  className="w-2 h-2 rounded-full bg-primary/60 animate-bounce"
                  style={{ animationDelay: "300ms" }}
                ></span>
              </div>
            </div>
          )}
          {/* Invisible element to help with scrolling to bottom */}
          <div ref={bottomRef} className="h-1" />
        </div>
      )}
    </div>
  );
}
