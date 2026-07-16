"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { BreadthChart } from "@/components/dashboard/breadth-chart";
import { FilterBar } from "@/components/dashboard/filter-bar";
import { MarketMoversCard } from "@/components/dashboard/market-movers-card";
import { NetFlowChart } from "@/components/dashboard/netflow-chart";
import { SelectedTickersCard } from "@/components/dashboard/selected-tickers-card";
import { StockTable } from "@/components/dashboard/stock-table";
import { TopNav } from "@/components/layout/top-nav";
import { getJson } from "@/lib/api";
import type { CompareSeries, IndexQuote, MarketBreadth, MetricsRow, NetFlowPoint, RankingItem, SectorHeatmapItem, StockRow } from "@/lib/types";
import { useDashboardStore } from "@/store/dashboard-store";

const IndexCard = dynamic(() => import("@/components/dashboard/index-card").then((mod) => mod.IndexCard), { ssr: false });
const SectorTreemap = dynamic(() => import("@/components/dashboard/sector-treemap").then((mod) => mod.SectorTreemap), { ssr: false });

function useDashboardData() {
  const filters = useDashboardStore((state) => state.filters);
  const compareSymbols = useDashboardStore((state) => state.compareSymbols);

  const indices = useQuery({ queryKey: ["indices"], queryFn: () => getJson<IndexQuote[]>("/api/us/indices") });
  const breadth = useQuery({ queryKey: ["breadth"], queryFn: () => getJson<MarketBreadth[]>("/api/us/market-breadth") });
  const netFlow = useQuery({ queryKey: ["netflow"], queryFn: () => getJson<NetFlowPoint[]>("/api/us/net-flow") });
  const heatmap = useQuery({ queryKey: ["heatmap"], queryFn: () => getJson<SectorHeatmapItem[]>("/api/us/sector-heatmap") });
  const gainers = useQuery({ queryKey: ["gainers"], queryFn: () => getJson<RankingItem[]>("/api/us/rankings?type=gainers") });
  const losers = useQuery({ queryKey: ["losers"], queryFn: () => getJson<RankingItem[]>("/api/us/rankings?type=losers") });
  const active = useQuery({ queryKey: ["active"], queryFn: () => getJson<RankingItem[]>("/api/us/rankings?type=active") });

  const stockQuery = new URLSearchParams({
    limit: "160",
    q: filters.q,
    index: filters.index,
    sector: filters.sector,
    marketCap: filters.marketCap,
    volume: filters.volume,
    performance: filters.performance,
  });

  const stocks = useQuery({ queryKey: ["stocks", filters], queryFn: () => getJson<{ rows: StockRow[]; total: number }>(`/api/us/stocks?${stockQuery.toString()}`) });
  const compare = useQuery({ queryKey: ["compare", compareSymbols], queryFn: () => getJson<CompareSeries[]>(`/api/us/compare?symbols=${compareSymbols.join(",")}`) });
  const metrics = useQuery({ queryKey: ["metrics", compareSymbols], queryFn: () => getJson<MetricsRow[]>(`/api/us/metrics?symbols=${compareSymbols.join(",")}`) });

  return { indices, breadth, netFlow, heatmap, gainers, losers, active, stocks, compare, metrics };
}

function SkeletonBlock({ className = "h-4 w-full" }: { className?: string }) {
  return <div className={`kx-skeleton rounded-lg ${className}`} />;
}

function IndexSkeletons() {
  return Array.from({ length: 5 }).map((_, i) => (
    <div key={i} className="kx-card kx-card-gold min-w-0 p-4">
      <SkeletonBlock className="h-4 w-2/3" />
      <SkeletonBlock className="mt-4 h-8 w-1/2" />
      <SkeletonBlock className="mt-3 h-4 w-1/3" />
      <SkeletonBlock className="mt-4 h-16 w-full rounded-xl" />
    </div>
  ));
}

function CardSkeleton({ height = 220 }: { height?: number }) {
  return (
    <div className="kx-card p-4">
      <SkeletonBlock className="h-4 w-40" />
      <SkeletonBlock className="mt-2 h-3 w-28" />
      <div className="mt-4 w-full rounded-xl kx-skeleton" style={{ height }} />
    </div>
  );
}

function StyledError({ message }: { message: string }) {
  return <div className="kx-card border-down/40 bg-down/10 p-4 text-sm text-down">{message}</div>;
}

function MarketOverviewCard({ breadth, netFlow }: { breadth: MarketBreadth[]; netFlow: NetFlowPoint[] }) {
  return (
    <div className="kx-card min-w-0 p-4">
      <div className="mb-4">
        <div className="kx-panel-title">Market Overview</div>
        <div className="kx-meta mt-1">Breadth and capital flow snapshot</div>
      </div>
      <div className="grid gap-4">
        <BreadthChart data={breadth} />
        <NetFlowChart data={netFlow} />
      </div>
    </div>
  );
}

export default function StocksUsPage() {
  const { indices, breadth, netFlow, heatmap, gainers, losers, active, stocks, compare, metrics } = useDashboardData();
  const setSelectedSector = useDashboardStore((state) => state.setSelectedSector);
  const tableRows = useMemo(() => stocks.data?.rows ?? [], [stocks.data]);
  const stocksError = stocks.error instanceof Error ? stocks.error.message : null;

  return (
    <main className="min-h-screen overflow-x-hidden bg-bg text-text">
      <TopNav />
      <div className="mx-auto w-full max-w-[1880px] px-4 py-6 sm:px-6">
        <FilterBar />

        <section className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5">
          {indices.isPending ? <IndexSkeletons /> : indices.error ? <StyledError message="Index summary failed to load." /> : (indices.data ?? []).map((quote) => <IndexCard key={quote.symbol} quote={quote} />)}
        </section>

        <section className="mt-6 grid grid-cols-1 gap-4 2xl:grid-cols-[minmax(260px,3fr)_minmax(380px,4fr)_minmax(520px,5fr)] xl:grid-cols-[minmax(250px,.95fr)_minmax(360px,1.05fr)]">
          <section className="grid min-w-0 gap-4">
            {breadth.isPending || netFlow.isPending ? <CardSkeleton height={280} /> : breadth.error || netFlow.error ? <StyledError message="Market overview failed to load." /> : <MarketOverviewCard breadth={breadth.data ?? []} netFlow={netFlow.data ?? []} />}
            {gainers.isPending || losers.isPending || active.isPending ? <CardSkeleton height={320} /> : gainers.error || losers.error || active.error ? <StyledError message="Market movers failed to load." /> : <MarketMoversCard gainers={gainers.data ?? []} losers={losers.data ?? []} active={active.data ?? []} />}
          </section>

          <section className="grid min-w-0 gap-4">
            {heatmap.isPending ? <CardSkeleton height={360} /> : heatmap.error ? <StyledError message="Sector heatmap failed to load." /> : <SectorTreemap data={heatmap.data ?? []} onSelect={setSelectedSector} />}
            {compare.isPending || metrics.isPending ? <CardSkeleton height={300} /> : compare.error || metrics.error ? <StyledError message="Selected tickers data failed to load." /> : <SelectedTickersCard series={compare.data ?? []} rows={metrics.data ?? []} />}
          </section>

          <section className="min-w-0 xl:col-span-2 2xl:col-span-1">
            {stocks.isPending ? <CardSkeleton height={640} /> : stocksError ? <StyledError message="Stock table failed to load." /> : tableRows.length ? <StockTable rows={tableRows} /> : <div className="kx-card flex min-h-[420px] flex-col items-center justify-center gap-3 p-8 text-center text-muted"><div>No stocks match the selected filters</div><div className="text-[12px]">Try setting Volume, Sector, Market Cap, and Performance back to All.</div></div>}
          </section>
        </section>
      </div>
    </main>
  );
}
