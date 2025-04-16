import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import type { CalorieResult } from '@/lib/types';
import { Flame, Beef, Wheat, Droplet } from 'lucide-react';

interface CalorieResultCardProps {
  result: CalorieResult;
}

export function CalorieResultCard({ result }: CalorieResultCardProps) {
  const { foodName, calories, nutrients, portionSize } = result;
  
  // Calculate total nutrients for progress bars
  const totalNutrients = nutrients.protein + nutrients.carbs + nutrients.fat;
  const proteinPercentage = totalNutrients > 0 ? (nutrients.protein / totalNutrients) * 100 : 0;
  const carbsPercentage = totalNutrients > 0 ? (nutrients.carbs / totalNutrients) * 100 : 0;
  const fatPercentage = totalNutrients > 0 ? (nutrients.fat / totalNutrients) * 100 : 0;

  return (
    <Card className="w-full max-w-2xl mx-auto backdrop-blur-md bg-background/70 border border-primary/10 shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl font-bold">{foodName}</CardTitle>
        <CardDescription>Portion size: {portionSize}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex justify-center items-center">
            <div className="relative w-32 h-32 flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5 rounded-full shadow-inner">
              <div className="absolute inset-1 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl font-bold">{calories}</div>
                  <div className="text-sm text-muted-foreground">calories</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-5 bg-background/40 backdrop-blur-sm p-4 rounded-lg">
            <div className="space-y-2">
              <div className="flex justify-between text-sm items-center">
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center mr-2">
                    <Beef className="h-3.5 w-3.5 text-red-500" />
                  </div>
                  <span>Protein</span>
                </div>
                <span className="font-medium">{nutrients.protein}g</span>
              </div>
              <Progress value={proteinPercentage} className="h-2 bg-muted" indicatorClassName="bg-red-500" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm items-center">
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center mr-2">
                    <Wheat className="h-3.5 w-3.5 text-amber-500" />
                  </div>
                  <span>Carbs</span>
                </div>
                <span className="font-medium">{nutrients.carbs}g</span>
              </div>
              <Progress value={carbsPercentage} className="h-2 bg-muted" indicatorClassName="bg-amber-500" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm items-center">
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center mr-2">
                    <Droplet className="h-3.5 w-3.5 text-blue-500" />
                  </div>
                  <span>Fat</span>
                </div>
                <span className="font-medium">{nutrients.fat}g</span>
              </div>
              <Progress value={fatPercentage} className="h-2 bg-muted" indicatorClassName="bg-blue-500" />
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-background/40 backdrop-blur-sm p-3 rounded-lg border border-primary/5 shadow-sm">
              <div className="text-lg font-medium">{nutrients.protein}g</div>
              <div className="text-xs text-muted-foreground">Protein</div>
            </div>
            <div className="bg-background/40 backdrop-blur-sm p-3 rounded-lg border border-primary/5 shadow-sm">
              <div className="text-lg font-medium">{nutrients.carbs}g</div>
              <div className="text-xs text-muted-foreground">Carbs</div>
            </div>
            <div className="bg-background/40 backdrop-blur-sm p-3 rounded-lg border border-primary/5 shadow-sm">
              <div className="text-lg font-medium">{nutrients.fat}g</div>
              <div className="text-xs text-muted-foreground">Fat</div>
            </div>
          </div>
          
          <div className="text-center text-sm text-muted-foreground">
            <div className="flex items-center justify-center">
              <Flame className="h-4 w-4 mr-1 text-primary" />
              <span>Analyzed with AI-powered calorie detection</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}