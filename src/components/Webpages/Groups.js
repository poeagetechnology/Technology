import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sql from "../../assests/MySql.png";
import Php from "../../assests/PHP.png";

const categories = ["Backend", "Frontend", "Databases", "CMS", "Cloud/Testing", "DevOps"];

const techStacks = {
  Backend: [
    { name: "Node.js",  logo: "https://cdn.worldvectorlogo.com/logos/nodejs-icon.svg" },
    { name: "PHP",      logo: Php },
    { name: "MySQL",    logo: Sql },
    { name: "Java",     logo: "https://cdn.worldvectorlogo.com/logos/java-4.svg" },
    { name: ".NET",     logo: "https://cdn.worldvectorlogo.com/logos/dot-net-core-7.svg" },
    { name: "Python",   logo: "https://cdn.worldvectorlogo.com/logos/python-5.svg" },
  ],
  Frontend: [
    { name: "React",   logo: "https://cdn.worldvectorlogo.com/logos/react-2.svg" },
    { name: "Angular", logo: "https://cdn.worldvectorlogo.com/logos/angular-icon-1.svg" },
    { name: "Vue.js",  logo: "https://cdn.worldvectorlogo.com/logos/vue-9.svg" },
  ],
  Databases: [
    { name: "MySQL",      logo: Sql },
    { name: "PostgreSQL", logo: "https://cdn.worldvectorlogo.com/logos/postgresql.svg" },
    { name: "Redis",      logo: "https://cdn.worldvectorlogo.com/logos/redis.svg" },
  ],
  CMS: [
    { name: "WordPress", logo: "https://cdn.worldvectorlogo.com/logos/wordpress-icon.svg" },
    { name: "Drupal",    logo: "https://cdn.worldvectorlogo.com/logos/drupal.svg" },
  ],
  "Cloud/Testing": [
    { name: "AWS",  logo: "https://cdn.worldvectorlogo.com/logos/aws-2.svg" },
    { name: "Jest", logo: "https://cdn.worldvectorlogo.com/logos/jest-2.svg" },
  ],
  DevOps: [
    { name: "Docker",  logo: "https://cdn.worldvectorlogo.com/logos/docker.svg" },
    { name: "Jenkins", logo: "https://cdn.worldvectorlogo.com/logos/jenkins-1.svg" },
  ],
};

export default function Groups() {
  const [active, setActive] = useState("Backend");

  return (
    <section style={{
      padding:    "7rem 4rem",
      background: "var(--off-black)",
      borderTop:  "1px solid var(--border)",
      borderBottom:"1px solid var(--border)",
    }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

        {/* heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ marginBottom: "3.5rem" }}
        >
          <span style={{
            fontSize:      ".7rem",
            letterSpacing: ".14em",
            textTransform: "uppercase",
            color:         "var(--muted)",
            display:       "block",
            marginBottom:  ".6rem",
            fontFamily:    "var(--font-display)",
          }}>Technology</span>
          <h2 style={{
            fontFamily:    "var(--font-display)",
            fontSize:      "clamp(2rem, 3.5vw, 3rem)",
            fontWeight:    800,
            letterSpacing: "-.04em",
            lineHeight:    1,
            color:         "var(--white)",
          }}>
            Our <span style={{ color: "var(--accent)" }}>Tech Stack</span>
          </h2>
        </motion.div>

        {/* tabs */}
        <div style={{
          display:      "flex",
          gap:          ".5rem",
          flexWrap:     "wrap",
          marginBottom: "3rem",
          borderBottom: "1px solid var(--border)",
          paddingBottom:"1.5rem",
        }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              style={{
                padding:       ".45rem 1.2rem",
                background:    active === cat ? "var(--accent)" : "transparent",
                color:         active === cat ? "var(--black)" : "var(--muted)",
                border:        `1px solid ${active === cat ? "var(--accent)" : "var(--border)"}`,
                fontFamily:    "var(--font-body)",
                fontSize:      ".75rem",
                letterSpacing: ".08em",
                textTransform: "uppercase",
                cursor:        "pointer",
                transition:    "all .2s",
                fontWeight:    active === cat ? 600 : 400,
              }}
              onMouseEnter={e => {
                if (active !== cat) {
                  e.currentTarget.style.borderColor = "var(--border-hi)";
                  e.currentTarget.style.color       = "var(--white)";
                }
              }}
              onMouseLeave={e => {
                if (active !== cat) {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.color       = "var(--muted)";
                }
              }}
            >{cat}</button>
          ))}
        </div>

        {/* grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{   opacity: 0, y: -10 }}
            transition={{ duration: .35 }}
            style={{
              display:             "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
              gap:                 "1px",
              background:          "var(--border)",
            }}
          >
            {techStacks[active].map((tech, idx) => (
              <TechCard key={idx} tech={tech} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

function TechCard({ tech }) {
  const [hov, setHov] = useState(false);
  return (
    <motion.div
      whileHover={{ y: -4 }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background:     hov ? "var(--card)" : "var(--panel)",
        padding:        "2rem 1rem",
        display:        "flex",
        flexDirection:  "column",
        alignItems:     "center",
        gap:            ".8rem",
        cursor:         "default",
        transition:     "background .2s",
      }}
    >
      <img
        src={tech.logo}
        alt={tech.name}
        style={{
          width:     "40px",
          height:    "40px",
          objectFit: "contain",
          filter:    hov ? "none" : "grayscale(.6) brightness(.7)",
          transition:"filter .3s",
        }}
      />
      <span style={{
        fontFamily:    "var(--font-display)",
        fontSize:      ".7rem",
        fontWeight:    600,
        letterSpacing: ".06em",
        color:         hov ? "var(--white)" : "var(--muted)",
        textTransform: "uppercase",
        transition:    "color .2s",
      }}>{tech.name}</span>
    </motion.div>
  );
}