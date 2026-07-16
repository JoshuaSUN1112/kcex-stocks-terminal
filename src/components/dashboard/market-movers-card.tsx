"use client";

import { useState } from "react";
import { RankingPanel } from "@/components/dashboard/ranking-panel";
import type { RankingItem } from "@/lib/types";

type MarketMoversTab = "gainers" | "losers" | "active";

const tabs: Array<{ key: MarketMoversTab; label: string }> = [
  { key: "gainers", label: "Gainers" },
  { key: "losers", label: "Losers" },
  { key: "active", label: "Most Active" },
];

export function MarketMoversCard({
  gainers,
  losers,
  active,
}: {
  gainers: RankingItem[];
  losers: RankingItem[];
  active: RankingItem[];
}) {
  const [tab, setTab] = useState<MarketMoversTab>("gainers");

  const items = tab === "gainers" ? gainers : tab === "losers" ? losers : active;
  const title = tab === "gainers" ? "Gainers (Top 10)" : tab === "losers" ? "Losers (Top 10)" : "Most Active (By Volume)";

  return (
    <div className="kx-card min-w-0 p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <div className="kx-panel-title">Market Movers</div>
          <div className="kx-meta mt-1">Top 10 snapshot by view</div>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-border bg-[#0f141b] p-1">
          {tabs.map((item) => {
            const activeTab = item.key === tab;
            return (
              <button
                key={item.key}
                onClick={() => setTab(item.key)}
                className={`rounded-full px-3 py-1.5 text-[12px] leading-4 transition ${activeTab ? "bg-gold/15 text-gold-hi" : "text-muted hover:text-text"}`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
      <RankingPanel title={title} items={items} compact />
    </div>
  );
}
