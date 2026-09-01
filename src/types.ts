export type NavigationTab = 
  | 'dashboard'
  | 'kasir'
  | 'produk'
  | 'kategori'
  | 'stok'
  | 'riwayat'
  | 'laporan'
  | 'pengaturan';

export interface Product {
  id: string;
  sku: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  image: string;
  description: string;
  isBestSeller?: boolean;
  isBundle?: boolean;
  bundleItems?: string[];
  benefits?: string[];
  keyIngredients?: string;
  howToUse?: string;
  volume?: string;
  rating?: number;
  reviewCount?: number;
  shadeColor?: string;
  shadeName?: string;
  packageColor?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type PaymentMethod = 'QRIS' | 'Tunai' | 'Kartu Debit' | 'Transfer Bank';

export type TransactionStatus = 'Sukses' | 'Tertunda' | 'Dibatalkan';

export interface TransactionItem {
  product: Product;
  quantity: number;
  price: number;
}

export interface Transaction {
  id: string;
  date: string;
  time: string;
  customerName: string;
  cashierName: string;
  paymentMethod: PaymentMethod;
  status: TransactionStatus;
  items: TransactionItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  amountPaid?: number;
  change?: number;
}

export interface SalesStat {
  totalSales: number;
  totalTransactions: number;
  productsSold: number;
  lowStockCount: number;
  salesGrowth: number;
  transactionGrowth: number;
}

export interface ChartDataPoint {
  day: string;
  fullDate?: string;
  sales: number;
  transactions: number;
}
