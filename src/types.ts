export interface Product {
  id: string;
  sku: string;
  name: string;
  description: string;
  category: string;
  materials: string[];
  image: string;
  specifications: {
    label: string;
    value: string;
  }[];
  cncComplexity: "High" | "Medium" | "Standard";
  productionLeadTime: string;
}

export interface Machine {
  id: string;
  model: string;
  type: string;
  image: string;
  capabilities: string[];
  origin: string;
  specs: {
    label: string;
    value: string;
  }[];
}

export interface Industry {
  id: string;
  name: string;
  icon: string;
  description: string;
  examples: string[];
}

export interface CapabilityItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  technicalMetric: string;
}

export const PRODUCTS: Product[] = [
  {
    id: "wire-hooks",
    sku: "WH-100",
    name: "Wire Hooks",
    description: "Industrial-grade customized S-type, heavy lifting, plant hangers, and multi-tier paint line jigging hooks. Engineered for extreme durability to resist high-temperature baking and chemical dips.",
    category: "Industrial Wire-forming",
    materials: ["SS 304", "SS 316", "High-Carbon Spr. Steel"],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCNC4QLOmpMSnZRNvBSJKIz46dfNO6xlMmVIjj4tPmpG3SdwQqvxVtDGTqUGbHStVeSaeQ_Os-HQ2XI9CNTOSgbX8itvc5dXMnHPYlLiOpJI329RIZ4QkZ-QChpIgyDGYe0gvdQKsnMwrWW8qTj79CISjX2QXAQl6r-4iTAFDqTsLYIAVgVyLbkZ-CLoghcLRQTDkVkGjuYUyCRXwrcwmAXaNbo28gauTOaNaBTKWI06Ca-1p70Xf48oW0EZ6s0rSHKc9h3dwI-P6vn",
    specifications: [
      { label: "Wire Diameter", value: "2.5 mm to 12.0 mm" },
      { label: "Tensile Strength", value: "650 - 1200 N/mm²" },
      { label: "Load Capacity", value: "Up to 250 kg per hook" },
      { label: "Surface Finish", value: "Mirror Polish / Zinc Plated" }
    ],
    cncComplexity: "Standard",
    productionLeadTime: "7 - 10 Days"
  },
  {
    id: "bathroom-kitchen",
    sku: "KB-200",
    name: "Bathroom & Kitchen Elements",
    description: "Premium stainless steel racks, corner holders, dish drainers, and bespoke shelf overlays. Designed with anti-vibration joints and exact spacing to fit premium modern cabinetry and architectural grids.",
    category: "Consumer Hardware & Storage",
    materials: ["SS 304 Food Grade", "SS 316 Marine Grade"],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDUiex5RKYh0fJbA5nok_qq_1CPHpxzss6srBlaJXESGTJpIQz-1oU_0iwwyvZwfUAh8O4bIApLwXZWaaIg0dmAyIXBiBfDUc4y2T-keuAF8OpW5JSJMf0rvEiRgyGpBc8t-BKFjI7P1xwARN8XAmPoUJeWa4FOgnjE0cWJUnzHa324t0lXukcRlnE5_8DCboUKm_VK3LSILH2ZWU6U2RhMRQjacyXGaAQJtsxkQU58bUCU96hgA550w8zyHV_jmLl49dvoLfJVYBEv",
    specifications: [
      { label: "Wire Diameter Range", value: "3.0 mm (Rings) & 6.0 mm (Frames)" },
      { label: "Corrosion Resistance", value: "Grade SS 304 Electrolytic Passivated" },
      { label: "Welding Type", value: "Micro-Resistance Spot Welded" },
      { label: "Load Rating", value: "Up to 25 kg uniform load" }
    ],
    cncComplexity: "Medium",
    productionLeadTime: "12 - 15 Days"
  },
  {
    id: "kitchen-baskets",
    sku: "KB-250",
    name: "Modular Kitchen Baskets",
    description: "Heavy-duty wire baskets, pull-out drawers, spice galleries, and internal hardware linkages. Features rigorous structural alignment for high-load sliding drawer runners.",
    category: "Kitchen fittings & Storage",
    materials: ["SS 304 electro-passivated", "Mild Steel Chrome-Plated"],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAwBK7FSaokoijtEprK9AYMHIKFuqrlFpxf8wzIU0_dvai_QUoZJoFIEhBkGxGC45uT4JSX5F7TqI73F6uZHA8jpf5aij0_ZmBkD5AybfYId1jZs5INyTeNpK7IGxM6oy-lczdjGm-B549lqceEcWw8sEUchQ-GUN4JX9pjx75abZKR8HEbS4CA6K-yiJNrNPRMVwYehsTXkO3rUaNlvzt997EbHESWKcZV9dOqfzwv6reiO1d4JubBsdW3mBjH99YbztBQJ3i-qu0l",
    specifications: [
      { label: "Frame Wire", value: "5.0 mm - 8.0 mm heavy gauge" },
      { label: "Mesh Wire", value: "2.0 mm - 3.2 mm precise mesh" },
      { label: "Finish Quality", value: "Nickel-Chrome Duplex Coating" },
      { label: "Alignment Error", value: "< 0.25 mm across diagonals" }
    ],
    cncComplexity: "High",
    productionLeadTime: "10 - 14 Days"
  },
  {
    id: "handle-ware",
    sku: "HW-300",
    name: "Heavy Handle Ware",
    description: "Bespoke industrial bucket handles, drum handles, oil jar grips, and hardware container loops. Engineered on high-speed single-stroke benders for consistency in massive scale production runs.",
    category: "Containers & Packaging",
    materials: ["Galvanized Iron (GI)", "MS", "SS 304 Wire"],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD4_YjcNTQ8o07kEOO52dpTLK6PEj9Xw958DuOkJTf5ySsW-n5laVSANdIRDHvDX8z3VQOptdVc-U7Ft9JXZeb6Dk7CG01ZGNofbyL6rX8mc_lg9MYfKpTAdto86HdebeoQjpeVItaheHaLnGeyRNjtHiOraQWx46ks0mdEA62uEsy7DtAaTJ_BWP7I9j5UEdzIaD0IFJcJGCjK808zLWCswYWJxljujFD0aCcQkJP1Gj65f5IPvl9_eI650EsZsrR1wO-D4iMjHKpp",
    specifications: [
      { label: "Diameter Compatibility", value: "1.8 mm to 6.0 mm coils" },
      { label: "Production Output", value: "Up to 120 units / minute" },
      { label: "Grip Integration", value: "Optional plastic/wooden sleeve pre-mount" },
      { label: "End Finishes", value: "Chamfered tips, looped pins, or flattened feet" }
    ],
    cncComplexity: "Standard",
    productionLeadTime: "5 - 7 Days"
  },
  {
    id: "home-accessories",
    sku: "HA-400",
    name: "Architectural & Home Accessories",
    description: "Multi-functional storage frames, planter rigs, showcase wire forms, and utility racks. Perfectly balanced structural metal frames painted or powder-coated for heavy consumer loads and rust protection.",
    category: "Household Accessories",
    materials: ["High-Grade SS 304", "Carbon Steel Powder Coated"],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBERFbjnyojSu42U5ez8eBp8B59g7COlVYP0WbBCuHVQJJ37ePWrcM1c0zEssZhJuz75_AnItaVuYabfBHOUiRrw3XS1zCP8Tlvp2lfe9ne1fniu-4d_KJbluGGekw2CJfipREVQEQGlGSNnd_Wo_LGEBLfsdom53sKlW_ISoh1-dBb4otGBOyk_zpL9-ly4NPhLbeN87A79tyVlc_8UCxRBb8zxS5cE34zol7-Q5_Opt9bV1aE6E5JVTGIQ9S3xiG0Qr_jQatpkE-7",
    specifications: [
      { label: "Frame Material", value: "Wire, Tube, or Steel Flat mesh panels" },
      { label: "Powder Coat Spec", value: "70-90 Micron Epoxy Coating" },
      { label: "Joint Strength", value: "Resistance Butt Welded (No sharp overlaps)" },
      { label: "Design Styles", value: "Custom grid panels and nested racks" }
    ],
    cncComplexity: "Medium",
    productionLeadTime: "12 - 18 Days"
  },
  {
    id: "bender-parts",
    sku: "BP-500",
    name: "Bespoke CNC Wire-Formed Parts",
    description: "Highly complex CNC-formed components for industrial jobwork. Includes spring clips, mounting hooks, retaining pins, engine linkages, and custom electrical wire routes according to 2D/3D CAD blueprint guidelines.",
    category: "Precision Jobwork Components",
    materials: ["Spring Steel", "SS 302/304", "Alloy Steel", "Brass Work"],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDY3JwBF97KNUjcQ5D0xfcNFU-VxadHeeUeJY3ebCbC_XPWKXKpA4bWtUT7xL64eBFlnyNU508HXxFQmUZ7TaobRroXCURbJ92fh5MUY-KhdpdPfSxOhh57brYXuxPpr6gY_4axICnmJ5Bpxq_15qXkh6LO4Zz6TdqmDNW9AvSjYslRpzUN2p_-9AA4Hs8JG2ndVqLwKh31KV_xxmEgh7qOpP6tuLy_7wY41aqNQgDP4bJ4yfanvRqPgKGQih1wVum-vhQNBt0mqLCl",
    specifications: [
      { label: "Geometric Limits", value: "Infinite 3D planes (multi-axis CNC)" },
      { label: "Dimensional Tolerance", value: "± 0.05 mm mechanical precision" },
      { label: "Angle Accuracy", value: "± 0.2° maximum variation" },
      { label: "Wire Core Size", value: "2.0 mm to 10.0 mm wire-coils" }
    ],
    cncComplexity: "High",
    productionLeadTime: "10 - 20 Days"
  }
];

export const MACHINERY: Machine[] = [
  {
    id: "cnc-bender-1",
    model: "CE-3D-12X Multi-Axis Wire Bender",
    type: "3D CNC Wire Bending System",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDpcdjCLkmDZcof7PkP9FWMoMDAym3VEQevG2GI0JEUSc9y0KZ0pvLkuRC5ThW_f7u4LoBVhsgxZDq1gpkADkiCwFh0cvNhtwuEpplJOcvh9GtVGA5-aPOcRZ_ifZCkC3Soo9OO1hH9FRspnyxXm9eSH7ifBrloyOjugZsWjkfEjhkB80ed_-Cipm8I_4vD2oD-occSgnGuT_925vm1jUWVx9aHKS60IlAfjSqz9y959wJqvFfGOrN5S9qrAsZxR4if-oHM_nNiJ8BH",
    capabilities: [
      "Custom 3D complex geometries",
      "Self-correcting wire tension sensors",
      "Automated butt welding and loop chamfering",
      "S-hook, geometric mesh, and handle wire production"
    ],
    origin: "Industry-Standard Heavy Machinery Co.",
    specs: [
      { label: "Max Feeding Speed", value: "85 meters / minute" },
      { label: "Wire Gauge Support", value: "2.0 mm to 12.0 mm coil wires" },
      { label: "Axes Configurations", value: "7-axis CNC synchronized stepper units" },
      { label: "Controller OS", value: "Simulated industrial CNC interface" }
    ]
  }
];

export const INDUSTRIES: Industry[] = [
  {
    id: "modular-kitchens",
    name: "Modular Kitchen Furnishings",
    icon: "Layout",
    description: "Reliable wire drawer baskets, high-capacity spice racks, corner carousel baskets, and pantry pull-outs crafted in certified food-grade SS 304.",
    examples: ["Glass & Plate Baskets", "Cutlery Trays", "Bottle Pull-Outs"]
  },
  {
    id: "industrial-appliances",
    name: "Commercial & Home Appliances",
    icon: "Refrigerator",
    description: "Heavy-duty dishwashing baskets, high-temperature oven racks, safety guards for industrial fans, and refrigerator shelving networks.",
    examples: ["Oven Wire Grids", "Dishwasher Tines", "Appliance Protection Grids"]
  },
  {
    id: "hardware-packaging",
    name: "Packaging & Chemical Drums",
    icon: "Package",
    description: "High-tensile container handles, lock rings, transport hooks, and industrial barrel attachments built for severe load capacities.",
    examples: ["Paint Bucket Handles", "5-Gallon Drum Handles", "Heavy Lifting Shackle Loops"]
  },
  {
    id: "retail-display",
    name: "Retail Display & Warehousing",
    icon: "ShoppingBag",
    description: "Modular grid-wall baskets, durable merchandise hooks, display racks, and bulk storage wire bins for severe heavy retail traffic.",
    examples: ["Gridwall Hooks", "Pegboard Loops", "Dump Bin Wire Dividers"]
  },
  {
    id: "custom-engineering",
    name: "Custom Engineering Jobwork",
    icon: "Cpu",
    description: "Automotive engine rod linkages, concrete wall reinforcing mesh supports, suspension hooks, and mounting brackets for electronics.",
    examples: ["Exhaust Hanger Rods", "Concrete Spacer Mesh", "High-Tension Spring Clips"]
  }
];

export const CAPABILITIES: CapabilityItem[] = [
  {
    id: "cnc-forming",
    title: "Precision Multi-Axis CNC Bending",
    description: "Fully automated, computerized multi-axis machine operation delivering unyielding part uniformity across millions of identical units, perfectly eliminating manual deviation.",
    iconName: "Cpu",
    technicalMetric: "Tolerance < ±0.05 mm"
  },
  {
    id: "resistance-welding",
    title: "Heavy-Duty Resistance Spot & Butt Welding",
    description: "Pristine electrical bonding with high-precision micro-fused weld seams ensuring heavy-duty structural payload capabilities and preventing rust propagation at joint junctions.",
    iconName: "Flame",
    technicalMetric: "Weld Tensile Hook > 350 kg"
  },
  {
    id: "surface-passivation",
    title: "Advanced Electro-Chemical Passivation",
    description: "Proprietary acid bath cleaning and electro-polishing to dissolve free irons, depositing a thick protective chromium-oxide layer for medical and marine-grade corrosion resistance.",
    iconName: "BadgeCheck",
    technicalMetric: "SS 304 anti-rust standard"
  },
  {
    id: "custom-dimensioning",
    title: "Rapid B2B Blueprint Tooling",
    description: "Custom CAD wire component tooling designed, simulated, programmed, and configured into production-ready physical runs in a matter of 48 hours for swift prototype assessment.",
    iconName: "Milestone",
    technicalMetric: "Tooling turnaround in 48h"
  }
];
