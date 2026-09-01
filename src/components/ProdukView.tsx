import React, { useState, useMemo } from 'react';
import { 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  Image as ImageIcon,
  ChevronLeft,
  ChevronRight,
  X,
  Check,
  Star,
  Package,
  Eye
} from 'lucide-react';
import { Product } from '../types';
import { formatIDR } from '../data/mockData';
import { ProductDetailModal } from './ProductDetailModal';

interface ProdukViewProps {
  products: Product[];
  onAddProduct: (product: Product) => void;
  onUpdateProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
}

export const ProdukView: React.FC<ProdukViewProps> = ({
  products,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua Kategori');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Detail Modal State
  const [selectedDetailProduct, setSelectedDetailProduct] = useState<Product | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    category: 'Lip Care & Tint',
    price: 49000,
    stock: 25,
    image: '',
    volume: '4.5 ml',
    keyIngredients: '',
    description: '',
    isBestSeller: false,
    isBundle: false
  });

  const categories = [
    'Semua Kategori',
    '⭐ Best Seller',
    '💄 Produk Bibir',
    '🧼 Pembersih Wajah',
    '💦 Pelembap',
    '✨ Serum Wajah',
    '☀️ Tabir Surya',
    '🎭 Masker Wajah',
    '🧴 Perawatan Tubuh',
    '🎁 Paket Hemat'
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      let matchCat = false;
      const lowerCat = p.category.toLowerCase();

      if (selectedCategory === 'Semua Kategori') {
        matchCat = true;
      } else if (selectedCategory === '⭐ Best Seller') {
        matchCat = !!p.isBestSeller;
      } else if (selectedCategory.includes('Bibir')) {
        matchCat = lowerCat.includes('bibir') || lowerCat.includes('lip');
      } else if (selectedCategory.includes('Pembersih')) {
        matchCat = lowerCat.includes('pembersih') || lowerCat.includes('wash');
      } else if (selectedCategory.includes('Pelembap')) {
        matchCat = lowerCat.includes('pelembap') || lowerCat.includes('moist');
      } else if (selectedCategory.includes('Serum')) {
        matchCat = lowerCat.includes('serum') && !lowerCat.includes('tubuh');
      } else if (selectedCategory.includes('Tabir')) {
        matchCat = lowerCat.includes('tabir') || lowerCat.includes('sun');
      } else if (selectedCategory.includes('Masker')) {
        matchCat = lowerCat.includes('masker') || lowerCat.includes('mask');
      } else if (selectedCategory.includes('Tubuh')) {
        matchCat = lowerCat.includes('tubuh') || lowerCat.includes('body');
      } else if (selectedCategory.includes('Paket')) {
        matchCat = lowerCat.includes('paket') || !!p.isBundle;
      } else {
        matchCat = lowerCat === selectedCategory.toLowerCase();
      }

      const matchSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (p.keyIngredients && p.keyIngredients.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (p.shadeName && p.shadeName.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchCat && matchSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage, itemsPerPage]);

  const openAddModal = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      sku: `SKN-${Math.floor(100 + Math.random() * 900)}`,
      category: 'Lip Care & Tint',
      price: 49000,
      stock: 30,
      image: '',
      volume: '4.5 ml',
      keyIngredients: '',
      description: '',
      isBestSeller: false,
      isBundle: false
    });
    setModalOpen(true);
  };

  const openEditModal = (product: Product, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setEditingProduct(product);
    setFormData({
      name: product.name,
      sku: product.sku,
      category: product.category,
      price: product.price,
      stock: product.stock,
      image: product.image || '',
      volume: product.volume || '',
      keyIngredients: product.keyIngredients || '',
      description: product.description || '',
      isBestSeller: !!product.isBestSeller,
      isBundle: !!product.isBundle
    });
    setModalOpen(true);
  };

  const openDetail = (product: Product, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSelectedDetailProduct(product);
    setIsDetailOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    if (editingProduct) {
      onUpdateProduct({
        ...editingProduct,
        name: formData.name,
        sku: formData.sku,
        category: formData.category,
        price: Number(formData.price),
        stock: Number(formData.stock),
        image: formData.image,
        volume: formData.volume,
        keyIngredients: formData.keyIngredients,
        description: formData.description,
        isBestSeller: formData.isBestSeller,
        isBundle: formData.isBundle
      });
    } else {
      const newProduct: Product = {
        id: `prod-${Date.now()}`,
        name: formData.name,
        sku: formData.sku,
        category: formData.category,
        price: Number(formData.price),
        stock: Number(formData.stock),
        image: formData.image || 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=600&q=80',
        volume: formData.volume,
        keyIngredients: formData.keyIngredients,
        description: formData.description,
        isBestSeller: formData.isBestSeller,
        isBundle: formData.isBundle,
        rating: 4.8,
        reviewCount: 10
      };
      onAddProduct(newProduct);
    }
    setModalOpen(false);
  };

  // Helper badge color
  const getCategoryBadgeClass = (cat: string) => {
    switch (cat.toLowerCase()) {
      case 'moisturizer':
        return 'bg-[#ffd9e4] text-[#330f1f]';
      case 'sunscreen':
        return 'bg-amber-100 text-amber-900';
      case 'serum':
        return 'bg-purple-100 text-purple-900';
      case 'sleeping mask':
        return 'bg-indigo-100 text-indigo-900';
      case 'lip care & tint':
      case 'lips':
        return 'bg-rose-100 text-rose-900';
      case 'body serum':
        return 'bg-emerald-100 text-emerald-800';
      case 'paket hemat':
        return 'bg-purple-100 text-purple-900 font-bold';
      default:
        return 'bg-[#e9e8e7] text-[#1b1c1c]';
    }
  };

  return (
    <div id="produk-view-content" className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Title & Toolbar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#1b1c1c]">
            Manajemen Produk Skincare
          </h2>
          <p className="text-sm text-[#4c4546] mt-0.5">
            Kelola katalog skincare, lip tint, paket hemat, rincian bahan aktif, harga, dan stok.
          </p>
        </div>

        {/* Controls Toolbar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
          {/* Search Bar */}
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7e7576]" />
            <input
              id="product-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Cari nama, SKU, klaim..."
              className="w-full pl-10 pr-4 py-2 bg-white border border-[#EEEEEE] rounded-xl text-sm text-[#1b1c1c] focus:outline-none focus:border-[#805062] focus:ring-2 focus:ring-[#fec1d6]/30 transition-all shadow-2xs"
            />
          </div>

          {/* Category Dropdown */}
          <select
            id="product-category-filter"
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setCurrentPage(1);
            }}
            aria-label="Filter kategori produk"
            className="px-3 py-2 bg-white border border-[#EEEEEE] rounded-xl text-sm text-[#4c4546] focus:outline-none focus:border-[#805062] focus:ring-2 focus:ring-[#fec1d6]/30 cursor-pointer shadow-2xs"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          {/* Add Product Button */}
          <button
            id="btn-add-product"
            onClick={openAddModal}
            className="flex items-center justify-center gap-2 bg-[#805062] hover:bg-[#6b3f50] text-white px-4 py-2 rounded-xl transition-all text-sm font-semibold shadow-md shadow-[#805062]/20 shrink-0 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Produk</span>
          </button>
        </div>
      </div>

      {/* Product Table Card */}
      <div
        id="product-table-card"
        className="bg-white rounded-2xl border border-[#EEEEEE] shadow-xs overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#FBF9F8] border-b border-[#EEEEEE] text-xs font-semibold text-[#7e7576]">
                <th className="py-4 px-6">Foto</th>
                <th className="py-4 px-6">Nama & Kategori Skincare</th>
                <th className="py-4 px-6">SKU / Netto</th>
                <th className="py-4 px-6 text-right">Harga POS</th>
                <th className="py-4 px-6 text-center">Stok</th>
                <th className="py-4 px-6 text-center w-36">Penjelasan & Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EEEEEE] text-sm">
              {paginatedProducts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-gray-400">
                    Tidak ada produk yang cocok dengan pencarian
                  </td>
                </tr>
              ) : (
                paginatedProducts.map((prod) => (
                  <tr
                    key={prod.id}
                    onClick={() => openDetail(prod)}
                    className="hover:bg-[#F5F3F3]/60 transition-colors group cursor-pointer"
                  >
                    {/* Gambar */}
                    <td className="py-3 px-6">
                      <div className="w-14 h-14 rounded-xl bg-[#faf7f8] overflow-hidden border border-[#eedfe4] flex items-center justify-center shrink-0 relative shadow-2xs">
                        {prod.image ? (
                          <img
                            src={prod.image}
                            alt={prod.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <ImageIcon className="w-6 h-6 text-[#cfc4c5]" />
                        )}
                        {prod.isBestSeller && (
                          <span className="absolute bottom-0 inset-x-0 bg-gradient-to-r from-amber-500 to-rose-500 text-white text-[8px] font-bold text-center py-0.5">
                            BEST
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Nama Produk & Badges */}
                    <td className="py-3 px-6">
                      <div className="flex flex-col gap-1 max-w-sm">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold ${getCategoryBadgeClass(
                              prod.category
                            )}`}
                          >
                            {prod.category}
                          </span>
                          {prod.isBestSeller && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                              <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500" />
                              Best Seller
                            </span>
                          )}
                          {prod.isBundle && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-purple-100 text-purple-900 border border-purple-300">
                              <Package className="w-2.5 h-2.5" />
                              Paket Hemat
                            </span>
                          )}
                        </div>

                        <span className="font-semibold text-sm text-[#1b1c1c] group-hover:text-[#805062] transition-colors leading-snug">
                          {prod.name}
                        </span>

                        <span className="text-xs text-[#7e7576] line-clamp-1">
                          {prod.description}
                        </span>
                      </div>
                    </td>

                    {/* SKU & Volume */}
                    <td className="py-3 px-6 text-[#7e7576] text-xs">
                      <div className="font-mono font-medium text-[#1b1c1c]">{prod.sku}</div>
                      {prod.volume && <div className="text-[11px] text-[#805062]">{prod.volume}</div>}
                    </td>

                    {/* Harga */}
                    <td className="py-3 px-6 font-bold text-[#805062] text-right text-base">
                      {formatIDR(prod.price)}
                    </td>

                    {/* Stok */}
                    <td className="py-3 px-6 text-center">
                      {prod.stock <= 0 ? (
                        <span className="text-xs text-red-600 font-bold bg-red-50 px-2 py-0.5 rounded-full border border-red-200">
                          Habis
                        </span>
                      ) : prod.stock <= 3 ? (
                        <span className="text-xs text-amber-600 font-bold bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                          {prod.stock} pcs (Menipis)
                        </span>
                      ) : (
                        <span className="text-[#1b1c1c] font-medium text-xs bg-[#F5F3F3] px-2.5 py-1 rounded-full">
                          {prod.stock} pcs
                        </span>
                      )}
                    </td>

                    {/* Aksi & Penjelasan Detail */}
                    <td className="py-3 px-6 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={(e) => openDetail(prod, e)}
                          title="Lihat Penjelasan Skincare"
                          className="px-2 py-1 text-[#805062] bg-[#fec1d6]/30 hover:bg-[#fec1d6]/60 rounded-lg transition-colors flex items-center gap-1 text-xs font-semibold"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Detail</span>
                        </button>
                        <button
                          id={`btn-edit-prod-${prod.id}`}
                          onClick={(e) => openEditModal(prod, e)}
                          title="Edit Produk"
                          className="p-1.5 text-[#4c4546] hover:text-[#805062] hover:bg-[#F5F3F3] rounded-lg transition-colors"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          id={`btn-delete-prod-${prod.id}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (confirm(`Yakin ingin menghapus produk "${prod.name}"?`)) {
                              onDeleteProduct(prod.id);
                            }
                          }}
                          title="Hapus Produk"
                          className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-[#EEEEEE] bg-[#FBF9F8]/60 text-xs text-[#7e7576]">
          <span>
            Menampilkan{' '}
            {filteredProducts.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}-
            {Math.min(currentPage * itemsPerPage, filteredProducts.length)} dari{' '}
            {filteredProducts.length} produk skincare
          </span>
          <div className="flex items-center gap-1.5">
            <button
              id="btn-pagination-prev"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage <= 1}
              className="p-1.5 rounded-lg border border-[#cfc4c5] text-[#1b1c1c] hover:bg-white disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-2 font-semibold text-[#1b1c1c]">
              {currentPage} / {totalPages}
            </span>
            <button
              id="btn-pagination-next"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage >= totalPages}
              className="p-1.5 rounded-lg border border-[#cfc4c5] text-[#1b1c1c] hover:bg-white disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedDetailProduct}
        isOpen={isDetailOpen}
        onClose={() => {
          setIsDetailOpen(false);
          setSelectedDetailProduct(null);
        }}
      />

      {/* Add / Edit Product Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-[#EEEEEE] animate-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center pb-4 mb-4 border-b border-gray-100">
              <h3 className="text-lg font-bold text-[#1b1c1c]">
                {editingProduct ? 'Edit Skincare & Beauty Item' : 'Tambah Produk Skincare Baru'}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#1b1c1c] uppercase tracking-wider mb-1">
                  Nama Produk Skincare *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Contoh: Velvet Lip Tint - Soft Petal Pink"
                  className="w-full px-3.5 py-2.5 border border-[#cfc4c5] rounded-xl text-sm focus:outline-none focus:border-[#805062] focus:ring-2 focus:ring-[#fec1d6]/40"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#1b1c1c] uppercase tracking-wider mb-1">
                    SKU / Kode
                  </label>
                  <input
                    type="text"
                    value={formData.sku}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-[#cfc4c5] rounded-xl text-sm focus:outline-none focus:border-[#805062]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#1b1c1c] uppercase tracking-wider mb-1">
                    Kategori
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-[#cfc4c5] rounded-xl text-sm focus:outline-none focus:border-[#805062] bg-white cursor-pointer"
                  >
                    <option value="Lip Care & Tint">Lip Care & Tint</option>
                    <option value="Paket Hemat">Paket Hemat</option>
                    <option value="Moisturizer">Moisturizer</option>
                    <option value="Sunscreen">Sunscreen</option>
                    <option value="Serum">Serum</option>
                    <option value="Sleeping Mask">Sleeping Mask</option>
                    <option value="Body Serum">Body Serum</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#1b1c1c] uppercase tracking-wider mb-1">
                    Harga (Rp) *
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="1000"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 border border-[#cfc4c5] rounded-xl text-sm focus:outline-none focus:border-[#805062]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#1b1c1c] uppercase tracking-wider mb-1">
                    Stok Barang *
                  </label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 border border-[#cfc4c5] rounded-xl text-sm focus:outline-none focus:border-[#805062]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#1b1c1c] uppercase tracking-wider mb-1">
                    Netto / Volume
                  </label>
                  <input
                    type="text"
                    value={formData.volume}
                    onChange={(e) => setFormData({ ...formData, volume: e.target.value })}
                    placeholder="Contoh: 4.5 ml / 50g"
                    className="w-full px-3.5 py-2.5 border border-[#cfc4c5] rounded-xl text-sm focus:outline-none focus:border-[#805062]"
                  />
                </div>
                <div className="flex items-center gap-4 pt-6">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#1b1c1c]">
                    <input
                      type="checkbox"
                      checked={formData.isBestSeller}
                      onChange={(e) => setFormData({ ...formData, isBestSeller: e.target.checked })}
                      className="rounded text-[#805062] focus:ring-[#805062]"
                    />
                    ⭐ Best Seller
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#1b1c1c]">
                    <input
                      type="checkbox"
                      checked={formData.isBundle}
                      onChange={(e) => setFormData({ ...formData, isBundle: e.target.checked })}
                      className="rounded text-purple-600 focus:ring-purple-600"
                    />
                    🎁 Paketan
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1b1c1c] uppercase tracking-wider mb-1">
                  URL Gambar Produk
                </label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3.5 py-2.5 border border-[#cfc4c5] rounded-xl text-sm focus:outline-none focus:border-[#805062]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1b1c1c] uppercase tracking-wider mb-1">
                  Kandungan Aktif (Key Ingredients)
                </label>
                <input
                  type="text"
                  value={formData.keyIngredients}
                  onChange={(e) => setFormData({ ...formData, keyIngredients: e.target.value })}
                  placeholder="Contoh: Jojoba Oil, Vitamin E, Hyaluronic Micro-Sphere"
                  className="w-full px-3.5 py-2.5 border border-[#cfc4c5] rounded-xl text-sm focus:outline-none focus:border-[#805062]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1b1c1c] uppercase tracking-wider mb-1">
                  Penjelasan & Manfaat Produk
                </label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Formula lembut yang melembapkan..."
                  className="w-full px-3.5 py-2 border border-[#cfc4c5] rounded-xl text-sm focus:outline-none focus:border-[#805062]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2.5 border border-[#cfc4c5] rounded-xl text-xs font-bold text-[#4c4546] hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#805062] hover:bg-[#6b3f50] text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>{editingProduct ? 'Simpan Perubahan' : 'Tambah Produk'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
