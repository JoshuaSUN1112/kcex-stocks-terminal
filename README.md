# KCEX Stocks Terminal Demo

A dark-mode US equities terminal demo built with Next.js, Tailwind CSS, React Query, Zustand, and ECharts.

## Links
- **Live Demo:** https://kcex-stocks-terminal.vercel.app/
- **GitHub Repo:** https://github.com/JoshuaSUN1112/kcex-stocks-terminal

## Overview
This project is a frontend demo of a US stocks terminal / equities dashboard in a KCEX-style visual system.

It is designed to showcase:
- terminal-style dashboard layout
- index summary cards
- market breadth and net flow visualization
- sector performance treemap
- market movers
- selected ticker comparison and fundamentals
- stock screener / stock table interactions

The current version uses mock data and internal API routes for demonstration purposes.

## Main Features
- **Top terminal navigation** with search and action icons
- **Stocks (US) dashboard** with dark financial-terminal styling
- **Index cards** for DIA, SPX, IXIC, RUT, and VIX
- **Market Overview** module with:
  - Market Breadth Histogram
  - Net Flow Chart
- **Market Movers** module with tabs:
  - Gainers
  - Losers
  - Most Active
- **Sector Performance Treemap**
- **Selected Tickers** module with tabs:
  - Trend comparison
  - Fundamentals table
- **Stock Table** with:
  - sorting
  - filtering
  - search
  - watchlist star toggle
  - compare symbol interactions
- **Responsive dashboard layout** for desktop and smaller screens

## Tech Stack
- **Next.js 14**
- **React 18**
- **TypeScript**
- **Tailwind CSS**
- **TanStack React Query**
- **TanStack React Table**
- **Zustand**
- **ECharts**
- **Lucide Icons**

## Project Structure
```text
src/
  app/
    api/us/                # mock API routes
    stocks/us/             # main stocks dashboard page
  components/
    dashboard/             # dashboard modules
    layout/                # app layout / top nav / providers
  lib/
    api.ts                 # fetch helper
    formatters.ts          # UI formatting helpers
    mock-data.ts           # mock data generator and filters
    types.ts               # shared types
  store/
    dashboard-store.ts     # zustand dashboard state
```

## Local Development
### Install dependencies
```bash
npm install
```

### Run development server
```bash
npm run dev
```

Open:
```text
http://localhost:3000/stocks/us
```

## Build
```bash
npm run typecheck
npm run build
```

## Notes
- This is currently a **frontend demo / prototype**.
- Data is mocked for presentation and product validation.
- The structure is ready for future integration with live market data APIs and backend services.

## Demo Use Case
This demo can be shared for:
- product review
- internal presentation
- stakeholder demo
- UI/UX validation
- frontend prototype evaluation

## Future Enhancements
- connect to real-time market data
- add user portfolio and watchlist persistence
- add alerts and notifications
- expand screener capabilities
- integrate authentication and user settings
