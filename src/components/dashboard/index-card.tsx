"use client";

import dynamic from "next/dynamic";
import { formatPct, formatPrice } from "@/lib/formatters";
import type { IndexQuote } from "@/lib/types";

const ReactECharts = dynamic(() => import("echarts-for-react"), { ssr: false });

export function IndexCard({ quote }: { quote: IndexQuote }) {
  const positive = quote.changePct >= 0;
  return (
    <div className="kx-card kx-card-gold min-w-0 p-4">
      <div className="mb-3 flex min-w-0 items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="truncate text-[13px] font-semibold leading-5 text-text">{quote.symbol} - {quote.name}</div>
          <div className="mt-2 text-[28px] font-semibold leading-none text-text">{formatPrice(quote.price)}</div>
          <div className={`mt-2 text-[13px] leading-5 ${positive ? "text-up" : "text-down"}`}>
            {positive ? "+" : ""}{quote.change.toFixed(2)} ({formatPct(quote.changePct)})
          </div>
        </div>
      </div>
      <ReactECharts
        style={{ height: 64, width: "100%" }}
        option={{
          animation: false,
          grid: { left: 0, right: 0, top: 8, bottom: 0 },
          xAxis: { type: "category", show: false, data: quote.spark.map((_, i) => i) },
          yAxis: { type: "value", show: false },
          series: [{ type: "line", data: quote.spark, smooth: true, symbol: "none", lineStyle: { width: 2, color: positive ? "#0ECB81" : "#F6465D" }, areaStyle: { color: positive ? "rgba(14,203,129,.12)" : "rgba(246,70,93,.12)" } }],
          tooltip: { trigger: "axis" },
        }}
      />
    </div>
  );
}
