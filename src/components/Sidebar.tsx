import React from 'react';
import { 
  LayoutDashboard, 
  Store, 
  Package, 
  Shapes, 
  Boxes, 
  ReceiptText, 
  BarChart3, 
  Settings,
  X
} from 'lucide-react';
import { NavigationTab } from '../types';
import { ASSETS } from '../data/mockData';

interface SidebarProps {
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  mobileOpen?: boolean;
  setMobileOpen?: (open: boolean) => void;
  lowStockCount?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  mobileOpen = false,
  setMobileOpen,
  lowStockCount = 12
}) => {
  const menuItems: {
    id: NavigationTab;
    label: string;
    icon: React.ReactNode;
    badge?: number | string;
  }[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <LayoutDashboard className="w-5 h-5" />
    },
    {
      id: 'kasir',
      label: 'Kasir',
      icon: <Store className="w-5 h-5" />
    },
    {
      id: 'produk',
      label: 'Produk',
      icon: <Package className="w-5 h-5" />
    },
    {
      id: 'kategori',
      label: 'Kategori',
      icon: <Shapes className="w-5 h-5" />
    },
    {
      id: 'stok',
      label: 'Stok',
      icon: <Boxes className="w-5 h-5" />,
      badge: lowStockCount > 0 ? lowStockCount : undefined
    },
    {
      id: 'riwayat',
      label: 'Riwayat Penjualan',
      icon: <ReceiptText className="w-5 h-5" />
    },
    {
      id: 'laporan',
      label: 'Laporan',
      icon: <BarChart3 className="w-5 h-5" />
    }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          id="mobile-sidebar-backdrop"
          className="fixed inset-0 bg-black/40 z-50 md:hidden backdrop-blur-xs transition-opacity"
          onClick={() => setMobileOpen?.(false)}
        />
      )}

      {/* Main Sidebar */}
      <aside
        id="app-sidebar"
        className={`fixed left-0 top-0 h-full w-[260px] bg-white border-r border-[#EEEEEE] flex flex-col py-3 z-50 transition-transform duration-300 md:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Mobile close button */}
        <div className="md:hidden flex justify-end px-4 pt-1">
          <button
            id="btn-close-mobile-menu"
            onClick={() => setMobileOpen?.(false)}
            className="p-1 text-gray-500 hover:text-black rounded-lg hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Logo & Brand */}
        <div className="flex flex-col items-center justify-center py-6 px-6 mb-2">
          <div className="w-20 h-20 rounded-2xl overflow-hidden mb-3 border border-[#F2B6CB]/40 p-1 shadow-xs bg-[#FBF9F8]">
            <img
              src={ASSETS.logo}
              alt="KASIRKU Logo"
              className="w-full h-full object-contain rounded-xl"
            />
          </div>
          <h1 className="text-[22px] font-bold tracking-tight text-[#1b1c1c]">KASIRKU</h1>
          <p className="text-[11px] font-semibold text-[#805062] uppercase tracking-[0.2em] mt-0.5">
            POS SYSTEM
          </p>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-3 space-y-1 overflow-y-auto noscrollbar">
          {menuItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`sidebar-nav-${item.id}`}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileOpen?.(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 text-left ${
                  isActive
                    ? 'bg-[#fec1d6]/25 text-[#805062] font-semibold border-l-4 border-[#805062] rounded-l-none pl-3 shadow-xs'
                    : 'text-[#4c4546] hover:bg-[#F5F3F3] hover:text-[#1b1c1c]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={isActive ? 'text-[#805062]' : 'text-[#7e7576]'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-red-100 text-red-600">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom Navigation: Settings */}
        <div className="px-3 pt-2 mt-auto border-t border-[#EEEEEE]">
          <button
            id="sidebar-nav-pengaturan"
            onClick={() => {
              setActiveTab('pengaturan');
              setMobileOpen?.(false);
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors text-left ${
              activeTab === 'pengaturan'
                ? 'bg-[#fec1d6]/25 text-[#805062] font-semibold border-l-4 border-[#805062] rounded-l-none pl-3'
                : 'text-[#4c4546] hover:bg-[#F5F3F3] hover:text-[#1b1c1c]'
            }`}
          >
            <Settings className={`w-5 h-5 ${activeTab === 'pengaturan' ? 'text-[#805062]' : 'text-[#7e7576]'}`} />
            <span>Pengaturan</span>
          </button>
        </div>
      </aside>
    </>
  );
};
