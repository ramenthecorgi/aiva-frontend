import React from "react";

const painpoints = [
  ['⚡', 'Productivity Killer', 'Executives waste 28% of their week—11+ hours—drowning in email.'],
  ['🎯', 'Priority Blindness', 'Million-dollar deals get buried under spam.'],
  ['🔥', 'Attention Terrorism', '74 daily email checks shatter your focus.'],
  ['🔄', 'Repetition Hell', 'Typing the same responses endlessly.'],
  ['🧠', 'Context Chaos', 'Thread archaeology every morning.'],
  ['📊', 'System Overwhelm', 'Complex folder systems that need constant maintenance.'],
];

const PainpointsSection = () => (
  <section className="bg-gradient-to-br from-neutral-900 to-black py-24">
    <div className="max-w-screen-xl mx-auto px-6">
      <h2 className="text-4xl md:text-5xl font-extrabold text-center bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent mb-6">The Email Nightmare is Real</h2>
      <p className="text-center text-lg text-gray-300 font-light max-w-3xl mx-auto mb-16">Every day, millions of professionals lose hours to email chaos. Sound familiar?</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-4">
        {painpoints.map(([icon, title, desc], idx) => (
          <div key={idx} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 transition-all hover:scale-[1.02] hover:shadow-xl hover:border-pink-500/30">
            <div className="w-20 h-20 flex items-center justify-center text-3xl mb-4 rounded-xl bg-gradient-to-br from-pink-500 to-purple-500 text-white shadow-xl">
              {icon}
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
            <p className="text-gray-300 text-sm leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default PainpointsSection;
