"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Phone, Mail, Package, Clock, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export default function InquiriesPage() {
  const { status } = useSession();
  const router = useRouter();
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/admin/login");
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/inquiries")
        .then((r) => r.json())
        .then((data) => {
          if (data.success) setInquiries(data.inquiries);
          setLoading(false);
        });
    }
  }, [status]);

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
            <h1 className="text-white font-black text-lg">Inquiries</h1>
            <p className="text-[#94A3B8] text-xs">{inquiries.length} total inquiries</p>
          </div>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="text-[#94A3B8] hover:text-red-400 p-2 rounded-lg transition-colors"
        >
          <LogOut size={18} />
        </button>
      </div>

      <div className="p-6 max-w-5xl mx-auto">
        {loading ? (
          <div className="text-center py-20 text-[#94A3B8]">Loading inquiries...</div>
        ) : inquiries.length === 0 ? (
          <div className="text-center py-20 text-[#94A3B8]">
            No inquiries yet. They will appear here when customers submit the contact form.
          </div>
        ) : (
          <div className="space-y-4">
            {inquiries.map((inq) => (
              <div key={inq._id} className="rounded-xl p-6 border" style={{ backgroundColor: "#1E2A3A", borderColor: "rgba(255,255,255,0.08)" }}>
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-white font-bold text-lg">{inq.name}</h3>
                    {inq.company && <p className="text-[#94A3B8] text-sm">{inq.company}</p>}
                  </div>
                  <span className="text-xs px-3 py-1 rounded-full font-semibold" style={{
                    backgroundColor: inq.status === "new" ? "rgba(249,115,22,0.1)" : "rgba(34,197,94,0.1)",
                    border: inq.status === "new" ? "1px solid rgba(249,115,22,0.2)" : "1px solid rgba(34,197,94,0.2)",
                    color: inq.status === "new" ? "#F97316" : "#4ade80"
                  }}>
                    {inq.status}
                  </span>
                </div>

                <div className="grid sm:grid-cols-3 gap-3 mb-4">
                  <div className="flex items-center gap-2 text-sm" style={{ color: "#94A3B8" }}>
                    <Phone size={14} style={{ color: "#F97316" }} />
                    <a href={`tel:${inq.phone}`} className="hover:text-white">{inq.phone}</a>
                  </div>
                  {inq.email && (
                    <div className="flex items-center gap-2 text-sm" style={{ color: "#94A3B8" }}>
                      <Mail size={14} style={{ color: "#F97316" }} />
                      <a href={`mailto:${inq.email}`} className="hover:text-white">{inq.email}</a>
                    </div>
                  )}
                  {inq.product && (
                    <div className="flex items-center gap-2 text-sm" style={{ color: "#94A3B8" }}>
                      <Package size={14} style={{ color: "#F97316" }} />
                      {inq.product}
                    </div>
                  )}
                </div>

                {inq.message && (
                  <p className="text-sm rounded-lg p-3 mb-4" style={{ backgroundColor: "rgba(10,15,30,0.4)", color: "#94A3B8" }}>
                    {inq.message}
                  </p>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs" style={{ color: "#94A3B8" }}>
                    <Clock size={12} />
                    {new Date(inq.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric", month: "short", year: "numeric",
                      hour: "2-digit", minute: "2-digit"
                    })}
                  </div>
                  <a
                    href={`https://wa.me/${inq.phone?.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs px-3 py-1.5 rounded-lg transition-all"
                    style={{ backgroundColor: "rgba(34,197,94,0.1)", color: "#4ade80", border: "1px solid rgba(34,197,94,0.2)" }}
                  >
                    Reply on WhatsApp
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}