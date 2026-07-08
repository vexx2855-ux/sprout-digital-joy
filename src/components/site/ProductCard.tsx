import { motion } from "framer-motion";
import { Plus, Check } from "lucide-react";
import { useCart } from "@/lib/cart-store";
import type { Product } from "@/lib/products";
import { useState } from "react";
import { toast } from "sonner";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const add = useCart((s) => s.add);
  const [added, setAdded] = useState(false);

  const onAdd = () => {
    add(product);
    setAdded(true);
    toast.success(`${product.name} added to cart`);
    setTimeout(() => setAdded(false), 1400);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 6) * 0.05 }}
      className="card-surface group relative overflow-hidden p-5 transition hover:-translate-y-1 hover:border-primary/40"
    >
      <div className="relative grid h-36 place-items-center overflow-hidden rounded-xl bg-gradient-to-br from-primary/15 via-leaf/10 to-transparent">
        <span className="text-6xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
          {product.emoji}
        </span>
        <span className="absolute right-3 top-3 chip">
          {product.category}
        </span>
      </div>
      <div className="mt-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="font-display text-lg font-semibold leading-tight">{product.name}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{product.tagline}</p>
        </div>
        <div className="shrink-0 text-right">
          <p className="font-mono text-lg font-bold text-primary">₹{product.price}</p>
          <p className="text-[11px] text-muted-foreground">/ {product.unit}</p>
        </div>
      </div>

      {(product.weather || product.soil) && (
        <dl className="mt-4 grid grid-cols-2 gap-1.5 rounded-lg border border-black/5 bg-black/10 p-3 text-[11px]">
          {product.weather && <Row k="Weather" v={product.weather} />}
          {product.soil && <Row k="Soil" v={product.soil} />}
          {product.water && <Row k="Water" v={product.water} />}
          {product.season && <Row k="Season" v={product.season} />}
        </dl>
      )}

      <p className="mt-3 text-xs text-muted-foreground line-clamp-2">{product.benefits}</p>

      <button
        onClick={onAdd}
        className={`mt-4 flex w-full items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition ${
          added
            ? "bg-leaf text-primary-foreground"
            : "bg-primary text-primary-foreground hover:brightness-110"
        }`}
      >
        {added ? <><Check className="h-4 w-4" /> Added</> : <><Plus className="h-4 w-4" /> Add to cart</>}
      </button>
    </motion.article>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="font-mono uppercase tracking-wider text-muted-foreground">{k}</span>
      <span className="truncate text-foreground/90">{v}</span>
    </div>
  );
}
