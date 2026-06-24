# Framer About Section (About) — Plan de implementación exacta

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

> **Alcance de validación:** No hay pruebas automatizadas (Vitest/Playwright). Tras cada bloque de cambios relevante, validar con `npm run lint` en la tarea final de ESLint.

**Goal:** Recrear en Next.js la sección `section[data-framer-name="About"]` del HTML exportado por Framer (menú lateral WORK / ABOUT / SERVICES / CONTACT con barra verde + flecha + título; párrafo principal 40px con dos tonos; CTA “About US” con texto rolling), con paridad visual y de estructura DOM cercana al extracto.

**Architecture:** Un componente de sección `FramerAboutExact` en `app/components/framer-about/` con CSS Modules. Subcomponentes pequeños: enlace del menú lateral (barra + SVG Phosphor ArrowRight rotado + `h2` con letras en `span`), párrafo con segmentos de color (`rgb(13,13,13)` vs `rgb(115,115,115)`), y CTA con patrón rolling text (misma mecánica que `RollingMenuItem` del nav). Los tokens de color del extracto se **redefinen en la raíz del módulo** (`.root`) para no romper otras secciones que reutilizan nombres de token en `:root`.

**Tech Stack:** Next.js App Router, React 19, TypeScript, CSS Modules, `next/link`, ESLint (`eslint-config-next`).

---

## Estructura de archivos

| Archivo | Responsabilidad |
|---------|-----------------|
| `app/components/framer-about/framer-about-exact.tsx` | Sección `<section>` + layout de dos columnas + composición de subcomponentes |
| `app/components/framer-about/about-side-nav.tsx` | `<nav>` con cuatro `AboutSideNavLink` |
| `app/components/framer-about/about-side-nav-link.tsx` | Un fila enlace: barra verde, icono flecha 90°, `h2` con letras separadas |
| `app/components/framer-about/about-heading.tsx` | Párrafo 40px Inter Display con segmentos dark/muted |
| `app/components/framer-about/about-primary-cta.tsx` | Botón/enlace pill borde blanco + rolling text “About US” |
| `app/components/framer-about/framer-about-exact.module.css` | Layout, tokens locales, estilos de menú, párrafo, CTA, rolling CTA |
| `app/globals.css` | (Opcional) segunda `@import` de fuentes si hace falta pesos extra de Inter; solo si el párrafo no coincide en peso |
| `app/page.tsx` | Importar y renderizar `<FramerAboutExact />` debajo de las secciones existentes |

---

### Task 1: Tokens locales y layout base de la sección

**Files:**
- Create: `app/components/framer-about/framer-about-exact.module.css`
- Create: `app/components/framer-about/framer-about-exact.tsx` (shell mínimo)

- [ ] **Step 1: Crear CSS con raíz de sección y tokens del extracto**

En el extracto, los colores críticos son: acento `rgb(140, 255, 46)` (token `d98a4c00…`), texto claro de menú `rgb(247, 247, 247)` (token `9811e40b…` en los `h2`), párrafo oscuro `rgb(13, 13, 13)` (mismo nombre de token en spans del `p`), gris de cierre `rgb(115, 115, 115)` (token `af1df47b…`). La raíz `.root` redefine esos tokens para los descendientes.

```css
/* app/components/framer-about/framer-about-exact.module.css */
.root {
  /* Overrides locales: el extracto Framer usa estos fallbacks; :root global puede diferir */
  --token-d98a4c00-7e0c-42c7-87be-9d10760cb03b: rgb(140, 255, 46);
  --token-9811e40b-3ed8-4237-98e5-61535bb22d2f: rgb(247, 247, 247);
  --token-about-body: rgb(13, 13, 13);
  --token-af1df47b-ea84-448e-bdf0-a5ce0f875a59: rgb(115, 115, 115);
  width: 100%;
  box-sizing: border-box;
  padding: 48px 24px 64px;
  background-color: rgb(13, 13, 13);
  color: rgb(247, 247, 247);
}

.inner {
  display: grid;
  grid-template-columns: minmax(200px, 320px) minmax(0, 1fr);
  gap: 48px 64px;
  align-items: start;
  max-width: 1440px;
  margin: 0 auto;
}

.menuColumn {
  width: 100%;
}

.contentColumn {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

@media (max-width: 900px) {
  .inner {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 2: Shell TSX de la sección con clases Framer de referencia**

```tsx
// app/components/framer-about/framer-about-exact.tsx
import styles from "./framer-about-exact.module.css";

export function FramerAboutExact() {
  return (
    <section
      className={`framer-1ax983m ${styles.root}`}
      data-framer-name="About"
      aria-labelledby="framer-about-heading"
    >
      <div className="framer-iysrdq" data-framer-name="Content">
        <div className={`framer-11cyxu9 ${styles.menuColumn}`}>
          {/* Task 2: AboutSideNav */}
        </div>
        <div className={`framer-1rl8hlq ${styles.contentColumn}`}>
          <div className="framer-1v555c3" data-framer-name="Heading">
            {/* Task 3 + 4: AboutHeading + AboutPrimaryCta */}
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add app/components/framer-about/framer-about-exact.module.css app/components/framer-about/framer-about-exact.tsx
git commit -m "feat(about): scaffold Framer About section shell and scoped tokens"
```

---

### Task 2: Menú lateral — enlace (barra + flecha + WORK/ABOUT/…)

**Files:**
- Create: `app/components/framer-about/about-side-nav-link.tsx`
- Modify: `app/components/framer-about/framer-about-exact.module.css`

- [ ] **Step 1: Estilos del enlace, barra, contenedor flecha y h2**

Añadir al final de `framer-about-exact.module.css`:

```css
.sideNav {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
}

.sideLink {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  text-decoration: none;
  opacity: 1;
  box-sizing: border-box;
}

.sideLink :global(.framer-1xydhb5) {
  flex-shrink: 0;
  width: 4px;
  align-self: stretch;
  min-height: 48px;
  border-radius: 0;
}

.arrowWrap {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  transform: rotate(90deg);
  transform-origin: 50% 50% 0;
  will-change: transform;
}

.arrowSvg {
  width: 100%;
  height: 100%;
  display: block;
  flex-shrink: 0;
  fill: var(
    --token-d98a4c00-7e0c-42c7-87be-9d10760cb03b,
    rgb(140, 255, 46)
  );
  color: var(
    --token-d98a4c00-7e0c-42c7-87be-9d10760cb03b,
    rgb(140, 255, 46)
  );
}

.menuTitleWrap {
  flex: 1;
  min-width: 0;
  --extracted-1of0zx5: var(
    --token-9811e40b-3ed8-4237-98e5-61535bb22d2f,
    rgb(247, 247, 247)
  );
}

.menuH2 {
  margin: 0;
  font-family: "Inter Display", "Inter Display Placeholder", sans-serif;
  font-size: clamp(36px, 5vw, 56px);
  font-weight: 400;
  line-height: 1;
  letter-spacing: 0;
  text-transform: uppercase;
  color: var(
    --extracted-1of0zx5,
    var(--token-9811e40b-3ed8-4237-98e5-61535bb22d2f, rgb(247, 247, 247))
  );
}

.menuH2nowrap {
  white-space: nowrap;
}

.menuLetter {
  display: inline-block;
  will-change: transform;
}
```

- [ ] **Step 2: Componente `AboutSideNavLink`**

```tsx
// app/components/framer-about/about-side-nav-link.tsx
import Link from "next/link";
import styles from "./framer-about-exact.module.css";

const ARROW_PATH =
  "M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z";

export type AboutSideNavLinkProps = {
  href: string;
  label: string;
  dataFramerName: string;
};

export function AboutSideNavLink({
  href,
  label,
  dataFramerName,
}: AboutSideNavLinkProps) {
  const letters = [...label.toUpperCase()];

  return (
    <Link
      className={`framer-kI4LS framer-Ly2Sl framer-1v096ay framer-v-1v096ay framer-poiihi ${styles.sideLink}`}
      data-framer-name="Desktop"
      href={href}
      style={{ width: "100%", opacity: 1 }}
      aria-label={label}
      data-framer-item={dataFramerName}
    >
      <div
        className="framer-1xydhb5"
        style={{
          backgroundColor:
            "var(--token-d98a4c00-7e0c-42c7-87be-9d10760cb03b, rgb(140, 255, 46))",
          opacity: 1,
          transform: "none",
          transformOrigin: "50% 50% 0",
          willChange: "transform",
        }}
      />
      <div className={`framer-lfov1z-container ${styles.arrowWrap}`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 256 256"
          focusable="false"
          className={styles.arrowSvg}
          aria-hidden
        >
          <g>
            <path d={ARROW_PATH} />
          </g>
        </svg>
      </div>
      <div
        className={`framer-fjvqcy ${styles.menuTitleWrap}`}
        data-framer-component-type="RichTextContainer"
        style={{
          ["--extracted-1of0zx5" as string]:
            "var(--token-9811e40b-3ed8-4237-98e5-61535bb22d2f, rgb(247, 247, 247))",
          opacity: 1,
        }}
      >
        <h2
          className={`framer-text framer-styles-preset-9coj1e ${styles.menuH2}`}
          data-styles-preset="KBHJuVDfj"
          style={{
            ["--framer-text-color" as string]:
              "var(--extracted-1of0zx5, var(--token-9811e40b-3ed8-4237-98e5-61535bb22d2f, rgb(247, 247, 247)))",
          }}
        >
          <span className={styles.menuH2nowrap}>
            {letters.map((ch, i) => (
              <span key={`${label}-${i}`} className={styles.menuLetter}>
                {ch}
              </span>
            ))}
          </span>
        </h2>
      </div>
    </Link>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add app/components/framer-about/about-side-nav-link.tsx app/components/framer-about/framer-about-exact.module.css
git commit -m "feat(about): add side nav link row with bar, arrow, and split title"
```

---

### Task 3: `AboutSideNav` y envoltorios SSR del extracto

**Files:**
- Create: `app/components/framer-about/about-side-nav.tsx`
- Modify: `app/components/framer-about/framer-about-exact.tsx`

- [ ] **Step 1: Lista de ítems y nav**

```tsx
// app/components/framer-about/about-side-nav.tsx
import { AboutSideNavLink } from "./about-side-nav-link";
import styles from "./framer-about-exact.module.css";

const ITEMS = [
  {
    href: "/work",
    label: "Work",
    dataFramerName: "Work",
    containerClass: "framer-1vk1dnu-container",
    appearId: "1vk1dnu",
  },
  {
    href: "/about",
    label: "About",
    dataFramerName: "About",
    containerClass: "framer-16p8vg2-container",
    appearId: "16p8vg2",
  },
  {
    href: "/services",
    label: "Services",
    dataFramerName: "Services",
    containerClass: "framer-19hcfgg-container",
    appearId: "19hcfgg",
  },
  {
    href: "/contact",
    label: "Contact",
    dataFramerName: "Contact",
    containerClass: "framer-sszsg5-container",
    appearId: "sszsg5",
  },
] as const;

export function AboutSideNav() {
  return (
    <nav className={`framer-k53vmv ${styles.sideNav}`} data-framer-name="Menu">
      {ITEMS.map((item) => (
        <div
          key={item.href}
          className="ssr-variant hidden-12a2gtg hidden-1tqphhv"
        >
          <div
            className={item.containerClass}
            data-framer-appear-id={item.appearId}
            data-framer-name={item.dataFramerName}
            style={{
              opacity: 1,
              transform: "perspective(1200px)",
              willChange: "transform",
            }}
          >
            <AboutSideNavLink
              href={item.href}
              label={item.label}
              dataFramerName={item.dataFramerName}
            />
          </div>
        </div>
      ))}
    </nav>
  );
}
```

- [ ] **Step 2: Importar en `framer-about-exact.tsx`**

```tsx
import { AboutSideNav } from "./about-side-nav";
```

Dentro de `menuColumn`: `<AboutSideNav />`.

- [ ] **Step 3: Commit**

```bash
git add app/components/framer-about/about-side-nav.tsx app/components/framer-about/framer-about-exact.tsx
git commit -m "feat(about): compose side nav with Framer container classnames"
```

---

### Task 4: Párrafo principal (40px, Inter Display, dos tonos)

**Files:**
- Create: `app/components/framer-about/about-heading.tsx`
- Modify: `app/components/framer-about/framer-about-exact.module.css`

- [ ] **Step 1: Estilos del párrafo**

```css
.headingBlock {
  width: 100%;
}

.headingParagraph {
  font-family: "Inter Display", "Inter Display Placeholder", sans-serif;
  font-size: 40px;
  font-weight: 400;
  color: var(
    --token-af1df47b-ea84-448e-bdf0-a5ce0f875a59,
    rgb(115, 115, 115)
  );
  display: flex;
  flex-wrap: wrap;
  line-height: 40px;
  letter-spacing: 0;
  justify-content: flex-start;
  margin: 0;
}

.spanDark {
  color: var(--token-about-body, rgb(13, 13, 13));
}

.spanMuted {
  color: var(
    --token-af1df47b-ea84-448e-bdf0-a5ce0f875a59,
    rgb(115, 115, 115)
  );
}
```

- [ ] **Step 2: Componente con segmentos (texto completo del extracto)**

```tsx
// app/components/framer-about/about-heading.tsx
import styles from "./framer-about-exact.module.css";

const SEGMENTS: { text: string; tone: "dark" | "muted" }[] = [
  {
    tone: "dark",
    text:
      "We're an AI-first design and development studio based in India. We design and build AI products, UI/UX interfaces and digital experiences for startups and companies across India and the US. From AI product interfaces and conversational UIs to dashboards and no-code builds ",
  },
  { tone: "dark", text: "—\u00A0" },
  {
    tone: "muted",
    text: "supported by AI-enhanced workflows that move faster without compromising craft.",
  },
];

export function AboutHeading() {
  return (
    <div className="framer-1txrjgb-container">
      <div className="ssr-variant hidden-12a2gtg hidden-1tqphhv">
        <p
          id="framer-about-heading"
          className={styles.headingParagraph}
        >
          {SEGMENTS.map((seg, i) => {
            const className =
              seg.tone === "dark" ? styles.spanDark : styles.spanMuted;
            return (
              <span key={i}>
                {[...seg.text].map((ch, j) => (
                  <span key={`${i}-${j}`} className={className}>
                    {ch}
                  </span>
                ))}
              </span>
            );
          })}
        </p>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Montar en `framer-about-exact.tsx`**

```tsx
import { AboutHeading } from "./about-heading";
```

Dentro de `Heading`: `<AboutHeading />` primero.

- [ ] **Step 4: Commit**

```bash
git add app/components/framer-about/about-heading.tsx app/components/framer-about/framer-about-exact.module.css app/components/framer-about/framer-about-exact.tsx
git commit -m "feat(about): add 40px Inter Display heading with dual-tone spans"
```

---

### Task 5: CTA primario “About US” (rolling text + pill)

**Files:**
- Create: `app/components/framer-about/about-primary-cta.tsx`
- Modify: `app/components/framer-about/framer-about-exact.module.css`
- Modify: `app/components/framer-about/framer-about-exact.tsx`

- [ ] **Step 1: CSS del botón y rolling inner**

```css
.ctaRow {
  width: 100%;
}

.ctaLink {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  text-decoration: none;
  border-radius: 259px;
  opacity: 1;
  --border-bottom-width: 2px;
  --border-color: var(
    --token-9811e40b-3ed8-4237-98e5-61535bb22d2f,
    rgb(255, 255, 255)
  );
  --border-left-width: 2px;
  --border-right-width: 2px;
  --border-style: solid;
  --border-top-width: 2px;
  border-width: 2px;
  border-style: solid;
  border-color: var(
    --token-9811e40b-3ed8-4237-98e5-61535bb22d2f,
    rgb(255, 255, 255)
  );
  box-sizing: border-box;
  overflow: hidden;
}

.ctaLink :global(.framer-1sl4ib4) {
  position: absolute;
  inset: 0;
  border-radius: 30px;
  pointer-events: none;
}

.ctaInner {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
  padding: 12px 28px;
  box-sizing: border-box;
}

.rollingTextCta {
  --font-size: 24px;
  /* El token 9811e40b en .root es gris claro para el menú; el CTA del extracto usa blanco puro */
  --text: rgb(255, 255, 255);
  --line-height-abs: 24px;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  vertical-align: top;
  display: flex;
  overflow: hidden;
  width: max-content;
  font-family: "Inter Display", "Inter Display Placeholder", sans-serif;
  font-size: 24px;
  text-transform: uppercase;
  user-select: none;
  text-shadow: 0 var(--line-height-abs) 0 var(--text);
}

.rollingTextCta span {
  display: block;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  white-space: pre;
  flex-shrink: 0;
  font-family: inherit;
  font-weight: 500;
  font-style: normal;
  font-size: inherit;
  letter-spacing: -0.3px;
  line-height: 24px;
  color: var(--text);
}
```

- [ ] **Step 2: Componente CTA**

```tsx
// app/components/framer-about/about-primary-cta.tsx
import Link from "next/link";
import styles from "./framer-about-exact.module.css";

const CTA = "About US";

export function AboutPrimaryCta() {
  const chars = [...CTA];

  return (
    <div className={`ssr-variant hidden-1tqphhv ${styles.ctaRow}`}>
      <div
        className="framer-1ajmrvo-container"
        data-framer-appear-id="1ajmrvo"
      >
        <div className="ssr-variant hidden-12a2gtg">
          <Link
            className={`framer-kFE0a framer-1irdo7w framer-v-1irdo7w framer-dyycq1 ${styles.ctaLink}`}
            data-border="true"
            data-framer-name="Primary"
            href="/about"
            style={{ opacity: 1 }}
          >
            <div
              className="framer-1sl4ib4"
              data-framer-name="Filler"
              style={{
                backgroundColor:
                  "var(--token-9811e40b-3ed8-4237-98e5-61535bb22d2f, rgb(255, 255, 255))",
                borderRadius: "30px",
                transform: "none",
                transformOrigin: "50% 50% 0",
                willChange: "auto",
                opacity: 1,
              }}
            />
            <div className={styles.ctaInner}>
              <p className={styles.rollingTextCta}>
                {chars.map((ch, i) => (
                  <span key={`${ch}-${i}`}>
                    {ch === " " ? "\u00A0" : ch}
                  </span>
                ))}
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Importar CTA en `framer-about-exact.tsx`**

```tsx
import { AboutPrimaryCta } from "./about-primary-cta";
```

Tras `<AboutHeading />`, renderizar `<AboutPrimaryCta />`.

- [ ] **Step 4: Commit**

```bash
git add app/components/framer-about/about-primary-cta.tsx app/components/framer-about/framer-about-exact.module.css app/components/framer-about/framer-about-exact.tsx
git commit -m "feat(about): add primary CTA with rolling uppercase label"
```

---

### Task 6: Integración en la home

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Import y JSX**

```tsx
import { FramerAboutExact } from "@/app/components/framer-about/framer-about-exact";
```

```tsx
<FramerExactNav />
<FramerHeroExact />
<FramerPoweredStrip />
<FramerAboutExact />
```

- [ ] **Step 2: Commit**

```bash
git add app/page.tsx
git commit -m "feat(home): render Framer About section"
```

---

### Task 7: ESLint (validación final)

**Files:**
- (ninguno obligatorio si no hay errores)

- [ ] **Step 1: Ejecutar ESLint en el proyecto**

Run:

```bash
cd /Users/lamnda/Documents/Agencia && npm run lint
```

Expected: exit code 0. Si aparecen avisos por `className` dinámico o `data-framer-appear-id`, corregir en los archivos tocados (p. ej. eslint-disable solo en línea y con justificación si es imprescindible).

- [ ] **Step 2: Commit de correcciones de lint (si aplica)**

```bash
git add -A
git commit -m "chore: fix eslint issues for framer about section"
```

---

## Autorevisión (checklist interno)

1. **Cobertura del HTML:** Menú 4 enlaces con barra/flecha/h2 por letra; párrafo 40px; CTA rolling “About US”; contenedores `ssr-variant` y nombres de clase Framer clave — cubierto en tareas 2–5.
2. **Placeholders:** No quedan pasos “TBD”; la única flexibilidad explícita es el fondo oscuro de `.root` para contraste (decisión visual documentada).
3. **Consistencia:** `href` en Next son absolutos desde la app (`/work`, etc.); tokens locales en `.root` no dependen de redefinir `:root` global de forma incompatible si se usa override por sección.

---

**Plan completo guardado en** `docs/superpowers/plans/2026-04-13-framer-about-section-exact.md`.

**Dos opciones de ejecución:**

1. **Subagent-Driven (recomendado)** — Un subagente por tarea, revisión entre tareas.
2. **Inline Execution** — Ejecutar tareas en esta sesión con el sub-skill `executing-plans` y checkpoints.

¿Cuál prefieres?
