import React from 'react';
import {
  Truck,
  RotateCcw,
  MapPin,
  PhoneCall,
  MessageCircle,
  Mail,
} from 'lucide-react';
import { StoreSettings } from '../types';
import { defaultStoreSettings, categories } from '../data/initialData';

interface FooterProps {
  onSelectCategory: (category: string) => void;
  onOpenTracking: () => void;
  onOpenAdmin?: () => void;
  storeSettings?: StoreSettings;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onOpenTracking,
  onOpenAdmin,
  storeSettings = defaultStoreSettings,
}) => {
  const settings = storeSettings || defaultStoreSettings;

  return (
    <footer id="contact" className="bg-[#0a0205] text-stone-300 pt-12 pb-24 md:pb-12 border-t border-rose-950/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-rose-950/80">
          {/* Col 1: Brand & Tagline */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              {settings.logoType === 'image' && settings.logoUrl ? (
                <img
                  src={settings.logoUrl}
                  alt={settings.storeName || 'Ambia Saree Bari'}
                  className="h-10 max-w-[130px] object-contain rounded drop-shadow-sm"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              ) : null}
              <span className="font-['Playfair_Display',serif] font-black text-xl sm:text-2xl text-stone-100 tracking-tight">
                {settings.storeNameEn || settings.storeName || 'Ambia Saree Bari'}
              </span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              {settings.tagline ||
                'টাঙ্গাইলের ঐতিহ্যবাহী সুতি তাঁত, মনকাড়া ইন্ডিয়ান ল্যামা সিল্ক ও জামদানি শাড়ির বিশ্বস্ত অনলাইন শো-রুম। আমরা গ্রাহকের শতভাগ আস্থা ও আসল কোয়ালিটি নিশ্চিত করি।'}
            </p>
            <div className="pt-2 flex flex-col gap-1.5 text-xs text-stone-300">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-amber-400" />
                <span>সারা দেশে ক্যাশ অন ডেলিভারি</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-emerald-400" />
                <span>দেখে নেওয়ার সুবিধা ও সহজ রিটার্ন</span>
              </div>
            </div>
          </div>

          {/* Col 2: Categories */}
          <div>
            <h4 className="font-bold text-sm text-stone-100 uppercase tracking-wider mb-4 border-l-2 border-rose-600 pl-2.5">
              জনপ্রিয় শাড়ি কালেকশন
            </h4>
            <ul className="space-y-2 text-xs">
              {categories.slice(1, 7).map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => {
                      onSelectCategory(cat.id);
                      window.scrollTo({ top: 400, behavior: 'smooth' });
                    }}
                    className="hover:text-rose-300 transition-colors cursor-pointer text-left text-stone-300"
                  >
                    • {cat.name} ({cat.count})
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Customer Support */}
          <div>
            <h4 className="font-bold text-sm text-stone-100 uppercase tracking-wider mb-4 border-l-2 border-rose-600 pl-2.5">
              কাস্টমার সাপোর্ট ও সেবা
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <button
                  onClick={onOpenTracking}
                  className="hover:text-white transition-colors text-amber-300 font-semibold cursor-pointer"
                >
                  📦 আপনার অর্ডার ট্র্যাক করুন
                </button>
              </li>
              <li>ডেলিভারি পলিসি ও চার্জের নিয়ম</li>
              <li>পণ্য পরিবর্তন ও রিটার্ন গ্যারান্টি</li>
              <li>শাড়ির যত্ন ও সুরক্ষার নির্দেশিকা</li>
              {onOpenAdmin && (
                <li>
                  <button
                    onClick={onOpenAdmin}
                    className="hover:text-rose-300 transition-colors text-stone-400 hover:underline cursor-pointer flex items-center gap-1.5"
                  >
                    <span>⚙️ মার্চেন্ট ও অ্যাডমিন পোর্টাল</span>
                  </button>
                </li>
              )}
              <li>পাইকারি অর্ডারের জন্য যোগাযোগ</li>
            </ul>
          </div>

          {/* Col 4: Contact & Showroom */}
          <div>
            <h4 className="font-bold text-sm text-stone-100 uppercase tracking-wider mb-4 border-l-2 border-rose-600 pl-2.5">
              যোগাযোগ ও শো-রুম
            </h4>
            <div className="space-y-3 text-xs text-stone-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span>
                  {settings.address ||
                    'আউটলেট: আম্বিয়া শাড়ি বাড়ি, টাঙ্গাইল সদর, টাঙ্গাইল।'}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <PhoneCall className="w-4 h-4 text-amber-400 shrink-0" />
                <a
                  href={`tel:${settings.phone}`}
                  className="hover:text-amber-300 font-semibold font-mono text-sm"
                >
                  {settings.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={`https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(
                    'হ্যালো, আমি গার্লস ফ্যাশন শাড়ি সম্পর্কে জানতে চাই',
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-emerald-300 font-mono"
                >
                  WhatsApp: {settings.whatsapp}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <span>{settings.email}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Partners & Payment Gateways */}
        <div className="py-6 border-b border-rose-950/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <span className="text-stone-400 font-medium">ডেলিভারি পার্টনার:</span>
            <div className="flex items-center gap-2">
              <span className="bg-[#18080f] border border-rose-900/60 px-2.5 py-1 rounded text-[11px] font-bold text-rose-200">
                Steadfast Courier
              </span>
              <span className="bg-[#18080f] border border-rose-900/60 px-2.5 py-1 rounded text-[11px] font-bold text-rose-200">
                Pathao Courier
              </span>
              <span className="bg-[#18080f] border border-rose-900/60 px-2.5 py-1 rounded text-[11px] font-bold text-rose-200">
                RedX
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-stone-400 font-medium">পেমেন্ট মেথড:</span>
            <div className="flex items-center gap-2">
              <span className="bg-emerald-950/80 border border-emerald-800 text-emerald-300 px-2 py-0.5 rounded text-[11px] font-bold">
                ক্যাশ অন ডেলিভারি
              </span>
              <span className="bg-pink-950/80 border border-pink-800 text-pink-300 px-2 py-0.5 rounded text-[11px] font-bold">
                bKash
              </span>
              <span className="bg-amber-950/80 border border-amber-800 text-amber-300 px-2 py-0.5 rounded text-[11px] font-bold">
                Nagad
              </span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-6 text-center text-xs text-stone-500">
          <p>
            © ২০২৬ {settings.storeName || 'গার্লস ফ্যাশন (আম্বিয়া শাড়ি বাড়ি)'}। সর্বস্বত্ব সংরক্ষিত। ঐতিহ্যবাহী টাঙ্গাইল তাঁত ও প্রিমিয়াম শাড়ির নির্ভরযোগ্য ঠিকানা।
          </p>
        </div>
      </div>
    </footer>
  );
};
