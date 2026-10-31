import React, { useState } from 'react';
import { Search, X, MapPin, ArrowRight } from 'lucide-react';
import { PACKAGES_DATA, TravelPackage } from './PackagesSection';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPackage: (pkg: TravelPackage) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectPackage,
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const searchTerm = query.trim().toLowerCase();

  const filteredPackages = PACKAGES_DATA.filter(
    (pkg) =>
      pkg.title.toLowerCase().includes(searchTerm) ||
      pkg.tagline.toLowerCase().includes(searchTerm) ||
      pkg.categoryTag?.toLowerCase().includes(searchTerm) ||
      pkg.locations.some((loc) => loc.toLowerCase().includes(searchTerm)) ||
      pkg.highlights.some((highlight) =>
        highlight.toLowerCase().includes(searchTerm)
      )
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 pt-20 sm:pt-28 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden font-sans"
        role="dialog"
        aria-modal="true"
      >
        <div className="p-4 sm:p-5 border-b border-stone-100 flex items-center gap-3">
          <Search className="w-5 h-5 text-[#c59b67]" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search journeys (e.g. Central Asia, Maldives, Dublin...)"
            className="flex-1 text-sm text-stone-900 placeholder:text-stone-400 bg-transparent border-none focus:outline-none focus:ring-0"
          />
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-700 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div data-lenis-prevent className="max-h-80 overflow-y-auto p-4 divide-y divide-stone-100">
          {filteredPackages.length > 0 ? (
            filteredPackages.map((pkg) => (
              <div
                key={pkg.id}
                onClick={() => {
                  onClose();
                  onSelectPackage(pkg);
                }}
                className="py-3 px-3 flex items-center gap-4 hover:bg-stone-50 rounded-xl cursor-pointer transition-colors group"
              >
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  className="w-14 h-12 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs sm:text-sm font-semibold text-stone-900 group-hover:text-[#c59b67] transition-colors">
                    {pkg.title}
                  </h4>
                  <div className="flex items-center gap-2 text-[11px] text-stone-500 truncate">
                    <MapPin className="w-3 h-3 text-[#c59b67]" />
                    <span>{pkg.locations.join(', ')}</span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-[#c59b67] group-hover:translate-x-0.5 transition-all" />
              </div>
            ))
          ) : (
            <div className="py-8 text-center text-xs text-stone-500">
              No matching journeys found for "{query}". Try "Central Asia", "Maldives", or "Edinburgh".
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
