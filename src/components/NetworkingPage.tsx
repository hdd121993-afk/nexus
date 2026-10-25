import React, { useState } from 'react';
import {
  Users,
  Award,
  Sparkles,
  TrendingUp,
  DollarSign,
  Car,
  Plane,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Send,
  Building2,
  Gift
} from 'lucide-react';
import { NetworkTier } from '../types';

interface NetworkingPageProps {
  tiers: NetworkTier[];
  onOpenContact: () => void;
  onOpenLogin: () => void;
}

export const NetworkingPage: React.FC<NetworkingPageProps> = ({
  tiers,
  onOpenContact,
  onOpenLogin,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    experience: 'Beginner',
    preferredVertical: 'All (Multi-Asset)',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 rounded-3xl p-8 sm:p-12 text-white border border-purple-900/60 shadow-xl relative overflow-hidden">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-semibold mb-4 border border-purple-500/30">
            <Users className="w-3.5 h-3.5" />
            <span>Multi-Tier High Yield Mentorship Opportunity</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Build Lifetime Residual Income with NEXUS Network
          </h1>
          <p className="mt-3 text-slate-300 text-base leading-relaxed">
            Expand your financial horizon by building an autonomous team of associates. Earn multi-level overrides across prime Real Estate closures, recurring Insurance policy renewals, and Direct Selling consumer repeat orders.
          </p>

          <div className="mt-6 flex flex-wrap gap-4">
            <button
              onClick={() => {
                const el = document.getElementById('join-form');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-6 py-3 rounded-xl bg-purple-500 hover:bg-purple-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-purple-500/20"
            >
              Apply for Partnership
            </button>
            <button
              onClick={onOpenLogin}
              className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-purple-300 font-semibold text-xs transition-colors border border-purple-500/30"
            >
              Existing Member? View Dashboard
            </button>
          </div>
        </div>
      </div>

      {/* 4 Earning Streams */}
      <div>
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="text-xs font-bold uppercase tracking-widest text-purple-600 mb-1">
            Revenue Streams
          </h2>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            How NEXUS Partners Earn
          </h3>
          <p className="text-sm text-slate-600 mt-2">
            Unlike single-product networks, our associates access high-ticket real estate and recurring insurance pipelines.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold mb-4">
              <Building2 className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-base text-slate-900">Real Estate Commissions</h4>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Earn 3% to 6% on multi-hundred-thousand dollar developer sales, paid out incrementally as client installment contracts mature.
            </p>
            <div className="mt-4 text-xs font-bold text-amber-600">Up to ₱500,000+ per unit</div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-base text-slate-900">Recurring Insurance Renewals</h4>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Earn 35% on first-year premiums and up to 10% annual recurring trail commissions for up to 5 consecutive policy years.
            </p>
            <div className="mt-4 text-xs font-bold text-emerald-600">Compounding monthly annuity</div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-cyan-100 text-cyan-700 flex items-center justify-center font-bold mb-4">
              <DollarSign className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-base text-slate-900">Retail & Wholesale Margins</h4>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Immediate 40% retail markup profit on direct consumer wellness orders, plus personal volume points convertible to bonuses.
            </p>
            <div className="mt-4 text-xs font-bold text-cyan-600">Immediate cash liquidity</div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold mb-4">
              <Users className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-base text-slate-900">Team Overrides & Pools</h4>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Receive 3% to 10% team overrides down to 5 generations, plus executive car subsidies and global profit sharing pools.
            </p>
            <div className="mt-4 text-xs font-bold text-purple-600">True geometric leverage</div>
          </div>
        </div>
      </div>

      {/* Rank Ladder Progression */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="text-xs font-bold uppercase tracking-widest text-purple-600 mb-1">
            Career Advancement
          </h2>
          <h3 className="text-2xl font-extrabold text-slate-900">
            NEXUS Leadership Rank Matrix
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Predictable qualifications and unmatched executive lifestyle rewards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tiers.map((tier, idx) => (
            <div
              key={tier.rank}
              className="p-6 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-purple-300 hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${tier.badgeColor}`}>
                    Tier {idx + 1}
                  </span>
                  <Award className="w-4 h-4 text-purple-600" />
                </div>

                <h4 className="text-lg font-bold text-slate-900">{tier.rank}</h4>
                <p className="text-xs text-slate-500">{tier.title}</p>

                <div className="mt-4 p-3 bg-white rounded-xl border border-slate-200 text-xs space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Personal Vol (PV):</span>
                    <span className="font-bold text-slate-900">{tier.personalVolumeRequired} PV</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Group Vol (GV):</span>
                    <span className="font-bold text-purple-600">{tier.groupVolumeRequired} GV</span>
                  </div>
                </div>

                <div className="mt-4 space-y-2 text-xs">
                  <div className="p-2 rounded-lg bg-purple-50 text-purple-900 font-medium">
                    <span className="font-bold">Direct Bonus:</span> {tier.directBonusRate}
                  </div>
                  <div className="p-2 rounded-lg bg-indigo-50 text-indigo-900 font-medium">
                    <span className="font-bold">Team Override:</span> {tier.teamOverrideRate}
                  </div>
                  <div className="p-2 rounded-lg bg-amber-50 text-amber-900 font-medium">
                    <span className="font-bold">Pool Share:</span> {tier.leadershipPoolShare}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200">
                  <p className="text-[11px] font-bold text-slate-700 uppercase mb-1.5">Key Perks:</p>
                  <ul className="space-y-1 text-xs text-slate-600">
                    {tier.exclusivePerks.map((perk, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Application Form */}
      <div id="join-form" className="bg-gradient-to-br from-slate-900 to-purple-950 rounded-3xl p-8 sm:p-12 text-white border border-purple-800 shadow-xl">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-xs font-bold text-purple-300 uppercase tracking-widest">
              Join Our Global Guild
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold mt-1">
              Apply to Become an NEXUS Partner
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-2">
              Receive access to accredited licenses, turnkey client installment contracts, CRM software, and mentorship.
            </p>
          </div>

          {submitted ? (
            <div className="p-6 rounded-2xl bg-purple-900/60 border border-purple-500 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <h4 className="text-lg font-bold text-white">Application Received!</h4>
              <p className="text-xs text-purple-200 leading-relaxed">
                Thank you, {formData.name}. A Regional Managing Partner in your area will contact you within 24 hours to schedule your onboarding orientation and provide your Member Portal credentials.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-3 px-4 py-2 bg-purple-500 text-slate-950 font-bold text-xs rounded-xl"
              >
                Submit Another Application
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Full Legal Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. David Miller"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-purple-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="david@example.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-purple-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Phone / WhatsApp</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-purple-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">City / Country</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="e.g. Chicago, USA"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-purple-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Sales Experience</label>
                  <select
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-purple-400 focus:outline-none"
                  >
                    <option value="Beginner">New to Sales & Mentorship</option>
                    <option value="Intermediate">1-3 Years Direct Sales / Brokerage</option>
                    <option value="Advanced">Experienced Team Leader / Broker</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Primary Interest</label>
                  <select
                    value={formData.preferredVertical}
                    onChange={(e) => setFormData({ ...formData, preferredVertical: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-purple-400 focus:outline-none"
                  >
                    <option value="All (Multi-Asset)">All Verticals (Diversified Guild)</option>
                    <option value="Real Estate">Real Estate In-House Sales</option>
                    <option value="Insurance">Insurance & VUL Wealth Planning</option>
                    <option value="Direct Selling">Direct Consumer Wellness</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-4 py-3.5 rounded-xl bg-purple-500 hover:bg-purple-400 text-slate-950 font-extrabold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-purple-500/30"
              >
                <Send className="w-4 h-4" />
                <span>Submit Partnership Application</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
