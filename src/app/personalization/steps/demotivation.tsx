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

export default function Demotivation() {
  const form = useFormContext();

  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="obstacles"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Obstacles</FormLabel>
            <FormControl>
              <Textarea
                placeholder="What are the 3 biggest Obstacles in your life right now?"
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
        name="fears"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Fears</FormLabel>
            <FormControl>
              <Textarea
                placeholder="What are your biggest fears?"
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
        name="regrets"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Regrets</FormLabel>
            <FormControl>
              <Textarea
                placeholder="What are your biggest regrets?"
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
