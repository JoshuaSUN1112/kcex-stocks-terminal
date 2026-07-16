"use client";

import { Bell, CandlestickChart, Search, User } from "lucide-react";
import { useDashboardStore } from "@/store/dashboard-store";

const navItems = ["Markets", "Stocks (US)", "ETFs", "Options", "Futures", "Crypto", "News", "Analysis", "Portfolio", "Settings"];

export function TopNav() {
  const q = useDashboardStore((state) => state.filters.q);
  const setFilter = useDashboardStore((state) => state.setFilter);

  return (
    <header className="sticky top-0 z-20 border-b border-border/80 bg-bg/95 backdrop-blur">
      <div className="mx-auto flex max-w-[1880px] items-center gap-4 px-4 py-3 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gold/50 bg-gold/10 text-gold">
            <CandlestickChart className="h-5 w-5" strokeWidth={1.75} />
          </div>
          <div className="min-w-0">
            <div className="text-base font-semibold tracking-[0.12em] text-gold-hi">KCEX</div>
            <div className="text-[11px] uppercase tracking-[0.1em] text-muted">Stocks Terminal</div>
          </div>
        </div>

        <nav className="hidden min-w-0 flex-1 items-center justify-center gap-5 xl:flex">
          {navItems.map((item) => {
            const active = item === "Stocks (US)";
            return (
              <button key={item} className={`relative pb-2 text-[13px] leading-5 transition ${active ? "text-gold-hi" : "text-muted hover:text-text"}`}>
                {item}
                {active ? <span className="absolute bottom-0 left-0 h-[2px] w-full rounded-full bg-gold" /> : null}
              </button>
            );
          })}
        </nav>

        <div className="ml-auto flex min-w-0 items-center gap-2 sm:gap-3">
          <label className="flex min-w-0 w-[220px] items-center gap-2 rounded-full border border-border bg-card px-3 py-2 sm:w-[320px] xl:w-[360px]">
            <Search className="h-4 w-4 shrink-0 text-muted" strokeWidth={1.75} />
            <input
              value={q}
              onChange={(event) => setFilter("q", event.target.value)}
              placeholder="Search Symbol, Name, or Keyword..."
              className="w-full min-w-0 bg-transparent text-[13px] leading-5 outline-none placeholder:text-muted"
            />
          </label>
          {[Bell, User].map((Icon, idx) => (
            <button key={idx} className="kx-icon-btn" aria-label="toolbar icon button">
              <Icon className="h-4 w-4" strokeWidth={1.75} />
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
