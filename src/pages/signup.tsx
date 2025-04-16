import React from 'react';
import { AuthForm } from '@/components/auth/auth-form';
import { Navigate } from 'react-router';
import { useAuth } from '@/contexts/auth-context';
import { Camera } from 'lucide-react';

const SignupPage = () => {
  const { user } = useAuth();
  
  // Redirect if already logged in
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-background to-primary/5">
      <div className="w-full max-w-md mb-8 text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-primary/10 p-3 rounded-full">
            <Camera className="h-8 w-8 text-primary" />
          </div>
        </div>
        <h1 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
          Create an Account
        </h1>
        <p className="text-muted-foreground">
          Join NutriSnack to start tracking your food calories
        </p>
      </div>
      <AuthForm mode="signup" />
    </div>
  );
};

export default SignupPage;