"use client";

import { useMemo, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ArrowUpDown, Star } from "lucide-react";
import { formatMktCap, formatNumber, formatPct, formatPrice, formatVolume } from "@/lib/formatters";
import type { StockRow } from "@/lib/types";
import { useDashboardStore } from "@/store/dashboard-store";

function TinySpark({ data, positive }: { data: number[]; positive: boolean }) {
  const width = 120;
  const height = 34;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const points = data.map((value, index) => {
    const x = (index / Math.max(data.length - 1, 1)) * width;
    const y = height - ((value - min) / range) * (height - 4) - 2;
    return `${x},${y}`;
  }).join(" ");

  return (
    <svg width="120" height="34" viewBox="0 0 120 34" className="block">
      <polyline fill="none" stroke={positive ? "#0ECB81" : "#F6465D"} strokeWidth="1.8" points={points} />
    </svg>
  );
}

const sortIcon = (sorted: false | "asc" | "desc") => {
  if (sorted === "asc") return <ArrowUp className="h-3.5 w-3.5 text-gold" strokeWidth={1.75} />;
  if (sorted === "desc") return <ArrowDown className="h-3.5 w-3.5 text-gold" strokeWidth={1.75} />;
  return <ArrowUpDown className="h-3.5 w-3.5 text-muted" strokeWidth={1.75} />;
};

export function StockTable({ rows }: { rows: StockRow[] }) {
  const toggleWatchlist = useDashboardStore((state) => state.toggleWatchlist);
  const watchlist = useDashboardStore((state) => state.watchlist);
  const compareSymbols = useDashboardStore((state) => state.compareSymbols);
  const setCompareSymbols = useDashboardStore((state) => state.setCompareSymbols);
  const [sorting, setSorting] = useState<SortingState>([{ id: "marketCap", desc: true }]);

  const columns = useMemo<ColumnDef<StockRow>[]>(() => [
    {
      id: "watch",
      header: () => <div className="flex justify-center">WL</div>,
      size: 44,
      enableSorting: false,
      cell: ({ row }) => {
        const active = watchlist.includes(row.original.symbol);
        return (
          <div className="flex justify-center">
            <button
              onClick={() => toggleWatchlist(row.original.symbol)}
              className={`inline-flex h-7 w-7 items-center justify-center rounded-full transition ${active ? "text-[#f6c453]" : "text-muted hover:text-gold-hi"}`}
              aria-label={`Toggle watchlist for ${row.original.symbol}`}
            >
              <Star className={`h-4 w-4 ${active ? "fill-current" : ""}`} strokeWidth={1.65} />
            </button>
          </div>
        );
      },
    },
    {
      accessorKey: "symbol",
      size: 88,
      header: "Symbol",
      cell: ({ row }) => {
        const symbol = row.original.symbol;
        const active = compareSymbols.includes(symbol);
        return <button className={`block max-w-full overflow-hidden text-ellipsis whitespace-nowrap font-semibold ${active ? "text-gold-hi" : "text-text hover:text-gold-hi"}`} onClick={() => setCompareSymbols([symbol, ...compareSymbols])}>{symbol}</button>;
      },
    },
    { accessorKey: "name", size: 180, header: "Name", cell: ({ getValue }) => <div className="truncate">{getValue<string>()}</div> },
    { accessorKey: "price", size: 92, header: () => <div className="text-right">Price</div>, cell: ({ getValue }) => <div className="text-right">{formatPrice(getValue<number>())}</div> },
    { accessorKey: "chgPct", size: 86, header: () => <div className="text-right">Chg %</div>, cell: ({ getValue }) => {
      const value = getValue<number>();
      return <div className={`text-right ${value >= 0 ? "text-up" : "text-down"}`}>{formatPct(value)}</div>;
    } },
    { accessorKey: "volume", size: 104, header: () => <div className="text-right">Vol</div>, cell: ({ getValue }) => <div className="text-right">{formatVolume(getValue<number>())}</div> },
    { accessorKey: "marketCap", size: 110, header: () => <div className="text-right">Mkt Cap</div>, cell: ({ getValue }) => <div className="text-right">{formatMktCap(getValue<number>())}</div> },
    { accessorKey: "pe", size: 76, header: () => <div className="text-right">PE</div>, cell: ({ getValue }) => <div className="text-right">{formatNumber(getValue<number | null>())}</div> },
    { accessorKey: "divYld", size: 86, header: () => <div className="text-right">Div Yld</div>, cell: ({ getValue }) => <div className="text-right">{formatPct(getValue<number | null>())}</div> },
    { accessorKey: "w53High", size: 98, header: () => <div className="text-right">53W High</div>, cell: ({ getValue }) => <div className="text-right">{formatPrice(getValue<number>())}</div> },
    { accessorKey: "w52Low", size: 98, header: () => <div className="text-right">52W Low</div>, cell: ({ getValue }) => <div className="text-right">{formatPrice(getValue<number>())}</div> },
    { accessorKey: "chart", size: 130, header: () => <div className="text-right">Chart</div>, enableSorting: false, cell: ({ row }) => <div className="flex justify-end"><TinySpark data={row.original.chart} positive={row.original.chgPct >= 0} /></div> },
  ], [compareSymbols, setCompareSymbols, toggleWatchlist, watchlist]);

  const table = useReactTable({
    data: rows,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="kx-card flex min-w-0 flex-col p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="kx-panel-title">Stock Table</div>
          <div className="kx-meta mt-1">Sortable, searchable US equity universe</div>
        </div>
        <div className="text-[12px] text-muted tabular-nums">Rows: {rows.length}</div>
      </div>
      <div className="min-w-0 overflow-hidden rounded-xl border border-border">
        <div className="max-h-[78vh] min-h-[620px] overflow-x-auto overflow-y-auto">
          <table className="w-full min-w-[1100px] text-[13px] leading-5 tabular-nums">
            <thead className="sticky top-0 z-10 bg-[#0f141b] text-muted">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="border-b border-border">
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} style={{ width: header.getSize() }} className="px-3 py-3 text-left font-medium whitespace-nowrap" onClick={header.column.getCanSort() ? header.column.getToggleSortingHandler() : undefined}>
                      <div className={`flex items-center gap-2 ${header.column.id === "watch" ? "justify-center" : header.column.getCanSort() ? "cursor-pointer" : ""}`}>
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.id !== "watch" ? sortIcon(header.column.getIsSorted()) : null}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="h-11 border-b border-border/50 transition hover:bg-gold/5">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-3 py-2 align-middle text-text whitespace-nowrap">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
