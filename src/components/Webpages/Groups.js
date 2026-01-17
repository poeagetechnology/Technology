import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sql from "../../assests/MySql.png";
import Php from "../../assests/PHP.png";

const TechStackUnique = () => {
  const categories = [
    "Backend",
    "Frontend",
    "Databases",
    "CMS",
    "Cloud/Testing",
    "DevOps",
  ];
  const [active, setActive] = useState("Backend");

  const techStacks = {
    Backend: [
      { name: "Node.js", logo: "https://cdn.worldvectorlogo.com/logos/nodejs-icon.svg" },
      { name: "PHP", logo: Php },
      { name: "MySQL", logo: Sql },
      { name: "Java", logo: "https://cdn.worldvectorlogo.com/logos/java-4.svg" },
      { name: ".NET", logo: "https://cdn.worldvectorlogo.com/logos/dot-net-core-7.svg" },
      { name: "Python", logo: "https://cdn.worldvectorlogo.com/logos/python-5.svg" },
    ],
    Frontend: [
      { name: "React", logo: "https://cdn.worldvectorlogo.com/logos/react-2.svg" },
      { name: "Angular", logo: "https://cdn.worldvectorlogo.com/logos/angular-icon-1.svg" },
      { name: "Vue.js", logo: "https://cdn.worldvectorlogo.com/logos/vue-9.svg" },
    ],
    Databases: [
      { name: "MySQL", logo: Sql },
      { name: "PostgreSQL", logo: "https://cdn.worldvectorlogo.com/logos/postgresql.svg" },
      { name: "Redis", logo: "https://cdn.worldvectorlogo.com/logos/redis.svg" },
    ],
    CMS: [
      { name: "WordPress", logo: "https://cdn.worldvectorlogo.com/logos/wordpress-icon.svg" },
      { name: "Drupal", logo: "https://cdn.worldvectorlogo.com/logos/drupal.svg" },
    ],
    "Cloud/Testing": [
      { name: "AWS", logo: "https://cdn.worldvectorlogo.com/logos/aws-2.svg" },
      { name: "Jest", logo: "https://cdn.worldvectorlogo.com/logos/jest-2.svg" },
    ],
    DevOps: [
      { name: "Docker", logo: "https://cdn.worldvectorlogo.com/logos/docker.svg" },
      { name: "Jenkins", logo: "https://cdn.worldvectorlogo.com/logos/jenkins-1.svg" },
    ],
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="relative py-24 px-6 md:px-20 bg-white overflow-hidden">

      <div className="relative z-10 text-center mb-16">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold text-gray-900"
        >
          Explore Our
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-700">
            {" "}Tech Stack
          </span>
        </motion.h2>

        <p className="text-gray-600 max-w-2xl mx-auto mt-3">
          We carefully choose technologies that ensure performance, reliability, and scalability.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-4 mb-14">
        {categories.map((cat) => (
          <motion.button
            key={cat}
            onClick={() => setActive(cat)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300
            ${active === cat
              ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg"
              : "bg-white/70 border border-gray-200 text-gray-700 hover:bg-gray-50"
            }`}
          >
            {cat}
          </motion.button>
        ))}
      </div>

      {/* Stagger animation container */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0 }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.07 },
            },
          }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 justify-items-center"
        >
          {techStacks[active].map((tech, idx) => (
            <motion.div
              key={idx}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              className="relative w-36 h-36 p-4 rounded-2xl backdrop-blur-xl bg-white/70 border border-gray-100 shadow-md hover:shadow-2xl transition-all"
            >
              {/* Glow ring */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-300/20 to-blue-300/20 opacity-0 group-hover:opacity-100 transition" />

              <div className="flex flex-col items-center justify-center h-full">
                <img src={tech.logo} alt={tech.name} className="w-12 h-12 object-contain" />
                <span className="mt-3 text-sm font-semibold text-gray-700">
                  {tech.name}
                </span>
              </div>

              {/* Tooltip */}
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs bg-gray-900 text-white px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                {tech.name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default TechStackUnique;
