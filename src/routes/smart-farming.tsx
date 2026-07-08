import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { CloudRain, Sun, Sprout, Droplets, Wind, ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/site/SectionHeading";

export const Route = createFileRoute("/smart-farming")({
  head: () => ({
    meta: [
      { title: "Smart Farming — Sow Hope" },
      { name: "description", content: "Tell us about your field, get a clear, simple plan with weather-aware crop guidance." },
      { property: "og:title", content: "Smart Farming Planner" },
      { property: "og:description", content: "A weather-aware crop plan tailored to your soil and irrigation." },
    ],
  }),
  component: SmartFarming,
});

type Plan = {
  summary: string;
  watering: string;
  fertilizer: string;
  warnings: string[];
  tips: string[];
};

function buildPlan(soil: string, irrigation: string, crop: string): Plan {
  const warnings: string[] = [];
  if (irrigation === "Rain-fed") warnings.push("Monitor monsoon forecast weekly; consider mulching to retain moisture.");
  if (soil === "Sandy") warnings.push("Sandy soils drain fast — split irrigation into shorter, frequent sessions.");
  return {
    summary: `For ${crop || "your crop"} on ${soil} soil with ${irrigation.toLowerCase()} irrigation, focus on soil structure first, water second, nutrition third.`,
    watering: irrigation === "Drip"
      ? "Drip 30–45 min, alternate days during vegetative growth."
      : irrigation === "Sprinkler"
      ? "Sprinkle early morning, 25 min, every 2 days."
      : irrigation === "Flood"
      ? "Flood every 7 days; ensure drainage to prevent root rot."
      : "Rely on rain; build raised beds + mulch to extend moisture.",
    fertilizer: "Top-dress with Sow Hope Vermicompost (5kg) every 21 days. Add Neem Cake at flowering.",
    warnings,
    tips: [
      "Sow at dawn or dusk — heat stress halves germination.",
      "Test soil pH every 60 days; aim for 6.0–7.5.",
      "Companion-plant moringa as a wind break and nitrogen helper.",
    ],
  };
}

function SmartFarming() {
  const [district, setDistrict] = useState("");
  const [state, setState] = useState("");
  const [crop, setCrop] = useState("");
  const [sowing, setSowing] = useState("");
  const [soil, setSoil] = useState("Loamy");
  const [irrigation, setIrrigation] = useState("Drip");
  const [plan, setPlan] = useState<Plan | null>(null);

  return (
    <>
      <section className="mx-auto max-w-5xl px-4 pt-20 pb-8 text-center sm:px-6">
        <span className="chip"><Sun className="h-3.5 w-3.5" /> Weather-aware planner</span>
        <h1 className="mt-6 font-display text-5xl font-bold tracking-tighter sm:text-7xl text-balance">
          Tell us your field. <br />
          <span className="text-shimmer">Get a clear plan.</span>
        </h1>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
          <form
            onSubmit={(e) => { e.preventDefault(); setPlan(buildPlan(soil, irrigation, crop)); }}
            className="card-surface p-6 sm:p-8 space-y-5"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="District" value={district} onChange={setDistrict} placeholder="e.g. Pune" />
              <Field label="State" value={state} onChange={setState} placeholder="e.g. Maharashtra" />
              <Field label="Crop" value={crop} onChange={setCrop} placeholder="e.g. Tomato" />
              <Field label="Date of sowing" type="date" value={sowing} onChange={setSowing} />
              <Selector label="Soil type" value={soil} onChange={setSoil} options={["Loamy","Sandy","Clay","Sandy Loam","Black Soil"]} />
              <Selector label="Irrigation" value={irrigation} onChange={setIrrigation} options={["Rain-fed","Drip","Sprinkler","Flood"]} />
            </div>
            <button type="submit" className="btn-primary w-full">
              Get my plan <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <motion.div
            key={plan ? "p" : "e"}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            className="card-surface p-6 sm:p-8"
          >
            {!plan ? (
              <div className="grid h-full place-items-center text-center">
                <div>
                  <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-primary/15 ring-1 ring-primary/30">
                    <Sprout className="h-6 w-6 text-primary" />
                  </div>
                  <p className="mt-5 font-display text-xl font-semibold">Your plan will appear here.</p>
                  <p className="mt-2 text-sm text-muted-foreground">Fill in the field details and we'll compose a practical, season-aware plan.</p>
                </div>
              </div>
            ) : (
              <div className="space-y-5">
                <div>
                  <span className="chip">Summary</span>
                  <p className="mt-3 font-display text-xl leading-snug">{plan.summary}</p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <PlanBox icon={Droplets} title="Watering" body={plan.watering} />
                  <PlanBox icon={Sprout} title="Fertilizer" body={plan.fertilizer} />
                </div>
                {plan.warnings.length > 0 && (
                  <div className="rounded-2xl border border-destructive/30 bg-destructive/10 p-4">
                    <p className="font-mono text-xs uppercase tracking-wider text-destructive-foreground/90 flex items-center gap-2">
                      <CloudRain className="h-4 w-4" /> Watch-outs
                    </p>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
                      {plan.warnings.map((w) => <li key={w}>{w}</li>)}
                    </ul>
                  </div>
                )}
                <div>
                  <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                    <Wind className="h-4 w-4" /> Field tips
                  </p>
                  <ul className="mt-3 space-y-2">
                    {plan.tips.map((t, i) => (
                      <li key={t} className="flex gap-3 rounded-xl border border-white/8 bg-white/[0.02] p-3 text-sm">
                        <span className="font-mono text-primary">0{i + 1}</span>{t}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
        <SectionHeading
          eyebrow="Weather signals"
          title={<>Forecast-aware. Soil-honest. Farmer-first.</>}
          description="We combine open weather data with traditional Indian sowing wisdom."
        />
        <div className="mt-10 grid gap-3 sm:grid-cols-3">
          {[
            { i: Sun, t: "Heat alerts", d: "Catch heatwaves before they catch you." },
            { i: CloudRain, t: "Rain windows", d: "Know the 3-day rain gap to sow." },
            { i: Droplets, t: "Soil moisture", d: "Plan irrigation around real soil drying curves." },
          ].map((it) => (
            <div key={it.t} className="card-surface p-6">
              <it.i className="h-5 w-5 text-primary" />
              <p className="mt-4 font-display text-lg font-semibold">{it.t}</p>
              <p className="mt-1 text-sm text-muted-foreground">{it.d}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function Field({
  label, value, onChange, placeholder, type = "text",
}: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) {
  return (
    <label className="block">
      <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm outline-none focus:border-primary/60"
      />
    </label>
  );
}

function Selector({
  label, value, onChange, options,
}: { label: string; value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <label className="block">
      <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm outline-none focus:border-primary/60"
      >
        {options.map((o) => <option key={o} value={o} className="bg-background">{o}</option>)}
      </select>
    </label>
  );
}

function PlanBox({ icon: Icon, title, body }: { icon: typeof Droplets; title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-4">
      <div className="flex items-center gap-2 text-primary">
        <Icon className="h-4 w-4" />
        <span className="font-mono text-xs uppercase tracking-wider">{title}</span>
      </div>
      <p className="mt-2 text-sm">{body}</p>
    </div>
  );
}
