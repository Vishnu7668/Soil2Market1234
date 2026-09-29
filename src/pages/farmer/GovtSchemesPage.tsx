import React, { useState, useMemo } from 'react';
import {
  Landmark,
  Search,
  Filter,
  CheckCircle2,
  ExternalLink,
  Phone,
  FileText,
  BadgePercent,
  Sun,
  ShieldCheck,
  Tractor,
  Warehouse,
  Sprout,
  Sparkles,
  Info,
  ChevronRight,
  Bookmark,
  BookmarkCheck,
  ArrowRight,
  X,
  HelpCircle,
  Clock,
  Layers
} from 'lucide-react';
import { FarmerLayout } from '../../components/layout/FarmerLayout';
import { useTranslation } from '../../context/LanguageContext';
import { useApp } from '../../context/AppContext';
import { GOVT_SCHEMES_DATA, SCHEME_CATEGORIES, GovtScheme } from '../../data/govtSchemesData';

export const GovtSchemesPage: React.FC = () => {
  const { t, language } = useTranslation();
  const { farmerProfile } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSchemeForModal, setSelectedSchemeForModal] = useState<GovtScheme | null>(null);
  const [savedSchemeIds, setSavedSchemeIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('m2m_saved_schemes');
      return saved ? JSON.parse(saved) : ['pm-kisan', 'pm-kusum', 'pmfby'];
    } catch {
      return ['pm-kisan', 'pm-kusum', 'pmfby'];
    }
  });

  // Eligibility filter state
  const [farmerLandCategory, setFarmerLandCategory] = useState<'all' | 'small' | 'medium' | 'large'>('small');
  const [farmerSocialCategory, setFarmerSocialCategory] = useState<'all' | 'small_marginal' | 'women' | 'general'>('all');

  const toggleSaveScheme = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedSchemeIds(prev => {
      const updated = prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id];
      try {
        localStorage.setItem('m2m_saved_schemes', JSON.stringify(updated));
      } catch (err) {
        console.warn('Could not save schemes', err);
      }
      return updated;
    });
  };

  const filteredSchemes = useMemo(() => {
    return GOVT_SCHEMES_DATA.filter(scheme => {
      const isHi = language === 'hi';
      const name = isHi ? scheme.nameHi : scheme.name;
      const authority = isHi ? scheme.authorityHi : scheme.authority;
      const benefit = isHi ? scheme.financialBenefitHi : scheme.financialBenefit;

      const matchesSearch = !searchQuery.trim() ||
        name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        scheme.shortCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        authority.toLowerCase().includes(searchQuery.toLowerCase()) ||
        benefit.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory === 'all' || scheme.category === selectedCategory;

      // Eligibility filter
      let matchesEligibility = true;
      if (farmerLandCategory === 'small' && scheme.landholdingCriteria === 'Marginal & Small (< 2 Ha)') {
        matchesEligibility = true;
      }

      return matchesSearch && matchesCategory && matchesEligibility;
    });
  }, [searchQuery, selectedCategory, farmerLandCategory, language]);

  const getCategoryIcon = (category: GovtScheme['category']) => {
    switch (category) {
      case 'financial':
        return <Landmark className="w-5 h-5 text-emerald-700" />;
      case 'insurance':
        return <ShieldCheck className="w-5 h-5 text-blue-700" />;
      case 'solar':
        return <Sun className="w-5 h-5 text-amber-600" />;
      case 'machinery':
        return <Tractor className="w-5 h-5 text-red-600" />;
      case 'storage':
        return <Warehouse className="w-5 h-5 text-harvest-700" />;
      case 'organic':
        return <Sprout className="w-5 h-5 text-emerald-600" />;
      case 'horticulture':
        return <BadgePercent className="w-5 h-5 text-purple-700" />;
      default:
        return <FileText className="w-5 h-5 text-forest-700" />;
    }
  };

  return (
    <FarmerLayout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="badge bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-bold">
              🇮🇳 Government of India & State Agriculture Portals
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-black text-forest-900 tracking-tight flex items-center gap-2.5">
            <Landmark className="w-7 h-7 text-forest-700 shrink-0" />
            <span>{t('govt_schemes_title')}</span>
          </h1>
          <p className="text-ink/65 text-sm mt-1 max-w-3xl">
            {t('govt_schemes_subtitle')}
          </p>
        </div>

        {/* 24x7 Helpline Pill */}
        <div className="bg-forest-900 text-white rounded-2xl p-4 shadow-sm shrink-0 border border-forest-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-forest-950 flex items-center justify-center font-bold">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold tracking-wider text-forest-200">
                Kisan Call Centre (24x7)
              </p>
              <a
                href="tel:18001801551"
                className="text-base font-extrabold text-amber-300 hover:underline block leading-tight font-mono"
              >
                1800-180-1551
              </a>
              <span className="text-[10px] text-white/70">Toll-Free in 22 Regional Languages</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Quick Eligibility Checker */}
      <div className="card p-5 sm:p-6 mb-8 border-forest-200 bg-linear-to-br from-white via-forest-50/30 to-emerald-50/20">
        <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
          <h3 className="font-display font-extrabold text-forest-900 text-base flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>{t('eligibility_calculator')}</span>
          </h3>
          <span className="text-xs text-forest-800 font-bold bg-white border border-forest-200 px-3 py-1 rounded-full">
            Farm Profile: {farmerProfile.name} • {farmerProfile.landAreaAcres} Acres ({farmerProfile.village}, {farmerProfile.district})
          </span>
        </div>

        <p className="text-xs text-ink/60 mb-4">
          Select your holding criteria to instantly filter programs offering the highest financial subsidy:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-[11px] font-bold text-forest-900 uppercase tracking-wider mb-1">
              Landholding Size
            </label>
            <select
              value={farmerLandCategory}
              onChange={e => setFarmerLandCategory(e.target.value as any)}
              className="w-full bg-white border border-forest-200 rounded-xl px-3 py-2 text-xs font-bold text-forest-950 shadow-2xs focus:ring-2 focus:ring-forest-500/20"
            >
              <option value="all">All Farm Sizes</option>
              <option value="small">Small & Marginal (&lt; 2 Hectares / 5 Acres)</option>
              <option value="medium">Medium Holding (2 to 5 Hectares)</option>
              <option value="large">Large Holding (&gt; 5 Hectares)</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-forest-900 uppercase tracking-wider mb-1">
              Farmer Category
            </label>
            <select
              value={farmerSocialCategory}
              onChange={e => setFarmerSocialCategory(e.target.value as any)}
              className="w-full bg-white border border-forest-200 rounded-xl px-3 py-2 text-xs font-bold text-forest-950 shadow-2xs focus:ring-2 focus:ring-forest-500/20"
            >
              <option value="all">All Farmers</option>
              <option value="small_marginal">Small / Marginal Farmer (Priority Subsidies)</option>
              <option value="women">Woman Farmer / Mahila Kisan</option>
              <option value="general">General Farmer</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-forest-900 uppercase tracking-wider mb-1">
              Primary Cultivation
            </label>
            <div className="w-full bg-forest-100/60 border border-forest-200 rounded-xl px-3 py-2 text-xs font-semibold text-forest-900">
              {farmerProfile.primaryCrops.join(', ')} (Horticulture & Cash Crops)
            </div>
          </div>
        </div>
      </div>

      {/* Search & Category Filter Navigation */}
      <div className="space-y-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-ink/40 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder={t('search_schemes')}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-forest-200 rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-forest-950 shadow-2xs focus:ring-2 focus:ring-forest-500/20"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-3 text-ink/40 hover:text-ink"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1.5 scrollbar-thin">
          {SCHEME_CATEGORIES.map(cat => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition border ${
                  isSelected
                    ? 'bg-forest-700 text-white border-forest-700 shadow-2xs'
                    : 'bg-white text-ink/70 border-forest-200 hover:bg-forest-50 hover:text-forest-900'
                }`}
              >
                {language === 'hi' ? cat.labelHi : cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Count Header */}
      <div className="flex items-center justify-between mb-4 px-1">
        <p className="text-xs font-bold text-forest-900">
          Showing <span className="text-emerald-700">{filteredSchemes.length}</span> Active Government Schemes
        </p>
        <span className="text-xs text-ink/50">
          {savedSchemeIds.length} Saved in My Schemes
        </span>
      </div>

      {/* Schemes Grid */}
      {filteredSchemes.length === 0 ? (
        <div className="card p-12 text-center text-ink/50">
          <Landmark className="w-8 h-8 mx-auto text-forest-400 mb-2" />
          <p className="font-semibold text-sm">No schemes matched your search or filters.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setFarmerLandCategory('all');
            }}
            className="btn-secondary text-xs mt-3"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {filteredSchemes.map(scheme => {
            const isHi = language === 'hi';
            const title = isHi ? scheme.nameHi : scheme.name;
            const authority = isHi ? scheme.authorityHi : scheme.authority;
            const benefit = isHi ? scheme.financialBenefitHi : scheme.financialBenefit;
            const isSaved = savedSchemeIds.includes(scheme.id);

            return (
              <div
                key={scheme.id}
                className="card p-6 flex flex-col justify-between hover:border-forest-300 transition-all hover:shadow-md relative overflow-hidden bg-white"
              >
                {/* Top Status & Category Row */}
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2.5">
                    <div className="flex items-center gap-2">
                      <div className="w-9 h-9 rounded-xl bg-forest-50 flex items-center justify-center shrink-0 border border-forest-100">
                        {getCategoryIcon(scheme.category)}
                      </div>
                      <div>
                        <span className="text-[11px] font-bold text-forest-700 uppercase tracking-wider block">
                          {isHi ? scheme.categoryLabelHi : scheme.categoryLabel}
                        </span>
                        <span className="text-[10px] text-ink/50 font-mono">
                          Code: {scheme.shortCode}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="badge bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold">
                        {scheme.activeStatus}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => toggleSaveScheme(scheme.id, e)}
                        className={`p-1.5 rounded-lg border transition ${
                          isSaved
                            ? 'bg-amber-50 text-amber-600 border-amber-200'
                            : 'bg-forest-50/50 text-ink/40 border-forest-100 hover:text-forest-700'
                        }`}
                        title={isSaved ? "Saved" : "Save Scheme"}
                      >
                        {isSaved ? <BookmarkCheck className="w-4 h-4 fill-amber-500" /> : <Bookmark className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Scheme Title */}
                  <h3 className="font-display font-extrabold text-forest-950 text-lg leading-snug mb-1">
                    {title}
                  </h3>
                  <p className="text-xs text-ink/55 mb-4">
                    {authority}
                  </p>

                  {/* Financial Benefit Callout */}
                  <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-xl p-3.5 mb-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] font-extrabold text-emerald-900 uppercase tracking-wide">
                        {t('financial_subsidy')}
                      </span>
                      <span className="badge bg-emerald-600 text-white text-[10px] font-black">
                        {scheme.subsidyRate}
                      </span>
                    </div>
                    <p className="text-xs text-forest-950 font-semibold leading-relaxed">
                      {benefit}
                    </p>
                  </div>

                  {/* Eligibility criteria preview */}
                  <div className="space-y-1.5 mb-4">
                    <span className="text-[11px] font-bold text-forest-900 uppercase tracking-wider block">
                      {t('eligibility_criteria')}:
                    </span>
                    <ul className="text-xs text-ink/75 space-y-1">
                      {(isHi ? scheme.eligibilityHi : scheme.eligibility).slice(0, 2).map((item, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Documents Pills */}
                  <div className="mb-4">
                    <span className="text-[11px] font-bold text-forest-900 uppercase tracking-wider block mb-1.5">
                      {t('documents_needed')}:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {(isHi ? scheme.documentsRequiredHi : scheme.documentsRequired).map((doc, idx) => (
                        <span
                          key={idx}
                          className="bg-forest-50 text-forest-800 border border-forest-200/60 rounded-md px-2 py-0.5 text-[11px] font-medium"
                        >
                          {doc}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Actions Footer */}
                <div className="pt-4 border-t border-forest-100 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedSchemeForModal(scheme)}
                    className="text-xs font-bold text-forest-700 hover:text-forest-900 hover:underline flex items-center gap-1"
                  >
                    <span>{t('view_scheme_details')}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  <a
                    href={scheme.portalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary !py-2 !px-3.5 text-xs font-bold flex items-center gap-1.5 shadow-2xs"
                  >
                    <span>{t('apply_online')}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Bottom Assistance & Regional Portals Card */}
      <div className="card p-6 sm:p-7 bg-forest-900 text-white mb-8">
        <div className="grid md:grid-cols-3 gap-6 items-center">
          <div className="md:col-span-2 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Direct Farmer Support & Assistance
            </span>
            <h3 className="text-2xl font-display font-extrabold tracking-tight">
              Need Assistance with Application Forms or DBT Seeding?
            </h3>
            <p className="text-xs text-forest-200 leading-relaxed">
              Visit your nearest village Common Service Centre (CSC) or contact your Taluka Agriculture Officer (Krishi Sahayak). Ensure your Bank Account is Aadhaar-seeded for direct DBT credit.
            </p>
          </div>

          <div className="space-y-2.5">
            <div className="p-3 rounded-xl bg-white/10 border border-white/15 text-xs">
              <span className="text-amber-300 font-bold block">PM-KISAN DBT Helpline:</span>
              <span className="font-mono text-white font-extrabold text-sm">155261 / 011-24300606</span>
            </div>
            <div className="p-3 rounded-xl bg-white/10 border border-white/15 text-xs">
              <span className="text-emerald-300 font-bold block">PMFBY Fasal Bima Toll-Free:</span>
              <span className="font-mono text-white font-extrabold text-sm">1800-180-1551</span>
            </div>
          </div>
        </div>
      </div>

      {/* Full Scheme Details Modal */}
      {selectedSchemeForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/50 backdrop-blur-2xs overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-7 shadow-2xl border border-forest-100 relative my-8 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedSchemeForModal(null)}
              className="absolute top-5 right-5 text-ink/40 hover:text-ink p-1 rounded-lg"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-forest-100 flex items-center justify-center shrink-0">
                {getCategoryIcon(selectedSchemeForModal.category)}
              </div>
              <div>
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wide">
                  {language === 'hi' ? selectedSchemeForModal.categoryLabelHi : selectedSchemeForModal.categoryLabel}
                </span>
                <h3 className="font-display font-extrabold text-forest-950 text-xl leading-tight">
                  {language === 'hi' ? selectedSchemeForModal.nameHi : selectedSchemeForModal.name}
                </h3>
              </div>
            </div>

            <p className="text-xs text-ink/60 mb-5">
              Authority: {language === 'hi' ? selectedSchemeForModal.authorityHi : selectedSchemeForModal.authority}
            </p>

            {/* Financial Benefit Box */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-5">
              <span className="text-xs font-black text-emerald-900 uppercase tracking-wide block mb-1">
                {t('financial_subsidy')} ({selectedSchemeForModal.subsidyRate})
              </span>
              <p className="text-sm font-semibold text-forest-950 leading-relaxed">
                {language === 'hi' ? selectedSchemeForModal.financialBenefitHi : selectedSchemeForModal.financialBenefit}
              </p>
            </div>

            {/* Eligibility Section */}
            <div className="space-y-2 mb-5">
              <h4 className="text-xs font-black text-forest-900 uppercase tracking-wider">
                {t('eligibility_criteria')}:
              </h4>
              <ul className="text-xs text-ink/80 space-y-1.5 bg-forest-50/50 p-3.5 rounded-xl border border-forest-100">
                {(language === 'hi' ? selectedSchemeForModal.eligibilityHi : selectedSchemeForModal.eligibility).map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Documents Required */}
            <div className="space-y-2 mb-5">
              <h4 className="text-xs font-black text-forest-900 uppercase tracking-wider">
                {t('documents_needed')}:
              </h4>
              <div className="grid sm:grid-cols-2 gap-2 text-xs">
                {(language === 'hi' ? selectedSchemeForModal.documentsRequiredHi : selectedSchemeForModal.documentsRequired).map((doc, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg border border-forest-200 bg-white flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5 text-forest-600 shrink-0" />
                    <span className="font-medium text-forest-950">{doc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* How to Apply Steps */}
            <div className="space-y-2 mb-6">
              <h4 className="text-xs font-black text-forest-900 uppercase tracking-wider">
                {t('how_to_apply_label')}:
              </h4>
              <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-forest-950 leading-relaxed font-medium">
                {language === 'hi' ? selectedSchemeForModal.howToApplyHi : selectedSchemeForModal.howToApply}
              </div>
            </div>

            {/* Official Link & Helpline */}
            <div className="pt-4 border-t border-forest-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-xs text-ink/60">
                <span>Helpline: </span>
                <strong className="text-forest-900 font-mono">{selectedSchemeForModal.helpline}</strong>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setSelectedSchemeForModal(null)}
                  className="btn-secondary text-xs flex-1 sm:flex-none"
                >
                  Close
                </button>
                <a
                  href={selectedSchemeForModal.portalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-xs font-bold flex items-center justify-center gap-1.5 flex-1 sm:flex-none"
                >
                  <span>Open Official Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </FarmerLayout>
  );
};
