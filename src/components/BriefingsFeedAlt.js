import React, { useState } from 'react';

// Sample data for briefings (same as original)
const sampleBriefings = [
  {
    id: 0,
    time: '7:30 AM',
    title: 'Your Day at a Glance',
    summary: "Good morning! Here's your schedule, priorities, and key information for today.",
    type: 'daily_overview',
    section: 'daily_overview',
    date: new Date().toISOString(),
    details: {
      from: 'aiva-system@example.com',
      to: 'you@example.com',
      subject: 'Daily Overview - ' + new Date().toLocaleDateString(),
      body: "Good morning,\n\nHere's your day at a glance:\n\n• You have 3 meetings today (Team Sync at 10am, Client XYZ at 2pm, Q2 Planning at 4pm)\n• Priority tasks: Finalize Q2 Marketing Report, Review project proposal from Alice\n• Weather: 72°F, Sunny\n• Market update: NASDAQ +0.7%, S&P 500 +0.3%\n• Today's quote: 'The best way to predict the future is to create it.'\n\nLet me know if you need anything else today!\n\nAiva",
      aivaActions: [
        { action: 'Calendar sync', status: 'completed', details: 'Synced with your Google Calendar and flagged priority meetings' },
        { action: 'Weather check', status: 'completed', details: 'Checked local weather forecast for your area' },
        { action: 'Priority analysis', status: 'completed', details: 'Analyzed your tasks and emails to determine top priorities' }
      ],
      ctas: [
        { label: 'View Calendar', action: 'calendar' },
        { label: 'Show Tasks', action: 'tasks' },
        { label: 'Prepare for Meetings', action: 'prepare' }
      ]
    }
  },
  {
    id: 1,
    time: '9:12 AM',
    title: 'Email to Alice Smith drafted',
    summary: "Subject: Q2 Marketing Report Review\nI've drafted a response to Alice's request for feedback on the Q2 marketing report...",
    type: 'email',
    section: 'in_progress',
    date: new Date().toISOString(),
    details: {
      from: 'alice.smith@example.com',
      to: 'you@example.com',
      subject: 'Q2 Marketing Report Review',
      body: "Hi there,\n\nI've attached the Q2 marketing report for your review. Could you please provide feedback by Friday?\n\nThanks,\nAlice",
      aivaActions: [
        { action: 'Draft response', status: 'completed', details: 'Created a draft response acknowledging receipt and promising review by Thursday.' },
        { action: 'Add calendar reminder', status: 'completed', details: 'Added a reminder to review the report on Wednesday afternoon.' }
      ],
      ctas: [
        { label: 'Send Response', action: 'send' },
        { label: 'Edit Response', action: 'edit' },
        { label: 'Schedule Meeting', action: 'schedule' }
      ]
    }
  },
  {
    id: 2,
    time: '10:30 AM',
    title: 'Calendar event created for team sync',
    summary: "Aiva scheduled your weekly sync with the team for Friday at 2pm.",
    type: 'calendar',
    section: 'recently_completed',
    date: new Date().toISOString(),
    details: {
      from: 'calendar-system@example.com',
      to: 'you@example.com',
      subject: 'Team Sync Scheduled',
      body: "Your weekly team sync is scheduled for Friday at 2pm.\n\nAttendees: Alice, Bob, Carol",
      aivaActions: [
        { action: 'Create event', status: 'completed', details: 'Added event to your calendar and invited attendees.' }
      ],
      ctas: [
        { label: 'View in Calendar', action: 'view-calendar' },
        { label: 'Reschedule', action: 'reschedule' }
      ]
    }
  },
  {
    id: 3,
    time: '11:45 AM',
    title: 'Slack message sent to Bob',
    summary: "Sent project update to Bob in #project-x channel.",
    type: 'slack',
    status: 'in_progress',
    date: new Date().toISOString(),
    details: {
      from: 'you@askaiva.app',
      to: 'bob@example.com',
      subject: 'Project X Update',
      body: "Hey Bob,\n\nJust sent over the latest update on Project X in Slack.",
      aivaActions: [
        { action: 'Draft message', status: 'completed', details: 'Drafted update message for Bob.' },
        { action: 'Send message', status: 'in_progress', details: 'Message is being delivered.' }
      ],
      ctas: [
        { label: 'View in Slack', action: 'view-slack' }
      ]
    }
  },
  {
    id: 4,
    time: '2:15 PM',
    title: 'Follow-up email sent to Client XYZ',
    summary: 'Subject: Project Timeline Update\nSent the requested timeline updates to the client with revised milestones.',
    type: 'email',
    section: 'recently_completed',
    date: new Date(Date.now() - 86400000).toISOString(), // Yesterday
    details: {
      from: 'you@example.com',
      to: 'client@xyz-corp.com',
      subject: 'Project Timeline Update',
      body: "Hi,\n\nHere is the updated project timeline as requested.\n\nBest,\nYou",
      aivaActions: [
        { action: 'Draft email', status: 'completed', details: 'Created a draft email with the updated project timeline.' },
        { action: 'Attach timeline', status: 'completed', details: 'Attached the revised timeline PDF to the email.' },
        { action: 'Send email', status: 'completed', details: 'Sent the email to the client.' }
      ],
      ctas: [
        { label: 'View in Gmail', action: 'view-email' },
        { label: 'Create Follow-up', action: 'create-followup' },
        { label: 'Add to CRM', action: 'add-to-crm' }
      ]
    }
  },
  {
    id: 5,
    time: '4:30 PM',
    title: 'Weekly report generated',
    summary: 'Created your weekly productivity summary: 37 emails processed, 12 meetings scheduled, 5 tasks completed.',
    type: 'report',
    section: 'scheduled',
    date: new Date(Date.now() - 86400000 * 3).toISOString(), // 3 days ago
    details: {
      from: 'aiva-system@example.com',
      to: 'you@example.com',
      subject: 'Your Weekly Productivity Report',
      body: "Weekly Productivity Summary\n\nEmails:\n- Processed: 37\n- Responded: 24\n- Archived: 13\n\nMeetings:\n- Scheduled: 12\n- Attended: 10\n- Rescheduled: 2\n\nTasks:\n- Completed: 5\n- In Progress: 3\n- Overdue: 1\n\nTime saved this week: approximately 4.5 hours",
      aivaActions: [
        { action: 'Analyze productivity', status: 'completed', details: 'Analyzed your email, calendar, and task activity for the week.' },
        { action: 'Generate report', status: 'completed', details: 'Created a comprehensive productivity report with key metrics.' }
      ],
      ctas: [
        { label: 'View Full Report', action: 'view-report' },
        { label: 'Set Goals', action: 'set-goals' },
        { label: 'Export to PDF', action: 'export-pdf' }
      ]
    }
  },

];

// Type-specific colors and icons
const typeConfig = {
  email: {
    icon: '✉️',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30',
    textColor: 'text-blue-400'
  },
  calendar: {
    icon: '📅',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/30',
    textColor: 'text-purple-400'
  },
  slack: {
    icon: '💬',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/30',
    textColor: 'text-green-400'
  },
  report: {
    icon: '📊',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/30',
    textColor: 'text-amber-400'
  },
  daily_overview: {
    icon: '🤖',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/30',
    textColor: 'text-amber-400'
  }
};

const BriefingCard = ({ briefing, isSelected, onClick, onAction }) => {
  const config = typeConfig[briefing.type] || typeConfig.email;
  
  return (
    <div 
      className={`relative rounded-2xl p-5 transition-all duration-200 cursor-pointer border-2 ${
        isSelected 
          ? 'border-amber-400 bg-[rgba(255,255,255,0.05)]' 
          : `${config.borderColor} bg-[rgba(10,61,98,0.3)] hover:bg-[rgba(10,61,98,0.4)]`
      }`}
      onClick={onClick}
    >
      <div className="flex items-start">
        <div className={`w-12 h-12 rounded-xl ${config.bgColor} flex items-center justify-center text-2xl mr-4`}>
          {config.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-medium text-blue-100 truncate pr-2">{briefing.title}</h3>
            <span className="text-xs text-amber-100/60 whitespace-nowrap">{briefing.time}</span>
          </div>
          <p className="text-sm text-white/80 mt-1 line-clamp-2">{briefing.summary}</p>
          
          <div className="mt-3 flex flex-wrap gap-2">
            <button 
              onClick={(e) => { e.stopPropagation(); onAction('approve', briefing.id); }}
              className="px-3 py-1 text-xs font-medium bg-gradient-to-r from-amber-400 to-amber-500 text-navy-900 rounded-full hover:opacity-90 transition-opacity"
            >
              Approve
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); onAction('edit', briefing.id); }}
              className="px-3 py-1 text-xs font-medium bg-white/5 text-blue-100 rounded-full hover:bg-white/10 transition-colors"
            >
              Edit
            </button>
          </div>
        </div>
      </div>
      
      {isSelected && (
        <div className="mt-4 pt-4 border-t border-white/5">
          <div className="flex justify-end space-x-2">
            <button 
              onClick={(e) => { e.stopPropagation(); onAction('dismiss', briefing.id); }}
              className="px-3 py-1 text-xs font-medium text-amber-100/70 hover:text-amber-100 transition-colors"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const BriefingsFeedAlt = () => {
  const [filter, setFilter] = useState('today');
  const [briefings, setBriefings] = useState(sampleBriefings);
  // Panel is open by default. If no briefing is selected, show a placeholder in the panel.
  const [selectedBriefing, setSelectedBriefing] = useState(sampleBriefings[0]);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  // Filter briefings based on selected time range
  const filteredBriefings = briefings.filter(briefing => {
    const briefingDate = new Date(briefing.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    weekAgo.setHours(0, 0, 0, 0);
    
    switch (filter) {
      case 'today':
        return briefingDate >= today;
      case 'week':
        return briefingDate >= weekAgo;
      case 'all':
      default:
        return true;
    }
  });

  // Handle actions
  const handleAction = (action, id) => {
    switch (action) {
      case 'approve':
        console.log(`Approved briefing ${id}`);
        break;
      case 'edit':
        console.log(`Edit briefing ${id}`);
        break;
      case 'dismiss':
        setBriefings(briefings.filter(b => b.id !== id));
        if (selectedBriefing && selectedBriefing.id === id) {
          setSelectedBriefing(null);
        }
        break;
      default:
        break;
    }
  };

  // Toggle briefing selection
  const handleBriefingClick = (briefing) => {
    setSelectedBriefing(selectedBriefing?.id === briefing.id ? null : briefing);
  };

  // Toggle view mode
  const toggleViewMode = () => {
    setViewMode(viewMode === 'grid' ? 'list' : 'grid');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <h2 className="text-2xl font-bold text-blue-100">
          {filter === 'today' ? "Today's Briefings" : filter === 'week' ? "This Week's Briefings" : "All Briefings"}
        </h2>
        <div className="flex items-center space-x-4">
          {/* Filter Tabs */}
          {/* Filter Tabs */}
          <div className="flex bg-[rgba(10,61,98,0.7)] p-1 rounded-xl">
            {['today', 'week', 'all'].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                  filter === tab 
                    ? 'bg-amber-500/20 text-amber-100' 
                    : 'text-white/70 hover:text-amber-100'
                }`}
              >
                {tab === 'today' ? 'Today' : tab === 'week' ? 'This Week' : 'All'}
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* Two-column layout */}
      <div className="flex gap-8 items-start">
        {/* Briefing List */}
        <div className="flex-1 min-w-[320px] max-w-lg">
          {/* Aiva's Daily Overview Section */}
          <div className="mb-6">
            <div 
              className="p-5 bg-gradient-to-r from-amber-400/20 to-blue-400/10 border border-amber-400/30 rounded-2xl shadow-md flex flex-col cursor-pointer hover:border-amber-400/50 hover:from-amber-400/25 hover:to-blue-400/15 transition-all"
              onClick={() => handleBriefingClick(sampleBriefings.find(b => b.section === 'daily_overview'))}
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 rounded-full bg-amber-400/30 flex items-center justify-center text-2xl text-amber-500 shadow-inner">
                  🤖
                </div>
                <div className="flex-1">
                  <div className="text-sm text-amber-100 font-semibold">Aiva's Daily Overview</div>
                  <div className="text-xs text-amber-100/70">Tuesday, July 15, 2025</div>
                </div>
                <div className="text-amber-400/70 hover:text-amber-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
              
              <div className="text-blue-100 text-base font-medium leading-snug mb-3">
                Good morning! Today I'm prioritizing your Q2 report review, team sync at 2pm, and client follow-ups.
              </div>
              
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="bg-[rgba(255,255,255,0.05)] p-2 rounded-lg">
                  <div className="text-amber-100/70 mb-1">Meetings</div>
                  <div className="text-white font-medium">3 scheduled</div>
                </div>
                <div className="bg-[rgba(255,255,255,0.05)] p-2 rounded-lg">
                  <div className="text-amber-100/70 mb-1">Tasks</div>
                  <div className="text-white font-medium">5 active</div>
                </div>
                <div className="bg-[rgba(255,255,255,0.05)] p-2 rounded-lg">
                  <div className="text-amber-100/70 mb-1">Weather</div>
                  <div className="text-white font-medium">72°F, Sunny</div>
                </div>
              </div>
            </div>
          </div>
          {/* Sectioned Task List for the Boss */}
          <div className="flex flex-col gap-6">
            {[
              { key: 'in_progress', label: 'In Progress', color: 'text-amber-400', icon: '⚡' },
              { key: 'needs_review', label: 'Needs Review', color: 'text-blue-300', icon: '👁️' },
              { key: 'scheduled', label: 'Scheduled', color: 'text-purple-300', icon: '🗓️' },
              { key: 'recently_completed', label: 'Recently Completed', color: 'text-green-400', icon: '✅' }
            ].map(({ key, label, color, icon }) => {
              const sectionBriefings = filteredBriefings.filter(b => b.section === key);
              return (
                <div key={key}>
                  <div className="mb-2 flex items-center gap-2">
                    <span className={`text-sm font-bold uppercase tracking-wider ${color}`}>{label}</span>
                    <span className="text-xs text-white/30">({sectionBriefings.length})</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    {sectionBriefings.length > 0 ? (
                      sectionBriefings.map((briefing) => (
                        <div
                          key={briefing.id}
                          className={`p-4 rounded-xl cursor-pointer border transition-all ${selectedBriefing?.id === briefing.id ? 'border-amber-400 bg-[rgba(255,255,255,0.05)]' : 'border-white/10 bg-[rgba(10,61,98,0.4)] hover:border-amber-200/30'}`}
                          onClick={() => handleBriefingClick(briefing)}
                        >
                          <div className="flex items-center gap-4">
                            <div className="text-2xl">{typeConfig[briefing.type]?.icon || '📝'}</div>
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-center">
                                <span className="text-xs text-amber-100/70">{briefing.time}</span>
                                <span className="text-xs text-white/50">{briefing.type}</span>
                              </div>
                              <div className="font-medium text-blue-100 truncate">{briefing.title}</div>
                              <div className="text-xs text-white/80 truncate">{briefing.summary}</div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-4 rounded-xl border border-white/5 bg-[rgba(10,61,98,0.2)] text-center">
                        <div className="text-2xl mb-2">{icon}</div>
                        <div className="text-sm text-white/50">No {label.toLowerCase()} items</div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {/* Details Panel */}
        <div className="flex-1 min-w-[340px] max-w-2xl bg-[rgba(10,61,98,0.98)] rounded-2xl border border-white/10 shadow-xl p-6 flex flex-col h-full" style={{minHeight: '600px'}}>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-blue-100">Briefing Details</h3>
            <button 
              onClick={() => setSelectedBriefing(null)}
              className="p-1.5 rounded-full hover:bg-white/10 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-100/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          {selectedBriefing && selectedBriefing.details ? (
            <div className="space-y-6 flex-1 overflow-y-auto">
              <div className="p-4 bg-[rgba(255,255,255,0.05)] rounded-xl">
                <h4 className="text-sm font-medium text-amber-100 mb-3">Message Details</h4>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-amber-100/60">Subject:</p>
                    <p className="text-sm text-blue-100">{selectedBriefing.details.subject}</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs text-amber-100/60">From:</p>
                      <p className="text-sm text-blue-100 truncate">{selectedBriefing.details.from}</p>
                    </div>
                    <div>
                      <p className="text-xs text-amber-100/60">To:</p>
                      <p className="text-sm text-blue-100 truncate">{selectedBriefing.details.to}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-amber-100/60">Message:</p>
                    <div className="mt-1 p-3 bg-[rgba(0,0,0,0.2)] rounded-lg">
                      <p className="text-sm text-blue-100 whitespace-pre-line">{selectedBriefing.details.body}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-[rgba(255,255,255,0.05)] rounded-xl">
                <h4 className="text-sm font-medium text-amber-100 mb-3">Aiva's Actions</h4>
                <div className="space-y-3">
                  {selectedBriefing.details.aivaActions.map((action, index) => (
                    <div key={index} className="flex items-start">
                      <div className="mt-1 mr-3">
                        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-navy-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-blue-100">{action.action}</p>
                        <p className="text-xs text-amber-100/60">{action.details}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selectedBriefing.details.ctas.map((cta, index) => (
                  <button
                    key={index}
                    onClick={() => console.log(`CTA: ${cta.action}`)}
                    className="w-full px-4 py-2.5 text-sm font-medium bg-gradient-to-r from-amber-400 to-amber-500 text-navy-900 rounded-lg hover:opacity-90 transition-opacity"
                  >
                    {cta.label}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-blue-100/60">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4 text-blue-100/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-lg">No briefing selected</p>
              <p className="text-sm mt-2">Select a briefing from the list to see details here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BriefingsFeedAlt;
