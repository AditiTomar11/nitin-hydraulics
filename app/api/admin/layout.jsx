"use client";

import { useRouter } from "next/navigation";

export default function AdminLayout({ children }) {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/auth/logout", {
      method: "POST",
    });

    router.push("/admin/login");
  }

  return (
    <div style={{ display: "flex" }}>
      <aside style={{ width: "200px", padding: "20px" }}>
        <h3>Admin Panel</h3>

        <ul>
          <li>Products</li>
          <li>Leads</li>
        </ul>

        {/* LOGOUT BUTTON */}
        <button onClick={handleLogout} style={{ marginTop: "20px" }}>
          Logout
        </button>
      </aside>

      <main style={{ flex: 1, padding: "20px" }}>
        {children}
      </main>
    </div>
  );
}