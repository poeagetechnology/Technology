import React from 'react';
import {
  FaQuestionCircle,
  FaEnvelope,
  FaComments,
  FaBook,
  FaPhone,
  FaVideo
} from 'react-icons/fa';
import Header from './Header';
import Footer from './Footer';

const helpItems = [
  {
    icon: FaBook,
    title: 'Product Documentation',
    desc: 'Official technical documentation, implementation guides, and onboarding manuals for Poeage Technology solutions.',
    color: 'text-slate-700',
    link: 'View Documentation'
  },
  {
    icon: FaQuestionCircle,
    title: 'Knowledge Base',
    desc: 'Searchable articles addressing product usage, billing policies, security practices, and integrations.',
    color: 'text-slate-700',
    link: 'Access Knowledge Base'
  },
  {
    icon: FaEnvelope,
    title: 'Email Support',
    desc: 'Submit detailed support requests and receive expert assistance from our technical support team.',
    color: 'text-slate-700',
    link: 'Submit Ticket'
  },
  {
    icon: FaComments,
    title: 'Live Support',
    desc: 'Real-time assistance from certified support specialists during business hours.',
    color: 'text-slate-700',
    link: 'Start Live Chat'
  },
  {
    icon: FaPhone,
    title: 'Phone Assistance',
    desc: 'Direct phone support for enterprise customers and priority service subscribers.',
    color: 'text-slate-700',
    link: 'Contact by Phone'
  },
  {
    icon: FaVideo,
    title: 'Training Resources',
    desc: 'Professional training videos and product walkthroughs for teams and administrators.',
    color: 'text-slate-700',
    link: 'View Training Videos'
  }
];

export default function Helpcenter() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-slate-50 px-6 py-20">
        {/* Corporate Hero */}
        <section className="max-w-7xl mx-auto text-center mb-20">
          <p className="text-xs uppercase tracking-widest text-slate-500">
            Customer Support Center
          </p>

          <h1 className="mt-4 text-4xl sm:text-5xl font-semibold text-slate-900">
            Poeage Technology Help Center
          </h1>

          <p className="mt-6 text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Centralized access to documentation, support services, and training resources designed to help organizations maximize the value of Poeage Technology platforms.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-slate-900 text-white px-8 py-3 rounded-md hover:bg-slate-800 transition">
              Contact Support
            </button>
            <button className="border border-slate-300 px-8 py-3 rounded-md text-slate-700 hover:bg-slate-100 transition">
              Submit Service Request
            </button>
          </div>
        </section>

        {/* Corporate Cards */}
        <section className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {helpItems.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-md transition flex flex-col"
            >
              <item.icon className={`text-3xl mb-4 ${item.color}`} />

              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                {item.title}
              </h3>

              <p className="text-slate-600 text-sm flex-1 leading-relaxed">
                {item.desc}
              </p>

              <span className="mt-5 text-sm font-medium text-slate-900 cursor-pointer">
                {item.link} →
              </span>
            </div>
          ))}
        </section>
      </main>

      <Footer />
    </>
  );
}
