import React, { useState } from 'react';
import {
  X,
  Star,
  Zap,
  ShoppingBag,
  MessageCircle,
  Truck,
  ShieldCheck,
} from 'lucide-react';
import { Product } from '../types';

interface ProductQuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, selectedColor?: string) => void;
  onDirectOrder: (product: Product, quantity: number, selectedColor?: string) => void;
}

export const ProductQuickViewModal: React.FC<ProductQuickViewModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  onDirectOrder,
}) => {
  if (!isOpen || !product) return null;

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(
    product.colors?.[0]?.name || '',
  );
  const [quantity, setQuantity] = useState(1);

  const handleDirectOrder = () => {
    onDirectOrder(product, quantity, selectedColor);
    onClose();
  };

  const handleAddToCart = () => {
    onAddToCart(product, quantity, selectedColor);
    onClose();
  };

  const whatsappInquiryUrl = `https://wa.me/8801796962283?text=${encodeURIComponent(
    `আসসালামু আলাইকুম! আমি "${product.name}" (কোড: ${product.code}) শাড়িটি সম্পর্কে জানতে ও অর্ডার করতে চাই।`,
  )}`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-4xl bg-[#18080f] text-stone-100 rounded-2xl shadow-2xl overflow-hidden my-6 max-h-[92vh] flex flex-col border border-rose-950/90">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-[#280916] hover:bg-[#3a0d20] text-rose-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer border border-rose-800/60 shadow-md"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="overflow-y-auto p-4 sm:p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* Left: Gallery */}
            <div className="space-y-3">
              <div className="relative aspect-4/5 rounded-xl overflow-hidden bg-[#100307] border border-rose-950">
                <img
                  src={product.images[selectedImageIndex] || product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover object-center"
                />
                {product.discountPercent > 0 && (
                  <span className="absolute top-3 left-3 bg-gradient-to-r from-rose-700 to-rose-600 text-white text-xs font-bold px-2.5 py-1 rounded shadow-md border border-rose-500/40">
                    -{product.discountPercent}% ছাড়
                  </span>
                )}
                <span className="absolute bottom-3 left-3 bg-[#100307]/90 backdrop-blur-xs text-amber-300 font-mono text-xs font-bold px-2.5 py-1 rounded border border-rose-900/50">
                  কোড: {product.code}
                </span>
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`relative w-16 h-20 rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                        selectedImageIndex === idx
                          ? 'border-rose-500 shadow-md scale-95'
                          : 'border-rose-950 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img}
                        alt="thumbnail"
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Info & Specs */}
            <div className="flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className="bg-[#240814] border border-rose-800/60 text-rose-300 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                    {product.categoryName}
                  </span>
                  <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{product.rating}</span>
                    <span className="text-rose-300/70">
                      ({product.reviewCount} টি রিভিউ)
                    </span>
                  </div>
                  {product.inStock && product.stockCount > 0 ? (
                    <span className="bg-emerald-950/80 text-emerald-300 border border-emerald-800/80 px-2.5 py-0.5 rounded-full text-[11px] font-bold">
                      ইন স্টক ({product.stockCount}টি উপলব্ধ)
                    </span>
                  ) : (
                    <span className="bg-red-950/90 text-red-300 border border-red-800/90 px-2.5 py-0.5 rounded-full text-[11px] font-bold">
                      স্টক শেষ (Out of Stock)
                    </span>
                  )}
                </div>

                <h2 className="font-['Anek_Bangla'] text-xl sm:text-2xl font-bold text-stone-100 leading-tight">
                  {product.name}
                </h2>
                {product.nameEn && (
                  <p className="text-xs text-rose-300/80 mt-1 font-medium">
                    {product.nameEn}
                  </p>
                )}

                {/* Price block */}
                <div className="mt-3 flex items-baseline gap-3 p-3 bg-[#200812] rounded-xl border border-rose-900/60 shadow-xs">
                  <span className="font-['Anek_Bangla'] text-2xl sm:text-3xl font-black text-rose-400">
                    ৳{product.price.toLocaleString()}
                  </span>
                  {product.originalPrice > product.price && (
                    <span className="text-sm sm:text-base text-stone-400 line-through">
                      ৳{product.originalPrice.toLocaleString()}
                    </span>
                  )}
                  {product.originalPrice > product.price && (
                    <span className="text-xs font-bold text-emerald-300 bg-emerald-950/80 border border-emerald-800/80 px-2 py-0.5 rounded">
                      আপনার সাশ্রয় ৳
                      {(product.originalPrice - product.price).toLocaleString()}
                    </span>
                  )}
                </div>

                {/* Colors */}
                {product.colors && product.colors.length > 0 && (
                  <div className="mt-4">
                    <label className="text-xs font-bold text-stone-200 block mb-1.5">
                      রঙ নির্বাচন করুন:{' '}
                      <span className="text-rose-400 font-semibold">
                        {selectedColor}
                      </span>
                    </label>
                    <div className="flex items-center gap-2 flex-wrap">
                      {product.colors.map((c, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedColor(c.name)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all cursor-pointer ${
                            selectedColor === c.name
                              ? 'border-rose-500 bg-[#280916] text-rose-300 font-bold ring-1 ring-rose-500 shadow-xs'
                              : 'border-rose-950 text-stone-300 hover:border-rose-800 bg-[#120409]'
                          }`}
                        >
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-stone-600 shrink-0"
                            style={{ backgroundColor: c.hex }}
                          />
                          <span>{c.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Specifications table */}
                <div className="mt-4 bg-[#120409] rounded-xl p-3 border border-rose-950/90 text-xs space-y-2">
                  <div className="grid grid-cols-3 gap-2 py-1 border-b border-rose-950/80">
                    <span className="text-rose-300/70 font-medium">ফেব্রিক:</span>
                    <span className="col-span-2 font-semibold text-stone-200">
                      {product.fabric}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 py-1 border-b border-rose-950/80">
                    <span className="text-rose-300/70 font-medium">শাড়ির দৈর্ঘ্য:</span>
                    <span className="col-span-2 font-semibold text-stone-200">
                      {product.length}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 py-1 border-b border-rose-950/80">
                    <span className="text-rose-300/70 font-medium">ব্লাউজ পিস:</span>
                    <span className="col-span-2 font-semibold text-stone-200">
                      {product.blousePiece}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 py-1 border-b border-rose-950/80">
                    <span className="text-rose-300/70 font-medium">আঁচলের কাজ:</span>
                    <span className="col-span-2 font-semibold text-stone-200">
                      {product.anchalDetail}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 py-1">
                    <span className="text-rose-300/70 font-medium">পাড়ের কাজ:</span>
                    <span className="col-span-2 font-semibold text-stone-200">
                      {product.parDetail}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <div className="mt-3 text-xs sm:text-sm text-stone-300 leading-relaxed">
                  <p>{product.description}</p>
                </div>
              </div>

              {/* Order Controls */}
              <div className="pt-3 border-t border-rose-950/90 space-y-3">
                {product.inStock && product.stockCount > 0 ? (
                  <>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-stone-200">পরিমাণ:</span>
                      <div className="flex items-center border border-rose-900/60 rounded-lg overflow-hidden bg-[#120409]">
                        <button
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="px-3 py-1 bg-[#200812] hover:bg-[#2e0c1a] text-rose-200 font-bold transition-colors cursor-pointer"
                        >
                          -
                        </button>
                        <span className="px-4 py-1 text-sm font-bold text-stone-100">
                          {quantity}
                        </span>
                        <button
                          onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                          className="px-3 py-1 bg-[#200812] hover:bg-[#2e0c1a] text-rose-200 font-bold transition-colors cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-xs text-rose-300/80 ml-auto">
                        মোট:{' '}
                        <strong className="text-amber-400 font-bold">
                          ৳{(product.price * quantity).toLocaleString()}
                        </strong>
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <button
                        onClick={handleDirectOrder}
                        className="py-3 px-4 bg-gradient-to-r from-rose-700 via-rose-600 to-rose-700 hover:from-rose-600 hover:to-rose-500 text-white font-bold text-sm sm:text-base rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer border border-rose-500/40 active:scale-95"
                      >
                        <Zap className="w-4 h-4 fill-current text-amber-300" />
                        <span>সরাসরি অর্ডার করুন</span>
                      </button>
                      <button
                        onClick={handleAddToCart}
                        className="py-3 px-4 bg-[#250914] hover:bg-[#320b1b] text-rose-200 font-semibold text-sm sm:text-base rounded-xl transition-all border border-rose-800/70 flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                      >
                        <ShoppingBag className="w-4 h-4 text-rose-400" />
                        <span>কার্টে যোগ করুন</span>
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="p-3 bg-red-950/40 border border-red-800/60 rounded-xl text-center space-y-1">
                    <p className="text-red-300 font-bold text-sm">
                      দুঃখিত, এই শাড়িটি বর্তমানে স্টক আউট (Stock Out)
                    </p>
                    <p className="text-stone-300 text-xs">
                      নতুন স্টক আসলে জানতে অথবা প্রি-অর্ডার করতে হোয়াটসঅ্যাপে আমাদের সাথে কথা বলুন।
                    </p>
                  </div>
                )}

                <a
                  href={whatsappInquiryUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 px-4 bg-emerald-950/70 hover:bg-emerald-900/80 text-emerald-300 border border-emerald-800/80 text-xs sm:text-sm font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>হোয়াটসঅ্যাপে এই শাড়িটি সম্পর্কে কথা বলুন</span>
                </a>

                <div className="flex items-center justify-between text-[11px] text-rose-300/70 pt-1">
                  <span className="flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5 text-rose-400" />
                    ঢাকার ভেতরে ৮০৳ | বাইরে ১৫০৳
                  </span>
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    ক্যাশ অন ডেলিভারি
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
