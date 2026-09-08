import React, { useState } from 'react';
import { CircleHelp, ChevronDown } from 'lucide-react';
import { FAQItem } from '../types';
import { defaultFaqs } from '../data/initialData';

interface FAQSectionProps {
  faqs?: FAQItem[];
}

export const FAQSection: React.FC<FAQSectionProps> = ({
  faqs = defaultFaqs,
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const items = faqs && faqs.length > 0 ? faqs : defaultFaqs;

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-12 sm:py-16 bg-[#0e0407] border-t border-rose-950/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#200812] text-rose-300 rounded-full text-xs font-bold border border-rose-800/60 shadow-xs mb-2">
            <CircleHelp className="w-3.5 h-3.5 text-rose-400" />
            <span>সচরাচর জিজ্ঞাসা</span>
          </div>
          <h2 className="font-['Anek_Bangla'] text-2xl sm:text-3xl font-black text-stone-100">
            সাধারণ কিছু প্রশ্নের উত্তর
          </h2>
          <p className="text-xs sm:text-sm text-rose-300/80 mt-1">
            অর্ডার, ডেলিভারি বা রিটার্ন সংক্রান্ত যেকোনো প্রশ্নের বিস্তারিত সমাধান
          </p>
        </div>

        <div className="space-y-3">
          {items.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={item.id || idx}
                className="bg-[#18080f] rounded-xl border border-rose-950/90 overflow-hidden transition-all shadow-md"
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-3 hover:bg-[#200a14] transition-colors cursor-pointer"
                >
                  <span className="font-bold text-sm sm:text-base text-stone-100 leading-snug">
                    {item.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-rose-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-amber-400' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 sm:px-5 pb-4 sm:pb-5 text-xs sm:text-sm text-stone-300 leading-relaxed border-t border-rose-950/80 pt-3 bg-[#14060c]">
                    <p>{item.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
