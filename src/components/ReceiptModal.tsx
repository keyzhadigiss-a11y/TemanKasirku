import React from 'react';
import { X, Printer, Download, CheckCircle2 } from 'lucide-react';
import { Transaction } from '../types';
import { ASSETS, formatIDR } from '../data/mockData';

interface ReceiptModalProps {
  transaction: Transaction | null;
  onClose: () => void;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({
  transaction,
  onClose
}) => {
  if (!transaction) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      id="receipt-modal-backdrop"
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-150"
    >
      <div className="bg-white rounded-2xl max-w-sm w-full shadow-2xl border border-[#EEEEEE] overflow-hidden animate-in zoom-in-95 duration-150 my-8">
        {/* Modal Top Controls (Not printed) */}
        <div className="flex justify-between items-center px-5 py-3 bg-[#FBF9F8] border-b border-[#EEEEEE] print:hidden">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span className="font-bold text-xs text-[#1b1c1c]">Struk Pembayaran</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Printable Thermal Receipt Area */}
        <div
          id="printable-receipt"
          className="p-6 font-mono text-xs text-[#1b1c1c] bg-white leading-relaxed select-text"
        >
          {/* Header */}
          <div className="text-center pb-4 border-b border-dashed border-gray-400">
            <div className="w-12 h-12 mx-auto mb-2 overflow-hidden rounded-lg">
              <img
                src={ASSETS.logo}
                alt="Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <h2 className="font-bold text-base tracking-wider text-black">KASIRKU POS</h2>
            <p className="text-[10px] text-gray-600">Jl. Melati No. 45, Jakarta Selatan</p>
            <p className="text-[10px] text-gray-600">Telp: (021) 789-0123</p>
          </div>

          {/* Transaction Metadata */}
          <div className="py-3 border-b border-dashed border-gray-400 space-y-1 text-[11px]">
            <div className="flex justify-between">
              <span>No. Transaksi</span>
              <span className="font-bold">{transaction.id}</span>
            </div>
            <div className="flex justify-between">
              <span>Waktu</span>
              <span>{transaction.date} {transaction.time}</span>
            </div>
            <div className="flex justify-between">
              <span>Kasir</span>
              <span>{transaction.cashierName}</span>
            </div>
            <div className="flex justify-between">
              <span>Pelanggan</span>
              <span>{transaction.customerName}</span>
            </div>
          </div>

          {/* Items */}
          <div className="py-3 border-b border-dashed border-gray-400 space-y-2">
            {transaction.items.map((item, idx) => (
              <div key={idx} className="space-y-0.5">
                <div className="flex justify-between font-bold text-[11px]">
                  <span>{item.product.name}</span>
                  <span>{formatIDR(item.price * item.quantity)}</span>
                </div>
                <div className="text-[10px] text-gray-600 flex justify-between">
                  <span>{item.quantity} x {formatIDR(item.price)}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="py-3 border-b border-dashed border-gray-400 space-y-1 text-[11px]">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatIDR(transaction.subtotal)}</span>
            </div>
            {transaction.tax > 0 && (
              <div className="flex justify-between">
                <span>PB1 (10%)</span>
                <span>{formatIDR(transaction.tax)}</span>
              </div>
            )}
            {transaction.discount > 0 && (
              <div className="flex justify-between text-emerald-700">
                <span>Diskon</span>
                <span>-{formatIDR(transaction.discount)}</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-sm pt-1 border-t border-gray-200">
              <span>TOTAL</span>
              <span>{formatIDR(transaction.total)}</span>
            </div>
            <div className="flex justify-between text-[11px] pt-1">
              <span>Bayar ({transaction.paymentMethod})</span>
              <span>{formatIDR(transaction.amountPaid || transaction.total)}</span>
            </div>
            {transaction.paymentMethod === 'Tunai' && (
              <div className="flex justify-between font-bold text-[11px]">
                <span>Kembalian</span>
                <span>{formatIDR(transaction.change || 0)}</span>
              </div>
            )}
          </div>

          {/* Footer & QR */}
          <div className="text-center pt-4 text-[10px] text-gray-600 space-y-1">
            <p className="font-bold text-black">Terima Kasih Atas Kunjungan Anda!</p>
            <p>Barang yang sudah dibeli tidak dapat ditukar/dikembalikan.</p>
            <p className="pt-2 text-[9px] text-gray-400">Powered by KASIRKU &bull; POS System</p>
          </div>
        </div>

        {/* Modal Action Buttons (Not printed) */}
        <div className="p-4 bg-[#FBF9F8] border-t border-[#EEEEEE] grid grid-cols-2 gap-3 print:hidden">
          <button
            id="btn-modal-print-action"
            onClick={handlePrint}
            className="py-2.5 px-4 bg-[#F8BBD0] hover:bg-[#f4a7c0] text-[#25181e] rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow-xs"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak Thermal</span>
          </button>
          <button
            onClick={onClose}
            className="py-2.5 px-4 bg-[#000000] text-white hover:bg-gray-800 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
          >
            <span>Tutup</span>
          </button>
        </div>
      </div>
    </div>
  );
};
