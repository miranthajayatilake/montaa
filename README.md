# Montaa

Landing page for **Montaa** — decision intelligence for high-stakes decisions where other actors' moves matter.

Built with Next.js (static export), Tailwind CSS v4 and Framer Motion. Hosted on GitHub Pages.

```bash
npm install
npm run dev        # local dev
NEXT_PUBLIC_BASE_PATH=/montaa npm run build   # static export to ./out
```

Waitlist submissions are posted to the form endpoint in `NEXT_PUBLIC_WAITLIST_ENDPOINT` (optionally `NEXT_PUBLIC_WAITLIST_KEY`). In CI these come from the repo variables `WAITLIST_ENDPOINT` / `WAITLIST_KEY`.
