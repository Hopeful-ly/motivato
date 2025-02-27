"use server";
import { PersonalizationProfile } from "@prisma/client";
import { PersonalizationSchema, personalizationSchema } from "./schema";
import { prisma } from "@/db/prisma";
import { auth } from "@/auth";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export const setupPersonalization = async (data: PersonalizationSchema) => {
  const session = await auth();
  if (!session?.user?.id) {
    toast.error("You're not logged in...");
    redirect("/");
  }
  const result = await personalizationSchema.safeParseAsync(data);
  if (!result.success) {
    toast.error("Something went wrong");
    redirect("/");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { personalizationProfile: true },
  });

  if (!user) {
    toast.error("Something went wrong");
    redirect("/");
  }

  if (user.personalizationProfile) {
    toast.error("You've already personalized your profile");
    redirect("/");
  }

  await prisma.personalizationProfile.create({
    data: {
      userId: user.id,
      ...result.data,
    },
  });

  revalidatePath("/");
  redirect("/motivation-realm");
};
