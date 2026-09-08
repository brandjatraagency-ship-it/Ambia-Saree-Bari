import React from 'react';
import { Droplets, Sun, Wind, Shield } from 'lucide-react';
import { CareTip } from '../types';
import { defaultCareTips } from '../data/initialData';

interface SareeCareTipsProps {
  careTips?: CareTip[];
}

export const SareeCareTips: React.FC<SareeCareTipsProps> = ({
  careTips = defaultCareTips,
}) => {
  const tips = careTips && careTips.length > 0 ? careTips : defaultCareTips;

  const renderIcon = (type?: string, index: number = 0) => {
    switch (type) {
      case 'droplets':
        return <Droplets className="w-5 h-5 text-blue-400" />;
      case 'sun':
        return <Sun className="w-5 h-5 text-amber-400" />;
      case 'wind':
        return <Wind className="w-5 h-5 text-purple-400" />;
      case 'shield':
      default:
        return index === 0 ? (
          <Droplets className="w-5 h-5 text-blue-400" />
        ) : index === 1 ? (
          <Sun className="w-5 h-5 text-amber-400" />
        ) : index === 2 ? (
          <Wind className="w-5 h-5 text-purple-400" />
        ) : (
          <Shield className="w-5 h-5 text-emerald-400" />
        );
    }
  };

  return (
    <section className="py-12 bg-[#0e0407] border-t border-rose-950/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-br from-[#1d060f] via-[#14050a] to-[#240813] rounded-3xl p-6 sm:p-10 border border-rose-950/90 shadow-xl">
          <div className="max-w-2xl mx-auto text-center mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-300 bg-[#250914] px-3.5 py-1 rounded-full border border-rose-800/60 shadow-xs">
              আম্বিয়া স্পেশাল গাইডলাইন
            </span>
            <h2 className="font-['Anek_Bangla'] text-2xl sm:text-3xl font-black text-stone-100 mt-3">
              শাড়ির স্থায়িত্ব ও উজ্জ্বলতা ধরে রাখার যত্নবিধি
            </h2>
            <p className="text-xs sm:text-sm text-rose-300/80 mt-1.5">
              আমাদের প্রতিটি শাড়ির সৌন্দর্য বছরের পর বছর নতুনের মত রাখতে এই সহজ নিয়মগুলো মেনে চলুন
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {tips.map((tip, idx) => (
              <div
                key={tip.id || idx}
                className="bg-[#18060f]/90 backdrop-blur-xs p-4 sm:p-5 rounded-2xl border border-rose-900/40 hover:border-rose-700/60 transition-colors shadow-md"
              >
                <div className="w-10 h-10 rounded-xl bg-[#260917] border border-rose-800/50 flex items-center justify-center mb-3">
                  {renderIcon(tip.iconType, idx)}
                </div>
                <h3 className="font-bold text-sm text-stone-100 mb-1">
                  {tip.title}
                </h3>
                <p className="text-xs text-stone-400 leading-relaxed">
                  {tip.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
