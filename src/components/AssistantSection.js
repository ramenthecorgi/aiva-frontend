import React from "react";

const assistantFeatures = [
  ['🎯', 'Intelligent Task Prioritization', 'Learns your work patterns and surfaces the most critical tasks and decisions first.'],
  ['✨', 'Adaptive Communication', 'Masters your voice and style across emails, messages, and documents.'],
  ['⚡', 'Proactive Workflow Management', 'Anticipates your needs, schedules follow-ups, and automates routine processes.'],
];

const AssistantSection = () => (
  <section className="py-24 bg-gradient-to-br from-[#0a3d62] via-[#0c2461] to-[#1e3799] relative overflow-hidden">
    <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"%3E%3Cdefs%3E%3Cpattern id=\"grid\" width=\"10\" height=\"10\" patternUnits=\"userSpaceOnUse\"%3E%3Cpath d=\"M 10 0 L 0 0 0 10\" fill=\"none\" stroke=\"rgba(255,255,255,0.1)\" stroke-width=\"1\"/%3E%3C/pattern%3E%3C/defs%3E%3Crect width=\"100\" height=\"100\" fill=\"url(%23grid)\"/%3E%3C/svg%3E')" }} />
    <div className="max-w-screen-xl mx-auto px-6 relative z-10">
      <h2 className="text-4xl md:text-5xl font-extrabold text-white text-center mb-6">How Aiva Works for You</h2>
      <p className="text-center text-lg text-white/90 font-light max-w-3xl mx-auto mb-16">Aiva doesn’t just automate tasks—she transforms how you work, communicate, and lead by acting as your most trusted digital partner.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {assistantFeatures.map(([icon, title, desc], i) => (
          <div key={i} className="bg-[rgba(10,61,98,0.3)] backdrop-blur-lg p-10 rounded-3xl border border-white/20 transition-all hover:scale-[1.02] hover:shadow-2xl hover:border-amber-400/30">
            <div className="w-24 h-24 flex items-center justify-center text-4xl mb-6 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-500 text-navy-900 shadow-lg">
              {icon}
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
            <p className="text-white/90 text-base leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default AssistantSection;
