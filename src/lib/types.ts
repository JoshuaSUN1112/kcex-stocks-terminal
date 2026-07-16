export type IndexQuote = {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePct: number;
  spark: number[];
};

export type MarketBreadth = {
  label: string;
  advancing: number;
  declining: number;
};

export type NetFlowPoint = {
  time: string;
  inflow: number;
  outflow: number;
};

export type SectorHeatmapItem = {
  name: string;
  value: number;
  pct: number;
};

export type RankingItem = {
  symbol: string;
  name: string;
  price: number;
  changePct: number;
  volume: number;
};

export type StockRow = {
  symbol: string;
  name: string;
  sector: string;
  index: string;
  marketCapBucket: string;
  performanceBucket: string;
  price: number;
  chgPct: number;
  volume: number;
  marketCap: number;
  pe: number | null;
  divYld: number | null;
  w53High: number;
  w52Low: number;
  chart: number[];
};

export type CompareSeries = {
  symbol: string;
  points: Array<{ time: string; value: number }>;
};

export type MetricsRow = {
  symbol: string;
  name: string;
  price: number;
  pe: number | null;
  ps: number | null;
  evEbitda: number | null;
  dividendYield: number | null;
  beta: number | null;
  roe: number | null;
  grossMargin: number | null;
};
