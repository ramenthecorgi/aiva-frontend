import React, { useState } from 'react';
import HomeHeader from '../components/HomeHeader';
import Footer from '../components/Footer';
import BriefingsFeedAlt from '../components/BriefingsFeedAlt';
import Settings from '../components/Settings';
import ChatTaskView from '../components/ChatTaskView';

const Home = () => {
  const [activeTab, setActiveTab] = useState('briefings');
  const [showChatTaskView, setShowChatTaskView] = useState(false);
  
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setShowChatTaskView(false); // Close chat task view when switching tabs
  };
  
  const handleChatClick = () => {
    setShowChatTaskView(true);
  };
  
  const handleCloseChatView = () => {
    setShowChatTaskView(false);
  };

  // Render the active component based on tab selection
  const renderActiveComponent = () => {
    // If chat task view is active, show it instead of the regular view
    if (showChatTaskView) {
      return <ChatTaskView onClose={handleCloseChatView} />;
    }
    
    // Otherwise show the regular tab content
    switch (activeTab) {
      case 'briefings':
        return <BriefingsFeedAlt />;
      case 'settings':
        return <Settings />;
      default:
        return <BriefingsFeedAlt />;
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-[-1] bg-[radial-gradient(circle_at_20%_50%,#0a3d62_0%,transparent_50%),radial-gradient(circle_at_80%_20%,#0c2461_0%,transparent_50%),radial-gradient(circle_at_40%_80%,#1e3799_0%,transparent_50%)] animate-[bgShift_15s_ease-in-out_infinite]" />
      
      <HomeHeader activeTab={activeTab} onTabChange={handleTabChange} onChatClick={handleChatClick} />
      
      <div className="h-screen overflow-hidden pt-24 px-4 sm:px-6 md:px-8 max-w-screen-xl mx-auto">
        {/* Active Component */}
        <div className="h-full overflow-hidden">
          {renderActiveComponent()}
        </div>
      </div>
    </>
  );
};

export default Home;
