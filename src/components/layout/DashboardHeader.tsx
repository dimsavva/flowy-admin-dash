
import { useState } from 'react';
import { Bell, Search, Settings, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface DashboardHeaderProps {
  onMenuToggle: () => void;
}

const DashboardHeader = ({ onMenuToggle }: DashboardHeaderProps) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(() => {
    const storedUser = localStorage.getItem('adminUser');
    return storedUser ? JSON.parse(storedUser) : { name: 'Admin User', email: 'admin@example.com' };
  });

  const handleLogout = () => {
    // Clear user data
    localStorage.removeItem('adminUser');
    toast.success('Logged out successfully');
    navigate('/');
  };

  const getInitials = (name: string) => {
    if (!name) return 'AU';
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b border-admin-border bg-white px-4">
      <SidebarTrigger className="-ml-1" />
      
      <div className="flex items-center flex-1">
        <div className="hidden md:flex items-center">
          <h1 className="text-xl font-bold text-admin-foreground">Dashboard</h1>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center px-2 lg:ml-6 lg:justify-end">
        <div className="w-full max-w-lg lg:max-w-xs">
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <Input
              className="w-full pl-10 pr-3"
              placeholder="Search..."
              type="search"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-admin-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-admin-accent"></span>
          </span>
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="gap-2 flex items-center">
              <Avatar className="h-8 w-8">
                <AvatarImage src={userData.avatar} alt={userData.name} />
                <AvatarFallback className="bg-admin-secondary text-white">
                  {getInitials(userData.name)}
                </AvatarFallback>
              </Avatar>
              <span className="hidden md:inline-flex text-sm font-medium">
                {userData.name}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{userData.name}</p>
                <p className="text-xs leading-none text-gray-500">{userData.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default DashboardHeader;
