"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Phone, MessageCircle, CheckCircle, Package } from "lucide-react";
import { notFound } from "next/navigation";


const products = [
  {
    slug: "fly-ash-brick-machine",
    name: "Fully Automatic Fly-Ash Brick Making Machine",
    price: "₹15,80,000",
    tag: "Best Seller",
    image: "/images/products/fully-automatic-fly-ash-brick-making-machine-500x500.webp",
    desc: "Our Fully Automatic Fly Ash Brick Making Machine is engineered for high-volume production with consistent quality. Ideal for contractors, builders, and brick manufacturers across India.",
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
    image: "/images/products/hydrolic-tile-press.webp",
    desc: "The D'Mold Hydraulic Tile Press is built for precision tile manufacturing operations including marking, crimping, staking, flaring, broaching, and embossing.",
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
    image: "/images/products/egg-laying-type-concrete-block-machine-500x500.webp",
    desc: "The Egg Laying Type Hydraulic Concrete Block Making Machine operates on wheels, laying blocks directly on the concrete floor and moving to the next position automatically.",
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
    image: "/images/products/hydraulic-concrete-mixer-machine-500x500.webp",
    desc: "Heavy-duty concrete mixer with tilting drum mechanism. Designed for reliable mixing in brick manufacturing, construction sites, and precast concrete production.",
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
    image: "/images/products/vibrator-table-machine.webp",
    desc: "Industrial vibrator table designed specifically for paver and chequered tile manufacturing. Ensures uniform compaction and eliminates air pockets for superior tile quality.",
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
    image: "/images/products/color-mixer-machines-500x500.webp",
    desc: "Precision color mixer designed for tile and brick manufacturing. Ensures uniform color distribution for consistent product appearance across large production runs.",
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
    image: "/images/products/hydraulic-press.webp",
    desc: "Heavy-duty hydraulic press machine with adjustable bed and wide tonnage range. Suitable for pressing, punching, and forming operations in manufacturing.",
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
    image: "/images/products/interlocking-tiles-mold.webp",
    desc: "High-quality PVC and plastic molds for chequered, interlocking, and wall tile manufacturing. Available in 35+ designs including Tri-Hex, standard chequered, and custom patterns.",
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

export default function ProductDetailPage({ params }) {
  const { slug } = params;
  const product = products.find((p) => p.slug === slug);
  if (!product) return notFound();

  return (
      <>
      <div className="min-h-screen bg-[#0A0F1E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-[#94A3B8] hover:text-white text-sm transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Products
          </Link>
        </div>

        <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Product Image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl p-8 flex items-center justify-center"
            >
              <Image
                src={product.image}
                alt={product.name}
                width={500}
                height={500}
                className="object-contain max-h-96 w-auto"
              />
            </motion.div>

            {/* Product Content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <span className="text-[#F97316] text-xs font-semibold uppercase tracking-widest">
                {product.tag}
              </span>

              <h1 className="text-3xl font-black text-white mt-2 mb-3">
                {product.name}
              </h1>

              <p className="text-3xl font-black text-[#F97316] mb-4">
                {product.price}
              </p>

              <p className="text-[#94A3B8] leading-relaxed mb-6">
                {product.desc}
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                <a
                  href="https://wa.me/918796265233"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white font-semibold px-5 py-2.5 rounded-lg transition-all"
                >
                  <MessageCircle size={18} />
                  WhatsApp Inquiry
                </a>

                <a
                  href="tel:+918796265233"
                  className="flex items-center gap-2 border border-white/10 hover:border-orange-400/40 text-white font-semibold px-5 py-2.5 rounded-lg transition-all"
                >
                  <Phone size={18} />
                  Call Now
                </a>

                <Link
                  href="/contact"
                  className="flex items-center gap-2 bg-[#F97316] hover:bg-orange-500 text-white font-semibold px-5 py-2.5 rounded-lg transition-all"
                >
                  Get Quote
                </Link>
              </div>

              {/* Specifications */}
              <div
                className="rounded-xl p-5"
                style={{
                  backgroundColor: "#1E2A3A",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                  <Package size={16} className="text-[#F97316]" />
                  Specifications
                </h3>

                <div className="grid grid-cols-2 gap-3">
                  {product.specs.map((spec) => (
                    <div key={spec.label}>
                      <p className="text-[#94A3B8] text-xs">
                        {spec.label}
                      </p>
                      <p className="text-white text-sm font-semibold">
                        {spec.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Features */}
          <div
            className="mt-12 rounded-xl p-8"
            style={{
              backgroundColor: "#1E2A3A",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <h2 className="text-2xl font-black text-white mb-6">
              Key Features
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {product.features.map((feature) => (
                <div
                  key={feature}
                  className="flex items-start gap-3"
                >
                  <CheckCircle
                    size={16}
                    className="text-[#F97316] shrink-0 mt-0.5"
                  />

                  <p className="text-[#94A3B8] text-sm">
                    {feature}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}