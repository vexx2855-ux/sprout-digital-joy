import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Recycle, Leaf, Trash2, Sprout, ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/site/SectionHeading";

export const Route = createFileRoute("/organic-manure")({
  head: () => ({
    meta: [
      { title: "Organic Manure — Sow Hope" },
      { name: "description", content: "From fruit peels to fertile soil — naturally. Learn how Sow Hope composts agricultural waste." },
      { property: "og:title", content: "Organic Manure by Sow Hope" },
      { property: "og:description", content: "Composted fruit waste, returned to Indian soil." },
    ],
  }),
  component: OrganicManure,
});

function OrganicManure() {
  return (
    <>
      <section className="mx-auto max-w-5xl px-4 pt-20 pb-12 text-center sm:px-6">
        <span className="chip"><Recycle className="h-3.5 w-3.5" /> Circular composting</span>
        <h1 className="mt-6 font-display text-5xl font-bold tracking-tighter sm:text-7xl text-balance">
          From fruit peels <br />
          <span className="text-shimmer">to fertile soil.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-muted-foreground sm:text-lg">
          Fruit peels and agricultural waste are rich in nutrients. With composting they break
          down into a dark, crumbly manure that feeds the soil instead of poisoning it.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <ol className="grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {[
            "Fruit peels","Collection","Composting","Organic manure","Farmers","Healthy soil",
          ].map((s, i) => (
            <motion.li
              key={s}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="card-surface p-4 text-center"
            >
              <span className="font-mono text-xs text-primary">0{i + 1}</span>
              <p className="mt-2 font-display text-sm font-semibold">{s}</p>
            </motion.li>
          ))}
        </ol>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
        <SectionHeading
          eyebrow="What it does"
          title={<>Tiny grains. Big regeneration.</>}
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { i: Sprout, t: "Improves fertility", d: "Restores nutrients to tired soil." },
            { i: Leaf, t: "Reduces chemicals", d: "Less dependence on synthetic fertilizer." },
            { i: Trash2, t: "Reduces waste", d: "Diverts tons of organic matter from landfills." },
            { i: Recycle, t: "Eco friendly", d: "Lower emissions, healthier ecosystems." },
          ].map((it, i) => (
            <motion.div
              key={it.t}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="card-surface p-6"
            >
              <it.i className="h-5 w-5 text-primary" />
              <p className="mt-4 font-display text-lg font-semibold">{it.t}</p>
              <p className="mt-1.5 text-sm text-muted-foreground">{it.d}</p>
            </motion.div>
          ))}
        </div>
        <div className="mt-12">
          <Link to="/products" className="btn-primary">
            Shop manure & compost <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
