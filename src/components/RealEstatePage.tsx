import React, { useState } from 'react';
import {
  Building2,
  MapPin,
  BedDouble,
  Bath,
  Maximize2,
  Calendar,
  Calculator,
  Search,
  Filter,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  DollarSign,
  Phone,
  X,
  Plus,
  Crown,
  Trash2,
  ShieldAlert,
  Image as ImageIcon,
  Edit,
} from 'lucide-react';
import { RealEstateListing, MemberProfile } from '../types';
import { AddEditListingModal } from './AddEditListingModal';

interface RealEstatePageProps {
  listings: RealEstateListing[];
  currentUser: MemberProfile | null;
  onAddListing: (listing: RealEstateListing) => void;
  onUpdateListing?: (listing: RealEstateListing) => void;
  onDeleteListing: (listingId: string) => void;
  onOpenContact: () => void;
}

export const RealEstatePage: React.FC<RealEstatePageProps> = ({
  listings,
  currentUser,
  onAddListing,
  onUpdateListing,
  onDeleteListing,
  onOpenContact,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedListing, setSelectedListing] = useState<RealEstateListing | null>(null);

  // Admin Add / Edit Listing Modal state
  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState<boolean>(false);
  const [editingListing, setEditingListing] = useState<RealEstateListing | null>(null);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<'Condominium' | 'Luxury Villa' | 'Townhouse' | 'Commercial Space' | 'Subdivision Lot'>('Condominium');
  const [newLocation, setNewLocation] = useState('');
  const [newPrice, setNewPrice] = useState<number>(3500000);
  const [newDownPaymentPercent, setNewDownPaymentPercent] = useState<number>(15);
  const [newTermMonths, setNewTermMonths] = useState<number>(36);
  const [newBedrooms, setNewBedrooms] = useState<number>(2);
  const [newBathrooms, setNewBathrooms] = useState<number>(2);
  const [newAreaSqm, setNewAreaSqm] = useState<number>(95);
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newTag, setNewTag] = useState('New Admin Listing');
  const [newDescription, setNewDescription] = useState('');
  const [newAmenities, setNewAmenities] = useState('Sky Lounge, Infinity Pool, 24/7 Concierge, Private Parking');

  // Installment Calculator state for selected property modal
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(15);
  const [termMonths, setTermMonths] = useState<number>(36);
  const [tourDate, setTourDate] = useState<string>('');
  const [tourName, setTourName] = useState<string>('');
  const [tourPhone, setTourPhone] = useState<string>('');
  const [tourBooked, setTourBooked] = useState<boolean>(false);

  const categories = ['All', 'Condominium', 'Luxury Villa', 'Townhouse', 'Commercial Space', 'Subdivision Lot'];

  const filteredListings = listings.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const openPropertyDetails = (listing: RealEstateListing) => {
    setSelectedListing(listing);
    setDownPaymentPercent(listing.downPaymentPercent);
    setTermMonths(listing.termMonths);
    setTourBooked(false);
  };

  // Calculate dynamic monthly installment for modal
  const calculateInstallment = () => {
    if (!selectedListing) return { downPaymentAmount: 0, balance: 0, monthly: 0 };
    const downPaymentAmount = (selectedListing.price * downPaymentPercent) / 100;
    const balance = selectedListing.price - downPaymentAmount;
    const interestMultiplier = termMonths <= 24 ? 1 : 1 + (0.035 * (termMonths / 12));
    const totalToAmortize = balance * interestMultiplier;
    const monthly = Math.round(totalToAmortize / termMonths);
    return { downPaymentAmount, balance, monthly };
  };

  const { downPaymentAmount, balance, monthly } = calculateInstallment();

  // Admin Handle Create Listing
  const handleCreateListing = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser?.isAdmin) {
      alert('Unauthorized: Only administrators can enter new listings.');
      return;
    }

    const downPaymentAmt = (newPrice * newDownPaymentPercent) / 100;
    const balanceAmt = newPrice - downPaymentAmt;
    const monthlyEstimate = Math.round(balanceAmt / newTermMonths);

    const defaultImages = [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80'
    ];
    const chosenImage = newImageUrl.trim() || defaultImages[Math.floor(Math.random() * defaultImages.length)];

    const created: RealEstateListing = {
      id: `re-custom-${Date.now()}`,
      title: newTitle || 'NEXUS Prime Property',
      category: newCategory,
      location: newLocation || 'NEXUS Prime Development Sector',
      price: newPrice,
      downPaymentPercent: newDownPaymentPercent,
      monthlyInstallmentEstimate: monthlyEstimate,
      termMonths: newTermMonths,
      bedrooms: newBedrooms,
      bathrooms: newBathrooms,
      areaSqm: newAreaSqm,
      imageUrl: chosenImage,
      featured: true,
      tag: newTag || 'Admin Verified',
      description: newDescription || 'Premium real estate development offered under NEXUS developer in-house installment plan.',
      amenities: newAmenities.split(',').map((s) => s.trim()).filter(Boolean),
      installmentOptions: [
        { term: '24 Months (0% Interest)', monthly: Math.round(balanceAmt / 24), interest: '0%', downPayment: downPaymentAmt },
        { term: '36 Months (Developer In-House)', monthly: Math.round((balanceAmt * 1.05) / 36), interest: '3.5%', downPayment: downPaymentAmt },
        { term: '48 Months Extended', monthly: Math.round((balanceAmt * 1.08) / 48), interest: '4.2%', downPayment: downPaymentAmt },
      ],
    };

    onAddListing(created);
    setIsAddEditModalOpen(false);

    // Reset inputs
    setNewTitle('');
    setNewLocation('');
    setNewDescription('');
    setNewImageUrl('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950 rounded-3xl p-8 sm:p-12 text-white border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-semibold mb-4 border border-cyan-500/30">
              <Building2 className="w-3.5 h-3.5" />
              <span>NEXUS In-House Financing & Amortization</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              NEXUS Real Estate Listings & Flexible Installment Plans
            </h1>
            <p className="mt-3 text-slate-300 text-base leading-relaxed">
              Own high-yield urban condominiums, luxury villas, commercial properties, and residential lots. Enjoy 0% interest downpayment amortization and 12 to 60-month terms without bank hurdles.
            </p>
          </div>

          {/* Admin Exclusive Action Button */}
          {currentUser?.isAdmin ? (
            <div className="shrink-0 bg-purple-900/50 border border-purple-500/60 p-4 rounded-2xl flex flex-col items-start gap-2 shadow-lg">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
                <Crown className="w-4 h-4 text-amber-300" />
                <span>Admin Privileges Active</span>
              </div>
              <p className="text-[11px] text-purple-200">
                Only administrators can enter & publish real estate listings.
              </p>
              <button
                onClick={() => {
                  setEditingListing(null);
                  setIsAddEditModalOpen(true);
                }}
                className="w-full mt-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all hover:scale-[1.02]"
              >
                <Plus className="w-4 h-4 text-slate-950 stroke-[3]" />
                <span>+ Enter New Listing (Admin)</span>
              </button>
            </div>
          ) : (
            <div className="shrink-0 bg-slate-800/60 border border-slate-700/60 p-3.5 rounded-2xl text-xs text-slate-400 max-w-xs">
              <span className="font-semibold text-slate-300 block mb-0.5">🔒 Certified Inventory</span>
              All properties are verified and entered exclusively by NEXUS System Administrators.
            </div>
          )}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-cyan-400 shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {currentUser?.isAdmin && (
            <button
              onClick={() => {
                setEditingListing(null);
                setIsAddEditModalOpen(true);
              }}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 whitespace-nowrap shadow-sm"
              title="Admin Privilege: Enter new property listing"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ Add Listing</span>
            </button>
          )}

          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search location or title..."
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
        </div>
      </div>

      {/* Property Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredListings.map((listing) => (
          <div
            key={listing.id}
            className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group relative"
          >
            {/* Image Container */}
            <div className="relative h-56 overflow-hidden">
              <img
                src={listing.imageUrl}
                alt={listing.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 flex gap-2">
                <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-slate-900/80 backdrop-blur-md text-cyan-300 border border-slate-700">
                  {listing.category}
                </span>
                {listing.tag && (
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-cyan-500 text-slate-950 shadow-md">
                    {listing.tag}
                  </span>
                )}
              </div>
              <div className="absolute bottom-3 right-3 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-lg text-white font-extrabold text-sm border border-slate-700">
                ₱{listing.price.toLocaleString()}
              </div>

              {/* Admin quick edit & delete actions */}
              {currentUser?.isAdmin && (
                <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingListing(listing);
                      setIsAddEditModalOpen(true);
                    }}
                    className="p-1.5 rounded-lg bg-slate-900/90 text-amber-400 hover:bg-slate-800 transition-colors shadow-md border border-slate-700"
                    title="Admin: Edit property listing"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (confirm(`Admin action: Delete property "${listing.title}"?`)) {
                        onDeleteListing(listing.id);
                      }
                    }}
                    className="p-1.5 rounded-lg bg-red-600/90 text-white hover:bg-red-500 transition-colors shadow-md"
                    title="Admin: Delete listing"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>

            {/* Content Details */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-lg text-slate-900 group-hover:text-cyan-600 transition-colors line-clamp-1">
                  {listing.title}
                </h3>
                <p className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                  <span className="truncate">{listing.location}</span>
                </p>

                {/* Specs */}
                <div className="grid grid-cols-3 gap-2 py-3 mt-3 border-y border-slate-100 text-xs text-slate-600">
                  {listing.bedrooms > 0 ? (
                    <div className="flex items-center gap-1">
                      <BedDouble className="w-4 h-4 text-slate-400" />
                      <span>{listing.bedrooms} Beds</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1">
                      <Building2 className="w-4 h-4 text-slate-400" />
                      <span>Open Plan</span>
                    </div>
                  )}

                  <div className="flex items-center gap-1">
                    <Bath className="w-4 h-4 text-slate-400" />
                    <span>{listing.bathrooms} Baths</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <Maximize2 className="w-4 h-4 text-slate-400" />
                    <span>{listing.areaSqm} sqm</span>
                  </div>
                </div>

                {/* Installment Scheme Pill */}
                <div className="mt-3 p-3 rounded-xl bg-cyan-50/70 border border-cyan-200/80 text-xs">
                  <div className="flex items-center justify-between font-medium text-cyan-900">
                    <span>Est. Installment:</span>
                    <span className="font-extrabold text-cyan-700 text-sm">
                      ₱{listing.monthlyInstallmentEstimate.toLocaleString()} / mo
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-cyan-800 mt-0.5">
                    <span>Term: {listing.termMonths} Months</span>
                    <span>Down: {listing.downPaymentPercent}%</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center gap-2">
                <button
                  onClick={() => openPropertyDetails(listing)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                >
                  <Calculator className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Amortization & Info</span>
                </button>
                <button
                  onClick={onOpenContact}
                  className="px-3 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
                >
                  Inquire
                </button>
                {currentUser?.isAdmin && (
                  <button
                    onClick={() => {
                      setEditingListing(listing);
                      setIsAddEditModalOpen(true);
                    }}
                    className="px-3 py-2.5 rounded-xl bg-purple-100 hover:bg-purple-200 text-purple-900 text-xs font-bold transition-colors flex items-center gap-1 shrink-0"
                    title="Admin: Edit property listing"
                  >
                    <Edit className="w-3 h-3 text-purple-700" />
                    <span>Edit</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Global Add & Edit Real Estate Listing Modal */}
      <AddEditListingModal
        isOpen={isAddEditModalOpen}
        onClose={() => {
          setIsAddEditModalOpen(false);
          setEditingListing(null);
        }}
        editingListing={editingListing}
        onSave={(savedListing) => {
          if (editingListing && onUpdateListing) {
            onUpdateListing(savedListing);
          } else if (onAddListing) {
            onAddListing(savedListing);
          }
          setIsAddEditModalOpen(false);
          setEditingListing(null);
        }}
      />

      {/* Property Details & Installment Calculator Modal */}
      {selectedListing && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-4xl w-full border border-slate-200 shadow-2xl overflow-hidden my-8 max-h-[92vh] flex flex-col">
            {/* Modal Header */}
            <div className="p-6 bg-slate-900 text-white flex items-center justify-between relative">
              <div>
                <span className="text-xs uppercase font-bold text-cyan-400">{selectedListing.category}</span>
                <h2 className="text-xl sm:text-2xl font-bold">{selectedListing.title}</h2>
                <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  {selectedListing.location}
                </p>
              </div>
              <button
                onClick={() => setSelectedListing(null)}
                className="p-2 rounded-full bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-8 flex-1">
              {/* Media & Key Overview */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <img
                  src={selectedListing.imageUrl}
                  alt={selectedListing.title}
                  className="w-full h-64 object-cover rounded-2xl shadow-md"
                />
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <p className="text-xs text-slate-500 font-semibold uppercase">Total Contract Price</p>
                    <p className="text-3xl font-extrabold text-slate-900">
                      ₱{selectedListing.price.toLocaleString()}
                    </p>
                    <p className="text-xs text-emerald-600 font-medium mt-1">
                      ✓ Clean Title & NEXUS Developer In-House Installment Guaranteed
                    </p>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {selectedListing.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {selectedListing.amenities.map((amenity, i) => (
                      <span key={i} className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-medium">
                        ✦ {amenity}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Interactive Installment Calculator */}
              <div className="p-6 rounded-2xl bg-cyan-50/60 border border-cyan-200">
                <div className="flex items-center gap-2 mb-4">
                  <Calculator className="w-5 h-5 text-cyan-600" />
                  <h3 className="font-bold text-slate-900 text-base">
                    Interactive Installment Plan Simulator
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Slider 1: Down Payment % */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2">
                      Down Payment: <span className="text-cyan-600">{downPaymentPercent}%</span> (₱{downPaymentAmount.toLocaleString()})
                    </label>
                    <input
                      type="range"
                      min={10}
                      max={40}
                      step={5}
                      value={downPaymentPercent}
                      onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                      className="w-full accent-cyan-500 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                      <span>10% (Promo)</span>
                      <span>20% (Standard)</span>
                      <span>40% (Max)</span>
                    </div>
                  </div>

                  {/* Slider 2: Term in Months */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2">
                      Amortization Term: <span className="text-cyan-600">{termMonths} Months</span>
                    </label>
                    <div className="grid grid-cols-4 gap-1.5">
                      {[12, 24, 36, 48].map((t) => (
                        <button
                          key={t}
                          onClick={() => setTermMonths(t)}
                          className={`py-1.5 text-xs font-bold rounded-lg border transition-all ${
                            termMonths === t
                              ? 'bg-cyan-500 border-cyan-600 text-slate-950 shadow-sm'
                              : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          {t} mo
                        </button>
                      ))}
                    </div>
                    <p className="text-[10px] text-slate-500 mt-1.5">
                      {termMonths <= 24 ? '★ 0% Interest Special Developer Term' : 'Low 3.5% developer annual rate'}
                    </p>
                  </div>

                  {/* Output Box */}
                  <div className="p-4 bg-white rounded-xl border border-cyan-300 shadow-sm flex flex-col justify-center">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      Monthly Installment
                    </span>
                    <span className="text-2xl font-extrabold text-cyan-600">
                      ₱{monthly.toLocaleString()} <span className="text-xs font-medium text-slate-500">/ mo</span>
                    </span>
                    <span className="text-[11px] text-slate-500 mt-1">
                      Balance: ₱{balance.toLocaleString()} over {termMonths} payments
                    </span>
                  </div>
                </div>

                {/* Predefined Terms comparison */}
                <div className="mt-6 pt-4 border-t border-cyan-200/60">
                  <h4 className="text-xs font-bold text-slate-800 uppercase mb-2">Contract Schemes available for this unit:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {selectedListing.installmentOptions.map((opt, idx) => (
                      <div key={idx} className="bg-white p-3 rounded-xl border border-slate-200 text-xs">
                        <p className="font-bold text-slate-900">{opt.term}</p>
                        <p className="text-cyan-600 font-extrabold mt-0.5 text-sm">₱{opt.monthly.toLocaleString()}/mo</p>
                        <p className="text-[10px] text-slate-500">DP: ₱{opt.downPayment.toLocaleString()} • Rate: {opt.interest}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Site Tour Booking Form */}
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <h3 className="font-bold text-slate-900 text-base mb-1">
                  Schedule an In-Person or Virtual Property Tour
                </h3>
                <p className="text-xs text-slate-500 mb-4">
                  Our licensed NEXUS property associate will coordinate a complimentary private showing and hand you the official prospectus.
                </p>

                {tourBooked ? (
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <div>
                      <p className="font-bold text-sm">Site Tour Reserved Successfully!</p>
                      <p className="text-xs text-emerald-700">
                        An associate has been assigned to prepare your property pass for {tourDate || 'your requested date'}.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <input
                      type="text"
                      placeholder="Your Full Name"
                      value={tourName}
                      onChange={(e) => setTourName(e.target.value)}
                      className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-cyan-500"
                    />
                    <input
                      type="tel"
                      placeholder="Phone / WhatsApp Number"
                      value={tourPhone}
                      onChange={(e) => setTourPhone(e.target.value)}
                      className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-cyan-500"
                    />
                    <div className="flex gap-2">
                      <input
                        type="date"
                        value={tourDate}
                        onChange={(e) => setTourDate(e.target.value)}
                        className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs flex-1 focus:ring-2 focus:ring-cyan-500"
                      />
                      <button
                        onClick={() => {
                          if (tourName && tourPhone) {
                            setTourBooked(true);
                          } else {
                            alert('Please provide your name and phone number to schedule tour.');
                          }
                        }}
                        className="px-4 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl transition-colors whitespace-nowrap"
                      >
                        Confirm Tour
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <div className="text-xs text-slate-500">
                Need customized payment terms or corporate lease-to-own?
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSelectedListing(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-200"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setSelectedListing(null);
                    onOpenContact();
                  }}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-400 font-bold text-xs flex items-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Inquire with NEXUS Desk</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
