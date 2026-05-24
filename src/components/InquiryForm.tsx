import React, { useState, useEffect } from "react";
import { 
  Building, 
  User, 
  Mail, 
  Phone, 
  Send, 
  FileText, 
  CheckCircle,
  Clock,
  Sparkles,
  ClipboardCheck,
  PhoneCall
} from "lucide-react";

interface InquiryFormProps {
  initialSpecsText: string;
}

export default function InquiryForm({ initialSpecsText }: InquiryFormProps) {
  const [companyName, setCompanyName] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [specs, setSpecs] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedInquiry, setSubmittedInquiry] = useState<any | null>(null);

  // Synchronize spec updates when user clicks 'Auto-Fill Spec' from the calculator
  useEffect(() => {
    if (initialSpecsText) {
      setSpecs((prev) => {
        if (prev.includes(initialSpecsText)) return prev;
        return prev ? `${prev}\n---\n${initialSpecsText}` : initialSpecsText;
      });
    }
  }, [initialSpecsText]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName || !contactName || !phone) {
      alert("Please fill in the core company details: Company Name, Contact Representative, and Phone Number.");
      return;
    }

    setIsSubmitting(true);

    // Simulate reliable network transaction delay
    setTimeout(() => {
      const inquiryNumber = `CEQ-${2026}${Math.floor(1000 + Math.random() * 9000)}`;
      const payload = {
        inquiryNumber,
        companyName,
        contactName,
        email: email || "direct-sales-desk",
        phone,
        specs: specs || "Standard Wire Hooks Catalog Samples",
        date: new Date().toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
          hour: "numeric",
          minute: "numeric"
        }),
      };
      setSubmittedInquiry(payload);
      setIsSubmitting(false);

      // Scroll inside screen smoothly to focus on the receipt
      const receiptElement = document.getElementById("inquiry-receipt");
      if (receiptElement) {
        receiptElement.scrollIntoView({ behavior: "smooth" });
      }
    }, 1500);
  };

  const getWhatsAppLink = () => {
    if (!submittedInquiry) return "#";
    const text = `Hello Chamunda Enterprise Sales Team,\n\nI have generated a formal B2B inquiry card from your website.\n\n*Inquiry Ref:* ${submittedInquiry.inquiryNumber}\n*Company:* ${submittedInquiry.companyName}\n*Contact:* ${submittedInquiry.contactName}\n*Phone:* ${submittedInquiry.phone}\n*Material Specs:* ${submittedInquiry.specs}\n\nPlease dispatch an engineering estimate. Thank you!`;
    return `https://wa.me/918160749336?text=${encodeURIComponent(text)}`;
  };

  const getMailLink = () => {
    if (!submittedInquiry) return "#";
    const subject = `B2B Request for Quote: ${submittedInquiry.inquiryNumber} - ${submittedInquiry.companyName}`;
    const body = `Dear Chamunda Enterprise Engineering Desk,\n\nPlease evaluate our specifications and issue an engineering estimate.\n\nREF NUMBER: ${submittedInquiry.inquiryNumber}\nCOMPANY: ${submittedInquiry.companyName}\nREPRESENTATIVE: ${submittedInquiry.contactName}\nPHONE: ${submittedInquiry.phone}\nEMAIL: ${submittedInquiry.email}\n\nSPECIFICATIONS:\n${submittedInquiry.specs}\n\nSincerely,\n${submittedInquiry.contactName}`;
    return `mailto:sales.chamundaenterprise@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleResetForm = () => {
    setCompanyName("");
    setContactName("");
    setEmail("");
    setPhone("");
    setSpecs("");
    setSubmittedInquiry(null);
  };

  return (
    <div id="contact" className="max-w-3xl mx-auto px-4 py-8">
      {submittedInquiry ? (
        <div id="inquiry-receipt" className="border-2 border-brand-amber bg-bg-heavy p-6 md:p-8 text-text-light relative grid-blueprint animate-fade-in">
          {/* Top Yellow Warning tape decoration */}
          <div className="absolute top-0 left-0 right-0 h-2 hazard-stripes"></div>

          <div className="flex flex-col items-center text-center mt-4 mb-6">
            <div className="h-14 w-14 bg-brand-amber/10 border border-brand-amber text-brand-amber rounded-none flex items-center justify-center mb-4">
              <CheckCircle size={32} />
            </div>
            <h3 className="text-2xl font-heading font-extrabold uppercase tracking-wide text-brand-primary">
              INQUIRY SPEC LOCKED SUCCESSFULLY!
            </h3>
            <p className="text-xs text-text-muted font-mono mt-1">
              Ref Number: <span className="text-brand-amber font-bold">{submittedInquiry.inquiryNumber}</span> | Timestamp: {submittedInquiry.date}
            </p>
          </div>

          <div className="bg-bg-dark border border-industry-slate/80 p-5 font-mono text-xs space-y-4 mb-8">
            <div className="border-b border-industry-slate/60 pb-2 mb-2 flex justify-between text-[11px] text-brand-amber font-black">
              <span>B2B QUOTATION RECORD CARD</span>
              <span>CHAMUNDA ENTERPRISE IND.</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="block text-text-muted text-[10px] uppercase">Client Business Entity:</span>
                <span className="text-sm font-bold text-text-light">{submittedInquiry.companyName}</span>
              </div>
              <div>
                <span className="block text-text-muted text-[10px] uppercase">Procurement Representative:</span>
                <span className="text-sm font-bold text-text-light">{submittedInquiry.contactName}</span>
              </div>
              <div>
                <span className="block text-text-muted text-[10px] uppercase">Registered Phone callback:</span>
                <span className="text-sm font-bold text-text-light">{submittedInquiry.phone}</span>
              </div>
              <div>
                <span className="block text-text-muted text-[10px] uppercase">Contact Email address:</span>
                <span className="text-sm font-bold text-text-light">{submittedInquiry.email}</span>
              </div>
            </div>

            <div className="border-t border-industry-slate/60 pt-3 mt-3">
              <span className="block text-brand-amber text-[10px] uppercase font-bold mb-1">
                Requested Part Geometry & Core Specifications:
              </span>
              <p className="text-text-light bg-black/60 p-3 text-[11px] leading-relaxed border border-outline-gold/20 select-all whitespace-pre-wrap">
                {submittedInquiry.specs}
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-3">
            <a 
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-green-600 hover:bg-green-700 text-white px-6 py-4 font-heading font-black text-sm uppercase flex items-center justify-center gap-2 tracking-wider transition-all cursor-pointer shadow-lg rounded-none"
            >
              <PhoneCall size={16} />
              SEND INSTANT TO WHATSAPP
            </a>
            <a 
              href={getMailLink()}
              className="flex-1 bg-transparent border-2 border-brand-amber text-brand-amber hover:bg-brand-amber hover:text-bg-heavy px-6 py-4 font-heading font-black text-sm uppercase flex items-center justify-center gap-2 tracking-wider transition-all cursor-pointer rounded-none"
            >
              <Mail size={16} />
              DISPATCH OFFICIAL EMAIL
            </a>
            <button 
              onClick={handleResetForm}
              className="px-4 py-4 border border-industry-slate hover:bg-industry-slate text-text-muted hover:text-text-light font-mono text-xs uppercase cursor-pointer rounded-none"
            >
              New Inquiry
            </button>
          </div>

          <div className="mt-6 flex justify-between items-center text-[10px] font-mono text-text-muted border-t border-industry-slate/40 pt-4">
            <span className="flex items-center gap-1">
              <Clock size={11} />
              Sales desk standard follow-up is within 4 business hours.
            </span>
          </div>
        </div>
      ) : (
        <div className="border border-industry-slate bg-bg-card p-6 md:p-10 relative overflow-hidden">
          {/* Rigid border accent */}
          <div className="absolute top-0 left-0 right-0 h-1 hazard-stripes" />

          <div className="text-center mb-8">
            <div className="inline-flex h-12 w-12 bg-brand-amber/10 border border-brand-amber text-brand-amber items-center justify-center mb-4">
              <Building size={24} />
            </div>
            <h3 className="text-2xl font-heading font-black uppercase text-brand-primary tracking-wide">
              B2B INQUIRY REQUISITION FORM
            </h3>
            <p className="font-body-md text-sm text-text-muted mt-2 max-w-lg mx-auto">
              Ready to execute bulk jobwork. Present your core project specifications below for structural analysis and volume estimation.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Company Name */}
              <div>
                <label className="block text-xs font-mono text-text-muted uppercase mb-1 flex items-center gap-1">
                  <Building size={12} className="text-brand-amber" />
                  Company Entity *
                </label>
                <input 
                  type="text"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. Mahajan Hardware Pvt Ltd"
                  className="w-full bg-bg-heavy border border-industry-slate focus:border-brand-amber text-text-light px-3 py-2.5 outline-none rounded-none text-sm transition-colors"
                />
              </div>

              {/* Contact Representative */}
              <div>
                <label className="block text-xs font-mono text-text-muted uppercase mb-1 flex items-center gap-1">
                  <User size={12} className="text-brand-amber" />
                  Procurement Representative *
                </label>
                <input 
                  type="text"
                  required
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="Your full name"
                  className="w-full bg-bg-heavy border border-industry-slate focus:border-brand-amber text-text-light px-3 py-2.5 outline-none rounded-none text-sm transition-colors"
                />
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-xs font-mono text-text-muted uppercase mb-1 flex items-center gap-1">
                  <Mail size={12} className="text-brand-amber" />
                  Registered Business Email
                </label>
                <input 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. buyer@company.com"
                  className="w-full bg-bg-heavy border border-industry-slate focus:border-brand-amber text-text-light px-3 py-2.5 outline-none rounded-none text-sm transition-colors"
                />
              </div>

              {/* Phone Callback Number */}
              <div>
                <label className="block text-xs font-mono text-text-muted uppercase mb-1 flex items-center gap-1">
                  <Phone size={12} className="text-brand-amber" />
                  Registered Indian Phone / WhatsApp *
                </label>
                <input 
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. +91 99999 99999"
                  className="w-full bg-bg-heavy border border-industry-slate focus:border-brand-amber text-text-light px-3 py-2.5 outline-none rounded-none text-sm transition-colors"
                />
              </div>
            </div>

            {/* Geometry specifications input */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-mono text-text-muted uppercase flex items-center gap-1">
                  <FileText size={12} className="text-brand-amber" />
                  Core Project Specifications (Dimensions, materials, drawings) *
                </label>
                {initialSpecsText && (
                  <span className="text-[10px] bg-brand-amber/15 text-brand-amber border border-brand-amber/30 px-2 py-0.5 font-mono animate-pulse">
                    SPEC LOADED FROM SIMULATOR
                  </span>
                )}
              </div>
              <textarea 
                rows={5}
                required
                value={specs}
                onChange={(e) => setSpecs(e.target.value)}
                placeholder="Specify diameter (e.g., 4mm, 6mm), quantity (e.g., 5,000 units), edge chamfer requirements, grade choice (SS 304, MS), or upload guidelines instructions."
                className="w-full bg-bg-heavy border border-industry-slate focus:border-brand-amber text-text-light px-3 py-2.5 outline-none rounded-none text-sm transition-colors font-mono resize-y"
              />
              <p className="text-[10px] text-text-muted mt-1 leading-relaxed">
                Tip: Configure parameters using the **B2B Configuration Machine Simulator** higher up to auto-generate precise structural dimensions.
              </p>
            </div>

            <button 
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-brand-amber hover:bg-brand-primary text-bg-heavy px-8 py-4 font-heading font-black uppercase text-sm tracking-wider flex items-center justify-center gap-2 border-2 border-brand-amber hover:border-brand-primary transition-all custom-shadow rounded-none cursor-pointer ${
                isSubmitting ? "opacity-75 cursor-wait animate-pulse" : ""
              }`}
            >
              {isSubmitting ? (
                <>
                  <Clock size={16} className="animate-spin" />
                  GENERATING SECURE RFQ TICKET...
                </>
              ) : (
                <>
                  <Send size={16} />
                  SUBMIT CONFIDENTIALLY & REQUEST DIRECT B2B QUOTATION
                </>
              )}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
