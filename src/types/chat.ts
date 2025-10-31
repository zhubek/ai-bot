export type AIAssistant = {
  id: string;
  name: string;
  description: string;
  icon: "wagon" | "attendant";
  disabled?: boolean;
};

export type MessageType = "text" | "audio" | "image";

export type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  type: MessageType;
  imageUrl?: string;
  audioUrl?: string;
  timestamp: Date;
  isStreaming?: boolean;
};

export const AI_ASSISTANTS: AIAssistant[] = [
  {
    id: "receiver",
    name: "ИИ Приемщик",
    description: "Помощник для приема вагонов",
    icon: "wagon",
  },
  {
    id: "conductor",
    name: "ИИ Проводник",
    description: "Помощник для обслуживания пассажиров",
    icon: "attendant",
    disabled: true,
  },
];
