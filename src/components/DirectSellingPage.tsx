import React, { useState } from 'react';
import {
  ShoppingBag,
  Tag,
  TrendingUp,
  Percent,
  CheckCircle2,
  Package,
  Layers,
  Sparkles,
  ArrowRight,
  Calculator,
  ShieldCheck,
  CreditCard,
  Plus,
  Crown,
  Trash2,
  X
} from 'lucide-react';
import { DirectSellingProduct, MemberProfile } from '../types';

interface DirectSellingPageProps {
  products: DirectSellingProduct[];
  currentUser: MemberProfile | null;
  onAddProduct: (product: DirectSellingProduct) => void;
  onDeleteProduct: (productId: string) => void;
  onOpenContact: () => void;
  onNavigateTab: (tab: string) => void;
}

export const DirectSellingPage: React.FC<DirectSellingPageProps> = ({
  products,
  currentUser,
  onAddProduct,
  onDeleteProduct,
  onOpenContact,
  onNavigateTab,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Profit simulator state
  const [simUnits, setSimUnits] = useState<number>(10);
  const [simProductPrice, setSimProductPrice] = useState<number>(2450);
  const [simMemberPrice, setSimMemberPrice] = useState<number>(1590);

  // Admin New Product Modal state
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [newName, setNewName] = useState('');
  const [newCategory, setNewCategory] = useState<'Wellness & Nutrition' | 'Premium Skincare' | 'Home & Living' | 'Daily Essentials'>('Wellness & Nutrition');
  const [newRetailPrice, setNewRetailPrice] = useState<number>(2500);
  const [newMemberPrice, setNewMemberPrice] = useState<number>(1650);
  const [newPointsValue, setNewPointsValue] = useState<number>(80);
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newBenefits, setNewBenefits] = useState('Clinically tested formula, High cellular bioavailability, GMP Certified');
  const [newInstallmentAvailable, setNewInstallmentAvailable] = useState<boolean>(false);
  const [newInstallmentScheme, setNewInstallmentScheme] = useState('3 Monthly Installments of ₱1,250/mo');

  const categories = ['All', 'Wellness & Nutrition', 'Premium Skincare', 'Home & Living', 'Daily Essentials'];

  const filteredProducts = products.filter(
    (p) => selectedCategory === 'All' || p.category === selectedCategory
  );

  const profitPerUnit = simProductPrice - simMemberPrice;
  const totalProfit = profitPerUnit * simUnits;
  const totalRetailVolume = simProductPrice * simUnits;

  // Admin handle create product
  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser?.isAdmin) {
      alert('Unauthorized: Only administrators can enter new products.');
      return;
    }

    const defaultImages = [
      'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1608248597359-002d057774d6?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80'
    ];
    const chosenImage = newImageUrl.trim() || defaultImages[Math.floor(Math.random() * defaultImages.length)];

    const createdProduct: DirectSellingProduct = {
      id: `ds-custom-${Date.now()}`,
      name: newName || 'NEXUS BioActive Wellness Formula',
      category: newCategory,
      retailPrice: newRetailPrice,
      memberPrice: newMemberPrice,
      pointsValue: newPointsValue,
      description: newDescription || 'Premium health and lifestyle product distributed exclusively through the NEXUS network.',
      benefits: newBenefits.split(',').map((b) => b.trim()).filter(Boolean),
      inStock: true,
      imageUrl: chosenImage,
      starterKitOption: false,
      installmentAvailable: newInstallmentAvailable,
      installmentScheme: newInstallmentAvailable ? newInstallmentScheme : undefined,
    };

    onAddProduct(createdProduct);
    setIsAddModalOpen(false);

    // Reset inputs
    setNewName('');
    setNewDescription('');
    setNewImageUrl('');
    setNewInstallmentAvailable(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-cyan-950 rounded-3xl p-8 sm:p-12 text-white border border-blue-900/60 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-semibold mb-4 border border-cyan-500/30">
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>NEXUS Consumer Brands • Up to 40% Retail Margins</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              NEXUS Direct Selling Store & Starter Kit Installments
            </h1>
            <p className="mt-3 text-slate-300 text-base leading-relaxed">
              Distribute certified cellular longevity formulas, dermatologist-tested clinical skincare, and eco-filtration technologies. New associates can launch immediately with our interest-free starter bundle installment plans.
            </p>
          </div>

          {/* Admin Exclusive Product Entry Card */}
          {currentUser?.isAdmin ? (
            <div className="shrink-0 bg-purple-900/50 border border-purple-500/60 p-4 rounded-2xl flex flex-col items-start gap-2 shadow-lg">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
                <Crown className="w-4 h-4 text-amber-300" />
                <span>Admin Privileges Active</span>
              </div>
              <p className="text-[11px] text-purple-200">
                Only administrators can enter & manage inventory products.
              </p>
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="w-full mt-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all hover:scale-[1.02]"
              >
                <Plus className="w-4 h-4 text-slate-950 stroke-[3]" />
                <span>+ Enter New Product (Admin)</span>
              </button>
            </div>
          ) : (
            <div className="shrink-0 bg-slate-800/60 border border-slate-700/60 p-3.5 rounded-2xl text-xs text-slate-400 max-w-xs">
              <span className="font-semibold text-slate-300 block mb-0.5">🔒 Verified Quality</span>
              All products in the NEXUS catalog are curated and published exclusively by authorized administrators.
            </div>
          )}
        </div>
      </div>

      {/* Retail Profit Margin Calculator */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-cyan-100 text-cyan-700 flex items-center justify-center font-bold">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Direct Sales Retail Earnings Simulator
            </h2>
            <p className="text-xs text-slate-500">
              Calculate your immediate cash-in-hand retail profit by marketing NEXUS consumer brands to clients.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div>
            <div className="flex justify-between text-xs font-bold text-slate-700 mb-2">
              <span>Monthly Units Sold:</span>
              <span className="text-cyan-600 font-extrabold text-sm">{simUnits} Units</span>
            </div>
            <input
              type="range"
              min={2}
              max={60}
              step={2}
              value={simUnits}
              onChange={(e) => setSimUnits(Number(e.target.value))}
              className="w-full accent-cyan-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>2 Units (Part-Time)</span>
              <span>20 Units (Active)</span>
              <span>60 Units (Pro Store)</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">Product Benchmark</label>
            <select
              onChange={(e) => {
                const prod = products.find((p) => p.id === e.target.value);
                if (prod) {
                  setSimProductPrice(prod.retailPrice);
                  setSimMemberPrice(prod.memberPrice);
                }
              }}
              className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:ring-2 focus:ring-cyan-500"
            >
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} (₱{p.retailPrice.toLocaleString()} Retail / ₱{p.memberPrice.toLocaleString()} Member)
                </option>
              ))}
            </select>
            <p className="text-[11px] text-cyan-700 mt-1.5 font-medium">
              Margin per unit: ₱{profitPerUnit.toLocaleString()} ({simProductPrice > 0 ? Math.round((profitPerUnit / simProductPrice) * 100) : 0}%)
            </p>
          </div>

          <div className="bg-slate-950 text-white p-5 rounded-2xl border border-slate-800 flex flex-col justify-center">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Projected Net Retail Profit
            </span>
            <span className="text-3xl font-extrabold text-cyan-400 mt-1">
              ₱{totalProfit.toLocaleString()}
            </span>
            <span className="text-[11px] text-slate-400 mt-1">
              From ₱{totalRetailVolume.toLocaleString()} retail turnover + Points Volume toward team rank!
            </span>
          </div>
        </div>
      </div>

      {/* Filter Tabs and Admin Add Button */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-cyan-400 shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {currentUser?.isAdmin && (
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm whitespace-nowrap"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Product (Admin)</span>
          </button>
        )}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => {
          const discountPct = Math.round(
            ((product.retailPrice - product.memberPrice) / product.retailPrice) * 100
          );
          return (
            <div
              key={product.id}
              className={`bg-white rounded-2xl border overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col justify-between relative ${
                product.starterKitOption
                  ? 'border-cyan-400 ring-2 ring-cyan-400/20'
                  : 'border-slate-200/90'
              }`}
            >
              <div>
                <div className="relative h-48 bg-slate-100 overflow-hidden">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2.5 left-2.5">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-900/80 backdrop-blur-md text-cyan-300 border border-slate-700">
                      {product.category}
                    </span>
                  </div>
                  <div className="absolute top-2.5 right-2.5 bg-emerald-500 text-slate-950 font-extrabold text-[11px] px-2 py-0.5 rounded-md shadow-sm">
                    {discountPct}% Member Margin
                  </div>

                  {/* Admin delete product */}
                  {currentUser?.isAdmin && (
                    <button
                      onClick={() => {
                        if (confirm(`Admin action: Delete product "${product.name}"?`)) {
                          onDeleteProduct(product.id);
                        }
                      }}
                      className="absolute bottom-2.5 right-2.5 p-1.5 rounded-lg bg-red-600/90 text-white hover:bg-red-500 shadow-md"
                      title="Admin: Delete product"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div className="p-5">
                  <h3 className="font-bold text-base text-slate-900 line-clamp-1">{product.name}</h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>

                  <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400 font-medium line-through">Retail: ₱{product.retailPrice.toLocaleString()}</span>
                      <span className="text-xs font-bold text-cyan-700">Member: ₱{product.memberPrice.toLocaleString()}</span>
                    </div>
                    <div className="mt-1 flex items-center justify-between text-[11px] text-slate-600">
                      <span>Points Value:</span>
                      <span className="font-bold text-slate-800">{product.pointsValue} PV</span>
                    </div>
                  </div>

                  {product.installmentAvailable && (
                    <div className="mt-3 p-2.5 bg-cyan-50 border border-cyan-200 rounded-xl text-[11px] text-cyan-900">
                      <div className="flex items-center gap-1 font-bold text-cyan-800">
                        <CreditCard className="w-3.5 h-3.5 text-cyan-600" />
                        <span>Installment Option:</span>
                      </div>
                      <p className="text-[10px] mt-0.5 text-cyan-700 leading-tight">
                        {product.installmentScheme}
                      </p>
                    </div>
                  )}

                  <div className="mt-3 space-y-1">
                    {product.benefits.slice(0, 2).map((b, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-[11px] text-slate-600">
                        <CheckCircle2 className="w-3 h-3 text-cyan-600 shrink-0" />
                        <span className="truncate">{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  onClick={onOpenContact}
                  className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <ShoppingBag className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Order or Distribute</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* ADMIN EXCLUSIVE: ADD NEW DIRECT SELLING PRODUCT MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full border border-slate-200 shadow-2xl overflow-hidden my-8 max-h-[92vh] flex flex-col">
            <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-purple-500/30 text-purple-300 flex items-center justify-center border border-purple-400/40">
                  <Crown className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Admin: Enter New Product</h3>
                  <p className="text-xs text-purple-200">
                    Add a certified consumer product into the NEXUS Direct Selling catalog.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 rounded-full bg-slate-800 text-slate-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Product Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. NEXUS Cellular Energy CoQ10 Complex"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-cyan-500 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Category *</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:ring-2 focus:ring-cyan-500"
                >
                  <option value="Wellness & Nutrition">Wellness & Nutrition</option>
                  <option value="Premium Skincare">Premium Skincare</option>
                  <option value="Home & Living">Home & Living</option>
                  <option value="Daily Essentials">Daily Essentials</option>
                </select>
              </div>

              <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Retail Price (₱) *</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={newRetailPrice}
                    onChange={(e) => setNewRetailPrice(Number(e.target.value))}
                    className="w-full p-2 rounded-xl border border-slate-200 text-xs font-bold focus:ring-2 focus:ring-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Member Price (₱) *</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={newMemberPrice}
                    onChange={(e) => setNewMemberPrice(Number(e.target.value))}
                    className="w-full p-2 rounded-xl border border-slate-200 text-xs font-bold focus:ring-2 focus:ring-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Points Value (PV) *</label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={newPointsValue}
                    onChange={(e) => setNewPointsValue(Number(e.target.value))}
                    className="w-full p-2 rounded-xl border border-slate-200 text-xs font-bold focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
              </div>

              <div className="text-[11px] text-emerald-700 font-semibold px-2">
                Calculated Member Profit Margin: ₱{(newRetailPrice - newMemberPrice).toLocaleString()} ({newRetailPrice > 0 ? Math.round(((newRetailPrice - newMemberPrice) / newRetailPrice) * 100) : 0}%)
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Product Image URL (Optional)</label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/... (Leave empty for default catalog image)"
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Key Benefits (Comma Separated)</label>
                <input
                  type="text"
                  placeholder="e.g. Pure Botanical Extracts, Third-Party Lab Certified, 30-Day Money Back"
                  value={newBenefits}
                  onChange={(e) => setNewBenefits(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={2}
                  placeholder="Describe formula, active ingredients, instructions for use..."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newInstallmentAvailable}
                    onChange={(e) => setNewInstallmentAvailable(e.target.checked)}
                    className="rounded text-cyan-600 focus:ring-cyan-500 w-4 h-4"
                  />
                  <span className="text-xs font-bold text-slate-700">Allow Installment Terms for this Product / Bundle</span>
                </label>

                {newInstallmentAvailable && (
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Installment Scheme Terms</label>
                    <input
                      type="text"
                      placeholder="e.g. 3 Monthly Installments of ₱1,250/mo at 0% interest"
                      value={newInstallmentScheme}
                      onChange={(e) => setNewInstallmentScheme(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs"
                    />
                  </div>
                )}
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs uppercase tracking-wider shadow-md"
                >
                  Publish Product to NEXUS Catalog
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
