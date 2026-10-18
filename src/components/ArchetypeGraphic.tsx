import React from 'react';
import { QuadrantId } from '../types';

interface ArchetypeGraphicProps {
  quadrantId: QuadrantId;
  compact?: boolean;
}

export const ArchetypeGraphic: React.FC<ArchetypeGraphicProps> = ({ quadrantId, compact = false }) => {
  if (quadrantId === 'together_right_answer') {
    // Top-Left: Outer oval "A person leads", Inner circle "AI inside"
    return (
      <div className={`relative flex items-center justify-center ${compact ? 'w-full h-16' : 'w-full h-24'} select-none`}>
        {/* Outer Oval - A Person Leads */}
        <div className="w-[90%] max-w-[280px] h-[90%] border-2 border-purple-400/80 bg-purple-50/50 rounded-full flex flex-col items-center justify-between p-1.5 shadow-xs transition-all hover:border-purple-500">
          <span className="text-[11px] font-semibold text-purple-900 tracking-tight">
            A person leads
          </span>

          {/* Inner Oval/Circle - AI Inside */}
          <div className="w-[62%] h-[60%] border-2 border-teal-500 bg-teal-50 rounded-full flex items-center justify-center shadow-xs">
            <span className="text-[10px] font-bold text-teal-800 tracking-tight">
              AI inside
            </span>
          </div>

          <div className="h-0.5" />
        </div>
      </div>
    );
  }

  if (quadrantId === 'together_no_right_answer') {
    // Top-Right: Outer oval "AI agents run the work", Inner circle "a person judges inside"
    return (
      <div className={`relative flex items-center justify-center ${compact ? 'w-full h-16' : 'w-full h-24'} select-none`}>
        {/* Outer Oval - AI Agents Run The Work */}
        <div className="w-[90%] max-w-[280px] h-[90%] border-2 border-teal-500/80 bg-teal-50/50 rounded-full flex flex-col items-center justify-between p-1.5 shadow-xs transition-all hover:border-teal-600">
          <span className="text-[11px] font-semibold text-teal-900 tracking-tight">
            AI agents run the work
          </span>

          {/* Inner Oval/Circle - A Person Judges Inside */}
          <div className="w-[62%] h-[60%] border-2 border-purple-400 bg-purple-50 rounded-full flex items-center justify-center shadow-xs">
            <span className="text-[10px] font-bold text-purple-900 tracking-tight">
              a person judges inside
            </span>
          </div>

          <div className="h-0.5" />
        </div>
      </div>
    );
  }

  if (quadrantId === 'alone_right_answer') {
    // Bottom-Left: Single oval "AI alone"
    return (
      <div className={`relative flex items-center justify-center ${compact ? 'w-full h-16' : 'w-full h-24'} select-none`}>
        <div className="w-[84%] max-w-[240px] h-[78%] border-2 border-teal-500 bg-teal-50/60 rounded-full flex items-center justify-center shadow-xs transition-all hover:border-teal-600">
          <span className="text-xs font-bold text-teal-900 tracking-tight">
            AI alone
          </span>
        </div>
      </div>
    );
  }

  // Bottom-Right: Overlapping Venn circles "A person" + "AI"
  return (
    <div className={`relative flex items-center justify-center ${compact ? 'w-full h-16' : 'w-full h-24'} select-none`}>
      <div className="relative flex items-center justify-center w-[84%] max-w-[260px] h-[80%]">
        {/* Left Circle - A Person */}
        <div className="absolute left-4 w-32 h-14 border-2 border-purple-400 bg-purple-100/70 rounded-full flex items-center pl-4 shadow-xs">
          <span className="text-[11px] font-bold text-purple-900">
            A person
          </span>
        </div>
        {/* Right Circle - + AI */}
        <div className="absolute right-4 w-28 h-14 border-2 border-teal-500 bg-teal-100/70 rounded-full flex items-center justify-end pr-4 shadow-xs">
          <span className="text-[11px] font-bold text-teal-900">
            + AI
          </span>
        </div>
      </div>
    </div>
  );
};
