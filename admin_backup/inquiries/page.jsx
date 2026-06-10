"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Phone, Mail, Package, Clock } from "lucide-react";

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
    <div className="min-h-screen flex items-center justify-center bg-brand-dark">
      <div className="w-8 h-8 border-2 border-brand-orange border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen bg-brand-dark p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin/dashboard" className="text-brand-muted hover:text-white">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-black text-white">Inquiries</h1>
            <p className="text-brand-muted text-sm">{inquiries.length} total inquiries</p>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20 text-brand-muted">Loading inquiries...</div>
        ) : inquiries.length === 0 ? (
          <div className="text-center py-20 text-brand-muted">No inquiries yet.</div>
        ) : (
          <div className="space-y-4">
            {inquiries.map((inq) => (
              <div key={inq._id} className="bg-brand-steel/30 steel-border rounded-xl p-6">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-white font-bold text-lg">{inq.name}</h3>
                    {inq.company && <p className="text-brand-muted text-sm">{inq.company}</p>}
                  </div>
                  <span className={`text-xs px-3 py-1 rounded-full font-semibold ${
                    inq.status === "new"
                      ? "bg-brand-orange/10 text-brand-orange border border-brand-orange/20"
                      : "bg-green-500/10 text-green-400 border border-green-500/20"
                  }`}>
                    {inq.status}
                  </span>
                </div>
                <div className="grid sm:grid-cols-3 gap-3 mb-4">
                  <div className="flex items-center gap-2 text-brand-muted text-sm">
                    <Phone size={14} className="text-brand-orange" />
                    <a href={`tel:${inq.phone}`} className="hover:text-white">{inq.phone}</a>
                  </div>
                  {inq.email && (
                    <div className="flex items-center gap-2 text-brand-muted text-sm">
                      <Mail size={14} className="text-brand-orange" />
                      <a href={`mailto:${inq.email}`} className="hover:text-white">{inq.email}</a>
                    </div>
                  )}
                  {inq.product && (
                    <div className="flex items-center gap-2 text-brand-muted text-sm">
                      <Package size={14} className="text-brand-orange" />
                      {inq.product}
                    </div>
                  )}
                </div>
                {inq.message && (
                  <p className="text-brand-muted text-sm bg-brand-dark/40 rounded-lg p-3 mb-4">
                    {inq.message}
                  </p>
                )}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-brand-muted text-xs">
                    <Clock size={12} />
                    {new Date(inq.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric", month: "short", year: "numeric",
                      hour: "2-digit", minute: "2-digit"
                    })}
                  </div>
                  <a
                    href={`https://wa.me/${inq.phone?.replace(/\D/g, "")}`}
                    className="text-xs bg-green-500/10 text-green-400 border border-green-500/20 px-3 py-1.5 rounded-lg hover:bg-green-500/20 transition-all"
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