"use client";

import { useState, FormEvent, KeyboardEvent } from "react";

// PUBLIC_INTERFACE
interface MessageInputProps {
  /**
   * Callback fired when a message is sent
   */
  onSendMessage: (message: string) => void;
}

// PUBLIC_INTERFACE
/**
 * MessageInput component for typing and sending messages
 */
export default function MessageInput({ onSendMessage }: MessageInputProps) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };
  
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    // Send message on Enter without shift key
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-end gap-2">
      <div className="flex-grow relative">
        <textarea
          className="w-full resize-none rounded-lg border border-black/10 dark:border-white/10 bg-transparent p-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type a message..."
          rows={1}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        {/* Emoji button placeholder - would be expanded in a real implementation */}
        <button 
          type="button" 
          className="absolute right-3 bottom-3 text-foreground/50 hover:text-foreground"
          aria-label="Add emoji"
        >
          😊
        </button>
      </div>
      
      <button
        type="submit"
        disabled={!message.trim()}
        className="rounded-full bg-blue-500 p-2 text-white hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Send message"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 2L11 13"></path>
          <path d="M22 2L15 22L11 13L2 9L22 2Z"></path>
        </svg>
      </button>
    </form>
  );
}
