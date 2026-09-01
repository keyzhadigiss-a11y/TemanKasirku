import React, { useState } from 'react';
import { Settings, Store, Printer, Percent, ShieldCheck, Save, Check } from 'lucide-react';
import { ASSETS } from '../data/mockData';

export const PengaturanView: React.FC = () => {
  const [storeName, setStoreName] = useState('KASIRKU POS');
  const [storeAddress, setStoreAddress] = useState('Jl. Melati No. 45, Jakarta Selatan');
  const [storePhone, setStorePhone] = useState('(021) 789-0123');
  const [taxPercent, setTaxPercent] = useState(10);
  const [receiptFooter, setReceiptFooter] = useState('Terima Kasih Atas Kunjungan Anda!');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div id="pengaturan-view-content" className="space-y-6 pb-12 animate-in fade-in duration-200 max-w-4xl">
      {/* Header */}
      <div>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#1b1c1c]">
          Pengaturan Toko & POS
        </h2>
        <p className="text-sm text-[#4c4546] mt-0.5">
          Konfigurasi identitas toko, format pencetakan struk, dan perpajakan.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Store Profile Card */}
        <div className="bg-white p-6 rounded-2xl border border-[#EEEEEE] shadow-xs space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
            <div className="p-2.5 bg-[#fec1d6]/30 text-[#805062] rounded-xl">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-[#1b1c1c]">Profil Outlet / Toko</h3>
              <p className="text-xs text-gray-500">Informasi ini akan tercetak di header struk kasir.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Nama Usaha / Brand
              </label>
              <input
                type="text"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-[#cfc4c5] rounded-xl text-sm focus:outline-none focus:border-[#805062]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Nomor Telepon / WhatsApp
              </label>
              <input
                type="text"
                value={storePhone}
                onChange={(e) => setStorePhone(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-[#cfc4c5] rounded-xl text-sm focus:outline-none focus:border-[#805062]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
              Alamat Lengkap
            </label>
            <input
              type="text"
              value={storeAddress}
              onChange={(e) => setStoreAddress(e.target.value)}
              className="w-full px-3.5 py-2.5 border border-[#cfc4c5] rounded-xl text-sm focus:outline-none focus:border-[#805062]"
            />
          </div>
        </div>

        {/* Receipt & Thermal Printer Settings */}
        <div className="bg-white p-6 rounded-2xl border border-[#EEEEEE] shadow-xs space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
            <div className="p-2.5 bg-[#fec1d6]/30 text-[#805062] rounded-xl">
              <Printer className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-[#1b1c1c]">Format Struk Thermal</h3>
              <p className="text-xs text-gray-500">Sesuaikan ukuran kertas (58mm / 80mm) dan teks penutup struk.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Ukuran Printer Thermal
              </label>
              <select className="w-full px-3.5 py-2.5 border border-[#cfc4c5] rounded-xl text-sm focus:outline-none focus:border-[#805062] bg-white">
                <option value="80">80mm (Standar POS Desktop)</option>
                <option value="58">58mm (Printer Bluetooth Mobile)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Pajak Resto (PB1 / PPN %)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={taxPercent}
                onChange={(e) => setTaxPercent(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 border border-[#cfc4c5] rounded-xl text-sm focus:outline-none focus:border-[#805062]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
              Pesan Footer Struk
            </label>
            <input
              type="text"
              value={receiptFooter}
              onChange={(e) => setReceiptFooter(e.target.value)}
              className="w-full px-3.5 py-2.5 border border-[#cfc4c5] rounded-xl text-sm focus:outline-none focus:border-[#805062]"
            />
          </div>
        </div>

        {/* Save button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 bg-[#000000] text-white rounded-xl text-sm font-bold hover:bg-[#1b1b1b] transition-all flex items-center gap-2 shadow-md shadow-black/10"
          >
            {saved ? <Check className="w-4 h-4 text-emerald-400" /> : <Save className="w-4 h-4" />}
            <span>{saved ? 'Pengaturan Tersimpan!' : 'Simpan Pengaturan'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
