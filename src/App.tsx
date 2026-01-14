import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import StudentHome from "./pages/student/StudentHome";
import ReportIssuePage from "./pages/student/ReportIssuePage";
import StudentMapPage from "./pages/student/StudentMapPage";
import StudentIssuesPage from "./pages/student/StudentIssuesPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminMapPage from "./pages/admin/AdminMapPage";
import AdminIssuesPage from "./pages/admin/AdminIssuesPage";
import AdminAnalyticsPage from "./pages/admin/AdminAnalyticsPage";
import StaffDashboard from "./pages/staff/StaffDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          
          {/* Student Routes */}
          <Route path="/student" element={<StudentHome />} />
          <Route path="/student/report" element={<ReportIssuePage />} />
          <Route path="/student/map" element={<StudentMapPage />} />
          <Route path="/student/issues" element={<StudentIssuesPage />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/map" element={<AdminMapPage />} />
          <Route path="/admin/issues" element={<AdminIssuesPage />} />
          <Route path="/admin/analytics" element={<AdminAnalyticsPage />} />
          
          {/* Staff Routes */}
          <Route path="/staff" element={<StaffDashboard />} />
          
          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
