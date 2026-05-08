import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FaArrowRight, FaRobot, FaGlobe, FaCode,
  FaCheck, FaTimes, FaStar, FaPhone,
  FaWhatsapp, FaBolt, FaShieldAlt, FaRocket,
  FaHeadset, FaChevronDown, FaChevronUp,
  FaTimes as FaClose, FaCalendarCheck, FaUsers, FaAward
} from "react-icons/fa";
import Header from "./Header";
import Footer from "./Footer";

import coga from "../../assests/coga.svg";
import ase from "../../assests/ase.jpeg";
import vels from "../../assests/Vel 24.png";
import herito from "../../assests/herito.jpeg";

/* ── GLOBAL FONT INJECTION ── */
const MONT_STYLE = `
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap');
  *, *::before, *::after { font-family: 'Montserrat', sans-serif !important; box-sizing: border-box; }
  body { margin: 0; background: #ffffff; color: #0f172a; }
`;

/* ── DATA ── */
const SERVICES = [
  { num: "01", title: "Website Development", desc: "Stunning, responsive websites that convert visitors into customers. Starting at ₹5,999.", icon: FaGlobe, href: "/web", features: ["Responsive Design", "SEO Optimized", "Fast Loading", "CMS Integration"] },
  { num: "02", title: "App Development", desc: "Native & cross-platform mobile apps that users love. iOS, Android & Flutter.", icon: FaCode, href: "/app", features: ["iOS & Android", "Flutter/React Native", "API Integration", "App Store Ready"] },
  { num: "03", title: "Digital Marketing", desc: "Data-driven strategies to grow your brand and drive qualified leads.", icon: FaRocket, href: "/marketing", features: ["SEO & SEM", "Social Media", "Content Strategy", "Analytics"] },
  { num: "04", title: "AI Automation", desc: "Intelligent automation solutions that streamline your business operations.", icon: FaRobot, href: "/ai", features: ["Chatbots", "Workflow Auto", "Data Analysis", "ML Models"] },
];

const COMPARISON = {
  others: ["3-6 month delivery timelines", "Slow & unclear communication", "Generic template-based designs", "Hidden costs & surprise bills", "No post-launch support", "Junior devs, senior-level prices", "You're just another invoice"],
  poeage: ["2-4 week turnaround, guaranteed", "Daily updates via WhatsApp & email", "100% custom, conversion-first design", "Transparent fixed pricing — always", "30-day free post-launch support", "Senior engineers on every project", "You're our #1 priority, not a number"],
};

const TESTIMONIALS = [
  { name: "Rajesh Kumar", role: "CEO, TechStart India", text: "Poeage delivered our e-commerce site in just 3 weeks. The quality exceeded our expectations and sales jumped 40%.", rating: 5, avatar: "R", color: "#dbeafe", textColor: "#1d4ed8" },
  { name: "Priya Sharma", role: "Founder, StyleHub", text: "Best decision ever! Got my business website for just ₹5,999. Professional, fast, and exactly what I envisioned.", rating: 5, avatar: "P", color: "#fce7f3", textColor: "#be185d" },
  { name: "Arun Nair", role: "Director, CloudScale", text: "The mobile app they built for us has 50K+ downloads. Their team is incredibly talented and responsive.", rating: 5, avatar: "A", color: "#d1fae5", textColor: "#065f46" },
];

const PROCESS_STEPS = [
  { num: "01", title: "Discovery Call", desc: "Free 15-min call to understand your vision", icon: FaPhone },
  { num: "02", title: "Strategy", desc: "We craft a detailed plan with timelines", icon: FaCalendarCheck },
  { num: "03", title: "Design", desc: "Stunning mockups for your approval", icon: FaUsers },
  { num: "04", title: "Develop", desc: "Clean code with weekly demos", icon: FaCode },
  { num: "05", title: "Launch", desc: "Go live with 30-day free support", icon: FaRocket },
];

const WHY_FEATURES = [
  { title: "Lightning Fast", desc: "2-4 week delivery on most projects", icon: FaBolt, bg: "#fef9c3", color: "#ca8a04" },
  { title: "Transparent Pricing", desc: "Fixed prices, no hidden costs ever", icon: FaShieldAlt, bg: "#d1fae5", color: "#059669" },
  { title: "Expert Team", desc: "Senior developers on every project", icon: FaAward, bg: "#dbeafe", color: "#2563eb" },
  { title: "Always Available", desc: "WhatsApp support 7 days a week", icon: FaHeadset, bg: "#ede9fe", color: "#7c3aed" },
];

const CLIENTS = [{ src: coga }, { src: herito }, { src: ase }, { src: vels }];

const FAQS = [
  { q: "How much does a website cost?", a: "Our websites start at just ₹5,999 for a professional business site. E-commerce and custom solutions are priced based on features. We provide transparent, fixed quotes with no hidden fees." },
  { q: "How long does it take to build?", a: "Most websites are delivered within 2-4 weeks. Simple landing pages can be ready in 1 week. We provide a detailed timeline during our discovery call." },
  { q: "Do you offer post-launch support?", a: "Yes! Every project includes 30 days of free post-launch support. After that, we offer affordable maintenance packages starting at ₹999/month." },
  { q: "Can I see my project progress?", a: "Absolutely! We provide daily updates via WhatsApp and weekly demo calls. You'll have a dedicated project manager throughout the process." },
  { q: "What technologies do you use?", a: "We use React, Next.js, Node.js, Flutter, and other modern technologies. We choose the best stack based on your specific requirements and budget." },
];

const fadeInUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 0.68, 0, 1] } } };
const staggerContainer = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } } };

/* ── LAYOUT HELPERS ── */
const section = (style = {}) => ({
  padding: "5rem 1.25rem",
  maxWidth: "80rem",
  margin: "0 auto",
  ...style,
});

export default function Home() {
  const navigate = useNavigate();
  const [showQuoteModal, setShowQuoteModal] = useState(false);

  return (
    <div style={{ minHeight: "100vh", background: "#fff" }}>
      <style>{MONT_STYLE}</style>
      <Header setShowQuoteModal={setShowQuoteModal} />
      <HeroSection navigate={navigate} setShowQuoteModal={setShowQuoteModal} />
      <ClientsSection />
      <ServicesSection navigate={navigate} setShowQuoteModal={setShowQuoteModal} />
      <WhySection />
      <ComparisonSection setShowQuoteModal={setShowQuoteModal} />
      <ProcessSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection setShowQuoteModal={setShowQuoteModal} />
      <Footer />
      <QuoteModal show={showQuoteModal} onClose={() => setShowQuoteModal(false)} />
    </div>
  );
}

/* ── HERO ── */
function HeroSection({ navigate, setShowQuoteModal }) {
  return (
    <section style={{ position: "relative", overflow: "hidden", background: "#fff", padding: "5rem 1.25rem 6rem" }}>
      {/* BG blobs */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "40rem", height: "40rem", borderRadius: "50%", background: "rgba(219,234,254,0.45)", filter: "blur(80px)" }} />
        <div style={{ position: "absolute", bottom: 0, right: 0, width: "25rem", height: "25rem", borderRadius: "50%", background: "rgba(224,242,254,0.35)", filter: "blur(80px)" }} />
      </div>

      <div style={{ position: "relative", maxWidth: "72rem", margin: "0 auto", textAlign: "center" }}>
        <motion.div initial="hidden" animate="visible" variants={staggerContainer}>

          <motion.div variants={fadeInUp} style={{ marginBottom: "1.5rem" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", borderRadius: "9999px", border: "1.5px solid #bfdbfe", background: "#eff6ff", padding: "0.5rem 1.25rem", fontSize: "0.8125rem", fontWeight: 700, color: "#1d4ed8" }}>
              <span style={{ width: "0.5rem", height: "0.5rem", borderRadius: "50%", background: "#2563eb" }} />
              We Build Websites, Apps & Brands
            </span>
          </motion.div>

          <motion.h1 variants={fadeInUp} style={{ fontSize: "clamp(2.25rem,7vw,5rem)", fontWeight: 900, lineHeight: 1.05, letterSpacing: "-0.03em", color: "#0f172a", marginBottom: "1.5rem" }}>
            We Build{" "}
            <span style={{ background: "linear-gradient(135deg,#1d4ed8,#0ea5e9)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Poeage</span>
            <br />Digital Solutions
          </motion.h1>

          <motion.p variants={fadeInUp} style={{ maxWidth: "40rem", margin: "0 auto 2.5rem", fontSize: "clamp(1rem,2vw,1.25rem)", lineHeight: 1.75, color: "#475569" }}>
            From concept to launch — we craft world-class websites, mobile apps, and digital marketing strategies that help ambitious businesses scale and succeed.{" "}
            <span style={{ display: "block", marginTop: "0.5rem", fontWeight: 800, color: "#2563eb" }}>Starting at just ₹X,999</span>
          </motion.p>

          <motion.div variants={fadeInUp} style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1rem", marginBottom: "3rem" }}>
            <button onClick={() => setShowQuoteModal(true)} style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.875rem 2rem", borderRadius: "9999px", background: "linear-gradient(135deg,#1d4ed8,#2563eb)", color: "#fff", border: "none", fontSize: "0.9rem", fontWeight: 800, cursor: "pointer", boxShadow: "0 6px 20px rgba(37,99,235,0.35)", transition: "all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(37,99,235,0.4)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(37,99,235,0.35)"; }}
            >
              Start Your Project <FaArrowRight />
            </button>
            <button onClick={() => navigate("/work")} style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.875rem 2rem", borderRadius: "9999px", background: "#fff", color: "#0f172a", border: "2px solid #e2e8f0", fontSize: "0.9rem", fontWeight: 700, cursor: "pointer", transition: "all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#bfdbfe"; e.currentTarget.style.color = "#1d4ed8"; e.currentTarget.style.background = "#eff6ff"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.color = "#0f172a"; e.currentTarget.style.background = "#fff"; }}
            >
              View Our Work
            </button>
          </motion.div>

          <motion.div variants={fadeInUp} style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "1.5rem" }}>
            {["100% Satisfaction", "24h Response", "4+ Years Exp."].map(t => (
              <span key={t} style={{ display: "flex", alignItems: "center", gap: "0.375rem", fontSize: "0.8125rem", fontWeight: 600, color: "#64748b" }}>
                <FaCheck style={{ color: "#22c55e", fontSize: "0.75rem" }} /> {t}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ── CLIENTS ── */
function ClientsSection() {
  return (
    <section style={{ borderTop: "1px solid #f1f5f9", borderBottom: "1px solid #f1f5f9", background: "#f8fafc", padding: "3rem 1.25rem" }}>
      <div style={{ maxWidth: "80rem", margin: "0 auto" }}>
        <p style={{ textAlign: "center", fontSize: "0.7rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.15em", color: "#94a3b8", marginBottom: "2rem" }}>
          Trusted by innovative brands
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "3rem" }}>
          {CLIENTS.map((client, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} style={{ opacity: 0.4, filter: "grayscale(1)", transition: "all 0.4s" }}
              onMouseEnter={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.filter = "grayscale(0)"; }}
              onMouseLeave={e => { e.currentTarget.style.opacity = "0.4"; e.currentTarget.style.filter = "grayscale(1)"; }}
            >
              <img src={client.src} alt="client" style={{ height: "2.5rem", width: "auto", objectFit: "contain" }} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── SERVICES ── */
function ServicesSection({ setShowQuoteModal }) {
  return (
    <section style={{ background: "#fff", padding: "5rem 1.25rem" }}>
      <div style={{ maxWidth: "80rem", margin: "0 auto" }}>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={staggerContainer} style={{ textAlign: "center", marginBottom: "4rem" }}>
          <motion.span variants={fadeInUp} style={{ display: "inline-block", fontSize: "0.7rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.15em", color: "#2563eb", marginBottom: "0.75rem" }}>
            Our Services
          </motion.span>
          <motion.h2 variants={fadeInUp} style={{ fontSize: "clamp(1.75rem,4vw,3rem)", fontWeight: 900, letterSpacing: "-0.025em", color: "#0f172a", marginBottom: "1rem" }}>
            Everything You Need to <span style={{ color: "#2563eb" }}>Grow Online</span>
          </motion.h2>
          <motion.p variants={fadeInUp} style={{ maxWidth: "40rem", margin: "0 auto", fontSize: "1rem", color: "#64748b", lineHeight: 1.75 }}>
            Professional digital solutions tailored for Indian businesses. Quality work at unbeatable prices.
          </motion.p>
        </motion.div>

        <div style={{ display: "grid", gap: "1.5rem", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))" }}>
          {SERVICES.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div key={service.num} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                style={{ background: "#fff", border: "1.5px solid #e2e8f0", borderRadius: "1.25rem", padding: "2rem", position: "relative", overflow: "hidden", transition: "all 0.3s", cursor: "default" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#bfdbfe"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(37,99,235,0.1)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "1.5rem" }}>
                  <div style={{ width: "3.5rem", height: "3.5rem", borderRadius: "1rem", background: "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", color: "#2563eb" }}>
                    <Icon />
                  </div>
                  <span style={{ fontSize: "0.8rem", fontWeight: 800, color: "#e2e8f0" }}>{service.num}</span>
                </div>
                <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#0f172a", marginBottom: "0.625rem" }}>{service.title}</h3>
                <p style={{ fontSize: "0.875rem", color: "#64748b", marginBottom: "1.5rem", lineHeight: 1.7 }}>{service.desc}</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem", marginBottom: "1.5rem" }}>
                  {service.features.map(f => (
                    <div key={f} style={{ display: "flex", alignItems: "center", gap: "0.375rem", fontSize: "0.8rem", color: "#475569", fontWeight: 500 }}>
                      <FaCheck style={{ color: "#22c55e", fontSize: "0.625rem", flexShrink: 0 }} /> {f}
                    </div>
                  ))}
                </div>
                <button onClick={() => setShowQuoteModal(true)} style={{ display: "inline-flex", alignItems: "center", gap: "0.375rem", fontSize: "0.8125rem", fontWeight: 800, color: "#2563eb", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                  Get Quote <FaArrowRight style={{ fontSize: "0.7rem" }} />
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── WHY ── */
function WhySection() {
  return (
    <section style={{ background: "#f8fafc", padding: "5rem 1.25rem" }}>
      <div style={{ maxWidth: "80rem", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <span style={{ display: "inline-block", fontSize: "0.7rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.15em", color: "#2563eb", marginBottom: "0.75rem" }}>Why Choose Us</span>
          <h2 style={{ fontSize: "clamp(1.75rem,4vw,3rem)", fontWeight: 900, letterSpacing: "-0.025em", color: "#0f172a" }}>
            Built for <span style={{ color: "#2563eb" }}>Your Success</span>
          </h2>
        </div>
        <div style={{ display: "grid", gap: "1.25rem", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))" }}>
          {WHY_FEATURES.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                style={{ background: "#fff", border: "1.5px solid #e2e8f0", borderRadius: "1.25rem", padding: "1.75rem", textAlign: "center", transition: "all 0.3s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#bfdbfe"; e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(37,99,235,0.08)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div style={{ width: "3.5rem", height: "3.5rem", borderRadius: "1rem", background: f.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", color: f.color, margin: "0 auto 1rem" }}>
                  <Icon />
                </div>
                <h3 style={{ fontSize: "1rem", fontWeight: 800, color: "#0f172a", marginBottom: "0.375rem" }}>{f.title}</h3>
                <p style={{ fontSize: "0.8125rem", color: "#64748b" }}>{f.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── COMPARISON ── */
function ComparisonSection({ setShowQuoteModal }) {
  return (
    <section style={{ background: "#fff", padding: "5rem 1.25rem" }}>
      <div style={{ maxWidth: "64rem", margin: "0 auto" }}>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={staggerContainer} style={{ textAlign: "center", marginBottom: "4rem" }}>
          <motion.span variants={fadeInUp} style={{ display: "inline-block", fontSize: "0.7rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.15em", color: "#2563eb", marginBottom: "0.75rem" }}>Why Poeage?</motion.span>
          <motion.h2 variants={fadeInUp} style={{ fontSize: "clamp(1.75rem,4vw,3rem)", fontWeight: 900, letterSpacing: "-0.025em", color: "#0f172a", marginBottom: "1rem" }}>
            Not All Agencies Are{" "}
            <span style={{ background: "linear-gradient(135deg,#1d4ed8,#0ea5e9)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Created Equal</span>
          </motion.h2>
          <motion.p variants={fadeInUp} style={{ maxWidth: "36rem", margin: "0 auto", fontSize: "1rem", color: "#64748b" }}>
            Most agencies overpromise and underdeliver. Here's how we're genuinely different.
          </motion.p>
        </motion.div>

        <div style={{ display: "grid", gap: "1.5rem", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))" }}>
          {/* Others */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            style={{ background: "#fff", border: "1.5px solid #fee2e2", borderRadius: "1.25rem", padding: "2rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
              <div style={{ width: "2.5rem", height: "2.5rem", borderRadius: "9999px", background: "#fee2e2", display: "flex", alignItems: "center", justifyContent: "center", color: "#ef4444" }}><FaTimes /></div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#94a3b8" }}>Other Agencies</h3>
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.875rem" }}>
              {COMPARISON.others.map(item => (
                <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: "0.625rem", fontSize: "0.875rem", color: "#94a3b8", fontWeight: 500 }}>
                  <FaTimes style={{ color: "#fca5a5", fontSize: "0.75rem", marginTop: "0.2rem", flexShrink: 0 }} /> {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Poeage */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            style={{ position: "relative", background: "#fff", border: "2px solid #bfdbfe", borderRadius: "1.25rem", padding: "2rem", boxShadow: "0 8px 32px rgba(37,99,235,0.1)" }}>
            <div style={{ position: "absolute", top: "-0.875rem", right: "1.5rem", background: "#22c55e", color: "#fff", borderRadius: "9999px", padding: "0.25rem 0.75rem", fontSize: "0.7rem", fontWeight: 800 }}>
              BEST CHOICE
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
              <div style={{ width: "2.5rem", height: "2.5rem", borderRadius: "9999px", background: "#dbeafe", display: "flex", alignItems: "center", justifyContent: "center", color: "#2563eb" }}><FaCheck /></div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0f172a" }}>Poeage Technology</h3>
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.875rem" }}>
              {COMPARISON.poeage.map(item => (
                <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: "0.625rem", fontSize: "0.875rem", color: "#1e293b", fontWeight: 600 }}>
                  <FaCheck style={{ color: "#22c55e", fontSize: "0.75rem", marginTop: "0.2rem", flexShrink: 0 }} /> {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginTop: "2.5rem", textAlign: "center" }}>
          <button onClick={() => setShowQuoteModal(true)} style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.875rem 2rem", borderRadius: "9999px", background: "linear-gradient(135deg,#1d4ed8,#2563eb)", color: "#fff", border: "none", fontSize: "0.9rem", fontWeight: 800, cursor: "pointer", boxShadow: "0 6px 20px rgba(37,99,235,0.3)", transition: "all 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
            onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
          >
            Start Working with the Best <FaArrowRight />
          </button>
        </motion.div>
      </div>
    </section>
  );
}

/* ── PROCESS ── */
function ProcessSection() {
  return (
    <section style={{ background: "#f8fafc", padding: "5rem 1.25rem" }}>
      <div style={{ maxWidth: "80rem", margin: "0 auto" }}>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={staggerContainer} style={{ textAlign: "center", marginBottom: "4rem" }}>
          <motion.span variants={fadeInUp} style={{ display: "inline-block", fontSize: "0.7rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.15em", color: "#2563eb", marginBottom: "0.75rem" }}>How It Works</motion.span>
          <motion.h2 variants={fadeInUp} style={{ fontSize: "clamp(1.75rem,4vw,3rem)", fontWeight: 900, letterSpacing: "-0.025em", color: "#0f172a" }}>
            Simple Process, <span style={{ color: "#2563eb" }}>Stunning Results</span>
          </motion.h2>
        </motion.div>

        <div style={{ display: "grid", gap: "1.5rem", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))" }}>
          {PROCESS_STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div key={step.num} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                style={{ textAlign: "center" }}>
                <div style={{ position: "relative", width: "5rem", height: "5rem", borderRadius: "1.25rem", background: "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.75rem", color: "#2563eb", margin: "0 auto 1.25rem", border: "1.5px solid #bfdbfe", transition: "all 0.3s" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "#1d4ed8"; e.currentTarget.style.color = "#fff"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "#eff6ff"; e.currentTarget.style.color = "#2563eb"; }}
                >
                  <Icon />
                </div>
                <span style={{ display: "block", fontSize: "0.7rem", fontWeight: 800, color: "#2563eb", marginBottom: "0.375rem" }}>Step {step.num}</span>
                <h3 style={{ fontSize: "1rem", fontWeight: 800, color: "#0f172a", marginBottom: "0.375rem" }}>{step.title}</h3>
                <p style={{ fontSize: "0.8125rem", color: "#64748b" }}>{step.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── TESTIMONIALS ── */
function TestimonialsSection() {
  return (
    <section style={{ background: "#fff", padding: "5rem 1.25rem" }}>
      <div style={{ maxWidth: "80rem", margin: "0 auto" }}>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} style={{ textAlign: "center", marginBottom: "4rem" }}>
          <motion.span variants={fadeInUp} style={{ display: "inline-block", fontSize: "0.7rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.15em", color: "#2563eb", marginBottom: "0.75rem" }}>Testimonials</motion.span>
          <motion.h2 variants={fadeInUp} style={{ fontSize: "clamp(1.75rem,4vw,3rem)", fontWeight: 900, letterSpacing: "-0.025em", color: "#0f172a" }}>
            Loved by <span style={{ color: "#2563eb" }}>Clients</span> Across India
          </motion.h2>
        </motion.div>

        <div style={{ display: "grid", gap: "1.5rem", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))" }}>
          {TESTIMONIALS.map((t, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
              style={{ background: "#fff", border: "1.5px solid #e2e8f0", borderRadius: "1.25rem", padding: "2rem", transition: "all 0.3s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#bfdbfe"; e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 16px 40px rgba(37,99,235,0.08)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
            >
              <div style={{ display: "flex", gap: "0.25rem", marginBottom: "1rem" }}>
                {[...Array(t.rating)].map((_, j) => <FaStar key={j} style={{ color: "#facc15", fontSize: "0.875rem" }} />)}
              </div>
              <p style={{ fontSize: "0.9rem", color: "#475569", marginBottom: "1.5rem", lineHeight: 1.75, fontWeight: 500 }}>"{t.text}"</p>
              <div style={{ display: "flex", alignItems: "center", gap: "0.875rem" }}>
                <div style={{ width: "3rem", height: "3rem", borderRadius: "9999px", background: t.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem", fontWeight: 800, color: t.textColor, flexShrink: 0 }}>
                  {t.avatar}
                </div>
                <div>
                  <div style={{ fontWeight: 800, color: "#0f172a", fontSize: "0.9rem" }}>{t.name}</div>
                  <div style={{ fontSize: "0.75rem", color: "#94a3b8", fontWeight: 500 }}>{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── FAQ ── */
function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section style={{ background: "#f8fafc", padding: "5rem 1.25rem" }}>
      <div style={{ maxWidth: "48rem", margin: "0 auto" }}>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} style={{ textAlign: "center", marginBottom: "4rem" }}>
          <motion.span variants={fadeInUp} style={{ display: "inline-block", fontSize: "0.7rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.15em", color: "#2563eb", marginBottom: "0.75rem" }}>FAQ</motion.span>
          <motion.h2 variants={fadeInUp} style={{ fontSize: "clamp(1.75rem,4vw,2.75rem)", fontWeight: 900, letterSpacing: "-0.025em", color: "#0f172a" }}>
            Frequently Asked <span style={{ color: "#2563eb" }}>Questions</span>
          </motion.h2>
        </motion.div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
          {FAQS.map((faq, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              style={{ background: "#fff", border: "1.5px solid #e2e8f0", borderRadius: "1rem", overflow: "hidden" }}>
              <button onClick={() => setOpenIndex(openIndex === i ? null : i)}
                style={{ display: "flex", width: "100%", alignItems: "center", justifyContent: "space-between", padding: "1.25rem 1.5rem", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
                <span style={{ fontWeight: 800, color: "#0f172a", fontSize: "0.9375rem" }}>{faq.q}</span>
                {openIndex === i ? <FaChevronUp style={{ color: "#2563eb", flexShrink: 0 }} /> : <FaChevronDown style={{ color: "#94a3b8", flexShrink: 0 }} />}
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} style={{ overflow: "hidden" }}>
                    <p style={{ padding: "0 1.5rem 1.25rem", fontSize: "0.875rem", color: "#64748b", lineHeight: 1.8, fontWeight: 500 }}>{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── CTA ── */
function CTASection({ setShowQuoteModal }) {
  return (
    <section style={{ position: "relative", overflow: "hidden", background: "linear-gradient(135deg,#1d4ed8 0%,#1e40af 50%,#1e3a8a 100%)", padding: "5rem 1.25rem" }}>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div style={{ position: "absolute", top: 0, right: 0, width: "25rem", height: "25rem", borderRadius: "50%", background: "rgba(255,255,255,0.04)", filter: "blur(40px)" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, width: "20rem", height: "20rem", borderRadius: "50%", background: "rgba(14,165,233,0.1)", filter: "blur(40px)" }} />
      </div>

      <div style={{ position: "relative", maxWidth: "56rem", margin: "0 auto", textAlign: "center" }}>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
          <motion.h2 variants={fadeInUp} style={{ fontSize: "clamp(2rem,5vw,3.5rem)", fontWeight: 900, letterSpacing: "-0.03em", color: "#fff", marginBottom: "1.5rem" }}>
            Ready to Build Something <span style={{ color: "#93c5fd" }}>Amazing?</span>
          </motion.h2>
          <motion.p variants={fadeInUp} style={{ fontSize: "1.1rem", color: "#bfdbfe", marginBottom: "2.5rem", lineHeight: 1.75 }}>
            Get your professional website starting at just <strong style={{ color: "#fff" }}>₹X,999</strong>. Free consultation — no obligations.
          </motion.p>
          <motion.div variants={fadeInUp} style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1rem" }}>
            <button onClick={() => setShowQuoteModal(true)}
              style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.875rem 2rem", borderRadius: "9999px", background: "#fff", color: "#1d4ed8", border: "none", fontSize: "0.9rem", fontWeight: 800, cursor: "pointer", boxShadow: "0 6px 24px rgba(0,0,0,0.2)", transition: "all 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
              onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
            >
              Get Free Consultation <FaArrowRight />
            </button>
            <a href="https://wa.me/917358096160" target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.875rem 2rem", borderRadius: "9999px", background: "rgba(255,255,255,0.1)", color: "#fff", border: "2px solid rgba(255,255,255,0.25)", fontSize: "0.9rem", fontWeight: 700, textDecoration: "none", backdropFilter: "blur(8px)", transition: "all 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.2)"}
              onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
            >
              <FaWhatsapp style={{ fontSize: "1.1rem" }} /> Chat on WhatsApp
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ── QUOTE MODAL ── */
function QuoteModal({ show, onClose }) {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  if (!show) return null;

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(15,23,42,0.65)", padding: "1rem", backdropFilter: "blur(4px)" }}
        onClick={onClose}
      >
        <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
          style={{ position: "relative", width: "100%", maxWidth: "32rem", background: "#fff", borderRadius: "1.5rem", padding: "2rem", boxShadow: "0 32px 80px rgba(0,0,0,0.2)" }}
          onClick={e => e.stopPropagation()}
        >
          <button onClick={onClose} style={{ position: "absolute", top: "1rem", right: "1rem", width: "2rem", height: "2rem", borderRadius: "9999px", background: "#f1f5f9", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#64748b" }}>
            <FaClose style={{ fontSize: "0.8rem" }} />
          </button>

          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.375rem", background: "#fee2e2", borderRadius: "9999px", padding: "0.25rem 0.75rem", fontSize: "0.7rem", fontWeight: 700, color: "#dc2626", marginBottom: "1rem" }}>
            <span style={{ width: "0.375rem", height: "0.375rem", borderRadius: "50%", background: "#ef4444", animation: "pulse 2s infinite" }} />
            Only 5 consultation spots left this month
          </div>

          <h2 style={{ fontSize: "1.375rem", fontWeight: 900, color: "#0f172a", marginBottom: "0.5rem" }}>
            Get Your <span style={{ color: "#2563eb" }}>Free</span> Project Consultation
          </h2>
          <p style={{ fontSize: "0.8125rem", color: "#64748b", marginBottom: "1.5rem", lineHeight: 1.7 }}>
            Tell us what you're building. We'll respond within <strong style={{ color: "#0f172a" }}>24 hours</strong> — zero obligations.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", background: "#f8fafc", borderRadius: "0.75rem", padding: "0.75rem", marginBottom: "1.5rem" }}>
            {["100% Satisfaction", "24h Response", "4+ Years Exp."].map(b => (
              <span key={b} style={{ display: "flex", alignItems: "center", gap: "0.25rem", fontSize: "0.75rem", fontWeight: 700, color: "#475569" }}>
                <FaCheck style={{ color: "#22c55e" }} /> {b}
              </span>
            ))}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.875rem" }}>
              {["name", "email"].map(f => (
                <input key={f} type={f === "email" ? "email" : "text"} placeholder={f === "name" ? "Your Name *" : "Email Address *"}
                  value={formData[f]} onChange={e => setFormData({ ...formData, [f]: e.target.value })}
                  style={{ padding: "0.75rem 1rem", borderRadius: "0.75rem", border: "1.5px solid #e2e8f0", fontSize: "0.875rem", fontWeight: 500, outline: "none", transition: "border-color 0.2s", fontFamily: "'Montserrat',sans-serif" }}
                  onFocus={e => e.target.style.borderColor = "#3b82f6"}
                  onBlur={e => e.target.style.borderColor = "#e2e8f0"}
                />
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.875rem" }}>
              <input type="tel" placeholder="Phone (optional)" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })}
                style={{ padding: "0.75rem 1rem", borderRadius: "0.75rem", border: "1.5px solid #e2e8f0", fontSize: "0.875rem", fontWeight: 500, outline: "none", fontFamily: "'Montserrat',sans-serif" }} />
              <select value={formData.service} onChange={e => setFormData({ ...formData, service: e.target.value })}
                style={{ padding: "0.75rem 1rem", borderRadius: "0.75rem", border: "1.5px solid #e2e8f0", fontSize: "0.875rem", fontWeight: 500, outline: "none", fontFamily: "'Montserrat',sans-serif", background: "#fff" }}>
                <option value="">Service needed...</option>
                <option value="website">Website Development</option>
                <option value="app">App Development</option>
                <option value="marketing">Digital Marketing</option>
                <option value="ai">AI Automation</option>
                <option value="other">Other</option>
              </select>
            </div>
            <textarea placeholder="Briefly describe your project (optional)" rows={3} value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })}
              style={{ padding: "0.75rem 1rem", borderRadius: "0.75rem", border: "1.5px solid #e2e8f0", fontSize: "0.875rem", fontWeight: 500, outline: "none", resize: "vertical", fontFamily: "'Montserrat',sans-serif" }} />
            <button type="button" onClick={() => { alert("Thank you! We'll contact you within 24 hours."); onClose(); }}
              style={{ padding: "0.9rem", borderRadius: "0.875rem", background: "linear-gradient(135deg,#1d4ed8,#2563eb)", color: "#fff", border: "none", fontSize: "0.875rem", fontWeight: 800, cursor: "pointer", boxShadow: "0 6px 20px rgba(37,99,235,0.3)", transition: "all 0.2s", fontFamily: "'Montserrat',sans-serif" }}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-1px)"}
              onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
            >
              Get My Free Consultation →
            </button>
          </div>

          <p style={{ marginTop: "1rem", textAlign: "center", fontSize: "0.7rem", color: "#94a3b8" }}>
            We respect your privacy. No spam, ever.
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}