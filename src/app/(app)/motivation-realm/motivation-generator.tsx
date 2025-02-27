"use client";

import { useCallback, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { MoodSelector } from "./mood-selector";
import { Button } from "../../../components/ui/button";
import { Textarea } from "../../../components/ui/textarea";
import { Card, CardContent } from "../../../components/ui/card";
import { Loader2 } from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/tabs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "motion/react";
import { moodRequestSchema } from "@/lib/actions/auth/schema";
import { getMotivation } from "@/lib/actions/entry";
import { toast } from "sonner";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface MotivationGeneratorProps {
  userId: string;
}
const stepFields = [["mood"], ["note"], ["type"]];

export function MotivationGenerator({ userId }: MotivationGeneratorProps) {
  const [step, setStep] = useState<0 | 1 | 2 | 3>(0);
  const form = useForm({
    resolver: zodResolver(moodRequestSchema),
    defaultValues: {
      mood: "",
      note: "",
      type: "poem",
    },
  });
  const [generation, setGeneration] = useState<boolean | string>(false);
  const canGoNext = useCallback(
    async (step: number) => {
      return await form.trigger(stepFields[step] as any);
    },
    [form]
  );

  return (
    <div className=" relative flex justify-center items-center h-[60vh]">
      <AnimatePresence>
        {step === 0 && (
          <motion.div
            key="step-0"
            className=" absolute w-full"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 1 } }}
            exit={{ opacity: 0, y: -10, transition: { duration: 0.3 } }}
          >
            <h3 className="text-lg font-medium mb-2">
              Select your current mood:
            </h3>
            <MoodSelector
              onSelect={(mood) => form.setValue("mood", mood)}
              selectedMood={form.watch("mood")}
            />
            <Button
              onClick={async () => {
                if (await canGoNext(0)) {
                  setStep(1);
                }
              }}
              disabled={!form.watch("mood")}
              className="mt-8 w-full"
            >
              Next
            </Button>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            key="step-1"
            className="absolute w-full"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 1 } }}
            exit={{ opacity: 0, y: -10, transition: { duration: 0.3 } }}
          >
            <h3 className="text-lg font-medium mb-2">
              What's on your mind? (optional)
            </h3>
            <Textarea
              placeholder="Share some thoughts about how you're feeling..."
              value={form.watch("note")}
              onChange={(e) => form.setValue("note", e.target.value)}
              className="min-h-[100px]"
            />
            <Button
              variant="link"
              className="mt-8 w-full"
              onClick={() => {
                setStep(0);
                form.reset();
              }}
            >
              Cancel
            </Button>
            <Button
              className="mt-1 w-full"
              onClick={async () => {
                if (await canGoNext(1)) {
                  setStep(2);
                }
              }}
            >
              Next
            </Button>
          </motion.div>
        )}
        {step === 2 && (
          <motion.div
            key="step-2"
            className="absolute w-full"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 1 } }}
            exit={{ opacity: 0, y: -10, transition: { duration: 0.3 } }}
          >
            <h3 className="text-xl text-left font-medium mb-2">
              Choose your motivation type:
            </h3>
            <ToggleGroup
              type="single"
              value={form.watch("type")}
              onValueChange={(value) => form.setValue("type", value as any)}
              className="w-full mt-4"
            >
              <ToggleGroupItem variant="outline" className="w-1/2" value="poem">
                Poem
              </ToggleGroupItem>
              <ToggleGroupItem
                variant="outline"
                className="w-1/2"
                value="speech"
              >
                Motivational Talk
              </ToggleGroupItem>
            </ToggleGroup>

            <Button
              variant="link"
              className="mt-8 w-full"
              onClick={() => {
                setStep(0);
                form.reset();
              }}
            >
              Cancel
            </Button>

            <Button
              className="mt-1 w-full"
              onClick={form.handleSubmit(async (data) => {
                setStep(3);
                setGeneration(true);
                const [result, success] = await getMotivation(data);
                if (!success) {
                  toast.error("Something went wrong");
                  form.reset();
                  setGeneration(false);
                  setStep(0);
                }

                setGeneration(result);
              })}
            >
              Generate
            </Button>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="generation"
            className="absolute w-full flex justify-center items-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { duration: 2, ease: "easeOut" },
            }}
            exit={{ opacity: 0, y: -10, transition: { duration: 0.3 } }}
          >
            {generation === true ? (
              <Loader2 className="animate-spin" />
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <div className="text-center space-y-2">
                  {typeof generation === "string" &&
                    generation.split("\n").map((line, index) => (
                      <motion.p
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 1.1,
                          delay: index * 0.6,
                          ease: "easeInOut",
                        }}
                        className="text-base"
                      >
                        {line || "\u00A0"}
                      </motion.p>
                    ))}
                </div>
                <Button
                  variant="secondary"
                  className="mt-8 w-full"
                  onClick={() => {
                    setStep(0);
                    form.reset();
                  }}
                >
                  Start Over
                </Button>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
