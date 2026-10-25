import React, { useState } from 'react';
import {
  MemberProfile,
  ClientInstallmentRecord,
  EarningTransaction,
  PaymentStatus,
  InstallmentScheduleItem,
  RealEstateListing,
  DirectSellingProduct,
  MembershipPackage,
  InsurancePlan,
} from '../types';
import { MEMBERSHIP_PACKAGES } from '../data/mockData';
import { AddEditInsuranceModal } from './AddEditInsuranceModal';
import { AddEditListingModal } from './AddEditListingModal';
import { EditMemberModal } from './EditMemberModal';
import { ChangeAvatarModal } from './ChangeAvatarModal';
import {
  Layers,
  CreditCard,
  UserPlus,
  Users,
  Share2,
  DollarSign,
  TrendingUp,
  Calendar,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Search,
  Filter,
  FileText,
  Send,
  Plus,
  ArrowUpRight,
  ChevronRight,
  ShieldCheck,
  Building2,
  ShoppingBag,
  ExternalLink,
  Copy,
  Printer,
  X,
  Wallet,
  Sparkles,
  Phone,
  Mail,
  RefreshCw,
  Crown,
  Trash2,
  Package,
  Lock,
  Eye,
  EyeOff,
  KeyRound,
  Award,
  Camera,
  Edit,
} from 'lucide-react';

interface MemberPortalProps {
  currentUser: MemberProfile;
  allMembers: MemberProfile[];
  onSwitchUser: (memberId: string) => void;
  clients: ClientInstallmentRecord[];
  onUpdateClients: (newClients: ClientInstallmentRecord[]) => void;
  transactions: EarningTransaction[];
  onAddTransaction: (tx: EarningTransaction) => void;
  onUpdateMember: (updated: MemberProfile) => void;
  onSaveMemberDetails?: (updated: MemberProfile) => void;
  listings?: RealEstateListing[];
  onAddListing?: (listing: RealEstateListing) => void;
  onUpdateListing?: (listing: RealEstateListing) => void;
  onDeleteListing?: (id: string) => void;
  products?: DirectSellingProduct[];
  onAddProduct?: (product: DirectSellingProduct) => void;
  onDeleteProduct?: (id: string) => void;
  insurancePlans?: InsurancePlan[];
  onAddInsurancePlan?: (plan: InsurancePlan) => void;
  onUpdateInsurancePlan?: (plan: InsurancePlan) => void;
  onDeleteInsurancePlan?: (id: string) => void;
  onOpenAddMember?: () => void;
  onAddMember?: (newMember: MemberProfile, switchImmediately?: boolean) => void;
}

export const MemberPortal: React.FC<MemberPortalProps> = ({
  currentUser,
  allMembers,
  onSwitchUser,
  clients,
  onUpdateClients,
  transactions,
  onAddTransaction,
  onUpdateMember,
  onSaveMemberDetails,
  listings = [],
  onAddListing,
  onUpdateListing,
  onDeleteListing,
  products = [],
  onAddProduct,
  onDeleteProduct,
  insurancePlans = [],
  onAddInsurancePlan,
  onUpdateInsurancePlan,
  onDeleteInsurancePlan,
  onOpenAddMember,
  onAddMember,
}) => {
  const [activePortalTab, setActivePortalTab] = useState<'overview' | 'clients' | 'add_client' | 'downline' | 'marketing' | 'admin_catalog' | 'add_member'>('overview');

  // Client Filter state
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [verticalFilter, setVerticalFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals state
  const [scheduleModalClient, setScheduleModalClient] = useState<ClientInstallmentRecord | null>(null);
  const [recordPaymentClient, setRecordPaymentClient] = useState<ClientInstallmentRecord | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string>('Bank Transfer');
  const [paymentReference, setPaymentReference] = useState<string>('');
  
  const [reminderModalClient, setReminderModalClient] = useState<ClientInstallmentRecord | null>(null);
  const [reminderChannel, setReminderChannel] = useState<'sms' | 'email' | 'whatsapp'>('sms');
  const [reminderSentAlert, setReminderSentAlert] = useState<boolean>(false);

  const [soaModalClient, setSoaModalClient] = useState<ClientInstallmentRecord | null>(null);

  const [payoutModalOpen, setPayoutModalOpen] = useState<boolean>(false);
  const [payoutAmount, setPayoutAmount] = useState<number>(currentUser.walletBalance);
  const [payoutMethodChoice, setPayoutMethodChoice] = useState<string>('Bank Direct Deposit');
  const [payoutSuccess, setPayoutSuccess] = useState<boolean>(false);

  // New Modals for Avatar, Edit Member, and Insurance Plan
  const [avatarModalOpen, setAvatarModalOpen] = useState(false);
  const [editMemberModalOpen, setEditMemberModalOpen] = useState(false);
  const [memberToEdit, setMemberToEdit] = useState<MemberProfile | null>(null);
  const [insuranceModalOpen, setInsuranceModalOpen] = useState(false);
  const [planToEdit, setPlanToEdit] = useState<InsurancePlan | null>(null);
  const [listingModalOpen, setListingModalOpen] = useState(false);
  const [listingToEdit, setListingToEdit] = useState<RealEstateListing | null>(null);

  // New Client Form state
  const [newClientName, setNewClientName] = useState('');
  const [newClientEmail, setNewClientEmail] = useState('');
  const [newClientPhone, setNewClientPhone] = useState('');
  const [newClientVertical, setNewClientVertical] = useState<'real_estate' | 'insurance' | 'direct_selling'>('real_estate');
  const [newClientItem, setNewClientItem] = useState('');
  const [newClientPrice, setNewClientPrice] = useState<number>(2500000);
  const [newClientDownPayment, setNewClientDownPayment] = useState<number>(375000);
  const [newClientTermMonths, setNewClientTermMonths] = useState<number>(36);
  const [newClientFrequency, setNewClientFrequency] = useState<'Monthly' | 'Quarterly'>('Monthly');
  const [newClientNotes, setNewClientNotes] = useState('');
  const [formSavedAlert, setFormSavedAlert] = useState(false);

  // Link copy feedback
  const [copiedLink, setCopiedLink] = useState<string | null>(null);

  // In-Portal Member Onboarding Form State
  const [onboardName, setOnboardName] = useState('');
  const [onboardEmail, setOnboardEmail] = useState('');
  const [onboardPhone, setOnboardPhone] = useState('+63 9');
  const [onboardPassword, setOnboardPassword] = useState('nexus123');
  const [onboardShowPassword, setOnboardShowPassword] = useState(false);
  const [onboardPkgId, setOnboardPkgId] = useState('pkg-silver');
  const [onboardPaymentType, setOnboardPaymentType] = useState<'Paid in Full' | 'Installment Plan'>('Paid in Full');
  const [onboardIsAdmin, setOnboardIsAdmin] = useState(false);
  const [onboardAgentCode, setOnboardAgentCode] = useState(() => `NX-${Math.floor(10000 + Math.random() * 90000)}`);
  const [onboardSuccessMember, setOnboardSuccessMember] = useState<MemberProfile | null>(null);
  const [onboardCopied, setOnboardCopied] = useState(false);

  // Admin exclusive inventory state
  const [adminSection, setAdminSection] = useState<'real_estate' | 'products' | 'insurance'>('real_estate');
  const [adminRETitle, setAdminRETitle] = useState('');
  const [adminRECategory, setAdminRECategory] = useState<'Condominium' | 'Luxury Villa' | 'Townhouse' | 'Commercial Space' | 'Subdivision Lot'>('Condominium');
  const [adminRELocation, setAdminRELocation] = useState('');
  const [adminREPrice, setAdminREPrice] = useState<number>(3800000);
  const [adminREDownPayment, setAdminREDownPayment] = useState<number>(15);
  const [adminRETermMonths, setAdminRETermMonths] = useState<number>(36);
  const [adminREBeds, setAdminREBeds] = useState<number>(2);
  const [adminREBaths, setAdminREBaths] = useState<number>(2);
  const [adminREArea, setAdminREArea] = useState<number>(110);
  const [adminRESuccess, setAdminRESuccess] = useState(false);

  const [adminProdName, setAdminProdName] = useState('');
  const [adminProdCategory, setAdminProdCategory] = useState<'Wellness & Nutrition' | 'Premium Skincare' | 'Home & Living' | 'Daily Essentials'>('Wellness & Nutrition');
  const [adminProdRetail, setAdminProdRetail] = useState<number>(2800);
  const [adminProdMember, setAdminProdMember] = useState<number>(1750);
  const [adminProdPV, setAdminProdPV] = useState<number>(75);
  const [adminProdSuccess, setAdminProdSuccess] = useState(false);

  const handleAdminAddRealEstate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser.isAdmin || !onAddListing) return;
    const dp = (adminREPrice * adminREDownPayment) / 100;
    const balance = adminREPrice - dp;
    const monthly = Math.round(balance / adminRETermMonths);
    const newL: RealEstateListing = {
      id: `re-adm-${Date.now()}`,
      title: adminRETitle || 'NEXUS Prime Estate',
      category: adminRECategory,
      location: adminRELocation || 'NEXUS Metropolitan Sector',
      price: adminREPrice,
      downPaymentPercent: adminREDownPayment,
      monthlyInstallmentEstimate: monthly,
      termMonths: adminRETermMonths,
      bedrooms: adminREBeds,
      bathrooms: adminREBaths,
      areaSqm: adminREArea,
      imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
      featured: true,
      tag: 'Admin Verified Listing',
      description: 'Exclusive NEXUS real estate opportunity entered directly by system administration.',
      amenities: ['Concierge Service', 'Private Security', 'Covered Parking', 'Clubhouse Access'],
      installmentOptions: [
        { term: '24 Months (0% Int)', monthly: Math.round(balance / 24), interest: '0%', downPayment: dp },
        { term: '36 Months Developer', monthly: Math.round((balance * 1.05) / 36), interest: '3.5%', downPayment: dp },
      ],
    };
    onAddListing(newL);
    setAdminRESuccess(true);
    setTimeout(() => {
      setAdminRESuccess(false);
      setAdminRETitle('');
      setAdminRELocation('');
    }, 1500);
  };

  const handleAdminAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser.isAdmin || !onAddProduct) return;
    const newP: DirectSellingProduct = {
      id: `ds-adm-${Date.now()}`,
      name: adminProdName || 'NEXUS Advanced Formulation',
      category: adminProdCategory,
      retailPrice: adminProdRetail,
      memberPrice: adminProdMember,
      pointsValue: adminProdPV,
      description: 'Certified premium product created and published by NEXUS Administrator.',
      benefits: ['Third-party verified', 'GMP certified manufacture', 'Direct wholesale margin'],
      inStock: true,
      imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80',
      installmentAvailable: true,
      installmentScheme: '3 Monthly Installments at 0% interest',
    };
    onAddProduct(newP);
    setAdminProdSuccess(true);
    setTimeout(() => {
      setAdminProdSuccess(false);
      setAdminProdName('');
    }, 1500);
  };

  // Handle in-portal member enrollment
  const handleInPortalAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!onboardName.trim() || !onboardEmail.trim()) {
      alert('Please provide member full name and login email.');
      return;
    }

    const selectedPkg = MEMBERSHIP_PACKAGES.find((p) => p.id === onboardPkgId) || MEMBERSHIP_PACKAGES[1];

    const avatarList = [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    ];
    const chosenAvatar = avatarList[Math.floor(Math.random() * avatarList.length)];

    const newMem: MemberProfile = {
      id: `mem-${Date.now()}`,
      name: onboardName.trim(),
      role: onboardIsAdmin ? 'Administrator & Guild Director' : selectedPkg.role,
      rank: onboardIsAdmin ? 'System Administrator' : selectedPkg.initialRank,
      agentCode: onboardAgentCode.trim() || `NX-${Math.floor(10000 + Math.random() * 90000)}`,
      email: onboardEmail.trim(),
      phone: onboardPhone.trim(),
      password: onboardPassword.trim() || 'nexus123',
      avatar: chosenAvatar,
      joinedDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      totalEarnings: 0,
      thisMonthEarnings: 0,
      pendingPayout: 0,
      walletBalance: 0,
      realEstateCommissions: 0,
      insuranceCommissions: 0,
      directSellingMargins: 0,
      networkingBonuses: 0,
      activeClientsCount: 0,
      teamSize: 0,
      isAdmin: onboardIsAdmin,
      packageId: selectedPkg.id,
      packageName: selectedPkg.name,
      packagePrice: selectedPkg.price,
      paymentType: onboardPaymentType,
      sponsorName: currentUser.name,
      sponsorAgentCode: currentUser.agentCode,
    };

    if (onAddMember) {
      onAddMember(newMem, false);
    }
    setOnboardSuccessMember(newMem);
  };

  // Filter clients
  const filteredClients = clients.filter((c) => {
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
    const matchesVertical = verticalFilter === 'all' || c.vertical === verticalFilter;
    const matchesSearch =
      c.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.contractCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.itemName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesVertical && matchesSearch;
  });

  // Client stats
  const totalReceivables = clients.reduce((acc, c) => acc + (c.status !== 'completed' ? c.installmentAmount : 0), 0);
  const overdueCount = clients.filter((c) => c.status === 'overdue').length;
  const dueSoonCount = clients.filter((c) => c.status === 'due_soon').length;
  const upToDateCount = clients.filter((c) => c.status === 'up_to_date').length;
  const completedCount = clients.filter((c) => c.status === 'completed').length;

  // Handle Recording an Installment Payment
  const handleConfirmRecordPayment = () => {
    if (!recordPaymentClient) return;

    const nextInstallmentNum = recordPaymentClient.paidInstallments + 1;
    const isNowCompleted = nextInstallmentNum >= recordPaymentClient.totalInstallments;

    // Commission credited to agent on this payment cycle
    const commissionIncrement = Math.round(
      (recordPaymentClient.agentCommissionExpected / recordPaymentClient.totalInstallments)
    );

    const generatedReceipt = `REC-${Math.floor(100000 + Math.random() * 900000)}`;

    const updatedSchedule: InstallmentScheduleItem[] = recordPaymentClient.schedule.map((item) => {
      if (item.installmentNumber === nextInstallmentNum) {
        return {
          ...item,
          status: 'paid',
          paidDate: new Date().toISOString().split('T')[0],
          receiptNumber: generatedReceipt,
          paymentMethod: paymentMethod,
        };
      }
      return item;
    });

    // If next item wasn't in existing schedule slice, append it
    const existingItem = updatedSchedule.find((s) => s.installmentNumber === nextInstallmentNum);
    if (!existingItem) {
      updatedSchedule.push({
        id: `sch-dyn-${Date.now()}`,
        installmentNumber: nextInstallmentNum,
        dueDate: recordPaymentClient.nextDueDate,
        amount: recordPaymentClient.installmentAmount,
        status: 'paid',
        paidDate: new Date().toISOString().split('T')[0],
        receiptNumber: generatedReceipt,
        paymentMethod: paymentMethod,
      });
    }

    // Advance next due date by 1 month
    const nextDueDateObj = new Date(recordPaymentClient.nextDueDate);
    nextDueDateObj.setMonth(nextDueDateObj.getMonth() + 1);
    const newNextDueDate = nextDueDateObj.toISOString().split('T')[0];

    const updatedClient: ClientInstallmentRecord = {
      ...recordPaymentClient,
      paidInstallments: nextInstallmentNum,
      status: isNowCompleted ? 'completed' : 'up_to_date',
      nextDueDate: isNowCompleted ? 'Fully Settled' : newNextDueDate,
      agentCommissionEarned: recordPaymentClient.agentCommissionEarned + commissionIncrement,
      schedule: updatedSchedule,
    };

    const newClientsList = clients.map((c) => (c.id === recordPaymentClient.id ? updatedClient : c));
    onUpdateClients(newClientsList);

    // Add transaction to member earnings
    const newTx: EarningTransaction = {
      id: `tx-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      clientName: recordPaymentClient.clientName,
      type:
        recordPaymentClient.vertical === 'real_estate'
          ? 'Real Estate Commission'
          : recordPaymentClient.vertical === 'insurance'
          ? 'Insurance Recurring Premium'
          : 'Direct Sales Wholesale Profit',
      amount: commissionIncrement,
      status: 'Credited',
      referenceId: generatedReceipt,
    };
    onAddTransaction(newTx);

    // Update member profile wallet
    onUpdateMember({
      ...currentUser,
      totalEarnings: currentUser.totalEarnings + commissionIncrement,
      thisMonthEarnings: currentUser.thisMonthEarnings + commissionIncrement,
      walletBalance: currentUser.walletBalance + commissionIncrement,
    });

    setRecordPaymentClient(null);
    setPaymentReference('');
  };

  // Handle Add New Client Submission
  const handleAddNewClient = (e: React.FormEvent) => {
    e.preventDefault();

    const balance = newClientPrice - newClientDownPayment;
    const installmentAmount = Math.round(balance / newClientTermMonths);
    const commissionRate = newClientVertical === 'real_estate' ? 0.03 : newClientVertical === 'insurance' ? 0.12 : 0.25;
    const expectedCommission = Math.round(newClientPrice * commissionRate);

    // Generate initial schedule items
    const scheduleItems: InstallmentScheduleItem[] = [];
    const today = new Date();
    for (let i = 1; i <= Math.min(newClientTermMonths, 6); i++) {
      const d = new Date(today);
      d.setMonth(today.getMonth() + i);
      scheduleItems.push({
        id: `sch-init-${Date.now()}-${i}`,
        installmentNumber: i,
        dueDate: d.toISOString().split('T')[0],
        amount: installmentAmount,
        status: 'pending',
      });
    }

    const nextDue = new Date(today);
    nextDue.setMonth(today.getMonth() + 1);

    const newRecord: ClientInstallmentRecord = {
      id: `cli-${Date.now()}`,
      clientName: newClientName,
      clientEmail: newClientEmail,
      clientPhone: newClientPhone,
      vertical: newClientVertical,
      itemName: newClientItem || `${newClientVertical.toUpperCase()} Client Contract`,
      contractCode: `${newClientVertical.slice(0, 2).toUpperCase()}-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      totalContractValue: newClientPrice,
      downPayment: newClientDownPayment,
      installmentAmount: installmentAmount,
      totalInstallments: newClientTermMonths,
      paidInstallments: 0,
      frequency: newClientFrequency,
      startDate: today.toISOString().split('T')[0],
      nextDueDate: nextDue.toISOString().split('T')[0],
      status: 'up_to_date',
      agentCommissionExpected: expectedCommission,
      agentCommissionEarned: 0,
      notes: newClientNotes,
      schedule: scheduleItems,
    };

    onUpdateClients([newRecord, ...clients]);
    setFormSavedAlert(true);
    setTimeout(() => {
      setFormSavedAlert(false);
      setActivePortalTab('clients');
    }, 1500);

    // Reset fields
    setNewClientName('');
    setNewClientEmail('');
    setNewClientPhone('');
    setNewClientItem('');
  };

  // Handle Payout Request
  const handleRequestPayout = () => {
    if (payoutAmount <= 0 || payoutAmount > currentUser.walletBalance) {
      alert('Please specify an amount up to your available wallet balance.');
      return;
    }
    onUpdateMember({
      ...currentUser,
      walletBalance: currentUser.walletBalance - payoutAmount,
      pendingPayout: currentUser.pendingPayout + payoutAmount,
    });
    setPayoutSuccess(true);
    setTimeout(() => {
      setPayoutSuccess(false);
      setPayoutModalOpen(false);
    }, 1800);
  };

  const copyReferralLink = (url: string, key: string) => {
    navigator.clipboard?.writeText(url);
    setCopiedLink(key);
    setTimeout(() => setCopiedLink(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Bar: Member Identity & Quick Switch */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          {/* Avatar with click-to-change profile picture */}
          <div
            onClick={() => setAvatarModalOpen(true)}
            className="relative group cursor-pointer shrink-0"
            title="Click to change your profile picture"
          >
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-amber-400 shadow-md group-hover:brightness-90 transition-all"
            />
            <div className="absolute inset-0 bg-slate-950/60 rounded-2xl flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white text-[9px] font-bold">
              <Camera className="w-4 h-4 text-cyan-400 mb-0.5" />
              <span>Change</span>
            </div>
            <span className="absolute -bottom-1 -right-1 p-1 bg-slate-950 text-cyan-400 rounded-lg border border-slate-700 shadow-sm">
              <Camera className="w-3 h-3" />
            </span>
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold">{currentUser.name}</h1>
              <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                {currentUser.rank}
              </span>
              {currentUser.packageName && (
                <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 flex items-center gap-1">
                  <Package className="w-3 h-3 text-cyan-400" />
                  <span>{currentUser.packageName}</span>
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400 mt-1">
              {currentUser.role} • Agent Code:{' '}
              <span className="font-mono text-amber-400 font-bold">{currentUser.agentCode}</span>
              {currentUser.sponsorName && (
                <span className="text-slate-400 ml-2">
                  • Sponsor: <span className="text-slate-300">{currentUser.sponsorName}</span>
                </span>
              )}
            </p>
            <div className="flex items-center gap-3 mt-1.5">
              <p className="text-xs text-slate-400">
                Active Clients: <span className="text-white font-bold">{clients.length}</span> • Team
                Associates: <span className="text-white font-bold">{currentUser.teamSize}</span>
              </p>
              <button
                onClick={() => setAvatarModalOpen(true)}
                className="text-[11px] text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 hover:underline"
              >
                <Camera className="w-3 h-3" />
                <span>Change Photo</span>
              </button>
            </div>
          </div>
        </div>

        {/* Demo Switcher & Quick Actions */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="bg-slate-800/80 px-4 py-2.5 rounded-2xl border border-slate-700 text-right">
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">
              Available Wallet
            </span>
            <span className="text-xl font-extrabold text-emerald-400">
              ₱{currentUser.walletBalance.toLocaleString()}
            </span>
          </div>

          {/* Add Member button is ONLY visible to Admin */}
          {currentUser.isAdmin && (
            <button
              onClick={() => {
                if (onOpenAddMember) onOpenAddMember();
                else setActivePortalTab('add_member');
              }}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-md shadow-cyan-500/20"
              title="Admin Privilege: Onboard new associate & assign package"
            >
              <UserPlus className="w-4 h-4" />
              <span>+ Add Member</span>
            </button>
          )}

          <button
            onClick={() => setPayoutModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-md shadow-emerald-500/20"
          >
            <Wallet className="w-4 h-4" />
            <span>Withdraw</span>
          </button>

          {/* Switch Profile Dropdown */}
          <div className="bg-slate-800 px-3 py-2 rounded-xl border border-slate-700 flex items-center gap-2 text-xs">
            <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-slate-400">Switch:</span>
            <select
              value={currentUser.id}
              onChange={(e) => onSwitchUser(e.target.value)}
              className="bg-transparent text-white font-bold focus:outline-none cursor-pointer max-w-[150px] truncate"
            >
              {allMembers.map((m) => (
                <option key={m.id} value={m.id} className="bg-slate-900 text-white">
                  {m.name} ({m.agentCode})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Member Portal Navigation Tabs - Only Admins see add_member and admin_catalog */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-slate-200">
        {[
          ...(currentUser.isAdmin
            ? [
                {
                  id: 'admin_catalog',
                  label: '👑 Admin Listings, Products & Insurance',
                  icon: Crown,
                  highlight: true,
                },
                {
                  id: 'add_member',
                  label: '+ Add Member / Packages',
                  icon: UserPlus,
                  highlight: true,
                },
              ]
            : []),
          { id: 'overview', label: 'Earnings & Overview', icon: Layers },
          { id: 'clients', label: `Client Installment Tracker (${clients.length})`, icon: CreditCard, highlight: !currentUser.isAdmin },
          { id: 'add_client', label: '+ New Installment Sale', icon: Plus },
          { id: 'downline', label: 'Team & Network Tree', icon: Users },
          { id: 'marketing', label: 'Referral Links & Tools', icon: Share2 },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activePortalTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActivePortalTab(tab.id as any)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                isActive
                  ? tab.highlight
                    ? 'bg-purple-700 text-white shadow-md'
                    : 'bg-slate-900 text-amber-400 shadow-md'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: OVERVIEW & EARNINGS BREAKDOWN */}
      {activePortalTab === 'overview' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          {/* Top 4 Earnings Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider">All-Time Earnings</span>
                <DollarSign className="w-4 h-4 text-emerald-500" />
              </div>
              <p className="text-3xl font-extrabold text-slate-900">
                ₱{currentUser.totalEarnings.toLocaleString()}
              </p>
              <p className="text-xs text-emerald-600 font-semibold mt-1 flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+18.4% compared to last cycle</span>
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider">This Month's Earnings</span>
                <Calendar className="w-4 h-4 text-amber-500" />
              </div>
              <p className="text-3xl font-extrabold text-amber-600">
                ₱{currentUser.thisMonthEarnings.toLocaleString()}
              </p>
              <p className="text-xs text-slate-500 mt-1">
                From installment collections & new closures
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider">Available Wallet</span>
                <Wallet className="w-4 h-4 text-emerald-500" />
              </div>
              <p className="text-3xl font-extrabold text-emerald-600">
                ₱{currentUser.walletBalance.toLocaleString()}
              </p>
              <button
                onClick={() => setPayoutModalOpen(true)}
                className="mt-1 text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1"
              >
                <span>Request Payout Transfer</span>
                <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider">Pending Processing</span>
                <Clock className="w-4 h-4 text-indigo-500" />
              </div>
              <p className="text-3xl font-extrabold text-indigo-600">
                ₱{currentUser.pendingPayout.toLocaleString()}
              </p>
              <p className="text-xs text-slate-500 mt-1">Scheduled for next banking cycle</p>
            </div>
          </div>

          {/* Earnings Breakdown by Vertical */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-4">
              Earnings Breakdown Across Multi-Asset Verticals
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200">
                <div className="flex items-center gap-2 text-amber-800 text-xs font-bold mb-1">
                  <Building2 className="w-4 h-4" />
                  <span>Real Estate Commissions</span>
                </div>
                <p className="text-2xl font-extrabold text-amber-900">
                  ₱{currentUser.realEstateCommissions.toLocaleString()}
                </p>
                <p className="text-xs text-amber-700 mt-1">
                  60.1% of portfolio • Developer installment splits
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200">
                <div className="flex items-center gap-2 text-emerald-800 text-xs font-bold mb-1">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Insurance Trail Renewals</span>
                </div>
                <p className="text-2xl font-extrabold text-emerald-900">
                  ₱{currentUser.insuranceCommissions.toLocaleString()}
                </p>
                <p className="text-xs text-emerald-700 mt-1">
                  21.0% of portfolio • Steady monthly recurring
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-cyan-50/70 border border-cyan-200">
                <div className="flex items-center gap-2 text-cyan-800 text-xs font-bold mb-1">
                  <ShoppingBag className="w-4 h-4" />
                  <span>Direct Sales Retail Margins</span>
                </div>
                <p className="text-2xl font-extrabold text-cyan-900">
                  ₱{currentUser.directSellingMargins.toLocaleString()}
                </p>
                <p className="text-xs text-cyan-700 mt-1">
                  9.8% of portfolio • Instant wholesale markup
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-purple-50/70 border border-purple-200">
                <div className="flex items-center gap-2 text-purple-800 text-xs font-bold mb-1">
                  <Users className="w-4 h-4" />
                  <span>Team Overrides & Bonuses</span>
                </div>
                <p className="text-2xl font-extrabold text-purple-900">
                  ₱{currentUser.networkingBonuses.toLocaleString()}
                </p>
                <p className="text-xs text-purple-700 mt-1">
                  9.1% of portfolio • Global leadership pool
                </p>
              </div>
            </div>
          </div>

          {/* Recent Earnings Ledger */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Recent Earnings Activity</h3>
                <p className="text-xs text-slate-500">
                  Real-time credits from client installment remittances and team bonuses.
                </p>
              </div>
              <button
                onClick={() => setActivePortalTab('clients')}
                className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
              >
                <span>Track Client Dues</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider">
                    <th className="pb-3">Date</th>
                    <th className="pb-3">Source / Client</th>
                    <th className="pb-3">Stream Type</th>
                    <th className="pb-3">Ref Code</th>
                    <th className="pb-3 text-right">Amount Credited</th>
                    <th className="pb-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {transactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3 text-slate-500">{tx.date}</td>
                      <td className="py-3 font-bold text-slate-900">{tx.clientName}</td>
                      <td className="py-3">
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-800 text-[11px] font-semibold">
                          {tx.type}
                        </span>
                      </td>
                      <td className="py-3 font-mono text-slate-400">{tx.referenceId}</td>
                      <td className="py-3 text-right font-extrabold text-emerald-600 text-sm">
                        +₱{tx.amount.toLocaleString()}
                      </td>
                      <td className="py-3 text-right">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {tx.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CLIENT PAYMENT STATUS & INSTALLMENT TRACKER (CORE USER BRIEF REQUIREMENT!) */}
      {activePortalTab === 'clients' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          {/* Quick Metrics Bar for Installments */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
              <p className="text-xs text-slate-500 font-bold">Total Clients</p>
              <p className="text-2xl font-extrabold text-slate-900 mt-1">{clients.length}</p>
              <p className="text-[11px] text-slate-400">On installment plans</p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
              <p className="text-xs text-emerald-600 font-bold">Up to Date</p>
              <p className="text-2xl font-extrabold text-emerald-600 mt-1">{upToDateCount}</p>
              <p className="text-[11px] text-emerald-600 font-medium">Current cycle paid</p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
              <p className="text-xs text-amber-600 font-bold">Due Soon</p>
              <p className="text-2xl font-extrabold text-amber-600 mt-1">{dueSoonCount}</p>
              <p className="text-[11px] text-amber-700 font-medium">Due in &lt; 7 days</p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
              <p className="text-xs text-red-600 font-bold">Overdue / Grace</p>
              <p className="text-2xl font-extrabold text-red-600 mt-1">{overdueCount}</p>
              <p className="text-[11px] text-red-600 font-medium">Action required</p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm col-span-2 sm:col-span-1">
              <p className="text-xs text-slate-500 font-bold">Monthly Receivables</p>
              <p className="text-xl font-extrabold text-slate-900 mt-1">
                ₱{totalReceivables.toLocaleString()}
              </p>
              <p className="text-[11px] text-emerald-600 font-medium">Est. agent split</p>
            </div>
          </div>

          {/* Filtering and Search Controls */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-400 mr-1 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" />
                <span>Status:</span>
              </span>
              {[
                { id: 'all', label: 'All Statuses' },
                { id: 'up_to_date', label: 'Up to Date' },
                { id: 'due_soon', label: 'Due Soon' },
                { id: 'overdue', label: 'Overdue' },
                { id: 'grace_period', label: 'Grace Period' },
                { id: 'completed', label: 'Completed' },
              ].map((s) => (
                <button
                  key={s.id}
                  onClick={() => setStatusFilter(s.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    statusFilter === s.id
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <select
                value={verticalFilter}
                onChange={(e) => setVerticalFilter(e.target.value)}
                className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold bg-white text-slate-700"
              >
                <option value="all">All Opportunities</option>
                <option value="real_estate">Real Estate</option>
                <option value="insurance">Insurance Plans</option>
                <option value="direct_selling">Direct Selling</option>
              </select>

              <div className="relative min-w-[200px]">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search client or contract..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* Client Installment Cards / Rows */}
          <div className="space-y-4">
            {filteredClients.length === 0 ? (
              <div className="bg-white p-12 text-center rounded-3xl border border-slate-200">
                <CreditCard className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p className="text-base font-bold text-slate-800">No client records found</p>
                <p className="text-xs text-slate-500 mt-1">
                  Try clearing the filters or register a new installment contract.
                </p>
              </div>
            ) : (
              filteredClients.map((client) => {
                const paidPercent = Math.round(
                  (client.paidInstallments / client.totalInstallments) * 100
                );
                const totalPaidEstimated =
                  client.downPayment + client.installmentAmount * client.paidInstallments;
                const remainingBalance = Math.max(0, client.totalContractValue - totalPaidEstimated);

                // Status chip styling
                let statusBadge = (
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Up to Date</span>
                  </span>
                );
                if (client.status === 'due_soon') {
                  statusBadge = (
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300 flex items-center gap-1 animate-pulse">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Due Soon</span>
                    </span>
                  );
                } else if (client.status === 'overdue') {
                  statusBadge = (
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-red-100 text-red-800 border border-red-300 flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>Payment Overdue</span>
                    </span>
                  );
                } else if (client.status === 'grace_period') {
                  statusBadge = (
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-800 border border-orange-300 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>In Grace Period</span>
                    </span>
                  );
                } else if (client.status === 'completed') {
                  statusBadge = (
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-300 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Contract Completed</span>
                    </span>
                  );
                }

                return (
                  <div
                    key={client.id}
                    className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6"
                  >
                    {/* Left: Client and Contract Info */}
                    <div className="space-y-2 lg:max-w-md">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <span className="text-base font-extrabold text-slate-900">
                          {client.clientName}
                        </span>
                        {statusBadge}
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                          {client.contractCode}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                        {client.vertical === 'real_estate' && (
                          <span className="text-amber-600 flex items-center gap-1">
                            <Building2 className="w-3.5 h-3.5" /> Real Estate:
                          </span>
                        )}
                        {client.vertical === 'insurance' && (
                          <span className="text-emerald-600 flex items-center gap-1">
                            <ShieldCheck className="w-3.5 h-3.5" /> Insurance:
                          </span>
                        )}
                        {client.vertical === 'direct_selling' && (
                          <span className="text-cyan-600 flex items-center gap-1">
                            <ShoppingBag className="w-3.5 h-3.5" /> Direct Sales:
                          </span>
                        )}
                        <span className="text-slate-900 font-bold">{client.itemName}</span>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <Mail className="w-3 h-3 text-slate-400" />
                          {client.clientEmail}
                        </span>
                        <span className="flex items-center gap-1">
                          <Phone className="w-3 h-3 text-slate-400" />
                          {client.clientPhone}
                        </span>
                      </div>

                      {client.notes && (
                        <p className="text-[11px] text-slate-500 italic bg-slate-50 p-2 rounded-lg border border-slate-100">
                          Note: {client.notes}
                        </p>
                      )}
                    </div>

                    {/* Middle: Installment Progress Bar & Financials */}
                    <div className="lg:w-72 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-2">
                      <div className="flex items-center justify-between text-slate-600">
                        <span className="font-bold">Installment Progress</span>
                        <span className="font-extrabold text-slate-900">
                          {client.paidInstallments} of {client.totalInstallments} ({paidPercent}%)
                        </span>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            client.status === 'completed'
                              ? 'bg-blue-600'
                              : client.status === 'overdue'
                              ? 'bg-red-500'
                              : 'bg-emerald-500'
                          }`}
                          style={{ width: `${Math.min(100, paidPercent)}%` }}
                        />
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                        <span>Paid: ₱{totalPaidEstimated.toLocaleString()}</span>
                        <span>Rem: ₱{remainingBalance.toLocaleString()}</span>
                      </div>

                      <div className="border-t border-slate-200 pt-2 flex items-center justify-between font-medium">
                        <span className="text-slate-600">Next Due:</span>
                        <span className="font-bold text-slate-900">
                          {client.status === 'completed' ? (
                            <span className="text-blue-600">Completed</span>
                          ) : (
                            `${client.nextDueDate} (₱${client.installmentAmount.toLocaleString()})`
                          )}
                        </span>
                      </div>
                    </div>

                    {/* Right: Action Buttons */}
                    <div className="flex flex-col sm:flex-row lg:flex-col gap-2 shrink-0">
                      {client.status !== 'completed' && (
                        <button
                          onClick={() => {
                            setRecordPaymentClient(client);
                            setPaymentReference(`TRX-${Math.floor(100000 + Math.random() * 900000)}`);
                          }}
                          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Record Payment</span>
                        </button>
                      )}

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setScheduleModalClient(client)}
                          className="flex-1 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                        >
                          <Calendar className="w-3.5 h-3.5" />
                          <span>Amortization Schedule</span>
                        </button>

                        <button
                          onClick={() => {
                            setReminderModalClient(client);
                            setReminderSentAlert(false);
                          }}
                          className="px-3 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 border border-amber-300 font-bold text-xs flex items-center gap-1 transition-colors"
                          title="Send SMS / Email Reminder"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>Remind</span>
                        </button>

                        <button
                          onClick={() => setSoaModalClient(client)}
                          className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs flex items-center gap-1 transition-colors"
                          title="Generate Statement of Account"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>SOA</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* TAB 3: ADD NEW CLIENT ON INSTALLMENT PLAN */}
      {activePortalTab === 'add_client' && (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-md max-w-3xl mx-auto animate-in fade-in duration-200">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-slate-900">
              Register New Client & Installment Agreement
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Set up flexible in-house installment contracts across Real Estate, Insurance, or Direct Sales packages with automatic amortization schedules.
            </p>
          </div>

          {formSavedAlert && (
            <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <div>
                <p className="font-bold text-sm">Client Installment Agreement Registered!</p>
                <p className="text-xs text-emerald-700">Redirecting to installment tracker...</p>
              </div>
            </div>
          )}

          <form onSubmit={handleAddNewClient} className="space-y-6">
            {/* Client Personal Info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Client Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rachel Sterling"
                  value={newClientName}
                  onChange={(e) => setNewClientName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="rachel@example.com"
                  value={newClientEmail}
                  onChange={(e) => setNewClientEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="+1 (555) 000-0000"
                  value={newClientPhone}
                  onChange={(e) => setNewClientPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            {/* Opportunity Vertical Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                Business Opportunity / Vertical *
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'real_estate', label: 'Real Estate Unit', icon: Building2 },
                  { id: 'insurance', label: 'Insurance Policy', icon: ShieldCheck },
                  { id: 'direct_selling', label: 'Direct Sales Package', icon: ShoppingBag },
                ].map((v) => {
                  const Icon = v.icon;
                  return (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setNewClientVertical(v.id as any)}
                      className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                        newClientVertical === v.id
                          ? 'bg-slate-900 text-amber-400 border-slate-900 shadow-sm'
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{v.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Item Title */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Asset Name / Description *
              </label>
              <input
                type="text"
                required
                placeholder={
                  newClientVertical === 'real_estate'
                    ? 'e.g. The Skyline Pinnacle Tower - Suite 22C'
                    : newClientVertical === 'insurance'
                    ? 'e.g. Apex Sovereign Wealth & Life VUL (₱1,500,000)'
                    : 'e.g. Executive Diamond Business Starter Kit'
                }
                value={newClientItem}
                onChange={(e) => setNewClientItem(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Financials & Terms */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Total Contract Price (₱) *</label>
                <input
                  type="number"
                  min={100}
                  value={newClientPrice}
                  onChange={(e) => setNewClientPrice(Number(e.target.value))}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-bold focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Down Payment (₱) *</label>
                <input
                  type="number"
                  min={0}
                  value={newClientDownPayment}
                  onChange={(e) => setNewClientDownPayment(Number(e.target.value))}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-bold focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Installment Term</label>
                <select
                  value={newClientTermMonths}
                  onChange={(e) => setNewClientTermMonths(Number(e.target.value))}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold focus:ring-2 focus:ring-emerald-500"
                >
                  <option value={6}>6 Months (Short Promo)</option>
                  <option value={12}>12 Months (1 Year)</option>
                  <option value={24}>24 Months (2 Years - 0% Int)</option>
                  <option value={36}>36 Months (3 Years)</option>
                  <option value={48}>48 Months (4 Years)</option>
                  <option value={60}>60 Months (5 Years)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Billing Frequency</label>
                <select
                  value={newClientFrequency}
                  onChange={(e) => setNewClientFrequency(e.target.value as any)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="Monthly">Monthly Installment</option>
                  <option value="Quarterly">Quarterly Installment</option>
                </select>
              </div>
            </div>

            {/* Live Calculation Preview */}
            <div className="p-4 rounded-xl bg-emerald-50/80 border border-emerald-200 flex flex-wrap items-center justify-between gap-4 text-xs">
              <div>
                <span className="text-emerald-800 font-bold uppercase tracking-wider block">
                  Calculated Monthly Amortization:
                </span>
                <span className="text-2xl font-extrabold text-emerald-900">
                  ₱{Math.round((newClientPrice - newClientDownPayment) / newClientTermMonths).toLocaleString()}
                </span>
                <span className="text-[11px] text-emerald-700 ml-1">/ month</span>
              </div>
              <div className="text-right text-emerald-900">
                <span className="block font-medium">
                  Total Principal to Amortize: ₱{(newClientPrice - newClientDownPayment).toLocaleString()}
                </span>
                <span className="block text-[11px] text-emerald-700">
                  Agent Est. Commission Yield: ~₱
                  {Math.round(
                    newClientPrice *
                      (newClientVertical === 'real_estate' ? 0.03 : newClientVertical === 'insurance' ? 0.12 : 0.25)
                  ).toLocaleString()}
                </span>
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Internal Contract Notes</label>
              <textarea
                rows={2}
                placeholder="e.g. Client requested payment reminders via SMS on the 10th of every month."
                value={newClientNotes}
                onChange={(e) => setNewClientNotes(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-400 font-extrabold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Save & Generate Installment Schedule</span>
            </button>
          </form>
        </div>
      )}

      {/* TAB: ONBOARD NEW MEMBER & ASSIGN MEMBERSHIP PACKAGE (ADMIN ONLY) */}
      {activePortalTab === 'add_member' && (
        !currentUser.isAdmin ? (
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-rose-200 text-center max-w-xl mx-auto shadow-sm space-y-4 my-8">
            <div className="w-16 h-16 rounded-3xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto border border-rose-200 shadow-inner">
              <Lock className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Administrator Authorization Required</h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              Security Notice: Regular members are not permitted to add or onboard new members. Only authorized NEXUS Administrators can enroll associates, assign package tiers, and issue login credentials.
            </p>
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-800 font-medium">
              Please request a System Administrator or switch to an Administrator profile (e.g. Master Admin) to enroll new associates.
            </div>
            <button
              onClick={() => setActivePortalTab('overview')}
              className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider"
            >
              Return to Dashboard
            </button>
          </div>
        ) : (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Header Banner */}
          <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold border border-cyan-500/30">
                <UserPlus className="w-3.5 h-3.5" />
                <span>Associate Onboarding & Package Assignment</span>
              </div>
              <h2 className="text-2xl font-extrabold tracking-tight">
                Enroll New Associate & Issue Login Credentials
              </h2>
              <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
                Choose the official membership package tier for your new team member, specify payment terms (Full vs 6-Month Amortization), and create their private Agent Code + Password so they can log into their personalized NEXUS dashboard immediately.
              </p>
            </div>

            <div className="flex gap-3">
              <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/60 text-center min-w-[120px]">
                <span className="text-[10px] text-cyan-400 uppercase font-bold block">Available Tiers</span>
                <span className="text-2xl font-extrabold text-white">4 Packages</span>
                <span className="text-[10px] text-slate-400 block">₱11,999 - ₱95,000</span>
              </div>
              <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/60 text-center min-w-[120px]">
                <span className="text-[10px] text-emerald-400 uppercase font-bold block">Direct Referral</span>
                <span className="text-2xl font-extrabold text-emerald-400">10% Cash</span>
                <span className="text-[10px] text-slate-400 block">Instant Wallet Credit</span>
              </div>
            </div>
          </div>

          {/* Success Box after creating a member */}
          {onboardSuccessMember && (
            <div className="bg-emerald-950/40 border-2 border-emerald-500 rounded-3xl p-6 sm:p-8 text-white space-y-4 animate-in zoom-in-95 duration-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-slate-950 flex items-center justify-center font-bold">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-emerald-300">
                    Member Account Created & Login Credentials Generated!
                  </h3>
                  <p className="text-xs text-slate-300">
                    {onboardSuccessMember.name} has been enrolled in the <span className="text-amber-400 font-bold">{onboardSuccessMember.packageName}</span> and registered into the NEXUS database.
                  </p>
                </div>
              </div>

              {/* Login Credentials Summary Card */}
              <div className="bg-slate-900/90 rounded-2xl p-5 border border-slate-800 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                <div>
                  <span className="text-slate-400 block uppercase font-bold text-[10px]">Member Name</span>
                  <span className="text-sm font-bold text-white">{onboardSuccessMember.name}</span>
                </div>
                <div>
                  <span className="text-slate-400 block uppercase font-bold text-[10px]">Agent Code (Login ID)</span>
                  <span className="text-sm font-mono font-bold text-amber-400">{onboardSuccessMember.agentCode}</span>
                </div>
                <div>
                  <span className="text-slate-400 block uppercase font-bold text-[10px]">Login Email</span>
                  <span className="text-sm font-bold text-white">{onboardSuccessMember.email}</span>
                </div>
                <div>
                  <span className="text-slate-400 block uppercase font-bold text-[10px]">Password</span>
                  <span className="text-sm font-mono font-bold text-cyan-400">{onboardSuccessMember.password}</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    const text = `NEXUS PORTAL LOGIN CREDENTIALS:\nName: ${onboardSuccessMember.name}\nAgent Code: ${onboardSuccessMember.agentCode}\nEmail: ${onboardSuccessMember.email}\nPassword: ${onboardSuccessMember.password}\nPackage: ${onboardSuccessMember.packageName}\nRole: ${onboardSuccessMember.role}\nWebsite: ${window.location.origin}`;
                    navigator.clipboard?.writeText(text);
                    setOnboardCopied(true);
                    setTimeout(() => setOnboardCopied(false), 2000);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-2 border border-slate-700"
                >
                  <Copy className="w-4 h-4 text-cyan-400" />
                  <span>{onboardCopied ? 'Credentials Copied to Clipboard!' : 'Copy Login Credentials'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onSwitchUser(onboardSuccessMember.id);
                    setActivePortalTab('overview');
                  }}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-emerald-500/20"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Log In As {onboardSuccessMember.name} Now</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setOnboardSuccessMember(null);
                    setOnboardName('');
                    setOnboardEmail('');
                    setOnboardAgentCode(`NX-${Math.floor(10000 + Math.random() * 90000)}`);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs"
                >
                  + Enroll Another Member
                </button>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleInPortalAddMember} className="space-y-8">
            {/* Step 1: Package Selection */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-cyan-600 text-white text-xs font-bold flex items-center justify-center">1</span>
                    <span>Select Membership Package Tier</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Choose the business package tier that matches the new associate's capital and desired commercial rights.
                  </p>
                </div>
                <span className="text-xs font-bold text-cyan-700 bg-cyan-50 px-3 py-1 rounded-full border border-cyan-200">
                  All packages in Philippine Peso (₱)
                </span>
              </div>

              {/* 4 Packages Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {MEMBERSHIP_PACKAGES.map((pkg) => {
                  const isSelected = onboardPkgId === pkg.id;
                  return (
                    <div
                      key={pkg.id}
                      onClick={() => setOnboardPkgId(pkg.id)}
                      className={`cursor-pointer rounded-2xl p-5 border-2 transition-all flex flex-col justify-between relative ${
                        isSelected
                          ? 'border-cyan-600 bg-cyan-50/50 shadow-md ring-2 ring-cyan-500/20'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      {pkg.featured && (
                        <span className="absolute -top-3 right-4 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-sm">
                          Most Popular
                        </span>
                      )}

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded border uppercase tracking-wider ${pkg.badgeColor}`}>
                            {pkg.initialRank}
                          </span>
                          <span className="text-[11px] font-bold text-slate-400">
                            {pkg.pointsValue} PV
                          </span>
                        </div>

                        <div>
                          <h4 className="font-bold text-sm text-slate-900 leading-snug">{pkg.name}</h4>
                          <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{pkg.tagline}</p>
                        </div>

                        <div className="pt-2 border-t border-slate-100">
                          <div className="flex items-baseline gap-1">
                            <span className="text-2xl font-extrabold text-slate-900">
                              ₱{pkg.price.toLocaleString()}
                            </span>
                            <span className="text-[10px] text-slate-500 font-semibold">one-time</span>
                          </div>
                          <p className="text-[10px] font-bold text-emerald-700 mt-0.5">
                            {pkg.installmentOption}
                          </p>
                        </div>

                        {/* Perks */}
                        <ul className="space-y-1.5 pt-2 text-[11px] text-slate-600">
                          {pkg.perks.slice(0, 3).map((perk, idx) => (
                            <li key={idx} className="flex items-start gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 shrink-0 mt-0.5" />
                              <span>{perk}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                        <span className={`font-bold ${isSelected ? 'text-cyan-700' : 'text-slate-500'}`}>
                          {isSelected ? '✓ Selected Tier' : 'Click to select'}
                        </span>
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                            isSelected ? 'border-cyan-600 bg-cyan-600 text-white' : 'border-slate-300'
                          }`}
                        >
                          {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Payment Scheme Selection */}
              <div className="pt-2">
                <label className="block text-xs font-bold text-slate-700 mb-2">Package Payment Scheme</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setOnboardPaymentType('Paid in Full')}
                    className={`p-3.5 rounded-xl border text-left flex items-start gap-3 transition-all ${
                      onboardPaymentType === 'Paid in Full'
                        ? 'border-emerald-500 bg-emerald-50/60 ring-2 ring-emerald-500/20'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="w-4 h-4 rounded-full border border-slate-300 mt-0.5 flex items-center justify-center">
                      {onboardPaymentType === 'Paid in Full' && <div className="w-2 h-2 rounded-full bg-emerald-600" />}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">Paid in Full (One-Time)</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Member settles full package price upfront. Instant full franchise & store margin activation.
                      </p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setOnboardPaymentType('Installment Plan')}
                    className={`p-3.5 rounded-xl border text-left flex items-start gap-3 transition-all ${
                      onboardPaymentType === 'Installment Plan'
                        ? 'border-blue-500 bg-blue-50/60 ring-2 ring-blue-500/20'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="w-4 h-4 rounded-full border border-slate-300 mt-0.5 flex items-center justify-center">
                      {onboardPaymentType === 'Installment Plan' && <div className="w-2 h-2 rounded-full bg-blue-600" />}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">6-Month Installment Scheme (0% Interest)</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Automatically tracked in the Client Installment Tracker with monthly due dates and amortization schedules.
                      </p>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Step 2: Member Personal Info & Private Login Credentials */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-cyan-600 text-white text-xs font-bold flex items-center justify-center">2</span>
                  <span>Member Identity & Login Credentials Setup</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Set up the credentials that allow this member to log in independently to their private Member Portal.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                {/* Full Name */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">
                    Associate Full Name *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="e.g. Gabriel Santos"
                      value={onboardName}
                      onChange={(e) => setOnboardName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-cyan-500 text-xs font-medium"
                    />
                  </div>
                </div>

                {/* Login Email */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">
                    Login Email Address *
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      placeholder="e.g. gabriel.santos@nexus.com"
                      value={onboardEmail}
                      onChange={(e) => setOnboardEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-cyan-500 text-xs font-medium"
                    />
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    Can be used together with password to sign in.
                  </span>
                </div>

                {/* Contact Phone */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">
                    Contact Mobile Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+63 9XX XXX XXXX"
                    value={onboardPhone}
                    onChange={(e) => setOnboardPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-cyan-500 text-xs font-medium"
                  />
                </div>

                {/* Agent Code */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1.5 flex items-center justify-between">
                    <span>Generated Agent Code (Login ID) *</span>
                    <button
                      type="button"
                      onClick={() => setOnboardAgentCode(`NX-${Math.floor(10000 + Math.random() * 90000)}`)}
                      className="text-[10px] text-cyan-600 hover:underline font-bold"
                    >
                      ↻ Regenerate Code
                    </button>
                  </label>
                  <input
                    type="text"
                    required
                    value={onboardAgentCode}
                    onChange={(e) => setOnboardAgentCode(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-cyan-500 font-mono font-bold text-amber-600 text-xs"
                  />
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    The official agent ID used for logging in, commission attribution, and replicated links.
                  </span>
                </div>

                {/* Login Password */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1.5 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-slate-400" />
                      <span>Member Login Password *</span>
                    </span>
                    <span className="text-[10px] text-emerald-600 font-semibold">Self-managed login</span>
                  </label>
                  <div className="relative">
                    <input
                      type={onboardShowPassword ? 'text' : 'password'}
                      required
                      placeholder="Enter login password"
                      value={onboardPassword}
                      onChange={(e) => setOnboardPassword(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-cyan-500 font-mono text-xs pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setOnboardShowPassword(!onboardShowPassword)}
                      className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                    >
                      {onboardShowPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <span className="text-[10px] text-slate-500 mt-1 block">
                    Default is <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-800">nexus123</code>. The member can use this password to access their portal anytime.
                  </span>
                </div>

                {/* Sponsor Attribution */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">
                    Assigned Mentorship Sponsor
                  </label>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-slate-900">{currentUser.name}</p>
                      <p className="text-[11px] text-slate-500 font-mono">{currentUser.agentCode} ({currentUser.rank})</p>
                    </div>
                    <span className="text-[10px] bg-cyan-100 text-cyan-800 font-bold px-2 py-0.5 rounded">
                      Direct Sponsor
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    You will receive 10% direct referral commission upon enrollment.
                  </span>
                </div>
              </div>

              {/* Admin Privileges Toggle (Only if current user is admin) */}
              {currentUser.isAdmin && (
                <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200 flex items-start gap-3 text-xs">
                  <input
                    type="checkbox"
                    id="onboardAdminCheck"
                    checked={onboardIsAdmin}
                    onChange={(e) => setOnboardIsAdmin(e.target.checked)}
                    className="mt-1 rounded text-purple-600 focus:ring-purple-500"
                  />
                  <div>
                    <label htmlFor="onboardAdminCheck" className="font-bold text-purple-950 cursor-pointer">
                      Grant System Administrator Authority
                    </label>
                    <p className="text-[11px] text-purple-700 mt-0.5">
                      Check this box ONLY if this user should have administrative rights to create and delete public Real Estate listings and Direct Selling store products.
                    </p>
                  </div>
                </div>
              )}

              {/* Submit CTA */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-slate-500">
                  <span>Selected Package: </span>
                  <span className="font-bold text-slate-900">
                    {MEMBERSHIP_PACKAGES.find((p) => p.id === onboardPkgId)?.name}
                  </span>
                  <span className="text-emerald-600 font-bold ml-1">
                    (₱{MEMBERSHIP_PACKAGES.find((p) => p.id === onboardPkgId)?.price.toLocaleString()})
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 hover:from-slate-800 hover:to-indigo-800 text-amber-400 font-extrabold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Enroll Associate & Issue Credentials</span>
                </button>
              </div>
            </div>
          </form>
        </div>
        )
      )}

      {/* TAB 4: TEAM & NETWORK DOWNLINE */}
      {activePortalTab === 'downline' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Mentorship Team & Downline Hierarchy</h3>
                <p className="text-xs text-slate-500">
                  Monitor group volume, rank progression, packages, and registered associates.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-lg bg-purple-50 text-purple-800 border border-purple-200 text-xs font-bold">
                  Group Volume: 54,200 GV
                </span>
                <span className="px-3 py-1 rounded-lg bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold">
                  Personal Volume: 1,200 PV
                </span>
                {currentUser.isAdmin && (
                  <button
                    onClick={() => setActivePortalTab('add_member')}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm"
                    title="Admin Privilege: Onboard new member"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>+ Onboard Associate / Choose Package</span>
                  </button>
                )}
              </div>
            </div>

            {/* Active Enrolled Network Associates & Passwords */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Registered Members Database ({allMembers.length} Accounts)
                </h4>
                <span className="text-[11px] text-slate-500">
                  Click 'Switch & Test Login' on any member to access their portal
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {allMembers.map((mem) => {
                  const isCurrent = mem.id === currentUser.id;
                  return (
                    <div
                      key={mem.id}
                      className={`p-4 rounded-2xl border transition-all ${
                        isCurrent
                          ? 'border-amber-400 bg-amber-50/30 shadow-sm'
                          : 'border-slate-200 bg-slate-50/50 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={mem.avatar}
                            alt={mem.name}
                            className="w-12 h-12 rounded-xl object-cover border border-slate-200"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <h5 className="font-bold text-sm text-slate-900">{mem.name}</h5>
                              {isCurrent && (
                                <span className="text-[10px] bg-amber-400 text-slate-950 font-bold px-1.5 py-0.5 rounded">
                                  Current User
                                </span>
                              )}
                              {mem.isAdmin && (
                                <span className="text-[10px] bg-purple-100 text-purple-800 font-bold px-1.5 py-0.5 rounded">
                                  Admin
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-slate-500">{mem.role}</p>
                          </div>
                        </div>

                        {/* Action buttons: Admin Edit & Switch Session */}
                        <div className="flex items-center gap-1.5 shrink-0">
                          {currentUser.isAdmin && (
                            <button
                              onClick={() => {
                                setMemberToEdit(mem);
                                setEditMemberModalOpen(true);
                              }}
                              className="px-2.5 py-1.5 rounded-lg bg-purple-100 hover:bg-purple-200 text-purple-900 font-bold text-[11px] transition-colors flex items-center gap-1 border border-purple-300 shadow-sm"
                              title="Admin Privilege: Edit member profile details and login credentials"
                            >
                              <Edit className="w-3 h-3 text-purple-700" />
                              <span>Edit</span>
                            </button>
                          )}

                          {!isCurrent && (
                            <button
                              onClick={() => onSwitchUser(mem.id)}
                              className="px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold text-[11px] transition-colors flex items-center gap-1 shadow-sm"
                              title="Switch to this user session"
                            >
                              <RefreshCw className="w-3 h-3" />
                              <span>Switch</span>
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Package & Credentials Info */}
                      <div className="mt-3 pt-3 border-t border-slate-200/80 grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-[10px] text-slate-400 block uppercase font-bold">Package Tier</span>
                          <span className="font-bold text-slate-900 line-clamp-1">
                            {mem.packageName || 'Silver Executive Business'}
                          </span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 block uppercase font-bold">Package Value</span>
                          <span className="font-bold text-emerald-600">
                            ₱{(mem.packagePrice || 19500).toLocaleString()} ({mem.paymentType || 'Paid in Full'})
                          </span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 block uppercase font-bold">Agent Code (Login)</span>
                          <span className="font-mono font-bold text-amber-600">{mem.agentCode}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 block uppercase font-bold">Login Password</span>
                          <span className="font-mono text-slate-700 bg-white px-1.5 py-0.5 rounded border border-slate-200 inline-block">
                            {mem.password || 'nexus123'}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Downline Tree visualization */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Active Organization Matrix Volume
              </h4>
              {[
                { name: 'Chloe Bennett', rank: 'Silver Director', team: 12, sales: '₱480,000', override: '₱24,000', level: 'Level 1 (Direct)' },
                { name: 'Dr. Raymond Scott', rank: 'Gold Executive', team: 18, sales: '₱920,000', override: '₱46,000', level: 'Level 1 (Direct)' },
                { name: 'Grace Lin', rank: 'Bronze Partner', team: 4, sales: '₱145,000', override: '₱7,250', level: 'Level 2' },
                { name: 'Liam Foster', rank: 'Bronze Partner', team: 2, sales: '₱92,000', override: '₱4,600', level: 'Level 2' },
              ].map((member, i) => (
                <div key={i} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-200 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-sm">
                      {member.name.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-slate-900">{member.name}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-800">
                          {member.rank}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500">{member.level} • Team Size: {member.team} Associates</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 text-xs">
                    <div>
                      <span className="text-slate-400 block">Team Turnover:</span>
                      <span className="font-bold text-slate-900">{member.sales}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Your Override Bonus:</span>
                      <span className="font-extrabold text-emerald-600">+{member.override}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: MARKETING & REFERRAL LINKS */}
      {activePortalTab === 'marketing' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-2">Replicated Referral & Affiliate Links</h3>
            <p className="text-xs text-slate-500 mb-6">
              Share these branded portals with clients. Any inquiry or installment purchase automatically attributes to your agent code ({currentUser.agentCode}).
            </p>

            <div className="space-y-4">
              {[
                { title: 'Real Estate Portfolio Portal', url: `https://nexus.com/properties?ref=${currentUser.agentCode}`, tag: 'Real Estate' },
                { title: 'Insurance & VUL Quote Generator', url: `https://nexus.com/insurance?ref=${currentUser.agentCode}`, tag: 'Insurance' },
                { title: 'Direct Selling Consumer Store', url: `https://nexus.com/store?ref=${currentUser.agentCode}`, tag: 'Direct Sales' },
                { title: 'Mentorship & Partner Recruitment Form', url: `https://nexus.com/join?sponsor=${currentUser.agentCode}`, tag: 'Networking' },
              ].map((link, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900">{link.title}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-200 text-slate-700 font-semibold">
                        {link.tag}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 font-mono mt-1 break-all">{link.url}</p>
                  </div>

                  <button
                    onClick={() => copyReferralLink(link.url, `link-${idx}`)}
                    className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold text-xs flex items-center gap-1.5 transition-colors shrink-0"
                  >
                    {copiedLink === `link-${idx}` ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Link Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Link</span>
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: ADMIN INVENTORY & LISTINGS CONSOLE (EXCLUSIVE TO ADMINISTRATORS) */}
      {activePortalTab === 'admin_catalog' && currentUser.isAdmin && (
        <div className="space-y-8 animate-in fade-in duration-200">
          {/* Admin Authority Banner */}
          <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white border border-purple-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold border border-purple-500/30">
                <Crown className="w-4 h-4 text-amber-300" />
                <span>NEXUS Administrator Exclusive Hub</span>
              </div>
              <h2 className="text-2xl font-extrabold tracking-tight">
                Catalog & Public Directory Authority
              </h2>
              <p className="text-xs text-purple-200 max-w-xl leading-relaxed">
                As a designated System Administrator ({currentUser.name}), you have sole authority to create, publish, and delete official Real Estate listings and Direct Selling products. Regular members and clients can view and sell, but cannot modify the master catalog.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <div className="bg-purple-900/40 p-4 rounded-2xl border border-purple-700/60 text-center min-w-[110px]">
                <span className="text-[10px] text-purple-300 uppercase font-bold block">Properties</span>
                <span className="text-2xl font-extrabold text-white">{listings.length}</span>
                <span className="text-[10px] text-purple-300 block">Active Listings</span>
              </div>
              <div className="bg-purple-900/40 p-4 rounded-2xl border border-purple-700/60 text-center min-w-[110px]">
                <span className="text-[10px] text-purple-300 uppercase font-bold block">Products</span>
                <span className="text-2xl font-extrabold text-white">{products.length}</span>
                <span className="text-[10px] text-purple-300 block">Active Items</span>
              </div>
              <div className="bg-purple-900/40 p-4 rounded-2xl border border-purple-700/60 text-center min-w-[110px]">
                <span className="text-[10px] text-purple-300 uppercase font-bold block">Insurance</span>
                <span className="text-2xl font-extrabold text-white">{insurancePlans.length}</span>
                <span className="text-[10px] text-purple-300 block">Active Plans</span>
              </div>
            </div>
          </div>

          {/* Section Switcher */}
          <div className="flex flex-wrap gap-3 border-b border-slate-200 pb-3">
            <button
              onClick={() => setAdminSection('real_estate')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                adminSection === 'real_estate'
                  ? 'bg-slate-900 text-cyan-400 shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Real Estate Listings ({listings.length})</span>
            </button>
            <button
              onClick={() => setAdminSection('products')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                adminSection === 'products'
                  ? 'bg-slate-900 text-cyan-400 shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Direct Selling Products ({products.length})</span>
            </button>
            <button
              onClick={() => setAdminSection('insurance')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                adminSection === 'insurance'
                  ? 'bg-slate-900 text-cyan-400 shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Prepaid Life Plans ({insurancePlans.length})</span>
            </button>
          </div>

          {/* SUB-SECTION 1: REAL ESTATE LISTINGS ENTRY & MANAGEMENT */}
          {adminSection === 'real_estate' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column: Entry Form */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b pb-3">
                  <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                    <Plus className="w-4 h-4 text-purple-600" />
                    <span>Enter Real Estate Listing</span>
                  </h3>
                  <span className="text-[10px] bg-purple-100 text-purple-800 font-bold px-2 py-0.5 rounded">
                    Admin Form
                  </span>
                </div>

                {adminRESuccess && (
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Listing successfully published to NEXUS!</span>
                  </div>
                )}

                <form onSubmit={handleAdminAddRealEstate} className="space-y-3.5 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Property Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. NEXUS Skyrise Tower - Penthouse 14"
                      value={adminRETitle}
                      onChange={(e) => setAdminRETitle(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Category</label>
                      <select
                        value={adminRECategory}
                        onChange={(e) => setAdminRECategory(e.target.value as any)}
                        className="w-full p-2 rounded-xl border border-slate-200 font-medium"
                      >
                        <option value="Condominium">Condominium</option>
                        <option value="Luxury Villa">Luxury Villa</option>
                        <option value="Townhouse">Townhouse</option>
                        <option value="Commercial Space">Commercial Space</option>
                        <option value="Subdivision Lot">Subdivision Lot</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Location *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Marina Bay, Tower 2"
                        value={adminRELocation}
                        onChange={(e) => setAdminRELocation(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Price (₱) *</label>
                      <input
                        type="number"
                        min={10000}
                        value={adminREPrice}
                        onChange={(e) => setAdminREPrice(Number(e.target.value))}
                        className="w-full p-1.5 rounded-lg border border-slate-200 font-bold"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">DP %</label>
                      <input
                        type="number"
                        min={5}
                        max={50}
                        value={adminREDownPayment}
                        onChange={(e) => setAdminREDownPayment(Number(e.target.value))}
                        className="w-full p-1.5 rounded-lg border border-slate-200 font-bold"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Term (Mo)</label>
                      <select
                        value={adminRETermMonths}
                        onChange={(e) => setAdminRETermMonths(Number(e.target.value))}
                        className="w-full p-1.5 rounded-lg border border-slate-200 font-bold"
                      >
                        <option value={24}>24 mo</option>
                        <option value={36}>36 mo</option>
                        <option value={48}>48 mo</option>
                        <option value={60}>60 mo</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Beds</label>
                      <input
                        type="number"
                        value={adminREBeds}
                        onChange={(e) => setAdminREBeds(Number(e.target.value))}
                        className="w-full p-1.5 rounded-lg border border-slate-200"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Baths</label>
                      <input
                        type="number"
                        step={0.5}
                        value={adminREBaths}
                        onChange={(e) => setAdminREBaths(Number(e.target.value))}
                        className="w-full p-1.5 rounded-lg border border-slate-200"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Sqm</label>
                      <input
                        type="number"
                        value={adminREArea}
                        onChange={(e) => setAdminREArea(Number(e.target.value))}
                        className="w-full p-1.5 rounded-lg border border-slate-200"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-purple-700 hover:bg-purple-600 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
                  >
                    + Publish Listing (Admin Only)
                  </button>
                </form>
              </div>

              {/* Right Column: Existing Real Estate Listings Table */}
              <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b pb-3">
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">Active Real Estate Catalog</h3>
                    <p className="text-xs text-slate-500">
                      Total {listings.length} verified listings visible to public visitors and agents.
                    </p>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider">
                        <th className="pb-3">Property</th>
                        <th className="pb-3">Category</th>
                        <th className="pb-3">Price</th>
                        <th className="pb-3">Installment</th>
                        <th className="pb-3 text-right">Admin Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                      {listings.map((l) => (
                        <tr key={l.id} className="hover:bg-slate-50/60">
                          <td className="py-3">
                            <div className="flex items-center gap-3">
                              <img src={l.imageUrl} alt={l.title} className="w-12 h-10 object-cover rounded-lg border" />
                              <div>
                                <p className="font-bold text-slate-900 line-clamp-1">{l.title}</p>
                                <p className="text-[11px] text-slate-400">{l.location}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3">
                            <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-800 text-[11px]">
                              {l.category}
                            </span>
                          </td>
                          <td className="py-3 font-bold text-slate-900">
                            ₱{l.price.toLocaleString()}
                          </td>
                          <td className="py-3 text-cyan-700 font-semibold">
                            ₱{l.monthlyInstallmentEstimate.toLocaleString()}/mo ({l.termMonths}m)
                          </td>
                          <td className="py-3 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                type="button"
                                onClick={() => {
                                  setListingToEdit(l);
                                  setListingModalOpen(true);
                                }}
                                className="p-1.5 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors"
                                title="Admin Privilege: Edit property listing"
                              >
                                <Edit className="w-3.5 h-3.5" />
                              </button>
                              {onDeleteListing && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    if (confirm(`Admin confirmation: Delete "${l.title}"?`)) {
                                      onDeleteListing(l.id);
                                    }
                                  }}
                                  className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                                  title="Admin Privilege: Delete listing"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* SUB-SECTION 2: DIRECT SELLING PRODUCTS ENTRY & MANAGEMENT */}
          {adminSection === 'products' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column: Product Entry Form */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b pb-3">
                  <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                    <Plus className="w-4 h-4 text-purple-600" />
                    <span>Enter Direct Selling Product</span>
                  </h3>
                  <span className="text-[10px] bg-purple-100 text-purple-800 font-bold px-2 py-0.5 rounded">
                    Admin Form
                  </span>
                </div>

                {adminProdSuccess && (
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Product successfully published to Store!</span>
                  </div>
                )}

                <form onSubmit={handleAdminAddProduct} className="space-y-3.5 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Product Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. NEXUS BioMarine Collagen"
                      value={adminProdName}
                      onChange={(e) => setAdminProdName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Category</label>
                    <select
                      value={adminProdCategory}
                      onChange={(e) => setAdminProdCategory(e.target.value as any)}
                      className="w-full p-2 rounded-xl border border-slate-200 font-medium"
                    >
                      <option value="Wellness & Nutrition">Wellness & Nutrition</option>
                      <option value="Premium Skincare">Premium Skincare</option>
                      <option value="Home & Living">Home & Living</option>
                      <option value="Daily Essentials">Daily Essentials</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Retail (₱)</label>
                      <input
                        type="number"
                        min={1}
                        value={adminProdRetail}
                        onChange={(e) => setAdminProdRetail(Number(e.target.value))}
                        className="w-full p-1.5 rounded-lg border border-slate-200 font-bold"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Member (₱)</label>
                      <input
                        type="number"
                        min={1}
                        value={adminProdMember}
                        onChange={(e) => setAdminProdMember(Number(e.target.value))}
                        className="w-full p-1.5 rounded-lg border border-slate-200 font-bold"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Points (PV)</label>
                      <input
                        type="number"
                        min={0}
                        value={adminProdPV}
                        onChange={(e) => setAdminProdPV(Number(e.target.value))}
                        className="w-full p-1.5 rounded-lg border border-slate-200 font-bold"
                      />
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-800 text-[11px] font-semibold">
                    Member Retail Margin: ₱{(adminProdRetail - adminProdMember).toLocaleString()} ({adminProdRetail > 0 ? Math.round(((adminProdRetail - adminProdMember) / adminProdRetail) * 100) : 0}%)
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-purple-700 hover:bg-purple-600 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
                  >
                    + Publish Product (Admin Only)
                  </button>
                </form>
              </div>

              {/* Right Column: Existing Products Table */}
              <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b pb-3">
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">Active Direct Store Catalog</h3>
                    <p className="text-xs text-slate-500">
                      Total {products.length} consumer products published by NEXUS Admin.
                    </p>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider">
                        <th className="pb-3">Product Name</th>
                        <th className="pb-3">Category</th>
                        <th className="pb-3">Retail Price</th>
                        <th className="pb-3">Member Price</th>
                        <th className="pb-3 text-right">Admin Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                      {products.map((p) => (
                        <tr key={p.id} className="hover:bg-slate-50/60">
                          <td className="py-3">
                            <div className="flex items-center gap-3">
                              <img src={p.imageUrl} alt={p.name} className="w-10 h-10 object-cover rounded-lg border" />
                              <div>
                                <p className="font-bold text-slate-900 line-clamp-1">{p.name}</p>
                                <p className="text-[11px] text-slate-400">{p.pointsValue} PV</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3">
                            <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-800 text-[11px]">
                              {p.category}
                            </span>
                          </td>
                          <td className="py-3 font-bold text-slate-900">
                            ₱{p.retailPrice.toLocaleString()}
                          </td>
                          <td className="py-3 text-emerald-600 font-bold">
                            ₱{p.memberPrice.toLocaleString()}
                          </td>
                          <td className="py-3 text-right">
                            {onDeleteProduct && (
                              <button
                                onClick={() => {
                                  if (confirm(`Admin confirmation: Delete product "${p.name}"?`)) {
                                    onDeleteProduct(p.id);
                                  }
                                }}
                                className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                                title="Delete product"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* SUB-SECTION 3: PREPAID MEMORIAL LIFE PLANS ENTRY & MANAGEMENT */}
          {adminSection === 'insurance' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-700 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <span>Prepaid Memorial Life Plans & Life Insurance</span>
                      <span className="text-[10px] bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded-full border border-amber-300">
                        100% Trust-Fund Protected
                      </span>
                    </h4>
                    <p className="text-xs text-amber-950 font-medium italic mt-1 leading-relaxed">
                      "Life plan offers quality prepaid memorial plans, trusted by millions of Filipinos. Planning ahead is an act of love. Get our licensed, trust-fund protected life plans."
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setPlanToEdit(null);
                    setInsuranceModalOpen(true);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-md shadow-amber-600/20 shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Add Life Plan (Admin Only)</span>
                </button>
              </div>

              {/* Plans Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider">
                      <th className="pb-3">Memorial Life Plan</th>
                      <th className="pb-3">Type</th>
                      <th className="pb-3">Benefit / Service Value</th>
                      <th className="pb-3">5-Yr Installment</th>
                      <th className="pb-3">Flexible Terms</th>
                      <th className="pb-3 text-right">Admin Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                    {insurancePlans.map((plan) => (
                      <tr key={plan.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-4">
                          <div>
                            <span className="font-bold text-slate-900 text-sm">{plan.title}</span>
                            <div className="flex items-center gap-2 mt-0.5">
                              {plan.tag && (
                                <span className="text-[10px] bg-amber-50 text-amber-800 border border-amber-200 font-bold px-1.5 py-0.5 rounded">
                                  {plan.tag}
                                </span>
                              )}
                              <span className="text-[11px] text-slate-400 font-mono">
                                Coverage: {plan.protectionPeriod}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{plan.summary}</p>
                          </div>
                        </td>
                        <td className="py-4">
                          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-100 text-slate-800">
                            {plan.type}
                          </span>
                        </td>
                        <td className="py-4">
                          <span className="font-extrabold text-slate-900 text-sm">
                            ₱{plan.coverageAmount.toLocaleString()}
                          </span>
                          <span className="text-[10px] text-slate-400 block font-normal">Package Value</span>
                        </td>
                        <td className="py-4">
                          <span className="font-bold text-amber-700 text-sm">
                            ₱{plan.minMonthlyPremium.toLocaleString()}
                          </span>
                          <span className="text-[11px] text-slate-400 block">
                            /month (5 years)
                          </span>
                        </td>
                        <td className="py-4">
                          {plan.installmentTerms && plan.installmentTerms.length > 0 ? (
                            <span className="text-xs font-semibold text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200 inline-block">
                              {plan.installmentTerms.join(' • ')}
                            </span>
                          ) : (
                            <span className="text-xs text-slate-400">Monthly / Quarterly / Spot Cash</span>
                          )}
                        </td>
                        <td className="py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                setPlanToEdit(plan);
                                setInsuranceModalOpen(true);
                              }}
                              className="px-2.5 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center gap-1 border border-indigo-200 transition-colors"
                              title="Admin: Edit Plan"
                            >
                              <Edit className="w-3.5 h-3.5" />
                              <span>Edit</span>
                            </button>
                            {onDeleteInsurancePlan && (
                              <button
                                type="button"
                                onClick={() => {
                                  if (confirm(`Admin confirmation: Are you sure you want to delete "${plan.title}"?`)) {
                                    onDeleteInsurancePlan(plan.id);
                                  }
                                }}
                                className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors"
                                title="Admin: Delete Plan"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* MODAL 1: INSTALLMENT AMORTIZATION SCHEDULE */}
      {scheduleModalClient && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full border border-slate-200 shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
            <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
              <div>
                <span className="text-xs uppercase font-bold text-amber-400 font-mono">
                  {scheduleModalClient.contractCode}
                </span>
                <h3 className="text-lg font-bold">{scheduleModalClient.clientName} - Amortization Schedule</h3>
                <p className="text-xs text-slate-400">{scheduleModalClient.itemName}</p>
              </div>
              <button
                onClick={() => setScheduleModalClient(null)}
                className="p-2 rounded-full bg-slate-800 text-slate-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1 space-y-4">
              <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                <div>
                  <span className="text-slate-400 block">Total Contract:</span>
                  <span className="font-extrabold text-slate-900 text-sm">
                    ₱{scheduleModalClient.totalContractValue.toLocaleString()}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block">Down Payment Paid:</span>
                  <span className="font-extrabold text-slate-900 text-sm">
                    ₱{scheduleModalClient.downPayment.toLocaleString()}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block">Per Term Installment:</span>
                  <span className="font-extrabold text-emerald-600 text-sm">
                    ₱{scheduleModalClient.installmentAmount.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider">
                      <th className="pb-2.5">Cycle #</th>
                      <th className="pb-2.5">Due Date</th>
                      <th className="pb-2.5">Amount Due</th>
                      <th className="pb-2.5">Status</th>
                      <th className="pb-2.5">Receipt #</th>
                      <th className="pb-2.5 text-right">Payment Method</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                    {scheduleModalClient.schedule.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50">
                        <td className="py-2.5 font-bold">Month {item.installmentNumber}</td>
                        <td className="py-2.5">{item.dueDate}</td>
                        <td className="py-2.5 font-extrabold text-slate-900">
                          ₱{item.amount.toLocaleString()}
                        </td>
                        <td className="py-2.5">
                          {item.status === 'paid' ? (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                              ✓ Paid on {item.paidDate}
                            </span>
                          ) : item.status === 'overdue' ? (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-50 text-red-700 border border-red-200">
                              Overdue
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600">
                              Pending Due
                            </span>
                          )}
                        </td>
                        <td className="py-2.5 font-mono text-[11px] text-slate-500">
                          {item.receiptNumber || '—'}
                        </td>
                        <td className="py-2.5 text-right text-slate-600">
                          {item.paymentMethod || '—'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setScheduleModalClient(null)}
                className="px-5 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs"
              >
                Close Schedule
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: RECORD PAYMENT */}
      {recordPaymentClient && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-lg">Record Installment Payment</h3>
                <p className="text-xs text-slate-500">
                  Client: {recordPaymentClient.clientName} ({recordPaymentClient.contractCode})
                </p>
              </div>
              <button
                onClick={() => setRecordPaymentClient(null)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 space-y-1">
              <div className="flex justify-between font-bold">
                <span>Cycle Number:</span>
                <span>Installment #{recordPaymentClient.paidInstallments + 1} of {recordPaymentClient.totalInstallments}</span>
              </div>
              <div className="flex justify-between font-extrabold text-base text-emerald-800">
                <span>Amount Due:</span>
                <span>₱{recordPaymentClient.installmentAmount.toLocaleString()}</span>
              </div>
              <p className="text-[11px] text-emerald-700 pt-1 border-t border-emerald-200">
                Logging this payment will automatically credit your wallet with expected commission and update client standing to Up-to-Date.
              </p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Payment Method</label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="Bank Transfer">Direct Bank Wire / ACH</option>
                  <option value="Credit Card">Credit / Debit Card</option>
                  <option value="Cash Deposit">Branch Cash Deposit</option>
                  <option value="Manager Cheque">Post-Dated Cheque (Cleared)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Receipt / Ref Code</label>
                <input
                  type="text"
                  value={paymentReference}
                  onChange={(e) => setPaymentReference(e.target.value)}
                  placeholder="e.g. TRX-992140"
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-mono focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => setRecordPaymentClient(null)}
                className="flex-1 py-2.5 rounded-xl text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmRecordPayment}
                className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider"
              >
                Confirm Payment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: PAYMENT REMINDER DISPATCH */}
      {reminderModalClient && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-lg">Send Payment Reminder</h3>
                <p className="text-xs text-slate-500">
                  Notify {reminderModalClient.clientName} of their upcoming or overdue installment.
                </p>
              </div>
              <button
                onClick={() => setReminderModalClient(null)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Channel Switch */}
            <div className="grid grid-cols-3 gap-2">
              {(['sms', 'email', 'whatsapp'] as const).map((ch) => (
                <button
                  key={ch}
                  onClick={() => setReminderChannel(ch)}
                  className={`py-2 rounded-xl text-xs font-bold uppercase transition-all ${
                    reminderChannel === ch
                      ? 'bg-slate-900 text-amber-400 shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {ch}
                </button>
              ))}
            </div>

            {/* Message Preview Box */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-700 leading-relaxed">
              <p className="font-bold text-slate-900 mb-1">
                To: {reminderChannel === 'email' ? reminderModalClient.clientEmail : reminderModalClient.clientPhone}
              </p>
              <p>
                "Hello {reminderModalClient.clientName}, this is a friendly notice from NEXUS regarding contract #{reminderModalClient.contractCode} ({reminderModalClient.itemName}).
              </p>
              <p className="mt-2">
                Your monthly installment of <span className="font-bold">₱{reminderModalClient.installmentAmount.toLocaleString()}</span> is due on <span className="font-bold">{reminderModalClient.nextDueDate}</span>.
              </p>
              <p className="mt-2">
                To pay conveniently or view your amortization ledger, visit: https://nexus.com/pay/{reminderModalClient.contractCode}
              </p>
              <p className="mt-2 text-slate-400">— Advisor {currentUser.name} ({currentUser.agentCode})"</p>
            </div>

            {reminderSentAlert ? (
              <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-800 text-xs font-bold text-center">
                ✓ Reminder sent successfully to client via {reminderChannel.toUpperCase()}!
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    navigator.clipboard?.writeText(
                      `Hello ${reminderModalClient.clientName}, your installment of ₱${reminderModalClient.installmentAmount.toLocaleString()} for ${reminderModalClient.contractCode} is due on ${reminderModalClient.nextDueDate}. Pay at https://nexus.com/pay/${reminderModalClient.contractCode}`
                    );
                    alert('Reminder text copied to clipboard!');
                  }}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 font-bold text-xs flex items-center justify-center gap-1.5"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Text</span>
                </button>

                <button
                  onClick={() => {
                    setReminderSentAlert(true);
                    setTimeout(() => {
                      setReminderSentAlert(false);
                      setReminderModalClient(null);
                    }, 1400);
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Dispatch Now</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL 4: STATEMENT OF ACCOUNT (SOA) */}
      {soaModalClient && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-6 my-8">
            <div className="flex items-center justify-between border-b pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-950 text-amber-400 font-bold flex items-center justify-center">
                  AP
                </div>
                <div>
                  <h2 className="font-extrabold text-slate-900 text-lg">STATEMENT OF ACCOUNT</h2>
                  <p className="text-[11px] text-slate-400">NEXUS Holdings & Financial Services</p>
                </div>
              </div>
              <button
                onClick={() => setSoaModalClient(null)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <p className="text-slate-400 uppercase font-bold text-[10px]">Client Details:</p>
                <p className="font-bold text-slate-900 text-sm mt-0.5">{soaModalClient.clientName}</p>
                <p className="text-slate-600">{soaModalClient.clientEmail}</p>
                <p className="text-slate-600">{soaModalClient.clientPhone}</p>
              </div>
              <div className="text-right">
                <p className="text-slate-400 uppercase font-bold text-[10px]">Contract Reference:</p>
                <p className="font-mono font-bold text-slate-900 text-sm mt-0.5">{soaModalClient.contractCode}</p>
                <p className="text-slate-600">Managing Agent: {currentUser.name}</p>
                <p className="text-slate-600">Generated: {new Date().toLocaleDateString()}</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-600">Asset / Property / Policy:</span>
                <span className="font-bold text-slate-900">{soaModalClient.itemName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Total Contract Value:</span>
                <span className="font-bold text-slate-900">₱{soaModalClient.totalContractValue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Down Payment Remitted:</span>
                <span className="font-bold text-slate-900">₱{soaModalClient.downPayment.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Total Installments Completed:</span>
                <span className="font-bold text-emerald-600">
                  {soaModalClient.paidInstallments} of {soaModalClient.totalInstallments}
                </span>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-2 font-bold text-slate-900 text-sm">
                <span>Remaining Amortization Balance:</span>
                <span className="text-amber-600">
                  ₱{Math.max(
                    0,
                    soaModalClient.totalContractValue -
                      (soaModalClient.downPayment + soaModalClient.paidInstallments * soaModalClient.installmentAmount)
                  ).toLocaleString()}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <span className="text-xs text-slate-400">Official certified corporate copy</span>
              <button
                onClick={() => alert('Statement of Account printed / downloaded as PDF.')}
                className="px-5 py-2.5 rounded-xl bg-slate-900 text-amber-400 font-bold text-xs flex items-center gap-2 hover:bg-slate-800"
              >
                <Printer className="w-4 h-4" />
                <span>Print / Download SOA</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 5: WALLET PAYOUT WITHDRAWAL */}
      {payoutModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-lg">Withdraw Commission Earnings</h3>
                <p className="text-xs text-slate-500">
                  Available Wallet Balance: <span className="text-emerald-600 font-bold">₱{currentUser.walletBalance.toLocaleString()}</span>
                </p>
              </div>
              <button
                onClick={() => setPayoutModalOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {payoutSuccess ? (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-sm text-emerald-900">Withdrawal Initiated!</h4>
                <p className="text-xs text-emerald-700">
                  ₱{payoutAmount.toLocaleString()} has been queued for payout to your registered bank account.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Withdrawal Amount (₱)</label>
                  <input
                    type="number"
                    max={currentUser.walletBalance}
                    min={500}
                    value={payoutAmount}
                    onChange={(e) => setPayoutAmount(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-sm font-bold focus:ring-2 focus:ring-emerald-500"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                    <span>Min: ₱500</span>
                    <button
                      type="button"
                      onClick={() => setPayoutAmount(currentUser.walletBalance)}
                      className="text-emerald-600 font-bold hover:underline"
                    >
                      Withdraw Max (₱{currentUser.walletBalance.toLocaleString()})
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Transfer Destination</label>
                  <select
                    value={payoutMethodChoice}
                    onChange={(e) => setPayoutMethodChoice(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="BDO Unibank Direct">BDO Unibank Direct Deposit (***8910)</option>
                    <option value="BPI Express Online">Bank of the Philippine Islands (BPI)</option>
                    <option value="Metrobank Direct">Metropolitan Bank & Trust Co. (Metrobank)</option>
                    <option value="GCash / Maya">GCash / Maya Instant E-Wallet Push</option>
                  </select>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-600">
                  ℹ Regular payouts process within 24 business hours. No disbursement fee applied for active partners.
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <button
                    onClick={() => setPayoutModalOpen(false)}
                    className="flex-1 py-2.5 rounded-xl text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleRequestPayout}
                    className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider"
                  >
                    Confirm Payout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL 6: CHANGE AVATAR / PROFILE PICTURE */}
      <ChangeAvatarModal
        isOpen={avatarModalOpen}
        onClose={() => setAvatarModalOpen(false)}
        currentAvatar={currentUser.avatar}
        memberName={currentUser.name}
        onSaveAvatar={(newAvatarUrl) => {
          const updated: MemberProfile = {
            ...currentUser,
            avatar: newAvatarUrl,
          };
          if (onSaveMemberDetails) {
            onSaveMemberDetails(updated);
          } else {
            onUpdateMember(updated);
          }
          setAvatarModalOpen(false);
        }}
      />

      {/* MODAL 7: ADMIN EDIT MEMBER PROFILE & LOGIN CREDENTIALS */}
      <EditMemberModal
        isOpen={editMemberModalOpen}
        onClose={() => {
          setEditMemberModalOpen(false);
          setMemberToEdit(null);
        }}
        member={memberToEdit}
        onSaveMember={(updated) => {
          if (onSaveMemberDetails) {
            onSaveMemberDetails(updated);
          } else {
            onUpdateMember(updated);
          }
          setEditMemberModalOpen(false);
          setMemberToEdit(null);
        }}
      />

      {/* MODAL 8: ADMIN ADD & EDIT INSURANCE PLANS */}
      <AddEditInsuranceModal
        isOpen={insuranceModalOpen}
        onClose={() => {
          setInsuranceModalOpen(false);
          setPlanToEdit(null);
        }}
        initialPlan={planToEdit}
        onSave={(savedPlan) => {
          if (planToEdit && onUpdateInsurancePlan) {
            onUpdateInsurancePlan(savedPlan);
          } else if (onAddInsurancePlan) {
            onAddInsurancePlan(savedPlan);
          }
          setInsuranceModalOpen(false);
          setPlanToEdit(null);
        }}
      />

      {/* MODAL 9: ADMIN ADD & EDIT REAL ESTATE LISTING */}
      <AddEditListingModal
        isOpen={listingModalOpen}
        onClose={() => {
          setListingModalOpen(false);
          setListingToEdit(null);
        }}
        editingListing={listingToEdit}
        onSave={(saved) => {
          if (listingToEdit && onUpdateListing) {
            onUpdateListing(saved);
          } else if (onAddListing) {
            onAddListing(saved);
          }
          setListingModalOpen(false);
          setListingToEdit(null);
        }}
      />
    </div>
  );
};
