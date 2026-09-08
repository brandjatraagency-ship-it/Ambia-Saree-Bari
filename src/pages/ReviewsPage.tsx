import React, { useState } from 'react';
import {
  Star,
  CheckCircle2,
  MessageSquarePlus,
  Filter,
  Sparkles,
  ChevronRight,
  Send,
  X,
} from 'lucide-react';
import { Review, PageRoute } from '../types';

interface ReviewsPageProps {
  reviews: Review[];
  onAddReview: (review: Review) => void;
  onNavigate: (page: PageRoute) => void;
}

export const ReviewsPage: React.FC<ReviewsPageProps> = ({
  reviews,
  onAddReview,
  onNavigate,
}) => {
  const [selectedRating, setSelectedRating] = useState<number | 'all'>('all');
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    location: '',
    productName: '',
    rating: 5,
    comment: '',
  });

  const averageRating = (
    reviews.reduce((acc, r) => acc + r.rating, 0) / (reviews.length || 1)
  ).toFixed(1);

  const fiveStarCount = reviews.filter((r) => r.rating === 5).length;
  const fourStarCount = reviews.filter((r) => r.rating === 4).length;

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.comment.trim()) return;

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      name: formData.name.trim(),
      location: formData.location.trim() || 'বাংলাদেশ',
      productName: formData.productName.trim() || 'টাঙ্গাইল প্রিমিয়াম শাড়ি',
      rating: formData.rating,
      comment: formData.comment.trim(),
      date: 'আজকে',
      verified: true,
    };

    onAddReview(newRev);
    setIsWriteModalOpen(false);
    setFormData({
      name: '',
      location: '',
      productName: '',
      rating: 5,
      comment: '',
    });
  };

  const filteredReviews = reviews.filter((r) => {
    if (selectedRating === 'all') return true;
    return r.rating === selectedRating;
  });

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
        <span className="text-amber-400 font-semibold">গ্রাহক মতামত ও রিভিউ</span>
      </nav>

      {/* Header & Stats Banner */}
      <div className="bg-gradient-to-b from-[#1c0812] to-[#120509] border border-rose-950/80 rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-rose-900/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
          <div className="space-y-3 text-center lg:text-left max-w-xl">
            <span className="px-3.5 py-1 bg-amber-500/10 text-amber-300 border border-amber-500/20 rounded-full text-xs font-semibold inline-flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>১০০% বাস্তব গ্রাহক অভিজ্ঞতা</span>
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-stone-100 font-['Anek_Bangla']">
              আম্বিয়া শাড়ি বাড়ির সম্মানিত গ্রাহকদের রিভিউ
            </h1>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              সারা দেশের হাজারো নারী গ্রাহকের বিশ্বাস ও ভালোবাসাই আমাদের পথচলার মূল প্রেরণা। ডেলিভারি পাওয়ার পর দেখে নিয়ে সন্তুষ্ট হওয়ার অভিজ্ঞতা পড়ুন।
            </p>
          </div>

          {/* Rating Summary Box */}
          <div className="bg-[#18080f] border border-rose-900/60 rounded-2xl p-6 flex items-center gap-6 sm:gap-8 shadow-md shrink-0">
            <div className="text-center">
              <span className="text-4xl sm:text-5xl font-black text-amber-400 font-mono">
                {averageRating}
              </span>
              <div className="flex items-center justify-center gap-1 text-amber-400 mt-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-[11px] text-stone-400 mt-1 font-mono">
                {reviews.length}টি ভেরিফাইড রিভিউ
              </p>
            </div>

            <div className="h-16 w-px bg-rose-950" />

            <div className="space-y-1.5 text-xs text-stone-300">
              <div className="flex items-center gap-2">
                <span className="w-12 font-mono text-[11px] text-stone-400">৫ স্টার</span>
                <div className="w-24 sm:w-32 bg-stone-900 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-amber-400 h-full rounded-full"
                    style={{
                      width: `${(fiveStarCount / (reviews.length || 1)) * 100}%`,
                    }}
                  />
                </div>
                <span className="font-mono text-[11px] text-stone-400">{fiveStarCount}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-12 font-mono text-[11px] text-stone-400">৪ স্টার</span>
                <div className="w-24 sm:w-32 bg-stone-900 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-amber-400/70 h-full rounded-full"
                    style={{
                      width: `${(fourStarCount / (reviews.length || 1)) * 100}%`,
                    }}
                  />
                </div>
                <span className="font-mono text-[11px] text-stone-400">{fourStarCount}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action button inside banner */}
        <div className="mt-8 pt-6 border-t border-rose-950/80 flex flex-wrap items-center justify-between gap-4">
          <p className="text-xs text-stone-400">
            আপনি কি সম্প্রতি আমাদের শাড়ি কিনেছেন? আপনার মূল্যবান মতামত অন্যদের সাহায্য করবে।
          </p>
          <button
            onClick={() => setIsWriteModalOpen(true)}
            className="px-5 py-2.5 bg-gradient-to-r from-rose-700 to-rose-600 hover:from-rose-600 hover:to-rose-500 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-2 cursor-pointer transition-transform active:scale-95"
          >
            <MessageSquarePlus className="w-4 h-4" />
            <span>একটি রিভিউ লিখুন</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 text-xs">
        <span className="text-stone-400 font-semibold flex items-center gap-1 shrink-0 mr-1">
          <Filter className="w-3.5 h-3.5" />
          ফিল্টার:
        </span>
        <button
          onClick={() => setSelectedRating('all')}
          className={`px-4 py-1.5 rounded-full font-semibold transition-all cursor-pointer shrink-0 ${
            selectedRating === 'all'
              ? 'bg-rose-700 text-white shadow-xs'
              : 'bg-[#18080f] text-stone-300 hover:text-white border border-rose-950'
          }`}
        >
          সবগুলো ({reviews.length})
        </button>
        <button
          onClick={() => setSelectedRating(5)}
          className={`px-4 py-1.5 rounded-full font-semibold transition-all cursor-pointer shrink-0 ${
            selectedRating === 5
              ? 'bg-amber-500 text-stone-950 shadow-xs'
              : 'bg-[#18080f] text-stone-300 hover:text-white border border-rose-950'
          }`}
        >
          ৫ স্টার রিভিউ ({fiveStarCount})
        </button>
        <button
          onClick={() => setSelectedRating(4)}
          className={`px-4 py-1.5 rounded-full font-semibold transition-all cursor-pointer shrink-0 ${
            selectedRating === 4
              ? 'bg-amber-500 text-stone-950 shadow-xs'
              : 'bg-[#18080f] text-stone-300 hover:text-white border border-rose-950'
          }`}
        >
          ৪ স্টার রিভিউ ({fourStarCount})
        </button>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {filteredReviews.map((review) => (
          <div
            key={review.id}
            className="bg-[#18080f] border border-rose-950/80 rounded-2xl p-5 space-y-3.5 shadow-xs flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-bold text-sm text-stone-100">{review.name}</h3>
                  <div className="flex items-center gap-1.5 text-[11px] text-stone-400 mt-0.5">
                    <span>{review.location}</span>
                    {review.date && (
                      <>
                        <span>•</span>
                        <span>{review.date}</span>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-0.5 text-amber-400 shrink-0">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
              </div>

              <p className="text-xs text-stone-200 leading-relaxed italic">
                "{review.comment}"
              </p>
            </div>

            <div className="pt-3 border-t border-rose-950/80 flex items-center justify-between text-[11px]">
              <span className="text-rose-300 font-medium truncate max-w-[170px]">
                {review.productName}
              </span>
              <span className="text-emerald-400 font-semibold flex items-center gap-1 shrink-0">
                <CheckCircle2 className="w-3 h-3" />
                <span>ভেরিফাইড অর্ডার</span>
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Box */}
      <div className="bg-gradient-to-r from-rose-950/60 to-[#18080f] border border-rose-900/60 rounded-3xl p-6 sm:p-8 text-center space-y-3 shadow-lg">
        <h3 className="text-xl sm:text-2xl font-black text-white font-['Anek_Bangla']">
          আপনিও পেতে চান টাঙ্গাইলের খাঁটি শাড়ির সেরা অনুভূতি?
        </h3>
        <p className="text-xs sm:text-sm text-stone-300 max-w-xl mx-auto">
          ক্যাশ অন ডেলিভারিতে ঘরে বসে অর্ডার করুন এবং নিজের হাতে দেখে নিশ্চিত হয়ে গ্রহণ করুন।
        </p>
        <div className="pt-2">
          <button
            onClick={() => onNavigate('shop')}
            className="px-6 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs sm:text-sm rounded-full shadow-md cursor-pointer transition-transform active:scale-95"
          >
            এখনই শাড়ি কালেকশন দেখুন
          </button>
        </div>
      </div>

      {/* Write Review Modal */}
      {isWriteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-fade-in">
          <div className="bg-[#18080f] border border-rose-900/80 rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-5 shadow-2xl relative">
            <button
              onClick={() => setIsWriteModalOpen(false)}
              className="absolute top-5 right-5 text-stone-400 hover:text-white p-1 rounded-full cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <h3 className="text-lg font-bold text-stone-100 font-['Anek_Bangla']">
                আপনার রিভিউ শেয়ার করুন
              </h3>
              <p className="text-xs text-stone-400">
                আম্বিয়া শাড়ি বাড়ি থেকে কেনা আপনার শাড়ি সম্পর্কে মতামত দিন
              </p>
            </div>

            <form onSubmit={handleSubmitReview} className="space-y-4 text-xs">
              <div>
                <label className="block text-stone-300 font-medium mb-1">আপনার নাম *</label>
                <input
                  type="text"
                  required
                  placeholder="যেমন: ফারহানা করিম"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#120509] border border-rose-950 rounded-xl text-stone-100 placeholder:text-stone-500 outline-hidden focus:border-rose-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-300 font-medium mb-1">এলাকা / জেলা</label>
                  <input
                    type="text"
                    placeholder="যেমন: মিরপুর, ঢাকা"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#120509] border border-rose-950 rounded-xl text-stone-100 placeholder:text-stone-500 outline-hidden focus:border-rose-600"
                  />
                </div>
                <div>
                  <label className="block text-stone-300 font-medium mb-1">শাড়ির নাম</label>
                  <input
                    type="text"
                    placeholder="যেমন: ল্যামা সিল্ক"
                    value={formData.productName}
                    onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#120509] border border-rose-950 rounded-xl text-stone-100 placeholder:text-stone-500 outline-hidden focus:border-rose-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-stone-300 font-medium mb-1">আপনার রেটিং</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormData({ ...formData, rating: star })}
                      className="p-1 text-amber-400 hover:scale-110 transition-transform cursor-pointer"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          formData.rating >= star ? 'fill-amber-400' : 'text-stone-600'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-amber-400 font-bold ml-2 font-mono">
                    {formData.rating} স্টার
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-stone-300 font-medium mb-1">আপনার অভিজ্ঞতা *</label>
                <textarea
                  required
                  rows={3}
                  placeholder="শাড়ির মান, কাপড়ের অনুভূতি বা ডেলিভারি নিয়ে আপনার মতামত লিখুন..."
                  value={formData.comment}
                  onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#120509] border border-rose-950 rounded-xl text-stone-100 placeholder:text-stone-500 outline-hidden focus:border-rose-600 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <Send className="w-4 h-4" />
                <span>রিভিউ সাবমিট করুন</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
