import React, { useState } from 'react';
import { NotificationItem } from '../../types';
import {
  MessageSquare,
  Mail,
  Linkedin,
  GraduationCap,
  ArrowLeft,
  CheckCircle2,
  Clock,
  Sparkles,
  Plus,
  Send,
  UserCheck
} from 'lucide-react';

interface UrgentNotificationsWorkspaceProps {
  notifications: NotificationItem[];
  onBackToMatrix: () => void;
}

export const UrgentNotificationsWorkspace: React.FC<UrgentNotificationsWorkspaceProps> = ({
  notifications: initialNotifications,
  onBackToMatrix,
}) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const [selectedChannel, setSelectedChannel] = useState<string>('all');
  const [filterVipOnly, setFilterVipOnly] = useState<boolean>(true);
  const [showAddModal, setShowAddModal] = useState(false);

  // Quick Action Modal state
  const [actingNotif, setActingNotif] = useState<NotificationItem | null>(null);
  const [actionResponseText, setActionResponseText] = useState('');

  // Add new ping form
  const [newSource, setNewSource] = useState<'whatsapp' | 'linkedin' | 'university' | 'gmail'>('whatsapp');
  const [newSender, setNewSender] = useState('');
  const [newOrg, setNewOrg] = useState('');
  const [newMsg, setNewMsg] = useState('');
  const [newIsVip, setNewIsVip] = useState(true);

  const filtered = notifications.filter((item) => {
    if (selectedChannel !== 'all' && item.source !== selectedChannel) return false;
    if (filterVipOnly && !item.isVip) return false;
    return true;
  });

  const getSourceIcon = (source: NotificationItem['source']) => {
    switch (source) {
      case 'whatsapp':
        return <MessageSquare className="w-4 h-4 text-emerald-600" />;
      case 'linkedin':
        return <Linkedin className="w-4 h-4 text-blue-600" />;
      case 'university':
        return <GraduationCap className="w-4 h-4 text-rose-600" />;
      case 'gmail':
        return <Mail className="w-4 h-4 text-amber-600" />;
    }
  };

  const getSourceLabel = (source: NotificationItem['source']) => {
    switch (source) {
      case 'whatsapp':
        return 'WhatsApp Message';
      case 'linkedin':
        return 'LinkedIn InMail';
      case 'university':
        return 'University Official Email';
      case 'gmail':
        return 'Direct Email';
    }
  };

  const handleResolve = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, status: 'resolved' } : n))
    );
    setActingNotif(null);
  };

  const handleCreateNotification = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSender || !newMsg) return;

    const newItem: NotificationItem = {
      id: `notif-${Date.now()}`,
      source: newSource,
      senderName: newSender.trim(),
      senderTitleOrOrg: newOrg.trim() || 'Verified VIP Contact',
      isVip: newIsVip,
      messageSnippet: newMsg.trim(),
      timestamp: 'Just now',
      actionRequired: `Action required: Respond to high-priority inquiry from ${newSender.trim()}.`,
      status: 'pending',
      channelColor:
        newSource === 'whatsapp'
          ? 'text-emerald-600 bg-emerald-50 border-emerald-200'
          : newSource === 'linkedin'
          ? 'text-blue-600 bg-blue-50 border-blue-200'
          : newSource === 'university'
          ? 'text-rose-600 bg-rose-50 border-rose-200'
          : 'text-amber-600 bg-amber-50 border-amber-200',
    };

    setNotifications([newItem, ...notifications]);
    setShowAddModal(false);
    setNewSender('');
    setNewOrg('');
    setNewMsg('');
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
              Task 2 Workspace
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            Multi-Channel Urgent VIP Notification Hub
          </h2>
          <p className="text-xs text-slate-600 mt-1">
            <span className="font-semibold text-purple-900">Quadrant: A Person Leads, AI Inside.</span> AI consolidates WhatsApp, LinkedIn, and University channels, filtering high-stakes senders who require real human action.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="cursor-pointer inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap shrink-0 self-start md:self-auto shadow-xs"
        >
          <Plus className="w-3.5 h-3.5" /> Simulate Incoming VIP Ping
        </button>
      </div>

      {/* Filter and Channel Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white border border-slate-200 rounded-xl p-3 shadow-xs">
        <div className="flex flex-wrap items-center gap-2">
          {['all', 'whatsapp', 'linkedin', 'university', 'gmail'].map((ch) => (
            <button
              key={ch}
              onClick={() => setSelectedChannel(ch)}
              className={`cursor-pointer px-3 py-1.5 text-xs font-semibold rounded-lg transition-all capitalize ${
                selectedChannel === ch
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {ch === 'all' ? 'All Channels' : ch}
            </button>
          ))}
        </div>

        <label className="cursor-pointer flex items-center gap-2 text-xs font-semibold text-slate-700 select-none">
          <input
            type="checkbox"
            checked={filterVipOnly}
            onChange={(e) => setFilterVipOnly(e.target.checked)}
            className="w-4 h-4 text-purple-600 rounded border-slate-300 focus:ring-purple-500 cursor-pointer"
          />
          <span className="flex items-center gap-1 text-purple-900">
            <UserCheck className="w-3.5 h-3.5 text-purple-700" /> Show VIP & Key Orgs Only
          </span>
        </label>
      </div>

      {/* Action Items Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className={`border rounded-xl p-5 bg-white transition-all shadow-xs flex flex-col justify-between ${
              item.status === 'resolved'
                ? 'border-slate-200 opacity-60'
                : 'border-slate-200 hover:border-purple-300'
            }`}
          >
            <div>
              {/* Header: Channel icon + Sender + Timestamp */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-slate-100 rounded-md">
                    {getSourceIcon(item.source)}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">
                      {item.senderName}
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      {item.senderTitleOrOrg} · {getSourceLabel(item.source)}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-mono text-[11px] text-slate-400">
                    {item.timestamp}
                  </span>
                  {item.isVip && (
                    <div className="text-[10px] font-bold text-purple-700 bg-purple-50 px-1.5 py-0.2 rounded border border-purple-200 mt-0.5">
                      VIP ACTION
                    </div>
                  )}
                </div>
              </div>

              {/* Message snippet */}
              <div className="mt-3 text-xs text-slate-700 bg-slate-50/70 p-3 rounded-lg border border-slate-100 leading-relaxed font-sans">
                &ldquo;{item.messageSnippet}&rdquo;
              </div>

              {/* Action Required Banner */}
              <div className="mt-3 flex items-start gap-2 text-xs text-slate-600">
                <Sparkles className="w-3.5 h-3.5 text-purple-600 shrink-0 mt-0.5" />
                <span className="font-medium">
                  {item.actionRequired}
                </span>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              {item.status === 'resolved' ? (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Action Completed & Handled
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-xs text-amber-700 font-medium">
                  <Clock className="w-3.5 h-3.5" /> Pending Your Personal Action
                </span>
              )}

              {item.status !== 'resolved' ? (
                <button
                  onClick={() => {
                    setActingNotif(item);
                    setActionResponseText(
                      item.source === 'whatsapp'
                        ? 'Hi, thanks for reaching out. Yes, 1:30 PM works great for a 10-minute sync. Talk soon!'
                        : item.source === 'university'
                        ? 'Dear Prof. Roh, I would be honored to present the AI task segregation framework during Thursday session. I will send the slide deck by tomorrow.'
                        : 'Thank you for reaching out. I would be glad to discuss this opportunity. Let me know when you have time for a brief call.'
                    );
                  }}
                  className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors shadow-xs"
                >
                  <Send className="w-3 h-3" /> Action This Ping
                </button>
              ) : (
                <button
                  onClick={() =>
                    setNotifications((prev) =>
                      prev.map((n) => (n.id === item.id ? { ...n, status: 'pending' } : n))
                    )
                  }
                  className="cursor-pointer text-xs text-slate-500 hover:text-slate-800"
                >
                  Re-open
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Action Dialog */}
      {actingNotif && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border border-slate-200 max-w-lg w-full p-6 shadow-xl space-y-4">
            <div className="flex items-center gap-2">
              {getSourceIcon(actingNotif.source)}
              <h3 className="text-base font-bold text-slate-900">
                Action VIP Ping: {actingNotif.senderName}
              </h3>
            </div>

            <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-200">
              <strong className="text-slate-900">Incoming: </strong> {actingNotif.messageSnippet}
            </p>

            <div>
              <label className="text-xs font-bold text-slate-800 block mb-1">
                Your Personal Response / Action Sign-off
              </label>
              <textarea
                rows={4}
                value={actionResponseText}
                onChange={(e) => setActionResponseText(e.target.value)}
                className="w-full text-xs p-3 border border-slate-200 rounded-lg focus:outline-teal-600 text-slate-800"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => setActingNotif(null)}
                className="cursor-pointer px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() => handleResolve(actingNotif.id)}
                className="cursor-pointer px-4 py-2 text-xs font-semibold text-white bg-purple-700 hover:bg-purple-800 rounded-lg transition-colors shadow-xs"
              >
                Confirm & Dispatch Action
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Simulate Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border border-slate-200 max-w-md w-full p-6 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-slate-900">
              Simulate Incoming Notification
            </h3>
            <form onSubmit={handleCreateNotification} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Channel
                </label>
                <select
                  value={newSource}
                  onChange={(e) => setNewSource(e.target.value as any)}
                  className="w-full text-xs p-2.5 border border-slate-200 rounded-lg"
                >
                  <option value="whatsapp">WhatsApp</option>
                  <option value="linkedin">LinkedIn</option>
                  <option value="university">University Official Portal</option>
                  <option value="gmail">Gmail</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Sender Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dean Anderson / Sarah Chen"
                  value={newSender}
                  onChange={(e) => setNewSender(e.target.value)}
                  className="w-full text-xs p-2.5 border border-slate-200 rounded-lg"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Organization / Affiliation
                </label>
                <input
                  type="text"
                  placeholder="e.g. University Council / Board"
                  value={newOrg}
                  onChange={(e) => setNewOrg(e.target.value)}
                  className="w-full text-xs p-2.5 border border-slate-200 rounded-lg"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Message Content
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="e.g. Please approve the revision before tomorrow 5 PM..."
                  value={newMsg}
                  onChange={(e) => setNewMsg(e.target.value)}
                  className="w-full text-xs p-2.5 border border-slate-200 rounded-lg"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="cursor-pointer px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="cursor-pointer px-4 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg"
                >
                  Add Notification
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
