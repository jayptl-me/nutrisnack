import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router';
import { Home } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-background to-primary/5">
      <div className="backdrop-blur-md bg-background/70 border border-primary/10 shadow-lg p-8 rounded-lg text-center max-w-md">
        <h1 className="text-6xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">404</h1>
        <p className="text-xl mb-6">Page not found</p>
        <p className="text-muted-foreground mb-8 text-center">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Button 
          asChild
          className="bg-gradient-to-r from-primary to-primary/80 hover:opacity-90 transition-all shadow-md"
        >
          <Link to="/">
            <Home className="mr-2 h-4 w-4" />
            Go Home
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;