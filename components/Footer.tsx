'use client';

import React, { useEffect, useState } from 'react';
import { Instagram, Facebook, Youtube, Linkedin, Mail, Phone, ArrowUp } from 'lucide-react';
import { scrollTo, scrollToSection } from '../lib/lenis';
import { useNavigate, useRoute } from '../lib/router';
import { useSite } from './SiteProvider';
import {
  CONTACT,
  LEGAL_LINKS,
  SOCIAL_LINKS,
  whatsappLink,
} from '../lib/contact';

export const Footer: React.FC = () => {
  const { openContact: onOpenContact } = useSite();
  const navigate = useNavigate();
  const route = useRoute();
  const scrollToTop = () => {
    scrollTo(0);
  };

  // Sections live on the homepage, so hash links point at the route when off-page.
  const onHomepage = route === '/';
  const [year, setYear] = useState(2026);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);
  const sectionHref = (hash: string) => (onHomepage ? hash : `/${hash}`);

  // Section links only exist on the homepage, so route there first when needed.
  const handleFooterLink = (e: React.MouseEvent<HTMLElement>) => {
    const anchor = (e.target as HTMLElement).closest('a');
    const href = anchor?.getAttribute('href') ?? '';
    const hash = href.startsWith('/#') ? href.slice(1) : href.startsWith('#') ? href : '';
    if (!hash) return;
    e.preventDefault();
    if (onHomepage) {
      scrollTo(hash, { offset: -80 });
      return;
    }
    navigate('/');
    window.setTimeout(() => scrollToSection(hash, { offset: -80 }), 450);
  };

  return (
    <footer
      onClick={handleFooterLink}
      className="relative bg-[#07131e] text-stone-200 pt-16 sm:pt-20 pb-12 font-sans border-t border-white/10 overflow-hidden"
    >
      {/* Background world map watermark overlay */}
   
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12">
          {/* Col 1: Logo, Company Name, Address & Socials (4 columns) */}
          <div className="lg:col-span-4 space-y-5">
            {/* Logo */}
             <a
                href={sectionHref('#home')}
                className="flex items-center gap-2.5 sm:gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c59b67] rounded-sm"
                aria-label="Beyond Forever Earth Home"
              >
                {/* Monogram Box Icon */}
                <div>
              <img
                src="https://beyondforever.earth/assets/front/img/footer-logo.png"
                alt="Beyond Forever Earth"
                className="w-8 h-8 sm:w-14 sm:h-14 object-contain"
              />
            </div>
                <div className="flex flex-col text-left">
                  <span className="font-serif text-sm sm:text-xl font-semibold tracking-[0.22em] text-white uppercase group-hover:text-[#c59b67] transition-colors">
                    Beyond
                  </span>
                  <span className="text-[9px] sm:text-[15px] tracking-[0.28em] text-stone-300 uppercase -mt-0.5 font-light">
                    Forever Earth
                  </span>
                </div>
              </a>

            {/* Address */}
            <p className="text-stone-300 text-sm sm:text-[15px] leading-relaxed max-w-sm">
              1st floor, 264-265, Dr Annie Besant Rd, Municipal Colony, Worli Shivaji Nagar, Worli, Mumbai, Maharashtra 400025
            </p>

            {/* Social Icons (Circular White Buttons with dark icons) */}
            <div className="flex items-center space-x-3 pt-2">
              <a
                href={SOCIAL_LINKS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Beyond Forever Earth on Facebook"
                className="w-10 h-10 rounded-full bg-white text-[#07131e] flex items-center justify-center hover:bg-[#c59b67] hover:text-black transition-colors shadow-sm"
              >
                <Facebook className="w-5 h-5 fill-current stroke-none" />
              </a>
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Beyond Forever Earth on LinkedIn"
                className="w-10 h-10 rounded-full bg-white text-[#07131e] flex items-center justify-center hover:bg-[#c59b67] hover:text-black transition-colors shadow-sm"
              >
                <Linkedin className="w-5 h-5 fill-current stroke-none" />
              </a>
              <a
                href={SOCIAL_LINKS.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Beyond Forever Earth on YouTube"
                className="w-10 h-10 rounded-full bg-white text-[#07131e] flex items-center justify-center hover:bg-[#c59b67] hover:text-black transition-colors shadow-sm"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Beyond Forever Earth on Instagram"
                className="w-10 h-10 rounded-full bg-white text-[#07131e] flex items-center justify-center hover:bg-[#c59b67] hover:text-black transition-colors shadow-sm"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Col 2: Useful Links (3 columns) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-[#c59b67] font-bold text-base sm:text-lg tracking-wide">
              Useful Links
            </h4>
            <ul className="space-y-3 sm:space-y-3.5 text-[15px] sm:text-base font-medium text-stone-200">
              <li>
                <a
                  href="/about"
                  className="hover:text-[#c59b67] transition-colors inline-block"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href={sectionHref('#how-it-works')}
                  className="hover:text-[#c59b67] transition-colors inline-block"
                >
                  How We Work
                </a>
              </li>
              <li>
                <a
                  href={sectionHref('#destinations')}
                  className="hover:text-[#c59b67] transition-colors inline-block"
                >
                  Travel Itineraries
                </a>
              </li>
              <li>
                <a
                  href="/create-the-bucketlist"
                  className="hover:text-[#c59b67] transition-colors inline-block"
                >
               Create Bucket List
                </a>
              </li>
              <li>
                <a
                  href="/e-shop"
                  className="hover:text-[#c59b67] transition-colors inline-block"
                >
                E-Shop
                </a>
              </li>
                <li>
                <a
                  href={sectionHref('#faqs')}
                  className="hover:text-[#c59b67] transition-colors inline-block"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href={sectionHref('#faqs')}
                  className="hover:text-[#c59b67] transition-colors inline-block"
                >
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Destinations (2 columns) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-[#c59b67] font-bold text-base sm:text-lg tracking-wide">
              Destinations
            </h4>
            <ul className="space-y-3 sm:space-y-3.5 text-[15px] sm:text-base">
              <li>
                <a
                  href="/destinations/europe"
                  className="text-white font-bold hover:text-[#c59b67] transition-colors inline-block"
                >
                  Europe
                </a>
              </li>
              <li>
                <a
                  href={sectionHref('#destinations')}
                  className="text-stone-300 font-medium hover:text-white transition-colors inline-block"
                >
                  Singapore
                </a>
              </li>
              <li>
                <a
                  href={sectionHref('#destinations')}
                  className="text-stone-300 font-medium hover:text-white transition-colors inline-block"
                >
                  Maldives
                </a>
              </li>
              <li>
                <a
                  href={sectionHref('#destinations')}
                  className="text-stone-300 font-medium hover:text-white transition-colors inline-block"
                >
                  Japan
                </a>
              </li>
              <li>
                <a
                  href={sectionHref('#destinations')}
                  className="text-stone-300 font-medium hover:text-white transition-colors inline-block"
                >
                  Switzerland
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact Info (3 columns) */}
          <div className="lg:col-span-3 space-y-5">
            <h4 className="text-[#c59b67] font-bold text-base sm:text-lg tracking-wide">
              Contact Info
            </h4>

            <div className="space-y-5">
              {/* WhatsApp */}
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3.5 hover:opacity-95 transition-all"
              >
                <div className="p-2 w-12 h-12 rounded-full bg-[#c59b67] flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform">
                 <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M17.6 6.31999C16.8669 5.58141 15.9943 4.99596 15.033 4.59767C14.0716 4.19938 13.0406 3.99622 12 3.99999C10.6089 4.00135 9.24248 4.36819 8.03771 5.06377C6.83294 5.75935 5.83208 6.75926 5.13534 7.96335C4.4386 9.16745 4.07046 10.5335 4.06776 11.9246C4.06507 13.3158 4.42793 14.6832 5.12 15.89L4 20L8.2 18.9C9.35975 19.5452 10.6629 19.8891 11.99 19.9C14.0997 19.9001 16.124 19.0668 17.6222 17.5816C19.1205 16.0965 19.9715 14.0796 19.99 11.97C19.983 10.9173 19.7682 9.87634 19.3581 8.9068C18.948 7.93725 18.3505 7.05819 17.6 6.31999ZM12 18.53C10.8177 18.5308 9.65701 18.213 8.64 17.61L8.4 17.46L5.91 18.12L6.57 15.69L6.41 15.44C5.55925 14.0667 5.24174 12.429 5.51762 10.8372C5.7935 9.24545 6.64361 7.81015 7.9069 6.80322C9.1702 5.79628 10.7589 5.28765 12.3721 5.37368C13.9853 5.4597 15.511 6.13441 16.66 7.26999C17.916 8.49818 18.635 10.1735 18.66 11.93C18.6442 13.6859 17.9355 15.3645 16.6882 16.6006C15.441 17.8366 13.756 18.5301 12 18.53ZM15.61 13.59C15.41 13.49 14.44 13.01 14.26 12.95C14.08 12.89 13.94 12.85 13.81 13.05C13.6144 13.3181 13.404 13.5751 13.18 13.82C13.07 13.96 12.95 13.97 12.75 13.82C11.6097 13.3694 10.6597 12.5394 10.06 11.47C9.85 11.12 10.26 11.14 10.64 10.39C10.6681 10.3359 10.6827 10.2759 10.6827 10.215C10.6827 10.1541 10.6681 10.0941 10.64 10.04C10.64 9.93999 10.19 8.95999 10.03 8.56999C9.87 8.17999 9.71 8.23999 9.58 8.22999H9.19C9.08895 8.23154 8.9894 8.25465 8.898 8.29776C8.8066 8.34087 8.72546 8.403 8.66 8.47999C8.43562 8.69817 8.26061 8.96191 8.14676 9.25343C8.03291 9.54495 7.98287 9.85749 8 10.17C8.0627 10.9181 8.34443 11.6311 8.81 12.22C9.6622 13.4958 10.8301 14.5293 12.2 15.22C12.9185 15.6394 13.7535 15.8148 14.58 15.72C14.8552 15.6654 15.1159 15.5535 15.345 15.3915C15.5742 15.2296 15.7667 15.0212 15.91 14.78C16.0428 14.4856 16.0846 14.1583 16.03 13.84C15.94 13.74 15.81 13.69 15.61 13.59Z" fill="#ffffff"></path> </g></svg>
                </div>
                <div>
                  <span className="text-stone-300 text-sm font-medium block leading-tight">
                    WhatsApp
                  </span>
                  <span className="text-white font-bold text-base sm:text-[15px] block tracking-wide group-hover:text-[#c59b67] transition-colors">
                    {CONTACT.phoneDisplay}
                  </span>
                </div>
              </a>

              {/* Mail Us */}
              <a
                href={`mailto:${CONTACT.email}`}
                className="group flex items-center gap-3.5 hover:opacity-95 transition-all"
              >
                <div className="w-12 h-12 rounded-full bg-[#c59b67] flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="text-stone-300 text-sm font-medium block leading-tight">
                    Mail Us
                  </span>
                  <span className="text-white font-bold text-base sm:text-[15px] block tracking-wide group-hover:text-[#c59b67] transition-colors break-all">
                    {CONTACT.email}
                  </span>
                </div>
              </a>

              {/* More Inquiry */}
              <a
                href={`tel:${CONTACT.phoneTel}`}
                className="group flex items-center gap-3.5 hover:opacity-95 transition-all"
              >
                <div className="w-12 h-12 rounded-full bg-[#c59b67] flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="text-stone-300 text-sm font-medium block leading-tight">
                    More Inquiry
                  </span>
                  <span className="text-white font-bold text-base sm:text-[15px] block tracking-wide group-hover:text-[#c59b67] transition-colors">
                    {CONTACT.phoneDisplay}
                  </span>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Scroll to Top */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs sm:text-sm text-stone-400 gap-4">
          <p>© {year} Beyond Forever Earth. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <a
              href={LEGAL_LINKS.terms}
              className="hover:text-white transition-colors"
            >
              Terms & Conditions
            </a>
            <span>•</span>
            <a
              href={LEGAL_LINKS.privacy}
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </a>
          </div>

          {/* Scroll to Top Circle Button */}
          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            className="w-11 h-11 rounded-full border border-white/20 bg-white/5 hover:bg-white/15 text-stone-300 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-sm hover:border-amber-400/50"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
