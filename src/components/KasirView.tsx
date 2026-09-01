import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Trash2, 
  Plus, 
  Minus, 
  CreditCard, 
  Image as ImageIcon,
  CheckCircle2,
  Receipt,
  Info,
  Sparkles,
  Star,
  Heart,
  Package,
  Eye,
  Camera,
  ScanLine,
  LayoutGrid,
  Store
} from 'lucide-react';
import { Product, CartItem, PaymentMethod, Transaction } from '../types';
import { formatIDR } from '../data/mockData';
import { ProductDetailModal } from './ProductDetailModal';
import { BarcodeScannerModal } from './BarcodeScannerModal';
import { BabyBloomShelfDisplay } from './BabyBloomShelfDisplay';
import confetti from 'canvas-confetti';

interface KasirViewProps {
  products: Product[];
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  onCompleteSale: (transaction: Transaction) => void;
  onOpenReceipt: (transaction: Transaction) => void;
}

export const KasirView: React.FC<KasirViewProps> = ({
  products,
  cart,
  setCart,
  onCompleteSale,
  onOpenReceipt
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'shelf'>('grid');
  const [paymentAmount, setPaymentAmount] = useState<number>(100000);
  const [paymentAmountStr, setPaymentAmountStr] = useState<string>('100.000');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod>('Tunai');
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [customerName, setCustomerName] = useState<string>('Umum (Guest)');
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [lastTransaction, setLastTransaction] = useState<Transaction | null>(null);

  // Barcode Scanner Modal State
  const [isScannerOpen, setIsScannerOpen] = useState<boolean>(false);

  // Product Detail Modal state
  const [selectedDetailProduct, setSelectedDetailProduct] = useState<Product | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState<boolean>(false);

  const categories = [
    'Semua',
    '⭐ Best Seller',
    '💄 Produk Bibir (10 Shades)',
    '🧼 Pembersih Wajah',
    '💦 Pelembap',
    '✨ Serum Wajah',
    '☀️ Tabir Surya',
    '🎭 Masker Wajah',
    '🧴 Perawatan Tubuh',
    '🎁 Paket Hemat'
  ];

  // Filter products by category and search
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      let matchCategory = false;
      const lowerCat = p.category.toLowerCase();
      
      if (selectedCategory === 'Semua') {
        matchCategory = true;
      } else if (selectedCategory === '⭐ Best Seller') {
        matchCategory = !!p.isBestSeller;
      } else if (selectedCategory.includes('Bibir')) {
        matchCategory = lowerCat.includes('bibir') || lowerCat.includes('lip');
      } else if (selectedCategory.includes('Pembersih')) {
        matchCategory = lowerCat.includes('pembersih') || lowerCat.includes('wash');
      } else if (selectedCategory.includes('Pelembap')) {
        matchCategory = lowerCat.includes('pelembap') || lowerCat.includes('moist');
      } else if (selectedCategory.includes('Serum')) {
        matchCategory = lowerCat.includes('serum') && !lowerCat.includes('tubuh');
      } else if (selectedCategory.includes('Tabir')) {
        matchCategory = lowerCat.includes('tabir') || lowerCat.includes('sun');
      } else if (selectedCategory.includes('Masker')) {
        matchCategory = lowerCat.includes('masker') || lowerCat.includes('mask');
      } else if (selectedCategory.includes('Tubuh')) {
        matchCategory = lowerCat.includes('tubuh') || lowerCat.includes('body');
      } else if (selectedCategory.includes('Paket')) {
        matchCategory = lowerCat.includes('paket') || !!p.isBundle;
      } else {
        matchCategory = lowerCat === selectedCategory.toLowerCase();
      }

      const matchSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (p.keyIngredients && p.keyIngredients.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (p.shadeName && p.shadeName.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchCategory && matchSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  // Cart calculations
  const subtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }, [cart]);

  const discountAmount = useMemo(() => {
    return Math.round((subtotal * discountPercent) / 100);
  }, [subtotal, discountPercent]);

  const total = useMemo(() => {
    return Math.max(0, subtotal - discountAmount);
  }, [subtotal, discountAmount]);

  const changeAmount = useMemo(() => {
    return Math.max(0, paymentAmount - total);
  }, [paymentAmount, total]);

  // Cart operations
  const addToCart = (product: Product, quantity = 1) => {
    if (product.stock <= 0) return;
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        const newQty = Math.min(product.stock, existing.quantity + quantity);
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: newQty } : item
        );
      }
      return [...prev, { product, quantity: Math.min(product.stock, quantity) }];
    });
  };

  const handleOpenDetail = (product: Product, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSelectedDetailProduct(product);
    setIsDetailOpen(true);
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            if (newQty > item.product.stock) return item;
            return { ...item, quantity: newQty };
          }
          return item;
        })
        .filter((item) => item.quantity > 0);
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const handleQuickCash = (amount: 'exact' | 50000 | 100000 | 200000 | 'clear') => {
    if (amount === 'exact') {
      setPaymentAmount(total);
      setPaymentAmountStr(total.toLocaleString('id-ID'));
    } else if (amount === 'clear') {
      setPaymentAmount(0);
      setPaymentAmountStr('');
    } else {
      setPaymentAmount(amount);
      setPaymentAmountStr(amount.toLocaleString('id-ID'));
    }
  };

  const handlePaymentInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '');
    const num = raw ? parseInt(raw, 10) : 0;
    setPaymentAmount(num);
    setPaymentAmountStr(num > 0 ? num.toLocaleString('id-ID') : '');
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    if (paymentAmount < total && selectedPaymentMethod === 'Tunai') {
      alert('Jumlah uang bayar kurang dari total transaksi!');
      return;
    }

    const randomIdNum = Math.floor(1000 + Math.random() * 9000);
    const newTrx: Transaction = {
      id: `#TRX-${randomIdNum}`,
      date: 'Hari Ini',
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      customerName: customerName || 'Umum (Guest)',
      cashierName: 'Keyzha (Founder)',
      paymentMethod: selectedPaymentMethod,
      status: 'Sukses',
      subtotal,
      tax: 0,
      discount: discountAmount,
      total,
      amountPaid: selectedPaymentMethod === 'Tunai' ? paymentAmount : total,
      change: selectedPaymentMethod === 'Tunai' ? changeAmount : 0,
      items: cart.map((item) => ({
        product: item.product,
        quantity: item.quantity,
        price: item.product.price
      }))
    };

    onCompleteSale(newTrx);
    setLastTransaction(newTrx);
    setShowSuccessModal(true);

    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {
      // safe fallback
    }
  };

  return (
    <div id="kasir-view-content" className="flex flex-col lg:flex-row gap-6 h-full pb-8 animate-in fade-in duration-200">
      {/* Left Column: Product Grid */}
      <section className="flex-1 flex flex-col min-w-0">
        {/* Search & Category Pills */}
        <div className="flex flex-col gap-3 mb-5">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7e7576]" />
              <input
                id="kasir-product-search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari skincare, lip tint pink, paket hemat, SKU..."
                className="w-full pl-11 pr-4 py-2.5 bg-white border border-[#EEEEEE] rounded-xl text-sm text-[#1b1c1c] focus:outline-none focus:border-[#805062] focus:ring-4 focus:ring-[#fec1d6]/30 transition-all shadow-2xs"
              />
            </div>

            {/* Scan Barcode Camera Button */}
            <button
              id="btn-scan-barcode-camera"
              type="button"
              onClick={() => setIsScannerOpen(true)}
              className="px-4 py-2.5 bg-gradient-to-r from-[#805062] to-[#9c5f76] hover:from-[#6b3f50] hover:to-[#805062] text-white rounded-xl text-xs sm:text-sm font-bold shadow-md shadow-[#805062]/20 flex items-center justify-center gap-2 transition-all active:scale-95 shrink-0 cursor-pointer"
              title="Buka Kamera untuk Memindai Barcode / SKU Produk"
            >
              <Camera className="w-4 h-4 text-[#ffd9e4] animate-pulse" />
              <span>Pindai Barcode</span>
            </button>

            {/* View Mode Toggle: Grid vs Shelf Display */}
            <div className="flex bg-white rounded-xl border border-[#EEEEEE] p-1 shadow-2xs shrink-0">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                  viewMode === 'grid'
                    ? 'bg-[#805062] text-white shadow-xs'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                title="Tampilan Grid Standar"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Grid</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('shelf')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                  viewMode === 'shelf'
                    ? 'bg-[#805062] text-white shadow-xs'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                title="Tampilan Rak Toko (Visual Shelf Display)"
              >
                <Store className="w-3.5 h-3.5 text-[#ffd9e4]" />
                <span>Rak Toko</span>
              </button>
            </div>

            {selectedCategory !== 'Semua' && (
              <button
                onClick={() => setSelectedCategory('Semua')}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#fce7ef] text-[#805062] hover:bg-[#fad4e2] transition-colors shrink-0"
              >
                Reset Filter
              </button>
            )}
          </div>

          {/* Category Pills */}
          <div className="flex gap-2 overflow-x-auto noscrollbar pb-1">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              const isBestSellerTab = cat.includes('Best Seller');
              const isBundleTab = cat.includes('Paket');
              const isLipTab = cat.includes('Bibir');
              return (
                <button
                  key={cat}
                  id={`cat-pill-${cat.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs md:text-sm font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? isBestSellerTab
                        ? 'bg-gradient-to-r from-amber-500 to-rose-500 text-white shadow-sm'
                        : isBundleTab
                        ? 'bg-purple-700 text-white shadow-sm'
                        : isLipTab
                        ? 'bg-rose-600 text-white shadow-sm'
                        : 'bg-[#1b1c1c] text-white shadow-xs'
                      : isBestSellerTab
                      ? 'bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100'
                      : isBundleTab
                      ? 'bg-purple-50 text-purple-800 border border-purple-200 hover:bg-purple-100'
                      : isLipTab
                      ? 'bg-rose-50 text-rose-800 border border-rose-200 hover:bg-rose-100'
                      : 'bg-white text-[#4c4546] border border-[#EEEEEE] hover:bg-[#F5F3F3]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Conditional View: Shelf or Standard Grid */}
        {viewMode === 'shelf' ? (
          <div className="flex-1 overflow-y-auto noscrollbar pr-1">
            <BabyBloomShelfDisplay
              products={filteredProducts}
              onSelectProduct={handleOpenDetail}
              onAddToCart={addToCart}
            />
          </div>
        ) : (
          /* Product Cards Grid */
          <div className="flex-1 overflow-y-auto noscrollbar pr-1">
            {filteredProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center bg-white rounded-2xl border border-dashed border-[#EEEEEE]">
                <Search className="w-10 h-10 text-gray-300 mb-2" />
                <p className="font-semibold text-gray-600">Tidak ada produk skincare ditemukan</p>
                <p className="text-xs text-gray-400 mt-1">Coba gunakan kata kunci seperti &apos;pink&apos;, &apos;lip tint&apos;, atau &apos;paket&apos;</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredProducts.map((prod) => {
                  const isOutOfStock = prod.stock <= 0;
                  const isLowStock = prod.stock > 0 && prod.stock <= 3;
                  const inCart = cart.find((i) => i.product.id === prod.id);

                  return (
                    <div
                      key={prod.id}
                      id={`pos-product-${prod.id}`}
                      onClick={() => handleOpenDetail(prod)}
                      className={`bg-white rounded-2xl border transition-all select-none group relative overflow-hidden flex flex-col justify-between ${
                        isOutOfStock
                          ? 'opacity-60 border-gray-200 cursor-not-allowed'
                          : 'border-[#EEEEEE] hover:border-[#805062] hover:shadow-lg cursor-pointer hover:-translate-y-0.5'
                      }`}
                    >
                      {/* Best Seller / Bundle Badges */}
                      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
                        {prod.isBestSeller && (
                          <span className="bg-gradient-to-r from-amber-500 to-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-sm flex items-center gap-1">
                            <Star className="w-2.5 h-2.5 fill-current" />
                            BEST SELLER
                          </span>
                        )}
                        {prod.isBundle && (
                          <span className="bg-purple-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-sm flex items-center gap-1">
                            <Package className="w-2.5 h-2.5" />
                            PAKET HEMAT
                          </span>
                        )}
                      </div>

                      {/* Cart quantity badge */}
                      {inCart && inCart.quantity > 0 && (
                        <span className="absolute top-3 right-3 z-10 w-6 h-6 rounded-full bg-[#805062] text-white text-xs font-bold flex items-center justify-center shadow-md">
                          {inCart.quantity}
                        </span>
                      )}

                      {/* Product Image Box */}
                      <div className="p-2">
                        <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-[#faf7f8] flex items-center justify-center border border-[#f0e4e8]">
                          {prod.image ? (
                            <img
                              src={prod.image}
                              alt={prod.name}
                              className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                              referrerPolicy="no-referrer"
                            />
                          ) : (
                            <div className="flex flex-col items-center justify-center text-gray-400">
                              <ImageIcon className="w-8 h-8 opacity-40" />
                            </div>
                          )}

                          {/* Shade Swatch Dot for Tint */}
                          {prod.shadeColor && (
                            <div 
                              className="absolute bottom-2 left-2 flex items-center gap-1 bg-white/95 backdrop-blur-xs px-2 py-0.5 rounded-full border border-gray-200 shadow-xs z-10"
                              title={`Shade: ${prod.shadeName || prod.shadeColor}`}
                            >
                              <span 
                                className="w-3 h-3 rounded-full border border-black/10 shrink-0 shadow-2xs" 
                                style={{ backgroundColor: prod.shadeColor }} 
                              />
                              <span className="text-[9px] font-bold text-gray-800">
                                {prod.shadeName ? prod.shadeName.split(' ')[0] : 'Shade'}
                              </span>
                            </div>
                          )}

                          {/* Quick View Button on Image hover */}
                          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                            <button
                              onClick={(e) => handleOpenDetail(prod, e)}
                              className="px-3 py-1.5 bg-white/90 hover:bg-white text-[#1b1c1c] text-xs font-bold rounded-lg backdrop-blur-sm shadow-md flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform cursor-pointer"
                            >
                              <Eye className="w-3.5 h-3.5 text-[#805062]" />
                              Penjelasan Produk
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className="p-3 pt-1 flex flex-col gap-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-semibold text-[#805062] bg-[#ffd9e4]/50 px-2 py-0.5 rounded-md">
                            {prod.category}
                          </span>
                          {prod.volume && (
                            <span className="text-[10px] text-[#7e7576]">
                              {prod.volume}
                            </span>
                          )}
                        </div>

                        <h3 className="font-semibold text-xs sm:text-sm text-[#1b1c1c] line-clamp-2 group-hover:text-[#805062] transition-colors leading-snug min-h-[36px]">
                          {prod.name}
                        </h3>

                        {/* Brief description snippet */}
                        <p className="text-[11px] text-[#7e7576] line-clamp-1">
                          {prod.description}
                        </p>

                        <div className="flex justify-between items-end mt-1 pt-1.5 border-t border-[#f2edf0]">
                          <div>
                            <span className="text-[10px] text-[#7e7576] block">Harga POS</span>
                            <span className="font-bold text-sm text-[#805062]">
                              {formatIDR(prod.price)}
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                if (!isOutOfStock) addToCart(prod);
                              }}
                              disabled={isOutOfStock}
                              className={`p-1.5 rounded-lg text-xs font-bold flex items-center justify-center transition-all cursor-pointer ${
                                isOutOfStock
                                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                  : 'bg-[#805062] hover:bg-[#6b3f50] text-white shadow-xs active:scale-95'
                              }`}
                              title="Tambah ke Keranjang"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </section>

      {/* Right Column: Cart & Payment Panel */}
      <aside
        id="pos-cart-panel"
        className="w-full lg:w-[380px] xl:w-[420px] bg-white rounded-3xl border border-[#EEEEEE] flex flex-col shadow-[-8px_0_24px_rgba(0,0,0,0.02)] shrink-0 overflow-hidden"
      >
        {/* Cart Header */}
        <div className="p-5 border-b border-[#EEEEEE] flex justify-between items-center bg-[#FBF9F8]/60">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-[#1b1c1c]">Keranjang Kasir</h2>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#fec1d6]/40 text-[#805062]">
              {cart.reduce((s, i) => s + i.quantity, 0)} item
            </span>
          </div>
          {cart.length > 0 && (
            <button
              id="btn-clear-cart"
              onClick={clearCart}
              className="text-xs text-[#7e7576] hover:text-red-600 transition-colors flex items-center gap-1 font-medium"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Kosongkan</span>
            </button>
          )}
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto noscrollbar p-5 flex flex-col gap-3.5 min-h-[160px] max-h-[300px]">
          {cart.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center py-10 text-gray-400">
              <Receipt className="w-10 h-10 stroke-[1.5] mb-2 opacity-40 text-[#805062]" />
              <p className="text-sm font-semibold text-gray-700">Keranjang masih kosong</p>
              <p className="text-xs text-gray-400 mt-0.5">Klik produk di samping untuk menambah ke keranjang</p>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.product.id}
                className="flex justify-between items-start gap-3 pb-3 border-b border-[#EEEEEE]/70"
              >
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-xs text-[#1b1c1c] truncate">{item.product.name}</h4>
                  <p className="text-xs text-[#7e7576] mt-0.5">{formatIDR(item.product.price)}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => updateQuantity(item.product.id, -1)}
                    className="w-6 h-6 rounded-full border border-[#cfc4c5] flex items-center justify-center text-[#1b1c1c] hover:bg-[#F5F3F3] active:scale-95 transition-all"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.product.id, 1)}
                    disabled={item.quantity >= item.product.stock}
                    className="w-6 h-6 rounded-full border border-[#cfc4c5] flex items-center justify-center text-[#1b1c1c] hover:bg-[#F5F3F3] active:scale-95 disabled:opacity-40 transition-all"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>

                <div className="w-20 text-right shrink-0">
                  <span className="font-bold text-xs text-[#805062]">
                    {formatIDR(item.product.price * item.quantity)}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Payment Summary & Checkout Action */}
        <div className="p-5 bg-white border-t border-[#EEEEEE]">
          <div className="flex flex-col gap-1.5 mb-3 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-[#7e7576] text-xs">Subtotal</span>
              <span className="font-semibold text-[#1b1c1c] text-xs">{formatIDR(subtotal)}</span>
            </div>
            <div className="flex justify-between items-center text-[#805062] text-xs">
              <span>Diskon ({discountPercent}%)</span>
              <span className="font-medium">- {formatIDR(discountAmount)}</span>
            </div>
          </div>

          <div className="flex justify-between items-center mb-4 pt-3 border-t border-dashed border-[#cfc4c5]">
            <span className="text-base font-bold text-[#1b1c1c]">Total Tagihan</span>
            <span className="text-xl font-black text-[#805062]">{formatIDR(total)}</span>
          </div>

          {/* Payment Method Selector */}
          <div className="mb-3">
            <label className="block text-[11px] font-semibold text-[#7e7576] mb-1.5 uppercase tracking-wider">
              Metode Bayar
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['Tunai', 'QRIS', 'Kartu Debit'] as PaymentMethod[]).map((method) => (
                <button
                  key={method}
                  type="button"
                  onClick={() => setSelectedPaymentMethod(method)}
                  className={`py-1.5 px-2 rounded-xl text-xs font-semibold border transition-all ${
                    selectedPaymentMethod === method
                      ? 'bg-[#fec1d6]/40 border-[#805062] text-[#805062]'
                      : 'border-[#EEEEEE] text-[#4c4546] hover:bg-[#F5F3F3]'
                  }`}
                >
                  {method}
                </button>
              ))}
            </div>
          </div>

          {/* Cash Amount Input (when Tunai is selected) */}
          {selectedPaymentMethod === 'Tunai' && (
            <>
              <div className="mb-3">
                <label className="block text-[11px] font-semibold text-[#7e7576] mb-1 uppercase tracking-wider">
                  Jumlah Bayar
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-semibold text-[#7e7576]">
                    Rp
                  </span>
                  <input
                    id="input-cash-amount"
                    type="text"
                    value={paymentAmountStr}
                    onChange={handlePaymentInputChange}
                    className="w-full pl-11 pr-4 py-2 text-right bg-[#FBF9F8] border border-[#cfc4c5] rounded-xl font-bold text-base text-[#1b1c1c] focus:outline-none focus:border-[#805062] focus:ring-4 focus:ring-[#fec1d6]/30 transition-all"
                  />
                </div>
              </div>

              <div className="flex justify-between items-center mb-3">
                <span className="text-xs text-[#7e7576]">Kembalian</span>
                <span className="text-sm font-bold text-[#1b1c1c]">
                  {formatIDR(changeAmount)}
                </span>
              </div>
            </>
          )}

          {/* Checkout Button */}
          <button
            id="btn-pay-now"
            onClick={handleCheckout}
            disabled={cart.length === 0}
            className="w-full py-3.5 bg-[#805062] hover:bg-[#6b3f50] text-white rounded-2xl font-bold text-sm active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md shadow-[#805062]/20 flex items-center justify-center gap-2 cursor-pointer"
          >
            <CreditCard className="w-4 h-4" />
            <span>Bayar Transaksi</span>
          </button>

          {/* Quick Cash Buttons */}
          {selectedPaymentMethod === 'Tunai' && (
            <div className="grid grid-cols-5 gap-1.5 mt-3">
              <button
                onClick={() => handleQuickCash('exact')}
                className="py-1.5 bg-[#fec1d6]/30 text-[#805062] rounded-lg text-xs font-semibold hover:bg-[#fec1d6]/50 transition-colors"
              >
                Pas
              </button>
              <button
                onClick={() => handleQuickCash(50000)}
                className="py-1.5 bg-[#F5F3F3] text-[#1b1c1c] rounded-lg text-xs font-semibold hover:bg-[#EEEEEE] transition-colors"
              >
                50k
              </button>
              <button
                onClick={() => handleQuickCash(100000)}
                className="py-1.5 bg-[#F5F3F3] text-[#1b1c1c] rounded-lg text-xs font-semibold hover:bg-[#EEEEEE] transition-colors"
              >
                100k
              </button>
              <button
                onClick={() => handleQuickCash(200000)}
                className="py-1.5 bg-[#F5F3F3] text-[#1b1c1c] rounded-lg text-xs font-semibold hover:bg-[#EEEEEE] transition-colors"
              >
                200k
              </button>
              <button
                onClick={() => handleQuickCash('clear')}
                className="py-1.5 bg-[#F5F3F3] text-[#1b1c1c] rounded-lg text-xs font-semibold hover:bg-[#EEEEEE] transition-colors"
              >
                C
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedDetailProduct}
        isOpen={isDetailOpen}
        onClose={() => {
          setIsDetailOpen(false);
          setSelectedDetailProduct(null);
        }}
        onAddToCart={(p, qty) => addToCart(p, qty)}
      />

      {/* Camera Barcode Scanner Modal */}
      <BarcodeScannerModal
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        products={products}
        onProductScanned={(p, qty) => addToCart(p, qty)}
      />

      {/* Success Modal */}
      {showSuccessModal && lastTransaction && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center shadow-2xl border border-[#EEEEEE] animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-[#1b1c1c]">Transaksi Berhasil!</h3>
            <p className="text-xs text-gray-500 mt-1">
              ID: {lastTransaction.id} &bull; {lastTransaction.time}
            </p>

            <div className="my-5 p-4 rounded-2xl bg-[#FBF9F8] border border-[#EEEEEE] space-y-2 text-sm text-left">
              <div className="flex justify-between">
                <span className="text-gray-500">Total Belanja</span>
                <span className="font-bold text-gray-900">{formatIDR(lastTransaction.total)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Metode Bayar</span>
                <span className="font-semibold text-[#805062]">{lastTransaction.paymentMethod}</span>
              </div>
              {lastTransaction.paymentMethod === 'Tunai' && (
                <>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Uang Diterima</span>
                    <span>{formatIDR(lastTransaction.amountPaid || 0)}</span>
                  </div>
                  <div className="flex justify-between text-emerald-600 font-bold border-t border-gray-200 pt-1.5">
                    <span>Kembalian</span>
                    <span>{formatIDR(lastTransaction.change || 0)}</span>
                  </div>
                </>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => {
                  setShowSuccessModal(false);
                  onOpenReceipt(lastTransaction);
                }}
                className="py-2.5 px-4 bg-[#fec1d6]/30 text-[#805062] hover:bg-[#fec1d6]/50 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
              >
                <Receipt className="w-4 h-4" />
                <span>Cetak Struk</span>
              </button>
              <button
                onClick={() => setShowSuccessModal(false)}
                className="py-2.5 px-4 bg-[#805062] text-white hover:bg-[#6b3f50] rounded-xl text-xs font-bold transition-colors"
              >
                Transaksi Baru
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

