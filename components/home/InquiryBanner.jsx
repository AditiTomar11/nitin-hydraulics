"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Phone, MessageCircle } from "lucide-react";

export default function InquiryBanner() {
  return (
    <section className="py-16">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-gradient-to-r from-brand-orange to-orange-600 rounded-2xl p-10 overflow-hidden text-center"
        >
          {/* Background pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:30px_30px]" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />

          <div className="relative">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">
              Ready to Grow Your Business?
            </h2>
            <p className="text-orange-100 text-lg mb-8 max-w-xl mx-auto">
              Get a free consultation and quote for any machinery. Our engineers will help you choose the right equipment for your production needs.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="tel:+918796265233"
                className="flex items-center gap-2 bg-white text-brand-orange font-bold px-6 py-3 rounded-lg hover:bg-orange-50 transition-all"
              >
                <Phone size={18} />
                Send Inquiry
              </a>
              <a
                href="tel:+918796265233"
                className="flex items-center gap-2 border-2 border-white/40 text-white font-bold px-6 py-3 rounded-lg hover:bg-white/10 transition-all"
              >
                <Phone size={18} />
                Call Now
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}