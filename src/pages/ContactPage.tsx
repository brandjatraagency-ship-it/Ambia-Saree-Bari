import React, { useState } from 'react';
import {
  MapPin,
  PhoneCall,
  MessageCircle,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  Truck,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';
import { StoreSettings, PageRoute } from '../types';

interface ContactPageProps {
  storeSettings: StoreSettings;
  onNavigate: (page: PageRoute) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  storeSettings,
  onNavigate,
}) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    subject: 'শাড়ির অর্ডার ও স্টক অনুসন্ধান',
    message: '',
  });

  const phone = storeSettings.phone || '01796962283';
  const whatsapp = storeSettings.whatsapp || '8801796962283';
  const email = storeSettings.email || 'support@ambiasareebari.com';
  const address =
    storeSettings.address ||
    'প্রধান আউটলেট: আম্বিয়া শাড়ি বাড়ি, টাঙ্গাইল সদর, টাঙ্গাইল এবং ঢাকা সেন্ট্রাল ডেলিভারি হাব।';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const handleSendToWhatsApp = () => {
    const text = `নাম: ${formData.name}\nফোন: ${formData.phone}\nবিষয়: ${formData.subject}\nবার্তা: ${formData.message}`;
    window.open(`https://wa.me/${whatsapp}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8 sm:space-y-10 animate-fade-in">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-stone-400">
        <button
          onClick={() => onNavigate('home')}
          className="hover:text-rose-400 transition-colors cursor-pointer"
        >
          হোম
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-stone-600" />
        <span className="text-rose-300 font-semibold">যোগাযোগ ও আউটলেট</span>
      </nav>

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-stone-100 font-['Anek_Bangla']">
          যোগাযোগ ও প্রধান শো-রুম
        </h1>
        <p className="text-xs sm:text-sm text-stone-400">
          যেকোনো শাড়ির অর্ডার, সাইজ বা ফেব্রিক বিস্তারিত জানতে সরাসরি ফোন করুন অথবা মেসেজ পাঠান।
        </p>
      </div>

      {/* Contact Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Phone */}
        <div className="bg-[#18080f] border border-rose-950/80 rounded-2xl p-5 space-y-3 flex flex-col justify-between shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 shrink-0">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs text-stone-400">হটলাইন ও সরাসরি কল</h3>
              <p className="text-sm sm:text-base font-bold text-white font-mono">{phone}</p>
            </div>
          </div>
          <a
            href={`tel:${phone}`}
            className="w-full py-2 bg-stone-900 hover:bg-stone-800 text-amber-300 border border-amber-400/30 rounded-xl text-xs font-bold text-center transition-colors cursor-pointer block"
          >
            সরাসরি কল করুন
          </a>
        </div>

        {/* WhatsApp */}
        <div className="bg-[#18080f] border border-rose-950/80 rounded-2xl p-5 space-y-3 flex flex-col justify-between shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-400/10 border border-emerald-400/30 flex items-center justify-center text-emerald-400 shrink-0">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs text-stone-400">হোয়াটসঅ্যাপ সাপোর্ট</h3>
              <p className="text-xs font-bold text-emerald-400">তাৎক্ষণিক মেসেজিং</p>
            </div>
          </div>
          <a
            href={`https://wa.me/${whatsapp}?text=${encodeURIComponent('হ্যালো আম্বিয়া শাড়ি বাড়ি, আমি শাড়ির বিষয়ে জানতে চাই।')}`}
            target="_blank"
            rel="noreferrer"
            className="w-full py-2 bg-[#25d366] hover:bg-[#20ba5a] text-white rounded-xl text-xs font-bold text-center transition-colors cursor-pointer block"
          >
            হোয়াটসঅ্যাপে চ্যাট করুন
          </a>
        </div>

        {/* Location */}
        <div className="bg-[#18080f] border border-rose-950/80 rounded-2xl p-5 space-y-3 flex flex-col justify-between shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs text-stone-400">প্রধান আউটলেট</h3>
              <p className="text-xs font-bold text-stone-200">টাঙ্গাইল সদর ও ঢাকা হাব</p>
            </div>
          </div>
          <p className="text-[11px] text-stone-400 leading-tight">
            টাঙ্গাইলের ঐতিহ্যবাহী মূল কারিগর পল্লী ও ডিসপ্যাচ সেন্টার
          </p>
        </div>

        {/* Operating Hours */}
        <div className="bg-[#18080f] border border-rose-950/80 rounded-2xl p-5 space-y-3 flex flex-col justify-between shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs text-stone-400">সার্ভিস সময়</h3>
              <p className="text-xs font-bold text-stone-200">সকাল ৯:০০ - রাত ১০:০০</p>
            </div>
          </div>
          <p className="text-[11px] text-emerald-400 font-medium">
            সপ্তাহে ৭ দিন সার্বক্ষণিক সাপোর্ট চালু
          </p>
        </div>
      </div>

      {/* Main Two Column: Form and Showroom / Policy */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Form */}
        <div className="lg:col-span-7 bg-[#18080f] border border-rose-950/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
          <div>
            <h2 className="text-xl font-bold text-stone-100 font-['Anek_Bangla']">
              আমাদের সরাসরি বার্তা পাঠান
            </h2>
            <p className="text-xs text-stone-400 mt-1">
              যেকোনো প্রশ্ন, স্পেশাল অর্ডার বা পাইকারি অনুসন্ধানের জন্য নিচের ফর্মটি পূরণ করুন।
            </p>
          </div>

          {formSubmitted ? (
            <div className="bg-emerald-950/40 border border-emerald-500/40 rounded-2xl p-6 text-center space-y-4">
              <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-base text-emerald-300">
                  আপনার বার্তা সফলভাবে গ্রহণ করা হয়েছে!
                </h4>
                <p className="text-xs text-stone-300 mt-1">
                  আমাদের কাস্টমার প্রতিনিধি শীঘ্রই আপনার সাথে যোগাযোগ করবেন।
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 pt-2">
                <button
                  onClick={handleSendToWhatsApp}
                  className="w-full sm:w-auto px-5 py-2 bg-[#25d366] hover:bg-[#20ba5a] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>হোয়াটসঅ্যাপেও মেসেজটি ফরোয়ার্ড করুন</span>
                </button>
                <button
                  onClick={() => {
                    setFormSubmitted(false);
                    setFormData({ name: '', phone: '', subject: 'শাড়ির অর্ডার ও স্টক অনুসন্ধান', message: '' });
                  }}
                  className="w-full sm:w-auto px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold rounded-xl cursor-pointer"
                >
                  নতুন বার্তা লিখুন
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-stone-300 font-medium mb-1.5">
                    আপনার নাম <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="যেমন: ফারহানা আক্তার"
                    className="w-full px-3.5 py-2.5 bg-[#120509] border border-rose-900/60 rounded-xl text-stone-100 placeholder:text-stone-500 outline-hidden focus:border-rose-500 focus:bg-[#1a070e]"
                  />
                </div>
                <div>
                  <label className="block text-stone-300 font-medium mb-1.5">
                    মোবাইল নম্বর <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="০১৭xxxxxxxx"
                    className="w-full px-3.5 py-2.5 bg-[#120509] border border-rose-900/60 rounded-xl text-stone-100 placeholder:text-stone-500 outline-hidden focus:border-rose-500 focus:bg-[#1a070e] font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-stone-300 font-medium mb-1.5">
                  অনুসন্ধানের বিষয়
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#120509] border border-rose-900/60 rounded-xl text-stone-200 outline-hidden focus:border-rose-500 cursor-pointer"
                >
                  <option value="শাড়ির অর্ডার ও স্টক অনুসন্ধান">শাড়ির অর্ডার ও স্টক অনুসন্ধান</option>
                  <option value="অর্ডার ডেলিভারি স্ট্যাটাস">অর্ডার ডেলিভারি স্ট্যাটাস</option>
                  <option value="পাইকারি / হোলসেল ক্রয়">পাইকারি / হোলসেল ক্রয়</option>
                  <option value="শাড়ির যত্ন ও ফেব্রিক প্রশ্ন">শাড়ির যত্ন ও ফেব্রিক প্রশ্ন</option>
                  <option value="অন্যান্য পরামর্শ">অন্যান্য পরামর্শ</option>
                </select>
              </div>

              <div>
                <label className="block text-stone-300 font-medium mb-1.5">
                  আপনার বার্তা বা শাড়ির কোড <span className="text-rose-500">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="আপনার কাঙ্ক্ষিত শাড়ির কোড, রঙ বা যে তথ্য জানতে চান লিখুন..."
                  className="w-full px-3.5 py-2.5 bg-[#120509] border border-rose-900/60 rounded-xl text-stone-100 placeholder:text-stone-500 outline-hidden focus:border-rose-500 focus:bg-[#1a070e]"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-gradient-to-r from-rose-700 to-rose-600 hover:from-rose-600 hover:to-rose-500 text-white font-bold rounded-xl shadow-md cursor-pointer flex items-center gap-2 active:scale-95 transition-transform"
                >
                  <Send className="w-4 h-4" />
                  <span>বার্তা পাঠান</span>
                </button>
                <button
                  type="button"
                  onClick={handleSendToWhatsApp}
                  className="text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1.5 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>WhatsApp এ সরাসরি পাঠান</span>
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Address and Delivery Info Column */}
        <div className="lg:col-span-5 space-y-5">
          {/* Showroom Card */}
          <div className="bg-[#18080f] border border-rose-950/80 rounded-3xl p-6 space-y-4 shadow-sm">
            <h3 className="font-bold text-base text-stone-100 font-['Anek_Bangla'] flex items-center gap-2">
              <MapPin className="w-4 h-4 text-rose-500" />
              <span>আউটলেটের ঠিকানা ও সেবা</span>
            </h3>
            <p className="text-xs text-stone-300 leading-relaxed">
              {address}
            </p>
            <div className="p-3 bg-[#120509] rounded-xl border border-rose-950 text-xs text-stone-400 space-y-1">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400" />
                <span>ইমেইল: {email}</span>
              </div>
              <div className="flex items-center gap-2">
                <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                <span>বিকাশ মার্চেন্ট: {storeSettings.bkashNumber || phone}</span>
              </div>
            </div>
          </div>

          {/* Delivery terms card */}
          <div className="bg-[#18080f] border border-rose-950/80 rounded-3xl p-6 space-y-3.5 shadow-sm">
            <h3 className="font-bold text-base text-stone-100 font-['Anek_Bangla'] flex items-center gap-2">
              <Truck className="w-4 h-4 text-amber-400" />
              <span>ডেলিভারি চার্জ ও নিয়মাবলী</span>
            </h3>
            <ul className="space-y-2 text-xs text-stone-300">
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">•</span>
                <span>
                  ঢাকা সিটি কর্পোরেশন হোম ডেলিভারি: <strong>৳{storeSettings.dhakaDeliveryCharge || 80}</strong> (১-২ দিনে ডেলিভারি)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">•</span>
                <span>
                  ঢাকার বাইরে সারা বাংলাদেশ: <strong>৳{storeSettings.outsideDhakaDeliveryCharge || 150}</strong> (২-৩ দিনে হোম ডেলিভারি)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span className="text-emerald-400 font-semibold">
                  ক্যাশ অন ডেলিভারিতে শাড়ি হাতে পেয়ে দেখে মূল্য পরিশোধের সুবিধা।
                </span>
              </li>
            </ul>
          </div>

          {/* Sincerity Guarantee */}
          <div className="p-4 bg-gradient-to-tr from-rose-950/40 to-transparent border border-rose-900/50 rounded-2xl flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-rose-400 shrink-0" />
            <p className="text-xs text-stone-300 leading-snug">
              আমরা শতভাগ অরিজিনাল টাঙ্গাইল তাঁতের শাড়ির গুণগত মানের নিশ্চয়তা দিই।
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
