"use client";
import { useEffect, useState, use } from "react";
import { Loader2, ArrowLeft, CheckCircle, ShieldCheck, Cpu } from "lucide-react";
import Link from "next/link";

export default function ProductDetailsPage({ params: paramsPromise }) {
  // Unwrap the params promise safely using React.use()
  const params = use(paramsPromise);
  const { slug } = params;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Quote Form State
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    company: "",
    details: ""
  });

  useEffect(() => {
    async function getProductDetails() {
      try {
        const res = await fetch(`/api/products/${slug}`);
        const json = await res.json();
        if (json.success) {
          setProduct(json.data);
        }
      } catch (err) {
        console.error("Error loading product:", err);
      } finally {
        setLoading(false);
      }
    }
    getProductDetails();
  }, [slug]);

  const handleQuoteRequest = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          productOfInterest: product.name
        })
      });
      const json = await res.json();
      if (json.success) {
        setFormSubmitted(true);
        setFormData({ name: "", phone: "", company: "", details: "" });
      }
    } catch (err) {
      alert("Communication error, please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-dark flex items-center justify-center">
        <Loader2 className="text-brand-orange animate-spin w-10 h-10" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-brand-dark pt-28 text-center px-4">
        <h2 className="text-2xl font-bold text-brand-light">Machine Specification Sheet Offline</h2>
        <p className="text-brand-muted text-sm mt-2">The specified product routing identifier could not be verified.</p>
        <Link href="/products" className="text-brand-orange text-sm font-semibold inline-flex items-center gap-1 mt-6 hover:underline">
          <ArrowLeft size={14} /> Return to Machinery Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-dark pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back navigation anchor */}
        <Link href="/products" className="text-brand-muted hover:text-brand-orange transition-colors inline-flex items-center gap-1.5 text-sm font-semibold mb-8">
          <ArrowLeft size={16} /> Back to All Machinery
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Block: Core Product Details */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <span className="bg-brand-orange/10 text-brand-orange font-bold text-xs px-3 py-1 rounded-full border border-brand-orange/20">
                {product.tag}
              </span>
              <h1 className="text-2xl sm:text-4xl font-black text-brand-light mt-4 mb-3 leading-tight uppercase">
                {product.name}
              </h1>
              <p className="text-2xl font-extrabold text-brand-orange">{product.price}</p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
              <h3 className="text-brand-light font-bold text-base mb-2 flex items-center gap-2">
                <Cpu size={18} className="text-brand-orange" /> Operational Summary
              </h3>
              <p className="text-brand-muted text-sm leading-relaxed">{product.desc}</p>
            </div>

            {/* Industrial Specifications List */}
            <div>
              <h3 className="text-brand-light font-bold text-lg mb-4 uppercase tracking-wider">
                Technical Blueprint Specs
              </h3>
              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                <table className="w-full text-left text-sm">
                  <tbody>
                    <tr className="border-b border-slate-100 bg-slate-50/50">
                      <td className="px-5 py-3.5 font-bold text-brand-light w-1/3">Power Grade Requirement</td>
                      <td className="px-5 py-3.5 text-brand-muted">Three-Phase Industrial System (445V)</td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="px-5 py-3.5 font-bold text-brand-light">Structural Chassis Material</td>
                      <td className="px-5 py-3.5 text-brand-muted">Heavy Duty Reinforced Mild Steel Base</td>
                    </tr>
                    <tr className="border-b border-slate-100 bg-slate-50/50">
                      <td className="px-5 py-3.5 font-bold text-brand-light">Hydraulic Pump System</td>
                      <td className="px-5 py-3.5 text-brand-muted">Dual Stage High Pressure Flow Valve Setup</td>
                    </tr>
                    <tr>
                      <td className="px-5 py-3.5 font-bold text-brand-light">Warranty Coverage</td>
                      <td className="px-5 py-3.5 text-brand-muted flex items-center gap-1 text-green-600 font-medium">
                        <ShieldCheck size={16} /> 12 Months Complete Structural Warranty
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Block: Instant Quotation Capture Widget */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <div className="bg-white border border-slate-200 shadow-lg rounded-xl p-6 sm:p-8">
              {formSubmitted ? (
                <div className="text-center py-10 space-y-4">
                  <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle size={28} />
                  </div>
                  <h3 className="text-lg font-bold text-brand-light">RFQ Recorded Successfully</h3>
                  <p className="text-brand-muted text-xs leading-relaxed">
                    Your dynamic procurement requirement packet has been written directly to our dashboard pipeline. A regional commercial head will call you shortly.
                  </p>
                </div>
              ) : (
                <>
                  <h3 className="text-brand-light font-black text-lg uppercase tracking-tight mb-1">
                    Request Commercial Quote
                  </h3>
                  <p className="text-brand-muted text-xs mb-6">
                    Submit your plant throughput requirements to receive custom pricing and shipping lead estimates.
                  </p>

                  <form onSubmit={handleQuoteRequest} className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold text-brand-muted uppercase tracking-wider mb-1">Contact Name</label>
                      <input 
                        required 
                        type="text" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm text-brand-light focus:outline-none focus:border-brand-orange transition-colors"
                        placeholder="e.g. Ramesh Kumar"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-brand-muted uppercase tracking-wider mb-1">Phone Number</label>
                        <input 
                      required 
                          type="tel" 
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm text-brand-light focus:outline-none focus:border-brand-orange transition-colors"
                          placeholder="e.g. +91 99999 88888"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-brand-muted uppercase tracking-wider mb-1">Enterprise Name</label>
                        <input 
                          required 
                          type="text" 
                          value={formData.company}
                          onChange={(e) => setFormData({...formData, company: e.target.value})}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm text-brand-light focus:outline-none focus:border-brand-orange transition-colors"
                          placeholder="e.g. Nitin Blocks Ltd"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-brand-muted uppercase tracking-wider mb-1">Plant Delivery / Capacity Details</label>
                      <textarea 
                        rows={3}
                        value={formData.details}
                        onChange={(e) => setFormData({...formData, details: e.target.value})}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm text-brand-light focus:outline-none focus:border-brand-orange transition-colors resize-none"
                        placeholder="Specify required bricks per hour output, target installation city..."
                      />
                    </div>

                    <button 
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-brand-orange hover:bg-orange-600 text-white text-xs font-bold uppercase tracking-wider py-3 rounded-lg transition-all shadow-md flex justify-center items-center gap-2 mt-2"
                    >
                      {submitting ? <Loader2 className="animate-spin w-4 h-4" /> : "Request Instant Pricing"}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}