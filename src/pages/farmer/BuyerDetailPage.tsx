import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ShieldCheck,
  Star,
  MapPin,
  CheckCircle2,
  Building2,
  DollarSign,
  Scale,
  Send,
  Lock,
  Truck
} from 'lucide-react';
import { FarmerLayout } from '../../components/layout/FarmerLayout';
import { useTranslation } from '../../context/LanguageContext';
import { useApp } from '../../context/AppContext';

export const BuyerDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { buyers, produceListings } = useApp();

  const buyer = buyers.find(b => b.id === id);

  const [selectedProduceId, setSelectedProduceId] = useState<string>(
    produceListings[0]?.id || ''
  );
  const [proposedPrice, setProposedPrice] = useState<number>(
    buyer ? buyer.offerPricePerKg : 30
  );
  const [pickupPreference, setPickupPreference] = useState<'farm-gate' | 'buyer-yard'>('farm-gate');
  const [notes, setNotes] = useState<string>('Lot sorted to Grade A specifications. Available for immediate pickup.');
  const [isSent, setIsSent] = useState<boolean>(false);

  if (!buyer) {
    return (
      <FarmerLayout>
        <div className="card p-12 text-center">
          <p className="text-ink/60">Buyer not found.</p>
          <Link to="/farmer/buyers" className="btn-primary mt-4 text-sm">
            Back to Buyers
          </Link>
        </div>
      </FarmerLayout>
    );
  }

  const selectedProduce = produceListings.find(p => p.id === selectedProduceId) || produceListings[0];
  const totalValue = selectedProduce ? Math.round(selectedProduce.quantityKg * proposedPrice) : 0;

  const handleSubmitOffer = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
    setTimeout(() => {
      navigate('/farmer/offers');
    }, 1500);
  };

  return (
    <FarmerLayout>
      <Link
        to="/farmer/buyers"
        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-forest-700 hover:text-forest-900 mb-4"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Buyers</span>
      </Link>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column: Buyer Profile (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card p-6 sm:p-8">
            <div className="flex items-start justify-between flex-wrap gap-4 mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-forest-900">
                    {buyer.company}
                  </h1>
                  {buyer.verified && (
                    <span className="badge bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Verified Corporate Buyer
                    </span>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-ink/60 mt-1">
                  Representative: <strong className="text-forest-900 font-semibold">{buyer.name}</strong> • {buyer.location}
                </p>
              </div>

              <div className="flex items-center gap-1.5 bg-amber-50 text-amber-900 border border-amber-200 px-3 py-1.5 rounded-xl text-sm font-extrabold">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{buyer.rating} / 5.0</span>
                <span className="text-xs text-ink/40 font-normal">({buyer.transactionsCompleted} deals)</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-forest-50/60 border border-forest-100 text-xs sm:text-sm text-ink/80 leading-relaxed mb-6">
              {buyer.about}
            </div>

            {/* Requirement Specifications */}
            <h3 className="font-display font-bold text-forest-900 text-base mb-3">
              Current Procurement Requirement
            </h3>
            <div className="grid sm:grid-cols-3 gap-4 mb-6">
              <div className="p-4 rounded-xl border border-forest-100 bg-white">
                <span className="text-xs text-ink/50 block font-medium">Target Crop</span>
                <span className="text-base font-bold text-forest-900 mt-0.5 block">{buyer.requiredCrop}</span>
                <span className="text-[11px] text-emerald-700 font-semibold">({buyer.qualityRequired})</span>
              </div>

              <div className="p-4 rounded-xl border border-forest-100 bg-white">
                <span className="text-xs text-ink/50 block font-medium">Desired Volume</span>
                <span className="text-base font-bold text-forest-900 mt-0.5 block font-mono">{buyer.requiredQuantityKg.toLocaleString('en-IN')} kg</span>
                <span className="text-[11px] text-ink/50 font-mono">({(buyer.requiredQuantityKg / 100).toFixed(0)} quintals)</span>
              </div>

              <div className="p-4 rounded-xl border border-forest-100 bg-white">
                <span className="text-xs text-ink/50 block font-medium">Standard Offer Rate</span>
                <span className="text-base font-black text-emerald-800 mt-0.5 block font-mono">₹{buyer.offerPricePerKg} / kg</span>
                <span className="text-[11px] text-ink/50 font-mono">(₹{(buyer.offerPricePerKg * 100).toLocaleString('en-IN')}/q)</span>
              </div>
            </div>

            {/* Procurement terms & Escrow protection */}
            <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-950 space-y-1.5">
              <p className="font-bold flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-emerald-700" />
                <span>100% Mitti2Market Escrow Payment Guarantee</span>
              </p>
              <p className="leading-relaxed text-ink/75">
                Buyer deposits 100% of order value into secure escrow prior to farm-gate pickup. Funds are automatically released to your bank account upon electronic weight and quality confirmation.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Make Offer / Sell Form (1 col) */}
        <div>
          <div className="card p-6 sm:p-7 border-forest-200 sticky top-20">
            <h3 className="font-display font-bold text-forest-900 text-lg mb-1">
              Submit Selling Offer
            </h3>
            <p className="text-xs text-ink/55 mb-5">
              Directly propose your produce lot to {buyer.company}.
            </p>

            {isSent ? (
              <div className="p-6 text-center bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-800 space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-base">Offer Submitted!</h4>
                <p className="text-xs leading-relaxed">
                  Your proposal of ₹{proposedPrice}/kg has been transmitted to {buyer.company}. Redirecting to your offers ledger…
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitOffer} className="space-y-4 text-xs">
                {/* Select Produce Lot */}
                <div>
                  <label className="block font-bold text-forest-900 mb-1">
                    Select Your Produce Lot:
                  </label>
                  <select
                    value={selectedProduceId}
                    onChange={e => setSelectedProduceId(e.target.value)}
                    className="w-full bg-forest-50/50 border border-forest-200 rounded-xl px-3 py-2 text-xs font-bold text-forest-950"
                  >
                    {produceListings.map(p => (
                      <option key={p.id} value={p.id}>
                        {p.crop} — {p.quantityKg} kg — {p.grade}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Offer Price per kg */}
                <div>
                  <label className="block font-bold text-forest-900 mb-1">
                    Your Proposed Price (₹ / kg):
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 font-bold text-ink/50">₹</span>
                    <input
                      type="number"
                      step="0.5"
                      min="1"
                      value={proposedPrice}
                      onChange={e => setProposedPrice(Number(e.target.value))}
                      className="w-full bg-forest-50/50 border border-forest-200 rounded-xl pl-7 pr-3 py-2 text-sm font-black text-forest-950"
                    />
                  </div>
                </div>

                {/* Pickup Preference */}
                <div>
                  <label className="block font-bold text-forest-900 mb-1">
                    Logistics Logistics Preference:
                  </label>
                  <select
                    value={pickupPreference}
                    onChange={e => setPickupPreference(e.target.value as any)}
                    className="w-full bg-forest-50/50 border border-forest-200 rounded-xl px-3 py-2 text-xs text-forest-950"
                  >
                    <option value="farm-gate">Buyer Farm-Gate Pickup (Recommended)</option>
                    <option value="buyer-yard">Farmer Arranges Freight Delivery</option>
                  </select>
                </div>

                {/* Total Escrow Calculation */}
                {selectedProduce && (
                  <div className="p-3.5 rounded-xl bg-forest-50 border border-forest-100 space-y-1">
                    <span className="text-[11px] text-ink/50 block">Gross Escrow Value</span>
                    <span className="text-xl font-extrabold text-forest-900 block num">
                      ₹{totalValue.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[10px] text-ink/45 block">
                      for {selectedProduce.quantityKg} kg {selectedProduce.crop}
                    </span>
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  className="btn-primary w-full text-xs font-bold !py-3 flex items-center justify-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Transmit Offer to Buyer</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </FarmerLayout>
  );
};
