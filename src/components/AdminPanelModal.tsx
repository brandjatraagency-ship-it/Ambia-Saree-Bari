import React, { useState, useMemo } from 'react';
import {
  X,
  LayoutDashboard,
  ShoppingBag,
  Package,
  Sliders,
  Tag,
  Star,
  HelpCircle,
  Sparkles,
  Settings,
  Search,
  Plus,
  Trash2,
  Edit,
  Printer,
  MessageCircle,
  CheckCircle,
  Truck,
  RotateCcw,
  Check,
  AlertTriangle,
  Upload,
  ArrowUp,
  ArrowDown,
  Eye,
  Image as ImageIcon,
  RefreshCw,
} from 'lucide-react';
import {
  Product,
  Order,
  Coupon,
  Review,
  StoreSettings,
  HeroSlide,
  HeroSettings,
  CategoryHighlight,
  FAQItem,
  CareTip,
} from '../types';
import { categories } from '../data/initialData';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  coupons: Coupon[];
  setCoupons: React.Dispatch<React.SetStateAction<Coupon[]>>;
  reviews: Review[];
  setReviews: React.Dispatch<React.SetStateAction<Review[]>>;
  storeSettings: StoreSettings;
  setStoreSettings: React.Dispatch<React.SetStateAction<StoreSettings>>;
  onResetDemoData: () => void;
  heroSlides: HeroSlide[];
  setHeroSlides: React.Dispatch<React.SetStateAction<HeroSlide[]>>;
  heroSettings: HeroSettings;
  setHeroSettings: React.Dispatch<React.SetStateAction<HeroSettings>>;
  categoryHighlights: CategoryHighlight[];
  setCategoryHighlights: React.Dispatch<
    React.SetStateAction<CategoryHighlight[]>
  >;
  faqs: FAQItem[];
  setFaqs: React.Dispatch<React.SetStateAction<FAQItem[]>>;
  careTips: CareTip[];
  setCareTips: React.Dispatch<React.SetStateAction<CareTip[]>>;
}

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({
  isOpen,
  onClose,
  products,
  setProducts,
  orders,
  setOrders,
  coupons,
  setCoupons,
  reviews,
  setReviews,
  storeSettings,
  setStoreSettings,
  onResetDemoData,
  heroSlides,
  setHeroSlides,
  heroSettings,
  setHeroSettings,
  faqs,
  setFaqs,
  careTips,
  setCareTips,
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Orders filters
  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState('all');

  // Products filters & stock filter
  const [productSearch, setProductSearch] = useState('');
  const [productCategoryFilter, setProductCategoryFilter] = useState('all');
  const [productStockFilter, setProductStockFilter] = useState<
    'all' | 'in_stock' | 'low_stock' | 'out_of_stock'
  >('all');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [productImageFileUrl, setProductImageFileUrl] = useState<string>('');

  // Hero Slide management
  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null);
  const [isSlideModalOpen, setIsSlideModalOpen] = useState(false);
  const [slideImageFileUrl, setSlideImageFileUrl] = useState<string>('');

  // Logo file upload helper
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 4 * 1024 * 1024) {
      alert('লোগো ফাইলের আকার ৪ মেগাবাইটের কম হতে হবে');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setStoreSettings((prev) => ({
          ...prev,
          logoUrl: reader.result as string,
          logoType: 'image',
        }));
        showToast('লোগো সফলভাবে আপলোড করা হয়েছে!');
      }
    };
    reader.readAsDataURL(file);
  };

  // New coupon state
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
  const [newCoupon, setNewCoupon] = useState<Coupon>({
    code: '',
    discountType: 'fixed',
    discountValue: 100,
    minOrderAmount: 1500,
    active: true,
    description: '',
  });

  // New review state
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [newReview, setNewReview] = useState({
    name: '',
    location: 'ঢাকা',
    rating: 5,
    comment: '',
    productName: 'টাঙ্গাইল তাঁতের সুতি শাড়ি',
    verified: true,
  });

  // Overview metrics
  const metrics = useMemo(() => {
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);
    const deliveredCount = orders.filter(
      (o) => o.status === 'ডেলিভারড',
    ).length;
    const processingCount = orders.filter(
      (o) =>
        o.status === 'প্রসেসিং হচ্ছে' || o.status === 'অর্ডার গৃহীত হয়েছে',
    ).length;
    const inTransitCount = orders.filter(
      (o) =>
        o.status === 'কুরিয়ারে হস্তান্তর' || o.status === 'ডেলিভারির পথে',
    ).length;
    const lowStockCount = products.filter((p) => p.stockCount <= 5).length;
    const dhakaCount = orders.filter(
      (o) =>
        (o.customer.deliveryZone || o.customer.deliveryArea) ===
        'dhaka_inside',
    ).length;
    const outsideCount = orders.filter(
      (o) =>
        (o.customer.deliveryZone || o.customer.deliveryArea) ===
        'dhaka_outside',
    ).length;

    return {
      totalOrders,
      totalRevenue,
      deliveredCount,
      processingCount,
      inTransitCount,
      lowStockCount,
      dhakaCount,
      outsideCount,
    };
  }, [orders, products]);

  // Filtered Orders
  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const matchStatus =
        orderStatusFilter === 'all' || o.status === orderStatusFilter;
      const q = orderSearch.toLowerCase().trim();
      const matchQuery =
        !q ||
        o.orderId.toLowerCase().includes(q) ||
        o.customer.fullName.toLowerCase().includes(q) ||
        o.customer.phoneNumber.includes(q) ||
        o.customer.fullAddress.toLowerCase().includes(q) ||
        o.trackingNumber.toLowerCase().includes(q);
      return matchStatus && matchQuery;
    });
  }, [orders, orderStatusFilter, orderSearch]);

  // Filtered Products with Stock Filter
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchCategory =
        productCategoryFilter === 'all' || p.category === productCategoryFilter;
      const q = productSearch.toLowerCase().trim();
      const matchQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.code.toLowerCase().includes(q) ||
        p.fabric.toLowerCase().includes(q);
      const matchStock =
        productStockFilter === 'all'
          ? true
          : productStockFilter === 'in_stock'
          ? p.inStock && p.stockCount > 0
          : productStockFilter === 'low_stock'
          ? p.inStock && p.stockCount > 0 && p.stockCount <= 5
          : !p.inStock || p.stockCount <= 0;
      return matchCategory && matchQuery && matchStock;
    });
  }, [products, productCategoryFilter, productSearch, productStockFilter]);

  // Quick Stock Handlers
  const handleQuickStockToggle = (productId: string) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          const nextInStock = !(p.inStock && p.stockCount > 0);
          const nextCount = nextInStock ? (p.stockCount > 0 ? p.stockCount : 10) : 0;
          return { ...p, inStock: nextInStock, stockCount: nextCount };
        }
        return p;
      }),
    );
    showToast('স্টক স্ট্যাটাস সফলভাবে পরিবর্তন হয়েছে');
  };

  const handleQuickStockAdjust = (productId: string, delta: number) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          const nextCount = Math.max(0, (p.stockCount || 0) + delta);
          return { ...p, stockCount: nextCount, inStock: nextCount > 0 };
        }
        return p;
      }),
    );
  };

  // Handlers for Hero Slides
  const handleDeleteSlide = (slideId: string) => {
    if (heroSlides.length <= 1) {
      alert('কমপক্ষে ১টি হিরো ব্যানার স্লাইড থাকা আবশ্যক!');
      return;
    }
    if (confirm('আপনি কি এই ব্যানার স্লাইডটি মুছে ফেলতে চান?')) {
      setHeroSlides((prev) => prev.filter((s) => s.id !== slideId));
      showToast('ব্যানার স্লাইড মুছে ফেলা হয়েছে');
    }
  };

  const handleMoveSlide = (index: number, direction: 'up' | 'down') => {
    const newSlides = [...heroSlides];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newSlides.length) return;
    const temp = newSlides[index];
    newSlides[index] = newSlides[targetIndex];
    newSlides[targetIndex] = temp;
    setHeroSlides(newSlides);
    showToast('স্লাইডের ক্রম পরিবর্তন করা হয়েছে');
  };

  const handleSaveSlide = (slideData: Partial<HeroSlide>) => {
    if (editingSlide && editingSlide.id) {
      setHeroSlides((prev) =>
        prev.map((s) =>
          s.id === editingSlide.id ? ({ ...s, ...slideData } as HeroSlide) : s,
        ),
      );
      showToast('ব্যানার স্লাইড সফলভাবে আপডেট হয়েছে');
    } else {
      const newSlide: HeroSlide = {
        id: `slide-${Date.now()}`,
        bgImage:
          slideData.bgImage ||
          '/assets/girls_fashion_banner_1788842585614-FK2essCR.jpg',
        badge: slideData.badge || 'এক্সক্লুসিভ কালেকশন ২০২৬',
        title: slideData.title || 'GIRLS FASHION',
        subtitle:
          slideData.subtitle || 'টাঙ্গাইলের ঐতিহ্যবাহী প্রিমিয়াম শাড়ি কালেকশন',
        slogan: slideData.slogan || 'শাড়িতে ফুটুক আপনার রূপ ও সৌন্দর্য',
        category: slideData.category || 'all',
        actionText: slideData.actionText || 'এখনই অর্ডার করুন',
        secondaryActionText: slideData.secondaryActionText || 'কালেকশন দেখুন',
        imageFit: slideData.imageFit || 'cover',
        tagline: slideData.tagline || 'ঐতিহ্যের বন্ধনে খাঁটি বাঙালিয়ানা সাজ',
      };
      setHeroSlides((prev) => [...prev, newSlide]);
      showToast('নতুন ব্যানার স্লাইড যোগ করা হয়েছে');
    }
    setIsSlideModalOpen(false);
    setEditingSlide(null);
    setSlideImageFileUrl('');
  };

  // Handlers for Orders
  const handleUpdateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders((prev) =>
      prev.map((o) => (o.orderId === orderId ? { ...o, status: newStatus } : o)),
    );
    showToast(`অর্ডার #${orderId}-এর স্ট্যাটাস পরিবর্তন করা হয়েছে: "${newStatus}"`);
  };

  const handleUpdateTracking = (orderId: string, trackingNumber: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.orderId === orderId ? { ...o, trackingNumber } : o)),
    );
    showToast(`অর্ডার #${orderId}-এর ট্র্যাকিং নম্বর আপডেট হয়েছে।`);
  };

  const handleDeleteOrder = (orderId: string) => {
    if (confirm(`আপনি কি সত্যিই অর্ডার #${orderId} মুছে ফেলতে চান?`)) {
      setOrders((prev) => prev.filter((o) => o.orderId !== orderId));
      showToast(`অর্ডার #${orderId} মুছে ফেলা হয়েছে।`);
    }
  };

  const handleWhatsAppCustomer = (order: Order) => {
    const text = `আসসালামু আলাইকুম ${order.customer.fullName}! আম্বিয়া শাড়ি বাড়ি থেকে যোগাযোগ করা হচ্ছে। আপনার অর্ডার #${order.orderId} সম্পর্কে তথ্য জানাতে নক দিয়েছি।`;
    window.open(
      `https://wa.me/880${order.customer.phoneNumber.replace(/^0/, '')}?text=${encodeURIComponent(text)}`,
      '_blank',
    );
  };

  // Handlers for Products
  const handleDeleteProduct = (productId: string) => {
    if (confirm('আপনি কি এই শাড়িটি তালিকা থেকে মুছে ফেলতে চান?')) {
      setProducts((prev) => prev.filter((p) => p.id !== productId));
      showToast('শাড়ি সফলভাবে ডিলিট করা হয়েছে।');
    }
  };

  const handleSaveProduct = (productData: Partial<Product>) => {
    if (editingProduct) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editingProduct.id ? ({ ...p, ...productData } as Product) : p,
        ),
      );
      showToast('শাড়ির তথ্য সফলভাবে আপডেট করা হয়েছে।');
    } else {
      const newProd: Product = {
        id: `saree-${Date.now()}`,
        code: productData.code || `ASB-${Math.floor(1000 + Math.random() * 9000)}`,
        name: productData.name || 'নতুন টাঙ্গাইল শাড়ি',
        category: productData.category || 'tangail-tat',
        categoryName:
          categories.find((c) => c.id === productData.category)?.name ||
          'টাঙ্গাইল তাঁতের শাড়ি',
        price: Number(productData.price) || 1200,
        originalPrice: Number(productData.originalPrice) || 1500,
        discountPercent: Math.round(
          ((Number(productData.originalPrice || 1500) -
            Number(productData.price || 1200)) /
            Number(productData.originalPrice || 1500)) *
            100,
        ),
        images: productData.images && productData.images.length > 0
          ? productData.images
          : [
              'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
            ],
        fabric: productData.fabric || '১০০% পিওর সুতি সুতা',
        length: '১২ হাত (স্ট্যান্ডার্ড)',
        blousePiece: productData.blousePiece || 'ব্লাউজ পিস সহ (৮০ সে.মি.)',
        anchalDetail: 'আকর্ষণীয় ঐতিহ্যবাহী পাড় ও জমিন ডিজাইন',
        parDetail: 'ঘন বুটি ও আকর্ষণীয় সুতি পাড়',
        colors: productData.colors || [{ name: 'লাল', hex: '#8b1528' }],
        inStock: productData.inStock !== false,
        stockCount: Number(productData.stockCount) || 10,
        rating: 4.9,
        reviewCount: 15,
        isHotDeal: !!productData.isHotDeal,
        isBestSeller: !!productData.isBestSeller,
        isNew: !!productData.isNew,
        description:
          productData.description ||
          'টাঙ্গাইলের সেরা তাঁতিদের নিপুণ হাতে বোনা ১০০% পিওর সুতি শাড়ি।',
      };
      setProducts((prev) => [newProd, ...prev]);
      showToast('নতুন শাড়ি সফলভাবে যুক্ত করা হয়েছে।');
    }
    setIsProductModalOpen(false);
    setEditingProduct(null);
  };

  // Coupons
  const handleAddCoupon = () => {
    if (!newCoupon.code.trim()) {
      alert('কুপন কোড লিখুন');
      return;
    }
    setCoupons((prev) => [newCoupon, ...prev]);
    setNewCoupon({
      code: '',
      discountType: 'fixed',
      discountValue: 100,
      minOrderAmount: 1500,
      active: true,
      description: '',
    });
    setIsCouponModalOpen(false);
    showToast('নতুন কুপন কোড তৈরি হয়েছে!');
  };

  const handleDeleteCoupon = (code: string) => {
    setCoupons((prev) => prev.filter((c) => c.code !== code));
    showToast(`কুপন ${code} মুছে ফেলা হয়েছে।`);
  };

  const handleToggleCoupon = (code: string) => {
    setCoupons((prev) =>
      prev.map((c) => (c.code === code ? { ...c, active: !c.active } : c)),
    );
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4">
      <div className="w-full max-w-7xl bg-white h-[96vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-stone-200">
        {/* Header Bar */}
        <div className="bg-[#8b1528] text-white px-4 sm:px-6 py-3.5 flex items-center justify-between shrink-0 shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-400 text-stone-950 font-black flex items-center justify-center text-base shadow-xs">
              গ
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-['Anek_Bangla'] font-bold text-lg sm:text-xl text-white tracking-wide">
                  আম্বিয়া শাড়ি বাড়ি — মার্চেন্ট ইআরপি ও অ্যাডমিন প্যানেল
                </h2>
                <span className="bg-amber-400 text-stone-950 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Admin v2.4
                </span>
              </div>
              <p className="text-[11px] text-rose-200">
                অর্ডার ম্যানেজমেন্ট, ইনভেন্টরি কন্ট্রোল, হিরো ব্যানার নো-ক্রপ সেটিংস ও কাস্টমার রিভিউ
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {toastMessage && (
              <div className="hidden sm:flex items-center gap-1.5 bg-emerald-700 text-white text-xs px-3 py-1.5 rounded-lg animate-fade-in shadow-xs">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-300" />
                <span>{toastMessage}</span>
              </div>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Layout: Sidebar + Main Content */}
        <div className="flex-1 bg-stone-100 flex flex-col md:flex-row overflow-hidden">
          {/* Sidebar */}
          <aside className="w-full md:w-64 bg-stone-900 text-stone-300 border-r border-stone-800 flex md:flex-col shrink-0 overflow-x-auto p-2 md:p-4 gap-1.5">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full text-left px-3 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-3 transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'dashboard'
                  ? 'bg-[#8b1528] text-white shadow-sm'
                  : 'hover:bg-stone-800 text-stone-400 hover:text-stone-200'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 shrink-0 text-amber-400" />
              <span>ওভারভিউ ড্যাশবোর্ড</span>
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full text-left px-3 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-between gap-3 transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'orders'
                  ? 'bg-[#8b1528] text-white shadow-sm'
                  : 'hover:bg-stone-800 text-stone-400 hover:text-stone-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-4 h-4 shrink-0 text-amber-400" />
                <span>অর্ডার ম্যানেজমেন্ট</span>
              </div>
              {metrics.processingCount > 0 && (
                <span className="bg-amber-400 text-stone-950 text-[10px] font-black px-1.5 py-0.5 rounded-full">
                  {metrics.processingCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('products')}
              className={`w-full text-left px-3 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-between gap-3 transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'products'
                  ? 'bg-[#8b1528] text-white shadow-sm'
                  : 'hover:bg-stone-800 text-stone-400 hover:text-stone-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <Package className="w-4 h-4 shrink-0 text-amber-400" />
                <span>শাড়ি / প্রোডাক্ট</span>
              </div>
              <span className="text-[10px] bg-stone-800 px-1.5 py-0.5 rounded text-stone-400">
                {products.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('hero')}
              className={`w-full text-left px-3 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-between gap-3 transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'hero'
                  ? 'bg-[#8b1528] text-white shadow-sm'
                  : 'hover:bg-stone-800 text-stone-400 hover:text-stone-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <Sliders className="w-4 h-4 shrink-0 text-amber-400" />
                <span>হিরো ব্যানার ও ইমেজ ফিট</span>
              </div>
              <span className="text-[10px] bg-rose-950 text-rose-300 border border-rose-800 px-1.5 py-0.5 rounded font-bold">
                নো-ক্রপ
              </span>
            </button>

            <button
              onClick={() => setActiveTab('coupons')}
              className={`w-full text-left px-3 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-3 transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'coupons'
                  ? 'bg-[#8b1528] text-white shadow-sm'
                  : 'hover:bg-stone-800 text-stone-400 hover:text-stone-200'
              }`}
            >
              <Tag className="w-4 h-4 shrink-0 text-amber-400" />
              <span>কুপন ও ডিসকাউন্ট</span>
            </button>

            <button
              onClick={() => setActiveTab('reviews')}
              className={`w-full text-left px-3 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-3 transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'reviews'
                  ? 'bg-[#8b1528] text-white shadow-sm'
                  : 'hover:bg-stone-800 text-stone-400 hover:text-stone-200'
              }`}
            >
              <Star className="w-4 h-4 shrink-0 text-amber-400" />
              <span>কাস্টমার রিভিউ</span>
            </button>

            <button
              onClick={() => setActiveTab('faqs')}
              className={`w-full text-left px-3 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-3 transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'faqs'
                  ? 'bg-[#8b1528] text-white shadow-sm'
                  : 'hover:bg-stone-800 text-stone-400 hover:text-stone-200'
              }`}
            >
              <HelpCircle className="w-4 h-4 shrink-0 text-amber-400" />
              <span>সচরাচর জিজ্ঞাসা (FAQ)</span>
            </button>

            <button
              onClick={() => setActiveTab('care')}
              className={`w-full text-left px-3 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-3 transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'care'
                  ? 'bg-[#8b1528] text-white shadow-sm'
                  : 'hover:bg-stone-800 text-stone-400 hover:text-stone-200'
              }`}
            >
              <Sparkles className="w-4 h-4 shrink-0 text-amber-400" />
              <span>শাড়ির যত্নবিধি গাইডলাইন</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full text-left px-3 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-3 transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'settings'
                  ? 'bg-[#8b1528] text-white shadow-sm'
                  : 'hover:bg-stone-800 text-stone-400 hover:text-stone-200'
              }`}
            >
              <Settings className="w-4 h-4 shrink-0 text-amber-400" />
              <span>স্টোর সেটিংস</span>
            </button>

            <div className="mt-auto pt-4 border-t border-stone-800 hidden md:block text-stone-500 text-[11px] space-y-1">
              <p>আম্বিয়া শাড়ি বাড়ি ERP v2.4</p>
              <p className="text-stone-400">টাঙ্গাইল তাঁত ও ল্যামা সিল্ক হাব</p>
            </div>
          </aside>

          {/* Content Pane */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-7xl">
            {/* TAB 1: DASHBOARD */}
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-['Anek_Bangla'] text-xl sm:text-2xl font-black text-stone-900">
                    ব্যবসায়িক ওভারভিউ ও সেলস মেট্রিক্স
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-500">
                    আম্বিয়া শাড়ি বাড়ির লাইভ অর্ডার, ডেলিভারি ও রাজস্ব সারসংক্ষেপ
                  </p>
                </div>

                {/* Metric Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                  <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs">
                    <span className="text-[11px] text-stone-500 font-semibold block">
                      মোট বিক্রয় রাজস্ব
                    </span>
                    <span className="text-xl sm:text-2xl font-black text-[#8b1528] font-['Anek_Bangla']">
                      ৳{metrics.totalRevenue.toLocaleString()}
                    </span>
                    <p className="text-[10px] text-emerald-600 mt-1">
                      {metrics.totalOrders} টি সম্পন্ন অর্ডার
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs">
                    <span className="text-[11px] text-stone-500 font-semibold block">
                      নতুন ও প্রসেসিং অর্ডার
                    </span>
                    <span className="text-xl sm:text-2xl font-black text-amber-600">
                      {metrics.processingCount} টি
                    </span>
                    <p className="text-[10px] text-stone-400 mt-1">
                      প্যাকিং ও ভেরিফিকেশন চলছে
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs">
                    <span className="text-[11px] text-stone-500 font-semibold block">
                      কুরিয়ারে চলমান পার্সেল
                    </span>
                    <span className="text-xl sm:text-2xl font-black text-blue-600">
                      {metrics.inTransitCount} টি
                    </span>
                    <p className="text-[10px] text-stone-400 mt-1">
                      ডেলিভারির পথে রয়েছে
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs">
                    <span className="text-[11px] text-stone-500 font-semibold block">
                      সফলভাবে ডেলিভারড
                    </span>
                    <span className="text-xl sm:text-2xl font-black text-emerald-600">
                      {metrics.deliveredCount} টি
                    </span>
                    <p className="text-[10px] text-emerald-600 mt-1">
                      ক্যাশ আদায় সম্পন্ন
                    </p>
                  </div>
                </div>

                {/* Regional & Stock Breakdown */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs">
                    <h4 className="font-bold text-sm text-stone-800 mb-3 flex items-center gap-2">
                      <Truck className="w-4 h-4 text-[#8b1528]" />
                      <span>ডেলিভারি এরিয়া ডিস্ট্রিবিউশন</span>
                    </h4>
                    <div className="space-y-3 text-xs">
                      <div>
                        <div className="flex justify-between font-semibold mb-1">
                          <span>ঢাকা সিটির ভেতরে (৳৬০ চার্জ):</span>
                          <span>{metrics.dhakaCount} টি অর্ডার</span>
                        </div>
                        <div className="w-full bg-stone-100 rounded-full h-2.5">
                          <div
                            className="bg-[#8b1528] h-2.5 rounded-full"
                            style={{
                              width: `${
                                metrics.totalOrders > 0
                                  ? (metrics.dhakaCount / metrics.totalOrders) *
                                    100
                                  : 0
                              }%`,
                            }}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between font-semibold mb-1">
                          <span>ঢাকার বাইরে সারা বাংলাদেশ (৳১২০ চার্জ):</span>
                          <span>{metrics.outsideCount} টি অর্ডার</span>
                        </div>
                        <div className="w-full bg-stone-100 rounded-full h-2.5">
                          <div
                            className="bg-amber-600 h-2.5 rounded-full"
                            style={{
                              width: `${
                                metrics.totalOrders > 0
                                  ? (metrics.outsideCount /
                                      metrics.totalOrders) *
                                    100
                                  : 0
                              }%`,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs">
                    <h4 className="font-bold text-sm text-stone-800 mb-3 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-600" />
                      <span>স্টক ওয়ার্নিং ও শাড়ি ইনভেন্টরি</span>
                    </h4>
                    <div className="space-y-2 text-xs">
                      <p className="text-stone-600">
                        মোট প্রদর্শিত শাড়ির সংখ্যা:{' '}
                        <strong>{products.length} টি</strong>
                      </p>
                      <p className="text-stone-600">
                        সীমিত স্টক (৫ পিসের নিচে):{' '}
                        <strong className="text-red-600 font-bold">
                          {metrics.lowStockCount} টি
                        </strong>
                      </p>
                      <button
                        onClick={() => setActiveTab('products')}
                        className="mt-3 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold rounded-lg cursor-pointer transition-colors"
                      >
                        ইনভেন্টরি চেক করুন →
                      </button>
                    </div>
                  </div>
                </div>

                {/* Recent Orders Overview */}
                <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs">
                  <div className="p-4 border-b border-stone-200 flex justify-between items-center bg-stone-50">
                    <h4 className="font-bold text-sm text-stone-900">
                      সর্বশেষ অর্ডারসমূহ
                    </h4>
                    <button
                      onClick={() => setActiveTab('orders')}
                      className="text-xs font-bold text-[#8b1528] hover:underline cursor-pointer"
                    >
                      সবগুলো দেখুন ({orders.length}) →
                    </button>
                  </div>
                  <div className="divide-y divide-stone-100 text-xs">
                    {orders.slice(0, 4).map((o) => (
                      <div
                        key={o.orderId}
                        className="p-3.5 flex items-center justify-between hover:bg-stone-50 transition-colors"
                      >
                        <div>
                          <span className="font-mono font-bold text-stone-900">
                            {o.orderId}
                          </span>
                          <span className="text-stone-500 ml-2">
                            {o.customer.fullName} ({o.customer.phoneNumber})
                          </span>
                          <p className="text-[11px] text-stone-400 truncate max-w-sm">
                            {o.items.map((i) => i.product.name).join(', ')}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="font-bold text-[#8b1528] block">
                            ৳{o.totalAmount.toLocaleString()}
                          </span>
                          <span className="text-[10px] bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded font-semibold">
                            {o.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: ORDERS MANAGEMENT */}
            {activeTab === 'orders' && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="font-['Anek_Bangla'] text-xl font-bold text-stone-900">
                      অর্ডার ম্যানেজমেন্ট ({orders.length} টি অর্ডার)
                    </h3>
                    <p className="text-xs text-stone-500">
                      ক্যাশ অন ডেলিভারি অর্ডার প্রসেস, ট্র্যাকিং ও কাস্টমার যোগাযোগ
                    </p>
                  </div>
                </div>

                {/* Search & Status Filters */}
                <div className="flex flex-wrap gap-2 items-center bg-white p-3 rounded-xl border border-stone-200">
                  <div className="relative flex-1 min-w-[200px]">
                    <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={orderSearch}
                      onChange={(e) => setOrderSearch(e.target.value)}
                      placeholder="অর্ডার আইডি, নাম, ফোন নম্বর দিয়ে খুঁজুন..."
                      className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs outline-hidden focus:bg-white focus:border-[#8b1528]"
                    />
                  </div>

                  <select
                    value={orderStatusFilter}
                    onChange={(e) => setOrderStatusFilter(e.target.value)}
                    className="px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs outline-hidden font-semibold cursor-pointer"
                  >
                    <option value="all">সব স্ট্যাটাস</option>
                    <option value="অর্ডার গৃহীত হয়েছে">অর্ডার গৃহীত হয়েছে</option>
                    <option value="প্রসেসিং হচ্ছে">প্রসেসিং হচ্ছে</option>
                    <option value="কুরিয়ারে হস্তান্তর">কুরিয়ারে হস্তান্তর</option>
                    <option value="ডেলিভারির পথে">ডেলিভারির পথে</option>
                    <option value="ডেলিভারড">ডেলিভারড</option>
                    <option value="বাতিল">বাতিল</option>
                  </select>
                </div>

                {/* Orders List */}
                <div className="space-y-3">
                  {filteredOrders.length === 0 ? (
                    <div className="bg-white p-8 rounded-xl text-center text-stone-400 text-xs">
                      কোনো অর্ডার পাওয়া যায়নি।
                    </div>
                  ) : (
                    filteredOrders.map((ord) => (
                      <div
                        key={ord.orderId}
                        className="bg-white rounded-xl border border-stone-200 p-4 shadow-xs space-y-3"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 pb-3">
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-black text-sm text-[#8b1528] bg-rose-50 px-2.5 py-1 rounded-md border border-rose-200">
                              {ord.orderId}
                            </span>
                            <span className="text-xs text-stone-500">
                              {ord.date}
                            </span>
                            <span className="text-xs text-stone-400 font-mono">
                              (ট্র্যাকিং: {ord.trackingNumber})
                            </span>
                          </div>

                          {/* Quick Status Select */}
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-stone-500 font-medium">
                              স্ট্যাটাস:
                            </span>
                            <select
                              value={ord.status}
                              onChange={(e) =>
                                handleUpdateOrderStatus(
                                  ord.orderId,
                                  e.target.value as Order['status'],
                                )
                              }
                              className="px-2.5 py-1 rounded text-xs font-bold bg-amber-50 border border-amber-300 text-amber-950 cursor-pointer"
                            >
                              <option value="অর্ডার গৃহীত হয়েছে">
                                অর্ডার গৃহীত হয়েছে
                              </option>
                              <option value="প্রসেসিং হচ্ছে">
                                প্রসেসিং হচ্ছে
                              </option>
                              <option value="কুরিয়ারে হস্তান্তর">
                                কুরিয়ারে হস্তান্তর
                              </option>
                              <option value="ডেলিভারির পথে">
                                ডেলিভারির পথে
                              </option>
                              <option value="ডেলিভারড">ডেলিভারড</option>
                              <option value="বাতিল">বাতিল</option>
                            </select>
                          </div>
                        </div>

                        {/* Customer & Items Details */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                          <div>
                            <span className="text-stone-400 block font-medium">
                              গ্রাহকের তথ্য:
                            </span>
                            <strong className="text-stone-800 text-sm">
                              {ord.customer.fullName}
                            </strong>
                            <p className="font-mono text-stone-700">
                              {ord.customer.phoneNumber}
                            </p>
                            <p className="text-stone-600 mt-1">
                              {ord.customer.fullAddress}
                            </p>
                            <span className="inline-block mt-1 bg-stone-100 text-stone-700 text-[10px] px-2 py-0.5 rounded font-medium">
                              {(ord.customer.deliveryZone ||
                                ord.customer.deliveryArea) === 'dhaka_inside'
                                ? 'ঢাকা সিটির ভেতরে'
                                : 'ঢাকার বাইরে সারা বাংলাদেশ'}
                            </span>
                          </div>

                          <div className="space-y-1.5">
                            <span className="text-stone-400 block font-medium">
                              অর্ডারকৃত পণ্য:
                            </span>
                            {ord.items.map((it, idx) => (
                              <div
                                key={idx}
                                className="flex items-center gap-2 bg-stone-50 p-1.5 rounded border border-stone-100"
                              >
                                <img
                                  src={it.product.images[0]}
                                  alt={it.product.name}
                                  className="w-8 h-10 object-cover rounded"
                                />
                                <div className="truncate flex-1">
                                  <p className="font-semibold text-stone-900 truncate">
                                    {it.product.name}
                                  </p>
                                  <span className="text-[10px] text-stone-500">
                                    {it.quantity} পিস × ৳
                                    {it.product.price.toLocaleString()}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="flex flex-col justify-between border-t md:border-t-0 md:border-l md:pl-4 border-stone-100">
                            <div>
                              <span className="text-stone-400 block font-medium">
                                সর্বমোট মূল্য (COD):
                              </span>
                              <span className="text-xl font-black text-[#8b1528] font-['Anek_Bangla']">
                                ৳{ord.totalAmount.toLocaleString()}
                              </span>
                              <p className="text-[11px] text-stone-500 mt-0.5">
                                সাবটোটাল: ৳{ord.subtotal.toLocaleString()} + ডেলিভারি: ৳
                                {ord.deliveryCharge}
                              </p>
                            </div>

                            <div className="flex flex-wrap gap-2 mt-3">
                              <button
                                onClick={() => handleWhatsAppCustomer(ord)}
                                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                              >
                                <MessageCircle className="w-3.5 h-3.5" />
                                <span>WhatsApp মেসেজ</span>
                              </button>
                              <button
                                onClick={() => window.print()}
                                className="px-2.5 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer"
                                title="প্রিন্ট ক্যাশ মেমো"
                              >
                                <Printer className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteOrder(ord.orderId)}
                                className="px-2.5 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer"
                                title="অর্ডার ডিলিট করুন"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* TAB 3: PRODUCTS & STOCK MANAGEMENT */}
            {activeTab === 'products' && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="font-['Anek_Bangla'] text-xl font-bold text-stone-900 flex items-center gap-2">
                      <span>শাড়ি ক্যাটালগ ও স্টক ইনভেন্টরি</span>
                      <span className="text-xs bg-rose-100 text-[#8b1528] px-2.5 py-0.5 rounded-full font-bold">
                        {products.length} টি
                      </span>
                    </h3>
                    <p className="text-xs text-stone-500">
                      শাড়ির মূল্য, ছবি, বিবরণ এডিট করুন এবং ১-ক্লিকে স্টক ইন/আউট ও সংখ্যা নিয়ন্ত্রণ করুন
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setEditingProduct(null);
                      setProductImageFileUrl('');
                      setIsProductModalOpen(true);
                    }}
                    className="px-4 py-2.5 bg-[#8b1528] hover:bg-[#721020] text-white text-xs sm:text-sm font-bold rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-95 transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    <span>নতুন শাড়ি যুক্ত করুন</span>
                  </button>
                </div>

                {/* Stock Overview Metric Summary Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  <div
                    onClick={() => setProductStockFilter('all')}
                    className={`p-3 rounded-xl border cursor-pointer transition-all ${
                      productStockFilter === 'all'
                        ? 'bg-rose-50/70 border-[#8b1528] shadow-xs'
                        : 'bg-white border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    <span className="text-[11px] text-stone-500 font-medium block">মোট প্রোডাক্ট</span>
                    <div className="flex items-center justify-between mt-1">
                      <strong className="text-lg sm:text-xl font-bold text-stone-900">{products.length}</strong>
                      <span className="text-[10px] text-stone-400 font-mono">আইটেম</span>
                    </div>
                  </div>

                  <div
                    onClick={() => setProductStockFilter('in_stock')}
                    className={`p-3 rounded-xl border cursor-pointer transition-all ${
                      productStockFilter === 'in_stock'
                        ? 'bg-emerald-50 border-emerald-600 shadow-xs'
                        : 'bg-white border-stone-200 hover:bg-emerald-50/40'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 text-emerald-700">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span className="text-[11px] font-semibold">ইন স্টক</span>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <strong className="text-lg sm:text-xl font-bold text-emerald-800">
                        {products.filter((p) => p.inStock && p.stockCount > 0).length}
                      </strong>
                      <span className="text-[10px] text-emerald-600">উপলব্ধ</span>
                    </div>
                  </div>

                  <div
                    onClick={() => setProductStockFilter('low_stock')}
                    className={`p-3 rounded-xl border cursor-pointer transition-all ${
                      productStockFilter === 'low_stock'
                        ? 'bg-amber-50 border-amber-600 shadow-xs'
                        : 'bg-white border-stone-200 hover:bg-amber-50/40'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 text-amber-700">
                      <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                      <span className="text-[11px] font-semibold">লো স্টক (≤৫)</span>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <strong className="text-lg sm:text-xl font-bold text-amber-800">
                        {products.filter((p) => p.inStock && p.stockCount > 0 && p.stockCount <= 5).length}
                      </strong>
                      <span className="text-[10px] text-amber-600 font-medium">জরুরি</span>
                    </div>
                  </div>

                  <div
                    onClick={() => setProductStockFilter('out_of_stock')}
                    className={`p-3 rounded-xl border cursor-pointer transition-all ${
                      productStockFilter === 'out_of_stock'
                        ? 'bg-red-50 border-red-600 shadow-xs'
                        : 'bg-white border-stone-200 hover:bg-red-50/40'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 text-red-700">
                      <span className="w-2 h-2 rounded-full bg-red-500" />
                      <span className="text-[11px] font-semibold">স্টক আউট</span>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <strong className="text-lg sm:text-xl font-bold text-red-800">
                        {products.filter((p) => !p.inStock || p.stockCount <= 0).length}
                      </strong>
                      <span className="text-[10px] text-red-600">শেষ</span>
                    </div>
                  </div>
                </div>

                {/* Search, Filter Pills & Category Filter */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 bg-white p-3 rounded-xl border border-stone-200">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={productSearch}
                      onChange={(e) => setProductSearch(e.target.value)}
                      placeholder="নাম, কোড, বা ফেব্রিক দিয়ে খুঁজুন..."
                      className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs outline-hidden focus:bg-white focus:border-[#8b1528]"
                    />
                  </div>

                  <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
                    <select
                      value={productCategoryFilter}
                      onChange={(e) => setProductCategoryFilter(e.target.value)}
                      className="px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs outline-hidden font-semibold cursor-pointer shrink-0"
                    >
                      <option value="all">সব ক্যাটাগরি</option>
                      {categories.slice(1).map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>

                    <select
                      value={productStockFilter}
                      onChange={(e) =>
                        setProductStockFilter(
                          e.target.value as 'all' | 'in_stock' | 'low_stock' | 'out_of_stock',
                        )
                      }
                      className="px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs outline-hidden font-semibold cursor-pointer shrink-0"
                    >
                      <option value="all">সব স্টক ফিল্টার</option>
                      <option value="in_stock">ইন স্টক පමණি</option>
                      <option value="low_stock">লো স্টক (≤৫)</option>
                      <option value="out_of_stock">স্টক আউট පමණি</option>
                    </select>
                  </div>
                </div>

                {/* Product Grid with Stock Controls */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  {filteredProducts.map((prod) => {
                    const isAvailable = prod.inStock && prod.stockCount > 0;
                    const isLow = isAvailable && prod.stockCount <= 5;

                    return (
                      <div
                        key={prod.id}
                        className={`bg-white rounded-xl border p-3 shadow-xs flex flex-col justify-between space-y-3 transition-all ${
                          !isAvailable
                            ? 'border-red-200 bg-red-50/10'
                            : isLow
                            ? 'border-amber-200 bg-amber-50/10'
                            : 'border-stone-200'
                        }`}
                      >
                        <div className="flex gap-3">
                          <div className="relative shrink-0">
                            <img
                              src={prod.images[0]}
                              alt={prod.name}
                              className={`w-20 h-24 object-cover rounded-lg border border-stone-200 ${
                                !isAvailable ? 'grayscale opacity-75' : ''
                              }`}
                            />
                            {!isAvailable && (
                              <span className="absolute inset-0 bg-stone-900/60 rounded-lg flex items-center justify-center text-[10px] font-bold text-white uppercase tracking-tight">
                                স্টক আউট
                              </span>
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1.5">
                              <span className="font-mono text-[10px] bg-stone-100 text-stone-600 px-2 py-0.5 rounded font-bold">
                                {prod.code}
                              </span>
                              {isLow && (
                                <span className="text-[9px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-bold animate-pulse">
                                  লো স্টক
                                </span>
                              )}
                            </div>
                            <h4 className="font-semibold text-xs sm:text-sm text-stone-900 truncate mt-1">
                              {prod.name}
                            </h4>
                            <p className="text-[11px] text-stone-500 truncate">
                              {prod.categoryName}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="font-bold text-[#8b1528] text-sm font-['Anek_Bangla']">
                                ৳{prod.price.toLocaleString()}
                              </span>
                              <span className="text-xs text-stone-400 line-through">
                                ৳{prod.originalPrice.toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Stock Quick Control Row */}
                        <div className="bg-stone-50 rounded-lg p-2 flex items-center justify-between gap-2 border border-stone-200 text-xs">
                          <div className="flex items-center gap-1">
                            <span className="text-[10px] text-stone-500 font-medium">স্টক:</span>
                            <div className="flex items-center gap-0.5 bg-white border border-stone-300 rounded-md overflow-hidden">
                              <button
                                type="button"
                                onClick={() => handleQuickStockAdjust(prod.id, -1)}
                                className="w-5 h-5 flex items-center justify-center text-stone-700 hover:bg-stone-100 font-bold cursor-pointer"
                                title="১টি কমান"
                              >
                                -
                              </button>
                              <span className="w-6 text-center font-mono font-bold text-xs text-stone-900">
                                {prod.stockCount}
                              </span>
                              <button
                                type="button"
                                onClick={() => handleQuickStockAdjust(prod.id, 1)}
                                className="w-5 h-5 flex items-center justify-center text-stone-700 hover:bg-stone-100 font-bold cursor-pointer"
                                title="১টি বাড়ান"
                              >
                                +
                              </button>
                            </div>
                          </div>

                          {/* Quick Toggle In-Stock / Out of Stock */}
                          <button
                            type="button"
                            onClick={() => handleQuickStockToggle(prod.id)}
                            className={`text-[10px] px-2 py-1 rounded-md font-bold flex items-center gap-1 cursor-pointer transition-colors ${
                              isAvailable
                                ? 'bg-emerald-100 hover:bg-emerald-200 text-emerald-800'
                                : 'bg-red-100 hover:bg-red-200 text-red-800'
                            }`}
                            title="ক্লিক করে স্টক স্ট্যাটাস পরিবর্তন করুন"
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                isAvailable ? 'bg-emerald-600' : 'bg-red-600'
                              }`}
                            />
                            <span>{isAvailable ? 'ইন স্টক' : 'আউট অব স্টক'}</span>
                          </button>
                        </div>

                        {/* Actions: Edit & Delete */}
                        <div className="flex items-center justify-between border-t border-stone-100 pt-2 text-xs">
                          <span className="text-[10px] text-stone-400">
                            {prod.fabric}
                          </span>

                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => {
                                setEditingProduct(prod);
                                setProductImageFileUrl(prod.images[0] || '');
                                setIsProductModalOpen(true);
                              }}
                              className="px-2.5 py-1 text-stone-700 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-lg cursor-pointer flex items-center gap-1 text-[11px] font-semibold"
                              title="এডিট করুন"
                            >
                              <Edit className="w-3 h-3" />
                              <span>এডিট</span>
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(prod.id)}
                              className="p-1.5 text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 rounded-lg cursor-pointer"
                              title="মুছে ফেলুন"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB 4: HERO BANNER & FIT */}
            {activeTab === 'hero' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="font-['Anek_Bangla'] text-xl font-bold text-stone-900 flex items-center gap-2">
                      <span>হিরো ব্যানার ও ইমেজ ডিসপ্লে কন্ট্রোল</span>
                      <span className="text-xs bg-rose-100 text-[#8b1528] px-2.5 py-0.5 rounded-full font-bold">
                        {heroSlides.length} টি স্লাইড
                      </span>
                    </h3>
                    <p className="text-xs text-stone-500">
                      স্লাইডার ব্যানার ইমেজ পরিবর্তন করুন, নতুন স্লাইড যোগ করুন, অর্ডার সাজান এবং নো-ক্রপ (No-Crop) ফিট মোড নিয়ন্ত্রণ করুন
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setEditingSlide(null);
                      setSlideImageFileUrl('');
                      setIsSlideModalOpen(true);
                    }}
                    className="px-4 py-2.5 bg-[#8b1528] hover:bg-[#721020] text-white text-xs sm:text-sm font-bold rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-95 transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    <span>নতুন ব্যানার স্লাইড যোগ করুন</span>
                  </button>
                </div>

                {/* Global Fit Mode Settings */}
                <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs space-y-4">
                  <h4 className="font-bold text-sm text-stone-800">
                    ইমেজ ফিট মোড (No-Crop vs Cover)
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      onClick={() =>
                        setHeroSettings((prev) => ({
                          ...prev,
                          fitMode: 'contain',
                        }))
                      }
                      className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                        heroSettings.fitMode === 'contain'
                          ? 'border-[#8b1528] bg-rose-50/50 shadow-xs'
                          : 'border-stone-200 hover:bg-stone-50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-xs sm:text-sm text-stone-900">
                          সম্পূর্ণ নো-ক্রপ (contain)
                        </span>
                        {heroSettings.fitMode === 'contain' && (
                          <Check className="w-4 h-4 text-[#8b1528]" />
                        )}
                      </div>
                      <p className="text-[11px] text-stone-500">
                        কোনো অংশ কাটা যাবে না। শাড়ির সম্পূর্ণ আঁচল ও পাড় দৃশ্যমান থাকবে।
                      </p>
                    </button>

                    <button
                      onClick={() =>
                        setHeroSettings((prev) => ({
                          ...prev,
                          fitMode: 'cover',
                        }))
                      }
                      className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                        heroSettings.fitMode === 'cover'
                          ? 'border-[#8b1528] bg-rose-50/50 shadow-xs'
                          : 'border-stone-200 hover:bg-stone-50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-xs sm:text-sm text-stone-900">
                          ফুল ফ্রেম কভার (cover)
                        </span>
                        {heroSettings.fitMode === 'cover' && (
                          <Check className="w-4 h-4 text-[#8b1528]" />
                        )}
                      </div>
                      <p className="text-[11px] text-stone-500">
                        ব্যানার ক্যানভাস সম্পূর্ণ পূর্ণ করবে।
                      </p>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div>
                      <label className="text-xs font-semibold text-stone-700 block mb-1">
                        অটো-প্লে বিরতি (সেকেন্ড)
                      </label>
                      <input
                        type="number"
                        min="2"
                        max="15"
                        value={heroSettings.autoPlayInterval}
                        onChange={(e) =>
                          setHeroSettings((prev) => ({
                            ...prev,
                            autoPlayInterval: Number(e.target.value) || 5,
                          }))
                        }
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-stone-700 block mb-1">
                        উপরে চলমান টিকার টেক্সট
                      </label>
                      <input
                        type="text"
                        value={heroSettings.tickerText}
                        onChange={(e) =>
                          setHeroSettings((prev) => ({
                            ...prev,
                            tickerText: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs"
                      />
                    </div>
                  </div>
                </div>

                {/* Current Slides with Full Management */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-sm text-stone-800">
                      বর্তমান হিরো স্লাইডসমূহ ({heroSlides.length} টি)
                    </h4>
                    <span className="text-[11px] text-stone-500">
                      স্লাইড ড্র্যাগ/অ্যারো দিয়ে ক্রম পরিবর্তন করুন
                    </span>
                  </div>

                  <div className="space-y-3">
                    {heroSlides.map((slide, idx) => (
                      <div
                        key={slide.id || idx}
                        className="bg-white p-4 rounded-xl border border-stone-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xs hover:border-stone-300 transition-all"
                      >
                        <div className="flex items-center gap-3 min-w-0 flex-1">
                          <span className="w-6 h-6 rounded-full bg-stone-100 border border-stone-200 text-stone-600 text-xs font-bold flex items-center justify-center shrink-0">
                            {idx + 1}
                          </span>
                          <div className="relative w-32 h-20 bg-stone-100 rounded-lg border border-stone-200 overflow-hidden shrink-0">
                            <img
                              src={slide.bgImage}
                              alt={slide.title}
                              className="w-full h-full object-cover"
                            />
                            <span className="absolute bottom-1 right-1 text-[9px] bg-black/60 text-white px-1.5 py-0.5 rounded">
                              {slide.imageFit || heroSettings.fitMode}
                            </span>
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] bg-rose-100 text-[#8b1528] px-2 py-0.5 rounded font-bold">
                                {slide.badge}
                              </span>
                            </div>
                            <h5 className="font-bold text-sm text-stone-900 mt-1 truncate">
                              {slide.title}
                            </h5>
                            <p className="text-xs text-stone-500 truncate">
                              {slide.subtitle}
                            </p>
                            {slide.tagline && (
                              <p className="text-[11px] text-amber-700 italic truncate mt-0.5">
                                "{slide.tagline}"
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Controls: Reorder, Edit, Delete */}
                        <div className="flex items-center gap-2 self-end md:self-center shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-stone-100 w-full md:w-auto justify-end">
                          <div className="flex items-center bg-stone-100 rounded-lg p-0.5 border border-stone-200">
                            <button
                              type="button"
                              onClick={() => handleMoveSlide(idx, 'up')}
                              disabled={idx === 0}
                              className="p-1.5 text-stone-600 hover:text-stone-900 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                              title="উপরে নিন"
                            >
                              <ArrowUp className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleMoveSlide(idx, 'down')}
                              disabled={idx === heroSlides.length - 1}
                              className="p-1.5 text-stone-600 hover:text-stone-900 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                              title="নিচে নিন"
                            >
                              <ArrowDown className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => {
                              setEditingSlide(slide);
                              setSlideImageFileUrl(slide.bgImage);
                              setIsSlideModalOpen(true);
                            }}
                            className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                          >
                            <Edit className="w-3.5 h-3.5" />
                            <span>ইমেজ ও টেক্সট এডিট</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDeleteSlide(slide.id)}
                            disabled={heroSlides.length <= 1}
                            className="p-1.5 text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 rounded-lg cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                            title="স্লাইড মুছে ফেলুন"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 5: COUPONS */}
            {activeTab === 'coupons' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-['Anek_Bangla'] text-xl font-bold text-stone-900">
                      কুপন কোড ও ডিসকাউন্ট
                    </h3>
                    <p className="text-xs text-stone-500">
                      গ্রাহকদের জন্য বিশেষ ছাড় কোড তৈরি ও পরিচালনা করুন
                    </p>
                  </div>
                  <button
                    onClick={() => setIsCouponModalOpen(true)}
                    className="px-4 py-2 bg-[#8b1528] hover:bg-[#721020] text-white text-xs sm:text-sm font-bold rounded-xl flex items-center gap-2 cursor-pointer shadow-xs"
                  >
                    <Plus className="w-4 h-4" />
                    <span>নতুন কুপন কোড</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {coupons.map((cpn) => (
                    <div
                      key={cpn.code}
                      className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs flex flex-col justify-between space-y-3"
                    >
                      <div>
                        <div className="flex justify-between items-start">
                          <span className="font-mono font-black text-base text-[#8b1528] bg-rose-50 px-2.5 py-1 rounded border border-rose-200">
                            {cpn.code}
                          </span>
                          <button
                            onClick={() => handleToggleCoupon(cpn.code)}
                            className={`text-[10px] px-2 py-0.5 rounded font-bold cursor-pointer ${
                              cpn.active
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-stone-200 text-stone-600'
                            }`}
                          >
                            {cpn.active ? 'সক্রিয়' : 'নিষ্ক্রিয়'}
                          </button>
                        </div>
                        <p className="text-xs text-stone-700 font-semibold mt-2">
                          ছাড়:{' '}
                          {cpn.discountType === 'fixed'
                            ? `৳${cpn.discountValue}`
                            : `${cpn.discountValue}%`}
                        </p>
                        <p className="text-[11px] text-stone-500 mt-0.5">
                          ন্যূনতম অর্ডার: ৳{cpn.minOrderAmount}
                        </p>
                        {cpn.description && (
                          <p className="text-[11px] text-stone-400 mt-1 italic">
                            {cpn.description}
                          </p>
                        )}
                      </div>

                      <div className="border-t border-stone-100 pt-2 flex justify-end">
                        <button
                          onClick={() => handleDeleteCoupon(cpn.code)}
                          className="text-red-500 hover:text-red-700 text-xs flex items-center gap-1 cursor-pointer"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>মুছে ফেলুন</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 6: REVIEWS */}
            {activeTab === 'reviews' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-['Anek_Bangla'] text-xl font-bold text-stone-900">
                      কাস্টমার ফিডব্যাক ও রিভিউ
                    </h3>
                    <p className="text-xs text-stone-500">
                      হোমপেজের মেসেঞ্জার ও হোয়াটসঅ্যাপ স্ক্রিনশট রিভিউ পরিচালনা
                    </p>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs">
                  <p className="text-xs text-stone-600 leading-relaxed">
                    সম্মানিত গ্রাহক রিভিউ সেকশনে ৩টি খাঁটি মেসেঞ্জার/হোয়াটসঅ্যাপ চ্যাট থিমভিত্তিক কার্ড প্রদর্শিত হচ্ছে। এখানে গ্রাহকদের পাঠানো পার্সেল আনবক্সিং ফটো ও সরাসরি রেসপন্স সাজানো রয়েছে যা উচ্চ কনভার্সন রেট বজায় রাখে।
                  </p>
                </div>
              </div>
            )}

            {/* TAB 7: FAQS */}
            {activeTab === 'faqs' && (
              <div className="space-y-4">
                <div>
                  <h3 className="font-['Anek_Bangla'] text-xl font-bold text-stone-900">
                    সচরাচর জিজ্ঞাসা (FAQs)
                  </h3>
                  <p className="text-xs text-stone-500">
                    কাস্টমারদের সাধারণ প্রশ্নের উত্তর তালিকা
                  </p>
                </div>

                <div className="space-y-2">
                  {faqs.map((f, idx) => (
                    <div
                      key={f.id || idx}
                      className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs space-y-1.5"
                    >
                      <h5 className="font-bold text-sm text-stone-900">
                        {f.q}
                      </h5>
                      <p className="text-xs text-stone-600">{f.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 8: CARE TIPS */}
            {activeTab === 'care' && (
              <div className="space-y-4">
                <div>
                  <h3 className="font-['Anek_Bangla'] text-xl font-bold text-stone-900">
                    শাড়ির যত্নবিধি গাইডলাইন
                  </h3>
                  <p className="text-xs text-stone-500">
                    টাঙ্গাইল তাঁত ও ল্যামা সিল্কের টেকসই সুরক্ষার নিয়মাবলী
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {careTips.map((tip, idx) => (
                    <div
                      key={tip.id || idx}
                      className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs space-y-1"
                    >
                      <h5 className="font-bold text-sm text-[#8b1528]">
                        {tip.title}
                      </h5>
                      <p className="text-xs text-stone-600 leading-relaxed">
                        {tip.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 9: SETTINGS & LOGO MANAGEMENT */}
            {activeTab === 'settings' && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-['Anek_Bangla'] text-xl font-bold text-stone-900">
                    স্টোর তথ্য, লোগো ও ডেলিভারি কনফিগারেশন
                  </h3>
                  <p className="text-xs text-stone-500">
                    লোগো ইমেজ আপলোড/ইউআরএল পরিবর্তন, হটলাইন, হোয়াটসঅ্যাপ নম্বর এবং ডেলিভারি চার্জ নির্ধারণ
                  </p>
                </div>

                {/* LOGO & BRANDING MANAGEMENT CARD */}
                <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs space-y-4">
                  <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                    <div className="flex items-center gap-2">
                      <ImageIcon className="w-5 h-5 text-[#8b1528]" />
                      <h4 className="font-bold text-sm text-stone-800">
                        ওয়েবসাইট লোগো ম্যানেজমেন্ট
                      </h4>
                    </div>
                    <span className="text-[11px] text-stone-500">
                      হেডার ও ফুটারে স্বয়ংক্রিয়ভাবে দেখাবে
                    </span>
                  </div>

                  {/* Current Logo Preview */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 flex flex-col items-center justify-center min-h-[110px]">
                      <span className="text-[10px] text-stone-400 font-semibold mb-2 uppercase tracking-wider">
                        হেডার ভিউ প্রিভিউ (সাদা ব্যাকগ্রাউন্ড)
                      </span>
                      {storeSettings.logoType === 'image' && storeSettings.logoUrl ? (
                        <img
                          src={storeSettings.logoUrl}
                          alt="Store Logo"
                          className="h-12 w-auto max-w-[200px] object-contain drop-shadow-xs"
                        />
                      ) : (
                        <span className="font-['Playfair_Display',serif] font-black text-xl text-[#8b1528] tracking-tight">
                          {storeSettings.storeNameEn || 'Ambia Saree Bari'}
                        </span>
                      )}
                    </div>

                    <div className="bg-[#4a0814] p-4 rounded-xl border border-stone-800 flex flex-col items-center justify-center min-h-[110px]">
                      <span className="text-[10px] text-rose-200/70 font-semibold mb-2 uppercase tracking-wider">
                        ডার্ক ব্যাকগ্রাউন্ড ভিউ
                      </span>
                      {storeSettings.logoType === 'image' && storeSettings.logoUrl ? (
                        <img
                          src={storeSettings.logoUrl}
                          alt="Store Logo"
                          className="h-12 w-auto max-w-[200px] object-contain brightness-110 drop-shadow-sm"
                        />
                      ) : (
                        <span className="font-['Playfair_Display',serif] font-black text-xl text-white tracking-tight drop-shadow-xs">
                          {storeSettings.storeNameEn || 'Ambia Saree Bari'}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Logo Type Selector */}
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() =>
                        setStoreSettings((prev) => ({
                          ...prev,
                          logoType: 'image',
                        }))
                      }
                      className={`p-3 rounded-lg border text-left cursor-pointer transition-all ${
                        storeSettings.logoType === 'image'
                          ? 'border-[#8b1528] bg-rose-50/60 font-bold text-[#8b1528]'
                          : 'border-stone-200 hover:bg-stone-50 text-stone-700'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span>ইমেজ লোগো ব্যবহার করুন</span>
                        {storeSettings.logoType === 'image' && (
                          <Check className="w-4 h-4 text-[#8b1528]" />
                        )}
                      </div>
                      <span className="text-[10px] font-normal text-stone-500 block mt-0.5">
                        কাস্টম ছবি বা ফটো লোগো
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setStoreSettings((prev) => ({
                          ...prev,
                          logoType: 'text',
                        }))
                      }
                      className={`p-3 rounded-lg border text-left cursor-pointer transition-all ${
                        storeSettings.logoType === 'text'
                          ? 'border-[#8b1528] bg-rose-50/60 font-bold text-[#8b1528]'
                          : 'border-stone-200 hover:bg-stone-50 text-stone-700'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span>টেক্সট ব্র্যান্ডিং ব্যবহার করুন</span>
                        {storeSettings.logoType === 'text' && (
                          <Check className="w-4 h-4 text-[#8b1528]" />
                        )}
                      </div>
                      <span className="text-[10px] font-normal text-stone-500 block mt-0.5">
                        দোকানের নাম ও ট্যাগলাইন টেক্সট
                      </span>
                    </button>
                  </div>

                  {/* Logo Upload & URL Inputs */}
                  <div className="space-y-3 pt-2">
                    <div>
                      <label className="text-xs font-semibold text-stone-700 block mb-1">
                        ডিভাইস থেকে সরাসরি লোগো আপলোড করুন
                      </label>
                      <label className="flex items-center justify-center gap-2 p-3 border-2 border-dashed border-stone-300 hover:border-[#8b1528] bg-stone-50 hover:bg-rose-50/20 rounded-xl cursor-pointer transition-colors text-xs text-stone-700">
                        <Upload className="w-4 h-4 text-[#8b1528]" />
                        <span className="font-semibold">
                          কম্পিউটার/মোবাইল থেকে নতুন লোগো সিলেক্ট করুন
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleLogoUpload}
                          className="hidden"
                        />
                      </label>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-stone-700 block mb-1">
                        অথবা লোগো ইমেজ ইউআরএল (Image URL) দিন
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={storeSettings.logoUrl || ''}
                          onChange={(e) =>
                            setStoreSettings((prev) => ({
                              ...prev,
                              logoUrl: e.target.value,
                              logoType: 'image',
                            }))
                          }
                          placeholder="https://.../logo.png"
                          className="flex-1 px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs font-mono outline-hidden focus:bg-white focus:border-[#8b1528]"
                        />
                        {storeSettings.logoUrl && (
                          <button
                            type="button"
                            onClick={() =>
                              setStoreSettings((prev) => ({
                                ...prev,
                                logoUrl: '',
                                logoType: 'text',
                              }))
                            }
                            className="px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-600 rounded-lg text-xs font-semibold cursor-pointer shrink-0"
                          >
                            রিমুভ
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Logo Presets */}
                    <div>
                      <span className="text-[11px] font-semibold text-stone-600 block mb-1.5">
                        প্রিমেড ব্র্যান্ড লোগো প্রিসেট (১-ক্লিকে সিলেক্ট করুন):
                      </span>
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            setStoreSettings((prev) => ({
                              ...prev,
                              logoUrl:
                                '/assets/girls_fashion_banner_1788842585614-FK2essCR.jpg',
                              logoType: 'image',
                            }))
                          }
                          className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg text-xs font-medium cursor-pointer"
                        >
                          Girls Fashion গোল্ডেন ব্যানার
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setStoreSettings((prev) => ({
                              ...prev,
                              logoUrl:
                                'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=400&q=80',
                              logoType: 'image',
                            }))
                          }
                          className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg text-xs font-medium cursor-pointer"
                        >
                          ঐতিহ্যবাহী টাঙ্গাইল শাড়ি আইকন
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setStoreSettings((prev) => ({
                              ...prev,
                              logoUrl: '',
                              logoType: 'text',
                            }))
                          }
                          className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-[#8b1528] rounded-lg text-xs font-semibold cursor-pointer"
                        >
                          টেক্সট লোগো রিসেট
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs space-y-4">
                  <h4 className="font-bold text-sm text-stone-800">
                    দোকানের তথ্য ও যোগাযোগের নম্বর
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="font-semibold text-stone-700 block mb-1">
                        দোকানের নাম
                      </label>
                      <input
                        type="text"
                        value={storeSettings.storeName}
                        onChange={(e) =>
                          setStoreSettings((prev) => ({
                            ...prev,
                            storeName: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg outline-hidden"
                      />
                    </div>

                    <div>
                      <label className="font-semibold text-stone-700 block mb-1">
                        ট্যাগলাইন
                      </label>
                      <input
                        type="text"
                        value={storeSettings.tagline}
                        onChange={(e) =>
                          setStoreSettings((prev) => ({
                            ...prev,
                            tagline: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg outline-hidden"
                      />
                    </div>

                    <div>
                      <label className="font-semibold text-stone-700 block mb-1">
                        হটলাইন ফোন
                      </label>
                      <input
                        type="text"
                        value={storeSettings.phone}
                        onChange={(e) =>
                          setStoreSettings((prev) => ({
                            ...prev,
                            phone: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg outline-hidden font-mono"
                      />
                    </div>

                    <div>
                      <label className="font-semibold text-stone-700 block mb-1">
                        WhatsApp নম্বর
                      </label>
                      <input
                        type="text"
                        value={storeSettings.whatsapp}
                        onChange={(e) =>
                          setStoreSettings((prev) => ({
                            ...prev,
                            whatsapp: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg outline-hidden font-mono"
                      />
                    </div>

                    <div>
                      <label className="font-semibold text-stone-700 block mb-1">
                        ঢাকা সিটির ভেতরে ডেলিভারি চার্জ (৳)
                      </label>
                      <input
                        type="number"
                        value={storeSettings.dhakaDeliveryCharge}
                        onChange={(e) =>
                          setStoreSettings((prev) => ({
                            ...prev,
                            dhakaDeliveryCharge: Number(e.target.value) || 60,
                          }))
                        }
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg outline-hidden font-mono"
                      />
                    </div>

                    <div>
                      <label className="font-semibold text-stone-700 block mb-1">
                        ঢাকার বাইরে ডেলিভারি চার্জ (৳)
                      </label>
                      <input
                        type="number"
                        value={storeSettings.outsideDeliveryCharge}
                        onChange={(e) =>
                          setStoreSettings((prev) => ({
                            ...prev,
                            outsideDeliveryCharge: Number(e.target.value) || 120,
                          }))
                        }
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg outline-hidden font-mono"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="font-semibold text-stone-700 block mb-1">
                        শো-রুম ও আউটলেটের ঠিকানা
                      </label>
                      <input
                        type="text"
                        value={storeSettings.address}
                        onChange={(e) =>
                          setStoreSettings((prev) => ({
                            ...prev,
                            address: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg outline-hidden"
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-stone-200 flex justify-between items-center">
                    <button
                      onClick={() => {
                        if (
                          confirm(
                            'আপনি কি সব ডেমো ডেটা রিসেট করতে চান? এটি পূর্বের আসল ডাটা ফিরিয়ে আনবে।',
                          )
                        ) {
                          onResetDemoData();
                          showToast('সব ডেটা সফলভাবে রিসেট করা হয়েছে!');
                        }
                      }}
                      className="px-4 py-2 bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs font-bold rounded-lg flex items-center gap-1.5 cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>রিসেট ডেমো ডেটা</span>
                    </button>

                    <button
                      onClick={() => showToast('সেটিংস সফলভাবে সংরক্ষিত হয়েছে!')}
                      className="px-5 py-2 bg-[#8b1528] hover:bg-[#721020] text-white text-xs font-bold rounded-lg cursor-pointer shadow-sm active:scale-95"
                    >
                      সংরক্ষণ করুন
                    </button>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>

        {/* MODAL: ADD / EDIT PRODUCT */}
        {isProductModalOpen && (
          <div className="fixed inset-0 z-60 bg-black/60 flex items-center justify-center p-3">
            <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl p-5 space-y-4 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center border-b border-stone-200 pb-2">
                <h4 className="font-bold text-base text-stone-900 font-['Anek_Bangla']">
                  {editingProduct ? 'শাড়ির তথ্য ও স্টক এডিট করুন' : 'নতুন শাড়ি যুক্ত করুন'}
                </h4>
                <button
                  onClick={() => setIsProductModalOpen(false)}
                  className="text-stone-400 hover:text-stone-700 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.currentTarget;
                  const data: Partial<Product> = {
                    name: (form.elements.namedItem('name') as HTMLInputElement)
                      .value,
                    code: (form.elements.namedItem('code') as HTMLInputElement)
                      .value,
                    category: (
                      form.elements.namedItem('category') as HTMLSelectElement
                    ).value,
                    price: Number(
                      (form.elements.namedItem('price') as HTMLInputElement)
                        .value,
                    ),
                    originalPrice: Number(
                      (
                        form.elements.namedItem(
                          'originalPrice',
                        ) as HTMLInputElement
                      ).value,
                    ),
                    stockCount: Number(
                      (
                        form.elements.namedItem(
                          'stockCount',
                        ) as HTMLInputElement
                      ).value,
                    ),
                    inStock: Number(
                      (
                        form.elements.namedItem(
                          'stockCount',
                        ) as HTMLInputElement
                      ).value,
                    ) > 0,
                    fabric: (
                      form.elements.namedItem('fabric') as HTMLInputElement
                    ).value,
                    blousePiece: (
                      form.elements.namedItem(
                        'blousePiece',
                      ) as HTMLInputElement
                    ).value,
                    images: [
                      (form.elements.namedItem('image') as HTMLInputElement)
                        .value,
                    ],
                  };
                  handleSaveProduct(data);
                }}
                className="space-y-3 text-xs"
              >
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">
                    শাড়ির নাম
                  </label>
                  <input
                    name="name"
                    required
                    defaultValue={editingProduct?.name || ''}
                    placeholder="উদা: প্রিমিয়াম টাঙ্গাইল জামদানি তাঁতের শাড়ি"
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg outline-hidden focus:bg-white focus:border-[#8b1528]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">
                      প্রোডাক্ট কোড
                    </label>
                    <input
                      name="code"
                      required
                      defaultValue={editingProduct?.code || ''}
                      placeholder="উদা: ASB-9021"
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg outline-hidden font-mono focus:bg-white focus:border-[#8b1528]"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">
                      ক্যাটাগরি
                    </label>
                    <select
                      name="category"
                      defaultValue={editingProduct?.category || 'tangail-tat'}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg outline-hidden cursor-pointer"
                    >
                      {categories.slice(1).map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">
                      বিক্রয় মূল্য (৳)
                    </label>
                    <input
                      name="price"
                      type="number"
                      required
                      defaultValue={editingProduct?.price || 1200}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg outline-hidden font-mono"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">
                      আগের মূল্য (৳)
                    </label>
                    <input
                      name="originalPrice"
                      type="number"
                      defaultValue={editingProduct?.originalPrice || 1600}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg outline-hidden font-mono"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">
                      স্টক সংখ্যা (Stock)
                    </label>
                    <input
                      name="stockCount"
                      type="number"
                      min="0"
                      required
                      defaultValue={editingProduct?.stockCount !== undefined ? editingProduct.stockCount : 15}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg outline-hidden font-mono font-bold text-[#8b1528]"
                    />
                  </div>
                </div>

                {/* Product Image Input with File Upload option */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="font-semibold text-stone-700 block">
                      শাড়ির ছবি (Image URL বা ডিভাইস থেকে আপলোড)
                    </label>
                    <label className="text-[11px] text-[#8b1528] font-bold cursor-pointer hover:underline flex items-center gap-1">
                      <Upload className="w-3 h-3" />
                      <span>ডিভাইস থেকে ফাইল নির্বাচন</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          const reader = new FileReader();
                          reader.onload = () => {
                            if (typeof reader.result === 'string') {
                              const inputEl = document.querySelector('input[name="image"]') as HTMLInputElement;
                              if (inputEl) inputEl.value = reader.result;
                              showToast('ছবি সফলভাবে যুক্ত করা হয়েছে!');
                            }
                          };
                          reader.readAsDataURL(file);
                        }}
                      />
                    </label>
                  </div>
                  <input
                    name="image"
                    required
                    defaultValue={
                      editingProduct?.images[0] ||
                      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80'
                    }
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg outline-hidden font-mono text-xs focus:bg-white focus:border-[#8b1528]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">
                      ফেব্রিক
                    </label>
                    <input
                      name="fabric"
                      defaultValue={
                        editingProduct?.fabric || '১০০% পিওর সুতি সুতা'
                      }
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">
                      ব্লাউজ পিস
                    </label>
                    <input
                      name="blousePiece"
                      defaultValue={
                        editingProduct?.blousePiece ||
                        'ব্লাউজ পিস সহ (৮০ সে.মি.)'
                      }
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg outline-hidden"
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsProductModalOpen(false)}
                    className="px-4 py-2 bg-stone-100 hover:bg-stone-200 rounded-lg text-stone-700 font-semibold cursor-pointer"
                  >
                    বাতিল
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#8b1528] hover:bg-[#721020] text-white rounded-lg font-bold cursor-pointer shadow-sm active:scale-95"
                  >
                    সংরক্ষণ করুন
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL: ADD / EDIT HERO SLIDE */}
        {isSlideModalOpen && (
          <div className="fixed inset-0 z-60 bg-black/60 flex items-center justify-center p-3">
            <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl p-5 space-y-4 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center border-b border-stone-200 pb-2">
                <h4 className="font-bold text-base text-stone-900 font-['Anek_Bangla']">
                  {editingSlide ? 'হিরো স্লাইড এডিট করুন' : 'নতুন ব্যানার স্লাইড যোগ করুন'}
                </h4>
                <button
                  onClick={() => setIsSlideModalOpen(false)}
                  className="text-stone-400 hover:text-stone-700 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.currentTarget;
                  const slideData: Partial<HeroSlide> = {
                    title: (form.elements.namedItem('slideTitle') as HTMLInputElement).value,
                    subtitle: (form.elements.namedItem('slideSubtitle') as HTMLInputElement).value,
                    slogan: (form.elements.namedItem('slideSlogan') as HTMLInputElement).value,
                    tagline: (form.elements.namedItem('slideTagline') as HTMLInputElement).value,
                    badge: (form.elements.namedItem('slideBadge') as HTMLInputElement).value,
                    bgImage: (form.elements.namedItem('slideBgImage') as HTMLInputElement).value,
                    actionText: (form.elements.namedItem('slideActionText') as HTMLInputElement).value,
                    secondaryActionText: (form.elements.namedItem('slideSecActionText') as HTMLInputElement).value,
                    imageFit: (form.elements.namedItem('slideFit') as HTMLSelectElement).value as 'cover' | 'contain',
                  };
                  handleSaveSlide(slideData);
                }}
                className="space-y-3 text-xs"
              >
                {/* Banner Image with Upload & URL */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="font-semibold text-stone-700 block">
                      ব্যানার ইমেজ (Image URL বা ডিভাইস থেকে আপলোড)
                    </label>
                    <label className="text-[11px] text-[#8b1528] font-bold cursor-pointer hover:underline flex items-center gap-1">
                      <Upload className="w-3 h-3" />
                      <span>ডিভাইস থেকে ফাইল নির্বাচন</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          if (file.size > 5 * 1024 * 1024) {
                            alert('ফাইলের সাইজ ৫ মেগাবাইটের কম হতে হবে');
                            return;
                          }
                          const reader = new FileReader();
                          reader.onload = () => {
                            if (typeof reader.result === 'string') {
                              const inputEl = document.querySelector('input[name="slideBgImage"]') as HTMLInputElement;
                              if (inputEl) inputEl.value = reader.result;
                              setSlideImageFileUrl(reader.result);
                              showToast('ইমেজ আপলোড সফল হয়েছে!');
                            }
                          };
                          reader.readAsDataURL(file);
                        }}
                      />
                    </label>
                  </div>
                  <input
                    name="slideBgImage"
                    required
                    defaultValue={
                      slideImageFileUrl ||
                      editingSlide?.bgImage ||
                      '/assets/girls_fashion_banner_1788842585614-FK2essCR.jpg'
                    }
                    onChange={(e) => setSlideImageFileUrl(e.target.value)}
                    placeholder="https://... অথবা /assets/..."
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg outline-hidden font-mono text-xs focus:bg-white focus:border-[#8b1528]"
                  />

                  {/* Image Presets */}
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    <span className="text-[10px] text-stone-500 self-center">প্রিসেট:</span>
                    <button
                      type="button"
                      onClick={() => {
                        const url = '/assets/girls_fashion_banner_1788842585614-FK2essCR.jpg';
                        const inputEl = document.querySelector('input[name="slideBgImage"]') as HTMLInputElement;
                        if (inputEl) inputEl.value = url;
                        setSlideImageFileUrl(url);
                      }}
                      className="px-2 py-1 bg-stone-100 hover:bg-stone-200 rounded text-[10px] text-stone-700 cursor-pointer"
                    >
                      Girls Fashion ব্যানার
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const url = 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80';
                        const inputEl = document.querySelector('input[name="slideBgImage"]') as HTMLInputElement;
                        if (inputEl) inputEl.value = url;
                        setSlideImageFileUrl(url);
                      }}
                      className="px-2 py-1 bg-stone-100 hover:bg-stone-200 rounded text-[10px] text-stone-700 cursor-pointer"
                    >
                      ঐতিহ্যবাহী লাল-সোনালী তাঁত
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const url = 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=80';
                        const inputEl = document.querySelector('input[name="slideBgImage"]') as HTMLInputElement;
                        if (inputEl) inputEl.value = url;
                        setSlideImageFileUrl(url);
                      }}
                      className="px-2 py-1 bg-stone-100 hover:bg-stone-200 rounded text-[10px] text-stone-700 cursor-pointer"
                    >
                      জামদানি রয়েল জরি
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">
                      প্রধান শিরোনাম (Title)
                    </label>
                    <input
                      name="slideTitle"
                      required
                      defaultValue={editingSlide?.title || 'GIRLS FASHION'}
                      placeholder="উদা: GIRLS FASHION"
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg outline-hidden focus:bg-white focus:border-[#8b1528]"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">
                      ব্যাজ টেক্সট (Badge)
                    </label>
                    <input
                      name="slideBadge"
                      defaultValue={editingSlide?.badge || 'এক্সক্লুসিভ কালেকশন ২০২৬'}
                      placeholder="উদা: ঈদ কালেকশন"
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg outline-hidden focus:bg-white focus:border-[#8b1528]"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-stone-700 block mb-1">
                    উপ-শিরোনাম (Subtitle)
                  </label>
                  <input
                    name="slideSubtitle"
                    defaultValue={editingSlide?.subtitle || 'টাঙ্গাইলের ঐতিহ্যবাহী প্রিমিয়াম শাড়ি কালেকশন'}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg outline-hidden focus:bg-white focus:border-[#8b1528]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">
                      স্লোগান (Slogan)
                    </label>
                    <input
                      name="slideSlogan"
                      defaultValue={editingSlide?.slogan || 'শাড়িতে ফুটুক আপনার রূপ ও সৌন্দর্য'}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">
                      ট্যাগলাইন (Tagline)
                    </label>
                    <input
                      name="slideTagline"
                      defaultValue={editingSlide?.tagline || 'ঐতিহ্যের বন্ধনে খাঁটি বাঙালিয়ানা সাজ'}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg outline-hidden"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">
                      অ্যাকশন বাটন ১
                    </label>
                    <input
                      name="slideActionText"
                      defaultValue={editingSlide?.actionText || 'এখনই অর্ডার করুন'}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">
                      অ্যাকশন বাটন ২
                    </label>
                    <input
                      name="slideSecActionText"
                      defaultValue={editingSlide?.secondaryActionText || 'কালেকশন দেখুন'}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">
                      ইমেজ ফিট মোড
                    </label>
                    <select
                      name="slideFit"
                      defaultValue={editingSlide?.imageFit || 'cover'}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg outline-hidden cursor-pointer"
                    >
                      <option value="cover">cover (ফুল স্ক্রিন)</option>
                      <option value="contain">contain (নো-ক্রপ)</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsSlideModalOpen(false)}
                    className="px-4 py-2 bg-stone-100 hover:bg-stone-200 rounded-lg text-stone-700 font-semibold cursor-pointer"
                  >
                    বাতিল
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#8b1528] hover:bg-[#721020] text-white rounded-lg font-bold cursor-pointer shadow-sm active:scale-95"
                  >
                    {editingSlide ? 'আপডেট করুন' : 'স্লাইড যুক্ত করুন'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL: ADD COUPON */}
        {isCouponModalOpen && (
          <div className="fixed inset-0 z-60 bg-black/60 flex items-center justify-center p-3">
            <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl p-5 space-y-4">
              <div className="flex justify-between items-center border-b border-stone-200 pb-2">
                <h4 className="font-bold text-base text-stone-900 font-['Anek_Bangla']">
                  নতুন কুপন কোড
                </h4>
                <button
                  onClick={() => setIsCouponModalOpen(false)}
                  className="text-stone-400 hover:text-stone-700 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">
                    কুপন কোড (ইংরেজি বড়হাতে)
                  </label>
                  <input
                    type="text"
                    value={newCoupon.code}
                    onChange={(e) =>
                      setNewCoupon({
                        ...newCoupon,
                        code: e.target.value.toUpperCase(),
                      })
                    }
                    placeholder="উদা: EID2026 বা SILK100"
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg outline-hidden font-mono"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">
                      ডিসকাউন্ট টাইপ
                    </label>
                    <select
                      value={newCoupon.discountType}
                      onChange={(e) =>
                        setNewCoupon({
                          ...newCoupon,
                          discountType: e.target.value as 'fixed' | 'percent',
                        })
                      }
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg outline-hidden cursor-pointer"
                    >
                      <option value="fixed">ফিক্সড টাকা (৳)</option>
                      <option value="percent">শতাংশ (%)</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">
                      মূল্য বা হার
                    </label>
                    <input
                      type="number"
                      value={newCoupon.discountValue}
                      onChange={(e) =>
                        setNewCoupon({
                          ...newCoupon,
                          discountValue: Number(e.target.value) || 0,
                        })
                      }
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg outline-hidden font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-stone-700 block mb-1">
                    ন্যূনতম অর্ডার মূল্য (৳)
                  </label>
                  <input
                    type="number"
                    value={newCoupon.minOrderAmount}
                    onChange={(e) =>
                      setNewCoupon({
                        ...newCoupon,
                        minOrderAmount: Number(e.target.value) || 0,
                      })
                    }
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg outline-hidden font-mono"
                  />
                </div>

                <div>
                  <label className="font-semibold text-stone-700 block mb-1">
                    বিবরণ
                  </label>
                  <input
                    type="text"
                    value={newCoupon.description}
                    onChange={(e) =>
                      setNewCoupon({
                        ...newCoupon,
                        description: e.target.value,
                      })
                    }
                    placeholder="উদা: ঈদ উপলক্ষে বিশেষ ১০০ টাকা ছাড়"
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg outline-hidden"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    onClick={() => setIsCouponModalOpen(false)}
                    className="px-4 py-2 bg-stone-100 hover:bg-stone-200 rounded-lg text-stone-700 font-semibold cursor-pointer"
                  >
                    বাতিল
                  </button>
                  <button
                    onClick={handleAddCoupon}
                    className="px-4 py-2 bg-[#8b1528] hover:bg-[#721020] text-white rounded-lg font-bold cursor-pointer"
                  >
                    কুপন তৈরি করুন
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
