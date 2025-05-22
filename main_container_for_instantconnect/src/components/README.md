# InstantConnect Main Container

This directory contains the components for the InstantConnect messaging application's main interface. The application provides a modern, responsive layout for real-time messaging with support for one-on-one and group chats.

## Component Structure

- `ChatContainer.tsx`: The main container component that orchestrates the layout and communication between child components.
- `Sidebar/`: Contains components related to the conversation list and user profile.
  - `Sidebar.tsx`: Displays the list of conversations with previews of last messages.
- `MessageArea/`: Contains components related to displaying conversation messages.
  - `MessageArea.tsx`: Displays the conversation header and message history.
- `MessageInput/`: Contains components for composing new messages.
  - `MessageInput.tsx`: Provides a text input area and send button for composing messages.

## Features

- Responsive design that works well on both mobile and desktop devices
- Chat list with conversation previews and unread message indicators
- Message history view with distinct styling for sent and received messages
- Message input with support for Enter key to send messages

## Future Extensions

To extend this component with real-time functionality, consider the following:

1. **Real-time Communication**: 
   - Integrate with Socket.io, Firebase, or another real-time communication service.
   - Implement listeners for new messages and conversation updates.

2. **Authentication**: 
   - Add user authentication and maintain the current user's state.
   - Update the user profile section with the authenticated user's information.

3. **Advanced Features**:
   - Add typing indicators to show when someone is composing a message.
   - Implement read receipts to show when messages have been seen.
   - Add support for sending images, files, and other media.
   - Implement message reactions and replies.

4. **Performance Optimizations**:
   - Implement pagination for message history to handle large conversations.
   - Add virtual scrolling for efficient rendering of large message lists.

## Usage

To use this component, simply import the ChatContainer into your page:

```tsx
import ChatContainer from "@/components/ChatContainer";

export default function Page() {
  return <ChatContainer />;
}
```

## TypeScript Interfaces

The component uses several interfaces defined in `@/types/index.ts`:

- `User`: Represents a user with properties like ID, name, avatar, and status.
- `Message`: Represents a chat message with content, sender ID, timestamp, etc.
- `Conversation`: Represents a chat conversation with participants, message history, etc.

These interfaces should be used when integrating with backend services to ensure type safety.
