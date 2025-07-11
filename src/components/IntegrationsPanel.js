import React, { useState } from 'react';

const IntegrationsPanel = () => {
  // State for integration statuses
  const [gmailConnected, setGmailConnected] = useState(true);
  const [slackConnected, setSlackConnected] = useState(false);
  const [slackChannel, setSlackChannel] = useState('');
  const [testEmailSent, setTestEmailSent] = useState(false);

  // Sample Gmail scopes
  const gmailScopes = [
    { name: 'Read emails', granted: true },
    { name: 'Send emails', granted: true },
    { name: 'Modify labels', granted: true },
    { name: 'Access calendar', granted: true }
  ];

  // Sample Slack channels
  const slackChannels = [
    { id: 'general', name: '#general' },
    { id: 'random', name: '#random' },
    { id: 'announcements', name: '#announcements' },
    { id: 'team-updates', name: '#team-updates' }
  ];

  // Handle Gmail reconnect
  const handleGmailReconnect = () => {
    console.log('Reconnecting to Gmail...');
    // In a real app, this would redirect to OAuth flow
    setTimeout(() => setGmailConnected(true), 1000);
  };

  // Handle sending test email
  const handleSendTestEmail = () => {
    console.log('Sending test email...');
    setTestEmailSent(true);
    // Reset the notification after 3 seconds
    setTimeout(() => setTestEmailSent(false), 3000);
  };

  // Handle Slack connect/disconnect
  const handleSlackToggle = () => {
    if (slackConnected) {
      setSlackConnected(false);
      setSlackChannel('');
    } else {
      console.log('Connecting to Slack...');
      // In a real app, this would redirect to Slack OAuth
      setTimeout(() => {
        setSlackConnected(true);
        setSlackChannel('general');
      }, 1000);
    }
  };

  // Handle Slack channel change
  const handleChannelChange = (e) => {
    setSlackChannel(e.target.value);
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h2 className="text-3xl font-bold mb-6 text-blue-100 drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">Integrations</h2>
      
      {/* Gmail Section */}
      <div className="bg-[rgba(255,255,255,0.1)] backdrop-blur-sm rounded-xl p-6 mb-8 border border-white/10 shadow-lg shadow-purple-900/10 transition-all hover:border-white/20">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mr-4 shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28">
                <path fill="#EA4335" d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-medium text-blue-100">Gmail</h2>
              <p className="text-sm text-amber-100/70">
                {gmailConnected ? 'Connected' : 'Not connected'}
              </p>
            </div>
          </div>
          <div>
            <button 
              onClick={handleGmailReconnect}
              className="px-4 py-1.5 text-sm bg-gradient-to-r from-amber-400 to-amber-500 text-navy-900 font-medium rounded-md hover:opacity-90 transition-opacity shadow-sm shadow-amber-900/20"
            >
              Reconnect
            </button>
          </div>
        </div>
        
        {gmailConnected && (
          <>
            <div className="mb-5">
              <h3 className="text-sm font-medium text-blue-100 mb-3">Permissions Granted</h3>
              <div className="grid grid-cols-2 gap-3">
                {gmailScopes.map((scope, index) => (
                  <div key={index} className="flex items-center">
                    <span className="inline-block w-4 h-4 rounded-full bg-green-500 mr-2"></span>
                    <span className="text-sm text-amber-100/80">{scope.name}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex items-center">
              <button 
                onClick={handleSendTestEmail}
                className="px-4 py-1.5 text-sm bg-gradient-to-r from-amber-400 to-amber-500 text-navy-900 font-medium rounded-md hover:opacity-90 transition-opacity mr-3 shadow-sm shadow-amber-900/20"
              >
                Send Test Email
              </button>
              {testEmailSent && (
                <span className="text-sm text-green-400">Test email sent!</span>
              )}
            </div>
          </>
        )}
      </div>
      
      {/* Slack Section */}
      <div className="bg-[rgba(255,255,255,0.1)] backdrop-blur-sm rounded-xl p-6 mb-8 border border-white/10 shadow-lg shadow-purple-900/10 transition-all hover:border-white/20">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mr-4 shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28">
                <path fill="#4A154B" d="M6 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 3a6 6 0 1 1 0-12 6 6 0 0 1 0 12zM6 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 3a6 6 0 1 1 0-12 6 6 0 0 1 0 12zm12-3a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 3a6 6 0 1 1 0-12 6 6 0 0 1 0 12z"/>
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-medium text-blue-100">Slack</h2>
              <p className="text-sm text-amber-100/70">
                {slackConnected ? 'Connected' : 'Not connected'}
              </p>
            </div>
          </div>
          <div>
            <button 
              onClick={handleSlackToggle}
              className={`px-3 py-1 text-sm ${
                slackConnected 
                  ? 'bg-red-500/80 hover:bg-red-500 text-white' 
                  : 'bg-gradient-to-r from-amber-400 to-amber-500 text-navy-900 font-medium'
              } rounded-md hover:opacity-90 transition-opacity shadow-sm`}
            >
              {slackConnected ? 'Disconnect' : 'Connect'}
            </button>
          </div>
        </div>
        
        {slackConnected && (
          <div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-blue-100 mb-2">
                Choose notification channel
              </label>
              <select
                value={slackChannel}
                onChange={handleChannelChange}
                className="w-full p-3 bg-[rgba(10,61,98,0.3)] border border-white/20 rounded-lg text-blue-100 focus:outline-none focus:ring-2 focus:ring-amber-400/30 shadow-inner shadow-black/5"
              >
                <option value="">Select a channel</option>
                {slackChannels.map(channel => (
                  <option key={channel.id} value={channel.id}>
                    {channel.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="text-sm text-amber-100/70">
              <p>Aiva will post updates and notifications to your selected Slack channel.</p>
            </div>
          </div>
        )}
      </div>
      
      {/* Future Integrations Section */}
      <div className="bg-[rgba(10,61,98,0.3)] backdrop-blur-sm rounded-xl p-6 border border-white/5 shadow-md shadow-navy-900/10">
        <h2 className="text-xl font-medium text-blue-100 mb-4 border-b border-amber-200/20 pb-2">Coming Soon</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          {/* Gmail Integration */}
          <div className="bg-[rgba(10,61,98,0.4)] backdrop-blur-sm rounded-xl p-6 border border-white/10 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center mb-4">
              <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center mr-4 shadow-inner">
                <svg className="h-7 w-7 text-red-500" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-medium text-blue-100">Gmail</h3>
                <p className="text-amber-100/60 text-sm">{gmailConnected ? 'Connected' : 'Not connected'}</p>
              </div>
            </div>
            
            <div className="mb-5">
              <h3 className="text-sm font-medium text-blue-100 mb-3">Permissions Granted</h3>
              <div className="grid grid-cols-2 gap-3">
                {gmailScopes.map((scope, index) => (
                  <div key={index} className="flex items-center">
                    <span className="inline-block w-4 h-4 rounded-full bg-green-500 mr-2"></span>
                    <span className="text-sm text-amber-100/80">{scope.name}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex items-center">
              <button 
                onClick={handleSendTestEmail}
                className="px-4 py-1.5 text-sm bg-gradient-to-r from-amber-400 to-amber-500 text-navy-900 font-medium rounded-md hover:opacity-90 transition-opacity mr-3 shadow-sm shadow-amber-900/20"
              >
                Send Test Email
              </button>
              {testEmailSent && (
                <span className="text-sm text-green-400">Test email sent!</span>
              )}
            </div>
          </div>
          
          {/* Drive Integration */}
          <div className="flex items-center p-4 bg-[rgba(10,61,98,0.25)] rounded-xl hover:bg-[rgba(10,61,98,0.35)] transition-colors">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mr-3 shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-400/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-medium text-blue-100">Google Drive</h3>
              <p className="text-xs text-amber-100/60">File management and document organization</p>
            </div>
          </div>
          
          {/* Zoom Integration */}
          <div className="flex items-center p-4 bg-[rgba(10,61,98,0.25)] rounded-xl hover:bg-[rgba(10,61,98,0.35)] transition-colors">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mr-3 shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-400/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-medium text-blue-100">Zoom</h3>
              <p className="text-xs text-amber-100/60">Video meeting scheduling and management</p>
            </div>
          </div>
          
          {/* Notion Integration */}
          <div className="flex items-center p-4 bg-[rgba(10,61,98,0.25)] rounded-xl hover:bg-[rgba(10,61,98,0.35)] transition-colors">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mr-3 shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-400/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-medium text-blue-100">Notion</h3>
              <p className="text-xs text-amber-100/60">Knowledge base and note synchronization</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntegrationsPanel;
