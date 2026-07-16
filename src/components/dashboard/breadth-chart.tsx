"use client";

import dynamic from "next/dynamic";
import type { MarketBreadth } from "@/lib/types";

const ReactECharts = dynamic(() => import("echarts-for-react"), { ssr: false });

export function BreadthChart({ data }: { data: MarketBreadth[] }) {
  if (!data.length) {
    return <div className="kx-card flex min-h-[210px] items-center justify-center p-4 text-sm text-muted">No breadth data available.</div>;
  }

  return (
    <div className="kx-card p-4 kx-grid-lines">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <div className="kx-panel-title">Market Breadth Histogram</div>
          <div className="text-sm text-muted">Advancing vs declining issues</div>
        </div>
      </div>
      <ReactECharts
        style={{ height: 130 }}
        option={{
          animation: false,
          tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
          grid: { left: 8, right: 8, top: 12, bottom: 20, containLabel: true },
          legend: { top: 0, right: 0, textStyle: { color: "#9AA4B2" } },
          xAxis: { type: "category", data: data.map((item) => item.label), axisLabel: { color: "#9AA4B2" }, axisLine: { lineStyle: { color: "#1F2630" } } },
          yAxis: { type: "value", axisLabel: { color: "#9AA4B2" }, splitLine: { lineStyle: { color: "rgba(154,164,178,.08)" } } },
          series: [
            { name: "Advancing", type: "bar", data: data.map((item) => item.advancing), itemStyle: { color: "#0ECB81", borderRadius: [6, 6, 0, 0] } },
            { name: "Declining", type: "bar", data: data.map((item) => item.declining), itemStyle: { color: "#F6465D", borderRadius: [6, 6, 0, 0] } },
          ],
        }}
      />
    </div>
  );
}
