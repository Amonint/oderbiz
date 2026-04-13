This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

La pagina principal incluye la reconstruccion de las secciones **navbar** y **hero** (Framer) bajo `app/components/framer-nav/` y `app/components/framer-hero/`.

## Framer navbar + hero regression checks

- `npm run test:ui` — pruebas estructurales (Vitest)
- `npm run build && PORT=3005 npx next start -H 127.0.0.1` — en otra terminal, con el servidor listo:
  - `PLAYWRIGHT_BASE_URL=http://127.0.0.1:3005 npx playwright test tests/visual`  
  Las capturas usan `/?freezeTime=1` para fijar la hora del bloque India (evita parpadeo entre ejecuciones).

Lista manual: [docs/framer-navbar-hero-qa-checklist.md](docs/framer-navbar-hero-qa-checklist.md).

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
