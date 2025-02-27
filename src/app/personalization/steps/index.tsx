"use client";
import {
  PersonalizationSchema,
  personalizationSchema,
} from "@/lib/actions/personalization/schema";
import { defineStepper } from "@/components/ui/stepper";
import { Button } from "@/components/ui/button";
import Personal from "./personal";
import Motivation from "./motivation";
import Demotivation from "./demotivation";
import MoreStuff from "./more-stuff";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { useCallback, useState } from "react";
import { z } from "zod";
import { setupPersonalization } from "@/lib/actions/personalization";
import { Loader2 } from "lucide-react";

const {
  StepperProvider,
  StepperControls,
  StepperNavigation,
  StepperStep,
  StepperTitle,
} = defineStepper(
  {
    id: "1",
    title: "About yourself",
  },
  {
    id: "2",
    title: "What Motivates you",
  },
  {
    id: "3",
    title: "What Demotivates you",
  },
  {
    id: "4",
    title: "Finishing Touches",
  }
);

export default function Steps() {
  const form = useForm({
    resolver: zodResolver(
      personalizationSchema.extend({
        tosAgreement: z.literal(true, {
          errorMap: () => ({
            message: "You must agree to the terms of service",
          }),
        }),
        privacyAgreement: z.literal(true, {
          errorMap: () => ({
            message: "You must agree to the privacy policy",
          }),
        }),
        redPill: z.literal(true, {
          message: "You don't belong here",
        }),
      })
    ),
  });

  const [isLoading, setLoading] = useState(false);

  const onSubmit = async (data: PersonalizationSchema) => {
    setLoading(true);
    await setupPersonalization(data);
  };

  const weCanGoNext = useCallback(
    async (step: string) => {
      const partFields = [
        ["firstname", "lastname", "about"],
        ["bigDream", "inspiration"],
        ["obstacles", "fears", "regrets"],
        ["tosAgreement", "privacyAgreement", "redPill"],
      ] as const;
      const stepIndex = parseInt(step) - 1;
      if (stepIndex < 0 || stepIndex >= partFields.length) return false;

      const fieldsToCheck = partFields[stepIndex];
      return form.trigger(fieldsToCheck);
    },
    [form]
  );

  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Get things right.</CardTitle>
        <CardDescription>
          Let&apos;s not beat around the bush, be concrete.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <StepperProvider className="space-y-4" variant="horizontal">
          {({ methods }) => (
            <Form {...form}>
              <div className="space-y-8">
                <StepperNavigation>
                  {methods.all.map((step) => (
                    <StepperStep
                      key={step.id}
                      of={step.id}
                      onClick={async () => {
                        // Skip if trying to go to a previous step
                        if (parseInt(step.id) < parseInt(methods.current.id)) {
                          return methods.goTo(step.id);
                        }

                        // Check all steps from current to target
                        for (
                          let i = parseInt(methods.current.id);
                          i < parseInt(step.id);
                          i++
                        ) {
                          const isValid = await weCanGoNext(i.toString());
                          if (!isValid) {
                            return;
                          }
                        }

                        methods.goTo(step.id);
                      }}
                    >
                      <StepperTitle>{step.title}</StepperTitle>
                    </StepperStep>
                  ))}
                </StepperNavigation>

                <div className="max-h-96 overflow-auto inline-block w-full ">
                  <ScrollArea>
                    <div className="px-4 py-4">
                      {methods.switch({
                        "1": () => <Personal />,
                        "2": () => <Motivation />,
                        "3": () => <Demotivation />,
                        "4": () => <MoreStuff />,
                      })}
                    </div>
                  </ScrollArea>
                </div>
                <StepperControls>
                  {!methods.isLast && (
                    <Button
                      variant="secondary"
                      onClick={methods.prev}
                      disabled={methods.isFirst}
                    >
                      Previous
                    </Button>
                  )}
                  <Button
                    disabled={isLoading}
                    onClick={async () => {
                      if (methods.isLast) {
                        form.handleSubmit(onSubmit)();
                      }
                      const bruh = await weCanGoNext(methods.current.id);
                      if (!bruh) {
                        return console.log(bruh);
                      }
                      methods.next();
                    }}
                  >
                    {methods.isLast ? "Finish" : "Next"}
                    {isLoading && <Loader2 className="animate-spin" />}
                  </Button>
                </StepperControls>
              </div>
            </Form>
          )}
        </StepperProvider>
      </CardContent>
    </Card>
  );
}
