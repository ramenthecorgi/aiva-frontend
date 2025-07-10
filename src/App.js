// Fully Tailwind CSS converted version of the InboxAI landing page
// You should have Tailwind CSS configured in your project for these classes to work

import React from 'react';

const InboxAI = () => {
  return (
    <>
      <div className="fixed inset-0 z-[-1] bg-[radial-gradient(circle_at_20%_50%,#ff006e_0%,transparent_50%),radial-gradient(circle_at_80%_20%,#8338ec_0%,transparent_50%),radial-gradient(circle_at_40%_80%,#3a86ff_0%,transparent_50%)] animate-[bgShift_15s_ease-in-out_infinite]" />

      <header className="fixed top-0 w-full z-50 bg-[rgba(10,10,10,0.8)] backdrop-blur-lg border-b border-white/10 transition-all">
        <nav className="max-w-screen-xl mx-auto px-5 py-4 flex justify-between items-center">
          <div className="text-2xl font-extrabold bg-gradient-to-r from-pink-500 via-purple-600 to-blue-500 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(255,0,110,0.5)]">
            InboxAI
          </div>
          <ul className="hidden md:flex gap-8 text-white font-medium">
            <li><a href="#features" className="relative after:absolute after:bottom-[-5px] after:left-0 after:w-0 after:h-[2px] after:bg-gradient-to-r from-pink-500 to-purple-500 hover:after:w-full after:transition-all">Features</a></li>
            <li><a href="#pricing" className="relative after:absolute after:bottom-[-5px] after:left-0 after:w-0 after:h-[2px] after:bg-gradient-to-r from-pink-500 to-purple-500 hover:after:w-full after:transition-all">Pricing</a></li>
            <li><a href="#about" className="relative after:absolute after:bottom-[-5px] after:left-0 after:w-0 after:h-[2px] after:bg-gradient-to-r from-pink-500 to-purple-500 hover:after:w-full after:transition-all">About</a></li>
          </ul>
          <a href="#signup" className="bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold py-2 px-6 rounded-full shadow-lg hover:translate-y-[-3px] hover:shadow-xl transition relative overflow-hidden">
            <span className="absolute inset-0 left-[-100%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-all duration-500 hover:left-full" />
            <span className="relative z-10">Get Started</span>
          </a>
        </nav>
      </header>

      <section className="pt-40 pb-24 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[20%] left-[10%] w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full opacity-10 animate-[float_6s_ease-in-out_infinite] delay-0" />
          <div className="absolute top-[60%] right-[15%] w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full opacity-10 animate-[float_6s_ease-in-out_infinite] delay-[2s]" />
          <div className="absolute bottom-[30%] left-[20%] w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full opacity-10 animate-[float_6s_ease-in-out_infinite] delay-[4s]" />
        </div>
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-white via-pink-500 via-purple-600 to-blue-500 bg-clip-text text-transparent drop-shadow-[0_0_50px_rgba(255,0,110,0.3)] animate-[titleGlow_3s_ease-in-out_infinite_alternate]">
            Email Mastery.<br />Finally Achieved.
          </h1>
          <p className="text-lg md:text-xl text-white/90 font-light max-w-2xl mx-auto mb-10">
            Stop drowning in digital chaos. InboxAI transforms your email experience with AI that thinks like your best executive assistant—only faster, smarter, and always available.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4 mt-6">
            <a href="#signup" className="bg-gradient-to-r from-pink-500 to-purple-500 text-white font-extrabold py-4 px-10 rounded-full shadow-xl hover:scale-105 transition relative overflow-hidden">
              <span className="absolute inset-0 -top-1 -left-1 w-[200%] h-[200%] bg-gradient-to-r from-transparent via-white/10 to-transparent rotate-45 transition-all group-hover:animate-[shimmer_0.6s_ease-in-out]" />
              <span className="relative z-10">Transform Your Inbox</span>
            </a>
            <a href="#demo" className="text-white border border-white/30 hover:border-pink-500 font-semibold py-4 px-10 rounded-full hover:translate-y-[-2px] transition relative overflow-hidden">
              <span className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 hover:opacity-10 transition-all" />
              <span className="relative z-10">See the Magic</span>
            </a>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-neutral-900 to-black py-24">
        <div className="max-w-screen-xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-extrabold text-center bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent mb-6">The Email Nightmare is Real</h2>
          <p className="text-center text-lg text-gray-300 font-light max-w-3xl mx-auto mb-16">Every day, millions of professionals lose hours to email chaos. Sound familiar?</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-4">
            {[
              ['⚡', 'Productivity Killer', 'Executives waste 28% of their week—11+ hours—drowning in email.'],
              ['🎯', 'Priority Blindness', 'Million-dollar deals get buried under spam.'],
              ['🔥', 'Attention Terrorism', '74 daily email checks shatter your focus.'],
              ['🔄', 'Repetition Hell', 'Typing the same responses endlessly.'],
              ['🧠', 'Context Chaos', 'Thread archaeology every morning.'],
              ['📊', 'System Overwhelm', 'Complex folder systems that need constant maintenance.'],
            ].map(([icon, title, desc], idx) => (
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

      <section className="py-24 bg-gradient-to-br from-pink-500 via-purple-600 to-blue-500 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"%3E%3Cdefs%3E%3Cpattern id=\"grid\" width=\"10\" height=\"10\" patternUnits=\"userSpaceOnUse\"%3E%3Cpath d=\"M 10 0 L 0 0 0 10\" fill=\"none\" stroke=\"rgba(255,255,255,0.1)\" stroke-width=\"1\"/%3E%3C/pattern%3E%3C/defs%3E%3Crect width=\"100\" height=\"100\" fill=\"url(%23grid)\"/%3E%3C/svg%3E')" }} />
        <div className="max-w-screen-xl mx-auto px-6 relative z-10">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white text-center mb-6">Meet Your Digital Executive Assistant</h2>
          <p className="text-center text-lg text-white/90 font-light max-w-3xl mx-auto mb-16">InboxAI doesn't just manage email—it revolutionizes how you communicate, decide, and lead.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {[
              ['🎯', 'Laser-Focused Prioritization', 'Surfaces what matters most based on urgency and behavior.'],
              ['✨', 'Intelligent Response Engine', 'Learns your style and drafts responses you’d actually write.'],
              ['🧠', 'Context Mastery', 'Remembers everything so you never lose the thread.'],
              ['⚡', 'Proactive Intelligence', 'Suggests next actions, schedules follow-ups, and drafts proactively.'],
            ].map(([icon, title, desc], i) => (
              <div key={i} className="bg-white/10 backdrop-blur-lg p-10 rounded-3xl border border-white/20 transition-all hover:scale-[1.02] hover:shadow-2xl">
                <div className="w-24 h-24 flex items-center justify-center text-4xl mb-6 rounded-2xl bg-white/20 text-white shadow-lg">
                  {icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
                <p className="text-white/90 text-base leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="bg-black py-24">
        <div className="max-w-screen-xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-extrabold text-center bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent mb-6">Engineered for Email Excellence</h2>
          <p className="text-center text-lg text-gray-300 font-light max-w-3xl mx-auto mb-16">Every feature designed to reclaim your time and amplify your impact</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              ['🔍', 'Quantum Filtering', 'AI-powered categorization that adapts to your priorities.'],
              ['📅', 'Calendar Fusion', 'Seamless integration with your schedule.'],
              ['🛡️', 'Fort Knox Security', 'Military-grade encryption keeps your communications secure.'],
              ['📊', 'Impact Analytics', 'Real-time insights into your communication patterns.'],
              ['🔌', 'Universal Compatibility', 'Works with Gmail, Outlook, and more.'],
              ['🎨', 'Personality Engine', 'Learns your style to maintain authenticity.'],
            ].map(([icon, title, desc], i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl text-center p-8 transition-all hover:scale-[1.03] hover:shadow-lg">
                <div className="w-24 h-24 flex items-center justify-center text-4xl mx-auto mb-6 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-500 text-white shadow-xl">
                  {icon}
                </div>
                <h4 className="text-xl font-semibold text-white mb-2">{title}</h4>
                <p className="text-gray-300 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="signup" className="bg-gradient-to-b from-neutral-900 to-black py-24 text-center">
        <div className="max-w-screen-md mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent mb-6">Ready to Dominate Your Inbox?</h2>
          <p className="text-lg text-white/90 font-light mb-10">Join the elite circle of professionals who've already transformed their email game. Your productivity revolution starts now.</p>
          <form className="flex flex-col sm:flex-row gap-4 justify-center items-center" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Enter your email" className="w-full sm:w-auto flex-1 px-6 py-3 rounded-full border-2 border-white/10 bg-white/5 text-white placeholder-white/50 focus:border-pink-500 outline-none" required />
            <button type="submit" className="bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:translate-y-[-2px] hover:shadow-xl transition">
              Start Revolution
            </button>
          </form>
          <p className="text-sm text-white/70 mt-6">14-day free trial • No credit card required • Transform in minutes</p>
        </div>
      </section>

      <footer className="bg-black text-white/70 py-12 text-center border-t border-white/10">
        <div className="max-w-screen-xl mx-auto px-6">
          <p>&copy; 2025 InboxAI. All rights reserved. | Privacy Policy | Terms of Service</p>
        </div>
      </footer>
    </>
  );
};

export default InboxAI;

// You will also need to define @keyframes like bgShift, float, shimmer, titleGlow, etc. in your Tailwind config under extend.animation and extend.keyframes.
