import React from 'react';
import {
  X,
  CircleCheck,
  MessageCircle,
  PackageCheck,
  Printer,
  Truck,
} from 'lucide-react';
import { Order } from '../types';

interface OrderSuccessModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenTracking: (orderId: string) => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  order,
  isOpen,
  onClose,
  onOpenTracking,
}) => {
  if (!isOpen || !order) return null;

  const handlePrint = () => {
    window.print();
  };

  const whatsappUrl = `https://wa.me/8801796962283?text=${encodeURIComponent(
    `আসসালামু আলাইকুম! আমি আম্বিয়া শাড়ি বাড়ি থেকে অর্ডার করেছি।\nঅর্ডার আইডি: ${order.orderId}\nনাম: ${order.customer.fullName}\nমোবাইল: ${order.customer.phoneNumber}\nঠিকানা: ${order.customer.fullAddress}\nসর্বমোট মূল্য: ৳${order.totalAmount} (ক্যাশ অন ডেলিভারি)`,
  )}`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden my-4 max-h-[95vh] flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-5 sm:p-7 overflow-y-auto space-y-5">
          <div className="text-center pt-2">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3 animate-bounce">
              <CircleCheck className="w-10 h-10" />
            </div>
            <span className="bg-amber-100 text-amber-900 border border-amber-300 font-mono text-xs font-extrabold px-3 py-1 rounded-full">
              অর্ডার আইডি: {order.orderId}
            </span>
            <h2 className="font-['Anek_Bangla'] text-2xl sm:text-3xl font-bold text-stone-900 mt-2">
              অভিনন্দন! আপনার অর্ডার সম্পন্ন হয়েছে
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              আমাদের একজন প্রতিনিধি খুব শীঘ্রই আপনার নম্বরে ({order.customer.phoneNumber}) কল করে অর্ডারটি কনফার্ম করবেন।
            </p>
          </div>

          {/* Cash Memo Box */}
          <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 text-xs space-y-3 print:bg-white print:border-none">
            <div className="flex justify-between items-center border-b border-stone-200 pb-2.5">
              <div>
                <h4 className="font-bold text-sm text-[#8b1528] font-['Anek_Bangla']">
                  আম্বিয়া শাড়ি বাড়ি (ক্যাশ মেমো)
                </h4>
                <p className="text-[11px] text-stone-500">
                  অর্ডার তারিখ: {order.date}
                </p>
              </div>
              <div className="text-right">
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                  {order.status}
                </span>
                <p className="text-[10px] text-stone-500 mt-0.5 font-mono">
                  ট্র্যাকিং: {order.trackingNumber}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] py-1">
              <div>
                <span className="text-stone-400 block">গ্রাহকের নাম:</span>
                <strong className="text-stone-800">{order.customer.fullName}</strong>
              </div>
              <div>
                <span className="text-stone-400 block">মোবাইল নম্বর:</span>
                <strong className="text-stone-800 font-mono">
                  {order.customer.phoneNumber}
                </strong>
              </div>
              <div className="sm:col-span-2">
                <span className="text-stone-400 block">ডেলিভারির ঠিকানা:</span>
                <strong className="text-stone-800">
                  {order.customer.fullAddress}
                </strong>
              </div>
            </div>

            <div className="border-t border-stone-200 pt-2 space-y-1.5">
              <span className="text-stone-500 font-semibold block mb-1">
                অর্ডারকৃত পণ্যসমূহ:
              </span>
              {order.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center text-stone-700 py-0.5"
                >
                  <span className="truncate max-w-[220px]">
                    {item.product.name} ({item.quantity} পিস)
                  </span>
                  <span className="font-mono font-semibold">
                    ৳{(item.product.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-stone-200 pt-2 space-y-1 text-[11px]">
              <div className="flex justify-between text-stone-500">
                <span>সাবটোটাল:</span>
                <span>৳{order.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-stone-500">
                <span>
                  ডেলিভারি চার্জ (
                  {(order.customer.deliveryZone || order.customer.deliveryArea) ===
                  'dhaka_inside'
                    ? 'ঢাকা'
                    : 'ঢাকার বাইরে'}
                  ):
                </span>
                <span>৳{order.deliveryCharge}</span>
              </div>
              {order.discount && order.discount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>কুপন ছাড় ({order.couponCode}):</span>
                  <span>-৳{order.discount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-bold text-stone-900 pt-1 border-t border-dashed border-stone-300">
                <span>সর্বমোট প্রদেয় (ক্যাশ অন ডেলিভারি):</span>
                <span className="text-[#8b1528] font-['Anek_Bangla'] text-base font-black">
                  ৳{order.totalAmount.toLocaleString()}
                </span>
              </div>
            </div>

            {order.estimatedDelivery && (
              <div className="bg-amber-50 rounded-lg p-2.5 text-amber-900 border border-amber-200 flex items-center gap-2">
                <Truck className="w-4 h-4 text-amber-800 shrink-0" />
                <span>
                  সম্ভাব্য ডেলিভারি:{' '}
                  <strong>{order.estimatedDelivery}</strong>
                </span>
              </div>
            )}
          </div>

          <div className="space-y-2.5">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp-এ সরাসরি অর্ডার নিশ্চিত করুন</span>
            </a>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  onClose();
                  onOpenTracking(order.orderId);
                }}
                className="py-2.5 px-3 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs sm:text-sm font-semibold rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <PackageCheck className="w-4 h-4 text-[#8b1528]" />
                <span>অর্ডার ট্র্যাক করুন</span>
              </button>
              <button
                onClick={handlePrint}
                className="py-2.5 px-3 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs sm:text-sm font-semibold rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-4 h-4 text-stone-600" />
                <span>ক্যাশ মেমো প্রিন্ট</span>
              </button>
            </div>

            <button
              onClick={onClose}
              className="w-full py-2.5 text-xs text-stone-500 hover:text-stone-800 font-medium transition-colors text-center cursor-pointer"
            >
              আরো শাড়ি দেখতে শপিং পেজে ফিরে যান
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
