import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { SiteLayout } from "@/components/site-layout";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — PrintLab by CapyMaki" },
      { name: "description", content: "Get in touch with the PrintLab. Email, location, and lab hours." },
      { property: "og:title", content: "Contact — PrintLab" },
      { property: "og:description", content: "One operator, one inbox. Reply within a day." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <SiteLayout>
      <section className="relative overflow-hidden border-b border-border">
        <div className="bg-grid bg-grid-fade pointer-events-none absolute inset-0 opacity-50" />
        <div className="relative mx-auto max-w-5xl px-5 pt-16 pb-10 md:pt-24">
          <SectionLabel code="03" label="Contact" />
          <h1 className="mt-6 font-display text-5xl leading-[0.95] md:text-7xl">
            One inbox.<br /><span className="italic text-primary">No bots.</span>
          </h1>
          <p className="mt-5 max-w-xl text-muted-foreground">
            For new prints, the request form is fastest. For everything else — collaborations, questions, weird ideas — reach out below.
          </p>
        </div>
      </section>

      <section className="relative">
        <div className="mx-auto max-w-5xl px-5 py-16">
          <div className="grid gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-2">
            {CHANNELS.map((c, i) => (
              <motion.a
                key={c.label}
                href={c.href} target={c.external ? "_blank" : undefined} rel={c.external ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group relative overflow-hidden bg-background p-8 transition-colors hover:bg-surface"
              >
                <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-subtle">
                  <span>{c.code}</span>
                  <i className="ti ti-arrow-up-right text-lg text-subtle transition-all group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
                <div className="mt-8 font-display text-2xl">{c.label}</div>
                <div className="mt-1 font-mono text-sm text-primary">{c.value}</div>
                <div className="mt-3 text-sm text-muted-foreground">{c.desc}</div>
              </motion.a>
            ))}
          </div>
          <p className="mt-4 font-mono text-xs text-subtle">
            ↑ Edit <span className="text-foreground">src/routes/contact.tsx</span> → <span className="text-foreground">CHANNELS</span> with your real contact info.
          </p>
        </div>
      </section>

      {/* INFO STRIP */}
      <section className="relative border-y border-border bg-surface/30">
        <div className="mx-auto grid max-w-5xl gap-px overflow-hidden bg-border md:grid-cols-3">
          {INFO.map((i) => (
            <div key={i.label} className="bg-surface/30 p-8">
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-subtle">{i.label}</div>
              <div className="mt-3 font-display text-xl">{i.value}</div>
              <div className="mt-1 text-sm text-muted-foreground">{i.note}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative">
        <div className="mx-auto max-w-5xl px-5 py-20 text-center">
          <h2 className="mx-auto max-w-2xl font-display text-4xl leading-tight md:text-6xl">
            Skip the email — <span className="italic text-primary">use the form.</span>
          </h2>
          <p className="mt-4 text-muted-foreground">Faster for both of us when you've already got the idea.</p>
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

const CHANNELS = [
  { code: "/01", label: "Email", value: "hello@capymaki.com", desc: "Direct line. I read everything.", href: "mailto:hello@capymaki.com", external: false },
  { code: "/02", label: "Instagram", value: "@capymaki", desc: "Build photos and behind-the-scenes.", href: "https://instagram.com/", external: true },
  { code: "/03", label: "Local pickup", value: "Eindhoven, NL", desc: "Drop-off / pickup by appointment.", href: "mailto:hello@capymaki.com?subject=Pickup", external: false },
  { code: "/04", label: "Collabs & press", value: "press@capymaki.com", desc: "Features, interviews, side projects.", href: "mailto:press@capymaki.com", external: false },
];

const INFO = [
  { label: "Response time", value: "< 24 hours", note: "Usually same day. Slower on weekends." },
  { label: "Lab hours", value: "Mon – Sat", note: "Prints run overnight when needed." },
  { label: "Languages", value: "EN · NL", note: "Reply in whichever you prefer." },
];
