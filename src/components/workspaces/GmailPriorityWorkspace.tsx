import React, { useState } from 'react';
import { EmailItem } from '../../types';
import { Clock, Send, CheckCircle2, AlertCircle, Sparkles, Filter, Plus, ArrowLeft } from 'lucide-react';

interface GmailPriorityWorkspaceProps {
  emails: EmailItem[];
  onBackToMatrix: () => void;
}

export const GmailPriorityWorkspace: React.FC<GmailPriorityWorkspaceProps> = ({
  emails: initialEmails,
  onBackToMatrix,
}) => {
  const [emails, setEmails] = useState<EmailItem[]>(initialEmails);
  const [selectedEmailId, setSelectedEmailId] = useState<string>(emails[0]?.id || '');
  const [activeTab, setActiveTab] = useState<'all' | 'high_2days' | 'medium' | 'not_important'>('high_2days');
  const [replyText, setReplyText] = useState<string>('');
  const [showNewEmailModal, setShowNewEmailModal] = useState(false);
  const [newSubject, setNewSubject] = useState('');
  const [newSender, setNewSender] = useState('');
  const [newBody, setNewBody] = useState('');

  const selectedEmail = emails.find((e) => e.id === selectedEmailId) || emails[0];

  // Sync reply text when email changes
  React.useEffect(() => {
    if (selectedEmail) {
      setReplyText(selectedEmail.aiSuggestedReply || '');
    }
  }, [selectedEmailId]);

  const filteredEmails = emails.filter((e) => {
    if (activeTab === 'all') return true;
    return e.priority === activeTab;
  });

  const highPriorityCount = emails.filter((e) => e.priority === 'high_2days' && e.status === 'pending').length;
  const mediumCount = emails.filter((e) => e.priority === 'medium' && e.status === 'pending').length;
  const notImportantCount = emails.filter((e) => e.priority === 'not_important').length;

  const handleSendReply = () => {
    if (!selectedEmail) return;
    setEmails((prev) =>
      prev.map((e) =>
        e.id === selectedEmail.id ? { ...e, status: 'actioned' } : e
      )
    );
  };

  const handleUpdatePriority = (priority: 'high_2days' | 'medium' | 'not_important') => {
    if (!selectedEmail) return;
    setEmails((prev) =>
      prev.map((e) =>
        e.id === selectedEmail.id ? { ...e, priority } : e
      )
    );
  };

  const handleAddNewEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubject.trim() || !newBody.trim()) return;

    // AI categorization heuristic
    const isUrgent = /urgent|asap|deadline|2 days|48 hours|immediately|due|sign-off/i.test(newBody + ' ' + newSubject);
    const isMedium = /review|feedback|next week|when you can|rfc|draft/i.test(newBody + ' ' + newSubject);

    const detectedPriority: 'high_2days' | 'medium' | 'not_important' = isUrgent
      ? 'high_2days'
      : isMedium
      ? 'medium'
      : 'not_important';

    const newItem: EmailItem = {
      id: `em-${Date.now()}`,
      sender: newSender.trim() || 'Internal Colleague',
      senderEmail: 'colleague@organization.org',
      subject: newSubject.trim(),
      snippet: newBody.slice(0, 100) + '...',
      fullBody: newBody,
      receivedAt: 'Just now',
      deadlineHoursRemaining: detectedPriority === 'high_2days' ? 48 : undefined,
      priority: detectedPriority,
      actionRequired: detectedPriority === 'high_2days'
        ? 'High priority action: Review request and dispatch response within 48 hours.'
        : detectedPriority === 'medium'
        ? 'Medium importance: Review documentation when schedule permits.'
        : 'Informational message (no immediate action required).',
      aiSuggestedReply: `Hello,\n\nI have received your note regarding "${newSubject}". I am reviewing the details and will get back to you shortly.\n\nBest regards,\nShantanu`,
      status: 'pending',
    };

    setEmails([newItem, ...emails]);
    setSelectedEmailId(newItem.id);
    setActiveTab(detectedPriority);
    setShowNewEmailModal(false);
    setNewSubject('');
    setNewSender('');
    setNewBody('');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Context */}
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
              Task 1 Workspace
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            Gmail 2-Day Priority Triage & Action Filter
          </h2>
          <p className="text-xs text-slate-600 mt-1">
            <span className="font-semibold text-purple-900">Quadrant: A Person Leads, AI Inside.</span> AI scans incoming mail to extract deadlines and draft replies; human leads the final triage and sends verified action items.
          </p>
        </div>

        <button
          onClick={() => setShowNewEmailModal(true)}
          className="cursor-pointer inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap shrink-0 self-start md:self-auto shadow-xs"
        >
          <Plus className="w-3.5 h-3.5" /> Test Ingest New Email
        </button>
      </div>

      {/* Filter Tabs / Segmented Control */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => setActiveTab('high_2days')}
          className={`cursor-pointer px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-2 ${
            activeTab === 'high_2days'
              ? 'bg-rose-600 text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-rose-300" />
          High Priority (2-Day Actions)
          <span className="font-mono text-[11px] px-1.5 py-0.2 rounded bg-black/15">
            {highPriorityCount}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('medium')}
          className={`cursor-pointer px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-2 ${
            activeTab === 'medium'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-amber-300" />
          Medium Importance
          <span className="font-mono text-[11px] px-1.5 py-0.2 rounded bg-black/15">
            {mediumCount}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('not_important')}
          className={`cursor-pointer px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-2 ${
            activeTab === 'not_important'
              ? 'bg-slate-700 text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-slate-400" />
          Not Important / No Action
          <span className="font-mono text-[11px] px-1.5 py-0.2 rounded bg-black/15">
            {notImportantCount}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('all')}
          className={`cursor-pointer px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all ${
            activeTab === 'all'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          All Inbox ({emails.length})
        </button>
      </div>

      {/* Main Mail Interface 2-Column Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Email List Left Column */}
        <div className="lg:col-span-5 space-y-2.5">
          {filteredEmails.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-xl p-8 text-center text-sm text-slate-500">
              No emails in this priority tier.
            </div>
          ) : (
            filteredEmails.map((email) => {
              const isSelected = email.id === selectedEmail?.id;
              return (
                <div
                  key={email.id}
                  onClick={() => setSelectedEmailId(email.id)}
                  className={`cursor-pointer p-4 rounded-xl border transition-all text-left ${
                    isSelected
                      ? 'bg-white border-purple-500 shadow-xs ring-1 ring-purple-500'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <span className="font-bold text-slate-900 truncate">
                      {email.sender}
                    </span>
                    <span className="text-slate-400 font-mono text-[11px] whitespace-nowrap">
                      {email.receivedAt}
                    </span>
                  </div>

                  <h4 className="text-sm font-semibold text-slate-800 mt-1 line-clamp-1">
                    {email.subject}
                  </h4>

                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {email.snippet}
                  </p>

                  <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                    {email.priority === 'high_2days' ? (
                      <span className="inline-flex items-center gap-1 font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200 font-mono">
                        <Clock className="w-3 h-3 text-rose-600" />
                        {email.deadlineHoursRemaining}h deadline remaining
                      </span>
                    ) : email.priority === 'medium' ? (
                      <span className="text-amber-700 font-medium bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        Review Required
                      </span>
                    ) : (
                      <span className="text-slate-500 font-medium">
                        No Action Needed
                      </span>
                    )}

                    {email.status === 'actioned' ? (
                      <span className="inline-flex items-center gap-1 font-semibold text-emerald-600">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Actioned
                      </span>
                    ) : (
                      <span className="text-slate-400">Pending review</span>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Email Reading & Action Pane Right Column */}
        {selectedEmail && (
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex flex-col justify-between">
            <div className="space-y-4">
              {/* Email Metadata header */}
              <div className="pb-4 border-b border-slate-200">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-slate-500">From:</span>
                    <span className="text-sm font-bold text-slate-900">{selectedEmail.sender}</span>
                    <span className="text-xs text-slate-400">&lt;{selectedEmail.senderEmail}&gt;</span>
                  </div>

                  {/* Re-prioritize controls (Human leads) */}
                  <div className="flex items-center gap-1 text-xs">
                    <span className="text-slate-400 mr-1">Triage:</span>
                    <select
                      value={selectedEmail.priority}
                      onChange={(e) =>
                        handleUpdatePriority(e.target.value as 'high_2days' | 'medium' | 'not_important')
                      }
                      className="cursor-pointer text-xs font-medium border border-slate-300 rounded px-2 py-1 bg-white text-slate-800 focus:outline-teal-600"
                    >
                      <option value="high_2days">🔴 High (2 Days)</option>
                      <option value="medium">🟡 Medium</option>
                      <option value="not_important">⚪ Not Important</option>
                    </select>
                  </div>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-2">
                  {selectedEmail.subject}
                </h3>
              </div>

              {/* AI Extraction Banner (AI Inside) */}
              <div className="p-3.5 bg-purple-50/70 border border-purple-200 rounded-lg">
                <div className="flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-purple-700 shrink-0 mt-0.5" />
                  <div className="text-xs space-y-1">
                    <p className="font-bold text-purple-950">
                      AI Urgency & Action Analysis:
                    </p>
                    <p className="text-purple-900 leading-relaxed">
                      {selectedEmail.actionRequired}
                    </p>
                  </div>
                </div>
              </div>

              {/* Email Body */}
              <div className="text-sm text-slate-700 whitespace-pre-line leading-relaxed font-sans bg-slate-50/50 p-4 rounded-lg border border-slate-100 max-h-64 overflow-y-auto">
                {selectedEmail.fullBody}
              </div>

              {/* Action Draft Box (Human reviews & sends) */}
              {selectedEmail.priority !== 'not_important' && (
                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                      AI Suggested Reply (Human Edits & Approves)
                    </label>
                    <span className="text-[11px] text-slate-400">
                      A person leads final send
                    </span>
                  </div>

                  <textarea
                    rows={4}
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    className="w-full text-xs font-sans p-3 border border-slate-200 rounded-lg focus:outline-teal-600 bg-white leading-relaxed text-slate-800"
                    placeholder="Review and customize reply..."
                  />

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs text-slate-500">
                      Status:{' '}
                      <strong className={selectedEmail.status === 'actioned' ? 'text-emerald-700' : 'text-slate-800'}>
                        {selectedEmail.status === 'actioned' ? 'Reply Sent & Logged' : 'Needs Action'}
                      </strong>
                    </span>

                    <button
                      onClick={handleSendReply}
                      className="cursor-pointer inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-purple-700 hover:bg-purple-800 rounded-lg transition-colors shadow-xs"
                    >
                      <Send className="w-3.5 h-3.5" /> Approve & Send Response
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Modal to Test Ingesting New Email */}
      {showNewEmailModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border border-slate-200 max-w-lg w-full p-6 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-slate-900">
              Test AI Priority Classifier on New Email
            </h3>
            <p className="text-xs text-slate-500">
              Input an email with keywords like &quot;deadline&quot;, &quot;2 days&quot;, &quot;urgent&quot;, or &quot;feedback&quot; to test the real-time triage parser.
            </p>

            <form onSubmit={handleAddNewEmail} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Sender Name / Org
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Registrar Office / Board Chairman"
                  value={newSender}
                  onChange={(e) => setNewSender(e.target.value)}
                  className="w-full text-xs p-2.5 border border-slate-200 rounded-lg"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Email Subject
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Critical: Signature needed in 2 days"
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  className="w-full text-xs p-2.5 border border-slate-200 rounded-lg"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Email Body Content
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Type the email message body..."
                  value={newBody}
                  onChange={(e) => setNewBody(e.target.value)}
                  className="w-full text-xs p-2.5 border border-slate-200 rounded-lg"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewEmailModal(false)}
                  className="cursor-pointer px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="cursor-pointer px-4 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg"
                >
                  Classify & Ingest
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
