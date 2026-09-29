import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  ShieldCheck,
  Star,
  MapPin,
  ArrowRight,
  Filter,
  CheckCircle2,
  Building2,
  Scale
} from 'lucide-react';
import { FarmerLayout } from '../../components/layout/FarmerLayout';
import { useTranslation } from '../../context/LanguageContext';
import { useApp } from '../../context/AppContext';
import { CROPS_LIST } from '../../data/agmarknetData';

export const BuyersPage: React.FC = () => {
  const { t } = useTranslation();
  const { buyers } = useApp();
  const [selectedCrop, setSelectedCrop] = useState<string>('All Crops');

  const filteredBuyers = useMemo(() => {
    if (selectedCrop === 'All Crops') return buyers;
    return buyers.filter(b => b.requiredCrop.toLowerCase() === selectedCrop.toLowerCase());
  }, [buyers, selectedCrop]);

  return (
    <FarmerLayout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-forest-900 tracking-tight">
            {t('find_buyers_title')}
          </h1>
          <p className="text-ink/60 text-sm mt-1">
            {t('find_buyers_subtitle')}
          </p>
        </div>

        {/* Crop Filter */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-forest-600" />
          <select
            value={selectedCrop}
            onChange={e => setSelectedCrop(e.target.value)}
            className="bg-white border border-forest-200 rounded-xl px-3.5 py-2 text-sm font-bold text-forest-900 shadow-2xs focus:ring-2 focus:ring-forest-500/20"
          >
            <option value="All Crops">{t('all_crops')}</option>
            {CROPS_LIST.map(crop => (
              <option key={crop} value={crop}>{crop}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Buyer Cards Grid */}
      {filteredBuyers.length === 0 ? (
        <div className="card p-12 text-center text-ink/50">
          <p>{t('no_buyers_found')}</p>
          <button
            onClick={() => setSelectedCrop('All Crops')}
            className="btn-secondary text-xs mt-3"
          >
            Show All Buyers
          </button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBuyers.map(buyer => (
            <div
              key={buyer.id}
              className="card p-6 flex flex-col justify-between hover:border-forest-300 transition-all hover:shadow-md"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <h3 className="font-display font-bold text-forest-900 text-lg flex items-center gap-1.5">
                      {buyer.company}
                      {buyer.verified && (
                        <span title="Verified Buyer">
                          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                        </span>
                      )}
                    </h3>
                    <p className="text-xs text-ink/50 font-medium">
                      {buyer.name} • {buyer.location}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-lg text-xs font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{buyer.rating}</span>
                  </div>
                </div>

                {/* Demand Specs Card */}
                <div className="bg-forest-50/70 p-3.5 rounded-xl border border-forest-100 my-4 space-y-2 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-ink/55 font-medium">{t('required_crop')}:</span>
                    <span className="font-bold text-forest-950">{buyer.requiredCrop} ({buyer.qualityRequired})</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-ink/55 font-medium">{t('required_quantity')}:</span>
                    <span className="font-bold text-forest-950 font-mono">{buyer.requiredQuantityKg.toLocaleString('en-IN')} kg</span>
                  </div>
                  <div className="flex justify-between items-center pt-1 border-t border-forest-200/60">
                    <span className="text-ink/55 font-medium">{t('target_price')}:</span>
                    <span className="text-base font-extrabold text-emerald-800 font-mono">₹{buyer.offerPricePerKg} / kg</span>
                  </div>
                </div>

                <p className="text-xs text-ink/70 line-clamp-2 leading-relaxed mb-4">
                  {buyer.about}
                </p>

                <div className="text-[11px] text-ink/50 space-y-1 mb-4">
                  <p className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-forest-600 shrink-0" />
                    <span className="truncate">Pickup: {buyer.pickupLocation}</span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{buyer.transactionsCompleted} verified escrow purchases completed</span>
                  </p>
                </div>
              </div>

              <div>
                <Link
                  to={`/farmer/buyers/${buyer.id}`}
                  className="btn-primary w-full text-xs font-bold !py-2.5 flex items-center justify-center gap-1.5"
                >
                  <span>{t('view_buyer_details')}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </FarmerLayout>
  );
};
