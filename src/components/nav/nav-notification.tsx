"use client";
import { Bell, BellOff } from "lucide-react";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import PushNotificationManager from "../notifications/push-manager";

export default function NavNotifications() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <PushNotificationManager>
          {({ subscribe, unsubscribe, subscription }) => (
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
