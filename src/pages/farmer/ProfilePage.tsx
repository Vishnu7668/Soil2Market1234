import React, { useState } from 'react';
import {
  User,
  Phone,
  Mail,
  MapPin,
  Building,
  CreditCard,
  Sprout,
  CheckCircle2,
  Save
} from 'lucide-react';
import { FarmerLayout } from '../../components/layout/FarmerLayout';
import { useTranslation } from '../../context/LanguageContext';
import { useApp } from '../../context/AppContext';

export const ProfilePage: React.FC = () => {
  const { t } = useTranslation();
  const { farmerProfile, updateProfile } = useApp();

  const [formData, setFormData] = useState({ ...farmerProfile });
  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <FarmerLayout>
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-forest-900 tracking-tight flex items-center gap-2.5">
            <User className="w-7 h-7 text-forest-700" />
            <span>{t('profile_title')}</span>
          </h1>
          <p className="text-ink/60 text-sm mt-1">
            {t('profile_subtitle')}
          </p>
        </div>

        {/* Profile Card */}
        <form onSubmit={handleSubmit} className="card p-6 sm:p-8 space-y-6">
          {/* Avatar and Primary Info */}
          <div className="flex items-center gap-4 pb-6 border-b border-forest-100">
            <div className="w-16 h-16 rounded-2xl bg-forest-700 text-white flex items-center justify-center font-extrabold text-2xl shadow-sm">
              {formData.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <h2 className="font-display font-bold text-forest-900 text-xl">
                {formData.name}
              </h2>
              <p className="text-xs text-ink/50">
                Registered Farmer ID: M2M-MH-8921 • {formData.village}, {formData.district}
              </p>
            </div>
          </div>

          {/* Personal & Contact Details */}
          <div>
            <h3 className="font-display font-bold text-forest-900 text-base mb-4 flex items-center gap-2">
              <User className="w-4 h-4 text-forest-600" />
              <span>Contact & Personal Details</span>
            </h3>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-forest-900 mb-1.5">
                  {t('full_name')}
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-forest-50/50 border border-forest-200 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-forest-950"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-forest-900 mb-1.5">
                  {t('phone_number')}
                </label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-forest-50/50 border border-forest-200 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-forest-950 font-mono"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-forest-900 mb-1.5">
                  {t('email_address')}
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-forest-50/50 border border-forest-200 rounded-xl px-3.5 py-2.5 text-sm font-medium text-forest-950"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-forest-900 mb-1.5">
                  {t('village')}
                </label>
                <input
                  type="text"
                  value={formData.village}
                  onChange={e => setFormData({ ...formData, village: e.target.value })}
                  className="w-full bg-forest-50/50 border border-forest-200 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-forest-950"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-forest-900 mb-1.5">
                  {t('district')}
                </label>
                <input
                  type="text"
                  value={formData.district}
                  onChange={e => setFormData({ ...formData, district: e.target.value })}
                  className="w-full bg-forest-50/50 border border-forest-200 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-forest-950"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-forest-900 mb-1.5">
                  {t('state')}
                </label>
                <input
                  type="text"
                  value={formData.state}
                  onChange={e => setFormData({ ...formData, state: e.target.value })}
                  className="w-full bg-forest-50/50 border border-forest-200 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-forest-950"
                />
              </div>
            </div>
          </div>

          {/* Farm Land & Crop Records */}
          <div>
            <h3 className="font-display font-bold text-forest-900 text-base mb-4 flex items-center gap-2">
              <Sprout className="w-4 h-4 text-forest-600" />
              <span>Farm Specifications & Crops</span>
            </h3>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-forest-900 mb-1.5">
                  {t('land_area')}
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={formData.landAreaAcres}
                  onChange={e => setFormData({ ...formData, landAreaAcres: Number(e.target.value) })}
                  className="w-full bg-forest-50/50 border border-forest-200 rounded-xl px-3.5 py-2.5 text-sm font-bold text-forest-950"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-forest-900 mb-1.5">
                  {t('primary_crops')}
                </label>
                <input
                  type="text"
                  value={formData.primaryCrops.join(', ')}
                  onChange={e => setFormData({ ...formData, primaryCrops: e.target.value.split(',').map(s => s.trim()) })}
                  className="w-full bg-forest-50/50 border border-forest-200 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-forest-950"
                />
              </div>
            </div>
          </div>

          {/* Bank & Escrow Settlement Account */}
          <div>
            <h3 className="font-display font-bold text-forest-900 text-base mb-4 flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-forest-600" />
              <span>Bank & Escrow Settlement Details</span>
            </h3>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-forest-900 mb-1.5">
                  Bank Name
                </label>
                <input
                  type="text"
                  value={formData.bankName}
                  onChange={e => setFormData({ ...formData, bankName: e.target.value })}
                  className="w-full bg-forest-50/50 border border-forest-200 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-forest-950"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-forest-900 mb-1.5">
                  Account Number
                </label>
                <input
                  type="text"
                  value={formData.accountNumber}
                  onChange={e => setFormData({ ...formData, accountNumber: e.target.value })}
                  className="w-full bg-forest-50/50 border border-forest-200 rounded-xl px-3.5 py-2.5 text-sm font-mono font-bold text-forest-950"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-forest-900 mb-1.5">
                  IFSC Code
                </label>
                <input
                  type="text"
                  value={formData.ifscCode}
                  onChange={e => setFormData({ ...formData, ifscCode: e.target.value })}
                  className="w-full bg-forest-50/50 border border-forest-200 rounded-xl px-3.5 py-2.5 text-sm font-mono font-bold text-forest-950"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-forest-900 mb-1.5">
                  {t('upi_id')}
                </label>
                <input
                  type="text"
                  value={formData.upiId}
                  onChange={e => setFormData({ ...formData, upiId: e.target.value })}
                  className="w-full bg-forest-50/50 border border-forest-200 rounded-xl px-3.5 py-2.5 text-sm font-mono font-bold text-forest-950"
                />
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="pt-4 border-t border-forest-100 flex items-center justify-between">
            {isSaved ? (
              <span className="text-xs font-bold text-emerald-700 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                {t('profile_saved')}
              </span>
            ) : <span />}

            <button
              type="submit"
              className="btn-primary text-sm font-bold flex items-center gap-1.5"
            >
              <Save className="w-4 h-4" />
              <span>{t('save_profile')}</span>
            </button>
          </div>
        </form>
      </div>
    </FarmerLayout>
  );
};
