"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Phone, MessageCircle, CheckCircle, Shield, Award, Users } from "lucide-react";

const trustPoints = [
  "ISO Certified Manufacturing",
  "Tested Before Dispatch",
  "Pan India Delivery",
  "After-Sales Support",
];

const heroProducts = [
  { name: "Fly Ash Brick Machine", price: "₹15,80,000", tag: "Best Seller", image: "/images/products/fully-automatic-fly-ash-brick-making-machine-500x500.webp" },
  { name: "Hydraulic Tile Press", price: "₹2,60,000", tag: "Popular", image: "/images/products/hydrolic-tile-press.webp" },
  { name: "Concrete Block Machine", price: "₹2,15,000", tag: "Reliable", image: "/images/products/egg-laying-type-concrete-block-machine-500x500.webp" },
  { name: "Vibrator Table", price: "₹42,000", tag: "Essential", image: "/images/products/vibrator-table-machine.webp" },
  { name: "Color Mixer", price: "₹45,000", tag: "Efficient", image: "/images/products/color-mixer-machines-500x500.webp" },
  { name: "Hydraulic Press", price: "₹95,000", tag: "Heavy Duty", image: "/images/products/hydraulic-press.webp" },
];

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % heroProducts.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-brand-dark overflow-hidden py-16 lg:py-24 relative">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(249,115,22,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(249,115,22,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-brand-orange/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
              <span className="w-2 h-2 bg-brand-orange rounded-full animate-pulse" />
              India&apos;s Trusted Manufacturer — Bahadurgarh, Haryana
            </div>

            <h1 className="max-w-xl text-5xl lg:text-6xl font-black leading-[1.1] text-white mb-6">
              Hydraulic Construction
              <span className="block text-gradient">Machinery Experts</span>
            </h1>

            <p className="text-brand-muted text-base leading-relaxed mb-7 max-w-lg">
              From fly-ash brick machines to hydraulic presses — built in Bahadurgarh, delivered pan-India. ISO-grade quality at factory prices.
            </p>

            <div className="grid sm:grid-cols-2 gap-y-2 gap-4 mb-10">
              {trustPoints.map((point) => (
                <div key={point} className="flex items-center gap-3 text-sm text-brand-muted">
                  <CheckCircle size={15} className="text-brand-orange shrink-0" />
                  {point}
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="https://wa.me/918796265233?text=Hi%20Nitin%20Hydraulics%2C%20I%20need%20a%20quote"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-3 rounded-xl transition-colors text-sm"
              >
                <MessageCircle size={17} /> WhatsApp Us
              </a>
              <Link
                href="/products"
                className="flex items-center gap-2 bg-brand-orange hover:bg-orange-500 text-white font-bold px-6 py-3 rounded-xl transition-colors text-sm glow-orange"
              >
                View Products <ArrowRight size={15} />
              </Link>
              <a
                href="tel:+918796265233"
                className="flex items-center gap-2 border border-white/10 hover:border-brand-orange/40 text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm"
              >
                <Phone size={15} /> Call Now
              </a>
            </div>
          </motion.div>

          {/* Right — Rotating product images */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="hidden lg:flex flex-col items-center justify-center"
          >
            <div className="relative w-full max-w-md">
              {/* Glow */}
              <div className="absolute inset-0 bg-brand-orange/10 rounded-3xl blur-2xl" />

              {/* Image card */}
              <div className="relative bg-white rounded-3xl p-8 shadow-2xl overflow-hidden min-h-[380px] flex flex-col items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col items-center w-full"
                  >
                    <Image
                      src={heroProducts[activeIndex].image}
                      alt={heroProducts[activeIndex].name}
                      width={380}
                      height={300}
                      className="object-contain h-64 w-auto"
                    />
                    <div className="mt-5 text-center">
                      <p className="text-gray-800 font-bold text-sm leading-snug">
                        {heroProducts[activeIndex].name}
                      </p>
                      <p className="text-brand-orange font-black text-xl mt-1">
                        {heroProducts[activeIndex].price}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Tag badge */}
                <div className="absolute top-4 right-4 bg-brand-orange text-white text-xs font-black px-3 py-1.5 rounded-full shadow-lg">
                  {heroProducts[activeIndex].tag}
                </div>
              </div>

              {/* Dot indicators */}
              <div className="flex justify-center gap-2 mt-5">
                {heroProducts.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    className={`rounded-full transition-all duration-300 ${
                      i === activeIndex
                        ? "w-6 h-2 bg-brand-orange"
                        : "w-2 h-2 bg-brand-muted/40 hover:bg-brand-muted"
                    }`}
                  />
                ))}
              </div>

              {/* Floating stats */}

              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="absolute -top-4 -right-4 bg-brand-orange rounded-2xl px-5 py-4 shadow-xl glow-orange"
              >
                <div className="text-2xl font-black text-white">13+</div>
                <div className="text-xs text-orange-200">Years Experience</div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Product tags bottom */}
        <div className="mt-16 flex flex-wrap justify-center gap-3">
          {[
            "Fly Ash Brick Machines",
            "Hydraulic Tile Press",
            "Block Machines",
            "Concrete Mixers",
            "Hydraulic Presses",
            "Vibrator Tables",
          ].map((item) => (
            <span
              key={item}
              className="rounded-full bg-brand-steel/40 steel-border px-4 py-2 text-sm font-medium text-brand-muted hover:text-white hover:border-brand-orange/30 transition-all cursor-default"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}