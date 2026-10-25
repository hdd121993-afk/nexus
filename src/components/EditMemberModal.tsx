import React, { useState, useEffect } from 'react';
import {
  X,
  UserCheck,
  ShieldCheck,
  Lock,
  Mail,
  Phone,
  Eye,
  EyeOff,
  Crown,
  Package,
  CheckCircle2,
  Wallet
} from 'lucide-react';
import { MemberProfile } from '../types';
import { MEMBERSHIP_PACKAGES } from '../data/mockData';

interface EditMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: MemberProfile | null;
  onSaveMember: (updated: MemberProfile) => void;
}

export const EditMemberModal: React.FC<EditMemberModalProps> = ({
  isOpen,
  onClose,
  member,
  onSaveMember,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [agentCode, setAgentCode] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState('');
  const [rank, setRank] = useState('');
  const [packageId, setPackageId] = useState('pkg-silver');
  const [paymentType, setPaymentType] = useState<'Paid in Full' | 'Installment Plan'>('Paid in Full');
  const [walletBalance, setWalletBalance] = useState<number>(0);
  const [isAdmin, setIsAdmin] = useState(false);
  const [sponsorName, setSponsorName] = useState('');
  const [sponsorAgentCode, setSponsorAgentCode] = useState('');

  useEffect(() => {
    if (member) {
      setName(member.name);
      setEmail(member.email);
      setPhone(member.phone);
      setAgentCode(member.agentCode);
      setPassword(member.password || 'nexus123');
      setRole(member.role);
      setRank(member.rank);
      setPackageId(member.packageId || 'pkg-silver');
      setPaymentType(member.paymentType || 'Paid in Full');
      setWalletBalance(member.walletBalance || 0);
      setIsAdmin(!!member.isAdmin);
      setSponsorName(member.sponsorName || '');
      setSponsorAgentCode(member.sponsorAgentCode || '');
    }
  }, [member, isOpen]);

  if (!isOpen || !member) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !agentCode.trim()) {
      alert('Please fill in Member Name, Email, and Agent Code.');
      return;
    }

    const selectedPkg = MEMBERSHIP_PACKAGES.find((p) => p.id === packageId);

    const updatedMember: MemberProfile = {
      ...member,
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      agentCode: agentCode.trim(),
      password: password.trim() || 'nexus123',
      role: role.trim() || member.role,
      rank: rank.trim() || member.rank,
      packageId: packageId,
      packageName: selectedPkg ? selectedPkg.name : member.packageName,
      packagePrice: selectedPkg ? selectedPkg.price : member.packagePrice,
      paymentType: paymentType,
      walletBalance: Number(walletBalance),
      isAdmin: isAdmin,
      sponsorName: sponsorName.trim() || member.sponsorName,
      sponsorAgentCode: sponsorAgentCode.trim() || member.sponsorAgentCode,
    };

    onSaveMember(updatedMember);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden my-8 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <img
              src={member.avatar}
              alt={member.name}
              className="w-11 h-11 rounded-2xl object-cover border-2 border-amber-400"
            />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold">Edit Member Account & Login</h2>
                {member.isAdmin && (
                  <span className="text-[10px] bg-purple-500/30 text-purple-300 font-bold px-2 py-0.5 rounded border border-purple-400/30">
                    Admin
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400">
                Modify member identity, credentials, package allocation, and privileges
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
          {/* Member Name & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Full Name *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-purple-500 font-semibold"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Login Email *</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-purple-500 font-semibold"
              />
            </div>
          </div>

          {/* Login Credentials: Agent Code & Password */}
          <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-amber-700" />
              <span>Login Credentials (Authentication Details)</span>
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Agent Code / Login ID *
                </label>
                <input
                  type="text"
                  required
                  value={agentCode}
                  onChange={(e) => setAgentCode(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-amber-300 font-mono font-bold text-amber-900 bg-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Login Password *
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-amber-300 font-mono font-bold text-slate-900 bg-white pr-9"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2.5 top-2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
            <p className="text-[10px] text-amber-800">
              The member can log into the NEXUS portal using either their Agent Code or Email with this password.
            </p>
          </div>

          {/* Phone & Role */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Contact Phone</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Professional Role Title</label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-medium"
              />
            </div>
          </div>

          {/* Rank & Package Tier */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Network Rank</label>
              <select
                value={rank}
                onChange={(e) => setRank(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold"
              >
                <option value="Bronze Partner">Bronze Partner</option>
                <option value="Silver Director">Silver Director</option>
                <option value="Gold Executive">Gold Executive</option>
                <option value="Diamond Guild Master">Diamond Guild Master</option>
                <option value="System Administrator">System Administrator</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Membership Package</label>
              <select
                value={packageId}
                onChange={(e) => setPackageId(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold"
              >
                {MEMBERSHIP_PACKAGES.map((pkg) => (
                  <option key={pkg.id} value={pkg.id}>
                    {pkg.name} (₱{pkg.price.toLocaleString()})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Payment Type & Wallet Balance */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Payment Scheme</label>
              <select
                value={paymentType}
                onChange={(e) => setPaymentType(e.target.value as any)}
                className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold"
              >
                <option value="Paid in Full">Paid in Full</option>
                <option value="Installment Plan">Installment Plan (6 Months)</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Wallet Balance (₱)</label>
              <input
                type="number"
                min={0}
                value={walletBalance}
                onChange={(e) => setWalletBalance(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-extrabold text-emerald-600"
              />
            </div>
          </div>

          {/* Admin Authority Checkbox */}
          <div className="p-3.5 rounded-2xl bg-purple-50 border border-purple-200 flex items-start gap-3">
            <input
              type="checkbox"
              id="editIsAdmin"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
              className="mt-1 w-4 h-4 rounded text-purple-600 focus:ring-purple-500"
            />
            <div>
              <label htmlFor="editIsAdmin" className="font-bold text-purple-950 cursor-pointer">
                System Administrator Privileges
              </label>
              <p className="text-[11px] text-purple-700 mt-0.5">
                Enable to allow this user to create, edit, and delete Real Estate listings, Direct Selling products, and Insurance plans, as well as onboard members.
              </p>
            </div>
          </div>

          {/* Submit CTA */}
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
              className="px-6 py-2.5 rounded-xl bg-purple-700 hover:bg-purple-600 text-white font-extrabold shadow-md flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Save Member Details</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
