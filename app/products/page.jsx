"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Search } from "lucide-react";


const categories = ["All", "Brick Making", "Tile Making", "Block Making", "Mixing", "Press", "Molds", "Accessories"];

const tagColors = {
  "Best Seller": "bg-green-500/10 text-green-400 border-green-500/20",
  "Popular": "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "Reliable": "bg-purple-500/10 text-purple-400 border-purple-500/20",
  "Value": "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  "Essential": "bg-red-500/10 text-red-400 border-red-500/20",
  "Efficient": "bg-orange-500/10 text-orange-400 border-orange-500/20",
  "Heavy Duty": "bg-gray-500/10 text-gray-300 border-gray-500/20",
  "Bulk": "bg-teal-500/10 text-teal-400 border-teal-500/20",
};
useEffect(() => {
  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");

      const data = await res.json();

      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  fetchProducts();
}, []);

export default function ProductsPage() {
const [products, setProducts] = useState([]);
const [search, setSearch] = useState("");
const [activeCategory, setActiveCategory] = useState("All");

  const filtered = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === "All" || p.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#0A0F1E]">
      {/* Page Header */}
      <section className="py-16 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-[#F97316] text-sm font-semibold uppercase tracking-widest">
            Our Products
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-white mt-2 mb-4">
            Construction Machinery{" "}
            <span className="text-[#F97316]">Catalog</span>
          </h1>
          <p className="text-[#94A3B8] max-w-xl">
            Browse our complete range of hydraulic construction machinery. All products manufactured in-house and tested before dispatch.
          </p>
        </div>
      </section>

      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search */}
        <div className="relative mb-6">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#1E2A3A] border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white placeholder-[#94A3B8] text-sm outline-none focus:border-[#F97316]/40 transition-colors"
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
                  ? "bg-[#F97316] text-white"
                  : "bg-[#1E2A3A] text-[#94A3B8] border border-white/10 hover:text-white"
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
              className="bg-[#1E2A3A] border border-white/10 rounded-xl overflow-hidden hover:border-[#F97316]/40 transition-all duration-300 group flex flex-col"
            >
              {/* Image */}
              <div className="w-full h-40 bg-white flex items-center justify-center overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={160}
                  height={160}
                  className="object-contain h-36 w-auto"
                />
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                <span className={`self-start text-xs font-semibold px-2 py-0.5 rounded-full border mb-2 ${tagColors[product.tag]}`}>
                  {product.tag}
                </span>
                <h3 className="text-white font-bold text-sm mb-2 leading-snug">
                  {product.name}
                </h3>
                <p className="text-[#94A3B8] text-xs leading-relaxed flex-1 mb-4">
                  {product.desc}
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-[#F97316] font-black">{product.price}</span>
                  <Link
                    href={`/products/${product.slug}`}
                    className="flex items-center gap-1 text-xs text-[#94A3B8] hover:text-[#F97316] transition-colors"
                  >
                    View Details <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-[#94A3B8]">
            No products found for &quot;{search}&quot;
          </div>
        )}
      </section>
    </div>
  );
}