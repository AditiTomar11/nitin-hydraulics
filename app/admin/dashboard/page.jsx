"use client";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Package, MessageSquare, LogOut, LayoutDashboard, ExternalLink, KeyRound } from "lucide-react";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [inquiries, setInquiries] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordForm, setPasswordForm] = useState({ current: "", newPass: "", confirm: "" });
  const [passwordMsg, setPasswordMsg] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/admin/login");
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

  async function handlePasswordChange() {
    if (passwordForm.newPass !== passwordForm.confirm) {
      setPasswordMsg("New passwords don't match");
      return;
    }
    if (passwordForm.newPass.length < 6) {
      setPasswordMsg("Password must be at least 6 characters");
      return;
    }
    setPasswordLoading(true);
    setPasswordMsg("");
    try {
      const res = await fetch("/api/admin/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: passwordForm.current,
          newPassword: passwordForm.newPass,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setPasswordMsg("✓ Password changed successfully!");
        setPasswordForm({ current: "", newPass: "", confirm: "" });
        setShowPasswordForm(false);
      } else {
        setPasswordMsg(data.error || "Something went wrong");
      }
    } catch {
      setPasswordMsg("Network error. Try again.");
    }
    setPasswordLoading(false);
  }

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
            <Link href="/admin/products" className="rounded-xl p-6 border flex items-center gap-4 hover:border-orange-500/30 transition-all" style={{ backgroundColor: "#1E2A3A", borderColor: "rgba(255,255,255,0.08)" }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: "rgba(249,115,22,0.1)" }}>
                <Package size={22} style={{ color: "#F97316" }} />
              </div>
              <div>
                <p className="text-white font-bold">Manage Products</p>
                <p className="text-xs" style={{ color: "#94A3B8" }}>Add, edit or delete products</p>
              </div>
            </Link>
            <Link href="/admin/inquiries" className="rounded-xl p-6 border flex items-center gap-4 hover:border-orange-500/30 transition-all" style={{ backgroundColor: "#1E2A3A", borderColor: "rgba(255,255,255,0.08)" }}>
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
          <div className="rounded-xl border p-6 mb-6" style={{ backgroundColor: "#1E2A3A", borderColor: "rgba(255,255,255,0.08)" }}>
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
                {inquiries.filter(i => i.status === "new").slice(0, 5).map((inq) => (
                  <div key={inq._id} className="flex items-center justify-between p-4 rounded-lg" style={{ backgroundColor: "rgba(10,15,30,0.4)" }}>
                    <div>
                      <p className="text-white text-sm font-semibold">{inq.name}</p>
                      <p className="text-xs" style={{ color: "#94A3B8" }}>{inq.product} • {inq.phone}</p>
                    </div>
                    <span className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: "rgba(249,115,22,0.1)", color: "#F97316" }}>
                      new
                    </span>
                  </div>
                ))}
                {inquiries.filter(i => i.status === "new").length === 0 && (
                  <div className="text-center py-4 text-sm" style={{ color: "#94A3B8" }}>
                    No new inquiries. All caught up!
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Change Password */}
          <div className="rounded-xl border p-6" style={{ backgroundColor: "#1E2A3A", borderColor: "rgba(255,255,255,0.08)" }}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: "rgba(249,115,22,0.1)" }}>
                  <KeyRound size={18} style={{ color: "#F97316" }} />
                </div>
                <div>
                  <h2 className="text-white font-bold">Change Password</h2>
                  <p className="text-xs" style={{ color: "#94A3B8" }}>Update your admin login password</p>
                </div>
              </div>
              <button
                onClick={() => { setShowPasswordForm(!showPasswordForm); setPasswordMsg(""); }}
                className="text-xs px-4 py-2 rounded-lg text-white font-semibold"
                style={{ backgroundColor: showPasswordForm ? "rgba(239,68,68,0.15)" : "rgba(249,115,22,0.15)", border: showPasswordForm ? "1px solid rgba(239,68,68,0.3)" : "1px solid rgba(249,115,22,0.3)", color: showPasswordForm ? "#f87171" : "#F97316" }}
              >
                {showPasswordForm ? "Cancel" : "Change Password"}
              </button>
            </div>

            {showPasswordForm && (
              <div className="space-y-3 mt-4">
                {[
                  { key: "current", label: "Current Password", placeholder: "Enter current password" },
                  { key: "newPass", label: "New Password", placeholder: "Min 6 characters" },
                  { key: "confirm", label: "Confirm New Password", placeholder: "Repeat new password" },
                ].map((field) => (
                  <div key={field.key}>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: "#94A3B8" }}>{field.label}</label>
                    <input
                      type="password"
                      placeholder={field.placeholder}
                      value={passwordForm[field.key]}
                      onChange={(e) => setPasswordForm({ ...passwordForm, [field.key]: e.target.value })}
                      className="w-full rounded-lg px-4 py-2.5 text-white text-sm outline-none"
                      style={{ backgroundColor: "rgba(10,15,30,0.6)", border: "1px solid rgba(255,255,255,0.08)" }}
                    />
                  </div>
                ))}

                {passwordMsg && (
                  <p className="text-sm font-medium" style={{ color: passwordMsg.includes("✓") ? "#4ade80" : "#f87171" }}>
                    {passwordMsg}
                  </p>
                )}

                <button
                  onClick={handlePasswordChange}
                  disabled={passwordLoading}
                  className="w-full py-3 rounded-lg text-white font-bold text-sm"
                  style={{ backgroundColor: passwordLoading ? "rgba(249,115,22,0.5)" : "#F97316" }}
                >
                  {passwordLoading ? "Updating..." : "Update Password"}
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}