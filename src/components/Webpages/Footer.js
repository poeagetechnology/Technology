import React, { useState } from "react";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { ChevronDown } from "lucide-react";

// Enterprise-grade footer: accessible, responsive, legal-complete

const sections = {
  services: [
    { name: "AI & ML Solutions", path: "/ai" },
    { name: "Web Development", path: "/web" },
    { name: "Mobile App Development", path: "/appde" },
    { name: "Automation", path: "/soft" },
    { name: "Cloud", path: "/cloud" },
  ],
  company: [
    { name: "About", path: "/about" },
    { name: "Careers", path: "/careers" },
    { name: "Case Studies", path: "/case" },
    { name: "Contact", path: "/contact" },
  ],
  resources: [
    { name: "Blog", path: "/blog" },
    { name: "Help Center", path: "/help" },
    { name: "Documentation", path: "/docs" },
  ],
  legal: [
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Terms of Service", path: "/terms" },
    { name: "Cookie Policy", path: "/cookies" },
    { name: "Accessibility", path: "/accessibility" },
  ],
};

const Accordion = ({ title, items, id }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-neutral-800">
      <button
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center py-3 text-sm font-medium"
      >
        {title}
        <ChevronDown
          size={16}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      <div
        id={id}
        className={`overflow-hidden transition-all duration-300 ${open ? "max-h-96" : "max-h-0"}`}
      >
        <div className="pb-3 space-y-2">
          {items.map((item) => (
            <a
              key={item.name}
              href={item.path}
              className="block text-sm text-neutral-500 hover:text-neutral-200"
            >
              {item.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function Footer() {
  return (
    <LazyMotion features={domAnimation}>
      <footer className="bg-neutral-950 text-neutral-200">

        {/* Main container */}
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12">

          {/* Desktop layout */}
          <div className="hidden lg:grid grid-cols-5 gap-10">

            {/* Brand */}
            <div>
              <h1 className="text-lg font-semibold mb-3">POEAGE</h1>
              <p className="text-sm text-neutral-500 leading-relaxed">
                Enterprise-grade digital solutions built for scale, security, and reliability.
              </p>
            </div>

            {/* Sections */}
            {Object.entries(sections).map(([key, items]) => (
              <div key={key}>
                <h3 className="text-xs uppercase tracking-wider text-neutral-500 mb-3">
                  {key}
                </h3>
                {items.map((item) => (
                  <a
                    key={item.name}
                    href={item.path}
                    className="block text-sm text-neutral-500 hover:text-neutral-200 mb-2"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            ))}
          </div>

          {/* Mobile accordion */}
          <div className="lg:hidden">
            {Object.entries(sections).map(([key, items], i) => (
              <Accordion
                key={key}
                id={`section-${i}`}
                title={key.charAt(0).toUpperCase() + key.slice(1)}
                items={items}
              />
            ))}
          </div>

          {/* Divider */}
          <div className="border-t border-neutral-800 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">

            <span className="text-xs text-neutral-500">
              © {new Date().getFullYear()} Poeage Technology Pvt. Ltd. All rights reserved.
            </span>

            {/* Legal inline */}
            <div className="flex flex-wrap gap-4 text-xs text-neutral-500">
              {sections.legal.map((item) => (
                <a key={item.name} href={item.path} className="hover:text-neutral-200">
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile sticky CTA */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-neutral-950 border-t border-neutral-800 px-4 py-3 flex justify-between items-center">
          <span className="text-xs text-neutral-400">Need enterprise solution?</span>
          <a
            href="/contact"
            className="text-xs bg-white text-black px-4 py-1.5 rounded-full"
          >
            Contact Sales
          </a>
        </div>

      </footer>
    </LazyMotion>
  );
}