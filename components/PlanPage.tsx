'use client';

import React, { useEffect, useState } from 'react';
import { JourneyEnquiryForm } from './EnquiryForm';

export const PlanPage: React.FC = () => {
  const [initialDestination, setInitialDestination] = useState('');
  const [initialTravelType, setInitialTravelType] = useState('');

  useEffect(() => {
    const previousTitle = document.title;
    document.title = 'Enquiry | Beyond Forever Earth';
    // Read query params after mount (e.g. /enquiry?journey=...&style=...)
    const params = new URLSearchParams(window.location.search);
    setInitialDestination(params.get('journey') ?? '');
    setInitialTravelType(params.get('style') ?? '');
    return () => {
      document.title = previousTitle;
    };
  }, []);

  return (
    <div className="bg-[#FBFAF7]">
      {/* Enquiry form */}
      <section id="enquiry" className="pt-28 sm:pt-32 lg:pt-10 ">
        <div className="max-w-7xl mx-auto ">
          <JourneyEnquiryForm
            initialDestination={initialDestination}
            initialTravelType={initialTravelType}
          />
        </div>
      </section>
    </div>
  );
};
