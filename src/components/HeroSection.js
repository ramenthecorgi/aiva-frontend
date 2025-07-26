import React from "react";
import Typewriter from "typewriter-effect";

const HeroSection = () => (
  <section className="pt-40 pb-24 text-center relative overflow-hidden">
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-[20%] left-[10%] w-16 h-16 bg-gradient-to-br from-amber-400 to-blue-600 rounded-full opacity-10 animate-[float_6s_ease-in-out_infinite] delay-0" />
      <div className="absolute top-[60%] right-[15%] w-16 h-16 bg-gradient-to-br from-amber-400 to-blue-600 rounded-full opacity-10 animate-[float_6s_ease-in-out_infinite] delay-[2s]" />
      <div className="absolute bottom-[30%] left-[20%] w-16 h-16 bg-gradient-to-br from-amber-400 to-blue-600 rounded-full opacity-10 animate-[float_6s_ease-in-out_infinite] delay-[4s]" />
    </div>
    <div className="max-w-4xl mx-auto px-6 relative z-10">
      <div className="mb-6 flex items-center justify-center min-h-[7.5rem] md:min-h-[9.5rem]">
        <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-white via-blue-400 via-blue-300 to-amber-300 bg-clip-text text-transparent drop-shadow-[0_0_50px_rgba(10,61,98,0.3)] animate-[titleGlow_3s_ease-in-out_infinite_alternate]">
          Meet Aiva: Your Hyper-Intelligent Executive Assistant
        </h1>
      </div>
      <p className="text-lg md:text-xl text-white/80 font-light max-w-2xl mx-auto mb-10">
        Aiva is more than just automation—she’s a digital executive assistant who learns how you work, anticipates your needs, and handles the tasks you shouldn’t have to. From scheduling and follow-ups to research and reminders, Aiva acts in your voice and style, freeing you to lead, create, and live.
      </p>
      <div className="flex flex-col md:flex-row justify-center gap-4 mt-6">
        <a href="#signup" className="bg-gradient-to-r from-amber-400 to-amber-500 text-navy-900 font-extrabold py-4 px-10 rounded-full shadow-xl hover:scale-105 transition relative overflow-hidden">
          <span className="absolute inset-0 -top-1 -left-1 w-[200%] h-[200%] bg-gradient-to-r from-transparent via-white/10 to-transparent rotate-45 transition-all group-hover:animate-[shimmer_0.6s_ease-in-out]" />
          <span className="relative z-10">Transform Your Inbox</span>
        </a>
        <a href="#demo" className="text-blue-100 border border-white/30 hover:border-amber-400 font-semibold py-4 px-10 rounded-full hover:translate-y-[-2px] transition relative overflow-hidden">
          <span className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-500 opacity-0 hover:opacity-10 transition-all" />
          <span className="relative z-10">See the Magic</span>
        </a>
      </div>
    </div>
  </section>
);

export default HeroSection;
