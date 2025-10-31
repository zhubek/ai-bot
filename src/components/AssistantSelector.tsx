"use client";

import { AIAssistant, AI_ASSISTANTS } from "@/types/chat";
import { WagonIcon, AttendantIcon } from "@/components/icons";

interface AssistantSelectorProps {
  selectedAssistant: AIAssistant | null;
  onSelect: (assistant: AIAssistant) => void;
}

export function AssistantSelector({
  selectedAssistant,
  onSelect,
}: AssistantSelectorProps) {
  const getIcon = (iconType: "wagon" | "attendant") => {
    if (iconType === "wagon") {
      return <WagonIcon className="w-10 h-10" />;
    }
    return <AttendantIcon className="w-10 h-10" />;
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
          AI Помощник
        </h1>
        <p className="text-muted-foreground">
          Выберите специалиста для консультации
        </p>
      </div>
      <div className="grid gap-4">
        {AI_ASSISTANTS.map((assistant) => {
          const isSelected = selectedAssistant?.id === assistant.id;
          const isDisabled = assistant.disabled;
          const gradientClass = assistant.id === "receiver"
            ? "from-blue-500/10 via-purple-500/10 to-blue-500/10"
            : "from-purple-500/10 via-pink-500/10 to-purple-500/10";

          return (
            <button
              key={assistant.id}
              className={`group relative p-6 transition-all duration-300 rounded-2xl overflow-hidden ${
                isDisabled
                  ? "cursor-not-allowed opacity-60"
                  : isSelected
                  ? "cursor-pointer shadow-lg shadow-primary/20 scale-[1.02]"
                  : "cursor-pointer hover:shadow-md hover:scale-[1.01]"
              }`}
              onClick={() => !isDisabled && onSelect(assistant)}
              disabled={isDisabled}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${gradientClass} ${isDisabled ? "opacity-30" : "opacity-50 group-hover:opacity-70"} transition-opacity`} />
              <div className="absolute inset-0 bg-card" />
              <div className="relative flex items-center gap-5">
                <div className={`p-4 rounded-xl bg-gradient-to-br ${assistant.id === "receiver" ? "from-blue-500 to-purple-600" : "from-purple-500 to-pink-600"} shadow-lg ${isDisabled ? "" : "transform group-hover:scale-110"} transition-transform`}>
                  <div className="text-white">
                    {getIcon(assistant.icon)}
                  </div>
                </div>
                <div className="flex-1 text-left space-y-1">
                  <h3 className="font-bold text-xl text-foreground">
                    {assistant.name}
                    {isDisabled && (
                      <span className="ml-2 text-sm font-normal text-muted-foreground">
                        (Скоро)
                      </span>
                    )}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {assistant.description}
                  </p>
                </div>
                {!isDisabled && (
                  <svg
                    className="w-6 h-6 text-primary opacity-0 group-hover:opacity-100 transition-opacity"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
