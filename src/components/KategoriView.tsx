import React, { useState } from 'react';
import { Shapes, Plus, Coffee, Utensils, Cookie, GlassWater, Sparkles, Edit2, Trash2 } from 'lucide-react';
import { Product, NavigationTab } from '../types';

interface KategoriViewProps {
  products: Product[];
  setActiveTab: (tab: NavigationTab) => void;
}

export const KategoriView: React.FC<KategoriViewProps> = ({ products, setActiveTab }) => {
  const [categories, setCategories] = useState([
    { id: 'cat-1', name: 'Kopi', desc: 'Espresso, Americano, Latte, & Signature Brews', icon: <Coffee className="w-5 h-5" />, color: 'bg-[#ffd9e4] text-[#330f1f]' },
    { id: 'cat-2', name: 'Non-Kopi', desc: 'Matcha, Cokelat, Artisan Tea, & Susu', icon: <GlassWater className="w-5 h-5" />, color: 'bg-emerald-100 text-emerald-800' },
    { id: 'cat-3', name: 'Makanan', desc: 'Croissant, Pastry, Sandwich, & Cake', icon: <Utensils className="w-5 h-5" />, color: 'bg-amber-100 text-amber-900' },
    { id: 'cat-4', name: 'Snack', desc: 'Keripik, Gelato, Cookies, & Finger Food', icon: <Cookie className="w-5 h-5" />, color: 'bg-blue-100 text-blue-900' },
    { id: 'cat-5', name: 'Minuman', desc: 'Aneka minuman segar & es kopi susu', icon: <Sparkles className="w-5 h-5" />, color: 'bg-purple-100 text-purple-900' },
    { id: 'cat-6', name: 'Merchandise', desc: 'Mug keramik, Notebook, & Alat seduh', icon: <Shapes className="w-5 h-5" />, color: 'bg-rose-100 text-rose-900' }
  ]);

  const [newCatName, setNewCatName] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const getProductCount = (categoryName: string) => {
    return products.filter(p => p.category.toLowerCase() === categoryName.toLowerCase()).length;
  };

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;
    setCategories([
      ...categories,
      {
        id: `cat-${Date.now()}`,
        name: newCatName.trim(),
        desc: 'Kategori kustom baru',
        icon: <Shapes className="w-5 h-5" />,
        color: 'bg-gray-100 text-gray-800'
      }
    ]);
    setNewCatName('');
    setShowAddForm(false);
  };

  return (
    <div id="kategori-view-content" className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#1b1c1c]">
            Kategori Produk
          </h2>
          <p className="text-sm text-[#4c4546] mt-0.5">
            Kelola pengelompokan menu dan klasifikasi produk POS.
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 bg-[#000000] text-white px-4 py-2.5 rounded-xl hover:bg-[#1b1b1b] transition-all text-xs font-bold shadow-md shadow-black/10"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Kategori</span>
        </button>
      </div>

      {/* Add Category Form */}
      {showAddForm && (
        <form onSubmit={handleAddCategory} className="bg-white p-5 rounded-2xl border border-[#EEEEEE] flex flex-col sm:flex-row gap-3 items-end shadow-xs animate-in slide-in-from-top-2">
          <div className="flex-1 w-full">
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
              Nama Kategori Baru
            </label>
            <input
              type="text"
              required
              value={newCatName}
              onChange={(e) => setNewCatName(e.target.value)}
              placeholder="Contoh: Paket Bundling, Dessert..."
              className="w-full px-3.5 py-2 border border-[#cfc4c5] rounded-xl text-sm focus:outline-none focus:border-[#805062]"
            />
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#805062] text-white text-xs font-bold rounded-xl hover:bg-[#6e4353] transition-colors"
            >
              Simpan
            </button>
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2.5 bg-gray-100 text-gray-700 text-xs font-bold rounded-xl hover:bg-gray-200 transition-colors"
            >
              Batal
            </button>
          </div>
        </form>
      )}

      {/* Grid of Categories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => {
          const count = getProductCount(cat.name);
          return (
            <div
              key={cat.id}
              className="bg-white rounded-2xl border border-[#EEEEEE] p-5 shadow-xs flex flex-col justify-between hover:border-[#805062] hover:shadow-md transition-all group"
            >
              <div className="flex justify-between items-start mb-3">
                <div className={`p-3 rounded-xl ${cat.color} flex items-center justify-center`}>
                  {cat.icon}
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-1.5 text-gray-400 hover:text-gray-800 rounded-md hover:bg-gray-100">
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setCategories(categories.filter(c => c.id !== cat.id))}
                    className="p-1.5 text-red-400 hover:text-red-600 rounded-md hover:bg-red-50"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-base text-[#1b1c1c] mb-1">{cat.name}</h3>
                <p className="text-xs text-[#7e7576] line-clamp-2 mb-4">{cat.desc}</p>
              </div>

              <div className="pt-3 border-t border-gray-100 flex justify-between items-center text-xs">
                <span className="font-semibold text-gray-500">{count} Produk Aktif</span>
                <button
                  onClick={() => setActiveTab('produk')}
                  className="text-xs font-bold text-[#805062] hover:underline"
                >
                  Lihat Produk &rarr;
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
