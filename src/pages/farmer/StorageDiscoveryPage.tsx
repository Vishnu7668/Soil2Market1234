import React, { useState, useMemo } from 'react';
import {
  Warehouse as WarehouseIcon,
  ShieldCheck,
  Search,
  Phone,
  MapPin,
  Calendar,
  CheckCircle2,
  Filter,
  DollarSign,
  Scale,
  X
} from 'lucide-react';
import { FarmerLayout } from '../../components/layout/FarmerLayout';
import { useTranslation } from '../../context/LanguageContext';
import { useApp, Warehouse } from '../../context/AppContext';

export const StorageDiscoveryPage: React.FC = () => {
  const { t } = useTranslation();
  const { warehouses } = useApp();

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [bookingModalWh, setBookingModalWh] = useState<Warehouse | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState<boolean>(false);
  const [quantityToStore, setQuantityToStore] = useState<number>(50);

  const filteredWarehouses = useMemo(() => {
    return warehouses.filter(wh => {
      const matchSearch = !searchQuery.trim() ||
        wh.whName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        wh.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
        wh.address.toLowerCase().includes(searchQuery.toLowerCase());
      const matchType = selectedType === 'All' || wh.type.toLowerCase().includes(selectedType.toLowerCase());
      return matchSearch && matchType;
    });
  }, [warehouses, searchQuery, selectedType]);

  const handleBookSpace = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setBookingModalWh(null);
    }, 1800);
  };

  return (
    <FarmerLayout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-forest-900 tracking-tight flex items-center gap-2.5">
            <WarehouseIcon className="w-7 h-7 text-forest-700" />
            <span>{t('storage_title')}</span>
          </h1>
          <p className="text-ink/60 text-sm mt-1">
            {t('storage_subtitle')}
          </p>
        </div>
      </div>

      {/* WDRA Statutory Banner */}
      <div className="card p-5 mb-8 bg-harvest-50/70 border-harvest-200">
        <div className="flex items-start gap-3">
          <ShieldCheck className="w-6 h-6 text-emerald-700 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-forest-950 leading-relaxed">
            <h4 className="font-bold text-base text-forest-900 mb-1">
              WDRA Statutory Protection & e-NWR Pledge Financing
            </h4>
            <p className="text-ink/75">
              Warehouses listed below are registered under the <strong>Warehousing Development and Regulatory Authority (WDRA)</strong>, Government of India. Farmers depositing produce receive an <strong>electronic Negotiable Warehouse Receipt (e-NWR)</strong>, enabling post-harvest pledge loans up to 70% of crop value from scheduled commercial banks at subsidized interest rates, preventing immediate distress selling.
            </p>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="card p-4 sm:p-5 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="w-4 h-4 text-ink/40 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder={t('search_storage')}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-forest-50/50 border border-forest-200 rounded-xl pl-10 pr-3.5 py-2 text-sm text-ink focus:ring-2 focus:ring-forest-500/20"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-forest-600 shrink-0" />
            <select
              value={selectedType}
              onChange={e => setSelectedType(e.target.value)}
              className="w-full bg-forest-50/50 border border-forest-200 rounded-xl px-3.5 py-2 text-sm font-semibold text-forest-950 focus:ring-2 focus:ring-forest-500/20"
            >
              <option value="All">{t('all_types')}</option>
              <option value="Cold">{t('cold_storage')}</option>
              <option value="Dry">{t('dry_warehouse')}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Warehouse Cards Grid */}
      <div className="grid sm:grid-cols-2 gap-6">
        {filteredWarehouses.map(wh => (
          <div
            key={wh.id}
            className="card p-6 flex flex-col justify-between hover:border-forest-300 transition-all hover:shadow-md"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <h3 className="font-display font-bold text-forest-900 text-lg">
                    {wh.whName}
                  </h3>
                  <p className="text-xs text-ink/50 font-mono mt-0.5">
                    WDRA Registration Code: {wh.id}
                  </p>
                </div>
                {wh.wdraRegistered && (
                  <span className="badge bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs shrink-0">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    WDRA Verified
                  </span>
                )}
              </div>

              <div className="space-y-2 text-xs text-ink/75 my-4">
                <p className="flex items-start gap-1.5">
                  <MapPin className="w-4 h-4 text-forest-600 shrink-0 mt-0.5" />
                  <span>{wh.address} (~{wh.distanceKm} km from farm)</span>
                </p>
                <p className="flex items-center gap-1.5">
                  <Scale className="w-4 h-4 text-forest-600 shrink-0" />
                  <span>Storage Capacity: <strong className="text-forest-900 font-bold">{wh.capacityMt.toLocaleString('en-IN')} MT</strong></span>
                </p>
                <p className="flex items-center gap-1.5">
                  <DollarSign className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Tariff: <strong className="text-emerald-800 font-bold">{wh.tariffRegulated}</strong></span>
                </p>
                <p className="flex items-center gap-1.5">
                  <Phone className="w-4 h-4 text-forest-600 shrink-0" />
                  <span>Contact: <strong className="text-forest-900 font-mono">{wh.contactNo}</strong></span>
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-forest-100 flex items-center justify-between">
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
                e-NWR Loan Eligible
              </span>
              <button
                onClick={() => setBookingModalWh(wh)}
                className="btn-primary !py-2 !px-3.5 text-xs font-bold"
              >
                {t('book_space')}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Booking Space Modal */}
      {bookingModalWh && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/50 backdrop-blur-2xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-forest-100 relative">
            <button
              onClick={() => setBookingModalWh(null)}
              className="absolute top-4 right-4 text-ink/40 hover:text-ink"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-forest-100 text-forest-800 flex items-center justify-center">
                <WarehouseIcon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-bold text-forest-900 text-lg">
                  Reserve Warehouse Space
                </h3>
                <p className="text-xs text-ink/50">{bookingModalWh.whName}</p>
              </div>
            </div>

            {bookingSuccess ? (
              <div className="p-6 text-center bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-800 space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-base">Space Request Transmitted!</h4>
                <p className="text-xs">
                  The warehouse manager has received your slot reservation. An electronic token will be sent to your mobile.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBookSpace} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-forest-900 mb-1">
                    Estimated Quantity to Store (Quintals):
                  </label>
                  <input
                    type="number"
                    min="10"
                    step="5"
                    value={quantityToStore}
                    onChange={e => setQuantityToStore(Number(e.target.value))}
                    className="w-full bg-forest-50/50 border border-forest-200 rounded-xl px-3 py-2 text-sm font-bold text-forest-950"
                  />
                  <p className="text-[11px] text-ink/50 mt-1">
                    Daily tariff: ₹{(quantityToStore * bookingModalWh.dailyRatePerQuintal).toFixed(0)} / day (Govt. regulated)
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-harvest-50/70 border border-harvest-200 space-y-1">
                  <p className="font-bold text-forest-950">Official Intake Address:</p>
                  <p className="text-ink/75">{bookingModalWh.address}</p>
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-forest-100">
                  <button
                    type="button"
                    onClick={() => setBookingModalWh(null)}
                    className="btn-secondary text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary text-xs font-bold"
                  >
                    Confirm Reservation Request
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </FarmerLayout>
  );
};
