import React, { useState, useEffect, useMemo, useRef } from 'react';
import { CheckCircle } from 'lucide-react';
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
  PageRoute,
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
import { ProductQuickViewModal } from './components/ProductQuickViewModal';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { AdminPanelModal } from './components/AdminPanelModal';
import { Footer } from './components/Footer';
import { MobileBottomBar } from './components/MobileBottomBar';

// Pages
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ContactPage } from './pages/ContactPage';
import { TrackingPage } from './pages/TrackingPage';
import { ReviewsPage } from './pages/ReviewsPage';
import { CareTipsPage } from './pages/CareTipsPage';
import { AboutPage } from './pages/AboutPage';

export default function App() {
  // Navigation & Multi-page Routing
  const getInitialPage = (): PageRoute => {
    try {
      const hash = window.location.hash.replace('#/', '').replace('#', '').toLowerCase();
      const validPages: PageRoute[] = [
        'home',
        'shop',
        'contact',
        'tracking',
        'reviews',
        'care',
        'about',
      ];
      if (validPages.includes(hash as PageRoute)) {
        return hash as PageRoute;
      }
    } catch {
      // fallback
    }
    return 'home';
  };

  const [currentPage, setCurrentPage] = useState<PageRoute>(getInitialPage);

  // Synchronize browser history and hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '').replace('#', '').toLowerCase();
      const validPages: PageRoute[] = [
        'home',
        'shop',
        'contact',
        'tracking',
        'reviews',
        'care',
        'about',
      ];
      if (validPages.includes(hash as PageRoute)) {
        setCurrentPage(hash as PageRoute);
      } else if (!hash) {
        setCurrentPage('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page: PageRoute, category?: string) => {
    if (category) {
      setSelectedCategory(category);
    }
    setCurrentPage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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

  // Coupons state
  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    try {
      const saved = localStorage.getItem('asb_coupons');
      return saved ? JSON.parse(saved) : initialCoupons;
    } catch {
      return initialCoupons;
    }
  });

  // Reviews state
  const [reviews, setReviews] = useState<Review[]>(() => {
    try {
      const saved = localStorage.getItem('asb_reviews');
      return saved ? JSON.parse(saved) : initialReviews;
    } catch {
      return initialReviews;
    }
  });

  // Store settings
  const [storeSettings, setStoreSettings] = useState<StoreSettings>(() => {
    try {
      const saved = localStorage.getItem('asb_store_settings');
      return saved ? JSON.parse(saved) : defaultStoreSettings;
    } catch {
      return defaultStoreSettings;
    }
  });

  // Hero Slides
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>(() => {
    try {
      const saved = localStorage.getItem('asb_hero_slides');
      return saved ? JSON.parse(saved) : defaultHeroSlides;
    } catch {
      return defaultHeroSlides;
    }
  });

  // Hero Settings
  const [heroSettings, setHeroSettings] = useState<HeroSettings>(() => {
    try {
      const saved = localStorage.getItem('asb_hero_settings');
      return saved ? JSON.parse(saved) : defaultHeroSettings;
    } catch {
      return defaultHeroSettings;
    }
  });

  // Category Highlights
  const [categoryHighlights, setCategoryHighlights] = useState<CategoryHighlight[]>(() => {
    try {
      const saved = localStorage.getItem('asb_category_highlights');
      return saved ? JSON.parse(saved) : defaultCategoryHighlights;
    } catch {
      return defaultCategoryHighlights;
    }
  });

  // FAQs
  const [faqs, setFaqs] = useState<FAQItem[]>(() => {
    try {
      const saved = localStorage.getItem('asb_faqs');
      return saved ? JSON.parse(saved) : defaultFaqs;
    } catch {
      return defaultFaqs;
    }
  });

  // Care Tips
  const [careTips, setCareTips] = useState<CareTip[]>(() => {
    try {
      const saved = localStorage.getItem('asb_care_tips');
      return saved ? JSON.parse(saved) : defaultCareTips;
    } catch {
      return defaultCareTips;
    }
  });

  // Admin ERP Modal State
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('asb_cart', JSON.stringify(cart));
    } catch (e) {
      console.warn('LocalStorage save failed', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('asb_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.warn('LocalStorage save failed', e);
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('asb_orders', JSON.stringify(orders));
    } catch (e) {
      console.warn('LocalStorage save failed', e);
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem('asb_products', JSON.stringify(products));
    } catch (e) {
      console.warn('LocalStorage save failed', e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem('asb_coupons', JSON.stringify(coupons));
    } catch (e) {
      console.warn('LocalStorage save failed', e);
    }
  }, [coupons]);

  useEffect(() => {
    try {
      localStorage.setItem('asb_reviews', JSON.stringify(reviews));
    } catch (e) {
      console.warn('LocalStorage save failed', e);
    }
  }, [reviews]);

  useEffect(() => {
    try {
      localStorage.setItem('asb_store_settings', JSON.stringify(storeSettings));
    } catch (e) {
      console.warn('LocalStorage save failed', e);
    }
  }, [storeSettings]);

  useEffect(() => {
    try {
      localStorage.setItem('asb_hero_slides', JSON.stringify(heroSlides));
    } catch (e) {
      console.warn('LocalStorage save failed', e);
    }
  }, [heroSlides]);

  useEffect(() => {
    try {
      localStorage.setItem('asb_hero_settings', JSON.stringify(heroSettings));
    } catch (e) {
      console.warn('LocalStorage save failed', e);
    }
  }, [heroSettings]);

  useEffect(() => {
    try {
      localStorage.setItem('asb_category_highlights', JSON.stringify(categoryHighlights));
    } catch (e) {
      console.warn('LocalStorage save failed', e);
    }
  }, [categoryHighlights]);

  useEffect(() => {
    try {
      localStorage.setItem('asb_faqs', JSON.stringify(faqs));
    } catch (e) {
      console.warn('LocalStorage save failed', e);
    }
  }, [faqs]);

  useEffect(() => {
    try {
      localStorage.setItem('asb_care_tips', JSON.stringify(careTips));
    } catch (e) {
      console.warn('LocalStorage save failed', e);
    }
  }, [careTips]);

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
    localStorage.removeItem('asb_store_settings');
    localStorage.removeItem('asb_hero_slides');
    localStorage.removeItem('asb_hero_settings');
    localStorage.removeItem('asb_category_highlights');
    localStorage.removeItem('asb_faqs');
    localStorage.removeItem('asb_care_tips');
  };

  // UI States
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

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

      {/* Global Header */}
      <Header
        currentPage={currentPage}
        onNavigate={navigateTo}
        cartCount={totalCartCount}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenTracking={() => {
          setTrackingOrderId(undefined);
          navigateTo('tracking');
        }}
        onOpenAdmin={() => setIsAdminOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          navigateTo('shop', cat);
        }}
        cartTotal={cartSubtotal}
        storeSettings={storeSettings}
      />

      {/* Dynamic Multi-Page Router View */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            heroSlides={heroSlides}
            heroSettings={heroSettings}
            categoryHighlights={categoryHighlights}
            storeSettings={storeSettings}
            products={products}
            wishlist={wishlist}
            reviews={reviews}
            faqs={faqs}
            onToggleWishlist={handleToggleWishlist}
            onAddToCart={(p, qty, color) => handleAddToCart(p, qty, color)}
            onDirectOrder={(p, qty, color) => handleDirectOrder(p, qty, color)}
            onQuickView={(p) => setQuickViewProduct(p)}
            onNavigate={navigateTo}
          />
        )}

        {currentPage === 'shop' && (
          <ShopPage
            products={products}
            wishlist={wishlist}
            initialCategory={selectedCategory}
            onToggleWishlist={handleToggleWishlist}
            onAddToCart={(p, qty, color) => handleAddToCart(p, qty, color)}
            onDirectOrder={(p, qty, color) => handleDirectOrder(p, qty, color)}
            onQuickView={(p) => setQuickViewProduct(p)}
            onNavigate={navigateTo}
          />
        )}

        {currentPage === 'contact' && (
          <ContactPage
            storeSettings={storeSettings}
            onNavigate={navigateTo}
          />
        )}

        {currentPage === 'tracking' && (
          <TrackingPage
            orders={orders}
            prefilledOrderId={trackingOrderId}
            storeSettings={storeSettings}
            onNavigate={navigateTo}
          />
        )}

        {currentPage === 'reviews' && (
          <ReviewsPage
            reviews={reviews}
            onAddReview={(newRev) => {
              setReviews((prev) => [newRev, ...prev]);
              showToast('আপনার রিভিউ সফলভাবে যুক্ত হয়েছে!');
            }}
            onNavigate={navigateTo}
          />
        )}

        {currentPage === 'care' && (
          <CareTipsPage
            careTips={careTips}
            storeSettings={storeSettings}
            onNavigate={navigateTo}
          />
        )}

        {currentPage === 'about' && (
          <AboutPage
            storeSettings={storeSettings}
            onNavigate={navigateTo}
          />
        )}
      </main>

      {/* Global Footer */}
      <Footer
        storeSettings={storeSettings}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          navigateTo('shop', cat);
        }}
        onOpenTracking={() => {
          setTrackingOrderId(undefined);
          navigateTo('tracking');
        }}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onNavigate={navigateTo}
      />

      {/* Mobile Floating Actions & Bottom Navigation */}
      <MobileBottomBar
        currentPage={currentPage}
        onNavigate={navigateTo}
        cartCount={totalCartCount}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenTracking={() => navigateTo('tracking')}
        onScrollToTop={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        storeSettings={storeSettings}
      />

      {/* MODALS & DRAWERS (Available from any page) */}
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
          navigateTo('tracking');
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

      {/* 6. Order Tracking Modal (Fallback quick popup) */}
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
