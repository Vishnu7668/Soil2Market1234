import React, { useState, useMemo } from 'react';
import {
  Truck,
  MapPin,
  Scale,
  Clock,
  DollarSign,
  Fuel,
  Info,
  CheckCircle2,
  Navigation
} from 'lucide-react';
import { FarmerLayout } from '../../components/layout/FarmerLayout';
import { useTranslation } from '../../context/LanguageContext';
import { useApp } from '../../context/AppContext';
import { KNOWN_DISTANCES, calculateTransportPerQuintal, getEstimatedDistance } from '../../data/agmarknetData';

export const LogisticsCalculatorPage: React.FC = () => {
  const { t } = useTranslation();
  const { farmerProfile } = useApp();

  const [origin, setOrigin] = useState<string>(`${farmerProfile.village}, ${farmerProfile.district}`);
  const [destinationMandi, setDestinationMandi] = useState<string>('Pimpalgaon');
  const [customDistanceKm, setCustomDistanceKm] = useState<number>(18);
  const [quantityQuintals, setQuantityQuintals] = useState<number>(50);
  const [vehicleType, setVehicleType] = useState<'pickup' | 'tata_ace' | 'medium' | 'heavy'>('pickup');

  // Handle destination change
  const handleDestinationChange = (dest: string) => {
    setDestinationMandi(dest);
    const distInfo = getEstimatedDistance(dest);
    setCustomDistanceKm(distInfo.distanceKm);
  };

  const vehicleRates = {
    tata_ace: { name: 'Tata Ace / Chhota Hathi (1 MT)', capacityQ: 10, baseKmRate: 14, minCharge: 800 },
    pickup: { name: 'Mahindra Bolero Pickup (1.5 MT)', capacityQ: 15, baseKmRate: 18, minCharge: 1200 },
    medium: { name: 'Medium Eicher 6-Wheeler (5 MT)', capacityQ: 50, baseKmRate: 35, minCharge: 2500 },
    heavy: { name: 'Multi-axle Heavy Truck (16 MT)', capacityQ: 160, baseKmRate: 65, minCharge: 5000 }
  };

  const currentVehicle = vehicleRates[vehicleType];

  // Logistics calculations
  const logisticsMetrics = useMemo(() => {
    const dist = customDistanceKm;
    const vehiclesNeeded = Math.ceil(quantityQuintals / currentVehicle.capacityQ);
    const rawTripCost = Math.max(currentVehicle.minCharge, dist * currentVehicle.baseKmRate);
    const totalFreight = rawTripCost * vehiclesNeeded;
    const costPerQuintal = Math.round(totalFreight / quantityQuintals);
    const costPerKg = (costPerQuintal / 100).toFixed(2);

    // Transit time estimation (~35 km/h rural highway speed + 1 hr loading/unloading)
    const travelHours = (dist / 35) + 1;
    const transitTimeStr = travelHours < 2
      ? `${Math.round(travelHours * 60)} mins`
      : `${travelHours.toFixed(1)} hrs`;

    return {
      vehiclesNeeded,
      totalFreight,
      costPerQuintal,
      costPerKg,
      transitTimeStr,
      fuelEst: Math.round(dist * 0.12 * 92), // approx diesel cost
      tollEst: dist > 50 ? Math.round((dist / 60) * 110) : 0
    };
  }, [customDistanceKm, quantityQuintals, currentVehicle]);

  return (
    <FarmerLayout>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-forest-900 tracking-tight flex items-center gap-2.5">
          <Truck className="w-7 h-7 text-forest-700" />
          <span>{t('logistics_calculator_title')}</span>
        </h1>
        <p className="text-ink/60 text-sm mt-1">
          {t('logistics_subtitle')}
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Input Parameters (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card p-6 sm:p-7 space-y-5">
            <h3 className="font-display font-bold text-forest-900 text-base pb-2 border-b border-forest-100 flex items-center gap-2">
              <Navigation className="w-4 h-4 text-forest-600" />
              <span>Route & Payload Specifications</span>
            </h3>

            {/* Origin & Destination */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-forest-900 mb-1.5">
                  {t('origin_location')}
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-forest-600 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={origin}
                    onChange={e => setOrigin(e.target.value)}
                    className="w-full bg-forest-50/50 border border-forest-200 rounded-xl pl-9 pr-3.5 py-2 text-sm text-forest-950 font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-forest-900 mb-1.5">
                  {t('destination_mandi')}
                </label>
                <select
                  value={destinationMandi}
                  onChange={e => handleDestinationChange(e.target.value)}
                  className="w-full bg-forest-50/50 border border-forest-200 rounded-xl px-3.5 py-2 text-sm text-forest-950 font-bold"
                >
                  {KNOWN_DISTANCES.map(item => (
                    <option key={item.match} value={item.match}>
                      {item.match.charAt(0).toUpperCase() + item.match.slice(1)} APMC Mandi (~{item.distanceKm} km)
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Distance Slider / Input */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-bold text-forest-900">
                  One-Way Freight Distance:
                </label>
                <span className="text-xs font-bold text-forest-700 font-mono">
                  {customDistanceKm} km
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="600"
                step="5"
                value={customDistanceKm}
                onChange={e => setCustomDistanceKm(Number(e.target.value))}
                className="w-full h-2 bg-forest-100 rounded-lg appearance-none cursor-pointer accent-forest-700"
              />
            </div>

            {/* Quantity in Quintals */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-bold text-forest-900">
                  Produce Cargo Weight:
                </label>
                <span className="text-xs font-bold text-forest-700 font-mono">
                  {quantityQuintals} Quintals ({(quantityQuintals * 100).toLocaleString('en-IN')} kg)
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="300"
                step="5"
                value={quantityQuintals}
                onChange={e => setQuantityQuintals(Number(e.target.value))}
                className="w-full h-2 bg-forest-100 rounded-lg appearance-none cursor-pointer accent-forest-700"
              />
            </div>

            {/* Vehicle Type Radio Grid */}
            <div>
              <label className="block text-xs font-bold text-forest-900 mb-2">
                {t('vehicle_type')}
              </label>
              <div className="grid sm:grid-cols-2 gap-3">
                {(Object.keys(vehicleRates) as Array<keyof typeof vehicleRates>).map(vKey => {
                  const v = vehicleRates[vKey];
                  const isSelected = vehicleType === vKey;

                  return (
                    <div
                      key={vKey}
                      onClick={() => setVehicleType(vKey)}
                      className={`p-3.5 rounded-xl border-2 cursor-pointer transition ${
                        isSelected
                          ? 'border-forest-700 bg-forest-50/50'
                          : 'border-forest-100 hover:border-forest-200 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-xs text-forest-900">{v.name}</span>
                        <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${isSelected ? 'border-forest-700 bg-forest-700' : 'border-forest-300'}`}>
                          {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </span>
                      </div>
                      <p className="text-[11px] text-ink/50">
                        Cap: {v.capacityQ} q • ₹{v.baseKmRate}/km
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Calculated Results Card (1 col) */}
        <div>
          <div className="card p-6 sm:p-7 border-forest-200 sticky top-20 space-y-5">
            <h3 className="font-display font-bold text-forest-900 text-lg">
              Freight Realization Summary
            </h3>

            {/* Total Cost Display */}
            <div className="bg-forest-900 text-white p-5 rounded-2xl text-center space-y-1">
              <span className="text-xs uppercase tracking-wider text-forest-200 font-semibold">
                {t('total_freight')}
              </span>
              <span className="text-3xl sm:text-4xl font-black text-amber-300 block num">
                ₹{logisticsMetrics.totalFreight.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-white/70 block">
                for {quantityQuintals} quintals ({logisticsMetrics.vehiclesNeeded} vehicle trip{logisticsMetrics.vehiclesNeeded > 1 ? 's' : ''})
              </span>
            </div>

            {/* Detailed Itemized Costs */}
            <div className="space-y-3 text-xs pt-1 border-t border-forest-100">
              <div className="flex justify-between items-center py-1">
                <span className="text-ink/60">{t('cost_per_quintal')}:</span>
                <span className="font-extrabold text-forest-900 num">₹{logisticsMetrics.costPerQuintal} / quintal</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-ink/60">Freight per kg:</span>
                <span className="font-bold text-forest-900 num">₹{logisticsMetrics.costPerKg} / kg</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-ink/60">{t('est_transit_time')}:</span>
                <span className="font-bold text-forest-900">{logisticsMetrics.transitTimeStr}</span>
              </div>
              <div className="flex justify-between items-center py-1 text-ink/50">
                <span>Est. Diesel / Fuel share:</span>
                <span className="font-mono">₹{logisticsMetrics.fuelEst}</span>
              </div>
              {logisticsMetrics.tollEst > 0 && (
                <div className="flex justify-between items-center py-1 text-ink/50">
                  <span>Highway Toll Estimate:</span>
                  <span className="font-mono">₹{logisticsMetrics.tollEst}</span>
                </div>
              )}
            </div>

            <div className="p-3 rounded-xl bg-forest-50/80 border border-forest-100 text-[11px] text-forest-900 leading-relaxed">
              💡 <strong>Net Realization Tip:</strong> Selling to local buyers in Niphad/Nashik can save approximately ₹{logisticsMetrics.totalFreight.toLocaleString('en-IN')} in freight compared to long-distance APMC transport.
            </div>
          </div>
        </div>
      </div>
    </FarmerLayout>
  );
};
