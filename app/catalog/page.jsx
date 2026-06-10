"use client";
import { motion } from "framer-motion";
import { Play, Download, Phone, MessageCircle } from "lucide-react";

const videos = [
  {
    id: "Y4SN3cT11kw",
    title: "Nitin Hydraulics — Manufacturing Unit Overview",
    desc: "Watch our full manufacturing process — from raw material to finished hydraulic machinery. See how we build fly-ash brick machines, block making machines, and more.",
  },
];

const brochureItems = [
  { name: "Company Brochure", desc: "Full product catalog and company profile", file: "#" },
  { name: "Fly Ash Brick Machine Specs", desc: "Technical specifications sheet", file: "#" },
  { name: "Price List 2024", desc: "Factory-direct pricing for all products", file: "#" },
];

export default function CatalogPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <section className="py-14 section-bg border-b light-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-brand-orange text-sm font-semibold uppercase tracking-widest">Catalog & Videos</span>
          <h1 className="text-4xl sm:text-5xl font-black text-brand-dark mt-2 mb-4">
            See Our Machines <span className="text-gradient">In Action</span>
          </h1>
          <p className="text-brand-muted max-w-xl">
            Watch our manufacturing videos and download product brochures to learn more about Nitin Hydraulics machinery.
          </p>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-brand-orange text-sm font-semibold uppercase tracking-widest">Our Videos</span>
          <h2 className="text-3xl font-black text-brand-dark mt-2">
            Watch Us <span className="text-gradient">Build</span>
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          {videos.map((video) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white light-border card-shadow rounded-2xl overflow-hidden"
            >
              {/* YouTube Embed */}
              <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${video.id}?rel=0&modestbranding=1`}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* Info */}
              <div className="p-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center shrink-0">
                    <Play size={18} className="text-red-600 fill-red-600" />
                  </div>
                  <div>
                    <h3 className="text-brand-dark font-bold text-lg mb-1">{video.title}</h3>
                    <p className="text-brand-muted text-sm leading-relaxed">{video.desc}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 mt-5 pt-5 border-t light-border">
                  <a
                    href="https://wa.me/918796265233?text=Hi%2C%20I%20watched%20your%20video%20and%20want%20to%20know%20more%20about%20your%20machines."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold px-5 py-2.5 rounded-xl transition-colors text-sm"
                  >
                    <MessageCircle size={16} /> WhatsApp Enquiry
                  </a>
                  <a
                    href="tel:+918796265233"
                    className="flex items-center gap-2 orange-btn px-5 py-2.5 rounded-xl text-sm"
                  >
                    <Phone size={16} /> Call Us
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Brochure Download Section */}
      <section className="py-16 section-bg border-t light-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-brand-orange text-sm font-semibold uppercase tracking-widest">Downloads</span>
            <h2 className="text-3xl font-black text-brand-dark mt-2">
              Product <span className="text-gradient">Brochures</span>
            </h2>
            <p className="text-brand-muted mt-2 max-w-md mx-auto text-sm">
              Download our product catalog and specification sheets to share with your team.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {brochureItems.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white light-border card-shadow rounded-2xl p-6 flex flex-col"
              >
                <div className="w-12 h-12 bg-orange-50 border border-orange-100 rounded-xl flex items-center justify-center mb-4">
                  <Download size={20} className="text-brand-orange" />
                </div>
                <h3 className="text-brand-dark font-bold text-sm mb-1">{item.name}</h3>
                <p className="text-brand-muted text-xs leading-relaxed flex-1 mb-4">{item.desc}</p>
                <a
                  href={item.file}
                  className="flex items-center justify-center gap-2 orange-btn px-4 py-2.5 rounded-xl text-sm w-full text-center"
                >
                  <Download size={14} /> Download PDF
                </a>
              </motion.div>
            ))}
          </div>

          <p className="text-center text-brand-muted text-xs mt-8">
            Need a custom quote?{" "}
            <a href="tel:+918796265233" className="text-brand-orange font-semibold hover:underline">
              Call us at +91-8796265233
            </a>
          </p>
        </div>
      </section>

    </div>
  );
}