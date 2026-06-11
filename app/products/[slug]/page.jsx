"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Phone, MessageCircle, CheckCircle, Package } from "lucide-react";
import { notFound} from "next/navigation";
import {use} from "react";
import { products } from "@/proxy";
export default function ProductDetailPage({ params }) {
  const { slug } = use(params);
  const product = products.find((p) => p.slug === slug);
  if (!product) return notFound();

  return (
    <div className="min-h-screen">
      {/* Back */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-brand-muted hover:text-white text-sm transition-colors"
        >
          <ArrowLeft size={16} /> Back to Products
        </Link>
      </div>

      <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* Image */}
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

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <span className="text-brand-orange text-xs font-semibold uppercase tracking-widest">
              {product.tag}
            </span>
            <h1 className="text-3xl font-black text-black mt-2 mb-3">{product.name}</h1>
            <p className="text-3xl font-black text-brand-orange mb-4">{product.price}</p>
            <p className="text-brand-muted leading-relaxed mb-6">{product.desc}</p>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-3 mb-8">
              <a
                href="https://wa.me/918796265233"
                className="flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white font-semibold px-5 py-2.5 rounded-lg transition-all"
              >
                <MessageCircle size={18} /> WhatsApp Inquiry
              </a>
              <a
                href="tel:+918796265233"
                className="flex items-center gap-2 border border-white/10 hover:border-brand-orange/40 text-white font-semibold px-5 py-2.5 rounded-lg transition-all"
              >
                <Phone size={18} /> Call Now
              </a>
              <Link
                href="/contact"
                className="flex items-center gap-2 bg-brand-orange hover:bg-orange-500 text-white font-semibold px-5 py-2.5 rounded-lg transition-all"
              >
                Get Quote
              </Link>
            </div>

            {/* Specs */}
            <div className="bg-brand-steel/30 steel-border rounded-xl p-5 mb-6">
              <h3 className="text-black font-bold mb-4 flex items-center gap-2">
                <Package size={16} className="text-brand-orange" /> Specifications
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {product.specs.map((spec) => (
                  <div key={spec.label}>
                    <p className="text-brand-muted text-xs">{spec.label}</p>
                    <p className="text-black text-sm font-semibold">{spec.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Features */}
        <div className="mt-12 bg-brand-steel/20 steel-border rounded-xl p-8">
          <h2 className="text-2xl font-black text-black mb-6">Key Features</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {product.features.map((f) => (
              <div key={f} className="flex items-start gap-3">
                <CheckCircle size={16} className="text-brand-orange shrink-0 mt-0.5" />
                <p className="text-brand-muted text-sm">{f}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}