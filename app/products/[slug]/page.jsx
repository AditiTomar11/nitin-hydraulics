import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Phone,
  MessageCircle,
  CheckCircle,
  Package,
} from "lucide-react";
import { notFound } from "next/navigation";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";


export default async function ProductDetailPage({ params }) {
  const { slug } = await params;
  await connectDB();

  const product = await Product.findOne({slug});

  if (!product) {
    notFound();
  }

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
            <div
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
            </div>

            {/* Product Content */}
            <div
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
                {product.description }
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
                  {(product.specs || []).map((spec) => (
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
            </div>
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
              {(product.features || []).map((feature) => (
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