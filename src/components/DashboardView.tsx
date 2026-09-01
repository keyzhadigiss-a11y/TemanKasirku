import React from 'react';
import { 
  CreditCard, 
  Receipt, 
  ShoppingBag, 
  AlertTriangle, 
  TrendingUp, 
  Calendar, 
  Download, 
  ChevronRight
} from 'lucide-react';
import { SalesChart } from './SalesChart';
import { TOP_PRODUCTS, formatIDR } from '../data/mockData';
import { Transaction, NavigationTab } from '../types';

interface DashboardViewProps {
  transactions: Transaction[];
  onSelectTransaction: (trx: Transaction) => void;
  setActiveTab: (tab: NavigationTab) => void;
  onDownloadReport: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  transactions,
  onSelectTransaction,
  setActiveTab,
  onDownloadReport
}) => {
  const recentTransactions = transactions.slice(0, 5);

  return (
    <div id="dashboard-view-content" className="space-y-6 animate-in fade-in duration-200">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#1b1c1c]">
            Ringkasan Hari Ini
          </h2>
          <p className="text-sm md:text-base text-[#4c4546] mt-1">
            Selamat datang kembali! Ini performa bisnismu hari ini.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            id="btn-filter-today"
            className="px-3.5 py-2 bg-white border border-[#cfc4c5] rounded-lg text-xs md:text-sm font-semibold text-[#1b1c1c] hover:bg-[#F5F3F3] transition-colors flex items-center gap-2 shadow-2xs"
          >
            <Calendar className="w-4 h-4 text-[#805062]" />
            <span>Hari Ini</span>
          </button>
          <button
            id="btn-download-report"
            onClick={onDownloadReport}
            className="px-4 py-2 bg-[#000000] text-white rounded-lg text-xs md:text-sm font-semibold hover:bg-[#1b1b1b] transition-all flex items-center gap-2 shadow-md shadow-black/10 hover:shadow-black/20"
          >
            <Download className="w-4 h-4" />
            <span>Unduh Laporan</span>
          </button>
        </div>
      </div>

      {/* Bento Grid: 4 Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Penjualan */}
        <div
          id="stat-card-total-sales"
          className="bg-white p-5 md:p-6 rounded-xl border border-[#EEEEEE] flex flex-col justify-between relative overflow-hidden group hover:shadow-[0_12px_24px_rgba(0,0,0,0.05)] transition-all duration-300"
        >
          <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 bg-[#fec1d6]/20 rounded-full blur-2xl group-hover:bg-[#fec1d6]/40 transition-colors"></div>
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div className="p-3 bg-[#fec1d6]/30 text-[#805062] rounded-xl">
              <CreditCard className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-emerald-600" />
              +12.5%
            </span>
          </div>
          <div className="relative z-10">
            <p className="text-xs font-medium text-[#7e7576] uppercase tracking-wider mb-1">
              Total Penjualan
            </p>
            <h3 className="text-2xl md:text-[26px] font-bold text-[#1b1c1c]">
              Rp 4.250.000
            </h3>
          </div>
        </div>

        {/* Card 2: Total Transaksi */}
        <div
          id="stat-card-total-transactions"
          className="bg-white p-5 md:p-6 rounded-xl border border-[#EEEEEE] flex flex-col justify-between relative overflow-hidden group hover:shadow-[0_12px_24px_rgba(0,0,0,0.05)] transition-all duration-300"
        >
          <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 bg-blue-100/40 rounded-full blur-2xl group-hover:bg-blue-100/60 transition-colors"></div>
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
              <Receipt className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-emerald-600" />
              +5.2%
            </span>
          </div>
          <div className="relative z-10">
            <p className="text-xs font-medium text-[#7e7576] uppercase tracking-wider mb-1">
              Total Transaksi
            </p>
            <h3 className="text-2xl md:text-[26px] font-bold text-[#1b1c1c]">
              128
            </h3>
          </div>
        </div>

        {/* Card 3: Produk Terjual */}
        <div
          id="stat-card-products-sold"
          className="bg-white p-5 md:p-6 rounded-xl border border-[#EEEEEE] flex flex-col justify-between relative overflow-hidden group hover:shadow-[0_12px_24px_rgba(0,0,0,0.05)] transition-all duration-300"
        >
          <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 bg-purple-100/40 rounded-full blur-2xl group-hover:bg-purple-100/60 transition-colors"></div>
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>
          <div className="relative z-10">
            <p className="text-xs font-medium text-[#7e7576] uppercase tracking-wider mb-1">
              Produk Terjual
            </p>
            <h3 className="text-2xl md:text-[26px] font-bold text-[#1b1c1c]">
              342
            </h3>
          </div>
        </div>

        {/* Card 4: Stok Menipis */}
        <div
          id="stat-card-low-stock"
          onClick={() => setActiveTab('stok')}
          className="bg-white p-5 md:p-6 rounded-xl border border-red-100 flex flex-col justify-between relative overflow-hidden group hover:shadow-[0_12px_24px_rgba(0,0,0,0.05)] transition-all duration-300 cursor-pointer"
        >
          <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 bg-red-100/40 rounded-full blur-2xl group-hover:bg-red-100/60 transition-colors"></div>
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div className="p-3 bg-red-50 text-red-600 rounded-xl">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
          <div className="relative z-10">
            <p className="text-xs font-medium text-[#7e7576] uppercase tracking-wider mb-1">
              Stok Menipis
            </p>
            <h3 className="text-2xl md:text-[26px] font-bold text-red-600 flex items-baseline gap-1.5">
              12 <span className="text-sm font-normal text-[#7e7576]">Item</span>
            </h3>
          </div>
        </div>
      </div>

      {/* Main Grid: Chart & Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Chart (2 columns on large screens) */}
        <div className="lg:col-span-2">
          <SalesChart />
        </div>

        {/* Top Products (1 column) */}
        <div
          id="top-selling-products-card"
          className="bg-white rounded-xl border border-[#EEEEEE] p-5 md:p-6 flex flex-col shadow-xs"
        >
          <div className="flex justify-between items-center mb-5">
            <h3 className="font-semibold text-base md:text-lg text-[#1b1c1c]">Produk Terlaris</h3>
            <button
              id="btn-view-all-products"
              onClick={() => setActiveTab('produk')}
              className="text-xs font-semibold text-[#805062] hover:underline"
            >
              Lihat Semua
            </button>
          </div>

          <div className="space-y-3.5 flex-1">
            {TOP_PRODUCTS.map((item) => (
              <div
                key={item.product.id}
                onClick={() => setActiveTab('produk')}
                className="flex items-center gap-3.5 p-2 rounded-xl hover:bg-[#F5F3F3] transition-colors cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-[#FBF9F8] border border-[#EEEEEE] shrink-0 p-0.5">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-cover rounded-md group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-[#1b1c1c] truncate group-hover:text-[#805062] transition-colors">
                    {item.product.name}
                  </p>
                  <p className="text-xs text-[#7e7576]">{formatIDR(item.product.price)}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-bold text-sm text-[#1b1c1c]">{item.sold}</p>
                  <p className="text-[10px] text-[#7e7576]">Terjual</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Transactions Table */}
      <div
        id="recent-transactions-table-card"
        className="bg-white rounded-xl border border-[#EEEEEE] overflow-hidden shadow-xs"
      >
        <div className="p-5 md:p-6 border-b border-[#EEEEEE] flex justify-between items-center">
          <h3 className="font-semibold text-base md:text-lg text-[#1b1c1c]">Transaksi Terbaru</h3>
          <button
            id="btn-view-all-transactions"
            onClick={() => setActiveTab('riwayat')}
            className="px-3.5 py-1.5 bg-[#fec1d6]/25 text-[#805062] rounded-lg text-xs font-semibold hover:bg-[#fec1d6]/40 transition-colors"
          >
            Lihat Semua
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#FBF9F8] text-xs font-medium text-[#7e7576] border-b border-[#EEEEEE]">
                <th className="p-4 pl-6 font-semibold">ID Pesanan</th>
                <th className="p-4 font-semibold">Waktu</th>
                <th className="p-4 font-semibold">Pelanggan</th>
                <th className="p-4 font-semibold">Total</th>
                <th className="p-4 pr-6 font-semibold">Status</th>
                <th className="p-4 font-semibold text-center w-16">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-[#EEEEEE]">
              {recentTransactions.map((trx) => (
                <tr
                  key={trx.id}
                  onClick={() => {
                    onSelectTransaction(trx);
                    setActiveTab('riwayat');
                  }}
                  className="hover:bg-[#F5F3F3]/60 transition-colors cursor-pointer group"
                >
                  <td className="p-4 pl-6 font-semibold text-[#1b1c1c] group-hover:text-[#805062] transition-colors">
                    {trx.id}
                  </td>
                  <td className="p-4 text-[#7e7576]">{trx.time}</td>
                  <td className="p-4 text-[#1b1c1c]">{trx.customerName}</td>
                  <td className="p-4 font-bold text-[#1b1c1c]">{formatIDR(trx.total)}</td>
                  <td className="p-4 pr-6">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        trx.status === 'Sukses'
                          ? 'bg-emerald-50 text-emerald-700'
                          : trx.status === 'Tertunda'
                          ? 'bg-amber-50 text-amber-700'
                          : 'bg-red-50 text-red-700'
                      }`}
                    >
                      {trx.status}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <button className="text-[#805062] group-hover:translate-x-0.5 transition-transform p-1">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
