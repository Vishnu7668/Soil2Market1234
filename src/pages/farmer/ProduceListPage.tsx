import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sprout,
  Plus,
  Scale,
  MapPin,
  Calendar,
  CheckCircle2,
  Award,
  ArrowRight,
  TrendingUp,
  Tag
} from 'lucide-react';
import { FarmerLayout } from '../../components/layout/FarmerLayout';
import { QualityBadge } from '../../components/ui/QualityBadge';
import { useTranslation } from '../../context/LanguageContext';
import { useApp, Produce } from '../../context/AppContext';

export const ProduceListPage: React.FC = () => {
  const { t } = useTranslation();
  const { produceListings, updateProduceStatus, requestCertification } = useApp();
  const [activeTab, setActiveTab] = useState<'All' | 'Active' | 'Under Negotiation' | 'Sold'>('All');
  const [certifyingId, setCertifyingId] = useState<string | null>(null);

  const filteredProduce = produceListings.filter(item => {
    if (activeTab === 'All') return true;
    return item.status === activeTab;
  });

  const handleRequestCert = async (id: string) => {
    setCertifyingId(id);
    try {
      await requestCertification(id);
    } finally {
      setCertifyingId(null);
    }
  };

  return (
    <FarmerLayout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-forest-900 tracking-tight">
            {t('sidebar_my_produce')}
          </h1>
          <p className="text-ink/60 text-sm mt-1">
            Manage your active and past crop listings across mandis and verified buyers.
          </p>
        </div>
        <Link to="/farmer/produce/add" className="btn-primary text-sm self-start sm:self-auto">
          <Plus className="w-4 h-4" />
          <span>{t('add_produce')}</span>
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 mb-6 border-b border-forest-100 pb-3 overflow-x-auto">
        {(['All', 'Active', 'Under Negotiation', 'Sold'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
              activeTab === tab
                ? 'bg-forest-700 text-white shadow-xs'
                : 'text-ink/60 hover:bg-forest-50 hover:text-forest-900'
            }`}
          >
            {tab === 'All' ? 'All Listings' : tab} ({
              tab === 'All'
                ? produceListings.length
                : produceListings.filter(p => p.status === tab).length
            })
          </button>
        ))}
      </div>

      {/* Listings Grid */}
      {filteredProduce.length === 0 ? (
        <div className="card p-14 text-center">
          <div className="w-14 h-14 rounded-2xl bg-forest-50 text-forest-700 mx-auto flex items-center justify-center mb-4">
            <Sprout className="w-7 h-7" />
          </div>
          <h3 className="font-display font-bold text-forest-900 text-lg">
            {t('no_produce_yet')}
          </h3>
          <p className="text-ink/50 text-xs sm:text-sm mt-1 max-w-md mx-auto">
            List your harvest with quality grading to unlock real-time mandi price comparison and buyer purchase offers.
          </p>
          <Link to="/farmer/produce/add" className="btn-primary mt-5 text-sm inline-flex">
            <Plus className="w-4 h-4 mr-1.5" />
            {t('add_first_listing')}
          </Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProduce.map(produce => (
            <div
              key={produce.id}
              className="card overflow-hidden flex flex-col justify-between hover:border-forest-300 transition-all hover:shadow-md"
            >
              {/* Photo Banner if available */}
              {produce.evidencePhotoUrl && (
                <div className="h-44 w-full relative overflow-hidden bg-forest-100">
                  <img
                    src={produce.evidencePhotoUrl}
                    alt={produce.crop}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <span className={`badge shadow-sm ${
                      produce.status === 'Active'
                        ? 'bg-emerald-600 text-white'
                        : produce.status === 'Sold'
                        ? 'bg-ink text-white'
                        : 'bg-amber-500 text-forest-950 font-bold'
                    }`}>
                      {produce.status}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <QualityBadge
                      mode={produce.verificationMode}
                      certificateId={produce.certificateId}
                      evidencePhotoUrl={produce.evidencePhotoUrl}
                      grade={produce.grade}
                      compact={true}
                      cropName={produce.crop}
                    />
                  </div>
                </div>
              )}

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  {!produce.evidencePhotoUrl && (
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div>
                        <h3 className="font-display font-bold text-forest-900 text-xl">
                          {produce.crop}
                        </h3>
                        <p className="text-xs text-ink/50">{produce.variety}</p>
                      </div>
                      <span className={`badge ${
                        produce.status === 'Active'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-forest-50 text-forest-700'
                      }`}>
                        {produce.status}
                      </span>
                    </div>
                  )}

                  {produce.evidencePhotoUrl && (
                    <div className="mb-3">
                      <h3 className="font-display font-bold text-forest-900 text-xl">
                        {produce.crop}
                      </h3>
                      <p className="text-xs text-ink/50">{produce.variety}</p>
                    </div>
                  )}

                  {!produce.evidencePhotoUrl && (
                    <div className="mb-3">
                      <QualityBadge
                        mode={produce.verificationMode}
                        certificateId={produce.certificateId}
                        evidencePhotoUrl={produce.evidencePhotoUrl}
                        grade={produce.grade}
                        cropName={produce.crop}
                      />
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-y-2 text-xs text-ink/75 pt-3 border-t border-forest-50">
                    <div className="flex items-center gap-1.5 font-bold text-forest-900">
                      <Scale className="w-4 h-4 text-forest-600" />
                      <span>{produce.quantityKg.toLocaleString('en-IN')} kg</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-right justify-end font-bold text-emerald-800">
                      <Tag className="w-4 h-4 text-emerald-600" />
                      <span>₹{produce.expectedPricePerKg || 25}/kg expected</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-forest-600" />
                      <span className="truncate">{produce.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-right justify-end text-ink/50">
                      <Calendar className="w-4 h-4 text-forest-600" />
                      <span>{produce.harvestDate}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-forest-100 space-y-2">
                  <Link
                    to="/farmer/recommendation"
                    className="btn-primary w-full text-xs font-bold !py-2.5 flex items-center justify-center gap-1.5"
                  >
                    <span>{t('view_recommendation')}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  {produce.verificationMode === 'self-declared' && (
                    <button
                      onClick={() => handleRequestCert(produce.id)}
                      disabled={certifyingId === produce.id}
                      className="btn-secondary w-full text-xs font-semibold !py-2 text-forest-800"
                    >
                      <Award className="w-3.5 h-3.5 text-emerald-600 mr-1" />
                      {certifyingId === produce.id ? 'Assaying in progress…' : t('request_certification')}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </FarmerLayout>
  );
};
