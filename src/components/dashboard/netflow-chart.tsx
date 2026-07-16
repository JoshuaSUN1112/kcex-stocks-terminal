"use client";

import dynamic from "next/dynamic";
import type { NetFlowPoint } from "@/lib/types";

const ReactECharts = dynamic(() => import("echarts-for-react"), { ssr: false });

export function NetFlowChart({ data }: { data: NetFlowPoint[] }) {
  if (!data.length) {
    return <div className="kx-card flex min-h-[210px] items-center justify-center p-4 text-sm text-muted">No net flow data available.</div>;
  }

  return (
    <div className="kx-card p-4">
      <div className="mb-3">
        <div className="kx-panel-title">Net Flow Chart</div>
        <div className="text-sm text-muted">Inflow vs outflow during the session</div>
      </div>
      <ReactECharts
        style={{ height: 130 }}
        option={{
          animation: false,
          tooltip: { trigger: "axis" },
          grid: { left: 8, right: 8, top: 12, bottom: 20, containLabel: true },
          xAxis: { type: "category", data: data.map((item) => item.time), axisLabel: { color: "#9AA4B2", fontSize: 10 }, axisLine: { lineStyle: { color: "#1F2630" } } },
          yAxis: { type: "value", axisLabel: { color: "#9AA4B2" }, splitLine: { lineStyle: { color: "rgba(154,164,178,.08)" } } },
          series: [
            { name: "Inflow", type: "line", smooth: true, symbol: "none", data: data.map((item) => item.inflow), lineStyle: { color: "#0ECB81", width: 2 }, areaStyle: { color: "rgba(14,203,129,.10)" } },
            { name: "Outflow", type: "line", smooth: true, symbol: "none", data: data.map((item) => item.outflow), lineStyle: { color: "#F6465D", width: 2 }, areaStyle: { color: "rgba(246,70,93,.08)" } },
          ],
        }}
      />
    </div>
  );
}
