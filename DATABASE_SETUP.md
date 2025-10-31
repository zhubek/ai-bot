# Database Setup Complete ✅

## Infrastructure

### Docker Compose
- **PostgreSQL 16**: Running on port 5432
- **Next.js App**: Running on port 3000 (currently in dev mode locally)
- Volumes: Persistent storage for PostgreSQL data

### Database Schema

#### Users Table
```sql
- id: UUID (Primary Key)
- email: String (Unique, Optional)
- name: String (Optional)
- createdAt: DateTime
- updatedAt: DateTime
```

#### Conversations Table
```sql
- id: UUID (Primary Key)
- userId: UUID (Foreign Key, Optional)
- assistant: String ("receiver" or "conductor")
- title: String (Optional)
- createdAt: DateTime
- updatedAt: DateTime
```

#### Messages Table
```sql
- id: UUID (Primary Key)
- conversationId: UUID (Foreign Key)
- role: String ("user" or "assistant")
- content: Text
- messageType: String ("text", "audio", or "image")
- imageUrl: String (Optional)
- audioUrl: String (Optional)
- createdAt: DateTime
```

## API Endpoints

### Health Check
```bash
GET /api/health
Response: {"status":"ok","database":"connected","timestamp":"..."}
```

### Conversations
```bash
# List all conversations
GET /api/conversations

# Get conversations for specific user
GET /api/conversations?userId={userId}

# Create new conversation
POST /api/conversations
Body: {"assistant":"receiver","title":"Chat Title","userId":"optional"}
```

### Messages
```bash
# Get all messages in a conversation
GET /api/conversations/{id}/messages

# Add a new message
POST /api/conversations/{id}/messages
Body: {
  "role":"user",
  "content":"Message text",
  "messageType":"text",
  "imageUrl":"optional",
  "audioUrl":"optional"
}
```

## Testing

### Run Test Script
```bash
./test-api.sh
```

### Manual Testing
```bash
# 1. Health check
curl http://localhost:3000/api/health

# 2. Create conversation
curl -X POST http://localhost:3000/api/conversations \
  -H "Content-Type: application/json" \
  -d '{"assistant":"receiver","title":"Test"}'

# 3. Add message
curl -X POST http://localhost:3000/api/conversations/{id}/messages \
  -H "Content-Type: application/json" \
  -d '{"role":"user","content":"Hello","messageType":"text"}'
```

### Database Verification
```bash
# Check conversations
docker exec ai-bot-postgres psql -U postgres -d aibot -c "SELECT * FROM conversations;"

# Check messages
docker exec ai-bot-postgres psql -U postgres -d aibot -c "SELECT * FROM messages;"
```

## Environment Variables

`.env` file:
```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/aibot?schema=public"
```

## Starting Services

### Start PostgreSQL only
```bash
docker compose up -d postgres
```

### Start all services (including app in Docker)
```bash
docker compose up -d
```

### Stop services
```bash
docker compose down
```

### Stop and remove volumes
```bash
docker compose down -v
```

## Prisma Commands

### Generate Prisma Client
```bash
npx prisma generate
```

### Create Migration
```bash
npx prisma migrate dev --name migration_name
```

### View Database in Prisma Studio
```bash
npx prisma studio
```

### Reset Database
```bash
npx prisma migrate reset
```

## Test Results ✅

- ✅ PostgreSQL running in Docker
- ✅ Database connection successful
- ✅ Migrations applied successfully
- ✅ Health check endpoint working
- ✅ Create conversation working
- ✅ Add messages working
- ✅ Get messages working
- ✅ List conversations working
- ✅ Data persisting in PostgreSQL

## Next Steps

1. Integrate API calls into frontend chat interface
2. Add user authentication
3. Implement AI responses (OpenAI/Anthropic integration)
4. Add file upload for images/audio
5. Implement conversation history loading
6. Add real-time updates with WebSockets
