"use client";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Package, MessageSquare, LogOut, LayoutDashboard, Settings } from "lucide-react";

export const dynamic = "force-dynamic";
export default function Dashboard() {
  const { data: session, status } = useSession();
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
        })
        .catch(() => setLoading(false));
    }
  }, [status]);

  if (status === "loading" || status === "unauthenticated") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-dark">
        <div className="w-8 h-8 border-2 border-brand-orange border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const newInquiries = inquiries.filter((i) => i.status === "new").length;

  return (
    <div className="min-h-screen bg-brand-dark flex">
      {/* Sidebar */}
      <aside className="w-64 bg-brand-steel/30 border-r steel-border hidden md:flex flex-col">
        <div className="p-6 border-b steel-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brand-orange rounded-lg flex items-center justify-center font-black text-white">NH</div>
            <div>
              <p className="text-white font-bold text-sm">Admin Panel</p>
              <p className="text-brand-muted text-xs">Nitin Hydraulics</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {[
            { icon: LayoutDashboard, label: "Dashboard", href: "/admin/dashboard" },
            { icon: MessageSquare, label: "Inquiries", href: "/admin/inquiries", badge: newInquiries },
            { icon: Package, label: "Products", href: "/admin/products" },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center justify-between px-3 py-2.5 rounded-lg text-brand-muted hover:text-white hover:bg-brand-steel/60 transition-all group"
            >
              <div className="flex items-center gap-3">
                <item.icon size={16} />
                <span className="text-sm">{item.label}</span>
              </div>
              {item.badge > 0 && (
                <span className="bg-brand-orange text-white text-xs px-2 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t steel-border">
          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="flex items-center gap-3 px-3 py-2.5 w-full text-brand-muted hover:text-red-400 rounded-lg hover:bg-red-500/10 transition-all text-sm"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-black text-white">Dashboard</h1>
            <p className="text-brand-muted text-sm">Welcome back, {session?.user?.name}</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {[
              { label: "Total Inquiries", value: inquiries.length, color: "text-white" },
              { label: "New Inquiries", value: newInquiries, color: "text-brand-orange" },
              { label: "Total Products", value: 8, color: "text-blue-400" },
              { label: "States Served", value: 28, color: "text-green-400" },
            ].map((stat) => (
              <div key={stat.label} className="bg-brand-steel/30 steel-border rounded-xl p-5">
                <p className={`text-3xl font-black mb-1 ${stat.color}`}>{stat.value}</p>
                <p className="text-brand-muted text-xs">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Recent inquiries */}
          <div className="bg-brand-steel/30 steel-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-white font-bold">Recent Inquiries</h2>
              <Link href="/admin/inquiries" className="text-brand-orange text-sm hover:underline">
                View all
              </Link>
            </div>
            {loading ? (
              <div className="text-center py-8 text-brand-muted text-sm">Loading...</div>
            ) : inquiries.length === 0 ? (
              <div className="text-center py-8 text-brand-muted text-sm">
                No inquiries yet. They will appear here when customers submit the contact form.
              </div>
            ) : (
              <div className="space-y-3">
                {inquiries.slice(0, 5).map((inq) => (
                  <div key={inq._id} className="flex items-center justify-between p-4 bg-brand-dark/40 rounded-lg">
                    <div>
                      <p className="text-white text-sm font-semibold">{inq.name}</p>
                      <p className="text-brand-muted text-xs">{inq.product} • {inq.phone}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      inq.status === "new"
                        ? "bg-brand-orange/10 text-brand-orange"
                        : "bg-green-500/10 text-green-400"
                    }`}>
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