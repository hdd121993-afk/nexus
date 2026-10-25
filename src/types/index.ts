export type BusinessVertical = 'real_estate' | 'insurance' | 'direct_selling' | 'networking';

export type PaymentStatus = 'up_to_date' | 'due_soon' | 'overdue' | 'completed' | 'grace_period';

export interface InstallmentScheduleItem {
  id: string;
  installmentNumber: number;
  dueDate: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  paidDate?: string;
  receiptNumber?: string;
  paymentMethod?: string;
}

export interface ClientInstallmentRecord {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  vertical: 'real_estate' | 'insurance' | 'direct_selling';
  itemName: string;
  contractCode: string;
  totalContractValue: number;
  downPayment: number;
  installmentAmount: number;
  totalInstallments: number;
  paidInstallments: number;
  frequency: 'Monthly' | 'Quarterly';
  startDate: string;
  nextDueDate: string;
  status: PaymentStatus;
  agentCommissionExpected: number;
  agentCommissionEarned: number;
  notes?: string;
  schedule: InstallmentScheduleItem[];
}

export interface RealEstateListing {
  id: string;
  title: string;
  category: 'Condominium' | 'Luxury Villa' | 'Townhouse' | 'Commercial Space' | 'Subdivision Lot';
  location: string;
  price: number;
  downPaymentPercent: number;
  monthlyInstallmentEstimate: number;
  termMonths: number;
  bedrooms: number;
  bathrooms: number;
  areaSqm: number;
  imageUrl: string;
  featured: boolean;
  tag: string;
  description: string;
  amenities: string[];
  installmentOptions: {
    term: string;
    monthly: number;
    interest: string;
    downPayment: number;
  }[];
}

export interface InsurancePlan {
  id: string;
  title: string;
  type: 'Prepaid Memorial Plan (Casket)' | 'Prepaid Memorial Plan (Cremation)' | 'Traditional Life Insurance' | 'Whole Life Memorial Plan' | 'Family Heritage Life Plan';
  summary: string;
  coverageAmount: number;
  minMonthlyPremium: number;
  protectionPeriod: string;
  features: string[];
  tag: string;
  popular?: boolean;
  installmentTerms: string[];
  description: string;
}

export interface DirectSellingProduct {
  id: string;
  name: string;
  category: 'Wellness & Nutrition' | 'Premium Skincare' | 'Home & Living' | 'Daily Essentials';
  retailPrice: number;
  memberPrice: number;
  pointsValue: number;
  description: string;
  benefits: string[];
  inStock: boolean;
  imageUrl: string;
  starterKitOption?: boolean;
  installmentAvailable?: boolean;
  installmentScheme?: string;
}

export interface NetworkTier {
  rank: string;
  title: string;
  badgeColor: string;
  personalVolumeRequired: number;
  groupVolumeRequired: number;
  directBonusRate: string;
  teamOverrideRate: string;
  leadershipPoolShare: string;
  exclusivePerks: string[];
}

export interface MembershipPackage {
  id: string;
  name: string;
  tagline: string;
  price: number;
  installmentOption: string;
  pointsValue: number;
  initialRank: string;
  role: string;
  perks: string[];
  badgeColor: string;
  featured?: boolean;
}

export interface MemberProfile {
  id: string;
  name: string;
  role: string;
  rank: string;
  agentCode: string;
  email: string;
  phone: string;
  password?: string;
  avatar: string;
  joinedDate: string;
  totalEarnings: number;
  thisMonthEarnings: number;
  pendingPayout: number;
  walletBalance: number;
  realEstateCommissions: number;
  insuranceCommissions: number;
  directSellingMargins: number;
  networkingBonuses: number;
  activeClientsCount: number;
  teamSize: number;
  isAdmin?: boolean;
  packageId?: string;
  packageName?: string;
  packagePrice?: number;
  paymentType?: 'Paid in Full' | 'Installment Plan';
  sponsorName?: string;
  sponsorAgentCode?: string;
}

export interface EarningTransaction {
  id: string;
  date: string;
  clientName: string;
  type: 'Real Estate Commission' | 'Insurance Recurring Premium' | 'Direct Sales Wholesale Profit' | 'Team Override Bonus';
  amount: number;
  status: 'Credited' | 'Pending Review' | 'Processing';
  referenceId: string;
}
