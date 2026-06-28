import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Target, Eye, Crosshair, ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/site/SectionHeading";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Seedify" },
      { name: "description", content: "Why a group of Class 10 students decided to take on Indian agriculture." },
      { property: "og:title", content: "About — Seedify" },
      { property: "og:description", content: "Mission, vision and the story of how Seedify began." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <>
      <section className="relative mx-auto max-w-5xl px-4 pt-24 pb-16 text-center sm:px-6">
        <span className="chip">Our story</span>
        <h1 className="mt-6 font-display text-5xl font-bold tracking-tighter sm:text-7xl text-balance">
          Why we started <span className="text-shimmer">Seedify.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-balance text-muted-foreground sm:text-lg">
          We noticed something simple every time we passed a juice shop — handfuls of seeds being
          thrown away. Those seeds could become trees, food, shade and income. Seedify is the
          bridge between what is wasted and what could grow.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { icon: Target, t: "Mission", d: "Turn agricultural waste into opportunity for Indian farmers." },
            { icon: Eye, t: "Vision", d: "A self-sustaining circular farming ecosystem in every district." },
            { icon: Crosshair, t: "Objectives", d: "Quality seeds, organic compost, smart guidance, fair income." },
          ].map((it, i) => (
            <motion.div
              key={it.t}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="card-surface p-8"
            >
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary/15 ring-1 ring-primary/30">
                <it.icon className="h-6 w-6 text-primary" />
              </span>
              <h3 className="mt-5 font-display text-xl font-semibold">{it.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{it.d}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
        <SectionHeading
          eyebrow="Reality check"
          title={<>Challenges Indian farmers face every season.</>}
        />
        <div className="mt-10 grid gap-3 sm:grid-cols-2">
          {[
            "Unpredictable monsoons and heat waves",
            "Rising cost of chemical fertilizers",
            "Poor access to verified seeds",
            "Middlemen reducing margins",
          ].map((c, i) => (
            <motion.div
              key={c}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-4 rounded-2xl border border-white/8 bg-white/[0.02] p-5"
            >
              <span className="font-mono text-xs text-primary">0{i + 1}</span>
              <span>{c}</span>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6">
        <div className="card-surface grid gap-8 overflow-hidden p-10 sm:p-14 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="chip">Why it matters</span>
            <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl text-balance">
              Soil is alive. Treat it like it.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Once exhausted by chemicals, soil takes decades to recover. Sustainable farming
              protects soil, water and the income of the next generation of farmers.
            </p>
            <Link to="/marketplace" className="btn-primary mt-6">
              Browse the marketplace <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3 font-mono text-xs">
            {["Compost", "Saplings", "Seeds", "Wellness", "Manure", "Guidance"].map((t) => (
              <div key={t} className="rounded-xl border border-primary/20 bg-primary/5 p-4 text-center">{t}</div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
