import React, { useState, useEffect } from 'react';
import { X, Building2, CheckCircle2, Sparkles, Image as ImageIcon } from 'lucide-react';
import { RealEstateListing } from '../types';

interface AddEditListingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (listing: RealEstateListing) => void;
  editingListing?: RealEstateListing | null;
}

export const AddEditListingModal: React.FC<AddEditListingModalProps> = ({
  isOpen,
  onClose,
  onSave,
  editingListing,
}) => {
  const isEditing = !!editingListing;

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<RealEstateListing['category']>('Condominium');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState<number>(3500000);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(15);
  const [termMonths, setTermMonths] = useState<number>(36);
  const [bedrooms, setBedrooms] = useState<number>(2);
  const [bathrooms, setBathrooms] = useState<number>(2);
  const [areaSqm, setAreaSqm] = useState<number>(95);
  const [imageUrl, setImageUrl] = useState('');
  const [tag, setTag] = useState('New Verified Listing');
  const [description, setDescription] = useState('');
  const [amenities, setAmenities] = useState('Sky Lounge, Infinity Pool, 24/7 Concierge, Private Parking');

  const defaultImages = [
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80',
  ];

  useEffect(() => {
    if (editingListing) {
      setTitle(editingListing.title);
      setCategory(editingListing.category);
      setLocation(editingListing.location);
      setPrice(editingListing.price);
      setDownPaymentPercent(editingListing.downPaymentPercent);
      setTermMonths(editingListing.termMonths);
      setBedrooms(editingListing.bedrooms);
      setBathrooms(editingListing.bathrooms);
      setAreaSqm(editingListing.areaSqm);
      setImageUrl(editingListing.imageUrl);
      setTag(editingListing.tag);
      setDescription(editingListing.description);
      setAmenities(editingListing.amenities ? editingListing.amenities.join(', ') : '');
    } else {
      setTitle('');
      setCategory('Condominium');
      setLocation('');
      setPrice(3500000);
      setDownPaymentPercent(15);
      setTermMonths(36);
      setBedrooms(2);
      setBathrooms(2);
      setAreaSqm(95);
      setImageUrl('');
      setTag('New Admin Listing');
      setDescription('');
      setAmenities('Sky Lounge, Infinity Pool, 24/7 Concierge, Private Parking');
    }
  }, [editingListing, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !location.trim()) {
      alert('Please fill in both the property title and location.');
      return;
    }

    const downPaymentAmt = (price * downPaymentPercent) / 100;
    const balanceAmt = price - downPaymentAmt;
    const monthlyEstimate = Math.round(balanceAmt / termMonths);
    const chosenImage = imageUrl.trim() || (isEditing && editingListing?.imageUrl) || defaultImages[Math.floor(Math.random() * defaultImages.length)];

    const amenitiesList = amenities
      .split(',')
      .map((a) => a.trim())
      .filter((a) => a.length > 0);

    const savedListing: RealEstateListing = {
      id: editingListing ? editingListing.id : `re-custom-${Date.now()}`,
      title: title.trim(),
      category,
      location: location.trim(),
      price: Number(price),
      downPaymentPercent: Number(downPaymentPercent),
      monthlyInstallmentEstimate: monthlyEstimate,
      termMonths: Number(termMonths),
      bedrooms: Number(bedrooms),
      bathrooms: Number(bathrooms),
      areaSqm: Number(areaSqm),
      imageUrl: chosenImage,
      featured: editingListing ? editingListing.featured : true,
      tag: tag.trim() || 'Verified Listing',
      description: description.trim() || 'Premier architectural development in prime strategic sector.',
      amenities: amenitiesList.length > 0 ? amenitiesList : ['Private Security', 'Clubhouse', 'Dedicated Parking'],
      installmentOptions: [
        {
          term: `${termMonths} Months (Standard In-House)`,
          monthly: monthlyEstimate,
          interest: termMonths <= 24 ? '0%' : '3.5%',
          downPayment: downPaymentAmt,
        },
        {
          term: '24 Months (0% Zero Interest Special)',
          monthly: Math.round(balanceAmt / 24),
          interest: '0%',
          downPayment: downPaymentAmt,
        },
      ],
    };

    onSave(savedListing);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden my-8 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold">
                {isEditing ? 'Edit Real Estate Property Listing' : 'Enter New Real Estate Property Listing'}
              </h2>
              <p className="text-xs text-slate-400">
                {isEditing
                  ? 'Update pricing, terms, specs, and publication details for this property.'
                  : 'Publish official real estate inventory to the public marketplace.'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4 overflow-y-auto flex-1 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Property Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. NEXUS Skyrise Luxury Penthouse Suite"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-cyan-500 font-semibold"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Property Type / Category *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full p-2.5 rounded-xl border border-slate-200 font-medium focus:ring-2 focus:ring-cyan-500"
              >
                <option value="Condominium">Condominium</option>
                <option value="Luxury Villa">Luxury Villa</option>
                <option value="Townhouse">Townhouse</option>
                <option value="Commercial Space">Commercial Space</option>
                <option value="Subdivision Lot">Subdivision Lot</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Location / Address *</label>
              <input
                type="text"
                required
                placeholder="e.g. Marina Financial District, BGC"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-cyan-500 font-semibold"
              />
            </div>
          </div>

          {/* Pricing & Amortization */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-cyan-50/50 border border-cyan-100">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Selling Price (₱) *</label>
              <input
                type="number"
                required
                min={100000}
                step={50000}
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 font-extrabold text-slate-900 bg-white"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Down Payment (%) *</label>
              <input
                type="number"
                required
                min={0}
                max={60}
                value={downPaymentPercent}
                onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 font-bold bg-white"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Amortization Term</label>
              <select
                value={termMonths}
                onChange={(e) => setTermMonths(Number(e.target.value))}
                className="w-full p-2 rounded-xl border border-slate-200 font-bold bg-white"
              >
                <option value={24}>24 Months (0% Int Promo)</option>
                <option value={36}>36 Months (3 Years)</option>
                <option value={48}>48 Months (4 Years)</option>
                <option value={60}>60 Months (5 Years)</option>
              </select>
            </div>
          </div>

          {/* Specs */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Bedrooms</label>
              <input
                type="number"
                min={0}
                max={15}
                value={bedrooms}
                onChange={(e) => setBedrooms(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-slate-200"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Bathrooms</label>
              <input
                type="number"
                min={0}
                max={15}
                step={0.5}
                value={bathrooms}
                onChange={(e) => setBathrooms(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-slate-200"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Floor Area (sqm)</label>
              <input
                type="number"
                min={10}
                value={areaSqm}
                onChange={(e) => setAreaSqm(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-slate-200"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Image URL (Optional)</label>
            <input
              type="url"
              placeholder="https://images.unsplash.com/... (Leave empty for default high-res render)"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Marketing Tag</label>
            <input
              type="text"
              placeholder="e.g. 0% Interest Promo / Near Transit Hub / Prime Ocean View"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Description</label>
            <textarea
              rows={2}
              placeholder="Key architectural highlights, panoramic views, security, or developer warranty..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Amenities (comma-separated)</label>
            <input
              type="text"
              placeholder="Infinity Pool, Fitness Gym, 24/7 Security, Private Covered Parking, Sky Lounge"
              value={amenities}
              onChange={(e) => setAmenities(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200"
            />
          </div>

          {/* Action CTAs */}
          <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md shadow-cyan-600/20"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isEditing ? 'Save Changes' : 'Publish Listing'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
