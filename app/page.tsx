import Link from "next/link";
import HeroCanvas from "@/components/HeroCanvas";
import { CtaButton, WaitlistProvider } from "@/components/Waitlist";
import { GainDynamics, HiddenPlayers, ParetoFrontier, RiskDistribution } from "@/components/Visuals";

const wrap = "mx-auto w-full max-w-[1280px] px-6 md:px-10";

function Mark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <path d="M4 26 L4 7 L16 20 L28 7 L28 26" fill="none" stroke="currentColor" strokeWidth="3" />
    </svg>
  );
}

function SectionTag({ n, children, dark = true }: { n: string; children: string; dark?: boolean }) {
  return (
    <p className={`label flex items-center gap-3 ${dark ? "text-signal" : "text-black"}`}>
      <span className={dark ? "text-fog" : "text-black/50"}>{n}</span>
      <span className={`h-px w-8 ${dark ? "bg-line-strong" : "bg-black/30"}`} />
      {children}
    </p>
  );
}

const capabilities = [
  {
    id: "gain",
    name: "Stakeholder dynamics",
    tag: "Who really wins when anyone moves.",
    body: "Big decisions are rarely two-sided. Montaa models every party's utility and maps how value flows between them as positions shift — so you see the decision as a system, not a standoff.",
    bullets: ["N-party payoff and utility modelling", "Coalition formation and defection analysis", "Stable-outcome detection via equilibrium search"],
    visual: <GainDynamics />,
  },
  {
    id: "tradeoffs",
    name: "Trade-off frontier",
    tag: "Every concession has a price. See it.",
    body: "Instead of one 'best' answer, Montaa charts the full frontier of achievable outcomes and shows what you give up — in gain, speed and durability — for each step along it.",
    bullets: ["Pareto-efficient option mapping", "Fairness-aware solutions (Nash, Kalai–Smorodinsky)", "Concession sequencing, not just end states"],
    visual: <ParetoFrontier />,
  },
  {
    id: "risk",
    name: "Risk assessment",
    tag: "Know the bad day before it arrives.",
    body: "Thousands of simulated futures turn gut-feel risk into a range of outcomes, not a single number. See the median, the tail, and which of your moves fatten or thin it.",
    bullets: ["Monte Carlo outcome distributions", "Tail-risk and walk-away (BATNA) stress tests", "Minimax-regret recommendations under uncertainty"],
    visual: <RiskDistribution />,
  },
  {
    id: "hidden",
    name: "Hidden actors",
    tag: "The party not at the table still votes.",
    body: "Boards, regulators, investors, rival bidders: influence that never appears on the invite. Montaa estimates how likely hidden actors are from observed behaviour and tests every scenario with and without them.",
    bullets: ["Bayesian belief updating on private information", "Latent-influence detection from observed moves", "Scenarios with and without the unseen actor"],
    visual: <HiddenPlayers />,
  },
];

const steps = [
  { n: "01", t: "Describe", d: "Write the decision in plain language: who is involved, what each party wants, the options on the table, what's at stake, what you already know." },
  { n: "02", t: "Model", d: "Montaa turns your brief into a formal game — players, information, preferences, moves, hidden unknowns — and lists every assumption it made so you can correct it." },
  { n: "03", t: "Simulate", d: "Tens of thousands of rollouts play out every branch across your uncertainty ranges — including counterparts who adapt, bluff, and misjudge." },
  { n: "04", t: "Decide", d: "Get the move that holds up best across scenarios, shown as ranges with the trade-offs, the risks, and what would change the answer." },
];

const methods = [
  { name: "Nash equilibrium", f: "uᵢ(sᵢ*, s₋ᵢ*) ≥ uᵢ(sᵢ, s₋ᵢ*)", d: "Find stable outcomes where no party gains by unilaterally changing course." },
  { name: "Bayesian Nash equilibrium", f: "σᵢ(θᵢ) ∈ argmax E[uᵢ | θᵢ]", d: "Reason about what others privately know, believe, and are hiding." },
  { name: "Subgame-perfect equilibrium", f: "backward induction on the move tree", d: "Discard empty threats; keep only commitments that stay credible at every stage." },
  { name: "Nash bargaining solution", f: "max Πᵢ (uᵢ − dᵢ)", d: "The principled split of surplus relative to each side's walk-away point." },
  { name: "Kalai–Smorodinsky solution", f: "uᵢ − dᵢ ∝ maxᵢ − dᵢ", d: "A fairness benchmark proportional to what each side could ideally achieve." },
  { name: "Shapley value", f: "φᵢ = Σ |S|!(n−|S|−1)!/n! · [v(S∪i) − v(S)]", d: "Attribute value to each party by their average marginal contribution to every coalition." },
  { name: "The Core", f: "Σᵢ∈S xᵢ ≥ v(S)  ∀ S ⊆ N", d: "Test whether any sub-group could profitably walk away and break the deal apart." },
  { name: "Monte Carlo simulation", f: "E[U] ≈ (1/N) Σₖ U(ωₖ)", d: "Sample thousands of futures to estimate expected value, variance and tail risk." },
  { name: "Monte Carlo tree search", f: "UCT = X̄ᵢ + c√(ln N / nᵢ)", d: "Efficiently explore deep move sequences, focusing compute where it matters." },
  { name: "Counterfactual regret minimization", f: "σ ← regret-matching(Rᵀ)", d: "Self-play to converge on robust strategies in games with hidden information." },
  { name: "Quantal response equilibrium", f: "P(a) ∝ exp(λ·u(a))", d: "Model real counterparts as noisy and boundedly rational, not perfect calculators." },
  { name: "Minimax regret", f: "min_a max_ω [ u*(ω) − u(a, ω) ]", d: "Choose the action you'll least regret across the scenarios you can't rule out." },
];

const uses = [
  ["Founders raising a round", "Lead and follow-on dynamics, terms versus dilution, and who signals whom."],
  ["M&A and corp-dev advisors", "Bidder behaviour, board and activist dynamics, and the sequencing of your next move."],
  ["VC and PE deal teams", "Competitive processes, syndicate dynamics and when to push or walk."],
  ["Strategy consultants", "Pressure-test a client's recommendation against how rivals and stakeholders will react."],
  ["Negotiation and deal lawyers", "Concession sequencing and walk-away points across several parties."],
  ["Executives facing a one-off bet", "An acquisition, a market entry or a pricing move where rivals and boards respond."],
];

export default function Home() {
  return (
    <WaitlistProvider>
      {/* NAV */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-ink/80 backdrop-blur-md">
        <div className={`${wrap} flex h-16 items-center justify-between`}>
          <Link href="/" className="flex items-center gap-3">
            <Mark className="h-5 w-5 text-signal" />
            <span className="label text-[0.8rem] font-semibold tracking-[0.3em] text-bone">MONTAA</span>
          </Link>
          <nav className="label hidden items-center gap-8 text-fog md:flex">
            <Link href="/#capabilities" className="hover:text-bone">Capabilities</Link>
            <Link href="/#method" className="hover:text-bone">Method</Link>
            <Link href="/#techniques" className="hover:text-bone">Techniques</Link>
            <Link href="/#explainable" className="hover:text-bone">Explainability</Link>
          </nav>
          <CtaButton variant="ghost">Request access</CtaButton>
        </div>
      </header>

      <main>
        {/* HERO */}
        <section className="grid-bg relative flex min-h-[min(100svh,900px)] flex-col justify-end overflow-hidden border-b border-line pt-16">
          <div className="absolute inset-0 top-16">
            <HeroCanvas />
            <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-transparent md:via-ink/40" />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />
          </div>
          <div className={`${wrap} relative pb-14 pt-24 md:pb-20`}>
            <p className="label mb-6 flex items-center gap-3 text-signal">
              <span className="inline-block h-2 w-2 bg-signal" /> Montaa // Decision intelligence
            </p>
            <h1 className="max-w-4xl text-[2.6rem] font-semibold leading-[1.02] tracking-[-0.03em] md:text-[5.2rem]">
              Stress-test the decision <span className="text-signal">before</span> you make it.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-fog md:text-xl">
              For the rare, multi-party calls you only get once — a funding round, an acquisition, a negotiation. Montaa models the
              other side&apos;s incentives and unknowns, plays out how it could go, and shows which move holds up best and what would change the answer.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <CtaButton>Request early access →</CtaButton>
              <Link href="/#method" className="label inline-flex items-center border border-line-strong px-5 py-4 text-bone transition hover:-translate-y-0.5 hover:border-signal hover:text-signal">
                See how it works
              </Link>
            </div>
          </div>
          <div className="relative border-t border-line bg-ink/70 backdrop-blur-sm">
            <div className={`${wrap} label grid grid-cols-2 gap-y-3 py-5 text-fog md:grid-cols-4`}>
              <span><b className="text-bone">Multi-party</b> equilibrium analysis</span>
              <span><b className="text-bone">Thousands</b> of simulated futures</span>
              <span><b className="text-bone">Assumptions</b> you can see and edit</span>
              <span><b className="text-bone">Ranges,</b> not false precision</span>
            </div>
          </div>
        </section>

        {/* PROBLEM */}
        <section className="border-b border-line bg-ink py-24 md:py-36">
          <div className={wrap}>
            <SectionTag n="01">The problem</SectionTag>
            <div className="mt-10 grid gap-12 md:grid-cols-12">
              <h2 className="text-3xl font-semibold leading-[1.1] tracking-tight md:col-span-7 md:text-5xl">
                Your highest-stakes decisions are being made on intuition.
              </h2>
              <div className="space-y-5 text-lg leading-relaxed text-fog md:col-span-5">
                <p>
                  Every big decision involves other actors with their own goals, private information and moves still to come.
                  Intuition can&apos;t hold all of that at once, and one wrong call can cost a deal, a company or a decade.
                </p>
                <p className="text-bone">
                  Montaa doesn&apos;t predict the future. It puts your assumptions on the table, plays them out against the other side, and shows which moves still hold up when you&apos;re wrong.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="method" className="scroll-mt-16 border-b border-line bg-panel py-24 md:py-32">
          <div className={wrap}>
            <SectionTag n="02">How it works</SectionTag>
            <h2 className="mt-8 max-w-3xl text-3xl font-semibold leading-[1.1] tracking-tight md:text-5xl">
              Describe the situation. Montaa stress-tests it.
            </h2>
            <div className="mt-14 grid gap-12 lg:grid-cols-12">
              <ol className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:col-span-6">
                {steps.map((s) => (
                  <li key={s.n} className="bg-panel p-6">
                    <p className="label text-signal">{s.n}</p>
                    <h3 className="mt-4 text-xl font-semibold tracking-tight">{s.t}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-fog">{s.d}</p>
                  </li>
                ))}
              </ol>

              {/* console mock */}
              <div className="brackets border border-line-strong bg-ink lg:col-span-6">
                <div className="label flex items-center justify-between border-b border-line px-4 py-3 text-fog">
                  <span>montaa // session 0417</span>
                  <span className="text-signal">● illustrative · not a forecast</span>
                </div>
                <div className="space-y-5 p-5 font-mono text-[0.8rem] leading-relaxed">
                  <div>
                    <p className="label text-fog">Scenario</p>
                    <p className="mt-2 text-bone">
                      Weighing an acquisition. Target board is split, an activist investor holds a stake, a rival bidder may emerge, and the regulator timeline is uncertain.
                    </p>
                  </div>
                  <div className="border-t border-line pt-4">
                    <p className="label text-fog">Model</p>
                    <p className="mt-2 text-fog">
                      players: <span className="text-bone">4 + 1 inferred</span> · info: <span className="text-bone">incomplete</span> · stages: <span className="text-bone">5</span>
                    </p>
                    <p className="mt-1 text-fog">
                      rollouts: <span className="text-bone">50,000</span> · solver: <span className="text-bone">Bayesian NE + CFR</span>
                    </p>
                    <p className="mt-1 text-fog">
                      input confidence: <span className="text-bone">low–medium</span> · 6 of 9 inputs are your estimates
                    </p>
                  </div>
                  <div className="border-t border-line pt-4">
                    <p className="label text-fog">Recommended next move</p>
                    <p className="cursor mt-2 text-signal">
                      Take a minority stake now; keep the option to acquire.
                    </p>
                    <table className="mt-4 w-full text-left">
                      <thead className="label text-fog">
                        <tr><th className="pb-2 font-normal">Option</th><th className="pb-2 font-normal">Outcome range</th><th className="pb-2 font-normal">Bad case</th></tr>
                      </thead>
                      <tbody>
                        {[["Stage in via minority stake", "0.50 – 0.75", "−0.25 – −0.05", true], ["Acquire now", "0.40 – 0.75", "−0.60 – −0.25", false], ["Wait six months", "0.25 – 0.60", "−0.35 – −0.10", false], ["Pass", "0.10 – 0.30", "−0.10 – 0.00", false]].map(([a, b, c, best]) => (
                          <tr key={String(a)} className={`border-t border-line ${best ? "text-signal" : "text-fog"}`}>
                            <td className="py-2">{a}</td><td>{b}</td><td>{c}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <p className="mt-3 text-fog">Ranked by how well each option holds up across assumptions, not by a point estimate.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CAPABILITIES */}
        <section id="capabilities" className="scroll-mt-16 border-b border-line py-24 md:py-32">
          <div className={wrap}>
            <SectionTag n="03">Capabilities</SectionTag>
            <h2 className="mt-8 max-w-3xl text-3xl font-semibold leading-[1.1] tracking-tight md:text-5xl">
              Four things your instincts can&apos;t compute.
            </h2>
          </div>
          <div className={`${wrap} mt-16 space-y-px`}>
            {capabilities.map((c, i) => (
              <article key={c.id} className="grid items-center gap-10 border-t border-line py-14 md:grid-cols-2 md:gap-16">
                <div className={i % 2 ? "md:order-2" : ""}>
                  <p className="label text-fog">0{i + 1} / 04</p>
                  <h3 className="mt-4 text-3xl font-semibold tracking-tight md:text-[2.6rem] md:leading-[1.05]">{c.name}</h3>
                  <p className="mt-3 text-lg text-signal">{c.tag}</p>
                  <p className="mt-6 leading-relaxed text-fog">{c.body}</p>
                  <ul className="mt-6 space-y-2 text-sm">
                    {c.bullets.map((b) => (
                      <li key={b} className="flex gap-3 border-t border-line pt-2 text-bone">
                        <span className="text-signal">+</span>{b}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={`brackets grid-bg aspect-[380/250] border border-line bg-panel p-4 ${i % 2 ? "md:order-1" : ""}`}>
                  {c.visual}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* TECHNIQUES — light section */}
        <section id="techniques" className="grid-bg-light scroll-mt-16 bg-paper py-24 text-black md:py-32">
          <div className={wrap}>
            <SectionTag n="04" dark={false}>Under the hood</SectionTag>
            <h2 className="mt-8 max-w-4xl text-3xl font-semibold leading-[1.1] tracking-tight md:text-5xl">
              Seventy years of game theory, applied to your next big decision.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-black/65">
              Montaa combines classical solution concepts with modern simulation and self-play methods — the same
              families of techniques used in economics, auction design, and superhuman game-playing AI.
            </p>
            <div className="mt-14 grid gap-px border border-black/20 bg-black/20 sm:grid-cols-2 lg:grid-cols-3">
              {methods.map((m) => (
                <div key={m.name} className="bg-paper p-6 transition hover:bg-white">
                  <h3 className="text-lg font-semibold tracking-tight">{m.name}</h3>
                  <p className="mt-3 min-h-[2.5rem] break-words border-l-2 border-black pl-3 font-mono text-[0.75rem] leading-snug text-black/70">{m.f}</p>
                  <p className="mt-4 text-sm leading-relaxed text-black/65">{m.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* EXPLAINABILITY */}
        <section id="explainable" className="scroll-mt-16 border-b border-line py-24 md:py-32">
          <div className={`${wrap} grid gap-14 md:grid-cols-12`}>
            <div className="md:col-span-5">
              <SectionTag n="05">Honest by design</SectionTag>
              <h2 className="mt-8 text-3xl font-semibold leading-[1.1] tracking-tight md:text-5xl">
                A stress test for your thinking, not a prediction.
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-fog">
                Every model of a live deal rests on estimates — yours and ours — and Montaa won&apos;t dress them up as certainty. Outputs are ranges. Every assumption is visible and editable. And you&apos;re told which assumption would flip the recommendation, so you can challenge it before you act on it.
              </p>
            </div>
            <div className="md:col-span-7">
              <div className="brackets border border-line-strong bg-panel">
                <div className="label border-b border-line px-5 py-3 text-fog">Decision trace · illustrative</div>
                {[
                  ["Recommendation", "Take a minority stake now; keep the option to acquire."],
                  ["Because", "In most rollouts where a rival bidder emerges, buying outright at today's price overpays; a staged entry holds up better."],
                  ["Assuming", "Board stays split · regulator review ≥ 90 days · rival has not yet valued the asset."],
                  ["Breaks if", "The target accelerates a competing process. Re-run recommended."],
                  ["Flips if", "The activist's exit price is ~15% lower than assumed: 'Acquire now' then ranks first."],
                  ["Confidence", "Low–medium. 6 of 9 inputs are your estimates. Treat the ranking as a stress test, not a forecast."],
                ].map(([k, v]) => (
                  <div key={k} className="grid gap-1 border-b border-line px-5 py-4 last:border-0 sm:grid-cols-[9rem_1fr] sm:gap-6">
                    <p className="label text-signal">{k}</p>
                    <p className="text-sm leading-relaxed text-bone">{v}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* USE CASES */}
        <section className="border-b border-line bg-panel py-24 md:py-32">
          <div className={wrap}>
            <SectionTag n="06">Who it&apos;s for</SectionTag>
            <h2 className="mt-8 max-w-3xl text-3xl font-semibold leading-[1.1] tracking-tight md:text-5xl">
              Built for the rare, multi-party calls.
            </h2>
            <div className="mt-14 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
              {uses.map(([t, d]) => (
                <div key={t} className="bg-panel p-7 transition hover:bg-ink">
                  <h3 className="text-lg font-semibold tracking-tight">{t}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-fog">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="grid-bg relative overflow-hidden py-28 md:py-44">
          <div className={`${wrap} relative text-center`}>
            <Mark className="mx-auto h-10 w-10 text-signal" />
            <h2 className="mx-auto mt-8 max-w-4xl text-4xl font-semibold leading-[1.05] tracking-[-0.025em] md:text-7xl">
              Stress-test your next big call.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-fog">
              Montaa is in development and opening to a small founding group — founders, deal teams and advisors facing a live decision. Tell us what you&apos;re weighing.
            </p>
            <div className="mt-10 flex justify-center"><CtaButton>Request early access →</CtaButton></div>
            <p className="label mt-8 text-fog">Pre-launch · all figures on this page are illustrative · no customer results yet</p>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-line bg-ink py-10">
        <div className={`${wrap} label flex flex-col gap-4 text-fog md:flex-row md:items-center md:justify-between`}>
          <div className="flex items-center gap-3">
            <Mark className="h-4 w-4 text-signal" />
            <span>© {new Date().getFullYear()} Montaa</span>
          </div>
          <p className="max-w-md normal-case tracking-normal md:text-right">
            Montaa is decision support, not a forecast. Outputs depend on assumptions and are not guarantees or professional (legal, financial) advice.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-bone">Privacy</Link>
            <Link href="/terms" className="hover:text-bone">Terms</Link>
          </div>
        </div>
      </footer>
    </WaitlistProvider>
  );
}
