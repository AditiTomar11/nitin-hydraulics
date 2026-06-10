"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Award, Users, Truck, Wrench } from "lucide-react";

const highlights = [
  { icon: Award, title: "ISO Certified", desc: "Quality manufacturing standards at every stage" },
  { icon: Users, title: "500+ Clients", desc: "Trusted by businesses across India" },
  { icon: Truck, title: "Pan India Delivery", desc: "Timely dispatch to all major cities" },
  { icon: Wrench, title: "After-Sales Support", desc: "Installation & maintenance assistance" },
];

// All 4 with verified filenames
const collageImages = [
  { src: "/images/products/fully-automatic-fly-ash-brick-making-machine-500x500.webp", alt: "Fly Ash Brick Machine" },
  { src: "/images/products/hydraulic-concrete-mixer-machine-500x500.webp", alt: "Concrete Mixer" },
  { src: "/images/products/egg-laying-type-concrete-block-machine-500x500.webp", alt: "Block Machine" },
  { src: "/images/products/hydrolic-tile-press.webp", alt: "Tile Press" },
];

export default function AboutSnippet() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left - Image collage */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-brand-orange text-sm font-semibold uppercase tracking-widest">About Us</span>
            <h2 className="text-3xl sm:text-4xl font-black text-brand-dark mt-2 mb-4 leading-tight">
              What We Do —{" "}
              <span className="text-gradient">Nitin Hydraulics</span>
            </h2>
            <p className="text-brand-muted leading-relaxed mb-4 text-sm">
              Nitin Hydraulics is a Bahadurgarh-based manufacturer of hydraulic construction machinery, serving the Indian construction industry for over two decades. We specialise in fly-ash brick machines, block making machines, tile presses, mixers, and hydraulic presses.
            </p>
            <p className="text-brand-muted leading-relaxed mb-8 text-sm">
              Every machine we manufacture is built in-house, rigorously tested before dispatch, and backed by our after-sales support team. Our goal is to deliver premium-quality industrial machinery at factory-direct prices.
            </p>

            <div className="grid grid-cols-2 gap-3 mb-8">
              {highlights.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 light-border">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center shrink-0">
                    <Icon size={15} className="text-brand-orange" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-brand-dark">{title}</div>
                    <div className="text-xs text-brand-muted mt-0.5 leading-snug">{desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 orange-btn px-6 py-3 rounded-xl text-sm"
            >
              Read More About Us <ArrowRight size={15} />
            </Link>
          </motion.div>
          {/* Right - Text */}
           <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative pb-8"
          >
            <div className="grid grid-cols-2 gap-4">
              {collageImages.map((img, i) => (
                <div
                  key={img.alt}
                  className={`relative rounded-2xl overflow-hidden bg-slate-50 light-border ${i % 2 === 1 ? "mt-8" : i === 2 ? "-mt-8" : ""}`}
                  style={{ height: "180px" }}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-contain p-4"
                    sizes="25vw"
                  />
                </div>
              ))}
            </div>

            {/* Floating badge */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-brand-orange text-white rounded-2xl px-6 py-3 card-shadow text-center whitespace-nowrap z-10">
              <div className="text-xl font-black">20+ Years</div>
              <div className="text-xs opacity-90">of Manufacturing Excellence</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}