import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { SiteLayout } from "@/components/site-layout";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PrintLab by CapyMaki — Custom 3D Prints, Made With Care" },
      { name: "description", content: "A one-person 3D printing lab. Custom parts, models, and accessories printed on a Flashforge Adventurer 5M." },
      { property: "og:title", content: "PrintLab by CapyMaki" },
      { property: "og:description", content: "Custom 3D prints, made one at a time." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <SiteLayout>
      <Hero />
      <Marquee />
      <Specs />
      <Process />
      <Categories />
      <ClosingCTA />
    </SiteLayout>
  );
}

/* ──────────────────────────── HERO ──────────────────────────── */
function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="bg-grid bg-grid-fade pointer-events-none absolute inset-0 opacity-60" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[800px] -translate-x-1/2 rounded-full bg-primary/15 blur-[120px]" />

      <div className="relative mx-auto max-w-6xl px-5 pt-16 pb-20 md:pt-28 md:pb-32">
        {/* status row */}
        <motion.div
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-widest text-subtle"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            <span className="text-foreground">Printer Online</span>
            <span className="text-subtle">/ Adventurer 5M</span>
          </span>
          <span className="hidden md:inline">— Oss, NL</span>
        </motion.div>

        {/* wordmark */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="mt-8 text-balance font-display text-[clamp(56px,13vw,180px)] font-normal leading-[0.92] tracking-tight"
        >
          Custom 3D<br />
          prints, made<br />
          <span className="italic text-primary">one at a time.</span>
        </motion.h1>

        <div className="mt-10 grid gap-8 md:grid-cols-12">
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.6 }}
            className="text-pretty text-base text-muted-foreground md:col-span-7 md:text-lg"
          >
            PrintLab is a one-person workshop. You send the idea, I print it
            carefully on a single machine. Parts, models, accessories, other stuff. If it
            can be sliced, it can probably be made.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-wrap items-center gap-3 md:col-span-5 md:justify-end"
          >
            <Link
              to="/request"
              className="beam-wrap group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground cta-glow transition-transform hover:-translate-y-0.5"
            >
              Start a request
              <i className="ti ti-arrow-up-right text-lg transition-transform group-hover:rotate-45" />
            </Link>
            <Link
              to="/pricing"
              className="inline-flex items-center gap-2 rounded-full border border-border-strong px-6 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
            >
              See pricing
            </Link>
          </motion.div>
        </div>

        {/* serial markers */}
        <div className="mt-16 flex items-end justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-subtle">
          <span>PL—001 / Hero</span>
          <motion.span
            animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2.4, repeat: Infinity }}
          >▼ scroll</motion.span>
          <span>v. 2026</span>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────── MARQUEE ──────────────────────────── */
function Marquee() {
  const items = ["PLA", "PETG", "TPU", "Custom Parts", "Lego compatible", "Knex pieces", "Cosplay props", "Replacement bits", "Prototypes", "Scale models", "Rocket fins", "Roller coaster track"];
  return (
    <section className="relative overflow-hidden border-b border-border bg-surface/40 py-5">
      <div className="flex whitespace-nowrap animate-marquee">
        {[...items, ...items].map((label, i) => (
          <span key={i} className="mx-6 inline-flex items-center gap-6 font-mono text-[13px] uppercase tracking-[0.2em] text-muted-foreground">
            {label}
            <span className="h-1 w-1 rounded-full bg-primary/70" />
          </span>
        ))}
      </div>
    </section>
  );
}

/* ──────────────────────────── SPECS ──────────────────────────── */
function Specs() {
  const cards = [
    { code: "/01", title: "One printer, full focus", body: "Flashforge Adventurer 5M, dialed in. Every job gets the same operator from request to handoff.", icon: "ti-focus-2" },
    { code: "/02", title: "Honest, gram-based pricing", body: "Material × €0.05/g, minimum €0.75. No design fees on simple jobs. See the pricing page for the rest.", icon: "ti-coin-euro" },
    { code: "/03", title: "PLA, PETG, TPU", body: "PLA in stock in most colors. PETG and TPU available on request — extra cost, longer lead time.", icon: "ti-flask-2" },
    { code: "/04", title: "No data stored", body: "Requests go straight to email. No accounts, no tracking, no resold contact data.", icon: "ti-lock" },
  ];
  return (
    <section className="relative border-b border-border">
      <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
        <SectionLabel code="02" label="What you get" />
        <h2 className="mt-4 max-w-2xl font-display text-4xl leading-tight md:text-5xl">
          A small lab that treats your<br className="hidden md:block" />
          <span className="italic text-primary"> idea like a real job.</span>
        </h2>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {cards.map((c, i) => (
            <motion.div
              key={c.code}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-surface/50 p-6 transition-colors hover:bg-surface"
            >
              <div className="flex items-center justify-between font-mono text-[11px] text-subtle">
                <span>{c.code}</span>
                <i className={`ti ${c.icon} text-base text-primary`} />
              </div>
              <h3 className="mt-6 font-display text-2xl">{c.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{c.body}</p>
              <div className="pointer-events-none absolute -bottom-12 -right-12 h-40 w-40 rounded-full bg-primary/10 opacity-0 blur-2xl transition-opacity group-hover:opacity-100" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────── PROCESS ──────────────────────────── */
function Process() {
  const steps = [
    { n: "01", t: "You send a request", d: "Describe the part. Reference photos, dimensions, deadline — whatever you have." },
    { n: "02", t: "I quote and confirm", d: "Short email back with material, color, est. weight, price, and ETA." },
    { n: "03", t: "Printed and checked", d: "Sliced, printed, post-processed. Photo before handoff so you know what you're getting." },
    { n: "04", t: "Pickup or shipped", d: "Local pickup in Eindhoven or shipped at cost. Whichever works for you." },
  ];
  return (
    <section className="relative border-b border-border bg-surface/30">
      <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
        <SectionLabel code="03" label="How it works" />
        <h2 className="mt-4 max-w-2xl font-display text-4xl leading-tight md:text-5xl">Four steps, no portal.</h2>

        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-4">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-background p-6"
            >
              <div className="font-mono text-[11px] text-subtle">STEP {s.n}</div>
              <div className="mt-6 font-display text-2xl">{s.t}</div>
              <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────── CATEGORIES ──────────────────────────── */
function Categories() {
  const cats = [
    { icon: "ti-printer", label: "3D Printing", desc: "Parts, models, accessories" },
    { icon: "ti-puzzle", label: "Knex", desc: "Connectors, adapters, fillers" },
    { icon: "ti-building-castle", label: "Lego", desc: "Custom bricks, mounts, holders" },
    { icon: "ti-rocket", label: "Space", desc: "Rockets, satellites, scale models" },
    { icon: "ti-building-carousel", label: "Roller Coaster", desc: "Track, train, small models" },
  ];
  return (
    <section className="relative border-b border-border">
      <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
        <SectionLabel code="04" label="Things people ask for" />
        <h2 className="mt-4 max-w-2xl font-display text-4xl leading-tight md:text-5xl">
          From "I lost the piece" to <span className="italic text-primary">"can you make this?"</span>
        </h2>

        <div className="mt-12 grid gap-3 md:grid-cols-3 lg:grid-cols-5">
          {cats.map((c, i) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group relative overflow-hidden rounded-xl border border-border bg-surface/40 p-5 transition-colors hover:border-border-strong hover:bg-surface"
            >
              <i className={`ti ${c.icon} text-2xl text-primary`} />
              <div className="mt-6 font-medium">{c.label}</div>
              <div className="mt-1 text-xs text-muted-foreground">{c.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────── CLOSING CTA ──────────────────────────── */
function ClosingCTA() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-grid bg-grid-fade opacity-50" />
      <div className="relative mx-auto max-w-6xl px-5 py-24 text-center md:py-36">
        <SectionLabel code="05" label="Your turn" centered />
        <h2 className="mx-auto mt-6 max-w-3xl text-balance font-display text-5xl leading-[0.95] md:text-7xl">
          Got an idea?<br />
          <span className="italic text-primary">I'll make it real.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-muted-foreground">
          One form. One operator. Usually a reply within a day.
        </p>
        <Link
          to="/request"
          className="beam-wrap group mt-10 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 font-medium text-primary-foreground cta-glow transition-transform hover:-translate-y-0.5"
        >
          Start a request
          <i className="ti ti-arrow-up-right text-lg transition-transform group-hover:rotate-45" />
        </Link>
      </div>
    </section>
  );
}

function SectionLabel({ code, label, centered }: { code: string; label: string; centered?: boolean }) {
  return (
    <div className={`flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-subtle ${centered ? "justify-center" : ""}`}>
      <span className="text-primary">§{code}</span>
      <span className="h-px w-6 bg-border-strong" />
      <span>{label}</span>
    </div>
  );
}
