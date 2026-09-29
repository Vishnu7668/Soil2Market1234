import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  TrendingUp,
  RefreshCw,
  Scale,
  MapPin,
  Calendar,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  Search,
  Filter
} from 'lucide-react';
import { FarmerLayout } from '../../components/layout/FarmerLayout';
import { useTranslation } from '../../context/LanguageContext';
import { useApp } from '../../context/AppContext';
import { CROPS_LIST, getEstimatedDistance, calculateTransportPerQuintal } from '../../data/agmarknetData';

export const MarketPricesPage: React.FC = () => {
  const { t } = useTranslation();
  const { mandiPrices, isLiveMandiData, mandiLastUpdated, refreshMandiPrices, isLoadingMandi } = useApp();

  const [selectedCrop, setSelectedCrop] = useState<string>('Tomato');
  const [selectedState, setSelectedState] = useState<string>('All States');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('All Districts');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Extract unique states and districts
  const availableStates = useMemo(() => {
    const states = new Set<string>();
    mandiPrices.forEach(m => {
      if (m.state) states.add(m.state);
    });
    return Array.from(states).sort();
  }, [mandiPrices]);

  const availableDistricts = useMemo(() => {
    if (selectedState === 'All States') return [];
    const districts = new Set<string>();
    mandiPrices.forEach(m => {
      if (m.state === selectedState && m.district) districts.add(m.district);
    });
    return Array.from(districts).sort();
  }, [selectedState, mandiPrices]);

  // Filtered list
  const filteredPrices = useMemo(() => {
    return mandiPrices.filter(item => {
      const matchCrop = selectedCrop === 'All Crops' || item.commodity.toLowerCase() === selectedCrop.toLowerCase();
      const matchState = selectedState === 'All States' || item.state.toLowerCase() === selectedState.toLowerCase();
      const matchDistrict = selectedDistrict === 'All Districts' || item.district.toLowerCase() === selectedDistrict.toLowerCase();
      const matchSearch = !searchQuery.trim() ||
        item.market.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.commodity.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCrop && matchState && matchDistrict && matchSearch;
    });
  }, [mandiPrices, selectedCrop, selectedState, selectedDistrict, searchQuery]);

  const handleRefresh = () => {
    refreshMandiPrices(selectedCrop, selectedState, selectedDistrict);
  };

  return (
    <FarmerLayout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-forest-900 tracking-tight">
            {t('mandi_prices_title')}
          </h1>
          <p className="text-ink/60 text-sm mt-1">
            {t('mandi_prices_subtitle')}
          </p>
        </div>
        <Link to="/farmer/markets/compare" className="btn-secondary text-sm self-start sm:self-auto">
          <span>{t('compare_net_realization')}</span>
        </Link>
      </div>

      {/* Live/Cached Data Status Bar */}
      <div className={`card p-4 mb-6 flex items-center justify-between flex-wrap gap-3 ${isLiveMandiData ? 'bg-emerald-50/70 border-emerald-200' : 'bg-harvest-50/70 border-harvest-200'}`}>
        <div className="flex items-center gap-2.5">
          {isLiveMandiData ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-harvest-600 shrink-0" />
          )}
          <div>
            <p className="text-xs sm:text-sm font-bold text-forest-950">
              {isLiveMandiData ? t('data_source_live') : t('data_source_cached')}
            </p>
            <p className="text-[11px] text-ink/55">
              Status: {mandiLastUpdated} • Origin: Niphad APMC Yard, Nashik
            </p>
          </div>
        </div>

        <button
          onClick={handleRefresh}
          disabled={isLoadingMandi}
          className="btn-secondary !py-1.5 !px-3 text-xs flex items-center gap-1.5"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoadingMandi ? 'animate-spin' : ''}`} />
          <span>{isLoadingMandi ? 'Refreshing…' : t('refresh_prices')}</span>
        </button>
      </div>

      {/* Filter Controls Bar */}
      <div className="card p-4 sm:p-5 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Crop Dropdown */}
          <div>
            <label htmlFor="f-crop" className="block text-xs font-bold text-forest-900 mb-1">
              {t('select_crop')}
            </label>
            <select
              id="f-crop"
              value={selectedCrop}
              onChange={e => setSelectedCrop(e.target.value)}
              className="w-full bg-forest-50/50 border border-forest-200 rounded-xl px-3 py-2 text-sm font-semibold text-forest-950 focus:outline-none focus:ring-2 focus:ring-forest-500/20"
            >
              <option value="All Crops">{t('all_crops')}</option>
              {CROPS_LIST.map(crop => (
                <option key={crop} value={crop}>{crop}</option>
              ))}
            </select>
          </div>

          {/* State Dropdown */}
          <div>
            <label htmlFor="f-state" className="block text-xs font-bold text-forest-900 mb-1">
              {t('select_state')}
            </label>
            <select
              id="f-state"
              value={selectedState}
              onChange={e => {
                setSelectedState(e.target.value);
                setSelectedDistrict('All Districts');
              }}
              className="w-full bg-forest-50/50 border border-forest-200 rounded-xl px-3 py-2 text-sm font-semibold text-forest-950 focus:outline-none focus:ring-2 focus:ring-forest-500/20"
            >
              <option value="All States">{t('all_states')}</option>
              {availableStates.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>

          {/* District Dropdown */}
          <div>
            <label htmlFor="f-district" className="block text-xs font-bold text-forest-900 mb-1">
              {t('select_district')}
            </label>
            <select
              id="f-district"
              value={selectedDistrict}
              disabled={selectedState === 'All States'}
              onChange={e => setSelectedDistrict(e.target.value)}
              className="w-full bg-forest-50/50 border border-forest-200 rounded-xl px-3 py-2 text-sm font-semibold text-forest-950 focus:outline-none focus:ring-2 focus:ring-forest-500/20 disabled:opacity-50"
            >
              <option value="All Districts">{t('all_districts')}</option>
              {availableDistricts.map(district => (
                <option key={district} value={district}>{district}</option>
              ))}
            </select>
          </div>

          {/* Search Query */}
          <div>
            <label htmlFor="f-search" className="block text-xs font-bold text-forest-900 mb-1">
              Search Mandi
            </label>
            <div className="relative">
              <input
                id="f-search"
                type="text"
                placeholder="Market or city..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-forest-50/50 border border-forest-200 rounded-xl pl-9 pr-3 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-forest-500/20"
              />
              <Search className="w-4 h-4 text-ink/40 absolute left-3 top-2.5" />
            </div>
          </div>
        </div>
      </div>

      {/* Prices Results Table / Cards */}
      {filteredPrices.length === 0 ? (
        <div className="card p-12 text-center">
          <p className="text-ink/50 text-sm">{t('no_market_data')}</p>
          <button
            onClick={() => {
              setSelectedCrop('All Crops');
              setSelectedState('All States');
              setSearchQuery('');
            }}
            className="btn-secondary text-xs mt-3"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-forest-50/70 text-left text-ink/60 text-xs uppercase tracking-wider border-b border-forest-100">
                  <th className="px-5 py-3.5 font-bold text-forest-900">{t('mandi_name')}</th>
                  <th className="px-5 py-3.5 font-bold text-forest-900">Crop / Variety</th>
                  <th className="px-5 py-3.5 font-bold text-forest-900">Grade</th>
                  <th className="px-5 py-3.5 font-bold text-forest-900 text-right">{t('min_price')}</th>
                  <th className="px-5 py-3.5 font-bold text-forest-900 text-right">{t('max_price')}</th>
                  <th className="px-5 py-3.5 font-bold text-forest-900 text-right">{t('modal_price')}</th>
                  <th className="px-5 py-3.5 font-bold text-forest-900">{t('arrival_date')}</th>
                  <th className="px-5 py-3.5 font-bold text-forest-900 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-forest-50">
                {filteredPrices.map((item, index) => {
                  const dist = getEstimatedDistance(item.market + ' ' + item.district);
                  const freightPerQ = calculateTransportPerQuintal(dist.distanceKm);

                  return (
                    <tr key={index} className="hover:bg-forest-50/40 transition">
                      <td className="px-5 py-3.5 font-bold text-forest-900">
                        <div>
                          <span>{item.market} APMC</span>
                          <span className="block text-[11px] font-normal text-ink/50">
                            {item.district}, {item.state} • ~{dist.distanceKm} km
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="font-semibold text-forest-950">{item.commodity}</span>
                        <span className="block text-[11px] text-ink/50">{item.variety}</span>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="badge bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px]">
                          {item.grade || 'Grade A'}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-right font-medium text-ink/75 num">
                        ₹{item.minPrice}
                      </td>
                      <td className="px-5 py-3.5 text-right font-medium text-ink/75 num">
                        ₹{item.maxPrice}
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <span className="font-extrabold text-forest-800 text-base num">
                          ₹{item.modalPrice}
                        </span>
                        <span className="block text-[10px] text-ink/45 font-medium">
                          (₹{(item.modalPrice / 100).toFixed(1)}/kg)
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-xs text-ink/60 whitespace-nowrap">
                        {item.arrivalDate}
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <Link
                          to="/farmer/markets/compare"
                          className="text-xs font-bold text-forest-700 hover:text-forest-900 hover:underline inline-flex items-center gap-1"
                        >
                          <span>Compare</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </FarmerLayout>
  );
};
