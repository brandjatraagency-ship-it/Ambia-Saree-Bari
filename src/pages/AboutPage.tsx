import React from 'react';
import {
  Sparkles,
  Heart,
  Users,
  Award,
  CheckCircle,
  MapPin,
  ChevronRight,
  ArrowRight,
} from 'lucide-react';
import { StoreSettings, PageRoute } from '../types';

interface AboutPageProps {
  storeSettings: StoreSettings;
  onNavigate: (page: PageRoute) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  storeSettings,
  onNavigate,
}) => {
  const address =
    storeSettings.address ||
    'প্রধান আউটলেট: আম্বিয়া শাড়ি বাড়ি, টাঙ্গাইল সদর, টাঙ্গাইল।';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-10 sm:space-y-14 animate-fade-in">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-stone-400">
        <button
          onClick={() => onNavigate('home')}
          className="hover:text-rose-400 transition-colors cursor-pointer"
        >
          হোম
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-stone-600" />
        <span className="text-rose-300 font-semibold">আমাদের গল্প ও ঐতিহ্য</span>
      </nav>

      {/* Hero Intro */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-950/80 border border-rose-900/60 text-xs font-semibold text-rose-300">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>টাঙ্গাইল তাঁতের খাঁটি ঐতিহ্য</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-stone-100 font-['Anek_Bangla'] tracking-tight">
          আম্বিয়া শাড়ি বাড়ি – ভালোবাসার নিখুঁত বুনন
        </h1>
        <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
          টাঙ্গাইলের শতাব্দীপ্রাচীন তাঁত শিল্পের গৌরবকে আধুনিক বাংলাদেশের প্রতিটি নারীর কাছে পৌঁছে দিতে আমাদের পথচলা। আমরা বিশ্বাস করি, একটি খাঁটি শাড়িতে জড়িয়ে থাকে একজন তাঁতির স্বপ্ন, সাধনা ও ভালোবাসার গল্প।
        </p>
      </div>

      {/* Stats Counter Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#18080f] border border-rose-950/80 rounded-2xl p-5 text-center space-y-1 shadow-sm">
          <p className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">২০+</p>
          <p className="text-xs font-bold text-stone-200">বছরের সমৃদ্ধ অভিজ্ঞতা</p>
          <p className="text-[11px] text-stone-400">টাঙ্গাইলের তাঁত শিল্পে</p>
        </div>

        <div className="bg-[#18080f] border border-rose-950/80 rounded-2xl p-5 text-center space-y-1 shadow-sm">
          <p className="text-2xl sm:text-3xl font-black text-rose-400 font-mono">৫০০+</p>
          <p className="text-xs font-bold text-stone-200">তাঁতি পরিবার সংযুক্ত</p>
          <p className="text-[11px] text-stone-400">সরাসরি গ্রামীণ কারিগর</p>
        </div>

        <div className="bg-[#18080f] border border-rose-950/80 rounded-2xl p-5 text-center space-y-1 shadow-sm">
          <p className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">১০,০০০+</p>
          <p className="text-xs font-bold text-stone-200">সন্তুষ্ট গ্রাহক</p>
          <p className="text-[11px] text-stone-400">দেশ ও বিদেশের মাটিতে</p>
        </div>

        <div className="bg-[#18080f] border border-rose-950/80 rounded-2xl p-5 text-center space-y-1 shadow-sm">
          <p className="text-2xl sm:text-3xl font-black text-blue-400 font-mono">১০০%</p>
          <p className="text-xs font-bold text-stone-200">আসল দেশীয় শাড়ি</p>
          <p className="text-[11px] text-stone-400">খাঁটি সুতা ও নিখুঁত নকশা</p>
        </div>
      </div>

      {/* Two Column: Mission and Craft */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-100 font-['Anek_Bangla']">
            সরাসরি তাঁতিদের থেকে ন্যায্যমূল্যে আপনার হাতে
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
            বাজারে প্রচলিত অনেক শাড়িতে কৃত্রিম সুতা ও ডুপ্লিকেট কাজের কারণে ক্রেতারা প্রতারিত হন। আম্বিয়া শাড়ি বাড়ির শুরুটাই হয়েছিল এই সমস্যার বিশ্বস্ত সমাধানের লক্ষ্যে।
          </p>
          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
            আমরা কোনো মধ্যস্বত্বভোগী ছাড়াই সরাসরি টাঙ্গাইলের মূল তাঁত পল্লী থেকে শাড়ি সংগ্রহ করি। ফলে একদিকে প্রান্তিক তাঁতিরা পান তাদের সঠিক পারিশ্রমিক, আর আপনি পান সবচেয়ে সাশ্রয়ী মূল্যে খাঁটি প্রিমিয়াম শাড়ি।
          </p>

          <div className="space-y-2.5 pt-2 text-xs text-stone-200">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>প্রতিটি শাড়িতে ১০০% রঙ ও সুতার স্থায়িত্বের গ্যারান্টি</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>ডেলিভারি পাওয়ার পর দেখে নিয়ে মূল্য পরিশোধের শতভাগ স্বাধীনতা</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>পণ্য অপছন্দ হলে বা ত্রুটি থাকলে তাৎক্ষণিক সহজ রিটার্ন সুবিধা</span>
            </div>
          </div>
        </div>

        {/* Core Values Card */}
        <div className="bg-[#18080f] border border-rose-950/80 rounded-3xl p-6 sm:p-8 space-y-5 shadow-sm">
          <h3 className="font-bold text-lg text-rose-300 font-['Anek_Bangla'] border-b border-rose-950 pb-3">
            আমাদের ৪টি মূল অঙ্গীকার
          </h3>

          <div className="space-y-4 text-xs">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-amber-400/10 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-stone-100 text-sm">খাঁটি ঐতিহ্য ও সততা</h4>
                <p className="text-stone-400 mt-0.5">কোনো নকল বা কৃত্রিম ব্লেন্ড নয়, কেবল আসল দেশীয় তাঁত ও খাঁটি জামদানি।</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center shrink-0 mt-0.5">
                <Heart className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-stone-100 text-sm">গ্রাহকের পূর্ণ সন্তুষ্টি</h4>
                <p className="text-stone-400 mt-0.5">অর্ডার গ্রহণের মুহূর্ত থেকে ঘরে পৌঁছানো পর্যন্ত সার্বক্ষণিক দায়িত্বশীল সেবা।</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-stone-100 text-sm">কারিগরদের ক্ষমতায়ন</h4>
                <p className="text-stone-400 mt-0.5">টাঙ্গাইলের গ্রামীণ তাঁতিদের জীবনমান উন্নয়নে নিয়মিত অংশীদারিত্ব।</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Showroom & Visit */}
      <div className="bg-[#14060c] border border-rose-950 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 text-xs text-rose-400">
            <MapPin className="w-4 h-4 text-rose-500" />
            <span>সরাসরি আউটলেটে আমন্ত্রিত</span>
          </div>
          <h3 className="text-xl font-bold text-white font-['Anek_Bangla']">
            টাঙ্গাইল প্রধান শোরুম ও বিক্রয়কেন্দ্র
          </h3>
          <p className="text-xs text-stone-400 max-w-xl">
            {address}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('contact')}
            className="px-5 py-2.5 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold rounded-xl transition-colors cursor-pointer"
          >
            যোগাযোগ তথ্য দেখুন
          </button>
          <button
            onClick={() => onNavigate('shop')}
            className="px-6 py-2.5 bg-gradient-to-r from-rose-700 to-rose-600 hover:from-rose-600 hover:to-rose-500 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-md cursor-pointer"
          >
            <span>কালেকশন দেখুন</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
