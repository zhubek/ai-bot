# Mock Data Setup

## Overview
The database has been seeded with a mock user and two pre-configured conversations (one for each AI assistant type).

## Mock User

```
Email: test@railway.com
Name: Test User
User ID: 8d55b9b8-c9c2-4895-a4e3-55902f3f0bad
```

This user is stored in `src/lib/constants.ts` as `MOCK_USER_ID`.

## Mock Conversations

### 1. ИИ Приемщик (Receiver) - Wagon Inspection Assistant
```
Conversation ID: 85016e80-1120-4a5f-9f7b-bc7aaae565f7
Assistant: receiver
Title: Проверка вагонов
Messages: 3
```

**Conversation Flow:**
1. **Assistant**: "Здравствуйте! Я ваш помощник по приемке вагонов. Чем могу помочь?"
2. **User**: "Какие основные пункты нужно проверить при приемке вагона?"
3. **Assistant**: Lists 5 key inspection points with offer to begin inspection

### 2. ИИ Проводник (Conductor) - Passenger Service Assistant
```
Conversation ID: 6962f2b8-6ed1-4882-aae8-329f6ed00f0d
Assistant: conductor
Title: Обслуживание пассажиров
Messages: 5
```

**Conversation Flow:**
1. **Assistant**: "Добрый день! Я ваш помощник по обслуживанию пассажиров..."
2. **User**: "Как правильно встретить пассажиров в вагоне?"
3. **Assistant**: Lists 5 greeting procedures
4. **User**: "Спасибо! А что делать в экстренных ситуациях?"
5. **Assistant**: Provides emergency protocol with 5 steps

## Usage in Frontend

### Constants File
Import the mock IDs from `src/lib/constants.ts`:
```typescript
import { MOCK_USER_ID, MOCK_CONVERSATIONS } from "@/lib/constants";

// Get conversation ID for selected assistant
const conversationId = MOCK_CONVERSATIONS[assistant.id]; // "receiver" or "conductor"
```

### API Calls

#### Get User's Conversations
```typescript
const response = await fetch(`/api/conversations?userId=${MOCK_USER_ID}`);
const conversations = await response.json();
```

#### Get Conversation Messages
```typescript
const conversationId = MOCK_CONVERSATIONS.receiver; // or .conductor
const response = await fetch(`/api/conversations/${conversationId}/messages`);
const messages = await response.json();
```

#### Add New Message
```typescript
await fetch(`/api/conversations/${conversationId}/messages`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    role: 'user',
    content: 'Your message here',
    messageType: 'text'
  })
});
```

## Resetting Mock Data

To reset the database to the initial mock state:

```bash
npm run db:seed
```

⚠️ **Warning**: This will delete all existing data and recreate the mock user and conversations with new IDs. You'll need to update the IDs in `src/lib/constants.ts`.

## Updating Constants After Reseed

After running `npm run db:seed`, the script outputs the new IDs:
```
📝 Mock User ID: [new-user-id]
📝 Receiver Conversation ID: [new-receiver-id]
📝 Conductor Conversation ID: [new-conductor-id]
```

Copy these IDs and update `src/lib/constants.ts`:
```typescript
export const MOCK_USER_ID = "[new-user-id]";

export const MOCK_CONVERSATIONS = {
  receiver: "[new-receiver-id]",
  conductor: "[new-conductor-id]",
};
```

## Integration with ChatInterface

When a user selects an assistant, the frontend should:
1. Get the conversation ID for that assistant type from `MOCK_CONVERSATIONS`
2. Fetch existing messages using the conversation ID
3. Display the chat history
4. Allow adding new messages to the same conversation

Example:
```typescript
// When assistant is selected
const conversationId = MOCK_CONVERSATIONS[assistant.id]; // "receiver" or "conductor"

// Load existing messages
const messages = await fetch(`/api/conversations/${conversationId}/messages`)
  .then(res => res.json());

// Display messages in chat
setMessages(messages.map(msg => ({
  ...msg,
  timestamp: new Date(msg.createdAt)
})));
```

## Database Schema Summary

- **Users**: Store user information
- **Conversations**: One per assistant type per user
- **Messages**: All chat messages (user & assistant)

Each assistant selection loads its respective pre-existing conversation, allowing continuity across sessions.
