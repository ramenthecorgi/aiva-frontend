import React from "react";
import { useAnimatedCounter, useIntersectionObserver } from '../hooks/useScrollAnimation';

const comparisonData = [
  {
    title: "Going it Alone",
    cost: "Hidden costs in lost time & opportunity",
    features: [
      "Juggling administrative tasks manually",
      "Inconsistent scheduling and follow-ups",
      "Key details falling through the cracks",
      "Productivity capped by personal bandwidth"
    ],
    highlight: false,
    icon: "–"
  },
  {
    title: "Traditional EA",
    cost: "$60k - $85k+ Annual Salary",
    features: [
      "Limited to 8-hour workdays",
      "Handles one task at a time",
      "Requires sick days and vacation",
      "Risk of human error and miscommunication"
    ],
    highlight: false,
    icon: "–"
  },
  {
    title: "With Aiva",
    cost: "Starts at a low monthly fee",
    features: [
      "24/7/365 availability, across time zones",
      "Manages unlimited tasks in parallel",
      "Perfect recall of every instruction",
      "Proactive, autonomous, and always learning"
    ],
    highlight: true,
    icon: "✓"
  }
];

const ValuePropositionSection = () => {
  const [sectionRef, isVisible] = useIntersectionObserver({ threshold: 0.2 });
  const [counterRef, animatedValue] = useAnimatedCounter(50000, 2500);

  return (
    <section ref={sectionRef} className="bg-gradient-to-br from-[#1e3799] to-[#0c2461] py-24">
      <div className="max-w-screen-xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-300 to-amber-300 bg-clip-text text-transparent mb-6">
            A New Paradigm of Assistance
          </h2>
          <p className="text-xl text-white/90 font-light max-w-4xl mx-auto">
            Stop juggling tasks and start multiplying your impact. See how Aiva stacks up against your other options.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {comparisonData.map((col, index) => (
            <div 
              key={col.title}
              className={`transition-all duration-700 delay-${index * 200} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} rounded-2xl p-8 h-full flex flex-col ${col.highlight ? 'bg-amber-400/10 border-2 border-amber-400' : 'bg-white/5 border border-white/10'}`}>
              
              <h3 className={`text-2xl font-bold mb-2 ${col.highlight ? 'text-amber-300' : 'text-white'}`}>{col.title}</h3>
              <p className={`text-sm mb-6 ${col.highlight ? 'text-amber-200/80' : 'text-white/60'}`}>{col.cost}</p>

              <div className="flex-grow">
                <ul className="space-y-3 text-white/90">
                  {col.features.map(feat => (
                    <li key={feat} className="flex items-start">
                      <span className={`mr-3 mt-1 ${col.highlight ? 'text-amber-400' : 'text-blue-400'}`}>{col.icon}</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {col.highlight && (
                <div ref={counterRef} className="mt-8 pt-6 border-t border-amber-400/20 text-center">
                  <p className="text-lg text-amber-300 font-light mb-1">Delivering Over</p>
                  <h3 className="text-5xl font-extrabold text-white">
                    <span className="text-amber-400">$</span>
                    {animatedValue.toLocaleString()}
                    <span className="text-amber-400">+</span>
                  </h3>
                  <p className="text-lg text-amber-300 font-light mt-1">Annual Value</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValuePropositionSection;
