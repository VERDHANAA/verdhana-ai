# Verdhana AI Project Context

## Product
SaaS dengan 12 AI marketing specialists. Stack: Next.js 16, Supabase, OpenRouter, Vercel, Resend, Upstash Redis.

## Design System (Theme Factory — Verdhana Neobrutalism)
- Font: Space Grotesk (next/font/google)
- Background: #FFFAF3
- Accent: #FF6B00
- Border: 2px solid #000
- Shadow: 4px 4px 0px #000 (lg: 6px 6px 0px #000)
- Radius: 5px
- Hover: translate(-2px,-2px) + shadow lebih besar
- Active/Click: translate(2px,2px) + shadow hilang
- Card colors: #FDC800 #A3E636 #FF9F9F #88AAEE #A388EE

## Rules
- Tidak modify file di /node_modules
- Tidak commit/push tanpa konfirmasi user
- Tidak hapus file tanpa konfirmasi user
- Selalu jelaskan apa yang mau diubah SEBELUM apply
- Pakai bahasa Indonesia di response, English di code
- Test build dengan `npm run build` setelah perubahan besar
- Jangan tambah dependency baru tanpa konfirmasi
- Di Termux/Android: selalu pakai flag `--webpack` (Turbopack tidak support arm64)

## Build Commands
- Dev: `npm run dev` (sudah include --webpack)
- Build: `npm run build` (sudah include --webpack)
- Deploy: `npx vercel --prod`

## Sub-Agent Workflow
Saat audit, pisahkan jadi 3 fase:
1. FRONTEND: UI/UX, responsive, accessibility
2. BACKEND: API routes, database, performance, error handling
3. SECURITY: input sanitization, auth, RLS, exposed secrets

Setelah tiap fase, LAPORKAN temuan + tunggu user approve sebelum fix.

## Critical Files
- src/app/api/generate/route.ts - main AI generation endpoint (belum dibuat)
- src/lib/agents.ts - Writer/Reviewer/Editor pipeline
- src/lib/redis.ts - cache + rate limit
- src/lib/supabase/client.ts - Supabase browser client
- src/lib/supabase/server.ts - Supabase server client
- src/lib/theme.ts - design tokens & Tailwind class helpers
- src/components/ui/ - Button, Card, Badge, Input
- src/app/dashboard/ - user interface
- src/app/page.tsx - landing page

## Don't Touch Without Asking
- .env.local (API keys)
- Any secret/API key
- Database schema (migrations)
- Vercel/deployment config
