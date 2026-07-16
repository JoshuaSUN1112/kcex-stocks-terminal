"use client";

import dynamic from "next/dynamic";
import type { SectorHeatmapItem } from "@/lib/types";

const ReactECharts = dynamic(() => import("echarts-for-react"), { ssr: false });

export function SectorTreemap({ data, onSelect }: { data: SectorHeatmapItem[]; onSelect?: (sector: string) => void; }) {
  if (!data.length) {
    return <div className="kx-card flex min-h-[360px] items-center justify-center p-4 text-sm text-muted">No sector heatmap data available.</div>;
  }

  return (
    <div className="kx-card h-full p-4">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <div className="kx-panel-title">US Sector Performance</div>
          <div className="text-sm text-muted">Treemap heat by sector return</div>
        </div>
        <div className="text-xs text-gold">Click sector to filter</div>
      </div>
      <ReactECharts
        style={{ height: 360, width: "100%" }}
        onEvents={{ click: (params: { name?: string }) => params?.name && onSelect?.(params.name) }}
        option={{
          animation: false,
          tooltip: { formatter: (params: { name: string; data: SectorHeatmapItem }) => `${params.name}<br/>${params.data.pct > 0 ? "+" : ""}${params.data.pct}%` },
          series: [{
            type: "treemap",
            roam: false,
            breadcrumb: { show: false },
            nodeClick: false,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            label: { show: true, formatter: (params: { name: string; data: SectorHeatmapItem }) => `${params.name}\n${params.data.pct > 0 ? "+" : ""}${params.data.pct}%`, color: "#EAECEF", fontSize: 13 },
            itemStyle: { borderColor: "#0B0E11", gapWidth: 3 },
            data: data.map((item) => ({ ...item, itemStyle: { color: item.pct >= 0 ? (item.pct > 1 ? "#0ECB81" : "#1f7a59") : item.pct < -1 ? "#F6465D" : "#8a3340" } })),
          }],
        }}
      />
    </div>
  );
}
