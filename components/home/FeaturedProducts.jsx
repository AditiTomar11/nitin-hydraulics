"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const featured = [
  {
    slug: "fly-ash-brick-machine",
    name: "Fully Automatic Fly-Ash Brick Making Machine",
    price: "₹15,80,000",
    tag: "Best Seller",
    image: "/images/products/fully-automatic-fly-ash-brick-making-machine-500x500.webp",
    specs: ["1500–2500 bricks/hour", "Hydraulic pressure", "PLC controlled"],
  },
  {
    slug: "hydraulic-tile-press",
    name: "D'Mold Hydraulic Tile Press",
    price: "₹2,60,000",
    tag: "Popular",
    image: "/images/products/hydrolic-tile-press.webp",
    specs: ["Up to 150 Tonnes", "Quick-change mold", "5–7.5 HP motor"],
  },
  {
    slug: "concrete-block-machine",
    name: "Egg Laying Concrete Block Machine",
    price: "₹2,15,000",
    tag: "Reliable",
    image: "/images/products/egg-laying-type-concrete-block-machine-500x500.webp",
    specs: ["600–1200 blocks/shift", "Wheel-mounted", "No pallets needed"],
  },
  {
    slug: "concrete-mixer",
    name: "Concrete Mixer Machine",
    price: "₹68,000",
    tag: "Value",
    image: "/images/products/hydraulic-concrete-mixer-machine-500x500.webp",
    specs: ["1.5 bag capacity", "5 HP motor", "18–20 RPM drum"],
  },
  {
    slug: "vibrator-table",
    name: "Vibrator Table Machine",
    price: "₹42,000",
    tag: "Essential",
    image: "/images/products/vibrator-table-machine.webp",
    specs: ["10ft x 2.5ft surface", "2HP 3-phase", "Spring-isolated base"],
  },
  {
    slug: "hydraulic-press",
    name: "Hydraulic Press Machine",
    price: "₹95,000",
    tag: "Heavy Duty",
    image: "/images/products/hydraulic-press.webp",
    specs: ["10–50 tonne capacity", "3–5 HP", "Foot switch operation"],
  },
];

const tagColors = {
  "Best Seller": "bg-green-100 text-green-700",
  "Popular": "bg-blue-100 text-blue-700",
  "Reliable": "bg-purple-100 text-purple-700",
  "Value": "bg-yellow-100 text-yellow-700",
  "Essential": "bg-red-100 text-red-700",
  "Heavy Duty": "bg-slate-100 text-slate-700",
};

export default function FeaturedProducts() {
  return (
    <section className="py-16 section-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-brand-orange text-sm font-semibold uppercase tracking-widest">Our Product Line</span>
          <h2 className="text-3xl sm:text-4xl font-black text-brand-dark mt-2 mb-3">
            Construction Machinery <span className="text-gradient">Catalog</span>
          </h2>
          <p className="text-brand-muted max-w-xl mx-auto">
            We offer a wide range of high-quality hydraulic construction machines — all manufactured in-house and tested before dispatch.
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {featured.map((product, i) => (
            <motion.div
              key={product.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-white light-border rounded-2xl overflow-hidden card-shadow hover:card-shadow-hover transition-all duration-300 group flex flex-col"
            >
              {/* Image */}
              <div className="relative h-52 bg-slate-50 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain p-5 group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <span className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full ${tagColors[product.tag]}`}>
                  {product.tag}
                </span>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-brand-dark font-bold text-sm leading-snug mb-3">{product.name}</h3>

                {/* Specs */}
                <ul className="space-y-1 mb-4 flex-1">
                  {product.specs.map((spec) => (
                    <li key={spec} className="flex items-center gap-2 text-xs text-brand-muted">
                      <span className="w-1.5 h-1.5 bg-brand-orange rounded-full shrink-0" />
                      {spec}
                    </li>
                  ))}
                </ul>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t light-border">
                  <span className="text-brand-orange font-black text-base">{product.price}</span>
                  <Link
                    href={`/products/${product.slug}`}
                    className="flex items-center gap-1 text-xs font-semibold text-brand-navy hover:text-brand-orange transition-colors"
                  >
                    View Details <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All */}
        <div className="text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 orange-btn px-8 py-3 rounded-xl text-sm"
          >
            View All Products <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}