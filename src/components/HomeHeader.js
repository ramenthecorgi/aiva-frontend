import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const HomeHeader = ({ activeTab = 'briefings', onTabChange }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <header className="fixed top-0 left-0 right-0 z-10 bg-[rgba(10,61,98,0.95)] backdrop-blur-md border-b border-white/10 py-5 px-4 sm:px-6 md:px-8 shadow-lg shadow-navy-900/20">
      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-[rgba(10,40,70,0.98)] backdrop-blur-md border-b border-white/10 shadow-lg shadow-navy-900/20 py-4 px-4 md:hidden animate-fadeIn">
          <nav className="flex flex-col space-y-2">
            <button
              onClick={() => {
                onTabChange('briefings');
                setMobileMenuOpen(false);
              }}
              className={`px-4 py-3 text-sm font-medium rounded-md transition-colors ${activeTab === 'briefings' ? 'bg-[rgba(255,255,255,0.1)] text-amber-100' : 'text-white/80 hover:text-white hover:bg-[rgba(255,255,255,0.05)]'}`}
            >
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
                Briefings
              </span>
            </button>
            <button
              onClick={() => {
                onTabChange('rules');
                setMobileMenuOpen(false);
              }}
              className={`px-4 py-3 text-sm font-medium rounded-md transition-colors ${activeTab === 'rules' ? 'bg-[rgba(255,255,255,0.1)] text-amber-100' : 'text-white/80 hover:text-white hover:bg-[rgba(255,255,255,0.05)]'}`}
            >
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
                Rules
              </span>
            </button>
            <button
              onClick={() => {
                onTabChange('integrations');
                setMobileMenuOpen(false);
              }}
              className={`px-4 py-3 text-sm font-medium rounded-md transition-colors ${activeTab === 'integrations' ? 'bg-[rgba(255,255,255,0.1)] text-amber-100' : 'text-white/80 hover:text-white hover:bg-[rgba(255,255,255,0.05)]'}`}
            >
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Integrations
              </span>
            </button>
          </nav>
        </div>
      )}
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">  
        <div className="flex items-center space-x-6">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-300 via-blue-100 to-amber-100 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">Aiva</div>
          
          {/* Main Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-1">
            <button
              onClick={() => onTabChange('briefings')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === 'briefings' ? 'bg-[rgba(255,255,255,0.1)] text-amber-100' : 'text-white/80 hover:text-white hover:bg-[rgba(255,255,255,0.05)]'}`}
            >
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
                Briefings
              </span>
            </button>
            <button
              onClick={() => onTabChange('rules')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === 'rules' ? 'bg-[rgba(255,255,255,0.1)] text-amber-100' : 'text-white/80 hover:text-white hover:bg-[rgba(255,255,255,0.05)]'}`}
            >
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
                Rules
              </span>
            </button>
            <button
              onClick={() => onTabChange('integrations')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === 'integrations' ? 'bg-[rgba(255,255,255,0.1)] text-amber-100' : 'text-white/80 hover:text-white hover:bg-[rgba(255,255,255,0.05)]'}`}
            >
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Integrations
              </span>
            </button>
          </nav>
        </div>

        <div className="flex items-center space-x-5">
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-white/80 hover:text-white transition-colors hover:bg-white/5 rounded-full"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
          {/* Notification Icon with Dropdown */}
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 text-white/80 hover:text-amber-100 transition-colors mr-4 hover:bg-white/5 rounded-full"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute -top-1 -right-1 bg-amber-400 text-xs text-navy-900 font-semibold rounded-full h-4 w-4 flex items-center justify-center">
              3
            </span>
          </button>
          
          {/* Notification Dropdown */}
          {showNotifications && (
            <div className="notification-dropdown absolute right-0 top-full mt-3 w-96 bg-[rgba(10,40,70,0.95)] backdrop-blur-md border border-white/10 rounded-xl shadow-xl p-4 text-white animate-fadeIn">
              <h3 className="text-base font-medium mb-3 border-b border-white/10 pb-2">Notifications</h3>
              <div className="space-y-3">
                {/* Notification Item 1 */}
                <div className="p-3 hover:bg-white/5 rounded-lg transition-colors cursor-pointer border border-transparent hover:border-white/10">
                  <div className="flex items-start">
                    <div className="h-10 w-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 mr-3 shadow-inner shadow-purple-900/10">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">New message from <span className="font-medium">Sarah</span></p>
                      <p className="text-xs text-white/60 mt-1">Hey, how's the project going?</p>
                      <p className="text-xs text-white/40 mt-1">2 minutes ago</p>
                    </div>
                  </div>
                </div>
                
                {/* Notification Item 2 */}
                <div className="p-3 hover:bg-white/5 rounded-lg transition-colors cursor-pointer border border-transparent hover:border-white/10">
                  <div className="flex items-start">
                    <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 mr-3 shadow-inner shadow-blue-900/10">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Your task <span className="font-medium">"Design Review"</span> is complete</p>
                      <p className="text-xs text-white/40 mt-1">1 hour ago</p>
                    </div>
                  </div>
                </div>
                
                {/* Notification Item 3 */}
                <div className="p-3 hover:bg-white/5 rounded-lg transition-colors cursor-pointer border border-transparent hover:border-white/10">
                  <div className="flex items-start">
                    <div className="h-10 w-10 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-400 mr-3 shadow-inner shadow-pink-900/10">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Meeting reminder: <span className="font-medium">Team Standup</span></p>
                      <p className="text-xs text-white/60 mt-1">Starts in 30 minutes</p>
                      <p className="text-xs text-white/40 mt-1">Yesterday</p>
                    </div>
                  </div>
                </div>
                
                {/* New Notification Item */}
                <div className="p-3 hover:bg-white/5 rounded-lg transition-colors cursor-pointer border border-transparent hover:border-white/10">
                  <div className="flex items-start">
                    <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 mr-3 shadow-inner shadow-blue-900/10">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Email to John scheduled for tomorrow</p>
                      <p className="text-xs text-white/60 mt-1">2 minutes ago</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-2 border-t border-white/10">
                <button className="w-full py-2 text-sm text-center text-white/80 hover:bg-white/10 rounded-md transition-colors">
                  View all notifications
                </button>
              </div>
            </div>
          )}
          
          {/* Settings Icon */}
          <button className="p-2 text-white/80 hover:text-white transition-colors hover:bg-white/5 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
          
          {/* Account Icon */}
          <div className="relative group">
          <button className="flex items-center justify-center h-8 w-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold shadow-lg hover:shadow-xl transition">
            <span>A</span>
          </button>
          <div className="absolute right-0 mt-2 w-48 bg-[rgba(20,20,20,0.9)] backdrop-blur-lg rounded-lg shadow-lg border border-white/10 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200">
            <div className="p-3 border-b border-white/10">
              <p className="text-sm font-medium text-white">User Account</p>
              <p className="text-xs text-white/60">user@example.com</p>
            </div>
            <div className="p-2">
              <Link to="/profile" className="block px-4 py-2 text-sm text-white/80 hover:bg-white/10 rounded-md transition-colors">
                Profile
              </Link>
              <Link to="/settings" className="block px-4 py-2 text-sm text-white/80 hover:bg-white/10 rounded-md transition-colors">
                Account Settings
              </Link>
              <Link to="/" className="block px-4 py-2 text-sm text-pink-400 hover:bg-white/10 rounded-md transition-colors">
                Sign Out
              </Link>
            </div>
          </div>
        </div>
      </div>
      </div>
    </header>
  );
};

export default HomeHeader;
