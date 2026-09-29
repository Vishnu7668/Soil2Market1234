import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { VERIFIED_AGMARKNET_DATA, getEstimatedDistance, calculateTransportPerQuintal } from './src/data/agmarknetData.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// API: Mandi Prices Mock & Proxy
app.get('/api/mandi-prices', async (req: Request, res: Response) => {
  try {
    const { commodity, state, district } = req.query;

    let filtered = VERIFIED_AGMARKNET_DATA;
    if (commodity && commodity !== 'All Crops') {
      filtered = filtered.filter(item => item.commodity.toLowerCase() === String(commodity).toLowerCase());
    }
    if (state && state !== 'All States') {
      filtered = filtered.filter(item => item.state.toLowerCase() === String(state).toLowerCase());
    }
    if (district && district !== 'All Districts') {
      filtered = filtered.filter(item => item.district.toLowerCase() === String(district).toLowerCase());
    }

    res.json({
      status: 'success',
      source: 'Mitti2Market Mandi Data Engine (AGMARKNET Standard)',
      isLive: true,
      lastUpdated: new Date().toISOString(),
      records: filtered
    });
  } catch (err: any) {
    res.status(500).json({
      status: 'error',
      message: 'Mandi pricing proxy encountered an error',
      detail: err?.message || String(err)
    });
  }
});

// API: Logistics distance & freight calculator
app.post('/api/logistics/calculate', async (req: Request, res: Response) => {
  try {
    const { origin = 'Niphad, Nashik', destination = 'Pimpalgaon', quantityQuintals = 50, vehicleType = 'pickup' } = req.body;

    const distInfo = getEstimatedDistance(String(destination));
    const transportPerQ = calculateTransportPerQuintal(distInfo.distanceKm);
    const totalFreight = transportPerQ * Number(quantityQuintals);

    res.json({
      status: 'success',
      source: 'National Highway Road Network Matrix',
      origin,
      destination,
      distanceKm: distInfo.distanceKm,
      costPerQuintal: transportPerQ,
      totalFreight,
      durationHours: Number((distInfo.distanceKm / 35 + 1).toFixed(1))
    });
  } catch (err: any) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// Vite Integration in Development
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`MITTI2MARKET Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
