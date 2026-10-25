import React, { useState } from 'react';
import {
  X,
  UserPlus,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Mail,
  Phone,
  User,
  Sparkles,
  Crown,
  Copy,
  ArrowRight,
  Eye,
  EyeOff,
  Package,
  CreditCard,
  Building2,
  Award
} from 'lucide-react';
import { MemberProfile, MembershipPackage } from '../types';
import { MEMBERSHIP_PACKAGES } from '../data/mockData';

interface AddMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddMember: (newMember: MemberProfile, switchImmediately?: boolean) => void;
  currentUser: MemberProfile | null;
  allMembers: MemberProfile[];
}

export const AddMemberModal: React.FC<AddMemberModalProps> = ({
  isOpen,
  onClose,
  onAddMember,
  currentUser,
  allMembers,
}) => {
  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('+63 9');
  const [password, setPassword] = useState('nexus123');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedPackageId, setSelectedPackageId] = useState<string>('pkg-silver');
  const [paymentType, setPaymentType] = useState<'Paid in Full' | 'Installment Plan'>('Paid in Full');
  const [isAdminRole, setIsAdminRole] = useState(false);
  const [customAgentCode, setCustomAgentCode] = useState(
    () => `NX-${Math.floor(10000 + Math.random() * 90000)}`
  );
  const [sponsorCode, setSponsorCode] = useState(
    currentUser ? currentUser.agentCode : 'NX-ADMIN01'
  );
  const [initialWallet, setInitialWallet] = useState<number>(0);

  // Success view state
  const [createdMember, setCreatedMember] = useState<MemberProfile | null>(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Enforce admin-only permission: regular members cannot add another member
  if (currentUser && !currentUser.isAdmin) {
    return (
      <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-md flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl max-w-md w-full p-6 text-center space-y-4 border border-slate-200 shadow-2xl">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-600 mx-auto flex items-center justify-center">
            <Lock className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Administrator Authorization Required</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Security Rule: Associates and regular members are not authorized to enroll other members. Only System Administrators have the authority to provision member accounts, issue credentials, and allocate business packages.
          </p>
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs"
          >
            Acknowledge & Close
          </button>
        </div>
      </div>
    );
  }

  const selectedPkg =
    MEMBERSHIP_PACKAGES.find((p) => p.id === selectedPackageId) || MEMBERSHIP_PACKAGES[1];

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim()) {
      alert('Please fill in member full name and email.');
      return;
    }

    // Default avatars matching gender/name
    const avatarList = [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    ];
    const chosenAvatar = avatarList[Math.floor(Math.random() * avatarList.length)];

    const sponsorObj = allMembers.find((m) => m.agentCode.toLowerCase() === sponsorCode.toLowerCase());
    const sponsorName = sponsorObj ? sponsorObj.name : (currentUser?.name || 'Alexander Cole');

    const newMember: MemberProfile = {
      id: `mem-${Date.now()}`,
      name: name.trim(),
      role: isAdminRole ? 'Administrator & Guild Director' : selectedPkg.role,
      rank: isAdminRole ? 'System Administrator' : selectedPkg.initialRank,
      agentCode: customAgentCode.trim() || `NX-${Math.floor(10000 + Math.random() * 90000)}`,
      email: email.trim(),
      phone: phone.trim(),
      password: password.trim() || 'nexus123',
      avatar: chosenAvatar,
      joinedDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      totalEarnings: 0,
      thisMonthEarnings: 0,
      pendingPayout: 0,
      walletBalance: initialWallet,
      realEstateCommissions: 0,
      insuranceCommissions: 0,
      directSellingMargins: 0,
      networkingBonuses: 0,
      activeClientsCount: 0,
      teamSize: 0,
      isAdmin: isAdminRole,
      packageId: selectedPkg.id,
      packageName: selectedPkg.name,
      packagePrice: selectedPkg.price,
      paymentType: paymentType,
      sponsorName: sponsorName,
      sponsorAgentCode: sponsorCode,
    };

    onAddMember(newMember, false);
    setCreatedMember(newMember);
  };

  const handleCopyCredentials = () => {
    if (!createdMember) return;
    const text = `NEXUS Member Login Credentials:
Name: ${createdMember.name}
Agent Code / Login ID: ${createdMember.agentCode}
Email: ${createdMember.email}
Password: ${createdMember.password}
Package: ${createdMember.packageName} (${createdMember.paymentType})
Login URL: https://nexus.com/portal`;

    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setPhone('+63 9');
    setPassword('nexus123');
    setCustomAgentCode(`NX-${Math.floor(10000 + Math.random() * 90000)}`);
    setCreatedMember(null);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-3xl w-full border border-slate-200 shadow-2xl overflow-hidden my-6 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-cyan-500 p-0.5">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center font-extrabold text-cyan-400">
                <UserPlus className="w-5 h-5" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white">Add New NEXUS Member</h2>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  Onboarding & Credentials
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Enroll an associate, choose their membership package, and issue their personal login credentials.
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              handleReset();
              onClose();
            }}
            className="p-1.5 rounded-full bg-slate-800 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1">
          {createdMember ? (
            /* SUCCESS CONFIRMATION VIEW */
            <div className="space-y-6 text-center animate-in fade-in duration-200">
              <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h3 className="text-2xl font-extrabold text-slate-900">
                  Member Successfully Registered!
                </h3>
                <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                  {createdMember.name} has been enrolled in the <strong>{createdMember.packageName}</strong>.
                  Their account is active and ready for immediate login.
                </p>
              </div>

              {/* Login Credentials Card */}
              <div className="bg-slate-900 text-white p-6 rounded-3xl border border-slate-800 text-left max-w-lg mx-auto shadow-xl space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                    Official Login Credentials
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">
                    Status: <span className="text-emerald-400 font-bold">Active</span>
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Member Name</span>
                    <span className="font-bold text-white text-sm">{createdMember.name}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Enrolled Package</span>
                    <span className="font-bold text-amber-300">{createdMember.packageName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Agent Code (Login ID)</span>
                    <span className="font-mono font-extrabold text-cyan-400 text-sm">
                      {createdMember.agentCode}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Registered Email</span>
                    <span className="font-mono text-slate-200">{createdMember.email}</span>
                  </div>
                  <div className="col-span-2 bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">
                        Login Password
                      </span>
                      <span className="font-mono font-extrabold text-base text-emerald-400">
                        {createdMember.password}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400">
                      Can log in via Email or Agent Code
                    </span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={handleCopyCredentials}
                    className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold text-xs flex items-center justify-center gap-2 border border-slate-700 transition-colors"
                  >
                    {copied ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>Credentials Copied to Clipboard!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy Login Credentials for Member</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => {
                    onAddMember(createdMember, true); // true = switch to this new member
                    onClose();
                  }}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2"
                >
                  <ArrowRight className="w-4 h-4" />
                  <span>Log In Now as {createdMember.name}</span>
                </button>

                <button
                  onClick={() => {
                    handleReset();
                  }}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
                >
                  + Add Another Member
                </button>

                <button
                  onClick={() => {
                    handleReset();
                    onClose();
                  }}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl text-slate-500 hover:text-slate-800 text-xs font-semibold"
                >
                  Done & Close
                </button>
              </div>
            </div>
          ) : (
            /* MEMBER ONBOARDING FORM */
            <form onSubmit={handleCreate} className="space-y-6">
              {/* STEP 1: MEMBER PERSONAL DETAILS */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-700 text-xs font-extrabold flex items-center justify-center">
                    1
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                    Personal & Contact Information
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Full Legal Name *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Maria Clara Santos"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-purple-500 font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Email Address (Login Username) *
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="email"
                        required
                        placeholder="maria.santos@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-purple-500 font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Phone / Mobile Number *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="tel"
                        required
                        placeholder="+63 917 123 4567"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-purple-500 font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Assigned Agent Code (Login ID) *
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        required
                        value={customAgentCode}
                        onChange={(e) => setCustomAgentCode(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-mono font-bold text-slate-900 focus:ring-2 focus:ring-purple-500"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setCustomAgentCode(`NX-${Math.floor(10000 + Math.random() * 90000)}`)
                        }
                        className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-[11px] font-bold whitespace-nowrap"
                        title="Generate random code"
                      >
                        Regen
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* STEP 2: LOGIN CREDENTIALS & SECURITY */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-700 text-xs font-extrabold flex items-center justify-center">
                    2
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                    Account Login Security
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Set Password for Member Login *
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Choose a password"
                        className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-slate-200 text-xs font-mono focus:ring-2 focus:ring-purple-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">
                      Member will sign in using either their Agent Code or Email + this password.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Enrolling Sponsor / Mentor Code
                    </label>
                    <select
                      value={sponsorCode}
                      onChange={(e) => setSponsorCode(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:ring-2 focus:ring-purple-500"
                    >
                      {allMembers.map((m) => (
                        <option key={m.id} value={m.agentCode}>
                          {m.name} ({m.agentCode} - {m.rank})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Admin Privileges toggle */}
                {currentUser?.isAdmin && (
                  <div className="pt-2 border-t border-slate-200/80">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isAdminRole}
                        onChange={(e) => setIsAdminRole(e.target.checked)}
                        className="rounded text-purple-600 focus:ring-purple-500 w-4 h-4"
                      />
                      <div className="text-xs">
                        <span className="font-bold text-purple-900 flex items-center gap-1">
                          <Crown className="w-3.5 h-3.5 text-amber-500" />
                          <span>Grant System Administrator Authority</span>
                        </span>
                        <span className="text-[11px] text-slate-500 block">
                          Allows this member to enter and publish Real Estate listings and Direct Selling store products.
                        </span>
                      </div>
                    </label>
                  </div>
                )}
              </div>

              {/* STEP 3: MEMBERSHIP PACKAGE SELECTION (CORE REQUIREMENT) */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-700 text-xs font-extrabold flex items-center justify-center">
                      3
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                      Select Membership Package
                    </h3>
                  </div>
                  <span className="text-xs text-purple-700 font-semibold">
                    Assigned Package: <strong>{selectedPkg.name}</strong>
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {MEMBERSHIP_PACKAGES.map((pkg) => {
                    const isSelected = selectedPackageId === pkg.id;
                    return (
                      <div
                        key={pkg.id}
                        onClick={() => setSelectedPackageId(pkg.id)}
                        className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                          isSelected
                            ? 'border-purple-600 bg-purple-50/70 ring-2 ring-purple-500/20 shadow-md'
                            : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span
                              className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${pkg.badgeColor}`}
                            >
                              {pkg.initialRank}
                            </span>
                            {pkg.featured && (
                              <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                                Most Popular
                              </span>
                            )}
                          </div>

                          <h4 className="font-extrabold text-slate-900 text-sm">{pkg.name}</h4>
                          <p className="text-[11px] text-slate-500 mt-0.5">{pkg.tagline}</p>

                          <div className="mt-3 p-2.5 rounded-xl bg-slate-100/80 border border-slate-200/60 flex items-center justify-between">
                            <div>
                              <span className="text-[10px] text-slate-400 font-bold uppercase block">
                                One-Time Price
                              </span>
                              <span className="text-lg font-extrabold text-slate-900">
                                ₱{pkg.price.toLocaleString()}
                              </span>
                            </div>
                            <div className="text-right">
                              <span className="text-[10px] text-slate-400 font-bold uppercase block">
                                Volume Points
                              </span>
                              <span className="text-xs font-extrabold text-purple-700">
                                {pkg.pointsValue} PV
                              </span>
                            </div>
                          </div>

                          <div className="mt-2 text-[10px] text-cyan-700 font-medium">
                            {pkg.installmentOption}
                          </div>

                          <ul className="mt-3 space-y-1 text-[11px] text-slate-600">
                            {pkg.perks.slice(0, 3).map((perk, i) => (
                              <li key={i} className="flex items-start gap-1.5">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                                <span className="line-clamp-1">{perk}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between">
                          <span className="text-xs font-semibold text-slate-500">Select this tier</span>
                          <input
                            type="radio"
                            name="packageSelection"
                            checked={isSelected}
                            onChange={() => setSelectedPackageId(pkg.id)}
                            className="w-4 h-4 text-purple-600 accent-purple-600 cursor-pointer"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* STEP 4: PACKAGE PAYMENT SCHEME */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Package Payment Arrangement
                  </label>
                  <select
                    value={paymentType}
                    onChange={(e) => setPaymentType(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="Paid in Full">
                      Paid in Full (₱{selectedPkg.price.toLocaleString()} Cash / Wire / Card)
                    </option>
                    <option value="Installment Plan">
                      Installment Facility ({selectedPkg.installmentOption})
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Starting Wallet Credit / Sign-Up Voucher (₱)
                  </label>
                  <input
                    type="number"
                    min={0}
                    step={100}
                    value={initialWallet}
                    onChange={(e) => setInitialWallet(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-bold focus:ring-2 focus:ring-purple-500"
                  />
                  <span className="text-[10px] text-slate-400 mt-0.5 block">
                    Optional starter balance loaded into the new associate's wallet.
                  </span>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    handleReset();
                    onClose();
                  }}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-purple-600/20 transition-all flex items-center gap-2"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Onboard Member & Issue Login Credentials</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
