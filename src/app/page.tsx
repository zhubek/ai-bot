"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { AssistantSelector } from "@/components/AssistantSelector";
import { ChatKitInterface } from "@/components/ChatKitInterface";
import { AIAssistant, AI_ASSISTANTS } from "@/types/chat";

export default function Home() {
  const [selectedAssistant, setSelectedAssistant] =
    useState<AIAssistant | null>(null);
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");

  // Load assistant from URL if specified
  useEffect(() => {
    const assistantId = searchParams.get("assistant");
    if (assistantId && !selectedAssistant) {
      const assistant = AI_ASSISTANTS.find((a) => a.id === assistantId);
      if (assistant) {
        setSelectedAssistant(assistant);
      }
    }
  }, [searchParams, selectedAssistant]);

  // Redirect to userId if not present
  if (!userId) {
    return (
      <div className="min-h-screen bg-background p-4 flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-foreground">
            User ID Required
          </h1>
          <p className="text-muted-foreground">
            Please provide a userId in the URL: ?userId=your-id
          </p>
        </div>
      </div>
    );
  }

  if (selectedAssistant) {
    return (
      <ChatKitInterface
        assistant={selectedAssistant}
        userId={userId}
        onBack={() => setSelectedAssistant(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 flex items-center justify-center">
      <div className="w-full max-w-md">
        <AssistantSelector
          selectedAssistant={selectedAssistant}
          onSelect={setSelectedAssistant}
        />
      </div>
    </div>
  );
}
