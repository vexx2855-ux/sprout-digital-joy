import { Link } from "@tanstack/react-router";
import { Leaf, Github, Instagram, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-32 border-t border-white/5 bg-background/60">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary/15 ring-1 ring-primary/40">
                <Leaf className="h-5 w-5 text-primary" />
              </span>
              <span className="font-display text-lg font-bold">seedify<span className="text-primary">.</span></span>
            </div>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              A student innovation turning fruit-market waste into seeds, saplings,
              compost and fair income for Indian farmers.
            </p>
            <div className="mt-5 flex gap-2">
              {[Instagram, Github, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/5 text-muted-foreground hover:text-primary hover:border-primary/40 transition"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Explore</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link to="/marketplace" className="hover:text-primary">Marketplace</Link></li>
              <li><Link to="/smart-farming" className="hover:text-primary">Smart Farming</Link></li>
              <li><Link to="/organic-manure" className="hover:text-primary">Organic Manure</Link></li>
              <li><Link to="/products" className="hover:text-primary">Products</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Project</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-primary">About</Link></li>
              <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
              <li><Link to="/cart" className="hover:text-primary">Cart</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-white/5 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Seedify. A Class 10 student initiative.</p>
          <p className="font-mono">Made with 🌱 in India</p>
        </div>
      </div>
    </footer>
  );
}
