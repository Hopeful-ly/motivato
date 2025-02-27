import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export type LoginMethod = "discord" | "google" | "passkey";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
