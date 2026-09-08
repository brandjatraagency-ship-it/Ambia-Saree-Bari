import React from 'react';
import {
  Sparkles,
  Droplets,
  Sun,
  Wind,
  Shield,
  Layers,
  Flame,
  ChevronRight,
  HelpCircle,
  MessageCircle,
} from 'lucide-react';
import { CareTip, StoreSettings, PageRoute } from '../types';

interface CareTipsPageProps {
  careTips: CareTip[];
  storeSettings: StoreSettings;
  onNavigate: (page: PageRoute) => void;
}

export const CareTipsPage: React.FC<CareTipsPageProps> = ({
  careTips,
  storeSettings,
  onNavigate,
}) => {
  const whatsapp = storeSettings.whatsapp || '8801796962283';

  const fabricGuides = [
    {
      title: 'জামদানি শাড়ির যত্ন ও রোল পলিশ',
      fabric: 'জামদানি সুতা ও জরি',
      tips: [
        'জামদানি শাড়ি কখনো সাধারণ ডিটারজেন্ট দিয়ে ধোয়া উচিত নয়। প্রয়োজনে রোল পলিশ অথবা অভিজ্ঞ ড্রাই ক্লিনার দিয়ে পরিষ্কার করান।',
        'শাড়িটির জরি যেন বিবর্ণ না হয় সেজন্য সবসময় খাঁটি সুতি পাতলা কাপড়ে পেঁচিয়ে কাঠের আলমারিতে রাখুন।',
        'প্রতি ৩-৪ মাস পর পর জামদানি শাড়ির ভাঁজ পরিবর্তন করে অন্তত ৩০ মিনিট হালকা ফ্যানের বাতাসে মেলে দিন।',
      ],
      icon: <Sparkles className="w-5 h-5 text-amber-400" />,
    },
    {
      title: 'টাঙ্গাইল সুতি তাঁতের শাড়ির যত্ন',
      fabric: '১০০% খাঁটি সুতি তাঁত',
      tips: [
        'প্রথম ধোয়ায় হালকা লবণ মিশ্রিত ঠাণ্ডা পানিতে কিছু সময় ভিজিয়ে রেখে ধুলে শাড়ির রঙ স্থায়ী ও উজ্জ্বল থাকে।',
        'কড়া রোদে দীর্ঘক্ষণ না শুকিয়ে সবসময় ছায়াযুক্ত ও বাতাস চলাচল করে এমন স্থানে শুকানো উচিত।',
        'সুতি শাড়ির খাস্তা ভাব ধরে রাখতে প্রয়োজন মতো হালকা ভাতের মাড় বা অ্যারারুট ব্যবহার করতে পারেন।',
      ],
      icon: <Droplets className="w-5 h-5 text-emerald-400" />,
    },
    {
      title: 'ল্যামা সিল্ক ও পিওর সিল্ক শাড়ির সুরক্ষা',
      fabric: 'সিল্ক ও জরি ওয়ার্ক',
      tips: [
        'সিল্ক শাড়ির ক্ষেত্রে ড্রাই ওয়াশ সর্বোত্তম। ঘরে ধুতে হলে কেবলমাত্র মাইল্ড সিল্ক শ্যাম্পু ও ঠাণ্ডা পানি ব্যবহার করুন।',
        'কখনই সিল্কের শাড়ির ওপর সরাসরি কোনো ধরনের পারফিউম, আতর বা বডি স্প্রে স্প্রে করবেন না।',
        'ইস্ত্রি করার সময় সর্বদা শাড়িটির উল্টো পিঠে পাতলা সুতি কাপড় রেখে হালকা তাপে আয়রন করুন।',
      ],
      icon: <Shield className="w-5 h-5 text-rose-400" />,
    },
    {
      title: 'আলমারিতে শাড়ি সংরক্ষণের সঠিক নিয়ম',
      fabric: 'সব ধরনের প্রিমিয়াম শাড়ি',
      tips: [
        'লোহার হ্যাঙ্গারে ঝুলিয়ে না রেখে সবসময় মসলিন বা সুতি কাপড়ের ব্যাগে শাড়ি ভাঁজ করে রাখুন।',
        'ন্যাপথলিন বা পোকা নিরোধক ট্যাবলেট কখনও সরাসরি শাড়ির স্পর্শে রাখবেন না, এতে শাড়ির জরির ক্ষতি হতে পারে।',
        'বর্ষাকালে আর্দ্রতা এড়াতে সিলিকা জেল প্যাকেট আলমারির তাকে ব্যবহার করতে পারেন।',
      ],
      icon: <Layers className="w-5 h-5 text-blue-400" />,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8 sm:space-y-12 animate-fade-in">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-stone-400">
        <button
          onClick={() => onNavigate('home')}
          className="hover:text-rose-400 transition-colors cursor-pointer"
        >
          হোম
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-stone-600" />
        <span className="text-rose-300 font-semibold">শাড়ির যত্ন ও সংরক্ষণ নির্দেশিকা</span>
      </nav>

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="px-3.5 py-1 bg-rose-950/80 text-rose-300 border border-rose-900/60 rounded-full text-xs font-semibold">
          ঐতিহ্যবাহী শাড়ির দীর্ঘস্থায়িত্ব
        </span>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-stone-100 font-['Anek_Bangla']">
          শাড়ির যত্ন ও রক্ষণাবেক্ষণের নিয়ম
        </h1>
        <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
          একটি ভালো শাড়ি শুধু একটি পোশাক নয়, প্রজন্মের পর প্রজন্ম ধরে বয়ে চলা ঐতিহ্য। জেনে নিন আপনার পছন্দের শাড়ি নতুনের মতো রাখার কার্যকরী নিয়মাবলী।
        </p>
      </div>

      {/* Fabric Specific Guides Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {fabricGuides.map((guide, idx) => (
          <div
            key={idx}
            className="bg-[#18080f] border border-rose-950/80 rounded-3xl p-6 space-y-4 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-[#120509] border border-rose-900/60 flex items-center justify-center shrink-0">
                {guide.icon}
              </div>
              <div>
                <h3 className="font-bold text-base text-stone-100 font-['Anek_Bangla']">
                  {guide.title}
                </h3>
                <span className="text-[11px] text-rose-400/80">{guide.fabric}</span>
              </div>
            </div>

            <ul className="space-y-2.5 text-xs text-stone-300">
              {guide.tips.map((tip, tIdx) => (
                <li key={tIdx} className="flex items-start gap-2.5">
                  <span className="text-rose-500 font-bold shrink-0 mt-0.5">•</span>
                  <span className="leading-relaxed">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Quick Tips Cards from Settings */}
      {careTips.length > 0 && (
        <div className="bg-[#14060c] border border-rose-950 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="text-center max-w-xl mx-auto">
            <h3 className="text-xl font-bold text-stone-100 font-['Anek_Bangla']">
              এক নজরে শাড়ির পরিচর্যা টিপস
            </h3>
            <p className="text-xs text-stone-400 mt-1">
              জরুরি ৪টি বিষয় যা শাড়ির ক্ষেত্রে সবসময় মনে রাখা উচিত
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {careTips.map((tip) => (
              <div
                key={tip.id}
                className="bg-[#1a0710] border border-rose-900/40 rounded-2xl p-4.5 space-y-2"
              >
                <div className="flex items-center gap-2 text-amber-400">
                  <Sparkles className="w-4 h-4" />
                  <h4 className="font-bold text-xs text-stone-100">{tip.title}</h4>
                </div>
                <p className="text-[11px] text-stone-400 leading-normal">{tip.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Support & Care advice banner */}
      <div className="bg-gradient-to-r from-[#240a13] to-[#16050b] border border-rose-900/60 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
        <div className="space-y-1.5 text-center sm:text-left">
          <h4 className="text-lg font-bold text-white font-['Anek_Bangla']">
            শাড়ির ফেব্রিক বা দাগ তোলা নিয়ে কোনো প্রশ্ন আছে?
          </h4>
          <p className="text-xs text-stone-300">
            আমাদের তাঁত ও ফেব্রিক বিশেষজ্ঞদের সাথে সরাসরি পরামর্শ করতে পারেন।
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <a
            href={`https://wa.me/${whatsapp}?text=${encodeURIComponent('হ্যালো, আমার শাড়ির যত্ন ও ওয়াশ সম্পর্কে কিছু পরামর্শ দরকার।')}`}
            target="_blank"
            rel="noreferrer"
            className="px-5 py-2.5 bg-[#25d366] hover:bg-[#20ba5a] text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-xs cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>হোয়াটসঅ্যাপে পরামর্শ নিন</span>
          </a>
          <button
            onClick={() => onNavigate('shop')}
            className="px-5 py-2.5 bg-rose-700 hover:bg-rose-600 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
          >
            শাড়ি শপ দেখুন
          </button>
        </div>
      </div>
    </div>
  );
};
