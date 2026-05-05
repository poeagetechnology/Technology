// ══════════════════════════════════════════════════════
// OurCompany.js
// ══════════════════════════════════════════════════════
import React from "react";
import { motion } from "framer-motion";
import Builders from "../../assests/5.png";
import Hub from "../../assests/1.png";
import Nexus from "../../assests/NEXUS.png";
import Header from "./Header";
import Footer from "./Footer";

const companies = [
  { name: "Poeage Builders", img: Builders, link: "https://poeagebuilders.in",   desc: "Construction & infrastructure built on innovation, safety, and reliability.", accent: "#f59e0b" },
  { name: "Poeage Hub",      img: Hub,      link: "https://poeagehub.in",         desc: "A digital marketplace connecting services, ideas, and opportunities.",         accent: "#00e5c4" },
  { name: "Poeage Nexus",    img: Nexus,    link: "https://poeagenexus.com",      desc: "Poeage Manpower Supply & Consultancy.",                                        accent: "#7b5fff" },
];

export default function OurCompany() {
  return (
    <>
      <Header />
      <main style={{ background: "var(--black)", minHeight: "100vh", paddingTop: "7rem" }}>

        <div style={{ padding: "4rem 4rem 2rem", maxWidth: "700px" }}>
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            style={{ display: "inline-block", fontSize: ".72rem", letterSpacing: ".14em", textTransform: "uppercase", color: "var(--accent)", border: "1px solid rgba(0,229,196,.22)", padding: ".3rem .85rem", marginBottom: "1.5rem" }}
          >Ecosystem</motion.span>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .15 }}
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 800, letterSpacing: "-.04em", lineHeight: 1, color: "var(--white)", marginBottom: "1rem" }}
          >Our <span style={{ color: "var(--accent)" }}>Companies</span></motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .3 }}
            style={{ fontSize: ".95rem", color: "var(--muted)", lineHeight: 1.8, maxWidth: "460px" }}
          >A journey of brands — aligned to one vision, growing together.</motion.p>
        </div>

        <div style={{ padding: "2rem 4rem 6rem", display: "flex", flexDirection: "column", gap: "1px", maxWidth: "1100px", borderTop: "1px solid var(--border)", marginTop: "2rem" }}>
          {companies.map((c, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .1 }}
              style={{ display: "flex", alignItems: "center", gap: "3rem", padding: "2.5rem 0", borderBottom: "1px solid var(--border)" }}
            >
              <div style={{ width: "70px", height: "70px", background: "var(--card)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <img src={c.img} alt={c.name} style={{ width: "44px", objectFit: "contain" }} />
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", fontWeight: 700, letterSpacing: "-.02em", color: "var(--white)", marginBottom: ".4rem" }}>{c.name}</h3>
                <p style={{ fontSize: ".88rem", color: "var(--muted)", lineHeight: 1.7 }}>{c.desc}</p>
              </div>
              <a href={c.link} target="_blank" rel="noopener noreferrer"
                style={{ padding: ".6rem 1.6rem", background: "transparent", border: `1px solid ${c.accent}`, color: c.accent, fontSize: ".78rem", letterSpacing: ".1em", textTransform: "uppercase", textDecoration: "none", whiteSpace: "nowrap", transition: "background .2s, color .2s" }}
                onMouseEnter={e => { e.currentTarget.style.background = c.accent; e.currentTarget.style.color = "var(--black)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = c.accent; }}
              >Visit →</a>
            </motion.div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}