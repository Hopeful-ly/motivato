"use client";

import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

export default function Motivation() {
  const form = useFormContext();

  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="bigDream"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Big Dream</FormLabel>
            <FormControl>
              <Textarea
                placeholder="What's one big dream you are working towards?"
                className="min-h-[150px]"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="inspiration"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Inspiration</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Who or what inspires you?"
                className="min-h-[150px]"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
