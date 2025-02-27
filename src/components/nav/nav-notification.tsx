"use client";
import { Bell, BellOff, ChevronsUpDown } from "lucide-react";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import { useEffect, useState } from "react";
import PushNotificationManager from "../notifications/push-manager";

const messages = [
  "Stay focused, stay winning.",
  "Every step forward is progress.",
  "Your potential is limitless.",
  "Small progress is still progress.",
  "Believe in yourself, always.",
  "Today's efforts shape tomorrow's success.",
  "Consistency beats intensity.",
  "Embrace the journey, not just the destination.",
  "You are stronger than you think.",
  "Turn obstacles into opportunities.",
  "Success is built one habit at a time.",
  "Your only competition is yourself yesterday.",
  "Discipline creates freedom.",
  "Progress over perfection.",
  "The hardest part is starting. Begin now.",
];

export default function NavNotifications() {
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  const [message, setMessage] = useState("");

  useEffect(() => {
    setIsIOS(
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream
    );

    setIsStandalone(window.matchMedia("(display-mode: standalone)").matches);
  }, []);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <PushNotificationManager>
          {({ sendNotification, subscribe, unsubscribe, subscription }) => (
            <SidebarMenuButton
              onClick={() => {
                if (subscription) {
                  unsubscribe();
                } else {
                  subscribe();
                }
              }}
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="h-8 w-8 rounded-lg flex justify-center items-center  text-sidebar-accent-foreground">
                {subscription ? <BellOff /> : <Bell />}
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {subscription ? "Unsubscribe" : "Subscribe"}
                </span>
                <span className="truncate text-xs">
                  {subscription
                    ? "Live dangerously; no reminders"
                    : "Stop deviating; get reminders."}
                </span>
              </div>
            </SidebarMenuButton>
          )}
        </PushNotificationManager>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
