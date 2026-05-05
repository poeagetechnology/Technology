import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "./Header";
import Footer from "./Footer";

const faqs = [
  { q: "What services does Poeage Technology provide?",     a: "We specialise in software development, AI solutions, data analytics, cloud architecture, web design, and scalable digital products." },
  { q: "How can I apply for an internship at Poeage?",      a: "Apply directly through our Careers page by filling the internship form and uploading your resume." },
  { q: "Does Poeage offer AI-driven solutions?",            a: "Yes — machine learning models, NLP solutions, predictive analytics, and AI-powered automation." },
  { q: "Where is Poeage Technology located?",               a: "Headquarters in Tamil Nadu, India, with clients and projects served globally." },
  { q: "How do I hire Poeage developers?",                  a: "Use the 'Hire Developers' form or reach out via Contact page to book a consultation call." },
  { q: "Does Poeage provide end-to-end product development?", a: "Yes — product discovery, UI/UX design, development, testing, deployment, and ongoing support." },
  { q: "Can Poeage handle enterprise-scale projects?",      a: "Absolutely. We build scalable, secure, high-performance applications for enterprise-level clients." },
  { q: "What industries does Poeage work with?",            a: "Healthcare, education, e-commerce, finance, manufacturing, and real estate." },
  { q: "What technologies does Poeage use?",                a: "MERN stack, Python, TensorFlow, AWS, Azure, Docker, and Kubernetes." },
  { q: "How does Poeage ensure data security?",             a: "Encryption, secure APIs, GDPR compliance, and cloud-native security solutions." },
  { q: "Does Poeage provide post-launch support?",          a: "Yes — maintenance, updates, and monitoring to keep your product reliable and secure." },
  { q: "What is the typical project timeline?",             a: "Depends on scope. We follow agile methodology with clear milestones and weekly updates." },
  { q: "Does Poeage help with cloud migration?",            a: "Yes — seamless migration to AWS, Azure, or GCP with minimal downtime." },
  { q: "Can Poeage integrate AI into existing systems?",    a: "Definitely — embedding AI/ML into existing workflows, CRMs, ERPs, and enterprise systems." },
  { q: "How does Poeage manage client communication?",      a: "Dedicated account managers, weekly demos, and transparent progress reports." },
];

export default function Faq() {
  const [open, setOpen] = useState(null);

  return (
    <>
      <Header />

      <main style={{ background: "var(--black)", minHeight: "100vh", paddingTop: "7rem" }}>

        {/* ── HERO ── */}
        <div style={{ padding: "4rem 4rem 3rem", maxWidth: "900px" }}>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              display:       "inline-block",
              fontSize:      ".72rem",
              letterSpacing: ".14em",
              textTransform: "uppercase",
              color:         "var(--accent)",
              border:        "1px solid rgba(0,229,196,.22)",
              padding:       ".3rem .85rem",
              marginBottom:  "1.5rem",
            }}
          >FAQ</motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: .15 }}
            style={{
              fontFamily:    "var(--font-display)",
              fontSize:      "clamp(2.5rem, 5vw, 4.5rem)",
              fontWeight:    800,
              letterSpacing: "-.04em",
              lineHeight:    1,
              color:         "var(--white)",
              marginBottom:  "1rem",
            }}
          >Frequently Asked<br /><span style={{ color: "var(--accent)" }}>Questions</span></motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: .3 }}
            style={{ fontSize: ".95rem", color: "var(--muted)", maxWidth: "480px", lineHeight: 1.8 }}
          >
            Everything you need to know about working with Poeage Technology.
          </motion.p>
        </div>

        {/* ── FAQ GRID ── */}
        <div style={{
          padding:             "2rem 4rem 6rem",
          display:             "grid",
          gridTemplateColumns: "2fr 1fr",
          gap:                 "4rem",
          maxWidth:            "1200px",
          alignItems:          "start",
        }}>

          {/* Left: accordion */}
          <div style={{ borderTop: "1px solid var(--border)" }}>
            {faqs.map((faq, i) => (
              <FaqItem
                key={i}
                faq={faq}
                isOpen={open === i}
                onToggle={() => setOpen(open === i ? null : i)}
                index={i}
              />
            ))}
          </div>

          {/* Right: contact box */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            style={{
              background: "var(--panel)",
              border:     "1px solid var(--border)",
              padding:    "2.5rem",
              position:   "sticky",
              top:        "6rem",
            }}
          >
            <div style={{
              width:          "52px", height: "52px",
              background:     "var(--accent-dim)",
              border:         "1px solid rgba(0,229,196,.2)",
              display:        "flex",
              alignItems:     "center",
              justifyContent: "center",
              marginBottom:   "1.5rem",
              fontSize:       "1.4rem",
            }}>❓</div>

            <h3 style={{
              fontFamily:    "var(--font-display)",
              fontSize:      "1.2rem",
              fontWeight:    700,
              color:         "var(--white)",
              marginBottom:  ".6rem",
            }}>Still have questions?</h3>

            <p style={{
              fontSize:     ".85rem",
              color:        "var(--muted)",
              lineHeight:   1.8,
              marginBottom: "1.8rem",
            }}>
              We value your feedback. Ask anything — we'll get back to you.
            </p>

            <input
              type="text"
              placeholder="Your question..."
              style={{
                width:        "100%",
                background:   "var(--card)",
                border:       "1px solid var(--border)",
                padding:      ".75rem 1rem",
                color:        "var(--white)",
                fontFamily:   "var(--font-body)",
                fontSize:     ".85rem",
                outline:      "none",
                marginBottom: "1rem",
              }}
              onFocus={e => e.target.style.borderColor = "var(--accent)"}
              onBlur={e  => e.target.style.borderColor = "var(--border)"}
            />
            <button
              style={{
                width:         "100%",
                padding:       ".75rem",
                background:    "var(--accent)",
                color:         "var(--black)",
                border:        "none",
                fontFamily:    "var(--font-body)",
                fontSize:      ".8rem",
                fontWeight:    500,
                letterSpacing: ".1em",
                textTransform: "uppercase",
                cursor:        "pointer",
                transition:    "opacity .2s",
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = ".8"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}
            >Submit Question</button>
          </motion.div>
        </div>
      </main>

      <Footer />
    </>
  );
}

function FaqItem({ faq, isOpen, onToggle, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * .03 }}
      style={{ borderBottom: "1px solid var(--border)" }}
    >
      <button
        onClick={onToggle}
        style={{
          width:          "100%",
          display:        "flex",
          justifyContent: "space-between",
          alignItems:     "center",
          padding:        "1.4rem 0",
          background:     "none",
          border:         "none",
          cursor:         "pointer",
          textAlign:      "left",
          gap:            "1rem",
        }}
      >
        <span style={{
          fontFamily:    "var(--font-display)",
          fontSize:      "1rem",
          fontWeight:    600,
          color:         isOpen ? "var(--accent)" : "var(--white)",
          lineHeight:    1.4,
          transition:    "color .2s",
        }}>{faq.q}</span>

        <span style={{
          flexShrink:  0,
          width:       "22px",
          height:      "22px",
          border:      `1px solid ${isOpen ? "var(--accent)" : "var(--border)"}`,
          display:     "flex",
          alignItems:  "center",
          justifyContent: "center",
          color:       isOpen ? "var(--accent)" : "var(--muted)",
          fontSize:    ".8rem",
          transition:  "all .2s",
          transform:   isOpen ? "rotate(45deg)" : "rotate(0deg)",
        }}>+</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: .35 }}
            style={{ overflow: "hidden" }}
          >
            <p style={{
              fontSize:     ".9rem",
              color:        "var(--muted)",
              lineHeight:   1.9,
              paddingBottom:"1.4rem",
              paddingRight: "2rem",
            }}>{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}