import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div style={{
      minHeight:      "100vh",
      background:     "var(--black)",
      display:        "flex",
      flexDirection:  "column",
      alignItems:     "center",
      justifyContent: "center",
      textAlign:      "center",
      padding:        "2rem",
      position:       "relative",
      overflow:       "hidden",
    }}>
      {/* big 404 bg */}
      <span aria-hidden style={{
        position:      "absolute",
        fontFamily:    "var(--font-display)",
        fontSize:      "clamp(12rem, 35vw, 28rem)",
        fontWeight:    800,
        color:         "rgba(255,255,255,.015)",
        letterSpacing: "-.06em",
        lineHeight:    1,
        userSelect:    "none",
        pointerEvents: "none",
      }}>404</span>

      {/* glow */}
      <div style={{
        position: "absolute", top: "30%", left: "50%", transform: "translate(-50%, -50%)",
        width: "600px", height: "600px",
        background: "radial-gradient(circle, rgba(0,229,196,.04), transparent 65%)",
        pointerEvents: "none",
      }} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: .8 }}
        style={{ position: "relative", zIndex: 2 }}
      >
        <span style={{
          display: "inline-block", fontSize: ".72rem", letterSpacing: ".14em",
          textTransform: "uppercase", color: "var(--accent)",
          border: "1px solid rgba(0,229,196,.22)", padding: ".3rem .85rem", marginBottom: "2rem",
        }}>Error 404</span>

        <h1 style={{
          fontFamily: "var(--font-display)", fontSize: "clamp(3rem, 7vw, 6rem)",
          fontWeight: 800, letterSpacing: "-.04em", color: "var(--white)",
          lineHeight: 1, marginBottom: "1.2rem",
        }}>
          Page Not<br /><span style={{ color: "var(--accent)" }}>Found.</span>
        </h1>

        <p style={{ fontSize: ".95rem", color: "var(--muted)", marginBottom: "3rem", maxWidth: "380px", margin: "0 auto 3rem" }}>
          The page you are looking for doesn't exist or has been moved.
        </p>

        <Link to="/"
          style={{
            display: "inline-flex", alignItems: "center", gap: ".5rem",
            padding: ".85rem 2.2rem", background: "var(--accent)", color: "var(--black)",
            fontFamily: "var(--font-body)", fontSize: ".82rem", fontWeight: 500,
            letterSpacing: ".1em", textTransform: "uppercase", textDecoration: "none",
            transition: "opacity .2s",
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = ".8"}
          onMouseLeave={e => e.currentTarget.style.opacity = "1"}
        >← Return Home</Link>
      </motion.div>
    </div>
  );
}