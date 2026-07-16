"use client";

import dynamic from "next/dynamic";
import type { CompareSeries } from "@/lib/types";

const ReactECharts = dynamic(() => import("echarts-for-react"), { ssr: false });
const palette = ["#F5D07A", "#0ECB81", "#4EA1FF", "#F6465D", "#B68CFF", "#F0B90B"];

export function ComparePanel({ series, embedded = false }: { series: CompareSeries[]; embedded?: boolean }) {
  const labels = series[0]?.points.map((point) => point.time) ?? [];
  return (
    <div className={embedded ? "min-w-0" : "kx-card min-w-0 p-4"}>
      {!embedded ? (
        <div className="mb-3 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="kx-panel-title">Compare Panel for selected Tickers</div>
            <div className="kx-meta mt-1">Normalized trend comparison</div>
          </div>
          <div className="shrink-0 text-[11px] text-muted">Max 6 symbols</div>
        </div>
      ) : (
        <div className="mb-3 flex items-start justify-between gap-3">
          <div className="kx-meta">Normalized trend comparison</div>
          <div className="shrink-0 text-[11px] text-muted">Max 6 symbols</div>
        </div>
      )}
      <ReactECharts
        style={{ height: embedded ? 250 : 240, width: "100%" }}
        option={{
          animation: false,
          tooltip: { trigger: "axis" },
          legend: { top: 0, right: 0, textStyle: { color: "#9AA4B2", fontSize: 11 } },
          grid: { left: 16, right: 16, top: 42, bottom: 24, containLabel: true },
          xAxis: { type: "category", data: labels, axisLabel: { color: "#9AA4B2", fontSize: 11 }, axisLine: { lineStyle: { color: "#1F2630" } } },
          yAxis: { type: "value", axisLabel: { color: "#9AA4B2", fontSize: 11 }, splitLine: { lineStyle: { color: "rgba(154,164,178,.08)" } } },
          series: series.map((line, idx) => ({ name: line.symbol, type: "line", smooth: true, symbol: "none", data: line.points.map((point) => point.value), lineStyle: { width: 2, color: palette[idx % palette.length] } })),
        }}
      />
    </div>
  );
}
