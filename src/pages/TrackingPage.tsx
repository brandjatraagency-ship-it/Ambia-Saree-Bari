import React, { useState, useEffect } from 'react';
import {
  PackageCheck,
  Search,
  Truck,
  CheckCircle,
  Clock,
  MapPin,
  PhoneCall,
  ShieldCheck,
  ChevronRight,
  HelpCircle,
  MessageCircle,
} from 'lucide-react';
import { Order, StoreSettings, PageRoute } from '../types';

interface TrackingPageProps {
  orders: Order[];
  prefilledOrderId?: string;
  storeSettings: StoreSettings;
  onNavigate: (page: PageRoute) => void;
}

export const TrackingPage: React.FC<TrackingPageProps> = ({
  orders,
  prefilledOrderId,
  storeSettings,
  onNavigate,
}) => {
  const [query, setQuery] = useState(prefilledOrderId || '');
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(() => {
    if (prefilledOrderId) {
      return (
        orders.find(
          (o) =>
            o.orderId.toLowerCase() === prefilledOrderId.toLowerCase() ||
            o.trackingNumber.toLowerCase() === prefilledOrderId.toLowerCase() ||
            o.customer.phoneNumber.includes(prefilledOrderId),
        ) || null
      );
    }
    return orders[0] || null;
  });
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (prefilledOrderId) {
      setQuery(prefilledOrderId);
      const found = orders.find(
        (o) =>
          o.orderId.toLowerCase() === prefilledOrderId.toLowerCase() ||
          o.trackingNumber.toLowerCase() === prefilledOrderId.toLowerCase() ||
          o.customer.phoneNumber.includes(prefilledOrderId),
      );
      if (found) setSearchedOrder(found);
    }
  }, [prefilledOrderId, orders]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    const q = query.trim().toLowerCase();
    if (!q) return;

    const found = orders.find(
      (o) =>
        o.orderId.toLowerCase() === q ||
        o.trackingNumber.toLowerCase() === q ||
        o.customer.phoneNumber.replace(/\s+/g, '').includes(q.replace(/\s+/g, '')),
    );
    setSearchedOrder(found || null);
  };

  const steps = [
    { key: 'অর্ডার গৃহীত হয়েছে', label: 'অর্ডার গৃহীত', desc: 'অর্ডার সফলভাবে রেজিস্টার্ড হয়েছে' },
    { key: 'প্রসেসিং হচ্ছে', label: 'প্রসেসিং ও প্যাকিং', desc: 'কোয়ালিটি চেক ও প্যাকেজিং সম্পন্ন' },
    { key: 'কুরিয়ারে হস্তান্তর', label: 'কুরিয়ারে হস্তান্তর', desc: 'ডেলিভারির উদ্দেশ্যে পাঠানো হয়েছে' },
    { key: 'ডেলিভারির পথে', label: 'ডেলিভারির পথে', desc: 'রাইডার ডেলিভারির উদ্দেশ্যে বের হয়েছে' },
    { key: 'ডেলিভারড', label: 'সফল ডেলিভারি', desc: 'গ্রাহকের ঠিকানায় শাড়ি পৌঁছে দেওয়া হয়েছে' },
  ];

  const getStepIndex = (status: Order['status']) => {
    switch (status) {
      case 'অর্ডার গৃহীত হয়েছে':
        return 0;
      case 'প্রসেসিং হচ্ছে':
        return 1;
      case 'কুরিয়ারে হস্তান্তর':
        return 2;
      case 'ডেলিভারির পথে':
        return 3;
      case 'ডেলিভারড':
        return 4;
      case 'বাতিল':
        return -1;
      default:
        return 0;
    }
  };

  const activeIndex = searchedOrder ? getStepIndex(searchedOrder.status) : 0;
  const phone = storeSettings.phone || '01796962283';
  const whatsapp = storeSettings.whatsapp || '8801796962283';

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8 animate-fade-in">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-stone-400">
        <button
          onClick={() => onNavigate('home')}
          className="hover:text-rose-400 transition-colors cursor-pointer"
        >
          হোম
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-stone-600" />
        <span className="text-emerald-400 font-semibold">অর্ডার ট্র্যাকিং</span>
      </nav>

      {/* Header */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto mb-2">
          <PackageCheck className="w-6 h-6" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-stone-100 font-['Anek_Bangla']">
          লাইভ অর্ডার ট্র্যাকিং
        </h1>
        <p className="text-xs sm:text-sm text-stone-400">
          আপনার অর্ডার আইডি অথবা অর্ডার করার মোবাইল নম্বর দিয়ে পার্সেলের বর্তমান অবস্থান জানুন
        </p>
      </div>

      {/* Search Bar Form */}
      <form onSubmit={handleSearch} className="max-w-xl mx-auto">
        <div className="flex items-center bg-[#18080f] border border-rose-900/60 rounded-2xl p-1.5 shadow-xl focus-within:border-emerald-500 transition-all">
          <Search className="w-5 h-5 text-rose-400 ml-3 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="অর্ডার আইডি (ASB-92814) বা মোবাইল নম্বর..."
            className="w-full px-3 py-2.5 bg-transparent text-xs sm:text-sm text-stone-100 placeholder:text-stone-500 outline-hidden font-mono"
          />
          <button
            type="submit"
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-md transition-colors cursor-pointer shrink-0"
          >
            ট্র্যাক করুন
          </button>
        </div>

        {/* Demo Orders quick chips */}
        {orders.length > 0 && (
          <div className="flex items-center justify-center flex-wrap gap-2 mt-3 text-xs text-stone-400">
            <span className="text-[11px]">ডেমো অর্ডার দিয়ে পরীক্ষা করুন:</span>
            {orders.slice(0, 3).map((o) => (
              <button
                key={o.orderId}
                type="button"
                onClick={() => {
                  setQuery(o.orderId);
                  setSearchedOrder(o);
                  setHasSearched(true);
                }}
                className="px-2.5 py-1 bg-stone-900/80 hover:bg-stone-800 border border-stone-800 rounded-lg text-[11px] font-mono text-stone-300 cursor-pointer"
              >
                {o.orderId}
              </button>
            ))}
          </div>
        )}
      </form>

      {/* Order Status Display */}
      {searchedOrder ? (
        <div className="bg-[#18080f] border border-rose-950/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          {/* Top Order Summary */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-rose-950/80 pb-5">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-stone-400">অর্ডার নম্বর:</span>
                <span className="text-base sm:text-lg font-black font-mono text-amber-400">
                  {searchedOrder.orderId}
                </span>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/40 font-bold uppercase">
                  {searchedOrder.status}
                </span>
              </div>
              <p className="text-xs text-stone-400 mt-1">
                অর্ডার তারিখ: <span className="text-stone-200">{searchedOrder.date}</span>
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono">
              <div className="text-right">
                <p className="text-stone-400 text-[11px]">সর্বমোট প্রদেয়</p>
                <p className="text-lg font-bold text-rose-400 font-mono">
                  ৳{searchedOrder.totalAmount.toLocaleString('bn-BD')}
                </p>
              </div>
            </div>
          </div>

          {/* Stepper Progress Visualizer */}
          <div className="space-y-4 py-2">
            <div className="flex items-center justify-between text-xs text-stone-400">
              <span className="font-semibold text-stone-300">ডেলিভারি অগ্রগতি:</span>
              {searchedOrder.estimatedDelivery && (
                <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                  <Clock className="w-3.5 h-3.5" />
                  আনুমানিক ডেলিভারি: {searchedOrder.estimatedDelivery}
                </span>
              )}
            </div>

            {/* Steps Container */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
              {steps.map((s, idx) => {
                const isPassed = activeIndex >= idx;
                const isCurrent = activeIndex === idx;

                return (
                  <div
                    key={s.key}
                    className={`p-3.5 rounded-2xl border transition-all ${
                      isCurrent
                        ? 'bg-emerald-950/40 border-emerald-500/60 shadow-md ring-1 ring-emerald-500/30'
                        : isPassed
                          ? 'bg-stone-900/50 border-emerald-900/40 text-stone-300'
                          : 'bg-[#120509]/60 border-stone-900 text-stone-500 opacity-60'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                          isCurrent
                            ? 'bg-emerald-500 text-stone-950 animate-pulse'
                            : isPassed
                              ? 'bg-emerald-600/30 text-emerald-400'
                              : 'bg-stone-800 text-stone-500'
                        }`}
                      >
                        {isPassed ? '✓' : idx + 1}
                      </div>
                      <span className="font-bold text-xs">{s.label}</span>
                    </div>
                    <p className="text-[10px] text-stone-400 leading-tight">{s.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Order Item Details and Shipping Address */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-rose-950/80">
            {/* Ordered Items */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-rose-300 uppercase tracking-wider">
                অর্ডারের শাড়ি সমূহ ({searchedOrder.items.length}টি):
              </h4>
              <div className="space-y-2.5">
                {searchedOrder.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-2.5 bg-[#120509] rounded-xl border border-rose-950"
                  >
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-12 h-14 object-cover rounded-lg shrink-0 border border-stone-800"
                    />
                    <div className="min-w-0 flex-1 text-xs">
                      <p className="font-bold text-stone-100 truncate">{item.product.name}</p>
                      <p className="text-[11px] text-stone-400">কোড: {item.product.code}</p>
                      {item.selectedColor && (
                        <p className="text-[10px] text-amber-300">রঙ: {item.selectedColor}</p>
                      )}
                    </div>
                    <div className="text-right text-xs font-mono shrink-0">
                      <p className="font-bold text-stone-200">
                        ৳{(item.product.price * item.quantity).toLocaleString('bn-BD')}
                      </p>
                      <p className="text-[10px] text-stone-500">পরিমাণ: {item.quantity}টি</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery Details */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-rose-300 uppercase tracking-wider">
                ডেলিভারি ও গ্রাহক তথ্য:
              </h4>
              <div className="bg-[#120509] rounded-xl border border-rose-950 p-4 space-y-2 text-xs text-stone-300">
                <div className="flex items-center justify-between border-b border-rose-950 pb-2">
                  <span className="text-stone-400">গ্রাহকের নাম:</span>
                  <span className="font-bold text-stone-100">{searchedOrder.customer.fullName}</span>
                </div>
                <div className="flex items-center justify-between border-b border-rose-950 pb-2">
                  <span className="text-stone-400">মোবাইল নম্বর:</span>
                  <span className="font-mono text-stone-100">{searchedOrder.customer.phoneNumber}</span>
                </div>
                <div className="flex items-start justify-between border-b border-rose-950 pb-2">
                  <span className="text-stone-400 shrink-0">ঠিকানা:</span>
                  <span className="text-right text-stone-200">{searchedOrder.customer.fullAddress}</span>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-stone-400">পেমেন্ট মেথড:</span>
                  <span className="text-emerald-400 font-bold">
                    {searchedOrder.customer.paymentMethod === 'bkash' ? 'বিকাশ পেমেন্ট' : 'ক্যাশ অন ডেলিভারি'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : hasSearched ? (
        <div className="text-center py-12 bg-[#18080f] rounded-3xl border border-rose-950 p-8 space-y-4 max-w-md mx-auto shadow-lg">
          <div className="w-12 h-12 bg-rose-950 text-rose-400 rounded-full flex items-center justify-center mx-auto">
            <HelpCircle className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-base text-stone-100">
            কোনো অর্ডার খুঁজে পাওয়া যায়নি
          </h3>
          <p className="text-xs text-stone-400">
            দয়া করে সঠিক অর্ডার আইডি অথবা অর্ডার করার মোবাইল নম্বরটি পুনরায় যাচাই করে অনুসন্ধান করুন।
          </p>
        </div>
      ) : null}

      {/* Need Help Banner */}
      <div className="bg-[#14060c] border border-rose-950 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="font-bold text-sm text-stone-100 font-['Anek_Bangla']">
            ডেলিভারি নিয়ে কোনো সমস্যা বা প্রশ্ন আছে?
          </h4>
          <p className="text-xs text-stone-400">
            আমাদের কাস্টমার কেয়ার টিম আপনাকে সার্বক্ষণিক সহায়তা করার জন্য প্রস্তুত।
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <a
            href={`tel:${phone}`}
            className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors"
          >
            <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
            <span>{phone}</span>
          </a>
          <a
            href={`https://wa.me/${whatsapp}?text=${encodeURIComponent(
              `হ্যালো, আমি অর্ডার ট্র্যাকিং (${query || 'ASB-92814'}) সম্পর্কে জানতে চাই`,
            )}`}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 bg-[#25d366] hover:bg-[#20ba5a] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-xs"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-current" />
            <span>WhatsApp সাপোর্ট</span>
          </a>
        </div>
      </div>
    </div>
  );
};
