import React, { useState, useEffect } from 'react';
import Icon from '../../components/AppIcon';
import QuickActionButton from '../../components/ui/QuickActionButton';
import FinancialSummaryCards from './components/FinancialSummaryCards';
import MyCards from './components/MyCards';
import IncomeEntryForm from './components/IncomeEntryForm';
import ExpenseEntryForm from './components/ExpenseEntryForm';
import IncomeList from './components/IncomeList';
import ExpenseList from './components/ExpenseList';
import FinancialReportView from './components/FinancialReportView';
import FilterBar from './components/FilterBar';

const FinancialTracking = () => {
  const [activeTab, setActiveTab] = useState('income');
  const [showIncomeForm, setShowIncomeForm] = useState(false);
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [filters, setFilters] = useState({
    dateFrom: '',
    dateTo: '',
    category: '',
    serviceType: '',
    paymentMethod: '',
    minAmount: '',
    maxAmount: ''
  });

  const [incomes, setIncomes] = useState([
    {
      id: 1,
      clientName: "Siti Nurhaliza",
      serviceType: "akad",
      paymentType: "dp",
      amount: 1500000,
      paymentMethod: "transfer",
      transactionDate: "2025-11-15",
      notes: "DP 50% untuk acara akad nikah tanggal 25 November 2025"
    },
    {
      id: 2,
      clientName: "Dewi Lestari",
      serviceType: "resepsi",
      paymentType: "full",
      amount: 3500000,
      paymentMethod: "transfer",
      transactionDate: "2025-11-18",
      notes: "Pelunasan paket resepsi premium dengan 2 asisten"
    },
    {
      id: 3,
      clientName: "Rina Kusuma",
      serviceType: "wisuda",
      paymentType: "cash",
      amount: 800000,
      paymentMethod: "cash",
      transactionDate: "2025-11-20",
      notes: "Pembayaran tunai untuk makeup wisuda di kampus"
    }
  ]);

  const [expenses, setExpenses] = useState([
    {
      id: 1,
      category: "cosmetics",
      description: "Pembelian foundation MAC Studio Fix Fluid SPF 15",
      amount: 650000,
      vendor: "Sephora Indonesia",
      paymentMethod: "debit",
      transactionDate: "2025-11-10",
      receiptUrl: "https://images.unsplash.com/photo-1600379988761-cbf47c47cbfd",
      notes: "Stok foundation untuk tone kulit medium"
    },
    {
      id: 2,
      category: "salary",
      description: "Gaji asisten makeup bulan November 2025",
      amount: 2000000,
      vendor: "Asisten Rina",
      paymentMethod: "transfer",
      transactionDate: "2025-11-01",
      notes: "Gaji bulanan untuk asisten tetap"
    },
    {
      id: 3,
      category: "transport",
      description: "Biaya transportasi ke lokasi acara Tangerang",
      amount: 250000,
      vendor: "Grab",
      paymentMethod: "ewallet",
      transactionDate: "2025-11-18",
      notes: "Transportasi PP untuk acara resepsi"
    },
    {
      id: 4,
      category: "equipment",
      description: "Pembelian brush set professional 12 pieces",
      amount: 850000,
      vendor: "Makeup Tools Store",
      paymentMethod: "transfer",
      transactionDate: "2025-11-12",
      notes: "Set brush baru untuk mengganti yang rusak"
    }
  ]);

  const summaryData = {
    totalIncome: incomes?.reduce((sum, item) => sum + item?.amount, 0),
    totalExpense: expenses?.reduce((sum, item) => sum + item?.amount, 0),
    netProfit: incomes?.reduce((sum, item) => sum + item?.amount, 0) - expenses?.reduce((sum, item) => sum + item?.amount, 0),
    profitMargin: ((incomes?.reduce((sum, item) => sum + item?.amount, 0) - expenses?.reduce((sum, item) => sum + item?.amount, 0)) / incomes?.reduce((sum, item) => sum + item?.amount, 0) * 100)?.toFixed(1),
    incomeTrend: 12.5,
    expenseTrend: -8.3,
    profitTrend: 18.7,
    marginTrend: 5.2
  };

  const reportData = {
    monthlyTrend: [
      { month: 'Jul', income: 8500000, expense: 4200000, profit: 4300000 },
      { month: 'Agu', income: 9200000, expense: 4500000, profit: 4700000 },
      { month: 'Sep', income: 10100000, expense: 4800000, profit: 5300000 },
      { month: 'Okt', income: 11500000, expense: 5100000, profit: 6400000 },
      { month: 'Nov', income: 12800000, expense: 5400000, profit: 7400000 }
    ],
    expenseBreakdown: [
      { category: 'cosmetics', name: 'Kosmetik', value: 2500000 },
      { category: 'salary', name: 'Gaji Asisten', value: 2000000 },
      { category: 'transport', name: 'Transportasi', value: 500000 },
      { category: 'equipment', name: 'Peralatan', value: 300000 },
      { category: 'marketing', name: 'Marketing', value: 100000 }
    ],
    totalIncome: 12800000,
    totalExpense: 5400000,
    netProfit: 7400000
  };

  const handleIncomeSubmit = (data) => {
    const newIncome = {
      id: incomes?.length + 1,
      ...data
    };
    setIncomes([newIncome, ...incomes]);
    setShowIncomeForm(false);
  };

  const handleExpenseSubmit = (data) => {
    const newExpense = {
      id: expenses?.length + 1,
      ...data
    };
    setExpenses([newExpense, ...expenses]);
    setShowExpenseForm(false);
  };

  const handleDeleteIncome = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus data pemasukan ini?')) {
      setIncomes(incomes?.filter((item) => item?.id !== id));
    }
  };

  const handleDeleteExpense = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus data pengeluaran ini?')) {
      setExpenses(expenses?.filter((item) => item?.id !== id));
    }
  };

  const handleExportReport = () => {
    alert('Fitur ekspor laporan akan segera tersedia. Laporan akan diekspor dalam format PDF atau Excel.');
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">

      <main className="max-w-screen-xl mx-auto px-4 sm:px-6 py-6 pb-24 lg:pb-6">
        {/* Header Section */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Icon name="Wallet" size={24} color="var(--color-primary)" strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-2xl font-heading font-bold text-foreground">
                Pelacakan Keuangan
              </h1>
              <p className="text-sm text-muted-foreground">
                Kelola pemasukan dan pengeluaran bisnis makeup Anda
              </p>
            </div>
          </div>
        </div>

        {/* My Cards Section */}
        <MyCards />

        {/* Summary Cards */}
        <FinancialSummaryCards summaryData={summaryData} />

        {/* Quick Actions */}
        <div className="flex items-center gap-3 my-6 overflow-x-auto pb-2">
          <QuickActionButton
            label="Catat Pemasukan"
            icon="Plus"
            variant="primary"
            onClick={() => {
              setShowIncomeForm(true);
              setShowExpenseForm(false);
              setActiveTab('income');
            }}
          />
          <QuickActionButton
            label="Tambah Pengeluaran"
            icon="Minus"
            variant="secondary"
            onClick={() => {
              setShowExpenseForm(true);
              setShowIncomeForm(false);
              setActiveTab('expense');
            }}
          />
          <QuickActionButton
            label="Ekspor Laporan"
            icon="Download"
            variant="outline"
            onClick={handleExportReport}
          />
        </div>

        {/* Filter Bar */}
        <FilterBar
          onFilterChange={setFilters}
          activeFilters={filters}
        />

        {/* Tabs Navigation */}
        <div className="flex items-center gap-2 border-b border-border mt-6 overflow-x-auto">
          <button
            onClick={() => {
              setActiveTab('income');
              setShowIncomeForm(false);
              setShowExpenseForm(false);
            }}
            className={`
              px-4 py-3 text-sm font-medium transition-smooth relative whitespace-nowrap
              ${activeTab === 'income' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}
            `}
          >
            <Icon name="TrendingUp" size={16} className="inline mr-2" />
            Pemasukan
            {activeTab === 'income' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
            )}
          </button>
          <button
            onClick={() => {
              setActiveTab('expense');
              setShowIncomeForm(false);
              setShowExpenseForm(false);
            }}
            className={`
              px-4 py-3 text-sm font-medium transition-smooth relative whitespace-nowrap
              ${activeTab === 'expense' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}
            `}
          >
            <Icon name="TrendingDown" size={16} className="inline mr-2" />
            Pengeluaran
            {activeTab === 'expense' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
            )}
          </button>
          <button
            onClick={() => {
              setActiveTab('report');
              setShowIncomeForm(false);
              setShowExpenseForm(false);
            }}
            className={`
              px-4 py-3 text-sm font-medium transition-smooth relative whitespace-nowrap
              ${activeTab === 'report' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}
            `}
          >
            <Icon name="BarChart3" size={16} className="inline mr-2" />
            Laporan
            {activeTab === 'report' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
            )}
          </button>
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          {activeTab === 'income' && (
            <div className="space-y-6">
              {showIncomeForm && (
                <div className="p-4 rounded-lg bg-card border border-border elevation-3">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-heading font-semibold text-foreground">
                      Catat Pemasukan Baru
                    </h3>
                    <button
                      onClick={() => setShowIncomeForm(false)}
                      className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth"
                      aria-label="Tutup form"
                    >
                      <Icon name="X" size={18} />
                    </button>
                  </div>
                  <IncomeEntryForm
                    onSubmit={handleIncomeSubmit}
                    onCancel={() => setShowIncomeForm(false)}
                  />
                </div>
              )}
              <IncomeList
                incomes={incomes}
                onEdit={(income) => console.log('Edit income:', income)}
                onDelete={handleDeleteIncome}
              />
            </div>
          )}

          {activeTab === 'expense' && (
            <div className="space-y-6">
              {showExpenseForm && (
                <div className="p-4 rounded-lg bg-card border border-border elevation-3">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-heading font-semibold text-foreground">
                      Tambah Pengeluaran Baru
                    </h3>
                    <button
                      onClick={() => setShowExpenseForm(false)}
                      className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth"
                      aria-label="Tutup form"
                    >
                      <Icon name="X" size={18} />
                    </button>
                  </div>
                  <ExpenseEntryForm
                    onSubmit={handleExpenseSubmit}
                    onCancel={() => setShowExpenseForm(false)}
                  />
                </div>
              )}
              <ExpenseList
                expenses={expenses}
                onEdit={(expense) => console.log('Edit expense:', expense)}
                onDelete={handleDeleteExpense}
              />
            </div>
          )}

          {activeTab === 'report' && (
            <FinancialReportView reportData={reportData} />
          )}
        </div>
      </main>

    </div>
  );
};

export default FinancialTracking;