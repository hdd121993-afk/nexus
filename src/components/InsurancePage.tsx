import React, { useState } from 'react';
import {
  ShieldCheck,
  Calculator,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  FileCheck2,
  Clock,
  Plus,
  Edit,
  Trash2,
  Crown,
  Heart,
  Users,
  Award,
  Lock,
  Compass,
  FileText
} from 'lucide-react';
import { InsurancePlan, MemberProfile } from '../types';
import { AddEditInsuranceModal } from './AddEditInsuranceModal';

interface InsurancePageProps {
  plans: InsurancePlan[];
  currentUser?: MemberProfile | null;
  onAddPlan?: (plan: InsurancePlan) => void;
  onUpdatePlan?: (plan: InsurancePlan) => void;
  onDeletePlan?: (id: string) => void;
  onOpenContact: () => void;
}

export const InsurancePage: React.FC<InsurancePageProps> = ({
  plans,
  currentUser,
  onAddPlan,
  onUpdatePlan,
  onDeletePlan,
  onOpenContact,
}) => {
  // Memorial Plan Calculator state
  const [selectedPlanType, setSelectedPlanType] = useState<string>('Prepaid Memorial Plan (Casket)');
  const [clientAge, setClientAge] = useState<number>(35);
  const [targetPackagePrice, setTargetPackagePrice] = useState<number>(85000);
  const [paymentMode, setPaymentMode] = useState<'Monthly' | 'Quarterly' | 'Semi-Annual' | 'Annual' | 'Spot Cash'>('Monthly');
  const [quoteRequested, setQuoteRequested] = useState<boolean>(false);

  // Admin Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<InsurancePlan | null>(null);

  // Dynamic 5-year installment calculation based on target price and payment frequency
  const calculateEstimatedPremium = () => {
    if (paymentMode === 'Spot Cash') {
      return Math.round(targetPackagePrice * 0.9); // 10% cash discount
    }
    // 5-Year (60 months) standard term
    const totalWithTrustFund = targetPackagePrice;
    if (paymentMode === 'Monthly') {
      return Math.round(totalWithTrustFund / 60);
    } else if (paymentMode === 'Quarterly') {
      return Math.round((totalWithTrustFund / 60) * 3);
    } else if (paymentMode === 'Semi-Annual') {
      return Math.round((totalWithTrustFund / 60) * 6);
    } else {
      // Annual
      return Math.round((totalWithTrustFund / 60) * 12);
    }
  };

  const estimatedPremium = calculateEstimatedPremium();

  const handleOpenAddModal = () => {
    setEditingPlan(null);
    setModalOpen(true);
  };

  const handleOpenEditModal = (plan: InsurancePlan) => {
    setEditingPlan(plan);
    setModalOpen(true);
  };

  const handleSavePlan = (plan: InsurancePlan) => {
    if (editingPlan && onUpdatePlan) {
      onUpdatePlan(plan);
    } else if (onAddPlan) {
      onAddPlan(plan);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Hero Banner with User's Exact Mandatory Philippine Memorial Life Plan Statement */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-indigo-950 rounded-3xl p-8 sm:p-12 text-white border border-emerald-800/60 shadow-2xl relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
            <Heart className="w-3.5 h-3.5 fill-emerald-400 text-emerald-400" />
            <span>Licensed & Regulated by Philippine Insurance Commission</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            Prepaid Memorial Life Plans & Life Insurance
          </h1>

          {/* User's Exact Copy Quote */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-slate-100 text-sm sm:text-base leading-relaxed">
            <p className="font-semibold italic text-emerald-300 mb-1">
              "Planning ahead is an act of love."
            </p>
            <p className="text-slate-200">
              Life plan offers quality prepaid memorial plans, trusted by millions of Filipinos. Planning ahead is an act of love. Get our licensed, trust-fund protected life plans.
            </p>
          </div>

          {/* 4 Core Trust Pillars */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs">
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-700/60 flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="font-semibold text-slate-200">100% Trust-Fund Protected</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-700/60 flex items-center gap-2.5">
              <Users className="w-4 h-4 text-cyan-400 shrink-0" />
              <span className="font-semibold text-slate-200">Transferable & Assignable</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-700/60 flex items-center gap-2.5">
              <Lock className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="font-semibold text-slate-200">Locked-in (Zero Inflation)</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-700/60 flex items-center gap-2.5">
              <Award className="w-4 h-4 text-purple-400 shrink-0" />
              <span className="font-semibold text-slate-200">Full Memorial Services</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive 5-Year Memorial Plan & Installment Calculator */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-lg">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Prepaid Memorial Life Plan Installment Calculator
            </h2>
            <p className="text-xs text-slate-500">
              Calculate your comfortable 5-year installment terms. No physical examination required for enrollment.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {/* Column 1: Plan selection & Age */}
          <div className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">Select Life Plan Category</label>
              <select
                value={selectedPlanType}
                onChange={(e) => {
                  setSelectedPlanType(e.target.value);
                  if (e.target.value === 'Prepaid Memorial Plan (Casket)') setTargetPackagePrice(85000);
                  else if (e.target.value === 'Prepaid Memorial Plan (Cremation)') setTargetPackagePrice(75000);
                  else if (e.target.value === 'Whole Life Memorial Plan') setTargetPackagePrice(160000);
                  else setTargetPackagePrice(95000);
                }}
                className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:ring-2 focus:ring-emerald-500"
              >
                <option value="Prepaid Memorial Plan (Casket)">Prepaid Memorial Plan (Fine Casket + 4-Day Viewing)</option>
                <option value="Prepaid Memorial Plan (Cremation)">Prepaid Cremation Care (Cremation + Urn + Wake)</option>
                <option value="Whole Life Memorial Plan">Whole Life Sovereign Memorial Plan (Presidential Metal)</option>
                <option value="Family Heritage Life Plan">Assignable Family Heritage Memorial Protection</option>
              </select>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 mb-2">
                <span>Planholder Age:</span>
                <span className="text-emerald-600 font-extrabold">{clientAge} Years Old</span>
              </div>
              <input
                type="range"
                min={18}
                max={65}
                value={clientAge}
                onChange={(e) => setClientAge(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>18 (Young Adult)</span>
                <span>40 (Prime)</span>
                <span>65 (Eligible Maximum)</span>
              </div>
            </div>
          </div>

          {/* Column 2: Plan Value & Installment Mode */}
          <div className="space-y-5">
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 mb-2">
                <span>Memorial Contract Value:</span>
                <span className="text-emerald-600 font-extrabold text-sm">₱{targetPackagePrice.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min={55000}
                max={250000}
                step={5000}
                value={targetPackagePrice}
                onChange={(e) => setTargetPackagePrice(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>₱55,000 (Standard)</span>
                <span>₱145,000 (Prestige)</span>
                <span>₱250,000+ (Grand)</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">5-Year Payment Term Mode</label>
              <div className="grid grid-cols-3 gap-2">
                {(['Monthly', 'Quarterly', 'Semi-Annual', 'Annual', 'Spot Cash'] as const).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setPaymentMode(mode)}
                    className={`py-2 px-2 text-center rounded-xl text-xs font-bold border transition-all ${
                      paymentMode === mode
                        ? 'bg-emerald-600 text-white border-emerald-700 shadow-sm'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Column 3: Result Card */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white p-6 rounded-2xl border border-slate-800 shadow-inner flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>{paymentMode === 'Spot Cash' ? 'Spot Cash Price' : `5-Year ${paymentMode} Installment`}</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold text-[10px]">
                  Trust-Fund Backed
                </span>
              </div>

              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-3xl sm:text-4xl font-extrabold text-emerald-400">
                  ₱{estimatedPremium.toLocaleString()}
                </span>
                <span className="text-xs text-slate-400 font-semibold">
                  {paymentMode === 'Spot Cash' ? ' (10% Discount)' : `/${paymentMode.toLowerCase()}`}
                </span>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 space-y-1.5 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span>Guaranteed Memorial Service:</span>
                  <span className="font-bold text-white">Full Mortuary Included</span>
                </div>
                <div className="flex justify-between">
                  <span>Accidental Death Benefit:</span>
                  <span className="font-bold text-emerald-400">Up to ₱200,000 Cash</span>
                </div>
                <div className="flex justify-between">
                  <span>Transferability:</span>
                  <span className="font-bold text-cyan-300">100% Living or Deceased</span>
                </div>
                <div className="flex justify-between">
                  <span>Inflation Protection:</span>
                  <span className="font-bold text-white">Guaranteed Zero Future Price Hike</span>
                </div>
              </div>
            </div>

            <div className="mt-6">
              {quoteRequested ? (
                <div className="p-3 bg-emerald-950/80 border border-emerald-700 rounded-xl text-xs text-emerald-300 text-center font-bold">
                  ✓ Official Life Plan proposal prepared! An authorized advisor will reach out.
                </div>
              ) : (
                <button
                  onClick={() => setQuoteRequested(true)}
                  className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md shadow-emerald-500/20"
                >
                  <FileCheck2 className="w-4 h-4" />
                  <span>Request Official Life Plan Quote</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Available Life Plans Catalog */}
      <div>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Licensed Prepaid Memorial Life Plans
              </h2>
              <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full border border-emerald-200">
                {plans.length} Available Plans
              </span>
            </div>
            <p className="text-sm text-slate-600 mt-1">
              Pre-need memorial protection, trusted by millions of Filipino families nationwide.
            </p>
          </div>

          {/* Admin Add Plan Button */}
          {currentUser?.isAdmin && (
            <button
              onClick={handleOpenAddModal}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-md shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>+ Add Life Plan (Admin Only)</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between relative group"
            >
              {plan.popular && (
                <div className="absolute -top-3.5 right-6 px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md">
                  Most Requested by Filipino Families
                </div>
              )}

              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {plan.type}
                  </span>

                  {/* Admin Edit/Delete Controls */}
                  {currentUser?.isAdmin && (
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleOpenEditModal(plan)}
                        className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors text-xs font-bold flex items-center gap-1"
                        title="Edit policy plan details"
                      >
                        <Edit className="w-3.5 h-3.5 text-indigo-600" />
                        <span>Edit</span>
                      </button>
                      {onDeletePlan && (
                        <button
                          onClick={() => {
                            if (confirm(`Admin confirmation: Are you sure you want to delete "${plan.title}"?`)) {
                              onDeletePlan(plan.id);
                            }
                          }}
                          className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors"
                          title="Delete policy plan"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  )}
                </div>

                <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                  {plan.title}
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">{plan.summary}</p>

                <div className="mt-5 p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-slate-500 font-bold uppercase block">Guaranteed Benefit Value</span>
                    <p className="text-xl font-extrabold text-slate-900">
                      ₱{plan.coverageAmount.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] text-emerald-800 font-bold uppercase block">5-Yr Installment Starts At</span>
                    <p className="text-xl font-extrabold text-emerald-600">
                      ₱{plan.minMonthlyPremium.toLocaleString()} <span className="text-xs font-normal text-slate-500">/ mo</span>
                    </p>
                  </div>
                </div>

                <div className="mt-5 space-y-2">
                  <p className="text-xs font-bold text-slate-800 uppercase tracking-wider">Memorial Inclusions & Privileges:</p>
                  {plan.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-600">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100">
                  <p className="text-xs font-bold text-slate-700 mb-2">Available 5-Year Payment Schedules:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {plan.installmentTerms.map((term, idx) => (
                      <span key={idx} className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 font-medium border border-slate-200">
                        {term}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-100 flex items-center gap-3">
                <button
                  onClick={onOpenContact}
                  className="flex-1 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-colors text-center shadow-md shadow-emerald-600/20"
                >
                  Consult Memorial Counselor
                </button>
                {currentUser?.isAdmin && (
                  <button
                    onClick={() => handleOpenEditModal(plan)}
                    className="px-4 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold text-xs flex items-center gap-1.5"
                    title="Edit policy"
                  >
                    <Edit className="w-3.5 h-3.5" />
                    <span>Edit Plan</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trust & Guarantee Banner */}
      <div className="bg-slate-900 rounded-3xl p-8 sm:p-10 border border-slate-800 text-white flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold">
            <Sparkles className="w-4 h-4" />
            <span>Why Planning Ahead is an Act of Love</span>
          </div>
          <h3 className="text-2xl font-bold">Zero Financial Stress for Your Loved Ones</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            During the most painful moment in a family's life, memorial expenses shouldn't cause panic, debt, or distress. Having a licensed pre-need life plan ensures everything from the chapel to internment is dignified, prepared, and fully paid for.
          </p>
        </div>

        <button
          onClick={onOpenContact}
          className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs uppercase tracking-wider whitespace-nowrap shadow-lg shadow-emerald-500/20"
        >
          Secure Your Family's Life Plan Today
        </button>
      </div>

      {/* Global Add / Edit Insurance Modal */}
      <AddEditInsuranceModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingPlan(null);
        }}
        initialPlan={editingPlan}
        onSave={handleSavePlan}
      />
    </div>
  );
};
