import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Trash2, 
  Plus, 
  Minus, 
  CreditCard, 
  Image as ImageIcon,
  CheckCircle2,
  Receipt
} from 'lucide-react';
import { Product, CartItem, PaymentMethod, Transaction } from '../types';
import { formatIDR } from '../data/mockData';
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
  const [paymentAmount, setPaymentAmount] = useState<number>(100000);
  const [paymentAmountStr, setPaymentAmountStr] = useState<string>('100.000');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod>('Tunai');
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [customerName, setCustomerName] = useState<string>('Umum (Guest)');
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [lastTransaction, setLastTransaction] = useState<Transaction | null>(null);

  const categories = ['Semua', 'Kopi', 'Non-Kopi', 'Makanan', 'Snack', 'Minuman', 'Merchandise'];

  // Filter products by category and search
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchCategory =
        selectedCategory === 'Semua' || p.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.sku.toLowerCase().includes(searchQuery.toLowerCase());
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
  const addToCart = (product: Product) => {
    if (product.stock <= 0) return;
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        if (existing.quantity >= product.stock) return prev;
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
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

  const handleQuickCash = (amount: 'exact' | 50000 | 100000 | 'clear') => {
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
      cashierName: 'Kasir 1',
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
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7e7576]" />
            <input
              id="kasir-product-search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nama produk, SKU..."
              className="w-full pl-11 pr-4 py-2.5 bg-white border border-[#EEEEEE] rounded-xl text-sm text-[#1b1c1c] focus:outline-none focus:border-[#805062] focus:ring-4 focus:ring-[#fec1d6]/30 transition-all shadow-2xs"
            />
          </div>

          {/* Category Pills */}
          <div className="flex gap-2 overflow-x-auto noscrollbar pb-1">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  id={`cat-pill-${cat.toLowerCase()}`}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs md:text-sm font-semibold whitespace-nowrap transition-all ${
                    isSelected
                      ? 'bg-[#1b1c1c] text-white shadow-xs'
                      : 'bg-white text-[#4c4546] border border-[#EEEEEE] hover:bg-[#F5F3F3]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="flex-1 overflow-y-auto noscrollbar pr-1">
          {filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center bg-white rounded-2xl border border-dashed border-[#EEEEEE]">
              <Search className="w-10 h-10 text-gray-300 mb-2" />
              <p className="font-semibold text-gray-600">Tidak ada produk ditemukan</p>
              <p className="text-xs text-gray-400 mt-1">Coba kata kunci atau kategori lain</p>
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
                    onClick={() => !isOutOfStock && addToCart(prod)}
                    className={`bg-white rounded-xl border transition-all select-none group relative overflow-hidden flex flex-col justify-between ${
                      isOutOfStock
                        ? 'opacity-60 border-gray-200 cursor-not-allowed'
                        : 'border-[#EEEEEE] hover:border-[#805062] hover:shadow-md cursor-pointer'
                    }`}
                  >
                    {/* Cart quantity badge */}
                    {inCart && inCart.quantity > 0 && (
                      <span className="absolute top-3 right-3 z-10 w-6 h-6 rounded-full bg-[#805062] text-white text-xs font-bold flex items-center justify-center shadow-xs">
                        {inCart.quantity}
                      </span>
                    )}

                    <div className="p-2">
                      <div className="relative h-32 w-full rounded-lg overflow-hidden bg-[#FBF9F8] flex items-center justify-center border border-[#EEEEEE]">
                        {prod.image ? (
                          <img
                            src={prod.image}
                            alt={prod.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="flex flex-col items-center justify-center text-gray-400">
                            <ImageIcon className="w-8 h-8 opacity-40" />
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="p-3.5 pt-1 flex flex-col gap-1">
                      <span className="text-[10px] font-semibold text-[#7e7576] uppercase tracking-wider">
                        SKU: {prod.sku}
                      </span>
                      <h3 className="font-semibold text-sm text-[#1b1c1c] line-clamp-1 group-hover:text-[#805062] transition-colors">
                        {prod.name}
                      </h3>
                      <div className="flex justify-between items-center mt-2">
                        <span className="font-bold text-sm text-[#1b1c1c]">
                          {formatIDR(prod.price)}
                        </span>
                        <span
                          className={`text-[11px] font-semibold px-2 py-0.5 rounded-md ${
                            isOutOfStock
                              ? 'bg-red-50 text-red-600'
                              : isLowStock
                              ? 'bg-[#ffdad6] text-[#93000a]'
                              : 'bg-[#F5F3F3] text-[#4c4546]'
                          }`}
                        >
                          Stok: {prod.stock}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Right Column: Cart & Payment Panel */}
      <aside
        id="pos-cart-panel"
        className="w-full lg:w-[400px] xl:w-[440px] bg-white rounded-2xl border border-[#EEEEEE] flex flex-col shadow-[-8px_0_24px_rgba(0,0,0,0.02)] shrink-0 overflow-hidden"
      >
        {/* Cart Header */}
        <div className="p-5 border-b border-[#EEEEEE] flex justify-between items-center bg-[#FBF9F8]/60">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-[#1b1c1c]">Keranjang</h2>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#fec1d6]/30 text-[#805062]">
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
              <p className="text-xs text-gray-400 mt-0.5">Pilih produk di sebelah kiri untuk menambahkan</p>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.product.id}
                className="flex justify-between items-start gap-3 pb-3 border-b border-[#EEEEEE]/70"
              >
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-sm text-[#1b1c1c] truncate">{item.product.name}</h4>
                  <p className="text-xs text-[#7e7576] mt-0.5">{formatIDR(item.product.price)}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => updateQuantity(item.product.id, -1)}
                    className="w-7 h-7 rounded-full border border-[#cfc4c5] flex items-center justify-center text-[#1b1c1c] hover:bg-[#F5F3F3] active:scale-95 transition-all"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-sm font-bold w-5 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.product.id, 1)}
                    disabled={item.quantity >= item.product.stock}
                    className="w-7 h-7 rounded-full border border-[#cfc4c5] flex items-center justify-center text-[#1b1c1c] hover:bg-[#F5F3F3] active:scale-95 disabled:opacity-40 transition-all"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="w-24 text-right shrink-0">
                  <span className="font-bold text-sm text-[#1b1c1c]">
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
              <span className="text-[#7e7576]">Subtotal</span>
              <span className="font-semibold text-[#1b1c1c]">{formatIDR(subtotal)}</span>
            </div>
            <div className="flex justify-between items-center text-[#805062]">
              <span>Diskon ({discountPercent}%)</span>
              <span className="font-medium">- {formatIDR(discountAmount)}</span>
            </div>
          </div>

          <div className="flex justify-between items-center mb-4 pt-3 border-t border-dashed border-[#cfc4c5]">
            <span className="text-lg font-bold text-[#1b1c1c]">Total</span>
            <span className="text-xl font-bold text-[#1b1c1c]">{formatIDR(total)}</span>
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
                  className={`py-1.5 px-2 rounded-lg text-xs font-semibold border transition-all ${
                    selectedPaymentMethod === method
                      ? 'bg-[#fec1d6]/30 border-[#805062] text-[#805062]'
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
                    className="w-full pl-11 pr-4 py-2.5 text-right bg-[#FBF9F8] border border-[#cfc4c5] rounded-xl font-bold text-lg text-[#1b1c1c] focus:outline-none focus:border-[#805062] focus:ring-4 focus:ring-[#fec1d6]/30 transition-all"
                  />
                </div>
              </div>

              <div className="flex justify-between items-center mb-4">
                <span className="text-xs text-[#7e7576]">Kembalian</span>
                <span className="text-base font-bold text-[#1b1c1c]">
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
            className="w-full py-3.5 bg-[#000000] text-white rounded-xl font-bold text-sm hover:bg-[#1b1b1b] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md shadow-black/15 flex items-center justify-center gap-2 cursor-pointer"
          >
            <CreditCard className="w-4 h-4" />
            <span>Bayar Sekarang</span>
          </button>

          {/* Quick Cash Buttons */}
          {selectedPaymentMethod === 'Tunai' && (
            <div className="grid grid-cols-4 gap-2 mt-3">
              <button
                onClick={() => handleQuickCash('exact')}
                className="py-1.5 bg-[#fec1d6]/30 text-[#805062] rounded-lg text-xs font-semibold hover:bg-[#fec1d6]/50 transition-colors"
              >
                Uang Pas
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
                onClick={() => handleQuickCash('clear')}
                className="py-1.5 bg-[#F5F3F3] text-[#1b1c1c] rounded-lg text-xs font-semibold hover:bg-[#EEEEEE] transition-colors"
              >
                C
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Success Modal */}
      {showSuccessModal && lastTransaction && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 text-center shadow-2xl border border-[#EEEEEE] animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-[#1b1c1c]">Transaksi Berhasil!</h3>
            <p className="text-xs text-gray-500 mt-1">
              ID: {lastTransaction.id} &bull; {lastTransaction.time}
            </p>

            <div className="my-5 p-4 rounded-xl bg-[#FBF9F8] border border-[#EEEEEE] space-y-2 text-sm text-left">
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
                className="py-2.5 px-4 bg-[#000000] text-white hover:bg-gray-800 rounded-xl text-xs font-bold transition-colors"
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
