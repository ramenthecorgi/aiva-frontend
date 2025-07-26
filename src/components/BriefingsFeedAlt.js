import React, { useState } from 'react';

// Sample data for briefings (same as original)
const sampleBriefings = [
  // Creator-focused sample data
  {
    id: 0,
    time: '8:00 AM',
    title: 'Your Creator Daily Digest',
    summary: "Morning! Here's your content schedule, social media pulse, and top priorities.",
    type: 'daily_overview',
    section: 'daily_overview',
    date: new Date().toISOString(),
    details: {
      from: 'aiva-system@example.com',
      to: 'creator@example.com',
      subject: 'Creator Daily Digest - ' + new Date().toLocaleDateString(),
      body: "Good morning,\n\nHere’s your creator digest:\n\n• Today's Video: 'My Minimalist Desk Setup' goes live at 2 PM EST.\n• Social Media: Post Instagram story poll about next video topic.\n• Priorities: Finalize script for Friday's video, review thumbnail drafts from editor.\n• Channel Pulse: Yesterday's video gained 15.2k views, +5% CTR, 98.2% positive sentiment.\n• Today's Inspiration: 'The secret of getting ahead is getting started.' - Mark Twain\n\nLet's make some great content today!\n\nAiva",
      aivaActions: [
        { action: 'YouTube Analytics Sync', status: 'completed', details: 'Synced with your YouTube Studio and analyzed last video performance.' },
        { action: 'Content Calendar Check', status: 'completed', details: 'Checked your content calendar for today’s schedule.' },
        { action: 'Social Media Trend Analysis', status: 'completed', details: 'Analyzed trending topics in your niche.' }
      ],
      ctas: [
        { label: 'View Content Calendar', action: 'calendar' },
        { label: 'Draft Instagram Post', action: 'draft-social' },
        { label: 'Review Script', action: 'review-script' }
      ]
    }
  },
  {
    id: 1,
    time: '10:20 AM',
    title: 'Drafted promo email for new video',
    summary: "Subject: NEW VIDEO: My Minimalist Desk Setup is LIVE! I've drafted a promotional email for your subscribers...",
    type: 'email',
    section: 'in_progress',
    date: new Date().toISOString(),
    details: {
      from: 'creator@example.com',
      to: 'subscribers@example.com',
      subject: 'NEW VIDEO: My Minimalist Desk Setup is LIVE!',
      body: "Hey everyone,\n\nMy new video, 'My Minimalist Desk Setup for Maximum Productivity,' is now live on YouTube!\n\nIn this one, I'm sharing all the secrets to how I keep my workspace clean, focused, and ready for creative work. I think you're going to love it.\n\nWatch it here: [YouTube Link]\n\nLet me know what you think in the comments!\n\nBest,\n[Your Name]",
      aivaActions: [
        { action: 'Draft promotional email', status: 'completed', details: 'Created a draft based on your new video details.' },
        { action: 'Identify target audience', status: 'completed', details: 'Segmented your mailing list for this announcement.' }
      ],
      ctas: [
        { label: 'Send to Subscribers', action: 'send' },
        { label: 'Edit Draft', action: 'edit' },
        { label: 'Schedule for Later', action: 'schedule' }
      ]
    }
  },
  {
    id: 2,
    time: '1:15 PM',
    title: 'Scheduled collab meeting with @TechSource',
    summary: "Aiva scheduled your collaboration planning session for next Tuesday at 4 PM.",
    type: 'calendar',
    section: 'recently_completed',
    date: new Date().toISOString(),
    details: {
      from: 'calendar-system@example.com',
      to: 'creator@example.com',
      subject: 'Collab Planning: You + @TechSource',
      body: "Your collaboration planning meeting with @TechSource is scheduled for next Tuesday at 4 PM EST.\n\nAttendees: You, @TechSource",
      aivaActions: [
        { action: 'Coordinate schedules', status: 'completed', details: 'Found a time that works for both you and @TechSource.' },
        { action: 'Create calendar event', status: 'completed', details: 'Added event to your calendar and sent invites.' }
      ],
      ctas: [
        { label: 'View in Calendar', action: 'view-calendar' },
        { label: 'Add Agenda', action: 'add-agenda' },
        { label: 'Reschedule', action: 'reschedule' }
      ]
    }
  },
  {
    id: 3,
    time: '3:45 PM',
    title: 'Sent Slack message to your editor',
    summary: "Sent feedback on the latest thumbnail drafts to Jane in #design-feedback channel.",
    type: 'slack',
    status: 'completed',
    date: new Date().toISOString(),
    details: {
      from: 'you@askaiva.app',
      to: 'jane-editor@example.com',
      subject: 'Thumbnail Feedback',
      body: "Hey Jane, the new thumbnails are looking great. Let's go with version C, but can we bump up the saturation on the background? Thanks!",
      aivaActions: [
        { action: 'Draft Slack message', status: 'completed', details: 'Drafted feedback message for your editor.' },
        { action: 'Send message', status: 'completed', details: 'Message sent to Jane in #design-feedback.' }
      ],
      ctas: [
        { label: 'View in Slack', action: 'view-slack' }
      ]
    }
  },
  {
    id: 4,
    time: '5:00 PM',
    title: 'Generated Weekly Channel Report',
    summary: 'Created your weekly channel performance summary: +12k subscribers, 1.2M views, top video gained 250k views.',
    type: 'report',
    section: 'scheduled',
    date: new Date().toISOString(),
    details: {
      from: 'aiva-system@example.com',
      to: 'creator@example.com',
      subject: 'Your Weekly YouTube Channel Report',
      body: "Here's your channel performance for the week:\n\n• Subscribers: +12,345\n• Views: 1,2M\n• Watch Time: 8.5M minutes\n• Top Video: 'My Morning Routine' (250k views)\n• Audience Retention: 62% average\n\nGreat work this week!",
      aivaActions: [
        { action: 'Analyze YouTube data', status: 'completed', details: 'Pulled and analyzed data from your YouTube Studio.' },
        { action: 'Generate summary', status: 'completed', details: 'Summarized key metrics and highlights.' }
      ],
      ctas: [
        { label: 'View Full Report', action: 'view-report' },
        { label: 'Set Next Week’s Goals', action: 'set-goals' },
        { label: 'Share with Team', action: 'share-report' }
      ]
    }
  },
  {
    id: 5,
    time: '9:30 AM',
    title: 'Sponsorship Inquiry from \'AudioPro\'',
    summary: 'You received a new sponsorship inquiry from AudioPro regarding a potential collaboration for their new headphones.',
    type: 'email',
    section: 'in_progress',
    date: new Date().toISOString(),
    details: {
      from: 'partnerships@audiopro.com',
      to: 'creator@example.com',
      subject: 'Sponsorship Opportunity: AudioPro & [Your Channel Name]',
      body: "Hi [Your Name],\n\nMy name is Sarah and I'm with the partnerships team at AudioPro. We're launching a new line of studio headphones and are big fans of your content.\n\nWe'd love to explore a potential sponsorship for an upcoming video. Are you available for a brief chat next week?\n\nBest,\nSarah",
      aivaActions: [
        { action: 'Vetting', status: 'completed', details: 'Verified sender and company profile.' },
        { action: 'Suggest Reply', status: 'in_progress', details: 'Drafting a reply to express interest and ask for details.' }
      ],
      ctas: [
        { label: 'Draft Reply', action: 'draft-reply' },
        { label: 'Mark as Not Interested', action: 'not-interested' },
        { label: 'View Company Website', action: 'view-website' }
      ]
    }
  },
  {
    id: 6,
    time: '11:00 AM',
    title: 'Comment Spotlight on \'Minimalist Desk Setup\'',
    summary: 'A top comment from a long-time subscriber asks for a follow-up video on cable management. It has over 500 likes.',
    type: 'social',
    section: 'in_progress',
    date: new Date().toISOString(),
    details: {
      from: 'youtube-comments@example.com',
      to: 'creator@example.com',
      subject: 'Comment Spotlight: Follow-up video idea!',
      body: "Comment from @viewer123:\n\n'This setup is amazing! The one thing I struggle with is cable management. Any chance of a follow-up video dedicated to how you hide all your cables so effectively? Would be a lifesaver!'\n\nThis comment has high engagement and could be a great topic for your next video.",
      aivaActions: [
        { action: 'Comment Monitoring', status: 'completed', details: 'Identified a highly-liked comment with a content idea.' },
        { action: 'Sentiment Analysis', status: 'completed', details: 'Comment sentiment is overwhelmingly positive.' }
      ],
      ctas: [
        { label: 'Reply to Comment', action: 'reply-comment' },
        { label: 'Add to Idea List', action: 'add-idea' },
        { label: 'Dismiss', action: 'dismiss' }
      ]
    }
  },
  {
    id: 7,
    time: '4:00 PM',
    title: 'Reminder: Livestream Today at 7 PM EST',
    summary: 'Your weekly Q&A livestream is scheduled for tonight. Aiva has prepared a list of potential topics based on recent comments.',
    type: 'calendar',
    section: 'scheduled',
    date: new Date().toISOString(),
    details: {
      from: 'aiva-calendar@example.com',
      to: 'creator@example.com',
      subject: 'Reminder: Livestream Today at 7 PM EST',
      body: "Just a reminder about your livestream tonight.\n\nTopic: Weekly Q&A\nTime: 7:00 PM EST\nPlatform: YouTube Live\n\nSuggested talking points based on recent channel activity:\n- Your new desk setup (follow-up questions)\n- Thoughts on the latest 'TechPro' camera release\n- Your video production workflow\n\nGood luck!",
      aivaActions: [
        { action: 'Topic Generation', status: 'completed', details: 'Scanned recent comments and community posts for popular topics.' },
        { action: 'Event Reminder', status: 'completed', details: 'Synced with your calendar to provide this reminder.' }
      ],
      ctas: [
        { label: 'Go Live Checklist', action: 'go-live' },
        { label: 'View Talking Points', action: 'view-topics' },
        { label: 'Post Reminder on Socials', action: 'post-reminder' }
      ]
    }
  },
  {
    id: 8,
    time: '6:00 PM',
    title: 'Confirmed Dinner Reservation at \'The Grove\'',
    summary: "Aiva called 'The Grove' and confirmed your dinner reservation for 2 at 8:00 PM tonight.",
    type: 'phone',
    section: 'recently_completed',
    date: new Date().toISOString(),
    details: {
      from: 'Aiva Assistant',
      to: 'The Grove Restaurant',
      subject: 'Confirmation of Dinner Reservation',
      body: "Transcript Summary:\n- Aiva: 'Hi, I'm calling to confirm a reservation for [Your Name] for 2 people at 8 PM tonight.'\n- The Grove: 'Yes, we have that reservation. We'll see you at 8!'\n- Aiva: 'Thank you, goodbye.'",
      aivaActions: [
        { action: 'Make Phone Call', status: 'completed', details: 'Called The Grove at (555) 123-4567.' },
        { action: 'Confirm Details', status: 'completed', details: 'Verbally confirmed reservation time and party size.' }
      ],
      ctas: [
        { label: 'Get Directions', action: 'get-directions' },
        { label: 'Call Restaurant', action: 'call-restaurant' }
      ]
    }
  }
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
  },
  phone: {
    icon: '📞',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/30',
    textColor: 'text-green-400'
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
    <div className="max-w-7xl mx-auto px-4 py-6 overflow-hidden h-[calc(100vh-6rem)]">
      <div className="h-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <h2 className="text-2xl font-bold text-blue-100">
          {filter === 'today' ? "Today's Briefings" : filter === 'week' ? "This Week's Briefings" : "All Briefings"}
        </h2>
        <div className="flex items-center space-x-4">
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
      {/* Two-column layout - full height with individual scrolling panels */}
      <div className="flex gap-8 h-[calc(100vh-12rem)] overflow-hidden">
        {/* Briefing List - Left Panel with scrolling */}
        <div className="flex-1 min-w-[320px] max-w-lg overflow-y-auto pr-2" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.2) transparent' }}>
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
        {/* Details Panel - Right Panel with scrolling */}
        <div className="flex-1 min-w-[340px] max-w-2xl bg-[rgba(10,61,98,0.98)] rounded-2xl border border-white/10 shadow-xl flex flex-col h-full overflow-hidden">
          {/* Fixed Header */}
          <div className="p-6 border-b border-white/10">
            <div className="flex justify-between items-center">
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
          </div>
          
          {/* Scrollable Content */}
          {selectedBriefing && selectedBriefing.details ? (
            <div className="p-6 space-y-6 flex-1 overflow-y-auto" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.2) transparent' }}>
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
    </div>
  );
};

export default BriefingsFeedAlt;
