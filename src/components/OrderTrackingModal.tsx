import React, { useState } from 'react';
import {
  PackageCheck,
  X,
  Search,
  CircleAlert,
} from 'lucide-react';
import { Order } from '../types';

interface OrderTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
  prefilledOrderId?: string;
}

export const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({
  isOpen,
  onClose,
  orders,
  prefilledOrderId = '',
}) => {
  if (!isOpen) return null;

  const [query, setQuery] = useState(prefilledOrderId || '');
  const [activeOrder, setActiveOrder] = useState<Order | null>(
    orders.find(
      (o) =>
        o.orderId.toLowerCase() === (prefilledOrderId || '').toLowerCase(),
    ) ||
      orders[0] ||
      null,
  );
  const [errorMessage, setErrorMessage] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const term = query.trim().toLowerCase();
    if (!term) {
      setErrorMessage('অনুগ্রহ করে অর্ডার আইডি অথবা মোবাইল নম্বর লিখুন।');
      return;
    }

    const found = orders.find(
      (o) =>
        o.orderId.toLowerCase() === term ||
        o.customer.phoneNumber.includes(term) ||
        o.trackingNumber.toLowerCase().includes(term),
    );

    if (found) {
      setActiveOrder(found);
      setErrorMessage('');
    } else {
      setErrorMessage(
        'কোনো অর্ডার খুঁজে পাওয়া যায়নি। অনুগ্রহ করে সঠিক অর্ডার আইডি দিন (উদা: ASB-92814)।',
      );
      setActiveOrder(null);
    }
  };

  const statusSteps = [
    { label: 'অর্ডার গৃহীত হয়েছে', desc: 'সিস্টেমে অর্ডার রেকর্ড করা হয়েছে' },
    { label: 'প্রসেসিং হচ্ছে', desc: 'কোয়ালিটি চেক ও প্যাকেজিং চলছে' },
    { label: 'কুরিয়ারে হস্তান্তর', desc: 'পার্সেল কুরিয়ার হাবে পাঠানো হয়েছে' },
    { label: 'ডেলিভারির পথে', desc: 'রাইডার আপনার ঠিকানায় রওয়ানা দিয়েছে' },
    { label: 'ডেলিভারড', desc: 'পণ্য সফলভাবে গ্রাহকের হাতে পৌঁছেছে' },
  ];

  const getActiveStepIndex = (status: string) => {
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
      default:
        return 1;
    }
  };

  const currentStep = activeOrder ? getActiveStepIndex(activeOrder.status) : 0;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden my-4 max-h-[95vh] flex flex-col">
        {/* Header */}
        <div className="bg-[#8b1528] text-white p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PackageCheck className="w-5 h-5 text-amber-300" />
            <h2 className="font-['Anek_Bangla'] text-lg sm:text-xl font-bold">
              অর্ডার ট্র্যাকিং সিস্টেম
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Status Details */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="অর্ডার আইডি (ASB-...) বা মোবাইল নম্বর লিখুন..."
                className="w-full pl-9 pr-3 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm focus:bg-white focus:border-[#8b1528] outline-hidden font-mono"
              />
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
            </div>
            <button
              type="submit"
              className="px-4 py-2.5 bg-[#8b1528] hover:bg-[#721020] text-white text-xs sm:text-sm font-bold rounded-xl transition-colors cursor-pointer"
            >
              ট্র্যাক করুন
            </button>
          </form>

          {errorMessage && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs flex items-center gap-2">
              <CircleAlert className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {activeOrder ? (
            <div className="space-y-5">
              {/* Summary Card */}
              <div className="bg-stone-50 rounded-xl p-4 border border-stone-200 text-xs space-y-2">
                <div className="flex justify-between items-center border-b border-stone-200 pb-2">
                  <span className="font-mono font-bold text-sm text-[#8b1528]">
                    {activeOrder.orderId}
                  </span>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                    {activeOrder.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 pt-1 text-[11px]">
                  <div>
                    <span className="text-stone-400 block">গ্রাহকের নাম:</span>
                    <strong className="text-stone-800">
                      {activeOrder.customer.fullName}
                    </strong>
                  </div>
                  <div>
                    <span className="text-stone-400 block">মোবাইল:</span>
                    <strong className="text-stone-800 font-mono">
                      {activeOrder.customer.phoneNumber}
                    </strong>
                  </div>
                  <div className="col-span-2">
                    <span className="text-stone-400 block">ঠিকানা:</span>
                    <strong className="text-stone-800">
                      {activeOrder.customer.fullAddress}
                    </strong>
                  </div>
                  <div>
                    <span className="text-stone-400 block">
                      কুরিয়ার ট্র্যাকিং:
                    </span>
                    <strong className="text-stone-800 font-mono text-[10px]">
                      {activeOrder.trackingNumber}
                    </strong>
                  </div>
                  <div>
                    <span className="text-stone-400 block">
                      সম্ভাব্য ডেলিভারি:
                    </span>
                    <strong className="text-amber-800">
                      {activeOrder.estimatedDelivery || '২৪-৪৮ ঘণ্টার মধ্যে'}
                    </strong>
                  </div>
                </div>
              </div>

              {/* Stepper Progress */}
              <div>
                <h4 className="text-xs font-bold text-stone-700 uppercase tracking-wider mb-3">
                  ডেলিভারির বর্তমান অগ্রগতি:
                </h4>
                <div className="space-y-4 relative pl-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-stone-200">
                  {statusSteps.map((step, idx) => {
                    const isCompleted = idx <= currentStep;
                    const isCurrent = idx === currentStep;
                    return (
                      <div
                        key={idx}
                        className="relative flex items-start gap-3"
                      >
                        <div
                          className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold z-10 ${
                            isCompleted
                              ? 'bg-emerald-600 text-white'
                              : 'bg-stone-200 text-stone-500'
                          }`}
                        >
                          {isCompleted ? '✓' : idx + 1}
                        </div>
                        <div>
                          <p
                            className={`text-xs font-bold ${
                              isCurrent
                                ? 'text-[#8b1528]'
                                : isCompleted
                                  ? 'text-stone-900'
                                  : 'text-stone-400'
                            }`}
                          >
                            {step.label} {isCurrent && '(চলমান)'}
                          </p>
                          <p className="text-[11px] text-stone-500">
                            {step.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Items in order */}
              <div className="border-t border-stone-200 pt-3">
                <h4 className="text-xs font-bold text-stone-700 mb-2">
                  পার্সেলের পণ্যসমূহ:
                </h4>
                <div className="space-y-2">
                  {activeOrder.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 bg-stone-50 p-2 rounded-lg border border-stone-100 text-xs"
                    >
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-10 h-12 object-cover rounded"
                      />
                      <div className="flex-1 truncate">
                        <p className="font-semibold text-stone-900 truncate">
                          {item.product.name}
                        </p>
                        <p className="text-[10px] text-stone-500">
                          পরিমাণ: {item.quantity} পিস
                        </p>
                      </div>
                      <span className="font-bold text-stone-900 font-mono">
                        ৳{(item.product.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-6 text-stone-400 text-xs">
              <p>আপনার অর্ডার আইডি দিয়ে উপরের বক্সে সার্চ করুন।</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
