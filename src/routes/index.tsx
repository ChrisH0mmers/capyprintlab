import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, type FormEvent } from "react";
import { motion, AnimatePresence, LayoutGroup } from "motion/react";
import { toast, Toaster } from "sonner";

export const Route = createFileRoute("/")({
  component: PrintLab,
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
  { id: "PETG", name: "PETG", desc: "Stronger · heat-resistant (not in stock — extra costs apply)" },
  { id: "TPU", name: "TPU", desc: "Flexible · rubber-like (not in stock — extra costs apply)" },
  { id: "Not sure", name: "Not sure", desc: "I'll recommend one for you" },
];

const colors = [
  { name: "White", hex: "#ffffff", ring: true },
  { name: "Black", hex: "#1a1a18" },
  { name: "Grey", hex: "#8a8a86" },
  { name: "Red", hex: "#d83030" },
  { name: "Orange", hex: "#ef7a2a" },
  { name: "Yellow", hex: "#f3c52a" },
  { name: "Green", hex: "#1D9E75" },
  { name: "Blue", hex: "#2a6cef" },
  { name: "Purple", hex: "#7a3aef" },
  { name: "Pink", hex: "#ef58a8" },
];

function PrintLab() {
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
        toast.success("Request sent! I'll be in touch soon.");
        setItem(""); setDesc(""); setName("");
      } else {
        toast.error("Something went wrong — try again.");
      }
    } catch {
      toast.error("Network error — try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto min-h-screen max-w-[620px] bg-background">
      <Toaster position="bottom-center" theme="system" richColors />

      {/* HERO */}
      <header className="relative overflow-hidden border-b border-border px-6 pb-8 pt-10">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-70" />
        <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-primary/15 blur-3xl" />

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border-strong bg-background px-3 py-1 font-mono text-[11px] tracking-widest text-muted-foreground">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            PRINTER ONLINE — Flashforge Adventurer 5M
          </div>

          <h1 className="font-mono text-[clamp(28px,7vw,38px)] font-bold leading-[1.1]">
            PrintLab<br />
            <span className="text-primary">by CapyMaki</span>
          </h1>

          <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
            Got an idea? I'll make it real. Request a custom 3D print below.
            Pricing is <span className="text-foreground">(grams × €0.05)</span> with a starting price of <span className="text-foreground">€0.75</span>.
          </p>
        </motion.div>
      </header>

      <form onSubmit={handleSubmit}>
        {/* HOBBIES */}
        <LayoutGroup>
          <div className="no-scrollbar flex gap-2 overflow-x-auto border-b border-border px-6 py-4">
            {hobbies.map((h) => {
              const active = hobby === h.key;
              return (
                <button
                  key={h.key}
                  type="button"
                  onClick={() => setHobby(h.key)}
                  className="relative flex flex-shrink-0 items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[13px] transition-colors"
                >
                  {active && (
                    <motion.span
                      layoutId="hobbyPill"
                      className="absolute inset-0 rounded-full border border-primary bg-primary-soft"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  {!active && (
                    <span className="absolute inset-0 rounded-full border border-border" />
                  )}
                  <i className={`ti ${h.icon} relative text-[15px] ${active ? "text-primary-dark" : "text-muted-foreground"}`} />
                  <span className={`relative whitespace-nowrap ${active ? "font-medium text-primary-darker" : "text-muted-foreground"}`}>
                    {h.label}
                  </span>
                </button>
              );
            })}
          </div>
        </LayoutGroup>

        {/* CATEGORY PREVIEW */}
        <section className="px-6 pt-6">
          <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-subtle">
            Selected category
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={hobby}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.18 }}
              className="mt-3 flex items-center gap-3 rounded-[10px] border border-border bg-surface px-4 py-3 text-[13px] text-muted-foreground"
            >
              <i className={`ti ${currentHobby.icon} text-lg text-primary`} />
              <span>
                <strong className="font-medium text-foreground">{currentHobby.label}</strong> — {currentHobby.desc}
              </span>
            </motion.div>
          </AnimatePresence>
        </section>

        {/* MATERIAL */}
        <section className="px-6 pt-6">
          <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-subtle">
            Material
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {materials.map((m) => {
              const active = material === m.id;
              return (
                <motion.button
                  key={m.id}
                  type="button"
                  onClick={() => setMaterial(m.id)}
                  whileTap={{ scale: 0.97 }}
                  className={`rounded-[10px] border px-3 py-2.5 text-left transition-colors ${
                    active
                      ? "border-[1.5px] border-primary bg-primary-soft"
                      : "border-border hover:border-border-strong"
                  }`}
                >
                  <div className={`text-[13px] font-medium ${active ? "text-primary-darker" : "text-foreground"}`}>
                    {m.name}
                  </div>
                  <div className={`mt-0.5 text-[11px] leading-snug ${active ? "text-primary-dark" : "text-subtle"}`}>
                    {m.desc}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </section>

        {/* COLOR */}
        <section className="px-6 pt-6">
          <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-subtle">
            Color preference
          </div>
          <p className="mt-1.5 text-[12px] text-subtle">
            Available options below — other colors may be available on request.
          </p>
          <div className="mt-3 flex flex-wrap gap-2.5">
            {colors.map((c) => {
              const active = color === c.name;
              return (
                <button
                  key={c.name}
                  type="button"
                  aria-label={c.name}
                  title={c.name}
                  onClick={() => setColor(c.name)}
                  className="group relative h-9 w-9 rounded-full transition-transform hover:scale-110"
                  style={{ background: c.hex, boxShadow: c.ring ? "inset 0 0 0 1px var(--color-border)" : undefined }}
                >
                  <AnimatePresence>
                    {active && (
                      <motion.span
                        initial={{ scale: 0.6, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.6, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 500, damping: 24 }}
                        className="absolute -inset-1.5 rounded-full ring-2 ring-foreground"
                      />
                    )}
                  </AnimatePresence>
                </button>
              );
            })}
          </div>
          <div className="mt-3 font-mono text-[11px] text-subtle">→ {color}</div>
        </section>

        <hr className="my-6 border-border" />

        {/* TEXT INPUTS */}
        <section className="space-y-5 px-6">
          <Field label="What do you want printed?" required>
            <input
              ref={itemRef}
              type="text"
              value={item}
              onChange={(e) => { setItem(e.target.value); if (itemError) setItemError(false); }}
              placeholder="e.g. a phone stand for my desk"
              className={fieldClass(itemError)}
            />
          </Field>

          <Field label="Description & dimensions">
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Approx size, reference links, special requests…"
              className={`${fieldClass(false)} min-h-[100px] resize-y`}
            />
          </Field>

          <Field label="Your name and/or email">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="So I can reach you back"
              className={fieldClass(false)}
            />
          </Field>
        </section>

        {/* SUBMIT */}
        <div className="px-6 pb-10 pt-6">
          <motion.button
            type="submit"
            disabled={loading}
            whileTap={{ scale: 0.98 }}
            className={`flex w-full items-center justify-center gap-2 rounded-[10px] px-4 py-3.5 text-[15px] font-medium text-primary-foreground transition-colors disabled:cursor-not-allowed disabled:opacity-70 ${
              loading ? "shimmer" : "bg-primary-dark hover:bg-primary-darker"
            }`}
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
              </>
            )}
          </motion.button>
          <div className="mt-3 flex items-center justify-center gap-1.5 text-[12px] text-subtle">
            <i className="ti ti-lock text-[14px]" />
            Sent directly — nothing is stored
          </div>
        </div>
      </form>
    </main>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[13px] font-medium text-muted-foreground">
        {label} {required && <span className="text-danger">*</span>}
      </span>
      {children}
    </label>
  );
}

function fieldClass(error: boolean) {
  return [
    "w-full rounded-[10px] border bg-background px-3 py-2.5 text-[14px] outline-none transition",
    "placeholder:text-subtle",
    error
      ? "border-danger ring-2 ring-danger/15"
      : "border-border focus:border-primary focus:ring-2 focus:ring-primary/15",
  ].join(" ");
}
