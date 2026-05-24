import { useState, useMemo } from "react";
import { 
  Building2, 
  Cpu, 
  Flame, 
  Layers, 
  Mail, 
  MapPin, 
  Phone, 
  Settings, 
  ShieldCheck, 
  Sliders, 
  Zap, 
  ArrowUpRight, 
  Menu, 
  X, 
  Info, 
  CheckCircle2, 
  Award, 
  HardHat, 
  Gauge,
  Hourglass,
  ArrowRight,
  ClipboardList,
  Factory
} from "lucide-react";
import { PRODUCTS, MACHINERY, INDUSTRIES, CAPABILITIES, Product, Machine } from "./types";
import SpecsCalculator from "./components/SpecsCalculator";
import InquiryForm from "./components/InquiryForm";

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(PRODUCTS[0]);
  const [activeSpecString, setActiveSpecString] = useState<string>("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [inspectedMachine, setInspectedMachine] = useState<Machine | null>(null);
  
  // Custom interactive system parameters
  const [liveFactoryActiveUnits, setLiveFactoryActiveUnits] = useState(6);
  const [showFactoryTourNote, setShowFactoryTourNote] = useState(false);

  // Filter products by category
  const categories = useMemo(() => {
    return ["All", ...Array.from(new Set(PRODUCTS.map((p) => p.category)))];
  }, []);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === "All") return PRODUCTS;
    return PRODUCTS.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  const handleApplySpecFromCalc = (specText: string) => {
    setActiveSpecString(specText);
  };

  const handleInquireFromProduct = (prod: Product) => {
    const formattedSpec = `Inquiry on Catalog Item: ${prod.name} (SKU: ${prod.sku}) | Recommended core: ${prod.materials.join(", ")}`;
    setActiveSpecString(formattedSpec);
    
    // Smooth scroll to inquiry section
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-bg-dark text-text-light font-sans selection:bg-brand-amber selection:text-bg-heavy overflow-x-hidden antialiased grid-blueprint">
      
      {/* 1. TOP INDUSTRIAL BANNER */}
      <div className="bg-bg-heavy border-b border-industry-slate/60 py-2.5 px-4 md:px-6 text-[11px] font-mono text-text-muted flex flex-col md:flex-row justify-between items-center gap-2 z-50 relative">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-brand-amber font-bold">
            <span className="h-1.5 w-1.5 bg-brand-amber rounded-full animate-ping" />
            FACTORY UPDATE:
          </span>
          <span>PLANT RUNNING AT MAX VOLUME CAPACITY | GUJARAT, INDIA EST.</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1 hover:text-brand-amber transition-colors">
            <ShieldCheck size={12} className="text-brand-amber" />
            ISO 9001:2015 CERTIFIED MATERIAL FOR DISTY & RETAIL
          </span>
          <span className="hidden lg:inline-block">|</span>
          <span className="hidden lg:inline-flex items-center gap-1.5">
            <span className="text-brand-primary">CALL SALES DESK:</span>
            <a href="tel:+918160749336" className="text-brand-amber font-bold hover:underline">+91 8160749336</a>
          </span>
        </div>
      </div>

      {/* 2. STICKY STYLISH NAVBAR */}
      <nav className="sticky top-0 w-full z-45 bg-bg-dark/95 backdrop-blur-md border-b border-industry-slate/80 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo Grouping */}
            <div className="flex items-center gap-3">
              <a href="#" className="flex items-center gap-2.5 group">
                <div className="h-11 w-11 bg-brand-amber flex items-center justify-center border-2 border-brand-amber group-hover:bg-transparent group-hover:text-brand-amber transition-all rounded-none relative">
                  <span className="absolute inset-0.5 border border-bg-dark group-hover:border-brand-amber transition-all"></span>
                  <Factory size={22} className="relative z-10 text-bg-heavy group-hover:text-brand-amber" />
                </div>
                <div>
                  <span className="block font-heading font-black text-lg md:text-xl tracking-wider text-text-light group-hover:text-brand-primary transition-colors">
                    CHAMUNDA
                  </span>
                  <span className="block font-mono text-[10px] text-brand-amber font-bold uppercase tracking-widest leading-none">
                    ENTERPRISE
                  </span>
                </div>
              </a>
            </div>

            {/* Desktop Navigation Linkages */}
            <div className="hidden lg:flex items-center gap-8">
              <a href="#about" className="font-heading font-semibold text-xs uppercase tracking-widest text-text-muted hover:text-brand-amber transition-colors py-2 border-b-2 border-transparent hover:border-brand-amber">
                Our Heritage
              </a>
              <a href="#products-showcase" className="font-heading font-semibold text-xs uppercase tracking-widest text-text-muted hover:text-brand-amber transition-colors py-2 border-b-2 border-transparent hover:border-brand-amber">
                Product Catalog
              </a>
              <a href="#technical-capabilities" className="font-heading font-semibold text-xs uppercase tracking-widest text-text-muted hover:text-brand-amber transition-colors py-2 border-b-2 border-transparent hover:border-brand-amber">
                Capabilities
              </a>
              <a href="#machinery" className="font-heading font-semibold text-xs uppercase tracking-widest text-text-muted hover:text-brand-amber transition-colors py-2 border-b-2 border-transparent hover:border-brand-amber">
                Machinery
              </a>
              <a href="#industries" className="font-heading font-semibold text-xs uppercase tracking-widest text-text-muted hover:text-brand-amber transition-colors py-2 border-b-2 border-transparent hover:border-brand-amber">
                Industries Served
              </a>
              <a href="#b2b-calc" className="font-heading font-semibold text-xs uppercase tracking-widest text-brand-amber hover:text-brand-primary transition-colors py-2 border-b-2 border-transparent flex items-center gap-1.5">
                <Sliders size={12} className="animate-pulse" />
                Spec Calc
              </a>
            </div>

            {/* Call to Action CTA block (WhatsApp prioritised) */}
            <div className="hidden lg:flex items-center gap-3">
              <a 
                href="#contact" 
                className="bg-transparent border border-industry-slate hover:border-brand-amber hover:text-brand-amber px-4 py-2.5 font-heading text-xs uppercase tracking-widest font-bold transition-all"
              >
                REQUEST ESTIMATE
              </a>
              <a 
                href="https://wa.me/918160749336?text=Hello%20Chamunda%20Enterprise,%20I%20am%20visiting%20your%20B2B%20site%20and%20would%20like%20to%20request%20an%20engineering%20quote."
                target="_blank"
                rel="no-referrer"
                className="bg-brand-amber hover:bg-brand-primary text-bg-heavy px-5 py-2.5 font-heading text-xs uppercase tracking-widest font-black flex items-center gap-1.5 transition-colors duration-300 relative group overflow-hidden"
              >
                <div className="absolute inset-0 bg-transparent group-hover:bg-[#ffb800]/20 transition-colors" />
                <span className="material-symbols-outlined text-[18px] font-bold">chat</span>
                WHATSAPP CHAT
              </a>
            </div>

            {/* Burger Control for Mobile responsive devices */}
            <div className="flex lg:hidden items-center">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-[#e1e2e8] hover:text-brand-amber p-2 outline-none cursor-pointer"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Responsive Navigation Tray */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-bg-heavy border-b border-industry-slate/80 text-text-light px-4 py-6 space-y-4 font-mono text-sm leading-relaxed animate-fade-in absolute w-full left-0">
            <a 
              href="#about" 
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-text-muted hover:text-brand-amber border-b border-industry-slate/45"
            >
              OUR HERITAGE
            </a>
            <a 
              href="#products-showcase" 
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-text-muted hover:text-brand-amber border-b border-industry-slate/45"
            >
              PRODUCT CATALOG
            </a>
            <a 
              href="#technical-capabilities" 
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-text-muted hover:text-brand-amber border-b border-industry-slate/45"
            >
              CAPABILITIES & WELDING
            </a>
            <a 
              href="#machinery" 
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-text-muted hover:text-brand-amber border-b border-industry-slate/45"
            >
              REAL MACHINERY GALLERY
            </a>
            <a 
              href="#industries" 
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-text-muted hover:text-brand-amber border-b border-industry-slate/45"
            >
              INDUSTRIES SERVED
            </a>
            <a 
              href="#b2b-calc" 
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-brand-amber font-bold border-b border-industry-slate/45"
            >
              B2B SPEC CALCULATOR
            </a>
            <div className="pt-4 flex flex-col sm:flex-row gap-3">
              <a 
                href="#contact" 
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center bg-transparent border border-brand-amber text-brand-amber px-4 py-3 font-heading text-xs uppercase tracking-widest font-black"
              >
                REQUEST RFQ
              </a>
              <a 
                href="https://wa.me/918160749336"
                className="w-full text-center bg-brand-amber text-bg-heavy px-4 py-3 font-heading text-xs uppercase tracking-widest font-black flex items-center justify-center gap-1.5"
              >
                WHATSAPP CHAT
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* 3. PREMIUM DEEP HERO SECTION */}
      <header className="relative w-full overflow-hidden bg-bg-heavy grid-blueprint py-16 md:py-24 lg:py-32 border-b border-industry-slate/80">
        
        {/* Real Industrial Factory Image Underlay */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center grayscale opacity-15 select-none" 
          style={{ 
            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCqY-J4Pa0M2yW7NfJoMhyq22qFqm3xXRlIhpoMdaQAnnioKGiEbwdgHQMIL3dqXctQnNPoUEGlCxZ4qQJkNYiE4O4beYLBpL7vtZGBZX0HZvG6ytXlDbTPkNrNbBuPI0B5_BjCJpmBY9sOnfA5Z-GBbAU7wNTJz5p65HKj1IzaIwSnIp8TIPzfdj7BpWTQBvUe-lRVPt_vlYhDJuEPTaO6m8K6KTUMabixy5IFgl9Wp60mgnZOQTbTYy1vbJJs_4t8L2rt5QK8KQvV')` 
          }} 
        />

        {/* Dynamic Dark Gradient Shroud */}
        <div className="absolute inset-0 bg-gradient-to-r from-bg-heavy via-bg-heavy/90 to-transparent z-10" />

        {/* Ambient Amber Pulse */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-brand-amber/5 rounded-full filter blur-[100px] pointer-events-none" />

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Mission Description */}
            <div className="lg:col-span-7 space-y-8 animate-fade-in">
              <div className="flex items-center gap-3">
                <div className="hazard-stripes-mini h-3 w-16" />
                <span className="font-mono text-xs text-brand-amber tracking-widest font-black uppercase bg-brand-amber/10 px-3 py-1 border border-brand-amber/30">
                  PRECISION STAINLESS STEEL & WIRE fabrication
                </span>
              </div>

              <h1 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-text-light tracking-tight leading-none uppercase">
                HEAVY-DUTY <br />
                <span className="text-brand-amber font-heading font-black">WIRE-FORMING</span> &amp; <br />
                CNC JOBWORK
              </h1>

              <p className="font-sans text-base sm:text-lg text-text-muted max-w-xl leading-relaxed">
                Chamunda Enterprise is an engineering powerhouse in Gujarat, India, mastering CNC wire bending, high-tensile resistance welding, and custom metal hardware. We forge high-volume components with micro-level tolerance boundaries.
              </p>

              {/* Real Factory Stats Row */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-b border-industry-slate/60 py-6 max-w-2xl font-mono">
                <div>
                  <span className="block text-2xl font-heading font-black text-brand-primary">12.0 mm</span>
                  <span className="text-[10px] text-text-muted uppercase tracking-wider block mt-1">MAX WIRE CAPACITY</span>
                </div>
                <div>
                  <span className="block text-2xl font-heading font-black text-brand-primary">±0.05mm</span>
                  <span className="text-[10px] text-text-muted uppercase tracking-wider block mt-1">CNC ACCURACY GAUGE</span>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <span className="block text-2xl font-heading font-black text-brand-primary">100% SEAM</span>
                  <span className="text-[10px] text-text-muted uppercase tracking-wider block mt-1">WELD INTEGRITY INSPECT</span>
                </div>
              </div>

              {/* Hero Action CTA buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <a 
                  href="#products-showcase" 
                  className="bg-brand-amber hover:bg-brand-primary text-bg-heavy px-8 py-4 font-heading font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 rounded-none transition-colors duration-200"
                >
                  EXPLORE PRODUCT CLASS
                  <span className="material-symbols-outlined text-lg">category</span>
                </a>
                <a 
                  href="#b2b-calc" 
                  className="bg-bg-heavy border-2 border-industry-slate hover:border-brand-amber hover:text-brand-amber text-text-light px-8 py-4 font-heading font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 rounded-none transition-all duration-300"
                >
                  SIMULATE CNC SPEC
                  <span className="material-symbols-outlined text-lg">robot_2</span>
                </a>
              </div>
            </div>

            {/* Right Column: Interactive Real Factory Monitor Panel */}
            <div className="lg:col-span-5 space-y-6">
              <div className="border border-industry-slate bg-bg-card p-5 relative overflow-hidden group">
                <div className="absolute top-0 left-0 right-0 h-[2px] hazard-stripes-mini" />
                
                {/* Visual Representation of Active Working machine interface */}
                <div className="bg-bg-heavy border border-industry-slate p-3 font-mono text-xs space-y-3">
                  <div className="flex justify-between items-center text-[10px] text-brand-amber font-bold border-b border-industry-slate pb-1">
                    <span>LIVE MACHINERY STATUS LINK</span>
                    <span className="flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                      ACTIVE
                    </span>
                  </div>

                  <div className="space-y-1 text-text-muted text-[11px]">
                    <p className="flex justify-between"><span className="text-text-muted">CNC Controller:</span> <span className="text-text-light font-bold">LinuxCNC V4.2</span></p>
                    <p className="flex justify-between"><span className="text-text-muted">Despatch Node:</span> <span className="text-text-light font-bold">Gujarat.Port-3000</span></p>
                    <p className="flex justify-between"><span className="text-text-muted">Line Temperature:</span> <span className="text-text-light font-bold">42.4°C</span></p>
                    <p className="flex justify-between"><span className="text-text-muted">Current Output:</span> <span className="text-text-light font-bold">SS-304 / Wire Hook Jigs</span></p>
                  </div>
                </div>

                {/* Substantially detailed visual representing factory precision */}
                <div className="relative h-64 border border-industry-slate/80 overflow-hidden bg-bg-heavy mt-4 group">
                  <img 
                    alt="Precision Wire Bender" 
                    className="w-full h-full object-cover opacity-75 grayscale group-hover:grayscale-0 transition-all duration-700"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDpcdjCLkmDZcof7PkP9FWMoMDAym3VEQevG2GI0JEUSc9y0KZ0pvLkuRC5ThW_f7u4LoBVhsgxZDq1gpkADkiCwFh0cvNhtwuEpplJOcvh9GtVGA5-aPOcRZ_ifZCkC3Soo9OO1hH9FRspnyxXm9eSH7ifBrloyOjugZsWjkfEjhkB80ed_-Cipm8I_4vD2oD-occSgnGuT_925vm1jUWVx9aHKS60IlAfjSqz9y959wJqvFfGOrN5S9qrAsZxR4if-oHM_nNiJ8BH"
                  />
                  <div className="absolute bottom-3 left-3 bg-bg-dark/95 border border-industry-slate px-3 py-1 font-mono text-[10px] text-text-muted uppercase">
                    Machine Model: <span className="text-brand-amber font-bold">CE-3D-12X</span>
                  </div>
                </div>

                <div className="mt-4 flex justify-between items-center text-xs">
                  <div className="flex items-center gap-1 text-text-muted">
                    <Info size={14} className="text-brand-amber shrink-0" />
                    <span className="p-0.5 text-[11px] font-mono">Real Gujarat plant machinery asset</span>
                  </div>
                  <button 
                    onClick={() => setShowFactoryTourNote(true)}
                    className="text-brand-amber font-mono text-[11px] font-bold uppercase hover:underline cursor-pointer"
                  >
                    INSPECT SYSTEM
                  </button>
                </div>

                {showFactoryTourNote && (
                  <div className="mt-4 p-3 bg-bg-heavy border-l-2 border-brand-amber text-[11px] text-text-muted font-mono animate-fade-in relative">
                    <button 
                      onClick={() => setShowFactoryTourNote(false)}
                      className="absolute top-2 right-2 text-text-muted hover:text-text-light"
                    >
                      ×
                    </button>
                    <p className="font-sans leading-relaxed text-text-light uppercase font-bold text-xs mb-1">FACTORY INSPECTION DIRECTIVE</p>
                    <p className="font-sans leading-relaxed">
                      Wholesalers and custom fabrication clients are welcome to coordinate physically scheduled inspections of our CNC multi-bend stations in Gujarat. Schedule via direct Sales email or click WhatsApp.
                    </p>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </header>

      {/* 4. HERITAGE & TRUST MATURITY SECTION */}
      <section id="about" className="py-20 bg-bg-heavy border-b border-industry-slate/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Visual highlight on raw steel rods */}
            <div className="lg:col-span-5 relative">
              <div className="absolute inset-0 bg-brand-amber/10 transform translate-x-3 translate-y-3 z-0"></div>
              <div className="relative border border-industry-slate p-2 bg-bg-dark z-10">
                <img 
                  alt="Industrial machinery" 
                  className="w-full h-auto object-cover grayscale aspect-square hover:grayscale-0 transition-opacity duration-300"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCqY-J4Pa0M2yW7NfJoMhyq22qFqm3xXRlIhpoMdaQAnnioKGiEbwdgHQMIL3dqXctQnNPoUEGlCxZ4qQJkNYiE4O4beYLBpL7vtZGBZX0HZvG6ytXlDbTPkNrNbBuPI0B5_BjCJpmBY9sOnfA5Z-GBbAU7wNTJz5p65HKj1IzaIwSnIp8TIPzfdj7BpWTQBvUe-lRVPt_vlYhDJuEPTaO6m8K6KTUMabixy5IFgl9Wp60mgnZOQTbTYy1vbJJs_4t8L2rt5QK8KQvV"
                />
                <div className="absolute top-6 left-6 hazard-stripes h-4 w-20 shadow-md"></div>
                <div className="absolute bottom-6 right-6 bg-brand-amber border border-bg-heavy text-bg-heavy text-xs font-mono font-black uppercase px-3 py-1.5 shadow-lg">
                  ESTD INDIA
                </div>
              </div>
            </div>

            {/* About text detailing trust elements */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-brand-amber font-bold uppercase tracking-widest bg-brand-amber/10 px-2.5 py-1">
                  MANUFACTURING METTLE
                </span>
                <span className="h-px bg-industry-slate flex-grow"></span>
              </div>

              <h2 className="font-heading font-black text-3xl sm:text-4xl text-text-light uppercase">
                Unyielding Metals. Meticulous Grids. <br />
                <span className="text-brand-amber">INDIA-FIRST FABRICATION CO.</span>
              </h2>

              <p className="font-sans text-sm sm:text-base text-text-muted leading-relaxed">
                At Chamunda Enterprise, our metalwork roots are embedded deep within India's industrial engine. We don’t just build templates—we engineer thick-gauge stainless steel components that carry hundreds of kilograms across hostile automotive and marine environments. Our signature 3D CNC Wire Benders are programmed to eliminate material fatigue during high-angle curls.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                
                {/* Trust Pillar 1 */}
                <div className="flex gap-3">
                  <div className="h-10 w-10 bg-brand-amber/10 border border-brand-amber/30 text-brand-amber flex items-center justify-center shrink-0">
                    <Award size={20} />
                  </div>
                  <div>
                    <h4 className="font-heading font-black uppercase text-sm text-text-light">Certified Steel Sourcing</h4>
                    <p className="text-xs text-text-muted mt-1 leading-relaxed">
                      Every material batch undergoes precise spectroscopic analysis to guarantee actual SS 304 / SS 316 grade performance under exposure.
                    </p>
                  </div>
                </div>

                {/* Trust Pillar 2 */}
                <div className="flex gap-3">
                  <div className="h-10 w-10 bg-brand-amber/10 border border-brand-amber/30 text-brand-amber flex items-center justify-center shrink-0">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <h4 className="font-heading font-black uppercase text-sm text-text-light">Rigorous Quality Validation</h4>
                    <p className="text-xs text-text-muted mt-1 leading-relaxed">
                      Multi-tier tensile fatigue checks ensure our weld junctions do not shear under continuous pneumatic vibration or extreme loads.
                    </p>
                  </div>
                </div>

                {/* Trust Pillar 3 */}
                <div className="flex gap-3">
                  <div className="h-10 w-10 bg-brand-amber/10 border border-brand-amber/30 text-brand-amber flex items-center justify-center shrink-0">
                    <HardHat size={20} />
                  </div>
                  <div>
                    <h4 className="font-heading font-black uppercase text-sm text-text-light">Expert B2B Consultation</h4>
                    <p className="text-xs text-text-muted mt-1 leading-relaxed">
                      Receive detailed CAD analysis, structural stress calculations, and tooling recommendations from veteran manufacturing professionals.
                    </p>
                  </div>
                </div>

                {/* Trust Pillar 4 */}
                <div className="flex gap-3">
                  <div className="h-10 w-10 bg-brand-amber/10 border border-brand-amber/30 text-brand-amber flex items-center justify-center shrink-0">
                    <Hourglass size={20} />
                  </div>
                  <div>
                    <h4 className="font-heading font-black uppercase text-sm text-text-light">Expedited Dispatch Logistics</h4>
                    <p className="text-xs text-text-muted mt-1 leading-relaxed">
                      Located in Gujarat's manufacturing heartland with robust pathways for direct road containers, rail, and heavy ocean cargo dispatch.
                    </p>
                  </div>
                </div>

              </div>

              {/* Interaction helper: active machine count slider */}
              <div className="mt-4 p-4 bg-bg-card/40 border border-industry-slate/80">
                <div className="flex justify-between items-center mb-1 text-xs font-mono text-text-muted">
                  <span>Factory Machine Lines active right now:</span>
                  <span className="text-brand-amber font-bold">{liveFactoryActiveUnits} units</span>
                </div>
                <input 
                  type="range"
                  min="3"
                  max="12"
                  value={liveFactoryActiveUnits}
                  onChange={(e) => setLiveFactoryActiveUnits(parseInt(e.target.value))}
                  className="w-full h-1 bg-industry-slate accent-brand-amber cursor-ew-resize"
                />
                <p className="text-[10px] text-text-muted font-mono mt-1">
                  Adjusting live simulator lines changes our custom tooling and CNC processing turnaround matrix (~{liveFactoryActiveUnits * 16}k daily piece capability).
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE PRODUCT SHOWCASE */}
      <section id="products-showcase" className="py-20 bg-bg-card border-b border-industry-slate/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-industry-slate/80 pb-6 mb-12">
            <div>
              <span className="font-mono text-xs text-brand-amber uppercase tracking-widest block mb-2 font-bold">
                COMMERCIAL-GRADE CAPABILITY
              </span>
              <h2 className="font-heading font-black text-3xl sm:text-4xl text-text-light uppercase tracking-tight">
                OUR HIGH-TENSILE PRODUCT CATALOG
              </h2>
            </div>
            <p className="text-sm text-text-muted max-w-sm mt-4 md:mt-0 font-sans leading-relaxed">
              We manufacture certified, stress-tested stainless steel and carbon alloy wire segments configured precisely to matching tolerances.
            </p>
          </div>

          {/* Interactive filter tabs */}
          <div className="flex flex-wrap items-center gap-2 mb-8 font-mono text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 border transition-all rounded-none cursor-pointer uppercase font-bold tracking-wider ${
                  selectedCategory === cat
                    ? "bg-brand-amber border-brand-amber text-bg-heavy"
                    : "bg-bg-heavy border-industry-slate text-text-muted hover:border-brand-primary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid Layout of Products */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((prod) => (
              <div 
                key={prod.id}
                className={`border text-text-light flex flex-col justify-between transition-all duration-300 relative group cursor-pointer ${
                  selectedProduct?.id === prod.id 
                    ? "border-brand-amber bg-bg-heavy" 
                    : "border-industry-slate bg-bg-heavy/60 hover:border-text-muted"
                }`}
                onClick={() => setSelectedProduct(prod)}
              >
                <div>
                  {/* Image Holder with technical badge */}
                  <div className="relative h-60 bg-bg-heavy overflow-hidden border-b border-industry-slate">
                    <img 
                      alt={prod.name} 
                      className="w-full h-full object-cover grayscale opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                      referrerPolicy="no-referrer"
                      src={prod.image}
                    />
                    <div className="absolute top-3 right-3 bg-bg-heavy/90 border border-brand-amber font-mono text-[9px] text-brand-primary px-2 py-1 uppercase tracking-wider">
                      {prod.sku}
                    </div>
                  </div>

                  {/* Body Text */}
                  <div className="p-6 space-y-3">
                    <span className="text-[10px] font-mono uppercase bg-industry-slate text-text-muted px-2 py-0.5 inline-block">
                      {prod.category}
                    </span>
                    <h3 className="font-heading font-extrabold text-lg text-text-light group-hover:text-brand-amber uppercase transition-colors">
                      {prod.name}
                    </h3>
                    <p className="font-sans text-xs text-text-muted leading-relaxed line-clamp-3">
                      {prod.description}
                    </p>
                  </div>
                </div>

                {/* Technical specifications overlay shortcut */}
                <div className="p-6 pt-0 border-t border-industry-slate/30 mt-4 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {prod.materials.slice(0, 2).map((m) => (
                      <span key={m} className="text-[9px] font-mono text-brand-amber bg-bg-heavy py-0.5 px-1.5 border border-brand-amber/20">
                        {m}
                      </span>
                    ))}
                  </div>

                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleInquireFromProduct(prod);
                    }}
                    className="text-brand-amber font-mono text-xs font-semibold flex items-center gap-1.5 hover:underline cursor-pointer"
                  >
                    RFQ LINK
                    <ArrowUpRight size={14} />
                  </button>
                </div>

                {/* Rigid amber corner highlight */}
                <div className="absolute bottom-0 right-0 h-1.5 w-1.5 bg-brand-amber opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>

          {/* Deep inspection section for the selected product */}
          {selectedProduct && (
            <div className="mt-12 bg-bg-heavy border border-brand-amber/40 p-6 md:p-8 animate-fade-in relative grid-blueprint">
              <div className="absolute top-0 left-0 right-0 h-1.5 hazard-stripes" />
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                {/* Real-time details */}
                <div className="space-y-6">
                  <div>
                    <span className="text-xs font-mono text-brand-amber uppercase tracking-wider block mb-1">
                      BLUEPRINT LINK FOR SPECIFICATION CARD
                    </span>
                    <h3 className="font-heading font-black text-2xl text-brand-primary uppercase">
                      {selectedProduct.name} INSPECTION LOG
                    </h3>
                  </div>

                  <p className="font-sans text-sm text-text-muted leading-relaxed">
                    {selectedProduct.description}
                  </p>

                  {/* Built as Specifications list with Mono keys on left, value on right */}
                  <div className="space-y-3 font-mono text-xs">
                    <div className="flex justify-between items-center border-b border-industry-slate/60 pb-2">
                      <span className="text-text-muted">MANUFACTURER CORE PART SKU:</span>
                      <span className="text-text-light font-black text-brand-amber">{selectedProduct.sku}</span>
                    </div>
                    {selectedProduct.specifications.map((spec) => (
                      <div key={spec.label} className="flex justify-between items-center border-b border-industry-slate/60 pb-2">
                        <span className="text-text-muted">{spec.label.toUpperCase()}:</span>
                        <span className="text-text-light font-bold">{spec.value}</span>
                      </div>
                    ))}
                    <div className="flex justify-between items-center border-b border-industry-slate/60 pb-2">
                      <span className="text-text-muted">CNC PLANE COMPLEXITY TARGET:</span>
                      <span className={`text-[11px] font-black uppercase px-2 py-0.5 ${
                        selectedProduct.cncComplexity === "High" ? "bg-red-500/20 text-red-500 border border-red-500/30" :
                        selectedProduct.cncComplexity === "Medium" ? "bg-brand-amber/15 text-brand-amber border border-brand-amber/30" :
                        "bg-green-500/20 text-green-500 border border-green-500/30"
                      }`}>
                        {selectedProduct.cncComplexity} CNC RIG
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button 
                      onClick={() => handleInquireFromProduct(selectedProduct)}
                      className="bg-brand-amber hover:bg-brand-primary text-bg-heavy px-6 py-3 font-heading text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 rounded-none transition-colors cursor-pointer"
                    >
                      REQUEST ESTIMATE SPEC SHEETS
                      <ArrowRight size={14} />
                    </button>
                    <a
                      href="#b2b-calc"
                      className="bg-transparent border border-industry-slate hover:border-brand-amber text-text-light hover:text-brand-amber px-6 py-3 font-heading text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 rounded-none transition-all duration-300"
                    >
                      CALCULATE WEIGHT & DENSITY
                    </a>
                  </div>
                </div>

                {/* Schematic or heavy blueprint visual */}
                <div className="bg-[#0D0F11] border border-industry-slate/80 p-5 font-mono text-xs space-y-4">
                  <div className="flex justify-between items-center border-b border-industry-slate/60 pb-2 text-[10px] text-text-muted">
                    <span>SCHEMATIC OVERLAY</span>
                    <span className="text-brand-amber font-mono">DENSITY METRIC LOADED</span>
                  </div>

                  {/* Wire Grid graphic built via CSS */}
                  <div className="h-44 bg-[#0a0c0e] border border-brand-amber/10 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,184,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,184,0,0.02)_1px,transparent_1px)] bg-[size:10px_10px]" />
                    
                    {/* Visual wire contour based on selection */}
                    <div className="relative z-10 w-full px-6 flex flex-col items-center justify-center text-center space-y-2">
                      <div className="border border-brand-amber/30 p-2 bg-bg-dark rounded-none text-[10px] text-brand-primary inline-block">
                        {selectedProduct.sku} // CORE GEOMETRY DESIGN ROUTE
                      </div>
                      <span className="text-text-muted text-[11px] font-sans">
                        Guaranteed structural performance with no corner warping or overlapping.
                      </span>
                    </div>
                  </div>

                  <div className="text-[10px] text-text-muted leading-relaxed space-y-1">
                    <p className="flex justify-between"><span>* Tensile Resistance:</span> <span className="text-brand-primary font-bold">&gt; 800 N/mm²</span></p>
                    <p className="flex justify-between"><span>* Elastic Shear Limits:</span> <span className="text-brand-primary">Grade SS 304 Electro Polished</span></p>
                    <p className="flex justify-between"><span>* Factory Production Time:</span> <span className="text-brand-amber font-bold">{selectedProduct.productionLeadTime} Max</span></p>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* 6. MANUFACTURING TECHNICAL CAPABILITIES */}
      <section id="technical-capabilities" className="py-20 bg-bg-heavy border-b border-industry-slate/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mb-16">
            <span className="font-mono text-xs text-brand-amber font-black uppercase tracking-widest bg-brand-amber/10 px-3 py-1 border border-brand-amber/30 inline-block mb-3">
              TECHNICAL REPERTOIRE
            </span>
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-text-light uppercase">
              REVOLUTIONARY MANUFACTURING CAPABILITIES
            </h2>
            <p className="font-sans text-sm sm:text-base text-text-muted mt-2 leading-relaxed">
              We focus on micro-level design tolerances. Utilizing multi-axis continuous CNC wire machinery and high-frequency resistance welding, structural failure at critical joints is mathematically mitigated down to virtual zero.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CAPABILITIES.map((cap) => (
              <div 
                key={cap.id}
                className="border border-industry-slate bg-bg-card p-6 flex flex-col justify-between hover:border-brand-amber transition-all duration-300 relative group"
              >
                {/* Header info */}
                <div className="space-y-4">
                  <div className="h-10 w-10 bg-brand-amber/10 border border-brand-amber/20 text-brand-amber flex items-center justify-center rounded-none font-bold">
                    <span className="font-mono text-xs">0{cap.id === "cnc-forming" ? "1" : cap.id === "resistance-welding" ? "2" : cap.id === "surface-passivation" ? "3" : "4"}</span>
                  </div>

                  <h3 className="font-heading font-black text-base uppercase text-[#e1e2e8] group-hover:text-brand-amber transition-colors">
                    {cap.title}
                  </h3>

                  <p className="font-sans text-xs text-text-muted leading-relaxed">
                    {cap.description}
                  </p>
                </div>

                {/* Technical metric display on footer */}
                <div className="mt-6 border-t border-industry-slate/40 pt-4 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-text-muted">SPEC LIMIT:</span>
                  <span className="text-brand-amber font-bold">{cap.technicalMetric}</span>
                </div>

                {/* Mini stripe highlight under cards */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-transparent group-hover:bg-brand-amber transition-colors" />
              </div>
            ))}
          </div>

          {/* Special highlights section on spot welding */}
          <div className="mt-12 bg-bg-dark border border-industry-slate/80 p-6 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 h-full w-24 hazard-stripes-subtle rotate-12 pointer-events-none" />

            <div className="flex items-start gap-4">
              <div className="p-3 bg-brand-amber/10 text-brand-amber border border-brand-amber/20 shrink-0">
                <Flame size={24} className="animate-pulse" />
              </div>
              <div>
                <h4 className="font-heading font-bold uppercase text-sm text-text-light">Micro-Resistance Butt Welding Standard</h4>
                <p className="text-xs text-text-muted max-w-2xl leading-relaxed mt-1 font-sans">
                  Unlike conventional arc or MIG setups that leave massive heat tracks and weaken high-tensile spring steel, our micro-spot resistance welds deliver absolute atomic bonding across contact points. Racks and grids carry immense pressure without bending fatigue.
                </p>
              </div>
            </div>

            <a 
              href="#b2b-calc" 
              className="bg-transparent border border-industry-slate hover:border-brand-amber text-text-light hover:text-brand-amber px-6 py-2.5 font-heading text-xs uppercase tracking-widest font-black shrink-0 transition-colors"
            >
              SIMULATE CAPACITY
            </a>
          </div>

        </div>
      </section>

      {/* 7. DETAILED HEAVY MACHINERY GALLERY */}
      <section id="machinery" className="py-20 bg-bg-heavy border-b border-industry-slate/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
            <div className="lg:col-span-7">
              <span className="font-mono text-xs text-brand-amber font-black uppercase tracking-widest inline-block mb-3 bg-brand-amber/10 px-3 py-1 border border-brand-amber/30">
                INDUSTRIAL INFRASTRUCTURE
              </span>
              <h2 className="font-heading font-black text-3xl sm:text-4xl text-text-light uppercase">
                REAL GUJARAT FACTORY MACHINERY ASSETS
              </h2>
              <p className="font-sans text-sm sm:text-base text-text-muted mt-2 leading-relaxed">
                Explore the actual machines operating on our factory floors. Our flagship CNC multi-axis wire benders are equipped with continuous telemetry systems, running self-correction sensors that adjust wire stretch during high-speed runs.
              </p>
            </div>
            
            <div className="lg:col-span-5 flex lg:justify-end gap-4 font-mono text-xs">
              <div className="bg-bg-dark border border-industry-slate p-4 text-center shrink-0">
                <span className="block text-3xl font-heading font-black text-brand-amber">7 Axes</span>
                <span className="text-[10px] text-text-muted uppercase">SYNC CNC DRIVERS</span>
              </div>
              <div className="bg-bg-dark border border-industry-slate p-4 text-center shrink-0">
                <span className="block text-3xl font-heading font-black text-brand-amber">24/7</span>
                <span className="text-[10px] text-text-muted">MANUFACTURING UP-TIME</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {MACHINERY.map((mac) => (
              <div 
                key={mac.id}
                className="border border-industry-slate bg-[#0D0F11] p-4 flex flex-col justify-between group rounded-none hover:border-brand-amber transition-all"
              >
                <div>
                  {/* Photo with zoom */}
                  <div className="relative h-60 bg-bg-heavy overflow-hidden border border-industry-slate/80 mb-4 cursor-pointer">
                    <img 
                      alt={mac.model} 
                      className="w-full h-full object-cover scale-110 grayscale hover:grayscale-0 group-hover:scale-105 transition-all duration-700 opacity-75 group-hover:opacity-100"
                      src={mac.image}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-heavy via-transparent to-transparent opacity-60 pointer-events-none" />
                    
                    <span className="absolute bottom-3 right-3 font-mono text-[9px] bg-bg-dark/95 text-brand-amber px-2 py-1 border border-brand-amber/30 uppercase font-black">
                      ACTIVE LINE
                    </span>
                  </div>

                  <div className="space-y-2">
                    <span className="text-[9px] font-mono text-text-muted uppercase bg-industry-slate px-2 py-0.5 inline-block">
                      {mac.type}
                    </span>
                    <h3 className="font-heading font-black text-lg text-text-light group-hover:text-brand-amber uppercase transition-colors">
                      {mac.model}
                    </h3>
                    <p className="font-sans text-xs text-text-muted leading-relaxed">
                      Sourced from authorized heavy manufacturing corporations, customized with a proprietary terminal interface for micro-angle cuts.
                    </p>
                  </div>

                  {/* Core capabilities list */}
                  <div className="mt-4 pt-4 border-t border-industry-slate/40 space-y-1">
                    <span className="block text-[10px] font-mono text-brand-amber uppercase font-black mb-1">CAPABILITY HIGHLIGHTS:</span>
                    {mac.capabilities.slice(0, 3).map((item, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-[11px] text-text-muted font-sans font-medium">
                        <span className="h-1 w-1 bg-brand-amber rounded-full" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Spec inspect triggering */}
                <div className="mt-6 pt-4 border-t border-industry-slate/40 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-text-muted">ORIGIN: {mac.origin.toUpperCase()}</span>
                  <button 
                    onClick={() => setInspectedMachine(mac)}
                    className="text-brand-amber hover:underline font-mono text-xs uppercase cursor-pointer"
                  >
                    SPECS SHEET
                  </button>
                </div>
              </div>
            ))}

            {/* Simulated Additional Machine Cards representing scale */}
            <div className="border border-industry-slate bg-[#0D0F11] p-6 flex flex-col justify-between group relative grid-blueprint">
              <div className="space-y-4">
                <span className="text-[9px] font-mono text-brand-amber uppercase bg-brand-amber/15 px-2 py-0.5 inline-block">
                  INFRASTRUCTURE UNIT 02
                </span>
                <h3 className="font-heading font-black text-lg text-text-light uppercase">
                  HEAVY-DIAMETER COIL STRAIGHTENER
                </h3>
                <p className="font-sans text-xs text-text-muted leading-relaxed">
                  Heavy decoiler station with dual-motor computerized tension leveler. Takes nested raw material wire coils and perfectly straightens physical stresses.
                </p>

                <div className="space-y-2 font-mono text-xs pt-4 border-t border-industry-slate/40">
                  <div className="flex justify-between">
                    <span className="text-text-muted">straight gauge cap:</span>
                    <span className="text-text-light font-bold">1.5 - 14.0 mm</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted">Feed Limit Rate:</span>
                    <span className="text-text-light font-bold">120 m / minute</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 text-[10px] font-mono text-text-muted">
                COIL STATION UNIT #2
              </div>
            </div>

            {/* Simulated Additional Machine Cards representing scale */}
            <div className="border border-industry-slate bg-[#0D0F11] p-6 flex flex-col justify-between group relative grid-blueprint">
              <div className="space-y-4">
                <span className="text-[9px] font-mono text-brand-amber uppercase bg-brand-amber/15 px-2 py-0.5 inline-block">
                  INFRASTRUCTURE UNIT 03
                </span>
                <h3 className="font-heading font-black text-lg text-text-light uppercase">
                  HIGH-VACUUM POLISHING TUBES
                </h3>
                <p className="font-sans text-xs text-text-muted leading-relaxed">
                  Automatic chemical polishing and rinse system, depositing a dense Chromium-Oxide film barrier over SS-304 wires for clean modular kitchen baskets.
                </p>

                <div className="space-y-2 font-mono text-xs pt-4 border-t border-industry-slate/40">
                  <div className="flex justify-between">
                    <span className="text-text-muted">Surface Gloss Level:</span>
                    <span className="text-text-light font-bold">Grade 8 (Mirror Gloss)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted">Passivity Layer:</span>
                    <span className="text-text-light font-bold">99.4% uniform</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 text-[10px] font-mono text-text-muted">
                FINISHING VAT AREA #4
              </div>
            </div>
          </div>

          {/* Machine spec modal if inspected */}
          {inspectedMachine && (
            <div className="fixed inset-0 bg-bg-heavy/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
              <div className="bg-bg-dark border-2 border-brand-amber max-w-lg w-full p-6 space-y-6 relative grid-blueprint">
                <div className="absolute top-0 left-0 right-0 h-1.5 hazard-stripes" />
                
                <button 
                  onClick={() => setInspectedMachine(null)}
                  className="absolute top-3 right-3 text-text-muted hover:text-text-light font-bold text-lg"
                >
                  <X />
                </button>

                <div>
                  <span className="font-mono text-xs text-brand-amber uppercase block mb-1">TECHNICAL ASSET DATA SHEET</span>
                  <h3 className="font-heading font-black text-xl text-brand-primary uppercase">{inspectedMachine.model}</h3>
                </div>

                <div className="space-y-4 font-mono text-xs">
                  {inspectedMachine.specs.map((item) => (
                    <div key={item.label} className="flex justify-between border-b border-industry-slate/60 pb-2">
                      <span className="text-text-muted uppercase">{item.label}:</span>
                      <span className="text-text-light font-bold">{item.value}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                  <span className="block text-[10px] font-mono uppercase text-brand-amber mb-2 font-bold">Programmatic Capability:</span>
                  <div className="space-y-1 text-xs">
                    {inspectedMachine.capabilities.map((cap, idx) => (
                      <p key={idx} className="flex items-center gap-2">
                        <span className="text-brand-amber">✓</span>
                        <span className="text-text-muted">{cap}</span>
                      </p>
                    ))}
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button 
                    onClick={() => setInspectedMachine(null)}
                    className="bg-brand-amber hover:bg-brand-primary text-bg-heavy px-6 py-2.5 font-heading text-xs uppercase font-extrabold cursor-pointer"
                  >
                    CLOSE DATASHEET
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* 8. INDUSTRIES WE SERVE */}
      <section id="industries" className="py-20 bg-bg-card border-b border-industry-slate/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-mono text-xs text-brand-amber font-black uppercase tracking-widest bg-brand-amber/10 px-3 py-1 border border-brand-amber/30 inline-block mb-3">
              DOWNSTREAM SECTORS
            </span>
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-text-light uppercase tracking-tight">
              PROUDLY SERVING INTEGRAL INDUSTRIES
            </h2>
            <p className="font-sans text-sm sm:text-base text-text-muted mt-2 leading-relaxed">
              Our precision wire-formed items are highly critical downstream materials. We are the backbone dispatch house for industrial kitchen suppliers, automotive OEM vendors, and shipping vessels across the coastal Indian corridor.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {INDUSTRIES.map((ind) => (
              <div 
                key={ind.id}
                className="border border-industry-slate bg-bg-heavy p-6 flex flex-col justify-between hover:border-brand-amber transition-all duration-300 relative group"
              >
                <div className="space-y-4">
                  <div className="h-10 w-10 bg-brand-amber/10 border border-brand-amber/20 text-brand-amber flex items-center justify-center shrink-0">
                    <Building2 size={20} />
                  </div>
                  <h3 className="font-heading font-extrabold text-[#e1e2e8] group-hover:text-brand-amber transition-colors uppercase text-sm leading-snug">
                    {ind.name}
                  </h3>
                  <p className="font-sans text-xs text-text-muted leading-relaxed">
                    {ind.description}
                  </p>
                </div>

                <div className="mt-6 border-t border-industry-slate/40 pt-4">
                  <span className="block text-[9px] font-mono text-brand-amber uppercase font-semibold mb-1">COMMON PARTS:</span>
                  <div className="space-y-0.5">
                    {ind.examples.map((item, id) => (
                      <span key={id} className="block text-[10px] font-mono text-text-light text-left">
                        - {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 9. WHY CHOOSE US - RUGGED B2B VALUES */}
      <section className="py-20 bg-bg-heavy border-b border-industry-slate/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="font-mono text-xs text-brand-amber font-black uppercase tracking-widest bg-brand-amber/10 px-3 py-1 border border-brand-amber/30 inline-block mb-1">
                OUR ENGINEERING VOW
              </span>
              <h2 className="font-heading font-black text-3xl sm:text-4xl text-text-light uppercase leading-none">
                WHY LEADING MANUFACTURERS TRUST <span className="text-brand-amber">CHAMUNDA</span>
              </h2>
              <p className="font-sans text-sm sm:text-base text-text-muted leading-relaxed">
                We believe in industrial truth and transparency. In India, procurement managers are often forced to choose between cheap, highly variable steel products or exorbitant pricing layers. At Chamunda, we bring the directness of pure, automated CNC metallurgy, certified materials, and prompt production dispatch.
              </p>

              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="h-8 w-8 rounded-none border border-brand-amber/20 bg-brand-amber/10 text-brand-amber flex items-center justify-center shrink-0 mt-1">
                    <CheckCircle2 size={16} />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-text-light uppercase text-sm">Strict Grade Integrity Guard</h4>
                    <p className="font-sans text-xs text-text-muted mt-1 leading-relaxed">
                      Every batch is verified. We provide physical chemical tests showing actual Chromium-Nickel percentage levels on SS-304/SS-316 runs.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="h-8 w-8 rounded-none border border-brand-amber/20 bg-brand-amber/10 text-brand-amber flex items-center justify-center shrink-0 mt-1">
                    <CheckCircle2 size={16} />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-text-light uppercase text-sm">Continuous Traceability Loops</h4>
                    <p className="font-sans text-xs text-text-muted mt-1 leading-relaxed">
                      We track your dispatch batch down to the master wire coil, permitting complete accountability for consumer safety compliance.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="h-8 w-8 rounded-none border border-brand-amber/20 bg-brand-amber/10 text-brand-amber flex items-center justify-center shrink-0 mt-1">
                    <CheckCircle2 size={16} />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-text-light uppercase text-sm">Bespoke Tooling turnaround</h4>
                    <p className="font-sans text-xs text-text-muted mt-1 leading-relaxed">
                      Our programmers program benders to translate raw CAD vectors into physical production loops in under 48 hours for swift prototypes.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="border border-industry-slate/80 p-6 bg-bg-card text-text-light space-y-6">
                <h3 className="font-heading font-black uppercase text-brand-primary tracking-wider text-lg border-b border-industry-slate/60 pb-3">
                  MANUFACTURING RELIABILITY FACT SHEET
                </h3>

                <div className="space-y-4 font-mono text-xs">
                  <div className="flex justify-between border-b border-industry-slate pb-2">
                    <span className="text-text-muted uppercase">Factory Office Base:</span>
                    <span className="text-text-light font-bold">Industrial Estate, Gujarat, India</span>
                  </div>
                  <div className="flex justify-between border-b border-industry-slate pb-2">
                    <span className="text-text-muted uppercase">Machinery Layout:</span>
                    <span className="text-text-light font-bold">CNC 3D automated synchronized loopers</span>
                  </div>
                  <div className="flex justify-between border-b border-industry-slate pb-2">
                    <span className="text-text-muted uppercase">Wire core tolerance:</span>
                    <span className="text-text-light font-bold">Within ± 0.05 mm</span>
                  </div>
                  <div className="flex justify-between border-b border-industry-slate pb-2">
                    <span className="text-text-muted uppercase">Maximum tensile load hook:</span>
                    <span className="text-[#ffb800] font-bold">250 kg force load</span>
                  </div>
                  <div className="flex justify-between border-b border-industry-slate pb-2">
                    <span className="text-text-muted uppercase">Quality Verification framework:</span>
                    <span className="text-text-light font-bold">ISO 9001:2015 QC loop inspection</span>
                  </div>
                </div>

                <div className="hazard-stripes-subtle h-8 w-full flex items-center justify-center border border-brand-amber/20">
                  <span className="text-[10px] font-mono font-black uppercase text-brand-amber tracking-widest text-center px-2">
                    PROVEN FABRICATION CALIBER IN INDIA
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 10. DYNAMIC B2B CALCULATOR WIDGET AREA */}
      <section className="py-20 bg-bg-heavy border-b border-industry-slate/80 select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="font-mono text-xs text-brand-amber font-black uppercase tracking-widest bg-brand-amber/10 px-3 py-1 border border-brand-amber/30 inline-block mb-3 animate-pulse">
              INTERACTIVE REQUISITION LINK
            </span>
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-text-light uppercase">
              B2B SPECIFICATION CONFIGURATOR & GENERATOR
            </h2>
            <p className="font-sans text-sm text-text-muted mt-2">
              Select your custom dimensions, test the safe payload threshold calculations securely, and instantly import the parameters directly into the quotation dispatch desk form below.
            </p>
          </div>

          <SpecsCalculator onApplySpec={handleApplySpecFromCalc} />
        </div>
      </section>

      {/* 11. INQUIRY + WHATSAPP SECURE CONVERSION AREA */}
      <section className="py-20 bg-bg-heavy grid-blueprint relative">
        {/* Subtle grid accent */}
        <div className="absolute inset-0 bg-transparent grid-blueprint pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <InquiryForm initialSpecsText={activeSpecString} />
        </div>
      </section>

      {/* 12. DETAILED B2B LOCAL NAVIGATION MAP FOR TRUST */}
      <section className="py-20 bg-bg-card border-t border-b border-industry-slate/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Direct India coordinate map placeholder/visual */}
            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-brand-amber uppercase tracking-widest bg-industry-slate p-1">
                  OFFICE COORDINATES
                </span>
                <span className="h-px bg-industry-slate flex-grow"></span>
              </div>
              
              <h3 className="font-heading font-black text-2xl text-text-light uppercase">
                GUJARAT HEADQUARTERS & MANUFACTURING HUB
              </h3>

              <p className="font-sans text-sm text-text-muted leading-relaxed">
                We operate directly from western India's high-scale manufacturing belt. Our logistics desk facilitates seamless container loading, routing, customs clearance, and road dispatch vectors for client orders across different states in India.
              </p>

              <div className="space-y-3 font-mono text-xs text-text-muted">
                <p className="flex gap-2 items-center">
                  <MapPin size={14} className="text-brand-amber shrink-0" />
                  <span>Industrial Area, Gujarat, India</span>
                </p>
                <p className="flex gap-2 items-center">
                  <Phone size={14} className="text-brand-amber shrink-0" />
                  <a href="tel:+918160749336" className="hover:text-brand-amber">+91 8160749336</a>
                </p>
                <p className="flex gap-2 items-center">
                  <Mail size={14} className="text-brand-amber shrink-0" />
                  <a href="mailto:sales.chamundaenterprise@gmail.com" className="hover:text-brand-amber">sales.chamundaenterprise@gmail.com</a>
                </p>
              </div>
            </div>

            {/* Simulated premium Blueprint map layout */}
            <div className="lg:col-span-6 bg-bg-heavy border border-industry-slate/80 p-5 font-mono text-xs space-y-4">
              <div className="flex justify-between text-[11px] text-brand-amber font-black border-b border-industry-slate pb-2">
                <span>LOGISTIC DISPATCH CHANNELS</span>
                <span>CHAMUNDA CONNECTIVITY</span>
              </div>

              <div className="bg-[#0b0e12] h-44 border border-industry-slate/60 flex flex-col justify-center px-4 space-y-3 relative overflow-hidden">
                <div className="absolute top-2 right-2 text-[9px] text-text-muted">NODE-01 LINK</div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-brand-amber shrink-0 animate-pulse" />
                    <span className="text-text-light text-[11px] font-bold">GUJARAT DISPATCH CENTER & HIGH-WAY MATRIX</span>
                  </div>
                  <p className="text-[10px] text-text-muted font-sans pl-4">
                    Direct access to state transport frameworks. Rapid clearance times for major port terminals.
                  </p>
                </div>
                
                <div className="h-px bg-industry-slate/40" />

                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-brand-amber shrink-0" />
                  <span className="text-text-light text-[11px] font-bold">DOMESTIC SHIPPING ROADS</span>
                </div>
              </div>

              <div className="text-[10px] text-text-muted">
                * Dispatch core coordinates: Ahmedabad-Rajkot Industrial Belt, Gujarat.
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 13. ROBUST FOOTER WITH CREDENTIALS */}
      <footer className="bg-bg-heavy border-t-4 border-brand-amber text-text-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 font-sans text-sm">
            
            {/* Branding Column */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 bg-brand-amber flex items-center justify-center border border-brand-amber text-bg-heavy font-heading font-black text-sm">
                  C
                </div>
                <h4 className="font-heading font-black text-lg text-text-light uppercase tracking-wider">
                  CHAMUNDA ENT.
                </h4>
              </div>
              <p className="text-xs text-text-muted leading-relaxed">
                Precision wire-forming, certified food-grade modular kitchen hangers, custom heavy container loop handles, and multi-axis CNC jobwork based in Gujarat, India.
              </p>
              <div className="font-mono text-[10px] text-brand-amber font-bold">
                ISO 9001:2015 REGISTERED COMPLIANCE
              </div>
            </div>

            {/* Core Services links */}
            <div className="space-y-4">
              <h5 className="font-heading font-black text-xs uppercase tracking-widest text-[#e1e2e8] border-b border-industry-slate/60 pb-2">
                DOWNSTREAM CAPABILITY
              </h5>
              <div className="flex flex-col space-y-2 font-mono text-xs">
                <a href="#technical-capabilities" className="hover:text-brand-amber transition-colors">3D CNC WIRE BENDING</a>
                <a href="#technical-capabilities" className="hover:text-brand-amber transition-colors">MICRO RESISTANCE WELDING</a>
                <a href="#technical-capabilities" className="hover:text-brand-amber transition-colors">ELECTRO-LYTIC PASSIVATION</a>
                <a href="#products-showcase" className="hover:text-brand-amber transition-colors">WH-100 WIRE HOOKS JIGS</a>
                <a href="#products-showcase" className="hover:text-brand-amber transition-colors">KB-250 KITCHEN SYSTEMS</a>
              </div>
            </div>

            {/* Corporate validation links */}
            <div className="space-y-4">
              <h5 className="font-heading font-black text-xs uppercase tracking-widest text-[#e1e2e8] border-b border-industry-slate/60 pb-2">
                TRUST & COMPLIANCE
              </h5>
              <div className="flex flex-col space-y-2 text-xs">
                <span className="block text-text-muted">SS 304 Material Safety Certificate</span>
                <span className="block text-text-muted">Quality Inspectorate Logs</span>
                <span className="block text-text-muted">B2B Distributor Guidelines</span>
                <span className="block text-text-muted">CAD Blueprint Submission Rules</span>
                <span className="block text-text-muted">Worldwide Logistic Corridors</span>
              </div>
            </div>

            {/* Quick Contact Form shortcut */}
            <div className="space-y-4">
              <h5 className="font-heading font-black text-xs uppercase tracking-widest text-[#e1e2e8] border-b border-industry-slate/60 pb-2">
                B2B SALES PHONE CONTACT
              </h5>
              <div className="space-y-3 font-mono text-xs text-text-muted">
                <p className="flex items-start gap-2">
                  <Phone size={14} className="text-brand-amber shrink-0 mt-0.5" />
                  <a href="tel:+918160749336" className="text-text-light font-bold hover:underline">+91 8160749336</a>
                </p>
                <p className="flex items-start gap-2">
                  <Mail size={14} className="text-brand-amber shrink-0 mt-0.5" />
                  <a href="mailto:sales.chamundaenterprise@gmail.com" className="text-text-light hover:underline block truncate">sales.chamundaenterprise@gmail.com</a>
                </p>
                <div className="bg-bg-dark border border-industry-slate/60 p-2.5 text-[10px] text-text-muted text-left uppercase leading-tight font-sans">
                  Direct inquiry callback guaranteed within 4 hours.
                </div>
              </div>
            </div>

          </div>

          <div className="mt-12 border-t border-industry-slate py-8 flex flex-col md:flex-row justify-between items-center text-xs font-mono text-text-muted gap-4">
            <div>
              © 2026 CHAMUNDA ENTERPRISE. ALL RIGHTS RESERVED. REGISTERED IN GUJARAT, INDIA.
            </div>
            <div className="flex gap-6">
              <a href="#about" className="hover:underline">Heritage</a>
              <span>•</span>
              <a href="#products-showcase" className="hover:underline">Catalog</a>
              <span>•</span>
              <a href="#b2b-calc" className="hover:underline">Spec Calculator</a>
              <span>•</span>
              <a href="#contact" className="hover:underline">Client Portal</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
