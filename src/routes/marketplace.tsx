import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { PRODUCTS, STATES, WEATHERS, SEASONS, SOILS, WATERS } from "@/lib/products";
import { ProductCard } from "@/components/site/ProductCard";

export const Route = createFileRoute("/marketplace")({
  head: () => ({
    meta: [
      { title: "Marketplace — Seedify" },
      { name: "description", content: "Quality-tested seeds and saplings. Filter by state, weather, soil, water and season." },
      { property: "og:title", content: "Seedify Marketplace" },
      { property: "og:description", content: "Find the right seed for your land in seconds." },
    ],
  }),
  component: Marketplace,
});

function Marketplace() {
  const [q, setQ] = useState("");
  const [state, setState] = useState("All");
  const [weather, setWeather] = useState("All");
  const [season, setSeason] = useState("All");
  const [soil, setSoil] = useState("All");
  const [water, setWater] = useState("All");

  const filtered = useMemo(() => {
    return PRODUCTS.filter((p) => {
      if (q && !`${p.name} ${p.tagline}`.toLowerCase().includes(q.toLowerCase())) return false;
      if (state !== "All" && !(p.regions ?? []).includes(state)) return false;
      if (weather !== "All" && p.weather !== weather) return false;
      if (season !== "All" && p.season !== season) return false;
      if (soil !== "All" && p.soil !== soil) return false;
      if (water !== "All" && p.water !== water) return false;
      return true;
    });
  }, [q, state, weather, season, soil, water]);

  return (
    <>
      <section className="mx-auto max-w-7xl px-4 pt-20 pb-10 sm:px-6">
        <span className="chip">Marketplace</span>
        <h1 className="mt-5 font-display text-5xl font-bold tracking-tighter sm:text-6xl text-balance">
          Only quality-tested. <span className="text-shimmer">Filter to fit your land.</span>
        </h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Every listing shows weather, soil and water needs so you choose with confidence.
        </p>
      </section>

      <section className="sticky top-[60px] z-30 border-y border-white/5 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6">
          <div className="grid gap-2 md:grid-cols-[1.4fr_repeat(5,1fr)]">
            <label className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search seeds, saplings…"
                className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/40"
              />
            </label>
            <Select label="State" value={state} onChange={setState} options={STATES} />
            <Select label="Weather" value={weather} onChange={setWeather} options={WEATHERS} />
            <Select label="Season" value={season} onChange={setSeason} options={SEASONS} />
            <Select label="Soil" value={soil} onChange={setSoil} options={SOILS} />
            <Select label="Water" value={water} onChange={setWater} options={WATERS} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        {filtered.length === 0 ? (
          <div className="card-surface p-16 text-center">
            <p className="font-display text-2xl">No matches.</p>
            <p className="mt-2 text-sm text-muted-foreground">Try clearing a filter or two.</p>
          </div>
        ) : (
          <>
            <p className="mb-6 font-mono text-xs uppercase tracking-widest text-muted-foreground">
              {filtered.length} result{filtered.length === 1 ? "" : "s"}
            </p>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          </>
        )}
      </section>
    </>
  );
}

function Select({
  label, value, onChange, options,
}: { label: string; value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <label className="relative">
      <span className="pointer-events-none absolute left-3 top-1.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none rounded-xl border border-white/10 bg-white/5 px-3 pt-5 pb-1.5 text-sm outline-none focus:border-primary/60"
      >
        {options.map((o) => <option key={o} value={o} className="bg-background">{o}</option>)}
      </select>
    </label>
  );
}
