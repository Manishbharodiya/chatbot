"use client";

import { useState, FormEvent, useRef, useEffect } from "react";

interface InputBarProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export default function InputBar({ onSend, disabled = false }: InputBarProps) {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea logic
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = `${Math.min(
        inputRef.current.scrollHeight,
        150
      )}px`;
    }
  }, [input]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      onSend(input.trim());
      setInput("");
      if (inputRef.current) {
        inputRef.current.style.height = "auto";
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as unknown as FormEvent);
    }
  };

  return (
    <div className="w-full bg-background/80 backdrop-blur-md border-t border-border p-4 pb-6">
      <div className="max-w-3xl mx-auto">
        <form
          onSubmit={handleSubmit}
          className={`relative flex items-end gap-2 border rounded-xl p-2 transition-all shadow-sm ${
            disabled
              ? "bg-muted/20 border-border/50"
              : "bg-muted/30 border-border focus-within:ring-1 focus-within:ring-primary/50 focus-within:border-primary"
          }`}
        >
          <textarea
            ref={inputRef}
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            placeholder={
              disabled
                ? "Please upload a PDF first..."
                : "Ask a question about your document..."
            }
            className="w-full max-h-[150px] bg-transparent text-foreground placeholder:text-muted-foreground resize-none outline-none py-2 px-3 text-sm custom-scrollbar disabled:cursor-not-allowed"
            style={{ minHeight: "40px" }}
          />
          <button
            type="submit"
            disabled={disabled || !input.trim()}
            className={`flex items-center justify-center p-2 h-10 w-10 shrink-0 rounded-lg transition-all duration-200 ${
              input.trim() && !disabled
                ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 shadow-sm"
                : "bg-muted/50 text-muted-foreground cursor-not-allowed"
            }`}
          >
            {/* Simple Send Icon SVG */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
            <span className="sr-only">Send</span>
          </button>
        </form>
        <p className="text-[10px] text-center text-muted-foreground mt-3 font-medium tracking-wide">
          AI can make mistakes. Always double-check answers from the document.
        </p>
      </div>
    </div>
  );
}
