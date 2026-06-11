"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, Pencil, Trash2, ArrowLeft, X, Save, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

const emptyForm = {
  slug: "", name: "", price: "", tag: "", category: "",
  desc: "", image: "", specs: [], features: [],
};

const categories = ["Brick Making", "Tile Making", "Block Making", "Mixing", "Press", "Molds", "Accessories"];
const tags = ["Best Seller", "Popular", "Reliable", "Value", "Essential", "Efficient", "Heavy Duty", "Bulk"];

export default function AdminProducts() {
  const { status } = useSession();
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [specInput, setSpecInput] = useState({ label: "", value: "" });
  const [featureInput, setFeatureInput] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") router.push("/admin/login");
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") fetchProducts();
  }, [status]);

  async function fetchProducts() {
    setLoading(true);
    const res = await fetch("/api/products");
    const data = await res.json();
    if (data.success) setProducts(data.products);
    setLoading(false);
  }

  function openAdd() {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(true);
  }

  function openEdit(product) {
    setForm({
      slug: product.slug,
      name: product.name,
      price: product.price,
      tag: product.tag,
      category: product.category,
      desc: product.desc,
      image: product.image,
      specs: product.specs || [],
      features: product.features || [],
    });
    setEditingId(product._id);
    setShowForm(true);
  }

  async function handleSave() {
    if (!form.name || !form.price) return alert("Name and price are required");
    setSaving(true);
    const url = editingId ? `/api/products/${editingId}` : "/api/products";
    const method = editingId ? "PUT" : "POST";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (data.success) {
      await fetchProducts();
      setShowForm(false);
      setEditingId(null);
      setForm(emptyForm);
    } else {
      alert("Error: " + data.error);
    }
    setSaving(false);
  }

  async function handleDelete(id) {
    if (!confirm("Delete this product?")) return;
    const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
    const data = await res.json();
    if (data.success) fetchProducts();
  }

  function addSpec() {
    if (!specInput.label || !specInput.value) return;
    setForm({ ...form, specs: [...form.specs, specInput] });
    setSpecInput({ label: "", value: "" });
  }

  function removeSpec(i) {
    setForm({ ...form, specs: form.specs.filter((_, idx) => idx !== i) });
  }

  function addFeature() {
    if (!featureInput) return;
    setForm({ ...form, features: [...form.features, featureInput] });
    setFeatureInput("");
  }

  function removeFeature(i) {
    setForm({ ...form, features: form.features.filter((_, idx) => idx !== i) });
  }

  if (status === "loading") return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#0A0F1E" }}>
      <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: "#F97316" }} />
    </div>
  );

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0A0F1E" }}>
      {/* Top bar */}
      <div className="border-b px-6 py-4 flex items-center justify-between" style={{ borderColor: "rgba(255,255,255,0.08)", backgroundColor: "#1E2A3A" }}>
        <div className="flex items-center gap-4">
          <Link href="/admin/dashboard" className="text-[#94A3B8] hover:text-white">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-white font-black text-lg">Products</h1>
            <p className="text-[#94A3B8] text-xs">{products.length} total products</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={openAdd}
            className="flex items-center gap-2 text-white text-sm font-semibold px-4 py-2 rounded-lg"
            style={{ backgroundColor: "#F97316" }}
          >
            <Plus size={16} /> Add Product
          </button>
          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="text-[#94A3B8] hover:text-red-400 p-2 rounded-lg transition-colors"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>

      <div className="p-6 max-w-7xl mx-auto">
        {loading ? (
          <div className="text-center py-20 text-[#94A3B8]">Loading products...</div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-[#94A3B8] mb-4">No products yet.</p>
            <button onClick={openAdd} className="text-white px-6 py-3 rounded-lg font-semibold" style={{ backgroundColor: "#F97316" }}>
              Add First Product
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {products.map((product) => (
              <div key={product._id} className="rounded-xl overflow-hidden border" style={{ backgroundColor: "#1E2A3A", borderColor: "rgba(255,255,255,0.08)" }}>
                {product.image && (
                  <div className="h-40 bg-white flex items-center justify-center">
                    <Image src={product.image} alt={product.name} width={150} height={150} className="object-contain h-36 w-auto" />
                  </div>
                )}
                <div className="p-4">
                  <p className="text-white font-bold text-sm mb-1 leading-snug">{product.name}</p>
                  <p className="text-[#F97316] font-black mb-3">{product.price}</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => openEdit(product)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold text-white"
                      style={{ backgroundColor: "rgba(249,115,22,0.15)", border: "1px solid rgba(249,115,22,0.3)" }}
                    >
                      <Pencil size={13} /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold text-red-400"
                      style={{ backgroundColor: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}
                    >
                      <Trash2 size={13} /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto py-8 px-4" style={{ backgroundColor: "rgba(0,0,0,0.8)" }}>
          <div className="w-full max-w-2xl rounded-2xl p-6 space-y-5" style={{ backgroundColor: "#1E2A3A", border: "1px solid rgba(255,255,255,0.08)" }}>
            <div className="flex items-center justify-between">
              <h2 className="text-white font-black text-xl">{editingId ? "Edit Product" : "Add Product"}</h2>
              <button onClick={() => setShowForm(false)} className="text-[#94A3B8] hover:text-white">
                <X size={20} />
              </button>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { key: "name", label: "Product Name", placeholder: "e.g. Fly Ash Brick Machine" },
                { key: "slug", label: "Slug", placeholder: "e.g. fly-ash-brick-machine" },
                { key: "price", label: "Price", placeholder: "e.g. ₹15,80,000" },
                { key: "image", label: "Image Path", placeholder: "/images/products/filename.webp" },
              ].map((field) => (
                <div key={field.key}>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: "#94A3B8" }}>{field.label}</label>
                  <input
                    type="text"
                    placeholder={field.placeholder}
                    value={form[field.key]}
                    onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                    className="w-full rounded-lg px-4 py-2.5 text-white text-sm outline-none"
                    style={{ backgroundColor: "rgba(10,15,30,0.6)", border: "1px solid rgba(255,255,255,0.08)" }}
                  />
                </div>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: "#94A3B8" }}>Category</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full rounded-lg px-4 py-2.5 text-white text-sm outline-none"
                  style={{ backgroundColor: "rgba(10,15,30,0.6)", border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  <option value="">Select category</option>
                  {categories.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: "#94A3B8" }}>Tag</label>
                <select
                  value={form.tag}
                  onChange={(e) => setForm({ ...form, tag: e.target.value })}
                  className="w-full rounded-lg px-4 py-2.5 text-white text-sm outline-none"
                  style={{ backgroundColor: "rgba(10,15,30,0.6)", border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  <option value="">Select tag</option>
                  {tags.map((t) => <option key={t}>{t}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: "#94A3B8" }}>Description</label>
              <textarea
                rows={3}
                placeholder="Product description..."
                value={form.desc}
                onChange={(e) => setForm({ ...form, desc: e.target.value })}
                className="w-full rounded-lg px-4 py-2.5 text-white text-sm outline-none resize-none"
                style={{ backgroundColor: "rgba(10,15,30,0.6)", border: "1px solid rgba(255,255,255,0.08)" }}
              />
            </div>

            <div>
              <label className="block text-xs font-medium mb-2" style={{ color: "#94A3B8" }}>Specifications</label>
              <div className="flex gap-2 mb-2">
                <input
                  placeholder="Label"
                  value={specInput.label}
                  onChange={(e) => setSpecInput({ ...specInput, label: e.target.value })}
                  className="flex-1 rounded-lg px-3 py-2 text-white text-xs outline-none"
                  style={{ backgroundColor: "rgba(10,15,30,0.6)", border: "1px solid rgba(255,255,255,0.08)" }}
                />
                <input
                  placeholder="Value"
                  value={specInput.value}
                  onChange={(e) => setSpecInput({ ...specInput, value: e.target.value })}
                  className="flex-1 rounded-lg px-3 py-2 text-white text-xs outline-none"
                  style={{ backgroundColor: "rgba(10,15,30,0.6)", border: "1px solid rgba(255,255,255,0.08)" }}
                />
                <button onClick={addSpec} className="px-3 py-2 rounded-lg text-white text-xs font-semibold" style={{ backgroundColor: "#F97316" }}>Add</button>
              </div>
              <div className="space-y-1">
                {form.specs.map((spec, i) => (
                  <div key={i} className="flex items-center justify-between rounded-lg px-3 py-2" style={{ backgroundColor: "rgba(10,15,30,0.4)" }}>
                    <span className="text-xs text-[#94A3B8]">{spec.label}: <span className="text-white">{spec.value}</span></span>
                    <button onClick={() => removeSpec(i)} className="text-red-400"><X size={14} /></button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium mb-2" style={{ color: "#94A3B8" }}>Features</label>
              <div className="flex gap-2 mb-2">
                <input
                  placeholder="e.g. High production capacity"
                  value={featureInput}
                  onChange={(e) => setFeatureInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addFeature()}
                  className="flex-1 rounded-lg px-3 py-2 text-white text-xs outline-none"
                  style={{ backgroundColor: "rgba(10,15,30,0.6)", border: "1px solid rgba(255,255,255,0.08)" }}
                />
                <button onClick={addFeature} className="px-3 py-2 rounded-lg text-white text-xs font-semibold" style={{ backgroundColor: "#F97316" }}>Add</button>
              </div>
              <div className="space-y-1">
                {form.features.map((f, i) => (
                  <div key={i} className="flex items-center justify-between rounded-lg px-3 py-2" style={{ backgroundColor: "rgba(10,15,30,0.4)" }}>
                    <span className="text-xs text-white">{f}</span>
                    <button onClick={() => removeFeature(i)} className="text-red-400"><X size={14} /></button>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={handleSave}
              disabled={saving}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-lg text-white font-bold"
              style={{ backgroundColor: saving ? "rgba(249,115,22,0.6)" : "#F97316" }}
            >
              <Save size={18} />
              {saving ? "Saving..." : editingId ? "Update Product" : "Add Product"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}