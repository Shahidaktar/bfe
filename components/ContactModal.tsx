import React, { useState } from 'react';
import { X, Mail, Phone, Check, Send, MessageCircle } from 'lucide-react';
import { CONTACT, mailtoLink, openExternal, whatsappLink } from '../lib/contact';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [enquiryText, setEnquiryText] = useState('');

  if (!isOpen) return null;

  const buildEnquiry = () =>
    [
      'New enquiry — Beyond Forever Earth',
      '',
      `Name: ${name}`,
      `Email: ${email}`,
      `Message: ${message}`,
    ].join('\n');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const enquiry = buildEnquiry();
    setEnquiryText(enquiry);
    setSubmitted(true);
    openExternal(whatsappLink(enquiry));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden font-sans"
        role="dialog"
        aria-modal="true"
      >
        <div className="px-6 py-5 bg-[#081726] text-white flex items-center justify-between border-b border-white/10">
          <div>
            <span className="text-[10px] tracking-[0.25em] text-[#c59b67] uppercase font-semibold block mb-0.5">
              CONCIERGE DESK
            </span>
            <h3 className="font-serif text-xl font-normal text-white">
              Connect With Our Travel Directors
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

        <div className="p-6 sm:p-8">
          {submitted ? (
            <div className="text-center py-8 space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#c59b67]/15 text-[#c59b67] flex items-center justify-center mx-auto mb-2">
                <Check className="w-6 h-6 stroke-[2.5]" />
              </div>
              <h4 className="font-serif text-xl text-stone-900 font-normal">
                One Last Step — Send Your Message
              </h4>
              <p className="text-xs text-stone-600 max-w-sm mx-auto leading-relaxed">
                Thank you{name ? `, ${name}` : ''}. We have opened WhatsApp with your
                message. Press send there and a member of our travel advisory team will
                reply within one business day.
              </p>
              <div className="pt-3 flex flex-wrap items-center justify-center gap-2.5">
                <a
                  href={whatsappLink(enquiryText)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#c59b67] hover:bg-[#d6aa75] text-[#081726] text-xs font-semibold rounded-lg transition-all"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Open WhatsApp</span>
                </a>
                <a
                  href={mailtoLink('Enquiry — Beyond Forever Earth', enquiryText)}
                  className="inline-flex items-center gap-2 px-4 py-2 border border-stone-300 hover:border-stone-500 text-stone-700 text-xs font-semibold rounded-lg transition-all"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Send by Email</span>
                </a>
              </div>
              <div className="pt-2">
                <button
                  onClick={() => {
                    setSubmitted(false);
                    onClose();
                  }}
                  className="text-xs text-stone-500 hover:text-stone-900 underline underline-offset-4 cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-900 mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Julian Montgomery"
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-900 focus:outline-none focus:border-[#c59b67]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-900 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. julian@example.com"
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-900 focus:outline-none focus:border-[#c59b67]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-900 mb-1">
                  How Can We Assist You?
                </label>
                <textarea
                  rows={3}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Inquire about custom private jet charters, Mediterranean yacht itineraries, or corporate retreats..."
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-900 focus:outline-none focus:border-[#c59b67]"
                />
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#c59b67] hover:bg-[#b68b55] text-[#081726] text-xs font-semibold tracking-wider uppercase rounded-lg transition-all shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Concierge Inquiry</span>
                </button>
              </div>
            </form>
          )}

          <div className="mt-6 pt-5 border-t border-stone-100 grid grid-cols-2 gap-3 text-[11px] text-stone-500">
            <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-2 hover:text-[#c59b67] transition-colors">
              <Mail className="w-3.5 h-3.5 text-[#c59b67]" />
              <span>{CONTACT.email}</span>
            </a>
            <a href={`tel:${CONTACT.phoneTel}`} className="flex items-center gap-2 hover:text-[#c59b67] transition-colors">
              <Phone className="w-3.5 h-3.5 text-[#c59b67]" />
              <span>{CONTACT.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
