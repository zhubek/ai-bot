# OpenAI Agents Integration

The application has been successfully integrated with OpenAI Agents JS for AI-powered chat responses.

## Setup Instructions

### 1. Add Your OpenAI API Key

Open the `.env` file and replace the placeholder with your actual OpenAI API key:

```bash
OPENAI_API_KEY="sk-your-actual-api-key-here"
```

Get your API key from: https://platform.openai.com/api-keys

### 2. Start the Services

Make sure both PostgreSQL and the Next.js dev server are running:

```bash
# Start PostgreSQL (if not already running)
docker compose up -d postgres

# Start Next.js dev server (if not already running)
npm run dev
```

### 3. Test the Integration

1. Open http://localhost:3000 in your browser
2. Select one of the AI assistants:
   - **ИИ Приемщик** (Wagon Inspector) - Helps with railway wagon inspection
   - **ИИ Проводник** (Conductor) - Helps with passenger service
3. The chat will load existing conversation history from the database
4. Type a message and send it
5. The AI will respond with streaming text (appears character by character)

## How It Works

### Agent Configuration

Two specialized agents are configured in `src/lib/agents/`:

- **receiver-agent.ts** - Railway wagon inspection assistant
  - Expert in technical inspections
  - Focuses on safety and procedures
  - Responds in professional Russian

- **conductor-agent.ts** - Passenger service assistant
  - Expert in customer service
  - Focuses on safety and comfort
  - Responds in friendly Russian

### Flow

1. **User sends message** → Saved to database immediately
2. **Frontend calls** `/api/chat/stream` with conversationId and message
3. **Backend**:
   - Loads conversation history from database
   - Selects appropriate agent (receiver or conductor)
   - Runs agent with conversation context
   - Streams response back to frontend
   - Saves complete response to database
4. **Frontend** displays streaming response character by character

### API Endpoints

#### Stream Chat Response
```
POST /api/chat/stream
Body: {
  "conversationId": "uuid",
  "message": "user message"
}
Returns: Streaming response (text/event-stream)
```

#### Get Messages
```
GET /api/conversations/{conversationId}/messages
Returns: Array of messages with full history
```

## Architecture

```
┌─────────────────┐
│   Frontend      │
│ (ChatInterface) │
└────────┬────────┘
         │
         │ POST /api/chat/stream
         │
┌────────▼────────┐
│  API Route      │
│ (stream)        │
└────────┬────────┘
         │
         ├─→ Load conversation history from DB
         │
┌────────▼────────┐
│  Agent Runner   │
│  (runner.ts)    │
└────────┬────────┘
         │
         ├─→ Select agent (receiver/conductor)
         ├─→ Build context with history
         ├─→ Run OpenAI Agents with streaming
         │
┌────────▼────────┐
│  OpenAI Agent   │
│  (gpt-4o)       │
└────────┬────────┘
         │
         │ Stream response
         │
┌────────▼────────┐
│   Database      │
│  Save response  │
└─────────────────┘
```

## Features Implemented

- ✅ Two specialized agents with Russian instructions
- ✅ Conversation history context loading
- ✅ Real-time streaming responses
- ✅ Database persistence for all messages
- ✅ Error handling and retry logic
- ✅ Loading states and user feedback
- ✅ Conversation continuity across sessions

## Testing Checklist

- [ ] Add valid OPENAI_API_KEY to .env
- [ ] Start PostgreSQL: `docker compose up -d postgres`
- [ ] Start dev server: `npm run dev`
- [ ] Open http://localhost:3000
- [ ] Select ИИ Приемщик (receiver)
- [ ] See existing conversation history loaded
- [ ] Send a message about wagon inspection
- [ ] Verify streaming response appears
- [ ] Go back and select ИИ Проводник (conductor)
- [ ] See different conversation history
- [ ] Send a message about passenger service
- [ ] Verify streaming response appears
- [ ] Check database to confirm messages are saved:
  ```bash
  docker exec ai-bot-postgres psql -U postgres -d aibot -c "SELECT * FROM messages ORDER BY \"createdAt\" DESC LIMIT 5;"
  ```

## Example Test Messages

### For ИИ Приемщик (Receiver)
- "Какие документы нужны при приемке вагона?"
- "Как проверить тормозную систему?"
- "Что делать если обнаружены повреждения?"

### For ИИ Проводник (Conductor)
- "Как вести себя с трудными пассажирами?"
- "Что делать при медицинской чрезвычайной ситуации?"
- "Как правильно проверить билеты?"

## Troubleshooting

### "Failed to generate response"
- Check that OPENAI_API_KEY is set correctly in .env
- Verify you have API credits in your OpenAI account
- Check the terminal for detailed error messages

### "Failed to load conversation history"
- Ensure PostgreSQL is running: `docker compose ps`
- Check database connection: `curl http://localhost:3000/api/health`
- Verify conversation IDs in `src/lib/constants.ts` match the seeded data

### Messages not persisting
- Check Prisma logs in the terminal
- Verify database connection in .env is correct
- Try reseeding: `npm run db:seed`

## Next Steps

Potential enhancements:
1. Add tool calling for wagon inspection checklists
2. Implement image upload for damage reports
3. Add voice input for hands-free operation
4. Create admin dashboard for conversation monitoring
5. Add multi-agent handoffs between specialists
6. Implement conversation search and filtering
