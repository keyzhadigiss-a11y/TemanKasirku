import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopNav } from './components/TopNav';
import { DashboardView } from './components/DashboardView';
import { KasirView } from './components/KasirView';
import { ProdukView } from './components/ProdukView';
import { KategoriView } from './components/KategoriView';
import { StokView } from './components/StokView';
import { RiwayatView } from './components/RiwayatView';
import { LaporanView } from './components/LaporanView';
import { PengaturanView } from './components/PengaturanView';
import { ReceiptModal } from './components/ReceiptModal';
import { INITIAL_PRODUCTS, INITIAL_TRANSACTIONS } from './data/mockData';
import { NavigationTab, Product, Transaction, CartItem } from './types';

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<NavigationTab>('dashboard');
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [globalSearch, setGlobalSearch] = useState<string>('');

  // Products State with localStorage fallback
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('kasirku_products');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_PRODUCTS;
      }
    }
    return INITIAL_PRODUCTS;
  });

  // Transactions State with localStorage fallback
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('kasirku_transactions');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_TRANSACTIONS;
      }
    }
    return INITIAL_TRANSACTIONS;
  });

  // POS Cart State
  const [cart, setCart] = useState<CartItem[]>([]);

  // Selected Transaction for Riwayat View & Receipt Modal
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [receiptModalTrx, setReceiptModalTrx] = useState<Transaction | null>(null);

  // Sync products to localStorage
  useEffect(() => {
    localStorage.setItem('kasirku_products', JSON.stringify(products));
  }, [products]);

  // Sync transactions to localStorage
  useEffect(() => {
    localStorage.setItem('kasirku_transactions', JSON.stringify(transactions));
  }, [transactions]);

  // Handler: Add product
  const handleAddProduct = (newProd: Product) => {
    setProducts((prev) => [newProd, ...prev]);
  };

  // Handler: Update product
  const handleUpdateProduct = (updatedProd: Product) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProd.id ? updatedProd : p))
    );
  };

  // Handler: Delete product
  const handleDeleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  // Handler: Update stock
  const handleUpdateStock = (productId: string, newStock: number) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, stock: Math.max(0, newStock) } : p))
    );
  };

  // Handler: Complete Sale (from Kasir)
  const handleCompleteSale = (newTrx: Transaction) => {
    // Deduct stock for each purchased item
    setProducts((prevProducts) => {
      return prevProducts.map((p) => {
        const itemSold = newTrx.items.find((it) => it.product.id === p.id);
        if (itemSold) {
          return {
            ...p,
            stock: Math.max(0, p.stock - itemSold.quantity)
          };
        }
        return p;
      });
    });

    // Add to transactions history
    setTransactions((prev) => [newTrx, ...prev]);

    // Clear active cart
    setCart([]);
  };

  // Handler: Download report
  const handleDownloadReport = () => {
    const header = 'ID,Tanggal,Waktu,Pelanggan,Kasir,Metode,Total,Status\n';
    const rows = transactions
      .map(
        (t) =>
          `"${t.id}","${t.date}","${t.time}","${t.customerName}","${t.cashierName}","${t.paymentMethod}",${t.total},"${t.status}"`
      )
      .join('\n');
    const blob = new Blob([header + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Laporan_Penjualan_KASIRKU_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Count low stock items (< 5)
  const lowStockCount = products.filter((p) => p.stock > 0 && p.stock <= 5).length;

  return (
    <div className="min-h-screen bg-[#FBF9F8] text-[#1b1c1c] font-sans antialiased flex flex-col md:flex-row selection:bg-[#fec1d6] selection:text-[#805062]">
      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        lowStockCount={lowStockCount}
      />

      {/* Main Wrapper */}
      <div className="flex-1 md:pl-[260px] flex flex-col min-h-screen min-w-0">
        {/* Top Navbar */}
        <TopNav
          searchTerm={globalSearch}
          setSearchTerm={setGlobalSearch}
          onOpenMobileMenu={() => setMobileOpen(true)}
          title={
            activeTab === 'dashboard'
              ? 'Dashboard'
              : activeTab === 'kasir'
              ? 'Kasir POS'
              : activeTab === 'produk'
              ? 'Produk'
              : activeTab === 'kategori'
              ? 'Kategori'
              : activeTab === 'stok'
              ? 'Stok'
              : activeTab === 'riwayat'
              ? 'Riwayat'
              : activeTab === 'laporan'
              ? 'Laporan'
              : 'Pengaturan'
          }
        />

        {/* Main Workspace Area */}
        <main
          id="main-app-viewport"
          className="flex-1 p-4 md:p-8 pt-20 md:pt-22 max-w-7xl w-full mx-auto"
        >
          {activeTab === 'dashboard' && (
            <DashboardView
              transactions={transactions}
              onSelectTransaction={(trx) => {
                setSelectedTransaction(trx);
                setActiveTab('riwayat');
              }}
              setActiveTab={setActiveTab}
              onDownloadReport={handleDownloadReport}
            />
          )}

          {activeTab === 'kasir' && (
            <KasirView
              products={products}
              cart={cart}
              setCart={setCart}
              onCompleteSale={handleCompleteSale}
              onOpenReceipt={(trx) => setReceiptModalTrx(trx)}
            />
          )}

          {activeTab === 'produk' && (
            <ProdukView
              products={products}
              onAddProduct={handleAddProduct}
              onUpdateProduct={handleUpdateProduct}
              onDeleteProduct={handleDeleteProduct}
            />
          )}

          {activeTab === 'kategori' && (
            <KategoriView
              products={products}
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === 'stok' && (
            <StokView
              products={products}
              onUpdateStock={handleUpdateStock}
            />
          )}

          {activeTab === 'riwayat' && (
            <RiwayatView
              transactions={transactions}
              selectedTransaction={selectedTransaction}
              onSelectTransaction={(trx) => setSelectedTransaction(trx)}
              onPrintReceipt={(trx) => setReceiptModalTrx(trx)}
            />
          )}

          {activeTab === 'laporan' && (
            <LaporanView
              transactions={transactions}
              onDownloadReport={handleDownloadReport}
            />
          )}

          {activeTab === 'pengaturan' && <PengaturanView />}
        </main>
      </div>

      {/* Thermal Receipt Modal (Accessible from any screen) */}
      <ReceiptModal
        transaction={receiptModalTrx}
        onClose={() => setReceiptModalTrx(null)}
      />
    </div>
  );
}
