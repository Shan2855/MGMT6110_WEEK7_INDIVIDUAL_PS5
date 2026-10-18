import React, { useState } from 'react';
import { QuadrantId, TaskItem } from '../types';
import { ArchetypeGraphic } from './ArchetypeGraphic';
import { CheckCircle2, Sparkles, X, ArrowRight } from 'lucide-react';

interface ClassifierModalProps {
  onClose: () => void;
  onAddTask: (task: TaskItem) => void;
}

export const ClassifierModal: React.FC<ClassifierModalProps> = ({ onClose, onAddTask }) => {
  const [taskName, setTaskName] = useState('');
  const [taskDesc, setTaskDesc] = useState('');
  const [hasRightAnswer, setHasRightAnswer] = useState<boolean | null>(true);
  const [interdependence, setInterdependence] = useState<'together' | 'alone' | null>('together');

  // Compute quadrant
  let computedQuadrant: QuadrantId = 'together_right_answer';
  let archetypeTitle = 'A person leads, AI inside';
  let reasoning = '';

  if (hasRightAnswer === true && interdependence === 'together') {
    computedQuadrant = 'together_right_answer';
    archetypeTitle = 'A person leads, AI inside (Top-Left)';
    reasoning =
      'There is a verifiable right answer, but human accountability, relational stakes, or physical/legal consequences require a human to lead with AI providing core intelligence inside.';
  } else if (hasRightAnswer === true && interdependence === 'alone') {
    computedQuadrant = 'alone_right_answer';
    archetypeTitle = 'AI alone (Bottom-Left)';
    reasoning =
      'There is a clear right answer, and once parameters are configured, AI can execute autonomously end-to-end without constant human-in-the-loop bottlenecks.';
  } else if (hasRightAnswer === false && interdependence === 'together') {
    computedQuadrant = 'together_no_right_answer';
    archetypeTitle = 'AI agents run the work, a person judges inside (Top-Right)';
    reasoning =
      'There is no single formulaic right answer. Autonomous AI agents can generate wide exploratory variants, and the human director exercises taste and judgment inside.';
  } else {
    computedQuadrant = 'alone_no_right_answer';
    archetypeTitle = 'A person + AI (Alongside) (Bottom-Right)';
    reasoning =
      'Subjective or strategic domains where either party could function alone, but collaborating side-by-side elevates quality (e.g. strategic negotiation, partner advisory).';
  }

  const handleSaveToMatrix = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskName.trim()) return;

    const newTask: TaskItem = {
      id: `task-${Date.now()}`,
      number: 7, // Custom task
      title: taskName.trim(),
      subtitle: taskDesc.trim() || 'Custom classified workflow',
      quadrantId: computedQuadrant,
      category: 'custom',
      tags: ['Custom Task', archetypeTitle.split('(')[0].trim()],
      archetype: archetypeTitle.split('(')[0].trim(),
      whyAnswer: hasRightAnswer ? 'Objective factual criteria exist.' : 'Open-ended or taste-driven.',
      whyInterdependence: interdependence === 'together' ? 'Collaborative synergy required.' : 'Can execute independently.',
      humanRole: 'Domain judgment & leadership.',
      aiRole: 'Continuous computation & execution.',
      workspaceKey: 'general',
    };

    onAddTask(newTask);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl border border-slate-200 max-w-xl w-full p-6 shadow-xl space-y-5 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-3">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
              Interactive Classifier Wizard
            </span>
            <h3 className="text-lg font-bold text-slate-900 mt-1">
              Place Any Task on the Collaboration Map
            </h3>
          </div>
          <button onClick={onClose} className="cursor-pointer text-slate-400 hover:text-slate-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSaveToMatrix} className="space-y-4">
          {/* Task Info */}
          <div>
            <label className="text-xs font-bold text-slate-800 block mb-1">
              Task Name or Workflow Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Code Review for Security Vulnerabilities"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              className="w-full text-xs p-2.5 border border-slate-200 rounded-lg focus:outline-teal-600"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Brief Description
            </label>
            <input
              type="text"
              placeholder="What does this task entail?"
              value={taskDesc}
              onChange={(e) => setTaskDesc(e.target.value)}
              className="w-full text-xs p-2.5 border border-slate-200 rounded-lg focus:outline-teal-600"
            />
          </div>

          {/* Question 1 */}
          <div className="space-y-1.5 pt-1">
            <label className="text-xs font-bold text-slate-900 block">
              Question 1: Does this task have a right answer?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setHasRightAnswer(true)}
                className={`cursor-pointer p-3 rounded-lg border text-left transition-all ${
                  hasRightAnswer === true
                    ? 'border-purple-600 bg-purple-50/70 font-semibold text-purple-950 ring-1 ring-purple-600'
                    : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="font-bold">Yes: Work with a right answer</div>
                <div className="text-[11px] text-slate-500 font-normal mt-0.5">
                  Factual, measurable, objective benchmarks (e.g. deadlines, calculations, code rules)
                </div>
              </button>

              <button
                type="button"
                onClick={() => setHasRightAnswer(false)}
                className={`cursor-pointer p-3 rounded-lg border text-left transition-all ${
                  hasRightAnswer === false
                    ? 'border-purple-600 bg-purple-50/70 font-semibold text-purple-950 ring-1 ring-purple-600'
                    : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="font-bold">No single right answer</div>
                <div className="text-[11px] text-slate-500 font-normal mt-0.5">
                  Subjective, open-ended, aesthetic, creative, or strategic nuance
                </div>
              </button>
            </div>
          </div>

          {/* Question 2 */}
          <div className="space-y-1.5 pt-1">
            <label className="text-xs font-bold text-slate-900 block">
              Question 2: Who does the work?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setInterdependence('together')}
                className={`cursor-pointer p-3 rounded-lg border text-left transition-all ${
                  interdependence === 'together'
                    ? 'border-teal-600 bg-teal-50/70 font-semibold text-teal-950 ring-1 ring-teal-600'
                    : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="font-bold">People and AI must do together</div>
                <div className="text-[11px] text-slate-500 font-normal mt-0.5">
                  High accountability, relational reputation, or mutual cognitive collaboration
                </div>
              </button>

              <button
                type="button"
                onClick={() => setInterdependence('alone')}
                className={`cursor-pointer p-3 rounded-lg border text-left transition-all ${
                  interdependence === 'alone'
                    ? 'border-teal-600 bg-teal-50/70 font-semibold text-teal-950 ring-1 ring-teal-600'
                    : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="font-bold">Either of them can do alone</div>
                <div className="text-[11px] text-slate-500 font-normal mt-0.5">
                  Modular autonomy; either human or AI can execute end-to-end
                </div>
              </button>
            </div>
          </div>

          {/* Result Banner */}
          <div className="p-4 bg-slate-900 text-white rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-teal-400">
                Calculated Placement
              </span>
              <span className="text-xs font-bold text-white">
                {archetypeTitle}
              </span>
            </div>

            <div className="bg-white/10 p-2 rounded-lg">
              <ArchetypeGraphic quadrantId={computedQuadrant} compact={true} />
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {reasoning}
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="cursor-pointer inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors shadow-xs"
            >
              Add to Matrix Board <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
