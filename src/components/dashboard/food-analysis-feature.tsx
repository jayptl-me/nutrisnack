import React, { useState } from 'react';
import { ImageUploader } from '@/components/dashboard/image-uploader';
import { CalorieResultCard } from '@/components/dashboard/calorie-result-card';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Camera, Info } from 'lucide-react';
import type { CalorieResult } from '@/lib/types';

export function FoodAnalysisFeature() {
  const [analysisResult, setAnalysisResult] = useState<CalorieResult | null>(null);
  
  const handleResultReceived = (result: CalorieResult) => {
    setAnalysisResult(result);
  };
  
  return (
    <div className="container mx-auto px-4 sm:px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Left Side - Image Upload */}
        <div className="w-full flex justify-center">
          <Card className="glass-card overflow-hidden w-full max-w-md">
            <CardHeader className="pb-2 text-center">
              <div className="flex flex-col items-center justify-center">
                <div className="bg-primary/10 p-3 rounded-full mb-3">
                  <Camera className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Analyze Food</CardTitle>
                <CardDescription className="max-w-sm">
                  Upload a food image to get detailed nutritional information
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <ImageUploader onResultReceived={handleResultReceived} />
            </CardContent>
          </Card>
        </div>
        
        {/* Right Side - Results */}
        <div className="w-full flex justify-center">
          {analysisResult ? (
            <div className="w-full max-w-md animate-in fade-in duration-300">
              <CalorieResultCard result={analysisResult} />
            </div>
          ) : (
            <Card className="glass-card h-full w-full max-w-md flex flex-col justify-center items-center p-8 text-center">
              <Info className="h-12 w-12 text-muted-foreground mb-4" />
              <CardTitle className="text-xl mb-2">No Analysis Yet</CardTitle>
              <CardDescription>
                Upload an image of your food to see nutritional information displayed here.
              </CardDescription>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
