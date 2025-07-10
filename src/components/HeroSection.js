import React from "react";

const HeroSection = () => (
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
        Stop drowning in digital chaos. Aiva transforms your email experience with AI that thinks like your best executive assistant—only faster, smarter, and always available.
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
);

export default HeroSection;
