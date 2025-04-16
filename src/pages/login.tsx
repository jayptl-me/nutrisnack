import React from 'react';
import { AuthForm } from '@/components/auth/auth-form';
import { Navigate } from 'react-router';
import { useAuth } from '@/contexts/auth-context';
import { Camera, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';

const LoginPage = () => {
  const { user, login } = useAuth();
  
  // Redirect if already logged in
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }
  
  const handleDemoLogin = () => {
    login('demo@nutrisnack.com', 'demo123');
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-background to-primary/5">
      <div className="w-full max-w-md mb-8 text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-primary/10 p-3 rounded-full">
            <Camera className="h-8 w-8 text-primary" />
          </div>
        </div>
        <h1 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
          Welcome to NutriSnack
        </h1>
        <p className="text-muted-foreground">
          Log in to track your food calories with ease
        </p>
      </div>
      <AuthForm mode="login" />
      
      <div className="mt-6 w-full max-w-md">
        <div className="backdrop-blur-md bg-background/70 border border-primary/10 shadow-md rounded-lg p-4">
          <div className="flex items-start space-x-2">
            <Info className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <h3 className="font-medium mb-1">Demo Credentials</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Use these credentials to try out the application:
              </p>
              <div className="bg-primary/5 rounded-md p-2 mb-3">
                <p className="text-sm"><strong>Email:</strong> demo@nutrisnack.com</p>
                <p className="text-sm"><strong>Password:</strong> demo123</p>
              </div>
              <Button 
                onClick={handleDemoLogin} 
                variant="outline" 
                size="sm" 
                className="w-full bg-background/80 backdrop-blur-sm border-primary/20 hover:bg-primary/10"
              >
                Login with Demo Account
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;