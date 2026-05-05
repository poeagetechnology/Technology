import React, { useState, useEffect } from "react";
import emailjs from "emailjs-com";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "./Header";

const FIELDS = [
  { name: "name",    placeholder: "Full Name",     type: "text" },
  { name: "email",   placeholder: "Email Address", type: "email" },
  { name: "phone",   placeholder: "Phone Number",  type: "tel" },
];

export default function Getquotes() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [errors,   setErrors]   = useState({});
  const [status,   setStatus]   = useState({ sending: false, success: null });
  const location = useLocation();

  useEffect(() => {
    const topic = new URLSearchParams(location.search).get("topic");
    if (topic) setFormData(p => ({ ...p, message: `I'm interested in: ${topic}` }));
  }, [location.search]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const e = {};
    if (!formData.name.trim())    e.name    = "Required";
    if (!formData.email.trim())   e.email   = "Required";
    if (!formData.phone.trim())   e.phone   = "Required";
    if (!formData.message.trim()) e.message = "Required";
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const ve = validate();
    if (Object.keys(ve).length) { setErrors(ve); return; }
    setStatus({ sending: true, success: null });
    emailjs
      .send("service_5p6bb6j", "template_jepqzkk", formData, "ZDcUw7Mx4T6teZ1bG")
      .then(() => {
        setStatus({ sending: false, success: true });
        setFormData({ name: "", email: "", phone: "", message: "" });
      })
      .catch(() => setStatus({ sending: false, success: false }));
  };

  const inputStyle = (field) => ({
    width:       "100%",
    background:  errors[field] ? "rgba(255,80,80,.04)" : "var(--card)",
    border:      `1px solid ${errors[field] ? "rgba(255,80,80,.4)" : "var(--border)"}`,
    padding:     ".85rem 1.1rem",
    color:       "var(--white)",
    fontFamily:  "var(--font-body)",
    fontSize:    ".9rem",
    outline:     "none",
    transition:  "border-color .2s",
    display:     "block",
  });

  return (
    <>
      <Header />

      <main style={{
        background: "var(--black)",
        minHeight:  "100vh",
        paddingTop: "7rem",
        display:    "flex",
        alignItems: "center",
      }}>
        <div style={{
          maxWidth:            "1100px",
          margin:              "0 auto",
          padding:             "4rem 4rem",
          width:               "100%",
          display:             "grid",
          gridTemplateColumns: "1fr 1fr",
          gap:                 "6rem",
          alignItems:          "center",
        }}>

          {/* ── LEFT ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: .7 }}
          >
            <span style={{
              display:       "inline-block",
              fontSize:      ".72rem",
              letterSpacing: ".14em",
              textTransform: "uppercase",
              color:         "var(--accent)",
              border:        "1px solid rgba(0,229,196,.22)",
              padding:       ".3rem .85rem",
              marginBottom:  "1.5rem",
            }}>Start a Project</span>

            <h1 style={{
              fontFamily:    "var(--font-display)",
              fontSize:      "clamp(2rem, 4vw, 3.5rem)",
              fontWeight:    800,
              letterSpacing: "-.04em",
              lineHeight:    1.05,
              color:         "var(--white)",
              marginBottom:  "1.5rem",
            }}>
              Let's Build<br />
              Something<br />
              <span style={{ color: "var(--accent)" }}>Amazing.</span>
            </h1>

            <p style={{
              fontSize:     ".9rem",
              color:        "var(--muted)",
              lineHeight:   1.9,
              marginBottom: "3rem",
              maxWidth:     "360px",
            }}>
              Share your idea — we'll shape it into a solution that works and scales.
            </p>

            {/* promise rows */}
            {[
              ["🎯", "Personalised consultation"],
              ["⚡", "Fast response time"],
              ["💡", "Creative & practical ideas"],
            ].map(([icon, text]) => (
              <div key={text} style={{
                display:      "flex",
                alignItems:   "center",
                gap:          "1rem",
                marginBottom: ".8rem",
                paddingBottom:".8rem",
                borderBottom: "1px solid var(--border)",
              }}>
                <span style={{ fontSize: "1rem" }}>{icon}</span>
                <span style={{ fontSize: ".85rem", color: "#555" }}>{text}</span>
              </div>
            ))}

            {/* contact info */}
            <div style={{ marginTop: "2.5rem" }}>
              <a href="tel:+918056889616" style={{
                display:        "block",
                fontSize:       "1.1rem",
                fontFamily:     "var(--font-display)",
                fontWeight:     700,
                color:          "var(--white)",
                textDecoration: "none",
                marginBottom:   ".3rem",
              }}>+91 805-688-9616</a>
              <a href="mailto:info@poeage.com" style={{
                fontSize:       ".85rem",
                color:          "var(--muted)",
                textDecoration: "none",
              }}>info@poeage.com</a>
            </div>
          </motion.div>

          {/* ── RIGHT: FORM ── */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: .7, delay: .15 }}
            style={{
              background: "var(--panel)",
              border:     "1px solid var(--border)",
              padding:    "2.5rem",
            }}
          >
            <h2 style={{
              fontFamily:    "var(--font-display)",
              fontSize:      "1.1rem",
              fontWeight:    700,
              letterSpacing: ".02em",
              color:         "var(--white)",
              marginBottom:  "2rem",
              paddingBottom: "1rem",
              borderBottom:  "1px solid var(--border)",
            }}>Request a Quote</h2>

            {FIELDS.map((f) => (
              <div key={f.name} style={{ marginBottom: "1.2rem" }}>
                <input
                  name={f.name}
                  type={f.type}
                  value={formData[f.name]}
                  onChange={handleChange}
                  placeholder={f.placeholder}
                  style={inputStyle(f.name)}
                  onFocus={e  => !errors[f.name] && (e.target.style.borderColor = "var(--accent)")}
                  onBlur={e   => !errors[f.name] && (e.target.style.borderColor = "var(--border)")}
                />
                {errors[f.name] && (
                  <span style={{ fontSize: ".72rem", color: "rgba(255,80,80,.8)", marginTop: ".25rem", display: "block" }}>
                    {errors[f.name]}
                  </span>
                )}
              </div>
            ))}

            <div style={{ marginBottom: "1.5rem" }}>
              <textarea
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your project..."
                style={{ ...inputStyle("message"), resize: "vertical" }}
                onFocus={e  => !errors.message && (e.target.style.borderColor = "var(--accent)")}
                onBlur={e   => !errors.message && (e.target.style.borderColor = "var(--border)")}
              />
              {errors.message && (
                <span style={{ fontSize: ".72rem", color: "rgba(255,80,80,.8)", marginTop: ".25rem", display: "block" }}>
                  {errors.message}
                </span>
              )}
            </div>

            <button
              type="submit"
              disabled={status.sending}
              style={{
                width:         "100%",
                padding:       "1rem",
                background:    status.sending ? "var(--dim)" : "var(--accent)",
                color:         "var(--black)",
                border:        "none",
                fontFamily:    "var(--font-body)",
                fontSize:      ".82rem",
                fontWeight:    500,
                letterSpacing: ".1em",
                textTransform: "uppercase",
                cursor:        status.sending ? "not-allowed" : "pointer",
                transition:    "opacity .2s",
              }}
              onMouseEnter={e => !status.sending && (e.currentTarget.style.opacity = ".8")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
            >
              {status.sending ? "Sending…" : "Send Message →"}
            </button>

            {status.success !== null && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                  marginTop:  "1rem",
                  textAlign:  "center",
                  fontSize:   ".82rem",
                  color:      status.success ? "var(--accent)" : "rgba(255,80,80,.8)",
                }}
              >
                {status.success
                  ? "✓ Message sent successfully — we'll be in touch soon."
                  : "Something went wrong. Please try again."}
              </motion.p>
            )}
          </motion.form>
        </div>
      </main>
    </>
  );
}