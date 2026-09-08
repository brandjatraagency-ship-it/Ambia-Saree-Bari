import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  ArrowUpDown,
  X,
  ChevronRight,
  SlidersHorizontal,
} from 'lucide-react';
import { Product, PageRoute } from '../types';
import { categories } from '../data/initialData';
import { ProductCard } from '../components/ProductCard';

interface ShopPageProps {
  products: Product[];
  wishlist: Product[];
  initialCategory?: string;
  onToggleWishlist: (p: Product) => void;
  onAddToCart: (p: Product, qty?: number, color?: string) => void;
  onDirectOrder: (p: Product, qty?: number, color?: string) => void;
  onQuickView: (p: Product) => void;
  onNavigate: (page: PageRoute) => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({
  products,
  wishlist,
  initialCategory = 'all',
  onToggleWishlist,
  onAddToCart,
  onDirectOrder,
  onQuickView,
  onNavigate,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [priceRange, setPriceRange] = useState<string>('all');

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.code.toLowerCase().includes(q) ||
          p.fabric.toLowerCase().includes(q) ||
          p.categoryName.toLowerCase().includes(q) ||
          p.colors.some((c) => c.name.toLowerCase().includes(q)),
      );
    }

    // In Stock filter
    if (inStockOnly) {
      result = result.filter((p) => p.inStock !== false && (p.stockCount === undefined || p.stockCount > 0));
    }

    // Price Range filter
    if (priceRange === 'under_2000') {
      result = result.filter((p) => p.price < 2000);
    } else if (priceRange === '2000_3500') {
      result = result.filter((p) => p.price >= 2000 && p.price <= 3500);
    } else if (priceRange === 'above_3500') {
      result = result.filter((p) => p.price > 3500);
    }

    // Sorting
    if (sortBy === 'price_asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price_desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [products, selectedCategory, searchQuery, inStockOnly, priceRange, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setSortBy('featured');
    setInStockOnly(false);
    setPriceRange('all');
  };

  const hasActiveFilters =
    selectedCategory !== 'all' ||
    searchQuery.trim() !== '' ||
    inStockOnly ||
    priceRange !== 'all' ||
    sortBy !== 'featured';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6 sm:space-y-8 animate-fade-in">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-stone-400">
        <button
          onClick={() => onNavigate('home')}
          className="hover:text-rose-400 transition-colors cursor-pointer"
        >
          হোম
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-stone-600" />
        <span className="text-rose-300 font-semibold">শপ (সকল শাড়ি)</span>
        {selectedCategory !== 'all' && (
          <>
            <ChevronRight className="w-3.5 h-3.5 text-stone-600" />
            <span className="text-stone-200">
              {categories.find((c) => c.id === selectedCategory)?.name}
            </span>
          </>
        )}
      </nav>

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-rose-950/80 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-stone-100 font-['Anek_Bangla']">
            শাড়ি শপ ও ক্যাটালগ
          </h1>
          <p className="text-xs sm:text-sm text-stone-400 mt-1">
            টাঙ্গাইলের ঐতিহ্যবাহী তাঁত, জামদানি, সিল্ক ও বুটিক শাড়ির সর্ববৃহৎ অনলাইন কালেকশন
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-stone-300 bg-[#18080f] px-3.5 py-1.5 rounded-full border border-rose-950/80 w-fit">
          <span>মোট প্রদর্শিত:</span>
          <span className="font-bold text-amber-400 font-mono">
            {filteredProducts.length}টি শাড়ি
          </span>
        </div>
      </div>

      {/* Search and Filter Controls Bar */}
      <div className="bg-[#18080f] border border-rose-950/80 rounded-2xl p-4 sm:p-5 space-y-4 shadow-sm">
        {/* Top Controls: Search + Sort */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {/* Search Box */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-rose-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="শাড়ির নাম, জামদানি, সুতি তাঁত বা কোড লিখে খুঁজুন..."
              className="w-full pl-10 pr-9 py-2.5 bg-[#120509] border border-rose-900/60 rounded-xl text-xs sm:text-sm text-stone-100 placeholder:text-stone-400 outline-hidden focus:border-rose-500 focus:bg-[#1a070e]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-stone-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-48">
              <ArrowUpDown className="w-3.5 h-3.5 text-rose-400 absolute left-3 top-3 pointer-events-none" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full pl-9 pr-7 py-2.5 bg-[#120509] border border-rose-900/60 rounded-xl text-xs sm:text-sm text-stone-200 outline-hidden focus:border-rose-500 cursor-pointer appearance-none"
              >
                <option value="featured">ফিচার্ড / নতুন শাড়ি</option>
                <option value="price_asc">দাম: কম থেকে বেশি</option>
                <option value="price_desc">দাম: বেশি থেকে কম</option>
                <option value="rating">সর্বোচ্চ রেটিং</option>
              </select>
            </div>

            {/* Price filter dropdown */}
            <div className="relative flex-1 sm:w-44">
              <SlidersHorizontal className="w-3.5 h-3.5 text-rose-400 absolute left-3 top-3 pointer-events-none" />
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full pl-9 pr-7 py-2.5 bg-[#120509] border border-rose-900/60 rounded-xl text-xs sm:text-sm text-stone-200 outline-hidden focus:border-rose-500 cursor-pointer appearance-none"
              >
                <option value="all">সব দামের শাড়ি</option>
                <option value="under_2000">২,০০০ টাকার নিচে</option>
                <option value="2000_3500">২,০০০ - ৩,৫০০ টাকা</option>
                <option value="above_3500">৩,৫০০ টাকার উপরে</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-stone-400">
            <span className="font-semibold text-rose-300">ক্যাটাগরি নির্বাচন করুন:</span>
            <label className="flex items-center gap-1.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="rounded text-rose-600 focus:ring-rose-500 bg-stone-900 border-stone-700 cursor-pointer"
              />
              <span className="text-[11px] text-stone-300">শুধু ইন-স্টক শাড়ি</span>
            </label>
          </div>

          <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              const count = products.filter(
                (p) => cat.id === 'all' || p.category === cat.id,
              ).length;

              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-r from-rose-700 via-rose-600 to-rose-700 text-white shadow-md shadow-rose-950/60 scale-105 border border-rose-500/50'
                      : 'bg-[#120509] text-rose-200 hover:text-white border border-rose-900/60 hover:border-rose-600'
                  }`}
                >
                  <span>{cat.name}</span>
                  <span
                    className={`ml-1 text-[11px] font-mono ${
                      isSelected ? 'text-amber-300 font-bold' : 'text-rose-400/80'
                    }`}
                  >
                    ({count})
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Filter Clear Bar */}
        {hasActiveFilters && (
          <div className="flex items-center justify-between pt-2 border-t border-rose-950/80 text-xs">
            <span className="text-stone-400 text-[11px]">ফিল্টার সক্রিয় রয়েছে</span>
            <button
              onClick={resetFilters}
              className="text-rose-400 hover:text-rose-300 font-semibold cursor-pointer underline text-xs"
            >
              সব ফিল্টার রিসেট করুন
            </button>
          </div>
        )}
      </div>

      {/* Product Grid or Empty State */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16 bg-[#18080f] rounded-2xl border border-rose-950/80 p-8 space-y-4 max-w-md mx-auto shadow-xl">
          <div className="w-14 h-14 bg-rose-950/80 text-rose-400 rounded-full flex items-center justify-center mx-auto border border-rose-900/60">
            <Filter className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-base text-stone-100">
            আপনার পছন্দের শর্তে কোনো শাড়ি পাওয়া যায়নি
          </h3>
          <p className="text-xs text-rose-300/80 leading-relaxed">
            ফিল্টার কিছুটা পরিবর্তন করুন অথবা অন্য কোনো ক্যাটাগরি দেখে নিন।
          </p>
          <button
            onClick={resetFilters}
            className="px-5 py-2.5 bg-gradient-to-r from-rose-700 to-rose-600 text-white text-xs font-bold rounded-full hover:from-rose-600 hover:to-rose-500 transition-colors cursor-pointer border border-rose-500/40 shadow-md"
          >
            সব শাড়ি রিসেট করুন
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
          {filteredProducts.map((product) => (
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
      )}
    </div>
  );
};
