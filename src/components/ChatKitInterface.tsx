"use client";

import { ChatKit, useChatKit } from "@openai/chatkit-react";
import { Button } from "@/components/ui/button";
import { AIAssistant } from "@/types/chat";
import { ArrowLeft } from "lucide-react";
import { WagonIcon, AttendantIcon } from "@/components/icons";
import { useEffect, useState } from "react";

interface ChatKitInterfaceProps {
  assistant: AIAssistant;
  userId: string;
  onBack: () => void;
}

export function ChatKitInterface({ assistant, userId, onBack }: ChatKitInterfaceProps) {
  console.log("[ChatKitInterface] Component mounted, assistant:", assistant.id, "userId:", userId);

  const { control } = useChatKit({
    api: {
      async getClientSecret(existing) {
        console.log("[ChatKitInterface] getClientSecret called, existing:", existing, "userId:", userId);

        // If we have an existing session that's still valid, return it
        if (existing) {
          console.log("[ChatKitInterface] Using existing session");
          return existing;
        }

        // Otherwise, create a new session
        console.log("[ChatKitInterface] Creating new session for userId:", userId);
        const response = await fetch("/api/chatkit/session", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId }),
        });

        if (!response.ok) {
          console.error("[ChatKitInterface] Session creation failed:", response.status);
          throw new Error("Failed to create ChatKit session");
        }

        const data = await response.json();
        console.log("[ChatKitInterface] Session created, client_secret:", data.client_secret ? "present" : "missing");
        return data.client_secret;
      },
    },
  });

  console.log("[ChatKitInterface] useChatKit hook returned control:", control);

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="relative bg-gradient-to-r from-primary via-accent to-primary p-[1px]">
        <div className="bg-card">
          <div className="flex items-center gap-4 px-6 py-4">
            <Button
              size="icon"
              variant="ghost"
              onClick={onBack}
              className="flex-shrink-0 hover:bg-primary/10"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-4 flex-1 min-w-0">
              <div className={`p-3 rounded-xl bg-gradient-to-br ${assistant.icon === "wagon" ? "from-blue-500 to-purple-600" : "from-purple-500 to-pink-600"} shadow-md flex-shrink-0`}>
                <div className="text-white">
                  {assistant.icon === "wagon" ? (
                    <WagonIcon className="w-6 h-6" />
                  ) : (
                    <AttendantIcon className="w-6 h-6" />
                  )}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="font-bold text-lg truncate bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {assistant.name}
                </h2>
                <p className="text-xs text-muted-foreground truncate">
                  AI ассистент для вашей компании
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ChatKit Component */}
      <div className="flex-1 overflow-hidden">
        <ChatKit control={control} className="h-full w-full" />
      </div>
    </div>
  );
}
