import React, { useState } from 'react';
import { Boxes, AlertTriangle, CheckCircle, RefreshCw, Search, Plus, ArrowUpRight } from 'lucide-react';
import { Product } from '../types';
import { formatIDR } from '../data/mockData';

interface StokViewProps {
  products: Product[];
  onUpdateStock: (productId: string, newStock: number) => void;
}

export const StokView: React.FC<StokViewProps> = ({ products, onUpdateStock }) => {
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'low' | 'out'>('all');

  const lowStockThreshold = 5;

  const filtered = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase());
    if (filterType === 'out') return matchSearch && p.stock <= 0;
    if (filterType === 'low') return matchSearch && p.stock > 0 && p.stock <= lowStockThreshold;
    return matchSearch;
  });

  const lowStockCount = products.filter(p => p.stock > 0 && p.stock <= lowStockThreshold).length;
  const outOfStockCount = products.filter(p => p.stock <= 0).length;

  const handleRestockQuick = (productId: string, currentStock: number) => {
    const added = prompt('Masukkan jumlah stok yang ingin ditambahkan:', '20');
    if (added && !isNaN(Number(added))) {
      onUpdateStock(productId, currentStock + Number(added));
    }
  };

  return (
    <div id="stok-view-content" className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#1b1c1c]">
            Inventori & Stok
          </h2>
          <p className="text-sm text-[#4c4546] mt-0.5">
            Pantau stok barang masuk, peringatan menipis, dan riwayat sisa stok.
          </p>
        </div>
      </div>

      {/* Alert Banner if items are low */}
      {(lowStockCount > 0 || outOfStockCount > 0) && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-red-900 shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-red-100 rounded-xl shrink-0 text-red-600">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm">Peringatan Kebutuhan Restock!</h4>
              <p className="text-xs text-red-700 mt-0.5">
                Ada {lowStockCount} produk stok menipis dan {outOfStockCount} produk habis (Out of Stock).
              </p>
            </div>
          </div>
          <button
            onClick={() => setFilterType('low')}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-colors whitespace-nowrap shadow-xs"
          >
            Lihat Produk Menipis
          </button>
        </div>
      )}

      {/* Filter Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 justify-between items-stretch sm:items-center">
        <div className="flex gap-2">
          <button
            onClick={() => setFilterType('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              filterType === 'all'
                ? 'bg-[#1b1c1c] text-white shadow-xs'
                : 'bg-white text-gray-700 border border-[#EEEEEE] hover:bg-gray-50'
            }`}
          >
            Semua ({products.length})
          </button>
          <button
            onClick={() => setFilterType('low')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              filterType === 'low'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-white text-amber-700 border border-amber-200 hover:bg-amber-50'
            }`}
          >
            Menipis ({lowStockCount})
          </button>
          <button
            onClick={() => setFilterType('out')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              filterType === 'out'
                ? 'bg-red-600 text-white shadow-xs'
                : 'bg-white text-red-700 border border-red-200 hover:bg-red-50'
            }`}
          >
            Habis ({outOfStockCount})
          </button>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari SKU atau nama barang..."
            className="w-full pl-10 pr-4 py-2 bg-white border border-[#cfc4c5] rounded-xl text-xs focus:outline-none focus:border-[#805062]"
          />
        </div>
      </div>

      {/* Stock Table */}
      <div className="bg-white rounded-2xl border border-[#EEEEEE] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#FBF9F8] border-b border-[#EEEEEE] text-[#7e7576] font-bold">
                <th className="py-3.5 px-5">Produk</th>
                <th className="py-3.5 px-5">Kategori</th>
                <th className="py-3.5 px-5">Harga Satuan</th>
                <th className="py-3.5 px-5 text-center">Sisa Stok</th>
                <th className="py-3.5 px-5 text-center">Status</th>
                <th className="py-3.5 px-5 text-center w-28">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EEEEEE]">
              {filtered.map((item) => {
                const isOut = item.stock <= 0;
                const isLow = item.stock > 0 && item.stock <= lowStockThreshold;
                return (
                  <tr key={item.id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="py-3.5 px-5">
                      <div className="font-bold text-gray-900">{item.name}</div>
                      <div className="text-[10px] text-gray-400 font-mono">SKU: {item.sku}</div>
                    </td>
                    <td className="py-3.5 px-5 text-gray-600 font-medium">{item.category}</td>
                    <td className="py-3.5 px-5 font-bold text-gray-900">{formatIDR(item.price)}</td>
                    <td className="py-3.5 px-5 text-center font-bold text-sm">
                      <span className={isOut ? 'text-red-600' : isLow ? 'text-amber-600' : 'text-gray-900'}>
                        {item.stock}
                      </span>
                    </td>
                    <td className="py-3.5 px-5 text-center">
                      {isOut ? (
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-red-100 text-red-700">
                          Habis
                        </span>
                      ) : isLow ? (
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-700">
                          Menipis (&le; 5)
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700">
                          Aman
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-5 text-center">
                      <button
                        onClick={() => handleRestockQuick(item.id, item.stock)}
                        className="px-3 py-1.5 bg-[#fec1d6]/30 text-[#805062] hover:bg-[#fec1d6]/50 rounded-lg text-xs font-bold transition-colors inline-flex items-center gap-1"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Restock</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
