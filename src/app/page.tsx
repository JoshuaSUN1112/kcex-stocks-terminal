import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-bg px-6 text-text">
      <div className="kx-card kx-card-gold max-w-xl p-10 text-center">
        <div className="mb-3 text-sm uppercase tracking-[0.24em] text-gold">KCEX Terminal</div>
        <h1 className="mb-3 text-4xl font-semibold">US Stocks Dashboard Ready</h1>
        <p className="mb-6 text-sm text-muted">
          Open the dedicated route for the desktop-first market terminal experience.
        </p>
        <Link
          href="/stocks/us"
          className="inline-flex items-center rounded-full border border-gold/40 bg-gold/10 px-5 py-3 text-sm font-medium text-gold-hi transition hover:bg-gold/20"
        >
          Go to Stocks (US)
        </Link>
      </div>
    </main>
  );
}
