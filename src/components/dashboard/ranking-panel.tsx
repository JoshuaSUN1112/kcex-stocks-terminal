"use client";

import { formatPct, formatPrice, formatVolume } from "@/lib/formatters";
import type { RankingItem } from "@/lib/types";

export function RankingPanel({ title, items, compact = false }: { title: string; items: RankingItem[]; compact?: boolean }) {
  return (
    <div className={compact ? "min-w-0" : "kx-card h-full min-w-0 p-4"}>
      {!compact ? (
        <div className="mb-3">
          <div className="kx-panel-title">{title}</div>
          <div className="kx-meta mt-1">Top 10 snapshot</div>
        </div>
      ) : null}
      <div className="space-y-2.5">
        {items.map((item) => (
          <div key={item.symbol} className="grid min-w-0 grid-cols-[minmax(76px,1fr)_auto_minmax(58px,auto)] items-center gap-3 rounded-xl border border-border/70 px-3 py-2.5 text-[13px] leading-5 hover:border-gold/40">
            <div className="min-w-0">
              <div className="overflow-hidden text-ellipsis whitespace-nowrap font-semibold text-text">{item.symbol}</div>
              <div className="overflow-hidden text-ellipsis whitespace-nowrap text-[12px] leading-4 text-muted">{item.name}</div>
            </div>
            <div className="min-w-0 text-right tabular-nums">
              <div className="overflow-hidden text-ellipsis whitespace-nowrap text-[13px] text-text">{formatPrice(item.price)}</div>
              <div className={`overflow-hidden text-ellipsis whitespace-nowrap text-[12px] leading-4 ${item.changePct >= 0 ? "text-up" : "text-down"}`}>{formatPct(item.changePct)}</div>
            </div>
            <div className="overflow-hidden text-ellipsis whitespace-nowrap text-right text-[12px] leading-4 text-muted tabular-nums">{formatVolume(item.volume)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
