import React, { useState } from 'react';

// Sample data for briefings
const sampleBriefings = [
  {
    id: 1,
    time: '9:12 AM',
    title: 'Email to Alice Smith drafted',
    summary: "Subject: Q2 Marketing Report Review\nI've drafted a response to Alice's request for feedback on the Q2 marketing report...",
    type: 'email',
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
    title: 'Meeting with Engineering scheduled',
    summary: 'Added a 30-minute sync with the engineering team to discuss API changes. Scheduled for tomorrow at 2:00 PM.',
    type: 'calendar',
    date: new Date().toISOString(),
    details: {
      from: 'calendar@example.com',
      to: 'engineering-team@example.com',
      subject: 'API Changes Discussion',
      body: "Meeting to discuss upcoming API changes and integration requirements. Please come prepared with your questions.",
      aivaActions: [
        { action: 'Schedule meeting', status: 'completed', details: 'Scheduled a 30-minute meeting for tomorrow at 2:00 PM.' },
        { action: 'Send calendar invites', status: 'completed', details: 'Sent calendar invites to all 5 team members.' }
      ],
      ctas: [
        { label: 'Edit Meeting', action: 'edit-meeting' },
        { label: 'Add Agenda', action: 'add-agenda' },
        { label: 'Cancel Meeting', action: 'cancel' }
      ]
    }
  },
  {
    id: 3,
    time: '11:45 AM',
    title: 'Slack message from Finance summarized',
    summary: 'The finance team posted updates about the Q3 budget in #finance-announcements. Key points: budget freeze lifted, new approvals process.',
    type: 'slack',
    date: new Date().toISOString(),
    details: {
      from: 'finance-team@slack.example.com',
      to: '#finance-announcements',
      subject: 'Q3 Budget Updates',
      body: "Good news everyone! The Q3 budget freeze has been lifted. Please note the new approval process: all expenses over $1000 require director approval, and all expenses over $5000 require VP approval. The new expense form is available in the Finance portal.",
      aivaActions: [
        { action: 'Summarize message', status: 'completed', details: 'Created a summary of key points from the finance announcement.' },
        { action: 'Add to knowledge base', status: 'completed', details: 'Added new approval thresholds to your finance reference guide.' }
      ],
      ctas: [
        { label: 'View Full Thread', action: 'view-thread' },
        { label: 'Open Finance Portal', action: 'open-portal' },
        { label: 'Add to Calendar', action: 'add-reminder' }
      ]
    }
  },
  {
    id: 4,
    time: '2:15 PM',
    title: 'Follow-up email sent to Client XYZ',
    summary: 'Subject: Project Timeline Update\nSent the requested timeline updates to the client with revised milestones.',
    type: 'email',
    date: new Date(Date.now() - 86400000).toISOString(), // Yesterday
    details: {
      from: 'you@example.com',
      to: 'client@xyz-corp.com',
      subject: 'Project Timeline Update',
      body: "Dear Client,\n\nAs discussed in our meeting yesterday, I'm sending the updated project timeline with the revised milestones. We've adjusted the delivery dates to accommodate the new requirements while ensuring we maintain quality.\n\nPlease review and let me know if you have any questions.\n\nBest regards,\nYour Name",
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

const BriefingsFeed = () => {
  const [filter, setFilter] = useState('today');
  const [briefings, setBriefings] = useState(sampleBriefings);
  const [selectedBriefing, setSelectedBriefing] = useState(null);
  const [detailsPanelOpen, setDetailsPanelOpen] = useState(false);

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

  // Handle action buttons
  const handleApprove = (id) => {
    console.log(`Approved briefing ${id}`);
    // In a real app, you would send this to your backend
  };

  const handleEdit = (id) => {
    console.log(`Edit in Gmail: briefing ${id}`);
    // In a real app, this would open Gmail with the draft
  };

  const handleDismiss = (id) => {
    console.log(`Dismissed briefing ${id}`);
    setBriefings(briefings.filter(b => b.id !== id));
    if (selectedBriefing && selectedBriefing.id === id) {
      setSelectedBriefing(null);
      setDetailsPanelOpen(false);
    }
  };
  
  // Handle briefing selection and details panel
  const handleBriefingClick = (briefing) => {
    setSelectedBriefing(briefing);
    setDetailsPanelOpen(true);
  };
  
  const handleCloseDetailsPanel = () => {
    setDetailsPanelOpen(false);
  };
  
  const handleCtaClick = (action) => {
    console.log(`CTA clicked: ${action}`);
    // In a real app, this would perform the action
  };

  // Get icon based on briefing type
  const getTypeIcon = (type) => {
    switch (type) {
      case 'email':
        return '📧';
      case 'calendar':
        return '📅';
      case 'slack':
        return '💬';
      case 'report':
        return '📊';
      default:
        return '📝';
    }
  };

  return (
    <div className="relative flex max-w-7xl mx-auto">
      <div className={`flex-1 transition-all ${detailsPanelOpen ? 'mr-96' : ''}`}>
        <h2 className="text-3xl font-bold mb-6 text-blue-100 drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">Today's Briefings</h2>
      
      {/* Filter tabs */}
      <div className="mb-8 bg-[rgba(10,61,98,0.7)] p-2 rounded-xl shadow-lg shadow-navy-900/20 border border-white/5">
        <div className="flex space-x-2 text-sm font-medium">
          <button 
            className={`px-4 py-2 rounded-lg ${filter === 'today' ? 'bg-[rgba(255,255,255,0.15)] text-amber-100' : 'text-white/80 hover:text-amber-100'}`}
            onClick={() => setFilter('today')}
          >
            Today
          </button>
          <button 
            className={`px-4 py-2 rounded-lg ${filter === 'week' ? 'bg-[rgba(255,255,255,0.15)] text-amber-100' : 'text-white/80 hover:text-amber-100'}`}
            onClick={() => setFilter('week')}
          >
            This Week
          </button>
          <button 
            className={`px-4 py-2 rounded-lg ${filter === 'all' ? 'bg-[rgba(255,255,255,0.15)] text-amber-100' : 'text-white/80 hover:text-amber-100'}`}
            onClick={() => setFilter('all')}
          >
            All Time
          </button>
        </div>
      </div>
      
      {/* Briefings list */}
      <div className="space-y-6">
        {filteredBriefings.length === 0 ? (
          <div className="text-center py-16 text-white/70 bg-[rgba(10,61,98,0.4)] backdrop-blur-sm rounded-xl border border-white/5 shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            <p className="text-lg">No briefings to show for this time period.</p>
          </div>
        ) : (
          filteredBriefings.map(briefing => (
            <div 
              key={briefing.id} 
              className={`p-5 bg-[rgba(10,61,98,0.4)] backdrop-blur-sm rounded-xl border ${selectedBriefing && selectedBriefing.id === briefing.id ? 'border-amber-400/50' : 'border-white/5 hover:border-amber-200/30'} transition-all shadow-lg hover:shadow-xl cursor-pointer`}
              onClick={() => handleBriefingClick(briefing)}
            >
              <div className="flex items-start">
                <div className="mr-4 text-2xl drop-shadow-md">{getTypeIcon(briefing.type)}</div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1.5">
                    <div className="text-sm text-amber-100/70">{briefing.time}</div>
                  </div>
                  <h3 className="text-lg font-medium text-blue-100 mb-2">{briefing.title}</h3>
                  <p className="text-sm leading-relaxed text-white/80 mb-4 whitespace-pre-line">{briefing.summary}</p>
                  
                  <div className="flex flex-wrap gap-3">
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleApprove(briefing.id); }}
                      className="px-4 py-1.5 text-sm font-medium bg-gradient-to-r from-amber-400 to-amber-500 text-navy-900 rounded-md hover:opacity-90 transition-opacity shadow-sm shadow-amber-900/20"
                    >
                      Approve
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleEdit(briefing.id); }}
                      className="px-4 py-1.5 text-sm font-medium bg-[rgba(10,40,70,0.8)] text-blue-100 rounded-md hover:bg-[rgba(10,40,70,0.9)] transition-colors shadow-sm border border-white/10"
                    >
                      Edit in Gmail
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleDismiss(briefing.id); }}
                      className="px-4 py-1.5 text-sm font-medium bg-transparent border border-white/20 text-amber-100/70 rounded-md hover:bg-[rgba(255,255,255,0.05)] hover:text-amber-100 transition-colors"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      </div>
      
      {/* Details Panel */}
      <div className={`fixed top-0 right-0 h-full w-96 bg-[rgba(10,61,98,0.95)] backdrop-blur-md border-l border-white/10 shadow-xl transform transition-transform duration-300 ease-in-out z-10 overflow-y-auto ${detailsPanelOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {selectedBriefing && (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-blue-100">Details</h3>
              <button 
                onClick={handleCloseDetailsPanel}
                className="p-1.5 rounded-full hover:bg-white/10 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-100/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="mb-6 pb-6 border-b border-white/10">
              <div className="flex items-center mb-4">
                <div className="mr-3 text-2xl">{getTypeIcon(selectedBriefing.type)}</div>
                <div>
                  <h4 className="text-lg font-medium text-blue-100">{selectedBriefing.title}</h4>
                  <p className="text-sm text-amber-100/70">{selectedBriefing.time}</p>
                </div>
              </div>
            </div>
            
            {selectedBriefing.details && (
              <>
                <div className="mb-6 pb-6 border-b border-white/10">
                  <h4 className="text-sm font-medium text-amber-100 mb-3">Message Details</h4>
                  
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs text-amber-100/60">From:</p>
                      <p className="text-sm text-blue-100">{selectedBriefing.details.from}</p>
                    </div>
                    <div>
                      <p className="text-xs text-amber-100/60">To:</p>
                      <p className="text-sm text-blue-100">{selectedBriefing.details.to}</p>
                    </div>
                    <div>
                      <p className="text-xs text-amber-100/60">Subject:</p>
                      <p className="text-sm text-blue-100">{selectedBriefing.details.subject}</p>
                    </div>
                    <div>
                      <p className="text-xs text-amber-100/60">Message:</p>
                      <p className="text-sm text-blue-100 whitespace-pre-line mt-2 p-3 bg-[rgba(255,255,255,0.05)] rounded-lg">{selectedBriefing.details.body}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6 pb-6 border-b border-white/10">
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
                
                <div>
                  <h4 className="text-sm font-medium text-amber-100 mb-3">Actions</h4>
                  
                  <div className="grid grid-cols-1 gap-3">
                    {selectedBriefing.details.ctas.map((cta, index) => (
                      <button 
                        key={index}
                        onClick={() => handleCtaClick(cta.action)}
                        className="w-full px-4 py-2.5 text-sm font-medium bg-gradient-to-r from-amber-400 to-amber-500 text-navy-900 rounded-md hover:opacity-90 transition-opacity shadow-sm shadow-amber-900/20"
                      >
                        {cta.label}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BriefingsFeed;
