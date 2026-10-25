/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AboutSection } from './components/AboutSection';
import { RealEstatePage } from './components/RealEstatePage';
import { InsurancePage } from './components/InsurancePage';
import { DirectSellingPage } from './components/DirectSellingPage';
import { NetworkingPage } from './components/NetworkingPage';
import { MemberPortal } from './components/MemberPortal';
import { LoginModal } from './components/LoginModal';
import { ContactModal } from './components/ContactModal';
import { AddMemberModal } from './components/AddMemberModal';

import {
  INITIAL_MEMBER_PROFILES,
  REAL_ESTATE_LISTINGS,
  INSURANCE_PLANS,
  DIRECT_SELLING_PRODUCTS,
  NETWORK_TIERS,
  INITIAL_CLIENT_INSTALLMENTS,
  INITIAL_TRANSACTIONS,
} from './data/mockData';
import {
  MemberProfile,
  ClientInstallmentRecord,
  EarningTransaction,
  RealEstateListing,
  DirectSellingProduct,
  InsurancePlan
} from './types';
import { Briefcase, CreditCard, Sparkles, UserCheck, Crown, UserPlus } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('about');
  
  // Initialize members with localStorage cache if available
  const [members, setMembers] = useState<MemberProfile[]>(() => {
    try {
      const saved = localStorage.getItem('nexus_members_db');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      // fallback
    }
    return INITIAL_MEMBER_PROFILES;
  });

  // Default to Alexander Cole (Master Admin) so the admin listing & product entry feature is directly visible!
  const [currentUser, setCurrentUser] = useState<MemberProfile | null>(() => members[0] || INITIAL_MEMBER_PROFILES[0]);
  
  // Real Estate listings state (editable and deletable by Admin)
  const [listings, setListings] = useState<RealEstateListing[]>(() => {
    try {
      const saved = localStorage.getItem('nexus_listings_db');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    return REAL_ESTATE_LISTINGS;
  });

  // Sync listings to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('nexus_listings_db', JSON.stringify(listings));
    } catch (e) {}
  }, [listings]);

  // Direct Selling products state (editable only by Admin)
  const [products, setProducts] = useState<DirectSellingProduct[]>(DIRECT_SELLING_PRODUCTS);

  // Insurance Plans state (licensed prepaid memorial life plans, editable and deletable by Admin)
  const [insurancePlans, setInsurancePlans] = useState<InsurancePlan[]>(() => {
    try {
      const saved = localStorage.getItem('nexus_insurance_db');
      if (saved) {
        const parsed = JSON.parse(saved);
        // If saved records contain old health/critical illness types, refresh to authentic prepaid memorial life plans
        if (
          Array.isArray(parsed) &&
          parsed.length > 0 &&
          !parsed.some((p: any) => p.type === 'Critical Illness' || p.type === 'Life & Health')
        ) {
          return parsed;
        }
      }
    } catch (e) {}
    return INSURANCE_PLANS;
  });

  // Sync insurance plans to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('nexus_insurance_db', JSON.stringify(insurancePlans));
    } catch (e) {}
  }, [insurancePlans]);

  const [clients, setClients] = useState<ClientInstallmentRecord[]>(INITIAL_CLIENT_INSTALLMENTS);
  const [transactions, setTransactions] = useState<EarningTransaction[]>(INITIAL_TRANSACTIONS);

  const [loginModalOpen, setLoginModalOpen] = useState<boolean>(false);
  const [contactModalOpen, setContactModalOpen] = useState<boolean>(false);
  const [addMemberModalOpen, setAddMemberModalOpen] = useState<boolean>(false);

  // Sync members to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('nexus_members_db', JSON.stringify(members));
    } catch (e) {}
  }, [members]);

  const handleSwitchUser = (memberId: string) => {
    const found = members.find((m) => m.id === memberId);
    if (found) setCurrentUser(found);
  };

  const handleUpdateMember = (updated: MemberProfile) => {
    setCurrentUser(updated);
    setMembers(members.map((m) => (m.id === updated.id ? updated : m)));
  };

  const handleAddTransaction = (newTx: EarningTransaction) => {
    setTransactions([newTx, ...transactions]);
  };

  // Add Member feature with Package Assignment & Login Credentials
  const handleAddMember = (newMember: MemberProfile, switchImmediately = false) => {
    const updatedMembers = [newMember, ...members];
    setMembers(updatedMembers);

    // If new member is on an installment plan for their package, track it in Client Installment Tracker
    if (newMember.paymentType === 'Installment Plan') {
      const termMonths = 6;
      const monthlyAmort = Math.round((newMember.packagePrice || 19500) / termMonths);
      const today = new Date();
      const nextDue = new Date(today);
      nextDue.setMonth(today.getMonth() + 1);

      const pkgClientRecord: ClientInstallmentRecord = {
        id: `cli-pkg-${Date.now()}`,
        clientName: newMember.name,
        clientEmail: newMember.email,
        clientPhone: newMember.phone,
        vertical: 'direct_selling',
        itemName: `${newMember.packageName} (Membership Enrollment)`,
        contractCode: `NX-MBR-${Math.floor(1000 + Math.random() * 9000)}`,
        totalContractValue: newMember.packagePrice || 19500,
        downPayment: monthlyAmort,
        installmentAmount: monthlyAmort,
        totalInstallments: termMonths,
        paidInstallments: 1,
        frequency: 'Monthly',
        startDate: today.toISOString().split('T')[0],
        nextDueDate: nextDue.toISOString().split('T')[0],
        status: 'up_to_date',
        agentCommissionExpected: Math.round((newMember.packagePrice || 19500) * 0.15),
        agentCommissionEarned: Math.round(((newMember.packagePrice || 19500) * 0.15) / termMonths),
        notes: `Enrolled under ${newMember.sponsorName || 'Alexander Cole'} (${newMember.sponsorAgentCode || 'NX-ADMIN01'}). Initial 1st installment paid.`,
        schedule: [
          {
            id: `sch-pkg-1`,
            installmentNumber: 1,
            dueDate: today.toISOString().split('T')[0],
            amount: monthlyAmort,
            status: 'paid',
            paidDate: today.toISOString().split('T')[0],
            receiptNumber: `REC-ONBOARD-${Math.floor(10000 + Math.random() * 90000)}`,
            paymentMethod: 'Enrollment Debit',
          },
          {
            id: `sch-pkg-2`,
            installmentNumber: 2,
            dueDate: nextDue.toISOString().split('T')[0],
            amount: monthlyAmort,
            status: 'pending',
          },
        ],
      };

      setClients((prev) => [pkgClientRecord, ...prev]);
    }

    // If sponsor is current user, increase their team size and credit direct referral bonus
    if (currentUser) {
      const referralBonus = Math.round((newMember.packagePrice || 19500) * 0.10);
      const updatedCurrent: MemberProfile = {
        ...currentUser,
        teamSize: currentUser.teamSize + 1,
        totalEarnings: currentUser.totalEarnings + referralBonus,
        thisMonthEarnings: currentUser.thisMonthEarnings + referralBonus,
        walletBalance: currentUser.walletBalance + referralBonus,
        networkingBonuses: currentUser.networkingBonuses + referralBonus,
      };
      handleUpdateMember(updatedCurrent);

      // Record transaction for sponsor
      const sponsorTx: EarningTransaction = {
        id: `tx-onboard-${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
        clientName: newMember.name,
        type: 'Team Override Bonus',
        amount: referralBonus,
        status: 'Credited',
        referenceId: `NX-DIR-REF-${Math.floor(1000 + Math.random() * 9000)}`,
      };
      handleAddTransaction(sponsorTx);
    }

    if (switchImmediately) {
      setCurrentUser(newMember);
      setActiveTab('portal');
    }
  };

  // Admin exclusive handlers for Real Estate listings
  const handleAddListing = (newListing: RealEstateListing) => {
    if (!currentUser?.isAdmin) {
      alert('Security Alert: Only administrators can enter new listings.');
      return;
    }
    setListings([newListing, ...listings]);
  };

  const handleDeleteListing = (id: string) => {
    if (!currentUser?.isAdmin) {
      alert('Security Alert: Only administrators can remove listings.');
      return;
    }
    setListings(listings.filter((item) => item.id !== id));
  };

  const handleUpdateListing = (updatedListing: RealEstateListing) => {
    if (!currentUser?.isAdmin) {
      alert('Security Alert: Only administrators can modify listings.');
      return;
    }
    setListings(listings.map((item) => (item.id === updatedListing.id ? updatedListing : item)));
  };

  // Admin exclusive handlers for Direct Selling products
  const handleAddProduct = (newProduct: DirectSellingProduct) => {
    if (!currentUser?.isAdmin) {
      alert('Security Alert: Only administrators can enter new products.');
      return;
    }
    setProducts([newProduct, ...products]);
  };

  const handleDeleteProduct = (id: string) => {
    if (!currentUser?.isAdmin) {
      alert('Security Alert: Only administrators can remove products.');
      return;
    }
    setProducts(products.filter((item) => item.id !== id));
  };

  // Admin exclusive handlers for Insurance Plans
  const handleAddInsurancePlan = (newPlan: InsurancePlan) => {
    if (!currentUser?.isAdmin) {
      alert('Security Alert: Only administrators can create insurance plans.');
      return;
    }
    setInsurancePlans([newPlan, ...insurancePlans]);
  };

  const handleUpdateInsurancePlan = (updatedPlan: InsurancePlan) => {
    if (!currentUser?.isAdmin) {
      alert('Security Alert: Only administrators can modify insurance plans.');
      return;
    }
    setInsurancePlans(insurancePlans.map((p) => (p.id === updatedPlan.id ? updatedPlan : p)));
  };

  const handleDeleteInsurancePlan = (id: string) => {
    if (!currentUser?.isAdmin) {
      alert('Security Alert: Only administrators can remove insurance plans.');
      return;
    }
    setInsurancePlans(insurancePlans.filter((p) => p.id !== id));
  };

  // Admin handler to update any member's profile & credentials
  const handleUpdateMemberRecord = (updatedMember: MemberProfile) => {
    setMembers((prev) => prev.map((m) => (m.id === updatedMember.id ? updatedMember : m)));
    if (currentUser?.id === updatedMember.id) {
      setCurrentUser(updatedMember);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans antialiased">
      {/* Top Notification / Fast Role Switcher Bar */}
      <div className="bg-slate-950 text-slate-300 border-b border-slate-800 text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="font-medium text-slate-300">
              NEXUS Global Enterprise: Public Site, Member Portal & Exclusive Admin Catalog Authority Active
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Quick Add Member button ONLY visible to Admin */}
            {currentUser?.isAdmin && (
              <button
                onClick={() => setAddMemberModalOpen(true)}
                className="px-2.5 py-1 rounded-md bg-purple-700 hover:bg-purple-600 text-white font-bold text-[11px] transition-colors flex items-center gap-1 shadow-sm"
                title="Admin Privilege: Onboard new associates"
              >
                <UserPlus className="w-3 h-3 text-purple-200" />
                <span>+ Add Member (Admin)</span>
              </button>
            )}

            {currentUser ? (
              <div className="flex items-center gap-2">
                <span className="text-slate-400 hidden md:inline">Logged in as:</span>
                <span className="text-cyan-400 font-bold flex items-center gap-1">
                  {currentUser.name}
                  {currentUser.isAdmin ? (
                    <span className="px-1.5 py-0.2 rounded bg-purple-500/30 text-purple-300 border border-purple-400/40 text-[10px] font-extrabold flex items-center gap-0.5">
                      <Crown className="w-2.5 h-2.5 text-amber-300" />
                      <span>ADMIN</span>
                    </span>
                  ) : (
                    <span className="text-[10px] text-slate-400">({currentUser.rank})</span>
                  )}
                </span>
                <button
                  onClick={() => setActiveTab('portal')}
                  className={`px-2.5 py-1 rounded-md font-bold text-[11px] transition-colors flex items-center gap-1 ${
                    currentUser.isAdmin
                      ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-sm'
                      : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950'
                  }`}
                >
                  {currentUser.isAdmin ? (
                    <>
                      <Crown className="w-3 h-3 text-amber-300" />
                      <span>Admin Console & Inventory</span>
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-3 h-3" />
                      <span>Open Client Tracker</span>
                    </>
                  )}
                </button>
              </div>
            ) : (
              <button
                onClick={() => setLoginModalOpen(true)}
                className="text-cyan-400 hover:underline font-semibold flex items-center gap-1"
              >
                <Briefcase className="w-3 h-3" />
                <span>Log in as Administrator or Member</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentUser={currentUser}
        onOpenLogin={() => setLoginModalOpen(true)}
        onLogout={() => setCurrentUser(null)}
        onOpenContact={() => setContactModalOpen(true)}
        onOpenAddMember={() => setAddMemberModalOpen(true)}
      />

      {/* Dynamic Main View */}
      <main className="flex-1">
        {activeTab === 'about' && (
          <AboutSection
            onNavigateTab={(tab) => {
              setActiveTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenLogin={() => {
              if (currentUser) {
                setActiveTab('portal');
              } else {
                setLoginModalOpen(true);
              }
            }}
          />
        )}

        {activeTab === 'real_estate' && (
          <RealEstatePage
            listings={listings}
            currentUser={currentUser}
            onAddListing={handleAddListing}
            onUpdateListing={handleUpdateListing}
            onDeleteListing={handleDeleteListing}
            onOpenContact={() => setContactModalOpen(true)}
          />
        )}

        {activeTab === 'insurance' && (
          <InsurancePage
            plans={insurancePlans}
            currentUser={currentUser}
            onAddPlan={handleAddInsurancePlan}
            onUpdatePlan={handleUpdateInsurancePlan}
            onDeletePlan={handleDeleteInsurancePlan}
            onOpenContact={() => setContactModalOpen(true)}
          />
        )}

        {activeTab === 'direct_selling' && (
          <DirectSellingPage
            products={products}
            currentUser={currentUser}
            onAddProduct={handleAddProduct}
            onDeleteProduct={handleDeleteProduct}
            onOpenContact={() => setContactModalOpen(true)}
            onNavigateTab={(tab) => {
              setActiveTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'networking' && (
          <NetworkingPage
            tiers={NETWORK_TIERS}
            onOpenContact={() => setContactModalOpen(true)}
            onOpenLogin={() => {
              if (currentUser) {
                setActiveTab('portal');
              } else {
                setLoginModalOpen(true);
              }
            }}
          />
        )}

        {activeTab === 'portal' && (
          currentUser ? (
            <MemberPortal
              currentUser={currentUser}
              allMembers={members}
              onSwitchUser={handleSwitchUser}
              clients={clients}
              onUpdateClients={setClients}
              transactions={transactions}
              onAddTransaction={handleAddTransaction}
              onUpdateMember={handleUpdateMember}
              onSaveMemberDetails={handleUpdateMemberRecord}
              listings={listings}
              onAddListing={handleAddListing}
              onUpdateListing={handleUpdateListing}
              onDeleteListing={handleDeleteListing}
              products={products}
              onAddProduct={handleAddProduct}
              onDeleteProduct={handleDeleteProduct}
              insurancePlans={insurancePlans}
              onAddInsurancePlan={handleAddInsurancePlan}
              onUpdateInsurancePlan={handleUpdateInsurancePlan}
              onDeleteInsurancePlan={handleDeleteInsurancePlan}
              onOpenAddMember={() => setAddMemberModalOpen(true)}
              onAddMember={handleAddMember}
            />
          ) : (
            <div className="max-w-md mx-auto py-24 px-4 text-center">
              <div className="w-16 h-16 rounded-3xl bg-slate-900 text-cyan-400 flex items-center justify-center mx-auto mb-4 shadow-xl">
                <Briefcase className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Portal Authentication Required</h2>
              <p className="text-sm text-slate-600 mt-2">
                Please log in with your Admin or Member credentials to view dashboards, earnings, or enter catalog items.
              </p>
              <button
                onClick={() => setLoginModalOpen(true)}
                className="mt-6 px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider"
              >
                Log In to NEXUS Portal
              </button>
            </div>
          )
        )}
      </main>

      {/* Global Modals */}
      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        allMembers={members}
        onSelectMember={(mem) => {
          setCurrentUser(mem);
          setActiveTab('portal');
        }}
        onOpenAddMember={() => {
          setLoginModalOpen(false);
          setAddMemberModalOpen(true);
        }}
      />

      <AddMemberModal
        isOpen={addMemberModalOpen}
        onClose={() => setAddMemberModalOpen(false)}
        onAddMember={handleAddMember}
        currentUser={currentUser}
        allMembers={members}
      />

      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
      />

      {/* Footer */}
      <Footer
        onNavigateTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenLogin={() => {
          if (currentUser) {
            setActiveTab('portal');
          } else {
            setLoginModalOpen(true);
          }
        }}
      />
    </div>
  );
}
