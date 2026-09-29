import React, { useState, useMemo } from 'react';
import {
  Receipt,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Lock,
  ArrowUpRight,
  Download,
  AlertCircle,
  X,
  FileCheck
} from 'lucide-react';
import { FarmerLayout } from '../../components/layout/FarmerLayout';
import { useTranslation } from '../../context/LanguageContext';
import { useApp, Transaction } from '../../context/AppContext';

export const TransactionsPage: React.FC = () => {
  const { t } = useTranslation();
  const { transactions } = useApp();

  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);

  // Totals
  const totalEarned = useMemo(() => {
    return transactions
      .filter(tx => tx.status === 'Completed' || tx.status === 'Payment Released')
      .reduce((sum, tx) => sum + tx.total, 0);
  }, [transactions]);

  const totalInEscrow = useMemo(() => {
    return transactions
      .filter(tx => tx.status === 'Held in Escrow' || tx.status === 'Payment Initiated')
      .reduce((sum, tx) => sum + tx.total, 0);
  }, [transactions]);

  const getStatusBadge = (status: Transaction['status']) => {
    switch (status) {
      case 'Completed':
      case 'Payment Released':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'Held in Escrow':
        return 'bg-amber-100 text-amber-900 border-amber-300 font-bold';
      case 'Payment Initiated':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Disputed':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-forest-50 text-forest-700 border-forest-200';
    }
  };

  return (
    <FarmerLayout>
      {/* Header with Summary Cards */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-forest-900 tracking-tight flex items-center gap-2.5">
            <Receipt className="w-7 h-7 text-forest-700" />
            <span>{t('transactions_title')}</span>
          </h1>
          <p className="text-ink/60 text-sm mt-1">
            {t('transactions_subtitle')}
          </p>
        </div>

        {/* Top Earnings Quick Cards */}
        <div className="flex items-center gap-3">
          <div className="card px-4 py-2.5 text-right bg-emerald-50/60 border-emerald-200">
            <span className="text-[11px] uppercase tracking-wider text-ink/50 font-bold block">
              {t('total_earned')}
            </span>
            <span className="text-lg font-black text-emerald-800 num">
              ₹{totalEarned.toLocaleString('en-IN')}
            </span>
          </div>

          <div className="card px-4 py-2.5 text-right bg-amber-50/60 border-amber-200">
            <span className="text-[11px] uppercase tracking-wider text-ink/50 font-bold block">
              {t('pending_settlement')}
            </span>
            <span className="text-lg font-black text-amber-900 num">
              ₹{totalInEscrow.toLocaleString('en-IN')}
            </span>
          </div>
        </div>
      </div>

      {/* Escrow Workflow Notice */}
      <div className="card p-5 mb-8 bg-forest-50/60 border-forest-200">
        <div className="flex items-start gap-3">
          <Lock className="w-5 h-5 text-forest-700 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-forest-950 leading-relaxed">
            <h4 className="font-bold text-forest-900 mb-0.5">
              Escrow Protection Mechanism
            </h4>
            <p className="text-ink/70">
              When an offer is accepted, buyer funds are locked into Mitti2Market Escrow before the truck departs your farm. Upon digital weighment and quality confirmation at arrival, payment automatically settles into your bank account within 24 hours.
            </p>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      {transactions.length === 0 ? (
        <div className="card p-14 text-center text-ink/50">
          <p>{t('no_transactions')}</p>
        </div>
      ) : (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-forest-50/70 text-left text-ink/60 text-xs uppercase tracking-wider border-b border-forest-100">
                  <th className="px-5 py-3.5 font-bold text-forest-900">Escrow ID & Buyer</th>
                  <th className="px-5 py-3.5 font-bold text-forest-900">Crop Lot</th>
                  <th className="px-5 py-3.5 font-bold text-forest-900 text-right">Quantity</th>
                  <th className="px-5 py-3.5 font-bold text-forest-900 text-right">Agreed Price</th>
                  <th className="px-5 py-3.5 font-bold text-forest-900 text-right">Total Net Payout</th>
                  <th className="px-5 py-3.5 font-bold text-forest-900">Date</th>
                  <th className="px-5 py-3.5 font-bold text-forest-900">{t('escrow_status')}</th>
                  <th className="px-5 py-3.5 font-bold text-forest-900 text-right">Receipt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-forest-50">
                {transactions.map(tx => (
                  <tr key={tx.id} className="hover:bg-forest-50/30 transition">
                    <td className="px-5 py-4">
                      <p className="font-bold text-forest-950">{tx.buyer}</p>
                      <span className="font-mono text-[11px] text-ink/45">{tx.escrowId}</span>
                    </td>
                    <td className="px-5 py-4 font-semibold text-forest-900">
                      {tx.crop}
                    </td>
                    <td className="px-5 py-4 text-right num text-ink/80">
                      {tx.quantityKg.toLocaleString('en-IN')} kg
                    </td>
                    <td className="px-5 py-4 text-right num font-semibold text-forest-900">
                      ₹{tx.pricePerKg}/kg
                    </td>
                    <td className="px-5 py-4 text-right num">
                      <span className="font-extrabold text-forest-900 text-base">
                        ₹{tx.total.toLocaleString('en-IN')}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-xs text-ink/50 whitespace-nowrap">
                      {tx.date}
                    </td>
                    <td className="px-5 py-4">
                      <span className={`badge border text-xs ${getStatusBadge(tx.status)}`}>
                        {tx.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button
                        onClick={() => setSelectedTx(tx)}
                        className="text-xs font-bold text-forest-700 hover:text-forest-900 hover:underline inline-flex items-center gap-1"
                      >
                        <FileCheck className="w-3.5 h-3.5" />
                        <span>View</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Escrow Receipt Modal */}
      {selectedTx && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/50 backdrop-blur-2xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-forest-100 relative">
            <button
              onClick={() => setSelectedTx(null)}
              className="absolute top-4 right-4 text-ink/40 hover:text-ink"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-forest-100">
              <div className="w-10 h-10 rounded-xl bg-forest-100 text-forest-800 flex items-center justify-center font-bold">
                <ShieldCheck className="w-6 h-6 text-forest-700" />
              </div>
              <div>
                <h3 className="font-display font-bold text-forest-900 text-lg">
                  Escrow Settlement Certificate
                </h3>
                <p className="text-xs text-ink/50 font-mono">{selectedTx.escrowId}</p>
              </div>
            </div>

            <div className="space-y-3 text-xs text-ink/80 bg-forest-50/50 p-4 rounded-xl border border-forest-100 num">
              <div className="flex justify-between">
                <span className="text-ink/50">Buyer Organization:</span>
                <span className="font-bold text-forest-900">{selectedTx.buyer}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink/50">Crop Commodity:</span>
                <span className="font-semibold text-forest-900">{selectedTx.crop} ({selectedTx.quantityKg} kg)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink/50">Purchase Price Rate:</span>
                <span className="font-bold text-forest-900">₹{selectedTx.pricePerKg} / kg</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink/50">Settlement Method:</span>
                <span className="font-medium">{selectedTx.paymentMethod}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-forest-200 text-sm">
                <span className="font-bold text-forest-900">Total Net Amount:</span>
                <span className="font-black text-emerald-800 text-base">₹{selectedTx.total.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between items-center pt-1">
                <span className="text-ink/50">Status:</span>
                <span className={`badge border text-[11px] ${getStatusBadge(selectedTx.status)}`}>
                  {selectedTx.status}
                </span>
              </div>
            </div>

            <div className="mt-5 flex justify-end">
              <button
                onClick={() => setSelectedTx(null)}
                className="btn-primary w-full text-xs"
              >
                Close Receipt
              </button>
            </div>
          </div>
        </div>
      )}
    </FarmerLayout>
  );
};
