import React from 'react';
import { TaskItem } from '../types';
import { ArchetypeGraphic } from './ArchetypeGraphic';
import { ArrowRight, CheckCircle2, User, Bot, Sparkles, X } from 'lucide-react';

interface TaskDetailModalProps {
  task: TaskItem | null;
  onClose: () => void;
  onOpenWorkspace: (workspaceKey: string) => void;
}

export const TaskDetailModal: React.FC<TaskDetailModalProps> = ({
  task,
  onClose,
  onOpenWorkspace,
}) => {
  if (!task) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl border border-slate-200 max-w-xl w-full p-6 shadow-xl space-y-5 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center">
                {task.number}
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Quadrant Architecture Breakdown
              </span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mt-1">
              {task.title}
            </h3>
            <p className="text-xs text-slate-600 mt-0.5">
              {task.subtitle}
            </p>
          </div>

          <button
            onClick={onClose}
            className="cursor-pointer text-slate-400 hover:text-slate-700 p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Archetype Graphic */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-lg p-3">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider text-center mb-1">
            Visual Leadership Model: {task.archetype}
          </div>
          <ArchetypeGraphic quadrantId={task.quadrantId} compact={true} />
        </div>

        {/* Two Guiding Questions Analysis */}
        <div className="space-y-3">
          <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
            <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-600" />
              Question 1: Does it have a right answer?
            </div>
            <p className="text-xs text-slate-700 leading-relaxed pl-3">
              {task.whyAnswer}
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
            <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600" />
              Question 2: Together or alone?
            </div>
            <p className="text-xs text-slate-700 leading-relaxed pl-3">
              {task.whyInterdependence}
            </p>
          </div>
        </div>

        {/* Division of Labor: Person vs AI */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 bg-purple-50/70 border border-purple-200 rounded-lg space-y-1">
            <div className="font-bold text-purple-950 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-purple-700" />
              Human Role
            </div>
            <p className="text-purple-900 leading-relaxed">
              {task.humanRole}
            </p>
          </div>

          <div className="p-3 bg-teal-50/70 border border-teal-200 rounded-lg space-y-1">
            <div className="font-bold text-teal-950 flex items-center gap-1.5">
              <Bot className="w-3.5 h-3.5 text-teal-700" />
              AI Role
            </div>
            <p className="text-teal-900 leading-relaxed">
              {task.aiRole}
            </p>
          </div>
        </div>

        {/* Footer CTAs */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          <button
            onClick={onClose}
            className="cursor-pointer px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg"
          >
            Close
          </button>

          {task.workspaceKey !== 'general' && (
            <button
              onClick={() => {
                onClose();
                onOpenWorkspace(task.workspaceKey);
              }}
              className="cursor-pointer inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors shadow-xs"
            >
              Open Interactive Workspace <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
