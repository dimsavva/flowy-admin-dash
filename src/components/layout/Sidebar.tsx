import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  BarChart3,
  Users,
  FileText,
  Settings,
  HelpCircle,
  TrendingUp,
  FileBarChart,
  Target,
  UserCheck,
  Shield,
  Key,
  Edit3,
  FileImage,
  Globe,
  Lock,
  Puzzle,
  BookOpen,
  MessageCircle,
  Star,
  ChevronRight,
} from "lucide-react";
import {
  Sidebar as SidebarPrimitive,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarMenuBadge,
  useSidebar,
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

// Types for menu configuration
type MenuSubItem = {
  title: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
};

type MenuItem = {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
} & (
  | {
      url: string;
      badge?: string;
      items?: never;
    }
  | {
      url?: never;
      badge?: never;
      items: MenuSubItem[];
    }
);

// Menu configuration with multi-level structure
const menuItems: MenuItem[] = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Help & Support",
    icon: HelpCircle,
    items: [
      {
        title: "Documentation",
        url: "/help/docs",
        icon: BookOpen,
      },
      {
        title: "Contact",
        url: "/help/contact",
        icon: MessageCircle,
      },
      {
        title: "Feedback",
        url: "/help/feedback",
        icon: Star,
      },
    ],
  },
];

interface SidebarLinkProps {
  item: MenuItem & { url: string };
}

const SidebarLink = ({ item }: SidebarLinkProps) => {
  const location = useLocation();
  const isActive = location.pathname === item.url;

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        isActive={isActive}
        tooltip={item.title}
        className={cn(
          "transition-colors duration-200",
          isActive && "bg-admin-primary text-white hover:bg-admin-primary/90"
        )}
      >
        <NavLink to={item.url} className="flex items-center gap-2">
          <item.icon className="h-4 w-4" />
          <span>{item.title}</span>
          {item.badge && (
            <SidebarMenuBadge className="bg-admin-accent text-white">
              {item.badge}
            </SidebarMenuBadge>
          )}
        </NavLink>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

interface SidebarSubMenuProps {
  item: MenuItem & { items: MenuSubItem[] };
}

const SidebarSubMenu = ({ item }: SidebarSubMenuProps) => {
  const location = useLocation();
  const hasActiveChild = item.items.some(subItem => location.pathname === subItem.url);

  return (
    <Collapsible defaultOpen={hasActiveChild} className="group/collapsible">
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton
            tooltip={item.title}
            className={cn(
              "transition-colors duration-200",
              hasActiveChild && "bg-admin-muted"
            )}
          >
            <item.icon className="h-4 w-4" />
            <span>{item.title}</span>
            <ChevronRight className="ml-auto h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {item.items.map((subItem) => {
              const isActive = location.pathname === subItem.url;
              return (
                <SidebarMenuSubItem key={subItem.url}>
                  <SidebarMenuSubButton
                    asChild
                    isActive={isActive}
                    className={cn(
                      "transition-colors duration-200",
                      isActive && "bg-admin-primary text-white hover:bg-admin-primary/90"
                    )}
                  >
                    <NavLink to={subItem.url} className="flex items-center gap-2">
                      <subItem.icon className="h-4 w-4" />
                      <span>{subItem.title}</span>
                      {subItem.badge && (
                        <span className={cn(
                          "ml-auto rounded-full px-2 py-0.5 text-xs font-medium",
                          subItem.badge === "New" 
                            ? "bg-green-100 text-green-700" 
                            : "bg-admin-accent text-white"
                        )}>
                          {subItem.badge}
                        </span>
                      )}
                    </NavLink>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              );
            })}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
};

const AppSidebar = () => {
  return (
    <SidebarPrimitive
      variant="sidebar"
      collapsible="icon"
      className="border-admin-border bg-sidebar data-[mobile=true]:bg-white data-[mobile=true]:backdrop-blur-none"
    >
      <SidebarHeader className="border-b border-admin-border">
        <div className="flex items-center gap-2 px-2 py-2 group-data-[collapsible=icon]:justify-center">
          <div className="bg-admin-primary h-8 w-8 rounded flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-sm">Y</span>
          </div>
          <div className="flex flex-col group-data-[collapsible=icon]:hidden">
            <span className="text-lg font-bold text-admin-foreground">Your App</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-admin-foreground/70 font-medium">
            Main Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                if (item.items) {
                  return <SidebarSubMenu key={item.title} item={item as MenuItem & { items: MenuSubItem[] }} />;
                }
                return <SidebarLink key={item.title} item={item as MenuItem & { url: string }} />;
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

    </SidebarPrimitive>
  );
};

export default AppSidebar;
