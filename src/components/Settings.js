import React, { useState } from 'react';
import TeachAiva from './TeachAiva';
import IntegrationsPanel from './IntegrationsPanel';

const Settings = () => {
  const [activeSection, setActiveSection] = useState('general');

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'general':
        return (
          <div className="p-6 bg-[rgba(10,61,98,0.4)] rounded-2xl border border-white/10">
            <h2 className="text-xl font-semibold text-white mb-6">General Settings</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-white/90 mb-2">Account</h3>
                <div className="bg-[rgba(255,255,255,0.05)] p-4 rounded-xl">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="font-medium text-white">user@example.com</p>
                      <p className="text-sm text-white/60">Pro Plan</p>
                    </div>
                    <button className="px-4 py-2 bg-amber-500/20 text-amber-100 rounded-lg text-sm hover:bg-amber-500/30 transition-colors">
                      Manage Account
                    </button>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-white/90 mb-2">Preferences</h3>
                <div className="bg-[rgba(255,255,255,0.05)] p-4 rounded-xl space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-white">Dark Mode</p>
                      <p className="text-sm text-white/60">Use dark theme</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-[rgba(255,255,255,0.1)] rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-amber-400 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500/30"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-white">Notifications</p>
                      <p className="text-sm text-white/60">Enable push notifications</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-[rgba(255,255,255,0.1)] rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-amber-400 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500/30"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'teach':
        return <TeachAiva />;
      case 'integrations':
        return <IntegrationsPanel />;
      default:
        return <div>Select a section</div>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Navigation */}
        <div className="w-full md:w-64 shrink-0">
          <div className="bg-[rgba(10,61,98,0.4)] rounded-2xl border border-white/10 p-4">
            <nav className="space-y-1">
              <button
                onClick={() => setActiveSection('general')}
                className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 ${
                  activeSection === 'general' 
                    ? 'bg-[rgba(255,255,255,0.1)] text-amber-100' 
                    : 'text-white/80 hover:bg-[rgba(255,255,255,0.05)] hover:text-white'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>General</span>
              </button>
              
              <button
                onClick={() => setActiveSection('teach')}
                className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 ${
                  activeSection === 'teach' 
                    ? 'bg-[rgba(255,255,255,0.1)] text-amber-100' 
                    : 'text-white/80 hover:bg-[rgba(255,255,255,0.05)] hover:text-white'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>Teach Aiva</span>
              </button>
              
              <button
                onClick={() => setActiveSection('integrations')}
                className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 ${
                  activeSection === 'integrations' 
                    ? 'bg-[rgba(255,255,255,0.1)] text-amber-100' 
                    : 'text-white/80 hover:bg-[rgba(255,255,255,0.05)] hover:text-white'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>Integrations</span>
              </button>
            </nav>
          </div>
        </div>
        
        {/* Main Content Area */}
        <div className="flex-1">
          {renderActiveSection()}
        </div>
      </div>
    </div>
  );
};

export default Settings;
