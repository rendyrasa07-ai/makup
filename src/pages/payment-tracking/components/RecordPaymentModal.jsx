import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const RecordPaymentModal = ({ client, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    amount: '',
    method: '',
    reference: '',
    date: new Date()?.toISOString()?.split('T')?.[0],
    notes: ''
  });

  const [errors, setErrors] = useState({});

  const paymentMethodOptions = [
    { value: '', label: 'Pilih Metode Pembayaran' },
    { value: 'cash', label: 'Tunai' },
    { value: 'transfer', label: 'Transfer Bank' },
    { value: 'qris', label: 'QRIS' },
    { value: 'ewallet', label: 'E-Wallet (GoPay, OVO, Dana)' }
  ];

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })?.format(value);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.amount || parseFloat(formData?.amount) <= 0) {
      newErrors.amount = 'Jumlah pembayaran harus lebih dari 0';
    }

    if (parseFloat(formData?.amount) > client?.remainingAmount) {
      newErrors.amount = 'Jumlah melebihi sisa pembayaran';
    }

    if (!formData?.method) {
      newErrors.method = 'Pilih metode pembayaran';
    }

    if (!formData?.date) {
      newErrors.date = 'Tanggal pembayaran wajib diisi';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validateForm()) {
      onSubmit({
        ...formData,
        clientId: client?.id,
        amount: parseFloat(formData?.amount)
      });
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div 
        className="
          w-full max-w-lg bg-card border border-border rounded-2xl
          elevation-12 max-h-[90vh] overflow-y-auto
        "
      >
        <div className="sticky top-0 bg-card border-b border-border p-4 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <h2 id="modal-title" className="text-lg font-heading font-bold text-foreground">
              Catat Pembayaran
            </h2>
            <button
              onClick={onClose}
              className="
                w-8 h-8 rounded-lg flex items-center justify-center
                text-muted-foreground hover:text-foreground hover:bg-muted
                transition-smooth
              "
              aria-label="Tutup"
            >
              <Icon name="X" size={20} strokeWidth={2.5} />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div className="p-3 rounded-lg bg-surface border border-border">
            <p className="text-sm font-caption text-muted-foreground mb-1">
              Klien
            </p>
            <p className="text-base font-heading font-semibold text-foreground">
              {client?.name}
            </p>
            <div className="flex items-center justify-between mt-2 pt-2 border-t border-border">
              <span className="text-sm font-caption text-muted-foreground">
                Sisa Pembayaran
              </span>
              <span className="text-base font-mono font-bold text-error">
                {formatCurrency(client?.remainingAmount)}
              </span>
            </div>
          </div>

          <Input
            label="Jumlah Pembayaran"
            type="number"
            placeholder="Masukkan jumlah"
            value={formData?.amount}
            onChange={(e) => handleInputChange('amount', e?.target?.value)}
            error={errors?.amount}
            required
          />

          <Select
            label="Metode Pembayaran"
            options={paymentMethodOptions}
            value={formData?.method}
            onChange={(value) => handleInputChange('method', value)}
            error={errors?.method}
            required
          />

          <Input
            label="Nomor Referensi"
            type="text"
            placeholder="Nomor transaksi/referensi (opsional)"
            value={formData?.reference}
            onChange={(e) => handleInputChange('reference', e?.target?.value)}
            description="Untuk transfer bank atau e-wallet"
          />

          <Input
            label="Tanggal Pembayaran"
            type="date"
            value={formData?.date}
            onChange={(e) => handleInputChange('date', e?.target?.value)}
            error={errors?.date}
            required
          />

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Catatan
            </label>
            <textarea
              value={formData?.notes}
              onChange={(e) => handleInputChange('notes', e?.target?.value)}
              placeholder="Tambahkan catatan (opsional)"
              rows={3}
              className="
                w-full px-3 py-2 rounded-lg
                bg-surface border border-border
                text-sm text-foreground placeholder:text-muted-foreground
                focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent
                transition-smooth resize-none
              "
            />
          </div>

          <div className="flex items-center gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Batal
            </Button>
            <Button
              type="submit"
              variant="default"
              iconName="Check"
              iconPosition="left"
              className="flex-1"
            >
              Simpan Pembayaran
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RecordPaymentModal;