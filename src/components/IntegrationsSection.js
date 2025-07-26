import React from "react";

const integrations = [
  {
    persona: 'Corporate & Tech Leadership',
    tools: ['Slack', 'Google Workspace', 'Notion'],
    examples: ['Auto-summarize meetings', 'Schedule follow-ups', 'Generate status reports']
  },
  {
    persona: 'Small Biz & Self-Employed',
    tools: ['Shopify', 'Stripe', 'QuickBooks'],
    examples: ['Invoice reminders', 'Order tracking', 'Customer support']
  },
  {
    persona: 'Influencers & Academics',
    tools: ['Twitter', 'LinkedIn', 'Eventbrite'],
    examples: ['Auto-post updates', 'Manage RSVPs', 'Content scheduling']
  },
  {
    persona: 'Working Parents',
    tools: ['Google Calendar', 'WhatsApp', 'Zoom'],
    examples: ['Coordinate family schedules', 'Send reminders', 'Meeting management']
  }
];

const IntegrationsSection = () => (
  <section className="bg-gradient-to-br from-[#1e3799] to-[#0c2461] py-24">
    <div className="max-w-screen-xl mx-auto px-6">
      <h2 className="text-4xl md:text-5xl font-extrabold text-center bg-gradient-to-r from-blue-300 to-amber-300 bg-clip-text text-transparent mb-6">
        Works with the Tools You Use
      </h2>
      <p className="text-center text-lg text-gray-300 font-light max-w-3xl mx-auto mb-16">
        Aiva connects to your favorite tools to automate workflows and save you time. Here's how she helps different professionals:
      </p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {integrations.map((integration, idx) => (
          <div key={idx} className="bg-[rgba(10,61,98,0.3)] backdrop-blur-xl border border-white/10 rounded-3xl p-8 transition-all hover:scale-[1.02] hover:shadow-xl hover:border-amber-400/30">
            <h3 className="text-xl font-bold text-white mb-4">{integration.persona}</h3>
            
            {/* Tools */}
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-amber-300 mb-2">INTEGRATES WITH:</h4>
              <div className="flex flex-wrap gap-2">
                {integration.tools.map((tool, toolIdx) => (
                  <span key={toolIdx} className="px-3 py-1 bg-gradient-to-r from-amber-400/20 to-amber-500/20 border border-amber-400/30 rounded-full text-sm text-amber-200">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Examples */}
            <div>
              <h4 className="text-sm font-semibold text-blue-300 mb-2">AUTOMATION EXAMPLES:</h4>
              <ul className="space-y-1">
                {integration.examples.map((example, exampleIdx) => (
                  <li key={exampleIdx} className="text-gray-300 text-sm flex items-start">
                    <span className="text-amber-400 mr-2">•</span>
                    {example}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default IntegrationsSection;
