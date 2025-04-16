import React from 'react';
import { Link } from 'react-router'; // Using react-router instead of react-router-dom
import { Camera, History, Menu, User } from 'lucide-react';
import { ThemeToggle } from '@/components/layout/theme-toggle';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/auth-context';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

export function FloatingNav() {
  const { user, logout } = useAuth();

  return (
    <header className="fixed top-4 left-0 right-0 z-50 mx-auto max-w-4xl px-4">
      <div className="glass-card flex h-14 items-center justify-between rounded-lg px-6">
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px] sm:w-[300px] backdrop-blur-md bg-background/90">
              <SheetHeader>
                <SheetTitle>NutriSnack</SheetTitle>
                <SheetDescription>
                  Track your food calories with ease
                </SheetDescription>
              </SheetHeader>
              <nav className="flex flex-col gap-4 mt-6">
                <Link to="/dashboard" className="flex items-center text-lg font-medium p-2 rounded-md hover:bg-primary/10 transition-colors">
                  <Camera className="mr-2 h-5 w-5 text-primary" />
                  Analyze Food
                </Link>
                
              </nav>
            </SheetContent>
          </Sheet>
          
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-primary/10 p-1 rounded-md">
              <Camera className="h-5 w-5 text-primary" />
            </div>
            <span className="font-bold text-xl">NutriSnack</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6 ml-6">
            <Link 
              to="/dashboard" 
              className="flex items-center text-sm font-medium transition-colors hover:text-primary"
            >
              <Camera className="mr-1 h-4 w-4" />
              Analyze Food
            </Link>
           
          </nav>
        </div>
        
        <div className="flex items-center gap-3">
          <ThemeToggle />
          {user ? (
            <div className="hidden md:flex items-center mr-2 text-sm text-muted-foreground">
              <User className="h-3.5 w-3.5 mr-1" />
              {user.email}
            </div>
          ) : (
            <Button size="sm" asChild className="glass-button">
              <Link to="/login">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
