import React, { useState, useEffect, useMemo, useRef } from 'react';
import { CheckCircle, Search } from 'lucide-react';
import {
  Product,
  CartItem,
  Order,
  Coupon,
  Review,
  StoreSettings,
  HeroSlide,
  HeroSettings,
  CategoryHighlight,
  FAQItem,
  CareTip,
} from './types';
import {
  initialProducts,
  initialOrders,
  initialCoupons,
  initialReviews,
  defaultStoreSettings,
  defaultHeroSlides,
  defaultHeroSettings,
  defaultCategoryHighlights,
  defaultFaqs,
  defaultCareTips,
  categories,
} from './data/initialData';

import { Header } from './components/Header';
import { HeroSlider } from './components/HeroSlider';
import { ProductCard } from './components/ProductCard';
import { ProductQuickViewModal } from './components/ProductQuickViewModal';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { AdminPanelModal } from './components/AdminPanelModal';
import { ReviewsSection } from './components/ReviewsSection';
import { SareeCareTips } from './components/SareeCareTips';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { MobileBottomBar } from './components/MobileBottomBar';

export default function App() {
  // Cart state with localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('asb_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist state with localStorage
  const [wishlist, setWishlist] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('asb_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Orders state with localStorage
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('asb_orders');
      return saved ? JSON.parse(saved) : initialOrders;
    } catch {
      return initialOrders;
    }
  });

  // Products state with localStorage
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('asb_products');
      return saved ? JSON.parse(saved) : initialProducts;
    } catch {
      return initialProducts;
    }
  });

  // Coupons state with localStorage
  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    try {
      const saved = localStorage.getItem('asb_coupons');
      return saved ? JSON.parse(saved) : initialCoupons;
    } catch {
      return initialCoupons;
    }
  });

  // Reviews state with localStorage
  const [reviews, setReviews] = useState<Review[]>(() => {
    try {
      const saved = localStorage.getItem('asb_reviews');
      return saved ? JSON.parse(saved) : initialReviews;
    } catch {
      return initialReviews;
    }
  });

  // Settings state with localStorage
  const [storeSettings, setStoreSettings] = useState<StoreSettings>(() => {
    try {
      const saved = localStorage.getItem('asb_settings');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...defaultStoreSettings,
          ...parsed,
          storeName: 'Ambia Saree Bari',
          storeNameEn: 'Ambia Saree Bari',
          logoType: parsed.logoType === 'image' && parsed.logoUrl && !parsed.logoUrl.includes('girls_fashion_banner') ? 'image' : 'text',
          logoUrl: parsed.logoUrl?.includes('girls_fashion_banner') ? '' : (parsed.logoUrl || ''),
        };
      }
      return defaultStoreSettings;
    } catch {
      return defaultStoreSettings;
    }
  });

  // Hero slides state with localStorage
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>(() => {
    try {
      const saved = localStorage.getItem('asb_hero_slides');
      return saved ? JSON.parse(saved) : defaultHeroSlides;
    } catch {
      return defaultHeroSlides;
    }
  });

  // Hero settings state with localStorage
  const [heroSettings, setHeroSettings] = useState<HeroSettings>(() => {
    try {
      const saved = localStorage.getItem('asb_hero_settings');
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...defaultHeroSettings, ...parsed, fitMode: 'cover' };
      }
      return defaultHeroSettings;
    } catch {
      return defaultHeroSettings;
    }
  });

  // Category highlights state with localStorage
  const [categoryHighlights, setCategoryHighlights] = useState<
    CategoryHighlight[]
  >(() => {
    try {
      const saved = localStorage.getItem('asb_category_highlights');
      return saved ? JSON.parse(saved) : defaultCategoryHighlights;
    } catch {
      return defaultCategoryHighlights;
    }
  });

  // FAQs state with localStorage
  const [faqs, setFaqs] = useState<FAQItem[]>(() => {
    try {
      const saved = localStorage.getItem('asb_faqs');
      return saved ? JSON.parse(saved) : defaultFaqs;
    } catch {
      return defaultFaqs;
    }
  });

  // Care tips state with localStorage
  const [careTips, setCareTips] = useState<CareTip[]>(() => {
    try {
      const saved = localStorage.getItem('asb_care_tips');
      return saved ? JSON.parse(saved) : defaultCareTips;
    } catch {
      return defaultCareTips;
    }
  });

  // Admin modal state
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Sync to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('asb_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('asb_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('asb_orders', JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem('asb_products', JSON.stringify(products));
    } catch (e) {
      console.error(e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem('asb_coupons', JSON.stringify(coupons));
    } catch (e) {
      console.error(e);
    }
  }, [coupons]);

  useEffect(() => {
    try {
      localStorage.setItem('asb_reviews', JSON.stringify(reviews));
    } catch (e) {
      console.error(e);
    }
  }, [reviews]);

  useEffect(() => {
    try {
      localStorage.setItem('asb_settings', JSON.stringify(storeSettings));
    } catch (e) {
      console.error(e);
    }
  }, [storeSettings]);

  useEffect(() => {
    try {
      localStorage.setItem('asb_hero_slides', JSON.stringify(heroSlides));
    } catch (e) {
      console.error(e);
    }
  }, [heroSlides]);

  useEffect(() => {
    try {
      localStorage.setItem('asb_hero_settings', JSON.stringify(heroSettings));
    } catch (e) {
      console.error(e);
    }
  }, [heroSettings]);

  useEffect(() => {
    try {
      localStorage.setItem(
        'asb_category_highlights',
        JSON.stringify(categoryHighlights),
      );
    } catch (e) {
      console.error(e);
    }
  }, [categoryHighlights]);

  useEffect(() => {
    try {
      localStorage.setItem('asb_faqs', JSON.stringify(faqs));
    } catch (e) {
      console.error(e);
    }
  }, [faqs]);

  useEffect(() => {
    try {
      localStorage.setItem('asb_care_tips', JSON.stringify(careTips));
    } catch (e) {
      console.error(e);
    }
  }, [careTips]);

  // Reset Demo Data
  const handleResetDemoData = () => {
    setProducts(initialProducts);
    setOrders(initialOrders);
    setCoupons(initialCoupons);
    setReviews(initialReviews);
    setStoreSettings(defaultStoreSettings);
    setHeroSlides(defaultHeroSlides);
    setHeroSettings(defaultHeroSettings);
    setCategoryHighlights(defaultCategoryHighlights);
    setFaqs(defaultFaqs);
    setCareTips(defaultCareTips);

    localStorage.removeItem('asb_products');
    localStorage.removeItem('asb_orders');
    localStorage.removeItem('asb_coupons');
    localStorage.removeItem('asb_reviews');
    localStorage.removeItem('asb_settings');
    localStorage.removeItem('asb_hero_slides');
    localStorage.removeItem('asb_hero_settings');
    localStorage.removeItem('asb_category_highlights');
    localStorage.removeItem('asb_faqs');
    localStorage.removeItem('asb_care_tips');
  };

  // UI States
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [isHotDealOnly, setIsHotDealOnly] = useState<boolean>(false);

  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState<boolean>(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState<boolean>(false);
  const [trackingOrderId, setTrackingOrderId] = useState<string | undefined>();

  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [checkoutItems, setCheckoutItems] = useState<CartItem[]>([]);
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const productsSectionRef = useRef<HTMLDivElement>(null);

  const scrollToProducts = () => {
    productsSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Filtered and Sorted Products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.category === selectedCategory);
    }

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

    if (isHotDealOnly) {
      result = result.filter((p) => p.isHotDeal || p.isBestSeller);
    }

    if (sortBy === 'price_asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price_desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [products, selectedCategory, searchQuery, isHotDealOnly, sortBy]);

  // Cart operations
  const handleAddToCart = (product: Product, quantity = 1, color?: string) => {
    setCart((prev) => {
      const idx = prev.findIndex((item) => item.product.id === product.id);
      if (idx > -1) {
        const next = [...prev];
        next[idx].quantity += quantity;
        if (color) next[idx].selectedColor = color;
        return next;
      }
      return [
        ...prev,
        {
          product,
          quantity,
          selectedColor: color || product.colors[0]?.name,
        },
      ];
    });
    showToast(`"${product.name}" কার্টে যোগ করা হয়েছে!`);
  };

  const handleUpdateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveCartItem(productId);
    } else {
      setCart((prev) =>
        prev.map((item) =>
          item.product.id === productId ? { ...item, quantity } : item,
        ),
      );
    }
  };

  const handleRemoveCartItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('শাড়িটি কার্ট থেকে সরানো হয়েছে।');
  };

  const handleClearCart = () => {
    setCart([]);
    showToast('কার্ট খালি করা হয়েছে।');
  };

  // Direct buy / Quick order
  const handleDirectOrder = (product: Product, quantity = 1, color?: string) => {
    setCheckoutItems([
      {
        product,
        quantity,
        selectedColor: color || product.colors[0]?.name,
      },
    ]);
    setIsCheckoutOpen(true);
  };

  const handleProceedToCheckoutFromCart = () => {
    if (cart.length === 0) return;
    setCheckoutItems([...cart]);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  // Wishlist operations
  const handleToggleWishlist = (product: Product) => {
    if (wishlist.some((item) => item.id === product.id)) {
      setWishlist((prev) => prev.filter((item) => item.id !== product.id));
      showToast('পছন্দের তালিকা থেকে সরানো হয়েছে।');
    } else {
      setWishlist((prev) => [...prev, product]);
      showToast(`"${product.name}" পছন্দের তালিকায় যোগ করা হয়েছে!`);
    }
  };

  const handleRemoveWishlist = (productId: string) => {
    setWishlist((prev) => prev.filter((item) => item.id !== productId));
  };

  // Order success
  const handleOrderSuccess = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
    setCart((prev) =>
      prev.filter(
        (ci) => !newOrder.items.some((oi) => oi.product.id === ci.product.id),
      ),
    );
    setPlacedOrder(newOrder);
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  return (
    <div className="min-h-screen bg-[#0e0407] text-stone-100 flex flex-col selection:bg-rose-700 selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-[#1f050c] text-rose-100 text-xs sm:text-sm px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-2 border border-rose-800/80 animate-fade-in">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <Header
        cartCount={totalCartCount}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenTracking={() => {
          setTrackingOrderId(undefined);
          setIsTrackingOpen(true);
        }}
        onOpenAdmin={() => setIsAdminOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          scrollToProducts();
        }}
        cartTotal={cartSubtotal}
        storeSettings={storeSettings}
      />

      {/* Hero Carousel Slider */}
      <HeroSlider
        slides={heroSlides}
        heroSettings={heroSettings}
        categoryHighlights={categoryHighlights}
        storeSettings={storeSettings}
        onExploreClick={scrollToProducts}
        onQuickOrderHero={() => handleDirectOrder(products[0])}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          scrollToProducts();
        }}
      />

      {/* Main Product Catalog Section */}
      <section
        id="products"
        ref={productsSectionRef}
        className="w-full bg-[#0e0407] py-8 sm:py-12 border-t border-rose-950/80 flex-1"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Section Header */}
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="font-sans font-black text-2xl sm:text-3xl md:text-4xl text-rose-400 tracking-tight">
              All products
            </h2>
            <div className="w-12 h-1 bg-rose-600 mx-auto rounded-full mt-2 mb-4 shadow-sm" />

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 max-w-4xl mx-auto mt-3">
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                const count = products.filter(
                  (p) => cat.id === 'all' || p.category === cat.id,
                ).length;

                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3.5 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-gradient-to-r from-rose-700 via-rose-600 to-rose-700 text-white shadow-md shadow-rose-950/50 scale-105 border border-rose-500/50'
                        : 'bg-[#18080f] text-rose-200 hover:text-white border border-rose-900/60 hover:border-rose-600 shadow-2xs'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span
                      className={`ml-1 text-[11px] font-mono ${
                        isSelected
                          ? 'text-amber-300 font-bold'
                          : 'text-rose-400/80'
                      }`}
                    >
                      ({count})
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Product Grid or Empty State */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16 bg-[#18080f] rounded-2xl border border-rose-950 p-8 space-y-4 max-w-lg mx-auto shadow-xl">
              <div className="w-14 h-14 bg-rose-950/80 text-rose-400 rounded-full flex items-center justify-center mx-auto border border-rose-900/60">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-stone-100">
                দুঃখিত! আপনার খোঁজা শাড়িটি পাওয়া যায়নি
              </h3>
              <p className="text-xs text-rose-300/80">
                দয়া করে অন্য কোনো নাম বা ক্যাটাগরি দিয়ে চেষ্টা করুন।
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                  setIsHotDealOnly(false);
                }}
                className="px-5 py-2 bg-gradient-to-r from-rose-700 to-rose-600 text-white text-xs font-bold rounded-full hover:from-rose-600 hover:to-rose-500 transition-colors cursor-pointer border border-rose-500/40 shadow-md"
              >
                সব শাড়ি দেখুন
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isWishlisted={wishlist.some((w) => w.id === product.id)}
                  onToggleWishlist={handleToggleWishlist}
                  onAddToCart={(p) => handleAddToCart(p, 1)}
                  onDirectOrder={(p) => handleDirectOrder(p, 1)}
                  onQuickView={(p) => setQuickViewProduct(p)}
                />
              ))}
            </div>
          )}

          {/* Bottom Catalog Status / Button */}
          <div className="mt-8 text-center">
            {selectedCategory !== 'all' ? (
              <button
                onClick={() => setSelectedCategory('all')}
                className="px-6 py-2.5 bg-[#18080f] hover:bg-[#250914] text-rose-300 hover:text-white border border-rose-900/80 font-bold text-xs sm:text-sm rounded-full shadow-md transition-colors cursor-pointer inline-flex items-center gap-2"
              >
                <span>সব শাড়ি কালেকশন দেখুন ({products.length}টি শাড়ি)</span>
              </button>
            ) : (
              <div className="inline-flex items-center gap-2 px-5 py-2 bg-[#18080f]/80 border border-rose-950 text-rose-300 text-xs font-semibold rounded-full shadow-xs">
                <span>
                  সবগুলো প্রিমিয়াম শাড়ি প্রদর্শিত হচ্ছে ({products.length}টি আইটেম)
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Saree Care Tips */}
      <SareeCareTips careTips={careTips} />

      {/* Authentic Customer Reviews with Chat Screenshots */}
      <ReviewsSection reviews={reviews} />

      {/* FAQ Section */}
      <FAQSection faqs={faqs} />

      {/* Footer */}
      <Footer
        storeSettings={storeSettings}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          scrollToProducts();
        }}
        onOpenTracking={() => {
          setTrackingOrderId(undefined);
          setIsTrackingOpen(true);
        }}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Mobile Floating Actions & Bottom Navigation */}
      <MobileBottomBar
        cartCount={totalCartCount}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenTracking={() => {
          setTrackingOrderId(undefined);
          setIsTrackingOpen(true);
        }}
        onScrollToTop={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        storeSettings={storeSettings}
      />

      {/* MODALS & DRAWERS */}
      {/* 1. Product Quick View Modal */}
      <ProductQuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={(p, qty, color) => handleAddToCart(p, qty, color)}
        onDirectOrder={(p, qty, color) => handleDirectOrder(p, qty, color)}
      />

      {/* 2. Direct Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={checkoutItems}
        onOrderSuccess={handleOrderSuccess}
        onUpdateQuantity={(pId, qty) => {
          setCheckoutItems((prev) =>
            prev.map((it) =>
              it.product.id === pId ? { ...it, quantity: qty } : it,
            ),
          );
        }}
        coupons={coupons}
        storeSettings={storeSettings}
      />

      {/* 3. Order Placed Success Modal */}
      <OrderSuccessModal
        order={placedOrder}
        isOpen={!!placedOrder}
        onClose={() => setPlacedOrder(null)}
        onOpenTracking={(orderId) => {
          setTrackingOrderId(orderId);
          setIsTrackingOpen(true);
        }}
      />

      {/* 4. Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={handleProceedToCheckoutFromCart}
        onClearCart={handleClearCart}
      />

      {/* 5. Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        onRemoveWishlist={handleRemoveWishlist}
        onAddToCart={(p) => handleAddToCart(p, 1)}
        onDirectOrder={(p) => handleDirectOrder(p, 1)}
      />

      {/* 6. Order Tracking Modal */}
      <OrderTrackingModal
        isOpen={isTrackingOpen}
        onClose={() => setIsTrackingOpen(false)}
        orders={orders}
        prefilledOrderId={trackingOrderId}
      />

      {/* 7. Merchant Admin ERP Modal */}
      <AdminPanelModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        orders={orders}
        setOrders={setOrders}
        products={products}
        setProducts={setProducts}
        coupons={coupons}
        setCoupons={setCoupons}
        reviews={reviews}
        setReviews={setReviews}
        storeSettings={storeSettings}
        setStoreSettings={setStoreSettings}
        onResetDemoData={handleResetDemoData}
        heroSlides={heroSlides}
        setHeroSlides={setHeroSlides}
        heroSettings={heroSettings}
        setHeroSettings={setHeroSettings}
        categoryHighlights={categoryHighlights}
        setCategoryHighlights={setCategoryHighlights}
        faqs={faqs}
        setFaqs={setFaqs}
        careTips={careTips}
        setCareTips={setCareTips}
      />
    </div>
  );
}
