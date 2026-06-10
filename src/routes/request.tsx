import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, type FormEvent } from "react";
import { motion, AnimatePresence, LayoutGroup } from "motion/react";
import { toast, Toaster } from "sonner";
import { SiteLayout } from "@/components/site-layout";

export const Route = createFileRoute("/request")({
  head: () => ({
    meta: [
      { title: "Request a Print — PrintLab by CapyMaki" },
      { name: "description", content: "Send a custom 3D print request. Choose material, color, and tell me what you need." },
      { property: "og:title", content: "Request a Print — PrintLab" },
      { property: "og:description", content: "One form. One operator. Usually a reply within a day." },
    ],
  }),
  component: RequestPage,
});

const FORMSPREE_URL = "https://formspree.io/f/xvzygyoq";

type HobbyKey = "3d" | "knex" | "lego" | "space" | "roller";
const hobbies: { key: HobbyKey; label: string; icon: string; desc: string }[] = [
  { key: "3d", label: "3D Printing", icon: "ti-printer", desc: "custom parts, models, accessories" },
  { key: "knex", label: "Knex", icon: "ti-puzzle", desc: "connectors, custom pieces, adapters" },
  { key: "lego", label: "Lego", icon: "ti-building-castle", desc: "custom bricks, mounts, holders" },
  { key: "space", label: "Space", icon: "ti-rocket", desc: "rockets, satellites, scale models" },
  { key: "roller", label: "Roller Coaster", icon: "ti-building-carousel", desc: "track, train, small models" },
];

const materials = [
  { id: "PLA", name: "PLA", desc: "Standard · most colors available" },
  { id: "PETG", name: "PETG", desc: "Stronger · heat-resistant (not in stock — extra costs)" },
  { id: "TPU", name: "TPU", desc: "Flexible · rubber-like (not in stock — extra costs)" },
  { id: "Not sure", name: "Not sure", desc: "I'll recommend one for you" },
];

const colors = [
  { name: "White", hex: "#f5f4f0" },
  { name: "Black", hex: "#15140f" },
  { name: "Grey", hex: "#8a8a86" },
  { name: "Red", hex: "#d83030" },
  { name: "Orange", hex: "#ef7a2a" },
  { name: "Yellow", hex: "#f3c52a" },
  { name: "Green", hex: "#1D9E75" },
  { name: "Blue", hex: "#2a6cef" },
  { name: "Purple", hex: "#7a3aef" },
  { name: "Pink", hex: "#ef58a8" },
];

function RequestPage() {
  const [hobby, setHobby] = useState<HobbyKey>("3d");
  const [material, setMaterial] = useState("PLA");
  const [color, setColor] = useState("White");
  const [item, setItem] = useState("");
  const [desc, setDesc] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [itemError, setItemError] = useState(false);
  const itemRef = useRef<HTMLInputElement>(null);

  const currentHobby = hobbies.find((h) => h.key === hobby)!;
  const currentColor = colors.find((c) => c.name === color)!;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!item.trim()) {
      setItemError(true);
      itemRef.current?.focus();
      toast.error("Please describe what you want printed.");
      setTimeout(() => setItemError(false), 1500);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: name.trim() || "(not specified)",
          category: currentHobby.label,
          item: item.trim(),
          material,
          color,
          description: desc.trim() || "(no extra details)",
        }),
      });
      if (res.ok) {
        toast.success("Request sent — I'll reply by email.");
        setItem(""); setDesc(""); setName("");
      } else toast.error("Something went wrong — try again.");
    } catch {
      toast.error("Network error — try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <SiteLayout>
      <Toaster position="bottom-center" theme="dark" richColors />

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="bg-grid bg-grid-fade pointer-events-none absolute inset-0 opacity-50" />
        <div className="relative mx-auto max-w-3xl px-5 pt-16 pb-10 md:pt-24">
          <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-subtle">
            <span className="text-primary">§01</span><span className="h-px w-6 bg-border-strong" />
            <span>Build request</span>
          </div>
          <h1 className="mt-6 font-display text-5xl leading-[0.95] md:text-7xl">
            Tell me what to <span className="italic text-primary">make.</span>
          </h1>
          <p className="mt-5 max-w-xl text-muted-foreground">
            Five quick choices and a short description. Goes straight to my inbox — no account, nothing stored on this site.
          </p>
        </div>
      </section>

      <form onSubmit={handleSubmit} className="mx-auto max-w-3xl px-5 pb-16 pt-12">
        {/* CATEGORY */}
        <Step n="01" title="Category">
          <LayoutGroup>
            <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1">
              {hobbies.map((h) => {
                const active = hobby === h.key;
                return (
                  <button
                    key={h.key} type="button" onClick={() => setHobby(h.key)}
                    className="relative flex flex-shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm transition-colors"
                  >
                    {active ? (
                      <motion.span layoutId="catpill" className="absolute inset-0 rounded-full bg-primary"
                        transition={{ type: "spring", stiffness: 400, damping: 32 }} />
                    ) : (
                      <span className="absolute inset-0 rounded-full border border-border" />
                    )}
                    <i className={`ti ${h.icon} relative text-[15px] ${active ? "text-primary-foreground" : "text-muted-foreground"}`} />
                    <span className={`relative whitespace-nowrap ${active ? "font-medium text-primary-foreground" : "text-muted-foreground"}`}>
                      {h.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </LayoutGroup>
          <AnimatePresence mode="wait">
            <motion.div
              key={hobby}
              initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.18 }}
              className="mt-4 flex items-center gap-3 rounded-xl border border-border bg-surface/60 px-4 py-3 text-sm text-muted-foreground"
            >
              <i className={`ti ${currentHobby.icon} text-lg text-primary`} />
              <span><strong className="font-medium text-foreground">{currentHobby.label}</strong> — {currentHobby.desc}</span>
            </motion.div>
          </AnimatePresence>
        </Step>

        {/* MATERIAL */}
        <Step n="02" title="Material">
          <div className="grid grid-cols-2 gap-3">
            {materials.map((m) => {
              const active = material === m.id;
              return (
                <motion.button
                  key={m.id} type="button" onClick={() => setMaterial(m.id)} whileTap={{ scale: 0.98 }}
                  className={`rounded-xl border px-4 py-3 text-left transition-colors ${
                    active ? "border-primary bg-primary-soft/60" : "border-border bg-surface/40 hover:bg-surface"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-sm font-medium ${active ? "text-foreground" : "text-foreground"}`}>{m.name}</span>
                    {active && (
                      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        <i className="ti ti-check text-[10px]" />
                      </span>
                    )}
                  </div>
                  <div className={`mt-1 text-[11px] leading-snug ${active ? "text-foreground/70" : "text-subtle"}`}>{m.desc}</div>
                </motion.button>
              );
            })}
          </div>
        </Step>

        {/* COLOR */}
        <Step n="03" title="Color">
          <div className="flex flex-wrap items-center gap-3">
            {colors.map((c) => {
              const active = color === c.name;
              return (
                <button
                  key={c.name} type="button" aria-label={c.name} title={c.name}
                  onClick={() => setColor(c.name)}
                  className="relative h-10 w-10 rounded-full transition-transform hover:scale-110"
                  style={{ background: c.hex, boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08)" }}
                >
                  <AnimatePresence>
                    {active && (
                      <motion.span
                        initial={{ scale: 0.6, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.6, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 500, damping: 24 }}
                        className="absolute -inset-1.5 rounded-full ring-2 ring-primary"
                      />
                    )}
                  </AnimatePresence>
                </button>
              );
            })}
          </div>
          <div className="mt-4 flex items-center gap-2 font-mono text-xs text-subtle">
            <span className="h-3 w-3 rounded-sm" style={{ background: currentColor.hex }} />
            → {color}
            <span className="text-subtle/60">· other colors may be available on request</span>
          </div>
        </Step>

        {/* DETAILS */}
        <Step n="04" title="Details">
          <div className="space-y-5">
            <Field label="What do you want printed?" required>
              <input
                ref={itemRef} type="text" value={item}
                onChange={(e) => { setItem(e.target.value); if (itemError) setItemError(false); }}
                placeholder="e.g. a phone stand for my desk"
                className={fieldClass(itemError)}
              />
            </Field>
            <Field label="Description & dimensions">
              <textarea
                value={desc} onChange={(e) => setDesc(e.target.value)}
                placeholder="Approx size, reference links, special requests…"
                className={`${fieldClass(false)} min-h-[120px] resize-y`}
              />
            </Field>
            <Field label="Your name and/or email">
              <input
                type="text" value={name} onChange={(e) => setName(e.target.value)}
                placeholder="So I can reach you back"
                className={fieldClass(false)}
              />
            </Field>
          </div>
        </Step>

        {/* SUBMIT */}
        <div className="mt-10 rounded-2xl border border-border bg-surface/40 p-5">
          <motion.button
            type="submit" disabled={loading} whileTap={{ scale: 0.98 }}
            className="beam-wrap flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-4 font-medium text-primary-foreground cta-glow disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? (
              <>
                <i className="ti ti-loader-2 inline-block" style={{ animation: "spin-slow 1s linear infinite" }} />
                Sending…
              </>
            ) : (
              <>
                <i className="ti ti-send" />
                Send request
                <i className="ti ti-arrow-right ml-1" />
              </>
            )}
          </motion.button>
          <div className="mt-3 flex items-center justify-center gap-2 text-[12px] text-subtle">
            <i className="ti ti-lock text-[14px]" />
            Sent directly via email — nothing is stored on this site.
          </div>
        </div>
      </form>
    </SiteLayout>
  );
}

function Step({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <div className="mb-4 flex items-baseline gap-3">
        <span className="font-mono text-[11px] tracking-[0.25em] text-primary">§{n}</span>
        <span className="h-px w-6 bg-border-strong" />
        <h2 className="font-display text-2xl">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-subtle">
        {label} {required && <span className="text-primary">*</span>}
      </span>
      {children}
    </label>
  );
}

function fieldClass(error: boolean) {
  return [
    "w-full rounded-xl border bg-surface/50 px-4 py-3 text-[14px] text-foreground outline-none transition",
    "placeholder:text-subtle",
    error
      ? "border-danger ring-2 ring-danger/20"
      : "border-border focus:border-primary focus:ring-2 focus:ring-primary/20",
  ].join(" ");
}
