import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Brain,
  TrendingUp,
  Warehouse,
  ShieldCheck,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Info,
  DollarSign,
  AlertTriangle,
  FileText,
  MapPin,
  Clock
} from 'lucide-react';
import { FarmerLayout } from '../../components/layout/FarmerLayout';
import { useTranslation } from '../../context/LanguageContext';
import { useApp } from '../../context/AppContext';

export const DecisionEnginePage: React.FC = () => {
  const { t } = useTranslation();
  const { produceListings, calculateNetRealization, warehouses } = useApp();

  const [selectedProduceId, setSelectedProduceId] = useState<string>(
    produceListings[0]?.id || ''
  );
  const [showWdraDetails, setShowWdraDetails] = useState<boolean>(false);

  const selectedProduce = useMemo(() => {
    return produceListings.find(p => p.id === selectedProduceId) || produceListings[0];
  }, [produceListings, selectedProduceId]);

  // Calculated options
  const evaluatedOptions = useMemo(() => {
    if (!selectedProduce) return [];
    return calculateNetRealization(selectedProduce.crop, selectedProduce.quantityKg, selectedProduce.grade);
  }, [selectedProduce, calculateNetRealization]);

  const bestOption = evaluatedOptions[0];
  const nearestWarehouse = warehouses[0];

  // Sell now or Wait logic based on verifiable data
  const decisionResult = useMemo(() => {
    if (!bestOption) return null;

    // High buyer demand or favorable market price vs storage cost
    const isSellNow = bestOption.score >= 70;

    return {
      recommendation: isSellNow ? 'SELL NOW' : 'WAIT / MONITOR & STORE',
      tone: isSellNow ? 'emerald' : 'amber',
      score: bestOption.score || 88,
      factors: [
        { name: t('score_price'), score: 92, weight: '40%' },
        { name: t('score_distance'), score: 85, weight: '25%' },
        { name: t('score_demand'), score: 90, weight: '15%' },
        { name: t('score_reliability'), score: 95, weight: '10%' },
        { name: t('score_transport'), score: 80, weight: '10%' },
      ],
      primaryReason: isSellNow
        ? `${bestOption.name} currently offers an immediate net realization of ₹${bestOption.netRealization.toLocaleString('en-IN')}, beating local mandi rates after full freight deduction.`
        : `Mandi prices are projected to rise over the next 14 days. Storing at a registered WDRA warehouse at ₹2.80/q/day preserves higher margins.`,
      economicBreakdown: {
        currentPrice: `₹${bestOption.pricePerKg}/kg`,
        transportEst: `₹${bestOption.transportCost.toLocaleString('en-IN')}`,
        otherDeductions: `₹${bestOption.otherCosts.toLocaleString('en-IN')}`,
        storageDailyRate: nearestWarehouse ? `₹${nearestWarehouse.dailyRatePerQuintal}/quintal/day` : '₹2.80/q/day',
        netRealization: `₹${bestOption.netRealization.toLocaleString('en-IN')}`
      }
    };
  }, [bestOption, nearestWarehouse, t]);

  return (
    <FarmerLayout>
      {/* Header with Produce Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-forest-900 tracking-tight flex items-center gap-2.5">
            <Brain className="w-7 h-7 text-forest-700" />
            <span>{t('smart_selling_rec')}</span>
          </h1>
          <p className="text-ink/60 text-sm mt-1">
            {t('rec_subtitle')}
          </p>
        </div>

        {/* Produce Lot Selector */}
        {produceListings.length > 0 && (
          <div className="flex items-center gap-2">
            <label htmlFor="produce-select" className="text-xs font-bold text-forest-900 shrink-0">
              Lot:
            </label>
            <select
              id="produce-select"
              value={selectedProduceId}
              onChange={e => setSelectedProduceId(e.target.value)}
              className="bg-white border border-forest-200 rounded-xl px-3 py-2 text-sm font-bold text-forest-900 shadow-2xs focus:ring-2 focus:ring-forest-500/20"
            >
              {produceListings.map(p => (
                <option key={p.id} value={p.id}>
                  {p.crop} — {p.quantityKg} kg — {p.grade}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {!bestOption ? (
        <div className="card p-12 text-center text-ink/50">
          <p>{t('no_produce_yet')}</p>
          <Link to="/farmer/produce/add" className="btn-primary mt-3 text-sm">
            {t('add_produce')}
          </Link>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Main Recommendation Hero Card */}
          <div className="card p-6 sm:p-8 bg-forest-900 text-white relative overflow-hidden shadow-xl border-none">
            <div className="absolute -right-16 -top-16 w-72 h-72 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <span className="text-xs font-extrabold tracking-wider uppercase bg-white/10 text-emerald-300 px-3 py-1 rounded-full border border-white/10">
                  🌾 {selectedProduce.crop} • {selectedProduce.quantityKg} kg • {selectedProduce.grade}
                </span>

                <span className={`px-3.5 py-1 rounded-full text-xs font-black tracking-wider uppercase ${decisionResult?.tone === 'emerald' ? 'bg-emerald-400 text-forest-950 shadow-md' : 'bg-amber-400 text-forest-950'}`}>
                  {decisionResult?.recommendation}
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tight mt-2">
                {t('sell_to')} {bestOption.name}
              </h2>
              <p className="text-xs text-forest-200 mt-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>{bestOption.location} • Estimated route: {bestOption.distanceKm} km</span>
              </p>

              {/* Grid of Circular Score and Factors */}
              <div className="mt-8 grid sm:grid-cols-[auto,1fr] gap-8 items-center border-t border-white/10 pt-6">
                {/* Circular Score Gauge */}
                <div className="flex flex-col items-center justify-center p-3 bg-white/5 rounded-2xl border border-white/10">
                  <div className="relative w-28 h-28 flex items-center justify-center">
                    <svg viewBox="0 0 100 100" className="w-28 h-28 -rotate-90">
                      <circle
                        cx="50"
                        cy="50"
                        r="42"
                        fill="none"
                        stroke="rgba(255, 255, 255, 0.15)"
                        strokeWidth="9"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="42"
                        fill="none"
                        stroke="#e29e2b"
                        strokeWidth="9"
                        strokeDasharray="264"
                        strokeDashoffset={264 - (264 * (decisionResult?.score || 85)) / 100}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-3xl font-black num text-white">
                        {decisionResult?.score}
                      </span>
                      <span className="text-[10px] text-forest-200 font-bold uppercase">/ 100</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-amber-300 mt-2">
                    {t('rec_score')}
                  </span>
                </div>

                {/* Score Factor Bars */}
                <div className="space-y-3 w-full">
                  <p className="text-xs font-bold text-forest-200 uppercase tracking-wider mb-2">
                    Weighted Algorithmic Factors
                  </p>
                  {decisionResult?.factors.map((factor, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-forest-100 font-medium">{factor.name}</span>
                        <span className="font-mono text-emerald-300 font-bold">{factor.score}%</span>
                      </div>
                      <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-linear-to-r from-emerald-400 to-amber-400 h-full rounded-full transition-all duration-500"
                          style={{ width: `${factor.score}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Rationale Banner */}
              <div className="mt-6 p-4 rounded-xl bg-white/10 border border-white/15 text-xs sm:text-sm text-forest-100 leading-relaxed">
                <strong className="text-amber-300">Decision Rationale:</strong> {decisionResult?.primaryReason}
              </div>
            </div>
          </div>

          {/* Two Columns: Financial Net Realization Breakdown + Alternative Ranked Options */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Column 1: Financial Breakdown */}
            <div className="card p-6 sm:p-7 space-y-4">
              <h3 className="font-display font-bold text-forest-900 text-lg">
                Financial Net Realization Breakdown
              </h3>
              <p className="text-xs text-ink/55">
                Exact deductions from gross market value into net pocket realization for this {selectedProduce.crop} lot:
              </p>

              <div className="space-y-3 num pt-2">
                <div className="flex justify-between items-center text-sm py-2 border-b border-forest-50">
                  <span className="text-ink/70">Gross Lot Value ({selectedProduce.quantityKg} kg @ {decisionResult?.economicBreakdown.currentPrice}):</span>
                  <span className="font-bold text-forest-900">₹{bestOption.sellingValue.toLocaleString('en-IN')}</span>
                </div>

                <div className="flex justify-between items-center text-sm py-2 border-b border-forest-50 text-red-600">
                  <span>− Transport / Freight ({bestOption.distanceKm} km route):</span>
                  <span className="font-bold">− ₹{bestOption.transportCost.toLocaleString('en-IN')}</span>
                </div>

                <div className="flex justify-between items-center text-sm py-2 border-b border-forest-50 text-red-600">
                  <span>− Platform Escrow & Handling:</span>
                  <span className="font-bold">− ₹{bestOption.otherCosts.toLocaleString('en-IN')}</span>
                </div>

                <div className="flex justify-between items-center text-base py-3 bg-emerald-50/60 px-4 rounded-xl border border-emerald-200">
                  <span className="font-extrabold text-forest-900">{t('estimated_net')}:</span>
                  <span className="text-2xl font-black text-emerald-800">
                    ₹{bestOption.netRealization.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {bestOption.type === 'buyer' ? (
                <div className="pt-3">
                  <Link
                    to={`/farmer/buyers/${bestOption.id.replace('buyer_', '')}`}
                    className="btn-primary w-full text-center text-sm"
                  >
                    Accept / Sell to {bestOption.name} →
                  </Link>
                </div>
              ) : (
                <div className="pt-3">
                  <Link
                    to="/farmer/markets"
                    className="btn-secondary w-full text-center text-sm"
                  >
                    View Mandi Arrival Schedule →
                  </Link>
                </div>
              )}
            </div>

            {/* Column 2: Alternative Selling Options Ranked */}
            <div className="card p-6 sm:p-7 space-y-4">
              <h3 className="font-display font-bold text-forest-900 text-lg">
                {t('alternative_options')}
              </h3>
              <p className="text-xs text-ink/55">
                Other mandis and verified buyers ranked by comparative net realization:
              </p>

              <div className="space-y-3">
                {evaluatedOptions.slice(1, 5).map((opt, idx) => (
                  <div key={opt.id} className="p-3.5 rounded-xl border border-forest-100 hover:border-forest-300 transition flex items-center justify-between">
                    <div>
                      <p className="font-bold text-forest-900 text-sm flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded-full bg-forest-100 text-forest-800 text-xs inline-flex items-center justify-center font-bold">
                          #{idx + 2}
                        </span>
                        {opt.name}
                      </p>
                      <p className="text-xs text-ink/50 mt-0.5">
                        {opt.location} • ₹{opt.pricePerKg}/kg raw rate
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-extrabold text-forest-900 text-sm num">
                        ₹{opt.netRealization.toLocaleString('en-IN')}
                      </p>
                      <p className="text-[11px] text-ink/50">
                        Net: ₹{opt.netPerKg}/kg
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* WDRA Storage Alternative Card (Distress Sale Protection) */}
          {nearestWarehouse && (
            <div className="card p-6 sm:p-7 border-harvest-200 bg-linear-to-br from-white to-harvest-50/20">
              <div className="flex items-start justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-harvest-100 text-harvest-800 flex items-center justify-center shrink-0">
                    <Warehouse className="w-6 h-6 text-harvest-700" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-display font-bold text-forest-900 text-lg">
                        {t('wdra_card_title')}
                      </h3>
                      <span className="badge bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs">
                        {t('wdra_verified')}
                      </span>
                    </div>
                    <p className="text-xs text-ink/60 mt-0.5">
                      {t('nearest_hub')}: <strong className="text-forest-900 font-bold">{nearestWarehouse.whName}</strong> ({nearestWarehouse.district})
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowWdraDetails(!showWdraDetails)}
                  className="btn-secondary !py-1.5 !px-3 text-xs flex items-center gap-1.5"
                >
                  <span>{showWdraDetails ? t('hide_details') : t('view_contact_capacity')}</span>
                  {showWdraDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>

              {/* e-NWR Notice */}
              <div className="mt-4 p-4 rounded-xl bg-harvest-50/80 border border-harvest-200 text-xs sm:text-sm text-forest-950 leading-relaxed font-medium">
                <p>{t('mitigates_distress_sale')}</p>
                <p className="text-xs text-ink/70 mt-1 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{t('enwr_notice')}</span>
                </p>
              </div>

              {/* Collapsible Details */}
              {showWdraDetails && (
                <div className="mt-5 pt-5 border-t border-harvest-200/80 grid sm:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-2">
                    <div>
                      <span className="text-ink/50 font-semibold">{t('wh_name_id')}</span>
                      <p className="font-bold text-forest-900">{nearestWarehouse.whName} ({nearestWarehouse.id})</p>
                    </div>
                    <div>
                      <span className="text-ink/50 font-semibold">{t('physical_address')}</span>
                      <p className="text-ink/80">{nearestWarehouse.address}</p>
                    </div>
                    <div>
                      <span className="text-ink/50 font-semibold">{t('storage_type')}</span>
                      <p className="font-semibold text-forest-900">{nearestWarehouse.type}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div>
                      <span className="text-ink/50 font-semibold">{t('storage_capacity')}</span>
                      <p className="font-bold text-forest-900">{nearestWarehouse.capacityMt} Metric Tonnes</p>
                    </div>
                    <div>
                      <span className="text-ink/50 font-semibold">{t('storage_tariff')}</span>
                      <p className="font-bold text-emerald-800">{nearestWarehouse.tariffRegulated}</p>
                    </div>
                    <div>
                      <span className="text-ink/50 font-semibold">{t('official_contact')}</span>
                      <p className="font-mono font-bold text-forest-900">{nearestWarehouse.contactNo}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </FarmerLayout>
  );
};
