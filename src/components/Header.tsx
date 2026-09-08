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
} from 'lucide-react';
import { StoreSettings } from '../types';

interface HeaderProps {
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

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
              onClick={onOpenTracking}
              className="hover:text-emerald-400 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <PackageCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">ট্র্যাকিং</span>
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
                className="md:hidden p-2 text-rose-200 hover:text-white hover:bg-rose-950/60 rounded-lg cursor-pointer transition-colors"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>

              <a
                href="#"
                className="flex items-center group py-1 select-none"
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
                  <span className="font-['Playfair_Display',serif] font-black text-xl sm:text-2xl md:text-[28px] tracking-tight text-white group-hover:text-amber-200 transition-colors leading-none drop-shadow-sm whitespace-nowrap">
                    Ambia Saree Bari
                  </span>
                )}
              </a>
            </div>

            {/* Desktop Navigation links */}
            <nav className="hidden md:flex items-center gap-8 text-sm font-semibold">
              <a href="#" className="text-white hover:text-rose-400 transition-colors">
                Home
              </a>
              <a
                href="#products"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('products');
                }}
                className="text-rose-200 hover:text-white transition-colors cursor-pointer"
              >
                Shop
              </a>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('contact');
                }}
                className="text-rose-200 hover:text-white transition-colors cursor-pointer"
              >
                Contact us
              </a>
              <button
                onClick={onOpenTracking}
                className="text-rose-200 hover:text-emerald-400 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <PackageCheck className="w-4 h-4 text-emerald-400" />
                <span>অর্ডার ট্র্যাকিং</span>
              </button>
            </nav>

            {/* Right Action Buttons */}
            <div className="flex items-center gap-1.5 sm:gap-3">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
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
                href={`https://wa.me/${whatsapp}?text=${encodeURIComponent('হ্যালো, আমি গার্লস ফ্যাশন থেকে শাড়ি অর্ডার করতে চাই।')}`}
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
                  onChange={(e) => setSearchQuery(e.target.value)}
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
        <div className="md:hidden bg-[#16050b] border-t border-rose-950 px-4 py-4 space-y-2.5 shadow-2xl">
          <a
            href="#"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-stone-100 hover:text-rose-400 border-b border-rose-950/80"
          >
            Home
          </a>
          <a
            href="#products"
            onClick={(e) => {
              e.preventDefault();
              setMobileMenuOpen(false);
              scrollToSection('products');
            }}
            className="block py-2 text-sm font-semibold text-stone-100 hover:text-rose-400 border-b border-rose-950/80"
          >
            Shop (সব শাড়ি)
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              setMobileMenuOpen(false);
              scrollToSection('contact');
            }}
            className="block py-2 text-sm font-semibold text-stone-100 hover:text-rose-400 border-b border-rose-950/80"
          >
            Contact us (যোগাযোগ)
          </a>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenTracking();
            }}
            className="w-full text-left py-2 text-sm font-semibold text-emerald-400 flex items-center gap-2 border-b border-rose-950/80 cursor-pointer"
          >
            <PackageCheck className="w-4 h-4 text-emerald-400" />
            <span>অর্ডার ট্র্যাকিং</span>
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenAdmin();
            }}
            className="w-full text-left py-2 text-sm font-semibold text-rose-300 flex items-center gap-2 cursor-pointer"
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>অ্যাডমিন ও মার্চেন্ট প্যানেল</span>
          </button>
          <div className="pt-2">
            <a
              href={`https://wa.me/${whatsapp}?text=${encodeURIComponent('হ্যালো, আমি গার্লস ফ্যাশন থেকে শাড়ি অর্ডার করতে চাই।')}`}
              target="_blank"
              rel="noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-[#25d366] text-white py-2 rounded-lg font-bold text-xs shadow-xs"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>হোয়াটসঅ্যাপে অর্ডার করুন ({phone})</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
