import React, { useState } from 'react';
import './TeachAiva.css';

// Sample data for preferences/instructions
const samplePreferences = [
  {
    id: 1,
    description: 'If someone from finance emails me, prioritize it',
    active: true,
    isDefault: false,
    priority: 1
  },
  {
    id: 2,
    description: 'Forward all emails from my boss to my personal email',
    active: true,
    isDefault: false,
    priority: 2
  },
  {
    id: 3,
    description: 'Schedule all meeting requests for afternoons only',
    active: true,
    isDefault: false,
    priority: 3
  }
];

// Sample default preferences
const defaultPreferences = [
  {
    id: 101,
    description: 'Send me a daily summary of unread emails at 8am',
    active: true,
    isDefault: true,
    priority: 1
  },
  {
    id: 102,
    description: 'Notify me about calendar conflicts',
    active: true,
    isDefault: true,
    priority: 2
  },
  {
    id: 103,
    description: 'Summarize long emails (>500 words)',
    active: false,
    isDefault: true,
    priority: 3
  }
];

const TeachAiva = () => {
  const [userPreferences, setUserPreferences] = useState(samplePreferences);
  const [systemPreferences, setSystemPreferences] = useState(defaultPreferences);
  const [newPreferenceText, setNewPreferenceText] = useState('');
  const [editingPreference, setEditingPreference] = useState(null);

  const [showConversation, setShowConversation] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [backgroundBlurred, setBackgroundBlurred] = useState(false);
  const [conversation, setConversation] = useState([]);
  const [userMessage, setUserMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentRuleSynthesis, setCurrentRuleSynthesis] = useState('');

  const openConversationModal = () => {
    setIsClosing(false);
    setShowConversation(true);
    setBackgroundBlurred(true);

    if (newPreferenceText.trim()) {
      const initialMessage = { role: 'user', content: newPreferenceText };
      setConversation([initialMessage]);
      setCurrentRuleSynthesis(newPreferenceText);
      setTimeout(() => addAivaResponse(newPreferenceText), 500);
      setNewPreferenceText('');
    } else {
      setConversation([]);
      setCurrentRuleSynthesis('');
    }
  };


  const addAivaResponse = (userInput) => {
    setIsProcessing(true);
    setTimeout(() => {
      let aivaMessage = { role: 'assistant', content: '' };
      const userMessages = [...conversation, { role: 'user', content: userInput }]
        .filter(msg => msg.role === 'user')
        .map(msg => msg.content);
      let synthesizedRule = userMessages.join(' ');
      if (synthesizedRule.length > 80) {
        synthesizedRule = synthesizedRule.substring(0, 80) + '...';
      }
      setCurrentRuleSynthesis(synthesizedRule);

      if (conversation.length === 1) {
        aivaMessage.content = `I understand you want me to "${userInput}". Can you tell me more about when and how you'd like me to do this?`;
      } else if (conversation.length === 3) {
        aivaMessage.content = `Thanks for explaining. Would you like me to perform this task automatically, or would you prefer I ask for confirmation each time?`;
      } else {
        aivaMessage.content = `I've updated the rule. Is there anything else you'd like to add or modify?`;
      }
      setConversation(prev => [...prev, aivaMessage]);
      setIsProcessing(false);
    }, 1000);
  };

  const handleSendMessage = () => {
    if (!userMessage.trim()) return;
    const newUserMessage = { role: 'user', content: userMessage };
    setConversation(prev => [...prev, newUserMessage]);
    setUserMessage('');
    addAivaResponse(userMessage);
  };

  const finalizePreference = () => {
    if (currentRuleSynthesis) {
      const newPreference = {
        id: Date.now(),
        description: currentRuleSynthesis,
        active: true,
        isDefault: false,
        priority: userPreferences.length + 1
      };
      setUserPreferences(prev => [...prev, newPreference]);
      closeConversation();
    }
  };

  const closeConversation = () => {
    setIsClosing(true);
    setBackgroundBlurred(false); // Start background animation at the same time as modal closing
    setUserMessage('');
    setCurrentRuleSynthesis('');
  };

  const handleEditPreference = (preference) => {
    setEditingPreference(preference);
    setNewPreferenceText(preference.description);
  };

  const handleSaveEdit = () => {
    if (!newPreferenceText.trim() || !editingPreference) return;
    const updatedPreferences = userPreferences.map(p =>
      p.id === editingPreference.id ? { ...p, description: newPreferenceText } : p
    );
    setUserPreferences(updatedPreferences);
    setNewPreferenceText('');
    setEditingPreference(null);
  };

  const handleDeletePreference = (id) => {
    setUserPreferences(userPreferences.filter(p => p.id !== id));
  };

  const handleTogglePreference = (id, isDefault) => {
    const list = isDefault ? systemPreferences : userPreferences;
    const setter = isDefault ? setSystemPreferences : setUserPreferences;
    setter(list.map(p => (p.id === id ? { ...p, active: !p.active } : p)));
  };

  const PreferenceCard = ({ preference, isDefault }) => (
    <div className={`bg-[rgba(10,61,98,0.4)] backdrop-blur-sm rounded-xl p-5 mb-4 border ${preference.active ? 'border-white/10 shadow-md shadow-navy-900/20' : 'border-white/5 opacity-60'} transition-all`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center flex-1">
          {!isDefault && (
            <div className="mr-3 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            </div>
          )}
          <p className={`text-sm ${preference.active ? 'text-white' : 'text-white/70'}`}>
            {preference.description}
          </p>
        </div>
        <div className="flex items-center">
          <label className="inline-flex items-center cursor-pointer mr-3">
            <input type="checkbox" className="sr-only peer" checked={preference.active} onChange={() => handleTogglePreference(preference.id, isDefault)} />
            <div className="relative w-9 h-5 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-500"></div>
          </label>
          {!isDefault && (
            <>
              <button onClick={() => handleEditPreference(preference)} className="text-white/60 hover:text-white mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
              </button>
              <button onClick={() => handleDeletePreference(preference.id)} className="text-white/60 hover:text-red-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className={`main-content-container${backgroundBlurred ? ' app-blur-when-modal' : ''}`}>
        <div className={showConversation ? "max-w-7xl mx-auto py-8 px-4" : "max-w-7xl mx-auto py-8 px-4"}>
          <h1 className="text-3xl font-bold text-amber-100 mb-6">Teach Aiva</h1>
          <p className="text-blue-100 mb-8">Customize how Aiva responds to you by setting your preferences below.</p>
          <div className="mb-10 max-w-3xl mx-auto">
            <div className="flex shadow-lg shadow-navy-900/10">
              <input
                type="text"
                value={newPreferenceText}
                onChange={(e) => setNewPreferenceText(e.target.value)}
                onClick={openConversationModal}
                placeholder={editingPreference ? "Edit instruction..." : "Tell Aiva how to handle your tasks..."}
                className="flex-1 p-4 bg-[rgba(10,61,98,0.5)] backdrop-blur-sm rounded-l-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-amber-500 text-base cursor-pointer"
              />
              <button
                onClick={editingPreference ? handleSaveEdit : openConversationModal}
                className="px-6 py-3 bg-gradient-to-r from-amber-400 to-amber-500 text-navy-900 rounded-r-xl hover:opacity-90 transition-opacity font-medium shadow-lg shadow-amber-900/20"
              >
                {editingPreference ? 'Save' : 'Start Conversation'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-10">
        <h2 className="text-xl font-medium text-blue-100 mb-4 border-b border-amber-200/20 pb-2">Your Instructions</h2>
        {userPreferences.length === 0 ? (
          <p className="text-amber-100/60 text-sm">No custom instructions yet. Add your first instruction above.</p>
        ) : (
          <div>
            {userPreferences.map((preference) => (
              <PreferenceCard key={preference.id} preference={preference} isDefault={false} />
            ))}
          </div>
        )}
      </div>

      <div>
        <h2 className="text-xl font-medium text-white/90 mb-4 border-b border-white/10 pb-2">Standard Behaviors</h2>
        {systemPreferences.map(preference => (
          <PreferenceCard key={preference.id} preference={preference} isDefault={true} />
        ))}
      </div>

      {showConversation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center modal-perspective-container" onClick={closeConversation}>
          <div className="absolute inset-0 bg-navy-900/80 backdrop-blur-sm conversation-backdrop" />
          <div
            className={`bg-[#0a3d62] rounded-lg w-full max-w-lg shadow-2xl relative z-10 max-h-[80vh] flex flex-col overflow-hidden conversation-container${isClosing ? ' modal-closing' : ' modal-opening'}`}
            onClick={(e) => e.stopPropagation()}
            onAnimationEnd={() => {
              if (isClosing) {
                setShowConversation(false);
                setIsClosing(false);
              }
            }}
          >
            <div className="flex justify-between items-center px-4 py-3 border-b border-white/10">
              <h3 className="text-lg font-medium text-amber-100">Teach Aiva</h3>
              <button onClick={closeConversation} className="text-white/60 hover:text-white p-1 rounded-full modal-close-button">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
              </button>
            </div>
            <div className="px-4 py-3 bg-gradient-to-r from-navy-800/50 to-navy-900/50 border-b border-white/5">
              <div className="flex items-start">
                <div className="mr-2 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </div>
                <p className="text-sm text-white/90 font-mono">{currentRuleSynthesis || '...'}</p>
              </div>
              {conversation.length >= 4 && (
                <div className="flex justify-end mt-3">
                  <button onClick={finalizePreference} className="px-4 py-2 bg-amber-400 text-navy-900 rounded-lg text-sm font-medium hover:opacity-90">Looks great, create it</button>
                </div>
              )}
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {conversation.length > 0 ? (
                conversation.map((message, index) => (
                  <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${message.role === 'user' ? 'bg-amber-400 text-navy-900' : 'bg-[rgba(255,255,255,0.1)] text-white'}`}>
                      <p>{message.content}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center h-32 text-white/70">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-2 text-amber-400/70" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
                  <p>Tell Aiva what you'd like her to do for you</p>
                </div>
              )}
              {isProcessing && (
                <div className="flex justify-start"><div className="bg-[rgba(255,255,255,0.1)] rounded-2xl p-3 flex items-center space-x-2"><div className="w-2 h-2 bg-white/60 rounded-full animate-pulse"></div><div className="w-2 h-2 bg-white/60 rounded-full animate-pulse [animation-delay:0.2s]"></div><div className="w-2 h-2 bg-white/60 rounded-full animate-pulse [animation-delay:0.4s]"></div></div></div>
              )}
            </div>
            <div className="p-4 border-t border-white/10">
              <div className="flex">
                <input type="text" value={userMessage} onChange={(e) => setUserMessage(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()} placeholder="Type your message..." className="flex-1 p-3 bg-[rgba(255,255,255,0.1)] rounded-l-lg text-white placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-amber-500" disabled={isProcessing} />
                <button onClick={handleSendMessage} disabled={isProcessing} className="px-4 py-3 bg-amber-400 text-navy-900 rounded-r-lg hover:opacity-90 transition-opacity disabled:opacity-50">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" /></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default TeachAiva;
