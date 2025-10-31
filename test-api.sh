#!/bin/bash

echo "=== Testing AI Bot API ==="
echo ""

echo "1. Health Check:"
curl -s http://localhost:3000/api/health
echo -e "\n"

echo "2. Create Conversation:"
CONV=$(curl -s -X POST http://localhost:3000/api/conversations \
  -H "Content-Type: application/json" \
  -d '{"assistant":"receiver","title":"Test Conversation"}')
echo $CONV
CONV_ID=$(echo $CONV | grep -o '"id":"[^"]*"' | cut -d'"' -f4)
echo -e "\nConversation ID: $CONV_ID\n"

echo "3. Add User Message:"
curl -s -X POST "http://localhost:3000/api/conversations/$CONV_ID/messages" \
  -H "Content-Type: application/json" \
  -d "{\"role\":\"user\",\"content\":\"Hello from test\",\"messageType\":\"text\"}"
echo -e "\n"

echo "4. Add Assistant Message:"
curl -s -X POST "http://localhost:3000/api/conversations/$CONV_ID/messages" \
  -H "Content-Type: application/json" \
  -d "{\"role\":\"assistant\",\"content\":\"Hello! I am here to help.\",\"messageType\":\"text\"}"
echo -e "\n"

echo "5. Get All Messages:"
curl -s "http://localhost:3000/api/conversations/$CONV_ID/messages"
echo -e "\n"

echo "6. List All Conversations:"
curl -s http://localhost:3000/api/conversations
echo -e "\n"

echo "=== Test Complete ==="
