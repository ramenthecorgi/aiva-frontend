import React, { useState } from 'react';
import HomeHeader from '../components/HomeHeader';
import Footer from '../components/Footer';
import BriefingsFeedAlt from '../components/BriefingsFeedAlt';
import TeachAiva from '../components/TeachAiva';
import IntegrationsPanel from '../components/IntegrationsPanel';

const Home = () => {
  const [activeTab, setActiveTab] = useState('briefings');
  
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Render the active component based on tab selection
  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'briefings':
        return <BriefingsFeedAlt />;
      case 'rules':
        return <TeachAiva />;
      case 'integrations':
        return <IntegrationsPanel />;
      default:
        return <BriefingsFeedAlt />;
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-[-1] bg-[radial-gradient(circle_at_20%_50%,#0a3d62_0%,transparent_50%),radial-gradient(circle_at_80%_20%,#0c2461_0%,transparent_50%),radial-gradient(circle_at_40%_80%,#1e3799_0%,transparent_50%)] animate-[bgShift_15s_ease-in-out_infinite]" />
      
      <HomeHeader activeTab={activeTab} onTabChange={handleTabChange} />
      
      <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 md:px-8 max-w-screen-xl mx-auto">
        
        {/* Active Component */}
        {renderActiveComponent()}
      </div>
      
      <Footer />
    </>
  );
};

export default Home;
