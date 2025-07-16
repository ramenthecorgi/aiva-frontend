import React, { useState, useRef, useEffect } from 'react';

const ChatTaskView = ({ onClose, animationState }) => {
  const [chatMessages, setChatMessages] = useState([
    { 
      id: 1, 
      sender: 'aiva', 
      content: "Hi there! I'm Aiva. How can I help you today?",
      timestamp: new Date().toISOString()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [taskPreview, setTaskPreview] = useState({
    title: '',
    description: '',
    status: 'draft',
    priority: 'medium',
    dueDate: null,
    tags: []
  });
  
  const messagesEndRef = useRef(null);
  
  // Auto-scroll to bottom of messages when new messages are added
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages]);

  // Handle sending a new message
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage = {
      id: chatMessages.length + 1,
      sender: 'user',
      content: inputValue,
      timestamp: new Date().toISOString()
    };
    
    setChatMessages([...chatMessages, userMessage]);
    setInputValue('');

    // Simulate Aiva response and task preview update
    setTimeout(() => {
      // Add Aiva response
      const aivaResponse = {
        id: chatMessages.length + 2,
        sender: 'aiva',
        content: `I'll help you with "${inputValue}". Let me create a task for this.`,
        timestamp: new Date().toISOString()
      };
      
      setChatMessages(prevMessages => [...prevMessages, aivaResponse]);
      
      // Update task preview based on user input
      setTaskPreview({
        title: inputValue.length > 50 ? `${inputValue.substring(0, 50)}...` : inputValue,
        description: `Task created based on conversation with user on ${new Date().toLocaleDateString()}`,
        status: 'draft',
        priority: 'medium',
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 1 week from now
        tags: ['auto-generated']
      });
    }, 1000);
  };

  // Generate animation classes based on animationState
  const getAnimationClasses = () => {
    switch(animationState) {
      case 'entering':
        return 'animate-slide-up transform origin-top';
      case 'entered':
        return 'opacity-100 transform-none transition-all duration-300';
      case 'exiting':
        return 'animate-slide-down transform origin-top';
      default:
        return '';
    }
  };

  return (
    <div className={`flex h-[calc(100vh-6rem)] bg-gradient-to-b from-[rgba(10,61,98,0.98)] to-[rgba(10,30,50,0.98)] shadow-2xl border border-white/10 rounded-t-xl shadow-[0_-8px_20px_rgba(0,0,0,0.25)] ${getAnimationClasses()}`} style={{ transformOrigin: 'top center' }}>
      {/* Left Panel - Chat Surface */}
      <div className="w-1/2 flex flex-col border-r border-white/10">
        {/* Chat Header */}
        <div className="p-4 border-b border-white/10 bg-[rgba(255,255,255,0.03)]">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 flex items-center justify-center text-white font-bold mr-3 shadow-md">
              A
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-blue-100">Aiva</h3>
              <p className="text-xs text-amber-100/70">Your AI Assistant</p>
            </div>
            <div className="flex space-x-1">
              <div className="h-2 w-2 bg-amber-400 rounded-full animate-pulse"></div>
              <div className="h-2 w-2 bg-amber-400/60 rounded-full animate-pulse delay-100"></div>
              <div className="h-2 w-2 bg-amber-400/30 rounded-full animate-pulse delay-200"></div>
            </div>
          </div>
        </div>
        
        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.2) transparent' }}>
          {chatMessages.map((message) => (
            <div 
              key={message.id} 
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.sender !== 'user' && (
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-amber-400/80 to-amber-600/80 flex items-center justify-center text-white font-bold mr-2 self-end shadow-sm text-xs">
                  A
                </div>
              )}
              <div 
                className={`max-w-[75%] rounded-lg p-3.5 shadow-md ${
                  message.sender === 'user' 
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white border border-blue-500/30' 
                    : 'bg-gradient-to-r from-[rgba(255,255,255,0.08)] to-[rgba(255,255,255,0.12)] text-blue-100 border border-white/10'
                }`}
              >
                <p className="whitespace-pre-wrap">{message.content}</p>
                <p className="text-xs opacity-70 mt-1">
                  {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Chat Input - Fixed at bottom */}
        <div className="p-4 border-t border-white/10 bg-gradient-to-b from-[rgba(10,30,50,0.7)] to-[rgba(10,40,70,0.9)]">
          <form onSubmit={handleSendMessage} className="flex items-center">
            <div className="flex-1 relative">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message here..."
                className="w-full bg-[rgba(255,255,255,0.08)] border border-white/15 rounded-l-md px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-amber-400/50 shadow-inner shadow-black/20"
                autoFocus
              />
              {!inputValue && (
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-xs text-white/40 pointer-events-none">
                  Press Enter to send
                </div>
              )}
            </div>
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-white px-4 py-3 rounded-r-md transition-colors flex items-center justify-center shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>
          </form>
        </div>
      </div>
      
      {/* Right Panel - Task Preview (Google Doc style) */}
      <div className="w-1/2 flex flex-col">
        {/* Task Header */}
        <div className="p-4 border-b border-white/10 flex justify-between items-center bg-gradient-to-r from-[rgba(255,255,255,0.03)] to-[rgba(255,255,255,0.05)]">
          <div className="flex items-center">
            <div className="w-6 h-6 mr-2 text-amber-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h2 className="text-lg font-medium text-blue-100">Task Preview</h2>
          </div>
          <button 
            onClick={onClose}
            className="text-amber-100/60 hover:text-amber-100 p-1 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Task Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
            {taskPreview.title ? (
              <div className="flex flex-col h-full">
                {/* Document Header */}
                <div className="p-6 bg-white border-b border-gray-200">
                  <h1 className="text-2xl font-bold text-gray-800">{taskPreview.title}</h1>
                  <div className="flex items-center mt-2 text-sm text-gray-500">
                    <span className="mr-2">Created {new Date().toLocaleDateString()}</span>
                    <span className="h-1 w-1 rounded-full bg-gray-400 mx-2"></span>
                    <span className="text-amber-600 font-medium">{taskPreview.priority}</span>
                  </div>
                </div>
                
                {/* Document Body */}
                <div className="p-6 bg-gradient-to-b from-white to-gray-50 text-gray-700">
                  <div className="prose max-w-none">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Description</h2>
                    <p className="mb-6">{taskPreview.description}</p>
                    
                    <div className="grid grid-cols-2 gap-6 mb-6">
                      <div>
                        <h3 className="text-lg font-medium text-gray-800 mb-2">Status</h3>
                        <div className="bg-amber-100 text-amber-800 text-sm py-1 px-3 rounded-full inline-block">
                          {taskPreview.status}
                        </div>
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-medium text-gray-800 mb-2">Tags</h3>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {taskPreview.tags.map((tag, index) => (
                        <span key={index} className="bg-gray-100 text-gray-800 text-xs py-1 px-2 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <h3 className="text-lg font-medium text-gray-800 mb-2">Notes</h3>
                    <p className="text-gray-600 italic">This task was automatically generated based on your conversation with Aiva.</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-64 bg-white text-gray-400">
                <div className="text-center p-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p className="text-lg">Start chatting with Aiva to generate a task preview</p>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="p-4 border-t border-white/10 bg-[rgba(10,20,40,0.5)]">
          <div className="flex justify-end space-x-3">
            <button 
              onClick={onClose}
              className="px-4 py-2 text-sm text-white/80 hover:text-white border border-white/20 rounded-md hover:bg-white/5 transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={onClose}
              className="px-4 py-2 text-sm text-white bg-gradient-to-r from-amber-500 to-amber-600 rounded-md hover:from-amber-600 hover:to-amber-700 transition-colors shadow-lg"
              disabled={!taskPreview.title}
            >
              Assign to Aiva
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatTaskView;
