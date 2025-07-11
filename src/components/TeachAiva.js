import React, { useState, useRef, useCallback, useEffect } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

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
  
  // State for system preferences
  const [systemPreferences, setSystemPreferences] = useState(defaultPreferences);
  
  // State for new preference input
  const [newPreferenceText, setNewPreferenceText] = useState('');
  
  // State for editing preference
  const [editingPreference, setEditingPreference] = useState(null);
  const [editValue, setEditValue] = useState('');
  
  // State to track recently dropped item for animation
  const [droppedItemId, setDroppedItemId] = useState(null);
  
  // State to track the current visual arrangement during drag
  const [draggingState, setDraggingState] = useState(null);
  
  // State for conversation modal
  const [showConversation, setShowConversation] = useState(false);
  const [conversation, setConversation] = useState([]);
  const [userMessage, setUserMessage] = useState('');
  const [draftPreference, setDraftPreference] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentRuleSynthesis, setCurrentRuleSynthesis] = useState('');

  // Open the conversation modal
  const openConversationModal = () => {
    setShowConversation(true);
    setCurrentRuleSynthesis(''); // Reset rule synthesis
    
    // If there's already text in the input, use it as initial message
    if (newPreferenceText.trim()) {
      const initialMessage = {
        role: 'user',
        content: newPreferenceText
      };
      
      setConversation([initialMessage]);
      setUserMessage('');
      setCurrentRuleSynthesis(newPreferenceText); // Set initial rule synthesis to user input
      
      // Add Aiva's first response
      setTimeout(() => {
        addAivaResponse(newPreferenceText);
      }, 500);
      
      setNewPreferenceText(''); // Clear the main input field
    } else {
      // Start with an empty conversation
      setConversation([]);
    }
  };
  
  // Simulate Aiva's response based on user input
  const addAivaResponse = (userInput) => {
    setIsProcessing(true);
    
    // Simulate API delay
    setTimeout(() => {
      let aivaMessage = { role: 'assistant', content: '' };
      
      // Update the rule synthesis based on conversation progress
      const userMessages = [...conversation, { role: 'user', content: userInput }]
        .filter(msg => msg.role === 'user')
        .map(msg => msg.content);
      
      // Simple rule synthesis - in a real app, this would be more sophisticated
      let synthesizedRule = '';
      
      // Create different rule versions based on conversation length
      if (userMessages.length === 1) {
        synthesizedRule = userMessages[0]; // Initial user input
      } else if (userMessages.length >= 2) {
        // Combine user messages with increasing sophistication
        synthesizedRule = userMessages.join(' ');
        // Truncate if too long and add ellipsis
        if (synthesizedRule.length > 80) {
          synthesizedRule = synthesizedRule.substring(0, 80) + '...';
        }
      }
      
      // Update the current rule synthesis
      setCurrentRuleSynthesis(synthesizedRule);
      
      // Simple response logic - in a real app, this would call your AI service
      if (conversation.length === 1) {
        // First response - ask a clarifying question
        aivaMessage.content = `I understand you want me to "${userInput}". Can you tell me more about when and how you'd like me to do this?`;
      } else if (conversation.length === 3) {
        // Second response - ask for specifics
        aivaMessage.content = `Thanks for explaining. Would you like me to perform this task automatically, or would you prefer I ask for confirmation each time?`;
      } else if (conversation.length >= 5) {
        // Final response - suggest continuing or finalizing
        aivaMessage.content = `I've updated the rule based on our conversation. You can continue chatting to refine it further, or click "Looks great" when you're satisfied.`;
      } else {
        // Default response for continued conversation
        aivaMessage.content = `I've updated the rule. Is there anything else you'd like to add or modify?`;
      }
      
      setConversation(prev => [...prev, aivaMessage]);
      setIsProcessing(false);
    }, 1000);
  };
  
  // Handle user message in conversation
  const handleSendMessage = () => {
    if (!userMessage.trim()) return;
    
    const newUserMessage = {
      role: 'user',
      content: userMessage
    };
    
    setConversation(prev => [...prev, newUserMessage]);
    setUserMessage('');
    
    // Update the rule synthesis immediately
    const userMessages = [...conversation, newUserMessage]
      .filter(msg => msg.role === 'user')
      .map(msg => msg.content);
    
    const newSynthesis = userMessages.join(' ');
    setCurrentRuleSynthesis(newSynthesis.length > 80 ? newSynthesis.substring(0, 80) + '...' : newSynthesis);
    
    // Simulate Aiva's response
    addAivaResponse(userMessage);
  };
  
  // Finalize the preference from conversation
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
  
  // Close conversation modal
  const closeConversation = () => {
    setShowConversation(false);
    setConversation([]);
    setDraftPreference(null);
    setCurrentRuleSynthesis('');
  };
  
  // Handle adding a new preference (original method, now unused)
  const handleAddPreference = () => {
    if (!newPreferenceText.trim()) return;
    
    const newPreference = {
      id: Date.now(),
      description: newPreferenceText,
      active: true,
      isDefault: false,
      priority: userPreferences.length + 1
    };
    
    setUserPreferences([...userPreferences, newPreference]);
    setNewPreferenceText('');
  };

  // Handle editing a preference
  const handleEditPreference = (preference) => {
    setEditingPreference(preference);
    setNewPreferenceText(preference.description);
  };

  // Handle saving an edited preference
  const handleSaveEdit = () => {
    if (!newPreferenceText.trim()) return;
    
    if (editingPreference.isDefault) {
      setSystemPreferences(systemPreferences.map(preference => 
        preference.id === editingPreference.id ? { ...preference, description: newPreferenceText } : preference
      ));
    } else {
      setUserPreferences(userPreferences.map(preference => 
        preference.id === editingPreference.id ? { ...preference, description: newPreferenceText } : preference
      ));
    }
    
    setNewPreferenceText('');
    setEditingPreference(null);
  };

  // Handle deleting a preference
  const handleDeletePreference = (id) => {
    setUserPreferences(userPreferences.filter(preference => preference.id !== id));
  };

  // Handle toggling a preference's active state
  const handleTogglePreference = (id, isDefault) => {
    if (isDefault) {
      setSystemPreferences(systemPreferences.map(preference => 
        preference.id === id ? { ...preference, active: !preference.active } : preference
      ));
    } else {
      setUserPreferences(userPreferences.map(preference => 
        preference.id === id ? { ...preference, active: !preference.active } : preference
      ));
    }
  };

  // Handle preference reordering
  const movePreference = (id, direction) => {
    const preferenceIndex = userPreferences.findIndex(preference => preference.id === id);
    if (
      (direction === 'up' && preferenceIndex === 0) || 
      (direction === 'down' && preferenceIndex === userPreferences.length - 1)
    ) {
      return;
    }
    
    const newPreferences = [...userPreferences];
    const targetIndex = direction === 'up' ? preferenceIndex - 1 : preferenceIndex + 1;
    
    // Swap the preferences
    [newPreferences[preferenceIndex], newPreferences[targetIndex]] = [newPreferences[targetIndex], newPreferences[preferenceIndex]];
    
    // Update priorities
    newPreferences.forEach((preference, index) => {
      preference.priority = index + 1;
    });
    
    setUserPreferences(newPreferences);
  };

  // Draggable preference item component
  const DraggablePreferenceItem = ({ preference, index, moveItem }) => {
    const ref = useRef(null);
    
    // Define the drag source
    const [{ isDragging }, drag] = useDrag({
      type: 'PREFERENCE',
      item: () => ({ 
        index, 
        id: preference.id,
        originalIndex: index  // Keep track of the original index
      }),
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: (item, monitor) => {
        // Only update the real data if dropped successfully
        if (monitor.didDrop()) {
          // Apply the actual data changes now
          if (draggingState) {
            setUserPreferences(draggingState);
            // Calculate final rearrangement and update priorities
            const finalPrefs = [...draggingState];
            finalPrefs.forEach((pref, idx) => {
              pref.priority = idx + 1;
            });
            setUserPreferences(finalPrefs);
          }
          
          // Set the dropped item ID to trigger animation
          setDroppedItemId(item.id);
          
          // Clear the animation after it completes
          setTimeout(() => {
            setDroppedItemId(null);
          }, 600);
        } else {
          // If drag was cancelled, reset to the original state
          setDraggingState(null);
        }
      },
    });
    
    // Define the drop target
    const [, drop] = useDrop({
      accept: 'PREFERENCE',
      hover: (item, monitor) => {
        if (!ref.current) {
          return;
        }
        const dragIndex = item.index;
        const hoverIndex = index;
        
        // Don't replace items with themselves
        if (dragIndex === hoverIndex) {
          return;
        }
        
        // Only update the visual position, not the actual data yet
        const currentPrefs = draggingState || [...userPreferences];
        const newPrefs = [...currentPrefs];
        
        // Swap positions visually
        const dragItem = newPrefs[dragIndex];
        newPrefs.splice(dragIndex, 1);
        newPrefs.splice(hoverIndex, 0, dragItem);
        
        // Update visual state only
        setDraggingState(newPrefs);
        
        // Update the dragged item's index for tracking
        item.index = hoverIndex;
      },
    });
    
    // Connect the drag and drop refs
    drag(drop(ref));
    
    // Determine if this item was just dropped
    const isDropped = droppedItemId === preference.id;
    
    return (
      <div 
        ref={ref} 
        className={`${isDragging ? 'opacity-60 scale-105' : ''} transition-all duration-200 cursor-grab active:cursor-grabbing hover:shadow-md hover:border-amber-200/30`}
        style={{
          animation: isDropped ? 'dropBounce 0.6s ease' : 'none'
        }}
      >
        <PreferenceCard preference={preference} isDefault={false} isDragging={isDragging} />
      </div>
    );
  };
  

  
  // This function is no longer used directly - we update data on drop now
  const moveItem = useCallback((dragIndex, hoverIndex) => {}, []);

  // Render a preference card
  const PreferenceCard = ({ preference, isDefault, isDragging }) => (
    <div className={`bg-[rgba(10,61,98,0.4)] backdrop-blur-sm rounded-xl p-5 mb-4 border ${preference.active ? 'border-white/10 shadow-md shadow-navy-900/20' : 'border-white/5 opacity-60'} transition-all ${isDragging ? 'shadow-xl' : ''}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center flex-1">
          {!isDefault && (
            <div className="mr-3 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white/50 hover:text-amber-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9h8M8 12h8M8 15h8" />
              </svg>
            </div>
          )}
          <p className={`text-sm ${preference.active ? 'text-white' : 'text-white/70'}`}>
            {preference.description}
          </p>
        </div>
        <div className="flex items-center">
          <label className="inline-flex items-center cursor-pointer mr-3">
            <input 
              type="checkbox" 
              className="sr-only peer"
              checked={preference.active}
              onChange={() => handleTogglePreference(preference.id, isDefault)}
            />
            <div className="relative w-9 h-5 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-500"></div>
          </label>
          
          {!isDefault && (
            <>
              <button 
                onClick={() => handleEditPreference(preference)}
                className="text-white/60 hover:text-white mr-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              <button 
                onClick={() => handleDeletePreference(preference.id)}
                className="text-white/60 hover:text-red-400"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-amber-100 mb-6">Teach Aiva</h1>
      <p className="text-blue-100 mb-8">Customize how Aiva responds to you by setting your preferences below.</p>
      
      {/* Add inline styles for animations */}
      <style>
        {`
          @keyframes dropBounce {
            0% { transform: scale(1); }
            20% { transform: scale(1.05); }
            40% { transform: scale(0.95); }
            60% { transform: scale(1.02); }
            80% { transform: scale(0.98); }
            100% { transform: scale(1); }
          }
        `}
      </style>
      
      {/* Preference input form */}
      <div className="mb-10 max-w-3xl mx-auto">
        <div className="flex shadow-lg shadow-navy-900/10">
          <input
            type="text"
            value={newPreferenceText}
            onChange={(e) => setNewPreferenceText(e.target.value)}
            onClick={openConversationModal} // Open modal on click
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
        <p className="text-sm text-amber-100/60 mt-3 ml-1">
          Click to start a conversation with Aiva. She'll help you create the perfect instruction through dialogue.
        </p>
      </div>
      
      {/* Conversation Modal */}
      {showConversation && (
        <div className="fixed inset-0 bg-navy-900/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-b from-[#0a3d62] to-[#0a2d4a] rounded-2xl max-w-2xl w-full max-h-[80vh] flex flex-col shadow-2xl border border-white/10">
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex justify-between items-center">
              <h3 className="text-xl font-medium text-amber-100">Teaching Aiva</h3>
              <button 
                onClick={closeConversation}
                className="text-white/60 hover:text-white"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Rule Preview Section - Always visible */}
            <div className="px-4 py-3 bg-gradient-to-r from-navy-800/50 to-navy-900/50 border-b border-white/5">
              <div className="flex items-start">
                <div className="mr-2 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="flex-1 flex justify-between items-center">
                  <div>
                    <p className="text-xs text-amber-100/70 mb-1">Current Rule Preview:</p>
                    {currentRuleSynthesis ? (
                      <p className="text-sm text-white font-medium pr-2">"{currentRuleSynthesis}"</p>
                    ) : (
                      <p className="text-sm text-white/50 italic pr-2">Your rule will appear here as you chat with Aiva. Click "Looks Great" when you're satisfied.</p>
                    )}
                  </div>
                  <button 
                    onClick={finalizePreference}
                    disabled={!currentRuleSynthesis}
                    className={`px-3 py-1.5 bg-gradient-to-r from-amber-400 to-amber-500 text-navy-900 rounded-lg transition-opacity text-sm font-medium flex items-center ${!currentRuleSynthesis ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'}`}
                  >
                    <span className="mr-1">✓</span> Looks Great
                  </button>
                </div>
              </div>
            </div>
            
            {/* Conversation */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {conversation.length > 0 ? (
                conversation.map((message, index) => (
                  <div 
                    key={index} 
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[80%] rounded-2xl p-3 ${message.role === 'user' 
                        ? 'bg-amber-400 text-navy-900' 
                        : 'bg-[rgba(255,255,255,0.1)] text-white'}`}
                    >
                      <p>{message.content}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center h-32 text-white/70">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-2 text-amber-400/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                  <p>Tell Aiva what you'd like her to do for you</p>
                </div>
              )}
              
              {isProcessing && (
                <div className="flex justify-start">
                  <div className="bg-[rgba(255,255,255,0.1)] rounded-2xl p-3 flex items-center space-x-2">
                    <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse delay-100"></div>
                    <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse delay-200"></div>
                  </div>
                </div>
              )}
            </div>
            
            {/* No action buttons at bottom anymore */}
            
            {/* Input area */}
            {!draftPreference && (
              <div className="p-4 border-t border-white/10">
                <div className="flex">
                  <input
                    type="text"
                    value={userMessage}
                    onChange={(e) => setUserMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type your message..."
                    className="flex-1 p-3 bg-[rgba(255,255,255,0.1)] rounded-l-lg text-white placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    disabled={isProcessing}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={isProcessing}
                    className="px-4 py-3 bg-amber-400 text-navy-900 rounded-r-lg hover:opacity-90 transition-opacity disabled:opacity-50"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* User preferences section */}
      <div className="mb-10">
        <h2 className="text-xl font-medium text-blue-100 mb-4 border-b border-amber-200/20 pb-2">Your Instructions</h2>
        {userPreferences.length === 0 ? (
          <p className="text-amber-100/60 text-sm">No custom instructions yet. Add your first instruction above.</p>
        ) : (
          <DndProvider backend={HTML5Backend}>
            {(draggingState || userPreferences).map((preference, index) => (
              <DraggablePreferenceItem
                key={preference.id}
                preference={preference}
                index={index}
                moveItem={moveItem}
              />
            ))}
          </DndProvider>
        )}
      </div>
      
      {/* Default preferences section */}
      <div>
        <h2 className="text-xl font-medium text-white/90 mb-4 border-b border-white/10 pb-2">Standard Behaviors</h2>
        {systemPreferences.map(preference => (
          <PreferenceCard key={preference.id} preference={preference} isDefault={true} />
        ))}
      </div>
    </div>
  );
};

export default TeachAiva;
