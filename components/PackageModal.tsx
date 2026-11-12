import React from 'react';
import Link from 'next/link';
import { X, Check, MapPin, Calendar, ArrowRight, Sparkles } from 'lucide-react';
import { TravelPackage } from './PackagesSection';

interface PackageModalProps {
  pkg: TravelPackage | null;
  onClose: () => void;
  onBookNow: (pkg: TravelPackage) => void;
}

export const PackageModal: React.FC<PackageModalProps> = ({
  pkg,
  onClose,
  onBookNow,
}) => {
  if (!pkg) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden max-h-[92vh] flex flex-col font-sans"
        role="dialog"
        aria-modal="true"
      >
        {/* Header with image banner */}
        <div className="relative h-56 sm:h-64 overflow-hidden bg-stone-900 shrink-0">
          <img
            src={pkg.image}
            alt={pkg.title}
            className="w-full h-full object-cover filter brightness-[0.85]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Banner bottom info */}
          <div className="absolute bottom-5 left-6 right-6 text-white">
            <span className="text-[10px] tracking-[0.25em] text-[#c59b67] uppercase font-semibold block mb-1">
              CURATED ITINERARY
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-white">
              {pkg.title}
            </h3>
            <div className="flex items-center gap-4 text-xs text-stone-200 mt-2 font-light">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#c59b67]" />
                {pkg.duration}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#c59b67]" />
                {pkg.locations.join(' · ')}
              </span>
            </div>
          </div>
        </div>

        {/* Modal content */}
        <div data-lenis-prevent className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6">
          {/* Overview text */}
          <div>
            <h4 className="text-xs font-semibold text-stone-900 uppercase tracking-wider mb-2">
              Journey Overview
            </h4>
            <p className="text-sm text-stone-600 leading-relaxed font-light">
              {pkg.description}
            </p>
          </div>

          {/* Handcrafted Highlights */}
          <div className="bg-[#faf8f5] rounded-xl p-5 border border-stone-200/70">
            <h4 className="text-xs font-semibold text-stone-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#c59b67]" />
              <span>Bespoke Inclusions & Highlights</span>
            </h4>
            <ul className="space-y-2.5">
              {pkg.highlights.map((highlight, index) => (
                <li key={index} className="flex items-start gap-2.5 text-xs text-stone-700 leading-normal">
                  <Check className="w-3.5 h-3.5 text-[#c59b67] shrink-0 mt-0.5" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Full itinerary page, when this journey has one */}
          {pkg.itinerarySlug && (
            <Link
              href={`/luxury-travel/${pkg.itinerarySlug}`}
              onClick={onClose}
              className="group flex items-center justify-between gap-3 rounded-xl border border-[#c59b67]/40 bg-[#c59b67]/5 px-4 py-3.5 transition-colors hover:border-[#c59b67] hover:bg-[#c59b67]/10"
            >
              <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8a6a35]">
                View the full day-by-day itinerary
              </span>
              <ArrowRight className="w-4 h-4 shrink-0 text-[#c59b67] transition-transform group-hover:translate-x-1" />
            </Link>
          )}

          {/* Pricing & Booking Row */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-stone-200">
            <div>
              <span className="text-[11px] text-stone-400 uppercase tracking-wider block">
                Starting Experience Rate
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="font-serif text-2xl font-normal text-stone-900">
                  {pkg.price}
                </span>
                {pkg.price.includes('$') && (
                  <span className="text-xs text-stone-500">/ traveler (double occupancy)</span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <a
                href={'/enquiry'}
                className="w-full sm:w-auto px-6 py-3 bg-[#c59b67] hover:bg-[#b68b55] active:scale-[0.98] text-[#081726] text-xs font-semibold tracking-wider uppercase rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Customize This Journey</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
