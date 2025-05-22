"use client";

import { Conversation, mockConversations, mockUsers } from "@/types";

// PUBLIC_INTERFACE
interface SidebarProps {
  /**
   * Callback fired when a conversation is selected
   */
  onSelectConversation: (conversation: Conversation) => void;
  
  /**
   * ID of the currently selected conversation
   */
  selectedConversationId?: string;
}

// PUBLIC_INTERFACE
/**
 * Sidebar component displaying the list of conversations
 */
export default function Sidebar({ onSelectConversation, selectedConversationId }: SidebarProps) {
  // Using mock data for now
  const conversations = mockConversations;
  const users = mockUsers;
  
  // Find user by ID helper function
  const findUserById = (userId: string) => {
    return users.find(user => user.id === userId);
  };

  // Get conversation name or participant name for direct chats
  const getConversationDisplayName = (conversation: Conversation) => {
    if (conversation.name) {
      return conversation.name;
    }
    
    if (conversation.type === 'direct' && conversation.participantIds.length > 0) {
      // For direct chats, show the name of the other participant
      // In a real app, you'd filter out the current user's ID
      const otherParticipantId = conversation.participantIds[0]; 
      const participant = findUserById(otherParticipantId);
      return participant?.name || 'Unknown User';
    }
    
    return 'Unnamed Conversation';
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header with app title */}
      <div className="p-4 border-b border-black/10 dark:border-white/10">
        <h1 className="text-xl font-bold">InstantConnect</h1>
      </div>
      
      {/* Conversations list */}
      <div className="flex-grow overflow-y-auto">
        <div className="py-2">
          <h2 className="px-4 text-sm font-semibold text-foreground/70 mb-1">Conversations</h2>
          <ul>
            {conversations.map((conversation) => (
              <li 
                key={conversation.id}
                className={`px-4 py-3 cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 
                  ${selectedConversationId === conversation.id ? 'bg-black/10 dark:bg-white/10' : ''}`}
                onClick={() => onSelectConversation(conversation)}
              >
                <div className="flex items-center">
                  {/* Avatar placeholder - in a real app, this would be an image */}
                  <div className="w-10 h-10 rounded-full bg-black/20 dark:bg-white/20 flex items-center justify-center text-sm">
                    {getConversationDisplayName(conversation).charAt(0)}
                  </div>
                  
                  <div className="ml-3 flex-grow">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{getConversationDisplayName(conversation)}</span>
                      {conversation.lastMessageAt && (
                        <span className="text-xs text-foreground/50">
                          {new Date(conversation.lastMessageAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-foreground/60 truncate max-w-[160px]">
                        {conversation.lastMessagePreview || 'No messages yet'}
                      </span>
                      
                      {conversation.unreadCount ? (
                        <span className="ml-2 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs">
                          {conversation.unreadCount}
                        </span>
                      ) : null}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      {/* User profile area - placeholder */}
      <div className="p-4 border-t border-black/10 dark:border-white/10">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-black/20 dark:bg-white/20"></div>
          <div className="ml-2">
            <div className="text-sm font-medium">Your Name</div>
            <div className="text-xs text-foreground/50">Online</div>
          </div>
        </div>
      </div>
    </div>
  );
}
