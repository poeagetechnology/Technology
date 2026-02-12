import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Logo from "../../assests/Poeage_Logo_1.png";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { label: "About Us", href: "/aboutus" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Blog", href: "/blog" },
    { label: "How It Works", href: "/work" },
    { label: "Hire", href: "/hire" },
    { label: "Our Company", href: "/our-company" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-b">
      {/* slim gradient accent bar */}
      <div className="h-1 w-full bg-gradient-to-r from-gray-900 via-gray-600 to-gray-900" />

      <nav className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <a href="/" className="flex items-center gap-3">
          <img src={Logo} alt="Poeage Logo" className="w-32" />
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative text-gray-700 hover:text-black font-medium transition"
            >
              {link.label}

              {/* underline animation (fixed) */}
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full" />
            </a>
          ))}

          <a
            href="/quotes"
            className="px-5 py-2 rounded-full border border-black font-medium hover:bg-black hover:text-white transition shadow-sm"
          >
            Contact Us
          </a>
        </div>

        {/* Mobile Button */}
        <button
          className="md:hidden text-2xl text-gray-700"
          onClick={() => setMenuOpen(true)}
        >
          <FaBars />
        </button>
      </nav>

      {/* Backdrop */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 bg-black/30 md:hidden"
        />
      )}

      {/* Mobile Drawer */}
      <div
        className={`md:hidden fixed top-0 right-0 h-full w-72 bg-white shadow-xl transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="px-6 py-4 flex justify-between items-center border-b">
          <img src={Logo} alt="logo" className="w-28" />
          <FaTimes
            onClick={() => setMenuOpen(false)}
            className="text-2xl cursor-pointer"
          />
        </div>

        <div className="flex flex-col gap-5 px-6 py-6 bg-white">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-gray-700 text-lg font-medium hover:text-black transition"
            >
              {link.label}
            </a>
          ))}

          <a
            href="/quotes"
            className="mt-6 px-4 py-3 rounded-xl font-semibold text-center text-white bg-black shadow hover:shadow-lg transition"
          >
            Contact Us
          </a>
        </div>
      </div>
    </header>
  );
}
