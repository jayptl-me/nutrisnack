import React from 'react';
import { FloatingNav } from '@/components/layout/floating-nav';
import { FoodAnalysisFeature } from '@/components/dashboard/food-analysis-feature';
import { DieticianChat } from '@/components/dashboard/dietician-chat';
import { Sparkles, MessageSquare } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const DashboardPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-primary/5">
      <main className="flex-1 pt-24 pb-12">
        <div className="mb-10 text-center px-4">
          <div className="inline-flex items-center justify-center p-2 bg-primary/10 backdrop-blur-sm rounded-full mb-4">
            <Sparkles className="h-5 w-5 text-primary mr-2" />
            <span className="text-sm font-medium">AI-Powered Nutrition Tools</span>
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            NutriSnack Assistant
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Analyze your food and get personalized nutrition advice from our AI assistant.
          </p>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 mb-10">
          <Tabs defaultValue="analyzer" className="w-full max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="analyzer" className="flex items-center justify-center">
                <Sparkles className="h-4 w-4 mr-2" />
                Food Analyzer
              </TabsTrigger>
              <TabsTrigger value="dietician" className="flex items-center justify-center">
                <MessageSquare className="h-4 w-4 mr-2" />
                Nutrition Assistant
              </TabsTrigger>
            </TabsList>
            <TabsContent value="analyzer">
              <FoodAnalysisFeature />
            </TabsContent>
            <TabsContent value="dietician">
              <DieticianChat />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}

export default DashboardPage;