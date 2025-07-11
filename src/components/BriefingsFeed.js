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
  },
  {
    id: 2,
    time: '10:30 AM',
    title: 'Meeting with Engineering scheduled',
    summary: 'Added a 30-minute sync with the engineering team to discuss API changes. Scheduled for tomorrow at 2:00 PM.',
    type: 'calendar',
    date: new Date().toISOString(),
  },
  {
    id: 3,
    time: '11:45 AM',
    title: 'Slack message from Finance summarized',
    summary: 'The finance team posted updates about the Q3 budget in #finance-announcements. Key points: budget freeze lifted, new approvals process.',
    type: 'slack',
    date: new Date().toISOString(),
  },
  {
    id: 4,
    time: '2:15 PM',
    title: 'Follow-up email sent to Client XYZ',
    summary: 'Subject: Project Timeline Update\nSent the requested timeline updates to the client with revised milestones.',
    type: 'email',
    date: new Date(Date.now() - 86400000).toISOString(), // Yesterday
  },
  {
    id: 5,
    time: '4:30 PM',
    title: 'Weekly report generated',
    summary: 'Created your weekly productivity summary: 37 emails processed, 12 meetings scheduled, 5 tasks completed.',
    type: 'report',
    date: new Date(Date.now() - 86400000 * 3).toISOString(), // 3 days ago
  },
];

const BriefingsFeed = () => {
  const [filter, setFilter] = useState('today');
  const [briefings, setBriefings] = useState(sampleBriefings);

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
    <div className="max-w-4xl mx-auto">
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
            <div key={briefing.id} className="p-5 bg-[rgba(10,61,98,0.4)] backdrop-blur-sm rounded-xl border border-white/5 hover:border-amber-200/30 transition-all shadow-lg hover:shadow-xl">
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
                      onClick={() => handleApprove(briefing.id)}
                      className="px-4 py-1.5 text-sm font-medium bg-gradient-to-r from-amber-400 to-amber-500 text-navy-900 rounded-md hover:opacity-90 transition-opacity shadow-sm shadow-amber-900/20"
                    >
                      Approve
                    </button>
                    <button 
                      onClick={() => handleEdit(briefing.id)}
                      className="px-4 py-1.5 text-sm font-medium bg-[rgba(10,40,70,0.8)] text-blue-100 rounded-md hover:bg-[rgba(10,40,70,0.9)] transition-colors shadow-sm border border-white/10"
                    >
                      Edit in Gmail
                    </button>
                    <button 
                      onClick={() => handleDismiss(briefing.id)}
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
  );
};

export default BriefingsFeed;
