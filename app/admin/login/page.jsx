"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Lock, Mail, Eye, EyeOff } from "lucide-react";

export default function AdminLogin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
    });
    if (res?.ok) {
      router.push("/admin/dashboard");
      router.refresh();
    } else {
      setError("Invalid email or password");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{backgroundColor: "#0A0F1E"}}>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center font-black text-white text-2xl mx-auto mb-4" style={{backgroundColor: "#F97316"}}>
            NH
          </div>
          <h1 className="text-2xl font-black text-white">Admin Panel</h1>
          <p className="text-sm mt-1" style={{color: "#94A3B8"}}>Nitin Hydraulics & Engineering</p>
        </div>

        <form onSubmit={handleSubmit} className="rounded-2xl p-8 space-y-5" style={{backgroundColor: "#1E2A3A", border: "1px solid rgba(255,255,255,0.08)"}}>
          {error && (
            <div className="rounded-lg px-4 py-3 text-sm" style={{backgroundColor: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", color: "#f87171"}}>
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-medium mb-1.5" style={{color: "#94A3B8"}}>Email</label>
            <div className="relative">
              <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{color: "#94A3B8"}} />
              <input
                type="email"
                placeholder="admin@nitinhydraulics.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                className="w-full rounded-lg pl-11 pr-4 py-3 text-white text-sm outline-none"
                style={{backgroundColor: "rgba(10,15,30,0.5)", border: "1px solid rgba(255,255,255,0.08)"}}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium mb-1.5" style={{color: "#94A3B8"}}>Password</label>
            <div className="relative">
              <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{color: "#94A3B8"}} />
              <input
                type={showPass ? "text" : "password"}
                placeholder="Enter password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
                className="w-full rounded-lg pl-11 pr-11 py-3 text-white text-sm outline-none"
                style={{backgroundColor: "rgba(10,15,30,0.5)", border: "1px solid rgba(255,255,255,0.08)"}}
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-4 top-1/2 -translate-y-1/2"
                style={{color: "#94A3B8"}}
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full font-bold py-3 rounded-lg transition-all text-white"
            style={{backgroundColor: loading ? "rgba(249,115,22,0.6)" : "#F97316"}}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="text-center text-xs mt-4" style={{color: "#94A3B8"}}>
          Use credentials from your .env.local file
        </p>
      </div>
    </div>
  );
}