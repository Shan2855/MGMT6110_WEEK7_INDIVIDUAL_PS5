import React, { useState } from 'react';
import {
  INITIAL_TASKS,
  INITIAL_EMAILS,
  INITIAL_NOTIFICATIONS,
  INITIAL_NEWS,
  INITIAL_PROPERTIES,
} from './data/initialData';
import { TaskItem } from './types';
import { Header } from './components/Header';
import { LectureStepper } from './components/LectureStepper';
import { MatrixView } from './components/MatrixView';
import { GmailPriorityWorkspace } from './components/workspaces/GmailPriorityWorkspace';
import { UrgentNotificationsWorkspace } from './components/workspaces/UrgentNotificationsWorkspace';
import { NewsSummarizerWorkspace } from './components/workspaces/NewsSummarizerWorkspace';
import { PropertyTranslationWorkspace } from './components/workspaces/PropertyTranslationWorkspace';
import { TaskDetailModal } from './components/TaskDetailModal';
import { ClassifierModal } from './components/ClassifierModal';
import { ArrowRight, Sparkles, Mail, MessageSquare, Newspaper, Building2 } from 'lucide-react';

export default function App() {
  const [tasks, setTasks] = useState<TaskItem[]>(INITIAL_TASKS);
  const [currentTab, setCurrentTab] = useState<string>('matrix');
  const [activeStep, setActiveStep] = useState<number>(3); // Defaults to Step 3 (Top-Left focus)
  const [selectedTask, setSelectedTask] = useState<TaskItem | null>(null);
  const [isClassifierOpen, setIsClassifierOpen] = useState<boolean>(false);

  const handleOpenWorkspace = (key: string) => {
    setCurrentTab(key);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddTask = (newTask: TaskItem) => {
    setTasks((prev) => [...prev, newTask]);
    setCurrentTab('matrix');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 selection:bg-teal-500 selection:text-white">
      {/* Universal 3-Zone Header */}
      <Header
        currentTab={currentTab}
        onSelectTab={(tab) => setCurrentTab(tab)}
        onOpenClassifier={() => setIsClassifierOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {currentTab === 'matrix' && (
          <div className="space-y-6">
            {/* Interactive Step-by-Step Slide Tour */}
            <LectureStepper
              activeStep={activeStep}
              onStepChange={(step) => setActiveStep(step)}
            />

            {/* Core 2x2 Matrix Map */}
            <MatrixView
              tasks={tasks}
              activeStep={activeStep}
              onSelectTask={(task) => setSelectedTask(task)}
              onOpenWorkspace={handleOpenWorkspace}
            />

            {/* Direct Task Workspace Jump Cards (4 Core Segregated Points) */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    The 4 Segregated Workflows
                  </h3>
                  <p className="text-xs text-slate-500">
                    Direct access to each interactive simulation and functional engine
                  </p>
                </div>
                <div className="text-xs text-slate-400">
                  Click any card to open its live workspace
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Task 1 Card */}
                <div
                  onClick={() => handleOpenWorkspace('gmail_priority')}
                  className="cursor-pointer group border border-slate-200 hover:border-purple-500 rounded-xl p-4 bg-slate-50/50 hover:bg-white transition-all shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="w-6 h-6 rounded-full bg-purple-600 text-white text-xs font-bold flex items-center justify-center">
                        1
                      </span>
                      <Mail className="w-4 h-4 text-purple-600" />
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-purple-700 mt-2 transition-colors">
                      Gmail 2-Day Priority Triage
                    </h4>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                      Filter 2-day high-urgency action items, medium review tasks, and no-action mail.
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs font-semibold text-purple-700">
                    <span>A Person Leads</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>

                {/* Task 2 Card */}
                <div
                  onClick={() => handleOpenWorkspace('urgent_notifications')}
                  className="cursor-pointer group border border-slate-200 hover:border-purple-500 rounded-xl p-4 bg-slate-50/50 hover:bg-white transition-all shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="w-6 h-6 rounded-full bg-purple-600 text-white text-xs font-bold flex items-center justify-center">
                        2
                      </span>
                      <MessageSquare className="w-4 h-4 text-purple-600" />
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-purple-700 mt-2 transition-colors">
                      VIP Notification Hub
                    </h4>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                      Multi-channel pings from WhatsApp, LinkedIn, and University portals needing action.
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs font-semibold text-purple-700">
                    <span>A Person Leads</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>

                {/* Task 3 Card */}
                <div
                  onClick={() => handleOpenWorkspace('news_summary')}
                  className="cursor-pointer group border border-slate-200 hover:border-purple-500 rounded-xl p-4 bg-slate-50/50 hover:bg-white transition-all shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="w-6 h-6 rounded-full bg-purple-600 text-white text-xs font-bold flex items-center justify-center">
                        3
                      </span>
                      <Newspaper className="w-4 h-4 text-purple-600" />
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-purple-700 mt-2 transition-colors">
                      News Topics & Impact
                    </h4>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                      Synthesize complex events into simple core topics, verified facts, and strategic impact.
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs font-semibold text-purple-700">
                    <span>A Person Leads</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>

                {/* Task 4 Card */}
                <div
                  onClick={() => handleOpenWorkspace('property_translation')}
                  className="cursor-pointer group border border-slate-200 hover:border-teal-500 rounded-xl p-4 bg-slate-50/50 hover:bg-white transition-all shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="w-6 h-6 rounded-full bg-teal-600 text-white text-xs font-bold flex items-center justify-center">
                        4
                      </span>
                      <Building2 className="w-4 h-4 text-teal-600" />
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-teal-700 mt-2 transition-colors">
                      Property Pipeline & Dispatch
                    </h4>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                      Translate technical property specs into 5 languages and auto-dispatch email digests.
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs font-semibold text-teal-700">
                    <span>AI Alone Execution</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Task 1 Workspace View */}
        {currentTab === 'gmail_priority' && (
          <GmailPriorityWorkspace
            emails={INITIAL_EMAILS}
            onBackToMatrix={() => setCurrentTab('matrix')}
          />
        )}

        {/* Task 2 Workspace View */}
        {currentTab === 'urgent_notifications' && (
          <UrgentNotificationsWorkspace
            notifications={INITIAL_NOTIFICATIONS}
            onBackToMatrix={() => setCurrentTab('matrix')}
          />
        )}

        {/* Task 3 Workspace View */}
        {currentTab === 'news_summary' && (
          <NewsSummarizerWorkspace
            articles={INITIAL_NEWS}
            onBackToMatrix={() => setCurrentTab('matrix')}
          />
        )}

        {/* Task 4 Workspace View */}
        {currentTab === 'property_translation' && (
          <PropertyTranslationWorkspace
            properties={INITIAL_PROPERTIES}
            onBackToMatrix={() => setCurrentTab('matrix')}
          />
        )}
      </main>

      {/* Task Theoretical Detail Modal */}
      {selectedTask && (
        <TaskDetailModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onOpenWorkspace={handleOpenWorkspace}
        />
      )}

      {/* Interactive Task Classifier Modal */}
      {isClassifierOpen && (
        <ClassifierModal
          onClose={() => setIsClassifierOpen(false)}
          onAddTask={handleAddTask}
        />
      )}

      {/* Clean Footer adhering to Constitution */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            <span>Task Segregation Matrix</span>
            <span className="mx-2">·</span>
            <span>People & AI Collaboration Framework</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                setCurrentTab('matrix');
                setActiveStep(3);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="cursor-pointer hover:text-slate-900 transition-colors"
            >
              Tasks 1, 2, 3 (Top-Left)
            </button>
            <span>·</span>
            <button
              onClick={() => {
                setCurrentTab('matrix');
                setActiveStep(4);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="cursor-pointer hover:text-slate-900 transition-colors"
            >
              Task 4 (Bottom-Left)
            </button>
            <span>·</span>
            <button
              onClick={() => setIsClassifierOpen(true)}
              className="cursor-pointer text-teal-700 hover:text-teal-900 font-semibold"
            >
              Classify Any Task
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
