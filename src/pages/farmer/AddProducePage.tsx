import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Sprout,
  ArrowLeft,
  Upload,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  MapPin,
  Tag,
  Scale,
  Award,
  AlertCircle
} from 'lucide-react';
import { FarmerLayout } from '../../components/layout/FarmerLayout';
import { useTranslation } from '../../context/LanguageContext';
import { useApp } from '../../context/AppContext';
import { CROPS_LIST } from '../../data/agmarknetData';

export const AddProducePage: React.FC = () => {
  const { t } = useTranslation();
  const { addProduce, farmerProfile } = useApp();
  const navigate = useNavigate();

  const [crop, setCrop] = useState<string>('Tomato');
  const [variety, setVariety] = useState<string>('Hybrid Desi');
  const [quantityKg, setQuantityKg] = useState<number>(1000);
  const [grade, setGrade] = useState<string>('Grade A');
  const [expectedPrice, setExpectedPrice] = useState<number>(30);
  const [harvestDate, setHarvestDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [location, setLocation] = useState<string>(`${farmerProfile.village}, ${farmerProfile.district}`);
  const [description, setDescription] = useState<string>('Freshly harvested crop, sorted and graded. Farm-gate pickup ready.');
  const [storageAvailable, setStorageAvailable] = useState<boolean>(true);
  const [verificationMode, setVerificationMode] = useState<'self-declared' | 'certified'>('self-declared');
  const [photoUrl, setPhotoUrl] = useState<string>('https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80');

  // AGMARK Visual Grading questions
  const [blemishRate, setBlemishRate] = useState<string>('Clean & unblemished (<5% superficial defects)');
  const [firmness, setFirmness] = useState<string>('Firm, uniform breaker/red stage');
  const [uniformity, setUniformity] = useState<string>('Uniform medium-to-large sizing (>50mm)');

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!crop) errs.crop = 'Please select a crop';
    if (!variety.trim()) errs.variety = 'Variety is required';
    if (!quantityKg || quantityKg <= 0) errs.quantity = 'Quantity must be greater than 0';
    if (!expectedPrice || expectedPrice <= 0) errs.price = 'Expected price is required';
    if (!location.trim()) errs.location = 'Location is required';
    if (!harvestDate) errs.harvestDate = 'Harvest date is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    const certificateId = verificationMode === 'certified'
      ? `AGMARK-MH-2026-${Math.floor(1000 + Math.random() * 9000)}`
      : null;

    addProduce({
      crop,
      variety,
      quantityKg,
      grade,
      location,
      harvestDate,
      storageAvailable,
      status: 'Active',
      verificationMode,
      certificateId,
      evidencePhotoUrl: photoUrl || null,
      expectedPricePerKg: expectedPrice,
      qualitativeAnswers: {
        blemish: blemishRate,
        firmness,
        uniformity
      }
    });

    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/farmer/produce');
    }, 600);
  };

  return (
    <FarmerLayout>
      <div className="max-w-3xl mx-auto">
        {/* Back Link */}
        <Link
          to="/farmer/produce"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-forest-700 hover:text-forest-900 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to My Produce</span>
        </Link>

        {/* Title */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-display font-black text-forest-900 tracking-tight">
            {t('list_new_crop')}
          </h1>
          <p className="text-ink/60 text-sm mt-1">
            List your harvest details for instant discovery across live mandis and verified buyers.
          </p>
        </div>

        {/* Form Card */}
        <form onSubmit={handleSubmit} className="card p-6 sm:p-8 space-y-6">
          {/* Section 1: Crop Core Details */}
          <div>
            <h3 className="font-display font-bold text-forest-900 text-base mb-4 pb-2 border-b border-forest-100 flex items-center gap-2">
              <Sprout className="w-4 h-4 text-forest-600" />
              <span>Crop Details</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Crop Name */}
              <div>
                <label className="block text-xs font-bold text-forest-900 mb-1.5">
                  {t('crop_name')} *
                </label>
                <select
                  value={crop}
                  onChange={e => setCrop(e.target.value)}
                  className="w-full bg-forest-50/50 border border-forest-200 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-forest-950 focus:outline-none focus:ring-2 focus:ring-forest-500/20"
                >
                  {CROPS_LIST.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                {errors.crop && <p className="text-xs text-red-500 mt-1">{errors.crop}</p>}
              </div>

              {/* Variety */}
              <div>
                <label className="block text-xs font-bold text-forest-900 mb-1.5">
                  {t('crop_variety')} *
                </label>
                <input
                  type="text"
                  value={variety}
                  onChange={e => setVariety(e.target.value)}
                  placeholder="e.g. Hybrid Desi, Nashik Red"
                  className="w-full bg-forest-50/50 border border-forest-200 rounded-xl px-3.5 py-2.5 text-sm text-forest-950 focus:outline-none focus:ring-2 focus:ring-forest-500/20"
                />
                {errors.variety && <p className="text-xs text-red-500 mt-1">{errors.variety}</p>}
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-xs font-bold text-forest-900 mb-1.5">
                  {t('quantity')} (Kilograms) *
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="50"
                    step="50"
                    value={quantityKg}
                    onChange={e => setQuantityKg(Number(e.target.value))}
                    className="w-full bg-forest-50/50 border border-forest-200 rounded-xl px-3.5 py-2.5 text-sm font-bold text-forest-950 focus:outline-none focus:ring-2 focus:ring-forest-500/20 pr-12"
                  />
                  <span className="absolute right-3.5 top-2.5 text-xs text-ink/45 font-bold">
                    kg
                  </span>
                </div>
                <p className="text-[11px] text-ink/45 mt-1 font-mono">
                  = {(quantityKg / 100).toFixed(1)} Quintals
                </p>
                {errors.quantity && <p className="text-xs text-red-500 mt-1">{errors.quantity}</p>}
              </div>

              {/* Expected Price */}
              <div>
                <label className="block text-xs font-bold text-forest-900 mb-1.5">
                  {t('expected_price')} (₹ / kg) *
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-2.5 text-xs text-ink/45 font-bold">
                    ₹
                  </span>
                  <input
                    type="number"
                    min="1"
                    step="0.5"
                    value={expectedPrice}
                    onChange={e => setExpectedPrice(Number(e.target.value))}
                    className="w-full bg-forest-50/50 border border-forest-200 rounded-xl pl-8 pr-3.5 py-2.5 text-sm font-bold text-forest-950 focus:outline-none focus:ring-2 focus:ring-forest-500/20"
                  />
                </div>
                <p className="text-[11px] text-ink/45 mt-1 font-mono">
                  = ₹{(expectedPrice * 100).toLocaleString('en-IN')} / quintal
                </p>
                {errors.price && <p className="text-xs text-red-500 mt-1">{errors.price}</p>}
              </div>

              {/* Harvest Date */}
              <div>
                <label className="block text-xs font-bold text-forest-900 mb-1.5">
                  {t('harvest_date')} *
                </label>
                <input
                  type="date"
                  value={harvestDate}
                  onChange={e => setHarvestDate(e.target.value)}
                  className="w-full bg-forest-50/50 border border-forest-200 rounded-xl px-3.5 py-2.5 text-sm text-forest-950 focus:outline-none focus:ring-2 focus:ring-forest-500/20"
                />
                {errors.harvestDate && <p className="text-xs text-red-500 mt-1">{errors.harvestDate}</p>}
              </div>

              {/* Location */}
              <div>
                <label className="block text-xs font-bold text-forest-900 mb-1.5">
                  {t('location')} *
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                  placeholder="Village, District"
                  className="w-full bg-forest-50/50 border border-forest-200 rounded-xl px-3.5 py-2.5 text-sm text-forest-950 focus:outline-none focus:ring-2 focus:ring-forest-500/20"
                />
                {errors.location && <p className="text-xs text-red-500 mt-1">{errors.location}</p>}
              </div>
            </div>
          </div>

          {/* Section 2: Quality Verification Mode */}
          <div>
            <h3 className="font-display font-bold text-forest-900 text-base mb-4 pb-2 border-b border-forest-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-forest-600" />
                <span>{t('verification_mode')}</span>
              </div>
              <span className="text-xs text-ink/50 font-normal">Choose certification standard</span>
            </h3>

            {/* Toggle Modes */}
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <label
                onClick={() => setVerificationMode('self-declared')}
                className={`p-4 rounded-xl border-2 cursor-pointer transition flex flex-col justify-between ${
                  verificationMode === 'self-declared'
                    ? 'border-forest-700 bg-forest-50/40'
                    : 'border-forest-100 bg-white hover:bg-forest-50/20'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-forest-900 text-sm">Mode 1: Self-Declared</span>
                    <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${verificationMode === 'self-declared' ? 'border-forest-700 bg-forest-700 text-white' : 'border-forest-300'}`}>
                      {verificationMode === 'self-declared' && <span className="w-2 h-2 rounded-full bg-white" />}
                    </span>
                  </div>
                  <p className="text-xs text-ink/60 leading-relaxed">
                    Quick listing based on your own visual inspection parameters.
                  </p>
                </div>
              </label>

              <label
                onClick={() => setVerificationMode('certified')}
                className={`p-4 rounded-xl border-2 cursor-pointer transition flex flex-col justify-between ${
                  verificationMode === 'certified'
                    ? 'border-emerald-600 bg-emerald-50/40'
                    : 'border-forest-100 bg-white hover:bg-forest-50/20'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-forest-900 text-sm flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      Mode 2: AGMARK Assayed
                    </span>
                    <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${verificationMode === 'certified' ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-forest-300'}`}>
                      {verificationMode === 'certified' && <span className="w-2 h-2 rounded-full bg-white" />}
                    </span>
                  </div>
                  <p className="text-xs text-ink/60 leading-relaxed">
                    Digital assaying certification. Receives premium verified buyer match and faster escrow settlement.
                  </p>
                </div>
              </label>
            </div>

            {/* Quality Grade Selector */}
            <div className="mb-4">
              <label className="block text-xs font-bold text-forest-900 mb-1.5">
                {t('quality_grade')}
              </label>
              <select
                value={grade}
                onChange={e => setGrade(e.target.value)}
                className="w-full bg-forest-50/50 border border-forest-200 rounded-xl px-3.5 py-2.5 text-sm font-bold text-forest-950 focus:outline-none focus:ring-2 focus:ring-forest-500/20"
              >
                <option value="Grade A">Grade A — Premium / Export standard (Size & color uniform, &lt;5% defects)</option>
                <option value="Grade B">Grade B — Standard APMC auction grade (5-15% minor skin marks)</option>
                <option value="Grade C">Grade C — Processing grade (Industrial / ketchup / paste processing)</option>
              </select>
            </div>

            {/* AGMARK Visual Grading Checklist */}
            <div className="bg-forest-50/50 p-4 rounded-xl border border-forest-100 space-y-3">
              <p className="text-xs font-bold text-forest-900 uppercase tracking-wider">
                AGMARK Visual Inspection Checklist
              </p>

              <div>
                <label className="block text-[11px] font-semibold text-ink/70 mb-1">
                  Surface Defects & Cuts
                </label>
                <select
                  value={blemishRate}
                  onChange={e => setBlemishRate(e.target.value)}
                  className="w-full bg-white border border-forest-200 rounded-lg px-3 py-1.5 text-xs text-ink/90"
                >
                  <option value="Clean & unblemished (<5% superficial defects)">Clean & unblemished (&lt;5% superficial defects)</option>
                  <option value="Minor scars / superficial marks (5-15%)">Minor scars / superficial marks (5-15%)</option>
                  <option value="Noticeable cracks / skin damage (>15%)">Noticeable cracks / skin damage (&gt;15%)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-ink/70 mb-1">
                  Firmness & Ripeness
                </label>
                <select
                  value={firmness}
                  onChange={e => setFirmness(e.target.value)}
                  className="w-full bg-white border border-forest-200 rounded-lg px-3 py-1.5 text-xs text-ink/90"
                >
                  <option value="Firm, uniform breaker/red stage">Firm, uniform breaker/red stage</option>
                  <option value="Slightly soft to touch">Slightly soft to touch</option>
                  <option value="Overripe / soft puffy fruits">Overripe / soft puffy fruits</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-ink/70 mb-1">
                  Fruit Size Uniformity
                </label>
                <select
                  value={uniformity}
                  onChange={e => setUniformity(e.target.value)}
                  className="w-full bg-white border border-forest-200 rounded-lg px-3 py-1.5 text-xs text-ink/90"
                >
                  <option value="Uniform medium-to-large sizing (>50mm)">Uniform medium-to-large sizing (&gt;50mm)</option>
                  <option value="Mixed sizes in the lot">Mixed sizes in the lot</option>
                  <option value="Predominantly undersized / irregular">Predominantly undersized / irregular</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 3: Photos & Farm Storage */}
          <div>
            <h3 className="font-display font-bold text-forest-900 text-base mb-4 pb-2 border-b border-forest-100 flex items-center gap-2">
              <Upload className="w-4 h-4 text-forest-600" />
              <span>Evidence Photos & Farm Facilities</span>
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-forest-900 mb-1.5">
                  Lot Sample Photo URL
                </label>
                <input
                  type="url"
                  value={photoUrl}
                  onChange={e => setPhotoUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-forest-50/50 border border-forest-200 rounded-xl px-3.5 py-2.5 text-xs text-forest-950 focus:outline-none focus:ring-2 focus:ring-forest-500/20"
                />
                {photoUrl && (
                  <div className="mt-2 w-32 h-20 rounded-lg overflow-hidden border border-forest-200">
                    <img src={photoUrl} alt="Sample lot" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-forest-900 mb-1.5">
                  {t('description')}
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  className="w-full bg-forest-50/50 border border-forest-200 rounded-xl p-3 text-xs text-forest-950 focus:outline-none focus:ring-2 focus:ring-forest-500/20"
                />
              </div>

              {/* Farm Storage Available Toggle */}
              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="storage-toggle"
                  checked={storageAvailable}
                  onChange={e => setStorageAvailable(e.target.checked)}
                  className="w-4 h-4 text-forest-700 rounded border-forest-300 focus:ring-forest-500"
                />
                <label htmlFor="storage-toggle" className="text-xs font-bold text-forest-900 cursor-pointer">
                  {t('storage_available')} (Shaded shed / ventilated barn)
                </label>
              </div>
            </div>
          </div>

          {/* Submit Actions */}
          <div className="pt-4 border-t border-forest-100 flex items-center justify-end gap-3">
            <Link to="/farmer/produce" className="btn-secondary text-sm">
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary text-sm font-bold min-w-40"
            >
              {isSubmitting ? 'Publishing…' : t('submit_listing')}
            </button>
          </div>
        </form>
      </div>
    </FarmerLayout>
  );
};
