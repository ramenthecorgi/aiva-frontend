import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const HomeHeader = ({ activeTab = 'briefings', onTabChange, onChatClick }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-10 bg-[rgba(10,61,98,0.95)] backdrop-blur-md border-b border-white/10 py-5 px-4 sm:px-6 md:px-8 shadow-lg shadow-navy-900/20">
      <div className="max-w-screen-xl mx-auto flex items-center">  
        <button 
          onClick={() => onTabChange('briefings')}
          className="text-2xl font-bold bg-gradient-to-r from-blue-300 via-blue-100 to-amber-100 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:opacity-90 transition-opacity mr-6 flex-shrink-0"
        >
          Aiva
        </button>
        
        {/* Chat Input */}
        <div className="flex flex-1 mr-4">
          <div className="relative w-full">
            <button 
              onClick={onChatClick}
              className="w-full flex items-center bg-[rgba(255,255,255,0.12)] border border-white/15 rounded-md shadow-inner shadow-black/20 py-2.5 px-4 text-sm text-white/70 hover:bg-[rgba(255,255,255,0.15)] hover:border-white/20 transition-all duration-200 text-left"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-amber-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Chat with Aiva to assign a new task...
            </button>
          </div>
        </div>

        {/* Settings Icon */}
        <button 
          onClick={() => onTabChange('settings')}
          className="flex items-center justify-center h-8 w-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold shadow-lg hover:shadow-xl transition"
          aria-label="Settings"
        >
          <span>A</span>
        </button>
      </div>
      
     </header>
  );
};

export default HomeHeader;
