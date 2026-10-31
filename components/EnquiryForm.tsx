import React, { useState } from 'react';
import { Check, Send, MessageCircle, Mail } from 'lucide-react';
import { PACKAGES_DATA } from './PackagesSection';
import { TRAVEL_STYLES } from './TravelStylesSection';
import { mailtoLink, openExternal, whatsappLink } from '../lib/contact';

interface JourneyEnquiryFormProps {
  initialDestination?: string;
  initialTravelType?: string;
  onDone?: () => void;
}

const DESTINATION_OPTIONS = [
  ...PACKAGES_DATA.map((pkg) => pkg.title),
  'Somewhere else / not decided yet',
];

const STYLE_OPTIONS = TRAVEL_STYLES.map((style) => style.title);

const TRAVELLER_OPTIONS = [
  'Solo traveller',
  'Two travellers (couple)',
  'Three to five travellers',
  'Family / group of six or more',
];

const TRAVEL_PERIOD_OPTIONS = [
  'Within the next 3 months',
  'Three to six months from now',
  'Six to twelve months from now',
  'More than a year away',
  'Flexible / still deciding',
];

const BUDGET_OPTIONS = [
  'Under $5,000',
  '$5,000 – $10,000',
  '$10,000 – $20,000',
  '$20,000 – $40,000',
  '$40,000+',
  'Prefer to discuss',
];

const withCurrentValue = (options: string[], value: string) =>
  value && !options.includes(value) ? [value, ...options] : options;

export const JourneyEnquiryForm: React.FC<JourneyEnquiryFormProps> = ({
  initialDestination = '',
  initialTravelType = '',
  onDone,
}) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [destination, setDestination] = useState(
    DESTINATION_OPTIONS.includes(initialDestination) ? initialDestination : ''
  );
  const [travelType, setTravelType] = useState(
    STYLE_OPTIONS.includes(initialTravelType) ? initialTravelType : ''
  );
  const [travellers, setTravellers] = useState(TRAVELLER_OPTIONS[1]);
  const [travelPeriod, setTravelPeriod] = useState(TRAVEL_PERIOD_OPTIONS[2]);
  const [budget, setBudget] = useState(BUDGET_OPTIONS[1]);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [enquiryText, setEnquiryText] = useState('');

  const buildEnquiry = () =>
    [
      'New journey enquiry — Beyond Forever Earth',
      '',
      `Name: ${fullName}`,
      `Email: ${email}`,
      phone ? `WhatsApp / phone: ${phone}` : '',
      `Destination / region: ${destination || 'To be decided together'}`,
      `Travel style: ${travelType || 'To be decided together'}`,
      `Travellers: ${travellers}`,
      `Travel period: ${travelPeriod}`,
      `Approximate travel investment: ${budget}`,
      specialRequests
        ? `What would make this trip unforgettable: ${specialRequests}`
        : '',
    ]
      .filter(Boolean)
      .join('\n');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const enquiry = buildEnquiry();
    setEnquiryText(enquiry);
    setIsSubmitted(true);
    openExternal(whatsappLink(enquiry));
  };

  const handleDone = () => {
    setIsSubmitted(false);
    setStep(1);
    onDone?.();
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-8 space-y-4">
        <div className="w-16 h-16 rounded-full bg-[#c59b67]/15 text-[#c59b67] flex items-center justify-center mx-auto mb-2">
          <Check className="w-8 h-8 stroke-[2.5]" />
        </div>
        <h4 className="font-serif text-2xl text-stone-900 font-normal">
          One Last Step — Send Your Message in WhatsApp
        </h4>
        <p className="text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
          Thank you{fullName ? `, ${fullName}` : ''}. We have opened WhatsApp with your
          journey brief. Press send there and a dedicated travel specialist will reply
          within one business day.
        </p>
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <a
            href={whatsappLink(enquiryText)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#c59b67] hover:bg-[#d6aa75] text-[#081726] text-xs font-semibold tracking-wider uppercase rounded-lg transition-all"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Open WhatsApp</span>
          </a>
          <a
            href={mailtoLink('Journey enquiry — Beyond Forever Earth', enquiryText)}
            className="inline-flex items-center gap-2 px-5 py-2.5 border border-stone-300 hover:border-stone-500 text-stone-700 text-xs font-semibold tracking-wider uppercase rounded-lg transition-all"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Send by Email</span>
          </a>
        </div>
        {onDone && (
          <div className="pt-2">
            <button
              onClick={handleDone}
              className="text-xs text-stone-500 hover:text-stone-900 underline underline-offset-4 transition-colors cursor-pointer"
            >
              Return to Exploration
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {step === 1 ? (
        <>
          <p className="text-xs text-stone-500 font-light">
            Step 1 of 2: Where, when and how you would like to travel.
          </p>

          {/* Destination */}
          <div>
            <label className="block text-xs font-semibold text-stone-900 mb-2">
              Where would you like to travel?
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {withCurrentValue(DESTINATION_OPTIONS, destination).map((dest) => (
                <button
                  key={dest}
                  type="button"
                  aria-pressed={destination === dest}
                  onClick={() => setDestination(dest)}
                  className={`px-3 py-2 text-xs rounded-lg border text-left transition-all ${
                    destination === dest
                      ? 'border-[#c59b67] bg-[#c59b67]/10 text-stone-900 font-medium'
                      : 'border-stone-200 text-stone-600 hover:border-stone-300'
                  }`}
                >
                  {dest}
                </button>
              ))}
            </div>
          </div>

          {/* Travel Type */}
          <div>
            <label className="block text-xs font-semibold text-stone-900 mb-2">
              Travel Style
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {withCurrentValue(STYLE_OPTIONS, travelType).map((type) => (
                <button
                  key={type}
                  type="button"
                  aria-pressed={travelType === type}
                  onClick={() => setTravelType(type)}
                  className={`px-3 py-2 text-xs rounded-lg border text-center transition-all ${
                    travelType === type
                      ? 'border-[#c59b67] bg-[#c59b67]/10 text-stone-900 font-medium'
                      : 'border-stone-200 text-stone-600 hover:border-stone-300'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Party size & Travel period */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="enquiry-travellers"
                className="block text-xs font-semibold text-stone-900 mb-1.5"
              >
                Number of Travellers
              </label>
              <select
                id="enquiry-travellers"
                value={travellers}
                onChange={(e) => setTravellers(e.target.value)}
                className="w-full px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-800 focus:outline-none focus:border-[#c59b67]"
              >
                {TRAVELLER_OPTIONS.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="enquiry-period"
                className="block text-xs font-semibold text-stone-900 mb-1.5"
              >
                When Would You Like to Travel?
              </label>
              <select
                id="enquiry-period"
                value={travelPeriod}
                onChange={(e) => setTravelPeriod(e.target.value)}
                className="w-full px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-800 focus:outline-none focus:border-[#c59b67]"
              >
                {TRAVEL_PERIOD_OPTIONS.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Budget */}
          <div>
            <label
              htmlFor="enquiry-budget"
              className="block text-xs font-semibold text-stone-900 mb-1.5"
            >
              Approximate Travel Investment, per Person
            </label>
            <select
              id="enquiry-budget"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-800 focus:outline-none focus:border-[#c59b67]"
            >
              {BUDGET_OPTIONS.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
            <p className="mt-1.5 text-[11px] text-stone-500 font-light leading-relaxed">
              Your travel investment helps us recommend the right level of experience,
              accommodation and private services.
            </p>
          </div>

          {/* Next Button */}
          <div className="pt-2 flex justify-end">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="px-6 py-2.5 bg-[#081726] hover:bg-[#0c2238] text-white text-xs font-semibold tracking-wider uppercase rounded-lg transition-all cursor-pointer"
            >
              Continue to Details →
            </button>
          </div>
        </>
      ) : (
        <>
          <p className="text-xs text-stone-500 font-light">
            Step 2 of 2: How your travel specialist can reach you.
          </p>

          <div className="space-y-4">
            <div>
              <label
                htmlFor="enquiry-name"
                className="block text-xs font-semibold text-stone-900 mb-1"
              >
                Full Name *
              </label>
              <input
                id="enquiry-name"
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Eleanor Vance"
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-900 focus:outline-none focus:border-[#c59b67]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="enquiry-email"
                  className="block text-xs font-semibold text-stone-900 mb-1"
                >
                  Email Address *
                </label>
                <input
                  id="enquiry-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. eleanor@example.com"
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-900 focus:outline-none focus:border-[#c59b67]"
                />
              </div>
              <div>
                <label
                  htmlFor="enquiry-phone"
                  className="block text-xs font-semibold text-stone-900 mb-1"
                >
                  WhatsApp / Phone
                </label>
                <input
                  id="enquiry-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98923 44001"
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-900 focus:outline-none focus:border-[#c59b67]"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="enquiry-notes"
                className="block text-xs font-semibold text-stone-900 mb-1"
              >
                What Would Make This Trip Unforgettable?
              </label>
              <textarea
                id="enquiry-notes"
                rows={3}
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                placeholder="A private dinner on the beach, celebrating an anniversary, travelling with three generations..."
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-900 focus:outline-none focus:border-[#c59b67]"
              />
            </div>
          </div>

          <div className="pt-3 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="text-xs text-stone-500 hover:text-stone-900 cursor-pointer"
            >
              ← Back
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#c59b67] hover:bg-[#b68b55] text-[#081726] text-xs font-semibold tracking-wider uppercase rounded-lg transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Request My Proposal</span>
            </button>
          </div>
        </>
      )}
    </form>
  );
};
