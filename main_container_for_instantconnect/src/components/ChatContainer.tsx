"use client";

import { useState } from "react";
import { Conversation } from "@/types";
import Sidebar from "./Sidebar/Sidebar";
import MessageArea from "./MessageArea/MessageArea";
import MessageInput from "./MessageInput/MessageInput";

// PUBLIC_INTERFACE
/**
 * Main container component for InstantConnect
 * This component serves as the primary layout for the chat application
 */
export default function ChatContainer() {
  // State to track the currently selected conversation
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);

  // Handler for when a conversation is selected from the sidebar
  const handleConversationSelect = (conversation: Conversation) => {
    setSelectedConversation(conversation);
  };

  // Handler for sending a new message
  const handleSendMessage = (message: string) => {
    // This is a placeholder - in the real implementation, this would send the message
    console.log("Sending message:", message, "to conversation:", selectedConversation?.id);
  };

  return (
    <div className="flex h-screen w-full bg-background">
      {/* Sidebar containing the chat list */}
      <div className="hidden sm:block sm:w-80 md:w-96 border-r border-black/10 dark:border-white/10">
        <Sidebar onSelectConversation={handleConversationSelect} selectedConversationId={selectedConversation?.id} />
      </div>

      {/* Main chat area containing messages and input */}
      <div className="flex flex-col flex-grow overflow-hidden">
        {selectedConversation ? (
          <>
            {/* Message history area */}
            <div className="flex-grow overflow-y-auto">
              <MessageArea conversationId={selectedConversation.id} />
            </div>
            
            {/* Message input area */}
            <div className="border-t border-black/10 dark:border-white/10 p-4">
              <MessageInput onSendMessage={handleSendMessage} />
            </div>
          </>
        ) : (
          // Placeholder shown when no conversation is selected
          <div className="flex items-center justify-center h-full text-foreground/50">
            Select a conversation to start messaging
          </div>
        )}
      </div>

      {/* Mobile drawer for showing the sidebar on smaller screens */}
      {/* This would be implemented later with a drawer/modal component */}
    </div>
  );
}
