"use client";

import { useEffect, useRef } from "react";
import { Message, mockMessages, mockUsers, mockConversations } from "@/types";

// PUBLIC_INTERFACE
interface MessageAreaProps {
  /**
   * ID of the conversation to show messages for
   */
  conversationId: string;
}

// Component for individual message bubbles
function MessageBubble({ message, isCurrentUser }: { message: Message; isCurrentUser: boolean }) {
  return (
    <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div 
        className={`max-w-[70%] px-4 py-2 rounded-lg ${
          isCurrentUser 
            ? 'bg-blue-500 text-white rounded-br-none' 
            : 'bg-black/5 dark:bg-white/10 rounded-bl-none'
        }`}
      >
        <div className="mb-1">{message.content}</div>
        <div className={`text-xs ${isCurrentUser ? 'text-white/70' : 'text-foreground/50'} text-right`}>
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
/**
 * MessageArea component displays the messages in a conversation
 */
export default function MessageArea({ conversationId }: MessageAreaProps) {
  // In a real app, we'd fetch messages based on the conversation ID
  const messages = mockMessages;
  const users = mockUsers;
  const conversations = mockConversations;
  
  // Reference for scrolling to the bottom of messages
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Get the current conversation
  const currentConversation = conversations.find(c => c.id === conversationId);
  
  // Get the name to display in the conversation header
  const getConversationName = () => {
    if (!currentConversation) return "Conversation";
    
    if (currentConversation.name) return currentConversation.name;
    
    if (currentConversation.type === 'direct' && currentConversation.participantIds.length > 0) {
      const participantId = currentConversation.participantIds[0];
      const participant = users.find(user => user.id === participantId);
      return participant?.name || "Unknown User";
    }
    
    return "Unnamed Conversation";
  };
  
  // Mock function to determine if a message is from the current user
  // In a real app, this would compare with the authenticated user's ID
  const isCurrentUser = (senderId: string) => {
    return senderId === '1'; // Assuming user ID 1 is the current user
  };
  
  // Scroll to the bottom of the messages when they change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-full">
      {/* Conversation header */}
      <div className="flex items-center p-4 border-b border-black/10 dark:border-white/10">
        {/* Avatar placeholder */}
        <div className="w-10 h-10 rounded-full bg-black/20 dark:bg-white/20 flex items-center justify-center">
          {getConversationName().charAt(0)}
        </div>
        
        <div className="ml-3">
          <div className="font-medium">{getConversationName()}</div>
          <div className="text-xs text-foreground/50">
            {currentConversation?.type === 'group' ? 'Group chat' : 'Online'}
          </div>
        </div>
      </div>
      
      {/* Messages area */}
      <div className="flex-grow overflow-y-auto p-4">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-foreground/50">
            No messages yet
          </div>
        ) : (
          messages.map((message) => (
            <MessageBubble 
              key={message.id} 
              message={message} 
              isCurrentUser={isCurrentUser(message.senderId)} 
            />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
