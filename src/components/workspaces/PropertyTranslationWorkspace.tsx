import React, { useState } from 'react';
import { PropertyListing } from '../../types';
import {
  Building2,
  Globe2,
  Mail,
  Send,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Play,
  RotateCcw,
  FileText,
  Eye,
  Plus
} from 'lucide-react';

interface PropertyTranslationWorkspaceProps {
  properties: PropertyListing[];
  onBackToMatrix: () => void;
}

const LANGUAGES = [
  { code: 'en', label: 'English (Original)', flag: '🇺🇸' },
  { code: 'es', label: 'Spanish (Español)', flag: '🇪🇸' },
  { code: 'zh', label: 'Mandarin (中文)', flag: '🇨🇳' },
  { code: 'fr', label: 'French (Français)', flag: '🇫🇷' },
  { code: 'de', label: 'German (Deutsch)', flag: '🇩🇪' },
  { code: 'ja', label: 'Japanese (日本語)', flag: '🇯🇵' },
];

export const PropertyTranslationWorkspace: React.FC<PropertyTranslationWorkspaceProps> = ({
  properties: initialProperties,
  onBackToMatrix,
}) => {
  const [properties, setProperties] = useState<PropertyListing[]>(initialProperties);
  const [selectedPropId, setSelectedPropId] = useState<string>(properties[0]?.id || '');
  const [activeLang, setActiveLang] = useState<string>('es');
  const [isProcessing, setIsProcessing] = useState(false);
  const [pipelineStep, setPipelineStep] = useState<number>(0);
  const [showEmailPreview, setShowEmailPreview] = useState(false);
  const [recipientEmail, setRecipientEmail] = useState('global-investors@capital-partners.com');
  const [showAddPropertyModal, setShowAddPropertyModal] = useState(false);

  // New property form
  const [newName, setNewName] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newSqFt, setNewSqFt] = useState('5000');
  const [newZoning, setNewZoning] = useState('Commercial / Office');
  const [newDesc, setNewDesc] = useState('');

  const selectedProp = properties.find((p) => p.id === selectedPropId) || properties[0];

  const runAutonomousPipeline = () => {
    if (!selectedProp || isProcessing) return;
    setIsProcessing(true);
    setPipelineStep(1);

    setTimeout(() => {
      setPipelineStep(2);
      setTimeout(() => {
        setPipelineStep(3);
        setTimeout(() => {
          setPipelineStep(4);
          // Mark dispatched
          setProperties((prev) =>
            prev.map((p) =>
              p.id === selectedProp.id
                ? {
                    ...p,
                    status: 'dispatched',
                    dispatchedTo: recipientEmail,
                    dispatchedAt: `Today at ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} via Autonomous SMTP Dispatcher`,
                  }
                : p
            )
          );
          setIsProcessing(false);
        }, 800);
      }, 900);
    }, 700);
  };

  const handleAddProperty = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newDesc) return;

    const newProp: PropertyListing = {
      id: `prop-${Date.now()}`,
      code: `PROP-${Math.floor(100 + Math.random() * 900)}-AUTO`,
      propertyName: newName.trim(),
      location: newLocation.trim() || 'Central Metropolitan Core',
      price: newPrice.trim() || '$4,200,000 USD',
      specs: {
        areaSqFt: parseInt(newSqFt) || 5000,
        bedrooms: 0,
        bathrooms: 4,
        zoning: newZoning.trim(),
        yearBuilt: 2025,
      },
      descriptionEn: newDesc.trim(),
      translations: {
        es: `[Traducción automática] ${newDesc.trim()} - Unidad comercial con certificación de alto rendimiento y especificaciones técnicas completas.`,
        zh: `[自动化高精度翻译] ${newDesc.trim()} - 具备全套合规商业资质、高规格空间参数及专属设施。`,
        fr: `[Traduction automatisée] ${newDesc.trim()} - Propriété commerciale haut de gamme avec conformité réglementaire intégrale.`,
        de: `[Automatisierte Übersetzung] ${newDesc.trim()} - Gewerbliche Premium-Immobilie mit vollständiger regulatorischer Konformität.`,
        ja: `[AI自動翻訳] ${newDesc.trim()} - 最新の建築基準を満たした高仕様商業用不動産物件。`,
      },
      status: 'ready',
    };

    setProperties([newProp, ...properties]);
    setSelectedPropId(newProp.id);
    setShowAddPropertyModal(false);
    setNewName('');
    setNewDesc('');
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
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700">
              Task 4 Workspace
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            Property Data Multi-Language Translation & Email Dispatch
          </h2>
          <p className="text-xs text-slate-600 mt-1">
            <span className="font-semibold text-teal-900">Quadrant: AI Alone (Autonomous Execution).</span> Deterministic property attributes and standardized localization rules allow the AI pipeline to execute end-to-end without human bottlenecks.
          </p>
        </div>

        <button
          onClick={() => setShowAddPropertyModal(true)}
          className="cursor-pointer inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap shrink-0 self-start md:self-auto shadow-xs"
        >
          <Plus className="w-3.5 h-3.5" /> Ingest Property Spec
        </button>
      </div>

      {/* Autonomous Pipeline Runner Card */}
      <div className="bg-gradient-to-r from-teal-900 to-slate-900 text-white rounded-xl p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider bg-teal-500/20 text-teal-300 px-2 py-0.5 rounded border border-teal-400/30">
                Autonomous Pipeline · Zero Human Bottleneck
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white mt-1">
              End-to-End Multilingual Translation & SMTP Dispatch
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={runAutonomousPipeline}
              disabled={isProcessing}
              className="cursor-pointer inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-900 bg-teal-400 hover:bg-teal-300 disabled:opacity-50 disabled:pointer-events-none rounded-lg transition-all shadow-xs"
            >
              <Play className="w-3.5 h-3.5" />
              {isProcessing ? 'Executing Autonomous Pipeline...' : 'Run Pipeline for Selected Property'}
            </button>
          </div>
        </div>

        {/* Pipeline Step Progress */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 pt-2 text-xs">
          <div
            className={`p-2.5 rounded-lg border transition-all ${
              pipelineStep >= 1
                ? 'bg-teal-950/80 border-teal-500 text-teal-200'
                : 'bg-white/5 border-white/10 text-slate-400'
            }`}
          >
            <div className="font-mono text-[10px] text-teal-400">Step 1</div>
            <div className="font-semibold text-white">Ingest & Parse Data</div>
            <div className="text-[11px] text-slate-300">Validate zoning & specs</div>
          </div>

          <div
            className={`p-2.5 rounded-lg border transition-all ${
              pipelineStep >= 2
                ? 'bg-teal-950/80 border-teal-500 text-teal-200'
                : 'bg-white/5 border-white/10 text-slate-400'
            }`}
          >
            <div className="font-mono text-[10px] text-teal-400">Step 2</div>
            <div className="font-semibold text-white">5-Language Neural Trans</div>
            <div className="text-[11px] text-slate-300">ES, ZH, FR, DE, JA</div>
          </div>

          <div
            className={`p-2.5 rounded-lg border transition-all ${
              pipelineStep >= 3
                ? 'bg-teal-950/80 border-teal-500 text-teal-200'
                : 'bg-white/5 border-white/10 text-slate-400'
            }`}
          >
            <div className="font-mono text-[10px] text-teal-400">Step 3</div>
            <div className="font-semibold text-white">Compile HTML Summary</div>
            <div className="text-[11px] text-slate-300">Standardized tables & terms</div>
          </div>

          <div
            className={`p-2.5 rounded-lg border transition-all ${
              pipelineStep >= 4
                ? 'bg-teal-950/80 border-teal-500 text-teal-200'
                : 'bg-white/5 border-white/10 text-slate-400'
            }`}
          >
            <div className="font-mono text-[10px] text-teal-400">Step 4</div>
            <div className="font-semibold text-white">SMTP Mail Dispatch</div>
            <div className="text-[11px] text-slate-300">Delivered to syndicate</div>
          </div>
        </div>
      </div>

      {/* Main 2-Column Property Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Properties list */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 px-1">
            Properties in Catalog ({properties.length})
          </div>

          {properties.map((prop) => {
            const isSelected = prop.id === selectedProp?.id;
            return (
              <div
                key={prop.id}
                onClick={() => setSelectedPropId(prop.id)}
                className={`cursor-pointer p-4 rounded-xl border transition-all text-left ${
                  isSelected
                    ? 'bg-white border-teal-500 shadow-xs ring-1 ring-teal-500'
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                }`}
              >
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-mono font-bold text-teal-700">{prop.code}</span>
                  <span className="font-mono text-slate-500 font-bold">{prop.price}</span>
                </div>

                <h4 className="text-sm font-bold text-slate-900 mt-1 line-clamp-1">
                  {prop.propertyName}
                </h4>

                <p className="text-xs text-slate-500 mt-1">
                  {prop.location}
                </p>

                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-500">
                    {prop.specs.areaSqFt.toLocaleString()} sq ft · {prop.specs.zoning}
                  </span>

                  {prop.status === 'dispatched' ? (
                    <span className="inline-flex items-center gap-1 font-semibold text-emerald-600 text-[11px]">
                      <CheckCircle2 className="w-3 h-3" /> Dispatched
                    </span>
                  ) : (
                    <span className="text-amber-700 font-medium text-[11px]">
                      Ready for Pipeline
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Multi-Language Inspector & Dispatch Card */}
        {selectedProp && (
          <div className="lg:col-span-8 bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-6">
            {/* Property Header */}
            <div className="border-b border-slate-200 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-teal-700 font-bold mb-1">
                  <span>{selectedProp.code}</span>
                  <span>·</span>
                  <span>{selectedProp.location}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  {selectedProp.propertyName}
                </h3>
                <p className="text-sm font-bold text-slate-700 font-mono mt-0.5">
                  Listing Valuation: {selectedProp.price}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowEmailPreview(true)}
                  className="cursor-pointer inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" /> Preview Mail Report
                </button>
              </div>
            </div>

            {/* Specifications Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-3.5 rounded-lg border border-slate-100 text-xs">
              <div>
                <span className="text-[11px] text-slate-400 block">Total Area</span>
                <span className="font-mono font-bold text-slate-900">
                  {selectedProp.specs.areaSqFt.toLocaleString()} sq ft
                </span>
              </div>
              <div>
                <span className="text-[11px] text-slate-400 block">Zoning Code</span>
                <span className="font-medium text-slate-900">
                  {selectedProp.specs.zoning}
                </span>
              </div>
              <div>
                <span className="text-[11px] text-slate-400 block">Baths / Beds</span>
                <span className="font-mono font-medium text-slate-900">
                  {selectedProp.specs.bathrooms} ba / {selectedProp.specs.bedrooms} bd
                </span>
              </div>
              <div>
                <span className="text-[11px] text-slate-400 block">Year Built</span>
                <span className="font-mono font-medium text-slate-900">
                  {selectedProp.specs.yearBuilt}
                </span>
              </div>
            </div>

            {/* Multilingual Translation Inspector */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <Globe2 className="w-3.5 h-3.5 text-teal-700" />
                  Multilingual Translation Verification
                </label>
                <span className="text-[11px] text-slate-400">
                  Objective Real Estate Terminology Mapping
                </span>
              </div>

              {/* Language Selector Tabs */}
              <div className="flex flex-wrap gap-1.5 p-1 bg-slate-100 rounded-lg">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setActiveLang(lang.code)}
                    className={`cursor-pointer px-2.5 py-1 text-xs font-medium rounded-md transition-all flex items-center gap-1.5 ${
                      activeLang === lang.code
                        ? 'bg-white text-slate-900 shadow-xs font-semibold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.label}</span>
                  </button>
                ))}
              </div>

              {/* Translation Display */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg text-xs leading-relaxed text-slate-800 min-h-[90px]">
                {activeLang === 'en' ? (
                  <div>
                    <span className="font-semibold text-slate-900 block mb-1">
                      Original English Listing Description:
                    </span>
                    {selectedProp.descriptionEn}
                  </div>
                ) : (
                  <div>
                    <span className="font-semibold text-teal-900 block mb-1">
                      Automated Translation ({LANGUAGES.find((l) => l.code === activeLang)?.label}):
                    </span>
                    {selectedProp.translations[activeLang] || 'Translation compiling...'}
                  </div>
                )}
              </div>
            </div>

            {/* Email Dispatch Info */}
            <div className="p-4 bg-teal-50/60 border border-teal-200 rounded-lg space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-teal-700" />
                  <span className="text-xs font-bold text-teal-950">
                    Automated Email Dispatch Distribution List
                  </span>
                </div>

                {selectedProp.status === 'dispatched' && (
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Report Sent
                  </span>
                )}
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-1">
                <input
                  type="email"
                  value={recipientEmail}
                  onChange={(e) => setRecipientEmail(e.target.value)}
                  className="flex-1 text-xs p-2 bg-white border border-teal-200 rounded-lg focus:outline-teal-600 font-mono text-slate-800"
                  placeholder="investors@domain.com"
                />
                <button
                  onClick={runAutonomousPipeline}
                  disabled={isProcessing}
                  className="cursor-pointer px-4 py-2 text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-lg transition-colors whitespace-nowrap shadow-xs"
                >
                  Dispatch Final Summary
                </button>
              </div>

              {selectedProp.dispatchedAt && (
                <p className="text-[11px] text-teal-900/80 pt-1">
                  Last automated dispatch: <strong>{selectedProp.dispatchedAt}</strong> to{' '}
                  <strong className="font-mono">{selectedProp.dispatchedTo}</strong>
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Email Report Preview Modal */}
      {showEmailPreview && selectedProp && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border border-slate-200 max-w-2xl w-full p-6 shadow-xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-teal-700" />
                <h3 className="text-base font-bold text-slate-900">
                  Preview: Automated Multilingual Executive Summary Email
                </h3>
              </div>
              <button
                onClick={() => setShowEmailPreview(false)}
                className="cursor-pointer text-slate-400 hover:text-slate-700 text-sm font-semibold"
              >
                ✕ Close
              </button>
            </div>

            {/* Email Header Metadata */}
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs space-y-1">
              <div>
                <strong className="text-slate-500">To: </strong>
                <span className="font-mono text-slate-800">{recipientEmail}</span>
              </div>
              <div>
                <strong className="text-slate-500">From: </strong>
                <span className="font-mono text-slate-800">reports@automated-realestate-engine.com</span>
              </div>
              <div>
                <strong className="text-slate-500">Subject: </strong>
                <span className="font-bold text-slate-900">
                  [EXECUTIVE SUMMARY] Multilingual Portfolio Dossier: {selectedProp.code} ({selectedProp.propertyName})
                </span>
              </div>
            </div>

            {/* Rendered HTML Email Body */}
            <div className="border border-slate-200 rounded-lg p-5 space-y-4 text-xs font-sans bg-white">
              <div className="border-b border-slate-100 pb-3">
                <h4 className="text-base font-bold text-slate-900">
                  {selectedProp.propertyName}
                </h4>
                <p className="text-slate-500">
                  {selectedProp.location} · Valuation: <strong>{selectedProp.price}</strong>
                </p>
              </div>

              {/* Specs table */}
              <table className="w-full text-left border-collapse border border-slate-200 text-xs">
                <tbody>
                  <tr className="border-b border-slate-200">
                    <td className="p-2 bg-slate-50 font-semibold text-slate-600 w-1/3">Area</td>
                    <td className="p-2 font-mono">{selectedProp.specs.areaSqFt.toLocaleString()} sq ft</td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="p-2 bg-slate-50 font-semibold text-slate-600">Zoning Designation</td>
                    <td className="p-2">{selectedProp.specs.zoning}</td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="p-2 bg-slate-50 font-semibold text-slate-600">Year Built</td>
                    <td className="p-2 font-mono">{selectedProp.specs.yearBuilt}</td>
                  </tr>
                </tbody>
              </table>

              {/* Localized summaries */}
              <div className="space-y-3 pt-2">
                <div className="p-3 bg-slate-50 rounded border border-slate-100">
                  <span className="font-bold text-slate-900 block mb-0.5">🇺🇸 English Summary:</span>
                  <p className="text-slate-700 leading-relaxed">{selectedProp.descriptionEn}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded border border-slate-100">
                  <span className="font-bold text-slate-900 block mb-0.5">🇪🇸 Resumen en Español:</span>
                  <p className="text-slate-700 leading-relaxed">{selectedProp.translations.es}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded border border-slate-100">
                  <span className="font-bold text-slate-900 block mb-0.5">🇨🇳 中文投资摘要:</span>
                  <p className="text-slate-700 leading-relaxed">{selectedProp.translations.zh}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded border border-slate-100">
                  <span className="font-bold text-slate-900 block mb-0.5">🇯🇵 日本語サマリー:</span>
                  <p className="text-slate-700 leading-relaxed">{selectedProp.translations.ja}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-400">
                Generated automatically by Autonomous Commercial Agent Node · AI Alone Execution Standard.
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setShowEmailPreview(false)}
                className="cursor-pointer px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal to Ingest New Property */}
      {showAddPropertyModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border border-slate-200 max-w-lg w-full p-6 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-slate-900">
              Ingest New Property Data Spec
            </h3>
            <p className="text-xs text-slate-500">
              Input new technical property parameters to test the autonomous translation and email dispatch pipeline.
            </p>

            <form onSubmit={handleAddProperty} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Property Asset Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Apex Industrial Logistics Facility"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full text-xs p-2.5 border border-slate-200 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Frankfurt Financial Hub"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    className="w-full text-xs p-2.5 border border-slate-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Valuation Price
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. $5,200,000 USD"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    className="w-full text-xs p-2.5 border border-slate-200 rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Area (Sq Ft)
                  </label>
                  <input
                    type="number"
                    value={newSqFt}
                    onChange={(e) => setNewSqFt(e.target.value)}
                    className="w-full text-xs p-2.5 border border-slate-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Zoning
                  </label>
                  <input
                    type="text"
                    value={newZoning}
                    onChange={(e) => setNewZoning(e.target.value)}
                    className="w-full text-xs p-2.5 border border-slate-200 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  English Description Spec
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Technical description of building amenities, certifications, and infrastructure..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full text-xs p-2.5 border border-slate-200 rounded-lg"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddPropertyModal(false)}
                  className="cursor-pointer px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="cursor-pointer px-4 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg"
                >
                  Add Property
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
