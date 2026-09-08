import React, { useState } from 'react';
import {
  X,
  User,
  Phone,
  MapPin,
  Sparkles,
  CircleAlert,
  CircleCheck,
  Lock,
  Truck,
  ShieldCheck,
} from 'lucide-react';
import { CartItem, Coupon, Order, StoreSettings } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderSuccess: (order: Order) => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  coupons?: Coupon[];
  storeSettings?: StoreSettings;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderSuccess,
  onUpdateQuantity,
  coupons = [],
  storeSettings,
}) => {
  if (!isOpen || items.length === 0) return null;

  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [fullAddress, setFullAddress] = useState('');
  const [deliveryZone, setDeliveryZone] = useState<'dhaka_inside' | 'dhaka_outside'>('dhaka_inside');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'bkash'>('cod');
  const [orderNotes, setOrderNotes] = useState('');

  const [couponCodeInput, setCouponCodeInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [couponError, setCouponError] = useState('');
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  const dhakaFee = storeSettings?.dhakaDeliveryCharge ?? 80;
  const outsideFee = storeSettings?.outsideDeliveryCharge ?? 150;
  const deliveryCharge = deliveryZone === 'dhaka_inside' ? dhakaFee : outsideFee;

  let discountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountType === 'fixed') {
      discountAmount = appliedCoupon.discountValue;
    } else {
      discountAmount = Math.round(
        (subtotal * appliedCoupon.discountValue) / 100,
      );
    }
    discountAmount = Math.min(discountAmount, subtotal);
  }

  const grandTotal = Math.max(0, subtotal - discountAmount) + deliveryCharge;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    if (!couponCodeInput.trim()) return;

    const code = couponCodeInput.trim().toUpperCase();
    const found = coupons.find(
      (c) => c.code.toUpperCase() === code && c.active,
    );

    if (!found) {
      setCouponError('এই কুপন কোডটি সঠিক নয় বা এর মেয়াদ শেষ হয়ে গেছে।');
      setAppliedCoupon(null);
      return;
    }

    if (subtotal < found.minOrderAmount) {
      setCouponError(
        `এই কুপনটি পেতে ন্যূনতম ৳${found.minOrderAmount} টাকার অর্ডার হতে হবে।`,
      );
      setAppliedCoupon(null);
      return;
    }

    setAppliedCoupon(found);
    setCouponError('');
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCodeInput('');
    setCouponError('');
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!fullName.trim()) {
      setFormError('অনুগ্রহ করে আপনার পুরো নাম লিখুন।');
      return;
    }

    const cleanPhone = phoneNumber.replace(/[^0-9]/g, '');
    if (cleanPhone.length < 11) {
      setFormError(
        'অনুগ্রহ করে সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন (উদা: 017XXXXXXXX)।',
      );
      return;
    }

    if (!fullAddress.trim() || fullAddress.trim().length < 10) {
      setFormError(
        'অনুগ্রহ করে আপনার সম্পূর্ণ ঠিকানা (বাসা, রোড, থানা, জেলা) বিস্তারিত লিখুন।',
      );
      return;
    }

    setIsSubmitting(true);

    const generatedOrderId = `ASB-${Math.floor(10000 + Math.random() * 90000)}`;

    setTimeout(() => {
      const customerInfo = {
        fullName: fullName.trim(),
        phoneNumber: cleanPhone,
        fullAddress: fullAddress.trim(),
        deliveryArea: deliveryZone,
        deliveryZone: deliveryZone,
        paymentMethod: paymentMethod,
        orderNotes: orderNotes.trim(),
      };

      const newOrder: Order = {
        orderId: generatedOrderId,
        date: new Intl.DateTimeFormat('bn-BD', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }).format(new Date()),
        items: [...items],
        customer: customerInfo,
        subtotal: subtotal,
        deliveryCharge: deliveryCharge,
        discount: discountAmount,
        couponCode: appliedCoupon?.code,
        totalAmount: grandTotal,
        status: 'অর্ডার গৃহীত হয়েছে',
        trackingNumber: `STEADFAST-${Math.floor(1000000 + Math.random() * 9000000)}`,
        estimatedDelivery:
          deliveryZone === 'dhaka_inside'
            ? '২৪-৪৮ ঘণ্টার মধ্যে'
            : '২-৩ কার্যদিবসের মধ্যে',
        courierName: 'Steadfast Courier',
      };

      setIsSubmitting(false);
      onOrderSuccess(newOrder);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden my-4 max-h-[95vh] flex flex-col">
        {/* Header */}
        <div className="bg-[#8b1528] text-white p-4 sm:p-5 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-amber-400 text-stone-950 font-black text-xs px-2 py-0.5 rounded">
                দ্রুত অর্ডার
              </span>
              <h2 className="font-['Anek_Bangla'] text-lg sm:text-xl font-bold">
                সরাসরি ক্যাশ অন ডেলিভারিতে অর্ডার করুন
              </h2>
            </div>
            <p className="text-xs text-stone-200 mt-1">
              সঠিক নাম, ঠিকানা ও মোবাইল নম্বর দিয়ে নিচে &quot;অর্ডার কনফার্ম করুন&quot; বাটনে চাপুন।
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form & Items Body */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Products in Cart */}
          <div className="bg-stone-50 rounded-xl p-3 sm:p-4 border border-stone-200">
            <h3 className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-2.5">
              অর্ডারকৃত শাড়ি ({items.length} টি)
            </h3>
            <div className="space-y-3 divide-y divide-stone-200">
              {items.map((item, idx) => (
                <div
                  key={idx}
                  className={`flex items-center gap-3 ${idx > 0 ? 'pt-3' : ''}`}
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-14 h-16 sm:w-16 sm:h-20 object-cover rounded-lg border border-stone-200 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-xs sm:text-sm text-stone-900 truncate">
                      {item.product.name}
                    </h4>
                    <p className="text-[11px] text-stone-500 font-mono mt-0.5">
                      কোড: {item.product.code}{' '}
                      {item.selectedColor ? `| কালার: ${item.selectedColor}` : ''}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-stone-300 rounded bg-white text-xs">
                        <button
                          type="button"
                          onClick={() =>
                            onUpdateQuantity(
                              item.product.id,
                              Math.max(1, item.quantity - 1),
                            )
                          }
                          className="px-2 py-0.5 hover:bg-stone-100 font-bold"
                        >
                          -
                        </button>
                        <span className="px-2.5 py-0.5 font-bold">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            onUpdateQuantity(item.product.id, item.quantity + 1)
                          }
                          className="px-2 py-0.5 hover:bg-stone-100 font-bold"
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
          </div>

          {/* Delivery Zone Choice */}
          <div>
            <label className="text-xs font-bold text-stone-800 uppercase tracking-wide block mb-2">
              আপনার ডেলিভারি এরিয়া বেছে নিন:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label
                className={`flex items-start gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                  deliveryZone === 'dhaka_inside'
                    ? 'border-[#8b1528] bg-red-50/50'
                    : 'border-stone-200 hover:border-stone-300'
                }`}
              >
                <input
                  type="radio"
                  name="deliveryZone"
                  checked={deliveryZone === 'dhaka_inside'}
                  onChange={() => setDeliveryZone('dhaka_inside')}
                  className="mt-1 text-[#8b1528] focus:ring-[#8b1528]"
                />
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold text-xs sm:text-sm text-stone-900">
                      ঢাকার ভিতরে
                    </span>
                    <span className="font-extrabold text-[#8b1528] text-xs bg-white px-2 py-0.5 rounded-full border border-red-200">
                      ৳৮০
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-500 mt-0.5">
                    ডেলিভারি সময়: ২৪ থেকে ৪৮ ঘণ্টা
                  </p>
                </div>
              </label>

              <label
                className={`flex items-start gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                  deliveryZone === 'dhaka_outside'
                    ? 'border-[#8b1528] bg-red-50/50'
                    : 'border-stone-200 hover:border-stone-300'
                }`}
              >
                <input
                  type="radio"
                  name="deliveryZone"
                  checked={deliveryZone === 'dhaka_outside'}
                  onChange={() => setDeliveryZone('dhaka_outside')}
                  className="mt-1 text-[#8b1528] focus:ring-[#8b1528]"
                />
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold text-xs sm:text-sm text-stone-900">
                      ঢাকার বাইরে (সারা বাংলাদেশ)
                    </span>
                    <span className="font-extrabold text-[#8b1528] text-xs bg-white px-2 py-0.5 rounded-full border border-red-200">
                      ৳১৫০
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-500 mt-0.5">
                    ডেলিভারি সময়: ২ থেকে ৩ কার্যদিবস
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* Form */}
          <form id="orderForm" onSubmit={handleSubmitOrder} className="space-y-4">
            {formError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs flex items-center gap-2">
                <CircleAlert className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <div>
              <label className="text-xs font-bold text-stone-800 block mb-1">
                আপনার নাম *
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="আপনার পুরো নাম লিখুন"
                  className="w-full pl-9 pr-3 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:bg-white focus:border-[#8b1528] outline-hidden"
                />
                <User className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-stone-800 block mb-1">
                মোবাইল নম্বর (১১ ডিজিট) *
              </label>
              <div className="relative">
                <input
                  type="tel"
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="017XXXXXXXX"
                  maxLength={11}
                  className="w-full pl-9 pr-3 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:bg-white focus:border-[#8b1528] outline-hidden font-mono"
                />
                <Phone className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
              </div>
              <p className="text-[11px] text-stone-500 mt-1">
                ডেলিভারি সংক্রান্ত তথ্যের জন্য এই নম্বরে কল করা হবে।
              </p>
            </div>

            <div>
              <label className="text-xs font-bold text-stone-800 block mb-1">
                সম্পূর্ণ ঠিকানা *
              </label>
              <div className="relative">
                <textarea
                  required
                  rows={2}
                  value={fullAddress}
                  onChange={(e) => setFullAddress(e.target.value)}
                  placeholder="বাসা বা ফ্ল্যাট নং, রোড নং, এলাকা, থানা ও জেলার নাম বিস্তারিত লিখুন..."
                  className="w-full pl-9 pr-3 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:bg-white focus:border-[#8b1528] outline-hidden resize-none"
                />
                <MapPin className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-stone-600 block mb-1">
                কোনো বিশেষ নির্দেশ বা ডেলিভারি নোট (ঐচ্ছিক)
              </label>
              <input
                type="text"
                value={orderNotes}
                onChange={(e) => setOrderNotes(e.target.value)}
                placeholder="উদা: শুক্রবার ডেলিভারি দিলে ভালো হয় / বিকালের পর কল দিবেন"
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs focus:bg-white focus:border-[#8b1528] outline-hidden"
              />
            </div>

            {/* Payment Method */}
            <div className="pt-2">
              <label className="text-xs font-bold text-stone-800 uppercase tracking-wide block mb-2">
                মূল্য পরিশোধের মাধ্যম:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label
                  className={`flex items-center gap-2.5 p-3 rounded-xl border cursor-pointer ${
                    paymentMethod === 'cod'
                      ? 'border-emerald-600 bg-emerald-50/60 ring-1 ring-emerald-600'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="text-emerald-600 focus:ring-emerald-500"
                  />
                  <div className="text-left">
                    <span className="text-xs sm:text-sm font-bold text-stone-900 block">
                      ক্যাশ অন ডেলিভারি
                    </span>
                    <span className="text-[11px] text-stone-500">
                      পণ্য হাতে পেয়ে দেখে টাকা দিন
                    </span>
                  </div>
                </label>

                <label
                  className={`flex items-center gap-2.5 p-3 rounded-xl border cursor-pointer ${
                    paymentMethod === 'bkash'
                      ? 'border-pink-600 bg-pink-50/60 ring-1 ring-pink-600'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === 'bkash'}
                    onChange={() => setPaymentMethod('bkash')}
                    className="text-pink-600 focus:ring-pink-500"
                  />
                  <div className="text-left">
                    <span className="text-xs sm:text-sm font-bold text-stone-900 block">
                      বিকাশ / নগদ পেমেন্ট
                    </span>
                    <span className="text-[11px] text-stone-500">
                      অর্ডার কনফার্মেশনের পর পেমেন্ট
                    </span>
                  </div>
                </label>
              </div>
            </div>

            {/* Coupon Code Section */}
            <div className="bg-amber-50/50 p-3 rounded-xl border border-amber-200/70 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>কুপন কোড আছে কি? (যেমন: AMBIA100 / EID2026)</span>
                </span>
                {appliedCoupon && (
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                    কুপন সক্রিয়!
                  </span>
                )}
              </div>

              {appliedCoupon ? (
                <div className="flex items-center justify-between bg-white p-2 rounded-lg border border-emerald-300 text-xs">
                  <div>
                    <span className="font-mono font-bold text-emerald-800">
                      {appliedCoupon.code}
                    </span>
                    <span className="text-[11px] text-emerald-700 block">
                      {appliedCoupon.description}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleRemoveCoupon}
                    className="text-red-500 hover:text-red-700 text-xs font-bold underline cursor-pointer"
                  >
                    বাদ দিন
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCodeInput}
                    onChange={(e) => setCouponCodeInput(e.target.value.toUpperCase())}
                    placeholder="কুপন কোড লিখুন..."
                    className="flex-1 px-3 py-1.5 bg-white border border-stone-300 rounded-lg text-xs font-mono uppercase tracking-wider outline-hidden"
                  />
                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    className="px-4 py-1.5 bg-[#8b1528] hover:bg-[#721020] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                  >
                    প্রয়োগ
                  </button>
                </div>
              )}
              {couponError && (
                <p className="text-[11px] text-red-600 font-medium">{couponError}</p>
              )}
            </div>

            {/* Calculations Breakdown */}
            <div className="bg-stone-50 rounded-xl p-4 border border-stone-200 space-y-2 text-xs">
              <div className="flex justify-between text-stone-600">
                <span>পণ্যের মোট মূল্য:</span>
                <span className="font-semibold text-stone-900">
                  ৳{subtotal.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>ডেলিভারি চার্জ:</span>
                <span className="font-semibold text-stone-900">
                  ৳{deliveryCharge}
                </span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700 font-bold bg-emerald-50 px-2 py-1 rounded">
                  <span>কুপন মূল্যছাড় ({appliedCoupon?.code}):</span>
                  <span>-৳{discountAmount.toLocaleString()}</span>
                </div>
              )}
              <div className="pt-2 border-t border-stone-200 flex justify-between text-sm sm:text-base font-bold">
                <span className="text-stone-900">সর্বমোট প্রদেয় টাকা:</span>
                <span className="text-[#8b1528] font-['Anek_Bangla'] text-lg font-black">
                  ৳{grandTotal.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-4 bg-[#8b1528] hover:bg-[#721020] text-white font-extrabold text-base rounded-xl transition-all shadow-md active:scale-98 flex items-center justify-center gap-2 disabled:opacity-75 cursor-pointer"
            >
              {isSubmitting ? (
                <span>অর্ডার প্রসেস হচ্ছে...</span>
              ) : (
                <>
                  <CircleCheck className="w-5 h-5 text-amber-300" />
                  <span>অর্ডার কনফার্ম করুন (৳{grandTotal.toLocaleString()})</span>
                </>
              )}
            </button>

            {/* Security Guarantee Footnotes */}
            <div className="flex items-center justify-center gap-4 text-[11px] text-stone-500 text-center pt-1">
              <span className="flex items-center gap-1">
                <Lock className="w-3 h-3 text-stone-400" /> ১০০% নিরাপদ অর্ডার
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Truck className="w-3 h-3 text-stone-400" /> হোম ডেলিভারি
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-stone-400" /> দেখে নেওয়ার সুযোগ
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
