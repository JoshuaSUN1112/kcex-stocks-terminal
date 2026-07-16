"use client";

import { useMemo } from "react";
import { ChevronDown } from "lucide-react";
import { dashboardOptions } from "@/lib/mock-data";
import { useDashboardStore } from "@/store/dashboard-store";

export function FilterBar() {
  const filters = useDashboardStore((state) => state.filters);
  const setFilter = useDashboardStore((state) => state.setFilter);

  const filterDefs = useMemo(() => [
    { key: "index", label: "Index", options: dashboardOptions.indices },
    { key: "sector", label: "Sector", options: dashboardOptions.sectors },
    { key: "marketCap", label: "Market Cap", options: dashboardOptions.marketCaps },
    { key: "volume", label: "Volume", options: dashboardOptions.volumes },
    { key: "performance", label: "Performance", options: dashboardOptions.performances },
  ] as const, []);

  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div>
        <div className="mb-2 text-[11px] uppercase tracking-[0.1em] text-gold">KCEX Equities</div>
        <h1 className="text-[28px] font-semibold tracking-tight text-text">Stocks (US)</h1>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        {filterDefs.map((filter) => (
          <label key={filter.key} className="kx-pill flex items-center gap-2 px-4 py-2 text-[13px]">
            <span className="text-muted">{filter.label}</span>
            <select
              value={filters[filter.key]}
              onChange={(event) => setFilter(filter.key, event.target.value)}
              className="min-w-0 bg-transparent pr-5 text-text outline-none"
            >
              {filter.options.map((option) => (
                <option key={option} value={option} className="bg-card text-text">
                  {option}
                </option>
              ))}
            </select>
            <ChevronDown className="h-4 w-4 text-gold" strokeWidth={1.75} />
          </label>
        ))}
      </div>
    </div>
  );
}
