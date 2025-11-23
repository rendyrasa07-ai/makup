import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import CalendarScheduling from "./pages/calendar-scheduling";
import ClientManagement from "./pages/client-management";
import FinancialTracking from "./pages/financial-tracking";
import Login from "./pages/login";
import PaymentTracking from "./pages/payment-tracking";
import ServicePackages from "./pages/service-packages";
import Signup from "./pages/signup";
import NotFound from "./pages/NotFound";
import Leads from "./pages/leads";
import Settings from "./pages/settings";
import Profile from "./pages/profile";
import PublicLeadForm from "./pages/leads/PublicLeadForm";
import Booking from "./pages/booking";
import Gallery from "./pages/gallery";

function App() {
    return (
        <Router>
            <div className="min-h-screen bg-background text-foreground font-sans">
                <Routes>
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/calendar-scheduling" element={<CalendarScheduling />} />
                    <Route path="/client-management" element={<ClientManagement />} />
                    <Route path="/financial-tracking" element={<FinancialTracking />} />
                    <Route path="/leads" element={<Leads />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/payment-tracking" element={<PaymentTracking />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/service-packages" element={<ServicePackages />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/booking" element={<Booking />} />
                    <Route path="/gallery" element={<Gallery />} />
                    <Route path="/public-lead-form" element={<PublicLeadForm />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
