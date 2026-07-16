"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type DashboardFilters = {
  q: string;
  index: string;
  sector: string;
  marketCap: string;
  volume: string;
  performance: string;
};

type DashboardState = {
  filters: DashboardFilters;
  selectedSector: string | null;
  compareSymbols: string[];
  watchlist: string[];
  setFilter: (key: keyof DashboardFilters, value: string) => void;
  setSelectedSector: (sector: string | null) => void;
  toggleWatchlist: (symbol: string) => void;
  setCompareSymbols: (symbols: string[]) => void;
};

const WATCHLIST_KEY = "kcex-watchlist";

const loadWatchlist = () => {
  if (typeof window === "undefined") return [] as string[];
  try {
    const raw = window.localStorage.getItem(WATCHLIST_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
};

const persistWatchlist = (symbols: string[]) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(WATCHLIST_KEY, JSON.stringify(symbols));
};

export const useDashboardStore = create<DashboardState>()(
  persist(
    (set) => ({
      filters: {
        q: "",
        index: "All",
        sector: "All",
        marketCap: "All",
        volume: "All",
        performance: "All",
      },
      selectedSector: null,
      compareSymbols: ["AAPL", "MSFT", "NVDA", "AMZN"],
      watchlist: loadWatchlist(),
      setFilter: (key, value) =>
        set((state) => ({
          filters: { ...state.filters, [key]: value },
        })),
      setSelectedSector: (sector) =>
        set((state) => ({
          selectedSector: sector,
          filters: { ...state.filters, sector: sector ?? "All" },
        })),
      toggleWatchlist: (symbol) =>
        set((state) => {
          const next = state.watchlist.includes(symbol)
            ? state.watchlist.filter((item) => item !== symbol)
            : [...state.watchlist, symbol];
          persistWatchlist(next);
          return { watchlist: next };
        }),
      setCompareSymbols: (symbols) => set({ compareSymbols: Array.from(new Set(symbols)).slice(0, 6) }),
    }),
    {
      name: "kcex-dashboard-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        watchlist: state.watchlist,
        compareSymbols: state.compareSymbols,
      }),
    },
  ),
);
