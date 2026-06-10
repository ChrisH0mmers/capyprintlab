import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { SiteLayout } from "@/components/site-layout";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — PrintLab by CapyMaki" },
      { name: "description", content: "Transparent, gram-based pricing for custom 3D prints." },
      { property: "og:title", content: "Pricing — PrintLab" },
      { property: "og:description", content: "Material × €0.05/g, starting at €0.75. No hidden fees." },
    ],
  }),
  component: PricingPage,
});

function PricingPage() {
  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="bg-grid bg-grid-fade pointer-events-none absolute inset-0 opacity-50" />
        <div className="relative mx-auto max-w-5xl px-5 pt-16 pb-10 md:pt-24">
          <SectionLabel code="02" label="Pricing" />
          <h1 className="mt-6 font-display text-5xl leading-[0.95] md:text-7xl">
            Priced by the <span className="italic text-primary">gram.</span>
          </h1>
          <p className="mt-5 max-w-xl text-muted-foreground">
            Material is the main cost. No design fees on simple parts, no setup nonsense, no subscription.
          </p>
        </div>
      </section>

      {/* FORMULA CARD */}
      <section className="relative border-b border-border">
        <div className="mx-auto max-w-5xl px-5 py-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl border border-border bg-surface/50 p-8 md:p-12"
          >
            <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-primary/15 blur-3xl" />
            <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-subtle">The formula</div>
            <div className="mt-6 flex flex-wrap items-baseline gap-x-4 gap-y-2 font-display text-4xl md:text-6xl">
              <span>price</span>
              <span className="text-subtle">=</span>
              <span className="italic text-primary">grams</span>
              <span className="text-subtle">×</span>
              <span>€0.05</span>
            </div>
            <div className="mt-4 font-mono text-sm text-muted-foreground">
              Minimum order <span className="text-foreground">€0.75</span>. PETG / TPU add a per-job surcharge.
            </div>
          </motion.div>
        </div>
      </section>

      {/* TABLE — placeholder for user's own copy */}
      <section className="relative border-b border-border">
        <div className="mx-auto max-w-5xl px-5 py-16">
          <SectionLabel code="02·a" label="Materials & rates" />
          <h2 className="mt-4 font-display text-3xl md:text-4xl">What costs what.</h2>

          <div className="mt-8 overflow-hidden rounded-2xl border border-border">
            {ROWS.map((r, i) => (
              <div
                key={r.name}
                className={`grid grid-cols-12 items-center gap-3 px-5 py-4 text-sm ${
                  i % 2 === 0 ? "bg-surface/40" : "bg-background"
                } ${i !== ROWS.length - 1 ? "border-b border-border" : ""}`}
              >
                <div className="col-span-4 font-medium">{r.name}</div>
                <div className="col-span-5 text-muted-foreground">{r.note}</div>
                <div className="col-span-3 text-right font-mono text-foreground">{r.rate}</div>
              </div>
            ))}
          </div>
          <p className="mt-4 font-mono text-xs text-subtle">
            ↑ Edit <span className="text-foreground">src/routes/pricing.tsx</span> → <span className="text-foreground">ROWS</span> with your real numbers.
          </p>
        </div>
      </section>

      {/* EXAMPLES — placeholder */}
      <section className="relative border-b border-border">
        <div className="mx-auto max-w-5xl px-5 py-16">
          <SectionLabel code="02·b" label="Real examples" />
          <h2 className="mt-4 font-display text-3xl md:text-4xl">What real jobs cost.</h2>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {EXAMPLES.map((e, i) => (
              <motion.div
                key={e.title}
                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="rounded-2xl border border-border bg-surface/40 p-6"
              >
                <i className={`ti ${e.icon} text-2xl text-primary`} />
                <div className="mt-4 font-display text-xl">{e.title}</div>
                <div className="mt-1 text-xs text-muted-foreground">{e.detail}</div>
                <div className="mt-4 flex items-baseline justify-between border-t border-border pt-4">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-subtle">{e.weight}</span>
                  <span className="font-display text-2xl">{e.price}</span>
                </div>
              </motion.div>
            ))}
          </div>
          <p className="mt-4 font-mono text-xs text-subtle">
            ↑ Edit <span className="text-foreground">EXAMPLES</span> with your own past jobs.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative border-b border-border">
        <div className="mx-auto max-w-5xl px-5 py-16">
          <SectionLabel code="02·c" label="Common questions" />
          <h2 className="mt-4 font-display text-3xl md:text-4xl">The fine print.</h2>
          <div className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2">
            {FAQ.map((q) => (
              <div key={q.q} className="bg-background p-6">
                <div className="font-display text-xl">{q.q}</div>
                <p className="mt-2 text-sm text-muted-foreground">{q.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative">
        <div className="mx-auto max-w-5xl px-5 py-20 text-center">
          <h2 className="mx-auto max-w-2xl font-display text-4xl leading-tight md:text-6xl">
            Ready to <span className="italic text-primary">price your part?</span>
          </h2>
          <p className="mt-4 text-muted-foreground">Send the idea, I'll quote it back.</p>
          <Link
            to="/request"
            className="beam-wrap mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 font-medium text-primary-foreground cta-glow"
          >
            Start a request <i className="ti ti-arrow-up-right text-lg" />
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}

function SectionLabel({ code, label }: { code: string; label: string }) {
  return (
    <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-subtle">
      <span className="text-primary">§{code}</span>
      <span className="h-px w-6 bg-border-strong" />
      <span>{label}</span>
    </div>
  );
}

/* ──────── PLACEHOLDER COPY — edit these ──────── */

const ROWS = [
  { name: "PLA", note: "Standard, most colors in stock.", rate: "€0.05 / g" },
  { name: "PETG", note: "Stronger, heat-resistant. Not in stock.", rate: "€0.08 / g + setup" },
  { name: "TPU", note: "Flexible, rubber-like. Not in stock.", rate: "€0.10 / g + setup" },
  { name: "Minimum order", note: "Any job under 15g.", rate: "€0.75" },
  { name: "Rush turnaround", note: "Same-week priority slot.", rate: "+25%" },
  { name: "Custom design", note: "Modeling from scratch (per hour).", rate: "Ask first" },
];

const EXAMPLES = [
  { icon: "ti-device-mobile", title: "Phone stand", detail: "Adjustable angle, PLA, white.", weight: "~32 g", price: "€1.60" },
  { icon: "ti-puzzle", title: "Knex connector pack", detail: "Set of 12 replacement pieces.", weight: "~18 g", price: "€0.90" },
  { icon: "ti-rocket", title: "Model rocket nose cone", detail: "Scale model, PETG, red.", weight: "~74 g", price: "€5.92" },
];

const FAQ = [
  { q: "Do you ship?", a: "Local pickup in Eindhoven is free. Shipping is added at cost, no markup." },
  { q: "What's the lead time?", a: "Usually 2–5 days from confirmation. Rush slots available." },
  { q: "Can I bring my own .STL?", a: "Yes — send it with the request, or link to it. Anything sliceable works." },
  { q: "Big or batch orders?", a: "Discount kicks in over ~500g or 20+ identical parts. Ask in the request." },
];
