import React from 'react';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  CheckCircle2,
  PhoneCall,
  MessageCircle,
  Star,
  ChevronRight,
} from 'lucide-react';
import {
  Product,
  StoreSettings,
  HeroSlide,
  HeroSettings,
  CategoryHighlight,
  Review,
  FAQItem,
  PageRoute,
} from '../types';
import { HeroSlider } from '../components/HeroSlider';
import { ProductCard } from '../components/ProductCard';
import { FAQSection } from '../components/FAQSection';

interface HomePageProps {
  heroSlides: HeroSlide[];
  heroSettings: HeroSettings;
  categoryHighlights: CategoryHighlight[];
  storeSettings: StoreSettings;
  products: Product[];
  wishlist: Product[];
  reviews: Review[];
  faqs: FAQItem[];
  onToggleWishlist: (p: Product) => void;
  onAddToCart: (p: Product, qty?: number, color?: string) => void;
  onDirectOrder: (p: Product, qty?: number, color?: string) => void;
  onQuickView: (p: Product) => void;
  onNavigate: (page: PageRoute, category?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  heroSlides,
  heroSettings,
  categoryHighlights,
  storeSettings,
  products,
  wishlist,
  reviews,
  faqs,
  onToggleWishlist,
  onAddToCart,
  onDirectOrder,
  onQuickView,
  onNavigate,
}) => {
  const featuredProducts = products.slice(0, 8);
  const hotDeals = products.filter((p) => p.isHotDeal || p.isBestSeller).slice(0, 4);
  const phone = storeSettings.phone || '01796962283';
  const whatsapp = storeSettings.whatsapp || '8801796962283';

  return (
    <div className="space-y-12 sm:space-y-16 animate-fade-in">
      {/* 1. HERO SLIDER */}
      <HeroSlider
        slides={heroSlides}
        heroSettings={heroSettings}
        categoryHighlights={categoryHighlights}
        storeSettings={storeSettings}
        onExploreClick={() => onNavigate('shop')}
        onQuickOrderHero={() => {
          if (products[0]) onDirectOrder(products[0]);
        }}
        onSelectCategory={(cat) => onNavigate('shop', cat)}
      />

      {/* 2. TRUST BADGES / PILLARS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-[#18080f] border border-rose-950/80 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5 shadow-sm hover:border-rose-800/80 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-rose-950/80 border border-rose-800/60 flex items-center justify-center text-rose-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-stone-100 font-['Anek_Bangla']">
                ১০০% খাঁটি তাঁতের শাড়ি
              </h4>
              <p className="text-xs text-stone-400 mt-1">
                টাঙ্গাইলের অভিজ্ঞ কারিগরদের হাতে বোনা খাঁটি শাড়ি
              </p>
            </div>
          </div>

          <div className="bg-[#18080f] border border-rose-950/80 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5 shadow-sm hover:border-rose-800/80 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-rose-950/80 border border-rose-800/60 flex items-center justify-center text-amber-400 shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-stone-100 font-['Anek_Bangla']">
                সারা দেশে ক্যাশ অন ডেলিভারি
              </h4>
              <p className="text-xs text-stone-400 mt-1">
                ঢাকা সহ ৬৪ জেলায় হোম ডেলিভারি সুবিধা
              </p>
            </div>
          </div>

          <div className="bg-[#18080f] border border-rose-950/80 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5 shadow-sm hover:border-rose-800/80 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-rose-950/80 border border-rose-800/60 flex items-center justify-center text-emerald-400 shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-stone-100 font-['Anek_Bangla']">
                দেখে নিয়ে মূল্য পরিশোধ
              </h4>
              <p className="text-xs text-stone-400 mt-1">
                ডেলিভারিম্যানের সামনে শাড়ি যাচাই করে গ্রহণের সুযোগ
              </p>
            </div>
          </div>

          <div className="bg-[#18080f] border border-rose-950/80 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5 shadow-sm hover:border-rose-800/80 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-rose-950/80 border border-rose-800/60 flex items-center justify-center text-rose-300 shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-stone-100 font-['Anek_Bangla']">
                সহজ রিটার্ন ও রিপ্লেসমেন্ট
              </h4>
              <p className="text-xs text-stone-400 mt-1">
                যেকোনো ত্রুটিতে রয়েছে দ্রুত পরিবর্তনের নিশ্চয়তা
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED SAREES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 border-b border-rose-950/80 pb-4">
          <div>
            <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>এক্সক্লুসিভ কালেকশন ২০২৬</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-100 font-['Anek_Bangla']">
              জনপ্রিয় শাড়ি কালেকশন
            </h2>
          </div>
          <button
            onClick={() => onNavigate('shop')}
            className="inline-flex items-center gap-2 text-rose-400 hover:text-rose-300 font-bold text-sm cursor-pointer group"
          >
            <span>সব শাড়ি দেখুন ({products.length}টি)</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isWishlisted={wishlist.some((w) => w.id === product.id)}
              onToggleWishlist={onToggleWishlist}
              onAddToCart={(p) => onAddToCart(p, 1)}
              onDirectOrder={(p) => onDirectOrder(p, 1)}
              onQuickView={onQuickView}
            />
          ))}
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => onNavigate('shop')}
            className="px-8 py-3 bg-gradient-to-r from-rose-800 to-rose-600 hover:from-rose-700 hover:to-rose-500 text-white font-bold text-sm sm:text-base rounded-full shadow-lg hover:shadow-rose-900/50 transition-all cursor-pointer inline-flex items-center gap-2"
          >
            <span>শপ পেজে গিয়ে সম্পূর্ণ ক্যাটালগ দেখুন</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 4. HOT DEALS BANNER */}
      {hotDeals.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="bg-gradient-to-r from-[#240a13] via-[#1a070e] to-[#240a13] border border-rose-900/60 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center md:text-left">
                <span className="inline-block px-3 py-1 bg-amber-400/20 text-amber-300 border border-amber-400/30 rounded-full text-xs font-bold">
                  🔥 বিশেষ সীমিত অফার
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white font-['Anek_Bangla']">
                  টাঙ্গাইল তাঁত ও জামদানি শাড়িতে বিশেষ ছাড়!
                </h3>
                <p className="text-stone-300 text-xs sm:text-sm max-w-xl">
                  প্রতিটি শাড়িতে পাচ্ছেন খাঁটি সুতা ও নিখুঁত বুননের গ্যারান্টি। কোনো অগ্রিম ছাড়াই ঘরে বসে দেখে নিন।
                </p>
              </div>
              <button
                onClick={() => onNavigate('shop')}
                className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-stone-950 font-black text-sm rounded-full shadow-md cursor-pointer shrink-0 transition-transform active:scale-95"
              >
                হট ডিল অফার দেখুন
              </button>
            </div>
          </div>
        </section>
      )}

      {/* 5. CUSTOMER REVIEWS PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-6 border-b border-rose-950/80 pb-4">
          <div>
            <div className="flex items-center gap-1.5 text-amber-400 text-xs font-bold mb-1">
              <Star className="w-4 h-4 fill-amber-400" />
              <span>৪.৯ / ৫.০ স্টার রেটিং (৪০০+ রিভিউ)</span>
            </div>
            <h3 className="text-2xl font-black text-stone-100 font-['Anek_Bangla']">
              সন্তুষ্ট গ্রাহকদের মন্তব্য
            </h3>
          </div>
          <button
            onClick={() => onNavigate('reviews')}
            className="text-rose-400 hover:text-rose-300 text-sm font-bold flex items-center gap-1 cursor-pointer"
          >
            <span>সব রিভিউ ({reviews.length})</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {reviews.slice(0, 3).map((rev) => (
            <div
              key={rev.id}
              className="bg-[#18080f] border border-rose-950/80 rounded-2xl p-5 space-y-3 shadow-xs"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-stone-100">{rev.customerName}</h4>
                  <span className="text-[11px] text-stone-400">{rev.location}</span>
                </div>
                <div className="flex items-center gap-0.5 text-amber-400">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
              </div>
              <p className="text-xs text-stone-300 italic leading-relaxed">
                "{rev.comment}"
              </p>
              <div className="pt-2 border-t border-rose-950/60 flex items-center justify-between text-[11px] text-stone-400">
                <span className="text-rose-300 font-medium">শাড়ি: {rev.productName}</span>
                <span className="text-emerald-400 font-bold">✓ ভেরিফাইড ক্রেতা</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. FAQ PREVIEW */}
      <FAQSection faqs={faqs.slice(0, 4)} />

      {/* 7. QUICK HELP / CONTACT BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-4">
        <div className="bg-[#16050b] border border-rose-900/60 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <h4 className="text-lg font-bold text-white font-['Anek_Bangla']">
              কোনো শাড়ি পছন্দ করতে সাহায্য প্রয়োজন?
            </h4>
            <p className="text-xs text-stone-400 mt-0.5">
              আমাদের শাড়ি বিশেষজ্ঞদের সাথে সরাসরি কথা বলুন বা মেসেজ দিন।
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={`tel:${phone}`}
              className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-stone-200 border border-rose-900/60 text-xs font-bold rounded-xl flex items-center gap-2 transition-colors cursor-pointer"
            >
              <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
              <span>{phone}</span>
            </a>
            <a
              href={`https://wa.me/${whatsapp}?text=${encodeURIComponent('হ্যালো, আমি শাড়ি সম্পর্কে জানতে চাই।')}`}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 bg-[#25d366] hover:bg-[#20ba5a] text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-xs cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              <span>হোয়াটসঅ্যাপ</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
