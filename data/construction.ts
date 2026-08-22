export interface ConstructionStage {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  startProgress: number;
  endProgress: number;
  badge: string;
  milestone: string;
}

export interface StatItem {
  value: string;
  numeric: number;
  suffix?: string;
  label: string;
  description: string;
}

export interface ConstructionData {
  title: string;
  subtitle: string;
  tagline: string;
  description: string;
  location: string;
  totalFrames: number;
  imagePath: string;
  constructionStages: ConstructionStage[];
  stats: StatItem[];
  architecturalHighlights: {
    title: string;
    description: string;
    metric: string;
  }[];
  finalCTA: {
    heading: string;
    subheading: string;
    buttonText: string;
    description: string;
  };
}

export const TOTAL_FRAMES = 50;

export const constructionData: ConstructionData = {
  title: "ELVIRA TOWER",
  subtitle: "ARCHITECTURAL INNOVATION IN MOTION",
  tagline: "Experience the physical creation of tomorrow's skyline through the precision of scroll.",
  description: "A monumental 48-story luxury residential and mixed-use architectural masterpiece. Built with cutting-edge parametric engineering, low-carbon monolithic concrete, and structural glass façades.",
  location: "Metro Financial & Cultural District, 540 Vanguard Blvd",
  totalFrames: TOTAL_FRAMES,
  imagePath: "/images/building",
  constructionStages: [
    {
      id: 1,
      title: "Foundation & Earthwork",
      subtitle: "EXCAVATION & SUBSTRUCTURE",
      description: "Excavation to bedrock depth with diaphragm perimeter walls and 24,000 m³ of reinforced deep pile foundation.",
      startProgress: 0.0,
      endProgress: 0.14,
      badge: "PHASE 01",
      milestone: "Subterranean Bedrock Piles Anchored",
    },
    {
      id: 2,
      title: "Core & Structural Columns",
      subtitle: "HIGH-STRENGTH MONOLITHIC PILARS",
      description: "Installation of high-tensile steel rebars and self-compacting concrete core shear walls with self-climbing formwork.",
      startProgress: 0.15,
      endProgress: 0.30,
      badge: "PHASE 02",
      milestone: "Central Vertical Shear Core Active",
    },
    {
      id: 3,
      title: "Floor Slab Progression",
      subtitle: "POST-TENSIONED SLAB CASTING",
      description: "Rapid cycle floor-by-floor construction utilizing hydraulic placing booms, continuous pouring, and post-tensioned spans.",
      startProgress: 0.31,
      endProgress: 0.55,
      badge: "PHASE 03",
      milestone: "Level 1 to 24 Structural Slabs",
    },
    {
      id: 4,
      title: "Structural Frame & Cranes",
      subtitle: "HIGH-ALTITUDE HEAVY LIFTING",
      description: "Dual tower cranes synchronizing steel diagrid assemblies and cantilevered architectural transfer trusses.",
      startProgress: 0.56,
      endProgress: 0.75,
      badge: "PHASE 04",
      milestone: "Upper Cantilever & Sky Lounges",
    },
    {
      id: 5,
      title: "Upper Levels & Crown",
      subtitle: "TOPPING OUT & ROOF STRUCTURE",
      description: "Final structural framing reaching crown height, tuned mass damper integration, and MEP central plant installations.",
      startProgress: 0.76,
      endProgress: 0.88,
      badge: "PHASE 05",
      milestone: "Superstructure Topping Out",
    },
    {
      id: 6,
      title: "Façade & Exterior Envelope",
      subtitle: "UNITIZED TRIPLE-GLAZED CURTAIN WALL",
      description: "Precision installation of high-efficiency low-E glass panels, titanium-zinc accents, and perimeter architectural fins.",
      startProgress: 0.89,
      endProgress: 0.96,
      badge: "PHASE 06",
      milestone: "Thermal Envelope Sealed",
    },
    {
      id: 7,
      title: "Final Architectural Completion",
      subtitle: "CLEANED, ILLUMINATED, READY FOR OCCUPANCY",
      description: "Temporary works and cranes demobilized, exterior lighting commissioning, plaza landscaping, and final architectural reveal.",
      startProgress: 0.97,
      endProgress: 1.0,
      badge: "PHASE 07",
      milestone: "100% Commissioned & Occupancy Ready",
    },
  ],
  stats: [
    {
      value: "48+",
      numeric: 48,
      suffix: "+",
      label: "STOREYS",
      description: "Soaring 220 meters into the skyline with panoramic 360° vistas",
    },
    {
      value: "320+",
      numeric: 320,
      suffix: "+",
      label: "LUXURY RESIDENCES",
      description: "Engineered with bespoke acoustic attenuation and private sky gardens",
    },
    {
      value: "36",
      numeric: 36,
      suffix: " MO",
      label: "CONSTRUCTION TIMELINE",
      description: "Delivered ahead of schedule through BIM 4D digital twin coordination",
    },
    {
      value: "100%",
      numeric: 100,
      suffix: "%",
      label: "STRUCTURAL COMPLETION",
      description: "Certified LEED Platinum and zero net operational carbon ready",
    },
  ],
  architecturalHighlights: [
    {
      title: "Diagrid Structural Geometry",
      description: "External diamond-shaped steel lattice that redistributes lateral wind loads while creating column-free interior living spaces.",
      metric: "40% Higher Lateral Rigidity",
    },
    {
      title: "Smart Low-E Solar Façade",
      description: "Double-cavity unitized curtain wall reflecting infrared heat while maximizing natural daylight illumination.",
      metric: "0.24 SHGC Energy Rating",
    },
    {
      title: "Parametric Sky Cantilevers",
      description: "Aero-engineered multi-level sky terraces offering private sanctuaries suspended above the urban metropolis.",
      metric: "18m Free Cantilever Span",
    },
  ],
  finalCTA: {
    heading: "BUILT TO STAND OUT.",
    subheading: "From the first foundation to the final detail.",
    buttonText: "START YOUR PROJECT",
    description: "Whether commission or acquisition, experience the definitive benchmark of structural precision and timeless contemporary architecture.",
  },
};
