import React, { useState, useRef, useCallback } from 'react';
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
  const [systemPreferences, setSystemPreferences] = useState(defaultPreferences);
  const [newPreferenceText, setNewPreferenceText] = useState('');
  const [editingPreference, setEditingPreference] = useState(null);

  // Handle adding a new preference
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
      item: { index },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
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
        
        // Move the item
        moveItem(dragIndex, hoverIndex);
        
        // Update the dragged item's index
        item.index = hoverIndex;
      },
    });
    
    // Connect the drag and drop refs
    drag(drop(ref));
    
    return (
      <div 
        ref={ref} 
        className={`${isDragging ? 'opacity-60 scale-105' : ''} transition-all duration-200`}
      >
        <PreferenceCard preference={preference} isDefault={false} isDragging={isDragging} />
      </div>
    );
  };
  
  // Move item in the array
  const moveItem = useCallback((dragIndex, hoverIndex) => {
    setUserPreferences((prevPreferences) => {
      const newPreferences = [...prevPreferences];
      const draggedItem = newPreferences[dragIndex];
      
      // Remove the dragged item
      newPreferences.splice(dragIndex, 1);
      // Insert it at the new position
      newPreferences.splice(hoverIndex, 0, draggedItem);
      
      // Update priorities
      newPreferences.forEach((pref, idx) => {
        pref.priority = idx + 1;
      });
      
      return newPreferences;
    });
  }, []);

  // Render a preference card
  const PreferenceCard = ({ preference, isDefault, isDragging }) => (
    <div className={`bg-[rgba(10,61,98,0.4)] backdrop-blur-sm rounded-xl p-5 mb-4 border ${preference.active ? 'border-white/10 shadow-md shadow-navy-900/20' : 'border-white/5 opacity-60'} transition-all hover:border-amber-200/20 ${isDragging ? 'shadow-xl' : ''}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center flex-1">
          {!isDefault && (
            <div className="mr-3 flex items-center cursor-grab active:cursor-grabbing">
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
    <div className="max-w-4xl mx-auto py-8">
      <h2 className="text-3xl font-bold mb-6 text-blue-100 drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">Teach Aiva</h2>
      
      {/* Preference input form */}
      <div className="mb-10 max-w-3xl mx-auto">
        <div className="flex shadow-lg shadow-navy-900/10">
          <input
            type="text"
            value={newPreferenceText}
            onChange={(e) => setNewPreferenceText(e.target.value)}
            placeholder={editingPreference ? "Edit instruction..." : "Tell Aiva how to handle your tasks..."}
            className="flex-1 p-4 bg-[rgba(10,61,98,0.5)] backdrop-blur-sm rounded-l-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-amber-500 text-base"
          />
          <button
            onClick={editingPreference ? handleSaveEdit : handleAddPreference}
            className="px-6 py-3 bg-gradient-to-r from-amber-400 to-amber-500 text-navy-900 rounded-r-xl hover:opacity-90 transition-opacity font-medium shadow-lg shadow-amber-900/20"
          >
            {editingPreference ? 'Save' : 'Add Instruction'}
          </button>
        </div>
        <p className="text-sm text-amber-100/60 mt-3 ml-1">
          Teach Aiva your preferences in natural language. For example: "Forward all emails from my boss to my personal email"
        </p>
      </div>
      
      {/* User preferences section */}
      <div className="mb-10">
        <h2 className="text-xl font-medium text-blue-100 mb-4 border-b border-amber-200/20 pb-2">Your Instructions</h2>
        {userPreferences.length === 0 ? (
          <p className="text-amber-100/60 text-sm">No custom instructions yet. Add your first instruction above.</p>
        ) : (
          <DndProvider backend={HTML5Backend}>
            {userPreferences.map((preference, index) => (
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
