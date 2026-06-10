"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Search } from "lucide-react";
import { useState } from "react";

const products = [
  {
    slug: "fly-ash-brick-machine",
    name: "Fully Automatic Fly-Ash Brick Making Machine",
    price: "₹15,80,000",
    tag: "Best Seller",
    category: "Brick Making",
    desc: "Capacity 1500-2500 bricks/hour. Hydraulic pressure method. Automatic and manual grades available.",
    image: "/images/products/fully-automatic-fly-ash-brick-making-machine-500x500.webp",
  },
  {
    slug: "hydraulic-tile-press",
    name: "D'Mold Hydraulic Tile Press",
    price: "₹2,60,000",
    tag: "Popular",
    category: "Tile Making",
    desc: "High quality tile press for marking, crimping, staking, flaring and embossing operations.",
    image: "/images/products/hydrolic-tile-press.webp",
  },
  {
    slug: "concrete-block-machine",
    name: "Egg Laying Concrete Block Machine",
    price: "₹2,15,000",
    tag: "Reliable",
    category: "Block Making",
    desc: "Wheel-mounted hydraulic block machine. Lays blocks on concrete floor automatically.",
    image: "/images/products/egg-laying-type-concrete-block-machine-500x500.webp",
  },
  {
    slug: "concrete-mixer",
    name: "Concrete Mixer Machine",
    price: "₹68,000",
    tag: "Value",
    category: "Mixing",
    desc: "1.5 bag capacity. 5HP motor. Tilting drum at 18-20 RPM. Robust MS chassis.",
    image: "/images/products/hydraulic-concrete-mixer-machine-500x500.webp",
  },
  {
    slug: "vibrator-table",
    name: "Vibrator Table Machine",
    price: "₹42,000",
    tag: "Essential",
    category: "Accessories",
    desc: "10ft x 2.5ft table for pavers and chequered tiles. 2HP 3-phase motor.",
    image: "/images/products/vibrator-table-machine.webp",
  },
  {
    slug: "color-mixer",
    name: "Color Mixer Machine",
    price: "₹45,000",
    tag: "Efficient",
    category: "Mixing",
    desc: "31\" drum, 3HP motor, 35 RPM. 50-70kg capacity for fast accurate color mixing.",
    image: "/images/products/color-mixer-machines-500x500.webp",
  },
  {
    slug: "hydraulic-press",
    name: "Hydraulic Press Machine",
    price: "₹95,000",
    tag: "Heavy Duty",
    category: "Press",
    desc: "Adjustable bed. 10 to 50 tonne capacity. 3 to 5 HP. Hand lever or foot switch operation.",
    image: "/images/products/hydraulic-press.webp",
  },
  {
    slug: "tile-molds",
    name: "Chequered Tile Molds",
    price: "₹80/piece",
    tag: "Bulk",
    category: "Molds",
    desc: "PVC and plastic molds for chequered, interlocking, and wall tiles. 35+ variants available.",
    image: "/images/products/interlocking-tiles-mold.webp",
  },
];

const categories = ["All", "Brick Making", "Tile Making", "Block Making", "Mixing", "Press", "Molds", "Accessories"];

const tagColors = {
  "Best Seller": "bg-green-500/10 text-green-400 border-green-500/20",
  "Popular": "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "Reliable": "bg-purple-500/10 text-purple-400 border-purple-500/20",
  "Value": "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  "Essential": "bg-red-500/10 text-red-400 border-red-500/20",
  "Efficient": "bg-orange-500/10 text-orange-400 border-orange-500/20",
  "Heavy Duty": "bg-gray-500/10 text-gray-400 border-gray-500/20",
  "Bulk": "bg-teal-500/10 text-teal-400 border-teal-500/20",
};

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === "All" || p.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-16 bg-brand-steel/20 border-b steel-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-brand-orange text-sm font-semibold uppercase tracking-widest">Our Products</span>
          <h1 className="text-4xl sm:text-5xl font-black text-black mt-2 mb-4">
            Construction Machinery <span className="text-gradient">Catalog</span>
          </h1>
        </div>
      </section>

      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search */}
        <div className="relative mb-6">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted" />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
           className="w-full bg-brand-steel/30 rounded-xl pl-11 pr-4 py-3 text-white placeholder-brand-muted text-sm outline-none transition-colors"
          />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat
                  ? "bg-brand-orange text-white"
                  : "bg-brand-steel/30 text-brand-muted hover:text-white steel-border"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((product, i) => (
            <motion.div
              key={product.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-brand-steel/30 steel-border rounded-xl overflow-hidden hover:border-brand-orange/30 transition-all duration-300 group flex flex-col"
            >
              {/* Image */}
             <div className="w-full h-36 bg-white rounded-lg mb-3 overflow-hidden flex items-center justify-center">
             <Image src={product.image} alt={product.name} width={150} height={144} className="object-contain h-32 w-auto" />
             </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-white font-bold text-sm mb-2 leading-snug">{product.name}</h3>
                <p className="text-brand-muted text-xs leading-relaxed flex-1 mb-4">{product.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-brand-orange font-black">{product.price}</span>
                  <Link
                    href={`/products/${product.slug}`}
                    className="flex items-center gap-1 text-xs text-brand-muted hover:text-brand-orange transition-colors"
                  >
                    View Details <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-brand-muted">
            No products found for &quot;{search}&quot;
          </div>
        )}
      </section>
    </div>
  );
}