// Utility untuk sinkronisasi data pembayaran antar halaman
import { dataStore } from './dataStore';

/**
 * Sinkronisasi data pembayaran dari invoice ke data keuangan
 */
export const syncInvoicesToIncomes = () => {
  const invoices = dataStore.getInvoices() || [];
  
  return invoices
    .filter(inv => inv.status === 'paid')
    .map(inv => ({
      id: inv.id,
      clientName: inv.client || 'Klien',
      serviceType: inv.items?.[0]?.serviceType || 'other',
      paymentType: 'full',
      amount: inv.grandTotal || 0,
      paymentMethod: inv.paymentMethod || 'transfer',
      transactionDate: inv.date,
      notes: inv.notes || '',
      invoiceNumber: inv.invoiceNumber
    }));
};

/**
 * Dapatkan total pembayaran untuk klien tertentu
 */
export const getClientTotalPaid = (clientId) => {
  const clients = dataStore.getClients();
  const client = clients.find(c => c.id === clientId);
  
  if (!client || !client.paymentHistory) return 0;
  
  return client.paymentHistory.reduce((sum, payment) => sum + (payment.amount || 0), 0);
};

/**
 * Dapatkan sisa pembayaran untuk klien tertentu
 */
export const getClientRemainingAmount = (clientId) => {
  const clients = dataStore.getClients();
  const client = clients.find(c => c.id === clientId);
  
  if (!client) return 0;
  
  const totalAmount = client.totalAmount || 0;
  const totalPaid = getClientTotalPaid(clientId);
  
  return Math.max(0, totalAmount - totalPaid);
};

/**
 * Update status pembayaran klien berdasarkan payment history
 */
export const updateClientPaymentStatus = (clientId) => {
  const clients = dataStore.getClients();
  const client = clients.find(c => c.id === clientId);
  
  if (!client) return null;
  
  const totalPaid = getClientTotalPaid(clientId);
  const totalAmount = client.totalAmount || 0;
  
  let newStatus = 'pending';
  if (totalPaid >= totalAmount) {
    newStatus = 'paid';
  } else if (totalPaid > 0) {
    newStatus = 'partial';
  }
  
  if (client.paymentStatus !== newStatus) {
    dataStore.updateClient(clientId, { paymentStatus: newStatus });
  }
  
  return newStatus;
};

/**
 * Dapatkan semua invoice untuk klien tertentu
 */
export const getClientInvoices = (clientId) => {
  const invoices = dataStore.getInvoices() || [];
  return invoices.filter(inv => inv.clientId === clientId);
};

/**
 * Dapatkan ringkasan pembayaran untuk klien
 */
export const getClientPaymentSummary = (clientId) => {
  const clients = dataStore.getClients();
  const client = clients.find(c => c.id === clientId);
  
  if (!client) return null;
  
  const totalAmount = client.totalAmount || 0;
  const totalPaid = getClientTotalPaid(clientId);
  const remainingAmount = getClientRemainingAmount(clientId);
  const invoices = getClientInvoices(clientId);
  
  return {
    clientId,
    clientName: client.name,
    totalAmount,
    totalPaid,
    remainingAmount,
    paymentStatus: client.paymentStatus,
    paymentHistory: client.paymentHistory || [],
    invoices,
    invoiceCount: invoices.length,
    lastPaymentDate: client.paymentHistory?.length > 0 
      ? client.paymentHistory[client.paymentHistory.length - 1].date 
      : null
  };
};

/**
 * Validasi konsistensi data pembayaran
 */
export const validatePaymentConsistency = (clientId) => {
  const summary = getClientPaymentSummary(clientId);
  if (!summary) return { isValid: false, errors: ['Client not found'] };
  
  const errors = [];
  
  // Cek apakah total paid sesuai dengan payment history
  const calculatedTotal = summary.paymentHistory.reduce((sum, p) => sum + (p.amount || 0), 0);
  if (Math.abs(calculatedTotal - summary.totalPaid) > 0.01) {
    errors.push('Total paid tidak sesuai dengan payment history');
  }
  
  // Cek apakah status pembayaran sesuai
  let expectedStatus = 'pending';
  if (summary.totalPaid >= summary.totalAmount) {
    expectedStatus = 'paid';
  } else if (summary.totalPaid > 0) {
    expectedStatus = 'partial';
  }
  
  if (summary.paymentStatus !== expectedStatus) {
    errors.push(`Status pembayaran tidak sesuai. Expected: ${expectedStatus}, Got: ${summary.paymentStatus}`);
  }
  
  // Cek apakah jumlah invoice sesuai dengan payment history
  const paidInvoices = summary.invoices.filter(inv => inv.status === 'paid');
  if (paidInvoices.length !== summary.paymentHistory.length) {
    errors.push('Jumlah invoice tidak sesuai dengan payment history');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    summary
  };
};

/**
 * Perbaiki inkonsistensi data pembayaran
 */
export const fixPaymentInconsistency = (clientId) => {
  const validation = validatePaymentConsistency(clientId);
  
  if (validation.isValid) {
    return { success: true, message: 'Data sudah konsisten' };
  }
  
  // Update status pembayaran
  updateClientPaymentStatus(clientId);
  
  return { 
    success: true, 
    message: 'Data berhasil diperbaiki',
    errors: validation.errors 
  };
};

/**
 * Export semua data pembayaran untuk debugging
 */
export const exportPaymentData = () => {
  const clients = dataStore.getClients();
  const invoices = dataStore.getInvoices();
  
  return {
    clients: clients.map(c => ({
      id: c.id,
      name: c.name,
      totalAmount: c.totalAmount,
      paymentStatus: c.paymentStatus,
      paymentHistory: c.paymentHistory,
      totalPaid: getClientTotalPaid(c.id),
      remainingAmount: getClientRemainingAmount(c.id)
    })),
    invoices: invoices.map(inv => ({
      id: inv.id,
      invoiceNumber: inv.invoiceNumber,
      clientId: inv.clientId,
      client: inv.client,
      grandTotal: inv.grandTotal,
      status: inv.status,
      date: inv.date
    })),
    summary: {
      totalClients: clients.length,
      totalInvoices: invoices.length,
      totalRevenue: invoices
        .filter(inv => inv.status === 'paid')
        .reduce((sum, inv) => sum + (inv.grandTotal || 0), 0)
    }
  };
};
