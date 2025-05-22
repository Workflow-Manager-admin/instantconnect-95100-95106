// PUBLIC_INTERFACE
export interface User {
  /**
   * Unique identifier for the user
   */
  id: string;
  
  /**
   * Display name of the user
   */
  name: string;
  
  /**
   * URL to the user's avatar/profile picture
   */
  avatarUrl?: string;
  
  /**
   * User's online status
   */
  status?: 'online' | 'offline' | 'away' | 'busy';
}

// PUBLIC_INTERFACE
export interface Message {
  /**
   * Unique identifier for the message
   */
  id: string;
  
  /**
   * Content of the message
   */
  content: string;
  
  /**
   * ID of the sender
   */
  senderId: string;
  
  /**
   * Timestamp when the message was sent
   */
  timestamp: Date;
  
  /**
   * Whether the message has been read
   */
  read?: boolean;
  
  /**
   * Type of message for future extensions (text, image, etc.)
   */
  type?: 'text' | 'image' | 'file' | 'system';
}

// PUBLIC_INTERFACE
export interface Conversation {
  /**
   * Unique identifier for the conversation
   */
  id: string;
  
  /**
   * Name of the conversation (for group chats)
   */
  name?: string;
  
  /**
   * Type of conversation
   */
  type: 'direct' | 'group';
  
  /**
   * IDs of the participants in the conversation
   */
  participantIds: string[];
  
  /**
   * Timestamp of the last message
   */
  lastMessageAt?: Date;
  
  /**
   * Preview of the last message
   */
  lastMessagePreview?: string;
  
  /**
   * Count of unread messages
   */
  unreadCount?: number;
}

// Placeholder for mock data to be used in the UI until we have real data
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    status: 'online',
    avatarUrl: 'https://i.pravatar.cc/150?img=1',
  },
  {
    id: '2',
    name: 'Jane Smith',
    status: 'offline',
    avatarUrl: 'https://i.pravatar.cc/150?img=5',
  },
];

export const mockConversations: Conversation[] = [
  {
    id: '1',
    type: 'direct',
    participantIds: ['1', '2'],
    lastMessageAt: new Date(),
    lastMessagePreview: 'Hey, how are you?',
    unreadCount: 2,
  },
  {
    id: '2',
    name: 'Project Team',
    type: 'group',
    participantIds: ['1', '2', '3'],
    lastMessageAt: new Date(Date.now() - 3600000),
    lastMessagePreview: 'Meeting at 3pm tomorrow',
  },
];

export const mockMessages: Message[] = [
  {
    id: '1',
    content: 'Hey, how are you?',
    senderId: '1',
    timestamp: new Date(Date.now() - 3600000 * 2),
    read: true,
  },
  {
    id: '2',
    content: 'I\'m good, thanks! How about you?',
    senderId: '2',
    timestamp: new Date(Date.now() - 3600000),
    read: true,
  },
  {
    id: '3',
    content: 'Doing well. Let\'s catch up soon.',
    senderId: '1',
    timestamp: new Date(),
    read: false,
  },
];
