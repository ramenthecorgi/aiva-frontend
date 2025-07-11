import React, { useState } from 'react';
import HomeHeader from '../components/HomeHeader';
import Footer from '../components/Footer';
import BriefingsFeed from '../components/BriefingsFeed';
import RulesManager from '../components/RulesManager';
import IntegrationsPanel from '../components/IntegrationsPanel';

const Home = () => {
  const [activeTab, setActiveTab] = useState('briefings');

  // Render the active component based on tab selection
  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'briefings':
        return <BriefingsFeed />;
      case 'rules':
        return <RulesManager />;
      case 'integrations':
        return <IntegrationsPanel />;
      default:
        return <BriefingsFeed />;
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-[-1] bg-[radial-gradient(circle_at_20%_50%,#ff006e_0%,transparent_50%),radial-gradient(circle_at_80%_20%,#8338ec_0%,transparent_50%),radial-gradient(circle_at_40%_80%,#3a86ff_0%,transparent_50%)] animate-[bgShift_15s_ease-in-out_infinite]" />
      
      <HomeHeader />
      
      <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 md:px-8 max-w-screen-xl mx-auto">
        {/* Tab Navigation */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex bg-[rgba(255,255,255,0.15)] backdrop-blur-sm rounded-xl p-1.5 shadow-lg shadow-navy-900/10 border border-white/10">
            <button
              onClick={() => setActiveTab('briefings')}
              className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${activeTab === 'briefings' ? 'bg-[#0a3d62] text-white' : 'text-white/80 hover:text-white hover:bg-[rgba(255,255,255,0.05)]'}`}
            >
              <span className="flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
                Briefings
              </span>
            </button>
            <button
              onClick={() => setActiveTab('rules')}
              className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${activeTab === 'rules' ? 'bg-[#0a3d62] text-white' : 'text-white/80 hover:text-white hover:bg-[rgba(255,255,255,0.05)]'}`}
            >
              <span className="flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
                Rules
              </span>
            </button>
            <button
              onClick={() => setActiveTab('integrations')}
              className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${activeTab === 'integrations' ? 'bg-[#0a3d62] text-white' : 'text-white/80 hover:text-white hover:bg-[rgba(255,255,255,0.05)]'}`}
            >
              <span className="flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Integrations
              </span>
            </button>
          </div>
        </div>
        
        {/* Active Component */}
        {renderActiveComponent()}
      </div>
      
      <Footer />
    </>
  );
};

export default Home;
