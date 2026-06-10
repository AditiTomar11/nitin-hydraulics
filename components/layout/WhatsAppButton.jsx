"use client";

import { MessageCircle, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed bottom-8 right-6 z-50 flex flex-col items-end gap-3">
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 rounded-xl bg-white px-3 py-2 shadow-lg border border-slate-200 text-sm text-slate-700">
          <span>Need help? Chat with us.</span>

          <button
            onClick={() => setShowTooltip(false)}
            className="text-slate-400 hover:text-slate-700 transition-colors"
            aria-label="Close WhatsApp message"
          >
            <X size={14} />
          </button>
        </div>
      )}

      <a
        href="https://wa.me/918796265233?text=Hi%20Nitin%20Hydraulics%2C%20I%20need%20a%20quote"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="
          flex h-14 w-14 items-center justify-center
          rounded-full bg-green-500 text-white
          shadow-lg transition-all duration-300
          hover:scale-110 hover:bg-green-600
          focus:outline-none focus:ring-4 focus:ring-green-500/30
        "
      >
        <MessageCircle size={26} fill="currentColor" />
      </a>
    </div>
  );
}