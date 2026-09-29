import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Scale,
  TrendingUp,
  Truck,
  Building2,
  Users,
  Award,
  ArrowRight,
  Info,
  DollarSign
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { FarmerLayout } from '../../components/layout/FarmerLayout';
import { useTranslation } from '../../context/LanguageContext';
import { useApp } from '../../context/AppContext';
import { CROPS_LIST } from '../../data/agmarknetData';

export const MarketComparisonPage: React.FC = () => {
  const { t } = useTranslation();
  const { calculateNetRealization } = useApp();

  const [selectedCrop, setSelectedCrop] = useState<string>('Tomato');
  const [quantityQuintals, setQuantityQuintals] = useState<number>(100);
  const [selectedGrade, setSelectedGrade] = useState<string>('Grade A');

  const quantityKg = quantityQuintals * 100;

  const comparisonOptions = useMemo(() => {
    return calculateNetRealization(selectedCrop, quantityKg, selectedGrade);
  }, [selectedCrop, quantityKg, selectedGrade, calculateNetRealization]);

  const topOption = comparisonOptions[0];

  // Chart data preparation
  const chartData = useMemo(() => {
    return comparisonOptions.slice(0, 5).map(opt => ({
      name: opt.name.length > 16 ? opt.name.substring(0, 16) + '…' : opt.name,
      'Gross Value': opt.sellingValue,
      'Net Realization': opt.netRealization,
      'Freight & Fees': opt.transportCost + opt.otherCosts
    }));
  }, [comparisonOptions]);

  return (
    <FarmerLayout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-forest-900 tracking-tight">
            {t('market_comparison_title')}
          </h1>
          <p className="text-ink/60 text-sm mt-1 max-w-3xl">
            {t('market_comparison_subtitle')}
          </p>
        </div>
        <Link to="/farmer/recommendation" className="btn-primary text-sm self-start sm:self-auto">
          <span>{t('view_recommendation')} →</span>
        </Link>
      </div>

      {/* Control Input Card */}
      <div className="card p-5 sm:p-6 mb-8 border-forest-200">
        <h3 className="text-xs font-extrabold uppercase tracking-wider text-forest-800 mb-4">
          Simulation Parameters
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {/* Crop Selector */}
          <div>
            <label htmlFor="cmp-crop" className="block text-xs font-bold text-forest-900 mb-1.5">
              {t('crop_name')}
            </label>
            <select
              id="cmp-crop"
              value={selectedCrop}
              onChange={e => setSelectedCrop(e.target.value)}
              className="w-full bg-forest-50/50 border border-forest-200 rounded-xl px-3.5 py-2.5 text-sm font-bold text-forest-950 focus:outline-none focus:ring-2 focus:ring-forest-500/20"
            >
              {CROPS_LIST.map(crop => (
                <option key={crop} value={crop}>{crop}</option>
              ))}
            </select>
          </div>

          {/* Quantity in Quintals */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label htmlFor="cmp-qty" className="text-xs font-bold text-forest-900">
                Quantity (Quintals / 100 kg)
              </label>
              <span className="text-xs font-bold text-forest-700 font-mono">
                {quantityQuintals} q ({quantityKg.toLocaleString('en-IN')} kg)
              </span>
            </div>
            <input
              id="cmp-qty"
              type="range"
              min="10"
              max="500"
              step="10"
              value={quantityQuintals}
              onChange={e => setQuantityQuintals(Number(e.target.value))}
              className="w-full h-2 bg-forest-100 rounded-lg appearance-none cursor-pointer accent-forest-700 mt-2"
            />
          </div>

          {/* Quality Grade */}
          <div>
            <label htmlFor="cmp-grade" className="block text-xs font-bold text-forest-900 mb-1.5">
              {t('quality_grade')}
            </label>
            <select
              id="cmp-grade"
              value={selectedGrade}
              onChange={e => setSelectedGrade(e.target.value)}
              className="w-full bg-forest-50/50 border border-forest-200 rounded-xl px-3.5 py-2.5 text-sm font-bold text-forest-950 focus:outline-none focus:ring-2 focus:ring-forest-500/20"
            >
              <option value="Grade A">Grade A (Premium / Export Quality)</option>
              <option value="Grade B">Grade B (Standard Market Quality)</option>
              <option value="Grade C">Grade C (Processing Quality)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Top Winner Opportunity Callout */}
      {topOption && (
        <div className="card p-6 sm:p-7 mb-8 bg-forest-900 text-white relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-400 text-forest-950 mb-3 shadow-xs">
                <Award className="w-3.5 h-3.5" />
                Rank #1 Highest Net Realization
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-extrabold tracking-tight">
                {topOption.name}
              </h2>
              <p className="text-forest-200 text-xs sm:text-sm mt-1">
                {topOption.location} • Approx {topOption.distanceKm} km freight route from farm
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15 min-w-64 text-right">
              <span className="text-xs uppercase tracking-wider text-forest-200 font-semibold block">
                Estimated Net Profit (Realization)
              </span>
              <span className="text-3xl sm:text-4xl font-extrabold num text-amber-300 block mt-1">
                ₹{topOption.netRealization.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-white/70 block mt-1">
                (₹{topOption.netPerKg}/kg net into bank account)
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Chart: Gross Sale Value vs Net Realization */}
      {chartData.length > 0 && (
        <div className="card p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-display font-bold text-forest-900 text-base">
                Gross Sale vs. Net Realization Breakdown
              </h3>
              <p className="text-xs text-ink/50 mt-0.5">
                Demonstrating how freight distance and mandi deductions impact your final farmer realization.
              </p>
            </div>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2ece4" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#4b5563' }} />
                <YAxis
                  tickFormatter={(val) => `₹${(val / 1000).toFixed(0)}k`}
                  tick={{ fontSize: 11, fill: '#4b5563' }}
                />
                <Tooltip
                  formatter={(value: any) => [`₹${Number(value).toLocaleString('en-IN')}`, '']}
                  contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #dcece1' }}
                />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="Gross Value" fill="#93c5fd" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Net Realization" fill="#204f37" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Freight & Fees" fill="#f87171" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Detailed Net Realization Formula Table */}
      <div className="card overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-forest-100 flex items-center justify-between flex-wrap gap-2">
          <div>
            <h3 className="font-display font-bold text-forest-900 text-base">
              Detailed Selling Realization Matrix
            </h3>
            <p className="text-xs text-ink/50">
              Formula: Gross Sale Value − Transport Cost − APMC Cess / Fees = Net Realization
            </p>
          </div>
          <span className="badge bg-forest-50 text-forest-800 text-xs">
            {comparisonOptions.length} destinations evaluated
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-forest-50/70 text-left text-ink/60 text-xs uppercase tracking-wider border-b border-forest-100">
                <th className="px-5 py-3.5 font-bold text-forest-900">Rank</th>
                <th className="px-5 py-3.5 font-bold text-forest-900">{t('destination')}</th>
                <th className="px-5 py-3.5 font-bold text-forest-900 text-right">Raw Rate</th>
                <th className="px-5 py-3.5 font-bold text-forest-900 text-right">{t('gross_value')}</th>
                <th className="px-5 py-3.5 font-bold text-forest-900 text-right text-red-600">− Transport</th>
                <th className="px-5 py-3.5 font-bold text-forest-900 text-right text-red-600">− Fees / Cess</th>
                <th className="px-5 py-3.5 font-bold text-forest-900 text-right text-forest-800">{t('net_realization')}</th>
                <th className="px-5 py-3.5 font-bold text-forest-900 text-right">Net / kg</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-forest-50">
              {comparisonOptions.map((opt, index) => {
                const isBest = index === 0;

                return (
                  <tr
                    key={opt.id}
                    className={`transition ${isBest ? 'bg-emerald-50/40 font-semibold' : 'hover:bg-forest-50/30'}`}
                  >
                    <td className="px-5 py-4 font-bold">
                      <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs ${isBest ? 'bg-emerald-600 text-white' : 'bg-forest-100 text-forest-800'}`}>
                        #{index + 1}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        {opt.type === 'buyer' ? (
                          <Users className="w-4 h-4 text-forest-600 shrink-0" />
                        ) : (
                          <Building2 className="w-4 h-4 text-forest-600 shrink-0" />
                        )}
                        <div>
                          <p className="font-bold text-forest-950 flex items-center gap-1.5">
                            {opt.name}
                            {isBest && (
                              <span className="badge bg-emerald-100 text-emerald-800 text-[10px] py-0 px-1.5">
                                Best Net
                              </span>
                            )}
                          </p>
                          <p className="text-[11px] text-ink/50 font-normal">
                            {opt.location} • ~{opt.distanceKm} km
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-right num">
                      ₹{opt.pricePerQuintal}/q
                    </td>
                    <td className="px-5 py-4 text-right num font-medium text-ink/80">
                      ₹{opt.sellingValue.toLocaleString('en-IN')}
                    </td>
                    <td className="px-5 py-4 text-right num font-medium text-red-600">
                      − ₹{opt.transportCost.toLocaleString('en-IN')}
                    </td>
                    <td className="px-5 py-4 text-right num font-medium text-red-600">
                      − ₹{opt.otherCosts.toLocaleString('en-IN')}
                    </td>
                    <td className="px-5 py-4 text-right num">
                      <span className={`text-base font-extrabold ${isBest ? 'text-emerald-700' : 'text-forest-900'}`}>
                        ₹{opt.netRealization.toLocaleString('en-IN')}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right num font-bold text-forest-800">
                      ₹{opt.netPerKg}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </FarmerLayout>
  );
};
