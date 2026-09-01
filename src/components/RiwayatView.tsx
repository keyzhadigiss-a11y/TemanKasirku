import React, { useState } from 'react';
import { 
  Filter, 
  Calendar, 
  QrCode, 
  CreditCard, 
  Coins, 
  ChevronRight, 
  CheckCircle2, 
  Sparkles, 
  Sun, 
  Moon, 
  Droplets,
  Heart,
  ShoppingBag,
  Share2, 
  Printer,
  ChevronLeft,
  X,
  Copy,
  Check
} from 'lucide-react';
import { Transaction, PaymentMethod } from '../types';
import { formatIDR } from '../data/mockData';

interface RiwayatViewProps {
  transactions: Transaction[];
  selectedTransaction: Transaction | null;
  onSelectTransaction: (trx: Transaction) => void;
  onPrintReceipt: (trx: Transaction) => void;
}

export const RiwayatView: React.FC<RiwayatViewProps> = ({
  transactions,
  selectedTransaction,
  onSelectTransaction,
  onPrintReceipt
}) => {
  const [filterPayment, setFilterPayment] = useState<string>('ALL');
  const [filterDate, setFilterDate] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showShareModal, setShowShareModal] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // If no transaction is selected, default to the first one
  const activeTrx = selectedTransaction || transactions[0] || null;

  // Filter transactions
  const filteredTransactions = transactions.filter((trx) => {
    const matchSearch =
      trx.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trx.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trx.cashierName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchPayment = filterPayment === 'ALL' || trx.paymentMethod === filterPayment;
    return matchSearch && matchPayment;
  });

  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage) || 1;
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getPaymentBadge = (method: PaymentMethod) => {
    switch (method) {
      case 'QRIS':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#fec1d6]/25 text-[#805062] text-xs font-semibold">
            <QrCode className="w-3.5 h-3.5" />
            <span>QRIS</span>
          </span>
        );
      case 'Tunai':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#e4e2e2] text-[#4c4546] text-xs font-semibold">
            <Coins className="w-3.5 h-3.5" />
            <span>Tunai</span>
          </span>
        );
      case 'Kartu Debit':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#f4dce4] text-[#25181e] text-xs font-semibold">
            <CreditCard className="w-3.5 h-3.5" />
            <span>Kartu Debit</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-semibold">
            <span>{method}</span>
          </span>
        );
    }
  };

  const getItemIcon = (name: string) => {
    const lower = name.toLowerCase();
    if (lower.includes('moisturizer') || lower.includes('gel') || lower.includes('cream')) {
      return <Droplets className="w-4 h-4 text-[#805062]" />;
    }
    if (lower.includes('sunscreen') || lower.includes('uv') || lower.includes('spf')) {
      return <Sun className="w-4 h-4 text-amber-600" />;
    }
    if (lower.includes('serum')) {
      return <Sparkles className="w-4 h-4 text-purple-600" />;
    }
    if (lower.includes('mask') || lower.includes('sleeping')) {
      return <Moon className="w-4 h-4 text-indigo-600" />;
    }
    if (lower.includes('lip') || lower.includes('tint') || lower.includes('plump')) {
      return <Heart className="w-4 h-4 text-rose-600" />;
    }
    return <ShoppingBag className="w-4 h-4 text-[#7e7576]" />;
  };

  const handleCopyLink = () => {
    if (!activeTrx) return;
    navigator.clipboard?.writeText(
      `Struk Transaksi ${activeTrx.id} - ${formatIDR(activeTrx.total)} di KASIRKU POS`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div id="riwayat-view-content" className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#1b1c1c]">
            Riwayat Penjualan
          </h2>
          <p className="text-sm md:text-base text-[#4c4546] mt-0.5">
            Kelola dan pantau semua transaksi yang telah selesai.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Payment Filter Dropdown */}
          <div className="relative">
            <select
              id="filter-payment-method"
              value={filterPayment}
              onChange={(e) => {
                setFilterPayment(e.target.value);
                setCurrentPage(1);
              }}
              aria-label="Filter metode pembayaran"
              className="px-3 py-2 bg-white border border-[#cfc4c5] rounded-lg text-xs md:text-sm font-semibold text-[#1b1c1c] hover:bg-[#F5F3F3] transition-colors flex items-center gap-2 shadow-2xs cursor-pointer outline-none"
            >
              <option value="ALL">Semua Metode</option>
              <option value="QRIS">QRIS</option>
              <option value="Tunai">Tunai</option>
              <option value="Kartu Debit">Kartu Debit</option>
            </select>
          </div>

          <button
            id="btn-filter-date-today"
            onClick={() => setFilterDate(filterDate === 'TODAY' ? 'ALL' : 'TODAY')}
            className={`px-3.5 py-2 border rounded-lg text-xs md:text-sm font-semibold transition-colors flex items-center gap-2 shadow-2xs ${
              filterDate === 'TODAY'
                ? 'bg-[#805062] text-white border-[#805062]'
                : 'bg-white border-[#cfc4c5] text-[#1b1c1c] hover:bg-[#F5F3F3]'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Hari Ini</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Table & Transaction Detail Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Transactions Table */}
        <div
          id="transactions-table-panel"
          className="lg:col-span-8 bg-white rounded-2xl border border-[#EEEEEE] flex flex-col shadow-xs overflow-hidden"
        >
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse">
              <thead className="bg-[#FCE4EC] border-b border-[#fec1d6]/50">
                <tr>
                  <th className="text-xs font-bold text-[#805062] p-4 pl-5">ID Transaksi</th>
                  <th className="text-xs font-bold text-[#805062] p-4">Tanggal</th>
                  <th className="text-xs font-bold text-[#805062] p-4 text-right">Total</th>
                  <th className="text-xs font-bold text-[#805062] p-4">Metode Bayar</th>
                  <th className="text-xs font-bold text-[#805062] p-4">Kasir</th>
                  <th className="text-xs font-bold text-[#805062] p-4 text-center w-16">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EEEEEE] text-sm">
                {paginatedTransactions.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-12 text-gray-400">
                      Tidak ada transaksi ditemukan
                    </td>
                  </tr>
                ) : (
                  paginatedTransactions.map((trx) => {
                    const isSelected = activeTrx?.id === trx.id;
                    return (
                      <tr
                        key={trx.id}
                        id={`row-trx-${trx.id}`}
                        onClick={() => onSelectTransaction(trx)}
                        className={`transition-colors cursor-pointer group ${
                          isSelected
                            ? 'bg-[#fec1d6]/15 font-semibold text-[#1b1c1c]'
                            : 'hover:bg-[#F5F3F3]/60 text-[#4c4546]'
                        }`}
                      >
                        <td className="p-4 pl-5 font-bold text-[#1b1c1c] group-hover:text-[#805062] transition-colors">
                          {trx.id}
                        </td>
                        <td className="p-4 text-xs text-[#7e7576]">
                          {trx.date}, {trx.time}
                        </td>
                        <td className="p-4 text-right font-bold text-[#1b1c1c]">
                          {formatIDR(trx.total)}
                        </td>
                        <td className="p-4">{getPaymentBadge(trx.paymentMethod)}</td>
                        <td className="p-4 text-xs font-medium text-[#4c4546]">{trx.cashierName}</td>
                        <td className="p-4 text-center">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectTransaction(trx);
                            }}
                            className={`p-1.5 rounded-full transition-colors ${
                              isSelected
                                ? 'text-[#805062] bg-[#fec1d6]/30'
                                : 'text-gray-400 group-hover:text-[#805062] group-hover:bg-[#F5F3F3]'
                            }`}
                          >
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          <div className="p-4 border-t border-[#EEEEEE] flex justify-between items-center bg-[#FBF9F8]/60 text-xs text-[#7e7576]">
            <span>
              Menampilkan {paginatedTransactions.length} dari {filteredTransactions.length} transaksi
            </span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage <= 1}
                className="p-1.5 border border-[#cfc4c5] rounded-md hover:bg-white disabled:opacity-40"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-7 h-7 flex items-center justify-center rounded-md font-semibold text-xs transition-colors ${
                    currentPage === page
                      ? 'border border-[#805062] bg-[#fec1d6]/25 text-[#805062]'
                      : 'border border-[#cfc4c5] text-[#4c4546] hover:bg-white'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage >= totalPages}
                className="p-1.5 border border-[#cfc4c5] rounded-md hover:bg-white disabled:opacity-40"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Transaction Detail Panel */}
        {activeTrx && (
          <div
            id="transaction-detail-panel"
            className="lg:col-span-4 bg-white rounded-2xl border border-[#EEEEEE] shadow-[0px_12px_24px_rgba(0,0,0,0.04)] flex flex-col relative overflow-hidden"
          >
            {/* Decorative Pink Top Accent */}
            <div className="h-2 w-full bg-[#F8BBD0]" />

            <div className="p-5 md:p-6 flex-1 flex flex-col justify-between">
              <div>
                {/* Header & Status */}
                <div className="flex justify-between items-start mb-5">
                  <div>
                    <h3 className="text-xl font-bold text-[#1b1c1c]">Detail Transaksi</h3>
                    <p className="text-xs text-[#7e7576] font-mono mt-0.5">{activeTrx.id}</p>
                  </div>
                  <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{activeTrx.status}</span>
                  </span>
                </div>

                {/* Metadata Info */}
                <div className="space-y-2.5 mb-5 text-xs text-[#4c4546]">
                  <div className="flex justify-between pb-2 border-b border-[#EEEEEE]">
                    <span className="text-[#7e7576]">Waktu</span>
                    <span className="font-semibold text-[#1b1c1c]">
                      {activeTrx.date}, {activeTrx.time}
                    </span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-[#EEEEEE]">
                    <span className="text-[#7e7576]">Kasir</span>
                    <span className="font-semibold text-[#1b1c1c]">{activeTrx.cashierName}</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-[#EEEEEE]">
                    <span className="text-[#7e7576]">Metode Bayar</span>
                    <span className="font-semibold text-[#1b1c1c] flex items-center gap-1">
                      {activeTrx.paymentMethod === 'QRIS' && <QrCode className="w-3.5 h-3.5 text-[#805062]" />}
                      {activeTrx.paymentMethod === 'Tunai' && <Coins className="w-3.5 h-3.5 text-[#805062]" />}
                      {activeTrx.paymentMethod === 'Kartu Debit' && <CreditCard className="w-3.5 h-3.5 text-[#805062]" />}
                      {activeTrx.paymentMethod}
                    </span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-[#EEEEEE]">
                    <span className="text-[#7e7576]">Pelanggan</span>
                    <span className="font-semibold text-[#1b1c1c]">{activeTrx.customerName}</span>
                  </div>
                </div>

                {/* Purchased Items List */}
                <h4 className="text-xs font-bold text-[#1b1c1c] uppercase tracking-wider mb-3">
                  Item Pembelian
                </h4>
                <div className="space-y-3 mb-5 max-h-56 overflow-y-auto noscrollbar pr-1">
                  {activeTrx.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-start gap-2 text-xs">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-[#F5F3F3] flex items-center justify-center shrink-0 border border-[#EEEEEE]">
                          {getItemIcon(item.product.name)}
                        </div>
                        <div>
                          <p className="font-semibold text-[#1b1c1c] line-clamp-1">{item.product.name}</p>
                          <p className="text-[11px] text-[#7e7576]">
                            {item.quantity} x {formatIDR(item.price)}
                          </p>
                        </div>
                      </div>
                      <span className="font-bold text-[#1b1c1c] shrink-0">
                        {formatIDR(item.quantity * item.price)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Calculation breakdown */}
                <div className="border-t-2 border-dashed border-[#cfc4c5] pt-3 space-y-1.5 text-xs">
                  <div className="flex justify-between text-[#7e7576]">
                    <span>Subtotal</span>
                    <span className="font-medium text-[#1b1c1c]">{formatIDR(activeTrx.subtotal)}</span>
                  </div>
                  {activeTrx.tax > 0 && (
                    <div className="flex justify-between text-[#7e7576]">
                      <span>Pajak (PB1 10%)</span>
                      <span className="font-medium text-[#1b1c1c]">{formatIDR(activeTrx.tax)}</span>
                    </div>
                  )}
                  {activeTrx.discount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-medium">
                      <span>Diskon</span>
                      <span>- {formatIDR(activeTrx.discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-base font-bold text-[#1b1c1c] pt-2 border-t border-[#EEEEEE]">
                    <span>Total</span>
                    <span>{formatIDR(activeTrx.total)}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-5 border-t border-[#EEEEEE] mt-5">
                <button
                  id="btn-share-transaction"
                  onClick={() => setShowShareModal(true)}
                  className="py-2.5 px-3 border border-[#cfc4c5] rounded-xl text-xs font-bold text-[#1b1c1c] hover:bg-[#F5F3F3] transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
                >
                  <Share2 className="w-4 h-4 text-[#805062]" />
                  <span>Bagikan</span>
                </button>
                <button
                  id="btn-print-receipt"
                  onClick={() => onPrintReceipt(activeTrx)}
                  className="py-2.5 px-3 bg-[#F8BBD0] hover:bg-[#f4a7c0] text-[#25181e] rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <Printer className="w-4 h-4" />
                  <span>Cetak Struk</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Share Modal */}
      {showShareModal && activeTrx && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-[#EEEEEE]">
            <div className="flex justify-between items-center pb-3 mb-3 border-b border-gray-100">
              <h3 className="font-bold text-sm text-[#1b1c1c]">Bagikan Bukti Pembayaran</h3>
              <button
                onClick={() => setShowShareModal(false)}
                className="p-1 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-gray-600 mb-4">
              Salin ringkasan transaksi {activeTrx.id} untuk dikirim via WhatsApp atau email:
            </p>
            <div className="p-3 bg-[#FBF9F8] border border-gray-200 rounded-xl text-xs font-mono text-gray-700 mb-4 space-y-1">
              <p>🧾 *KASIRKU POS - BUKTI PEMBAYARAN*</p>
              <p>No: {activeTrx.id}</p>
              <p>Tanggal: {activeTrx.date}, {activeTrx.time}</p>
              <p>Total: {formatIDR(activeTrx.total)} ({activeTrx.paymentMethod})</p>
              <p>Status: Sukses ✅</p>
            </div>
            <button
              onClick={handleCopyLink}
              className="w-full py-2.5 bg-[#000000] text-white rounded-xl text-xs font-bold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Tersalin ke Clipboard!' : 'Salin Teks Transaksi'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
