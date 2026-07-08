import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Sow Hope" },
      { name: "description", content: "We reply to every message — usually within a day." },
      { property: "og:title", content: "Contact Sow Hope" },
      { property: "og:description", content: "Reach the Sow Hope team. We answer within a day." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <>
      <section className="mx-auto max-w-5xl px-4 pt-20 pb-10 text-center sm:px-6">
        <span className="chip">Contact</span>
        <h1 className="mt-6 font-display text-5xl font-bold tracking-tighter sm:text-7xl text-balance">
          Say hi. <span className="text-shimmer">We'll reply.</span>
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-muted-foreground">
          Questions, volunteering, collaborations — usually answered within a day.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
              toast.success("Message sent. We'll reply within a day.");
              (e.target as HTMLFormElement).reset();
              setTimeout(() => setSent(false), 2200);
            }}
            className="card-surface p-6 sm:p-8 space-y-4"
          >
            <Input label="Name" name="name" required />
            <div className="grid gap-4 sm:grid-cols-2">
              <Input label="Phone" name="phone" type="tel" />
              <Input label="Email" name="email" type="email" required />
            </div>
            <label className="block">
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Message</span>
              <textarea
                name="message"
                required
                rows={5}
                className="mt-1.5 w-full rounded-xl border border-black/10 bg-black/5 p-3 text-sm outline-none focus:border-primary/60"
              />
            </label>
            <button type="submit" className="btn-primary w-full">
              {sent ? "Sent ✓" : <>Send message <Send className="h-4 w-4" /></>}
            </button>
          </form>

          <div className="space-y-3">
            {[
              { i: Mail, t: "hello@sowhope.in", s: "Email us anytime" },
              { i: Phone, t: "+91 90000 12345", s: "Mon–Sat · 9am–6pm" },
              { i: MapPin, t: "New Delhi, India", s: "Visits by appointment" },
            ].map((c) => (
              <div key={c.t} className="card-surface flex items-center gap-4 p-5">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/15 ring-1 ring-primary/30">
                  <c.i className="h-5 w-5 text-primary" />
                </span>
                <div className="min-w-0">
                  <p className="font-semibold">{c.t}</p>
                  <p className="text-xs text-muted-foreground">{c.s}</p>
                </div>
              </div>
            ))}
            <div className="card-surface overflow-hidden">
              <div className="grid h-64 place-items-center bg-gradient-to-br from-primary/15 via-leaf-deep/30 to-transparent">
                <div className="text-center">
                  <MapPin className="mx-auto h-8 w-8 text-primary" />
                  <p className="mt-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                    Find us · New Delhi
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Input({ label, name, type = "text", required }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <label className="block">
      <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        className="mt-1.5 w-full rounded-xl border border-black/10 bg-black/5 px-3 py-2.5 text-sm outline-none focus:border-primary/60"
      />
    </label>
  );
}
