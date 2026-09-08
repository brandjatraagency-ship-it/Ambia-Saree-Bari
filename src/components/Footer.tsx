import React from 'react';
import {
  Truck,
  RotateCcw,
  MapPin,
  PhoneCall,
  MessageCircle,
  Mail,
  ShieldCheck,
  Heart,
  ChevronRight,
} from 'lucide-react';
import { StoreSettings, PageRoute } from '../types';
import { defaultStoreSettings, categories } from '../data/initialData';

interface FooterProps {
  onSelectCategory: (category: string) => void;
  onOpenTracking: () => void;
  onOpenAdmin?: () => void;
  onNavigate?: (page: PageRoute, category?: string) => void;
  storeSettings?: StoreSettings;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onOpenTracking,
  onOpenAdmin,
  onNavigate,
  storeSettings = defaultStoreSettings,
}) => {
  const settings = storeSettings || defaultStoreSettings;

  const handleNav = (page: PageRoute, category?: string) => {
    if (onNavigate) {
      onNavigate(page, category);
    }
  };

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
              <button
                onClick={() => handleNav('home')}
                className="font-['Playfair_Display',serif] font-black text-xl sm:text-2xl text-stone-100 tracking-tight hover:text-amber-200 transition-colors text-left cursor-pointer"
              >
                {settings.storeNameEn || settings.storeName || 'Ambia Saree Bari'}
              </button>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              {settings.tagline ||
                'টাঙ্গাইল শাড়ির নির্ভরযোগ্য ঠিকানা। সরাসরি তাঁতিদের থেকে খাঁটি সুতি, জামদানি ও সিল্ক শাড়ির নির্ভরযোগ্য অনলাইন সম্ভার।'}
            </p>

            <div className="pt-2 space-y-1.5 text-xs text-stone-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-rose-500" />
                <span>১০০% আসল দেশীয় তাঁতের নিশ্চয়তা</span>
              </div>
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
              {categories.map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => {
                      onSelectCategory(cat.id);
                      handleNav('shop', cat.id);
                    }}
                    className="hover:text-rose-300 transition-colors cursor-pointer text-left text-stone-300 flex items-center gap-1.5"
                  >
                    <span>•</span>
                    <span>{cat.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Customer Support & Pages */}
          <div>
            <h4 className="font-bold text-sm text-stone-100 uppercase tracking-wider mb-4 border-l-2 border-rose-600 pl-2.5">
              ওয়েবসাইট মেনু ও পেজসমূহ
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-300">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="hover:text-rose-300 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-rose-500" />
                  <span>হোম পেজ</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('shop')}
                  className="hover:text-rose-300 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-rose-500" />
                  <span>শপ (সকল শাড়ি ক্যাটালগ)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('tracking')}
                  className="hover:text-emerald-300 transition-colors text-emerald-400 font-semibold cursor-pointer flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                  <span>অর্ডার লাইভ ট্র্যাকিং</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('reviews')}
                  className="hover:text-amber-300 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-amber-400" />
                  <span>গ্রাহক মতামত ও রিভিউ</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('care')}
                  className="hover:text-rose-300 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-rose-500" />
                  <span>শাড়ির যত্ন ও সুরক্ষার নির্দেশিকা</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="hover:text-rose-300 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-rose-500" />
                  <span>আমাদের গল্প ও তাঁতের ঐতিহ্য</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('contact')}
                  className="hover:text-rose-300 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-rose-500" />
                  <span>যোগাযোগ ও আউটলেট</span>
                </button>
              </li>
              {onOpenAdmin && (
                <li className="pt-1">
                  <button
                    onClick={onOpenAdmin}
                    className="hover:text-rose-300 transition-colors text-stone-400 hover:underline cursor-pointer flex items-center gap-1.5"
                  >
                    <span>⚙️ মার্চেন্ট ও অ্যাডমিন পোর্টাল</span>
                  </button>
                </li>
              )}
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
                    'আউটলেট: আম্বিয়া শাড়ি বাড়ি, টাঙ্গাইল সদর, টাঙ্গাইল এবং ঢাকা হাব।'}
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
                    'হ্যালো, আমি আম্বিয়া শাড়ি বাড়ির শাড়ি সম্পর্কে জানতে চাই',
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
                <span>{settings.email || 'support@ambiasareebari.com'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} {settings.storeNameEn || 'Ambia Saree Bari'}. সর্বস্বত্ব সংরক্ষিত।</p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleNav('care')}
              className="hover:text-stone-400 transition-colors cursor-pointer"
            >
              শাড়ির যত্ন
            </button>
            <span>•</span>
            <button
              onClick={() => handleNav('contact')}
              className="hover:text-stone-400 transition-colors cursor-pointer"
            >
              ডেলিভারি পলিসি
            </button>
            <span>•</span>
            <button
              onClick={() => handleNav('contact')}
              className="hover:text-stone-400 transition-colors cursor-pointer"
            >
              রিটার্ন শর্তাবলী
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
