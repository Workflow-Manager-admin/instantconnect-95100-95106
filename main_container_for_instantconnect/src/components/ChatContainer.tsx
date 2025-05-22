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

  // State to control mobile sidebar visibility
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  
  // Toggle mobile sidebar
  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  return (
    <div className="flex h-screen w-full bg-background">
      {/* Sidebar containing the chat list - hidden on mobile unless toggled */}
      {/* Backdrop overlay for mobile when sidebar is open */}
      {isMobileSidebarOpen && (
        <div 
          className="sm:hidden fixed inset-0 bg-black/50 z-0"
          onClick={() => setIsMobileSidebarOpen(false)}
          aria-hidden="true"
        />
      )}
      
      <div 
        className={`${isMobileSidebarOpen ? 'block' : 'hidden'} sm:block fixed sm:relative sm:w-80 md:w-96 border-r border-black/10 dark:border-white/10 bg-background z-10 h-full`}
        style={{ width: isMobileSidebarOpen ? '100%' : undefined }}
      >
        <Sidebar 
          onSelectConversation={(conversation) => {
            handleConversationSelect(conversation);
            // Close sidebar on mobile when a conversation is selected
            setIsMobileSidebarOpen(false);
          }} 
          selectedConversationId={selectedConversation?.id} 
        />
      </div>

      {/* Main chat area containing messages and input */}
      <div className="flex flex-col flex-grow overflow-hidden">
        {/* Mobile header with menu button */}
        <div className="sm:hidden flex items-center p-2 border-b border-black/10 dark:border-white/10">
          <button 
            onClick={toggleMobileSidebar}
            className="p-2 rounded-md hover:bg-black/5 dark:hover:bg-white/5"
            aria-label="Toggle sidebar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
          <h1 className="text-lg font-bold ml-2">
            {selectedConversation ? 
              // If a conversation is selected, show its name
              (selectedConversation.name || "Chat") :
              // Otherwise show app name
              "InstantConnect"
            }
          </h1>
        </div>
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
