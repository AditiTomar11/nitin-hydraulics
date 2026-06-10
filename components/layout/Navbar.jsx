"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Phone, Mail, ChevronDown } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  {
    label: "Products",
    href: "/products",
    children: [
      { label: "Fly Ash Brick Machine", href: "/products/fly-ash-brick-machine" },
      { label: "Hydraulic Tile Press", href: "/products/hydraulic-tile-press" },
      { label: "Concrete Block Machine", href: "/products/concrete-block-machine" },
      { label: "Concrete Mixer", href: "/products/concrete-mixer" },
      { label: "Vibrator Table", href: "/products/vibrator-table" },
      { label: "Color Mixer", href: "/products/color-mixer" },
      { label: "Hydraulic Press", href: "/products/hydraulic-press" },
      { label: "Tile Molds", href: "/products/tile-molds" },
    ],
  },
  { label: "Certifications", href: "/certifications" },
  { label: "Catalog", href: "/catalog" },
  { label: "Blog", href: "/blog" },
  { label: "Contact Us", href: "/contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 h-10 z-50 w-full">
      {/* Top Info Bar */}
      <div className="top-bar py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-5">
            <a href="tel:+918796265233" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Phone size={12} className="text-brand-orange" />
              +91-8796265233
            </a>
            <a href="mailto:info@nitinhydraulics.com" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Mail size={12} className="text-brand-orange" />
              info@nitinhydraulics.com
            </a>
          </div>
          <span className="text-slate-400 hidden sm:block">
            Bahadurgarh, Haryana — Pan India Delivery
          </span>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-white light-border border-t-0 h-20 border-x-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center h-12 w-auto gap-3 shrink-0">
              <div className="relative w-12 h-12">
                <Image
                  src="/images/logo.jpg"
                  alt="Nitin Hydraulics"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="hidden sm:block">
                <div className="font-black text-brand-dark text-base leading-tight">Nitin Hydraulics</div>
                <div className="text-brand-muted text-xs">Construction Machinery</div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) =>
                link.children ? (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => setDropdownOpen(true)}
                    onMouseLeave={() => setDropdownOpen(false)}
                  >
                    <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-brand-navy hover:text-brand-orange transition-colors rounded-lg">
                      {link.label}
                      <ChevronDown size={14} className={`transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
                    </button>
                    {dropdownOpen && (
                      <div className="absolute top-full left-0 bg-white light-border rounded-xl card-shadow py-2 min-w-[220px] z-50">
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-4 py-2 text-sm text-brand-navy hover:text-brand-orange hover:bg-orange-50 transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="px-3 py-2 text-sm font-medium text-brand-navy hover:text-brand-orange transition-colors rounded-lg"
                  >
                    {link.label}
                  </Link>
                )
              )}
            </div>

            {/* CTA + Mobile toggle */}
            <div className="flex items-center gap-3">
              <a
                href="tel:+918796265233"
                className="hidden px-6 sm:flex items-center gap-2 orange-btn px-4 py-2 rounded-lg text-sm"
              >
                <Phone size={14} /> Get Quote
              </a>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 text-brand-navy hover:text-brand-orange transition-colors"
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-white border-t light-border px-4 py-4 space-y-1">
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.label}>
                  <div className="px-3 py-2 text-sm font-bold text-brand-orange uppercase tracking-wide">
                    {link.label}
                  </div>
                  {link.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      onClick={() => setMobileOpen(false)}
                      className="block px-6 py-2 text-sm text-brand-navy hover:text-brand-orange transition-colors"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2 text-sm font-medium text-brand-navy hover:text-brand-orange transition-colors rounded-lg"
                >
                  {link.label}
                </Link>
              )
            )}
            <div className="pt-3 border-t light-border">
              <a
                href="tel:+918796265233"
                className="flex items-center justify-center gap-2 orange-btn w-full px-4 py-3 rounded-lg text-sm"
              >
                <Phone size={14} /> Call for Quote
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}