"use client";
import { motion } from "framer-motion";
import { Shield, Award, CheckCircle } from "lucide-react";

const certifications = [
  { title: "ISO 9001:2015", body: "International Organization for Standardization", desc: "Quality Management System certification ensuring consistent product quality and customer satisfaction.", icon: Shield },
  { title: "IndiaMart Verified", body: "IndiaMart InterMESH Ltd.", desc: "Verified supplier with 4.6 star rating and 13+ years of trusted transactions on India's largest B2B marketplace.", icon: Award },
  { title: "MSME Registered", body: "Ministry of MSME, Govt. of India", desc: "Registered micro, small and medium enterprise under the Government of India's MSME development act.", icon: CheckCircle },
  { title: "GST Compliant", body: "Goods and Services Tax", desc: "Fully GST registered and compliant business. All invoices include valid GST with proper documentation.", icon: CheckCircle },
];

export default function CertificationsPage() {
  return (
    <div className="min-h-screen">
      <section className="py-16 bg-brand-steel/20 border-b steel-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-brand-orange text-sm font-semibold uppercase tracking-widest">Certifications</span>
          <h1 className="text-4xl sm:text-5xl font-black text-white mt-2 mb-4">
            Certified for <span className="text-gradient">Quality & Trust</span>
          </h1>
          <p className="text-brand-muted max-w-xl">
            Our certifications reflect our commitment to quality, compliance, and customer confidence across every product we manufacture.
          </p>
        </div>
      </section>

      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-steel steel-border rounded-xl p-8 flex gap-5"
            >
              <div className="w-14 h-14 bg-brand-orange/10 rounded-xl flex items-center justify-center shrink-0">
                <cert.icon size={26} className="text-brand-orange" />
              </div>
              <div>
                <h3 className="text-black font-black text-lg mb-1">{cert.title}</h3>
                <p className="text-brand-orange text-xs font-semibold mb-3">{cert.body}</p>
                <p className="text-brand-muted text-sm leading-relaxed">{cert.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-brand-orange/10 border border-brand-orange/20 rounded-2xl p-8 text-center"
        >
          <h2 className="text-2xl font-black text-steel mb-3">
            All Products Tested Before Dispatch
          </h2>
          <p className="text-brand-muted max-w-lg mx-auto text-sm">
            Every machine manufactured at Nitin Hydraulics undergoes rigorous quality testing by our engineering team before it leaves our factory. We don't ship unless it's perfect.
          </p>
        </motion.div>
      </section>
    </div>
  );
}