import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useCart } from "@/lib/cart-store";
import { buildInvoice, downloadInvoicePdf, type Buyer, type Invoice } from "@/lib/invoice";
import { CheckCircle2, Download, ArrowRight, FileText } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Agrivio" },
      { name: "description", content: "Cash-on-delivery checkout with downloadable PDF invoice." },
    ],
  }),
  component: Checkout,
});

function Checkout() {
  const items = useCart((s) => s.items);
  const clear = useCart((s) => s.clear);
  const navigate = useNavigate();
  const [placed, setPlaced] = useState<Invoice | null>(null);
  const [buyer, setBuyer] = useState<Buyer>({
    name: "", phone: "", email: "", address: "", city: "", state: "", pincode: "",
  });

  const subtotal = items.reduce((n, i) => n + i.qty * i.product.price, 0);
  const shipping = subtotal > 500 ? 0 : 49;
  const total = subtotal + shipping;

  if (items.length === 0 && !placed) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-32 text-center sm:px-6">
        <p className="font-display text-3xl">Nothing to check out.</p>
        <Link to="/marketplace" className="btn-primary mt-6">
          Browse marketplace <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    );
  }

  if (placed) {
    return (
      <section className="mx-auto max-w-2xl px-4 py-24 sm:px-6">
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 16 }}
          className="card-surface relative overflow-hidden p-10 text-center"
        >
          <div className="absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-primary/30 blur-3xl" />
          <div className="relative">
            <CheckCircle2 className="mx-auto h-16 w-16 text-primary" />
            <h1 className="mt-6 font-display text-4xl font-bold">Order placed!</h1>
            <p className="mt-3 text-muted-foreground">
              Invoice <span className="font-mono text-primary">{placed.id}</span> · we'll WhatsApp you a tracking link.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <button onClick={() => downloadInvoicePdf(placed)} className="btn-primary">
                <Download className="h-4 w-4" /> Download invoice
              </button>
              <Link to="/marketplace" className="btn-ghost">Keep shopping</Link>
            </div>
            <p className="mt-6 font-mono text-xs uppercase tracking-widest text-muted-foreground">
              ₹{placed.total} · Cash on delivery
            </p>
          </div>
        </motion.div>
      </section>
    );
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const inv = buildInvoice(items, buyer);
    setPlaced(inv);
    clear();
    toast.success("Order placed. Downloading invoice…");
    setTimeout(() => downloadInvoicePdf(inv), 400);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const set = (k: keyof Buyer) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setBuyer((b) => ({ ...b, [k]: e.target.value }));

  return (
    <section className="mx-auto max-w-7xl px-4 pt-20 pb-24 sm:px-6">
      <span className="chip">Checkout</span>
      <h1 className="mt-5 font-display text-5xl font-bold tracking-tighter sm:text-6xl">
        Confirm <span className="text-shimmer">& grow.</span>
      </h1>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <form onSubmit={submit} className="card-surface space-y-4 p-6 sm:p-8">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Delivery details</p>
          <Input label="Full name" value={buyer.name} onChange={set("name")} required />
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Phone" type="tel" value={buyer.phone} onChange={set("phone")} required />
            <Input label="Email" type="email" value={buyer.email} onChange={set("email")} required />
          </div>
          <Input label="Address" value={buyer.address} onChange={set("address")} required />
          <div className="grid gap-4 sm:grid-cols-3">
            <Input label="City" value={buyer.city} onChange={set("city")} required />
            <Input label="State" value={buyer.state} onChange={set("state")} required />
            <Input label="Pincode" value={buyer.pincode} onChange={set("pincode")} required />
          </div>

          <div className="!mt-6 rounded-2xl border border-primary/30 bg-primary/5 p-4">
            <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-primary">
              <FileText className="h-4 w-4" /> Cash on delivery
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Pay when your order arrives. A PDF invoice is generated automatically and downloaded for your records.
            </p>
          </div>

          <button type="submit" className="btn-primary w-full">
            Place order — ₹{total} <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        <aside className="card-surface h-fit p-6 lg:sticky lg:top-24">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Order</p>
          <ul className="mt-4 space-y-3">
            {items.map((i) => (
              <li key={i.product.id} className="flex items-center gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-xl ring-1 ring-primary/20">
                  {i.product.emoji}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{i.product.name}</p>
                  <p className="font-mono text-xs text-muted-foreground">× {i.qty}</p>
                </div>
                <p className="font-mono text-sm">₹{i.qty * i.product.price}</p>
              </li>
            ))}
          </ul>
          <div className="my-4 h-px bg-black/10" />
          <dl className="space-y-1.5 text-sm">
            <Row k="Subtotal" v={`₹${subtotal}`} />
            <Row k="Shipping" v={shipping === 0 ? "FREE" : `₹${shipping}`} />
          </dl>
          <div className="my-4 h-px bg-black/10" />
          <div className="flex items-baseline justify-between">
            <span className="font-display text-lg">Total</span>
            <span className="font-display text-2xl font-bold text-primary">₹{total}</span>
          </div>
        </aside>
      </div>
    </section>
  );
}

function Input({
  label, value, onChange, type = "text", required,
}: { label: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; type?: string; required?: boolean }) {
  return (
    <label className="block">
      <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{label}</span>
      <input
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className="mt-1.5 w-full rounded-xl border border-black/10 bg-black/5 px-3 py-2.5 text-sm outline-none focus:border-primary/60"
      />
    </label>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between">
      <dt className="text-muted-foreground">{k}</dt>
      <dd className="font-mono">{v}</dd>
    </div>
  );
}
