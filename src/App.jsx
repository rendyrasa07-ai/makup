import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SidebarLayout from "./components/ui/SidebarLayout";
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
import PublicGallery from "./pages/gallery/PublicGallery";

function App() {
    return (
        <Router>
            <div className="min-h-screen bg-background text-foreground font-sans">
                <Routes>
                    {/* Public routes without sidebar */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/public-lead-form" element={<PublicLeadForm />} />
                    <Route path="/gallery/public/:publicId" element={<PublicGallery />} />

                    {/* Protected routes with sidebar */}
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
                    <Route
                        path="/dashboard"
                        element={
                            <SidebarLayout>
                                <Dashboard />
                            </SidebarLayout>
                        }
                    />
                    <Route
                        path="/calendar-scheduling"
                        element={
                            <SidebarLayout>
                                <CalendarScheduling />
                            </SidebarLayout>
                        }
                    />
                    <Route
                        path="/client-management"
                        element={
                            <SidebarLayout>
                                <ClientManagement />
                            </SidebarLayout>
                        }
                    />
                    <Route
                        path="/financial-tracking"
                        element={
                            <SidebarLayout>
                                <FinancialTracking />
                            </SidebarLayout>
                        }
                    />
                    <Route
                        path="/leads"
                        element={
                            <SidebarLayout>
                                <Leads />
                            </SidebarLayout>
                        }
                    />
                    <Route
                        path="/payment-tracking"
                        element={
                            <SidebarLayout>
                                <PaymentTracking />
                            </SidebarLayout>
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            <SidebarLayout>
                                <Profile />
                            </SidebarLayout>
                        }
                    />
                    <Route
                        path="/service-packages"
                        element={
                            <SidebarLayout>
                                <ServicePackages />
                            </SidebarLayout>
                        }
                    />
                    <Route
                        path="/settings"
                        element={
                            <SidebarLayout>
                                <Settings />
                            </SidebarLayout>
                        }
                    />
                    <Route
                        path="/booking"
                        element={
                            <SidebarLayout>
                                <Booking />
                            </SidebarLayout>
                        }
                    />
                    <Route
                        path="/gallery"
                        element={
                            <SidebarLayout>
                                <Gallery />
                            </SidebarLayout>
                        }
                    />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
