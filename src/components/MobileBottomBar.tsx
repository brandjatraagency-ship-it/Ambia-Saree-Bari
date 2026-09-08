import React, { useState } from 'react';
import {
  Home,
  PackageCheck,
  PhoneCall,
  Heart,
  ShoppingBag,
  MessageCircle,
  X,
} from 'lucide-react';
import { StoreSettings } from '../types';

interface MobileBottomBarProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenTracking: () => void;
  onScrollToTop: () => void;
  storeSettings?: StoreSettings;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenTracking,
  onScrollToTop,
  storeSettings,
}) => {
  const [showSupportPrompt, setShowSupportPrompt] = useState(true);
  const phone = storeSettings?.phone || '01796962283';
  const whatsapp = storeSettings?.whatsapp || '8801796962283';
  const storeName = storeSettings?.storeName || 'আম্বিয়া শাড়ি বাড়ি';

  return (
    <>
      {/* Floating WhatsApp Quick Action Button */}
      <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40 flex flex-col items-end gap-2">
        {showSupportPrompt && (
          <div className="bg-[#18080f] rounded-2xl p-3 shadow-2xl border border-rose-900/80 max-w-xs text-xs relative animate-fade-in text-stone-200">
            <button
              onClick={() => setShowSupportPrompt(false)}
              className="absolute top-2 right-2 text-rose-400 hover:text-white cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <strong className="text-stone-100 font-bold truncate max-w-[200px]">
                {storeName} সাপোর্ট
              </strong>
            </div>
            <p className="text-rose-200/80 text-[11px] leading-tight">
              আসসালামু আলাইকুম! শাড়ি সম্পর্কে যেকোনো প্রশ্ন বা সরাসরি অর্ডারের জন্য WhatsApp-এ নক দিন।
            </p>
          </div>
        )}

        <a
          href={`https://wa.me/${whatsapp}?text=${encodeURIComponent(`Hello ${storeName}`)}`}
          target="_blank"
          rel="noreferrer"
          className="w-13 h-13 sm:w-14 sm:h-14 bg-[#25d366] hover:bg-[#20ba5a] text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all transform hover:scale-105 border border-emerald-400/40 cursor-pointer"
          title="WhatsApp এ কথা বলুন"
        >
          <MessageCircle className="w-7 h-7 fill-current" />
        </a>
      </div>

      {/* Mobile Fixed Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#120509]/95 backdrop-blur-md border-t border-rose-950 py-1.5 px-2 shadow-2xl">
        <div className="grid grid-cols-5 gap-1 text-center">
          <button
            onClick={onScrollToTop}
            className="flex flex-col items-center justify-center py-1 text-rose-200 hover:text-white cursor-pointer active:scale-95 transition-transform"
          >
            <Home className="w-5 h-5" />
            <span className="text-[10px] mt-0.5 font-medium">হোম</span>
          </button>

          <button
            onClick={onOpenTracking}
            className="flex flex-col items-center justify-center py-1 text-rose-200 hover:text-emerald-400 cursor-pointer active:scale-95 transition-transform"
          >
            <PackageCheck className="w-5 h-5 text-emerald-400" />
            <span className="text-[10px] mt-0.5 font-medium">ট্র্যাকিং</span>
          </button>

          <a
            href={`tel:${phone}`}
            className="flex flex-col items-center justify-center py-1 text-rose-200 hover:text-amber-300 cursor-pointer active:scale-95 transition-transform"
          >
            <PhoneCall className="w-5 h-5 text-amber-400" />
            <span className="text-[10px] mt-0.5 font-medium">কল করুন</span>
          </a>

          <button
            onClick={onOpenWishlist}
            className="relative flex flex-col items-center justify-center py-1 text-rose-200 hover:text-rose-400 cursor-pointer"
          >
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute top-0 right-3 bg-rose-600 text-white text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold shadow-xs">
                {wishlistCount}
              </span>
            )}
            <span className="text-[10px] mt-0.5 font-medium">পছন্দ</span>
          </button>

          <button
            onClick={onOpenCart}
            className="relative flex flex-col items-center justify-center py-1 text-rose-200 hover:text-rose-400 cursor-pointer"
          >
            <ShoppingBag className="w-5 h-5 text-rose-400" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-3 bg-rose-600 text-white text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold shadow-xs">
                {cartCount}
              </span>
            )}
            <span className="text-[10px] mt-0.5 font-bold text-rose-300">
              ব্যাগ
            </span>
          </button>
        </div>
      </div>
    </>
  );
};
