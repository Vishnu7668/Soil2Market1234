import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Sprout,
  TrendingUp,
  Receipt,
  Users,
  ArrowRight,
  MapPin,
  Truck,
  Plus,
  ShieldCheck,
  Calendar,
  Scale,
  Warehouse,
  Landmark,
  BadgePercent,
  ExternalLink,
  Info
} from 'lucide-react';
import { FarmerLayout } from '../../components/layout/FarmerLayout';
import { StatCard } from '../../components/ui/StatCard';
import { QualityBadge } from '../../components/ui/QualityBadge';
import { useTranslation } from '../../context/LanguageContext';
import { useApp } from '../../context/AppContext';

export const FarmerDashboard: React.FC = () => {
  const { t } = useTranslation();
  const {
    farmerProfile,
    produceListings,
    buyers,
    mandiPrices,
    isLiveMandiData,
    calculateNetRealization
  } = useApp();

  const primaryProduce = produceListings[0];

  // Calculate recommendation metrics for primary active produce
  const sellingOpportunities = useMemo(() => {
    if (!primaryProduce) return [];
    return calculateNetRealization(primaryProduce.crop, primaryProduce.quantityKg, primaryProduce.grade);
  }, [primaryProduce, calculateNetRealization]);

  const bestOpportunity = sellingOpportunities[0] || null;

  // Best current price in market
  const bestCurrentPrice = useMemo(() => {
    if (!primaryProduce) return null;
    const cropPrices = mandiPrices.filter(
      m => m.commodity.toLowerCase() === primaryProduce.crop.toLowerCase()
    );
    if (cropPrices.length === 0) return null;
    const maxModal = Math.max(...cropPrices.map(c => c.modalPrice));
    const market = cropPrices.find(c => c.modalPrice === maxModal);
    return {
      pricePerKg: (maxModal / 100).toFixed(1),
      marketName: market?.market || 'Mandi'
    };
  }, [primaryProduce, mandiPrices]);

  // Potential portfolio value
  const potentialValue = useMemo(() => {
    return produceListings.reduce((sum, item) => {
      const perKg = item.expectedPricePerKg || 25;
      return sum + (item.quantityKg * perKg);
    }, 0);
  }, [produceListings]);

  const matchedBuyersCount = useMemo(() => {
    if (!primaryProduce) return 0;
    return buyers.filter(b => b.requiredCrop.toLowerCase() === primaryProduce.crop.toLowerCase()).length;
  }, [primaryProduce, buyers]);

  return (
    <FarmerLayout>
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-forest-900 tracking-tight">
            {t('welcome_back')}, {farmerProfile.name.split(' ')[0]} 👋
          </h1>
          <p className="text-ink/60 text-sm mt-1">
            {t('dashboard_subtitle')}
          </p>
        </div>
        <Link to="/farmer/produce/add" className="btn-primary self-start sm:self-auto text-sm">
          <Plus className="w-4 h-4" />
          <span>{t('add_produce')}</span>
        </Link>
      </div>

      {/* Top 4 Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          label={t('active_produce')}
          value={`${produceListings.length} ${t('listings')}`}
          sub={`${produceListings.reduce((acc, p) => acc + p.quantityKg, 0)} kg total`}
          icon={Sprout}
          tone="forest"
        />
        <StatCard
          label={t('best_price')}
          value={bestCurrentPrice ? `₹${bestCurrentPrice.pricePerKg}/kg` : '₹32.5/kg'}
          sub={bestCurrentPrice ? `${bestCurrentPrice.marketName} · Live Mandi` : 'Pimpalgaon APMC'}
          icon={TrendingUp}
          tone="harvest"
        />
        <StatCard
          label={t('potential_value')}
          value={`₹${potentialValue.toLocaleString('en-IN')}`}
          sub={primaryProduce ? `for ${primaryProduce.crop} · ${primaryProduce.quantityKg} kg` : 'across all listings'}
          icon={Receipt}
          tone="sprout"
        />
        <StatCard
          label={t('matched_buyers')}
          value={`${matchedBuyersCount} ${t('buyers')}`}
          sub={t('for_your_produce')}
          icon={Users}
          tone="forest"
        />
      </div>

      {/* Hero "Your Selling Opportunity" Card */}
      {primaryProduce && bestOpportunity && (
        <div className="card p-6 sm:p-8 mb-8 border-forest-200/80 bg-linear-to-br from-white via-forest-50/20 to-white relative overflow-hidden">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs uppercase tracking-wider text-ink/45 font-bold">
                  {t('selling_opportunity')}
                </span>
                <QualityBadge
                  mode={primaryProduce.verificationMode}
                  certificateId={primaryProduce.certificateId}
                  evidencePhotoUrl={primaryProduce.evidencePhotoUrl}
                  compact={true}
                  cropName={primaryProduce.crop}
                />
              </div>
              <h2 className="text-xl sm:text-2xl font-display font-extrabold text-forest-900">
                {primaryProduce.crop} — {primaryProduce.quantityKg} kg — {primaryProduce.grade}
              </h2>
            </div>
            <span className="badge bg-sprout-100 text-sprout-800 border border-sprout-300">
              <ShieldCheck className="w-3.5 h-3.5" />
              {t('best_match_found')}
            </span>
          </div>

          <div className="grid md:grid-cols-3 gap-6 items-center">
            {/* Left: Offer Value */}
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase text-ink/50 tracking-wider">
                {t('current_best_offer')}
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-forest-900 num">
                  ₹{bestOpportunity.pricePerKg}
                </span>
                <span className="text-xs text-ink/50 font-medium">{t('per_kg')}</span>
              </div>
              <p className="text-xs text-ink/50">
                {t('expected_value')}: <span className="font-semibold text-ink">₹{bestOpportunity.sellingValue.toLocaleString('en-IN')}</span>
              </p>
            </div>

            {/* Middle: Details */}
            <div className="space-y-2.5 text-sm">
              <div className="flex items-center gap-2 text-ink/70">
                <Users className="w-4 h-4 text-forest-600 shrink-0" />
                <span className="truncate">
                  {bestOpportunity.type === 'buyer' ? t('best_buyer') : t('best_market')}:{' '}
                  <strong className="text-forest-900 font-bold">{bestOpportunity.name}</strong>
                </span>
              </div>
              <div className="flex items-center gap-2 text-ink/70">
                <MapPin className="w-4 h-4 text-forest-600 shrink-0" />
                <span>
                  {t('location')}: <strong className="text-ink font-semibold">{bestOpportunity.location}</strong>
                </span>
              </div>
              <div className="flex items-center gap-2 text-ink/70">
                <Truck className="w-4 h-4 text-forest-600 shrink-0" />
                <span>
                  {t('est_transport')}: <strong className="text-ink font-semibold">₹{bestOpportunity.transportCost.toLocaleString('en-IN')}</strong> ({bestOpportunity.distanceKm} km)
                </span>
              </div>
            </div>

            {/* Right: Net Realization */}
            <div className="bg-forest-50/90 border border-forest-200/80 rounded-2xl p-5 flex flex-col justify-center">
              <p className="text-xs font-semibold text-ink/55 uppercase tracking-wide">
                {t('expected_net_realization')}
              </p>
              <p className="text-3xl font-extrabold num text-forest-900 mt-1">
                ₹{bestOpportunity.netRealization.toLocaleString('en-IN')}
              </p>
              <Link
                to="/farmer/recommendation"
                className="mt-3.5 inline-flex items-center gap-1.5 text-sm font-bold text-forest-700 hover:text-forest-900 group"
              >
                <span>{t('view_recommendation')}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Two Column Section: Active Produce Listings + Live Mandi Market Feed */}
      <div className="grid lg:grid-cols-3 gap-8 mb-8">
        {/* Active Listings Column (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-forest-900 text-lg">
              {t('active_produce')}
            </h3>
            <Link to="/farmer/produce" className="text-xs font-semibold text-forest-700 hover:underline">
              {t('view_all')} ({produceListings.length}) →
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {produceListings.map(item => (
              <div key={item.id} className="card p-5 flex flex-col justify-between hover:border-forest-300 transition">
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h4 className="font-display font-bold text-forest-900 text-base">
                        {item.crop}
                      </h4>
                      <p className="text-xs text-ink/50">{item.variety}</p>
                    </div>
                    <span className={`badge ${item.status === 'Active' ? 'bg-sprout-100 text-sprout-800' : 'bg-forest-50 text-forest-700'}`}>
                      {item.status}
                    </span>
                  </div>

                  <div className="my-2.5">
                    <QualityBadge
                      mode={item.verificationMode}
                      certificateId={item.certificateId}
                      evidencePhotoUrl={item.evidencePhotoUrl}
                      grade={item.grade}
                      cropName={item.crop}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-y-2 text-xs text-ink/70 mt-3 pt-3 border-t border-forest-50">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Scale className="w-3.5 h-3.5 text-forest-600" />
                      {item.quantityKg} kg
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-forest-600" />
                      {item.location}
                    </span>
                    <span className="flex items-center gap-1.5 col-span-2 text-ink/50">
                      <Calendar className="w-3.5 h-3.5 text-forest-600" />
                      Harvested: {new Date(item.harvestDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-forest-50">
                  <Link
                    to="/farmer/recommendation"
                    className="btn-secondary w-full text-xs font-semibold !py-2"
                  >
                    {t('view_recommendation')}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Mandi Rates Snippet Column (1 col) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-forest-900 text-lg">
              Live Mandi Ticker
            </h3>
            <Link to="/farmer/markets" className="text-xs font-semibold text-forest-700 hover:underline">
              {t('view_all')} →
            </Link>
          </div>

          <div className="card p-5 space-y-3">
            <div className="flex items-center justify-between text-xs pb-2 border-b border-forest-100">
              <span className="font-semibold text-forest-900">Mandi / Crop</span>
              <span className="font-semibold text-forest-900">Modal Rate</span>
            </div>
            {mandiPrices.slice(0, 5).map((m, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs py-1.5 hover:bg-forest-50/50 px-1 rounded transition">
                <div>
                  <p className="font-bold text-forest-900">{m.market}</p>
                  <p className="text-[11px] text-ink/50">{m.commodity} • {m.district}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-forest-800 num">₹{m.modalPrice}/q</p>
                  <p className="text-[10px] text-ink/45">₹{(m.modalPrice / 100).toFixed(1)}/kg</p>
                </div>
              </div>
            ))}
            <div className="pt-2 border-t border-forest-100">
              <Link
                to="/farmer/markets/compare"
                className="text-xs font-bold text-forest-700 hover:text-forest-900 flex items-center justify-between"
              >
                <span>{t('compare_net_realization')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* WDRA Safety Note */}
          <div className="card p-4 bg-harvest-50/60 border-harvest-200">
            <div className="flex items-start gap-2.5">
              <Warehouse className="w-4 h-4 text-harvest-700 shrink-0 mt-0.5" />
              <div>
                <h5 className="font-bold text-xs text-forest-950">
                  WDRA Distress Sale Protection
                </h5>
                <p className="text-[11px] text-ink/70 mt-0.5 leading-relaxed">
                  Avoid selling at distress prices. Store at registered warehouses and get up to 70% e-NWR pledge loans.
                </p>
                <Link to="/farmer/storage" className="text-[11px] font-bold text-harvest-800 hover:underline mt-1.5 inline-block">
                  Find Nearest WDRA Hub →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Government Schemes & Subsidies Feature Banner */}
      <div className="card p-6 sm:p-7 border-emerald-200 bg-linear-to-br from-white via-emerald-50/30 to-forest-50/40 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 border border-emerald-200 shadow-2xs">
              <Landmark className="w-6 h-6 text-emerald-700" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display font-extrabold text-forest-950 text-xl">
                  {t('govt_schemes_title')}
                </h3>
                <span className="badge bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                  Direct Benefits (DBT)
                </span>
              </div>
              <p className="text-xs text-ink/65 mt-0.5">
                Central & State subsidies for direct income, solar irrigation, machinery, and crop insurance.
              </p>
            </div>
          </div>

          <Link
            to="/farmer/schemes"
            className="btn-primary text-xs font-bold self-start sm:self-auto flex items-center gap-1.5"
          >
            <span>Check My Scheme Eligibility</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 3 Featured Scheme Cards */}
        <div className="grid sm:grid-cols-3 gap-4 pt-2">
          <Link
            to="/farmer/schemes"
            className="p-4 rounded-xl border border-forest-100 bg-white hover:border-emerald-300 hover:shadow-sm transition group"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-mono text-xs font-black text-emerald-700">PM-KISAN</span>
              <span className="badge bg-emerald-50 text-emerald-800 text-[10px] font-bold">₹6,000/yr</span>
            </div>
            <h4 className="text-xs font-bold text-forest-950 group-hover:text-emerald-800 transition">
              Direct Income Support
            </h4>
            <p className="text-[11px] text-ink/60 mt-1 line-clamp-2 leading-relaxed">
              ₹2,000 transferred every 4 months directly into Aadhaar-seeded bank account for all landholders.
            </p>
          </Link>

          <Link
            to="/farmer/schemes"
            className="p-4 rounded-xl border border-forest-100 bg-white hover:border-emerald-300 hover:shadow-sm transition group"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-mono text-xs font-black text-amber-600">PM-KUSUM</span>
              <span className="badge bg-amber-50 text-amber-800 text-[10px] font-bold">60% Subsidy</span>
            </div>
            <h4 className="text-xs font-bold text-forest-950 group-hover:text-amber-800 transition">
              Solar Agricultural Pumps
            </h4>
            <p className="text-[11px] text-ink/60 mt-1 line-clamp-2 leading-relaxed">
              Install 3 to 7.5 HP solar water pumps. Govt covers 60%, bank covers 30%, farmer pays only 10%.
            </p>
          </Link>

          <Link
            to="/farmer/schemes"
            className="p-4 rounded-xl border border-forest-100 bg-white hover:border-emerald-300 hover:shadow-sm transition group"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-mono text-xs font-black text-blue-700">PMFBY</span>
              <span className="badge bg-blue-50 text-blue-800 text-[10px] font-bold">1.5% - 2% Premium</span>
            </div>
            <h4 className="text-xs font-bold text-forest-950 group-hover:text-blue-800 transition">
              Pradhan Mantri Fasal Bima
            </h4>
            <p className="text-[11px] text-ink/60 mt-1 line-clamp-2 leading-relaxed">
              Comprehensive crop insurance against droughts, unseasonal rainfall, hailstorms, and pests.
            </p>
          </Link>
        </div>
      </div>
    </FarmerLayout>
  );
};
