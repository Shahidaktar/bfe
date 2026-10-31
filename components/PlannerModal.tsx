import React from 'react';
import { X } from 'lucide-react';
import { JourneyEnquiryForm } from './EnquiryForm';

interface PlannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDestination?: string;
  initialTravelType?: string;
}

export const PlannerModal: React.FC<PlannerModalProps> = ({
  isOpen,
  onClose,
  initialDestination = '',
  initialTravelType = '',
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden max-h-[90vh] flex flex-col font-sans"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="px-6 py-5 bg-[#081726] text-white flex items-center justify-between border-b border-white/10">
          <div>
            <span className="text-[10px] tracking-[0.25em] text-[#c59b67] uppercase font-semibold block mb-0.5">
              BESPOKE JOURNEY CURATION
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-normal text-white">
              Plan My Journey
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div data-lenis-prevent className="p-6 sm:p-8 overflow-y-auto flex-1">
          <JourneyEnquiryForm
            initialDestination={initialDestination}
            initialTravelType={initialTravelType}
            onDone={onClose}
          />
        </div>
      </div>
    </div>
  );
};
