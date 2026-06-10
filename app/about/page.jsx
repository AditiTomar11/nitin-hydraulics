"use client";
import { motion } from "framer-motion";
import { CheckCircle, Target, Eye, Award } from "lucide-react";

const values = [
  { icon: Target, title: "Our Mission", desc: "To provide affordable, durable, and high-performance hydraulic machinery that empowers Indian contractors and manufacturers to build better." },
  { icon: Eye, title: "Our Vision", desc: "To be India's most trusted construction machinery brand, known for quality, reliability, and after-sales excellence." },
  { icon: Award, title: "Our Promise", desc: "Every machine leaves our factory tested, certified, and ready to perform. We stand behind every product we manufacture." },
];

const team = [
  { name: "Nitin Kumar", role: "Founder & Managing Director", exp: "15+ years in hydraulic engineering" },
  { name: "Engineering Team", role: "R&D & Manufacturing", exp: "In-house design and testing" },
  { name: "Service Team", role: "After-Sales Support", exp: "PAN India service network" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-20 bg-brand-steel/20 border-b steel-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="text-brand-orange text-sm font-semibold uppercase tracking-widest">About Us</span>
            <h1 className="text-4xl sm:text-5xl font-black text-black mt-2 mb-6">
              13 Years of Building{" "}
              <span className="text-gradient">India's Infrastructure</span>
            </h1>
            <p className="text-brand-muted text-lg leading-relaxed">
              Nitin Hydraulics & Engineering was founded with a single goal — to manufacture world-class hydraulic construction machinery at prices accessible to every Indian contractor and builder. Based in Bahadurgarh, Haryana, we have grown to serve 500+ clients across 28 states.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-steel steel-border rounded-xl p-6"
              >
                <div className="w-12 h-12 bg-brand-orange/10 rounded-xl flex items-center justify-center mb-4">
                  <v.icon size={22} className="text-brand-orange" />
                </div>
                <h3 className="text-black font-bold text-lg mb-2">{v.title}</h3>
                <p className="text-brand-muted text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Why us */}
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-black text-black mb-6">Why Choose Nitin Hydraulics?</h2>
              <ul className="space-y-4">
                {[
                  "13+ years of hands-on manufacturing experience",
                  "All machines tested before dispatch",
                  "Custom specifications available on request",
                  "Genuine spare parts always in stock",
                  "Technical support and installation assistance",
                  "Competitive pricing with no compromise on quality",
                  "4.6 star rated on IndiaMart with verified reviews",
                ].map((point) => (
                  <li key={point} className="flex items-start gap-3 text-brand-muted text-sm">
                    <CheckCircle size={16} className="text-brand-orange shrink-0 mt-0.5" />
                    {point}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { value: "2011", label: "Founded" },
                { value: "500+", label: "Clients" },
                { value: "28", label: "States" },
                { value: "50+", label: "Products" },
              ].map((s) => (
                <div key={s.label} className="bg-brand-steel/40 steel-border rounded-xl p-6 text-center">
                  <p className="text-brand-orange font-black text-3xl mb-1">{s.value}</p>
                  <p className="text-brand-muted text-sm">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-brand-steel/20 border-t steel-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-black    text-center mb-12">Our Team</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-brand-steel/30 steel-border rounded-xl p-6 text-center"
              >
                <div className="w-16 h-16 bg-brand-orange/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-brand-orange font-black text-xl">
                    {member.name[0]}
                  </span>
                </div>
                <h3 className="text-black font-bold mb-1">{member.name}</h3>
                <p className="text-brand-orange text-sm mb-2">{member.role}</p>
                <p className="text-brand-muted text-xs">{member.exp}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}