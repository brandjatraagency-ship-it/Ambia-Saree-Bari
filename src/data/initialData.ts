import {
  Product,
  Category,
  Review,
  Order,
  FAQ,
  Coupon,
  StoreSettings,
  HeroSlide,
  CategoryHighlight,
  HeroSettings,
  CareTip,
} from '../types';

export const bannerGirlsFashion = '/assets/girls_fashion_banner_1788842585614-FK2essCR.jpg';
export const bannerLamaSilk = '/assets/lama_silk_slider_1788842601114-BoE_d3AE.jpg';
export const bannerTangailTat = '/assets/tangail_tat_slider_1788842614881-DRxnoo2Z.jpg';

export const fallbackImage = 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80';

export const defaultCategories: Category[] = [
  {
    "id": "all",
    "name": "সব শাড়ি",
    "count": 20
  },
  {
    "id": "lama_silk",
    "name": "ল্যামা সিল্ক",
    "count": 5
  },
  {
    "id": "tangail_tat",
    "name": "টাঙ্গাইল তাঁত",
    "count": 5
  },
  {
    "id": "cotton_handloom",
    "name": "কটন ও সুতি সেট",
    "count": 4
  },
  {
    "id": "jamdani",
    "name": "ঢাকাই জামদানি",
    "count": 3
  },
  {
    "id": "katan",
    "name": "কাতান ও বেনারসি",
    "count": 3
  }
];

export const defaultProducts: Product[] = [
  {
    "id": "asb-101",
    "code": "ASB-101",
    "name": "অরিজিনাল ইন্ডিয়ান ল্যামা সিল্ক শাড়ি - রয়্যাল মেরুন ও গোল্ডেন জড়িপাড়",
    "nameEn": "Original Indian Lama Silk Saree - Royal Maroon & Golden Zari",
    "category": "lama_silk",
    "categoryName": "ল্যামা সিল্ক",
    "price": 1850,
    "originalPrice": 2450,
    "discountPercent": 24,
    "images": [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&q=80"
    ],
    "fabric": "১০০% পিওর সফট ল্যামা সিল্ক (High Quality Finish)",
    "length": "১২ হাত ফুল শাড়ি",
    "blousePiece": "১ হাত রানিং ব্লাউজ পিস সংযুক্ত",
    "anchalDetail": "আকর্ষণীয় ভারী জড়ির অল-ওভার কাজের আঁচল",
    "parDetail": "৩ ইঞ্চি চওড়া মিনাকারি গোল্ডেন জড়িপাড়",
    "colors": [
      {
        "name": "রয়্যাল মেরুন",
        "hex": "#681313"
      },
      {
        "name": "নেভি ব্লু",
        "hex": "#112244"
      },
      {
        "name": "বোতল গ্রিন",
        "hex": "#0e3a1f"
      }
    ],
    "inStock": true,
    "stockCount": 18,
    "rating": 4.9,
    "reviewCount": 47,
    "isHotDeal": true,
    "isBestSeller": true,
    "description": "আম্বিয়া শাড়ি বাড়ির এক্সক্লুসিভ কালেকশন! ১০০% অরিজিনাল ইন্ডিয়ান সফট ল্যামা সিল্ক শাড়ি। অতি নরম ও আরামদায়ক ফেব্রিক, নিখুঁত জড়ির বুনন এবং নজরকাড়া গ্লসি ফিনিশিং। যেকোনো পারিবারিক অনুষ্ঠান, গায়ে হলুদ বা বিয়ের পার্টিতে পরার জন্য সেরা পছন্দ। সারা বাংলাদেশে ক্যাশ অন ডেলিভারি সুবিধা রয়েছে।",
    "careInstructions": [
      "প্রথমবার ড্রাই ওয়াশ (Dry Clean) করা উত্তম।",
      "হাতে ধুলে মৃদু শ্যাম্পু বা মাইল্ড লিকুইড ডিটারজেন্ট ব্যবহার করুন।",
      "কখনো কড়া রোদে বেশিক্ষণ শুকাবেন না, ছায়ায় শুকান।",
      "ইস্ত্রি করার সময় উল্টো পিঠে হালকা তাপে ইস্ত্রি করুন।"
    ]
  },
  {
    "id": "asb-102",
    "code": "ASB-102",
    "name": "খাঁটি টাঙ্গাইল সুতি তাঁতের শাড়ি - ঐতিহ্যবাহী রানি গোলাপি ও ময়ূরপঙ্খী পার",
    "nameEn": "Authentic Tangail Pure Cotton Handloom Saree - Rani Pink",
    "category": "tangail_tat",
    "categoryName": "টাঙ্গাইল তাঁত",
    "price": 1250,
    "originalPrice": 1650,
    "discountPercent": 24,
    "images": [
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=900&q=80"
    ],
    "fabric": "৮০ কাউন্ট প্রিমিয়াম টাঙ্গাইল সুতি তাঁত",
    "length": "১২ হাত শাড়ি",
    "blousePiece": "ম্যাচিং ব্লাউজ পিস ছাড়া (ঐতিহ্যবাহী তাঁত কাট)",
    "anchalDetail": "আকর্ষণীয় ঐতিহ্যবাহী পদ্ম ও কলকা সুতার কাজ",
    "parDetail": "বাটিক ও কাঁথা স্টিচ অনুকরণে নকশাদার পার",
    "colors": [
      {
        "name": "রানি গোলাপি",
        "hex": "#c2185b"
      },
      {
        "name": "হলুদ বাসন্তী",
        "hex": "#fbc02d"
      },
      {
        "name": "কৃষ্ণচূড়া লাল",
        "hex": "#d32f2f"
      }
    ],
    "inStock": true,
    "stockCount": 25,
    "rating": 4.8,
    "reviewCount": 39,
    "isBestSeller": true,
    "description": "টাঙ্গাইলের ঐতিহ্যবাহী দক্ষ তাঁতীদের হাতে বোনা ১০০% সুতি তাঁতের শাড়ি। গরমে দারুণ আরামদায়ক এবং দীর্ঘস্থায়ী রঙ। উৎসব, পূজা, বৈশাখ কিংবা অফিসে নিয়মিত পরার জন্য আদর্শ।",
    "careInstructions": [
      "ঠান্ডা পানিতে সামান্য লবণ মিশিয়ে প্রথম ওয়াশ করা ভালো।",
      "ব্লিচ ব্যবহার করবেন না।",
      "হালকা মাড় দিলে শাড়ির ভাঁজ ও সৌন্দর্য দীর্ঘদিন বজায় থাকবে।"
    ]
  },
  {
    "id": "asb-103",
    "code": "ASB-103",
    "name": "প্রিমিয়াম ঢাকাই জামদানি শাড়ি - ৮৪ কাউন্ট সফট কটন সুতায় বোনা",
    "nameEn": "Premium Dhakai Jamdani Handwoven Saree - White & Golden Zari",
    "category": "jamdani",
    "categoryName": "ঢাকাই জামদানি",
    "price": 3450,
    "originalPrice": 4800,
    "discountPercent": 28,
    "images": [
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=900&q=80"
    ],
    "fabric": "৮৪ কাউন্ট পিওর মসলিন কটন সুতা",
    "length": "১২ হাত ফুল সাইজ",
    "blousePiece": "ব্লাউজ পিস ছাড়া (ঐতিহ্যবাহী জামদানি)",
    "anchalDetail": "ঘণ জালি কাজ ও রাজকীয় ময়ূর নকশা আঁচল",
    "parDetail": "ট্রেডিশনাল গোলাপ বুটা পার",
    "colors": [
      {
        "name": "অফ হোয়াইট ও গোল্ডেন",
        "hex": "#fbf7ee"
      },
      {
        "name": "কালো ও রূপালী",
        "hex": "#212121"
      },
      {
        "name": "মেরুন গোল্ড",
        "hex": "#5b1414"
      }
    ],
    "inStock": true,
    "stockCount": 10,
    "rating": 5,
    "reviewCount": 32,
    "isHotDeal": true,
    "isNew": true,
    "description": "বাংলার ঐতিহ্যবাহী ইউনেস্কো হেরিটেজ ঢাকাই জামদানি। সূক্ষ্ম হাতের কাজ ও কোমল টেক্সচার। গায়ে জড়ালে যেমন আভিজাত্য ফুটে ওঠে, তেমনই সারাদিন স্বাচ্ছন্দ্যে পরা যায়। যেকোনো জমকালো আয়োজনের মধ্যমণি হতে এই জামদানি শাড়ির বিকল্প নেই।",
    "careInstructions": [
      "শুধুমাত্র পলিশ ও ড্রাই ক্লিনিং প্রযোজ্য।",
      "কাগজে পেঁচিয়ে শুকনো জায়গায় সংরক্ষণ করুন।",
      "প্রতি ২-৩ মাস পর ভাঁজ পরিবর্তন করে রাখুন।"
    ]
  },
  {
    "id": "asb-104",
    "code": "ASB-104",
    "name": "কাঞ্জিভরম ব্রাইডাল বেনারসি কাতান শাড়ি - রত্নচূড়া ব্লু ও অ্যান্টিক জরি",
    "nameEn": "Kanjivaram Bridal Banarasi Katan Silk Saree - Sapphire Blue",
    "category": "katan",
    "categoryName": "কাতান ও বেনারসি",
    "price": 3850,
    "originalPrice": 5200,
    "discountPercent": 26,
    "images": [
      "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&q=80"
    ],
    "fabric": "প্রিমিয়াম কাতান সিল্ক ও অ্যান্টিক গোল্ডেন জড়ির উইভিং",
    "length": "১২ হাত শাড়ি",
    "blousePiece": "১ হাত এমব্রয়ডারি পার সহ ব্লাউজ পিস",
    "anchalDetail": "ঘন অ্যান্টিক জড়ির ব্রাইডাল টেম্পল আঁচল",
    "parDetail": "৫ ইঞ্চি রাজকীয় মন্দির পার নকশা",
    "colors": [
      {
        "name": "নীলমনি ব্লু",
        "hex": "#154360"
      },
      {
        "name": "গাড় মেরুন",
        "hex": "#4a121a"
      },
      {
        "name": "পান্না গ্রিন",
        "hex": "#0b5345"
      }
    ],
    "inStock": true,
    "stockCount": 14,
    "rating": 4.9,
    "reviewCount": 28,
    "isBestSeller": true,
    "description": "নববধূ ও বিয়ের অতিথিদের জন্য এক অপূর্ব সৃষ্টি। ব্রাইডাল অ্যান্টিক জরি দিয়ে বোনা কাঞ্জিভরম কাতান সিল্ক। অসাধারণ উজ্জ্বলতা এবং আভিজাত্যপূর্ণ লুক। সাথে রয়েছে ম্যাচিং হেভি ব্লাউজ পিস।",
    "careInstructions": [
      "শুধুমাত্র ড্রাই ওয়াশ করুন।",
      "সরাসরি পারফিউম বা সুগন্ধি স্প্রে করবেন না।",
      "মসলিন কাপড়ে জড়িয়ে হ্যাঙ্গারে ঝুলিয়ে রাখুন।"
    ]
  },
  {
    "id": "asb-105",
    "code": "ASB-105",
    "name": "ল্যামা সফট সিল্ক পার্টি শাড়ি - মাস্টার্ড গোল্ডেন ও রেশমি পার",
    "nameEn": "Lama Soft Silk Party Wear Saree - Mustard Gold",
    "category": "lama_silk",
    "categoryName": "ল্যামা সিল্ক",
    "price": 1950,
    "originalPrice": 2600,
    "discountPercent": 25,
    "images": [
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80"
    ],
    "fabric": "হাই গ্লস ল্যামা সিল্ক (সিল্কি ও ফলিন ফেব্রিক)",
    "length": "১২ হাত শাড়ি",
    "blousePiece": "১ হাত কনট্রাস্ট ব্লাউজ পিস",
    "anchalDetail": "ডিজিটাল জ্যাকার্ড উইভিং রাজকীয় আঁচল",
    "parDetail": "কনট্রাস্ট ডুয়াল শেড রেশমি সুতা পার",
    "colors": [
      {
        "name": "মাস্টার্ড গোল্ড",
        "hex": "#d4ac0d"
      },
      {
        "name": "টিয়া ও কলাপাতা",
        "hex": "#27ae60"
      },
      {
        "name": "রানি গোলাপি",
        "hex": "#e91e63"
      }
    ],
    "inStock": true,
    "stockCount": 16,
    "rating": 4.8,
    "reviewCount": 35,
    "isHotDeal": true,
    "description": "খুবই আরামদায়ক ও গাউন-সদৃশ সুন্দর ফল থাকা ল্যামা সিল্ক শাড়ি। হলুদ অনুষ্ঠান, সঙ্গীত সন্ধ্যা বা বন্ধুদের আড্ডায় দারুণ মানিয়ে যাবে। কুচি খুব সহজেই বসে এবং খুলে যায় না।",
    "careInstructions": [
      "ড্রাই ওয়াশ অথবা হালকা শ্যাম্পু পানিতে ওয়াশ।",
      "লৌহযুক্ত কড়া পানিতে ধোবেন না।"
    ]
  },
  {
    "id": "asb-106",
    "code": "ASB-106",
    "name": "টাঙ্গাইল বালুচরি হাফ সিল্ক শাড়ি - ফিরোজা ও রূপালী সুতার কাজ",
    "nameEn": "Tangail Baluchari Half Silk Saree - Firoza & Silver Weave",
    "category": "half_silk",
    "categoryName": "হাফ সিল্ক",
    "price": 1550,
    "originalPrice": 2100,
    "discountPercent": 26,
    "images": [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=900&q=80"
    ],
    "fabric": "প্রিমিয়াম টাঙ্গাইল হাফ সিল্ক (সিল্ক + কটন মিক্স)",
    "length": "১২ হাত শাড়ি",
    "blousePiece": "১ হাত ব্লাউজ পিস সংযুক্ত",
    "anchalDetail": "বালুচরি স্টাইল পৌরাণিক মোটিফ উইভিং",
    "parDetail": "সিলভার সুতার ঐতিহ্যবাহী পার",
    "colors": [
      {
        "name": "ফিরোজা ব্লু",
        "hex": "#00bcd4"
      },
      {
        "name": "পার্পল ভায়োলেট",
        "hex": "#673ab7"
      },
      {
        "name": "সিলভার গ্রে",
        "hex": "#9e9e9e"
      }
    ],
    "inStock": true,
    "stockCount": 22,
    "rating": 4.7,
    "reviewCount": 26,
    "isNew": true,
    "description": "হাফ সিল্কের অপূর্ব কম্বিনেশন—সিল্কের মত গ্লস অথচ সুতির মত নিঃশ্বাস নেওয়ার মত আরাম। টাঙ্গাইল তাঁতের বিশেষ বালুচরি ডিজাইনে নকশা করা।",
    "careInstructions": [
      "শীতল পানিতে মাইল্ড ডিটারজেন্ট দিয়ে আলতো হাতে পরিষ্কার করুন।",
      "ছায়ায় শুকিয়ে হালকা তাপে ইস্ত্রি করুন।"
    ]
  },
  {
    "id": "asb-107",
    "code": "ASB-107",
    "name": "এক্সক্লুসিভ অর্গানজা টিস্যু শাড়ি - ফ্লোরাল এমব্রয়ডারি ও কাটওয়ার্ক পার",
    "nameEn": "Exclusive Organza Tissue Saree - Pastel Floral Embroidery",
    "category": "organza_georgette",
    "categoryName": "অর্গানজা ও জর্জেট",
    "price": 2450,
    "originalPrice": 3200,
    "discountPercent": 23,
    "images": [
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=900&q=80"
    ],
    "fabric": "প্রিমিয়াম পিওর অর্গানজা সিল্ক টিস্যু",
    "length": "১২ হাত ফুল শাড়ি",
    "blousePiece": "১ হাত ডিজাইনার এমব্রয়ডারি ব্লাউজ পিস",
    "anchalDetail": "লেজার কাট স্ক্যালপ পার ও ফ্লোরাল প্যাস্টেল বুটা",
    "parDetail": "হাতের তৈরি মুক্তাদানা ও সুতার কাটওয়ার্ক পার",
    "colors": [
      {
        "name": "ল্যাভেন্ডার প্যাস্টেল",
        "hex": "#ce93d8"
      },
      {
        "name": "মিষ্টি পিচ",
        "hex": "#ffab91"
      },
      {
        "name": "আইস ব্লু",
        "hex": "#b2ebf2"
      }
    ],
    "inStock": true,
    "stockCount": 12,
    "rating": 4.9,
    "reviewCount": 31,
    "isHotDeal": true,
    "description": "বর্তমান ট্রেন্ডের শীর্ষে থাকা ড্রিম অর্গানজা টিস্যু শাড়ি। খুবই লাইটওয়েট এবং আধুনিক আভিজাত্য ফুটিয়ে তোলে। চমৎকার কাটওয়ার্ক বর্ডার এবং প্যাস্টেল শেডের রঙিন সুতার এমব্রয়ডারি।",
    "careInstructions": [
      "শুধুমাত্র ড্রাই ক্লিন করুন।",
      "স্টিম আয়রন ব্যবহার করা সবচেয়ে নিরাপদ।"
    ]
  },
  {
    "id": "asb-108",
    "code": "ASB-108",
    "name": "হাতে বোনা পিওর খাদি কটন শাড়ি - প্রাকৃতিক রং ও কানি কাজ",
    "nameEn": "Handspun Pure Khadi Cotton Saree - Natural Dye & Temple Border",
    "category": "cotton_handloom",
    "categoryName": "সুতি ও হ্যান্ডলুম",
    "price": 1350,
    "originalPrice": 1750,
    "discountPercent": 23,
    "images": [
      "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80"
    ],
    "fabric": "১০০% পিওর হ্যান্ডস্পান খাদি কটন",
    "length": "১২ হাত শাড়ি",
    "blousePiece": "১ হাত কনট্রাস্ট স্ট্রাইপ ব্লাউজ পিস",
    "anchalDetail": "টাসেল সহ হ্যান্ডলুম ট্র্যাডিশনাল আঁচল",
    "parDetail": "টেম্পল প্রিন্ট পার",
    "colors": [
      {
        "name": "ইট লাল ও মাটি",
        "hex": "#a93226"
      },
      {
        "name": "গাঢ় নীল কটন",
        "hex": "#1f618d"
      },
      {
        "name": "জলপাই গ্রিন",
        "hex": "#52be80"
      }
    ],
    "inStock": true,
    "stockCount": 20,
    "rating": 4.8,
    "reviewCount": 24,
    "description": "স্বদেশী চেতনা ও নিখাদ আরামের প্রতীক খাদি কটন শাড়ি। সারাদিন পরে থাকলেও ক্লান্তি আসবে না। শিক্ষিকা, ব্যাংকার, কর্মজীবী নারী কিংবা শান্ত মার্জিত পোশাক প্রেমীদের প্রথম পছন্দ।",
    "careInstructions": [
      "প্রথমবার সাবান ছাড়া শুধু পানিতে ধুয়ে ছায়ায় মেলে দিন।",
      "মৃদু ইস্ত্রি করুন।"
    ]
  },
  {
    "id": "asb-109",
    "code": "ASB-109",
    "name": "টাঙ্গাইল রেশম সুতি তাঁত শাড়ি - পদ্মবুটা ও সোনালী সুতা পার",
    "nameEn": "Tangail Resham Cotton Handloom Saree - Lotus Motif",
    "category": "tangail_tat",
    "categoryName": "টাঙ্গাইল তাঁত",
    "price": 1450,
    "originalPrice": 1900,
    "discountPercent": 24,
    "images": [
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80"
    ],
    "fabric": "রেশমি সুতা ও সুতি মিশ্রিত প্রিমিয়াম টাঙ্গাইল তাঁত",
    "length": "১২ হাত শাড়ি",
    "blousePiece": "ব্লাউজ পিস সহ (১ হাত রানিং)",
    "anchalDetail": "পদ্মবুটা ও কলকা সাজানো চওড়া আঁচল",
    "parDetail": "টুইন কালার সোনালী সুতা পার",
    "colors": [
      {
        "name": "বাসন্তী কমলা",
        "hex": "#e67e22"
      },
      {
        "name": "টকটকে লাল",
        "hex": "#c0392b"
      },
      {
        "name": "বেগুনি পার্পল",
        "hex": "#7d3c98"
      }
    ],
    "inStock": true,
    "stockCount": 15,
    "rating": 4.8,
    "reviewCount": 29,
    "isHotDeal": true,
    "description": "টাঙ্গাইলের ঐতিহ্যবাহী সুতি তাঁতে রেশমের ছোঁয়া। নরম, মোলায়েম এবং চমৎকার গাঢ় রঙের শেড। যেকোনো উৎসবে আপনাকে করে তুলবে অনন্য।",
    "careInstructions": [
      "হালকা ডিটারজেন্ট দিয়ে হাত দিয়ে ওয়াশ করুন।",
      "ছায়ায় শুকান।"
    ]
  },
  {
    "id": "asb-110",
    "code": "ASB-110",
    "name": "ইন্ডিয়ান অরিজিনাল ল্যামা সিল্ক শাড়ি - এমেরাল্ড গ্রিন ও গোল্ডেন জড়িপাড়",
    "nameEn": "Original Indian Lama Silk Saree - Emerald Green & Gold",
    "category": "lama_silk",
    "categoryName": "ল্যামা সিল্ক",
    "price": 1850,
    "originalPrice": 2500,
    "discountPercent": 26,
    "images": [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=900&q=80"
    ],
    "fabric": "১০০% অরিজিনাল সফট ল্যামা সিল্ক",
    "length": "১২ হাত শাড়ি",
    "blousePiece": "১ হাত ব্লাউজ পিস সহ",
    "anchalDetail": "জড়ির অল ওভার বুটি ও পাড় ডিজাইন",
    "parDetail": "গোল্ডেন জড়ির নিখুঁত মিনাকারি পার",
    "colors": [
      {
        "name": "পান্না সবুজ",
        "hex": "#117864"
      },
      {
        "name": "রুবি মেরুন",
        "hex": "#78281f"
      },
      {
        "name": "রয়াল ভায়োলেট",
        "hex": "#4a235a"
      }
    ],
    "inStock": true,
    "stockCount": 19,
    "rating": 4.9,
    "reviewCount": 41,
    "isBestSeller": true,
    "description": "গার্লস ফ্যাশন টাঙ্গাইলের মতই সেরা মানের অরিজিনাল ল্যামা সিল্ক। সম্পূর্ণ শাড়িতে সিল্কি গ্লসি ভাব, ভারী জড়িপাড় ও সুন্দর আঁচলের নিখুঁত কাজ। ব্লাউজ পিস সংযুক্ত।",
    "careInstructions": [
      "ড্রাই ওয়াশ করার পরামর্শ রইল।",
      "লো হিটে উল্টো পাশে আয়রন করুন।"
    ]
  },
  {
    "id": "asb-111",
    "code": "ASB-111",
    "name": "ঢাকাই হাফ সিল্ক জামদানি শাড়ি - কালো ও গোল্ডেন জরি কম্বিনেশন",
    "nameEn": "Dhakai Half Silk Jamdani Saree - Jet Black & Gold Zari",
    "category": "jamdani",
    "categoryName": "ঢাকাই জামদানি",
    "price": 2250,
    "originalPrice": 2950,
    "discountPercent": 24,
    "images": [
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=900&q=80"
    ],
    "fabric": "প্রিমিয়াম হাফ সিল্ক সুতায় তৈরি জামদানি",
    "length": "১২ হাত ফুল শাড়ি",
    "blousePiece": "ব্লাউজ পিস ছাড়া",
    "anchalDetail": "আকর্ষণীয় জামদানি ফুল বুটা আঁচল",
    "parDetail": "ট্রেডিশনাল করাত পার",
    "colors": [
      {
        "name": "জেট ব্ল্যাক",
        "hex": "#17202a"
      },
      {
        "name": "ডিপ সি ব্লু",
        "hex": "#1b4f72"
      },
      {
        "name": "কফি ব্রাউন",
        "hex": "#4e342e"
      }
    ],
    "inStock": true,
    "stockCount": 11,
    "rating": 4.8,
    "reviewCount": 38,
    "isHotDeal": true,
    "description": "কালো ও গোল্ডেন কালার কম্বিনেশন সবসময়ই আভিজাত্যের প্রতীক। এই জামদানি শাড়িতে রাতের যেকোনো অনুষ্ঠানে সবাইকে তাক লাগিয়ে দেবে।",
    "careInstructions": [
      "ড্রাই ক্লিনিং রেকমেন্ডেড।",
      "সরাসরি সূর্যালোক থেকে দূরে রাখুন।"
    ]
  },
  {
    "id": "asb-112",
    "code": "ASB-112",
    "name": "টাঙ্গাইল ধনচে সুতি তাঁত শাড়ি - অফ-হোয়াইট ও লাল মন্দির পার",
    "nameEn": "Tangail Traditional Dhanche Cotton Saree - Off-white & Red",
    "category": "tangail_tat",
    "categoryName": "টাঙ্গাইল তাঁত",
    "price": 1150,
    "originalPrice": 1500,
    "discountPercent": 23,
    "images": [
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80"
    ],
    "fabric": "১০০% খাঁটি সুতি টাঙ্গাইল ধনচে উইভ",
    "length": "১২ হাত ফুল শাড়ি",
    "blousePiece": "ব্লাউজ পিস ছাড়া",
    "anchalDetail": "ঐতিহ্যবাহী লাল সুতার স্ট্রাইপ আঁচল",
    "parDetail": "মন্দির নকশার লাল সুতি পার",
    "colors": [
      {
        "name": "লাল ও অফ-হোয়াইট",
        "hex": "#b71c1c"
      },
      {
        "name": "সবুজ ও অফ-হোয়াইট",
        "hex": "#1b5e20"
      }
    ],
    "inStock": true,
    "stockCount": 30,
    "rating": 4.9,
    "reviewCount": 44,
    "description": "পূজা, পহেলা বৈশাখ এবং বাঙালির যেকোনো জাতীয় উৎসবের জন্য লাল-সাদা টাঙ্গাইল শাড়ির কোনো বিকল্প নেই। ১০০% খাঁটি সুতি ফেব্রিক, যা পরতে অত্যন্ত আরামদায়ক।",
    "careInstructions": [
      "সাধারণ পানিতে ধুয়ে নিতে পারবেন।",
      "হালকা মাড় দিয়ে ইস্ত্রি করলে শাড়ির ফ্রেশনেস দারুণ থাকে।"
    ]
  },
  {
    "id": "asb-113",
    "code": "ASB-113",
    "name": "ইন্ডিয়ান এক্সক্লুসিভ ল্যামা সিল্ক শাড়ি - পিচ পিঙ্ক ও সিলভার জড়িপাড়",
    "nameEn": "Indian Exclusive Lama Silk Saree - Peach Pink & Silver Zari",
    "category": "lama_silk",
    "categoryName": "ল্যামা সিল্ক",
    "price": 1850,
    "originalPrice": 2450,
    "discountPercent": 24,
    "images": [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&q=80"
    ],
    "fabric": "১০০% সফট গ্লসি ল্যামা সিল্ক",
    "length": "১২ হাত ফুল শাড়ি",
    "blousePiece": "১ হাত রানিং ব্লাউজ পিস সংযুক্ত",
    "anchalDetail": "আকর্ষণীয় সিলভার জরির বুটা কাজ",
    "parDetail": "৩ ইঞ্চি মিনাকারি সিলভার জরি পার",
    "colors": [
      {
        "name": "পিচ পিঙ্ক",
        "hex": "#f8a5c2"
      },
      {
        "name": "রোজ গোল্ড",
        "hex": "#e77f67"
      },
      {
        "name": "ল্যাভেন্ডার",
        "hex": "#778beb"
      }
    ],
    "inStock": true,
    "stockCount": 16,
    "rating": 4.9,
    "reviewCount": 37,
    "isHotDeal": true,
    "description": "গার্লস ফ্যাশন টাঙ্গাইলের এক্সক্লুসিভ ল্যামা সিল্ক। কোমল ফিনিশিং এবং সিলভার জরির আভিজাত্যপূর্ণ কাজ। পরলে রাজকীয় সৌন্দর্য ফুটে ওঠে।",
    "careInstructions": [
      "ড্রাই ক্লিনিং রেকমেন্ডেড।",
      "হালকা তাপে উল্টো পিঠে আয়রন করুন।"
    ]
  },
  {
    "id": "asb-114",
    "code": "ASB-114",
    "name": "প্রিমিয়াম সুতি তাঁতের শাড়ি - রয়্যাল স্কাই ব্লু ও মেজেন্টা পার",
    "nameEn": "Premium Tangail Cotton Tant Saree - Royal Sky Blue & Magenta",
    "category": "tangail_tat",
    "categoryName": "টাঙ্গাইল তাঁত",
    "price": 1350,
    "originalPrice": 1750,
    "discountPercent": 23,
    "images": [
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=900&q=80"
    ],
    "fabric": "১০০% টাঙ্গাইল পিওর হ্যান্ডলুম সুতি",
    "length": "১২ হাত ফুল শাড়ি",
    "blousePiece": "ব্লাউজ পিস ছাড়া",
    "anchalDetail": "ময়ূরপঙ্খী সুতার কাজ ও আঁচলে ঐতিহ্যবাহী টার্সেল",
    "parDetail": "মেজেন্টা ও গোল্ডেন সুতার মন্দির পার",
    "colors": [
      {
        "name": "আকাশি ব্লু",
        "hex": "#00cec9"
      },
      {
        "name": "রানি মেজেন্টা",
        "hex": "#e84393"
      },
      {
        "name": "লেমন গ্রিন",
        "hex": "#55efc4"
      }
    ],
    "inStock": true,
    "stockCount": 22,
    "rating": 4.8,
    "reviewCount": 33,
    "isBestSeller": true,
    "description": "টাঙ্গাইলের সেরা তাঁতীদের তৈরি প্রিমিয়াম সুতি শাড়ি। হালকা ও আরামদায়ক ফেব্রিক, নিখুঁত কুচি এবং পাকা রঙের নিশ্চয়তা।",
    "careInstructions": [
      "স্বাভাবিক পানিতে ওয়াশ করুন।",
      "কড়া রোদে দীর্ঘক্ষণ রাখবেন না।"
    ]
  },
  {
    "id": "asb-115",
    "code": "ASB-115",
    "name": "এক্সক্লুসিভ কটন সেট শাড়ি - বাটিক প্রিন্ট ও হাতের কাজ",
    "nameEn": "Exclusive Cotton Set Saree - Hand Batik Print & Stitch",
    "category": "cotton_handloom",
    "categoryName": "কটন ও সুতি সেট",
    "price": 1290,
    "originalPrice": 1690,
    "discountPercent": 24,
    "images": [
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80"
    ],
    "fabric": "১০০% সফট আরামদায়ক সুতি কটন সেট",
    "length": "১২ হাত শাড়ি",
    "blousePiece": "১ হাত প্রিন্টেড ব্লাউজ পিস সংযুক্ত",
    "anchalDetail": "হাতে করা ঐতিহ্যবাহী মোটিফ বাটিক আঁচল",
    "parDetail": "কনট্রাস্ট পাইপিং বর্ডার",
    "colors": [
      {
        "name": "অরেঞ্জ পিচ",
        "hex": "#e17055"
      },
      {
        "name": "নেভি ব্লু",
        "hex": "#0984e3"
      },
      {
        "name": "জলপাই গ্রিন",
        "hex": "#00b894"
      }
    ],
    "inStock": true,
    "stockCount": 25,
    "rating": 4.8,
    "reviewCount": 27,
    "isHotDeal": true,
    "description": "গরমে দৈনন্দিন ও ক্যাজুয়াল ব্যবহারের জন্য সবচেয়ে আরামদায়ক কটন সেট শাড়ি। সাথে রয়েছে ম্যাচিং ব্লাউজ পিস। সহজে কুচি বসে এবং ভাঁজ নিখুঁত থাকে।",
    "careInstructions": [
      "হালকা ডিটারজেন্টে ধুয়ে ছায়ায় শুকান।",
      "ইস্ত্রি করলে নতুনের মতো দেখাবে।"
    ]
  },
  {
    "id": "asb-116",
    "code": "ASB-116",
    "name": "রুপোলি ঢাকai জামদানি শাড়ি - সি-গ্রিন ও সিলভার জড়ির বুনন",
    "nameEn": "Dhakai Silver Zari Jamdani Saree - Sea Green",
    "category": "jamdani",
    "categoryName": "ঢাকাই জামদানি",
    "price": 2850,
    "originalPrice": 3800,
    "discountPercent": 25,
    "images": [
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=900&q=80"
    ],
    "fabric": "৮০ কাউন্ট সফট জামদানি সিল্ক কটন মিক্স",
    "length": "১২ হাত ফুল সাইজ",
    "blousePiece": "ব্লাউজ পিস ছাড়া",
    "anchalDetail": "ঘন সিলভার জড়ির জালি নকশা আঁচল",
    "parDetail": "ময়ূর নকশার রুপোলি পাড়",
    "colors": [
      {
        "name": "সি গ্রিন",
        "hex": "#2ed573"
      },
      {
        "name": "রুপালী সাদা",
        "hex": "#f1f2f6"
      },
      {
        "name": "মেরুন গোল্ড",
        "hex": "#800000"
      }
    ],
    "inStock": true,
    "stockCount": 14,
    "rating": 4.9,
    "reviewCount": 35,
    "isBestSeller": true,
    "description": "আভিজাত্য ও ঐতিহ্যের সেরা ঢাকাই জামদানি শাড়ি। রেশমি সুতা ও সিলভার জড়ির মেলবন্ধনে যেকোনো বিশেষ অনুষ্ঠানে সবার নজর কাড়বে।",
    "careInstructions": [
      "ড্রাই ক্লিনিং উত্তম।",
      "কাগজে মুড়িয়ে শুষ্ক স্থানে সংরক্ষণ করুন।"
    ]
  },
  {
    "id": "asb-117",
    "code": "ASB-117",
    "name": "অরিজিনাল ইন্ডিয়ান ল্যামা সিল্ক - ডিপ ভায়োলেট ও ব্রোঞ্জ জড়িপাড়",
    "nameEn": "Original Indian Lama Silk Saree - Deep Violet & Bronze Zari",
    "category": "lama_silk",
    "categoryName": "ল্যামা সিল্ক",
    "price": 1850,
    "originalPrice": 2500,
    "discountPercent": 26,
    "images": [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=900&q=80"
    ],
    "fabric": "১০০% অরিজিনাল সফট প্রিমিয়াম ল্যামা সিল্ক",
    "length": "১২ হাত শাড়ি",
    "blousePiece": "১ হাত ব্লাউজ পিস সংযুক্ত",
    "anchalDetail": "অল-ওভার ব্রোঞ্জ জড়ির রাজকীয় প্যাটার্ন",
    "parDetail": "হেভি জড়িপাড় নকশা",
    "colors": [
      {
        "name": "ডিপ ভায়োলেট",
        "hex": "#5f27cd"
      },
      {
        "name": "রয়্যাল ব্লু",
        "hex": "#2e86de"
      },
      {
        "name": "ডিপ ওয়াইন",
        "hex": "#b71540"
      }
    ],
    "inStock": true,
    "stockCount": 18,
    "rating": 4.9,
    "reviewCount": 42,
    "isHotDeal": true,
    "description": "ল্যামা সিল্কের মধ্যে সর্বাধিক বিক্রিত একটি শেড। সিল্কের নরম পরশ এবং ভারী জড়ির কাজে উৎসবমুখর পরিবেশ তৈরি করে।",
    "careInstructions": [
      "ড্রাই ওয়াশ করার পরামর্শ রইল।",
      "স্টিম বা হালকা আয়রন করুন।"
    ]
  },
  {
    "id": "asb-118",
    "code": "ASB-118",
    "name": "টাঙ্গাইল উৎসব তাঁতের শাড়ি - হলুদ বাসন্তী ও লাল বুটা কাজ",
    "nameEn": "Tangail Festive Tant Saree - Basanti Yellow & Red Buta",
    "category": "tangail_tat",
    "categoryName": "টাঙ্গাইল তাঁত",
    "price": 1250,
    "originalPrice": 1650,
    "discountPercent": 24,
    "images": [
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&q=80"
    ],
    "fabric": "১০০% পিওর কটন হ্যান্ডলুম তাঁত",
    "length": "১২ হাত ফুল শাড়ি",
    "blousePiece": "ব্লাউজ পিস ছাড়া",
    "anchalDetail": "হলুদ ও লাল সুতার ঐতিহ্যবাহী ডাবল আঁচল",
    "parDetail": "৩ ইঞ্চি লাল মন্দির পার",
    "colors": [
      {
        "name": "হলুদ বাসন্তী",
        "hex": "#ffa801"
      },
      {
        "name": "টকটকে লাল",
        "hex": "#ff3838"
      },
      {
        "name": "কমলা",
        "hex": "#ff9f1a"
      }
    ],
    "inStock": true,
    "stockCount": 20,
    "rating": 4.8,
    "reviewCount": 31,
    "description": "গায়ে হলুদ, পহেলা ফাল্গুন বা পারিবারিক যেকোনো উৎসবে পড়ার জন্য সবচেয়ে জনপ্রিয় বাসন্তী রঙের টাঙ্গাইল তাঁতের শাড়ি।",
    "careInstructions": [
      "ঠান্ডা পানিতে ওয়াশ করুন।",
      "মাড় দিয়ে শুকিয়ে ইস্ত্রি করুন।"
    ]
  },
  {
    "id": "asb-119",
    "code": "ASB-119",
    "name": "প্রিমিয়াম কটন সেট শাড়ি - ব্ল্যাক ও গোল্ডেন ব্লক প্রিন্ট",
    "nameEn": "Premium Cotton Set Saree - Black & Golden Hand Block",
    "category": "cotton_handloom",
    "categoryName": "কটন ও সুতি সেট",
    "price": 1350,
    "originalPrice": 1750,
    "discountPercent": 23,
    "images": [
      "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&q=80"
    ],
    "fabric": "প্রিমিয়াম সুতি কম্বড কটন ফেব্রিক",
    "length": "১২ হাত ফুল শাড়ি",
    "blousePiece": "১ হাত প্রিন্টেড ব্লাউজ পিস সংযুক্ত",
    "anchalDetail": "হ্যান্ড ব্লক প্রিন্টের গর্জিয়াস আঁচল",
    "parDetail": "গোল্ডেন ফয়েল ও সুতি পার",
    "colors": [
      {
        "name": "জেট ব্ল্যাক",
        "hex": "#1e272e"
      },
      {
        "name": "মরু বালু গোল্ড",
        "hex": "#d2dae2"
      },
      {
        "name": "কফি ব্রাউন",
        "hex": "#485460"
      }
    ],
    "inStock": true,
    "stockCount": 24,
    "rating": 4.9,
    "reviewCount": 36,
    "isBestSeller": true,
    "description": "ব্ল্যাক লাভারদের জন্য একটি মাস্টারপিস কটন সেট শাড়ি। খাঁটি সুতি ফেব্রিকের উপর ব্লকের আকর্ষণীয় কাজ। অফিস কিংবা সান্ধ্য অনুষ্ঠানে দারুণ শোভা পাবে।",
    "careInstructions": [
      "সাধারণ মাইল্ড ওয়াশ করুন।",
      "উল্টো পিঠে আয়রন করুন।"
    ]
  },
  {
    "id": "asb-120",
    "code": "ASB-120",
    "name": "রয়্যাল কাঞ্জিভরম ব্রাইডাল কাতান - ডিপ রুবি রেড ও গোল্ড জরি",
    "nameEn": "Royal Kanjivaram Bridal Katan Saree - Ruby Red & Gold",
    "category": "katan",
    "categoryName": "কাতান ও বেনারসি",
    "price": 4200,
    "originalPrice": 5800,
    "discountPercent": 28,
    "images": [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=900&q=80"
    ],
    "fabric": "পিওর কাতান সিল্ক ও প্রিমিয়াম গোল্ডেন জরি",
    "length": "১২ হাত ফুল সাইজ",
    "blousePiece": "১ হাত এমব্রয়ডারি পার সহ হেভি ব্লাউজ পিস",
    "anchalDetail": "ঘন গোল্ডেন জরির ব্রাইডাল কাজ",
    "parDetail": "৫ ইঞ্চি চওড়া রাজকীয় জড়িপাড়",
    "colors": [
      {
        "name": "রুবি রেড",
        "hex": "#c0392b"
      },
      {
        "name": "রয়্যাল মেরুন",
        "hex": "#78281f"
      },
      {
        "name": "গোল্ডেন ইয়েলো",
        "hex": "#f39c12"
      }
    ],
    "inStock": true,
    "stockCount": 10,
    "rating": 5,
    "reviewCount": 49,
    "isHotDeal": true,
    "description": "বিয়ের কনে ও বিশেষ অনুষ্ঠানের জন্য চূড়ান্ত আভিজাত্যের ব্রাইডাল কাতান। নিখুঁত উজ্জ্বলতা, রানি রঙের দীপ্তি এবং দীর্ঘস্থায়ী স্বর্ণালী জরির কারুকাজ।",
    "careInstructions": [
      "শুধুমাত্র ড্রাই ওয়াশ করুন।",
      "মসলিন কাপড়ে জড়িয়ে অন্ধকার শুকনো জায়গায় রাখুন।"
    ]
  }
];

export const defaultReviews: Review[] = [
  {
    "id": "rev-1",
    "name": "রাবেয়া সুলতানা",
    "location": "মিরপুর, ঢাকা",
    "rating": 5,
    "comment": "আমি আম্বিয়া শাড়ি বাড়ি থেকে ইন্ডিয়ান ল্যামা সিল্ক শাড়িটি অর্ডার করেছিলাম। মাত্র ২ দিনে ঢাকার ঠিকানায় পেয়েছি এবং ডেলিভারি ম্যানের সামনে খুলে দেখে নিয়েছি। কাপড়ের কোয়ালিটি ও জড়ির কাজ ছবির চেয়েও সুন্দর!",
    "productName": "অরিজিনাল ইন্ডিয়ান ল্যামা সিল্ক শাড়ি",
    "date": "২ দিন আগে",
    "verified": true
  },
  {
    "id": "rev-2",
    "name": "ফারহানা ইয়াসমিন",
    "location": "চট্টগ্রাম সদর",
    "rating": 5,
    "comment": "টাঙ্গাইল সুতি তাঁতের শাড়িটা সত্যি অসাধারণ! গরমের জন্য খুব আরামদায়ক। রঙ ঠিক যেমন ছবিতে ছিল তেমনই পেয়েছি। ক্যাশ অন ডেলিভারি সিস্টেম থাকায় নিশ্চিন্তে অর্ডার করতে পেরেছি। ধন্যবাদ আম্বিয়া শাড়ি বাড়ি।",
    "productName": "খাঁটি টাঙ্গাইল সুতি তাঁতের শাড়ি",
    "date": "৫ দিন আগে",
    "verified": true
  },
  {
    "id": "rev-3",
    "name": "তাসনিম জাহান মিমি",
    "location": "উত্তরা, ঢাকা",
    "rating": 5,
    "comment": "ঢাকাই জামদানি শাড়িটা আমার মায়ের জন্মদিনে উপহার দিয়েছিলাম। মা ভীষণ খুশি হয়েছেন। এত সুন্দর ফিনিশিং এবং কম দামে অরিজিনাল শাড়ি পেয়ে খুব ভালো লাগছে।",
    "productName": "প্রিমিয়াম ঢাকাই জামদানি শাড়ি",
    "date": "১ সপ্তাহ আগে",
    "verified": true
  },
  {
    "id": "rev-4",
    "name": "শায়লা শারমিন",
    "location": "সিলেট উপশহর",
    "rating": 5,
    "comment": "কাঞ্জিভরম ব্রাইডাল কাতান শাড়িটা গায়ে হলুদের জন্য নিয়েছিলাম। লাইটিংয়ে জরিগুলো চমৎকার ঝলমল করে। কাস্টমার সাপোর্টের ভাইয়াদের ব্যবহারও খুব ভালো ছিল।",
    "productName": "কাঞ্জিভরম ব্রাইডাল বেনারসি কাতান শাড়ি",
    "date": "২ সপ্তাহ আগে",
    "verified": true
  }
];

export const defaultOrders: Order[] = [
  {
    "orderId": "ASB-92814",
    "date": "০৭ সেপ্টেম্বর ২০২৬",
    "items": [
      {
        "product": {
          "id": "asb-101",
          "code": "ASB-101",
          "name": "অরিজিনাল ইন্ডিয়ান ল্যামা সিল্ক শাড়ি - রয়্যাল মেরুন ও গোল্ডেন জড়িপাড়",
          "nameEn": "Original Indian Lama Silk Saree - Royal Maroon & Golden Zari",
          "category": "lama_silk",
          "categoryName": "ল্যামা সিল্ক",
          "price": 1850,
          "originalPrice": 2450,
          "discountPercent": 24,
          "images": [
            "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80",
            "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=900&q=80",
            "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&q=80"
          ],
          "fabric": "১০০% পিওর সফট ল্যামা সিল্ক (High Quality Finish)",
          "length": "১২ হাত ফুল শাড়ি",
          "blousePiece": "১ হাত রানিং ব্লাউজ পিস সংযুক্ত",
          "anchalDetail": "আকর্ষণীয় ভারী জড়ির অল-ওভার কাজের আঁচল",
          "parDetail": "৩ ইঞ্চি চওড়া মিনাকারি গোল্ডেন জড়িপাড়",
          "colors": [
            {
              "name": "রয়্যাল মেরুন",
              "hex": "#681313"
            },
            {
              "name": "নেভি ব্লু",
              "hex": "#112244"
            },
            {
              "name": "বোতল গ্রিন",
              "hex": "#0e3a1f"
            }
          ],
          "inStock": true,
          "stockCount": 18,
          "rating": 4.9,
          "reviewCount": 47,
          "isHotDeal": true,
          "isBestSeller": true,
          "description": "আম্বিয়া শাড়ি বাড়ির এক্সক্লুসিভ কালেকশন! ১০০% অরিজিনাল ইন্ডিয়ান সফট ল্যামা সিল্ক শাড়ি। অতি নরম ও আরামদায়ক ফেব্রিক, নিখুঁত জড়ির বুনন এবং নজরকাড়া গ্লসি ফিনিশিং। যেকোনো পারিবারিক অনুষ্ঠান, গায়ে হলুদ বা বিয়ের পার্টিতে পরার জন্য সেরা পছন্দ। সারা বাংলাদেশে ক্যাশ অন ডেলিভারি সুবিধা রয়েছে।",
          "careInstructions": [
            "প্রথমবার ড্রাই ওয়াশ (Dry Clean) করা উত্তম।",
            "হাতে ধুলে মৃদু শ্যাম্পু বা মাইল্ড লিকুইড ডিটারজেন্ট ব্যবহার করুন।",
            "কখনো কড়া রোদে বেশিক্ষণ শুকাবেন না, ছায়ায় শুকান।",
            "ইস্ত্রি করার সময় উল্টো পিঠে হালকা তাপে ইস্ত্রি করুন।"
          ]
        },
        "quantity": 1,
        "selectedColor": "রয়্যাল মেরুন"
      }
    ],
    "customer": {
      "fullName": "নুসরাত জাহান",
      "phoneNumber": "01712345678",
      "fullAddress": "বাড়ি #২৪, রোড #৭, সেক্টর #৪, উত্তরা, ঢাকা",
      "deliveryZone": "dhaka_inside",
      "paymentMethod": "cod"
    },
    "subtotal": 1850,
    "deliveryCharge": 80,
    "totalAmount": 1930,
    "status": "কুরিয়ারে হস্তান্তর",
    "trackingNumber": "STEADFAST-8492019",
    "estimatedDelivery": "আগামীকাল বিকালের মধ্যে"
  }
];

export const defaultFaqs: FAQ[] = [
  {
    "id": "faq-1",
    "q": "পণ্য হাতে পেয়ে কি দেখে নেওয়ার সুযোগ আছে?",
    "a": "হ্যাঁ! আমাদের সারা বাংলাদেশের কুরিয়ার সার্ভিসে ডেলিভারি ম্যানের সামনে পার্সেলটি খুলে চেক করে নেয়ার সম্পূর্ণ সুযোগ রয়েছে। শাড়ি দেখে নিশ্চিত হয়ে এরপর মূল্য পরিশোধ করবেন।"
  },
  {
    "id": "faq-2",
    "q": "ডেলিভারি চার্জ কত এবং কত দিনে ডেলিভারি পাওয়া যাবে?",
    "a": "ঢাকার ভিতরে ডেলিভারি চার্জ মাত্র ৮০ টাকা এবং ২৪ থেকে ৪৮ ঘণ্টার মধ্যে পৌঁছে যায়। ঢাকার বাইরে জেলা ও থানা পর্যায়ে ডেলিভারি চার্জ ১৫০ টাকা এবং ২ থেকে ৩ কার্যদিবসের মধ্যে হোম ডেলিভারি করা হয়।"
  },
  {
    "id": "faq-3",
    "q": "ছবিতে যেমন দেখা যাচ্ছে, শাড়ি কি আসলেই ঠিক তেমনই হবে?",
    "a": "আমাদের প্রতিটি শাড়ির ছবি নিজস্ব মোবাইল এবং ক্যামেরায় সরাসরি কোনো অতিরিক্ত ফিল্টার ছাড়াই তোলা হয়। তাই ছবিতে যেমন নিখুঁত কাজ ও রঙ দেখছেন, বাস্তবে ঠিক একই রকম প্রিমিয়াম মানের শাড়ি পাবেন।"
  },
  {
    "id": "faq-4",
    "q": "পণ্য পছন্দ না হলে বা কোনো সমস্যা থাকলে কি পরিবর্তন করা যাবে?",
    "a": "যদি কোনো ডিফেক্ট বা রঙের অমিল পান, তবে ডেলিভারি ম্যান থাকা অবস্থাতেই সাথে সাথে রিটার্ন করতে পারবেন অথবা আমাদের হটলাইনে জানালে ৪৮ ঘণ্টার মধ্যে এক্সচেঞ্জ করে দেওয়া হবে।"
  },
  {
    "id": "faq-5",
    "q": "অনলাইনে অর্ডার করতে কোনো সমস্যা হলে কী করব?",
    "a": "আপনি আমাদের ওয়েবসাইটের যেকোনো শাড়ির নিচে থাকা \"সরাসরি অর্ডার করুন\" বাটনে ক্লিক করে নাম ও ফোন নম্বর দিয়ে অর্ডার করতে পারেন, অথবা সরাসরি আমাদের WhatsApp / হটলাইন নম্বরে (০১৭১২-৩৪৫৬৭৮) কল করে শাড়ির কোড জানিয়ে অর্ডার করতে পারেন।"
  }
];

export const defaultCoupons: Coupon[] = [
  {
    "code": "AMBIA100",
    "discountType": "fixed",
    "discountValue": 100,
    "minOrderAmount": 1500,
    "active": true,
    "description": "প্রথম অর্ডারে ১০০ টাকা ফ্ল্যাট ছাড় (মিনিমাম ১৫০০ টাকার শাড়িতে)"
  },
  {
    "code": "EID2026",
    "discountType": "fixed",
    "discountValue": 200,
    "minOrderAmount": 3000,
    "active": true,
    "description": "ঈদ স্পেশাল ৩০০ টাকার বেশি অর্ডারে ২০০ টাকা নিশ্চিত ছাড়"
  },
  {
    "code": "LAMA5",
    "discountType": "percentage",
    "discountValue": 5,
    "minOrderAmount": 2000,
    "active": true,
    "description": "ল্যামা সিল্ক কালেকশনে অতিরিক্ত ৫% বিশেষ ছাড়"
  }
];

export const defaultStoreSettings: StoreSettings = {
  "storeName": "Ambia Saree Bari",
  "storeNameEn": "Ambia Saree Bari",
  "tagline": "টাঙ্গাইলের ঐতিহ্যবাহী প্রিমিয়াম শাড়ির সবচেয়ে বিশ্বস্ত প্রতিষ্ঠান",
  "logoType": "text",
  "logoUrl": "",
  "phone": "01796962283",
  "whatsapp": "8801796962283",
  "dhakaDeliveryCharge": 80,
  "outsideDeliveryCharge": 150,
  "freeDeliveryThreshold": 4000,
  "announcementText": "🎉 সারা বাংলাদেশে ক্যাশ অন ডেলিভারি সুবিধা | ২-৩ দিনে হোম ডেলিভারি | দেখে নিয়ে মূল্য পরিশোধ",
  "address": "প্রধান আউটলেট: আম্বিয়া শাড়ি বাড়ি, টাঙ্গাইল সদর, টাঙ্গাইল ও ঢাকা হাব।",
  "email": "support@ambiasareebari.com",
  "bkashNumber": "01796962283",
  "facebookUrl": "https://facebook.com",
  "youtubeUrl": "https://youtube.com"
};

export const defaultHeroSlides: HeroSlide[] = [
  {
    "id": "slide-girls-fashion",
    "bgImage": "/assets/girls_fashion_banner_1788842585614-FK2essCR.jpg",
    "badge": "আম্বিয়া শাড়ি বাড়ি • টাঙ্গাইল সদর",
    "title": "GIRLS FASHION",
    "subtitle": "টাঙ্গাইলের ঐতিহ্যবাহী শাড়ির সবচেয়ে বিশ্বস্ত প্রতিষ্ঠান",
    "slogan": "শাড়িতে ফুটুক আপনার সৌন্দর্য",
    "category": "all",
    "tagline": "ঐতিহ্য, সৌন্দর্য ও আভিজাত্যের এক অনন্য ঠিকানা",
    "pillars": [
      {
        "label": "প্রিমিয়াম মানের শাড়ি"
      },
      {
        "label": "নিখুঁত কাজ ও মানসম্পন্ন পণ্য"
      },
      {
        "label": "সাশ্রয়ী দাম সবার জন্য"
      },
      {
        "label": "সারা দেশে ক্যাশ অন ডেলিভারি"
      }
    ],
    "actionText": "এখনই অর্ডার করুন",
    "secondaryActionText": "সব শাড়ি দেখুন",
    "imageFit": "cover"
  },
  {
    "id": "slide-lama-silk",
    "bgImage": "/assets/lama_silk_slider_1788842601114-BoE_d3AE.jpg",
    "badge": "এক্সক্লুসিভ কালেকশন ২০২৬",
    "title": "ORIGINAL LAMA SILK",
    "subtitle": "১০০% অরিজিনাল সফট ইন্ডিয়ান ল্যামা সিল্ক শাড়ি",
    "slogan": "আভিজাত্য ও রূপের রাজকীয় ছোঁয়া",
    "category": "lama_silk",
    "tagline": "উৎসব ও বিয়েতে সেরা রঙের বৈচিত্র্য এবং নজরকাড়া গ্লস",
    "pillars": [
      {
        "label": "১০০% অরিজিনাল ল্যামা সিল্ক"
      },
      {
        "label": "পাকা রঙের শতভাগ গ্যারান্টি"
      },
      {
        "label": "সীমিত স্টক বিশেষ অফার"
      },
      {
        "label": "দেখে নিয়ে মূল্য পরিশোধ"
      }
    ],
    "actionText": "ল্যামা সিল্ক অর্ডার করুন",
    "secondaryActionText": "ল্যামা সিল্ক কালেকশন",
    "imageFit": "cover"
  },
  {
    "id": "slide-tangail-tat",
    "bgImage": "/assets/tangail_tat_slider_1788842614881-DRxnoo2Z.jpg",
    "badge": "খাঁটি দেশীয় ঐতিহ্যবাহী শিল্পকর্ম",
    "title": "টাঙ্গাইল তাঁতের শাড়ি",
    "subtitle": "দক্ষ তাঁতীদের হাতে বোনা পিওর কটন ও ঢাকাই জামদানি",
    "slogan": "ঐতিহ্যের বন্ধনে খাঁটি বাঙালিয়ানা সাজ",
    "category": "tangail_tat",
    "tagline": "নরম সুতির আরাম ও ঐতিহ্যের গর্ব",
    "pillars": [
      {
        "label": "খাঁটি সুতির নরম আরামদায়ক বুনন"
      },
      {
        "label": "গরমে সারাদিন স্বাচ্ছন্দ্যে পরুন"
      },
      {
        "label": "সরাসরি তাঁত থেকে সংগ্রহ"
      },
      {
        "label": "সারা দেশে হোম ডেলিভারি"
      }
    ],
    "actionText": "তাঁতের শাড়ি অর্ডার করুন",
    "secondaryActionText": "তাঁতের শাড়ি দেখুন",
    "imageFit": "cover"
  }
];

export const defaultCategoryHighlights: CategoryHighlight[] = [
  {
    "id": "highlight-all",
    "title": "সব শাড়ি",
    "category": "all",
    "imageUrl": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=400&q=80"
  },
  {
    "id": "highlight-1",
    "title": "ল্যামা সিল্ক",
    "category": "lama_silk",
    "imageUrl": "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=400&q=80"
  },
  {
    "id": "highlight-2",
    "title": "টাঙ্গাইল তাঁত",
    "category": "tangail_tat",
    "imageUrl": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=400&q=80"
  },
  {
    "id": "highlight-3",
    "title": "কটন সেট",
    "category": "cotton_handloom",
    "imageUrl": "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=400&q=80"
  }
];

export const defaultHeroSettings: HeroSettings = {
  "fitMode": "cover",
  "aspectRatio": "16/9",
  "overlayMode": "minimal",
  "autoPlayInterval": 5,
  "tickerText": "তাঁত শাড়ি ✦ জামদানি ✦ ল্যামা সিল্ক ✦ কাতান ✦ কটন সেট ✦ হাফ সিল্ক | ঐতিহ্যের ছোঁয়ায়, আধুনিকতার ছন্দে আপনার সাজ",
  "websiteText": "WEBSITE: girlsfashiontangail.com"
};

export const defaultCareTips: CareTip[] = [
  {
    "id": "tip-1",
    "title": "ড্রাই ওয়াশ ও ধোয়ার নিয়ম",
    "desc": "ল্যামা সিল্ক, কাতান ও ঢাকাই জামদানি প্রথমবার অবশ্যই ড্রাই ওয়াশ করা উত্তম। সুতি তাঁতের শাড়ি ঠাণ্ডা পানিতে মাইল্ড শ্যাম্পু দিয়ে ধোয়া উচিত।",
    "iconType": "droplets"
  },
  {
    "id": "tip-2",
    "title": "ছায়ায় শুকানোর সতর্কতা",
    "desc": "শাড়ির উজ্জ্বল রঙ ও জরি দীর্ঘদিন ভালো রাখতে কড়া রোদে সরাসরি না শুকিয়ে ফ্যানের বাতাসে অথবা মৃদু ছায়াযুক্ত স্থানে মেলে দিন।",
    "iconType": "sun"
  },
  {
    "id": "tip-3",
    "title": "সঠিক নিয়মে ইস্ত্রি করা",
    "desc": "সিল্ক বা জড়ির শাড়ি ইস্ত্রি করার সময় উল্টো পিঠে হালকা আঁচে স্টিম আয়রন করুন। শাড়ির ওপর সুতি কাপড় রেখে ইস্ত্রি করা সবচেয়ে নিরাপদ।",
    "iconType": "wind"
  },
  {
    "id": "tip-4",
    "title": "সংরক্ষণ ও ভাজ পরিবর্তন",
    "desc": "জামদানি ও জড়ির শাড়ি প্লাস্টিক ব্যাগে না রেখে সুতি বা মসলিন কাপড়ে জড়িয়ে শুকনো বাক্সে রাখুন এবং প্রতি ২-৩ মাস পর পর ভাঁজ পরিবর্তন করুন।",
    "iconType": "shield"
  }
];

export const categories = defaultCategories;
export const initialProducts = defaultProducts;
export const initialOrders = defaultOrders;
export const initialCoupons = defaultCoupons;
export const initialReviews = defaultReviews;
