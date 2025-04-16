import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { login as apiLogin, signup as apiSignup } from '@/lib/api';
import type { User, AuthContextType } from '@/lib/types';
import { toast } from 'sonner';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Create a default user to bypass authentication
  const [user, setUser] = useState<User | null>({
    email: 'demo@nutrisnack.com',
    token: 'demo-token'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Store the demo user in localStorage to persist across refreshes
    localStorage.setItem('token', 'demo-token');
    localStorage.setItem('email', 'demo@nutrisnack.com');
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // For demo purposes, we'll just set the user directly
      setUser({ email, token: 'demo-token' });
      localStorage.setItem('token', 'demo-token');
      localStorage.setItem('email', email);
      
      // Navigate to dashboard
      navigate('/dashboard');
      toast.success('Login successful!');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to login';
      setError(errorMessage);
      toast.error('Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // For demo purposes, we'll just set the user directly
      setUser({ email, token: 'demo-token' });
      localStorage.setItem('token', 'demo-token');
      localStorage.setItem('email', email);
      
      // Navigate to dashboard
      navigate('/dashboard');
      toast.success('Account created successfully!');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to sign up';
      setError(errorMessage);
      toast.error('Signup failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    // For demo purposes, we'll keep the user logged in
    toast.info('Logout functionality is disabled in demo mode.');
  };

  const value = {
    user,
    login,
    signup,
    logout,
    isLoading,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};