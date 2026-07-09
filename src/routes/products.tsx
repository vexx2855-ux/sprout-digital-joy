import { createFileRoute } from "@tanstack/react-router";
import { PRODUCTS } from "@/lib/products";
import { ProductCard } from "@/components/site/ProductCard";
import { SectionHeading } from "@/components/site/SectionHeading";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Products — Agrivio" },
      { name: "description", content: "Sustainable, simple, rooted in tradition. Organic manure, neem cake, vermicompost and heritage products." },
      { property: "og:title", content: "Agrivio Products" },
      { property: "og:description", content: "Compost, neem cake, vermicompost and traditional wellness." },
    ],
  }),
  component: Products,
});

function Products() {
  const manure = PRODUCTS.filter((p) => p.category === "manure" || p.category === "wellness");
  return (
    <>
      <section className="mx-auto max-w-5xl px-4 pt-20 pb-10 text-center sm:px-6">
        <span className="chip">Our products</span>
        <h1 className="mt-6 font-display text-5xl font-bold tracking-tighter sm:text-7xl text-balance">
          Sustainable. Simple. <span className="text-shimmer">Rooted in tradition.</span>
        </h1>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {manure.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <SectionHeading
          eyebrow="Research notebook"
          title={<>Future scope.</>}
          description="We are studying low-cost soil sensors, seasonal seed kits and partnerships with local schools to scale composting clubs. Our research notebook grows with every season we plant."
        />
      </section>
    </>
  );
}
