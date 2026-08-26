import epeSingle from './assets/images/epe_single_realistic_1787767118690.jpg';
import epeDouble from './assets/images/epe_double_realistic_1787767132236.jpg';
import hybridEpe from './assets/images/hybrid_epe_realistic_1787767145695.jpg';
import pureRebonded from './assets/images/pure_rebonded_realistic_1787767157465.jpg';
import rebondedFoam from './assets/images/rebonded_foam_realistic_1787767170263.jpg';
import memoryFoam from './assets/images/memory_foam_realistic_1787767184171.jpg';
import hotelPremium from './assets/images/hotel_premium_realistic_1787767196651.jpg';
import medicalCare from './assets/images/hospital_care_realistic_1787767209411.jpg';
import activeBonnell from './assets/images/active_bonnell_realistic_1787767232804.jpg';
import customMattress from './assets/images/custom_mattress_realistic_1787767245386.jpg';

export const categories = [
  "Orthopedic",
  "Memory Foam",
  "PU Foam",
  "Rebonded",
  "EPE",
  "Spring",
  "Hotel",
  "Hospital",
  "Custom"
];

export const products = [
  {
    id: "epe-single",
    name: "EPE Single Quilting",
    description: "High-quality EPE foam mattress with single side premium quilting for everyday comfort. Lightweight, durable, and cost-effective.",
    type: "EPE",
    firmness: "Medium Firm",
    image: epeSingle,
    rating: 4.5,
    reviews: 124,
    features: ["Single Side Quilting", "Lightweight", "Breathable Fabric", "Value for Money"],
    basePrice: 1250,
    sizes: [
      { size: '72" x 36"', thicknesses: [{ t: '3"', price: 1900 }, { t: '4"', price: 2100 }, { t: '5"', price: 2600 }] },
      { size: '72" x 48"', thicknesses: [{ t: '3"', price: 1250 }, { t: '4"', price: 1400 }, { t: '5"', price: 1750 }] }
    ]
  },
  {
    id: "epe-double",
    name: "EPE Double Side Quilting",
    description: "Reversible EPE foam mattress featuring luxurious quilting on both sides for enhanced durability and comfort.",
    type: "EPE",
    firmness: "Medium Firm",
    image: epeDouble,
    rating: 4.6,
    reviews: 89,
    features: ["Dual Sided Usability", "Premium Quilting", "Enhanced Durability", "Ergonomic Support"],
    basePrice: 1600,
    sizes: [
      { size: '72" x 36"', thicknesses: [{ t: '3"', price: 2400 }, { t: '4"', price: 3000 }, { t: '5"', price: 3600 }] },
      { size: '72" x 48"', thicknesses: [{ t: '3"', price: 1600 }, { t: '4"', price: 2000 }, { t: '5"', price: 2400 }] }
    ]
  },
  {
    id: "epe-foam-double",
    name: "Hybrid EPE + PU Foam",
    description: "A perfect blend of firm EPE support and soft PU Foam comfort, quilted on both sides for a balanced sleep experience.",
    type: "PU Foam",
    firmness: "Medium",
    image: hybridEpe,
    rating: 4.8,
    reviews: 215,
    features: ["Hybrid Construction", "Pressure Relief", "Dual Sided", "Premium Fabric"],
    basePrice: 3500,
    sizes: [
      { size: '72" x 36"', thicknesses: [{ t: '4" (3" EPE + 1" FOAM)', price: 3500 }, { t: '5" (4" EPE + 1" FOAM)', price: 3950 }] }
    ]
  },
  {
    id: "pure-rebonded",
    name: "Pure Rebonded Ortho",
    description: "Ultra-firm pure rebonded foam mattress designed for superior orthopedic support, optimal spine alignment, and back pain relief.",
    type: "Rebonded",
    firmness: "Firm",
    image: pureRebonded,
    rating: 4.9,
    reviews: 342,
    features: ["Orthopedic Support", "Spine Alignment", "High Density", "Zero Motion Transfer"],
    basePrice: 8000,
    sizes: [
      { size: '72" x 36"', thicknesses: [{ t: '4"', price: 8000 }, { t: '5"', price: 9150 }] }
    ]
  },
  {
    id: "rebonded-foam",
    name: "Rebonded + Foam Orthopedic",
    description: "The ultimate orthopedic balance. A firm high-density rebonded core topped with a plush foam layer for luxurious comfort without sacrificing support.",
    type: "Orthopedic",
    firmness: "Medium Firm",
    image: rebondedFoam,
    rating: 4.9,
    reviews: 456,
    features: ["Dual Layer Technology", "Orthopedic Core", "Plush Top", "Breathable Cover"],
    basePrice: 7500,
    sizes: [
      { size: '72" x 36"', thicknesses: [{ t: '4" (2" REBONDED + 2" FOAM)', price: 7500 }, { t: '5" (3" REBONDED + 2" FOAM)', price: 8650 }] }
    ]
  },
  {
    id: "memory-foam-lux",
    name: "Memory Foam Luxury",
    description: "Cloud-like comfort that contours to your body shape. Reduces pressure points and isolates motion for undisturbed sleep.",
    type: "Memory Foam",
    firmness: "Soft",
    image: memoryFoam,
    rating: 4.8,
    reviews: 189,
    features: ["Body Contouring", "Pressure Relief", "Zero Partner Disturbance", "Cooling Gel Infused"],
    basePrice: 12500,
    sizes: [
      { size: '72" x 36"', thicknesses: [{ t: '6"', price: 12500 }, { t: '8"', price: 16500 }] },
      { size: '72" x 72"', thicknesses: [{ t: '6"', price: 24500 }, { t: '8"', price: 32500 }] }
    ]
  },
  {
    id: "hotel-premium",
    name: "Hotel Premium Suite",
    description: "Five-star luxury for your home or hospitality business. Crafted with premium pocket springs and plush comfort layers.",
    type: "Hotel",
    firmness: "Medium",
    image: hotelPremium,
    rating: 5.0,
    reviews: 87,
    features: ["Pocket Springs", "Edge Support", "Plush Pillow Top", "Anti-Sagging"],
    basePrice: 15000,
    sizes: [
      { size: '72" x 72"', thicknesses: [{ t: '8"', price: 15000 }, { t: '10"', price: 19500 }] }
    ]
  },
  {
    id: "hospital-care",
    name: "Medical Care Mattress",
    description: "Medical-grade waterproof mattress designed for patient comfort, easy cleaning, and bed-sore prevention.",
    type: "Hospital",
    firmness: "Firm",
    image: medicalCare,
    rating: 4.7,
    reviews: 45,
    features: ["Waterproof Cover", "Anti-Microbial", "Easy to Clean", "Pressure Distribution"],
    basePrice: 4500,
    sizes: [
      { size: '78" x 36"', thicknesses: [{ t: '4"', price: 4500 }, { t: '5"', price: 5500 }] }
    ]
  },
  {
    id: "spring-active",
    name: "Active Bonnell Spring",
    description: "Traditional bouncy feel with excellent breathability and robust support. Ideal for those who prefer a responsive mattress.",
    type: "Spring",
    firmness: "Medium Firm",
    image: activeBonnell,
    rating: 4.4,
    reviews: 112,
    features: ["Bonnell Springs", "High Bounce", "Excellent Ventilation", "Durable Edge"],
    basePrice: 8500,
    sizes: [
      { size: '72" x 72"', thicknesses: [{ t: '6"', price: 8500 }, { t: '8"', price: 10500 }] }
    ]
  },
  {
    id: "custom-mattress",
    name: "Custom Mattress",
    description: "Tailor-made mattress built precisely to your bed's dimensions and your comfort preferences.",
    type: "Custom",
    firmness: "Customizable",
    image: customMattress,
    rating: 4.9,
    reviews: 67,
    features: ["Any Size Possible", "Choice of Material", "Choice of Firmness", "Expert Consultation"],
    basePrice: 5000,
    sizes: [
      { size: 'Custom', thicknesses: [{ t: '4"', price: 5000 }, { t: '5"', price: 6500 }, { t: '6"', price: 8000 }, { t: '8"', price: 12000 }] }
    ]
  }
];

export const clients = [
  "Homes",
  "Hotels & Resorts",
  "Hospitals",
  "Hostels & PGs",
  "Schools & Colleges",
  "Furniture Dealers",
  "Builders & Interior Designers",
  "Retail & Wholesale Buyers"
];
