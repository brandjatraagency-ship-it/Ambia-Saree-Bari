import React, { useState } from 'react';
import {
  Heart,
  Eye,
  Star,
  ShoppingBag,
  Zap,
} from 'lucide-react';
import { Product } from '../types';
import { fallbackImage } from '../data/initialData';

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onDirectOrder: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  onDirectOrder,
  onQuickView,
}) => {
  const [imgSrc, setImgSrc] = useState(product.images[0] || fallbackImage);
  const isOutOfStock = !product.inStock || product.stockCount <= 0;
  const isLowStock = !isOutOfStock && product.stockCount <= 5;

  return (
    <div className={`group bg-[#18080f] rounded-xl border ${isOutOfStock ? 'border-stone-800/70 opacity-90' : 'border-rose-950/80 hover:border-rose-600/70'} overflow-hidden shadow-md hover:shadow-rose-950/40 transition-all duration-300 flex flex-col justify-between h-full`}>
      {/* Product Image Frame */}
      <div
        className="relative aspect-4/5 w-full bg-[#100407] overflow-hidden cursor-pointer"
        onClick={() => onQuickView(product)}
      >
        <img
          src={imgSrc}
          alt={product.name}
          onError={() => setImgSrc(fallbackImage)}
          className={`w-full h-full object-cover object-center ${isOutOfStock ? 'grayscale-[35%]' : 'group-hover:scale-105'} transition-transform duration-500 brightness-105`}
          loading="lazy"
        />

        {/* Discount Badge */}
        {!isOutOfStock && product.discountPercent > 0 && (
          <div className="absolute top-2 left-2 z-10 pointer-events-none">
            <span className="bg-[#00a8ff] text-white text-[10px] sm:text-xs font-black px-2 py-0.5 rounded shadow-sm">
              -{product.discountPercent}%
            </span>
          </div>
        )}

        {/* Out of Stock Overlay / Badge */}
        {isOutOfStock ? (
          <div className="absolute inset-0 z-20 bg-black/55 backdrop-blur-[1px] flex items-center justify-center pointer-events-none">
            <span className="bg-red-600/95 text-white text-xs sm:text-sm font-black px-3 py-1 rounded-full shadow-lg border border-red-400/50 uppercase tracking-wide">
              স্টক শেষ
            </span>
          </div>
        ) : isLowStock ? (
          <div className="absolute top-2 left-2 z-10 pointer-events-none">
            <span className="bg-amber-500 text-stone-950 text-[10px] font-extrabold px-2 py-0.5 rounded shadow-sm animate-pulse">
              মাত্র {product.stockCount}টি বাকি!
            </span>
          </div>
        ) : product.isHotDeal ? (
          <div className="absolute bottom-2 left-2 z-10 pointer-events-none">
            <span className="bg-rose-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-xs">
              হট ডিল 🔥
            </span>
          </div>
        ) : null}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className={`absolute top-2 right-2 z-10 p-1.5 rounded-full backdrop-blur-xs transition-colors cursor-pointer shadow-xs ${
            isWishlisted
              ? 'bg-[#220a14] text-rose-500 border border-rose-600'
              : 'bg-[#18050c]/80 hover:bg-[#250913] text-rose-200 hover:text-rose-400 border border-rose-900/60'
          }`}
          title={isWishlisted ? 'পছন্দ থেকে সরান' : 'পছন্দে যোগ করুন'}
          aria-label="Toggle Wishlist"
        >
          <Heart
            className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-current text-rose-500' : ''}`}
          />
        </button>

        {/* Hover Quick View Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onQuickView(product);
          }}
          className="absolute inset-x-2 bottom-2 py-1.5 bg-[#14050a]/90 hover:bg-[#1f0810] text-rose-100 text-[11px] font-semibold rounded-lg flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-xs cursor-pointer shadow-md border border-rose-800/60"
        >
          <Eye className="w-3.5 h-3.5 text-amber-300" />
          <span>এক নজরে দেখুন</span>
        </button>
      </div>

      {/* Details Box */}
      <div className="p-3 sm:p-3.5 flex flex-col flex-1 justify-between bg-[#18080f] text-center">
        <div>
          <div className="flex items-center justify-between gap-1 text-[10px] text-rose-300/80 mb-1">
            <span className="font-mono font-semibold bg-[#260c16] border border-rose-900/60 px-1.5 py-0.5 rounded text-rose-200">
              {product.code}
            </span>
            <div className="flex items-center gap-0.5 text-amber-400 font-bold">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
            </div>
          </div>

          <h3
            onClick={() => onQuickView(product)}
            className="font-semibold text-xs sm:text-[13px] text-stone-100 line-clamp-2 hover:text-rose-400 transition-colors cursor-pointer leading-snug min-h-[34px]"
            title={product.name}
          >
            {product.name}
          </h3>

          <div className="mt-2 flex items-baseline justify-center gap-2 text-xs sm:text-sm">
            {product.originalPrice > product.price && (
              <span className="text-stone-400 line-through text-[11px] sm:text-xs">
                ৳{product.originalPrice.toLocaleString()}
              </span>
            )}
            <span className="font-extrabold text-amber-400 text-sm sm:text-base font-['Anek_Bangla']">
              ৳ {product.price.toLocaleString()}
            </span>
          </div>

          {product.colors && product.colors.length > 0 && (
            <div className="mt-1.5 flex items-center justify-center gap-1">
              {product.colors.slice(0, 3).map((col, idx) => (
                <span
                  key={idx}
                  className="w-2.5 h-2.5 rounded-full border border-rose-900/80 shadow-2xs"
                  style={{ backgroundColor: col.hex }}
                  title={col.name}
                />
              ))}
              {product.colors.length > 3 && (
                <span className="text-[9px] text-stone-400 font-mono">
                  +{product.colors.length - 3}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="mt-3 space-y-1.5">
          {isOutOfStock ? (
            <div className="py-2.5 px-3 bg-stone-900/90 border border-stone-800 text-stone-400 text-xs font-bold rounded-lg text-center select-none">
              স্টক শেষ (Out of Stock)
            </div>
          ) : (
            <>
              <button
                onClick={() => onAddToCart(product)}
                className="w-full py-2 bg-gradient-to-r from-rose-700 via-rose-600 to-rose-700 hover:from-rose-600 hover:to-rose-500 text-white text-xs font-bold rounded-lg shadow-md hover:shadow-rose-700/30 transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 border border-rose-500/50"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add to cart</span>
              </button>
              <button
                onClick={() => onDirectOrder(product)}
                className="w-full py-1.5 bg-[#250a14] hover:bg-[#320e1b] text-amber-300 border border-amber-400/40 text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer active:scale-95"
              >
                <Zap className="w-3 h-3 fill-amber-400 text-amber-400" />
                <span>সরাসরি অর্ডার</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
