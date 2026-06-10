"use client";

import { useEffect, useRef, useState } from "react";
import { Users, Package, Wrench, RefreshCw } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: 500,
    suffix: "+",
    label: "Satisfied Clients",
  },
  {
    icon: Package,
    value: 1000,
    suffix: "+",
    label: "Successful Deliveries",
  },
  {
    icon: Wrench,
    value: 20,
    suffix: "+",
    label: "Years Experience",
  },
  {
    icon: RefreshCw,
    value: 85,
    suffix: "%",
    label: "Recurring Orders",
  },
];

function Counter({ target, suffix }) {
  const [count, setCount] = useState(0);

  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;

        started.current = true;

        const duration = 1800;
        const steps = 60;
        const increment = target / steps;

        let current = 0;

        const timer = setInterval(() => {
          current += increment;

          if (current >= target) {
            setCount(target);
            clearInterval(timer);
          } else {
            setCount(Math.floor(current));
          }
        }, duration / steps);
      },
      {
        threshold: 0.3,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [target]);

  return (
    <span
      ref={ref}
      className="text-4xl lg:text-5xl font-black text-brand-dark"
    >
      {count}
      {suffix}
    </span>
  );
}

export default function StatsBar() {
  return (
    <section className="bg-slate-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-orange">
            Why Choose Us
          </span>

          <h2 className="mt-3 text-3xl sm:text-4xl font-black text-brand-dark">
            Trusted Across India
          </h2>

          <p className="mt-4 max-w-2xl text-center mx-auto text-brand-muted">
            Delivering reliable hydraulic construction machinery with
            consistent quality, nationwide support, and long-term customer
            relationships.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {stats.map(({ icon: Icon, value, suffix, label }) => (
            <div
              key={label}
              className="
                group
                rounded-3xl
                bg-white
                p-8
                text-center
                shadow-sm
                border border-slate-100
                transition-all duration-300
                hover:-translate-y-2
                hover:shadow-xl
              "
            >
              <div
                className="
                  mx-auto mb-6
                  flex h-16 w-16 items-center justify-center
                  rounded-2xl
                  bg-orange-50
                  border border-orange-100
                  transition-transform duration-300
                  group-hover:scale-110
                "
              >
                <Icon
                  size={28}
                  className="text-brand-orange"
                />
              </div>

              <Counter
                target={value}
                suffix={suffix}
              />

              <p className="mt-3 text-sm font-medium text-brand-muted">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}