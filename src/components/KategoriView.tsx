import React, { useState } from 'react';
import { 
  Shapes, 
  Plus, 
  Sun, 
  Droplets, 
  Moon, 
  Heart, 
  Sparkles, 
  Edit2, 
  Trash2, 
  ShieldCheck,
  Package,
  Layers,
  Sparkle
} from 'lucide-react';
import { Product, NavigationTab } from '../types';

interface KategoriViewProps {
  products: Product[];
  setActiveTab: (tab: NavigationTab) => void;
}

export const KategoriView: React.FC<KategoriViewProps> = ({ products, setActiveTab }) => {
  const [categories, setCategories] = useState([
    { 
      id: 'cat-lip', 
      name: 'Produk Bibir', 
      desc: 'Lip Care (Butter, Scrub, Sleeping Mask, Lip Oil, Plumper) & 10 Pilihan Warna Baby Bloom Berry Milk Dewy Tint', 
      icon: <Heart className="w-5 h-5" />, 
      color: 'bg-rose-100 text-rose-900' 
    },
    { 
      id: 'cat-wash', 
      name: 'Pembersih Wajah', 
      desc: 'Fluffy Bubble Cleanser, Milk Mochi Jelly, Pink Clay Gentle Wash, Soothing Oat Cleansing Balm & Amino Acid Wash', 
      icon: <Droplets className="w-5 h-5" />, 
      color: 'bg-sky-100 text-sky-900' 
    },
    { 
      id: 'cat-moist', 
      name: 'Pelembap', 
      desc: 'Cloud Cushion Moist (Best Seller), Pink Watermelon Pudding Gel, Berry Barrier Cream & Hydro Pudding Cream', 
      icon: <Layers className="w-5 h-5" />, 
      color: 'bg-[#ffd9e4] text-[#330f1f]' 
    },
    { 
      id: 'cat-serum', 
      name: 'Serum Wajah', 
      desc: 'Glass Skin Glow Serum (Best Seller), Pink Collagen Drops, Calming Cica Milk, Gentle Retinol & Spot-Off Nectar', 
      icon: <Sparkles className="w-5 h-5" />, 
      color: 'bg-purple-100 text-purple-900' 
    },
    { 
      id: 'cat-sun', 
      name: 'Tabir Surya', 
      desc: 'Invisible Sun Milk SPF 50+ (Best Seller), Rosy Tone-Up Sun, Velvet Touch Sun Stick & Mild Physical Sun Cream', 
      icon: <Sun className="w-5 h-5" />, 
      color: 'bg-amber-100 text-amber-900' 
    },
    { 
      id: 'cat-mask', 
      name: 'Masker Wajah', 
      desc: 'Strawberry Milk Sheet Mask (Best Seller), Soft Sugar Whipped Clay, Rose Water Sleeping Mask & Bubble Reset Pack', 
      icon: <Moon className="w-5 h-5" />, 
      color: 'bg-pink-100 text-pink-900' 
    },
    { 
      id: 'cat-body', 
      name: 'Perawatan Tubuh', 
      desc: 'Velvet Body Milk Serum (Best Seller), Pink Peony Brightening Lotion, Silk Soft Hand Cream & Exfoliating Drops', 
      icon: <ShieldCheck className="w-5 h-5" />, 
      color: 'bg-emerald-100 text-emerald-800' 
    },
    { 
      id: 'cat-bundle', 
      name: 'Paket Hemat', 
      desc: 'Bundling Set Resmi: The Ultimate Glow Set, Pinky Lip Party Set, Sweet Dreams Sleep Kit & Baby Bloom Starter Kit', 
      icon: <Package className="w-5 h-5" />, 
      color: 'bg-indigo-100 text-indigo-900' 
    }
  ]);

  const [newCatName, setNewCatName] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const getProductCount = (categoryName: string) => {
    return products.filter(p => {
      const lower = p.category.toLowerCase();
      const target = categoryName.toLowerCase();
      if (target.includes('bibir')) return lower.includes('bibir') || lower.includes('lip');
      if (target.includes('pembersih')) return lower.includes('pembersih') || lower.includes('wash');
      if (target.includes('pelembap')) return lower.includes('pelembap') || lower.includes('moist');
      if (target.includes('serum')) return lower.includes('serum') && !lower.includes('tubuh');
      if (target.includes('tabir')) return lower.includes('tabir') || lower.includes('sun');
      if (target.includes('masker')) return lower.includes('masker') || lower.includes('mask');
      if (target.includes('tubuh')) return lower.includes('tubuh') || lower.includes('body');
      if (target.includes('paket')) return lower.includes('paket') || !!p.isBundle;
      return lower === target;
    }).length;
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
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold bg-[#ffd9e4] text-[#805062] px-2.5 py-0.5 rounded-full">
              Katalog Resmi Baby Bloom
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#1b1c1c]">
            Kategori Skincare & Beauty
          </h2>
          <p className="text-sm text-[#4c4546] mt-0.5">
            Pengelompokan 8 lini produk perawatan kulit, 10 shade dewy lip tint, dan paket bundling hemat.
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 bg-[#805062] hover:bg-[#6b3f50] text-white px-4 py-2.5 rounded-xl transition-all text-xs font-bold shadow-md shadow-[#805062]/20 cursor-pointer"
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
              placeholder="Contoh: Body Mist, Hair Care..."
              className="w-full px-3.5 py-2 border border-[#cfc4c5] rounded-xl text-sm focus:outline-none focus:border-[#805062]"
            />
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#805062] text-white text-xs font-bold rounded-xl hover:bg-[#6e4353] transition-colors cursor-pointer"
            >
              Simpan
            </button>
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2.5 bg-gray-100 text-gray-700 text-xs font-bold rounded-xl hover:bg-gray-200 transition-colors cursor-pointer"
            >
              Batal
            </button>
          </div>
        </form>
      )}

      {/* Grid of Categories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
                  <button className="p-1.5 text-gray-400 hover:text-gray-800 rounded-md hover:bg-gray-100 cursor-pointer">
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setCategories(categories.filter(c => c.id !== cat.id))}
                    className="p-1.5 text-red-400 hover:text-red-600 rounded-md hover:bg-red-50 cursor-pointer"
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
                <span className="font-bold text-[#805062] bg-[#ffd9e4]/40 px-2 py-0.5 rounded-full">
                  {count} Varian Produk
                </span>
                <button
                  onClick={() => setActiveTab('kasir')}
                  className="text-xs font-bold text-[#805062] hover:underline cursor-pointer flex items-center gap-1"
                >
                  Buka di Kasir &rarr;
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
