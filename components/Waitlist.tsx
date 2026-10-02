"use client";

import { AnimatePresence, motion } from "framer-motion";
import { createContext, useCallback, useContext, useEffect, useState } from "react";

async function postLead(f: FormData) {
  const endpoint = process.env.NEXT_PUBLIC_WAITLIST_ENDPOINT;
  if (!endpoint) throw new Error("The list isn't open yet. Please check back soon.");
  const accessKey = process.env.NEXT_PUBLIC_WAITLIST_KEY; // optional (Web3Forms-style)
  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify({
      ...(accessKey ? { access_key: accessKey, subject: "Montaa waitlist signup" } : {}),
      email: f.get("email"),
      name: f.get("name"),
      role: f.get("role"),
      useCase: f.get("useCase"),
    }),
  });
  if (!res.ok) throw new Error("Something went wrong. Please try again.");
}

const ROLES = [
  "Founder raising a round",
  "M&A / corp-dev advisor",
  "VC / PE deal team",
  "Strategy consultant",
  "Negotiation / deal lawyer",
  "Executive",
  "Other",
];

const Ctx = createContext<() => void>(() => {});
export const useWaitlist = () => useContext(Ctx);

export function WaitlistProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState("");
  const show = useCallback(() => setOpen(true), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setStatus("sending");
    setError("");
    try {
      await postLead(f);
      setStatus("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("idle");
    }
  }

  const field =
    "w-full border border-line-strong bg-ink px-3 py-3 text-sm text-bone placeholder:text-fog/60 outline-none focus:border-signal";

  return (
    <Ctx.Provider value={show}>
      {children}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(e) => e.target === e.currentTarget && setOpen(false)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Join the design-partner list"
              className="brackets w-full max-w-md border border-line-strong bg-panel p-7"
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 8, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-start justify-between">
                <p className="label text-signal">// Design partners</p>
                <button onClick={() => setOpen(false)} aria-label="Close" className="label text-fog hover:text-bone">
                  Esc ✕
                </button>
              </div>
              {status === "done" ? (
                <div className="py-8">
                  <h3 className="text-2xl font-semibold tracking-tight">You&apos;re on the list.</h3>
                  <p className="mt-3 text-sm leading-relaxed text-fog">
                    We&apos;ll reach out as soon as Montaa opens to its first users.
                  </p>
                  <button onClick={() => { setOpen(false); setStatus("idle"); }} className="label mt-6 border border-line-strong px-4 py-3 hover:border-signal hover:text-signal">
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={submit} className="mt-5 space-y-3">
                  <h3 className="text-2xl font-semibold tracking-tight">Join the design-partner list.</h3>
                  <p className="pb-2 text-sm leading-relaxed text-fog">
                    Montaa is in development. We&apos;re inviting a small group of founders, deal teams and advisors to shape it and get first access.
                  </p>
                  <input name="email" type="email" required autoFocus placeholder="Work email" className={field} />
                  <input name="name" type="text" placeholder="Name (optional)" className={field} />
                  <select name="role" defaultValue="" className={field} aria-label="Your role (optional)">
                    <option value="">Your role (optional)</option>
                    {ROLES.map((r) => <option key={r}>{r}</option>)}
                  </select>
                  <input name="useCase" type="text" placeholder="What decision are you facing? (optional)" className={field} />
                  {error && <p className="text-sm text-alert">{error}</p>}
                  <button
                    disabled={status === "sending"}
                    className="label w-full bg-signal px-4 py-4 font-semibold text-black transition hover:-translate-y-0.5 hover:bg-white disabled:opacity-60"
                  >
                    {status === "sending" ? "Submitting…" : "Join the list →"}
                  </button>
                  <p className="text-xs leading-relaxed text-fog">
                    Please don&apos;t include confidential deal details. We only collect what you enter here. Montaa is decision support, not financial or legal advice.
                  </p>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Ctx.Provider>
  );
}

export function CtaButton({ children, variant = "solid" }: { children: React.ReactNode; variant?: "solid" | "ghost" }) {
  const show = useWaitlist();
  const base = "label inline-flex items-center gap-2 px-5 py-4 transition hover:-translate-y-0.5";
  return (
    <button
      onClick={show}
      className={
        variant === "solid"
          ? `${base} bg-signal font-semibold text-black hover:bg-white`
          : `${base} border border-line-strong text-bone hover:border-signal hover:text-signal`
      }
    >
      {children}
    </button>
  );
}

export function InlineSignup() {
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState("");
  const field =
    "w-full border border-line-strong bg-ink px-3 py-4 text-sm text-bone placeholder:text-fog/60 outline-none focus:border-signal";

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    try {
      await postLead(new FormData(e.currentTarget));
      setStatus("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("idle");
    }
  }

  if (status === "done")
    return (
      <p className="brackets border border-line-strong bg-panel px-6 py-5 text-left text-bone">
        You&apos;re on the list. We&apos;ll be in touch as soon as Montaa opens to its first design partners.
      </p>
    );

  return (
    <form onSubmit={submit} className="mx-auto w-full max-w-xl text-left">
      <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
        <input name="email" type="email" required placeholder="Work email" aria-label="Work email" className={field} />
        <button
          disabled={status === "sending"}
          className="label bg-signal px-6 py-4 font-semibold text-black transition hover:-translate-y-0.5 hover:bg-white disabled:opacity-60"
        >
          {status === "sending" ? "Submitting…" : "Join the list →"}
        </button>
      </div>
      <select name="role" defaultValue="" className={`${field} mt-3`} aria-label="Your role (optional)">
        <option value="">Your role (optional)</option>
        {ROLES.map((r) => <option key={r}>{r}</option>)}
      </select>
      {error && <p className="mt-3 text-sm text-alert">{error}</p>}
    </form>
  );
}
