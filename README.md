# NutriSnack - Food Calorie Analyzer

NutriSnack is a React application that allows users to upload images of food and get calorie and nutrition information instantly using AI. The app includes user authentication and a dashboard for analyzing food images.

## Features

- **User Authentication**: Login and signup functionality with JWT token storage
- **Dashboard**: Modern glassmorphic interface after login with navigation and content area
- **AI-Powered Image Analysis**: Upload food images for calorie estimation using Gemini API
- **Calorie Results Display**: View detailed nutrition information including calories, protein, carbs, and fat content
- **Responsive Design**: Works well on mobile and desktop devices

## Tech Stack

- **Frontend**: React with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components and glassmorphic design
- **State Management**: React Context API and React Query
- **Routing**: React Router
- **Form Handling**: React Hook Form with Zod validation
- **HTTP Client**: Axios
- **AI Integration**: Google Gemini API for image analysis
- **Backend**: Deno functions (mock implementation)

## Project Structure

```
src/
├── components/
│   ├── auth/
│   │   └── auth-form.tsx
│   ├── dashboard/
│   │   ├── image-uploader.tsx
│   │   └── calorie-result-card.tsx
│   ├── layout/
│   │   ├── header.tsx
│   │   ├── theme-provider.tsx
│   │   └── theme-toggle.tsx
│   └── ui/
│       └── ... (shadcn/ui components)
├── contexts/
│   └── auth-context.tsx
├── hooks/
│   └── use-toast.ts
├── lib/
│   ├── api.ts
│   ├── theme.ts
│   ├── types.ts
│   └── utils.ts
├── pages/
│   ├── index.tsx
│   ├── login.tsx
│   ├── signup.tsx
│   ├── dashboard.tsx
│   ├── history.tsx
│   └── not-found.tsx
├── main.tsx
└── index.css
```

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables:
   - Create a `.env` file with `VITE_GEMINI_API_KEY=your_api_key_here`
4. Start the development server: `npm run dev`
5. Open [http://localhost:5173](http://localhost:5173) in your browser

## Demo Credentials

You can use the following demo credentials to try out the application:

- **Email**: demo@nutrisnack.com
- **Password**: demo123

Or click the "Login with Demo Account" button on the login page.

## Calorie Detection Component

The core of the application is the calorie detection component that:

1. Allows users to upload food images via drag-and-drop or file selection
2. Converts the image to Base64 format
3. Sends the image to the Gemini API for analysis
4. Displays the nutritional information in an elegant card format

### How It Works

The component uses the Gemini API to analyze food images and extract nutritional information. The API call includes:

- The image data in Base64 format
- A prompt asking the model to analyze the food and return structured data
- Configuration parameters for the model

The response is parsed and displayed in a user-friendly format showing calories, protein, carbs, and fat content.

## UI Design

The application features a modern glassmorphic design with:

- Backdrop blur effects for depth and elegance
- Subtle gradients and shadows
- Smooth animations and transitions
- Responsive layout for all device sizes

## Backend API Endpoints

The app uses the following API endpoints:

- `POST /api/login`: Authenticate user and return JWT token
- `POST /api/signup`: Register new user and return JWT token
- `POST /api/gemini-mock`: Mock endpoint for Gemini API when no API key is provided

## Future Enhancements

- Food history tracking and statistics
- Meal planning and recommendations
- Barcode scanning for packaged foods
- Social sharing features
- Detailed nutritional breakdown and charts