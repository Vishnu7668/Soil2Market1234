import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Handshake,
  CheckCircle2,
  XCircle,
  MessageSquare,
  ShieldCheck,
  Clock,
  ArrowRight,
  X,
  Send
} from 'lucide-react';
import { FarmerLayout } from '../../components/layout/FarmerLayout';
import { useTranslation } from '../../context/LanguageContext';
import { useApp, Offer } from '../../context/AppContext';

export const OffersPage: React.FC = () => {
  const { t } = useTranslation();
  const { offers, buyers, produceListings, acceptOffer, counterOffer, rejectOffer } = useApp();

  const [counterModalOffer, setCounterModalOffer] = useState<Offer | null>(null);
  const [counterPriceInput, setCounterPriceInput] = useState<number>(32);

  const handleOpenCounter = (offer: Offer) => {
    setCounterModalOffer(offer);
    setCounterPriceInput(offer.pricePerKg + 2);
  };

  const handleSendCounter = (e: React.FormEvent) => {
    e.preventDefault();
    if (counterModalOffer) {
      counterOffer(counterModalOffer.id, counterPriceInput);
      setCounterModalOffer(null);
    }
  };

  return (
    <FarmerLayout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-forest-900 tracking-tight flex items-center gap-2.5">
            <Handshake className="w-7 h-7 text-forest-700" />
            <span>{t('my_offers_title')}</span>
          </h1>
          <p className="text-ink/60 text-sm mt-1">
            {t('my_offers_subtitle')}
          </p>
        </div>
        <Link to="/farmer/produce" className="btn-secondary text-sm self-start sm:self-auto">
          <span>Manage Produce Listings</span>
        </Link>
      </div>

      {/* Offers List */}
      {offers.length === 0 ? (
        <div className="card p-14 text-center text-ink/50">
          <p>{t('no_offers_yet')}</p>
          <Link to="/farmer/produce/add" className="btn-primary mt-4 inline-flex text-sm">
            {t('add_produce')}
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {offers.map(offer => {
            const buyer = buyers.find(b => b.id === offer.buyerId);
            const produce = produceListings.find(p => p.id === offer.produceId) || produceListings[0];
            const totalAmount = produce ? Math.round(produce.quantityKg * offer.pricePerKg) : 0;

            const isPending = offer.status === 'Pending';
            const isAccepted = offer.status === 'Accepted';
            const isCountered = offer.status === 'Countered';
            const isRejected = offer.status === 'Rejected';

            return (
              <div
                key={offer.id}
                className="card p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-forest-200 transition"
              >
                {/* Buyer & Crop Info */}
                <div className="space-y-1.5 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-display font-bold text-forest-900 text-lg">
                      {buyer?.company || 'Verified Buyer'}
                    </h3>
                    {buyer?.verified && (
                      <span className="badge bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px]">
                        <ShieldCheck className="w-3 h-3 text-emerald-600" />
                        Verified
                      </span>
                    )}
                    <span className={`badge text-xs font-semibold ${
                      isAccepted
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : isCountered
                        ? 'bg-amber-100 text-amber-800 border border-amber-300'
                        : isRejected
                        ? 'bg-red-100 text-red-800 border border-red-300'
                        : 'bg-blue-50 text-blue-800 border border-blue-200'
                    }`}>
                      {offer.status === 'Pending' ? t('offer_status_pending') : offer.status}
                    </span>
                  </div>

                  <p className="text-sm font-semibold text-forest-800">
                    {produce ? `${produce.crop} — ${produce.quantityKg} kg — ${produce.grade}` : 'Produce Lot'}
                  </p>
                  <p className="text-xs text-ink/50 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Received on {offer.createdAt} • Delivery: Farm-gate pickup</span>
                  </p>
                </div>

                {/* Price & Value Details */}
                <div className="md:text-right min-w-44">
                  <span className="text-xs text-ink/50 uppercase tracking-wider font-semibold block">
                    Offered Purchase Rate
                  </span>
                  <span className="text-2xl font-black text-forest-900 num block">
                    ₹{offer.pricePerKg} <span className="text-xs text-ink/50 font-normal">/ kg</span>
                  </span>
                  <span className="text-xs text-forest-700 font-bold block mt-0.5 num">
                    Total: ₹{totalAmount.toLocaleString('en-IN')} (Escrow Protected)
                  </span>
                  {offer.counterPricePerKg && (
                    <span className="text-xs text-amber-700 font-semibold block mt-0.5">
                      Your counter: ₹{offer.counterPricePerKg}/kg
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 self-start md:self-center shrink-0">
                  {isPending && (
                    <>
                      <button
                        onClick={() => acceptOffer(offer.id)}
                        className="btn-primary !py-2 !px-3.5 text-xs flex items-center gap-1.5 shadow-xs"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                        <span>{t('accept_offer')}</span>
                      </button>

                      <button
                        onClick={() => handleOpenCounter(offer)}
                        className="btn-secondary !py-2 !px-3 text-xs flex items-center gap-1"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-amber-600" />
                        <span>{t('counter_offer')}</span>
                      </button>

                      <button
                        onClick={() => rejectOffer(offer.id)}
                        className="p-2 text-ink/40 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                        title={t('reject_offer')}
                      >
                        <XCircle className="w-4 h-4" />
                      </button>
                    </>
                  )}

                  {isAccepted && (
                    <Link
                      to="/farmer/transactions"
                      className="btn-secondary !py-2 !px-3.5 text-xs text-emerald-800 flex items-center gap-1.5"
                    >
                      <span>Track Escrow Payment →</span>
                    </Link>
                  )}

                  {isCountered && (
                    <span className="text-xs text-amber-800 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200 font-medium">
                      Awaiting Buyer Reply
                    </span>
                  )}

                  {isRejected && (
                    <span className="text-xs text-ink/40 bg-forest-50 px-3 py-1.5 rounded-lg">
                      Declined
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Counter Offer Modal */}
      {counterModalOffer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/50 backdrop-blur-2xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-forest-100 relative">
            <button
              onClick={() => setCounterModalOffer(null)}
              className="absolute top-4 right-4 text-ink/40 hover:text-ink"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-bold text-forest-900 text-lg">
                  Submit Counter-Offer
                </h3>
                <p className="text-xs text-ink/50">
                  Negotiate directly with {buyers.find(b => b.id === counterModalOffer.buyerId)?.company}
                </p>
              </div>
            </div>

            <form onSubmit={handleSendCounter} className="space-y-4">
              <div className="p-3 rounded-xl bg-forest-50 border border-forest-100 text-xs space-y-1">
                <p className="text-ink/60">Buyer's current offer: <strong className="text-forest-900 font-bold">₹{counterModalOffer.pricePerKg}/kg</strong></p>
              </div>

              <div>
                <label className="block text-xs font-bold text-forest-900 mb-1.5">
                  Your Desired Rate (₹ / kg):
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-2.5 font-bold text-ink/50">₹</span>
                  <input
                    type="number"
                    step="0.5"
                    min="1"
                    value={counterPriceInput}
                    onChange={e => setCounterPriceInput(Number(e.target.value))}
                    className="w-full bg-forest-50/50 border border-forest-200 rounded-xl pl-8 pr-3.5 py-2.5 text-base font-black text-forest-950 focus:ring-2 focus:ring-forest-500/20"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-forest-100">
                <button
                  type="button"
                  onClick={() => setCounterModalOffer(null)}
                  className="btn-secondary text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary text-xs font-bold flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Transmit Counter Rate</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </FarmerLayout>
  );
};
