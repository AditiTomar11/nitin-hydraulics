"use client";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", company: "", phone: "", email: "", product: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
     e.preventDefault();
  setLoading(true);
  try {
    const res = await fetch("/api/inquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (data.success) {
      setSubmitted(true);
    } else {
      alert("Something went wrong. Please try again.");
    }
  } catch (error) {
    alert("Network error. Please try again.");
  } finally {
    setLoading(false);
  }
  };

  return (
    <div className="min-h-screen">
      <section className="py-16 bg-brand-steel/20 border-b steel-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-brand-orange text-sm font-semibold uppercase tracking-widest">Contact Us</span>
          <h1 className="text-4xl sm:text-5xl font-black text-white mt-2 mb-4">
            Get a <span className="text-gradient">Free Quote</span>
          </h1>
          <p className="text-brand-muted max-w-xl">
            Fill in your requirements and our team will get back to you within 24 hours with pricing and specifications.
          </p>
        </div>
      </section>

      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact info */}
          <div className="space-y-6">
            {[
              { icon: Phone, title: "Call Us", value: "+91-8796265233", sub: "Mon–Sat, 9AM–6PM", href: "tel:+918796265233" },
              { icon: Mail, title: "Email Us", value: "info@nitinhydraulics.com", sub: "We reply within 24 hours", href: "mailto:info@nitinhydraulics.com" },
              { icon: MapPin, title: "Visit Us", value: "1805, Industrial Area, Bahadurgarh", sub: "Near Pandit Shree Ram Sharma Metro Station, Haryana — 124507", href: "#" },
              { icon: Clock, title: "Working Hours", value: "Mon – Sat", sub: "9:00 AM to 6:00 PM IST", href: "#" },
            ].map((item) => (
              <a
                key={item.title}
                href={item.href}
                className="flex gap-4 bg-brand-steel/30 steel-border rounded-xl p-5 hover:border-brand-orange/30 transition-all group"
              >
                <div className="w-10 h-10 bg-brand-orange/10 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-brand-orange/20 transition-colors">
                  <item.icon size={18} className="text-brand-orange" />
                </div>
                <div>
                  <p className="text-brand-muted text-xs mb-0.5">{item.title}</p>
                  <p className="text-black font-semibold text-sm">{item.value}</p>
                  <p className="text-brand-muted text-xs mt-0.5">{item.sub}</p>
                </div>
              </a>
            ))}
          </div>

          {/* Form */}
          <div className="lg:col-span-2">

            {submitted ? (
              <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-12 text-center">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send size={28} className="text-green-400" />
                </div>
                <h3 className="text-white font-black text-2xl mb-2">Inquiry Sent!</h3>
                <p className="text-brand-muted">Our team will contact you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-brand-steel/30 steel-border rounded-xl p-8 space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  {[
                    { key: "name", label: "Full Name", placeholder: "Your name", type: "text" },
                    { key: "company", label: "Company Name", placeholder: "Your company", type: "text" },
                    { key: "phone", label: "Phone Number", placeholder: "+91-XXXXXXXXXX", type: "tel" },
                    { key: "email", label: "Email Address", placeholder: "you@company.com", type: "email" },
                  ].map((field) => (
                    <div key={field.key}>
                      <label className="block text-brand-muted text-xs font-medium mb-1.5">{field.label}</label>
                      <input
                        type={field.type}
                        placeholder={field.placeholder}
                        value={form[field.key]}
                        onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                        className="w-full bg-brand-dark/50 steel-border rounded-lg px-4 py-2.5 text-white text-sm placeholder-brand-muted outline-none focus:border-brand-orange/40 transition-colors"
                      />
                    </div>
                  ))}
                </div>

                <div>
                  <label className="block text-brand-muted text-xs font-medium mb-1.5">Product Interest</label>
                  <select
                    value={form.product}
                    onChange={(e) => setForm({ ...form, product: e.target.value })}
                    className="w-full bg-brand-dark/50 steel-border rounded-lg px-4 py-2.5 text-white text-sm outline-none focus:border-brand-orange/40 transition-colors"
                  >
                    <option value="">Select a product</option>
                    <option>Fly Ash Brick Making Machine</option>
                    <option>Hydraulic Tile Press</option>
                    <option>Concrete Block Machine</option>
                    <option>Concrete Mixer Machine</option>
                    <option>Vibrator Table Machine</option>
                    <option>Color Mixer Machine</option>
                    <option>Hydraulic Press Machine</option>
                    <option>Tile Molds</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-brand-muted text-xs font-medium mb-1.5">Message</label>
                  <textarea
                    rows={4}
                    placeholder="Tell us your requirements, production capacity needed, location, budget..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-brand-dark/50 steel-border rounded-lg px-4 py-2.5 text-white text-sm placeholder-brand-muted outline-none focus:border-brand-orange/40 transition-colors resize-none"
                  />
                </div>

                <button
  type="submit"
  disabled={loading}
  className="w-full flex items-center justify-center gap-2 bg-brand-orange hover:bg-orange-500 disabled:opacity-60 text-white font-bold py-3 rounded-lg transition-all glow-orange"
>
  <Send size={18} />
  {loading ? "Sending..." : "Send Inquiry"}
</button>
              </form>
            )}
        </div>
        </div>
      </section>
    </div>
  );
}