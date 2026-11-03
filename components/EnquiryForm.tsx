import React, { useEffect, useRef, useState } from 'react';
import { Check, Send, ArrowLeft, ArrowRight } from 'lucide-react';

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
  'India — Rajasthan',
  'India — Kerala',
  'India — Ladakh',
  'India — Goa',
  'India — Himalayas',
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

const OTHER_SERVICES_OPTIONS = ['Meals — Lunch / Dinner', 'Veg / Non-Veg'];

const STEPS: { id: Step; label: string; hint: string }[] = [
  { id: 1, label: 'Traveller', hint: 'Who we should contact' },
  { id: 2, label: 'Journey', hint: 'Where and when you are travelling' },
  { id: 3, label: 'Arrangements', hint: 'What you would like us to arrange' },
  { id: 4, label: 'Other Details', hint: 'Room, experiences and extra services' },
];

const inputClass =
  'w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-lg text-sm sm:text-[15px] text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-[#c59b67] transition-colors';
const labelClass = 'block text-sm font-semibold text-stone-900 mb-2';
const errorClass = 'mt-1 text-xs text-red-600';

const withCurrentValue = (options: string[], value: string) =>
  value && !options.includes(value) ? [value, ...options] : options;

export const JourneyEnquiryForm: React.FC<JourneyEnquiryFormProps> = ({
  initialDestination = '',
  initialTravelType = '',
  onDone,
}) => {
  const [step, setStep] = useState<Step>(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const stepEnteredAt = useRef(Date.now());

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
      const res = await fetch('/api/plan-my-journey', {
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
      <div className="text-center py-8 space-y-4">
        <div className="w-16 h-16 rounded-full bg-[#c59b67]/15 text-[#c59b67] flex items-center justify-center mx-auto mb-2">
          <Check className="w-8 h-8 stroke-[2.5]" />
        </div>
        <h4 className="font-serif text-2xl sm:text-3xl text-stone-900 font-normal">
          Thank You — Your Enquiry Is Received
        </h4>
        <p className="text-base text-stone-600 max-w-md mx-auto leading-relaxed">
          Thank you{fullName ? `, ${fullName}` : ''}. Your travel brief has been recorded.
          A dedicated travel specialist will be in touch within one business day.
        </p>
        <div className="pt-2">
          <button
            onClick={handleDone}
            className="px-7 py-3 bg-[#c59b67] hover:bg-[#b68b55] text-[#081726] text-sm font-semibold tracking-wider uppercase rounded-lg transition-all cursor-pointer"
          >
            Submit Another Enquiry
          </button>
        </div>
      </div>
    );
  }

  const current = STEPS.find((item) => item.id === step)!;

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Progress */}
      <div>
        <div className="flex items-center gap-2">
          {STEPS.map((item, index) => {
            const isComplete = step > item.id;
            const isCurrent = step === item.id;
            return (
              <React.Fragment key={item.id}>
                <div className="flex items-center gap-2 shrink-0">
                  <span
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-colors ${
                      isComplete || isCurrent
                        ? 'bg-[#c59b67] text-[#081726]'
                        : 'bg-stone-100 text-stone-400'
                    }`}
                  >
                    {isComplete ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : item.id}
                  </span>
                  <span
                    className={`hidden sm:block text-[11px] tracking-[0.16em] uppercase font-semibold transition-colors ${
                      isCurrent ? 'text-stone-900' : 'text-stone-400'
                    }`}
                  >
                    {item.label}
                  </span>
                </div>
                {index < STEPS.length - 1 && (
                  <span
                    aria-hidden="true"
                    className={`flex-1 h-[2px] rounded-full transition-colors ${
                      step > item.id ? 'bg-[#c59b67]' : 'bg-stone-200'
                    }`}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
        <p className="mt-4 text-sm text-stone-500 font-light">
          Step {step} of {STEPS.length}: {current.hint}.
        </p>
      </div>

      <div key={step} className="animate-in fade-in slide-in-from-right-1 duration-200 space-y-6">
        {step === 1 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            <div>
              <label htmlFor="quote-name" className={labelClass}>
                Full Name *
              </label>
              <input
                id="quote-name"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Your Name"
                className={inputClass}
              />
              {errors.fullName && <p className={errorClass}>{errors.fullName}</p>}
            </div>

            <div>
              <label htmlFor="quote-phone" className={labelClass}>
                Phone
              </label>
              <input
                id="quote-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone No."
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="quote-email" className={labelClass}>
                Email Address *
              </label>
              <input
                id="quote-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                className={inputClass}
              />
              {errors.email && <p className={errorClass}>{errors.email}</p>}
            </div>
          </div>
        )}

        {step === 2 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              <div>
                <label htmlFor="quote-destination" className={labelClass}>
                  Destination *
                </label>
                <select
                  id="quote-destination"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className={inputClass}
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

              <div>
                <label htmlFor="quote-cities" className={labelClass}>
                  Cities to Cover
                </label>
                <input
                  id="quote-cities"
                  type="text"
                  value={citiesToCover}
                  onChange={(e) => setCitiesToCover(e.target.value)}
                  placeholder="Cities to cover"
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="quote-departure-city" className={labelClass}>
                  Departure City
                </label>
                <input
                  id="quote-departure-city"
                  type="text"
                  value={departureCity}
                  onChange={(e) => setDepartureCity(e.target.value)}
                  placeholder="Departure City"
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="quote-departure-date" className={labelClass}>
                  Departure Date &amp; Time
                </label>
                <input
                  id="quote-departure-date"
                  type="datetime-local"
                  value={departureDate}
                  onChange={(e) => setDepartureDate(e.target.value)}
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="quote-arrival-city" className={labelClass}>
                  Arrival City
                </label>
                <input
                  id="quote-arrival-city"
                  type="text"
                  value={arrivalCity}
                  onChange={(e) => setArrivalCity(e.target.value)}
                  placeholder="Arrival City"
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="quote-return-date" className={labelClass}>
                  Return Date &amp; Time
                </label>
                <input
                  id="quote-return-date"
                  type="datetime-local"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  className={inputClass}
                />
                {errors.returnDate && <p className={errorClass}>{errors.returnDate}</p>}
              </div>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              <div>
                <label htmlFor="quote-travellers" className={labelClass}>
                  Who will be Travelling
                </label>
                <select
                  id="quote-travellers"
                  value={travellers}
                  onChange={(e) => setTravellers(e.target.value)}
                  className={inputClass}
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
                <label htmlFor="quote-hotel" className={labelClass}>
                  Hotel with Breakfast
                </label>
                <select
                  id="quote-hotel"
                  value={hotelBreakfast}
                  onChange={(e) => setHotelBreakfast(e.target.value)}
                  className={inputClass}
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
                <label htmlFor="quote-sightseeing" className={labelClass}>
                  Sightseeing (Entry Tickets)
                </label>
                <input
                  id="quote-sightseeing"
                  type="text"
                  value={sightseeing}
                  onChange={(e) => setSightseeing(e.target.value)}
                  placeholder="Sightseeing (Entry Tickets)"
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="quote-visa" className={labelClass}>
                  Visa (Tourist Visa)
                </label>
                <select
                  id="quote-visa"
                  value={visa}
                  onChange={(e) => setVisa(e.target.value)}
                  className={inputClass}
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
                <label htmlFor="quote-transport" className={labelClass}>
                  Transport (Private Car, SIC)
                </label>
                <select
                  id="quote-transport"
                  value={transport}
                  onChange={(e) => setTransport(e.target.value)}
                  className={inputClass}
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
          </>
        )}

        {step === 4 && (
          <>
            <div>
              <p className="text-[11px] tracking-[0.22em] text-[#c59b67] uppercase font-semibold mb-4">
                Other Details
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="quote-room-view" className={labelClass}>
                    Preferred Room View
                  </label>
                  <select
                    id="quote-room-view"
                    value={roomView}
                    onChange={(e) => setRoomView(e.target.value)}
                    className={inputClass}
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
                  <label htmlFor="quote-bedding" className={labelClass}>
                    Preferred Bedding
                  </label>
                  <select
                    id="quote-bedding"
                    value={bedding}
                    onChange={(e) => setBedding(e.target.value)}
                    className={inputClass}
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
            </div>

            <div className="pt-2 border-t border-stone-200">
              <p className="text-[11px] tracking-[0.22em] text-[#c59b67] uppercase font-semibold mb-4">
                Vacation Experience
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2.5">
                {EXPERIENCE_OPTIONS.map((option) => (
                  <label
                    key={option}
                    className="flex items-center gap-2.5 text-sm text-stone-700 cursor-pointer"
                  >
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

            <div className="pt-2 border-t border-stone-200">
              <p className="text-[11px] tracking-[0.22em] text-[#c59b67] uppercase font-semibold mb-4">
                Other Services Needed
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {OTHER_SERVICES_OPTIONS.map((option) => (
                  <label
                    key={option}
                    className="flex items-center gap-2.5 text-sm text-stone-700 cursor-pointer"
                  >
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

            <div className="pt-2 border-t border-stone-200">
              <p className={labelClass}>Do you want travel insurance?</p>
              <div className="flex flex-wrap items-center gap-5">
                {(['Yes', 'No'] as const).map((option) => (
                  <label
                    key={option}
                    className="flex items-center gap-2.5 text-sm text-stone-700 cursor-pointer"
                  >
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

            <label className="flex items-start gap-2.5 text-sm text-stone-600 cursor-pointer">
              <input
                type="checkbox"
                checked={saveDetails}
                onChange={(e) => setSaveDetails(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded accent-[#c59b67] cursor-pointer"
              />
              <span>Save my email address &amp; name when I contact you further next time.</span>
            </label>
          </>
        )}
      </div>

      {/* Navigation */}
      <div className="pt-3 flex items-center justify-between gap-3 border-t border-stone-200">
        {step > 1 ? (
          <button
            type="button"
            onClick={goBack}
            className="inline-flex items-center gap-1.5 text-sm text-stone-500 hover:text-stone-900 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </button>
        ) : (
          <span />
        )}

        {step < 4 ? (
          <button
            type="button"
            onClick={goNext}
            className="inline-flex items-center gap-1.5 px-7 py-3 bg-[#081726] hover:bg-[#0c2238] text-white text-sm font-semibold tracking-wider uppercase rounded-lg transition-all cursor-pointer"
          >
            <span>Continue</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        ) : (
          <button
            type="submit"
            disabled={saving}
            className="px-7 py-3 bg-[#c59b67] hover:bg-[#b68b55] disabled:opacity-60 disabled:cursor-wait text-[#081726] text-sm font-semibold tracking-wider uppercase rounded-lg transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{saving ? 'Submitting…' : 'Submit'}</span>
          </button>
        )}
      </div>

      {submitError && (
        <p className="text-sm text-red-600 text-right leading-relaxed">{submitError}</p>
      )}
    </form>
  );
};
