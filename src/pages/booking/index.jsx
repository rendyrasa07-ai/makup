import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import HorizontalNavigation from '../../components/ui/HorizontalNavigation';
import BottomNavigation from '../../components/ui/BottomNavigation';
import QuickActionButton from '../../components/ui/QuickActionButton';
import Icon from '../../components/AppIcon';
import BookingForm from './components/BookingForm';
import BookingCard from './components/BookingCard';

const Booking = () => {
  const [bookings, setBookings] = useState(() => {
    const saved = localStorage.getItem('bookings');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [showForm, setShowForm] = useState(false);
  const [editingBooking, setEditingBooking] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    localStorage.setItem('bookings', JSON.stringify(bookings));
  }, [bookings]);

  const handleSaveBooking = (bookingData) => {
    if (editingBooking) {
      setBookings(bookings.map(b => 
        b.id === editingBooking.id ? { ...bookingData, id: editingBooking.id } : b
      ));
    } else {
      setBookings([...bookings, { ...bookingData, id: Date.now(), status: 'pending' }]);
    }
    setShowForm(false);
    setEditingBooking(null);
  };

  const handleEditBooking = (booking) => {
    setEditingBooking(booking);
    setShowForm(true);
  };

  const handleDeleteBooking = (id) => {
    if (window.confirm('Yakin ingin menghapus booking ini?')) {
      setBookings(bookings.filter(b => b.id !== id));
    }
  };

  const handleStatusChange = (id, newStatus) => {
    setBookings(bookings.map(b => 
      b.id === id ? { ...b, status: newStatus } : b
    ));
  };

  const filteredBookings = bookings.filter(booking => {
    if (filter === 'all') return true;
    return booking.status === filter;
  });

  const stats = {
    total: bookings.length,
    pending: bookings.filter(b => b.status === 'pending').length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    completed: bookings.filter(b => b.status === 'completed').length,
    cancelled: bookings.filter(b => b.status === 'cancelled').length
  };

  return (
    <>
      <Helmet>
        <title>Booking - MUA Finance Manager</title>
        <meta name="description" content="Kelola booking dan jadwal layanan makeup" />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <HorizontalNavigation />
        
        <main className="max-w-screen-xl mx-auto px-4 sm:px-6 py-6 pb-24 lg:pb-6">
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon name="Calendar" size={24} color="var(--color-primary)" strokeWidth={2.5} />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-heading font-bold text-foreground">
                    Booking
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Kelola semua booking layanan Anda
                  </p>
                </div>
              </div>
              
              <QuickActionButton
                label="Tambah Booking"
                icon="Plus"
                variant="primary"
                onClick={() => { setEditingBooking(null); setShowForm(true); }}
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
              <button
                onClick={() => setFilter('all')}
                className={`p-4 rounded-xl border transition-smooth ${
                  filter === 'all'
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-card border-border hover:bg-muted'
                }`}
              >
                <div className="text-2xl font-bold">{stats.total}</div>
                <div className="text-xs mt-1">Semua</div>
              </button>
              
              <button
                onClick={() => setFilter('pending')}
                className={`p-4 rounded-xl border transition-smooth ${
                  filter === 'pending'
                    ? 'bg-warning text-warning-foreground border-warning'
                    : 'bg-card border-border hover:bg-muted'
                }`}
              >
                <div className="text-2xl font-bold">{stats.pending}</div>
                <div className="text-xs mt-1">Pending</div>
              </button>
              
              <button
                onClick={() => setFilter('confirmed')}
                className={`p-4 rounded-xl border transition-smooth ${
                  filter === 'confirmed'
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-card border-border hover:bg-muted'
                }`}
              >
                <div className="text-2xl font-bold">{stats.confirmed}</div>
                <div className="text-xs mt-1">Confirmed</div>
              </button>
              
              <button
                onClick={() => setFilter('completed')}
                className={`p-4 rounded-xl border transition-smooth ${
                  filter === 'completed'
                    ? 'bg-success text-success-foreground border-success'
                    : 'bg-card border-border hover:bg-muted'
                }`}
              >
                <div className="text-2xl font-bold">{stats.completed}</div>
                <div className="text-xs mt-1">Selesai</div>
              </button>
              
              <button
                onClick={() => setFilter('cancelled')}
                className={`p-4 rounded-xl border transition-smooth ${
                  filter === 'cancelled'
                    ? 'bg-error text-error-foreground border-error'
                    : 'bg-card border-border hover:bg-muted'
                }`}
              >
                <div className="text-2xl font-bold">{stats.cancelled}</div>
                <div className="text-xs mt-1">Batal</div>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredBookings.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                  <Icon name="Calendar" size={32} color="var(--color-muted-foreground)" />
                </div>
                <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
                  Belum Ada Booking
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Tambahkan booking pertama Anda
                </p>
                <QuickActionButton
                  label="Tambah Booking"
                  icon="Plus"
                  variant="primary"
                  onClick={() => setShowForm(true)}
                />
              </div>
            ) : (
              filteredBookings.map(booking => (
                <BookingCard
                  key={booking.id}
                  booking={booking}
                  onEdit={handleEditBooking}
                  onDelete={handleDeleteBooking}
                  onStatusChange={handleStatusChange}
                />
              ))
            )}
          </div>
        </main>

        <BottomNavigation />

        {showForm && (
          <BookingForm
            booking={editingBooking}
            onClose={() => { setShowForm(false); setEditingBooking(null); }}
            onSave={handleSaveBooking}
          />
        )}
      </div>
    </>
  );
};

export default Booking;
