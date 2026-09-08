export interface ColorOption {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  code: string;
  name: string;
  nameEn?: string;
  category: string;
  categoryName: string;
  price: number;
  originalPrice: number;
  discountPercent: number;
  images: string[];
  fabric: string;
  length: string;
  blousePiece: string;
  anchalDetail: string;
  parDetail: string;
  colors: ColorOption[];
  inStock: boolean;
  stockCount: number;
  rating: number;
  reviewCount: number;
  isHotDeal?: boolean;
  isBestSeller?: boolean;
  isNew?: boolean;
  description: string;
  careInstructions?: string[];
}

export interface Category {
  id: string;
  name: string;
  count: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
}

export interface CustomerInfo {
  fullName: string;
  phoneNumber: string;
  fullAddress: string;
  deliveryArea?: 'dhaka_inside' | 'dhaka_outside';
  deliveryZone?: 'dhaka_inside' | 'dhaka_outside';
  paymentMethod: 'cod' | 'bkash';
  orderNotes?: string;
}

export interface Order {
  orderId: string;
  trackingNumber: string;
  date: string;
  customer: CustomerInfo;
  items: CartItem[];
  subtotal: number;
  deliveryCharge: number;
  discount?: number;
  totalAmount: number;
  couponCode?: string;
  status: 'অর্ডার গৃহীত হয়েছে' | 'প্রসেসিং হচ্ছে' | 'কুরিয়ারে হস্তান্তর' | 'ডেলিভারির পথে' | 'ডেলিভারড' | 'বাতিল';
  estimatedDelivery?: string;
  estimatedDeliveryDate?: string;
  courierName?: string;
}

export interface Review {
  id: string;
  name: string;
  location: string;
  rating: number;
  comment: string;
  date?: string;
  productName: string;
  verified: boolean;
}

export interface FAQ {
  id: string;
  q: string;
  a: string;
}

export type FAQItem = FAQ;

export interface Coupon {
  code: string;
  discountType: 'fixed' | 'percent' | 'percentage';
  discountValue: number;
  minOrderAmount: number;
  active: boolean;
  description: string;
}

export interface StoreSettings {
  storeName: string;
  storeNameEn: string;
  tagline: string;
  logoUrl?: string;
  logoType?: 'image' | 'styled_text' | 'text';
  phone: string;
  whatsapp: string;
  dhakaDeliveryCharge: number;
  outsideDeliveryCharge: number;
  freeDeliveryThreshold: number;
  announcementText: string;
  address: string;
  email: string;
  bkashNumber: string;
  facebookUrl: string;
  youtubeUrl: string;
}

export interface HeroSlidePillar {
  label: string;
}

export interface HeroSlide {
  id: string;
  bgImage: string;
  badge: string;
  title: string;
  subtitle: string;
  slogan: string;
  category: string;
  tagline: string;
  pillars?: HeroSlidePillar[];
  actionText: string;
  secondaryActionText: string;
  imageFit?: 'cover' | 'contain';
}

export interface CategoryHighlight {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
}

export interface HeroSettings {
  fitMode: 'cover' | 'contain';
  aspectRatio: string;
  overlayMode: 'minimal' | 'dark' | 'gradient' | 'full';
  autoPlayInterval: number;
  tickerText: string;
  websiteText: string;
}

export interface CareTip {
  id: string;
  title: string;
  desc: string;
  iconType: 'droplets' | 'sun' | 'wind' | 'shield';
}

export type PageRoute =
  | 'home'
  | 'shop'
  | 'contact'
  | 'tracking'
  | 'reviews'
  | 'care'
  | 'about';
