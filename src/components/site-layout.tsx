import { Link, useRouterState } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { useState, type ReactNode } from "react";

const NAV = [
  { to: "/", label: "Lab", code: "00" },
  { to: "/request", label: "Request", code: "01" },
  { to: "/pricing", label: "Pricing", code: "02" },
  { to: "/contact", label: "Contact", code: "03" },
] as const;

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-background text-foreground">
      <div className="bg-noise pointer-events-none fixed inset-0 z-0" />
      <SiteNav />
      <main className="relative z-10">{children}</main>
      <SiteFooter />
    </div>
  );
}

function SiteNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5">
        <Link to="/" className="group flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span className="relative inline-flex h-7 w-7 items-center justify-center rounded-md border border-border-strong bg-surface">
            <span className="absolute inset-0 rounded-md bg-primary/20 opacity-0 transition-opacity group-hover:opacity-100" />
            <i className="ti ti-printer relative text-[15px] text-primary" />
          </span>
          <span className="font-mono text-[13px] tracking-tight">
            PrintLab<span className="text-subtle"> / </span><span className="text-muted-foreground">CapyMaki</span>
          </span>
        </Link>

        {/* desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => {
            const active = pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className="relative px-3 py-1.5 font-mono text-[12px] tracking-wide"
              >
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-md border border-border-strong bg-surface"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span className={`relative transition-colors ${active ? "text-foreground" : "text-subtle hover:text-foreground"}`}>
                  <span className="mr-1.5 text-primary/70">{item.code}</span>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* mobile toggle */}
        <button
          aria-label="Menu"
          onClick={() => setOpen((o) => !o)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border md:hidden"
        >
          <i className={`ti ${open ? "ti-x" : "ti-menu-2"} text-lg`} />
        </button>
      </div>

      {/* mobile sheet */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-border bg-background md:hidden"
          >
            <div className="flex flex-col px-5 py-3">
              {NAV.map((item) => {
                const active = pathname === item.to;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className={`flex items-center justify-between border-b border-border/60 py-3 font-mono text-sm ${
                      active ? "text-foreground" : "text-subtle"
                    }`}
                  >
                    <span>
                      <span className="mr-2 text-primary/70">{item.code}</span>
                      {item.label}
                    </span>
                    <i className="ti ti-arrow-up-right text-base text-subtle" />
                  </Link>
                );
              })}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="relative z-10 mt-20 border-t border-border">
      <div className="bg-grid bg-grid-fade pointer-events-none absolute inset-0 opacity-30" />
      <div className="relative mx-auto max-w-6xl px-5 py-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="font-display text-3xl leading-none">
              PrintLab<span className="text-primary">.</span>
            </div>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              Custom 3D prints made by hand in the lab. One printer, full attention, no nonsense.
            </p>
          </div>
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-subtle">Navigate</div>
            <ul className="mt-3 space-y-1.5 text-sm">
              {NAV.map((n) => (
                <li key={n.to}>
                  <Link to={n.to} className="text-muted-foreground transition-colors hover:text-foreground">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-subtle">Lab Status</div>
            <div className="mt-3 flex items-center gap-2 text-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              Printer online
            </div>
            <div className="mt-1 font-mono text-xs text-subtle">FLASHFORGE ADVENTURER 5M</div>
          </div>
        </div>

        <div className="filament mt-10" />
        <div className="mt-5 flex flex-col gap-2 text-xs text-subtle md:flex-row md:items-center md:justify-between">
          <div className="font-mono">© {new Date().getFullYear()} PRINTLAB · BUILD 0001</div>
          <div className="font-mono">CAPYMAKI · NL</div>
        </div>
      </div>
    </footer>
  );
}
