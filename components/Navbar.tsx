'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { scrollTo, scrollToSection } from '../lib/lenis';
import { useNavigate, useRoute } from '../lib/router';
import { useSite } from './SiteProvider';
import { subscribeChrome } from '../lib/chrome';
import { CONTACT, SOCIAL_LINKS, whatsappLink } from '../lib/contact';
import {
  Search,
  Menu,
  X,
  Phone,
  ArrowRight,
  MapPin,
  Mail,
  Instagram,
  Facebook,
  Youtube,
  Linkedin,
  MessageCircle,
  ChevronRight,
  LogOut,
  UserRound,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { goPlan: onOpenPlanner, openContact: onOpenContact, openSearch: onOpenSearch, openLogin: onOpenLogin } = useSite();
  const { data: session, status } = useSession();
  const navigate = useNavigate();
  const route = useRoute();
  const [isScrolled, setIsScrolled] = useState(false);
  const [hideChrome, setHideChrome] = useState(false);

  // Pages that render their own sticky section nav ask the navbar to step away
  // while scrolling down, and to return as soon as the reader scrolls back up.
  useEffect(() => subscribeChrome((chrome) => setHideChrome(chrome.navHidden)), []);
  const [fullScreenMenuOpen, setFullScreenMenuOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [avatarFailed, setAvatarFailed] = useState(false);
  const accountMenuRef = useRef<HTMLDivElement>(null);
  // Cascading menu state: level-2 panel (About Us / Destinations) and level-3 region.
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [activeRegion, setActiveRegion] = useState<string | null>(null);
  // Section anchors only exist on the homepage; elsewhere link to the route instead.
  const homeHref = route === '/' ? '#home' : '/';

  useEffect(() => {
    const handleScroll = () => {
      const hero = document.getElementById('home');

      if (!hero) {
        setIsScrolled(window.scrollY > 40);
        return;
      }

      const rect = hero.getBoundingClientRect();
      const scrollableDistance = rect.height - window.innerHeight;
      const heroProgress =
        scrollableDistance > 0
          ? Math.min(1, Math.max(0, -rect.top / scrollableDistance))
          : 1;

      setIsScrolled(heroProgress >= 1);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  // Lock body scroll when full screen menu is active
  useEffect(() => {
    if (fullScreenMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [fullScreenMenuOpen]);

  // Reset cascading panels whenever the menu closes
  useEffect(() => {
    if (!fullScreenMenuOpen) {
      setActiveMenu(null);
      setActiveRegion(null);
    }
  }, [fullScreenMenuOpen]);

  const closeFullScreenMenu = () => {
    setFullScreenMenuOpen(false);
    setActiveMenu(null);
    setActiveRegion(null);
  };

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setFullScreenMenuOpen(false);
        setAccountMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close the account dropdown when clicking outside of it
  useEffect(() => {
    if (!accountMenuOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (accountMenuRef.current && !accountMenuRef.current.contains(e.target as Node)) {
        setAccountMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [accountMenuOpen]);

  // Reset the broken-image fallback whenever the user/session changes (e.g. after sign out/in)
  useEffect(() => {
    setAvatarFailed(false);
  }, [session?.user?.image, status]);

  const isAuthenticated = status === 'authenticated';
  const accountName = session?.user?.name ?? session?.user?.email ?? 'Member';
  const accountInitial = accountName.trim().charAt(0).toUpperCase() || 'M';

  const handleNavClick = (href: string) => {
    setFullScreenMenuOpen(false);
    if (route !== '/') {
      navigate('/');
      window.setTimeout(() => scrollToSection(href, { offset: -80 }), 450);
      return;
    }
    scrollTo(href, { offset: -80 });
  };

  // Cascading menu: level-1 items, level-2 flyouts (About Us / Destinations),
  // level-3 places per region. Sub-items are dummy (no routing).
  const MENU_ITEMS: {
    label: string;
    href?: string;
    key?: string;
    children?: { label: string; href: string }[];
    regions?: { name: string; places: string[] }[];
  }[] = [
    { label: 'Home', href: '#home' },
    {
      label: 'About Us',
      key: 'about',
      children: [
        { label: 'Who We Are', href: '/about#who-we-are' },
        { label: 'What We Do', href: '/about#what-we-do' },
        { label: 'Who Are We For', href: '/about#who-are-we-for' },
        { label: 'What to Expect', href: '/about#what-to-expect' },
        { label: 'How We Work', href: '/about#how-we-work' },
      ],
    },
    {
      label: 'Travel Itineraries',
      key: 'destinations',
      regions: [
        { name: 'Africa', places: ['Kenya', 'Tanzania', 'South Africa', 'Botswana', 'Morocco', 'Rwanda'] },
        { name: 'Asia', places: ['Japan', 'Maldives', 'Bali', 'Thailand', 'Singapore', 'Vietnam'] },
        { name: 'Europe', places: ['Italy', 'Switzerland', 'France', 'Greece', 'Spain', 'Portugal'] },
        { name: 'India', places: ['Rajasthan', 'Kerala', 'Ladakh', 'Goa', 'Himalayas'] },
      ],
    },
    { label: 'Create Bucket List', href: '/create-the-bucketlist' },
    { label: 'E-Shop', href: '/e-shop' },
  ];

  const solidHeader = isScrolled || route === '/enquiry' || route.startsWith('/account/bucket-lists');

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          hideChrome ? '-translate-y-full' : 'translate-y-0'
        } ${
          solidHeader
            ? 'bg-[#081726]/95 backdrop-blur-md shadow-lg py-3 sm:py-3.5 border-b border-white/10'
            : 'bg-gradient-to-b from-black/70 via-black/35 to-transparent py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Left Zone: Phone Number (desktop only, keeps the logo centered) */}
            <div className="hidden md:flex flex-1 items-center justify-start">
              <a
                href={`tel:${CONTACT.phoneTel}`}
                aria-label={`Call our 24/7 luxury concierge desk on ${CONTACT.phoneDisplay}`}
                className="hidden md:inline-flex items-center gap-2 text-stone-200 hover:text-[#c59b67] transition-colors py-1 group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c59b67] rounded-sm"
                title="Call our 24/7 Luxury Concierge Desk"
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-[#c59b67] group-hover:border-[#c59b67] group-hover:bg-[#c59b67]/10 transition-all shrink-0">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs sm:text-[13px] font-medium tracking-wider font-sans whitespace-nowrap">
                    {CONTACT.phoneDisplay}
                  </span>
                </div>
              </a>
            </div>

            {/* Center Zone: Logo Lockup */}
            <div className="shrink-0 flex items-center justify-center md:px-2">
               <a
                href={homeHref}
                onClick={(e) => {
                  e.preventDefault();
                  if (route !== '/') {
                    navigate('/');
                  } else {
                    scrollTo(0);
                  }
                }}
                className="flex items-center gap-2.5 sm:gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c59b67] rounded-sm"
                aria-label="Beyond Forever Earth Home"
              >
                {/* Monogram Box Icon */}
                <div>
              <img
                src="https://beyondforever.earth/assets/front/img/footer-logo.png"
                alt="Beyond Forever Earth"
                className={`object-contain transition-all duration-300 ${
                  solidHeader ? 'w-6 h-6 sm:w-9 sm:h-9' : 'w-8 h-8 sm:w-14 sm:h-14'
                }`}
              />
            </div>
                <div className="hidden sm:flex flex-col text-left">
                  <span className={`font-serif font-semibold tracking-[0.07em] text-white uppercase group-hover:text-[#c59b67] transition-all duration-300 ${
                    solidHeader ? 'text-xs sm:text-lg' : 'text-sm sm:text-2xl'
                  }`}>
                    Beyond
                  </span>
                  <span className={`tracking-[0.28em] text-stone-300 uppercase -mt-0.5 font-light transition-all duration-300 ${
                    solidHeader ? 'text-[8px] sm:text-[11px]' : 'text-[9px] sm:text-[15px]'
                  }`}>
                    Forever Earth
                  </span>
                </div>
              </a>
            </div>

            {/* Right Zone: Primary CTA, WhatsApp, Search & Menu */}
            <div className="flex-1 flex items-center justify-end gap-2 sm:gap-3">
              {/* WhatsApp Secondary CTA */}
              {/* <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp a travel specialist"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-white/30 flex items-center justify-center text-white/90 hover:text-white hover:border-[#c59b67] hover:bg-white/10 active:scale-95 transition-all focus-visible:outline-none"
              >
                <MessageCircle className="w-4 h-4" />
              </a> */}

              {/* Search Button */}
              <button
                onClick={onOpenSearch}
                aria-label="Search destinations"
                className="hidden md:flex w-9 h-9 rounded-full border border-white/30 items-center justify-center text-white/90 hover:text-white hover:border-[#c59b67] hover:bg-white/10 active:scale-95 transition-all cursor-pointer focus-visible:outline-none"
              >
                <Search className="w-4 h-4" />
              </button>

              {/* Persistent Primary CTA */}
              <a
                href='/create-the-bucketlist'
                className="h-8 sm:h-9 px-3 sm:px-5 rounded-full flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase text-[#081726] bg-gradient-to-r from-[#dfb27d] via-[#c59b67] to-[#b68b55] border border-[#f3e2c0]/70 shadow-[0_0_18px_rgba(197,155,103,0.35)] hover:shadow-[0_0_28px_rgba(197,155,103,0.6)] hover:from-[#e8c697] hover:via-[#d6aa75] hover:to-[#c59b67] active:scale-95 transition-all duration-300 cursor-pointer focus-visible:outline-none shrink-0"
              >
                <span className="whitespace-nowrap">create bucket list</span>
                <ArrowRight className="w-3.5 h-3.5 hidden sm:block" />
              </a>

              {/* Account / Sign in */}
              <div className="relative" ref={accountMenuRef}>
                {isAuthenticated ? (
                  <button
                    onClick={() => setAccountMenuOpen((prev) => !prev)}
                    aria-label="Open account menu"
                    aria-expanded={accountMenuOpen}
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border border-white/30 hover:border-[#c59b67] bg-white/10 text-white flex items-center justify-center transition-all cursor-pointer active:scale-95 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c59b67]"
                  >
                    {session?.user?.image && !avatarFailed ? (
                      <img
                        src={session.user.image}
                        alt={accountName}
                        referrerPolicy="no-referrer"
                        onError={() => setAvatarFailed(true)}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-xs font-semibold text-[#c59b67]">{accountInitial}</span>
                    )}
                  </button>
                ) : (
                  <button
                    onClick={onOpenLogin}
                    aria-label="Sign in or create an account"
                    className="h-8 sm:h-9 px-3 sm:px-4 rounded-full border border-white/30 hover:border-[#c59b67] hover:bg-white/10 text-white/90 hover:text-white text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase transition-all cursor-pointer active:scale-95 whitespace-nowrap focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c59b67]"
                  >
                    Sign In
                  </button>
                )}

                {isAuthenticated && accountMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-60 rounded-xl bg-[#081726] border border-white/15 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-1 duration-200">
                    <div className="px-4 py-3 border-b border-white/10">
                      <p className="text-sm text-white font-medium truncate">{accountName}</p>
                      {session?.user?.email && (
                        <p className="text-[11px] text-stone-400 truncate">{session.user.email}</p>
                      )}
                    </div>
                    <button
                      onClick={() => {
                        setAccountMenuOpen(false);
                        navigate('/account');
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-3 text-left text-xs font-medium tracking-wider uppercase text-stone-300 hover:text-[#c59b67] hover:bg-white/5 transition-colors cursor-pointer border-b border-white/10"
                    >
                      <UserRound className="w-4 h-4" />
                      <span>My Bucket Lists</span>
                    </button>
                    <button
                      onClick={() => {
                        setAccountMenuOpen(false);
                        signOut({ redirectTo: '/' });
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-3 text-left text-xs font-medium tracking-wider uppercase text-stone-300 hover:text-[#c59b67] hover:bg-white/5 transition-colors cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Hamburger Button */}
              <button
                onClick={() => {
                  setAccountMenuOpen(false);
                  setFullScreenMenuOpen(true);
                }}
                aria-label="Open full screen navigation menu"
                className="h-8 sm:h-9 px-2.5 sm:px-3.5 rounded-full border border-white/30 hover:border-[#c59b67] hover:bg-white/10 active:scale-95 flex items-center gap-2 text-white transition-all cursor-pointer group focus-visible:outline-none"
              >
                {/* <span className="hidden md:inline text-[11px] font-semibold tracking-widest uppercase text-stone-200 group-hover:text-[#c59b67] transition-colors font-sans">
                  Menu
                </span> */}
                <Menu className="w-4 h-4 text-white group-hover:text-[#c59b67] transition-colors" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Full-Screen Luxury Navigation Menu */}
      {fullScreenMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          data-lenis-prevent
          className="fixed inset-0 z-[100] bg-[#05101a] text-white overflow-y-auto animate-in fade-in duration-300 flex flex-col justify-between"
        >
          {/* Subtle warm amber radial glow overlay in background */}
          <div
            className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#c59b67]/10 rounded-full blur-[140px] pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute bottom-0 left-10 w-[500px] h-[500px] bg-[#0c2238]/60 rounded-full blur-[120px] pointer-events-none"
            aria-hidden="true"
          />

          {/* Full Screen Menu Top Header Bar */}
          <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between border-b border-white/10">
            {/* Left: Phone inside full screen */}
            <a
              href={`tel:${CONTACT.phoneTel}`}
              className="inline-flex items-center gap-2 text-stone-300 hover:text-[#c59b67] transition-colors text-xs font-medium tracking-wider"
            >
              <Phone className="w-3.5 h-3.5 text-[#c59b67]" />
              <span className="hidden sm:block">{CONTACT.phoneDisplay}</span>
            </a>

            {/* Center: Monogram inside full screen */}
             <a
                href={homeHref}
                onClick={(e) => {
                  e.preventDefault();
                  setFullScreenMenuOpen(false);
                  if (route !== '/') {
                    navigate('/');
                  } else {
                    scrollTo(0);
                  }
                }}
                className="flex items-center gap-2.5 sm:gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c59b67] rounded-sm"
                aria-label="Beyond Forever Earth Home"
              >
                {/* Monogram Box Icon */}
                <div>
              <img
                src="https://beyondforever.earth/assets/front/img/footer-logo.png"
                alt="Beyond Forever Earth"
                className={`object-contain transition-all duration-300 ${
                  solidHeader ? 'w-6 h-6 sm:w-9 sm:h-9' : 'w-8 h-8 sm:w-14 sm:h-14'
                }`}
              />
            </div>
                <div className="flex flex-col text-left">
                  <span className={`font-serif font-semibold tracking-[0.22em] text-white uppercase group-hover:text-[#c59b67] transition-all duration-300 ${
                    solidHeader ? 'text-xs sm:text-lg' : 'text-sm sm:text-2xl'
                  }`}>
                    Beyond
                  </span>
                  <span className={`tracking-[0.28em] text-stone-300 uppercase -mt-0.5 font-light transition-all duration-300 ${
                    solidHeader ? 'text-[8px] sm:text-[11px]' : 'text-[9px] sm:text-[15px]'
                  }`}>
                    Forever Earth
                  </span>
                </div>
              </a>
            {/* Right: Close Button */}
            <button
              onClick={() => setFullScreenMenuOpen(false)}
              aria-label="Close navigation menu"
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/30 hover:border-[#c59b67] hover:bg-white/10 text-white transition-all cursor-pointer group"
            >
              <span className="hidden sm:block text-[11px] font-semibold tracking-widest uppercase text-stone-300 group-hover:text-[#c59b67]">
                Close
              </span>
              <X className="w-4 h-4 text-white group-hover:rotate-90 transition-transform duration-200" />
            </button>
          </div>

          {/* Full Screen Menu Main Body */}
          <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 flex-1 flex flex-col justify-center">
            <div className="flex flex-col lg:flex-row lg:flex-wrap lg:justify-between lg:items-center gap-12 lg:gap-12">
              {/* Left Column: Cascading Navigation */}
              <div className="shrink-0 space-y-4 sm:space-y-6">
                <div className="flex items-center gap-2 mb-2 sm:mb-4">
                  <span className="w-5 h-[1px] bg-[#c59b67]" />
                  <span className="text-[10px] sm:text-[11px] tracking-[0.28em] font-semibold text-[#c59b67] uppercase font-sans">
                    CURATED NAVIGATION
                  </span>
                </div>

                <div className="flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-8">
                  {/* Level 1: Main menu */}
                  <nav className="flex flex-col space-y-2 sm:space-y-3 shrink-0 w-full lg:w-[340px]">
                    {MENU_ITEMS.map((item) => {
                      const hasPanel = Boolean(item.key);
                      const isActive = Boolean(item.key && activeMenu === item.key);
                      return (
                        <div key={item.label}>
                        <button
                          key={item.label}
                          onMouseEnter={() => {
                            if (item.key) {
                              setActiveMenu(item.key);
                              if (item.key !== 'destinations') setActiveRegion(null);
                            } else {
                              setActiveMenu(null);
                              setActiveRegion(null);
                            }
                          }}
                          onClick={() => {
                            if (item.key) {
                              const key = item.key;
                              // Toggle the flyout (tap support on touch devices)
                              setActiveMenu((prev) => (prev === key ? null : key));
                              if (key !== 'destinations') setActiveRegion(null);
                              return;
                            }
                            closeFullScreenMenu();
                            if (item.href?.startsWith('/')) {
                              navigate(item.href);
                              return;
                            }
                            if (item.href === 'plan') {
                              onOpenPlanner();
                              return;
                            }
                            if (item.href) handleNavClick(item.href);
                          }}
                          className={`group flex items-center justify-between gap-4 text-left py-1.5 transition-all cursor-pointer focus-visible:outline-none lg:whitespace-nowrap ${
                            isActive ? 'translate-x-1' : ''
                          }`}
                        >
                          <span className="flex items-baseline gap-4 sm:gap-5">
                            <span className="font-mono text-xs sm:text-sm text-[#c59b67] tracking-wider tabular-nums font-light opacity-80 group-hover:opacity-100 transition-all">
                              {String(MENU_ITEMS.indexOf(item) + 1).padStart(2, '0')}
                            </span>
                            <span
                              className={`font-serif text-2xl sm:text-3xl tracking-tight transition-all ${
                                isActive
                                  ? 'text-[#c59b67]'
                                  : 'text-stone-200 group-hover:text-white group-hover:translate-x-2'
                              }`}
                            >
                              {item.label}
                            </span>
                          </span>
                          {hasPanel && (
                            <ChevronRight
                              className={`w-4 h-4 shrink-0 transition-all duration-200 ${
                                isActive
                                  ? 'text-[#c59b67] rotate-90 opacity-100'
                                  : 'text-stone-500 opacity-60 group-hover:text-[#c59b67]'
                              }`}
                            />
                          )}
                        </button>

                        {/* Mobile: normal dropdown under the item (desktop uses side panels) */}
                        {item.key && isActive && (
                          <div className="lg:hidden mt-2 mb-3 ml-9 pl-4 border-l border-white/15 space-y-1">
                            {item.key === 'about' &&
                              item.children?.map((child) => (
                                <button
                                  key={child.href}
                                  type="button"
                                  onClick={() => {
                                    setFullScreenMenuOpen(false);
                                    navigate(child.href);
                                  }}
                                  className="block w-full text-left text-base sm:text-lg text-stone-300 hover:text-[#c59b67] py-1 cursor-pointer"
                                >
                                  {child.label}
                                </button>
                              ))}

                            {item.key === 'destinations' &&
                              item.regions?.map((region) => (
                                <div key={region.name}>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setActiveRegion((prev) => (prev === region.name ? null : region.name))
                                    }
                                    className="w-full flex items-center justify-between text-left text-base sm:text-lg text-stone-300 hover:text-[#c59b67] py-1 cursor-pointer"
                                  >
                                    <span>{region.name}</span>
                                    <ChevronRight
                                      className={`w-3.5 h-3.5 transition-transform ${
                                        activeRegion === region.name ? 'rotate-90 text-[#c59b67]' : ''
                                      }`}
                                    />
                                  </button>

                                  {activeRegion === region.name && (
                                    <div className="mt-1 ml-3 pl-3 border-l border-[#c59b67]/40 space-y-0.5">
                                      {region.places.map((place) => (
                                        <button
                                          key={place}
                                          type="button"
                                          className="block text-left text-sm text-stone-300 hover:text-[#c59b67] py-1 cursor-pointer"
                                        >
                                          {place}
                                        </button>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              ))}
                          </div>
                        )}
                        </div>
                      );
                    })}
                  </nav>

                  {/* Level 2: Flyout panel (About Us / Destinations) */}
                  {activeMenu && (
                    <div
                      key={activeMenu}
                      className="hidden lg:block animate-in fade-in slide-in-from-right-2 duration-200 border-l border-white/15 pl-6 sm:pl-8 py-1.5"
                    >
                      {activeMenu === 'about' && (
                        <div>
                          <span className="text-[9px] sm:text-[10px] tracking-[0.24em] uppercase text-[#c59b67] font-semibold font-sans block mb-4 sm:mb-5">About Us</span>
                          <ul className="flex flex-col space-y-2 sm:space-y-3">
                            {MENU_ITEMS.find((m) => m.key === 'about')?.children?.map((child) => (
                              <li key={child.href}>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setFullScreenMenuOpen(false);
                                    navigate(child.href);
                                  }}
                                  className="group flex items-baseline text-left py-1.5 cursor-pointer"
                                >
                                  <span className="font-serif text-2xl sm:text-3xl text-stone-200 tracking-tight group-hover:text-[#c59b67] group-hover:translate-x-2 transition-all">{child.label}</span>
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {activeMenu === 'destinations' && (
                        <div>
                          <span className="text-[9px] sm:text-[10px] tracking-[0.24em] uppercase text-[#c59b67] font-semibold font-sans block mb-4 sm:mb-5">Destinations</span>
                          <ul className="flex flex-col space-y-2 sm:space-y-3">
                            {MENU_ITEMS.find((m) => m.key === 'destinations')?.regions?.map((region) => {
                              const isRegionActive = activeRegion === region.name;
                              return (
                                <li key={region.name}>
                                  <button
                                    type="button"
                                    onMouseEnter={() => setActiveRegion(region.name)}
                                    onClick={() => setActiveRegion((prev) => (prev === region.name ? null : region.name))}
                                    className="group w-full flex items-center justify-between gap-4 text-left py-1.5 cursor-pointer"
                                  >
                                    <span className={`font-serif text-2xl sm:text-3xl tracking-tight group-hover:translate-x-2 transition-all ${isRegionActive ? 'text-[#c59b67]' : 'text-stone-200 group-hover:text-[#c59b67]'}`}>{region.name}</span>
                                    <ChevronRight className={`w-4 h-4 shrink-0 transition-all ${isRegionActive ? 'text-[#c59b67] rotate-90 opacity-100' : 'text-stone-500 opacity-60 group-hover:text-[#c59b67]'}`} />
                                  </button>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Level 3: Places for the hovered region */}
                  {activeMenu === 'destinations' && activeRegion && (
                    <div
                      key={activeRegion}
                      className="hidden lg:block animate-in fade-in slide-in-from-right-2 duration-200 border-l border-[#c59b67]/40 pl-6 sm:pl-8 py-1.5"
                    >
                      <span className="text-[9px] sm:text-[10px] tracking-[0.24em] uppercase text-[#c59b67] font-semibold font-sans block mb-4 sm:mb-5">{activeRegion}</span>
                      <ul className="flex flex-col space-y-2 sm:space-y-3">
                        {MENU_ITEMS.find((m) => m.key === 'destinations')?.regions?.find((r) => r.name === activeRegion)?.places.map((place) => (
                          <li key={place}>
                            <button type="button" className="group flex items-center gap-3 text-left py-1.5 cursor-pointer">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#c59b67]/70 shrink-0" />
                              <span className="font-serif text-2xl sm:text-3xl text-stone-200 tracking-tight group-hover:text-[#c59b67] group-hover:translate-x-2 transition-all">{place}</span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Concierge Desk Card & Direct Actions */}
              <div className="w-full lg:flex-1 lg:max-w-[500px] lg:min-w-[340px] flex flex-col space-y-6">
                <div className="bg-[#081726]/80 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/10 shadow-2xl space-y-6">
                  <div>
                    <span className="text-[10px] tracking-[0.25em] text-[#c59b67] uppercase font-semibold block mb-1">
                      PRIVATE ADVISORY
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl font-normal text-white">
                      Bespoke Travel Concierge
                    </h3>
                    <p className="text-xs text-stone-300 font-light leading-relaxed mt-2">
                      Connect directly with our senior destination curators to design a private, tailor-made itinerary.
                    </p>
                  </div>

                  {/* Contact details */}
                  <div className="space-y-3 text-xs text-stone-300 pt-2 border-t border-white/10">
                    <a
                      href={`tel:${CONTACT.phoneTel}`}
                      className="flex items-center gap-3 hover:text-[#c59b67] transition-colors"
                    >
                      <div className="w-7 h-7 rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-[#c59b67]">
                        <Phone className="w-3.5 h-3.5" />
                      </div>
                      <span>{CONTACT.phoneDisplay}</span>
                    </a>

                    {/* <a
                      href={whatsappLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 hover:text-[#c59b67] transition-colors"
                    >
                      <div className="w-7 h-7 rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-[#c59b67]">
                        <MessageCircle className="w-3.5 h-3.5" />
                      </div>
                      <span>WhatsApp a Travel Specialist</span>
                    </a> */}

                    <a
                      href={`mailto:${CONTACT.email}`}
                      className="flex items-center gap-3 hover:text-[#c59b67] transition-colors"
                    >
                      <div className="w-7 h-7 rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-[#c59b67]">
                        <Mail className="w-3.5 h-3.5" />
                      </div>
                      <span>{CONTACT.email}</span>
                    </a>

                    <div className="flex items-center gap-3 text-stone-400">
                      <div className="w-7 h-7 rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-[#c59b67]">
                        <MapPin className="w-3.5 h-3.5" />
                      </div>
                      <span>Worli Shivaji Nagar, Worli, Mumbai, Maharashtra 400025</span>
                    </div>
                  </div>

                  {/* Signed-in member strip */}
                  {isAuthenticated && (
                    <div className="flex items-center gap-3 pt-3 border-t border-white/10">
                      <div className="w-8 h-8 rounded-full overflow-hidden border border-white/20 bg-white/10 flex items-center justify-center shrink-0">
                        {session?.user?.image ? (
                          <img
                            src={session.user.image}
                            alt={accountName}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-xs font-semibold text-[#c59b67]">{accountInitial}</span>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm text-white truncate">{accountName}</p>
                        {session?.user?.email && (
                          <p className="text-[11px] text-stone-400 truncate">{session.user.email}</p>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setFullScreenMenuOpen(false);
                          navigate('/account');
                        }}
                        className="shrink-0 text-[10px] font-semibold tracking-wider uppercase text-[#c59b67] hover:text-[#e8c697] transition-colors cursor-pointer"
                      >
                        My Bucket Lists
                      </button>
                    </div>
                  )}

                  {/* Actions inside menu */}
                  <div className="pt-2 flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => {
                        setFullScreenMenuOpen(false);
                        onOpenPlanner();
                      }}
                      className="py-3 px-4 bg-[#c59b67] hover:bg-[#b68b55] text-[#081726] text-xs font-semibold tracking-wider uppercase rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Travel Quote</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    {isAuthenticated ? (
                      <button
                        onClick={() => {
                          setFullScreenMenuOpen(false);
                          signOut({ redirectTo: '/' });
                        }}
                        className="py-3 px-4 border border-white/25 hover:border-white hover:bg-white/10 text-white text-xs font-medium tracking-wider uppercase rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        Sign Out
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setFullScreenMenuOpen(false);
                          onOpenLogin();
                        }}
                        className="py-3 px-4 border border-white/25 hover:border-white hover:bg-white/10 text-white text-xs font-medium tracking-wider uppercase rounded-xl transition-all cursor-pointer"
                      >
                        Create Account
                      </button>
                    )}
                  </div>
                </div>

                {/* Social Channels Strip */}
                <div className="flex items-center justify-between px-2 text-xs text-stone-400">
                  <span className="text-[11px] tracking-wider uppercase text-stone-400">
                    Follow the Journal
                  </span>
                  <div className="flex items-center space-x-3">
                    <a
                      href={SOCIAL_LINKS.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Beyond Forever Earth on Instagram"
                      className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-stone-300 hover:text-white hover:border-[#c59b67] hover:bg-white/5 transition-colors"
                    >
                      <Instagram className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href={SOCIAL_LINKS.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Beyond Forever Earth on Facebook"
                      className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-stone-300 hover:text-white hover:border-[#c59b67] hover:bg-white/5 transition-colors"
                    >
                      <Facebook className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href={SOCIAL_LINKS.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Beyond Forever Earth on YouTube"
                      className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-stone-300 hover:text-white hover:border-[#c59b67] hover:bg-white/5 transition-colors"
                    >
                      <Youtube className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href={SOCIAL_LINKS.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Beyond Forever Earth on LinkedIn"
                      className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-stone-300 hover:text-white hover:border-[#c59b67] hover:bg-white/5 transition-colors"
                    >
                      <Linkedin className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Full Screen Menu Bottom Bar */}
          <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-400 gap-2">
            <span>© 2026 Beyond Forever Earth. All rights reserved.</span>
            <div className="flex items-center gap-4">
              <span>Bespoke Luxury Travel Planners</span>
              <span>·</span>
              <button
                onClick={() => {
                  setFullScreenMenuOpen(false);
                  onOpenPlanner();
                }}
                className="text-[#c59b67] hover:underline"
              >
                Start Your Itinerary
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
