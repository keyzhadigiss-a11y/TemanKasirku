import React, { useState } from 'react';
import { BarChart3, Download, TrendingUp, Calendar, QrCode, Coins, CreditCard, PieChart } from 'lucide-react';
import { Transaction } from '../types';
import { formatIDR, SALES_CHART_DATA } from '../data/mockData';

interface LaporanViewProps {
  transactions: Transaction[];
  onDownloadReport: () => void;
}

export const LaporanView: React.FC<LaporanViewProps> = ({ transactions, onDownloadReport }) => {
  const [period, setPeriod] = useState<'daily' | 'weekly' | 'monthly'>('weekly');

  const totalRevenue = transactions.reduce((acc, t) => acc + t.total, 0);
  const totalTransactions = transactions.length;
  const avgBasket = totalTransactions > 0 ? Math.round(totalRevenue / totalTransactions) : 0;

  // Breakdown by payment method
  const qrisCount = transactions.filter(t => t.paymentMethod === 'QRIS').length;
  const cashCount = transactions.filter(t => t.paymentMethod === 'Tunai').length;
  const debitCount = transactions.filter(t => t.paymentMethod === 'Kartu Debit').length;

  return (
    <div id="laporan-view-content" className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#1b1c1c]">
            Laporan Finansial & Penjualan
          </h2>
          <p className="text-sm text-[#4c4546] mt-0.5">
            Analisis omset harian, distribusi metode pembayaran, dan ringkasan audit.
          </p>
        </div>

        <button
          onClick={onDownloadReport}
          className="flex items-center gap-2 bg-[#000000] text-white px-4 py-2.5 rounded-xl hover:bg-[#1b1b1b] transition-all text-xs font-bold shadow-md shadow-black/10"
        >
          <Download className="w-4 h-4" />
          <span>Ekspor CSV / PDF</span>
        </button>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-[#EEEEEE] shadow-xs">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Total Omset</p>
          <h3 className="text-2xl font-bold text-[#1b1c1c]">{formatIDR(totalRevenue)}</h3>
          <p className="text-xs text-emerald-600 font-semibold mt-2 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            +18.4% dibandingkan minggu lalu
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#EEEEEE] shadow-xs">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Total Transaksi</p>
          <h3 className="text-2xl font-bold text-[#1b1c1c]">{totalTransactions} Trx</h3>
          <p className="text-xs text-gray-400 mt-2">Semua transaksi sukses tercatat</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#EEEEEE] shadow-xs">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Rata-Rata Nilai Belanja (AOV)</p>
          <h3 className="text-2xl font-bold text-[#805062]">{formatIDR(avgBasket)}</h3>
          <p className="text-xs text-gray-400 mt-2">Per struk transaksi</p>
        </div>
      </div>

      {/* Grid: Bar chart + Payment Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Bar comparison */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-[#EEEEEE] p-5 md:p-6 shadow-xs">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-base text-[#1b1c1c]">Performa Penjualan 7 Hari</h3>
            <span className="text-xs text-[#805062] font-semibold bg-[#fec1d6]/20 px-3 py-1 rounded-full">
              IDR (Rupiah)
            </span>
          </div>

          <div className="flex items-end gap-3 h-52 pt-6">
            {SALES_CHART_DATA.map((item, idx) => {
              const heightPercent = Math.min(100, Math.max(15, (item.sales / 5000000) * 100));
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                  <div className="text-[10px] font-bold text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity">
                    {(item.sales / 1000000).toFixed(1)}M
                  </div>
                  <div
                    className="w-full bg-[#fec1d6]/40 hover:bg-[#805062] rounded-t-lg transition-all cursor-pointer"
                    style={{ height: `${heightPercent}%` }}
                  />
                  <span className="text-xs font-semibold text-gray-500">{item.day}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Payment distribution */}
        <div className="bg-white rounded-2xl border border-[#EEEEEE] p-5 md:p-6 shadow-xs flex flex-col justify-between">
          <h3 className="font-bold text-base text-[#1b1c1c] mb-4">Distribusi Pembayaran</h3>
          
          <div className="space-y-4 my-auto">
            <div>
              <div className="flex justify-between text-xs font-bold text-gray-700 mb-1">
                <span className="flex items-center gap-1.5"><QrCode className="w-4 h-4 text-[#805062]" /> QRIS</span>
                <span>{qrisCount} transaksi ({totalTransactions > 0 ? Math.round((qrisCount / totalTransactions) * 100) : 0}%)</span>
              </div>
              <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#805062] rounded-full"
                  style={{ width: `${totalTransactions > 0 ? (qrisCount / totalTransactions) * 100 : 0}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-gray-700 mb-1">
                <span className="flex items-center gap-1.5"><Coins className="w-4 h-4 text-emerald-600" /> Tunai</span>
                <span>{cashCount} transaksi ({totalTransactions > 0 ? Math.round((cashCount / totalTransactions) * 100) : 0}%)</span>
              </div>
              <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full"
                  style={{ width: `${totalTransactions > 0 ? (cashCount / totalTransactions) * 100 : 0}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-gray-700 mb-1">
                <span className="flex items-center gap-1.5"><CreditCard className="w-4 h-4 text-blue-600" /> Kartu Debit</span>
                <span>{debitCount} transaksi ({totalTransactions > 0 ? Math.round((debitCount / totalTransactions) * 100) : 0}%)</span>
              </div>
              <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full"
                  style={{ width: `${totalTransactions > 0 ? (debitCount / totalTransactions) * 100 : 0}%` }}
                />
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100 text-center">
            <span className="text-xs text-gray-400">Data otomatis terupdate secara real-time</span>
          </div>
        </div>
      </div>
    </div>
  );
};
