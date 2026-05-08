import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../assests/Poeage_Logo_1.png";
import TigerChatbot from "./TigerChatbot";
import {
  Globe, Code, TrendingUp, Bot, Menu, X, ChevronDown,
  ArrowRight, Zap
} from "lucide-react";

const NAV_LINKS = [
  {
    label: "Services",
    dropdown: [
      { label: "Website Development", href: "/web", icon: Globe, desc: "From ₹5,999" },
      { label: "App Development", href: "/app", icon: Code, desc: "iOS & Android" },
      { label: "Digital Marketing", href: "/marketing", icon: TrendingUp, desc: "SEO & Growth" },
      { label: "AI Automation", href: "/ai", icon: Bot, desc: "Smart Workflows" },
    ],
  },
  { label: "Work", href: "/work" },
  { label: "Our Network", href: "/serve" },
  { label: "About", href: "/aboutus" },
];

export default function Header({ setShowQuoteModal }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap');

        * { font-family: 'Montserrat', sans-serif !important; }

        .hdr-blur {
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }
        .hdr-nav-link {
          position: relative;
          font-family: 'Montserrat', sans-serif;
          font-size: 0.875rem;
          font-weight: 600;
          color: #1e293b;
          text-decoration: none;
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          transition: all 0.2s;
        }
        .hdr-nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 2px;
          background: #2563eb;
          border-radius: 2px;
          transition: width 0.3s ease;
        }
        .hdr-nav-link:hover { color: #2563eb; background: #eff6ff; }
        .hdr-nav-link:hover::after,
        .hdr-nav-link.active::after { width: 70%; }
        .hdr-nav-link.active { color: #2563eb; }

        .hdr-dropdown {
          box-shadow: 0 20px 60px rgba(0,0,0,0.1), 0 4px 20px rgba(37,99,235,0.08);
          border: 1px solid #dbeafe;
        }
        .hdr-drop-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem;
          border-radius: 0.75rem;
          text-decoration: none;
          transition: background 0.2s;
        }
        .hdr-drop-item:hover { background: #eff6ff; }

        .hdr-cta {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.625rem 1.25rem;
          background: linear-gradient(135deg, #1d4ed8, #2563eb);
          color: #fff;
          border: none;
          border-radius: 9999px;
          font-family: 'Montserrat', sans-serif;
          font-size: 0.8125rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: 0 4px 14px rgba(37,99,235,0.3);
          text-decoration: none;
        }
        .hdr-cta:hover { transform: translateY(-1px); box-shadow: 0 8px 24px rgba(37,99,235,0.4); }

        @keyframes bannerGlow {
          0%,100% { background-position: 0% }
          50% { background-position: 100% }
        }
      `}</style>

      {/* Offer Banner */}
      <div style={{
        background: "linear-gradient(90deg,#1d4ed8 0%,#2563eb 40%,#0ea5e9 70%,#1d4ed8 100%)",
        backgroundSize: "200% 100%",
        animation: "bannerGlow 5s ease infinite",
        padding: "0.6rem 1rem",
        textAlign: "center",
        position: "relative",
        zIndex: 50,
      }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontSize: "0.75rem", fontWeight: 700, color: "#fff", fontFamily: "'Montserrat',sans-serif", flexWrap: "wrap", justifyContent: "center" }}>
          <Zap size={12} fill="#fff" />
          Free Discovery Call for New Projects — Only 5 Spots Left This Month!
          <a href="#contact" style={{ marginLeft: "0.5rem", background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.35)", color: "#fff", padding: "0.2rem 0.75rem", borderRadius: "9999px", fontSize: "0.7rem", fontWeight: 700, textDecoration: "none", transition: "background 0.2s" }}>
            Book Now →
          </a>
        </span>
      </div>

      {/* Main Header */}
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={scrolled ? "hdr-blur" : ""}
        style={{
          position: "sticky",
          top: 0,
          zIndex: 40,
          width: "100%",
          background: scrolled ? "rgba(255,255,255,0.96)" : "#ffffff",
          borderBottom: `1px solid ${scrolled ? "#dbeafe" : "#f1f5f9"}`,
          boxShadow: scrolled ? "0 2px 20px rgba(37,99,235,0.08)" : "none",
          transition: "all 0.3s",
        }}
      >
        <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "0 1.25rem", display: "flex", alignItems: "center", justifyContent: "space-between", height: "4rem" }}>

          {/* Logo */}
          <a href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
            <img src={Logo} alt="Poeage Logo" style={{ height: "2.5rem", width: "auto", objectFit: "contain" }} />
          </a>

          {/* Desktop Nav */}
          <nav style={{ display: "flex", alignItems: "center", gap: "0.25rem" }} className="hidden-mobile">
            {NAV_LINKS.map((nav) =>
              nav.dropdown ? (
                <div
                  key={nav.label}
                  style={{ position: "relative" }}
                  onMouseEnter={() => setActiveDropdown(nav.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button className="hdr-nav-link" style={{ display: "flex", alignItems: "center", gap: "0.375rem", background: "none", border: "none", cursor: "pointer" }}>
                    {nav.label}
                    <ChevronDown size={14} style={{ transition: "transform 0.2s", transform: activeDropdown === nav.label ? "rotate(180deg)" : "rotate(0deg)" }} />
                  </button>
                  <AnimatePresence>
                    {activeDropdown === nav.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.97 }}
                        transition={{ duration: 0.18 }}
                        className="hdr-dropdown"
                        style={{ position: "absolute", top: "100%", left: 0, marginTop: "0.5rem", width: "16rem", background: "#fff", borderRadius: "1rem", overflow: "hidden" }}
                      >
                        <div style={{ padding: "0.5rem" }}>
                          {nav.dropdown.map((item) => {
                            const Icon = item.icon;
                            return (
                              <Link key={item.href} to={item.href} className="hdr-drop-item">
                                <div style={{ width: "2.25rem", height: "2.25rem", borderRadius: "0.625rem", background: "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                  <Icon size={15} color="#2563eb" />
                                </div>
                                <div>
                                  <div style={{ fontSize: "0.8125rem", fontWeight: 700, color: "#0f172a" }}>{item.label}</div>
                                  <div style={{ fontSize: "0.7rem", color: "#94a3b8" }}>{item.desc}</div>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={nav.label}
                  to={nav.href}
                  className={`hdr-nav-link ${location.pathname === nav.href ? "active" : ""}`}
                >
                  {nav.label}
                </Link>
              )
            )}
          </nav>

          {/* Desktop CTA */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }} className="hidden-mobile">
            <a href="tel:+917358096160" style={{ fontSize: "0.8125rem", fontWeight: 700, color: "#1e293b", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.color = "#2563eb"}
              onMouseLeave={e => e.currentTarget.style.color = "#1e293b"}
            >
              +91 73580 9616
            </a>
            <button
              onClick={() => setShowQuoteModal && setShowQuoteModal(true)}
              className="hdr-cta"
            >
              Start Project <ArrowRight size={13} />
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ display: "none", width: "2.5rem", height: "2.5rem", alignItems: "center", justifyContent: "center", borderRadius: "0.625rem", background: "#f1f5f9", border: "none", cursor: "pointer", color: "#1e293b" }}
            className="mobile-toggle"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{ background: "#fff", borderTop: "1px solid #e2e8f0", overflow: "hidden" }}
            >
              <div style={{ padding: "1rem", display: "flex", flexDirection: "column", gap: "0.25rem", maxHeight: "80vh", overflowY: "auto" }}>
                {NAV_LINKS.map((nav) =>
                  nav.dropdown ? (
                    <div key={nav.label}>
                      <div style={{ padding: "0.5rem 0.75rem", fontSize: "0.7rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: "#94a3b8", marginTop: "0.75rem" }}>
                        {nav.label}
                      </div>
                      {nav.dropdown.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link key={item.href} to={item.href} style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.75rem", borderRadius: "0.75rem", textDecoration: "none", transition: "background 0.2s" }}
                            onMouseEnter={e => e.currentTarget.style.background = "#eff6ff"}
                            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                          >
                            <div style={{ width: "2rem", height: "2rem", borderRadius: "0.5rem", background: "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                              <Icon size={14} color="#2563eb" />
                            </div>
                            <div>
                              <div style={{ fontSize: "0.8125rem", fontWeight: 700, color: "#0f172a" }}>{item.label}</div>
                              <div style={{ fontSize: "0.7rem", color: "#94a3b8" }}>{item.desc}</div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  ) : (
                    <Link key={nav.label} to={nav.href} style={{ display: "flex", alignItems: "center", padding: "0.75rem", borderRadius: "0.75rem", fontSize: "0.875rem", fontWeight: 700, color: "#1e293b", textDecoration: "none", transition: "all 0.2s" }}
                      onMouseEnter={e => { e.currentTarget.style.background = "#eff6ff"; e.currentTarget.style.color = "#2563eb"; }}
                      onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#1e293b"; }}
                    >
                      {nav.label}
                    </Link>
                  )
                )}

                <div style={{ paddingTop: "1rem", marginTop: "0.5rem", borderTop: "1px solid #e2e8f0", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  <a href="tel:+917358096160" style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.75rem", borderRadius: "0.75rem", fontSize: "0.875rem", fontWeight: 700, color: "#1e293b", textDecoration: "none" }}>
                    📞 +91 73580 9616
                  </a>
                  <button
                    onClick={() => { setShowQuoteModal && setShowQuoteModal(true); setMobileOpen(false); }}
                    className="hdr-cta"
                    style={{ justifyContent: "center", borderRadius: "0.875rem", padding: "0.875rem" }}
                  >
                    Start Your Project →
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <style>{`
          @media (max-width: 768px) {
            .hidden-mobile { display: none !important; }
            .mobile-toggle { display: flex !important; }
          }
        `}</style>
      </motion.header>

    <TigerChatbot />
    </>

  );
}