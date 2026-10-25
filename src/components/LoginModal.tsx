import React, { useState } from 'react';
import { X, LogIn, Lock, Sparkles, Shield, User, ArrowRight, Crown, UserPlus, Package, KeyRound } from 'lucide-react';
import { MemberProfile } from '../types';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  allMembers: MemberProfile[];
  onSelectMember: (member: MemberProfile) => void;
  onOpenAddMember?: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  allMembers,
  onSelectMember,
  onOpenAddMember,
}) => {
  const [agentId, setAgentId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleCustomLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!agentId.trim()) {
      setError('Please enter your Agent Code or Email.');
      return;
    }

    const found = allMembers.find(
      (m) =>
        m.agentCode.toLowerCase() === agentId.trim().toLowerCase() ||
        m.email.toLowerCase() === agentId.trim().toLowerCase()
    );

    if (!found) {
      setError('Account not found. Please check your Agent Code / Email or register a new member account.');
      return;
    }

    // Check password if configured
    if (found.password && password && found.password !== password) {
      setError(`Incorrect password for ${found.name}. (Hint: registered password is "${found.password}")`);
      return;
    }

    onSelectMember(found);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-md w-full border border-slate-200 shadow-2xl overflow-hidden my-8 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="p-6 bg-slate-900 text-white relative shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-500 to-indigo-500 p-0.5">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center font-extrabold text-cyan-400">
                NX
              </div>
            </div>
            <div>
              <h2 className="text-lg font-bold">NEXUS Portal Login</h2>
              <p className="text-xs text-slate-400">Administrator & Member Agent Authentication</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-1.5 rounded-full bg-slate-800 text-slate-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto flex-1">
          {/* Enroll New Member Fast Action - Admin Protected */}
          {onOpenAddMember && (
            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-purple-900/10 via-indigo-900/10 to-cyan-900/10 border border-purple-200 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center shrink-0">
                  <UserPlus className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <span>Admin Member Onboarding</span>
                    <span className="text-[9px] bg-purple-100 text-purple-800 font-extrabold px-1.5 py-0.2 rounded border border-purple-200">
                      ADMIN ONLY
                    </span>
                  </span>
                  <span className="text-[10px] text-slate-500 block">Only Admins can enroll members & assign packages</span>
                </div>
              </div>
              <button
                onClick={() => {
                  onClose();
                  onOpenAddMember();
                }}
                className="px-3.5 py-2 rounded-xl bg-purple-700 hover:bg-purple-600 text-white font-bold text-xs shrink-0 transition-colors shadow-sm"
              >
                + Add Member
              </button>
            </div>
          )}

          {/* Quick 1-Click Demo Profiles */}
          <div>
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-cyan-600 mb-2.5">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-cyan-500" />
                <span>Active Accounts ({allMembers.length}):</span>
              </span>
              <span className="text-[10px] text-slate-400 font-normal lowercase">click to test role</span>
            </div>

            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
              {allMembers.map((member) => (
                <button
                  key={member.id}
                  onClick={() => {
                    onSelectMember(member);
                    onClose();
                  }}
                  className={`w-full p-2.5 rounded-2xl border text-left transition-all flex items-center justify-between group ${
                    member.isAdmin
                      ? 'border-purple-300 bg-purple-50/60 hover:bg-purple-100/70 hover:border-purple-400 ring-1 ring-purple-400/30'
                      : 'border-slate-200 hover:border-cyan-400 hover:bg-cyan-50/40'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className={`w-9 h-9 rounded-xl object-cover border shrink-0 ${
                        member.isAdmin ? 'border-purple-400 ring-2 ring-purple-300' : 'border-cyan-300'
                      }`}
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-xs font-bold text-slate-900 group-hover:text-cyan-700 truncate">
                          {member.name}
                        </span>
                        {member.isAdmin ? (
                          <span className="text-[9px] font-extrabold px-1.5 py-0.2 rounded bg-purple-600 text-white flex items-center gap-0.5">
                            <Crown className="w-2.5 h-2.5 text-amber-300" />
                            <span>ADMIN</span>
                          </span>
                        ) : (
                          <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-cyan-100 text-cyan-800">
                            {member.rank}
                          </span>
                        )}
                        {member.packageName && (
                          <span className="text-[9px] font-semibold px-1.5 py-0.2 rounded bg-slate-100 text-slate-700">
                            {member.packageName.split(' ')[0]}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                        <span className="font-mono text-cyan-700 font-semibold">{member.agentCode}</span>
                        <span>•</span>
                        <span>PW: <strong className="text-slate-700 font-mono">{member.password || 'admin'}</strong></span>
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-600 group-hover:translate-x-1 transition-all shrink-0 ml-1" />
                </button>
              ))}
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-slate-200 w-full" />
            <span className="bg-white px-3 text-xs text-slate-400 uppercase font-semibold">
              Or Sign In with Credentials
            </span>
          </div>

          {/* Standard Login Form */}
          <form onSubmit={handleCustomLogin} className="space-y-3.5">
            {error && (
              <p className="p-2.5 rounded-lg bg-red-50 text-red-700 text-xs font-medium leading-relaxed">
                {error}
              </p>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Agent / Admin Code or Registered Email
              </label>
              <input
                type="text"
                placeholder="e.g. NX-ADMIN01 or maria.santos@gmail.com"
                value={agentId}
                onChange={(e) => setAgentId(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-cyan-500 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-mono focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-400 font-extrabold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-md"
            >
              <LogIn className="w-4 h-4" />
              <span>Log Into NEXUS Portal</span>
            </button>
          </form>

          <p className="text-[11px] text-center text-slate-400">
            Need administrator credentials or agency authorization? Contact{' '}
            <span className="font-semibold text-slate-600">admin-support@nexus.com</span>
          </p>
        </div>
      </div>
    </div>
  );
};

