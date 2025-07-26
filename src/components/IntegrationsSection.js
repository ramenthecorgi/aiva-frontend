import React from "react";
import { useIntersectionObserver } from '../hooks/useScrollAnimation';

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

const IntegrationsSection = () => {
  const [sectionRef, isVisible] = useIntersectionObserver({ threshold: 0.1 });
  
  return (
  <section ref={sectionRef} className="bg-gradient-to-br from-[#1e3799] to-[#0a3d62] py-24">
    <div className="max-w-screen-xl mx-auto px-6">
      <h2 className="text-4xl md:text-5xl font-extrabold text-center bg-gradient-to-r from-blue-300 to-amber-300 bg-clip-text text-transparent mb-6">
        Works with the Tools You Use
      </h2>
      <p className="text-center text-lg text-gray-300 font-light max-w-3xl mx-auto mb-16">
        Aiva connects to your favorite tools to automate workflows and save you time. Here's how she helps different professionals:
      </p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {integrations.map((integration, idx) => (
          <div 
            key={idx} 
            className={`bg-[rgba(10,61,98,0.3)] backdrop-blur-xl border border-white/10 rounded-3xl p-8 transition-all duration-700 ${
              isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-12'
            }`}
            style={{
              transitionDelay: `${idx * 200}ms`
            }}
          >
            <h3 className="text-xl font-bold text-white mb-4">{integration.persona}</h3>
            
            {/* Tools */}
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-amber-300 mb-2">INTEGRATES WITH:</h4>
              <div className="flex flex-wrap gap-3">
                {integration.tools.map((tool, toolIdx) => (
                  <div key={toolIdx} className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/20 hover:border-amber-400/50 transition-colors">
                    <div className="w-6 h-6 rounded mr-2 flex items-center justify-center text-xs font-bold" 
                         style={{
                           backgroundColor: 
                             tool === 'Slack' ? '#4A154B' :
                             tool === 'Google Workspace' ? '#4285F4' :
                             tool === 'Notion' ? '#000000' :
                             tool === 'Outlook' ? '#0078D4' :
                             tool === 'DocuSign' ? '#FFB800' :
                             tool === 'Calendly' ? '#006BFF' :
                             tool === 'Shopify' ? '#96BF48' :
                             tool === 'Stripe' ? '#635BFF' :
                             tool === 'QuickBooks' ? '#0077C5' :
                             tool === 'Twitter' ? '#1DA1F2' :
                             tool === 'LinkedIn' ? '#0A66C2' :
                             tool === 'Eventbrite' ? '#F05537' :
                             tool === 'Google Calendar' ? '#4285F4' :
                             tool === 'WhatsApp' ? '#25D366' :
                             tool === 'Zoom' ? '#2D8CFF' :
                             '#666666',
                           color: 'white'
                         }}>
                      {tool.charAt(0)}
                    </div>
                    <span className="text-white/90 text-sm font-medium">{tool}</span>
                  </div>
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
};

export default IntegrationsSection;
