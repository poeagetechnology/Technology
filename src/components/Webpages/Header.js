import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../assests/Poeage_Logo_1.png";
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
        .header-blur {
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }
        .nav-underline {
          position: relative;
        }
        .nav-underline::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #1D4ED8, #0EA5E9);
          transition: width 0.3s ease;
          border-radius: 2px;
        }
        .nav-underline:hover::after,
        .nav-underline.active::after {
          width: 100%;
        }
        .dropdown-card {
          box-shadow: 0 20px 60px rgba(0,0,0,0.12), 0 4px 20px rgba(0,0,0,0.06);
        }
      `}</style>

      {/* Offer Banner */}
      <div
        className="relative z-50 text-center py-2.5 px-4 text-xs font-semibold tracking-wide text-white"
        style={{ background: "linear-gradient(90deg, #1D4ED8 0%, #0EA5E9 50%, #1D4ED8 100%)", backgroundSize: "200% 100%", animation: "bannerShift 4s ease infinite" }}
      >
        <style>{`@keyframes bannerShift { 0%,100%{background-position:0%} 50%{background-position:100%} }`}</style>
        <span className="inline-flex items-center gap-2">
          <Zap size={12} className="fill-white" />
          Free Discovery Call for New Projects — Only 5 Spots Left This Month!
          <a href="#contact" className="ml-2 bg-white/20 border border-white/30 text-white px-3 py-0.5 rounded-full text-xs font-bold hover:bg-white/30 transition-colors">
            Book Now →
          </a>
        </span>
      </div>

      {/* Main Nav */}
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`sticky top-0 z-40 w-full transition-all duration-400 ${
          scrolled
            ? "header-blur bg-white/95 border-b border-slate-200/80 shadow-sm"
            : "bg-white border-b border-slate-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">

          {/* Logo */}
          <a href="/" className="flex items-center  gap-2">
            <img src={Logo} alt="Poeage Logo" className="w-44 rounded-lg" />
          </a>
           
          

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((nav) =>
              nav.dropdown ? (
                <div
                  key={nav.label}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(nav.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button className="nav-underline flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors rounded-lg hover:bg-slate-50">
                    {nav.label}
                    <ChevronDown
                      size={14}
                      className="transition-transform duration-200"
                      style={{ transform: activeDropdown === nav.label ? "rotate(180deg)" : "rotate(0deg)" }}
                    />
                  </button>
                  <AnimatePresence>
                    {activeDropdown === nav.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.97 }}
                        transition={{ duration: 0.18 }}
                        className="dropdown-card absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl border border-slate-200/80 overflow-hidden"
                      >
                        <div className="p-2">
                          {nav.dropdown.map((item) => {
                            const Icon = item.icon;
                            return (
                              <Link
                                key={item.href}
                                to={item.href}
                                className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-slate-50 transition-colors group"
                              >
                                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 bg-blue-50 group-hover:bg-blue-100 transition-colors">
                                  <Icon size={16} className="text-blue-600" />
                                </div>
                                <div>
                                  <div className="text-sm font-semibold text-slate-800">{item.label}</div>
                                  <div className="text-xs text-slate-400">{item.desc}</div>
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
                  className={`nav-underline px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors rounded-lg hover:bg-slate-50 ${
                    location.pathname === nav.href ? "active text-slate-900" : ""
                  }`}
                >
                  {nav.label}
                </Link>
              )
            )}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="tel:+91735809616"
              className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors px-3 py-2"
            >
              +91 73580 9616
            </a>
            <button
              onClick={() => setShowQuoteModal && setShowQuoteModal(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
              style={{ background: "linear-gradient(135deg, #1D4ED8, #0EA5E9)", boxShadow: "0 4px 14px rgba(29,78,216,0.25)" }}
            >
              Start Project
              <ArrowRight size={14} />
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
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
              className="md:hidden overflow-hidden bg-white border-t border-slate-100"
            >
              <div className="px-4 py-4 space-y-1 max-h-[80vh] overflow-y-auto">
                {NAV_LINKS.map((nav) =>
                  nav.dropdown ? (
                    <div key={nav.label}>
                      <div className="px-3 py-2 text-xs font-bold uppercase tracking-widest text-slate-400 mt-3">
                        {nav.label}
                      </div>
                      {nav.dropdown.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.href}
                            to={item.href}
                            className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-slate-50 transition-colors"
                          >
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-blue-50">
                              <Icon size={15} className="text-blue-600" />
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-slate-800">{item.label}</div>
                              <div className="text-xs text-slate-400">{item.desc}</div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  ) : (
                    <Link
                      key={nav.label}
                      to={nav.href}
                      className="flex items-center px-3 py-3 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors"
                    >
                      {nav.label}
                    </Link>
                  )
                )}

                <div className="pt-4 space-y-3 border-t border-slate-100 mt-4">
                  <a
                    href="tel:+91735809616"
                    className="flex items-center gap-2 px-3 py-3 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50"
                  >
                    📞 +91 73580 9616
                  </a>
                  <button
                    onClick={() => { setShowQuoteModal && setShowQuoteModal(true); setMobileOpen(false); }}
                    className="w-full py-3.5 rounded-2xl text-sm font-bold text-white transition-all"
                    style={{ background: "linear-gradient(135deg, #1D4ED8, #0EA5E9)" }}
                  >
                    Start Your Project →
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}