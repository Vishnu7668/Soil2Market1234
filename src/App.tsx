/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { AppProvider } from './context/AppContext';

import { LandingPage } from './pages/public/LandingPage';
import { FarmerDashboard } from './pages/farmer/FarmerDashboard';
import { ProduceListPage } from './pages/farmer/ProduceListPage';
import { AddProducePage } from './pages/farmer/AddProducePage';
import { MarketPricesPage } from './pages/farmer/MarketPricesPage';
import { MarketComparisonPage } from './pages/farmer/MarketComparisonPage';
import { DecisionEnginePage } from './pages/farmer/DecisionEnginePage';
import { BuyersPage } from './pages/farmer/BuyersPage';
import { BuyerDetailPage } from './pages/farmer/BuyerDetailPage';
import { OffersPage } from './pages/farmer/OffersPage';
import { StorageDiscoveryPage } from './pages/farmer/StorageDiscoveryPage';
import { LogisticsCalculatorPage } from './pages/farmer/LogisticsCalculatorPage';
import { GovtSchemesPage } from './pages/farmer/GovtSchemesPage';
import { TransactionsPage } from './pages/farmer/TransactionsPage';
import { ProfilePage } from './pages/farmer/ProfilePage';
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';

export default function App() {
  return (
    <LanguageProvider>
      <AppProvider>
        <BrowserRouter>
          <Routes>
            {/* Public */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Farmer Core Routes */}
            <Route path="/farmer/dashboard" element={<FarmerDashboard />} />
            <Route path="/farmer/produce" element={<ProduceListPage />} />
            <Route path="/farmer/produce/add" element={<AddProducePage />} />
            <Route path="/farmer/markets" element={<MarketPricesPage />} />
            <Route path="/farmer/markets/compare" element={<MarketComparisonPage />} />
            <Route path="/farmer/buyers" element={<BuyersPage />} />
            <Route path="/farmer/buyers/:id" element={<BuyerDetailPage />} />
            <Route path="/farmer/recommendation" element={<DecisionEnginePage />} />
            <Route path="/farmer/offers" element={<OffersPage />} />
            <Route path="/farmer/storage" element={<StorageDiscoveryPage />} />
            <Route path="/farmer/logistics" element={<LogisticsCalculatorPage />} />
            <Route path="/farmer/schemes" element={<GovtSchemesPage />} />
            <Route path="/farmer/transactions" element={<TransactionsPage />} />
            <Route path="/farmer/profile" element={<ProfilePage />} />

            {/* Fallback to Dashboard */}
            <Route path="*" element={<Navigate to="/farmer/dashboard" replace />} />
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </LanguageProvider>
  );
}
