import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import mongoose from "mongoose";
import Product from "../models/Product.js";

console.log(process.env.MONGODB_URI);
const products = [
  {
    slug: "fly-ash-brick-machine",
    name: "Fully Automatic Fly-Ash Brick Making Machine",
    price: "₹15,80,000",
    tag: "Best Seller",
    category: "Brick Making",
    image: "/images/products/fully-automatic-fly-ash-brick-making-machine-500x500.webp",
    description: "Our Fully Automatic Fly Ash Brick Making Machine is engineered for high-volume production with consistent quality. Ideal for contractors, builders, and brick manufacturers across India.",
    specs: [
      { label: "Automation Grade", value: "Automatic / Manual" },
      { label: "Capacity", value: "1500–2500 bricks/hour" },
      { label: "Brick Type", value: "Solid" },
      { label: "Method", value: "Hydraulic Pressure" },
      { label: "Power", value: "3 Phase Electric" },
      { label: "Brand", value: "Nitin Hydraulics & Engineering" },
    ],
    features: [
      "High production capacity up to 2500 bricks per hour",
      "Consistent brick quality with hydraulic pressure method",
      "Available in automatic and manual operation modes",
      "Suitable for fly ash, sand, cement composite bricks",
      "Robust MS frame construction for long service life",
      "Easy maintenance with accessible components",
    ],
  },
  {
    slug: "hydraulic-tile-press",
    name: "D'Mold Hydraulic Tile Press",
    price: "₹2,60,000",
    tag: "Popular",
    category: "Tile Making",
    image: "/images/products/hydrolic-tile-press.webp",
    description: "The D'Mold Hydraulic Tile Press is built for precision tile manufacturing operations including marking, crimping, staking, flaring, broaching, and embossing.",
    specs: [
      { label: "Model", value: "D'Mold" },
      { label: "Operation", value: "Hydraulic" },
      { label: "Applications", value: "Marking, Crimping, Staking, Flaring, Embossing" },
      { label: "Material", value: "High Grade Raw Materials" },
      { label: "Brand", value: "Nitin Hydraulics & Engineering" },
      { label: "Price", value: "₹2,60,000/Piece" },
    ],
    features: [
      "Wide range of tile pressing operations in one machine",
      "Built from high grade raw materials for durability",
      "Affordable pricing without compromising quality",
      "Suitable for chequered, interlocking and wall tiles",
      "Low maintenance hydraulic system",
      "Available with custom mold configurations",
    ],
  },
  {
    slug: "concrete-block-machine",
    name: "Egg Laying Concrete Block Machine",
    price: "₹2,15,000",
    tag: "Reliable",
    category: "Block Making",
    image: "/images/products/egg-laying-type-concrete-block-machine-500x500.webp",
    description: "The Egg Laying Type Hydraulic Concrete Block Making Machine operates on wheels, laying blocks directly on the concrete floor and moving to the next position automatically.",
    specs: [
      { label: "Model", value: "CBM 01" },
      { label: "Type", value: "Egg Laying / Wheel Mounted" },
      { label: "Operation", value: "Hydraulic" },
      { label: "Block Types", value: "All Standard Concrete Blocks" },
      { label: "Brand", value: "Nitin Hydraulics & Engineering" },
      { label: "Price", value: "₹2,15,000/Piece" },
    ],
    features: [
      "Wheel-mounted for easy movement across floor",
      "Lays blocks directly on concrete surface",
      "Produces any type of concrete block with consistent quality",
      "Hydraulic operation for uniform pressure",
      "Compact design suitable for small and large operations",
      "Interchangeable molds for different block sizes",
    ],
  },
  {
    slug: "concrete-mixer",
    name: "Concrete Mixer Machine",
    price: "₹68,000",
    tag: "Value",
    category: "Mixing",
    image: "/images/products/hydraulic-concrete-mixer-machine-500x500.webp",
    description: "Heavy-duty concrete mixer with tilting drum mechanism. Designed for reliable mixing in brick manufacturing, construction sites, and precast concrete production.",
    specs: [
      { label: "Capacity", value: "1.5 Bag cement mixing ratio" },
      { label: "Motor", value: "5HP, 3 Phase, 1440 RPM" },
      { label: "Motor Make", value: "Crompton Greaves / Kirloskar" },
      { label: "Drum Speed", value: "18–20 RPM" },
      { label: "Loading", value: "Manual" },
      { label: "Chassis", value: "Heavy MS Fabricated" },
    ],
    features: [
      "Robust MS chassis for heavy-duty site use",
      "Crompton Greaves or Kirloskar motor for reliability",
      "Tilting drum for easy discharge",
      "1.5 bag capacity suitable for most operations",
      "Low RPM for thorough mixing quality",
      "Simple maintenance and spare parts availability",
    ],
  },
  {
    slug: "vibrator-table",
    name: "Vibrator Table Machine",
    price: "₹42,000",
    tag: "Essential",
    category: "Accessories",
    image: "/images/products/vibrator-table-machine.webp",
    description: "Industrial vibrator table designed specifically for paver and chequered tile manufacturing. Ensures uniform compaction and eliminates air pockets for superior tile quality.",
    specs: [
      { label: "Size", value: "10 feet × 2.5 feet" },
      { label: "Motor", value: "2HP, 3 Phase" },
      { label: "Motor Speed", value: "2800 RPM" },
      { label: "Application", value: "Pavers & Chequered Tiles" },
      { label: "Construction", value: "Fresh MS Plates & Angles" },
      { label: "Price", value: "₹42,000/Piece" },
    ],
    features: [
      "Large 10ft × 2.5ft working surface",
      "High-speed 2800 RPM vibration for thorough compaction",
      "Built from fresh MS plates and angles",
      "Suitable for pavers, chequered and interlocking tiles",
      "3-phase motor for consistent industrial use",
      "Simple design for easy maintenance",
    ],
  },
  {
    slug: "color-mixer",
    name: "Color Mixer Machine",
    price: "₹45,000",
    tag: "Efficient",
    category: "Mixing",
    image: "/images/products/color-mixer-machines-500x500.webp",
    description: "Precision color mixer designed for tile and brick manufacturing. Ensures uniform color distribution for consistent product appearance across large production runs.",
    specs: [
      { label: "Drum Size", value: '31" Dia × 16" Height' },
      { label: "Motor", value: "3HP, 3 Phase, 1440 RPM" },
      { label: "Motor Make", value: "Siemens / Kirloskar" },
      { label: "Drum Speed", value: "35 RPM" },
      { label: "Capacity", value: "50–70 kg per batch" },
      { label: "Price", value: "₹45,000/Piece" },
    ],
    features: [
      "Siemens or Kirloskar motor for reliability",
      "50–70kg capacity per batch for efficient production",
      "Uniform color mixing at 35 RPM drum speed",
      "Compact design suitable for any factory layout",
      "Fast and accurate mixing reduces material wastage",
      "Easy to clean drum design",
    ],
  },
  {
    slug: "hydraulic-press",
    name: "Hydraulic Press Machine",
    price: "₹95,000",
    tag: "Heavy Duty",
    category: "Press",
    image: "/images/products/hydraulic-press.webp",
    description: "Heavy-duty hydraulic press machine with adjustable bed and wide tonnage range. Suitable for pressing, punching, and forming operations in manufacturing.",
    specs: [
      { label: "Tonnage", value: "10 to 50 Tonnes (Adjustable)" },
      { label: "Power", value: "3 to 5 HP" },
      { label: "Operation", value: "Hand Lever or Foot Switch" },
      { label: "Bed", value: "Adjustable" },
      { label: "Brand", value: "Nitin Hydraulics & Engineering" },
      { label: "Price", value: "₹95,000/Piece" },
    ],
    features: [
      "Wide 10–50 tonne adjustable capacity",
      "Hand lever or foot switch operation options",
      "Adjustable bed for different workpiece sizes",
      "3 to 5 HP power options available",
      "Robust frame construction for long service life",
      "Suitable for pressing, punching and forming",
    ],
  },
  {
    slug: "tile-molds",
    name: "Interlocking Tile Molds",
    price: "₹34–₹80/piece",
    tag: "Bulk",
    category: "Molds",
    image: "/images/products/interlocking-tiles-mold.webp",
    description: "High-quality PVC and plastic molds for chequered, interlocking, and wall tile manufacturing. Available in 35+ designs including Tri-Hex, standard chequered, and custom patterns.",
    specs: [
      { label: "Material", value: "PVC & Plastic" },
      { label: "Types", value: "Chequered, Interlocking, Wall Tiles" },
      { label: "Variants", value: "35+ designs available" },
      { label: "Price Range", value: "₹34–₹80 per piece" },
      { label: "MOQ", value: "Bulk orders preferred" },
      { label: "Brand", value: "Nitin Hydraulics & Engineering" },
    ],
    features: [
      "35+ tile mold designs available",
      "High-quality PVC and plastic construction",
      "Geometrical interlocking patterns for floor durability",
      "Consistent dimensions for uniform tile production",
      "Compatible with standard hydraulic tile press",
      "Custom mold designs available on request",
    ],
  },
];


await mongoose.connect(process.env.MONGODB_URI);

await Product.deleteMany({});

await Product.insertMany(
  products.map((p) => ({
    slug: p.slug,
    name: p.name,
    price: p.price,
    tag: p.tag,
    category: p.category,
    image: p.image,
    description: p.description,
    specs: p.specs || [],
    features: p.features || [],
  }))
);

console.log(`${products.length} products inserted`);

await mongoose.disconnect();
process.exit();