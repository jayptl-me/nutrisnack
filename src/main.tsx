import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router";

import { TooltipProvider } from "./components/ui/tooltip";

import { ThemeProvider } from "./components/layout/theme-provider";
import { AuthProvider } from "./contexts/auth-context";
import "./index.css";

// Pages
import Index from "./pages";
import LoginPage from "./pages/login";
import SignupPage from "./pages/signup";
import DashboardPage from "./pages/dashboard";
import NotFoundPage from "./pages/not-found";
import { FloatingNav } from "./components/layout/floating-nav";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  
  <QueryClientProvider client={queryClient}>

    <TooltipProvider>
      <ThemeProvider defaultTheme="light">

        <BrowserRouter>
          <AuthProvider>
          <FloatingNav />
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/login" element={<Navigate to="/dashboard" replace />} />
              <Route path="/signup" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
        <Sonner />
        <Toaster />
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);