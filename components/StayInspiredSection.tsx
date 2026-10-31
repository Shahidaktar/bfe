import React, { useState } from 'react';
import { Check, Send } from 'lucide-react';

export const StayInspiredSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) setIsSubscribed(true);
  };

  return (
    <section className="py-20 sm:py-24 bg-[#071523] relative overflow-hidden border-t border-white/10">
      {/* Ambient gold glow */}
      <div className="absolute top-0 left-1/3 w-[500px] h-[400px] bg-[#c59b67]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="w-8 h-[1px] bg-[#c59b67]" />
          <span className="text-[10px] sm:text-[11px] tracking-[0.28em] font-semibold text-[#c59b67] uppercase font-sans">
            Stay Inspired
          </span>
          <span className="w-8 h-[1px] bg-[#c59b67]" />
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tight text-white leading-[1.15] mb-4">
          Travel Ideas, Straight to <span className="italic font-normal text-[#c59b67]">Your Inbox</span>
        </h2>

        <p className="text-sm sm:text-[15px] font-sans text-stone-300 font-light leading-relaxed max-w-xl mx-auto mb-10">
          Subscribe to our newsletter for destination stories, insider advice and first access to new private journeys. No noise — one thoughtful email a month.
        </p>

        {isSubscribed ? (
          <div className="inline-flex items-center gap-3 px-6 py-4 rounded-xl bg-white/5 border border-[#c59b67]/40">
            <span className="w-8 h-8 rounded-full bg-[#c59b67]/15 text-[#c59b67] flex items-center justify-center">
              <Check className="w-4 h-4 stroke-[2.5]" />
            </span>
            <p className="text-sm text-stone-200 font-sans">
              Thank you — you&rsquo;re on the list. Your first journey ideas are on their way.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-stretch gap-3 max-w-lg mx-auto"
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="flex-1 px-5 py-3.5 rounded-md bg-white/5 border border-white/15 text-sm text-white font-sans placeholder:text-stone-400 focus:outline-none focus:border-[#c59b67]"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#c59b67] hover:bg-[#d6aa75] active:scale-[0.98] text-[#081726] text-xs font-semibold tracking-widest uppercase rounded-md transition-all shadow-lg cursor-pointer whitespace-nowrap font-sans"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Subscribe</span>
            </button>
          </form>
        )}
      </div>
    </section>
  );
};
