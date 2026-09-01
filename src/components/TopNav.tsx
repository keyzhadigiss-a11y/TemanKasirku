import React, { useState } from 'react';
import { Search, Bell, Menu, CheckCircle2, AlertTriangle, ChevronDown } from 'lucide-react';
import { ASSETS } from '../data/mockData';

interface TopNavProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onOpenMobileMenu: () => void;
  title?: string;
}

export const TopNav: React.FC<TopNavProps> = ({
  searchTerm,
  setSearchTerm,
  onOpenMobileMenu,
  title
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Stok Menipis!',
      desc: 'Americano Hot tersisa 2 item',
      time: '5 mnt lalu',
      type: 'warning'
    },
    {
      id: 2,
      title: 'Transaksi Sukses #TRX-0982',
      desc: 'Rp 165.000 via QRIS',
      time: '12 mnt lalu',
      type: 'success'
    },
    {
      id: 3,
      title: 'Laporan Harian Siap',
      desc: 'Ringkasan shift pagi telah dikompilasi',
      time: '1 jam lalu',
      type: 'info'
    }
  ]);

  return (
    <header
      id="top-nav-bar"
      className="fixed top-0 right-0 left-0 md:left-[260px] h-16 flex justify-between items-center px-4 md:px-6 z-40 bg-white/90 backdrop-blur-md border-b border-[#EEEEEE]"
    >
      {/* Left: Mobile Menu button or Title */}
      <div className="flex items-center gap-3">
        <button
          id="btn-mobile-menu-open"
          onClick={onOpenMobileMenu}
          className="md:hidden p-2 text-[#4c4546] hover:text-[#1b1c1c] rounded-lg hover:bg-gray-100"
          aria-label="Buka Menu"
        >
          <Menu className="w-6 h-6" />
        </button>

        {title ? (
          <h2 className="text-lg font-bold text-[#1b1c1c] md:hidden">{title}</h2>
        ) : (
          <div className="flex items-center gap-2 md:hidden">
            <span className="font-bold text-base text-[#1b1c1c]">KASIRKU</span>
          </div>
        )}

        {/* Desktop Search Bar */}
        <div className="hidden sm:flex items-center bg-[#F5F3F3] rounded-full px-4 py-2 w-72 md:w-96 border border-[#EEEEEE] focus-within:border-[#805062] focus-within:ring-2 focus-within:ring-[#fec1d6]/50 transition-all">
          <Search className="w-4 h-4 text-[#7e7576] mr-2.5 shrink-0" />
          <input
            id="global-search-input"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari pesanan, produk, atau pelanggan..."
            className="bg-transparent border-none focus:outline-none w-full text-sm text-[#1b1c1c] placeholder:text-[#848484] p-0"
          />
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3 md:gap-4 relative">
        {/* Notifications Button */}
        <div className="relative">
          <button
            id="btn-notifications-toggle"
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileMenu(false);
            }}
            className="p-2 rounded-full text-[#4c4546] hover:bg-[#F5F3F3] hover:text-[#1b1c1c] transition-all relative"
            aria-label="Notifikasi"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[#fec1d6] border-2 border-white rounded-full"></span>
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div
              id="notifications-dropdown-menu"
              className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-[#EEEEEE] p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
            >
              <div className="flex justify-between items-center pb-2 mb-2 border-b border-gray-100">
                <span className="font-semibold text-sm text-gray-900">Notifikasi</span>
                <button
                  onClick={() => setNotifications([])}
                  className="text-xs text-[#805062] hover:underline"
                >
                  Tandai Dibaca
                </button>
              </div>
              <div className="space-y-2 max-h-72 overflow-y-auto">
                {notifications.length === 0 ? (
                  <p className="text-xs text-gray-400 text-center py-4">Tidak ada notifikasi baru</p>
                ) : (
                  notifications.map((n) => (
                    <div
                      key={n.id}
                      className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-gray-50 transition-colors text-left"
                    >
                      {n.type === 'warning' ? (
                        <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      ) : (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-gray-900">{n.title}</p>
                        <p className="text-[11px] text-gray-500 truncate">{n.desc}</p>
                        <span className="text-[10px] text-gray-400">{n.time}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Profile */}
        <div className="relative">
          <button
            id="btn-user-profile-toggle"
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2 p-1 pl-1.5 pr-2.5 rounded-full hover:bg-[#ffd9e4]/30 transition-colors border border-transparent hover:border-[#cfc4c5]"
          >
            <div className="h-8 w-8 rounded-full overflow-hidden border-2 border-[#805062] shrink-0 shadow-2xs">
              <img
                src={ASSETS.profileAvatar}
                alt="Profile Keyzha Founder"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="hidden lg:flex flex-col text-left">
              <div className="flex items-center gap-1">
                <span className="text-xs font-bold text-[#1b1c1c]">Keyzha</span>
                <span className="text-[9px] bg-[#ffd9e4] text-[#805062] font-extrabold px-1.5 py-0.2 rounded-full uppercase tracking-wider">
                  Founder
                </span>
              </div>
              <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                Owner &bull; Online
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400 hidden lg:block" />
          </button>

          {/* Profile Dropdown */}
          {showProfileMenu && (
            <div
              id="profile-dropdown-menu"
              className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-[#EEEEEE] p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
            >
              <div className="px-3 py-2.5 border-b border-gray-100 bg-[#FBF9F8] rounded-xl mb-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-xs font-bold text-gray-900">Keyzha</p>
                  <span className="text-[9px] bg-[#805062] text-white font-bold px-1.5 py-0.2 rounded">
                    Founder
                  </span>
                </div>
                <p className="text-[11px] text-gray-500 truncate">keyzhadigiss@gmail.com</p>
                <p className="text-[10px] text-[#805062] font-semibold mt-0.5">KASIRKU POS Skincare</p>
              </div>
              <div className="py-1 text-xs text-gray-700 space-y-0.5">
                <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 font-medium">
                  Profil Founder
                </button>
                <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 font-medium">
                  Manajemen Shift Kasir
                </button>
                <button className="w-full text-left px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 font-medium">
                  Keluar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
