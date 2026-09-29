import React from 'react';
import { Link } from 'react-router-dom';
import {
  TrendingUp,
  ShieldCheck,
  Scale,
  Brain,
  ArrowRight,
  CheckCircle2,
  Users,
  Warehouse,
  Lock,
  Truck,
  Sparkles
} from 'lucide-react';
import { Mitti2MarketLogo } from '../../components/Mitti2MarketLogo';
import { useTranslation } from '../../context/LanguageContext';
import { useApp } from '../../context/AppContext';

export const LandingPage: React.FC = () => {
  const { t, language, setLanguage } = useTranslation();
  const { mandiPrices } = useApp();

  return (
    <div className="min-h-screen bg-canvas flex flex-col font-sans">
      {/* Public Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-forest-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <Mitti2MarketLogo variant="horizontal" size="md" showTagline={true} />
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-bold text-forest-900">
            <Link to="/farmer/markets" className="hover:text-forest-700 transition">
              {t('nav_market_prices')}
            </Link>
            <Link to="/farmer/markets/compare" className="hover:text-forest-700 transition">
              Compare Net Realization
            </Link>
            <Link to="/farmer/buyers" className="hover:text-forest-700 transition">
              {t('nav_for_buyers')}
            </Link>
            <Link to="/farmer/storage" className="hover:text-forest-700 transition">
              WDRA Storage
            </Link>
            <Link to="/farmer/schemes" className="hover:text-forest-700 transition flex items-center gap-1 text-emerald-800">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Govt Schemes</span>
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            {/* Lang button */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
              className="text-xs font-bold px-3 py-1.5 rounded-lg border border-forest-200 text-forest-900 hover:bg-forest-50 transition"
            >
              {language === 'en' ? 'हिन्दी' : 'English'}
            </button>

            <Link to="/login" className="btn-secondary !py-2 !px-4 text-xs font-bold">
              {t('login')}
            </Link>

            <Link to="/farmer/dashboard" className="btn-primary !py-2 !px-4 text-xs font-bold shadow-xs">
              Go to Dashboard →
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 sm:pt-16 sm:pb-24 bg-linear-to-b from-white via-forest-50/30 to-canvas">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <span className="badge bg-harvest-100 text-harvest-800 border border-harvest-300 text-xs font-bold">
                🌱 Direct Digital Market-Linkage for Indian Farmers
              </span>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black text-forest-950 tracking-tight leading-none">
                Sell Smarter. <br />
                <span className="text-amber-500">Earn Better.</span>
              </h1>

              <p className="text-base sm:text-lg text-ink/70 max-w-xl leading-relaxed">
                MITTI2MARKET empowers farmers to discover the most profitable selling avenues across live government mandis (AGMARKNET) and verified direct buyers — factoring real transport, storage tariffs, and escrow security into your net realization.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/farmer/dashboard"
                  className="btn-primary text-sm sm:text-base font-bold !py-3.5 !px-6 shadow-md flex items-center gap-2"
                >
                  <span>Launch Farmer Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/farmer/markets"
                  className="btn-secondary text-sm sm:text-base font-bold !py-3.5 !px-6"
                >
                  <span>Explore Live Mandi Rates</span>
                </Link>
              </div>

              {/* Verified Trust Badges */}
              <div className="pt-6 border-t border-forest-100 grid grid-cols-3 gap-4 text-xs font-semibold text-ink/75">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Verified AGMARKNET Live Data</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="w-5 h-5 text-forest-700 shrink-0" />
                  <span>100% Escrow Bank Protection</span>
                </div>
                <div className="flex items-center gap-2">
                  <Warehouse className="w-5 h-5 text-harvest-600 shrink-0" />
                  <span>WDRA Registered Warehouses</span>
                </div>
              </div>
            </div>

            {/* Right Card / Logo Feature */}
            <div className="relative">
              <div className="card p-6 sm:p-8 bg-white/90 shadow-2xl border-forest-200 space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-forest-100">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-forest-50 p-1 border border-forest-100 flex items-center justify-center">
                      <img src="/logo.svg" alt="MITTI2MARKET" className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <h3 className="font-display font-black text-forest-900 text-lg">
                        Mitti2Market Decision Hub
                      </h3>
                      <p className="text-xs text-ink/50">Niphad, Nashik Corridor</p>
                    </div>
                  </div>
                  <span className="badge bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs">
                    Live Active
                  </span>
                </div>

                {/* Sample Live Mandi Feed */}
                <div className="space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-forest-900 block">
                    Today's Live Modal Mandi Rates
                  </span>
                  {mandiPrices.slice(0, 4).map((m, i) => (
                    <div key={i} className="flex justify-between items-center text-xs p-3 rounded-xl bg-forest-50/60 border border-forest-100">
                      <div>
                        <strong className="text-forest-900 text-sm block">{m.market} APMC</strong>
                        <span className="text-ink/50">{m.commodity} ({m.variety}) • {m.district}</span>
                      </div>
                      <div className="text-right">
                        <strong className="text-forest-900 text-sm num block">₹{m.modalPrice}/q</strong>
                        <span className="text-emerald-700 font-bold">₹{(m.modalPrice / 100).toFixed(1)}/kg</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                  <Link
                    to="/farmer/markets/compare"
                    className="btn-accent w-full text-center text-xs font-bold !py-3 flex items-center justify-center gap-1.5"
                  >
                    <span>Simulate Highest Net Realization Option</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Steps How It Works */}
      <section className="py-16 bg-white border-t border-forest-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="badge bg-forest-100 text-forest-800 text-xs font-bold mb-2">
              Transparent Digital Workflow
            </span>
            <h2 className="text-3xl font-display font-extrabold text-forest-900 tracking-tight">
              How MITTI2MARKET Works for Farmers
            </h2>
            <p className="text-ink/60 text-sm mt-2">
              From raw mandi price discovery to verified direct buyers and guaranteed escrow settlement.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="card p-6 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-forest-100 text-forest-800 flex items-center justify-center font-bold text-lg">
                1
              </div>
              <h3 className="font-display font-bold text-forest-900 text-lg">
                Price Discovery & Grading
              </h3>
              <p className="text-xs text-ink/70 leading-relaxed">
                View real-time Agmarknet modal rates across multiple mandis. Self-declare or get AGMARK digital assaying certification for your lot.
              </p>
            </div>

            <div className="card p-6 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold text-lg">
                2
              </div>
              <h3 className="font-display font-bold text-forest-900 text-lg">
                Net Realization Calculator
              </h3>
              <p className="text-xs text-ink/70 leading-relaxed">
                Compare mandis and corporate buyers by true net profit: deducting freight distance, vehicle tariffs, and APMC cess from gross selling value.
              </p>
            </div>

            <div className="card p-6 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-900 flex items-center justify-center font-bold text-lg">
                3
              </div>
              <h3 className="font-display font-bold text-forest-900 text-lg">
                Escrow Settlement & WDRA
              </h3>
              <p className="text-xs text-ink/70 leading-relaxed">
                Lock buyer payments safely in Escrow before dispatch. In distress seasons, store at registered WDRA warehouses with e-NWR pledge financing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto bg-forest-950 text-white py-12 border-t border-forest-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white p-1 flex items-center justify-center">
              <img src="/logo.svg" alt="MITTI2MARKET" className="w-full h-full object-contain" />
            </div>
            <div>
              <p className="font-display font-black text-xl tracking-tight">MITTI2MARKET</p>
              <p className="text-xs text-forest-300">Better Price • Higher Margin • Prosperous Farmers</p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-xs text-forest-200">
            <Link to="/farmer/dashboard" className="hover:text-white transition">Farmer Dashboard</Link>
            <Link to="/farmer/markets" className="hover:text-white transition">Live Mandis</Link>
            <Link to="/farmer/markets/compare" className="hover:text-white transition">Net Realization</Link>
            <Link to="/farmer/storage" className="hover:text-white transition">WDRA Hubs</Link>
            <Link to="/farmer/schemes" className="hover:text-white transition text-emerald-400 font-bold">Govt Schemes</Link>
          </div>

          <p className="text-xs text-forest-400">
            © 2026 MITTI2MARKET. All agricultural rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};
