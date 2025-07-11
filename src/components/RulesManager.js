import React, { useState } from 'react';

// Sample data for rules
const sampleRules = [
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

// Sample default rules
const defaultRules = [
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

const RulesManager = () => {
  const [userRules, setUserRules] = useState(sampleRules);
  const [systemRules, setSystemRules] = useState(defaultRules);
  const [newRuleText, setNewRuleText] = useState('');
  const [editingRule, setEditingRule] = useState(null);

  // Handle adding a new rule
  const handleAddRule = () => {
    if (!newRuleText.trim()) return;
    
    const newRule = {
      id: Date.now(),
      description: newRuleText,
      active: true,
      isDefault: false,
      priority: userRules.length + 1
    };
    
    setUserRules([...userRules, newRule]);
    setNewRuleText('');
  };

  // Handle editing a rule
  const handleEditRule = (rule) => {
    setEditingRule(rule);
    setNewRuleText(rule.description);
  };

  // Handle saving an edited rule
  const handleSaveEdit = () => {
    if (!newRuleText.trim()) return;
    
    if (editingRule.isDefault) {
      setSystemRules(systemRules.map(rule => 
        rule.id === editingRule.id ? { ...rule, description: newRuleText } : rule
      ));
    } else {
      setUserRules(userRules.map(rule => 
        rule.id === editingRule.id ? { ...rule, description: newRuleText } : rule
      ));
    }
    
    setNewRuleText('');
    setEditingRule(null);
  };

  // Handle deleting a rule
  const handleDeleteRule = (id) => {
    setUserRules(userRules.filter(rule => rule.id !== id));
  };

  // Handle toggling a rule's active state
  const handleToggleRule = (id, isDefault) => {
    if (isDefault) {
      setSystemRules(systemRules.map(rule => 
        rule.id === id ? { ...rule, active: !rule.active } : rule
      ));
    } else {
      setUserRules(userRules.map(rule => 
        rule.id === id ? { ...rule, active: !rule.active } : rule
      ));
    }
  };

  // Handle rule reordering (in a real app, this would use a drag-and-drop library)
  const moveRule = (id, direction) => {
    const ruleIndex = userRules.findIndex(rule => rule.id === id);
    if (
      (direction === 'up' && ruleIndex === 0) || 
      (direction === 'down' && ruleIndex === userRules.length - 1)
    ) {
      return;
    }
    
    const newRules = [...userRules];
    const targetIndex = direction === 'up' ? ruleIndex - 1 : ruleIndex + 1;
    
    // Swap the rules
    [newRules[ruleIndex], newRules[targetIndex]] = [newRules[targetIndex], newRules[ruleIndex]];
    
    // Update priorities
    newRules.forEach((rule, index) => {
      rule.priority = index + 1;
    });
    
    setUserRules(newRules);
  };

  // Render a rule card
  const RuleCard = ({ rule, isDefault }) => (
    <div className={`bg-[rgba(10,61,98,0.4)] backdrop-blur-sm rounded-xl p-5 mb-4 border ${rule.active ? 'border-white/10 shadow-md shadow-navy-900/20' : 'border-white/5 opacity-60'} transition-all hover:border-amber-200/20`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center flex-1">
          {!isDefault && (
            <div className="mr-3 flex flex-col">
              <button 
                onClick={() => moveRule(rule.id, 'up')}
                className="text-amber-100/60 hover:text-amber-100 mb-1"
                disabled={rule.priority === 1}
              >
                ▲
              </button>
              <button 
                onClick={() => moveRule(rule.id, 'down')}
                className="text-amber-100/60 hover:text-amber-100"
                disabled={rule.priority === userRules.length}
              >
                ▼
              </button>
            </div>
          )}
          
          <div className="flex-1">
            <div className="flex items-center">
              <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full mr-3 ${rule.active ? 'bg-gradient-to-br from-amber-400 to-amber-500' : 'bg-gray-500'} shadow-sm`}>
                <span className="text-xs text-white font-bold">
                  {rule.priority}
                </span>
              </span>
              <p className="text-base text-blue-100 leading-relaxed">{rule.description}</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center ml-4">
          <label className="inline-flex items-center cursor-pointer mr-3">
            <input 
              type="checkbox" 
              className="sr-only peer"
              checked={rule.active}
              onChange={() => handleToggleRule(rule.id, isDefault)}
            />
            <div className="relative w-9 h-5 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-500"></div>
          </label>
          
          {!isDefault && (
            <>
              <button 
                onClick={() => handleEditRule(rule)}
                className="text-white/60 hover:text-white mr-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              <button 
                onClick={() => handleDeleteRule(rule.id)}
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
    <div className="max-w-4xl mx-auto py-8">
      <h2 className="text-3xl font-bold mb-6 text-blue-100 drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">Rules Manager</h2>
      
      {/* Rule input form */}
      <div className="mb-10 max-w-3xl mx-auto">
        <div className="flex shadow-lg shadow-purple-900/10">
          <input
            type="text"
            value={newRuleText}
            onChange={(e) => setNewRuleText(e.target.value)}
            placeholder={editingRule ? "Edit rule..." : "If someone from finance emails me..."}
            className="flex-1 p-4 bg-[rgba(10,61,98,0.5)] backdrop-blur-sm rounded-l-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 text-base"
          />
          <button
            onClick={editingRule ? handleSaveEdit : handleAddRule}
            className="px-6 py-3 bg-gradient-to-r from-amber-400 to-amber-500 text-navy-900 rounded-lg hover:opacity-90 transition-opacity font-medium shadow-lg shadow-amber-900/20"
          >
            {editingRule ? 'Save' : 'Add Rule'}
          </button>
        </div>
        <p className="text-sm text-amber-100/60 mt-3 ml-1">
          Describe your rule in natural language. For example: "Forward all emails from my boss to my personal email"
        </p>
      </div>
      
      {/* User rules section */}
      <div className="mb-10">
        <h2 className="text-xl font-medium text-blue-100 mb-4 border-b border-amber-200/20 pb-2">Your Rules</h2>
        {userRules.length === 0 ? (
          <p className="text-amber-100/60 text-sm">No custom rules yet. Add your first rule above.</p>
        ) : (
          userRules.map(rule => (
            <RuleCard key={rule.id} rule={rule} isDefault={false} />
          ))
        )}
      </div>
      
      {/* Default rules section */}
      <div>
        <h2 className="text-xl font-medium text-white/90 mb-4 border-b border-white/10 pb-2">Default Rules</h2>
        {systemRules.map(rule => (
          <RuleCard key={rule.id} rule={rule} isDefault={true} />
        ))}
      </div>
    </div>
  );
};

export default RulesManager;
