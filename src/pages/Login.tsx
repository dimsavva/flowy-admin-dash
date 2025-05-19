
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "@/components/auth/LoginForm";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const adminUser = localStorage.getItem("adminUser");
    if (adminUser) {
      // Prevent redirect loop by checking the referrer
      if (!document.referrer.includes('/dashboard')) {
        navigate("/dashboard");
      }
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-admin-background to-white p-4">
      <div className="w-full max-w-md text-center mb-8">
        <div className="inline-block bg-admin-primary h-12 w-12 rounded-lg flex items-center justify-center mb-4">
          <span className="text-white font-bold text-xl">A</span>
        </div>
        <h1 className="text-3xl font-bold text-admin-foreground">
          Admin Dashboard
        </h1>
        <p className="text-gray-500 mt-2">
          Sign in to access your admin panel
        </p>
      </div>
      
      <LoginForm />
      
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500">
          Test credentials: admin@example.com / password123
        </p>
      </div>
    </div>
  );
};

export default Login;
