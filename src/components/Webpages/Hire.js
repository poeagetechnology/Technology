import React from "react";
import { motion } from "framer-motion";
import Header from "./Header";
import Footer from "./Footer";

const JOBS = [
  {
    role:          "Software Developer",
    type:          "Full-Time",
    qualification: "B.E/B.Tech in CSE/IT or equivalent · 1+ years experience",
    description:   "Build scalable applications, write clean code, and collaborate with cross-functional teams on cutting-edge products.",
    email:         "hr@poeage.com",
  },
  {
    role:          "AI Developer",
    type:          "Full-Time",
    qualification: "Experience in Machine Learning, Deep Learning, and Python frameworks",
    description:   "Design and deploy AI-driven solutions that solve real-world business problems at scale.",
    email:         "hr@poeage.com",
  },
  {
    role:          "Data Analyst",
    type:          "Full-Time",
    qualification: "Bachelor's/Master's in Statistics, Data Science, or related field",
    description:   "Analyse business data, generate actionable insights, and support data-driven decision-making.",
    email:         "poeagetechnology@gmail.com",
  },
];

export default function Hire() {
  return (
    <>
      <Header />

      <main style={{ background: "var(--black)", minHeight: "100vh", paddingTop: "7rem" }}>

        {/* HERO */}
        <div style={{ padding: "4rem 4rem 3rem", maxWidth: "800px" }}>
          <motion.span
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            style={{
              display: "inline-block", fontSize: ".72rem", letterSpacing: ".14em",
              textTransform: "uppercase", color: "var(--accent)",
              border: "1px solid rgba(0,229,196,.22)", padding: ".3rem .85rem", marginBottom: "1.5rem",
            }}
          >Careers</motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .15 }}
            style={{
              fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
              fontWeight: 800, letterSpacing: "-.04em", lineHeight: 1, color: "var(--white)", marginBottom: "1rem",
            }}
          >
            Join the<br /><span style={{ color: "var(--accent)" }}>Poeage Team</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .3 }}
            style={{ fontSize: ".95rem", color: "var(--muted)", lineHeight: 1.8, maxWidth: "460px" }}
          >
            We're building intelligent products. We need passionate people who love to create.
          </motion.p>
        </div>

        {/* JOBS */}
        <div style={{ padding: "2rem 4rem", maxWidth: "1100px" }}>
          <div style={{ borderTop: "1px solid var(--border)" }}>
            {JOBS.map((job, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * .1 }}
                style={{
                  padding:       "2.5rem 0",
                  borderBottom:  "1px solid var(--border)",
                  display:       "grid",
                  gridTemplateColumns: "1fr auto",
                  gap:           "2rem",
                  alignItems:    "start",
                }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: ".8rem" }}>
                    <h3 style={{
                      fontFamily: "var(--font-display)", fontSize: "1.5rem",
                      fontWeight: 700, letterSpacing: "-.02em", color: "var(--white)",
                    }}>{job.role}</h3>
                    <span style={{
                      fontSize: ".65rem", letterSpacing: ".12em", textTransform: "uppercase",
                      color: "var(--accent)", border: "1px solid rgba(0,229,196,.25)",
                      padding: ".2rem .6rem",
                    }}>{job.type}</span>
                  </div>
                  <p style={{ fontSize: ".8rem", color: "var(--dim)", marginBottom: ".6rem" }}>{job.qualification}</p>
                  <p style={{ fontSize: ".9rem", color: "var(--muted)", lineHeight: 1.8, maxWidth: "600px" }}>{job.description}</p>
                </div>

                <a
                  href={`mailto:${job.email}`}
                  style={{
                    padding: ".7rem 1.8rem", background: "transparent",
                    border: "1px solid var(--border-hi)", color: "var(--white)",
                    fontFamily: "var(--font-body)", fontSize: ".78rem",
                    letterSpacing: ".1em", textTransform: "uppercase",
                    textDecoration: "none", whiteSpace: "nowrap",
                    transition: "border-color .2s, background .2s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.color = "var(--accent)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border-hi)"; e.currentTarget.style.color = "var(--white)"; }}
                >Apply Now →</a>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ padding: "3rem 4rem 6rem" }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              background: "var(--panel)", border: "1px solid var(--border)",
              padding: "3.5rem", maxWidth: "700px", textAlign: "center", margin: "0 auto",
            }}
          >
            <h2 style={{
              fontFamily: "var(--font-display)", fontSize: "1.8rem", fontWeight: 800,
              letterSpacing: "-.03em", color: "var(--white)", marginBottom: ".8rem",
            }}>Hire the best developers &amp; designers</h2>
            <p style={{ fontSize: ".9rem", color: "var(--muted)", marginBottom: "2rem" }}>
              Looking for top talent? Reach out directly.
            </p>
            <a
              href="mailto:hr@poeage.com"
              style={{
                display: "inline-flex", alignItems: "center", gap: ".5rem",
                padding: ".85rem 2.2rem", background: "var(--accent)", color: "var(--black)",
                fontFamily: "var(--font-body)", fontSize: ".82rem", fontWeight: 500,
                letterSpacing: ".1em", textTransform: "uppercase", textDecoration: "none",
              }}
            >Hire Top Developers →</a>
          </motion.div>
        </div>
      </main>

      <Footer />
    </>
  );
}