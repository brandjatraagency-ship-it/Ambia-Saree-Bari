import React from 'react';
import {
  ArrowLeft,
  Phone,
  MoreVertical,
  ThumbsUp,
  CircleCheck,
  Star,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { Review, PageRoute } from '../types';

interface ReviewsSectionProps {
  reviews?: Review[];
  onNavigate?: (page: PageRoute) => void;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  onNavigate,
}) => {
  const chats = [
    {
      id: 'chat-1',
      name: 'Jesi Queen',
      subtext: '+2 • সক্রিয়',
      time: '5:17 PM',
      battery: '84%',
      adText: 'This chat contains a reply to Ambia Saree Bari. #আম্বিয়া_শাড়ি_বাড়ি_সেরা_কোয়ালিটি',
      messages: [
        { sender: 'user', text: 'আসসালামু আলাইকুম, শাড়িটি বুকিং করেছিলাম।', time: '5:10' },
        { sender: 'user', text: 'Booking done ✓✓', time: '5:12' },
        {
          sender: 'user',
          image:
            'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80',
          caption: 'পার্সেল খুলে দেখলাম, কাপড়টা অনেক নরম ও জড়ির কাজ অসাধারণ!',
        },
        {
          sender: 'admin',
          text: 'ওয়ালাইকুম আসসালাম Jesi Queen (ম্যাম), আম্বিয়া শাড়ি বাড়িতে যোগাযোগ করার জন্য ধন্যবাদ। শাড়িটি পছন্দ হওয়ায় আমরা অত্যন্ত আনন্দিত।',
          time: '5:15',
        },
        { sender: 'user', text: 'Thanks a lot, Parcel paichi ❤️ ছবির চেয়েও সুন্দর!', time: '5:16' },
      ],
    },
    {
      id: 'chat-2',
      name: 'BN Bithu',
      subtext: 'Verified Customer • টাঙ্গাইল তাঁত',
      time: '5:47 PM',
      battery: '72%',
      adText: 'Verified Order from Ambia Saree Bari #খাঁটি_টাঙ্গাইল_তাঁত',
      messages: [
        { sender: 'user', text: 'ভাইয়া পার্সেল হাতে পেয়েছি', time: '5:40' },
        { sender: 'user', isThumbsUp: true },
        {
          sender: 'user',
          image:
            'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80',
          caption: 'খাঁটি সুতি টাঙ্গাইল তাঁতের শাড়ি',
        },
        {
          sender: 'user',
          text: 'vaiya parcel payci... Onek sundhor shari ta... Alhamdulillah! Gorome pore khub aram.',
          time: '5:45',
        },
        {
          sender: 'admin',
          text: 'আলহামদুলিল্লাহ আপু! আপনার এমন আন্তরিক সুন্দর মতামতের জন্য অনেক অনেক ধন্যবাদ।',
          time: '5:46',
        },
      ],
    },
    {
      id: 'chat-3',
      name: 'Samiya Jahan Imah',
      subtext: 'Verified Order • জামদানি শাড়ি',
      time: '12:54 PM',
      battery: '91%',
      adText: 'Customer review for Ambia Saree Bari #ঢাকাই_জামদানি',
      messages: [
        {
          sender: 'admin',
          text: 'স্নেহের ম্যাম, আম্বিয়া শাড়ি বাড়িতে যোগাযোগ করার জন্য ধন্যবাদ। আপনার ঠিকানায় রেডিয়েক্স কুরিয়ারে পার্সেল পাঠিয়ে দেওয়া হয়েছিল।',
          time: '12:48',
        },
        {
          sender: 'user',
          image:
            'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80',
          caption: 'সাদা ও স্বর্ণালী অল-ওভার কাজের জামদানি শাড়ি',
        },
        {
          sender: 'user',
          text: 'শাড়ি টা খুব ভালো হয়েছে। ডেলিভারি ম্যানের সামনে চেক করে নিয়েছি। নিখুঁত ফিনিশিং!',
          time: '12:51',
        },
        {
          sender: 'user',
          text: 'Thanks! Ekdom chobir moto shundor hoyeche. Amar maa khub khushi hoyechen ❤️',
          time: '12:53',
        },
      ],
    },
  ];

  return (
    <section className="w-full bg-[#0e0407] py-8 sm:py-12 border-t border-rose-950/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Banner Title */}
        <div className="w-full bg-gradient-to-r from-rose-950 via-rose-800 to-rose-950 text-amber-100 py-3.5 px-6 rounded-2xl shadow-xl text-center mb-8 border border-rose-700/50 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 mx-auto sm:mx-0">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h2 className="font-['Anek_Bangla'] text-xl sm:text-2xl md:text-3xl font-black tracking-wide drop-shadow-sm text-white">
              সম্মানিত গ্রাহকদের রিভিউ
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5 text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <span className="text-xs font-bold text-stone-200">
              (৪.৯ / ৫ রেটিং • ১০০% সন্তুষ্টি)
            </span>
          </div>

          {onNavigate && (
            <button
              onClick={() => onNavigate('reviews')}
              className="text-xs font-bold text-amber-300 hover:text-white flex items-center gap-1 bg-rose-900/60 px-3 py-1.5 rounded-full border border-rose-700/40 cursor-pointer transition-colors"
            >
              <span>সব রিভিউ দেখুন</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* 3 WhatsApp / Messenger Style Authentic Proof Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {chats.map((chat) => (
            <div
              key={chat.id}
              className="bg-[#18080f] rounded-2xl border border-rose-950/90 shadow-2xl overflow-hidden flex flex-col max-w-sm mx-auto w-full font-sans"
            >
              {/* Phone Status bar */}
              <div className="bg-[#100307] text-rose-300/80 px-4 py-1 flex items-center justify-between text-[11px] font-mono border-b border-rose-950">
                <span>{chat.time}</span>
                <div className="flex items-center gap-2">
                  <span className="text-[10px]">4G VoLTE</span>
                  <span>{chat.battery}</span>
                </div>
              </div>

              {/* Chat App Header */}
              <div className="bg-[#18080f] border-b border-rose-950 p-2.5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4 text-rose-300" />
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-rose-600 to-amber-400 text-white font-bold flex items-center justify-center text-xs shadow-xs">
                    {chat.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-stone-100 leading-tight">
                      {chat.name}
                    </h4>
                    <p className="text-[10px] text-emerald-400 font-medium">
                      {chat.subtext}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-rose-300">
                  <Phone className="w-4 h-4" />
                  <MoreVertical className="w-4 h-4" />
                </div>
              </div>

              {/* Meta notice */}
              <div className="bg-[#200812] border-b border-rose-950 px-3 py-1.5 flex items-center justify-between text-[10px] text-rose-200">
                <span className="truncate max-w-[260px]">{chat.adText}</span>
                <span className="text-rose-400">✕</span>
              </div>

              {/* Messages Body */}
              <div className="p-3 bg-[#120409] space-y-2.5 flex-1 min-h-[380px] overflow-hidden flex flex-col justify-end">
                {chat.messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col ${
                      msg.sender === 'user' ? 'items-start' : 'items-end'
                    }`}
                  >
                    {msg.isThumbsUp && (
                      <div className="p-1">
                        <ThumbsUp className="w-7 h-7 text-rose-500 fill-rose-500" />
                      </div>
                    )}
                    {msg.image && (
                      <div className="bg-[#1f0913] p-1.5 rounded-xl shadow-md border border-rose-900/60 max-w-[230px] mb-1">
                        <img
                          src={msg.image}
                          alt="Customer received saree"
                          className="w-full h-36 object-cover rounded-lg brightness-95"
                        />
                        {msg.caption && (
                          <p className="text-[10px] text-rose-200 mt-1 font-medium italic">
                            {msg.caption}
                          </p>
                        )}
                      </div>
                    )}
                    {msg.text && (
                      <div
                        className={`max-w-[85%] px-3 py-1.5 rounded-2xl text-xs leading-snug shadow-sm ${
                          msg.sender === 'user'
                            ? 'bg-[#220a15] text-stone-100 border border-rose-900/60 rounded-bl-xs'
                            : 'bg-rose-700 text-white rounded-br-xs shadow-rose-900/40'
                        }`}
                      >
                        <p>{msg.text}</p>
                        {msg.time && (
                          <span
                            className={`block text-[9px] text-right mt-0.5 ${
                              msg.sender === 'user'
                                ? 'text-rose-400/80'
                                : 'text-rose-200'
                            }`}
                          >
                            {msg.time}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Message Input Simulator */}
              <div className="bg-[#18080f] p-2 border-t border-rose-950 flex items-center justify-between text-xs text-rose-300/60 px-3">
                <span>মেসেজ লিখুন...</span>
                <span className="text-rose-400 font-bold text-xs">পাঠান</span>
              </div>
            </div>
          ))}
        </div>

        {/* Verification Guarantee Notice */}
        <div className="mt-8 text-center text-xs text-rose-300/80 flex items-center justify-center gap-2">
          <CircleCheck className="w-4 h-4 text-emerald-400" />
          <span>
            ১০০% আসল ও ভেরিফাইড গ্রাহক রিভিউ। প্রতিটি পার্সেল ডেলিভারিতে গ্রাহক সন্তুষ্টিই আম্বিয়া শাড়ি বাড়ির প্রধান লক্ষ্য।
          </span>
        </div>
      </div>
    </section>
  );
};
