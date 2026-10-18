import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';
import { QuadrantId } from '../types';

interface StepData {
  stepNumber: number;
  title: string;
  quadrantFocus?: QuadrantId | 'all' | 'axes';
  caption: string;
}

const STEPS: StepData[] = [
  {
    stepNumber: 1,
    title: 'The Foundational Question',
    quadrantFocus: 'all',
    caption: 'When people and AI share a task, who should lead? To answer this, we evaluate two fundamental axes of work rather than treating AI as a blunt one-size-fits-all substitute.',
  },
  {
    stepNumber: 2,
    title: 'The Two Questions That Map Every Task',
    quadrantFocus: 'axes',
    caption: '1. Does the task have a right answer (objective/verifiable vs open-ended/exploratory)? 2. Must people and AI do it together, or can either do it alone?',
  },
  {
    stepNumber: 3,
    title: 'A Person Leads, AI Inside',
    quadrantFocus: 'together_right_answer',
    caption: 'Work with a right answer, and people & AI must do together. Tasks 1, 2, and 3 belong here: Email triage (urgent 2-day deadlines), multi-channel VIP pings, and news summarization. AI extracts facts inside, while the human leads accountability.',
  },
  {
    stepNumber: 4,
    title: 'AI Alone (Autonomous Execution)',
    quadrantFocus: 'alone_right_answer',
    caption: 'Work with a right answer, and either can do it alone: Task 4 belongs here. Standardized property record translation into multiple languages and automated email dispatch runs autonomously end-to-end without human bottlenecks.',
  },
  {
    stepNumber: 5,
    title: 'AI Agents Run, A Person Judges Inside',
    quadrantFocus: 'together_no_right_answer',
    caption: 'No single right answer, but people and AI must work together: AI agent swarms generate hundreds of creative concepts, brand copies, or marketing variants; human creative directors judge taste and nuance inside.',
  },
  {
    stepNumber: 6,
    title: 'A Person Decides, With AI Alongside',
    quadrantFocus: 'alone_no_right_answer',
    caption: 'No single right answer, and either can do it alone: A person decides with AI alongside. A consultant advises on a merger; a banker plans a high-stakes client negotiation with AI drafting scenario options alongside.',
  },
];

interface LectureStepperProps {
  activeStep: number;
  onStepChange: (step: number) => void;
}

export const LectureStepper: React.FC<LectureStepperProps> = ({ activeStep, onStepChange }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState<1 | 1.5 | 2>(1);

  useEffect(() => {
    if (!isPlaying) return;
    const intervalTime = 4500 / speed;
    const timer = setInterval(() => {
      onStepChange(activeStep >= 6 ? 1 : activeStep + 1);
    }, intervalTime);
    return () => clearInterval(timer);
  }, [isPlaying, activeStep, speed, onStepChange]);

  const current = STEPS[activeStep - 1] || STEPS[0];

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200/80">
            Interactive Framework Tour
          </span>
          <span className="text-xs text-slate-400">·</span>
          <span className="text-xs font-medium text-slate-600">
            Based on Human-AI Collaboration Research
          </span>
        </div>

        <div className="text-xs font-medium text-slate-500">
          Step <span className="font-semibold text-slate-900">{activeStep}</span> of 6
          <span className="text-slate-400 mx-1.5">·</span>
          <span className="text-slate-800 font-semibold">{current.title}</span>
        </div>
      </div>

      {/* Caption block */}
      <div className="py-3 text-sm text-slate-700 leading-relaxed">
        <span className="font-bold text-slate-900 mr-2">{activeStep}.</span>
        {current.caption}
      </div>

      {/* Control bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-md transition-colors"
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5" /> Pause
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" /> Play
              </>
            )}
          </button>

          <button
            onClick={() => {
              setIsPlaying(false);
              onStepChange(Math.max(1, activeStep - 1));
            }}
            disabled={activeStep <= 1}
            className="cursor-pointer inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:pointer-events-none rounded-md transition-colors"
          >
            <ChevronLeft className="w-3.5 h-3.5" /> Back
          </button>

          <button
            onClick={() => {
              setIsPlaying(false);
              onStepChange(Math.min(6, activeStep + 1));
            }}
            disabled={activeStep >= 6}
            className="cursor-pointer inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:pointer-events-none rounded-md transition-colors"
          >
            Step <ChevronRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => {
              setIsPlaying(false);
              onStepChange(1);
            }}
            className="cursor-pointer p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-md transition-colors"
            title="Restart tour"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Step buttons */}
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <button
              key={num}
              onClick={() => {
                setIsPlaying(false);
                onStepChange(num);
              }}
              className={`cursor-pointer w-7 h-7 text-xs font-semibold rounded-md transition-all ${
                activeStep === num
                  ? 'bg-rose-600 text-white shadow-xs scale-105'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              {num}
            </button>
          ))}
        </div>

        {/* Speed toggle */}
        <div className="flex items-center gap-1 text-xs text-slate-500">
          <span>Speed:</span>
          {([1, 1.5, 2] as const).map((s) => (
            <button
              key={s}
              onClick={() => setSpeed(s)}
              className={`cursor-pointer px-1.5 py-0.5 rounded text-[11px] font-mono ${
                speed === s ? 'bg-slate-200 font-bold text-slate-900' : 'hover:bg-slate-100'
              }`}
            >
              {s}×
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
