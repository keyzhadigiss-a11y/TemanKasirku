import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Plus, 
  Edit3, 
  Trash2, 
  Image as ImageIcon, 
  ChevronLeft, 
  ChevronRight,
  X,
  Check
} from 'lucide-react';
import { Product } from '../types';
import { formatIDR } from '../data/mockData';

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
  const itemsPerPage = 6;

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    category: 'Minuman',
    price: 25000,
    stock: 20,
    image: '',
    description: ''
  });

  const categories = ['Semua Kategori', 'Minuman', 'Makanan', 'Snack', 'Kopi', 'Non-Kopi', 'Merchandise'];

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchCat =
        selectedCategory === 'Semua Kategori' ||
        p.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.sku.toLowerCase().includes(searchQuery.toLowerCase());
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
      sku: `PROD-${Math.floor(100 + Math.random() * 900)}`,
      category: 'Minuman',
      price: 25000,
      stock: 20,
      image: '',
      description: ''
    });
    setModalOpen(true);
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      sku: product.sku,
      category: product.category,
      price: product.price,
      stock: product.stock,
      image: product.image || '',
      description: product.description || ''
    });
    setModalOpen(true);
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
        description: formData.description
      });
    } else {
      const newProduct: Product = {
        id: `prod-${Date.now()}`,
        name: formData.name,
        sku: formData.sku,
        category: formData.category,
        price: Number(formData.price),
        stock: Number(formData.stock),
        image: formData.image,
        description: formData.description
      };
      onAddProduct(newProduct);
    }
    setModalOpen(false);
  };

  // Helper badge color
  const getCategoryBadgeClass = (cat: string) => {
    switch (cat.toLowerCase()) {
      case 'minuman':
      case 'kopi':
        return 'bg-[#ffd9e4] text-[#330f1f]';
      case 'makanan':
        return 'bg-[#f4dce4] text-[#25181e]';
      case 'snack':
        return 'bg-[#e4e2e2] text-[#4c4546]';
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
            Manajemen Produk
          </h2>
          <p className="text-sm text-[#4c4546] mt-0.5">
            Kelola katalog menu, harga, SKU, dan ketersediaan stok.
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
              placeholder="Cari produk..."
              className="w-full pl-10 pr-4 py-2 bg-white border border-[#EEEEEE] rounded-lg text-sm text-[#1b1c1c] focus:outline-none focus:border-[#805062] focus:ring-2 focus:ring-[#fec1d6]/30 transition-all shadow-2xs"
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
            className="px-3 py-2 bg-white border border-[#EEEEEE] rounded-lg text-sm text-[#4c4546] focus:outline-none focus:border-[#805062] focus:ring-2 focus:ring-[#fec1d6]/30 cursor-pointer shadow-2xs"
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
            className="flex items-center justify-center gap-2 bg-[#000000] text-white px-4 py-2 rounded-lg hover:bg-[#1b1b1b] transition-all text-sm font-semibold shadow-md shadow-black/10 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Produk</span>
          </button>
        </div>
      </div>

      {/* Product Table Card */}
      <div
        id="product-table-card"
        className="bg-white rounded-xl border border-[#EEEEEE] shadow-xs overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#FBF9F8] border-b border-[#EEEEEE] text-xs font-semibold text-[#7e7576]">
                <th className="py-4 px-6">Gambar</th>
                <th className="py-4 px-6">Nama Produk</th>
                <th className="py-4 px-6">SKU</th>
                <th className="py-4 px-6">Kategori</th>
                <th className="py-4 px-6 text-right">Harga</th>
                <th className="py-4 px-6 text-center">Stok</th>
                <th className="py-4 px-6 text-center w-24">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EEEEEE] text-sm">
              {paginatedProducts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-gray-400">
                    Tidak ada produk yang cocok dengan pencarian
                  </td>
                </tr>
              ) : (
                paginatedProducts.map((prod) => (
                  <tr
                    key={prod.id}
                    className="hover:bg-[#F5F3F3]/60 transition-colors group"
                  >
                    {/* Gambar */}
                    <td className="py-3 px-6">
                      <div className="w-12 h-12 rounded-lg bg-[#FBF9F8] overflow-hidden border border-[#EEEEEE] flex items-center justify-center shrink-0">
                        {prod.image ? (
                          <img
                            src={prod.image}
                            alt={prod.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <ImageIcon className="w-6 h-6 text-[#cfc4c5]" />
                        )}
                      </div>
                    </td>

                    {/* Nama Produk */}
                    <td className="py-3 px-6 font-semibold text-[#1b1c1c]">
                      {prod.name}
                    </td>

                    {/* SKU */}
                    <td className="py-3 px-6 text-[#7e7576] font-mono text-xs">
                      {prod.sku}
                    </td>

                    {/* Kategori */}
                    <td className="py-3 px-6">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${getCategoryBadgeClass(
                          prod.category
                        )}`}
                      >
                        {prod.category}
                      </span>
                    </td>

                    {/* Harga */}
                    <td className="py-3 px-6 font-bold text-[#1b1c1c] text-right">
                      {formatIDR(prod.price)}
                    </td>

                    {/* Stok */}
                    <td className="py-3 px-6 text-center">
                      {prod.stock <= 0 ? (
                        <span className="text-xs text-red-600 font-bold">Out of Stock</span>
                      ) : prod.stock <= 3 ? (
                        <span className="text-xs text-amber-600 font-bold bg-amber-50 px-2 py-0.5 rounded-full">
                          {prod.stock} (Menipis)
                        </span>
                      ) : (
                        <span className="text-[#1b1c1c] font-medium">{prod.stock}</span>
                      )}
                    </td>

                    {/* Aksi */}
                    <td className="py-3 px-6 text-center">
                      <div className="flex items-center justify-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                        <button
                          id={`btn-edit-prod-${prod.id}`}
                          onClick={() => openEditModal(prod)}
                          title="Edit Produk"
                          className="p-1.5 text-[#4c4546] hover:text-[#805062] hover:bg-[#F5F3F3] rounded-md transition-colors"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          id={`btn-delete-prod-${prod.id}`}
                          onClick={() => {
                            if (confirm(`Yakin ingin menghapus produk "${prod.name}"?`)) {
                              onDeleteProduct(prod.id);
                            }
                          }}
                          title="Hapus Produk"
                          className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
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
            {filteredProducts.length} produk
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

      {/* Add / Edit Product Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-[#EEEEEE] animate-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center pb-4 mb-4 border-b border-gray-100">
              <h3 className="text-lg font-bold text-[#1b1c1c]">
                {editingProduct ? 'Edit Produk' : 'Tambah Produk Baru'}
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
                  Nama Produk *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Contoh: Kopi Susu Aren"
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
                    <option value="Kopi">Kopi</option>
                    <option value="Non-Kopi">Non-Kopi</option>
                    <option value="Minuman">Minuman</option>
                    <option value="Makanan">Makanan</option>
                    <option value="Snack">Snack</option>
                    <option value="Merchandise">Merchandise</option>
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

              <div>
                <label className="block text-xs font-bold text-[#1b1c1c] uppercase tracking-wider mb-1">
                  URL Gambar Produk
                </label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3.5 py-2.5 border border-[#cfc4c5] rounded-xl text-sm focus:outline-none focus:border-[#805062]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1b1c1c] uppercase tracking-wider mb-1">
                  Deskripsi Singkat
                </label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Catatan bahan atau rasa..."
                  className="w-full px-3.5 py-2 border border-[#cfc4c5] rounded-xl text-sm focus:outline-none focus:border-[#805062]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2.5 border border-[#cfc4c5] rounded-xl text-xs font-bold text-[#4c4546] hover:bg-gray-50 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#000000] text-white rounded-xl text-xs font-bold hover:bg-[#1b1b1b] transition-colors flex items-center gap-1.5 shadow-sm"
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
