"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Calendar, Clock } from "lucide-react";

const posts = [
  { slug: "fly-ash-brick-machine-guide", title: "Complete Guide to Fly Ash Brick Making Machines in India 2024", excerpt: "Everything you need to know before buying a fly ash brick machine — capacity, cost, ROI, and what to look for in a manufacturer.", date: "Dec 10, 2024", readTime: "6 min read", tag: "Guide" },
  { slug: "hydraulic-vs-manual-press", title: "Hydraulic vs Manual Tile Press: Which is Right for Your Business?", excerpt: "A detailed comparison of hydraulic and manual tile press machines — production capacity, maintenance costs, and long-term profitability.", date: "Nov 28, 2024", readTime: "5 min read", tag: "Comparison" },
  { slug: "concrete-block-machine-roi", title: "How to Calculate ROI on a Concrete Block Machine Investment", excerpt: "Step-by-step ROI calculation for concrete block machine buyers. Includes real production numbers and market pricing.", date: "Nov 15, 2024", readTime: "7 min read", tag: "Finance" },
  { slug: "construction-machinery-maintenance", title: "5 Essential Maintenance Tips for Hydraulic Construction Machinery", excerpt: "Extend the life of your hydraulic machinery with these practical maintenance tips from our engineering team.", date: "Oct 30, 2024", readTime: "4 min read", tag: "Tips" },
];

const tagColors = {
  "Guide": "bg-blue-500/10 text-blue-400",
  "Comparison": "bg-purple-500/10 text-purple-400",
  "Finance": "bg-green-500/10 text-green-400",
  "Tips": "bg-brand-orange/10 text-brand-orange",
};

export default function BlogPage() {
  return (
    <div className="min-h-screen">
      <section className="py-16 bg-brand-steel/20 border-b steel-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-brand-orange text-sm font-semibold uppercase tracking-widest">Blog</span>
          <h1 className="text-4xl sm:text-5xl font-black text-black mt-2 mb-4">
            Industry <span className="text-gradient">Insights</span>
          </h1>
          <p className="text-brand-muted max-w-xl">
            Practical guides, machine comparisons, and industry knowledge from our engineering team.
          </p>
        </div>
      </section>

      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8">
          {posts.map((post, i) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-brand-steel/10 steel-border rounded-xl p-6 hover:border-brand-orange/30 transition-all group"
            >
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${tagColors[post.tag]}`}>
                {post.tag}
              </span>
              <h2 className="text-black font-bold text-lg mt-3 mb-3 leading-snug group-hover:text-brand-orange transition-colors">
                {post.title}
              </h2>
              <p className="text-brand-muted text-sm leading-relaxed mb-4">{post.excerpt}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-brand-muted text-xs">
                  <span className="flex items-center gap-1"><Calendar size={12} />{post.date}</span>
                  <span className="flex items-center gap-1"><Clock size={12} />{post.readTime}</span>
                </div>
                <Link
                  href={`/blog/${post.slug}`}
                  className="flex items-center gap-1 text-xs text-brand-orange hover:gap-2 transition-all"
                >
                  Read <ArrowRight size={12} />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </div>
  );
}