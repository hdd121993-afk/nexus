import React, { useState, useEffect } from 'react';
import { X, ShieldCheck, CheckCircle2, Sparkles, Plus, Trash2 } from 'lucide-react';
import { InsurancePlan } from '../types';

interface AddEditInsuranceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (plan: InsurancePlan) => void;
  initialPlan?: InsurancePlan | null;
}

export const AddEditInsuranceModal: React.FC<AddEditInsuranceModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialPlan,
}) => {
  const isEditing = !!initialPlan;

  const [title, setTitle] = useState('');
  const [type, setType] = useState<InsurancePlan['type']>('Prepaid Memorial Plan (Casket)');
  const [summary, setSummary] = useState('');
  const [description, setDescription] = useState('');
  const [coverageAmount, setCoverageAmount] = useState<number>(85000);
  const [minMonthlyPremium, setMinMonthlyPremium] = useState<number>(1250);
  const [protectionPeriod, setProtectionPeriod] = useState('Guaranteed Lifetime Service');
  const [tag, setTag] = useState('');
  const [popular, setPopular] = useState(false);
  const [featuresStr, setFeaturesStr] = useState('');
  const [installmentTermsStr, setInstallmentTermsStr] = useState('');

  useEffect(() => {
    if (initialPlan) {
      setTitle(initialPlan.title);
      setType(initialPlan.type);
      setSummary(initialPlan.summary);
      setDescription(initialPlan.description || initialPlan.summary);
      setCoverageAmount(initialPlan.coverageAmount);
      setMinMonthlyPremium(initialPlan.minMonthlyPremium);
      setProtectionPeriod(initialPlan.protectionPeriod);
      setTag(initialPlan.tag || '');
      setPopular(!!initialPlan.popular);
      setFeaturesStr(initialPlan.features.join('\n'));
      setInstallmentTermsStr(initialPlan.installmentTerms.join(', '));
    } else {
      setTitle('');
      setType('Prepaid Memorial Plan (Casket)');
      setSummary('Quality prepaid memorial life plan, trusted by millions of Filipinos. Planning ahead is an act of love.');
      setDescription('Planning ahead is an act of love. Get our licensed, trust-fund protected life plans.');
      setCoverageAmount(85000);
      setMinMonthlyPremium(1250);
      setProtectionPeriod('Guaranteed Lifetime Service');
      setTag('Trust-Fund Protected');
      setPopular(false);
      setFeaturesStr('Quality Casket with elegant interior finishing\n4 Days Chapel Viewing or Full Home Viewing setup\nLicensed Embalming, Cosmetology & Restorative Care\nFirst-Class Hearse Transport & Internment Assistance\n100% Transferable & Assignable Guarantee\nTrust-Fund Protected under Insurance Commission\nAccidental Death & Dismemberment Rider Included');
      setInstallmentTermsStr('5-Year Monthly (₱1,250/mo), Quarterly (₱3,600), Semi-Annual (₱7,000), Annual (₱13,500), Spot Cash Discount (₱65,000)');
    }
  }, [initialPlan, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !summary.trim()) {
      alert('Please fill in the policy title and summary.');
      return;
    }

    const features = featuresStr
      .split('\n')
      .map((f) => f.trim())
      .filter((f) => f.length > 0);

    const installmentTerms = installmentTermsStr
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const savedPlan: InsurancePlan = {
      id: initialPlan ? initialPlan.id : `ins-${Date.now()}`,
      title: title.trim(),
      type,
      summary: summary.trim(),
      description: description.trim() || summary.trim(),
      coverageAmount: Number(coverageAmount),
      minMonthlyPremium: Number(minMonthlyPremium),
      protectionPeriod: protectionPeriod.trim() || 'Lifetime Coverage',
      tag: tag.trim(),
      popular,
      features: features.length > 0 ? features : ['Guaranteed Coverage', 'Reinsurance Backed'],
      installmentTerms: installmentTerms.length > 0 ? installmentTerms : ['Monthly', 'Annual'],
    };

    onSave(savedPlan);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden my-8 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold">
                {isEditing ? 'Edit Prepaid Memorial Life Plan' : 'Add New Prepaid Memorial Life Plan'}
              </h2>
              <p className="text-xs text-slate-400">
                Administrator Exclusive: Configure licensed, trust-fund protected prepaid memorial life plans
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-slate-800 text-slate-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5 overflow-y-auto flex-1 text-xs">
          {/* Title & Type */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Plan Title *</label>
              <input
                type="text"
                required
                placeholder="e.g. St. Jude Heritage Prepaid Memorial Plan"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 font-semibold"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Life Plan Category *</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="w-full p-2.5 rounded-xl border border-slate-200 font-medium focus:ring-2 focus:ring-emerald-500"
              >
                <option value="Prepaid Memorial Plan (Casket)">Prepaid Memorial Plan (Casket)</option>
                <option value="Prepaid Memorial Plan (Cremation)">Prepaid Memorial Plan (Cremation)</option>
                <option value="Traditional Life Insurance">Traditional Life Insurance</option>
                <option value="Whole Life Memorial Plan">Whole Life Memorial Plan</option>
                <option value="Family Heritage Life Plan">Family Heritage Life Plan</option>
              </select>
            </div>
          </div>

          {/* Pricing & Coverage (in Peso) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Coverage Sum (₱) *
              </label>
              <input
                type="number"
                required
                min={100000}
                step={50000}
                value={coverageAmount}
                onChange={(e) => setCoverageAmount(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 font-extrabold text-slate-900 bg-white"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Min. Monthly Installment (₱) *
              </label>
              <input
                type="number"
                required
                min={500}
                step={100}
                value={minMonthlyPremium}
                onChange={(e) => setMinMonthlyPremium(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 font-extrabold text-emerald-600 bg-white"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Protection Period
              </label>
              <input
                type="text"
                placeholder="e.g. Up to Age 100"
                value={protectionPeriod}
                onChange={(e) => setProtectionPeriod(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 font-medium bg-white"
              />
            </div>
          </div>

          {/* Tag & Popular Toggle */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Marketing Tag / Badge</label>
              <input
                type="text"
                placeholder="e.g. Highest Return or Zero Medical"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200"
              />
            </div>

            <div className="flex items-center gap-3 pt-6">
              <input
                type="checkbox"
                id="popularCheck"
                checked={popular}
                onChange={(e) => setPopular(e.target.checked)}
                className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
              />
              <label htmlFor="popularCheck" className="font-bold text-slate-700 cursor-pointer">
                Highlight as Featured / Most Popular Plan
              </label>
            </div>
          </div>

          {/* Summary */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">Summary Description *</label>
            <textarea
              rows={2}
              required
              placeholder="Brief description of the policy's purpose and value proposition..."
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Features (One per line) */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Policy Privileges & Features (one per line)
            </label>
            <textarea
              rows={3}
              placeholder="Guaranteed Death Benefit&#10;Accidental Death Rider Included&#10;Annual Loyalty Bonus"
              value={featuresStr}
              onChange={(e) => setFeaturesStr(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 font-mono text-[11px]"
            />
          </div>

          {/* Installment Schemes (Comma-separated) */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Available Installment Payment Schemes (comma-separated)
            </label>
            <input
              type="text"
              placeholder="Monthly ₱3,500/mo, Quarterly ₱10,200, Semi-Annual ₱20,000, Annual ₱39,000"
              value={installmentTermsStr}
              onChange={(e) => setInstallmentTermsStr(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 font-medium"
            />
          </div>

          {/* Submit */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold shadow-md flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isEditing ? 'Save Changes' : 'Publish Insurance Plan'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
