import { createFileRoute, Link } from "@tanstack/react-router";
import { useCart } from "@/lib/cart-store";
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Cart — Sow Hope" },
      { name: "description", content: "Review your seeds, saplings and compost before checkout." },
    ],
  }),
  component: Cart,
});

function Cart() {
  const items = useCart((s) => s.items);
  const setQty = useCart((s) => s.setQty);
  const remove = useCart((s) => s.remove);
  const clear = useCart((s) => s.clear);
  const subtotal = items.reduce((n, i) => n + i.qty * i.product.price, 0);
  const shipping = subtotal === 0 ? 0 : subtotal > 500 ? 0 : 49;

  return (
    <section className="mx-auto max-w-7xl px-4 pt-20 pb-24 sm:px-6">
      <span className="chip">Your cart</span>
      <h1 className="mt-5 font-display text-5xl font-bold tracking-tighter sm:text-6xl">
        Ready to grow?
      </h1>

      {items.length === 0 ? (
        <div className="card-surface mt-10 grid place-items-center p-16 text-center">
          <ShoppingBag className="h-10 w-10 text-primary" />
          <p className="mt-5 font-display text-2xl">Your cart is empty.</p>
          <p className="mt-2 text-sm text-muted-foreground">Start with a sapling or a kg of compost.</p>
          <Link to="/marketplace" className="btn-primary mt-6">
            Browse marketplace <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          <div className="space-y-3">
            <AnimatePresence>
              {items.map((i) => (
                <motion.div
                  key={i.product.id}
                  layout
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  className="card-surface flex items-center gap-4 p-4"
                >
                  <div className="grid h-16 w-16 shrink-0 place-items-center rounded-xl bg-primary/10 text-3xl ring-1 ring-primary/20">
                    {i.product.emoji}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-display font-semibold truncate">{i.product.name}</p>
                    <p className="text-xs text-muted-foreground">₹{i.product.price} · {i.product.unit}</p>
                  </div>
                  <div className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1">
                    <button onClick={() => setQty(i.product.id, i.qty - 1)} className="grid h-7 w-7 place-items-center rounded-full hover:bg-white/10">
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-6 text-center font-mono text-sm">{i.qty}</span>
                    <button onClick={() => setQty(i.product.id, i.qty + 1)} className="grid h-7 w-7 place-items-center rounded-full hover:bg-white/10">
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <p className="hidden w-20 text-right font-mono font-bold text-primary sm:block">
                    ₹{i.qty * i.product.price}
                  </p>
                  <button
                    onClick={() => remove(i.product.id)}
                    className="grid h-9 w-9 place-items-center rounded-full text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
            <button onClick={clear} className="text-xs font-mono uppercase tracking-widest text-muted-foreground hover:text-destructive">
              Clear cart
            </button>
          </div>

          <aside className="card-surface h-fit p-6 lg:sticky lg:top-24">
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Order summary</p>
            <dl className="mt-4 space-y-2 text-sm">
              <Row k="Subtotal" v={`₹${subtotal}`} />
              <Row k="Shipping" v={shipping === 0 ? "FREE" : `₹${shipping}`} />
              {subtotal < 500 && subtotal > 0 && (
                <p className="text-xs text-muted-foreground">Add ₹{500 - subtotal} more for free shipping.</p>
              )}
            </dl>
            <div className="my-4 h-px bg-white/10" />
            <div className="flex items-baseline justify-between">
              <span className="font-display text-lg">Total</span>
              <span className="font-display text-2xl font-bold text-primary">₹{subtotal + shipping}</span>
            </div>
            <Link to="/checkout" className="btn-primary mt-6 w-full">
              Checkout <ArrowRight className="h-4 w-4" />
            </Link>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              Cash on delivery · PDF invoice included
            </p>
          </aside>
        </div>
      )}
    </section>
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
