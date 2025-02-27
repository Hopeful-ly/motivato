import { z } from "zod";

export const personalizationSchema = z.object({
  firstname: z
    .string({
      message: "First name is invalid",
    })
    .min(1, { message: "First name is required" })
    .max(50, { message: "First name must be less than 50 characters" })
    .regex(/^[a-zA-Z\s-']+$/, {
      message:
        "First name can only contain letters, spaces, hyphens and apostrophes",
    }),
  lastname: z
    .string({
      message: "Last name is invalid",
    })
    .min(1, { message: "Last name is required" })
    .max(50, { message: "Last name must be less than 50 characters" })
    .regex(/^[a-zA-Z\s-']+$/, {
      message:
        "Last name can only contain letters, spaces, hyphens and apostrophes",
    }),

  about: z
    .string({
      message: "About is invalid",
    })
    .max(1000, { message: "About section must be less than 1000 characters" })
    .optional(),
  bigDream: z
    .string({
      message: "Big dream is invalid",
    })
    .max(1000, { message: "Big dream must be less than 1000 characters" })
    .optional(),
  inspiration: z
    .string({
      message: "Inspiration is invalid",
    })
    .max(1000, { message: "Inspiration must be less than 1000 characters" })
    .optional(),
  obstacles: z
    .string({
      message: "Obstacles is invalid",
    })
    .max(1000, { message: "Obstacles must be less than 1000 characters" })
    .optional(),
  fears: z
    .string({
      message: "Fears is invalid",
    })
    .max(1000, { message: "Fears must be less than 1000 characters" })
    .optional(),
  regrets: z
    .string({
      message: "Regrets is invalid",
    })
    .max(1000, { message: "Regrets must be less than 1000 characters" })
    .optional(),
});

export type PersonalizationSchema = z.infer<typeof personalizationSchema>;
