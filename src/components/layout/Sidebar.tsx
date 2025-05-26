
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
} from "lucide-react";

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
      <div className="flex h-16 items-center border-b border-admin-border px-4">
        <div className={cn("flex items-center gap-2", isCollapsed && "justify-center")}>
          <div className="bg-admin-primary h-8 w-8 rounded flex items-center justify-center">
            <span className="text-white font-bold">Y</span>
          </div>
          {!isCollapsed && <span className="text-lg font-bold">Your App</span>}
        </div>
      </div>

      <div className={cn("py-4 space-y-1", isCollapsed ? "px-2" : "px-3")}>
        <SidebarLink
          to="/dashboard"
          icon={<LayoutDashboard size={20} />}
          title="Dashboard"
          isCollapsed={isCollapsed}
        />
      </div>
    </aside>
  );
};

export default Sidebar;
