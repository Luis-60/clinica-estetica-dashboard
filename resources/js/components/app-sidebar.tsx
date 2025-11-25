import { NavFooter } from "@/components/nav-footer";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { type NavItem } from "@/types";
import { Link, usePage } from "@inertiajs/react";
import {
  LayoutGrid,
  Users,
  Calendar,
  FileText,
  Settings,
  User,
  Scissors,
  Pill,
} from "lucide-react";
import AppLogo from "./app-logo";

export function AppSidebar() {
  const { props } = usePage();
  const auth = props.auth as { user: any };

  const adminNavItems: NavItem[] = [
    {
      title: "Dashboard",
      href: route("dashboard"),
      icon: LayoutGrid,
    },
    {
      title: "Pacientes",
      href: "/pacientes",
      icon: Users,
    },
    {
      title: "Consultas",
      href: "/consultas",
      icon: Calendar,
    },
    {
      title: "Procedimentos",
      href: "/procedimentos",
      icon: Scissors,
    },
    {
      title: "Medicamentos",
      href: "/medicamentos",
      icon: Pill,
    },
  ];

  const userNavItems: NavItem[] = [
    {
      title: "Dashboard",
      href: route("dashboard"),
      icon: LayoutGrid,
    },
  ];

  // 🔥 ESCOLHE O MENU BASEADO NA ROLE
  const navItems =
    auth.user.role === "admin" ? adminNavItems : userNavItems;

  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href={route("dashboard")} prefetch>
                <AppLogo />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {/* 🔥 PASSA SOMENTE O MENU CORRESPONDENTE */}
        <NavMain items={navItems} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
