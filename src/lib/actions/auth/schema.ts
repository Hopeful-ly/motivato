import { z } from "zod";

export const moodRequestSchema = z.object({
  mood: z.string().min(1).max(20),
  note: z.string().max(200).optional(),
  type: z.enum(["poem", "speech"]),
});

export type MoodRequest = z.infer<typeof moodRequestSchema>;
