# Montaa — landing page (project memory)

**Keep this file current.** Update it in the same session as every change to the product, copy, design, stack, or deployment, and record *why*, not just *what*.

## What this is
Montaa (spelled M-O-N-T-A-A) is a planned **decision-intelligence** product for high-stakes decisions where other actors' moves matter (acquisitions, market entry, pricing, fundraising, policy, and deal negotiations as one use case). This repo is **only the marketing landing page**, built to validate the idea (collect waitlist emails) before the product is built.

The product concept: the user describes a decision (players, options, context, stakes). Montaa models it as a game, runs simulations and game-theoretic solvers (Nash equilibrium, Monte Carlo, etc.), and returns a ranked next move with trade-offs, risks, hidden-player effects, and an explainable trace. Core promise: **better decisions and strategy in a world of other actors**. Deep technically, but explainable, never a black box.

Process source of truth: `docs/playbooks/01-landing-page-and-deployment-playbook.md` (stack, Docker/Caddy deploy, AWS, gotchas). It is kept local only (gitignored, not in the public repo). Note: on 2026-10-02 we deliberately deviated from its AWS/Docker/SQLite path in favour of free GitHub Pages (see Deployment).

## Naming
- Product name is **Montaa** (renamed from "Montara" on 2026-10-02). Wordmark is uppercase `MONTAA`. Package name `montaa`.
- The local folder is still named `montara` (just the directory name, not renamed). The GitHub repo is `montaa`.

## Positioning and copy (updated 2026-10-02)
- Reframed from "negotiation" to **decision making**. Why: a negotiation is just one kind of decision, and the user doesn't want the product to look limited to business/financial deals (e.g. an executive weighing an acquisition needs a decision/strategy, not just deal terms).
- Guardrail: "decision making" alone is generic and crowded. The differentiator to keep visible is **decisions in a world of other actors** (rivals, boards, regulators, counterparties who react) — that is why game theory applies.
- "Decision" is used in headlines (concrete, urgent); "strategy" in supporting copy (senior, bigger).
- Hero (now "Stress-test the decision before you make it.", see refinement below; was "Simulate the decision before you make it."). Problem headline: "Your highest-stakes decisions are being made on intuition."
- Capabilities: Stakeholder dynamics, Trade-off frontier, Risk assessment, Hidden actors.
- Console mock and decision trace use an executive acquisition example (options: stage in via minority stake / acquire now / wait / pass). All illustrative.
- Audience cards ("Who it's for"): see refinement below (replaced the earlier generic use-case list).
- Eyebrow/title/meta say "Decision intelligence"; waitlist modal asks "What decision are you facing?".

## Positioning refinement: rare multi-party calls + honest uncertainty (2026-10-02)
Driven by an outside review of the page. Two decisions:
1. **Narrow the wedge.** Best fit is *rare, multi-party decisions*: negotiations, fundraising, M&A. Hero/CTA/meta now say so. "Where it applies" became **"Who it's for"** and lists the first test audiences: founders raising rounds, M&A and corp-dev advisors, VC/PE deal teams, strategy consultants, negotiation/deal lawyers (+ executives facing a one-off bet). Founders and consultants are the cheapest to reach and learn from, so recruit them first. The modal has an optional **role** dropdown (sent to Formspree as `role`) so we can see which audience signs up.
2. **Position as a stress test for thinking, not a prediction.** Biggest risk: outputs rest on inputs the user and an LLM guess, so precise-looking numbers (e.g. "71% of rollouts", "0.64") overstate accuracy. So: hero says "Stress-test the decision before you make it"; the console mock shows **ranges** (not point estimates) ranked by robustness, with an input-confidence line ("6 of 9 inputs are your estimates"); the explainability section is "A stress test for your thinking, not a prediction" with *Flips if* and *Confidence* rows; the hidden-actor diagram says "likelihood: high (estimate)" instead of a probability; footer says "decision support, not a forecast". **Rule for future copy: no precise percentages or point values presented as findings; use ranges, "most", or flip-points.**
- **Known gaps (not fixable without real facts from the owner):** no proof/traction, no team section, no pricing. Never invent them. The page is honest instead: "Pre-launch · all figures illustrative · no customer results yet". Add real ones when they exist.

## Stack
- Next.js 16 (App Router, TypeScript, Turbopack), React 19. **Static export** (`output: "export"`, `trailingSlash`, unoptimized images) so it can be hosted on GitHub Pages. `basePath` comes from `NEXT_PUBLIC_BASE_PATH` (set to `/montaa` in CI; unset locally and for a custom domain).
- Tailwind CSS v4: tokens in `@theme` in `app/globals.css` (no tailwind.config). Fonts via `next/font/google`: Inter (`--f-inter`) and JetBrains Mono (`--f-mono`).
- Framer Motion: used only for the waitlist modal transition.
- Waitlist: no backend. The modal POSTs JSON to an external form service at `NEXT_PUBLIC_WAITLIST_ENDPOINT` (Formspree-style; optional `NEXT_PUBLIC_WAITLIST_KEY` is sent as `access_key` for Web3Forms-style services). The endpoint comes from the `WAITLIST_ENDPOINT` repo variable in CI. If unset the modal shows "The waitlist isn't open yet".

## File map
- `app/page.tsx` — whole landing page (nav, hero, problem, how-it-works, capabilities, techniques, explainability, use cases, final CTA, footer) and all copy.
- `app/layout.tsx` — fonts, metadata/title. `app/icon.svg` — favicon (lime "M" mark on black).
- `app/privacy/page.tsx`, `app/terms/page.tsx` — draft legal pages (basic pre-launch drafts, not legal review).
- `components/HeroCanvas.tsx` — decorative Monte Carlo path field + outcome histogram (canvas). Respects `prefers-reduced-motion` (renders a static frame).
- `components/Waitlist.tsx` — `WaitlistProvider` context, modal, `CtaButton`; does the external-endpoint POST.
- `.github/workflows/pages.yml` — builds the static export and deploys to GitHub Pages on push to `main`.
- `components/Visuals.tsx` — four inline-SVG diagrams for the capability sections.
- `archive/self-hosted/` — the earlier self-hosted version (Next API route + SQLite waitlist with CSV export, Dockerfile, docker-compose, Caddyfile, `.env.example`). Not built (excluded in `tsconfig.json`); kept so the EC2/Docker path can be restored when the product graduates beyond free hosting. Restoring means moving the route/db back into `app/api` + `lib`, reinstalling `better-sqlite3`, and switching `next.config.ts` back to `output: "standalone"`.

## Design decisions (and why)
- **Look:** deep-tech lab (Anduril / Palantir / Isomorphic Labs). Colors extracted from the real CSS of those sites per the playbook: Anduril lime `#DFF140` as the signal accent on near-black `#0a0b0a`, Isomorphic greys (`#1E1E1E`, `#D8D8D8`). Mono uppercase labels, blueprint grid backgrounds, corner-bracket frames.
- **Rhythm:** dark sections, with one light "Under the hood" techniques section for contrast.
- **Headline hierarchy (playbook §2):** feature name is the big headline; the punchy line is smaller, in the accent color.
- **Motion (playbook §3):** no scroll-triggered animation. Only the hero canvas (continuous, decorative, behind a gradient so text stays legible) and the modal. The hero is capped at `min(100svh, 900px)`.
- **Honesty:** every figure/output on the page (console mock, decision trace, diagrams) is labelled *illustrative*. No fabricated stats, customers or testimonials; this is deliberate for idea validation.
- **Techniques shown** (12, with formula + plain-English line): Nash equilibrium, Bayesian Nash, subgame-perfect, Nash bargaining solution, Kalai–Smorodinsky, Shapley value, the Core, Monte Carlo simulation, MCTS, counterfactual regret minimization, quantal response equilibrium, minimax regret. Descriptions are from background knowledge and have not been expert-reviewed.
- **Internal links** use `next/link` with absolute paths (`/#section`) per playbook §8. Plain `<a>` would ignore `basePath` and break on GitHub Pages, so don't use it for internal links.

## Run locally
`npm run dev` (Turbopack). Port 3000 was occupied by another process on the user's machine, so Next picked **3001**. Test the Pages build: `NEXT_PUBLIC_BASE_PATH=/montaa npm run build`, then serve `out/` under a `/montaa/` path (e.g. symlink `out` as `site/montaa` and `python3 -m http.server`).

## Deployment
- **Decision (2026-10-02):** host free until the idea is validated, via **GitHub Pages** from the public repo `miranthajayatilake/montaa` → https://miranthajayatilake.github.io/montaa/. Plan: validate through a Product Hunt-style launch (using a separate email), build the product later. Public repo is required for free Pages.
- Why not the existing EC2 box: the only existing instance runs another live production site; sharing it would mean restructuring its Caddy and risking OOM builds on 1GB RAM. A separate instance would cost money, which the user wants to avoid for now.
- Pages source is "GitHub Actions". Pushing to `main` redeploys. The waitlist endpoint is supplied through repo **variables** `WAITLIST_ENDPOINT` (and optionally `WAITLIST_KEY`); form-service endpoints/keys are public by design, so variables (not secrets) are fine.
- GitHub Pages is static-only: no server, no SQLite. That is why the waitlist moved to an external form service.
- Commits use the GitHub noreply email so the user's real address isn't exposed in public history.

## Verification notes
- Claude-in-Chrome extension was not connected, so visual checks were done via headless Chrome (CLI screenshots + a CDP script). Very tall headless screenshots render black past ~5000px; that is a capture limit, not a page bug.
- Checked: desktop 1440px, mobile 390px (no horizontal overflow), modal opens. The static build was verified served under `/montaa/` (assets, nav links, privacy page).
- The old self-hosted API (POST/export/401/duplicate/invalid-email) was tested before it was archived; the new external-endpoint waitlist is **not yet tested end to end** (no endpoint configured).

## Open items
- Real domain, company name/address for the footer and legal pages (currently placeholders; footer shows "© year Montaa").
- Have someone with game-theory expertise review technique copy before public launch.
- Waitlist runs on **Formspree** (form `moevorwr`, free tier = 50 submissions/month; upgrade or switch to Web3Forms if the Product Hunt launch exceeds that). Signups arrive in the owner's Formspree inbox/dashboard, which is also where to export them. reCAPTCHA must stay off for our plain `fetch` submissions.
- Custom domain later: set Pages custom domain, clear `NEXT_PUBLIC_BASE_PATH` in the workflow.

## Change log
- 2026-10-02: Initial build of the landing page, waitlist, and Docker/Caddy files.
- 2026-10-02: Repositioned copy from negotiation to decision making across page, metadata, modal, and privacy page (see Positioning and copy).
- 2026-10-02: Copy revision: rare multi-party wedge, "Who it's for" audience cards, stress-test-not-prediction framing, ranges instead of point estimates, role dropdown in the waitlist modal, pre-launch honesty line (see Positioning refinement).
- 2026-10-02: Connected Formspree (repo variable `WAITLIST_ENDPOINT`), privacy page names Formspree. We kept our own JSON `fetch` instead of adding `@formspree/react`: it's equivalent and avoids a dependency.
- 2026-10-02: Switched to free hosting on GitHub Pages: static export, basePath, external-form waitlist, Pages workflow; self-hosted Docker/SQLite code moved to `archive/self-hosted/`; `docs/` gitignored from the public repo.
- 2026-10-02: Renamed product Montara → Montaa everywhere (copy, wordmark, metadata, legal pages, package name, Caddyfile comment). Rewrote this file as full project memory.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
