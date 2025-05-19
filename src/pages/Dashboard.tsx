
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardHeader from "@/components/layout/DashboardHeader";
import Sidebar from "@/components/layout/Sidebar";
import StatCard from "@/components/dashboard/StatCard";
import RecentActivity from "@/components/dashboard/RecentActivity";
import SimpleBarChart from "@/components/dashboard/SimpleBarChart";
import TopPerformers from "@/components/dashboard/TopPerformers";
import { BarChart3, Users, ShoppingBag, DollarSign } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const adminUser = localStorage.getItem("adminUser");
    if (!adminUser) {
      navigate("/");
    }
  }, [navigate]);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="min-h-screen bg-admin-background">
      <Sidebar isCollapsed={sidebarCollapsed} />
      
      <div 
        className={`transition-all duration-300 ${
          sidebarCollapsed ? "pl-16" : "pl-64"
        }`}
      >
        <DashboardHeader onMenuToggle={toggleSidebar} />
        
        <main className="p-4 md:p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
            <p className="text-gray-500">Welcome back to your admin dashboard</p>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <StatCard 
              title="Total Revenue" 
              value="$45,231.89" 
              icon={<DollarSign size={18} />}
              description="From all products this month" 
              change={{ value: 12.5, positive: true }}
            />
            <StatCard 
              title="Active Users" 
              value="2,345" 
              icon={<Users size={18} />}
              description="Active now" 
              change={{ value: 5.25, positive: true }}
            />
            <StatCard 
              title="Total Products" 
              value="1,456" 
              icon={<ShoppingBag size={18} />}
              description="12 new products added today" 
            />
            <StatCard 
              title="Conversion Rate" 
              value="3.65%" 
              icon={<BarChart3 size={18} />}
              description="vs 3.2% last month" 
              change={{ value: 0.45, positive: true }}
            />
          </div>
          
          {/* Charts & Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <SimpleBarChart />
            <div className="space-y-6">
              <RecentActivity />
              <TopPerformers />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
