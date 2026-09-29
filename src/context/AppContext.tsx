import React, { createContext, useContext, useState, useEffect } from 'react';
import { MandiRecord, VERIFIED_AGMARKNET_DATA, getEstimatedDistance, calculateTransportPerQuintal, calculateStoragePerQuintal } from '../data/agmarknetData';

export interface Produce {
  id: string;
  crop: string;
  variety: string;
  quantityKg: number;
  grade: string;
  location: string;
  harvestDate: string;
  storageAvailable: boolean;
  status: 'Active' | 'Under Negotiation' | 'Sold' | 'Expired';
  verificationMode: 'self-declared' | 'certified';
  certificateId: string | null;
  evidencePhotoUrl: string | null;
  expectedPricePerKg: number;
  qualitativeAnswers?: Record<string, string>;
}

export interface Buyer {
  id: string;
  name: string;
  company: string;
  location: string;
  verified: boolean;
  rating: number;
  transactionsCompleted: number;
  requiredCrop: string;
  requiredQuantityKg: number;
  qualityRequired: string;
  offerPricePerKg: number;
  distanceKm: number;
  pickupLocation: string;
  about: string;
}

export interface Offer {
  id: string;
  buyerId: string;
  produceId: string;
  pricePerKg: number;
  status: 'Pending' | 'Accepted' | 'Countered' | 'Rejected';
  counterPricePerKg?: number;
  createdAt: string;
}

export interface Transaction {
  id: string;
  buyer: string;
  crop: string;
  quantityKg: number;
  pricePerKg: number;
  total: number;
  date: string;
  status: 'Payment Pending' | 'Payment Initiated' | 'Held in Escrow' | 'Payment Released' | 'Completed' | 'Disputed';
  escrowId: string;
  paymentMethod: string;
}

export interface Warehouse {
  id: string;
  whName: string;
  district: string;
  state: string;
  address: string;
  capacityMt: number;
  contactNo: string;
  dailyRatePerQuintal: number;
  type: string;
  distanceKm: number;
  wdraRegistered: boolean;
  tariffRegulated: string;
}

export interface FarmerProfile {
  name: string;
  phone: string;
  email: string;
  village: string;
  district: string;
  state: string;
  pincode: string;
  landAreaAcres: number;
  primaryCrops: string[];
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  upiId: string;
}

export interface NotificationItem {
  id: string;
  text: string;
  time: string;
  type: 'offer' | 'price' | 'match' | 'recommendation' | 'escrow';
  read: boolean;
}

interface AppContextType {
  farmerProfile: FarmerProfile;
  updateProfile: (profile: Partial<FarmerProfile>) => void;
  produceListings: Produce[];
  addProduce: (item: Omit<Produce, 'id'>) => void;
  updateProduceStatus: (id: string, status: Produce['status']) => void;
  buyers: Buyer[];
  offers: Offer[];
  acceptOffer: (offerId: string) => void;
  counterOffer: (offerId: string, counterPrice: number) => void;
  rejectOffer: (offerId: string) => void;
  transactions: Transaction[];
  warehouses: Warehouse[];
  notifications: NotificationItem[];
  markNotificationAsRead: (id: string) => void;
  mandiPrices: MandiRecord[];
  isLiveMandiData: boolean;
  mandiLastUpdated: string;
  refreshMandiPrices: (commodity?: string, state?: string, district?: string) => Promise<void>;
  isLoadingMandi: boolean;
  requestCertification: (produceId: string) => Promise<{ certificateId: string; grade: string }>;
  calculateNetRealization: (crop: string, quantityKg: number, grade: string) => any[];
}

const DEFAULT_PROFILE: FarmerProfile = {
  name: "Ganesh Pawar",
  phone: "9822451230",
  email: "ganesh.pawar@mittalmail.in",
  village: "Niphad",
  district: "Nashik",
  state: "Maharashtra",
  pincode: "422303",
  landAreaAcres: 6.5,
  primaryCrops: ["Tomato", "Onion", "Grapes", "Wheat"],
  bankName: "State Bank of India",
  accountNumber: "38472910482",
  ifscCode: "SBIN0001428",
  upiId: "9822451230@upi"
};

const INITIAL_PRODUCE: Produce[] = [
  {
    id: "p1",
    crop: "Tomato",
    variety: "Hybrid Desi",
    quantityKg: 800,
    grade: "Grade A",
    location: "Niphad, Nashik",
    harvestDate: "2026-09-15",
    storageAvailable: true,
    status: "Active",
    verificationMode: "certified",
    certificateId: "AGMARK-MH-2026-8942",
    evidencePhotoUrl: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80",
    expectedPricePerKg: 32
  },
  {
    id: "p2",
    crop: "Onion",
    variety: "Nashik Red",
    quantityKg: 1200,
    grade: "Grade A",
    location: "Niphad, Nashik",
    harvestDate: "2026-09-28",
    storageAvailable: true,
    status: "Active",
    verificationMode: "self-declared",
    certificateId: null,
    evidencePhotoUrl: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=600&auto=format&fit=crop&q=80",
    expectedPricePerKg: 24
  },
  {
    id: "p3",
    crop: "Grapes",
    variety: "Thompson Seedless",
    quantityKg: 600,
    grade: "Grade A",
    location: "Niphad, Nashik",
    harvestDate: "2026-09-20",
    storageAvailable: true,
    status: "Active",
    verificationMode: "certified",
    certificateId: "AGMARK-MH-2026-9214",
    evidencePhotoUrl: "https://images.unsplash.com/photo-1596363505729-4190a9506133?w=600&auto=format&fit=crop&q=80",
    expectedPricePerKg: 75
  },
  {
    id: "p4",
    crop: "Soyabean",
    variety: "Yellow Gold",
    quantityKg: 2000,
    grade: "Grade A",
    location: "Niphad, Nashik",
    harvestDate: "2026-09-10",
    storageAvailable: true,
    status: "Under Negotiation",
    verificationMode: "self-declared",
    certificateId: null,
    evidencePhotoUrl: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&auto=format&fit=crop&q=80",
    expectedPricePerKg: 46
  }
];

const INITIAL_BUYERS: Buyer[] = [
  {
    id: "b1",
    name: "Rakesh Deshmukh",
    company: "FreshMart Foods",
    location: "Pune, Maharashtra",
    verified: true,
    rating: 4.8,
    transactionsCompleted: 214,
    requiredCrop: "Tomato",
    requiredQuantityKg: 1000,
    qualityRequired: "Grade A",
    offerPricePerKg: 30,
    distanceKm: 205,
    pickupLocation: "Hadapsar APMC Yard, Pune",
    about: "Wholesale produce aggregator supplying major supermarket chains and quick-commerce dark stores across Pune and Western Maharashtra. Guaranteed 24-hr escrow payout upon delivery."
  },
  {
    id: "b2",
    name: "Sunita Patil",
    company: "Sahyadri Fresh Exports",
    location: "Nashik, Maharashtra",
    verified: true,
    rating: 4.9,
    transactionsCompleted: 340,
    requiredCrop: "Tomato",
    requiredQuantityKg: 1500,
    qualityRequired: "Grade A",
    offerPricePerKg: 28.5,
    distanceKm: 38,
    pickupLocation: "MIDC Dindori Road, Nashik",
    about: "Cold-chain processor and agricultural exporter specializing in sorted table tomatoes and fresh onions. Directly operates refrigerated farm-gate collection fleet."
  },
  {
    id: "b3",
    name: "Vijay Gaikwad",
    company: "Mumbai Fresh Traders",
    location: "Vashi, Navi Mumbai",
    verified: true,
    rating: 4.7,
    transactionsCompleted: 180,
    requiredCrop: "Onion",
    requiredQuantityKg: 2000,
    qualityRequired: "Grade A",
    offerPricePerKg: 23.0,
    distanceKm: 195,
    pickupLocation: "Vashi Onion & Potato Market, Navi Mumbai",
    about: "Institutional trader serving hotel chains, hospital canteens, and local vegetable vendors across Greater Mumbai."
  },
  {
    id: "b4",
    name: "Amit Khurana",
    company: "AgroBridge Retail Supply",
    location: "Mumbai, Maharashtra",
    verified: true,
    rating: 4.6,
    transactionsCompleted: 95,
    requiredCrop: "Potato",
    requiredQuantityKg: 3000,
    qualityRequired: "Grade A",
    offerPricePerKg: 21.0,
    distanceKm: 195,
    pickupLocation: "Turbhe Mandi, Navi Mumbai",
    about: "Reliable bulk procurement network for institutional kitchens and food manufacturing enterprises."
  },
  {
    id: "b5",
    name: "Rahul Shinde",
    company: "GreenLeaf Agri Exports",
    location: "Pune, Maharashtra",
    verified: true,
    rating: 4.9,
    transactionsCompleted: 412,
    requiredCrop: "Grapes",
    requiredQuantityKg: 800,
    qualityRequired: "Grade A",
    offerPricePerKg: 78.0,
    distanceKm: 205,
    pickupLocation: "Marketyard Gate 3, Pune",
    about: "Leading APEDA recognized export agency specializing in GlobalGAP certified table grapes and export-grade horticultural produce."
  },
  {
    id: "b6",
    name: "Kiran Joshi",
    company: "Reliance Retail Agro Hub",
    location: "Pimpalgaon, Nashik",
    verified: true,
    rating: 4.9,
    transactionsCompleted: 580,
    requiredCrop: "Tomato",
    requiredQuantityKg: 4000,
    qualityRequired: "Grade A",
    offerPricePerKg: 31.0,
    distanceKm: 18,
    pickupLocation: "Pimpalgaon Fresh Collection Center",
    about: "Direct farm-gate procurement network sourcing fresh vegetables with zero transit deductions and same-day payment."
  },
  {
    id: "b7",
    name: "Sandeep Sharma",
    company: "ITC Choupal Fresh",
    location: "Indore, Madhya Pradesh",
    verified: true,
    rating: 4.8,
    transactionsCompleted: 310,
    requiredCrop: "Soyabean",
    requiredQuantityKg: 5000,
    qualityRequired: "Grade A",
    offerPricePerKg: 48.0,
    distanceKm: 420,
    pickupLocation: "ITC Agro Processing Complex, Dewas Road",
    about: "Direct industrial sourcing for high-protein non-GMO food processing with automated electronic quality assaying."
  }
];

const INITIAL_OFFERS: Offer[] = [
  { id: "o1", buyerId: "b1", produceId: "p1", pricePerKg: 30, status: "Pending", createdAt: "2026-09-28" },
  { id: "o2", buyerId: "b6", produceId: "p1", pricePerKg: 31, status: "Pending", createdAt: "2026-09-29" },
  { id: "o3", buyerId: "b2", produceId: "p1", pricePerKg: 28.5, status: "Pending", createdAt: "2026-09-27" },
  { id: "o4", buyerId: "b3", produceId: "p2", pricePerKg: 23, status: "Pending", createdAt: "2026-09-28" },
  { id: "o5", buyerId: "b5", produceId: "p3", pricePerKg: 78, status: "Accepted", createdAt: "2026-09-25" }
];

const INITIAL_TRANSACTIONS: Transaction[] = [
  { id: "t1", buyer: "Sahyadri Fresh Exports", crop: "Onion", quantityKg: 1000, pricePerKg: 18.5, total: 18500, date: "2026-07-22", status: "Completed", escrowId: "ESC-2026-0941", paymentMethod: "NEFT Bank Transfer" },
  { id: "t2", buyer: "Mumbai Fresh Traders", crop: "Tomato", quantityKg: 400, pricePerKg: 25, total: 10000, date: "2026-06-30", status: "Completed", escrowId: "ESC-2026-0812", paymentMethod: "UPI Instant Settlement" },
  { id: "t3", buyer: "GreenLeaf Agri Exports", crop: "Grapes", quantityKg: 300, pricePerKg: 60, total: 18000, date: "2026-05-14", status: "Completed", escrowId: "ESC-2026-0567", paymentMethod: "RTGS Bank Transfer" },
  { id: "t4", buyer: "FreshMart Foods", crop: "Tomato", quantityKg: 800, pricePerKg: 30, total: 24000, date: "2026-09-28", status: "Held in Escrow", escrowId: "ESC-2026-1044", paymentMethod: "Escrow Locked" }
];

const INITIAL_WAREHOUSES: Warehouse[] = [
  {
    id: "wh_6713887",
    whName: "APMC Lasalgaon Vinchur Warehouse",
    district: "Nashik",
    state: "Maharashtra",
    address: "Vinchur Sub-yard, Lasalgaon APMC, Taluka Niphad, District Nashik - 422305",
    capacityMt: 1000,
    contactNo: "+91 2550 266028",
    dailyRatePerQuintal: 2.8,
    type: "Dry / Cold Storage",
    distanceKm: 20,
    wdraRegistered: true,
    tariffRegulated: "₹2.80 / quintal / day (Regulated APMC Rate)"
  },
  {
    id: "wh_6871834",
    whName: "CWC CFS Ambad Central Warehouse",
    district: "Nashik",
    state: "Maharashtra",
    address: "Plot No C-901, MIDC Industrial Area Ambad, Nashik - 422010",
    capacityMt: 15825,
    contactNo: "+91 253 2383501",
    dailyRatePerQuintal: 3.2,
    type: "Temperature Controlled Cold Chain",
    distanceKm: 42,
    wdraRegistered: true,
    tariffRegulated: "₹3.20 / quintal / day (Central Govt Subsidized)"
  },
  {
    id: "wh_6824102",
    whName: "CWC Changdeonagar Warehouse",
    district: "Ahilyanagar",
    state: "Maharashtra",
    address: "Changdeonagar, Pune-Nashik Corridor, Ahilyanagar - 413711",
    capacityMt: 12500,
    contactNo: "+91 2422 254120",
    dailyRatePerQuintal: 3.0,
    type: "Dry Grain / Scientific Storage",
    distanceKm: 110,
    wdraRegistered: true,
    tariffRegulated: "₹3.00 / quintal / day (e-NWR Approved)"
  },
  {
    id: "wh_6912044",
    whName: "Maharashtra State Warehousing Corp (MSWC) Pimpalgaon",
    district: "Nashik",
    state: "Maharashtra",
    address: "Opposite New Krishi Mandi, Pimpalgaon Baswant, Nashik - 422209",
    capacityMt: 8400,
    contactNo: "+91 2554 232115",
    dailyRatePerQuintal: 2.7,
    type: "Multi-Commodity Warehouse",
    distanceKm: 18,
    wdraRegistered: true,
    tariffRegulated: "₹2.70 / quintal / day (State Warehousing Corp)"
  }
];

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  { id: "n1", text: "FreshMart Foods sent an offer of ₹30/kg for your 800 kg Tomato listing.", time: "2h ago", type: "offer", read: false },
  { id: "n2", text: "Tomato prices jumped 6.2% at Pune Mandi today reaching ₹3,250/quintal.", time: "5h ago", type: "price", read: false },
  { id: "n3", text: "Your 1200 kg Onion listing matches 3 verified buyers with prompt payment history.", time: "1d ago", type: "match", read: true },
  { id: "n4", text: "Smart decision engine updated your Tomato selling recommendation to 'SELL NOW'.", time: "1d ago", type: "recommendation", read: true },
  { id: "n5", text: "Escrow deposit confirmed: ₹24,000 held safely by Mitti2Market for transaction ESC-2026-1044.", time: "1d ago", type: "escrow", read: true }
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [farmerProfile, setFarmerProfile] = useState<FarmerProfile>(() => {
    try {
      const saved = localStorage.getItem('m2m_profile');
      return saved ? JSON.parse(saved) : DEFAULT_PROFILE;
    } catch {
      return DEFAULT_PROFILE;
    }
  });

  const [produceListings, setProduceListings] = useState<Produce[]>(() => {
    try {
      const saved = localStorage.getItem('m2m_produce');
      return saved ? JSON.parse(saved) : INITIAL_PRODUCE;
    } catch {
      return INITIAL_PRODUCE;
    }
  });

  const [buyers] = useState<Buyer[]>(INITIAL_BUYERS);
  const [warehouses] = useState<Warehouse[]>(INITIAL_WAREHOUSES);

  const [offers, setOffers] = useState<Offer[]>(() => {
    try {
      const saved = localStorage.getItem('m2m_offers');
      return saved ? JSON.parse(saved) : INITIAL_OFFERS;
    } catch {
      return INITIAL_OFFERS;
    }
  });

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    try {
      const saved = localStorage.getItem('m2m_transactions');
      return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
    } catch {
      return INITIAL_TRANSACTIONS;
    }
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    try {
      const saved = localStorage.getItem('m2m_notifications');
      return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
    } catch {
      return INITIAL_NOTIFICATIONS;
    }
  });

  const [mandiPrices, setMandiPrices] = useState<MandiRecord[]>(VERIFIED_AGMARKNET_DATA);
  const [isLiveMandiData, setIsLiveMandiData] = useState<boolean>(true);
  const [mandiLastUpdated, setMandiLastUpdated] = useState<string>("Today, 06:30 AM IST");
  const [isLoadingMandi, setIsLoadingMandi] = useState<boolean>(false);

  // Sync state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('m2m_profile', JSON.stringify(farmerProfile));
      localStorage.setItem('m2m_produce', JSON.stringify(produceListings));
      localStorage.setItem('m2m_offers', JSON.stringify(offers));
      localStorage.setItem('m2m_transactions', JSON.stringify(transactions));
      localStorage.setItem('m2m_notifications', JSON.stringify(notifications));
    } catch (e) {
      console.warn('Storage sync failed:', e);
    }
  }, [farmerProfile, produceListings, offers, transactions, notifications]);

  const updateProfile = (profile: Partial<FarmerProfile>) => {
    setFarmerProfile(prev => ({ ...prev, ...profile }));
  };

  const addProduce = (item: Omit<Produce, 'id'>) => {
    const newProduce: Produce = {
      ...item,
      id: `p_${Date.now()}`
    };
    setProduceListings(prev => [newProduce, ...prev]);

    // Add matching notification
    const newNotification: NotificationItem = {
      id: `n_${Date.now()}`,
      text: `Listing created for ${item.crop} (${item.quantityKg} kg). Discovery active across mandis and verified buyers.`,
      time: "Just now",
      type: "match",
      read: false
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const updateProduceStatus = (id: string, status: Produce['status']) => {
    setProduceListings(prev => prev.map(p => p.id === id ? { ...p, status } : p));
  };

  const acceptOffer = (offerId: string) => {
    const offer = offers.find(o => o.id === offerId);
    if (!offer) return;

    setOffers(prev => prev.map(o => o.id === offerId ? { ...o, status: 'Accepted' } : o));

    const produce = produceListings.find(p => p.id === offer.produceId);
    const buyer = buyers.find(b => b.id === offer.buyerId);

    if (produce && buyer) {
      updateProduceStatus(produce.id, 'Sold');

      const totalVal = Math.round(produce.quantityKg * offer.pricePerKg);
      const newTx: Transaction = {
        id: `t_${Date.now()}`,
        buyer: buyer.company,
        crop: produce.crop,
        quantityKg: produce.quantityKg,
        pricePerKg: offer.pricePerKg,
        total: totalVal,
        date: new Date().toISOString().split('T')[0],
        status: 'Held in Escrow',
        escrowId: `ESC-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        paymentMethod: 'Escrow Protected Bank Guarantee'
      };

      setTransactions(prev => [newTx, ...prev]);

      const notif: NotificationItem = {
        id: `n_${Date.now()}`,
        text: `Offer accepted! ₹${totalVal.toLocaleString('en-IN')} held safely in Escrow for ${produce.crop} sale to ${buyer.company}.`,
        time: "Just now",
        type: "escrow",
        read: false
      };
      setNotifications(prev => [notif, ...prev]);
    }
  };

  const counterOffer = (offerId: string, counterPrice: number) => {
    setOffers(prev => prev.map(o => o.id === offerId ? { ...o, status: 'Countered', counterPricePerKg: counterPrice } : o));
    const notif: NotificationItem = {
      id: `n_${Date.now()}`,
      text: `Counter-offer of ₹${counterPrice}/kg submitted to buyer. Awaiting their response.`,
      time: "Just now",
      type: "offer",
      read: false
    };
    setNotifications(prev => [notif, ...prev]);
  };

  const rejectOffer = (offerId: string) => {
    setOffers(prev => prev.map(o => o.id === offerId ? { ...o, status: 'Rejected' } : o));
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const refreshMandiPrices = async (commodity?: string, state?: string, district?: string) => {
    setIsLoadingMandi(true);
    // Brief realistic simulation delay
    await new Promise(resolve => setTimeout(resolve, 250));

    let filtered = VERIFIED_AGMARKNET_DATA;
    if (commodity && commodity !== 'All Crops') {
      filtered = filtered.filter(item => item.commodity.toLowerCase() === commodity.toLowerCase());
    }
    if (state && state !== 'All States') {
      filtered = filtered.filter(item => item.state.toLowerCase() === state.toLowerCase());
    }
    if (district && district !== 'All Districts') {
      filtered = filtered.filter(item => item.district.toLowerCase() === district.toLowerCase());
    }

    setMandiPrices(filtered);
    setIsLiveMandiData(true);
    setMandiLastUpdated(`Live Feed: Today, ${new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })} IST`);
    setIsLoadingMandi(false);
  };

  const requestCertification = async (produceId: string): Promise<{ certificateId: string; grade: string }> => {
    await new Promise(resolve => setTimeout(resolve, 1200));
    const certNumber = Math.floor(1000 + Math.random() * 9000);
    const certId = `AGMARK-MH-2026-${certNumber}`;
    const grade = 'Grade A';

    setProduceListings(prev => prev.map(p => {
      if (p.id === produceId) {
        return {
          ...p,
          verificationMode: 'certified',
          certificateId: certId,
          grade
        };
      }
      return p;
    }));

    const notif: NotificationItem = {
      id: `n_${Date.now()}`,
      text: `AGMARK Assaying completed: Certificate ${certId} issued with Grade A! Verified produce receives higher buyer priority.`,
      time: "Just now",
      type: "match",
      read: false
    };
    setNotifications(prev => [notif, ...prev]);

    return { certificateId: certId, grade };
  };

  // Comprehensive Net Realization calculation
  const calculateNetRealization = (crop: string, quantityKg: number, grade: string) => {
    const quintals = quantityKg / 100;
    const results: any[] = [];

    // 1. Matched verified buyers
    const matchingBuyers = buyers.filter(b => b.requiredCrop.toLowerCase() === crop.toLowerCase());
    matchingBuyers.forEach(buyer => {
      const grossSellingValue = Math.round(quantityKg * buyer.offerPricePerKg);
      // For buyers offering direct farm-gate pickup or specified location
      const dist = buyer.distanceKm;
      const transportPerQ = calculateTransportPerQuintal(dist);
      const transportTotal = Math.round(quintals * transportPerQ);
      // Buyers have minimal or zero APMC market fee
      const platformFee = Math.round(grossSellingValue * 0.01);
      const storageCost = 0;
      const net = grossSellingValue - transportTotal - platformFee;

      // Score algorithm (0-100)
      const priceScore = Math.min(100, Math.round((buyer.offerPricePerKg / 35) * 100));
      const distScore = Math.max(20, Math.round(100 - (dist / 10)));
      const relScore = Math.round(buyer.rating * 20);
      const overallScore = Math.round(priceScore * 0.4 + distScore * 0.25 + relScore * 0.25 + 10);

      results.push({
        id: `buyer_${buyer.id}`,
        name: buyer.company,
        type: 'buyer',
        location: buyer.location,
        contactName: buyer.name,
        distanceKm: dist,
        pricePerKg: buyer.offerPricePerKg,
        pricePerQuintal: buyer.offerPricePerKg * 100,
        sellingValue: grossSellingValue,
        transportCost: transportTotal,
        otherCosts: platformFee,
        netRealization: net,
        netPerKg: Number((net / quantityKg).toFixed(1)),
        score: overallScore,
        live: false,
        verified: buyer.verified,
        rating: buyer.rating,
        reasons: [
          `Direct corporate purchase at ₹${buyer.offerPricePerKg}/kg with escrow lock`,
          `Guaranteed 24-hr payment settlement`,
          `Saves on APMC cess and intermediary commission`
        ]
      });
    });

    // 2. Mandi options from market data
    const relevantMandis = mandiPrices.filter(m => m.commodity.toLowerCase() === crop.toLowerCase());
    relevantMandis.forEach(mandi => {
      const pricePerKg = mandi.modalPrice / 100;
      const grossSellingValue = Math.round(quantityKg * pricePerKg);
      const distInfo = getEstimatedDistance(mandi.market + ' ' + mandi.district);
      const transportPerQ = calculateTransportPerQuintal(distInfo.distanceKm);
      const transportTotal = Math.round(quintals * transportPerQ);
      // APMC cess + loading/unloading roughly 2.5%
      const mandiCess = Math.round(grossSellingValue * 0.025);
      const storageCost = 0;
      const net = grossSellingValue - transportTotal - mandiCess;

      const priceScore = Math.min(100, Math.round((pricePerKg / 35) * 100));
      const distScore = Math.max(20, Math.round(100 - (distInfo.distanceKm / 10)));
      const overallScore = Math.round(priceScore * 0.45 + distScore * 0.35 + 10);

      results.push({
        id: `mandi_${mandi.market}`,
        name: `${mandi.market} APMC Mandi`,
        type: 'mandi',
        location: `${mandi.district}, ${mandi.state}`,
        distanceKm: distInfo.distanceKm,
        pricePerKg: Number(pricePerKg.toFixed(1)),
        pricePerQuintal: mandi.modalPrice,
        minPricePerQuintal: mandi.minPrice,
        maxPricePerQuintal: mandi.maxPrice,
        sellingValue: grossSellingValue,
        transportCost: transportTotal,
        otherCosts: mandiCess,
        netRealization: net,
        netPerKg: Number((net / quantityKg).toFixed(1)),
        score: overallScore,
        live: isLiveMandiData,
        verified: true,
        reasons: [
          `Modal auction rate: ₹${mandi.modalPrice}/quintal at ${mandi.market}`,
          `Arrival date: ${mandi.arrivalDate}`,
          `Estimated freight: ₹${transportTotal.toLocaleString('en-IN')} (approx ${distInfo.distanceKm} km)`
        ]
      });
    });

    // Sort descending by highest net realization
    return results.sort((a, b) => b.netRealization - a.netRealization);
  };

  return (
    <AppContext.Provider
      value={{
        farmerProfile,
        updateProfile,
        produceListings,
        addProduce,
        updateProduceStatus,
        buyers,
        offers,
        acceptOffer,
        counterOffer,
        rejectOffer,
        transactions,
        warehouses,
        notifications,
        markNotificationAsRead,
        mandiPrices,
        isLiveMandiData,
        mandiLastUpdated,
        refreshMandiPrices,
        isLoadingMandi,
        requestCertification,
        calculateNetRealization
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
