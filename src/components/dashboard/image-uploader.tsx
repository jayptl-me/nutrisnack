import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { UploadCloud, Trash2, Loader2, HelpCircle } from 'lucide-react';
import { toast } from 'sonner';
import { Textarea } from '@/components/ui/textarea';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import type { CalorieResult } from '@/lib/types';
import { getApiUrl } from '@/lib/api';

// Use environment variable for API key, but route requests through backend
const API_URL = getApiUrl('/api/calorie/analyze');

interface ImageUploaderProps {
  onResultReceived: (result: CalorieResult) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onResultReceived }) => {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState('');
  const [additionalContext, setAdditionalContext] = useState('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedImage = e.target.files[0];
      setImage(selectedImage);

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(selectedImage);
    }
  };

  const clearImage = () => {
    setImage(null);
    setPreview(null);
  };

  const analyzeImage = async () => {
    if (!image) {
      toast.error('Please select an image first');
      return;
    }

    setIsLoading(true);
    setLoadingStatus('Preparing image...');

    try {
      // Create base64 string from image
      const reader = new FileReader();

      // Create a promise to handle the FileReader
      const readFileAsDataURL = new Promise<string>((resolve, reject) => {
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = () => reject(new Error('Failed to read the image'));
        reader.readAsDataURL(image);
      });

      const base64String = await readFileAsDataURL;
      const base64Data = base64String.split(',')[1];
      const mimeType = image.type;

      // Update status to show we're waiting for analysis
      setLoadingStatus('Analyzing image...');
      console.log('Base64 Image Data:', base64Data);

      // Use the backend endpoint instead of calling Gemini directly
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          base64Image: base64Data,
          mimeType: mimeType,
          additionalContext: additionalContext.trim(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error('API error:', errorData);
        throw new Error('Error from API: ' + errorData);
      }

      const data = await response.json();

      // Extract the text response
      const textResponse = data.result;

      if (!textResponse) {
        throw new Error('Invalid response from API');
      }

      console.log('Raw API response:', textResponse);

      // Parse the JSON response with better error handling
      try {
        setLoadingStatus('Processing results...');

        const calorieResult: CalorieResult = JSON.parse(textResponse);

        // Validate required fields exist
        if (!calorieResult.foodName || calorieResult.calories === undefined) {
          throw new Error('Incomplete data in response');
        }

        onResultReceived(calorieResult);
        toast.success('Analysis complete!');
      } catch (parseError) {
        console.error('Error parsing API response:', parseError);
        console.error('Raw response that failed to parse:', textResponse);
        throw new Error('Failed to parse response from API. Try a different image or take a clearer photo.');
      }
    } catch (error) {
      console.error('Error analyzing image:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to analyze image');
    } finally {
      setIsLoading(false);
      setLoadingStatus('');
    }
  };

  return (
    <div className="w-full">
      {!preview ? (
        <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
          <UploadCloud className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
          <h3 className="text-lg font-medium mb-2">Upload Food Image</h3>
          <p className="text-sm text-muted-foreground mb-4">
            JPG, PNG or GIF up to 10MB
          </p>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
          <div className="flex justify-center">
            <Button asChild variant="secondary" className="mr-2">
              <label htmlFor="image-upload" className="cursor-pointer">
                Select Image
              </label>
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="relative aspect-square rounded-lg overflow-hidden">
            <img
              src={preview}
              alt="Food preview"
              className="w-full h-full object-cover"
            />
            {isLoading && (
              <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center">
                <Loader2 className="h-10 w-10 text-white animate-spin mb-2" />
                <p className="text-white text-sm">{loadingStatus}</p>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Textarea
              value={additionalContext}
              onChange={(e) => setAdditionalContext(e.target.value)}
              placeholder="Add details about the food (optional). Examples: 'This is homemade pasta with tomato sauce', 'The pizza has pepperoni and extra cheese'..."
              className="resize-none bg-background/80 backdrop-blur-sm border-primary/20"
              disabled={isLoading}
              rows={3}
            />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full flex-shrink-0" disabled={isLoading}>
                    <HelpCircle className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">Add extra information about the food to help the AI provide more accurate results.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <div className="flex justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={clearImage}
              disabled={isLoading}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Clear
            </Button>
            <Button
              onClick={analyzeImage}
              disabled={isLoading}
              className="min-w-[120px]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                'Analyze Image'
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};