import React, { useState } from 'react';
import {
  Crown,
  Search,
  User,
  Heart,
  ShoppingBag,
  MessageCircle,
  X,
  Menu,
  PackageCheck,
  LayoutDashboard,
  Phone,
  Sparkles,
  Info,
  PhoneCall,
  Star,
} from 'lucide-react';
import { StoreSettings, PageRoute } from '../types';

interface HeaderProps {
  currentPage: PageRoute;
  onNavigate: (page: PageRoute) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenTracking: () => void;
  onOpenAdmin: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory?: string;
  onSelectCategory?: (category: string) => void;
  cartTotal?: number;
  storeSettings?: StoreSettings;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenTracking,
  onOpenAdmin,
  searchQuery,
  setSearchQuery,
  storeSettings,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const phone = storeSettings?.phone || '01796962283';
  const whatsapp = storeSettings?.whatsapp || '8801796962283';
  const announcement =
    storeSettings?.announcementText ||
    'সারা বাংলাদেশে ক্যাশ অন ডেলিভারি সুবিধা | ২-৩ দিনে হোম ডেলিভারি | দেখে নিয়ে মূল্য পরিশোধ';

  const handleNav = (page: PageRoute) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  const navLinks: { id: PageRoute; label: string; badge?: string }[] = [
    { id: 'home', label: 'হোম' },
    { id: 'shop', label: 'শপ (সব শাড়ি)' },
    { id: 'tracking', label: 'ট্র্যাকিং' },
    { id: 'reviews', label: 'রিভিউ' },
    { id: 'care', label: 'শাড়ির যত্ন' },
    { id: 'about', label: 'আমাদের গল্প' },
    { id: 'contact', label: 'যোগাযোগ' },
  ];

  return (
    <header className="sticky top-0 z-50 shadow-xs">
      {/* Top Announcement Bar */}
      <div className="bg-[#1f050c] text-rose-200 text-[11px] sm:text-xs py-1.5 px-4 sm:px-6 border-b border-rose-950/80">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 truncate">
            <Crown className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="truncate text-rose-100">{announcement}</span>
          </div>
          <div className="flex items-center gap-4 shrink-0 text-[11px] font-medium">
            <a
              href={`tel:${phone}`}
              className="hidden sm:flex items-center gap-1 text-rose-200 hover:text-white transition-colors"
            >
              <Phone className="w-3 h-3 text-amber-400" />
              <span>হটলাইন: {phone}</span>
            </a>
            <button
              onClick={() => handleNav('tracking')}
              className={`hover:text-emerald-300 transition-colors flex items-center gap-1 cursor-pointer ${
                currentPage === 'tracking' ? 'text-emerald-300 font-bold' : 'text-emerald-400'
              }`}
            >
              <PackageCheck className="w-3.5 h-3.5" />
              <span>অর্ডার ট্র্যাক</span>
            </button>
            <button
              onClick={onOpenAdmin}
              className="hover:text-amber-300 transition-colors flex items-center gap-1 cursor-pointer text-stone-300"
            >
              <User className="w-3 h-3 text-rose-400" />
              <span>মার্চেন্ট</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="bg-[#120509]/95 backdrop-blur-md border-b border-rose-950/80 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Left Hamburger + Brand */}
            <div className="flex items-center gap-3 sm:gap-4">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-rose-200 hover:text-white hover:bg-rose-950/60 rounded-lg cursor-pointer transition-colors"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>

              <button
                onClick={() => handleNav('home')}
                className="flex items-center group py-1 select-none cursor-pointer text-left"
                aria-label="Ambia Saree Bari"
              >
                {storeSettings?.logoType === 'image' && storeSettings?.logoUrl ? (
                  <img
                    src={storeSettings.logoUrl}
                    alt="Ambia Saree Bari"
                    className="h-10 sm:h-12 max-w-[180px] object-contain drop-shadow-sm"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                ) : (
                  <span className="font-['Playfair_Display',serif] font-black text-xl sm:text-2xl md:text-[26px] tracking-tight text-white group-hover:text-amber-200 transition-colors leading-none drop-shadow-sm whitespace-nowrap">
                    Ambia Saree Bari
                  </span>
                )}
              </button>
            </div>

            {/* Desktop Navigation links */}
            <nav className="hidden lg:flex items-center gap-5 xl:gap-7 text-xs xl:text-sm font-semibold">
              {navLinks.map((link) => {
                const isActive = currentPage === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNav(link.id)}
                    className={`relative py-1.5 transition-colors cursor-pointer select-none ${
                      isActive
                        ? 'text-white font-bold'
                        : 'text-rose-200/85 hover:text-white'
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-rose-500 via-amber-400 to-rose-500 rounded-full" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Right Action Buttons */}
            <div className="flex items-center gap-1 sm:gap-2.5">
              <button
                onClick={() => {
                  setSearchOpen(!searchOpen);
                  if (!searchOpen && currentPage !== 'shop') {
                    // navigate to shop when user starts searching
                    onNavigate('shop');
                  }
                }}
                className="p-2 text-rose-200 hover:text-white hover:bg-rose-950/60 rounded-full transition-colors cursor-pointer"
                title="শাড়ি খুঁজুন"
                aria-label="Search sarees"
              >
                <Search className="w-5 h-5" />
              </button>

              <button
                onClick={onOpenAdmin}
                className="hidden sm:flex items-center p-2 text-rose-200 hover:text-white hover:bg-rose-950/60 rounded-full transition-colors cursor-pointer"
                title="অ্যাকাউন্ট ও মার্চেন্ট প্যানেল"
                aria-label="Admin panel"
              >
                <User className="w-5 h-5" />
              </button>

              <button
                onClick={onOpenWishlist}
                className="relative p-2 text-rose-200 hover:text-rose-400 hover:bg-rose-950/60 rounded-full transition-colors cursor-pointer"
                title="পছন্দের তালিকা"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-rose-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-xs">
                    {wishlistCount}
                  </span>
                )}
              </button>

              <button
                onClick={onOpenCart}
                className="relative p-2 text-rose-100 hover:text-amber-300 hover:bg-rose-950/60 rounded-full transition-colors cursor-pointer flex items-center gap-1.5"
                title="শপিং ব্যাগ"
                aria-label="Shopping Cart"
              >
                <ShoppingBag className="w-5 h-5 text-rose-400" />
                <span className="text-xs font-bold text-amber-300 font-mono">
                  ({cartCount})
                </span>
              </button>

              <a
                href={`https://wa.me/${whatsapp}?text=${encodeURIComponent('হ্যালো, আমি আম্বিয়া শাড়ি বাড়ি থেকে শাড়ি অর্ডার করতে চাই।')}`}
                target="_blank"
                rel="noreferrer"
                className="hidden xl:flex items-center gap-1.5 bg-[#25d366] hover:bg-[#20ba5a] text-white text-xs font-bold px-3.5 py-1.5 rounded-full shadow-xs transition-transform active:scale-95 cursor-pointer ml-1"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-current" />
                <span className="font-mono text-[11px]">{phone}</span>
              </a>
            </div>
          </div>

          {/* Expandable Live Search Bar */}
          {searchOpen && (
            <div className="py-2.5 pb-3 border-t border-rose-950/80 animate-in fade-in slide-in-from-top-1">
              <div className="relative max-w-xl mx-auto">
                <input
                  type="text"
                  autoFocus
                  placeholder="শাড়ির নাম, জামদানি, ল্যামা সিল্ক, তাঁত বা কোড দিয়ে খুঁজুন..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    if (currentPage !== 'shop') {
                      onNavigate('shop');
                    }
                  }}
                  className="w-full pl-10 pr-24 py-2 bg-[#1c0810] text-stone-100 border border-rose-900/60 rounded-full text-xs sm:text-sm outline-hidden focus:border-rose-500 focus:bg-[#240c16] transition-all shadow-inner placeholder:text-stone-400"
                />
                <Search className="w-4 h-4 text-rose-400 absolute left-3.5 top-2.5" />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-14 top-2 text-xs text-rose-300 hover:text-white"
                  >
                    ✕
                  </button>
                )}
                <button
                  onClick={() => setSearchOpen(false)}
                  className="absolute right-1.5 top-1 px-3 py-1 bg-rose-950 hover:bg-rose-900 text-rose-200 text-xs font-semibold rounded-full cursor-pointer border border-rose-800/60"
                >
                  বন্ধ
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Collapsible Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#16050b] border-t border-rose-950 px-4 py-4 space-y-1.5 shadow-2xl">
          {navLinks.map((link) => {
            const isActive = currentPage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNav(link.id)}
                className={`w-full text-left py-2 px-2.5 text-sm font-semibold rounded-xl flex items-center justify-between border-b border-rose-950/80 cursor-pointer ${
                  isActive
                    ? 'bg-rose-950/60 text-white font-bold text-amber-300'
                    : 'text-stone-100 hover:text-rose-400'
                }`}
              >
                <span>{link.label}</span>
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />}
              </button>
            );
          })}

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenAdmin();
            }}
            className="w-full text-left py-2 px-2.5 text-sm font-semibold text-rose-300 flex items-center gap-2 cursor-pointer border-b border-rose-950/80"
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>অ্যাডমিন ও মার্চেন্ট প্যানেল</span>
          </button>

          <div className="pt-2">
            <a
              href={`https://wa.me/${whatsapp}?text=${encodeURIComponent('হ্যালো, আমি আম্বিয়া শাড়ি বাড়ি থেকে শাড়ি অর্ডার করতে চাই।')}`}
              target="_blank"
              rel="noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-[#25d366] text-white py-2 rounded-xl font-bold text-xs shadow-xs"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>হোয়াটসঅ্যাপে যোগাযোগ ({phone})</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
