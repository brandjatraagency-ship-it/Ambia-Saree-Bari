import React from 'react';
import {
  ShoppingBag,
  X,
  Truck,
  Trash2,
  Zap,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onProceedToCheckout: () => void;
  onClearCart?: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  onClearCart,
}) => {
  if (!isOpen) return null;

  const totalQuantity = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce(
    (sum, i) => sum + i.product.price * i.quantity,
    0,
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between transform transition-transform duration-300">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#8b1528]" />
            <h3 className="font-['Anek_Bangla'] font-bold text-lg text-stone-900">
              আপনার শপিং ব্যাগ ({totalQuantity} টি)
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
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-stone-500 space-y-3">
              <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-400">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-base text-stone-700">
                আপনার ব্যাগ খালি
              </h4>
              <p className="text-xs max-w-xs">
                আমাদের এক্সক্লুসিভ টাঙ্গাইল তাঁত ও ল্যামা সিল্ক কালেকশন থেকে আপনার পছন্দের শাড়িটি কার্টে যোগ করুন।
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-5 py-2 bg-[#8b1528] text-white text-xs font-bold rounded-full hover:bg-[#721020] transition-colors cursor-pointer"
              >
                শাড়ি কালেকশন দেখুন
              </button>
            </div>
          ) : (
            <>
              <div className="p-2.5 bg-red-50 border border-red-100 rounded-lg text-xs text-[#8b1528] flex items-center gap-2">
                <Truck className="w-4 h-4 shrink-0" />
                <span>সারা বাংলাদেশে ক্যাশ অন ডেলিভারি সুবিধা চালু রয়েছে!</span>
              </div>

              <div className="space-y-3 divide-y divide-stone-100">
                {items.map((item, idx) => (
                  <div
                    key={idx}
                    className={`flex gap-3 ${idx > 0 ? 'pt-3' : ''}`}
                  >
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-16 h-20 object-cover rounded-lg border border-stone-200 shrink-0"
                    />
                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div>
                        <div className="flex justify-between items-start gap-1">
                          <h4 className="font-semibold text-xs sm:text-sm text-stone-900 truncate">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => onRemoveItem(item.product.id)}
                            className="text-stone-400 hover:text-red-600 transition-colors p-1 cursor-pointer"
                            title="মুছে ফেলুন"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-[11px] text-stone-500 font-mono">
                          কোড: {item.product.code}{' '}
                          {item.selectedColor ? `| ${item.selectedColor}` : ''}
                        </p>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center border border-stone-200 rounded bg-stone-50 text-xs">
                          <button
                            onClick={() =>
                              onUpdateQuantity(
                                item.product.id,
                                Math.max(1, item.quantity - 1),
                              )
                            }
                            className="px-2 py-0.5 hover:bg-stone-200 font-bold cursor-pointer"
                          >
                            -
                          </button>
                          <span className="px-2.5 py-0.5 font-bold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              onUpdateQuantity(
                                item.product.id,
                                item.quantity + 1,
                              )
                            }
                            className="px-2 py-0.5 hover:bg-stone-200 font-bold cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                        <span className="font-bold text-[#8b1528] text-sm font-['Anek_Bangla']">
                          ৳{(item.product.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Footer Subtotal & Checkout */}
        {items.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-stone-200 bg-stone-50 space-y-3">
            <div className="space-y-1.5 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>পণ্যের মূল্য (সাবটোটাল):</span>
                <span className="font-semibold text-stone-900">
                  ৳{subtotal.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-stone-500 text-[11px]">
                <span>ডেলিভারি চার্জ:</span>
                <span>চেকআউটে এলাকা অনুযায়ী যোগ হবে</span>
              </div>
              <div className="pt-2 border-t border-stone-200 flex justify-between text-base font-bold text-stone-900">
                <span>সর্বমোট:</span>
                <span className="text-[#8b1528] font-['Anek_Bangla'] text-xl font-extrabold">
                  ৳{subtotal.toLocaleString()}
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                onProceedToCheckout();
              }}
              className="w-full py-3 px-4 bg-[#8b1528] hover:bg-[#721020] text-white font-bold text-sm sm:text-base rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <Zap className="w-4 h-4 fill-current text-amber-300" />
              <span>সরাসরি অর্ডার করতে এগিয়ে যান</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-between text-[11px] text-stone-500 pt-1">
              {onClearCart && (
                <button
                  onClick={onClearCart}
                  className="hover:text-red-600 underline cursor-pointer"
                >
                  সব মুছে ফেলুন
                </button>
              )}
              <span className="flex items-center gap-1 text-emerald-700 font-medium ml-auto">
                <ShieldCheck className="w-3.5 h-3.5" /> ১০০% নিরাপদ ক্যাশ অন ডেলিভারি
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
