import React from "react";

const valueProps = [
  {
    icon: "⏰",
    title: "Save 10+ Hours Weekly",
    description: "Reclaim your time from repetitive tasks and focus on what drives results.",
    benefit: "Worth $2,000+ per week for executives"
  },
  {
    icon: "📈",
    title: "3x Productivity Boost",
    description: "Handle more strategic work while Aiva manages the operational details.",
    benefit: "Complete 3x more high-value tasks"
  },
  {
    icon: "🧘",
    title: "Reduce Stress by 70%",
    description: "Never miss important tasks or deadlines with Aiva's proactive management.",
    benefit: "Better work-life balance guaranteed"
  },
  {
    icon: "🚀",
    title: "Instant Implementation",
    description: "Get started in minutes, not months. No complex setup or training required.",
    benefit: "ROI from day one"
  }
];

const beforeAfter = [
  {
    before: "Spending 2+ hours daily on email and scheduling",
    after: "15 minutes reviewing Aiva's prioritized summaries"
  },
  {
    before: "Missing important follow-ups and deadlines",
    after: "Proactive reminders and automated follow-ups"
  },
  {
    before: "Context switching between 10+ different tools",
    after: "One intelligent assistant across all platforms"
  },
  {
    before: "Working evenings to catch up on admin tasks",
    after: "Leaving work on time with everything handled"
  }
];

const ValuePropositionSection = () => (
  <section className="bg-gradient-to-br from-[#1e3799] to-[#0c2461] py-24">
    <div className="max-w-screen-xl mx-auto px-6">
      {/* Main Value Prop */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-300 to-amber-300 bg-clip-text text-transparent mb-6">
          The ROI is Immediate
        </h2>
        <p className="text-xl text-white/90 font-light max-w-3xl mx-auto mb-8">
          Stop losing money to inefficiency. Aiva pays for herself in the first week.
        </p>
        <div className="bg-[rgba(10,61,98,0.4)] backdrop-blur-xl border border-amber-400/30 rounded-3xl p-8 max-w-2xl mx-auto">
          <div className="text-3xl font-extrabold text-amber-400 mb-2">$50,000+ Annual Value</div>
          <div className="text-white/80">Average value created per professional through time savings and productivity gains</div>
        </div>
      </div>



      {/* Before/After Comparison */}
      <div className="bg-[rgba(10,61,98,0.3)] backdrop-blur-xl border border-white/10 rounded-3xl p-8">
        <h3 className="text-2xl font-bold text-white text-center mb-8">Your Day: Before vs After Aiva</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Before */}
          <div>
            <h4 className="text-lg font-semibold text-red-300 mb-4 flex items-center">
              <span className="mr-2">😰</span> Before Aiva
            </h4>
            <div className="space-y-3">
              {beforeAfter.map((item, idx) => (
                <div key={idx} className="flex items-start">
                  <span className="text-red-400 mr-3 mt-1">✗</span>
                  <span className="text-white/70 text-sm">{item.before}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* After */}
          <div>
            <h4 className="text-lg font-semibold text-green-300 mb-4 flex items-center">
              <span className="mr-2">🎯</span> With Aiva
            </h4>
            <div className="space-y-3">
              {beforeAfter.map((item, idx) => (
                <div key={idx} className="flex items-start">
                  <span className="text-green-400 mr-3 mt-1">✓</span>
                  <span className="text-white/90 text-sm">{item.after}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default ValuePropositionSection;
