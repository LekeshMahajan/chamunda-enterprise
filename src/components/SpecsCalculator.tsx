import { useState, useMemo } from "react";
import { 
  Dumbbell, 
  Layers, 
  Scale, 
  FileCheck, 
  ChevronRight, 
  Cpu, 
  RotateCcw,
  Zap
} from "lucide-react";

interface SpecsCalculatorProps {
  onApplySpec: (specText: string) => void;
}

export default function SpecsCalculator({ onApplySpec }: SpecsCalculatorProps) {
  const [material, setMaterial] = useState("SS 304 Food Grade");
  const [diameter, setDiameter] = useState<number>(4); // in mm
  const [wireLength, setWireLength] = useState<number>(35); // in cm
  const [geometry, setGeometry] = useState("S-Hook Multi-bend");
  const [quantity, setQuantity] = useState<number>(5000);
  const [surfaceFinish, setSurfaceFinish] = useState("Electrolytically Passivated");
  const [isCopied, setIsCopied] = useState(false);

  // Density maps: g/cm³
  const materialDensities: Record<string, number> = {
    "SS 304 Food Grade": 8.0,
    "SS 316 Marine Grade": 8.02,
    "Mild Steel Chrome-Plated": 7.85,
    "Galvanized Iron": 7.8,
    "High-Carbon Spring Steel": 7.84,
  };

  // Yield Strengths: N/mm²
  const materialStrengths: Record<string, number> = {
    "SS 304 Food Grade": 505,
    "SS 316 Marine Grade": 515,
    "Mild Steel Chrome-Plated": 370,
    "Galvanized Iron": 340,
    "High-Carbon Spring Steel": 850,
  };

  const calculations = useMemo(() => {
    // 1. Calculate safe weight of wire
    // Volume = PI * r² * length
    const radiusCm = diameter / 2 / 10; // mm to cm
    const lengthCm = wireLength;
    const volumeCm3 = Math.PI * Math.pow(radiusCm, 2) * lengthCm;
    const density = materialDensities[material] || 7.85;
    const unitWeightG = volumeCm3 * density;
    const totalWeightKg = (unitWeightG * quantity) / 1000;

    // 2. Load capacity estimation (simplified physical model for bending resistance)
    // Safe load = (Yield Strength * CrossSectionalArea) / safety factor
    const areaMm2 = Math.PI * Math.pow(diameter / 2, 2);
    const strength = materialStrengths[material] || 400;
    // factor accounts for bending moments usually reducing tensile limits by ~4 times
    const safetyFactor = 3.5;
    const estYieldCapacityKg = Math.round((strength * areaMm2) / (9.81 * safetyFactor));

    return {
      unitWeight: unitWeightG.toFixed(2),
      totalWeight: totalWeightKg.toFixed(1),
      yieldCapacity: estYieldCapacityKg,
      crossSection: areaMm2.toFixed(1)
    };
  }, [material, diameter, wireLength, geometry, quantity]);

  const compiledSpecString = `Material: ${material} | Wire Dia: ${diameter}mm | Approx Length: ${wireLength}cm | Type: ${geometry} | Finish: ${surfaceFinish} | Vol: ${quantity} units.`;

  const handleApply = () => {
    onApplySpec(compiledSpecString);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000);

    // Smooth scroll to contact block
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleReset = () => {
    setMaterial("SS 304 Food Grade");
    setDiameter(4);
    setWireLength(35);
    setGeometry("S-Hook Multi-bend");
    setQuantity(5000);
    setSurfaceFinish("Electrolytically Passivated");
  };

  return (
    <div id="b2b-calc" className="border border-outline-gold/20 bg-bg-card relative overflow-hidden text-text-light grid-blueprint p-6 md:p-8">
      {/* Decorative top yellow bar */}
      <div className="absolute top-0 left-0 right-0 h-[3px] hazard-stripes-mini" />
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left column: Configuration Inputs */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-mono uppercase bg-brand-amber/10 border border-brand-amber text-brand-amber px-2 py-0.5 tracking-wider">
                Heavy Machinery Simulator
              </span>
              <span className="text-xs text-text-muted font-mono">Precision Parameters</span>
            </div>
            <h3 className="text-xl font-heading font-extrabold uppercase tracking-wide text-brand-primary mb-6">
              B2B SPECIFICATION CONFIGURATOR & GENERATOR
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Material Dropdown */}
              <div>
                <label className="block text-xs font-mono text-text-muted uppercase mb-1.5">
                  1. Wire Material Core
                </label>
                <select 
                  value={material}
                  onChange={(e) => setMaterial(e.target.value)}
                  className="w-full bg-bg-heavy border border-industry-slate focus:border-brand-amber text-text-light text-sm px-3 py-2.5 rounded-none font-sans outline-none focus:ring-1 focus:ring-brand-amber/30 cursor-pointer"
                >
                  {Object.keys(materialDensities).map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>

              {/* Geometry Dropdown */}
              <div>
                <label className="block text-xs font-mono text-text-muted uppercase mb-1.5">
                  2. Contour Geometry Shape
                </label>
                <select 
                  value={geometry}
                  onChange={(e) => setGeometry(e.target.value)}
                  className="w-full bg-bg-heavy border border-industry-slate focus:border-brand-amber text-text-light text-sm px-3 py-2.5 rounded-none font-sans outline-none focus:ring-1 focus:ring-brand-amber/30 cursor-pointer"
                >
                  <option value="S-Hook Multi-bend">S-Hook / High-Tension Jig</option>
                  <option value="Modular Basket Wiregrid">Kitchen Mesh / Modular Grid</option>
                  <option value="Continuous Bucket Handle">Curved Container Handle</option>
                  <option value="Continuous Loop Spring">Circular/Split Retainer Spring</option>
                  <option value="Multi-Axis CNC Custom Job">Multi-Axis Bespoke Geometry</option>
                </select>
              </div>

              {/* Diameter Slider */}
              <div className="md:col-span-2 bg-bg-heavy/60 p-4 border border-industry-slate/60">
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-mono text-text-muted uppercase">
                    3. Wire Diameter Thick Gauge
                  </label>
                  <span className="font-mono text-brand-amber text-sm font-bold">{diameter.toFixed(1)} mm</span>
                </div>
                <input 
                  type="range"
                  min="1.5"
                  max="12.0"
                  step="0.5"
                  value={diameter}
                  onChange={(e) => setDiameter(parseFloat(e.target.value))}
                  className="w-full accent-brand-amber cursor-ew-resize bg-industry-slate h-1.5"
                />
                <div className="flex justify-between text-[10px] text-text-muted font-mono mt-1">
                  <span>1.5 mm (Thin Pack)</span>
                  <span>6.0 mm (Medium)</span>
                  <span>12.0 mm (Heavy Structural Rods)</span>
                </div>
              </div>

              {/* Wire Length Slider */}
              <div>
                <label className="block text-xs font-mono text-text-muted uppercase mb-1">
                  4. Uncoiled Wire Length
                </label>
                <div className="flex items-center gap-2 bg-bg-heavy p-2 border border-industry-slate">
                  <input 
                    type="number"
                    min="5"
                    max="200"
                    value={wireLength}
                    onChange={(e) => setWireLength(Math.max(5, Math.min(200, parseInt(e.target.value) || 35)))}
                    className="w-full bg-transparent text-text-light font-mono text-sm outline-none border-none focus:ring-0 p-1"
                  />
                  <span className="text-xs font-mono text-text-muted pr-2">cm</span>
                </div>
              </div>

              {/* Surface treatment */}
              <div>
                <label className="block text-xs font-mono text-text-muted uppercase mb-1">
                  5. Metal Finish Treatment
                </label>
                <select 
                  value={surfaceFinish}
                  onChange={(e) => setSurfaceFinish(e.target.value)}
                  className="w-full bg-bg-heavy border border-industry-slate focus:border-brand-amber text-text-light text-sm p-3 rounded-none font-sans outline-none focus:ring-1 focus:ring-brand-amber/30 cursor-pointer"
                >
                  <option value="Electrolytically Passivated">Electrolytic Passivation (SS Polish)</option>
                  <option value="Nickel-Chrome Double Plating">Mirror Nickel-Chrome Electroplate</option>
                  <option value="Pure Zinc Galvanization">Galvanic Zinc Rust-Shield</option>
                  <option value="High-Durability Textured Coat">Epoxy Powder Coat (Black/Satin)</option>
                  <option value="Raw Unfinished Natural">Industrial Bare / Natural Finish</option>
                </select>
              </div>

              {/* Batch Quantity */}
              <div className="md:col-span-2">
                <label className="block text-xs font-mono text-text-muted uppercase mb-1">
                  6. Target Order Volume batch-size
                </label>
                <div className="flex items-center justify-between gap-4 mt-1">
                  {[2500, 5000, 10000, 25000, 50000].map((vol) => (
                    <button
                      key={vol}
                      type="button"
                      onClick={() => setQuantity(vol)}
                      className={`flex-1 text-center py-2 text-xs font-mono border transition-all ${
                        quantity === vol
                          ? "bg-brand-amber border-brand-amber text-bg-heavy font-bold"
                          : "bg-[#0D0F11]/90 border-industry-slate text-text-light hover:border-brand-primary"
                      }`}
                    >
                      {vol.toLocaleString()} pcs
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-start gap-3">
            <button 
              onClick={handleReset}
              className="px-4 py-3 border border-industry-slate hover:border-brand-amber text-text-light font-mono text-xs uppercase flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw size={14} />
              Reset
            </button>
            <button 
              onClick={handleApply}
              className="flex-1 hazard-stripes text-text-light hover:scale-[1.01] transition-all font-heading font-extrabold uppercase px-6 py-3 tracking-wider flex items-center justify-center gap-2 group cursor-pointer relative"
            >
              <div className="absolute inset-0 bg-bg-heavy/10 group-hover:bg-transparent transition-colors" />
              <span className="relative z-10 text-bg-heavy bg-brand-amber px-2 py-0.5 text-xs font-mono font-black border border-bg-heavy">
                TRANSFER TO FORM
              </span>
              <span className="relative z-10 text-bg-heavy font-black flex items-center gap-1">
                LOCK & AUTO-FILL QUOTE
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>
        </div>

        {/* Right column: Dynamic Live Output Panel */}
        <div className="lg:col-span-5 bg-bg-heavy border border-industry-slate/80 p-6 flex flex-col justify-between relative">
          {/* Subtle industrial grid styling */}
          <div className="absolute inset-0 bg-[radial-gradient(#ffb800_1px,transparent_1px)] [background-size:16px_16px] opacity-5 pointer-events-none" />

          <div>
            <div className="flex justify-between items-center border-b border-industry-slate pb-3 mb-6">
              <span className="text-xs font-mono uppercase tracking-wider text-brand-amber flex items-center gap-1.5">
                <Cpu size={14} className="animate-spin-slow text-brand-amber" />
                Datalink Simulator
              </span>
              <span className="text-[10px] font-mono bg-industry-slate/80 text-text-muted px-2 py-0.5">
                LIVE METRICS
              </span>
            </div>

            <div className="space-y-5 relative z-10">
              {/* Metric 1: Safe Payload Capacity */}
              <div className="flex items-center gap-4 bg-bg-card/70 border-l-4 border-l-brand-amber p-4 border border-industry-slate/40">
                <div className="p-2 bg-brand-amber/10 text-brand-amber">
                  <Dumbbell size={20} />
                </div>
                <div>
                  <span className="block text-[10px] font-mono uppercase text-text-muted">Estimated Load Limit (Suspended)</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-heading font-black text-brand-primary">
                      ~ {calculations.yieldCapacity.toLocaleString()} kg
                    </span>
                    <span className="text-xs font-mono text-text-muted">Max Limit</span>
                  </div>
                </div>
              </div>

              {/* Metric 2: Material Cross-Section info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-bg-card/40 p-3 border border-industry-slate/30">
                  <span className="block text-[10px] font-mono uppercase text-text-muted">Wire Cross Section</span>
                  <span className="text-lg font-heading font-extrabold text-[#e1e2e8]">
                    {calculations.crossSection} mm²
                  </span>
                </div>
                <div className="bg-bg-card/40 p-3 border border-industry-slate/30">
                  <span className="block text-[10px] font-mono uppercase text-text-muted font-bold text-brand-amber">Material Yield</span>
                  <span className="text-lg font-heading font-extrabold text-[#e1e2e8] block truncate">
                    {materialStrengths[material]} MPa
                  </span>
                </div>
              </div>

              {/* Metric 3: Weight specs */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-bg-card/40 p-3 border border-industry-slate/30">
                  <div className="flex items-center gap-1 text-text-muted mb-0.5">
                    <Scale size={13} />
                    <span className="text-[10px] font-mono uppercase">Unit Weight</span>
                  </div>
                  <span className="text-lg font-heading font-extrabold text-brand-primary">
                    {calculations.unitWeight} grams
                  </span>
                </div>
                <div className="bg-bg-card/40 p-3 border border-industry-slate/30">
                  <div className="flex items-center gap-1 text-text-muted mb-0.5">
                    <Layers size={13} />
                    <span className="text-[10px] font-mono uppercase">Total Order Est.</span>
                  </div>
                  <span className="text-lg font-heading font-extrabold text-brand-primary">
                    ~ {calculations.totalWeight} kg
                  </span>
                </div>
              </div>

              {/* Render spec string overview */}
              <div className="bg-industry-slate/30 border border-industry-slate p-3 mt-4 text-xs font-mono font-medium rounded-none">
                <div className="flex justify-between items-center text-[10px] text-brand-amber font-mono font-bold mb-1 uppercase tracking-widest">
                  <span>Compiled Spec Payload</span>
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-amber opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-amber"></span>
                  </span>
                </div>
                <p className="text-text-light tracking-wide leading-relaxed p-1 bg-bg-heavy border border-industry-slate/50 select-all font-mono text-[11px] whitespace-pre-wrap">
                  {compiledSpecString}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 border-t border-industry-slate/50 pt-4 flex flex-col gap-2 relative z-10">
            <div className="flex items-center gap-2 text-xs">
              <FileCheck size={14} className="text-brand-amber" />
              <span className="font-sans text-text-muted text-[11px]">
                Specification matches industrial CNC forming compliance parameters of Chamunda Enterprise machinery.
              </span>
            </div>
            {isCopied && (
              <div className="bg-brand-amber text-bg-heavy px-3 py-1.5 text-xs text-center font-heading font-black uppercase flex items-center justify-center gap-1.5 animate-pulse">
                <Zap size={13} />
                SPEC SHIPPED! THE INQUIRY SPECIFICATIONS ARE AUTOMATICALLY LOADED BELOW.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
