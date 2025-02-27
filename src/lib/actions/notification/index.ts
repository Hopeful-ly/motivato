"use server";

import webpush from "web-push";
import { prisma } from "@/db/prisma";
import { auth } from "@/auth";
import { messages } from "./messages";
import crypto from "crypto";

webpush.setVapidDetails(
  "mailto:" + process.env.VAPID_EMAIL,
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

function createHashedId(userId: string, endpoint: string): string {
  // Create a hash of the endpoint to keep the ID length manageable
  const hash = crypto.createHash("md5").update(endpoint).digest("hex");
  return `${userId.substring(0, 8)}_${hash}`;
}

export async function subscribeUser(sub: webpush.PushSubscription) {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, error: "User not authenticated" };
  }

  try {
    // Generate a shorter, fixed-length ID
    const hashedId = createHashedId(session.user.id, sub.endpoint);

    // Check if subscription already exists and update it
    const existingSubscription = await prisma.pushSubscription.findFirst({
      where: {
        userId: session.user.id,
        endpoint: sub.endpoint,
      },
    });

    if (existingSubscription) {
      await prisma.pushSubscription.update({
        where: {
          id: existingSubscription.id,
        },
        data: {
          endpoint: sub.endpoint,
          p256dh: sub.keys.p256dh,
          auth: sub.keys.auth,
        },
      });
    } else {
      // Create new subscription
      await prisma.pushSubscription.create({
        data: {
          id: hashedId,
          userId: session.user.id,
          endpoint: sub.endpoint,
          p256dh: sub.keys.p256dh,
          auth: sub.keys.auth,
        },
      });
    }

    return { success: true };
  } catch (error) {
    console.error("Error saving subscription:", error);
    return { success: false, error: "Failed to save subscription" };
  }
}

export async function unsubscribeUser() {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, error: "User not authenticated" };
  }

  try {
    await prisma.pushSubscription.deleteMany({
      where: { userId: session.user.id },
    });
    return { success: true };
  } catch (error) {
    console.error("Error removing subscription:", error);
    return { success: false, error: "Failed to remove subscription" };
  }
}

export async function sendNotification(message: string, userId?: string) {
  try {
    const whereClause = userId ? { userId } : {};
    const subscriptions = await prisma.pushSubscription.findMany({
      where: whereClause,
      select: {
        endpoint: true,
        p256dh: true,
        auth: true,
      },
    });

    if (subscriptions.length === 0) {
      return { success: false, error: "No subscriptions available" };
    }

    const results = await Promise.allSettled(
      subscriptions.map(async (sub) => {
        const subscription = {
          endpoint: sub.endpoint,
          keys: {
            p256dh: sub.p256dh,
            auth: sub.auth,
          },
        };

        return webpush.sendNotification(
          subscription as webpush.PushSubscription,
          JSON.stringify({
            title: "Motivato",
            body: message,
            icon: "/icon.png",
          })
        );
      })
    );

    const failures = results.filter((result) => result.status === "rejected");
    if (failures.length > 0) {
      console.error(`${failures.length} notifications failed to send`);
    }

    return {
      success: true,
      total: subscriptions.length,
      sent: subscriptions.length - failures.length,
      failed: failures.length,
    };
  } catch (error) {
    console.error("Error sending push notification:", error);
    return { success: false, error: "Failed to send notification" };
  }
}

export async function sendDailyMotivation() {
  try {
    // Get a random message from our collection
    const message = messages[Math.floor(Math.random() * messages.length)];

    // Send the notification to all subscribers
    return await sendNotification(message);
  } catch (error) {
    console.error("Error sending daily motivation:", error);
    return { success: false, error: "Failed to send daily motivation" };
  }
}
