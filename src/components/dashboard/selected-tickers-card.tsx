"use client";

import { useState } from "react";
import { ComparePanel } from "@/components/dashboard/compare-panel";
import { MetricsTable } from "@/components/dashboard/metrics-table";
import type { CompareSeries, MetricsRow } from "@/lib/types";

type SelectedTickerTab = "trend" | "fundamentals";

export function SelectedTickersCard({ series, rows }: { series: CompareSeries[]; rows: MetricsRow[] }) {
  const [tab, setTab] = useState<SelectedTickerTab>("trend");

  return (
    <div className="kx-card min-w-0 p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <div className="kx-panel-title">Selected Tickers</div>
          <div className="kx-meta mt-1">Trend and fundamentals for compared symbols</div>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-border bg-[#0f141b] p-1">
          {[
            { key: "trend", label: "Trend" },
            { key: "fundamentals", label: "Fundamentals" },
          ].map((item) => {
            const active = item.key === tab;
            return (
              <button
                key={item.key}
                onClick={() => setTab(item.key as SelectedTickerTab)}
                className={`rounded-full px-3 py-1.5 text-[12px] leading-4 transition ${active ? "bg-gold/15 text-gold-hi" : "text-muted hover:text-text"}`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
      {tab === "trend" ? <ComparePanel series={series} embedded /> : <MetricsTable rows={rows} embedded />}
    </div>
  );
}
