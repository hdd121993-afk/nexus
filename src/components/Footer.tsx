import React from 'react';
import { Building2, ShieldCheck, ShoppingBag, Users, PhoneCall, Mail, MapPin, Lock, FileText } from 'lucide-react';

interface FooterProps {
  onNavigateTab: (tab: string) => void;
  onOpenLogin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateTab, onOpenLogin }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand & Corporate Overview */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-500 to-indigo-500 p-0.5">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center font-extrabold text-cyan-400">
                  NX
                </div>
              </div>
              <div>
                <span className="font-extrabold text-lg text-white tracking-tight">NEXUS</span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 ml-2 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  Group
                </span>
                <p className="text-[11px] text-slate-400">Enterprise Multi-Asset Platform</p>
              </div>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              NEXUS integrates accredited Real Estate developments, licensed trust-fund protected prepaid memorial life plans, high-grade direct consumer commerce, and a multi-tiered mentoring network with in-house installment financing.
            </p>

            <div className="flex flex-col gap-1.5 text-[11px] text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>NEXUS Pinnacle Tower, 18th Fl, Financial District</span>
              </div>
              <div className="flex items-center gap-2">
                <PhoneCall className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Customer Care: +1 (800) 492-NEXUS (6398)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>concierge@nexus.com</span>
              </div>
            </div>
          </div>

          {/* Column 2: Opportunities & Verticals */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">
              Business Verticals
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigateTab('real_estate')}
                  className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"
                >
                  <Building2 className="w-3.5 h-3.5 text-slate-500" />
                  <span>Real Estate Listings</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('insurance')}
                  className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-slate-500" />
                  <span>Prepaid Life Plans</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('direct_selling')}
                  className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"
                >
                  <ShoppingBag className="w-3.5 h-3.5 text-slate-500" />
                  <span>Direct Selling Store</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('networking')}
                  className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"
                >
                  <Users className="w-3.5 h-3.5 text-slate-500" />
                  <span>Networking Compensation</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Member Tools */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">
              Member & Admin Portal
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={onOpenLogin}
                  className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 text-cyan-300 font-semibold"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Portal Sign In (Admin & Members)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenLogin}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Track Client Installments
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenLogin}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Commission Ledger & Wallet
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenLogin}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Admin Inventory & Listings
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Compliance & Regulatory */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">
              Regulatory Disclosures
            </h4>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              NEXUS Real Estate is accredited under Developer License #NX-90114. All insurance products are underwritten by rated life reinsurance syndicates. Installment contracts adhere strictly to federal disclosure and consumer protection guidelines.
            </p>
            <div className="pt-2 flex items-center gap-2 text-[10px] text-emerald-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>SEC Registered & Licensed Escrow</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} NEXUS Holdings Inc. All rights reserved.</p>
          <div className="flex gap-4">
            <span className="hover:text-slate-400 cursor-pointer">Terms of Installment Agreement</span>
            <span className="hover:text-slate-400 cursor-pointer">Privacy & Data Shield</span>
            <span className="hover:text-slate-400 cursor-pointer">Affiliate Transparency Disclosure</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
