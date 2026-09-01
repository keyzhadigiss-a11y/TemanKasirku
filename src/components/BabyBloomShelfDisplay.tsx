import React, { useState } from 'react';
import { 
  Sparkles, 
  Star, 
  ShoppingBag, 
  Eye, 
  Package, 
  ChevronRight,
  Info
} from 'lucide-react';
import { Product } from '../types';
import { formatIDR } from '../data/mockData';

interface BabyBloomShelfDisplayProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const BabyBloomShelfDisplay: React.FC<BabyBloomShelfDisplayProps> = ({
  products,
  onSelectProduct,
  onAddToCart
}) => {
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');

  // Categorize products according to the official Baby Bloom Shelf structure
  const bestSellers = products.filter((p) => p.isBestSeller);
  const lipProducts = products.filter((p) => p.category.includes('Bibir') || p.category.includes('Lip'));
  const facialWash = products.filter((p) => p.category.includes('Pembersih') || p.category.includes('Wash'));
  const moisturizers = products.filter((p) => p.category.includes('Pelembap') || p.category.includes('Moist'));
  const serums = products.filter((p) => p.category.includes('Serum Wajah') || (p.category.includes('Serum') && !p.category.includes('Tubuh')));
  const sunscreens = products.filter((p) => p.category.includes('Tabir Surya') || p.category.includes('Sun'));
  const faceMasks = products.filter((p) => p.category.includes('Masker') || p.category.includes('Mask'));
  const bodyCare = products.filter((p) => p.category.includes('Perawatan Tubuh') || p.category.includes('Tubuh') || p.category.includes('Body'));
  const bundleSets = products.filter((p) => p.category.includes('Paket') || p.isBundle);

  return (
    <div className="space-y-6">
      {/* Shelf Header Banner */}
      <div className="relative overflow-hidden rounded-3xl p-6 bg-gradient-to-r from-[#ffe4ec] via-[#fff0f4] to-[#fdeef3] border border-[#fbd0df] shadow-sm">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-black uppercase tracking-wider bg-[#805062] text-white px-2.5 py-0.5 rounded-full">
                👑 Baby Bloom Store Shelf
              </span>
              <span className="text-xs font-bold text-[#805062]">by Keyzha Founder</span>
            </div>
            <h2 className="text-2xl font-black text-[#1b1c1c] tracking-tight">
              Rak Display Skincare & Lip Care Lengkap ✨
            </h2>
            <p className="text-xs sm:text-sm text-[#5d5457] mt-1 max-w-2xl">
              Susunan visual resmi 43 varian produk Baby Bloom: Best Seller, 10 Shade Berry Milk Dewy Tint, Serum Glass Skin, hingga Paket Hemat Bundling.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <div className="bg-white/80 backdrop-blur-md px-4 py-2 rounded-2xl border border-[#eedfe4] text-center shadow-xs">
              <span className="text-xs text-gray-500 font-medium block">Total Varian</span>
              <span className="text-lg font-black text-[#805062]">{products.length} Produk</span>
            </div>
          </div>
        </div>
      </div>

      {/* Top Floating Shelf: ⭐ BEST SELLER PODIUM ⭐ */}
      <div className="bg-[#FFF9FA] border-2 border-[#fcd2e1] rounded-3xl p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-gradient-to-r from-amber-400 to-rose-400 text-white rounded-xl shadow-xs">
              <Star className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h3 className="text-base font-black text-[#1b1c1c] uppercase tracking-wide flex items-center gap-2">
                BEST SELLER (Produk Paling Favorit)
                <span className="text-[10px] bg-[#ffd9e4] text-[#805062] px-2 py-0.5 rounded-full font-bold">
                  Top 4 Flagship
                </span>
              </h3>
              <p className="text-xs text-gray-500">Produk viral dengan penjualan dan ulasan bintang lima tertinggi</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {bestSellers.slice(0, 4).map((prod) => (
            <div
              key={prod.id}
              onClick={() => onSelectProduct(prod)}
              className="bg-white rounded-2xl border-2 border-[#fcd2e1] hover:border-[#805062] p-3.5 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between relative overflow-hidden"
            >
              <div className="absolute top-3 left-3 z-10 bg-gradient-to-r from-amber-400 to-rose-500 text-white text-[9px] font-black px-2 py-0.5 rounded-md shadow-xs flex items-center gap-1">
                <Star className="w-2.5 h-2.5 fill-current" />
                BEST SELLER
              </div>

              <div className="aspect-square rounded-xl overflow-hidden bg-[#FAF3F6] border border-[#f0e4e8] mb-2.5 relative">
                <img
                  src={prod.image}
                  alt={prod.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                {prod.shadeColor && (
                  <span 
                    className="absolute bottom-2 left-2 w-3.5 h-3.5 rounded-full border-2 border-white shadow-xs"
                    style={{ backgroundColor: prod.shadeColor }}
                    title={prod.shadeName || prod.shadeColor}
                  />
                )}
              </div>

              <div>
                <span className="text-[10px] font-bold text-[#805062] bg-[#ffd9e4] px-2 py-0.5 rounded">
                  {prod.category}
                </span>
                <h4 className="font-bold text-xs sm:text-sm text-[#1b1c1c] mt-1 line-clamp-2 group-hover:text-[#805062] transition-colors leading-snug">
                  {prod.name}
                </h4>
                <p className="text-[11px] text-gray-500 line-clamp-1 mt-0.5">{prod.description}</p>
              </div>

              <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-100">
                <span className="text-sm font-black text-[#805062]">{formatIDR(prod.price)}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddToCart(prod);
                  }}
                  className="p-1.5 bg-[#805062] hover:bg-[#6b3f50] text-white rounded-lg text-xs font-bold transition-all shadow-xs"
                  title="Tambah ke Kasir"
                >
                  <ShoppingBag className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Multi-Shelf Layout */}
      <div className="space-y-8 bg-[#FBF9F8] p-6 rounded-3xl border border-[#e8dfe3]">
        {/* SHELF SECTION 1: 💄 PRODUK BIBIR (10 SHADES TINT + 5 LIP CARE) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between pb-2 border-b-2 border-[#e6d0d8]">
            <div className="flex items-center gap-2">
              <span className="text-xl">💄</span>
              <h3 className="text-base font-black text-[#1b1c1c] uppercase tracking-wide">
                PRODUK BIBIR (LIP CARE & LIP COLOR - 10 SHADES)
              </h3>
            </div>
            <span className="text-xs font-semibold text-[#805062] bg-[#ffd9e4] px-2.5 py-1 rounded-full">
              {lipProducts.length} Varian
            </span>
          </div>

          {/* 10 Shade Swatches Bar */}
          <div className="p-3 bg-white rounded-2xl border border-[#eedfe4] space-y-2">
            <div className="text-xs font-bold text-[#805062] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              10 Pilihan Warna Unik Baby Bloom Berry Milk Dewy Tint:
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-5 md:grid-cols-10 gap-2">
              {lipProducts.filter(p => p.shadeColor).map((tint) => (
                <button
                  key={tint.id}
                  onClick={() => onSelectProduct(tint)}
                  className="p-2 rounded-xl border border-gray-100 hover:border-[#805062] bg-[#faf7f8] flex flex-col items-center gap-1 transition-all hover:scale-105 text-center group cursor-pointer"
                >
                  <div 
                    className="w-6 h-6 rounded-full border-2 border-white shadow-sm shrink-0 transition-transform group-hover:scale-110"
                    style={{ backgroundColor: tint.shadeColor }}
                  />
                  <span className="text-[9px] font-bold text-gray-800 line-clamp-1">
                    {tint.shadeName?.split(' ')[0] || tint.name.slice(0, 8)}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Lip Products Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 pt-2">
            {lipProducts.map((prod) => (
              <div
                key={prod.id}
                onClick={() => onSelectProduct(prod)}
                className="bg-white rounded-2xl border border-[#eee0e5] hover:border-[#805062] p-3 shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between relative"
              >
                <div className="aspect-square rounded-xl overflow-hidden bg-[#FAF3F6] border border-[#f0e4e8] mb-2 relative">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  {prod.shadeColor && (
                    <div 
                      className="absolute bottom-1.5 left-1.5 flex items-center gap-1 bg-white/90 backdrop-blur-xs px-1.5 py-0.5 rounded-full border border-white shadow-2xs"
                    >
                      <span 
                        className="w-2.5 h-2.5 rounded-full shrink-0" 
                        style={{ backgroundColor: prod.shadeColor }} 
                      />
                      <span className="text-[8px] font-bold text-gray-700">{prod.shadeName?.split(' ')[0]}</span>
                    </div>
                  )}
                </div>

                <div>
                  <h5 className="font-bold text-xs text-[#1b1c1c] line-clamp-2 group-hover:text-[#805062] transition-colors leading-snug">
                    {prod.name}
                  </h5>
                  <p className="text-[10px] text-gray-400 line-clamp-1 mt-0.5">{prod.description}</p>
                </div>

                <div className="flex items-center justify-between mt-2.5 pt-1.5 border-t border-gray-100">
                  <span className="text-xs font-black text-[#805062]">{formatIDR(prod.price)}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart(prod);
                    }}
                    className="p-1 bg-[#805062] hover:bg-[#6b3f50] text-white rounded-lg text-xs"
                    title="Beli"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SHELF SECTION 2: 🧼 PEMBERSIH WAJAH & 💦 PELEMBAP */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
          {/* Facial Wash */}
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-2 border-b-2 border-[#e6d0d8]">
              <div className="flex items-center gap-2">
                <span className="text-xl">🧼</span>
                <h3 className="text-sm font-black text-[#1b1c1c] uppercase tracking-wide">
                  PEMBERSIH WAJAH (FACIAL WASH)
                </h3>
              </div>
              <span className="text-xs font-semibold text-gray-500">{facialWash.length} Produk</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {facialWash.map((prod) => (
                <div
                  key={prod.id}
                  onClick={() => onSelectProduct(prod)}
                  className="bg-white rounded-2xl border border-[#eee0e5] hover:border-[#805062] p-2.5 shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div className="aspect-square rounded-xl overflow-hidden bg-[#FAF3F6] border border-[#f0e4e8] mb-1.5">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <h5 className="font-bold text-xs text-[#1b1c1c] line-clamp-2 group-hover:text-[#805062] leading-snug">
                    {prod.name}
                  </h5>
                  <div className="flex items-center justify-between mt-2 pt-1 border-t border-gray-100">
                    <span className="text-xs font-bold text-[#805062]">{formatIDR(prod.price)}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(prod);
                      }}
                      className="p-1 bg-[#805062] text-white rounded-md"
                    >
                      <ShoppingBag className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Moisturizers */}
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-2 border-b-2 border-[#e6d0d8]">
              <div className="flex items-center gap-2">
                <span className="text-xl">💦</span>
                <h3 className="text-sm font-black text-[#1b1c1c] uppercase tracking-wide">
                  PELEMBAP (MOISTURIZER)
                </h3>
              </div>
              <span className="text-xs font-semibold text-gray-500">{moisturizers.length} Produk</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {moisturizers.map((prod) => (
                <div
                  key={prod.id}
                  onClick={() => onSelectProduct(prod)}
                  className="bg-white rounded-2xl border border-[#eee0e5] hover:border-[#805062] p-2.5 shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div className="aspect-square rounded-xl overflow-hidden bg-[#FAF3F6] border border-[#f0e4e8] mb-1.5">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <h5 className="font-bold text-xs text-[#1b1c1c] line-clamp-2 group-hover:text-[#805062] leading-snug">
                    {prod.name}
                  </h5>
                  <div className="flex items-center justify-between mt-2 pt-1 border-t border-gray-100">
                    <span className="text-xs font-bold text-[#805062]">{formatIDR(prod.price)}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(prod);
                      }}
                      className="p-1 bg-[#805062] text-white rounded-md"
                    >
                      <ShoppingBag className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SHELF SECTION 3: ✨ SERUM WAJAH & ☀️ TABIR SURYA */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
          {/* Serums */}
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-2 border-b-2 border-[#e6d0d8]">
              <div className="flex items-center gap-2">
                <span className="text-xl">✨</span>
                <h3 className="text-sm font-black text-[#1b1c1c] uppercase tracking-wide">
                  SERUM WAJAH (FACIAL SERUM)
                </h3>
              </div>
              <span className="text-xs font-semibold text-gray-500">{serums.length} Produk</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {serums.map((prod) => (
                <div
                  key={prod.id}
                  onClick={() => onSelectProduct(prod)}
                  className="bg-white rounded-2xl border border-[#eee0e5] hover:border-[#805062] p-2.5 shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div className="aspect-square rounded-xl overflow-hidden bg-[#FAF3F6] border border-[#f0e4e8] mb-1.5">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <h5 className="font-bold text-xs text-[#1b1c1c] line-clamp-2 group-hover:text-[#805062] leading-snug">
                    {prod.name}
                  </h5>
                  <div className="flex items-center justify-between mt-2 pt-1 border-t border-gray-100">
                    <span className="text-xs font-bold text-[#805062]">{formatIDR(prod.price)}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(prod);
                      }}
                      className="p-1 bg-[#805062] text-white rounded-md"
                    >
                      <ShoppingBag className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sunscreens */}
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-2 border-b-2 border-[#e6d0d8]">
              <div className="flex items-center gap-2">
                <span className="text-xl">☀️</span>
                <h3 className="text-sm font-black text-[#1b1c1c] uppercase tracking-wide">
                  TABIR SURYA (SUNSCREEN)
                </h3>
              </div>
              <span className="text-xs font-semibold text-gray-500">{sunscreens.length} Produk</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {sunscreens.map((prod) => (
                <div
                  key={prod.id}
                  onClick={() => onSelectProduct(prod)}
                  className="bg-white rounded-2xl border border-[#eee0e5] hover:border-[#805062] p-2.5 shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div className="aspect-square rounded-xl overflow-hidden bg-[#FAF3F6] border border-[#f0e4e8] mb-1.5">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <h5 className="font-bold text-xs text-[#1b1c1c] line-clamp-2 group-hover:text-[#805062] leading-snug">
                    {prod.name}
                  </h5>
                  <div className="flex items-center justify-between mt-2 pt-1 border-t border-gray-100">
                    <span className="text-xs font-bold text-[#805062]">{formatIDR(prod.price)}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(prod);
                      }}
                      className="p-1 bg-[#805062] text-white rounded-md"
                    >
                      <ShoppingBag className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SHELF SECTION 4: 🎭 MASKER WAJAH & 🧴 PERAWATAN TUBUH */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
          {/* Face Mask */}
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-2 border-b-2 border-[#e6d0d8]">
              <div className="flex items-center gap-2">
                <span className="text-xl">🎭</span>
                <h3 className="text-sm font-black text-[#1b1c1c] uppercase tracking-wide">
                  MASKER WAJAH (FACE MASK)
                </h3>
              </div>
              <span className="text-xs font-semibold text-gray-500">{faceMasks.length} Produk</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {faceMasks.map((prod) => (
                <div
                  key={prod.id}
                  onClick={() => onSelectProduct(prod)}
                  className="bg-white rounded-2xl border border-[#eee0e5] hover:border-[#805062] p-2.5 shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div className="aspect-square rounded-xl overflow-hidden bg-[#FAF3F6] border border-[#f0e4e8] mb-1.5">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <h5 className="font-bold text-xs text-[#1b1c1c] line-clamp-2 group-hover:text-[#805062] leading-snug">
                    {prod.name}
                  </h5>
                  <div className="flex items-center justify-between mt-2 pt-1 border-t border-gray-100">
                    <span className="text-xs font-bold text-[#805062]">{formatIDR(prod.price)}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(prod);
                      }}
                      className="p-1 bg-[#805062] text-white rounded-md"
                    >
                      <ShoppingBag className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Body Care */}
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-2 border-b-2 border-[#e6d0d8]">
              <div className="flex items-center gap-2">
                <span className="text-xl">🧴</span>
                <h3 className="text-sm font-black text-[#1b1c1c] uppercase tracking-wide">
                  PERAWATAN TUBUH (BODY SERUM & HAND CREAM)
                </h3>
              </div>
              <span className="text-xs font-semibold text-gray-500">{bodyCare.length} Produk</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {bodyCare.map((prod) => (
                <div
                  key={prod.id}
                  onClick={() => onSelectProduct(prod)}
                  className="bg-white rounded-2xl border border-[#eee0e5] hover:border-[#805062] p-2.5 shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div className="aspect-square rounded-xl overflow-hidden bg-[#FAF3F6] border border-[#f0e4e8] mb-1.5">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <h5 className="font-bold text-xs text-[#1b1c1c] line-clamp-2 group-hover:text-[#805062] leading-snug">
                    {prod.name}
                  </h5>
                  <div className="flex items-center justify-between mt-2 pt-1 border-t border-gray-100">
                    <span className="text-xs font-bold text-[#805062]">{formatIDR(prod.price)}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(prod);
                      }}
                      className="p-1 bg-[#805062] text-white rounded-md"
                    >
                      <ShoppingBag className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SHELF SECTION 5: 🎁 PAKET HEMAT (BUNDLING SET) */}
        <div className="space-y-4 pt-4 border-t-2 border-[#e6d0d8]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🎁</span>
              <div>
                <h3 className="text-base font-black text-[#1b1c1c] uppercase tracking-wide">
                  PAKET HEMAT (BUNDLING SET RESMI)
                </h3>
                <p className="text-xs text-gray-500">Paket kombinasi komplit dengan potongan harga spesial</p>
              </div>
            </div>
            <span className="text-xs font-bold bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
              {bundleSets.length} Paket Pilihan
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {bundleSets.map((bundle) => (
              <div
                key={bundle.id}
                onClick={() => onSelectProduct(bundle)}
                className="bg-white rounded-3xl border-2 border-purple-200 hover:border-purple-600 p-4 shadow-sm hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between relative overflow-hidden"
              >
                <div className="absolute top-3 left-3 z-10 bg-purple-700 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-sm flex items-center gap-1">
                  <Package className="w-3 h-3" />
                  PAKET HEMAT
                </div>

                <div className="aspect-square rounded-2xl overflow-hidden bg-purple-50/50 border border-purple-100 mb-3">
                  <img
                    src={bundle.image}
                    alt={bundle.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="space-y-1.5">
                  <h4 className="font-black text-sm text-[#1b1c1c] group-hover:text-purple-700 transition-colors leading-snug">
                    {bundle.name}
                  </h4>
                  <p className="text-xs text-gray-500 line-clamp-2">{bundle.description}</p>

                  {bundle.bundleItems && (
                    <div className="pt-2 space-y-1">
                      {bundle.bundleItems.slice(0, 2).map((it, idx) => (
                        <div key={idx} className="text-[10px] text-gray-600 flex items-center gap-1 truncate font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0" />
                          <span className="truncate">{it}</span>
                        </div>
                      ))}
                      {bundle.bundleItems.length > 2 && (
                        <span className="text-[10px] text-purple-600 font-bold block">
                          +{bundle.bundleItems.length - 2} item lainnya...
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between mt-4 pt-2.5 border-t border-purple-100">
                  <div>
                    <span className="text-[10px] text-gray-400 block font-medium">Harga Bundling</span>
                    <span className="text-base font-black text-purple-700">{formatIDR(bundle.price)}</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart(bundle);
                    }}
                    className="px-3 py-1.5 bg-purple-700 hover:bg-purple-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    Beli Paket
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
