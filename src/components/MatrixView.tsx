import React from 'react';
import { TaskItem, QuadrantId } from '../types';
import { ArchetypeGraphic } from './ArchetypeGraphic';
import { ArrowRight, Info, CheckCircle2, ShieldCheck, Sparkles, User, Bot } from 'lucide-react';

interface MatrixViewProps {
  tasks: TaskItem[];
  activeStep: number;
  onSelectTask: (task: TaskItem) => void;
  onOpenWorkspace: (workspaceKey: string) => void;
}

export const MatrixView: React.FC<MatrixViewProps> = ({
  tasks,
  activeStep,
  onSelectTask,
  onOpenWorkspace,
}) => {
  // Determine if a quadrant is highlighted by the lecture stepper
  const getIsHighlighted = (quadrantId: QuadrantId) => {
    if (activeStep === 1 || activeStep === 2) return false;
    if (activeStep === 3 && quadrantId === 'together_right_answer') return true;
    if (activeStep === 4 && quadrantId === 'alone_right_answer') return true;
    if (activeStep === 5 && quadrantId === 'together_no_right_answer') return true;
    if (activeStep === 6 && quadrantId === 'alone_no_right_answer') return true;
    return false;
  };

  const getQuadrantTasks = (quadrantId: QuadrantId) => {
    return tasks.filter((t) => t.quadrantId === quadrantId);
  };

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          When people and AI share a task, who should lead?
        </h1>
        <p className="mt-2 text-slate-600 max-w-3xl leading-relaxed text-sm sm:text-base">
          Team, two questions place any task on this map:{' '}
          <span className="font-semibold text-slate-900">Does it have a right answer?</span> And{' '}
          <span className="font-semibold text-slate-900">
            is it work that people and AI must do together, or work that either of them can do alone?
          </span>
        </p>

        {/* Legend / Status Pill info */}
        <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-600" />
            <span>Human-led accountability & judgment</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-600" />
            <span>AI capability (Extraction, Drafts, Automation)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-rose-600">Tasks 1, 2, 3:</span>
            <span>Top-Left (Together + Right Answer)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-teal-600">Task 4:</span>
            <span>Bottom-Left (AI Alone + Right Answer)</span>
          </div>
        </div>
      </div>

      {/* The 2x2 Matrix Grid */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
        {/* Column Headers (Navy Blue, matching slide) */}
        <div className="grid grid-cols-12 border-b border-slate-200 bg-slate-900 text-white">
          {/* Top-left empty corner for row headers */}
          <div className="hidden md:block col-span-3 lg:col-span-2 p-4 bg-slate-950/70 border-r border-slate-800 text-xs font-semibold text-slate-400">
            Axis Coordinates
          </div>
          {/* Column 1 */}
          <div className="col-span-12 md:col-span-9 lg:col-span-5 p-3.5 sm:p-4 text-center border-r border-slate-800">
            <h2 className="text-sm sm:text-base font-bold tracking-tight">
              Work with a right answer
            </h2>
            <p className="text-[11px] text-slate-300 mt-0.5">
              Deterministic, factually verifiable, measurable correctness
            </p>
          </div>
          {/* Column 2 */}
          <div className="col-span-12 md:col-span-12 lg:col-span-5 p-3.5 sm:p-4 text-center">
            <h2 className="text-sm sm:text-base font-bold tracking-tight">
              Work with no single right answer
            </h2>
            <p className="text-[11px] text-slate-300 mt-0.5">
              Subjective, exploratory, taste-driven, strategic nuance
            </p>
          </div>
        </div>

        {/* Row 1: Work that people and AI must do together */}
        <div className="grid grid-cols-12 border-b border-slate-200 min-h-[360px]">
          {/* Row Label */}
          <div className="col-span-12 md:col-span-3 lg:col-span-2 p-4 bg-slate-50 border-r border-slate-200 flex flex-col justify-center">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Interdependence
            </span>
            <span className="text-sm font-bold text-slate-800 mt-1 leading-snug">
              Work that people and AI must do together
            </span>
            <p className="text-xs text-slate-500 mt-2">
              High stakes, reputational impact, or mutual cognitive synergy.
            </p>
          </div>

          {/* Quadrant Top-Left: Together + Right Answer */}
          <div
            className={`col-span-12 md:col-span-9 lg:col-span-5 p-5 border-r border-slate-200 transition-all flex flex-col ${
              getIsHighlighted('together_right_answer')
                ? 'bg-purple-50/60 ring-2 ring-purple-500 ring-inset'
                : 'bg-white'
            }`}
          >
            {/* Visual Archetype Oval */}
            <div className="mb-4">
              <ArchetypeGraphic quadrantId="together_right_answer" />
            </div>

            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-900">
                Quadrant: Top-Left
              </span>
              <span className="text-xs font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                Tasks 1, 2 & 3 Assigned Here
              </span>
            </div>

            {/* Task list in Top-Left */}
            <div className="space-y-3 flex-1">
              {getQuadrantTasks('together_right_answer').map((task) => (
                <div
                  key={task.id}
                  className="group border border-slate-200 hover:border-purple-300 rounded-lg p-3.5 bg-slate-50/50 hover:bg-purple-50/30 transition-all shadow-2xs"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-purple-600 text-white text-[11px] font-bold flex items-center justify-center shrink-0">
                        {task.number}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 group-hover:text-purple-900 transition-colors">
                        {task.title}
                      </h4>
                    </div>
                    <button
                      onClick={() => onSelectTask(task)}
                      className="cursor-pointer text-slate-400 hover:text-slate-700 p-1 rounded"
                      title="View Theoretical Rationale"
                    >
                      <Info className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    {task.subtitle}
                  </p>

                  <div className="mt-2.5 pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 text-slate-500">
                      <span>{task.tags[0]}</span>
                      <span>·</span>
                      <span>{task.tags[1]}</span>
                    </div>

                    {task.workspaceKey !== 'general' && (
                      <button
                        onClick={() => onOpenWorkspace(task.workspaceKey)}
                        className="cursor-pointer inline-flex items-center gap-1 font-semibold text-purple-700 hover:text-purple-900"
                      >
                        Launch Workspace <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quadrant Top-Right: Together + No Single Right Answer */}
          <div
            className={`col-span-12 md:col-span-12 lg:col-span-5 p-5 transition-all flex flex-col ${
              getIsHighlighted('together_no_right_answer')
                ? 'bg-teal-50/60 ring-2 ring-teal-500 ring-inset'
                : 'bg-white'
            }`}
          >
            {/* Visual Archetype Oval */}
            <div className="mb-4">
              <ArchetypeGraphic quadrantId="together_no_right_answer" />
            </div>

            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-900">
                Quadrant: Top-Right
              </span>
              <span className="text-xs text-slate-500">
                Exploratory Co-Creation
              </span>
            </div>

            {/* Task list in Top-Right */}
            <div className="space-y-3 flex-1">
              {getQuadrantTasks('together_no_right_answer').map((task) => (
                <div
                  key={task.id}
                  className="group border border-slate-200 hover:border-teal-300 rounded-lg p-3.5 bg-slate-50/50 hover:bg-teal-50/30 transition-all shadow-2xs"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-teal-600 text-white text-[11px] font-bold flex items-center justify-center shrink-0">
                        {task.number}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 group-hover:text-teal-900 transition-colors">
                        {task.title}
                      </h4>
                    </div>
                    <button
                      onClick={() => onSelectTask(task)}
                      className="cursor-pointer text-slate-400 hover:text-slate-700 p-1 rounded"
                    >
                      <Info className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    {task.subtitle}
                  </p>

                  <div className="mt-2.5 pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-500">
                    <span>{task.tags.join(' · ')}</span>
                    <button
                      onClick={() => onSelectTask(task)}
                      className="cursor-pointer font-semibold text-teal-700 hover:text-teal-900 inline-flex items-center gap-1"
                    >
                      View Framework <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Row 2: Work that either of them can do alone */}
        <div className="grid grid-cols-12 min-h-[360px]">
          {/* Row Label */}
          <div className="col-span-12 md:col-span-3 lg:col-span-2 p-4 bg-slate-50 border-r border-slate-200 flex flex-col justify-center">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Independence
            </span>
            <span className="text-sm font-bold text-slate-800 mt-1 leading-snug">
              Work that either of them can do alone
            </span>
            <p className="text-xs text-slate-500 mt-2">
              Autonomous execution or modular individual capacity.
            </p>
          </div>

          {/* Quadrant Bottom-Left: Alone + Right Answer */}
          <div
            className={`col-span-12 md:col-span-9 lg:col-span-5 p-5 border-r border-slate-200 transition-all flex flex-col ${
              getIsHighlighted('alone_right_answer')
                ? 'bg-teal-50/60 ring-2 ring-teal-500 ring-inset'
                : 'bg-white'
            }`}
          >
            {/* Visual Archetype Oval */}
            <div className="mb-4">
              <ArchetypeGraphic quadrantId="alone_right_answer" />
            </div>

            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-900">
                Quadrant: Bottom-Left
              </span>
              <span className="text-xs font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                Task 4 Assigned Here
              </span>
            </div>

            {/* Task list in Bottom-Left */}
            <div className="space-y-3 flex-1">
              {getQuadrantTasks('alone_right_answer').map((task) => (
                <div
                  key={task.id}
                  className="group border border-slate-200 hover:border-teal-300 rounded-lg p-3.5 bg-slate-50/50 hover:bg-teal-50/30 transition-all shadow-2xs"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-teal-600 text-white text-[11px] font-bold flex items-center justify-center shrink-0">
                        {task.number}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 group-hover:text-teal-900 transition-colors">
                        {task.title}
                      </h4>
                    </div>
                    <button
                      onClick={() => onSelectTask(task)}
                      className="cursor-pointer text-slate-400 hover:text-slate-700 p-1 rounded"
                    >
                      <Info className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    {task.subtitle}
                  </p>

                  <div className="mt-2.5 pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 text-slate-500">
                      <span>{task.tags[0]}</span>
                      <span>·</span>
                      <span>{task.tags[1]}</span>
                    </div>

                    {task.workspaceKey !== 'general' && (
                      <button
                        onClick={() => onOpenWorkspace(task.workspaceKey)}
                        className="cursor-pointer inline-flex items-center gap-1 font-semibold text-teal-700 hover:text-teal-900"
                      >
                        Launch Pipeline <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quadrant Bottom-Right: Alone + No Single Right Answer */}
          <div
            className={`col-span-12 md:col-span-12 lg:col-span-5 p-5 transition-all flex flex-col ${
              getIsHighlighted('alone_no_right_answer')
                ? 'bg-amber-50/60 ring-2 ring-amber-500 ring-inset'
                : 'bg-white'
            }`}
          >
            {/* Visual Archetype Oval */}
            <div className="mb-4">
              <ArchetypeGraphic quadrantId="alone_no_right_answer" />
            </div>

            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Quadrant: Bottom-Right
              </span>
              <span className="text-xs text-slate-500">
                Parallel / Advisory Co-Pilot
              </span>
            </div>

            {/* Task list in Bottom-Right */}
            <div className="space-y-3 flex-1">
              {getQuadrantTasks('alone_no_right_answer').map((task) => (
                <div
                  key={task.id}
                  className="group border border-slate-200 hover:border-slate-300 rounded-lg p-3.5 bg-slate-50/50 hover:bg-slate-100/50 transition-all shadow-2xs"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-slate-700 text-white text-[11px] font-bold flex items-center justify-center shrink-0">
                        {task.number}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 group-hover:text-slate-950 transition-colors">
                        {task.title}
                      </h4>
                    </div>
                    <button
                      onClick={() => onSelectTask(task)}
                      className="cursor-pointer text-slate-400 hover:text-slate-700 p-1 rounded"
                    >
                      <Info className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    {task.subtitle}
                  </p>

                  <div className="mt-2.5 pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-500">
                    <span>{task.tags.join(' · ')}</span>
                    <button
                      onClick={() => onSelectTask(task)}
                      className="cursor-pointer font-semibold text-slate-700 hover:text-slate-950 inline-flex items-center gap-1"
                    >
                      View Framework <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
