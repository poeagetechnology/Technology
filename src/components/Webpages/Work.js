import React from "react";
import { motion } from "framer-motion";
import Header from "./Header";
import Footer from "./Footer";

import Leg from "../../assests/Legendry.png";
import Herito from "../../assests/Herito copy.png";
import ASE from "../../assests/ASE protact.png";
import Sabari from "../../assests/sabari.png";
import Taxi from "../../assests/taxi.png";
import Coga from "../../assests/coga.png";

const STEPS = [
  { id: "01", title: "Research & Discovery", desc: "Understanding user needs and business goals.", image: Leg, link: "#", label: "Legendary One" },
  { id: "02", title: "Design & Prototyping", desc: "Crafting intuitive UI/UX and prototypes.", image: Herito, link: "#", label: "Herito" },
  { id: "03", title: "Development", desc: "Building scalable and performant systems.", image: ASE, link: "#", label: "ASE" },
  { id: "04", title: "Testing", desc: "Ensuring reliability and performance.", image: Sabari, link: "#", label: "Sabari" },
  { id: "05", title: "Launch", desc: "Deploying with precision and confidence.", image: Taxi, link: "#", label: "Taxi" },
  { id: "06", title: "Growth", desc: "Continuous improvement and scaling.", image: Coga, link: "#", label: "Coga" },
];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.18 },
  },
};

const item = {
  hidden: { opacity: 0, y: 80, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Work() {
  return (
    <>
      <Header />

      {/* WHITE THEME */}
      <main className="bg-white text-black min-h-screen pt-24 sm:pt-28">

        {/* HERO */}
        <div className="max-w-6xl mx-auto px-5 sm:px-6 md:px-12 mb-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs uppercase tracking-widest text-blue-600 border border-blue-200 px-4 py-1 rounded-full inline-block mb-6"
          >
            Our Process
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-6 text-black"
          >
            Building Digital <br />
            <span className="text-blue-600">Experiences</span>
          </motion.h1>

          <p className="text-gray-600 max-w-xl text-base sm:text-lg">
            A refined system designed to deliver scalable, high-performance products.
          </p>
        </div>

        {/* STEPS */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-20 sm:space-y-24 max-w-7xl mx-auto px-5 sm:px-6 md:px-12"
        >
          {STEPS.map((step, i) => {
            const reverse = i % 2 !== 0;

            return (
              <motion.div
                key={step.id}
                variants={item}
                className="grid md:grid-cols-2 gap-10 md:gap-14 items-center"
              >

                {/* IMAGE */}
                <div className={`${reverse ? "md:order-2" : ""}`}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="relative group rounded-2xl overflow-hidden cursor-pointer"
                  >
                    <img
                      src={step.image}
                      alt={step.title}
                      className="w-full h-[240px] sm:h-[300px] md:h-[340px] object-cover transition duration-700 group-hover:scale-105"
                    />

                    {/* soft overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-white/80 to-transparent" />

                    {/* border */}
                    <div className="absolute inset-0 rounded-2xl border border-gray-200 group-hover:border-blue-400 transition" />

                    {/* step number */}
                    <span className="absolute top-4 left-4 text-5xl font-extrabold text-black/10">
                      {step.id}
                    </span>

                    {/* link */}
                    <div className="absolute bottom-4 left-4">
                      <a
                        href={step.link}
                        className="text-sm text-blue-600 font-semibold group-hover:underline"
                      >
                        View Project → {step.label}
                      </a>
                    </div>
                  </motion.div>
                </div>

                {/* TEXT */}
                <div className={`${reverse ? "md:order-1" : ""}`}>
                  <span className="text-xs uppercase tracking-widest text-gray-400 mb-3 block">
                    Step {step.id}
                  </span>

                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 text-black">
                    {step.title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed max-w-md text-sm sm:text-base">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </main>

      <Footer />
    </>
  );
}
