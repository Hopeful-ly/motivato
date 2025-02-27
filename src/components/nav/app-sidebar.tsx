import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Clock,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  Sparkles,
  SquareTerminal,
  Star,
} from "lucide-react";

import { NavMain } from "@/components/nav/nav-main";
import { NavProjects } from "@/components/nav/nav-projects";
import { NavUser } from "@/components/nav/nav-user";
import { TeamSwitcher } from "@/components/nav/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { auth } from "@/auth";
import NavNotifications from "./nav-notification";

export async function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const session = await auth();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <NavMain />
      </SidebarContent>
      <SidebarFooter>
        <NavNotifications />
        <NavUser user={session?.user || null} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
