import dayjs from "dayjs";
import type {
  CompareSeries,
  IndexQuote,
  MarketBreadth,
  MetricsRow,
  NetFlowPoint,
  RankingItem,
  SectorHeatmapItem,
  StockRow,
} from "@/lib/types";

const sectors = [
  "Technology",
  "Healthcare",
  "Financials",
  "Consumer Discretionary",
  "Communication Services",
  "Industrials",
  "Energy",
  "Utilities",
  "Materials",
  "Real Estate",
  "Consumer Staples",
  "Semiconductors",
] as const;

const indices = ["SPX", "IXIC", "DIA", "RUT"] as const;
const tickerSeeds = [
  "AAPL","MSFT","NVDA","AMZN","GOOGL","META","TSLA","AMD","NFLX","AVGO",
  "JPM","V","MA","XOM","UNH","LLY","COST","PG","HD","ABBV",
  "CRM","ORCL","ADBE","PEP","KO","WMT","BAC","MRK","CSCO","INTC"
];
const companyPrefixes = ["Atlas","Blue","Crown","Delta","Eagle","Falcon","Global","Helix","Ion","Jade","Keystone","Lumen","Meridian","Nova","Omega","Pioneer","Quantum","Redwood","Summit","Titan","Union","Vertex","West","Zenith"];
const companySuffixes = ["Systems","Holdings","Technologies","Health","Financial","Retail","Networks","Industrial","Energy","Labs","Capital","Media","Logistics","Dynamics"];
const hashCode = (value: string) => value.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
const makeSpark = (seed: number, base: number, drift: number) => Array.from({ length: 24 }, (_, idx) => Number((base + drift * idx * 0.16 + Math.sin((idx + seed) / 3) * base * 0.018 + ((seed * (idx + 11)) % 17) / 100).toFixed(2)));
const symbolAt = (i: number) => {
  if (i < tickerSeeds.length) return tickerSeeds[i];
  const alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return `${alpha[i % 26]}${alpha[Math.floor(i / 26) % 26]}${alpha[(i * 7) % 26]}${alpha[(i * 11) % 26]}`;
};

const sectorRank = new Map<string, number>([
  ["Technology", 1],
  ["Semiconductors", 2],
  ["Communication Services", 3],
  ["Healthcare", 4],
  ["Consumer Discretionary", 5],
  ["Financials", 6],
  ["Industrials", 7],
  ["Consumer Staples", 8],
  ["Materials", 9],
  ["Energy", 10],
  ["Utilities", 11],
  ["Real Estate", 12],
]);

export const indexQuotes: IndexQuote[] = [
  { symbol: "DIA", name: "Dow Jones Industrial Average", price: 39150.25, change: 120.5, changePct: 0.31, spark: [38880,38915,38942,38960,38920,38985,39030,39010,39075,39110,39095,39150] },
  { symbol: "SPX", name: "S&P 500", price: 5280.1, change: 35.2, changePct: 0.67, spark: [5201,5210,5218,5225,5232,5230,5245,5254,5262,5268,5275,5280] },
  { symbol: "IXIC", name: "Nasdaq Composite", price: 16540.75, change: 110.15, changePct: 0.67, spark: [16340,16385,16400,16420,16410,16435,16470,16495,16510,16518,16532,16540] },
  { symbol: "RUT", name: "Russell 2000", price: 2120.45, change: -8.3, changePct: -0.39, spark: [2144,2140,2138,2135,2132,2129,2128,2126,2123,2122,2121,2120] },
  { symbol: "VIX", name: "CBOE Volatility Index", price: 13.2, change: -0.45, changePct: -3.3, spark: [14.7,14.5,14.2,14.0,13.9,13.8,13.7,13.6,13.5,13.4,13.3,13.2] },
];

export const marketBreadth: MarketBreadth[] = [
  { label: "NYSE", advancing: 1735, declining: 1184 },
  { label: "NASDAQ", advancing: 2210, declining: 1842 },
  { label: "S&P 500", advancing: 318, declining: 182 },
  { label: "Russell 2000", advancing: 1042, declining: 958 },
  { label: "Dow 30", advancing: 19, declining: 11 },
];

export const netFlow: NetFlowPoint[] = Array.from({ length: 16 }, (_, i) => ({
  time: dayjs().startOf("day").add(9 * 60 + 30 + i * 15, "minute").format("HH:mm"),
  inflow: Number((180 + Math.sin(i / 2) * 40 + i * 6).toFixed(2)),
  outflow: Number((130 + Math.cos(i / 2.4) * 35 + i * 4.5).toFixed(2)),
}));

export const sectorHeatmap: SectorHeatmapItem[] = sectors.map((name, idx) => ({
  name,
  value: 180 + idx * 35,
  pct: Number((((idx % 2 === 0 ? 1 : -1) * ((idx + 3) % 7) * 0.38) + (idx === 0 ? 1.2 : 0)).toFixed(2)),
}));

export const allStocks: StockRow[] = Array.from({ length: 500 }, (_, i) => {
  const symbol = symbolAt(i);
  const seed = hashCode(symbol);
  const sector = sectors[i % sectors.length];
  const index = indices[i % indices.length];
  const name = i < tickerSeeds.length ? `${symbol} ${companySuffixes[i % companySuffixes.length]}` : `${companyPrefixes[i % companyPrefixes.length]} ${companySuffixes[(i + 3) % companySuffixes.length]}`;
  const sectorBoost = 13 - (sectorRank.get(sector) ?? 6);
  const marketCap = Math.round(8_000_000_000 + sectorBoost * 55_000_000_000 + ((seed * 9301) % 520_000_000_000));
  const price = Number((18 + (seed % 650) * 0.42 + sectorBoost * 1.8).toFixed(2));
  const chgPct = Number((((seed % 170) - 85) / 22).toFixed(2));
  const volumeBucket = i % 20;
  const volume = volumeBucket < 7
    ? Math.round(780_000 + (seed % 420_000))
    : volumeBucket < 15
      ? Math.round(520_000 + (seed % 210_000))
      : Math.round(180_000 + (seed % 290_000));
  const peRaw = (seed % 470) / 10;
  const pe = seed % 13 === 0 ? null : Number((8 + peRaw).toFixed(2));
  const divYld = seed % 8 === 0 ? null : Number((((seed % 45) / 10) * 0.35).toFixed(2));
  const w53High = Number((price * (1.08 + (seed % 15) / 100)).toFixed(2));
  const w52Low = Number((price * (0.72 - (seed % 9) / 100)).toFixed(2));
  const marketCapBucket = marketCap > 300_000_000_000 ? "Mega" : marketCap > 60_000_000_000 ? "Large" : marketCap > 10_000_000_000 ? "Mid" : "Small";
  const performanceBucket = chgPct > 2 ? "Strong" : chgPct > 0 ? "Positive" : chgPct > -2 ? "Flat" : "Weak";

  return { symbol, name, sector, index, marketCapBucket, performanceBucket, price, chgPct, volume, marketCap, pe, divYld, w53High, w52Low, chart: makeSpark(seed % 29, price, chgPct) };
});

const toRankingItem = (stock: StockRow): RankingItem => ({
  symbol: stock.symbol,
  name: stock.name,
  price: stock.price,
  changePct: stock.chgPct,
  volume: stock.volume,
});

export const rankings = {
  gainers: [...allStocks].sort((a, b) => b.chgPct - a.chgPct).slice(0, 10).map(toRankingItem),
  losers: [...allStocks].sort((a, b) => a.chgPct - b.chgPct).slice(0, 10).map(toRankingItem),
  active: [...allStocks].sort((a, b) => b.volume - a.volume).slice(0, 10).map(toRankingItem),
} satisfies Record<string, RankingItem[]>;

export const compareSeries = (symbols: string[]): CompareSeries[] => symbols.map((symbol, idx) => {
  const stock = allStocks.find((item) => item.symbol === symbol) ?? allStocks[idx];
  const seed = hashCode(symbol);
  return {
    symbol,
    points: Array.from({ length: 30 }, (_, i) => ({
      time: dayjs().subtract(29 - i, "day").format("MM/DD"),
      value: Number((stock.price * (0.92 + i * 0.006 + Math.sin((i + seed) / 4) * 0.02)).toFixed(2)),
    })),
  };
});

export const metricsRows = (symbols: string[]): MetricsRow[] => symbols.map((symbol, idx) => {
  const stock = allStocks.find((item) => item.symbol === symbol) ?? allStocks[idx];
  const seed = hashCode(symbol);
  return {
    symbol,
    name: stock.name,
    price: stock.price,
    pe: stock.pe,
    ps: Number((2 + (seed % 60) / 10).toFixed(2)),
    evEbitda: Number((8 + (seed % 90) / 5).toFixed(2)),
    dividendYield: stock.divYld,
    beta: Number((0.7 + (seed % 12) / 10).toFixed(2)),
    roe: Number((8 + (seed % 140) / 4).toFixed(2)),
    grossMargin: Number((24 + (seed % 180) / 3).toFixed(2)),
  };
});

export function filterStocks(params: { q?: string; sector?: string; index?: string; marketCap?: string; performance?: string; volume?: string; }) {
  let rows = [...allStocks];
  const q = params.q?.trim().toLowerCase();
  if (q) rows = rows.filter((row) => row.symbol.toLowerCase().includes(q) || row.name.toLowerCase().includes(q));
  if (params.sector && params.sector !== "All") rows = rows.filter((row) => row.sector === params.sector);
  if (params.index && params.index !== "All") rows = rows.filter((row) => row.index === params.index);
  if (params.marketCap && params.marketCap !== "All") rows = rows.filter((row) => row.marketCapBucket === params.marketCap);
  if (params.performance && params.performance !== "All") rows = rows.filter((row) => row.performanceBucket === params.performance);
  if (params.volume && params.volume !== "All") {
    rows = rows.filter((row) => params.volume === "High" ? row.volume >= 750_000 : params.volume === "Medium" ? row.volume >= 500_000 && row.volume < 750_000 : row.volume < 500_000);
  }
  return rows;
}

export function deriveDashboardOptions(rows: StockRow[]) {
  const collect = <T,>(values: T[]) => Array.from(new Set(values)).sort();
  return {
    sectors: ["All", ...collect(rows.map((row) => row.sector))],
    indices: ["All", ...collect(rows.map((row) => row.index))],
    marketCaps: ["All", ...collect(rows.map((row) => row.marketCapBucket))],
    volumes: ["All", "High", "Medium", "Low"],
    performances: ["All", ...collect(rows.map((row) => row.performanceBucket))],
  };
}

export const dashboardOptions = deriveDashboardOptions(allStocks);
