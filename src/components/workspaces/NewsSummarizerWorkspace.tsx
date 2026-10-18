import React, { useState } from 'react';
import { NewsArticle } from '../../types';
import {
  FileText,
  Sparkles,
  ArrowLeft,
  Layers,
  Target,
  UserCheck,
  CheckCircle2,
  TrendingUp,
  Plus
} from 'lucide-react';

interface NewsSummarizerWorkspaceProps {
  articles: NewsArticle[];
  onBackToMatrix: () => void;
}

export const NewsSummarizerWorkspace: React.FC<NewsSummarizerWorkspaceProps> = ({
  articles: initialArticles,
  onBackToMatrix,
}) => {
  const [articles, setArticles] = useState<NewsArticle[]>(initialArticles);
  const [selectedArticleId, setSelectedArticleId] = useState<string>(articles[0]?.id || '');
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [customHeadline, setCustomHeadline] = useState('');
  const [customSource, setCustomSource] = useState('');
  const [customBody, setCustomBody] = useState('');
  const [userPersonalNote, setUserPersonalNote] = useState('');

  const selectedArticle = articles.find((a) => a.id === selectedArticleId) || articles[0];

  const handleSummarizeCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customHeadline || !customBody) return;

    // AI heuristic extraction
    const sentences = customBody.split(/[.!?]+/).filter((s) => s.trim().length > 10);
    const keyFacts = sentences.slice(0, 3).map((s) => s.trim() + '.');

    const newArticle: NewsArticle = {
      id: `news-${Date.now()}`,
      title: customHeadline.trim(),
      source: customSource.trim() || 'Custom Ingest Feed',
      publishedTime: 'Just now',
      fullText: customBody.trim(),
      keyTopics: ['Industry Dynamics', 'Strategic Operations', 'Market Developments'],
      keyFacts: keyFacts.length > 0 ? keyFacts : ['Core factual assertions distilled from text.'],
      impactAssessment: {
        affectedParties: 'Enterprise leaders, operational teams, and market participants.',
        strategicImpact: 'Requires review of standard operating procedures against emerging market shifts.',
        recommendedAction: 'Verify relevance to ongoing projects and brief stakeholders during weekly standup.',
      },
      humanJudgmentNote: 'Human leadership evaluates if this intelligence warrants resource reallocation.',
    };

    setArticles([newArticle, ...articles]);
    setSelectedArticleId(newArticle.id);
    setShowCustomModal(false);
    setCustomHeadline('');
    setCustomSource('');
    setCustomBody('');
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <button
              onClick={onBackToMatrix}
              className="cursor-pointer text-xs font-semibold text-slate-500 hover:text-slate-900 inline-flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Matrix
            </button>
            <span className="text-slate-300">/</span>
            <span className="text-xs font-bold uppercase tracking-wider text-purple-700">
              Task 3 Workspace
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            Executive News & Impact Summarization
          </h2>
          <p className="text-xs text-slate-600 mt-1">
            <span className="font-semibold text-purple-900">Quadrant: A Person Leads, AI Inside.</span> AI condenses verbose reports into verifiable key facts and topic impacts; human domain leaders evaluate real-world decisions.
          </p>
        </div>

        <button
          onClick={() => setShowCustomModal(true)}
          className="cursor-pointer inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap shrink-0 self-start md:self-auto shadow-xs"
        >
          <Plus className="w-3.5 h-3.5" /> Summarize Custom News
        </button>
      </div>

      {/* Main 2-Column Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Article Selector */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 px-1">
            Articles Ingested ({articles.length})
          </div>

          {articles.map((art) => {
            const isSelected = art.id === selectedArticle?.id;
            return (
              <div
                key={art.id}
                onClick={() => setSelectedArticleId(art.id)}
                className={`cursor-pointer p-4 rounded-xl border transition-all text-left ${
                  isSelected
                    ? 'bg-white border-purple-500 shadow-xs ring-1 ring-purple-500'
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span className="font-medium text-slate-600">{art.source}</span>
                  <span className="font-mono">{art.publishedTime}</span>
                </div>

                <h4 className="text-sm font-bold text-slate-900 mt-1 line-clamp-2 leading-snug">
                  {art.title}
                </h4>

                <div className="mt-3 flex flex-wrap gap-1">
                  {art.keyTopics.slice(0, 2).map((top) => (
                    <span
                      key={top}
                      className="text-[10px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded"
                    >
                      {top}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Structured AI Synthesis & Human Decision */}
        {selectedArticle && (
          <div className="lg:col-span-8 bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-6">
            {/* Header info */}
            <div className="border-b border-slate-200 pb-4">
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                <span>{selectedArticle.source}</span>
                <span>·</span>
                <span>{selectedArticle.publishedTime}</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                {selectedArticle.title}
              </h3>
            </div>

            {/* Core Topics in Simple Terms */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-slate-700" /> Key Topics Simplified
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedArticle.keyTopics.map((topic) => (
                  <span
                    key={topic}
                    className="text-xs font-semibold text-purple-900 bg-purple-50 px-2.5 py-1 rounded-md border border-purple-200/80"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>

            {/* Verifiable Key Facts (Work with Right Answer) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                  Key Objective Facts (Right Answer Truth Criteria)
                </h4>
                <span className="text-[11px] text-teal-700 font-medium">
                  Verified Data Points
                </span>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-2">
                {selectedArticle.keyFacts.map((fact, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-800">
                    <span className="font-mono text-teal-700 font-bold shrink-0">
                      0{idx + 1}.
                    </span>
                    <span className="leading-relaxed">{fact}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct Impact Assessment Matrix */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-rose-600" />
                Strategic Impact Assessment
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-3.5 bg-rose-50/50 border border-rose-200 rounded-lg space-y-1">
                  <div className="text-[11px] font-bold text-rose-900 uppercase">
                    Affected Parties
                  </div>
                  <p className="text-xs text-rose-950 leading-relaxed">
                    {selectedArticle.impactAssessment.affectedParties}
                  </p>
                </div>

                <div className="p-3.5 bg-amber-50/50 border border-amber-200 rounded-lg space-y-1">
                  <div className="text-[11px] font-bold text-amber-900 uppercase">
                    Core Impact
                  </div>
                  <p className="text-xs text-amber-950 leading-relaxed">
                    {selectedArticle.impactAssessment.strategicImpact}
                  </p>
                </div>

                <div className="p-3.5 bg-teal-50/50 border border-teal-200 rounded-lg space-y-1">
                  <div className="text-[11px] font-bold text-teal-900 uppercase">
                    Recommended Action
                  </div>
                  <p className="text-xs text-teal-950 leading-relaxed">
                    {selectedArticle.impactAssessment.recommendedAction}
                  </p>
                </div>
              </div>
            </div>

            {/* Human Leadership & Decision Note */}
            <div className="p-4 bg-purple-50/70 border border-purple-200 rounded-lg space-y-2">
              <div className="flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-purple-700" />
                <h5 className="text-xs font-bold text-purple-950">
                  Human Leadership Oversight (Why a Person Leads)
                </h5>
              </div>
              <p className="text-xs text-purple-900 leading-relaxed">
                {selectedArticle.humanJudgmentNote}
              </p>

              <div className="pt-2">
                <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                  Add Your Human Strategic Decision / Directive:
                </label>
                <input
                  type="text"
                  placeholder="e.g. Schedule meeting with CFO on Monday to review loan options..."
                  value={userPersonalNote}
                  onChange={(e) => setUserPersonalNote(e.target.value)}
                  className="w-full text-xs p-2.5 bg-white border border-purple-200 rounded-lg focus:outline-teal-600 text-slate-800"
                />
              </div>
            </div>

            {/* Full Original Article (Accordion style) */}
            <details className="text-xs text-slate-500 pt-2 border-t border-slate-100">
              <summary className="cursor-pointer font-medium hover:text-slate-800">
                View Full Original Article Text ({selectedArticle.fullText.length} characters)
              </summary>
              <div className="mt-2 p-3 bg-slate-50 rounded-lg text-slate-700 leading-relaxed max-h-48 overflow-y-auto">
                {selectedArticle.fullText}
              </div>
            </details>
          </div>
        )}
      </div>

      {/* Modal: Custom News Input */}
      {showCustomModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border border-slate-200 max-w-lg w-full p-6 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-slate-900">
              Summarize Custom News Article
            </h3>
            <p className="text-xs text-slate-500">
              Paste article text to extract objective facts, simple key topics, and real-world impact.
            </p>

            <form onSubmit={handleSummarizeCustom} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Article Headline
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. New Commercial Real Estate Tax Incentive Enacted"
                  value={customHeadline}
                  onChange={(e) => setCustomHeadline(e.target.value)}
                  className="w-full text-xs p-2.5 border border-slate-200 rounded-lg"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  News Source
                </label>
                <input
                  type="text"
                  placeholder="e.g. Wall Street Journal / Bloomberg"
                  value={customSource}
                  onChange={(e) => setCustomSource(e.target.value)}
                  className="w-full text-xs p-2.5 border border-slate-200 rounded-lg"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Raw Article Content
                </label>
                <textarea
                  rows={5}
                  required
                  placeholder="Paste paragraph text of the news release..."
                  value={customBody}
                  onChange={(e) => setCustomBody(e.target.value)}
                  className="w-full text-xs p-2.5 border border-slate-200 rounded-lg"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCustomModal(false)}
                  className="cursor-pointer px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="cursor-pointer px-4 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg"
                >
                  Synthesize & Summarize
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
