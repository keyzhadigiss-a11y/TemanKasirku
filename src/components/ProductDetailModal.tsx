import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  ShoppingBag, 
  Star, 
  ShieldCheck, 
  CheckCircle2, 
  Layers, 
  Plus, 
  Minus, 
  Package, 
  Heart,
  Droplets,
  HelpCircle,
  Clock
} from 'lucide-react';
import { Product } from '../types';
import { formatRupiah } from '../data/mockData';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart?: (product: Product, quantity: number) => void;
  cartQuantity?: number;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  cartQuantity = 0
}) => {
  const [selectedQty, setSelectedQty] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'info' | 'ingredients' | 'howTo'>('info');

  if (!isOpen || !product) return null;

  const handleAdd = () => {
    if (onAddToCart) {
      onAddToCart(product, selectedQty);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-[#eedfe4] animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#f3ebef] bg-gradient-to-r from-[#fff9fa] via-white to-[#fff5f8]">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#ffd9e4] text-[#805062] flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              {product.category}
            </span>
            {product.isBestSeller && (
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-400 to-rose-400 text-white shadow-sm flex items-center gap-1">
                ⭐ BEST SELLER
              </span>
            )}
            {product.isBundle && (
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-purple-600 text-white shadow-sm flex items-center gap-1">
                🎁 PAKET HEMAT
              </span>
            )}
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#f6f2f4] hover:bg-[#eedfe4] text-[#4c4546] flex items-center justify-center transition-colors"
            title="Tutup Detail"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 space-y-6 flex-1 custom-scrollbar">
          {/* Main Top Row: Image & Key Info */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* Image Preview with Aspect */}
            <div className="md:col-span-5 relative group">
              <div className="aspect-square rounded-2xl overflow-hidden bg-[#faf7f8] border border-[#f0e4e8] relative shadow-inner">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                {product.isBestSeller && (
                  <div className="absolute top-3 left-3 bg-[#e84a86] text-white text-[11px] font-bold px-2.5 py-1 rounded-lg shadow-md flex items-center gap-1">
                    <Heart className="w-3 h-3 fill-current" />
                    Viral Favorit
                  </div>
                )}
                {product.volume && (
                  <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-md text-white text-[11px] font-medium px-2 py-0.5 rounded-md">
                    {product.volume}
                  </div>
                )}
              </div>
            </div>

            {/* Product Meta & Price */}
            <div className="md:col-span-7 space-y-3">
              <div className="text-xs font-mono text-[#8c8285]">
                SKU: <span className="text-[#1b1c1c] font-semibold">{product.sku}</span>
              </div>

              <h2 className="text-xl font-bold text-[#1b1c1c] leading-snug">
                {product.name}
              </h2>

              {/* Rating & Stock */}
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <div className="flex items-center gap-1 text-amber-500 font-semibold bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>{product.rating || 4.9}</span>
                  <span className="text-xs text-[#8c8285] font-normal">
                    ({product.reviewCount || 350}+ ulasan)
                  </span>
                </div>

                {/* Shade Swatch Pill if available */}
                {product.shadeColor && (
                  <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white rounded-lg border border-gray-200 shadow-2xs">
                    <span 
                      className="w-3.5 h-3.5 rounded-full border border-black/10 shadow-xs shrink-0"
                      style={{ backgroundColor: product.shadeColor }}
                    />
                    <span className="text-xs font-bold text-gray-800">
                      {product.shadeName || 'Shade Warna'}
                    </span>
                  </div>
                )}

                <div className="flex items-center gap-1.5">
                  <span
                    className={`inline-block w-2.5 h-2.5 rounded-full ${
                      product.stock > 10
                        ? 'bg-emerald-500 ring-4 ring-emerald-100'
                        : product.stock > 0
                        ? 'bg-amber-500 ring-4 ring-amber-100'
                        : 'bg-red-500 ring-4 ring-red-100'
                    }`}
                  />
                  <span className="text-xs font-medium text-[#4c4546]">
                    Stok: <strong className="text-[#1b1c1c]">{product.stock} pcs</strong>
                    {product.stock <= 5 && product.stock > 0 && (
                      <span className="text-amber-600 font-semibold ml-1">(Hampir Habis)</span>
                    )}
                  </span>
                </div>
              </div>

              {/* Price Banner */}
              <div className="p-3.5 bg-gradient-to-r from-[#fff3f7] to-[#fbf0f4] rounded-2xl border border-[#fbd0df] flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#805062] font-medium block">Harga Resmi POS</span>
                  <span className="text-2xl font-black text-[#805062] tracking-tight">
                    {formatRupiah(product.price)}
                  </span>
                </div>
                {product.isBundle && (
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full border border-emerald-200">
                    Paket Hemat Diskon
                  </span>
                )}
              </div>

              {/* Short summary text */}
              <p className="text-sm text-[#5d5457] leading-relaxed">
                {product.description}
              </p>
            </div>
          </div>

          {/* Bundle Items Breakdown (If it's a Paketan) */}
          {product.bundleItems && product.bundleItems.length > 0 && (
            <div className="p-4 bg-gradient-to-br from-[#f8f5ff] to-[#fcfaff] rounded-2xl border border-[#e2d5fa] space-y-2.5">
              <div className="flex items-center gap-2 text-sm font-bold text-[#5c3799]">
                <Package className="w-4 h-4 text-[#7e4cd4]" />
                Isi Paket di Dalam Box:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {product.bundleItems.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2.5 bg-white rounded-xl border border-[#ede3fc] text-xs font-medium text-[#2d213f] shadow-sm">
                    <span className="w-5 h-5 rounded-full bg-[#f0e6ff] text-[#7e4cd4] font-bold flex items-center justify-center text-[10px] shrink-0">
                      {idx + 1}
                    </span>
                    <span className="truncate">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab Navigation for Detailed Explanation */}
          <div className="border-t border-[#f0e4e8] pt-4">
            <div className="flex items-center gap-2 border-b border-[#f0e4e8] pb-2">
              <button
                onClick={() => setActiveTab('info')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeTab === 'info'
                    ? 'bg-[#805062] text-white shadow-sm'
                    : 'text-[#5d5457] hover:bg-[#f6eff2]'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                Manfaat & Keunggulan
              </button>

              <button
                onClick={() => setActiveTab('ingredients')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeTab === 'ingredients'
                    ? 'bg-[#805062] text-white shadow-sm'
                    : 'text-[#5d5457] hover:bg-[#f6eff2]'
                }`}
              >
                <Droplets className="w-3.5 h-3.5" />
                Kandungan Aktif
              </button>

              <button
                onClick={() => setActiveTab('howTo')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeTab === 'howTo'
                    ? 'bg-[#805062] text-white shadow-sm'
                    : 'text-[#5d5457] hover:bg-[#f6eff2]'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                Cara Pakai
              </button>
            </div>

            {/* Tab Content */}
            <div className="pt-4">
              {activeTab === 'info' && (
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#805062]">
                    Kenapa Produk Ini Jadi Pilihan Utama:
                  </h4>
                  {product.benefits && product.benefits.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {product.benefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 p-3 bg-[#fff9fa] rounded-xl border border-[#fce7ef]">
                          <CheckCircle2 className="w-4 h-4 text-[#805062] shrink-0 mt-0.5" />
                          <span className="text-xs text-[#332b2e] leading-relaxed font-medium">
                            {benefit}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-3 bg-[#fff9fa] rounded-xl border border-[#fce7ef] text-xs text-[#4c4546]">
                      {product.description}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'ingredients' && (
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#805062]">
                    Key Ingredients & Active Formula:
                  </h4>
                  <div className="p-4 bg-[#f8fafc] rounded-2xl border border-[#e2e8f0] text-xs text-[#334155] leading-relaxed font-medium">
                    {product.keyIngredients || 'Formula teruji dermatologi, bebas paraben, bebas alkohol keras, dan ramah untuk kulit sensitif.'}
                  </div>
                  <div className="flex flex-wrap gap-2 pt-1">
                    <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-[11px] font-semibold rounded-lg border border-emerald-200">
                      ✓ BPOM Registered
                    </span>
                    <span className="px-2.5 py-1 bg-blue-50 text-blue-700 text-[11px] font-semibold rounded-lg border border-blue-200">
                      ✓ Dermatologically Tested
                    </span>
                    <span className="px-2.5 py-1 bg-rose-50 text-rose-700 text-[11px] font-semibold rounded-lg border border-rose-200">
                      ✓ Cruelty Free & Halal
                    </span>
                  </div>
                </div>
              )}

              {activeTab === 'howTo' && (
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#805062]">
                    Panduan Penggunaan Rutin:
                  </h4>
                  <div className="p-4 bg-[#fefce8] rounded-2xl border border-[#fef08a] text-xs text-[#713f12] leading-relaxed">
                    {product.howToUse || 'Aplikasikan secukupnya secara teratur pada kulit yang sudah dibersihkan untuk hasil optimal.'}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modal Footer / Quick Add-to-Cart */}
        <div className="p-4 px-6 border-t border-[#f0e4e8] bg-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
            <span className="text-xs font-semibold text-[#5d5457]">Jumlah:</span>
            <div className="flex items-center border border-[#d8c9cf] rounded-xl overflow-hidden bg-[#faf7f8]">
              <button
                type="button"
                onClick={() => setSelectedQty(Math.max(1, selectedQty - 1))}
                className="w-8 h-8 flex items-center justify-center hover:bg-[#eedfe4] text-[#4c4546] transition-colors"
                disabled={selectedQty <= 1}
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-10 text-center text-xs font-bold text-[#1b1c1c]">
                {selectedQty}
              </span>
              <button
                type="button"
                onClick={() => setSelectedQty(Math.min(product.stock, selectedQty + 1))}
                className="w-8 h-8 flex items-center justify-center hover:bg-[#eedfe4] text-[#4c4546] transition-colors"
                disabled={selectedQty >= product.stock}
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="text-right sm:text-left ml-2">
              <span className="text-[11px] text-[#8c8285] block">Total:</span>
              <span className="text-sm font-bold text-[#805062]">
                {formatRupiah(product.price * selectedQty)}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-initial px-4 py-2.5 border border-[#cfc4c5] hover:bg-[#f6eff2] text-[#4c4546] text-xs font-semibold rounded-xl transition-colors"
            >
              Tutup
            </button>
            {onAddToCart && (
              <button
                onClick={handleAdd}
                disabled={product.stock <= 0}
                className={`flex-1 sm:flex-initial px-6 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-md transition-all ${
                  product.stock > 0
                    ? 'bg-[#805062] hover:bg-[#6b3f50] text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                {product.stock > 0 ? '+ Tambah ke Keranjang' : 'Stok Habis'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
