import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, ChevronRight } from "lucide-react";

const socialLinks = [
  {
    label: "Facebook",
    href: "#",
    svg: '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>',
    filled: true,
  },
  {
    label: "Instagram",
    href: "#",
    svg: '<rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/>',
    filled: false,
  },
  {
    label: "LinkedIn",
    href: "#",
    svg: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>',
    filled: true,
  },
  {
    label: "YouTube",
    href: "https://youtu.be/Y4SN3cT11kw",
    svg: '<path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58a2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/>',
    filled: true,
  },
];

const usefulLinks = [
  ["Company Profile", "/about"],
  ["Blog", "/blog"],
  ["Certifications", "/certifications"],
  ["Catalog", "/catalog"],
  ["Contact", "/contact"],
];

const productLinks = [
  ["Fly Ash Brick Machine", "/products/fly-ash-brick-machine"],
  ["Hydraulic Tile Press", "/products/hydraulic-tile-press"],
  ["Concrete Block Machine", "/products/concrete-block-machine"],
  ["Vibrator Table", "/products/vibrator-table"],
  ["Color Mixer Machine", "/products/color-mixer"],
  ["Hydraulic Press", "/products/hydraulic-press"],
  ["Tile Molds", "/products/tile-molds"],
];

export default function Footer() {
  return (
    <footer className="bg-[#1f1f1f] text-gray-400">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">

          {/* Brand */}
          <div>
            <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-white p-1 mb-5">
              <Image
                src="/images/logo.jpg"
                alt="Nitin Hydraulics"
                fill
                className="object-contain"
              />
            </div>

            <h3 className="text-2xl font-bold text-white">
              Nitin Hydraulics
            </h3>

            <p className="text-brand-orange italic mb-5">
              Construction Machinery
            </p>

            <p className="text-sm leading-7 mb-8">
              Nitin Hydraulics is a leading manufacturer of Fly Ash Brick
              Machines, Block Making Machines, Vibrator Tables, Hydraulic
              Presses, and other construction machinery. We also provide
              installation and after-sales support services.
            </p>

            <div className="flex gap-3">
              {socialLinks.map(({ label, href, svg, filled }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="
                    w-11 h-11
                    border border-orange-500/40
                    text-orange-500
                    rounded
                    flex items-center justify-center
                    hover:bg-brand-orange
                    hover:text-white
                    transition-all duration-300
                  "
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill={filled ? "currentColor" : "none"}
                    stroke={filled ? "none" : "currentColor"}
                    strokeWidth="2"
                    dangerouslySetInnerHTML={{ __html: svg }}
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Useful Links */}
          <div>
            <h4 className="text-2xl font-bold text-white mb-4">
              Useful Links
            </h4>

            <div className="w-14 h-1 bg-brand-orange rounded-full mb-8" />

            <ul>
              {usefulLinks.map(([label, href]) => (
                <li
                  key={label}
                  className="border-b border-white/10"
                >
                  <Link
                    href={href}
                    className="
                      group
                      flex items-center gap-2
                      py-4
                      text-sm
                      hover:text-brand-orange
                      transition-colors
                    "
                  >
                    <ChevronRight
                      size={14}
                      className="
                        text-brand-orange
                        transition-transform
                        duration-300
                        group-hover:translate-x-1
                      "
                    />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-2xl font-bold text-white mb-4">
              Product Links
            </h4>

            <div className="w-14 h-1 bg-brand-orange rounded-full mb-8" />

            <ul>
              {productLinks.map(([label, href]) => (
                <li
                  key={label}
                  className="border-b border-white/10"
                >
                  <Link
                    href={href}
                    className="
                      group
                      flex items-center gap-2
                      py-4
                      text-sm
                      hover:text-brand-orange
                      transition-colors
                    "
                  >
                    <ChevronRight
                      size={14}
                      className="
                        text-brand-orange
                        transition-transform
                        duration-300
                        group-hover:translate-x-1
                      "
                    />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Information */}
          <div>
            <h4 className="text-2xl font-bold text-white mb-4">
              Information
            </h4>

            <div className="w-14 h-1 bg-brand-orange rounded-full mb-8" />

            <ul>
              <li className="flex gap-3 py-4 border-b border-white/10">
                <MapPin
                  size={18}
                  className="text-brand-orange shrink-0 mt-1"
                />

                <span className="text-sm leading-7">
                  1805, Industrial Area, Near Pandit Shree Ram Sharma Metro
                  Station, Bahadurgarh, Haryana — 124507
                </span>
              </li>

              <li className="border-b border-white/10">
                <a
                  href="tel:+918796265233"
                  className="
                    flex items-center gap-3
                    py-4
                    text-sm
                    hover:text-brand-orange
                    transition-colors
                  "
                >
                  <Phone
                    size={18}
                    className="text-brand-orange shrink-0"
                  />

                  +91-8796265233
                </a>
              </li>

              <li className="border-b border-white/10">
                <a
                  href="mailto:info@nitinhydraulics.com"
                  className="
                    flex items-center gap-3
                    py-4
                    text-sm
                    hover:text-brand-orange
                    transition-colors
                  "
                >
                  <Mail
                    size={18}
                    className="text-brand-orange shrink-0"
                  />

                  info@nitinhydraulics.com
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#111111] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500 text-center sm:text-left">
            © {new Date().getFullYear()} Nitin Hydraulics & Engineering. All
            Rights Reserved.
          </p>

          <p className="text-xs text-gray-500">
            Made in India 🇮🇳
          </p>
        </div>
      </div>
    </footer>
  );
}