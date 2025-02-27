"use client";

import {
  sendNotification,
  subscribeUser,
  unsubscribeUser,
} from "@/lib/actions/notification";
import { urlBase64ToUint8Array } from "@/lib/base";
import { useState, useEffect } from "react";

// import { subscribeUser, unsubscribeUser, sendNotification } from "./actions";

export default function PushNotificationManager({
  children,
}: {
  children: (props: {
    sendNotification: (text: string) => void;
    unsubscribe: () => void;
    subscribe: () => void;
    subscription: PushSubscription | null;
  }) => React.ReactNode;
}) {
  const [isSupported, setIsSupported] = useState(false);
  const [subscription, setSubscription] = useState<PushSubscription | null>(
    null
  );

  useEffect(() => {
    if ("serviceWorker" in navigator && "PushManager" in window) {
      setIsSupported(true);
      registerServiceWorker();
    }
  }, []);

  async function registerServiceWorker() {
    const registration = await navigator.serviceWorker.register("/sw.js", {
      scope: "/",
      updateViaCache: "none",
    });
    const sub = await registration.pushManager.getSubscription();
    setSubscription(sub);
  }

  async function subscribeToPush() {
    const registration = await navigator.serviceWorker.ready;
    const sub = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(
        process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
      ),
    });
    setSubscription(sub);
    const serializedSub = JSON.parse(JSON.stringify(sub));
    await subscribeUser(serializedSub);
  }

  async function unsubscribeFromPush() {
    await subscription?.unsubscribe();
    setSubscription(null);
    await unsubscribeUser();
  }

  async function sendTestNotification(message: string) {
    if (subscription) {
      await sendNotification(message);
    }
  }

  if (!isSupported) {
    return null;
  }

  return (
    <>
      {children({
        sendNotification: sendTestNotification,
        unsubscribe: unsubscribeFromPush,
        subscribe: subscribeToPush,
        subscription,
      })}
    </>
  );
}
