import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HorizontalNavigation from '../../components/ui/HorizontalNavigation';
import BottomNavigation from '../../components/ui/BottomNavigation';
import QuickActionButton from '../../components/ui/QuickActionButton';
import RevenueCard from './components/RevenueCard';
import UpcomingScheduleCard from './components/UpcomingScheduleCard';
import PendingPaymentAlert from './components/PendingPaymentAlert';
import MetricCard from './components/MetricCard';
import Icon from '../../components/AppIcon';

const Dashboard = () => {
  const navigate = useNavigate();
  const [currentMonth] = useState(new Date()?.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' }));

  const revenueData = {
    totalIncome: 45750000,
    pendingPayments: 12500000,
    totalExpenses: 8300000,
    netRevenue: 37450000
  };

  const upcomingSchedules = [
    {
      id: 1,
      clientName: "Siti Nurhaliza",
      serviceType: "akad",
      date: "2025-11-21",
      time: "09:00",
      location: "Gedung Pernikahan Melati, Jakarta Selatan",
      paymentStatus: "paid"
    },
    {
      id: 2,
      clientName: "Dewi Kartika",
      serviceType: "resepsi",
      date: "2025-11-22",
      time: "14:00",
      location: "Hotel Grand Hyatt, Jakarta Pusat",
      paymentStatus: "partial"
    },
    {
      id: 3,
      clientName: "Rina Wijaya",
      serviceType: "wisuda",
      date: "2025-11-23",
      time: "08:00",
      location: "Universitas Indonesia, Depok",
      paymentStatus: "pending"
    }
  ];

  const pendingPayments = [
    {
      id: 1,
      clientName: "Ayu Lestari",
      amount: 3500000,
      dueDate: "2025-11-15",
      serviceType: "Akad"
    },
    {
      id: 2,
      clientName: "Maya Sari",
      amount: 5000000,
      dueDate: "2025-11-10",
      serviceType: "Resepsi"
    },
    {
      id: 3,
      clientName: "Fitri Handayani",
      amount: 4000000,
      dueDate: "2025-11-12",
      serviceType: "Akad + Resepsi"
    }
  ];

  const metrics = [
    {
      title: "Total Klien Bulan Ini",
      value: "24",
      subtitle: "8 klien baru",
      icon: "Users",
      trend: "up",
      trendValue: "15"
    },
    {
      title: "Jadwal Minggu Ini",
      value: "12",
      subtitle: "3 hari tersedia",
      icon: "Calendar",
      trend: "up",
      trendValue: "8"
    },
    {
      title: "Rata-rata Pendapatan",
      value: "Rp 1,9 Jt",
      subtitle: "per klien",
      icon: "TrendingUp",
      trend: "up",
      trendValue: "12"
    },
    {
      title: "Tingkat Pembayaran",
      value: "87%",
      subtitle: "tepat waktu",
      icon: "CheckCircle2",
      trend: "up",
      trendValue: "5"
    }
  ];

  const handleRemindPayment = (paymentId) => {
    console.log('Sending payment reminder for:', paymentId);
  };

  const handleAddClient = () => {
    navigate('/client-management');
  };

  const handleRecordExpense = () => {
    navigate('/financial-tracking');
  };

  const handleViewCalendar = () => {
    navigate('/calendar-scheduling');
  };

  return (
    <div className="min-h-screen bg-background">
      <HorizontalNavigation />
      <main className="max-w-screen-xl mx-auto px-4 sm:px-6 py-6 pb-24 lg:pb-6">
        {/* Header Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h1 className="text-2xl sm:text-3xl font-heading font-bold text-foreground">
                Dashboard
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Ringkasan bisnis untuk {currentMonth}
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <QuickActionButton
                label="Tambah Klien"
                icon="UserPlus"
                variant="primary"
                onClick={handleAddClient}
              />
              <QuickActionButton
                label="Catat Pengeluaran"
                icon="Receipt"
                variant="outline"
                onClick={handleRecordExpense}
              />
            </div>
          </div>
        </div>

        {/* Revenue Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <RevenueCard
            title="Total Pendapatan"
            amount={revenueData?.totalIncome}
            trend="up"
            trendValue="23"
            icon="Wallet"
            variant="default"
          />
          <RevenueCard
            title="Pembayaran Tertunda"
            amount={revenueData?.pendingPayments}
            trend="down"
            trendValue="8"
            icon="Clock"
            variant="warning"
          />
          <RevenueCard
            title="Total Pengeluaran"
            amount={revenueData?.totalExpenses}
            trend="up"
            trendValue="12"
            icon="Receipt"
            variant="accent"
          />
          <RevenueCard
            title="Pendapatan Bersih"
            amount={revenueData?.netRevenue}
            trend="up"
            trendValue="28"
            icon="TrendingUp"
            variant="success"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Upcoming Schedule Section */}
          <div className="lg:col-span-2">
            <div className="bg-card border border-border rounded-lg p-6 elevation-1">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon name="Calendar" size={20} color="var(--color-primary)" strokeWidth={2.5} />
                  </div>
                  <div>
                    <h2 className="text-lg font-heading font-semibold text-foreground">
                      Jadwal Mendatang
                    </h2>
                    <p className="text-xs text-muted-foreground">
                      {upcomingSchedules?.length} acara minggu ini
                    </p>
                  </div>
                </div>
                <QuickActionButton
                  label="Lihat Kalender"
                  icon="Calendar"
                  variant="outline"
                  size="small"
                  onClick={handleViewCalendar}
                />
              </div>

              <div className="space-y-3">
                {upcomingSchedules?.map((schedule) => (
                  <UpcomingScheduleCard
                    key={schedule?.id}
                    schedule={schedule}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Pending Payments Section */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-lg p-6 elevation-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-lg bg-error/10 flex items-center justify-center">
                  <Icon name="AlertCircle" size={20} color="var(--color-error)" strokeWidth={2.5} />
                </div>
                <div>
                  <h2 className="text-lg font-heading font-semibold text-foreground">
                    Pembayaran Tertunda
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    {pendingPayments?.length} pembayaran terlambat
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {pendingPayments?.map((payment) => (
                  <PendingPaymentAlert
                    key={payment?.id}
                    payment={payment}
                    onRemind={handleRemindPayment}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Key Metrics Section */}
        <div className="bg-card border border-border rounded-lg p-6 elevation-1">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <Icon name="BarChart3" size={20} color="var(--color-accent)" strokeWidth={2.5} />
            </div>
            <div>
              <h2 className="text-lg font-heading font-semibold text-foreground">
                Metrik Kinerja
              </h2>
              <p className="text-xs text-muted-foreground">
                Ringkasan performa bisnis bulan ini
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {metrics?.map((metric, index) => (
              <MetricCard
                key={index}
                title={metric?.title}
                value={metric?.value}
                subtitle={metric?.subtitle}
                icon={metric?.icon}
                trend={metric?.trend}
                trendValue={metric?.trendValue}
              />
            ))}
          </div>
        </div>

        {/* Mobile Quick Actions */}
        <div className="sm:hidden fixed bottom-20 left-4 right-4 z-40">
          <div className="bg-card border border-border rounded-lg p-4 elevation-6">
            <div className="grid grid-cols-2 gap-2">
              <QuickActionButton
                label="Tambah Klien"
                icon="UserPlus"
                variant="primary"
                size="small"
                onClick={handleAddClient}
                className="w-full"
              />
              <QuickActionButton
                label="Catat Pengeluaran"
                icon="Receipt"
                variant="outline"
                size="small"
                onClick={handleRecordExpense}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </main>
      <BottomNavigation />
    </div>
  );
};

export default Dashboard;