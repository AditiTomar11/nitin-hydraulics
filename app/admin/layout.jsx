import Providers from "./providers";

export default function AdminLayout({ children }) {
  return (
    <Providers>
      <div style={{ minHeight: "100vh", backgroundColor: "#0A0F1E" }}>
        {children}
      </div>
    </Providers>
  );
}