import Link from "next/link";

export const metadata = { title: "Terms — Montaa" };

export default function Terms() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-24 leading-relaxed text-fog">
      <Link href="/" className="label text-signal">← Montaa</Link>
      <h1 className="mt-8 text-4xl font-semibold tracking-tight text-bone">Terms of Use</h1>
      <p className="label mt-2">Draft · pre-launch</p>
      <div className="mt-8 space-y-5">
        <p>This site describes a product that is not yet available. Joining the waitlist does not create a contract or guarantee access.</p>
        <p>Illustrations, figures and outputs shown on this site are examples for explanation only, not real results.</p>
        <p>Montaa is intended as decision support. Its outputs are probabilistic and are not legal, financial or professional advice.</p>
        <p>This is a basic pre-launch draft and not a substitute for legal review.</p>
      </div>
    </main>
  );
}
