import { Message } from "@/types";

interface MessageBubbleProps {
  message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex w-full mb-4 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-[85%] md:max-w-[75%] rounded-2xl px-5 py-3 ${
          isUser
            ? "bg-primary text-primary-foreground rounded-tr-sm shadow-md"
            : "bg-muted/30 text-foreground border border-border rounded-tl-sm shadow-sm"
        }`}
      >
        {!isUser && (
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-[10px]">🤖</span>
            </div>
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              PDF Bot
            </span>
          </div>
        )}
        <p className="text-sm leading-relaxed whitespace-pre-wrap">
          {message.content}
        </p>
      </div>
    </div>
  );
}
