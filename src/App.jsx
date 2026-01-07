import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { ChatProvider } from "@/context/ChatContext";
import { NotificationProvider } from "@/context/NotificationContext";
import ProtectedRoute from "@/components/ProtectedRoute";

// Public pages - Updated to match your src/pages/public folder
import Home from "./pages/public/Home.jsx";
import Login from "./pages/public/Login.jsx";
import About from "./pages/public/About.jsx";
import TributeWall from "./pages/public/TributeWall.jsx";
import NotFound from "./pages/NotFound.jsx";
import RedAlertPage from "./pages/RedAlertPage.jsx";

// Role dashboards - Explicit .jsx extensions added to resolve Vite errors
import PatientDashboard from "./pages/patient/PatientDashboard.jsx";
import PatientRequestPage from "./pages/patient/PatientRequestPage.jsx";
import FindHospitalPage from "./pages/patient/FindHospitalPage.jsx";
import RequestFundsPage from "./pages/patient/RequestFundsPage.jsx";
import PaymentPage from "./pages/patient/PaymentPage.jsx";
import PatientProfilePage from "./pages/patient/PatientProfilePage.jsx";

// Other Role Pages
import DonorDashboard from "./pages/donor/DonorDashboard.jsx";
import DonorRegister from "./pages/donor/DonorRegister.jsx";
import DonorAlerts from "./pages/donor/DonorAlerts.jsx";
import DonorChat from "./pages/donor/DonorChat.jsx";
import HospitalDashboard from "./pages/hospital/HospitalDashboard.jsx";
import NgoDashboard from "./pages/ngo/NgoDashboard.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <NotificationProvider>
        <ChatProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/about" element={<About />} />
                <Route path="/tribute" element={<TributeWall />} />
                <Route path="/red-alert" element={<RedAlertPage />} />

                {/* Patient Routes */}
                <Route path="/patient/dashboard" element={<ProtectedRoute allowedRoles={['patient']}><PatientDashboard /></ProtectedRoute>} />
                <Route path="/patient/request" element={<ProtectedRoute allowedRoles={['patient']}><PatientRequestPage /></ProtectedRoute>} />
                <Route path="/patient/find-hospital" element={<ProtectedRoute allowedRoles={['patient']}><FindHospitalPage /></ProtectedRoute>} />
                <Route path="/patient/request-funds" element={<ProtectedRoute allowedRoles={['patient']}><RequestFundsPage /></ProtectedRoute>} />
                <Route path="/patient/payment" element={<ProtectedRoute allowedRoles={['patient']}><PaymentPage /></ProtectedRoute>} />
                <Route path="/patient/profile" element={<ProtectedRoute allowedRoles={['patient']}><PatientProfilePage /></ProtectedRoute>} />
                <Route path="/patient/search" element={<ProtectedRoute allowedRoles={['patient']}><FindHospitalPage /></ProtectedRoute>} />
                <Route path="/patient/chat" element={<ProtectedRoute allowedRoles={['patient']}><PatientDashboard /></ProtectedRoute>} />

                {/* Donor Routes */}
                <Route path="/donor/dashboard" element={<ProtectedRoute allowedRoles={['donor']}><DonorDashboard /></ProtectedRoute>} />
                <Route path="/donor/register" element={<ProtectedRoute allowedRoles={['donor']}><DonorRegister /></ProtectedRoute>} />
                <Route path="/donor/alerts" element={<ProtectedRoute allowedRoles={['donor']}><DonorAlerts /></ProtectedRoute>} />
                <Route path="/donor/chat" element={<ProtectedRoute allowedRoles={['donor']}><DonorChat /></ProtectedRoute>} />

                {/* Hospital Routes */}
                <Route path="/hospital/dashboard" element={<ProtectedRoute allowedRoles={['hospital']}><HospitalDashboard /></ProtectedRoute>} />
                <Route path="/hospital/request" element={<ProtectedRoute allowedRoles={['hospital']}><HospitalDashboard /></ProtectedRoute>} />
                <Route path="/hospital/emergency" element={<ProtectedRoute allowedRoles={['hospital']}><HospitalDashboard /></ProtectedRoute>} />
                <Route path="/hospital/chat" element={<ProtectedRoute allowedRoles={['hospital']}><HospitalDashboard /></ProtectedRoute>} />

                {/* NGO Routes */}
                <Route path="/ngo/dashboard" element={<ProtectedRoute allowedRoles={['ngo']}><NgoDashboard /></ProtectedRoute>} />
                <Route path="/ngo/support" element={<ProtectedRoute allowedRoles={['ngo']}><NgoDashboard /></ProtectedRoute>} />
                <Route path="/ngo/chat" element={<ProtectedRoute allowedRoles={['ngo']}><NgoDashboard /></ProtectedRoute>} />

                {/* Admin Routes */}
                <Route path="/admin/dashboard" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
                <Route path="/admin/users" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
                <Route path="/admin/requests" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
                <Route path="/admin/alerts" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
                <Route path="/admin/tributes" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />

                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </ChatProvider>
      </NotificationProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;