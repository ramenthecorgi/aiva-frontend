import React, { useState } from "react";

const demoScenarios = [
  {
    id: "email",
    title: "Smart Email Management",
    description: "Watch Aiva prioritize, summarize, and draft responses",
    steps: [
      "Aiva scans your inbox and identifies 3 urgent emails from 47 total",
      "Creates executive summaries for each priority message",
      "Drafts responses in your voice and style",
      "Schedules follow-up reminders automatically"
    ]
  },
  {
    id: "scheduling",
    title: "Intelligent Scheduling",
    description: "See how Aiva coordinates complex calendars",
    steps: [
      "Client requests meeting via email",
      "Aiva checks your calendar and preferences",
      "Suggests optimal times considering your energy levels",
      "Sends calendar invite and prep materials automatically"
    ]
  },
  {
    id: "workflow",
    title: "AI Phone Calls",
    description: "Watch Aiva handle those painful government calls you've been avoiding",
    steps: [
      "You need to renew your driver's license but dread calling the DMV",
      "Aiva calls the DMV and waits through the 45-minute hold time",
      "Navigates complex phone menus and speaks with representatives",
      "Schedules your appointment and sends you all the required documents"
    ]
  }
];

const workflowSteps = [
  {
    step: "1",
    title: "Connect Your Tools",
    description: "Aiva integrates with your existing workflow in minutes",
    icon: "🔗"
  },
  {
    step: "2", 
    title: "Learn Your Style",
    description: "She observes your patterns and preferences",
    icon: "🧠"
  },
  {
    step: "3",
    title: "Take Action",
    description: "Aiva handles routine tasks proactively",
    icon: "⚡"
  },
  {
    step: "4",
    title: "Optimize & Scale",
    description: "Continuously improves and takes on more responsibilities",
    icon: "📈"
  }
];

const DemoSection = () => {
  const [activeDemo, setActiveDemo] = useState("email");

  return (
    <section id="demo" className="bg-gradient-to-br from-[#0a3d62] to-[#1e3799] py-24">
      <div className="max-w-screen-xl mx-auto px-6">
        {/* Demo Selector */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-300 to-amber-300 bg-clip-text text-transparent mb-6">
            See Aiva in Action
          </h2>
          <p className="text-xl text-white/90 font-light max-w-3xl mx-auto mb-12">
            Choose a scenario to see how Aiva transforms your daily workflow
          </p>
          
          {/* Demo Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {demoScenarios.map((scenario) => (
              <button
                key={scenario.id}
                onClick={() => setActiveDemo(scenario.id)}
                className={`px-6 py-3 rounded-full font-semibold transition-all ${
                  activeDemo === scenario.id
                    ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-navy-900'
                    : 'bg-[rgba(10,61,98,0.3)] text-white/80 border border-white/20 hover:border-amber-400/50'
                }`}
              >
                {scenario.title}
              </button>
            ))}
          </div>
        </div>

        {/* Active Demo */}
        <div className="bg-[rgba(10,61,98,0.3)] backdrop-blur-xl border border-white/10 rounded-3xl p-8 mb-16">
          {demoScenarios.map((scenario) => (
            activeDemo === scenario.id && (
              <div key={scenario.id}>
                <h3 className="text-2xl font-bold text-white mb-4">{scenario.title}</h3>
                <p className="text-white/80 mb-8">{scenario.description}</p>
                
                {/* Demo Steps */}
                <div className="space-y-4">
                  {scenario.steps.map((step, idx) => (
                    <div key={idx} className="flex items-start">
                      <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full flex items-center justify-center text-navy-900 font-bold text-sm mr-4 mt-1">
                        {idx + 1}
                      </div>
                      <div className="text-white/90 leading-relaxed">{step}</div>
                    </div>
                  ))}
                </div>
                
                {/* Mock Interface */}
                <div className="mt-8 bg-[rgba(0,0,0,0.3)] rounded-xl p-6 border border-white/5">
                  <div className="text-center text-white/60 italic">
                    Interactive demo video placeholder
                  </div>
                </div>
              </div>
            )
          ))}
        </div>
      </div>
    </section>
  );
};

export default DemoSection;
