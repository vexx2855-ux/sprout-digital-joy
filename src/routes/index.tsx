import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight, Sprout, CloudSun, Wallet, Recycle, Leaf, ShieldCheck,
  Compass, Sparkles, ChevronDown,
} from "lucide-react";
import { PRODUCTS } from "@/lib/products";
import { ProductCard } from "@/components/site/ProductCard";
import { SectionHeading } from "@/components/site/SectionHeading";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sow Hope — Growing Futures, One Seed at a Time" },
      { name: "description", content: "Student-led sustainable agritech. Quality seeds, smart farming guidance, organic manure and a fair marketplace for Indian farmers." },
      { property: "og:title", content: "Sow Hope — Growing Futures, One Seed at a Time" },
      { property: "og:description", content: "From discarded fruit seeds to thriving farms. Explore the marketplace, smart farming tools and organic products." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Problems />
      <Pipeline />
      <FeaturedProducts />
      <Why />
      <FinalCta />

    </>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative isolate overflow-hidden pt-16 pb-24 sm:pt-24 sm:pb-32">
      <div className="absolute inset-0 grid-bg [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      <div className="absolute -top-40 left-1/2 h-[480px] w-[820px] -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />
      <FloatingLeaves />

      <motion.div style={{ y, opacity }} className="relative mx-auto max-w-5xl px-4 text-center sm:px-6">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="chip"
        >
          <Sparkles className="h-3.5 w-3.5" /> A student innovation for sustainable farming
        </motion.span>

        <h1 className="mt-8 font-display text-5xl font-bold leading-[0.95] tracking-tighter text-balance sm:text-7xl md:text-8xl">
          <motion.span
            initial={{ opacity: 0, y: 30, filter: "blur(12px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8 }}
            className="block"
          >
            Growing futures,
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 30, filter: "blur(12px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="block text-shimmer"
          >
            one seed at a time.
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mx-auto mt-6 max-w-2xl text-balance text-base text-muted-foreground sm:text-lg"
        >
          Sow Hope turns discarded fruit seeds and farm residue into quality saplings,
          organic compost and a fair, transparent marketplace for Indian farmers.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
        >
          <Link to="/marketplace" className="btn-primary">
            Explore marketplace <ArrowRight className="h-4 w-4" />
          </Link>
          <Link to="/about" className="btn-ghost">
            <Compass className="h-4 w-4" /> Our story
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="mt-16 flex justify-center"
        >
          <ChevronDown className="h-5 w-5 animate-bounce text-muted-foreground" />
        </motion.div>
      </motion.div>
    </section>
  );
}

function FloatingLeaves() {
  const leaves = Array.from({ length: 8 });
  return (
    <div className="pointer-events-none absolute inset-0">
      {leaves.map((_, i) => {
        const left = `${(i * 13 + 7) % 95}%`;
        const top = `${(i * 21 + 11) % 80}%`;
        const delay = (i * 0.6) % 4;
        return (
          <motion.span
            key={i}
            className="absolute text-2xl opacity-30"
            style={{ left, top }}
            animate={{ y: [0, -18, 0], rotate: [0, 12, -8, 0] }}
            transition={{ duration: 6 + (i % 3), repeat: Infinity, delay }}
          >
            {i % 2 ? "🌿" : "🍃"}
          </motion.span>
        );
      })}
    </div>
  );
}

function Marquee() {
  const tags = [
    "Quality-tested seeds", "Fair pricing", "No middlemen", "Composted fruit waste",
    "Weather-aware advice", "Student-built", "Made in India", "Circular farming",
  ];
  return (
    <div className="relative -mt-6 overflow-hidden border-y border-white/5 bg-white/[0.02] py-4">
      <div className="flex w-max gap-12 animate-marquee">
        {[...tags, ...tags].map((t, i) => (
          <span key={i} className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            <span className="mr-12 text-primary">✦</span>{t}
          </span>
        ))}
      </div>
    </div>
  );
}

function Problems() {
  const items = [
    { icon: Recycle, title: "Agricultural waste", body: "Tons of fruit peels and farm residue discarded daily instead of being turned into value." },
    { icon: CloudSun, title: "Weather uncertainty", body: "Unpredictable rain and heat damage crops and reduce harvest reliability." },
    { icon: Wallet, title: "Low farmer income", body: "Middlemen and poor prices mean farmers earn far less than the value they create." },
    { icon: Sprout, title: "Wasted resources", body: "Seeds inside fruits, peels and cores are thrown away — instead of becoming new life." },
  ];
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
      <SectionHeading
        eyebrow="The problem"
        title={<>Indian farming wastes what could grow.</>}
        description="Four things are broken in the loop between fruit markets and farms. Sow Hope closes them."
      />
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((it, i) => (
          <motion.div
            key={it.title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className="card-surface p-6 transition hover:border-primary/40"
          >
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/15 ring-1 ring-primary/30">
              <it.icon className="h-5 w-5 text-primary" />
            </div>
            <h3 className="mt-5 font-display text-lg font-semibold">{it.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{it.body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Pipeline() {
  const steps = [
    { n: "01", t: "Fruit markets & juice shops", d: "Seeds collected from daily fruit waste." },
    { n: "02", t: "Cleaning & quality check", d: "Hand-sorted, dried and tested in our lab." },
    { n: "03", t: "Sow Hope marketplace", d: "Listed with weather, soil and season data." },
    { n: "04", t: "Farmers", d: "Direct, fair, fast — no middlemen." },
    { n: "05", t: "Higher income", d: "Better seeds, better yields, better margins." },
  ];
  return (
    <section className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6">
      <SectionHeading
        eyebrow="The pipeline"
        title={<>From discarded → to growing.</>}
        description="Every step is traceable. Every rupee goes back into the cycle."
      />
      <div className="mt-14 grid gap-4 md:grid-cols-5">
        {steps.map((s, i) => (
          <motion.div
            key={s.n}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="relative card-surface p-5"
          >
            <span className="font-mono text-xs text-primary">{s.n}</span>
            <h4 className="mt-3 font-display text-base font-semibold">{s.t}</h4>
            <p className="mt-1.5 text-xs text-muted-foreground">{s.d}</p>
            {i < steps.length - 1 && (
              <span className="pointer-events-none absolute -right-3 top-1/2 hidden h-px w-6 -translate-y-1/2 bg-gradient-to-r from-primary/60 to-transparent md:block" />
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function FeaturedProducts() {
  const featured = PRODUCTS.slice(0, 4);
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          eyebrow="Marketplace · Featured"
          title={<>Hand-picked, tested, ready to grow.</>}
          description="Quality seeds and saplings sourced from fruit-market salvage."
        />
        <Link to="/marketplace" className="btn-ghost">
          See all <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {featured.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
      </div>
    </section>
  );
}

function Why() {

  const items = [
    { icon: ShieldCheck, t: "Quality-tested seeds & saplings" },
    { icon: Recycle, t: "Eco-friendly composting cycle" },
    { icon: CloudSun, t: "Practical, weather-aware advice" },
    { icon: Wallet, t: "Fair pricing — no middlemen" },
  ];
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <SectionHeading
          eyebrow="Why Sow Hope"
          title={<>Built by students. Designed for farmers.</>}
          description="We are not a corporation. We are Class 10 students who believe small ideas can grow into national change."
        />
        <ul className="grid gap-3">
          {items.map((it, i) => (
            <motion.li
              key={it.t}
              initial={{ opacity: 0, x: 18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="flex items-center gap-4 rounded-2xl border border-white/8 bg-white/[0.02] p-4"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/15 ring-1 ring-primary/30">
                <it.icon className="h-5 w-5 text-primary" />
              </span>
              <span className="font-medium">{it.t}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6">
      <div className="relative overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/15 via-leaf-deep/30 to-transparent p-10 sm:p-16">
        <div className="absolute -right-10 -top-10 h-48 w-48 animate-float rounded-full bg-primary/20 blur-2xl" />
        <Leaf className="h-10 w-10 text-primary" />
        <h2 className="mt-6 font-display text-3xl font-bold tracking-tight sm:text-5xl text-balance">
          Plant one seed. <span className="text-primary">Change one season.</span>
        </h2>
        <p className="mt-4 max-w-xl text-muted-foreground">
          Pick a sapling, talk to our smart farming planner, or just say hello.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link to="/marketplace" className="btn-primary">Start shopping <ArrowRight className="h-4 w-4" /></Link>
          <Link to="/smart-farming" className="btn-ghost">Open the planner</Link>
        </div>
      </div>
    </section>
  );
}
