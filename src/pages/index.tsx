import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router';
import { Header } from '@/components/layout/header';
import { useAuth } from '@/contexts/auth-context';
import { Camera, ArrowRight, Utensils, BarChart3, Shield, Sparkles } from 'lucide-react';

const Index = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-primary/5">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 px-4 md:px-6 lg:py-32">
          <div className="container mx-auto text-center">
            <div className="inline-flex items-center justify-center p-2 bg-primary/10 backdrop-blur-sm rounded-full mb-6">
              <Sparkles className="h-5 w-5 text-primary mr-2" />
              <span className="text-sm font-medium">AI-Powered Food Analysis</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Track Your Food Calories <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">Instantly</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Just snap a photo of your food and get accurate calorie and nutrition information in seconds.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {user ? (
                <Button 
                  size="lg" 
                  asChild
                  className="bg-gradient-to-r from-primary to-primary/80 hover:opacity-90 transition-all shadow-md"
                >
                  <Link to="/dashboard">
                    <Camera className="mr-2 h-5 w-5" />
                    Analyze Food
                  </Link>
                </Button>
              ) : (
                <>
                  <Button 
                    size="lg" 
                    asChild
                    className="bg-gradient-to-r from-primary to-primary/80 hover:opacity-90 transition-all shadow-md"
                  >
                    <Link to="/signup">
                      Get Started
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    asChild
                    className="bg-background/80 backdrop-blur-sm border-primary/20 hover:bg-primary/10"
                  >
                    <Link to="/login">Log In</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 px-4 md:px-6">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
              How It Works
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="backdrop-blur-md bg-background/70 border border-primary/10 shadow-lg p-6 rounded-lg hover:shadow-xl transition-all">
                <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Camera className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Take a Photo</h3>
                <p className="text-muted-foreground">
                  Snap a picture of your meal using your device's camera or upload an existing photo.
                </p>
              </div>
              
              <div className="backdrop-blur-md bg-background/70 border border-primary/10 shadow-lg p-6 rounded-lg hover:shadow-xl transition-all">
                <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Utensils className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">AI Analysis</h3>
                <p className="text-muted-foreground">
                  Our AI identifies the food items and calculates nutritional content with high accuracy.
                </p>
              </div>
              
              <div className="backdrop-blur-md bg-background/70 border border-primary/10 shadow-lg p-6 rounded-lg hover:shadow-xl transition-all">
                <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Get Results</h3>
                <p className="text-muted-foreground">
                  View detailed nutrition information including calories, protein, carbs, and fat content.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 px-4 md:px-6 bg-primary/5 backdrop-blur-sm">
          <div className="container mx-auto text-center">
            <div className="max-w-2xl mx-auto backdrop-blur-md bg-background/70 border border-primary/10 shadow-lg p-8 rounded-lg">
              <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                Ready to track your nutrition?
              </h2>
              <p className="text-muted-foreground mb-8">
                Join thousands of users who are making healthier food choices with NutriSnack.
              </p>
              {!user && (
                <Button 
                  size="lg" 
                  asChild
                  className="bg-gradient-to-r from-primary to-primary/80 hover:opacity-90 transition-all shadow-md"
                >
                  <Link to="/signup">
                    Create Free Account
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </section>
        
        {/* Footer */}
        <footer className="py-8 px-4 md:px-6 border-t backdrop-blur-md bg-background/70">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <p className="text-sm text-muted-foreground">
                  © {new Date().getFullYear()} NutriSnack. All rights reserved.
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <Shield className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Privacy Policy</span>
                <span className="text-sm text-muted-foreground">Terms of Service</span>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Index;