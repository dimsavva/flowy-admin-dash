
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardHeader from "@/components/layout/DashboardHeader";
import AppSidebar from "@/components/layout/Sidebar";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";

const Dashboard = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const adminUser = localStorage.getItem("adminUser");
    if (!adminUser) {
      navigate("/login");
    } else {
      setIsLoading(false);
    }
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-admin-background">
        <p className="text-xl">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <DashboardHeader onMenuToggle={() => {}} />
        
        <main className="flex-1 p-4 md:p-6 bg-admin-background">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Your App</h1>
              <p className="text-xl text-gray-500 mb-8">Start building something amazing!</p>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 max-w-md mx-auto">
                <p className="text-gray-600">
                  This is your blank application template. You can start customizing it by adding your own components, pages, and functionality.
                </p>
              </div>
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Dashboard;
