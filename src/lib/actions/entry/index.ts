"use server";
import { generateText, streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import { prisma } from "@/db/prisma";
import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { MoodRequest, moodRequestSchema } from "../auth/schema";

export async function getMotivation(request: MoodRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return ["", false];
  }
  const parseResult = await moodRequestSchema.safeParseAsync(request);
  if (!parseResult.success) {
    return ["", false];
  }

  const data = parseResult.data;
  // Get user's personalization profile for context
  const profile = await prisma.personalizationProfile.findUnique({
    where: { userId: session.user.id },
    include: { user: true },
  });
  if (!profile) {
    return ["", false];
  }

  // Build a context from the profile data
  const userContext = profile
    ? `
    Hi my name is: ${profile.firstname} ${profile.lastname}
    About me: ${profile.about || "I'm not gonna say much"}
    My big dream: ${profile.bigDream || "Still figuring this out"}
    What inspires me: ${profile.inspiration || "I'm looking for inspiration"}
    Challenges I face: ${profile.obstacles || "Nothing major at the moment"}
    My fears: ${profile.fears || "I don't talk about these much"}
    My regrets: ${profile.regrets || "I try not to dwell on the past"}
  `
    : "Hey; I don't have much to say.\nI feel like i need to hear something.";

  const systemPrompt =
    data.type === "poem"
      ? `You are a skilled poet who creates personalized poems based on a user's mood and personal context. 
       Create a short, inspiring poem (maximum 8 lines) that addresses the user's current mood: ${data.mood}.
       Make it feel personally relevant to the user based on their profile information.`
      : `You are a motivational coach who creates personalized pep talks based on a user's mood and personal context.
       Create a short, inspiring motivational message (3-4 sentences) that addresses the user's current mood: ${data.mood}.
       Make it feel personally relevant to the user based on their profile information.`;

  const result = await generateText({
    model: openai("gpt-3.5-turbo"),
    system: systemPrompt,
    prompt: `I'm feeling ${data.mood} today. Here's some context about me: ${userContext}`,
    temperature: 0.8,
  });

  await prisma.moodEntry.create({
    data: {
      mood: data.mood,
      response: result.text,
      userId: session.user.id,
      note: data.note,
    },
  });

  return [result.text, true];
}
