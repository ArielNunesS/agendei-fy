import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from './contexts/auth/AuthContext';
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ClientDashboard from "./pages/ClientDashboard";
import ClientPortal from "./pages/ClientPortal";
import ProviderDashboard from "./pages/ProvidesDashboard";
import ClientLandingPage from "./pages/ClientLandingPage";
import ProtectedRoute from "./components/ProtectedRoute";
import ResetPassword from './pages/ResetPassword';

// Import the new pages
import CalendarPage from "./pages/CalendarPage";
import ClientsPage from "./pages/ClientsPage";
import ServicesPage from "./pages/ServicesPage";
import ProfessionalsPage from "./pages/ProfessionalPage";
import ReportsPage from "./pages/ReportsPage";
import SchedulePage from "./pages/SchedulePage";
import SettingsPage from "./pages/SettingsPage";
import DashboardOverview from "./pages/DashboardOverview";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              
              <Route path="/painel-cliente" element={
                <ProtectedRoute allowedUserTypes={['cliente']}>
                  <ClientLandingPage />
                </ProtectedRoute>
              } />
              <Route path="/portal-cliente" element={
                <ProtectedRoute allowedUserTypes={['cliente']}>
                  <ClientPortal />
                </ProtectedRoute>
              } />
              
              {/* New dashboard overview route */}
              <Route path="/dashboard-overview" element={
                <ProtectedRoute allowedUserTypes={['prestador']}>
                  <DashboardOverview />
                </ProtectedRoute>
              } />
              
              <Route path="/dashboard" element={
                <ProtectedRoute allowedUserTypes={['prestador']}>
                  <CalendarPage />
                </ProtectedRoute>
              } />
              
              {/* Routes for the sidebar navigation with new pages */}
              <Route path="/clients" element={
                <ProtectedRoute allowedUserTypes={['prestador']}>
                  <ClientsPage />
                </ProtectedRoute>
              } />
              <Route path="/services" element={
                <ProtectedRoute allowedUserTypes={['prestador']}>
                  <ServicesPage />
                </ProtectedRoute>
              } />
              <Route path="/professionals" element={
                <ProtectedRoute allowedUserTypes={['prestador']}>
                  <ProfessionalsPage />
                </ProtectedRoute>
              } />
              <Route path="/reports" element={
                <ProtectedRoute allowedUserTypes={['prestador']}>
                  <ReportsPage />
                </ProtectedRoute>
              } />
              <Route path="/schedule" element={
                <ProtectedRoute allowedUserTypes={['prestador']}>
                  <SchedulePage />
                </ProtectedRoute>
              } />
              <Route path="/settings" element={
                <ProtectedRoute allowedUserTypes={['prestador']}>
                  <SettingsPage />
                </ProtectedRoute>
              } />
              
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
