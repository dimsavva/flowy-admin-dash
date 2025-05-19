
import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Home,
  Users,
  ShoppingBag,
  Settings,
  LayoutDashboard,
  BarChart3,
  FileText,
  HelpCircle,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  title: string;
  isCollapsed: boolean;
}

const SidebarLink = ({ to, icon, title, isCollapsed }: SidebarLinkProps) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
          {
            "bg-admin-primary text-white": isActive,
            "hover:bg-admin-muted": !isActive,
            "justify-center": isCollapsed,
            "justify-start": !isCollapsed,
          }
        )
      }
    >
      <div className={cn("text-lg", isActive && isCollapsed ? "text-white" : "text-gray-500")}>
        {icon}
      </div>
      {!isCollapsed && <span>{title}</span>}
    </NavLink>
  );
};

interface SidebarGroupProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  isCollapsed: boolean;
  defaultExpanded?: boolean;
}

const SidebarGroup = ({
  title,
  icon,
  children,
  isCollapsed,
  defaultExpanded = false,
}: SidebarGroupProps) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  useEffect(() => {
    if (isCollapsed) {
      setIsExpanded(false);
    }
  }, [isCollapsed]);

  if (isCollapsed) {
    return (
      <div className="relative group">
        <Button
          variant="ghost"
          className="w-full flex justify-center py-2 my-1"
          onClick={() => !isCollapsed && setIsExpanded(!isExpanded)}
        >
          <span className="text-lg text-gray-500">{icon}</span>
        </Button>
        <div className="absolute left-full top-0 ml-2 hidden group-hover:block z-50">
          <div className="py-2 px-3 bg-white rounded-md shadow-lg border border-admin-border">
            <div className="font-medium text-sm mb-2">{title}</div>
            <div className="space-y-1 min-w-[160px]">{children}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Button
        variant="ghost"
        className="w-full flex justify-between py-2 my-1"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <span className="text-lg text-gray-500">{icon}</span>
          <span>{title}</span>
        </div>
        <span className="text-gray-500">
          {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </span>
      </Button>
      {isExpanded && <div className="ml-8 space-y-1">{children}</div>}
    </div>
  );
};

interface SidebarProps {
  isCollapsed: boolean;
}

const Sidebar = ({ isCollapsed }: SidebarProps) => {
  return (
    <aside
      className={cn(
        "bg-white border-r border-admin-border h-screen fixed top-0 left-0 transition-all duration-300 z-40",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex h-16 items-center justify-center border-b border-admin-border">
        <div className={cn("flex items-center gap-2", isCollapsed && "justify-center")}>
          <div className="bg-admin-primary h-8 w-8 rounded flex items-center justify-center">
            <span className="text-white font-bold">A</span>
          </div>
          {!isCollapsed && <span className="text-lg font-bold">Admin</span>}
        </div>
      </div>

      <div className={cn("py-4 space-y-1", isCollapsed ? "px-2" : "px-3")}>
        <SidebarLink
          to="/dashboard"
          icon={<LayoutDashboard size={20} />}
          title="Dashboard"
          isCollapsed={isCollapsed}
        />
        
        <SidebarLink
          to="/dashboard/analytics"
          icon={<BarChart3 size={20} />}
          title="Analytics"
          isCollapsed={isCollapsed}
        />

        <SidebarGroup
          title="Users"
          icon={<Users size={20} />}
          isCollapsed={isCollapsed}
          defaultExpanded={false}
        >
          <NavLink
            to="/dashboard/users"
            className={({ isActive }) =>
              cn("flex items-center gap-2 rounded-lg px-3 py-2 text-sm", {
                "bg-admin-primary text-white": isActive,
                "hover:bg-admin-muted": !isActive,
              })
            }
          >
            All Users
          </NavLink>
          <NavLink
            to="/dashboard/user-groups"
            className={({ isActive }) =>
              cn("flex items-center gap-2 rounded-lg px-3 py-2 text-sm", {
                "bg-admin-primary text-white": isActive,
                "hover:bg-admin-muted": !isActive,
              })
            }
          >
            User Groups
          </NavLink>
        </SidebarGroup>

        <SidebarGroup
          title="Products"
          icon={<ShoppingBag size={20} />}
          isCollapsed={isCollapsed}
          defaultExpanded={false}
        >
          <NavLink
            to="/dashboard/products"
            className={({ isActive }) =>
              cn("flex items-center gap-2 rounded-lg px-3 py-2 text-sm", {
                "bg-admin-primary text-white": isActive,
                "hover:bg-admin-muted": !isActive,
              })
            }
          >
            All Products
          </NavLink>
          <NavLink
            to="/dashboard/categories"
            className={({ isActive }) =>
              cn("flex items-center gap-2 rounded-lg px-3 py-2 text-sm", {
                "bg-admin-primary text-white": isActive,
                "hover:bg-admin-muted": !isActive,
              })
            }
          >
            Categories
          </NavLink>
        </SidebarGroup>

        <SidebarLink
          to="/dashboard/reports"
          icon={<FileText size={20} />}
          title="Reports"
          isCollapsed={isCollapsed}
        />

        <SidebarLink
          to="/dashboard/settings"
          icon={<Settings size={20} />}
          title="Settings"
          isCollapsed={isCollapsed}
        />

        <SidebarLink
          to="/dashboard/help"
          icon={<HelpCircle size={20} />}
          title="Help & Support"
          isCollapsed={isCollapsed}
        />
      </div>
    </aside>
  );
};

export default Sidebar;
