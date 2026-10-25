import React from 'react';
import {
  Building2,
  ShieldCheck,
  ShoppingBag,
  Users,
  DollarSign,
  LogIn,
  LogOut,
  ChevronDown,
  Layers,
  PhoneCall,
  Menu,
  X,
  CreditCard,
  Briefcase,
  ShieldAlert,
  Crown,
  UserPlus
} from 'lucide-react';
import { MemberProfile } from '../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentUser: MemberProfile | null;
  onOpenLogin: () => void;
  onLogout: () => void;
  onOpenContact: () => void;
  onOpenAddMember?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  currentUser,
  onOpenLogin,
  onLogout,
  onOpenContact,
  onOpenAddMember,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const navLinks = [
    { id: 'about', label: 'About NEXUS', icon: Building2 },
    { id: 'real_estate', label: 'Real Estate', icon: Building2, tag: 'Listings' },
    { id: 'insurance', label: 'Life Plans', icon: ShieldCheck, tag: 'Memorial' },
    { id: 'direct_selling', label: 'Direct Selling', icon: ShoppingBag, tag: 'Products' },
    { id: 'networking', label: 'Networking', icon: Users, tag: 'Opportunity' },
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    setDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Corporate Identity */}
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => handleNavClick('about')}
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-500 to-indigo-500 p-0.5 shadow-md shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <span className="font-extrabold text-xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-200">
                  NX
                </span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white group-hover:text-cyan-400 transition-colors">
                  NEXUS
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  Group
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Real Estate • Prepaid Life Plans • Direct Commerce • Network
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative ${
                    isActive
                      ? 'text-cyan-400 bg-slate-800/80 shadow-inner'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                  <span>{link.label}</span>
                  {link.tag && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded font-semibold ${
                        isActive
                          ? 'bg-cyan-400/20 text-cyan-300'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {link.tag}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action: Member Portal / Login / Admin Console */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onOpenContact}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5 text-cyan-400" />
              <span>Contact</span>
            </button>

            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className={`flex items-center gap-3 px-3 py-1.5 rounded-xl border transition-all ${
                    currentUser.isAdmin
                      ? 'bg-purple-950/60 border-purple-500/50 text-white hover:border-purple-400 shadow-sm'
                      : activeTab === 'portal'
                      ? 'bg-cyan-500/10 border-cyan-500/50 text-cyan-300'
                      : 'bg-slate-800/90 border-slate-700 text-white hover:border-slate-600'
                  }`}
                >
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-8 h-8 rounded-full object-cover border border-cyan-400/50"
                  />
                  <div className="text-left">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold truncate max-w-[110px]">
                        {currentUser.name}
                      </span>
                      {currentUser.isAdmin ? (
                        <span className="text-[10px] px-1.5 py-0.2 bg-purple-500/30 text-purple-300 rounded font-bold border border-purple-400/40 flex items-center gap-0.5">
                          <Crown className="w-2.5 h-2.5 text-amber-300" />
                          <span>Admin</span>
                        </span>
                      ) : (
                        <span className="text-[10px] px-1.5 py-0.2 bg-cyan-400/20 text-cyan-300 rounded font-semibold">
                          {currentUser.rank}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-emerald-400 font-medium">
                      Wallet: ₱{currentUser.walletBalance.toLocaleString()}
                    </p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-slate-400 ml-1" />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl py-2 z-50 text-slate-200 divide-y divide-slate-800 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-4 py-2.5">
                      <p className="text-xs text-slate-400">
                        {currentUser.isAdmin ? 'Signed in as System Administrator' : 'Signed in as Member Agent'}
                      </p>
                      <p className="text-sm font-bold text-white">{currentUser.name}</p>
                      <p className="text-xs text-cyan-400 font-mono">ID: {currentUser.agentCode}</p>
                      {currentUser.isAdmin && (
                        <p className="text-[11px] text-amber-300 font-semibold mt-1">
                          ★ Exclusive privilege: Add/Edit listings & products
                        </p>
                      )}
                    </div>

                    <div className="py-1">
                      <button
                        onClick={() => handleNavClick('portal')}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-semibold hover:bg-slate-800 text-left text-white"
                      >
                        <Layers className="w-4 h-4 text-cyan-400" />
                        <span>Member Dashboard & Earnings</span>
                      </button>
                      <button
                        onClick={() => {
                          handleNavClick('portal');
                        }}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-semibold hover:bg-slate-800 text-left text-emerald-400"
                      >
                        <CreditCard className="w-4 h-4 text-emerald-400" />
                        <span>Client Installment Tracker</span>
                      </button>
                      {onOpenAddMember && currentUser.isAdmin && (
                        <button
                          onClick={() => {
                            setDropdownOpen(false);
                            onOpenAddMember();
                          }}
                          className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-semibold hover:bg-purple-900/30 text-left text-purple-300"
                        >
                          <UserPlus className="w-4 h-4 text-purple-400" />
                          <span>+ Onboard / Add Member (Admin)</span>
                        </button>
                      )}
                      {currentUser.isAdmin && (
                        <button
                          onClick={() => {
                            handleNavClick('portal');
                          }}
                          className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-semibold hover:bg-purple-900/40 text-left text-purple-300"
                        >
                          <Crown className="w-4 h-4 text-amber-400" />
                          <span>Admin Listings & Products Console</span>
                        </button>
                      )}
                    </div>

                    <div className="py-1">
                      <button
                        onClick={() => {
                          setDropdownOpen(false);
                          onLogout();
                        }}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-semibold hover:bg-red-500/10 text-red-400 text-left"
                      >
                        <LogOut className="w-4 h-4 text-red-400" />
                        <span>Log Out to Customer View</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onOpenLogin}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <LogIn className="w-4 h-4 text-slate-950 stroke-[2.5]" />
                <span>Member / Admin Login</span>
              </button>
            )}
          </div>

          {/* Mobile hamburger button */}
          <div className="flex items-center gap-2 lg:hidden">
            {!currentUser && (
              <button
                onClick={onOpenLogin}
                className="px-3 py-1.5 rounded-lg bg-cyan-500 text-slate-950 text-xs font-bold"
              >
                Login
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950 border-b border-slate-800 px-4 pt-2 pb-6 space-y-2">
          {currentUser && (
            <div className="p-3 mb-3 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-10 h-10 rounded-full border border-cyan-400"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="text-sm font-bold text-white">{currentUser.name}</p>
                    {currentUser.isAdmin && (
                      <span className="text-[9px] px-1 rounded bg-purple-500 text-white font-bold">Admin</span>
                    )}
                  </div>
                  <p className="text-xs text-cyan-400">{currentUser.rank} • {currentUser.agentCode}</p>
                  <p className="text-xs text-emerald-400 font-semibold">
                    Wallet: ₱{currentUser.walletBalance.toLocaleString()}
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  onLogout();
                  setMobileMenuOpen(false);
                }}
                className="text-xs text-red-400 hover:text-red-300"
              >
                Log Out
              </button>
            </div>
          )}

          {currentUser && (
            <button
              onClick={() => handleNavClick('portal')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold ${
                activeTab === 'portal'
                  ? 'bg-cyan-500 text-slate-950'
                  : 'bg-slate-900 text-cyan-400 border border-cyan-500/30'
              }`}
            >
              <Briefcase className="w-5 h-5" />
              <span>
                {currentUser.isAdmin ? 'Admin Console & Client Tracker' : 'Go to Member Dashboard'}
              </span>
            </button>
          )}

          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium ${
                  isActive
                    ? 'bg-slate-800 text-cyan-400'
                    : 'text-slate-300 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5" />
                  <span>{link.label}</span>
                </div>
                {link.tag && (
                  <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                    {link.tag}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-2 border-t border-slate-800 flex gap-2">
            <button
              onClick={() => {
                onOpenContact();
                setMobileMenuOpen(false);
              }}
              className="flex-1 py-2.5 rounded-xl bg-slate-800 text-white text-xs font-semibold flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-cyan-400" />
              <span>Contact NEXUS</span>
            </button>
            {!currentUser && (
              <button
                onClick={() => {
                  onOpenLogin();
                  setMobileMenuOpen(false);
                }}
                className="flex-1 py-2.5 rounded-xl bg-cyan-500 text-slate-950 text-xs font-bold flex items-center justify-center gap-2"
              >
                <LogIn className="w-4 h-4" />
                <span>Portal Login</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
