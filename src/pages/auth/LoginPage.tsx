import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sprout, Lock, Phone, UserCheck, ArrowRight } from 'lucide-react';
import { Mitti2MarketLogo } from '../../components/Mitti2MarketLogo';
import { useTranslation } from '../../context/LanguageContext';

export const LoginPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [role, setRole] = useState<'farmer' | 'buyer' | 'admin'>('farmer');
  const [identifier, setIdentifier] = useState('9822451230');
  const [password, setPassword] = useState('kisaan@2026');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (role === 'farmer') {
      navigate('/farmer/dashboard');
    } else {
      navigate('/farmer/dashboard');
    }
  };

  const handleDemoFarmer = () => {
    setIdentifier('9822451230');
    setPassword('kisaan@2026');
    setRole('farmer');
    navigate('/farmer/dashboard');
  };

  return (
    <div className="min-h-screen bg-canvas flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-md">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <Mitti2MarketLogo variant="full" size="lg" showTagline={true} />
          </Link>
        </div>

        {/* Card */}
        <div className="card p-7 sm:p-8 shadow-xl">
          <h2 className="text-xl font-display font-extrabold text-forest-900 mb-1">
            {t('sign_in_title')}
          </h2>
          <p className="text-xs text-ink/50 mb-6">
            Access your mandi intelligence, produce lots, and escrow payouts.
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

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-forest-900 mb-1">
                {t('phone_number')} / Email
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-forest-600 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={identifier}
                  onChange={e => setIdentifier(e.target.value)}
                  placeholder="9876543210"
                  className="w-full bg-forest-50/50 border border-forest-200 rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-forest-950 font-semibold focus:ring-2 focus:ring-forest-500/20"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-forest-900 mb-1">
                {t('enter_password')}
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-forest-600 absolute left-3.5 top-3" />
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full bg-forest-50/50 border border-forest-200 rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-forest-950 font-semibold focus:ring-2 focus:ring-forest-500/20"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn-primary w-full text-sm font-bold !py-3 flex items-center justify-center gap-1.5 shadow-sm"
            >
              <span>{t('login_btn')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Login */}
          <div className="mt-5 pt-5 border-t border-forest-100">
            <button
              type="button"
              onClick={handleDemoFarmer}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition flex items-center justify-center gap-2"
            >
              <UserCheck className="w-4 h-4 text-emerald-600" />
              <span>{t('demo_farmer_login')} (Ganesh Pawar)</span>
            </button>
          </div>

          <p className="text-xs text-center text-ink/50 mt-6">
            {t('dont_have_account')}{' '}
            <Link to="/register" className="text-forest-700 font-bold hover:underline">
              {t('sign_up')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
