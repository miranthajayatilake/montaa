import Link from "next/link";

export const metadata = { title: "Privacy — Montaa" };

export default function Privacy() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-24 leading-relaxed text-fog">
      <Link href="/" className="label text-signal">← Montaa</Link>
      <h1 className="mt-8 text-4xl font-semibold tracking-tight text-bone">Privacy Policy</h1>
      <p className="label mt-2">Draft · pre-launch</p>
      <div className="mt-8 space-y-5">
        <p>Montaa&apos;s waitlist collects the information you submit: your email address and, optionally, your name, your role and a short description of the decision you&apos;re facing.</p>
        <p>We use it only to contact you about Montaa&apos;s early access and to understand which decision use cases matter most. We do not sell your information.</p>
        <p>Submissions are received and stored on our behalf by Formspree, a third-party form-handling provider. You can ask us to delete your entry at any time by replying to any email we send you.</p>
        <p>This form does not ask for deal details. Please don&apos;t include confidential or non-public deal information in it. How Montaa will handle the details of a decision you enter into the product will be spelled out here, before the product accepts any.</p>
        <p>This is a basic pre-launch draft and not a substitute for legal review. It will be replaced before the product handles any additional personal or commercial data.</p>
      </div>
    </main>
  );
}
