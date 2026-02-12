import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaRobot, FaBrain, FaCogs, FaChartLine, FaCloud } from "react-icons/fa";

export default function AIML() {
  const navigate = useNavigate();

  const services = [
    {
      icon: <FaRobot className="text-4xl" />,
      title: "AI Chatbots",
      description: "Intelligent conversational systems that automate support, sales, and onboarding.",
      img: "https://images.unsplash.com/photo-1581093588401-22d8d1f6c3c3"
    },
    {
      icon: <FaBrain className="text-4xl" />,
      title: "Machine Learning",
      description: "Predictive analytics, recommendation engines, and smart decision systems.",
      img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b"
    },
    {
      icon: <FaCogs className="text-4xl" />,
      title: "Automation",
      description: "Workflow automation that reduces manual work and improves efficiency.",
      img: "https://images.unsplash.com/photo-1581091870627-3b5c67a3a2b7"
    },
    {
      icon: <FaChartLine className="text-4xl" />,
      title: "Data Insights",
      description: "Dashboards and analytics that turn raw data into actionable insights.",
      img: "https://images.unsplash.com/photo-1556157382-97eda2d62296"
    },
    {
      icon: <FaCloud className="text-4xl" />,
      title: "AI on Cloud",
      description: "Scalable AI systems deployed securely on cloud platforms.",
      img: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2"
    }
  ];

  return (
    <div className="bg-gray-50 text-gray-900">
      <Header />

      <section className="container mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              AI & Machine Learning
            </h1>

            <p className="text-lg text-gray-600 mb-6">
              Build smart, automated, and scalable solutions powered by modern AI & ML technology.
            </p>

            <button
              onClick={() => navigate("/contact")}
              className="px-6 py-3 bg-black text-white rounded-2xl shadow hover:opacity-90"
            >
              Get Started
            </button>
          </motion.div>

          <motion.img
            src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d"
            alt="AI Illustration"
            className="w-full rounded-2xl shadow"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
          />
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-semibold mb-10 text-center">
            Our AI Capabilities
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="p-6 bg-gray-100 rounded-2xl shadow hover:shadow-lg transition"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="mb-4 text-black">{service.icon}</div>

                <h3 className="text-xl font-bold mb-2">{service.title}</h3>

                <p className="text-gray-600 mb-3">{service.description}</p>

                <img
                  src={service.img}
                  alt={service.title}
                  className="w-full rounded-xl"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
