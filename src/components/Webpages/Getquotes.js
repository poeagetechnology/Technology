import React, { useState, useEffect} from "react";
import emailjs from "emailjs-com";
import { useLocation } from "react-router-dom";
import { FaEnvelopeOpenText, FaPaperPlane, FaLightbulb, FaUser, FaPhone, FaComments } from "react-icons/fa";
import Header from "./Header";

// --- Updated for a cleaner, minimal aesthetic ---

const Getquotes = () => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ sending: false, success: null });
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const topic = query.get("topic");

  useEffect(() => {
    if (topic && formData.message === "") {
      setFormData((prev) => ({ ...prev, message: `I'm interested in: ${topic}` }));
    }
  }, [topic, formData.message]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.phone.trim()) newErrors.phone = "Contact number is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus({ sending: true, success: null });

    emailjs
      .send("service_5p6bb6j", "template_jepqzkk", formData, "ZDcUw7Mx4T6teZ1bG")
      .then(() => {
        setStatus({ sending: false, success: true });
        setErrors({});
        setFormData({ name: "", email: "", phone: "", message: "" });
      })
      .catch(() => setStatus({ sending: false, success: false }));
  };

  return (
    <>
      <Header />

      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12 text-gray-800">
        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Left */}
          <div className="flex flex-col justify-center space-y-5">
            <h1 className="text-3xl md:text-4xl font-bold">Let's Build Something Amazing</h1>
            <p className="text-gray-600">Share your idea — we’ll shape it into a solution that works.</p>

            <div className="grid gap-3">
              {[{ icon: <FaUser />, text: "Personalized consultation" }, { icon: <FaComments />, text: "Fast response time" }, { icon: <FaLightbulb />, text: "Creative & practical ideas" }].map((item, i) => (
                <div key={i} className="flex items-center gap-3 bg-white border rounded-xl p-3 shadow-sm">
                  <span className="text-blue-500">{item.icon}</span>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-white border rounded-2xl shadow-lg p-6 space-y-4">
            <h2 className="text-xl font-semibold text-blue-600 text-center">Request a Quote</h2>

            {[{ name: "name", placeholder: "Full Name", icon: <FaUser /> },{ name: "email", placeholder: "Email", icon: <FaEnvelopeOpenText /> },{ name: "phone", placeholder: "Phone", icon: <FaPhone /> }].map((f) => (
              <div key={f.name} className="relative">
                <span className="absolute left-3 top-3 text-blue-500">{f.icon}</span>
                <input
                  name={f.name}
                  value={formData[f.name]}
                  onChange={handleChange}
                  placeholder={f.placeholder}
                  className={`w-full border rounded-xl py-2 pl-10 pr-3 focus:outline-none focus:ring-2 ${errors[f.name] ? "border-red-400 ring-red-200" : "focus:ring-blue-200"}`}
                />
                {errors[f.name] && <p className="text-red-500 text-xs mt-1">{errors[f.name]}</p>}
              </div>
            ))}

            <div className="relative">
              <span className="absolute left-3 top-3 text-blue-500"><FaComments /></span>
              <textarea
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your project"
                className={`w-full border rounded-xl py-2 pl-10 pr-3 resize-none focus:outline-none focus:ring-2 ${errors.message ? "border-red-400 ring-red-200" : "focus:ring-blue-200"}`}
              />
              {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
            </div>

            <button
              type="submit"
              disabled={status.sending}
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition"
            >
              {status.sending ? "Sending..." : (
                <span className="flex items-center justify-center gap-2">Send <FaPaperPlane /></span>
              )}
            </button>

            {status.success !== null && (
              <p className={`text-center text-sm ${status.success ? "text-green-500" : "text-red-500"}`}>
                {status.success ? "Your message was sent successfully" : "Something went wrong. Please try again"}
              </p>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default Getquotes;
