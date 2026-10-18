import React from 'react';

interface HeaderProps {
  currentTab: string;
  onSelectTab: (tabId: string) => void;
  onOpenClassifier: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  onOpenClassifier,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-6 py-3.5">
        {/* Zone 1: Brand wordmark */}
        <button
          onClick={() => onSelectTab('matrix')}
          className="text-base font-bold tracking-tight text-slate-900 hover:text-teal-700 transition-colors whitespace-nowrap shrink-0 text-left cursor-pointer"
        >
          Task Segregation Matrix
        </button>

        {/* Zone 2: 4–5 concise single-line nav links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
          <button
            onClick={() => onSelectTab('matrix')}
            className={`cursor-pointer whitespace-nowrap shrink-0 transition-colors ${
              currentTab === 'matrix' ? 'text-teal-700 font-semibold' : 'hover:text-slate-900'
            }`}
          >
            2×2 Matrix Map
          </button>
          <button
            onClick={() => onSelectTab('gmail_priority')}
            className={`cursor-pointer whitespace-nowrap shrink-0 transition-colors ${
              currentTab === 'gmail_priority' ? 'text-teal-700 font-semibold' : 'hover:text-slate-900'
            }`}
          >
            Gmail Triage (Task 1)
          </button>
          <button
            onClick={() => onSelectTab('urgent_notifications')}
            className={`cursor-pointer whitespace-nowrap shrink-0 transition-colors ${
              currentTab === 'urgent_notifications' ? 'text-teal-700 font-semibold' : 'hover:text-slate-900'
            }`}
          >
            VIP Pings (Task 2)
          </button>
          <button
            onClick={() => onSelectTab('news_summary')}
            className={`cursor-pointer whitespace-nowrap shrink-0 transition-colors ${
              currentTab === 'news_summary' ? 'text-teal-700 font-semibold' : 'hover:text-slate-900'
            }`}
          >
            News Synthesizer (Task 3)
          </button>
          <button
            onClick={() => onSelectTab('property_translation')}
            className={`cursor-pointer whitespace-nowrap shrink-0 transition-colors ${
              currentTab === 'property_translation' ? 'text-teal-700 font-semibold' : 'hover:text-slate-900'
            }`}
          >
            Property Pipeline (Task 4)
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenClassifier}
            className="cursor-pointer px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-xs"
          >
            Classify Any Task
          </button>
        </div>
      </div>
    </header>
  );
};
