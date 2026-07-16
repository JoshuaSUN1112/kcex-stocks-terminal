"use client";

import { formatNumber, formatPct, formatPrice } from "@/lib/formatters";
import type { MetricsRow } from "@/lib/types";

export function MetricsTable({ rows, embedded = false }: { rows: MetricsRow[]; embedded?: boolean }) {
  return (
    <div className={embedded ? "min-w-0" : "kx-card h-full min-w-0 p-4"}>
      {!embedded ? (
        <div className="mb-3">
          <div className="kx-panel-title">Metrics Table</div>
          <div className="kx-meta mt-1">Cross-ticker fundamental comparison</div>
        </div>
      ) : (
        <div className="mb-3 kx-meta">Cross-ticker fundamental comparison</div>
      )}
      <div className="min-w-0 overflow-x-auto overflow-y-hidden">
        <table className="w-full min-w-[720px] text-[13px] leading-5 tabular-nums">
          <thead className="text-left text-muted">
            <tr className="border-b border-border">
              <th className="py-2.5 pr-4 font-medium">Ticker</th>
              <th className="py-2.5 pr-4 text-right font-medium">Price</th>
              <th className="py-2.5 pr-4 text-right font-medium">PE</th>
              <th className="py-2.5 pr-4 text-right font-medium">PS</th>
              <th className="py-2.5 pr-4 text-right font-medium">EV/EBITDA</th>
              <th className="py-2.5 pr-4 text-right font-medium">Div Yld</th>
              <th className="py-2.5 pr-4 text-right font-medium">Beta</th>
              <th className="py-2.5 text-right font-medium">ROE</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.symbol} className="border-b border-border/50 hover:bg-gold/5">
                <td className="py-2.5 pr-4 font-semibold whitespace-nowrap">{row.symbol}</td>
                <td className="py-2.5 pr-4 text-right whitespace-nowrap">{formatPrice(row.price)}</td>
                <td className="py-2.5 pr-4 text-right whitespace-nowrap">{formatNumber(row.pe)}</td>
                <td className="py-2.5 pr-4 text-right whitespace-nowrap">{formatNumber(row.ps)}</td>
                <td className="py-2.5 pr-4 text-right whitespace-nowrap">{formatNumber(row.evEbitda)}</td>
                <td className="py-2.5 pr-4 text-right whitespace-nowrap">{formatPct(row.dividendYield)}</td>
                <td className="py-2.5 pr-4 text-right whitespace-nowrap">{formatNumber(row.beta)}</td>
                <td className="py-2.5 text-right whitespace-nowrap">{formatPct(row.roe)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
