import React from 'react';
import { Helmet } from 'react-helmet';
import HorizontalNavigation from '../../components/ui/HorizontalNavigation';
import BottomNavigation from '../../components/ui/BottomNavigation';
import Icon from '../../components/AppIcon';
import StatusManagement from './StatusManagement';
import CategoryManagement from './CategoryManagement';
import ServiceTypeManagement from './ServiceTypeManagement';
import PaymentMethodManagement from './PaymentMethodManagement';

const Settings = () => {
    return (
        <>
            <Helmet>
                <title>Pengaturan - MUA Finance Manager</title>
            </Helmet>
            <div className="min-h-screen bg-background">
                <HorizontalNavigation />
                <main className="max-w-screen-xl mx-auto px-4 sm:px-6 py-6 pb-24 lg:pb-6">
                    <div className="mb-6">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                                <Icon name="Settings" size={24} color="var(--color-primary)" strokeWidth={2.5} />
                            </div>
                            <div>
                                <h1 className="text-2xl sm:text-3xl font-heading font-bold text-foreground">
                                    Pengaturan
                                </h1>
                                <p className="text-sm text-muted-foreground">
                                    Sesuaikan preferensi aplikasi Anda
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <CategoryManagement />
                        
                        <ServiceTypeManagement />
                        
                        <PaymentMethodManagement />
                        
                        <StatusManagement />

                        <div className="p-4 bg-card border border-border rounded-lg">
                            <h3 className="font-bold text-lg mb-2">Tampilan</h3>
                            <div className="flex items-center justify-between">
                                <span>Mode Gelap</span>
                                <button className="w-10 h-6 bg-muted rounded-full relative">
                                    <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform" />
                                </button>
                            </div>
                        </div>

                        <div className="p-4 bg-card border border-border rounded-lg">
                            <h3 className="font-bold text-lg mb-2">Notifikasi</h3>
                            <div className="flex items-center justify-between">
                                <span>Email Notifikasi</span>
                                <button className="w-10 h-6 bg-primary rounded-full relative">
                                    <span className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full transition-transform" />
                                </button>
                            </div>
                        </div>
                    </div>
                </main>
                <BottomNavigation />
            </div>
        </>
    );
};

export default Settings;
