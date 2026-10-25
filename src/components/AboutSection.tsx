import React from 'react';
import {
  Building2,
  ShieldCheck,
  ShoppingBag,
  Users,
  Award,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  BarChart,
  Lock,
  Globe2,
  CreditCard,
  Briefcase,
  Crown
} from 'lucide-react';

interface AboutSectionProps {
  onNavigateTab: (tab: string) => void;
  onOpenLogin: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onNavigateTab, onOpenLogin }) => {
  return (
    <div className="space-y-16 pb-16">
      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-900 text-white pt-12 pb-24 border-b border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(6,182,212,0.15),rgba(255,255,255,0))] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>NEXUS Global Enterprise & Multi-Asset Holding</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15]">
              Empowering Financial Growth Through{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-300">
                Tangible Assets & Opportunity.
              </span>
            </h1>
            
            <p className="mt-6 text-lg sm:text-xl text-slate-300 leading-relaxed">
              NEXUS connects discerning clients and entrepreneurial associates with prime real estate developments, licensed prepaid memorial life plans, world-class consumer wellness goods, and a high-yield networking ecosystem with flexible installment plans.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onNavigateTab('real_estate')}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm shadow-xl shadow-cyan-500/20 transition-all flex items-center gap-2"
              >
                <span>Explore Property Listings</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenLogin}
                className="px-6 py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-white font-semibold text-sm transition-all flex items-center gap-2"
              >
                <Briefcase className="w-4 h-4 text-cyan-400" />
                <span>Member Portal & Earnings</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 border-t border-slate-800/80 pt-10">
            <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-800">
              <p className="text-3xl font-extrabold text-cyan-400">₱75B+</p>
              <p className="text-xs text-slate-400 mt-1 uppercase font-medium">Real Estate Assets Managed</p>
            </div>
            <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-800">
              <p className="text-3xl font-extrabold text-emerald-400">42,000+</p>
              <p className="text-xs text-slate-400 mt-1 uppercase font-medium">Active Policyholders Protected</p>
            </div>
            <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-800">
              <p className="text-3xl font-extrabold text-blue-400">18,500+</p>
              <p className="text-xs text-slate-400 mt-1 uppercase font-medium">Global Network Associates</p>
            </div>
            <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-800">
              <p className="text-3xl font-extrabold text-amber-400">0% Interest</p>
              <p className="text-xs text-slate-400 mt-1 uppercase font-medium">Direct Installment Schemes</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Pillars Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-xs font-bold uppercase tracking-widest text-cyan-600 mb-2">The NEXUS Ecosystem</h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            Four Strategic Avenues for Wealth & Security
          </h3>
          <p className="mt-3 text-slate-600 text-base">
            Whether you are investing as a private client or building lifetime recurring cash flow as an associate, our integrated verticals provide unprecedented stability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Pillar 1: Real Estate */}
          <div
            onClick={() => onNavigateTab('real_estate')}
            className="group cursor-pointer bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-cyan-400 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center mb-5 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-colors">
                <Building2 className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-cyan-600 uppercase tracking-wider">Prime Listings</span>
              <h4 className="text-xl font-bold text-slate-900 mt-1 group-hover:text-cyan-600 transition-colors">
                Real Estate Portfolio
              </h4>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                Pre-selling condominiums, luxury hillside villas, commercial retail strips, and titled lots with flexible in-house installment amortization.
              </p>
              <ul className="mt-4 space-y-1.5 text-xs text-slate-500">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>24-48 Months Zero/Low Interest Terms</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Verified Titles & Admin-Curated Inventory</span>
                </li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-cyan-600">
              <span>View Available Listings</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Pillar 2: Insurance */}
          <div
            onClick={() => onNavigateTab('insurance')}
            className="group cursor-pointer bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-emerald-400 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">Memorial & Life Plans</span>
              <h4 className="text-xl font-bold text-slate-900 mt-1 group-hover:text-amber-600 transition-colors">
                Prepaid Life Plans
              </h4>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                Quality prepaid memorial plans trusted by millions of Filipinos. Planning ahead is an act of love with licensed, trust-fund protected life plans.
              </p>
              <ul className="mt-4 space-y-1.5 text-xs text-slate-500">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-500" />
                  <span>100% Transferable & Assignable to Anyone</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-500" />
                  <span>Zero-Inflation 5-Year Installment Terms</span>
                </li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-amber-600">
              <span>View Memorial Life Plans</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Pillar 3: Direct Selling */}
          <div
            onClick={() => onNavigateTab('direct_selling')}
            className="group cursor-pointer bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-blue-400 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Consumer Goods</span>
              <h4 className="text-xl font-bold text-slate-900 mt-1 group-hover:text-blue-600 transition-colors">
                Direct Selling Store
              </h4>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                High-margin wellness supplements, clinical skin nutrition, and eco-filtration systems with up to 40% retail markup and starter bundle terms.
              </p>
              <ul className="mt-4 space-y-1.5 text-xs text-slate-500">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Wholesale member pricing discount</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Admin-verified lab-tested products</span>
                </li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600">
              <span>View Product Catalog</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Pillar 4: Networking */}
          <div
            onClick={() => onNavigateTab('networking')}
            className="group cursor-pointer bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-purple-400 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-5 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                <Users className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-purple-600 uppercase tracking-wider">Multi-Tier Mentorship</span>
              <h4 className="text-xl font-bold text-slate-900 mt-1 group-hover:text-purple-600 transition-colors">
                Networking Program
              </h4>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                Lucrative multi-level commission matrix, leadership overrides, luxury car allowances, and profit-sharing pools for aspiring leaders.
              </p>
              <ul className="mt-4 space-y-1.5 text-xs text-slate-500">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Direct referral up to 30%</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Global Diamond leadership pool</span>
                </li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-purple-600">
              <span>Explore Compensation Plan</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </section>

      {/* Member Portal Banner Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 p-8 sm:p-12 text-white border border-slate-700 shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.2),transparent_70%)] pointer-events-none" />

          <div className="max-w-2xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold mb-4 border border-emerald-500/30">
              <CreditCard className="w-3.5 h-3.5" />
              <span>For Registered Partners & Administrators</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              NEXUS Member & Administrator Portal
            </h3>

            <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
              Are you an active NEXUS Associate or Partner? Log in to view real-time commission earnings, downline overrides, and monitor client installment payments. Administrators gain exclusive controls to publish and maintain official real estate listings and commercial products.
            </p>

            <div className="mt-6 flex flex-wrap gap-4 items-center">
              <button
                onClick={onOpenLogin}
                className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-cyan-500/25 flex items-center gap-2"
              >
                <Briefcase className="w-4 h-4" />
                <span>Launch Portal</span>
              </button>

              <div className="text-xs text-slate-400 flex items-center gap-2">
                <Lock className="w-3.5 h-3.5 text-cyan-400" />
                <span>Includes Admin & Member quick demo switchers</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Heritage & Governance */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-600">Company Overview</span>
            <h3 className="text-3xl font-extrabold text-slate-900 mt-2">
              NEXUS: Built on Trust, Regulation, and Proven Financial Systems
            </h3>
            <p className="mt-4 text-slate-600 text-base leading-relaxed">
              Founded in 2011, NEXUS has evolved from a boutique property agency into a premier conglomerate offering high-yield diversified asset channels.
            </p>
            <p className="mt-3 text-slate-600 text-base leading-relaxed">
              We eliminate intermediaries by directly facilitating in-house installment contracts for buyers while providing our distributed salesforce with real-time transparent commission auditing and client payment tracking.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="font-bold text-slate-900 text-sm">Regulatory Compliance</div>
                <div className="text-xs text-slate-500 mt-1">Licensed by Real Estate Board & National Insurance Commission</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="font-bold text-slate-900 text-sm">Automated Auditing</div>
                <div className="text-xs text-slate-500 mt-1">Guaranteed prompt commission distribution on the 5th and 20th of every month</div>
              </div>
            </div>
          </div>

          <div className="bg-slate-100 rounded-3xl p-8 border border-slate-200 shadow-inner">
            <h4 className="text-lg font-bold text-slate-900 mb-4">Our Institutional Commitments</h4>
            <div className="space-y-4">
              {[
                { title: 'Customer-First Flexible Terms', desc: 'Customizable 12 to 60-month installment arrangements adapted to each client cash-flow.' },
                { title: 'Strict Administrator Governance', desc: 'Official property listings and retail inventory are vetted and entered exclusively by authorized administrators.' },
                { title: 'Transparent Agent Accounting', desc: 'Every collected installment automatically generates receipt logs and accrues agent commission.' },
                { title: 'Capital Preservation First', desc: 'Real estate backed by clean prime titles; insurance reinsured by top global syndicates.' },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                    ✓
                  </div>
                  <div>
                    <h5 className="font-bold text-sm text-slate-900">{item.title}</h5>
                    <p className="text-xs text-slate-600 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
