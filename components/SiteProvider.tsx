'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { SessionProvider } from 'next-auth/react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { PlannerModal } from './PlannerModal';
import { PackageModal } from './PackageModal';
import { ContactModal } from './ContactModal';
import { SearchModal } from './SearchModal';
import { LoginModal } from './LoginModal';
import { HomeAnnouncementModal } from './HomeAnnouncementModal';
import { TravelPackage } from './PackagesSection';
import { getLenis, initLenis, scrollToSection } from '../lib/lenis';
import { PLAN_PATH, useRoute } from '../lib/router';

interface SiteContextValue {
  /** Primary CTA: scroll to the enquiry form on the plan page, or navigate there. */
  goPlan: () => void;
  openContact: () => void;
  openSearch: () => void;
  openLogin: () => void;
  openPackage: (pkg: TravelPackage) => void;
  openPlanner: (destination?: string, travelType?: string) => void;
}

const SiteContext = createContext<SiteContextValue | null>(null);

export function useSite() {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error('useSite must be used within SiteProvider');
  return ctx;
}

export const SiteProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const route = useRoute();

  const [plannerOpen, setPlannerOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [homePopupOpen, setHomePopupOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<TravelPackage | null>(null);
  const [prefilledDestination, setPrefilledDestination] = useState('');
  const [prefilledTravelType, setPrefilledTravelType] = useState('');

  useEffect(() => {
    initLenis();
  }, []);

  // Auto-open the homepage announcement once per homepage visit (after a short delay)
  useEffect(() => {
    if (route !== '/') {
      setHomePopupOpen(false);
      return;
    }
    const timer = window.setTimeout(() => setHomePopupOpen(true), 1200);
    return () => window.clearTimeout(timer);
  }, [route]);

  const anyModalOpen =
    plannerOpen ||
    contactOpen ||
    searchOpen ||
    loginOpen ||
    homePopupOpen ||
    selectedPackage !== null;

  useEffect(() => {
    const lenis = getLenis();
    if (!lenis) return;
    if (anyModalOpen) {
      lenis.stop();
    } else {
      lenis.start();
    }
  }, [anyModalOpen]);

  const openPlanner = (destination = '', travelType = '') => {
    setPrefilledDestination(destination);
    setPrefilledTravelType(travelType);
    setPlannerOpen(true);
  };

  const openPackage = (pkg: TravelPackage) => setSelectedPackage(pkg);

  const goPlan = () => {
    if (route === PLAN_PATH) {
      scrollToSection('#enquiry', { offset: -96 });
      return;
    }
    router.push(PLAN_PATH);
  };

  // The admin panel renders its own layout (no public chrome/modals).
  const isAdminRoute = route === '/admin' || route.startsWith('/admin/');

  return (
    <SessionProvider>
      <SiteContext.Provider
        value={{ goPlan, openContact: () => setContactOpen(true), openSearch: () => setSearchOpen(true), openLogin: () => setLoginOpen(true), openPackage, openPlanner }}
      >
        {!isAdminRoute && <Navbar />}

        <main className="flex-1">{children}</main>

        {!isAdminRoute && <Footer />}

        {/* Shared modals */}
        {!isAdminRoute && (
          <>
            <PlannerModal
              isOpen={plannerOpen}
              onClose={() => setPlannerOpen(false)}
              initialDestination={prefilledDestination}
              initialTravelType={prefilledTravelType}
            />

            <PackageModal
              pkg={selectedPackage}
              onClose={() => setSelectedPackage(null)}
              onBookNow={(pkg) => {
                setSelectedPackage(null);
                openPlanner(pkg.title);
              }}
            />

            <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />

            <SearchModal
              isOpen={searchOpen}
              onClose={() => setSearchOpen(false)}
              onSelectPackage={openPackage}
            />

            <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} />

            <HomeAnnouncementModal isOpen={homePopupOpen} onClose={() => setHomePopupOpen(false)} />
          </>
        )}
      </SiteContext.Provider>
    </SessionProvider>
  );
};

// Re-exported so the layout can compose chrome + modals in one wrapper.
export const SiteChrome: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <SiteProvider>{children}</SiteProvider>;
};

export { Navbar, Footer };
