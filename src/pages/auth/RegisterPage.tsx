import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Phone, MapPin, Lock, ArrowRight, ShieldCheck } from 'lucide-react';
import { Mitti2MarketLogo } from '../../components/Mitti2MarketLogo';
import { useTranslation } from '../../context/LanguageContext';
import { useApp } from '../../context/AppContext';

export const RegisterPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { updateProfile } = useApp();

  const [role, setRole] = useState<'farmer' | 'buyer' | 'admin'>('farmer');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [village, setVillage] = useState('');
  const [district, setDistrict] = useState('Nashik');
  const [state, setState] = useState('Maharashtra');
  const [pincode, setPincode] = useState('422303');
  const [password, setPassword] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (name) {
      updateProfile({
        name,
        phone: phone || '9822451230',
        village: village || 'Niphad',
        district,
        state,
        pincode
      });
    }
    navigate('/farmer/dashboard');
  };

  return (
    <div className="min-h-screen bg-canvas flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-lg">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <Mitti2MarketLogo variant="full" size="lg" showTagline={true} />
          </Link>
        </div>

        <div className="card p-7 sm:p-8 shadow-xl">
          <h2 className="text-xl font-display font-extrabold text-forest-900 mb-1">
            {t('create_account')}
          </h2>
          <p className="text-xs text-ink/50 mb-6">
            {t('auth_subtitle')}
          </p>

          {/* Role Tabs */}
          <div className="grid grid-cols-3 gap-2 mb-6">
            {(['farmer', 'buyer', 'admin'] as const).map(r => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className={`py-2 rounded-xl text-xs font-bold capitalize transition border ${
                  role === r
                    ? 'bg-forest-700 text-white border-forest-700 shadow-2xs'
                    : 'border-forest-200 text-ink/60 hover:bg-forest-50'
                }`}
              >
                {r === 'farmer' ? t('role_farmer') : r === 'buyer' ? t('role_buyer') : 'Admin'}
              </button>
            ))}
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-forest-900 mb-1">
                {t('full_name')} *
              </label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Ganesh Pawar"
                className="w-full bg-forest-50/50 border border-forest-200 rounded-xl px-3.5 py-2.5 text-sm text-forest-950 font-semibold focus:ring-2 focus:ring-forest-500/20"
                required
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-forest-900 mb-1">
                  {t('phone_number')} *
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="9822451230"
                  className="w-full bg-forest-50/50 border border-forest-200 rounded-xl px-3.5 py-2.5 text-sm text-forest-950 font-mono font-semibold"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-forest-900 mb-1">
                  {t('village')} *
                </label>
                <input
                  type="text"
                  value={village}
                  onChange={e => setVillage(e.target.value)}
                  placeholder="Niphad"
                  className="w-full bg-forest-50/50 border border-forest-200 rounded-xl px-3.5 py-2.5 text-sm text-forest-950 font-semibold"
                  required
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-forest-900 mb-1">
                  {t('district')}
                </label>
                <input
                  type="text"
                  value={district}
                  onChange={e => setDistrict(e.target.value)}
                  className="w-full bg-forest-50/50 border border-forest-200 rounded-xl px-3 py-2 text-xs text-forest-950"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-forest-900 mb-1">
                  {t('state')}
                </label>
                <input
                  type="text"
                  value={state}
                  onChange={e => setState(e.target.value)}
                  className="w-full bg-forest-50/50 border border-forest-200 rounded-xl px-3 py-2 text-xs text-forest-950"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-forest-900 mb-1">
                  {t('pincode')}
                </label>
                <input
                  type="text"
                  value={pincode}
                  onChange={e => setPincode(e.target.value)}
                  className="w-full bg-forest-50/50 border border-forest-200 rounded-xl px-3 py-2 text-xs text-forest-950 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-forest-900 mb-1">
                {t('create_password')} *
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Choose a secure password"
                className="w-full bg-forest-50/50 border border-forest-200 rounded-xl px-3.5 py-2.5 text-sm text-forest-950 font-semibold"
                required
              />
            </div>

            <button
              type="submit"
              className="btn-primary w-full text-sm font-bold !py-3 flex items-center justify-center gap-1.5 shadow-sm mt-2"
            >
              <span>Create Free Account</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <p className="text-xs text-center text-ink/50 mt-6">
            {t('already_have_account')}{' '}
            <Link to="/login" className="text-forest-700 font-bold hover:underline">
              {t('login')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
