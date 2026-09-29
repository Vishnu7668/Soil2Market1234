import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Sprout,
  TrendingUp,
  Scale,
  Users,
  Brain,
  Handshake,
  Warehouse as WarehouseIcon,
  Truck,
  Receipt,
  User,
  Landmark,
  Bell,
  Menu,
  X,
  Languages,
  Plus,
  Search,
  CheckCircle2,
  ChevronRight,
  LogOut,
  ExternalLink
} from 'lucide-react';
import { Mitti2MarketLogo } from '../Mitti2MarketLogo';
import { useTranslation } from '../../context/LanguageContext';
import { useApp } from '../../context/AppContext';

interface FarmerLayoutProps {
  children: React.ReactNode;
}

export const FarmerLayout: React.FC<FarmerLayoutProps> = ({ children }) => {
  const { t, language, setLanguage } = useTranslation();
  const { farmerProfile, notifications, markNotificationAsRead } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  const [sidebarOpen, setSidebarOpen] = useState<boolean>(() => {
    return typeof window !== 'undefined' ? window.innerWidth >= 1024 : true;
  });
  const [showNotifications, setShowNotifications] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);

  // Close popovers on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setShowLangMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close sidebar on mobile route change
  useEffect(() => {
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  }, [location.pathname]);

  const navItems = [
    { to: '/farmer/dashboard', labelKey: 'sidebar_dashboard', icon: LayoutDashboard, end: true },
    { to: '/farmer/produce', labelKey: 'sidebar_my_produce', icon: Sprout },
    { to: '/farmer/markets', labelKey: 'sidebar_market_prices', icon: TrendingUp },
    { to: '/farmer/markets/compare', labelKey: 'sidebar_market_compare', icon: Scale },
    { to: '/farmer/buyers', labelKey: 'sidebar_find_buyers', icon: Users },
    { to: '/farmer/recommendation', labelKey: 'sidebar_ai_recommendation', icon: Brain },
    { to: '/farmer/offers', labelKey: 'sidebar_my_offers', icon: Handshake },
    { to: '/farmer/storage', labelKey: 'sidebar_storage', icon: WarehouseIcon },
    { to: '/farmer/logistics', labelKey: 'sidebar_logistics', icon: Truck },
    { to: '/farmer/schemes', labelKey: 'sidebar_govt_schemes', icon: Landmark },
    { to: '/farmer/transactions', labelKey: 'sidebar_transactions', icon: Receipt },
    { to: '/farmer/profile', labelKey: 'sidebar_profile', icon: User },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-canvas flex font-sans antialiased">
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-ink/40 z-40 lg:hidden transition-opacity duration-300 backdrop-blur-2xs"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close navigation"
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 h-screen w-72 bg-white border-r border-forest-100 flex flex-col justify-between transition-transform duration-300 ease-in-out lg:sticky lg:top-0 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0 shadow-2xl lg:shadow-none' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full overflow-hidden">
          {/* Brand Header */}
          <div className="p-5 border-b border-forest-100/80 flex items-center justify-between">
            <Link to="/farmer/dashboard" className="flex items-center">
              <Mitti2MarketLogo variant="horizontal" size="md" showTagline={true} />
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-ink/60 hover:bg-forest-50 hover:text-ink"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Mandi Status Badge */}
          <div className="px-5 py-2.5 bg-forest-50/60 border-b border-forest-100/60 flex items-center justify-between text-xs">
            <span className="flex items-center gap-1.5 text-forest-800 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              AGMARKNET Live Connected
            </span>
            <span className="text-[11px] text-ink/50 font-mono">Nashik APMC</span>
          </div>

          {/* Nav links */}
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                      isActive
                        ? 'bg-forest-700 text-white shadow-xs'
                        : 'text-ink/70 hover:bg-forest-50 hover:text-forest-900'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{t(item.labelKey)}</span>
                </NavLink>
              );
            })}
          </nav>

          {/* User Profile Footer */}
          <div className="p-4 border-t border-forest-100 bg-forest-50/40">
            <div className="flex items-center justify-between">
              <Link to="/farmer/profile" className="flex items-center gap-3 min-w-0 hover:opacity-85 transition">
                <div className="w-10 h-10 rounded-xl bg-forest-700 text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-2xs">
                  {farmerProfile.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-forest-900 truncate">
                    {farmerProfile.name}
                  </p>
                  <p className="text-xs text-ink/50 truncate">
                    {farmerProfile.village}, {farmerProfile.district}
                  </p>
                </div>
              </Link>
              <Link
                to="/login"
                className="p-2 text-ink/40 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                title={t('logout')}
              >
                <LogOut className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 h-16 bg-white/95 backdrop-blur-md border-b border-forest-100 flex items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl text-ink/70 hover:bg-forest-50 hover:text-forest-900"
              aria-label="Open sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden md:flex items-center gap-2 text-xs font-medium text-forest-700 bg-forest-50 px-3 py-1.5 rounded-lg border border-forest-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>{t('brand_name')} — {t('tagline')}</span>
            </div>
          </div>

          {/* Right Header Utilities */}
          <div className="flex items-center gap-3">
            {/* Add Produce Quick Action */}
            <Link
              to="/farmer/produce/add"
              className="btn-primary !py-2 !px-3.5 text-xs sm:text-sm font-semibold flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">{t('add_produce')}</span>
            </Link>

            {/* Language Switcher */}
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setShowLangMenu(!showLangMenu)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-ink/70 hover:bg-forest-50 hover:text-forest-900 border border-forest-100 transition"
                aria-label="Language selection"
              >
                <Languages className="w-4 h-4 text-forest-600" />
                <span className="font-semibold text-xs">{language === 'hi' ? 'हिन्दी' : 'English'}</span>
              </button>

              {showLangMenu && (
                <div className="absolute right-0 mt-2 w-36 bg-white rounded-xl shadow-lg border border-forest-100 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <button
                    onClick={() => {
                      setLanguage('en');
                      setShowLangMenu(false);
                    }}
                    className={`w-full px-3 py-2 text-left text-sm flex items-center justify-between ${
                      language === 'en' ? 'bg-forest-50 text-forest-900 font-bold' : 'text-ink/75 hover:bg-forest-50'
                    }`}
                  >
                    <span>English</span>
                    {language === 'en' && <CheckCircle2 className="w-4 h-4 text-forest-600" />}
                  </button>
                  <button
                    onClick={() => {
                      setLanguage('hi');
                      setShowLangMenu(false);
                    }}
                    className={`w-full px-3 py-2 text-left text-sm flex items-center justify-between ${
                      language === 'hi' ? 'bg-forest-50 text-forest-900 font-bold' : 'text-ink/75 hover:bg-forest-50'
                    }`}
                  >
                    <span>हिन्दी (Hindi)</span>
                    {language === 'hi' && <CheckCircle2 className="w-4 h-4 text-forest-600" />}
                  </button>
                </div>
              )}
            </div>

            {/* Notifications Popover */}
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-lg text-ink/70 hover:bg-forest-50 hover:text-forest-900 border border-forest-100 transition"
                aria-label="Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-amber-500 ring-2 ring-white"></span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-forest-100 p-4 z-50">
                  <div className="flex items-center justify-between pb-3 border-b border-forest-100 mb-3">
                    <h4 className="font-display font-bold text-forest-900 text-sm">
                      {t('notifications')} ({unreadCount})
                    </h4>
                    <span className="text-[11px] text-ink/40 font-medium">Real-time alerts</span>
                  </div>
                  <div className="max-h-72 overflow-y-auto space-y-2.5">
                    {notifications.length === 0 ? (
                      <p className="text-xs text-ink/50 text-center py-6">No notifications yet.</p>
                    ) : (
                      notifications.map(n => (
                        <div
                          key={n.id}
                          onClick={() => markNotificationAsRead(n.id)}
                          className={`p-2.5 rounded-xl text-xs transition cursor-pointer border ${
                            n.read
                              ? 'bg-canvas/50 border-forest-50 text-ink/70'
                              : 'bg-forest-50/70 border-forest-200 text-forest-950 font-medium'
                          }`}
                        >
                          <p>{n.text}</p>
                          <span className="text-[10px] text-ink/45 mt-1 block">{n.time}</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
};
