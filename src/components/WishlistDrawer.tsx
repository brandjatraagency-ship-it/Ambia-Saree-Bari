import React from 'react';
import { Heart, X, Trash2, Zap, ShoppingBag } from 'lucide-react';
import { Product } from '../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: Product[];
  onRemoveWishlist: (productId: string) => void;
  onAddToCart: (product: Product) => void;
  onDirectOrder: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlist,
  onRemoveWishlist,
  onAddToCart,
  onDirectOrder,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-600 fill-current" />
            <h3 className="font-['Anek_Bangla'] font-bold text-lg text-stone-900">
              পছন্দের তালিকা ({wishlist.length} টি)
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-stone-500 hover:bg-stone-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {wishlist.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-stone-500 space-y-3">
              <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center text-red-400">
                <Heart className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-base text-stone-700">
                কোনো শাড়ি পছন্দের তালিকায় নেই
              </h4>
              <p className="text-xs max-w-xs">
                শাড়ির ওপরের হার্ট আইকনে ক্লিক করে আপনার প্রিয় শাড়িগুলো পরবর্তীতে দেখার জন্য সেভ করে রাখুন।
              </p>
            </div>
          ) : (
            <div className="space-y-3 divide-y divide-stone-100">
              {wishlist.map((item) => (
                <div key={item.id} className="pt-3 first:pt-0 flex gap-3 items-center">
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-16 h-20 object-cover rounded-lg border border-stone-200 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h4 className="font-semibold text-xs sm:text-sm text-stone-900 truncate">
                        {item.name}
                      </h4>
                      <button
                        onClick={() => onRemoveWishlist(item.id)}
                        className="text-stone-400 hover:text-red-600 p-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-[11px] text-stone-500 font-mono mt-0.5">
                      কোড: {item.code}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="font-bold text-[#8b1528] text-sm font-['Anek_Bangla']">
                        ৳{item.price.toLocaleString()}
                      </span>
                      {item.originalPrice > item.price && (
                        <span className="text-xs text-stone-400 line-through">
                          ৳{item.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => {
                          onDirectOrder(item);
                          onClose();
                        }}
                        className="px-2.5 py-1 bg-[#8b1528] text-white text-[11px] font-bold rounded-md hover:bg-[#721020] flex items-center gap-1 cursor-pointer"
                      >
                        <Zap className="w-3 h-3 text-amber-300 fill-current" />
                        <span>অর্ডার</span>
                      </button>
                      <button
                        onClick={() => onAddToCart(item)}
                        className="px-2.5 py-1 bg-stone-100 text-stone-800 text-[11px] font-semibold rounded-md hover:bg-stone-200 border border-stone-200 flex items-center gap-1 cursor-pointer"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        <span>কার্টে নিন</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
