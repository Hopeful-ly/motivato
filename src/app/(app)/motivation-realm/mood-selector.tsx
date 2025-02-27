import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useState } from "react";

const moods = [
  "happy",
  "sad",
  "tired",
  "angry",
  "stressed",
  "excited",
  "relaxed",
  "bored",
  "anxious",
  "confused",
];

// Map moods to emoji for visual representation
const moodEmojis: Record<string, string> = {
  happy: "😊",
  sad: "😔",
  tired: "😴",
  angry: "😠",
  stressed: "😫",
  excited: "🤩",
  relaxed: "😌",
  bored: "😒",
  anxious: "😰",
  confused: "😕",
};

interface MoodSelectorProps {
  onSelect: (mood: string) => void;
  selectedMood?: string;
}

export function MoodSelector({ onSelect, selectedMood }: MoodSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {moods.map((mood) => (
        <Badge
          key={mood}
          variant={selectedMood === mood ? "default" : "outline"}
          className={cn(
            "cursor-pointer text-base py-2 px-4 capitalize",
            "hover:bg-primary/10",
            selectedMood === mood &&
              "bg-primary/10 text-foreground border-foreground/50"
          )}
          onClick={() => onSelect(mood)}
        >
          {moodEmojis[mood]} {mood}
        </Badge>
      ))}
    </div>
  );
}
