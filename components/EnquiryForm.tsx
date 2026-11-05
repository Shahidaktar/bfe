import React, { useEffect, useRef, useState } from 'react';
import { Check, ArrowRight, ChevronLeft, User, MapPin, Luggage, Sparkles } from 'lucide-react';

interface JourneyEnquiryFormProps {
  initialDestination?: string;
  initialTravelType?: string;
  onDone?: () => void;
}

type Step = 1 | 2 | 3 | 4;

const DESTINATION_OPTIONS = [
  'Maldives',
  'Kenya',
  'Tanzania',
  'South Africa',
  'Botswana',
  'Morocco',
  'Rwanda',
  'Japan',
  'Thailand',
  'Bali',
  'Singapore',
  'Vietnam',
  'Italy',
  'Switzerland',
  'France',
  'Greece',
  'Spain',
  'Portugal',
  'India - Rajasthan',
  'India - Kerala',
  'India - Ladakh',
  'India - Goa',
  'India - Himalayas',
  'Somewhere else / not decided yet',
];

const TRAVELLER_OPTIONS = [
  'Solo traveller',
  'Couple',
  'Family with children',
  'Family / group of 6 or more',
  'Friends group',
  'Business travel',
];

const YES_NO_NOT_SURE = ['Yes', 'No', 'Not sure yet'];

const TRANSPORT_OPTIONS = ['Private car', 'SIC (shared transfers)', 'Both private and SIC', 'Not required'];

const ROOM_VIEW_OPTIONS = [
  'Balcony',
  'Sea view',
  'Garden view',
  'Pool view',
  'City view',
  'Mountain view',
  'No preference',
];

const BEDDING_OPTIONS = ['King bed', 'Queen bed', 'Twin beds', 'As per hotel availability'];

const EXPERIENCE_OPTIONS = [
  'Adult Only',
  'Family Friendly',
  'Honeymoon',
  'Cultural Immersion',
  'Shopping',
  'Tours / Excursions',
  'Museums / Historic',
];

const OTHER_SERVICES_OPTIONS = ['Meals - Lunch / Dinner', 'Veg / Non-Veg'];

const STEP_META: { id: Step; title: string; copy: string; icon: typeof User }[] = [
  {
    id: 1,
    title: 'Who is this journey for?',
    copy: 'Tell us who we are curating this experience for, and how best to reach you.',
    icon: User,
  },
  {
    id: 2,
    title: 'Where shall we look?',
    copy: 'Select the landscape that resonates with your current state of mind.',
    icon: MapPin,
  },
  {
    id: 3,
    title: 'How shall it unfold?',
    copy: 'Hotels, entry tickets, transport — arranged privately, exactly as you prefer.',
    icon: Luggage,
  },
  {
    id: 4,
    title: 'The finishing touches.',
    copy: 'Room views, bedding and the small details that make it unmistakably yours.',
    icon: Sparkles,
  },
];

const field =
  'w-full bg-transparent border border-stone-300 rounded-md px-4 sm:px-5 py-4 sm:py-[18px] text-base sm:text-[17px] text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-[#081726] transition-colors';
const labelClass =
  'block text-[10px] tracking-[0.18em] uppercase text-stone-500 font-semibold mb-2 font-sans';
const errorClass = 'mt-1.5 text-xs text-red-600';
const chip =
  'flex items-center gap-2.5 px-4 py-3 border border-stone-200 rounded-md text-sm text-stone-700 hover:border-[#c59b67] has-checked:border-[#c59b67] has-checked:bg-[#c59b67]/5 cursor-pointer transition-colors select-none';
const withCurrentValue = (options: string[], value: string) =>
  value && !options.includes(value) ? [value, ...options] : options;

const StepProgressLine: React.FC<{ progress: number }> = ({ progress }) => (
  <div
    className="fixed top-0 left-0 right-0 z-[60] h-[3px] bg-white/10 pointer-events-none"
    aria-hidden="true"
  >
    <div
      className="h-full bg-gradient-to-r from-[#dfb27d] via-[#c59b67] to-[#b68b55] transition-[width] duration-500 ease-out"
      style={{ width: `${progress}%` }}
    />
  </div>
);

export const JourneyEnquiryForm: React.FC<JourneyEnquiryFormProps> = ({
  initialDestination = '',
  initialTravelType = '',
  onDone,
}) => {
  const [step, setStep] = useState<Step>(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  // Initialised on mount in useEffect; Date.now() must not evaluate during prerender.
  const stepEnteredAt = useRef(0);

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const [destination, setDestination] = useState(initialDestination);
  const [citiesToCover, setCitiesToCover] = useState('');
  const [departureCity, setDepartureCity] = useState('');
  const [arrivalCity, setArrivalCity] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');

  const [travellers, setTravellers] = useState('');
  const [hotelBreakfast, setHotelBreakfast] = useState('');
  const [sightseeing, setSightseeing] = useState('');
  const [visa, setVisa] = useState('');
  const [transport, setTransport] = useState('');
  const [roomView, setRoomView] = useState('');
  const [bedding, setBedding] = useState('');

  const initialExperiences = EXPERIENCE_OPTIONS.includes(initialTravelType)
    ? [initialTravelType]
    : [];
  const [experiences, setExperiences] = useState<string[]>(initialExperiences);
  const [otherServices, setOtherServices] = useState<string[]>([]);
  const [travelInsurance, setTravelInsurance] = useState<'Yes' | 'No' | ''>('');
  const [saveDetails, setSaveDetails] = useState(true);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Record when each step is entered so a fast second click (double-click) on the
  // Continue button cannot land on the Submit button that replaces it.
  useEffect(() => {
    stepEnteredAt.current = Date.now();
  }, [step]);

  const toggleInArray = (list: string[], value: string) =>
    list.includes(value) ? list.filter((item) => item !== value) : [...list, value];

  const validateStep = () => {
    const next: Record<string, string> = {};

    if (step === 1) {
      if (!fullName.trim()) next.fullName = 'Please enter your full name.';
      if (!email.trim()) {
        next.email = 'Please enter your email address.';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
        next.email = 'Please enter a valid email address.';
      }
    }

    if (step === 2) {
      if (!destination.trim()) next.destination = 'Please choose a destination.';
      if (departureDate && returnDate && new Date(returnDate) < new Date(departureDate)) {
        next.returnDate = 'Return date cannot be before the departure date.';
      }
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const goNext = () => {
    if (!validateStep()) return;
    setStep((prev) => (prev < 4 ? ((prev + 1) as Step) : prev));
  };

  const goBack = () => setStep((prev) => (prev > 1 ? ((prev - 1) as Step) : prev));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 4) {
      goNext();
      return;
    }
    if (Date.now() - stepEnteredAt.current < 500) return;
    if (!validateStep()) return;

    setSaving(true);
    setSubmitError('');
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          phone,
          email,
          destination,
          citiesToCover,
          departureCity,
          arrivalCity,
          departureDate,
          returnDate,
          travellers,
          hotelBreakfast,
          sightseeing,
          visa,
          transport,
          roomView,
          bedding,
          experiences,
          otherServices,
          travelInsurance,
          saveDetails,
        }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error ?? 'Could not save your enquiry. Please try again.');
      }

      setIsSubmitted(true);
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : 'Could not save your enquiry. Please try again.'
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDone = () => {
    setIsSubmitted(false);
    setStep(1);
    setErrors({});
    onDone?.();
  };

  if (isSubmitted) {
    return (
      <div className="w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-24">
        <StepProgressLine progress={100} />
        <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-stone-200 shadow-sm px-6 sm:px-12 py-14 sm:py-20 text-center">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border border-[#c59b67] flex items-center justify-center mx-auto mb-7 sm:mb-8">
            <Check className="w-6 h-6 sm:w-7 sm:h-7 text-[#b68b55] stroke-[2.25]" />
          </div>
          <h2 className="font-serif italic text-3xl sm:text-4xl text-[#081726] tracking-tight font-normal">
            We have your brief.
          </h2>
          <p className="mt-5 text-sm sm:text-base text-stone-500 max-w-md mx-auto leading-relaxed">
            Thank you{fullName ? `, ${fullName}` : ''}. A dedicated travel designer will return to
            you within one business day.
          </p>
          <button
            onClick={handleDone}
            className="mt-10 inline-flex items-center gap-2 text-[11px] sm:text-xs font-semibold tracking-[0.28em] uppercase text-[#081726] hover:text-[#b68b55] transition-colors cursor-pointer"
          >
            <span>Return</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  const meta = STEP_META[step - 1];
  const StepIcon = meta.icon;
  const completedProgress = ((step - 1) / STEP_META.length) * 100;

  return (
    <form
      onSubmit={handleSubmit}
      id="enquiry-form"
      className="w-full bg-[#FBFAF7] overflow-x-clip"
    >
      {step > 1 && <StepProgressLine progress={completedProgress} />}

      <div className="grid lg:grid-cols-[minmax(0,44%)_1fr]">
        {/* Left panel — the step brief */}
        <aside className="relative bg-[#FBFAF7] px-7 sm:px-10 lg:px-12 xl:px-14 pt-9 sm:pt-12 lg:pt-28 xl:pt-40 pb-6 lg:pb-16 xl:pb-40 flex flex-col border-b lg:border-b-0 lg:border-r border-stone-200/80 lg:sticky lg:top-0 lg:h-screen lg:self-start lg:overflow-y-auto">
          <span className="text-[10px] tracking-[0.32em] uppercase text-stone-400 font-sans font-semibold">
            Travel Qoute
          </span>
          <div className="mt-10 lg:mt-16">
            {/* <StepIcon className="w-6 h-6 lg:w-7 lg:h-7 text-[#081726]" strokeWidth={1.5} /> */}
            <h2 className="mt-5 lg:mt-7 font-serif italic text-4xl sm:text-5xl xl:text-[54px] leading-[1.08] tracking-tight text-[#081726] max-w-md">
              {meta.title}
            </h2>
            <p className="mt-5 text-sm sm:text-[15px] text-stone-500 leading-relaxed max-w-xs">
              {meta.copy}
            </p>
          </div>

          <div className="hidden lg:flex mt-auto pt-16 items-center gap-3">
            <span className="text-[10px] tracking-[0.32em] uppercase text-stone-400 font-sans">
              Beyond Forever Earth
            </span>
            <span className="w-6 h-px bg-[#c59b67]" aria-hidden="true" />
          </div>
        </aside>

        {/* Right panel — the fields */}
        <div className="relative bg-[#FBFAF7] px-6 sm:px-10 lg:px-12 xl:px-16 py-9 sm:py-12 lg:py-24 xl:py-40 flex flex-col">
          <div key={step} className="animate-in fade-in slide-in-from-right-2 duration-300 flex-1">
            {step === 1 && (
              <div className="space-y-5 sm:space-y-6">
                <div>
                  <label htmlFor="enquiry-name" className={labelClass}>
                    Full Name *
                  </label>
                  <input
                    id="enquiry-name"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Your name"
                    className={field}
                  />
                  {errors.fullName && <p className={errorClass}>{errors.fullName}</p>}
                </div>
                <div>
                  <label htmlFor="enquiry-phone" className={labelClass}>
                    Phone
                  </label>
                  <input
                    id="enquiry-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98923 44001"
                    className={field}
                  />
                </div>
                <div>
                  <label htmlFor="enquiry-email" className={labelClass}>
                    Email Address *
                  </label>
                  <input
                    id="enquiry-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className={field}
                  />
                  {errors.email && <p className={errorClass}>{errors.email}</p>}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-5 sm:space-y-6">
                <div>
                  <label htmlFor="enquiry-destination" className={labelClass}>
                    Destination *
                  </label>
                  <select
                    id="enquiry-destination"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className={field}
                  >
                    <option value="">Select destination</option>
                    {withCurrentValue(DESTINATION_OPTIONS, destination).map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  {errors.destination && <p className={errorClass}>{errors.destination}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="enquiry-cities" className={labelClass}>
                      Cities to Cover
                    </label>
                    <input
                      id="enquiry-cities"
                      type="text"
                      value={citiesToCover}
                      onChange={(e) => setCitiesToCover(e.target.value)}
                      placeholder="Cities to cover"
                      className={field}
                    />
                  </div>
                  <div>
                    <label htmlFor="enquiry-departure-city" className={labelClass}>
                      Departure City
                    </label>
                    <input
                      id="enquiry-departure-city"
                      type="text"
                      value={departureCity}
                      onChange={(e) => setDepartureCity(e.target.value)}
                      placeholder="Departure city"
                      className={field}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="enquiry-arrival-city" className={labelClass}>
                      Arrival City
                    </label>
                    <input
                      id="enquiry-arrival-city"
                      type="text"
                      value={arrivalCity}
                      onChange={(e) => setArrivalCity(e.target.value)}
                      placeholder="Arrival city"
                      className={field}
                    />
                  </div>
                  <div>
                    <label htmlFor="enquiry-departure-date" className={labelClass}>
                      Departure Date &amp; Time
                    </label>
                    <input
                      id="enquiry-departure-date"
                      type="datetime-local"
                      value={departureDate}
                      onChange={(e) => setDepartureDate(e.target.value)}
                      className={field}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="enquiry-return-date" className={labelClass}>
                    Return Date &amp; Time
                  </label>
                  <input
                    id="enquiry-return-date"
                    type="datetime-local"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    className={field}
                  />
                  {errors.returnDate && <p className={errorClass}>{errors.returnDate}</p>}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-5 sm:space-y-6">
                <div>
                  <label htmlFor="enquiry-travellers" className={labelClass}>
                    Who will be Travelling
                  </label>
                  <select
                    id="enquiry-travellers"
                    value={travellers}
                    onChange={(e) => setTravellers(e.target.value)}
                    className={field}
                  >
                    <option value="">Select</option>
                    {TRAVELLER_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="enquiry-hotel" className={labelClass}>
                    Hotel with Breakfast
                  </label>
                  <select
                    id="enquiry-hotel"
                    value={hotelBreakfast}
                    onChange={(e) => setHotelBreakfast(e.target.value)}
                    className={field}
                  >
                    <option value="">Select</option>
                    {YES_NO_NOT_SURE.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="enquiry-sightseeing" className={labelClass}>
                    Sightseeing (Entry Tickets)
                  </label>
                  <input
                    id="enquiry-sightseeing"
                    type="text"
                    value={sightseeing}
                    onChange={(e) => setSightseeing(e.target.value)}
                    placeholder="Sightseeing (Entry Tickets)"
                    className={field}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="enquiry-visa" className={labelClass}>
                      Visa (Tourist Visa)
                    </label>
                    <select
                      id="enquiry-visa"
                      value={visa}
                      onChange={(e) => setVisa(e.target.value)}
                      className={field}
                    >
                      <option value="">Select</option>
                      {YES_NO_NOT_SURE.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="enquiry-transport" className={labelClass}>
                      Transport (Private Car, SIC)
                    </label>
                    <select
                      id="enquiry-transport"
                      value={transport}
                      onChange={(e) => setTransport(e.target.value)}
                      className={field}
                    >
                      <option value="">Select</option>
                      {TRANSPORT_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="enquiry-room-view" className={labelClass}>
                      Preferred Room View
                    </label>
                    <select
                      id="enquiry-room-view"
                      value={roomView}
                      onChange={(e) => setRoomView(e.target.value)}
                      className={field}
                    >
                      <option value="">Select</option>
                      {ROOM_VIEW_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="enquiry-bedding" className={labelClass}>
                      Preferred Bedding
                    </label>
                    <select
                      id="enquiry-bedding"
                      value={bedding}
                      onChange={(e) => setBedding(e.target.value)}
                      className={field}
                    >
                      <option value="">Select</option>
                      {BEDDING_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <p className={labelClass}>Vacation Experience</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {EXPERIENCE_OPTIONS.map((option) => (
                      <label key={option} className={chip}>
                        <input
                          type="checkbox"
                          checked={experiences.includes(option)}
                          onChange={() => setExperiences((prev) => toggleInArray(prev, option))}
                          className="w-4 h-4 rounded accent-[#c59b67] cursor-pointer"
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <p className={labelClass}>Other Services Needed</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {OTHER_SERVICES_OPTIONS.map((option) => (
                      <label key={option} className={chip}>
                        <input
                          type="checkbox"
                          checked={otherServices.includes(option)}
                          onChange={() => setOtherServices((prev) => toggleInArray(prev, option))}
                          className="w-4 h-4 rounded accent-[#c59b67] cursor-pointer"
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <p className={labelClass}>Do you want travel insurance?</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {(['Yes', 'No'] as const).map((option) => (
                      <label key={option} className={chip}>
                        <input
                          type="radio"
                          name="travel-insurance"
                          checked={travelInsurance === option}
                          onChange={() => setTravelInsurance(option)}
                          className="w-4 h-4 accent-[#c59b67] cursor-pointer"
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <label className="flex items-center gap-2.5 text-xs sm:text-sm text-stone-500 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={saveDetails}
                    onChange={(e) => setSaveDetails(e.target.checked)}
                    className="w-4 h-4 rounded accent-[#c59b67] cursor-pointer"
                  />
                  <span>Save my email address &amp; name for future contact.</span>
                </label>

                {submitError && <p className={errorClass}>{submitError}</p>}
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="mt-8 lg:mt-auto pt-6 flex items-center justify-between gap-4">
            {step > 1 ? (
              <button
                type="button"
                onClick={goBack}
                className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-semibold tracking-[0.28em] uppercase text-stone-500 hover:text-[#081726] transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : (
              <span />
            )}

            <div className="flex items-center gap-6">
              <span className="text-[10px] sm:text-[11px] tracking-[0.32em] uppercase text-stone-400 tabular-nums">
                0{step} / 0{STEP_META.length}
              </span>
              {step < STEP_META.length ? (
                <button
                  type="button"
                  onClick={goNext}
                  className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-bold tracking-[0.28em] uppercase text-[#081726] hover:text-[#b68b55] transition-colors cursor-pointer"
                >
                  <span>Proceed</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-bold tracking-[0.28em] uppercase text-[#081726] hover:text-[#b68b55] disabled:opacity-50 disabled:cursor-wait transition-colors cursor-pointer"
                >
                  <span>{saving ? 'Submitting' : 'Submit'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
