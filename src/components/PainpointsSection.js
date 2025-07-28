import React from "react";
import { useIntersectionObserver } from '../hooks/useScrollAnimation';

const personas = [
  ['👔', 'Corporate & Tech Leadership', 
   'CxOs, VPs, PMs, and HR leaders who need leverage — an always-on assistant to handle inbox triage, scheduling, and follow-ups, without the overhead of hiring or onboarding.'],

   ['🎤', 'Creators & Independent Professionals', 
    'Creators, consultants, speakers, and solo operators who rely on their reputation — and need help managing outreach, scheduling, and follow-ups without hiring a full-time assistant.'],
   
  ['👨‍👩‍👧‍👦', 'Working Parents', 
   'Dual-career households balancing work and life — who benefit from a proactive assistant managing reminders, scheduling, and coordination behind the scenes.'],
];

const PainpointsSection = () => {
  const [sectionRef, isVisible] = useIntersectionObserver({ threshold: 0.2 });
  
  return (
  <section ref={sectionRef} className="bg-gradient-to-br from-[#0a3d62] to-[#0c2461] py-24">
    <div className="max-w-screen-xl mx-auto px-6">
      <h2 className="text-4xl md:text-5xl font-extrabold text-center bg-gradient-to-r from-blue-300 to-amber-300 bg-clip-text text-transparent mb-6">Who is Aiva for?</h2>
      <p className="text-center text-lg text-gray-300 font-light max-w-3xl mx-auto mb-16">Professionals across industries are overwhelmed by repetitive tasks, information overload, and lack of time for strategic work. Aiva helps you reclaim your focus.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-4">
        {personas.map(([icon, title, desc], idx) => (
          <div 
            key={idx} 
            className={`bg-[rgba(10,61,98,0.3)] backdrop-blur-xl border border-white/10 rounded-3xl p-8 transition-all hover:scale-[1.02] hover:shadow-xl hover:border-amber-400/30 ${
              isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
            style={{
              transitionDelay: `${idx * 150}ms`,
              transitionDuration: '600ms'
            }}
          >
            <div className="w-20 h-20 flex items-center justify-center text-3xl mb-4 rounded-xl bg-gradient-to-br from-amber-400 to-amber-500 text-navy-900 shadow-xl">
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
};

export default PainpointsSection;
