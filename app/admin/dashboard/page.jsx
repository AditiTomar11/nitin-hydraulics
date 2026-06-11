"use client";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Package, MessageSquare, LogOut, LayoutDashboard, ExternalLink } from "lucide-react";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [inquiries, setInquiries] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
    // ✅ Only redirect after loading is complete
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);
  useEffect(() => {
    if (status === "authenticated") {
      Promise.all([
        fetch("/api/inquiries").then((r) => r.json()),
        fetch("/api/products").then((r) => r.json()),
      ]).then(([inqData, prodData]) => {
        if (inqData.success) setInquiries(inqData.inquiries);
        if (prodData.success) setProducts(prodData.products);
        setLoading(false);
      });
    }
  }, [status]);

  if (status === "loading") return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#0A0F1E" }}>
      <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: "#F97316" }} />
    </div>
  );

  const newInquiries = inquiries.filter((i) => i.status === "new").length;

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: "#0A0F1E" }}>
      {/* Sidebar */}
      <aside className="w-60 hidden md:flex flex-col border-r" style={{ backgroundColor: "#1E2A3A", borderColor: "rgba(255,255,255,0.08)" }}>
        <div className="p-5 border-b" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center font-black text-white" style={{ backgroundColor: "#F97316" }}>
              NH
            </div>
            <div>
              <p className="text-white font-bold text-sm">Admin Panel</p>
              <p className="text-xs" style={{ color: "#94A3B8" }}>Nitin Hydraulics</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <Link href="/admin/dashboard" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-white text-sm" style={{ backgroundColor: "rgba(249,115,22,0.1)" }}>
            <LayoutDashboard size={16} style={{ color: "#F97316" }} />
            Dashboard
          </Link>
          <Link href="/admin/inquiries" className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm hover:text-white transition-all" style={{ color: "#94A3B8" }}>
            <div className="flex items-center gap-3">
              <MessageSquare size={16} />
              Inquiries
            </div>
            {newInquiries > 0 && (
              <span className="text-white text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: "#F97316" }}>
                {newInquiries}
              </span>
            )}
          </Link>
          <Link href="/admin/products" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm hover:text-white transition-all" style={{ color: "#94A3B8" }}>
            <Package size={16} />
            Products
          </Link>
          <Link href="/" target="_blank" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm hover:text-white transition-all" style={{ color: "#94A3B8" }}>
            <ExternalLink size={16} />
            View Website
          </Link>
        </nav>

        <div className="p-4 border-t" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-sm transition-all hover:text-red-400"
            style={{ color: "#94A3B8" }}
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-black text-white">Dashboard</h1>
            <p className="text-sm" style={{ color: "#94A3B8" }}>
              Welcome back, {session?.user?.name}
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Total Products", value: products.length, color: "#60a5fa" },
              { label: "Total Inquiries", value: inquiries.length, color: "#ffffff" },
              { label: "New Inquiries", value: newInquiries, color: "#F97316" },
              { label: "States Served", value: 28, color: "#4ade80" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-xl p-5 border" style={{ backgroundColor: "#1E2A3A", borderColor: "rgba(255,255,255,0.08)" }}>
                <p className="text-3xl font-black mb-1" style={{ color: stat.color }}>{stat.value}</p>
                <p className="text-xs" style={{ color: "#94A3B8" }}>{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Quick actions */}
          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            <Link href="/admin/products" className="rounded-xl p-6 border flex items-center gap-4 hover:border-[#F97316]/30 transition-all group" style={{ backgroundColor: "#1E2A3A", borderColor: "rgba(255,255,255,0.08)" }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: "rgba(249,115,22,0.1)" }}>
                <Package size={22} style={{ color: "#F97316" }} />
              </div>
              <div>
                <p className="text-white font-bold">Manage Products</p>
                <p className="text-xs" style={{ color: "#94A3B8" }}>Add, edit or delete products</p>
              </div>
            </Link>
            <Link href="/admin/inquiries" className="rounded-xl p-6 border flex items-center gap-4 hover:border-[#F97316]/30 transition-all group" style={{ backgroundColor: "#1E2A3A", borderColor: "rgba(255,255,255,0.08)" }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: "rgba(249,115,22,0.1)" }}>
                <MessageSquare size={22} style={{ color: "#F97316" }} />
              </div>
              <div>
                <p className="text-white font-bold">View Inquiries</p>
                <p className="text-xs" style={{ color: "#94A3B8" }}>{newInquiries} new inquiries pending</p>
              </div>
            </Link>
          </div>

          {/* Recent inquiries */}
          <div className="rounded-xl border p-6" style={{ backgroundColor: "#1E2A3A", borderColor: "rgba(255,255,255,0.08)" }}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-white font-bold">Recent Inquiries</h2>
              <Link href="/admin/inquiries" className="text-xs hover:underline" style={{ color: "#F97316" }}>View all</Link>
            </div>
            {loading ? (
              <div className="text-center py-8 text-sm" style={{ color: "#94A3B8" }}>Loading...</div>
            ) : inquiries.length === 0 ? (
              <div className="text-center py-8 text-sm" style={{ color: "#94A3B8" }}>
                No inquiries yet. They appear here when customers submit the contact form.
              </div>
            ) : (
              <div className="space-y-3">
                {inquiries.slice(0, 5).map((inq) => (
                  <div key={inq._id} className="flex items-center justify-between p-4 rounded-lg" style={{ backgroundColor: "rgba(10,15,30,0.4)" }}>
                    <div>
                      <p className="text-white text-sm font-semibold">{inq.name}</p>
                      <p className="text-xs" style={{ color: "#94A3B8" }}>{inq.product} • {inq.phone}</p>
                    </div>
                    <span className="text-xs px-2 py-1 rounded-full" style={{
                      backgroundColor: inq.status === "new" ? "rgba(249,115,22,0.1)" : "rgba(34,197,94,0.1)",
                      color: inq.status === "new" ? "#F97316" : "#4ade80"
                    }}>
                      {inq.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}