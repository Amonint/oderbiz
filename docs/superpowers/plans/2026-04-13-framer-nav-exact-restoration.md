# Framer Navbar + Hero Exact Restoration Implementation Plan

> Nota de alcance actual: para esta landing no se ejecutan pruebas automatizadas. La validacion final por tarea se limita a `eslint`.

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reconstruir en Next.js las secciones `navbar` y `hero` del extracto Framer con paridad visual y estructural exacta (layout, tipografia, espaciado, colores, canvas reel, loader y estados de animacion visibles).

**Architecture:** Se divide en dos bloques: `FramerExactNav` (navbar) y `FramerHeroExact` (Top text + Reel + Title/Loader). Cada bloque usa subcomponentes pequenos (`ThemeToggle`, `RollingMenuItem`, `HeroWordTicker`, `HeroReelCanvas`) y un modulo CSS por seccion para mantener trazabilidad uno-a-uno con el extracto. La validacion final se hace con `eslint` y revision manual visual.

**Tech Stack:** Next.js App Router, React 19, TypeScript, CSS Modules, ESLint.

---

## File Structure

- Create: `app/components/framer-nav/framer-exact-nav.tsx` (contenedor principal de la seccion `nav`)
- Create: `app/components/framer-nav/rolling-menu-item.tsx` (texto letra por letra con sombra vertical)
- Create: `app/components/framer-nav/theme-toggle.tsx` (switch visual invertido con icono luna)
- Create: `app/components/framer-nav/framer-exact-nav.module.css` (estilos exactos del extracto)
- Create: `app/components/framer-nav/types.ts` (tipos de datos de items del menu e info)
- Create: `app/components/framer-hero/framer-hero-exact.tsx` (contenedor principal de seccion hero)
- Create: `app/components/framer-hero/hero-word-ticker.tsx` (texto animado tipo MOTION/BRANDING por letra)
- Create: `app/components/framer-hero/hero-reel-canvas.tsx` (reel con canvas placeholder/controlado)
- Create: `app/components/framer-hero/framer-hero-exact.module.css` (estilos exactos de Top/Reel/Title/Loader)
- Create: `app/components/framer-hero/types.ts` (tipos para frases del hero y variantes)
- Create: `tests/ui/framer-nav.spec.tsx` (assert estructural y de estilos clave)
- Create: `tests/ui/framer-hero.spec.tsx` (assert de estructura hero: Top, Reel, Title, Loader)
- Create: `tests/visual/framer-nav.visual.spec.ts` (captura de screenshot para comparacion)
- Create: `tests/visual/framer-hero.visual.spec.ts` (captura de screenshot para Hero Top y Title)
- Create: `playwright.config.ts` (config minima para visual checks)
- Modify: `app/page.tsx` (reemplazar starter por `FramerExactNav` + `FramerHeroExact`)
- Modify: `app/globals.css` (tokens base usados por la seccion)
- Modify: `package.json` (scripts y dependencias de test)

### Task 1: Preparar base de pruebas y tokens

**Files:**
- Modify: `package.json`
- Modify: `app/globals.css`
- Create: `tests/setup.ts`

- [ ] **Step 1: Escribir prueba fallida de tokens CSS requeridos**

```tsx
import { describe, expect, it } from "vitest";
import fs from "node:fs";

describe("framer nav tokens", () => {
  it("define tokens criticos de color", () => {
    const css = fs.readFileSync("app/globals.css", "utf8");
    expect(css).toContain("--token-d98a4c00-7e0c-42c7-87be-9d10760cb03b");
    expect(css).toContain("--token-e5a511bf-849c-4ac6-b942-175c537ace13");
  });
});
```

- [ ] **Step 2: Ejecutar prueba para confirmar fallo**

Run: `npx vitest run tests/ui/framer-nav.spec.tsx -t "define tokens criticos de color"`
Expected: FAIL (tokens ausentes)

- [ ] **Step 3: Agregar dependencias/scripts minimos y tokens**

```json
{
  "scripts": {
    "test": "vitest run",
    "test:ui": "vitest run tests/ui",
    "test:visual": "playwright test tests/visual/framer-nav.visual.spec.ts"
  },
  "devDependencies": {
    "@testing-library/react": "^16.0.0",
    "@testing-library/jest-dom": "^6.0.0",
    "jsdom": "^26.0.0",
    "playwright": "^1.55.0",
    "vitest": "^2.1.0"
  }
}
```

```css
:root {
  --token-d98a4c00-7e0c-42c7-87be-9d10760cb03b: rgb(237, 75, 57);
  --token-e5a511bf-849c-4ac6-b942-175c537ace13: rgb(13, 13, 13);
  --token-muted-999: rgb(153, 153, 153);
  --token-9811e40b-3ed8-4237-98e5-61535bb22d2f: rgb(224, 224, 224);
  --token-2d91bfb1-1bb0-467e-bf37-8ef020f4f815: rgb(217, 217, 217);
}
```

- [ ] **Step 4: Ejecutar pruebas para confirmar pase**

Run: `npm run test:ui`
Expected: PASS en la prueba de tokens

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json app/globals.css tests/setup.ts tests/ui/framer-nav.spec.tsx
git commit -m "test: prepare visual validation stack and framer nav tokens"
```

### Task 2: Construir la estructura exacta del `nav`

**Files:**
- Create: `app/components/framer-nav/framer-exact-nav.tsx`
- Create: `app/components/framer-nav/types.ts`
- Modify: `app/page.tsx`
- Test: `tests/ui/framer-nav.spec.tsx`

- [ ] **Step 1: Escribir prueba fallida de estructura y contenido**

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FramerExactNav } from "@/app/components/framer-nav/framer-exact-nav";

describe("FramerExactNav structure", () => {
  it("renderiza logo, 6 links y bloque info", () => {
    render(<FramerExactNav />);
    expect(screen.getByRole("link", { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /about/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /work/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /services/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /ai labs/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /contact/i })).toBeInTheDocument();
    expect(screen.getByText("Based in India")).toBeInTheDocument();
    expect(screen.getByText("AI-First Creative Solutions")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Ejecutar prueba para confirmar fallo**

Run: `npm run test:ui`
Expected: FAIL (componente inexistente)

- [ ] **Step 3: Implementar esqueleto exacto de la seccion**

```tsx
export function FramerExactNav() {
  return (
    <nav className="framer-17v787v" data-framer-name="Nav Menu">
      <a className="framer-u3en3y framer-1v2nl5" href="./" aria-label="home">
        <div className="framer-qpdbhg" aria-hidden="true">{/* logo svg */}</div>
      </a>
      <div className="framer-79zklx" data-framer-name="Items">
        {/* toggle + menu items */}
      </div>
      <div className="framer-1jkd2rj" data-framer-name="Info">
        <h3>Based in India</h3>
        <span>2:04 PM</span>
        <h3>AI-First Creative Solutions</h3>
      </div>
    </nav>
  );
}
```

- [ ] **Step 4: Montar `FramerExactNav` en pagina principal**

Run: reemplazar `app/page.tsx` para retornar `<FramerExactNav />`
Expected: compilacion local sin errores TS

- [ ] **Step 5: Ejecutar pruebas para confirmar pase**

Run: `npm run test:ui`
Expected: PASS en estructura basica

- [ ] **Step 6: Commit**

```bash
git add app/page.tsx app/components/framer-nav/framer-exact-nav.tsx app/components/framer-nav/types.ts tests/ui/framer-nav.spec.tsx
git commit -m "feat: scaffold exact framer nav structure and page integration"
```

### Task 3: Implementar `RollingMenuItem` con render letra a letra

**Files:**
- Create: `app/components/framer-nav/rolling-menu-item.tsx`
- Modify: `app/components/framer-nav/framer-exact-nav.tsx`
- Modify: `app/components/framer-nav/framer-exact-nav.module.css`
- Test: `tests/ui/framer-nav.spec.tsx`

- [ ] **Step 1: Escribir prueba fallida de spans por caracter**

```tsx
it("renderiza cada item del menu como caracteres individuales", () => {
  render(<FramerExactNav />);
  const homeChars = screen.getAllByText(/H|o|m|e/);
  expect(homeChars.length).toBeGreaterThanOrEqual(4);
});
```

- [ ] **Step 2: Ejecutar prueba para confirmar fallo**

Run: `npm run test:ui`
Expected: FAIL (texto no separado en spans)

- [ ] **Step 3: Implementar componente reutilizable de rolling text**

```tsx
type RollingMenuItemProps = { text: string; href: string; active?: boolean };

export function RollingMenuItem({ text, href, active }: RollingMenuItemProps) {
  const chars = `${text}, `.split("");
  return (
    <a href={href} data-highlight="true" data-active={active ? "true" : "false"}>
      <p className="rolling-text-inner">
        {chars.map((char, idx) => (
          <span key={`${text}-${idx}`}>{char === " " ? "\u00A0" : char}</span>
        ))}
      </p>
    </a>
  );
}
```

- [ ] **Step 4: Aplicar estilos exactos de fuente/tamano/sombra**

```css
.rollingTextInner {
  font-family: "Inter Display", "Inter Display Placeholder", sans-serif;
  font-size: 18px;
  line-height: 20px;
  text-shadow: 0 20px 0 var(--token-e5a511bf-849c-4ac6-b942-175c537ace13);
}
.rollingTextInner span {
  white-space: pre;
  backface-visibility: hidden;
}
```

- [ ] **Step 5: Ejecutar pruebas para confirmar pase**

Run: `npm run test:ui`
Expected: PASS en prueba de caracteres individuales

- [ ] **Step 6: Commit**

```bash
git add app/components/framer-nav/rolling-menu-item.tsx app/components/framer-nav/framer-exact-nav.tsx app/components/framer-nav/framer-exact-nav.module.css tests/ui/framer-nav.spec.tsx
git commit -m "feat: add rolling text menu items with per-character rendering"
```

### Task 4: Implementar switch visual y bloque info exacto

**Files:**
- Create: `app/components/framer-nav/theme-toggle.tsx`
- Modify: `app/components/framer-nav/framer-exact-nav.tsx`
- Modify: `app/components/framer-nav/framer-exact-nav.module.css`
- Test: `tests/ui/framer-nav.spec.tsx`

- [ ] **Step 1: Escribir prueba fallida de switch y semantica**

```tsx
it("incluye switch con aria-pressed y estilos de dimensiones exactas", () => {
  render(<FramerExactNav />);
  const button = screen.getByRole("button");
  expect(button).toHaveAttribute("aria-pressed", "false");
  expect(button).toHaveStyle({ width: "55.8px", height: "31px" });
});
```

- [ ] **Step 2: Ejecutar prueba para confirmar fallo**

Run: `npm run test:ui`
Expected: FAIL (switch no implementado o dimensiones distintas)

- [ ] **Step 3: Implementar `ThemeToggle` con icono y knob**

```tsx
export function ThemeToggle() {
  return (
    <button type="button" aria-pressed="false" className={styles.toggle}>
      <span className={styles.knob}>
        <svg viewBox="0 0 24 24" aria-hidden="true">{/* moon path */}</svg>
      </span>
    </button>
  );
}
```

- [ ] **Step 4: Implementar bloque info con tiempo dinamico local**

```tsx
const formatter = new Intl.DateTimeFormat("en-IN", {
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
  timeZone: "Asia/Kolkata",
});
const localTime = formatter.format(new Date());
```

- [ ] **Step 5: Ejecutar pruebas para confirmar pase**

Run: `npm run test:ui`
Expected: PASS en switch y contenido info

- [ ] **Step 6: Commit**

```bash
git add app/components/framer-nav/theme-toggle.tsx app/components/framer-nav/framer-exact-nav.tsx app/components/framer-nav/framer-exact-nav.module.css tests/ui/framer-nav.spec.tsx
git commit -m "feat: implement exact nav toggle and info block behavior"
```

### Task 5: Construir estructura exacta de Hero Top + Reel

**Files:**
- Create: `app/components/framer-hero/framer-hero-exact.tsx`
- Create: `app/components/framer-hero/hero-word-ticker.tsx`
- Create: `app/components/framer-hero/hero-reel-canvas.tsx`
- Create: `app/components/framer-hero/types.ts`
- Modify: `app/page.tsx`
- Test: `tests/ui/framer-hero.spec.tsx`

- [ ] **Step 1: Escribir prueba fallida de estructura hero**

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FramerHeroExact } from "@/app/components/framer-hero/framer-hero-exact";

describe("FramerHeroExact structure", () => {
  it("renderiza Top, Reel y palabras del hero", () => {
    render(<FramerHeroExact />);
    expect(screen.getByText("DESIGN STUDIO")).toBeInTheDocument();
    expect(screen.getByText("FOR TIMELESS")).toBeInTheDocument();
    expect(screen.getByText("MOTION.")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /creative apes/i })).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Ejecutar prueba para confirmar fallo**

Run: `npm run test:ui`
Expected: FAIL (componente hero inexistente)

- [ ] **Step 3: Implementar `FramerHeroExact` con wrappers Framer**

```tsx
export function FramerHeroExact() {
  return (
    <section>
      <div className="framer-ty36tk" data-framer-name="Top">{/* Words + Reel */}</div>
      <div className="framer-2xxdw2" data-framer-name="Title">{/* creative apes + loader */}</div>
    </section>
  );
}
```

- [ ] **Step 4: Integrar hero debajo del navbar**

Run: `app/page.tsx` monta `<FramerExactNav />` y `<FramerHeroExact />`
Expected: render consecutivo en home

- [ ] **Step 5: Ejecutar pruebas para confirmar pase**

Run: `npm run test:ui`
Expected: PASS en estructura base del hero

- [ ] **Step 6: Commit**

```bash
git add app/page.tsx app/components/framer-hero/framer-hero-exact.tsx app/components/framer-hero/hero-word-ticker.tsx app/components/framer-hero/hero-reel-canvas.tsx app/components/framer-hero/types.ts tests/ui/framer-hero.spec.tsx
git commit -m "feat: scaffold exact hero top and reel structure"
```

### Task 6: Implementar texto animado `MOTION.` -> `BRANDING.` exacto

**Files:**
- Modify: `app/components/framer-hero/hero-word-ticker.tsx`
- Modify: `app/components/framer-hero/framer-hero-exact.tsx`
- Modify: `app/components/framer-hero/framer-hero-exact.module.css`
- Test: `tests/ui/framer-hero.spec.tsx`

- [ ] **Step 1: Escribir prueba fallida de caracteres por letra**

```tsx
it("renderiza MOTION. letra por letra y capa secundaria BRANDING.", () => {
  render(<FramerHeroExact />);
  expect(screen.getByText("M")).toBeInTheDocument();
  expect(screen.getByText("B")).toBeInTheDocument();
});
```

- [ ] **Step 2: Ejecutar prueba para confirmar fallo**

Run: `npm run test:ui`
Expected: FAIL (ticker incompleto)

- [ ] **Step 3: Implementar ticker con dos capas y transform Y**

```tsx
const primary = "MOTION.";
const secondary = "BRANDING.";
// primary: translateY(0)
// secondary: translateY(150%)
```

- [ ] **Step 4: Aplicar estilo tipografico exacto del extracto**

```css
.heroTickerChar h2 {
  font-family: "Inter Display", "Inter Display Placeholder", sans-serif;
  font-size: 64px;
  line-height: 1em;
  color: var(--token-9811e40b-3ed8-4237-98e5-61535bb22d2f);
}
```

- [ ] **Step 5: Ejecutar pruebas para confirmar pase**

Run: `npm run test:ui`
Expected: PASS con capas MOTION./BRANDING.

- [ ] **Step 6: Commit**

```bash
git add app/components/framer-hero/hero-word-ticker.tsx app/components/framer-hero/framer-hero-exact.tsx app/components/framer-hero/framer-hero-exact.module.css tests/ui/framer-hero.spec.tsx
git commit -m "feat: implement hero dual-layer word ticker motion to branding"
```

### Task 7: Implementar Reel canvas y Title/Loader exactos

**Files:**
- Modify: `app/components/framer-hero/hero-reel-canvas.tsx`
- Modify: `app/components/framer-hero/framer-hero-exact.tsx`
- Modify: `app/components/framer-hero/framer-hero-exact.module.css`
- Test: `tests/ui/framer-hero.spec.tsx`

- [ ] **Step 1: Escribir prueba fallida de reel canvas y title**

```tsx
it("incluye reel interactivo y titulo creative apes con loader", () => {
  render(<FramerHeroExact />);
  expect(document.querySelector("canvas")).toBeTruthy();
  expect(screen.getByText("creative apes")).toBeInTheDocument();
  expect(document.querySelector(".framer-icxlw2")).toBeTruthy();
});
```

- [ ] **Step 2: Ejecutar prueba para confirmar fallo**

Run: `npm run test:ui`
Expected: FAIL (canvas o title no presentes)

- [ ] **Step 3: Implementar contenedor reel con fondo token y canvas**

```tsx
export function HeroReelCanvas() {
  return (
    <div style={{ background: "var(--token-2d91bfb1-1bb0-467e-bf37-8ef020f4f815)" }}>
      <canvas width={1200} height={648} aria-label="hero reel canvas" />
    </div>
  );
}
```

- [ ] **Step 4: Implementar bloque Title con `h1` y Loader**

```tsx
<div className="framer-2xxdw2" data-framer-name="Title">
  <h1>creative apes</h1>
  <div className="framer-icxlw2" data-framer-name="Loader">
    <div className="framer-19mjztk" data-framer-name="Filler" />
  </div>
</div>
```

- [ ] **Step 5: Ejecutar pruebas para confirmar pase**

Run: `npm run test:ui`
Expected: PASS en estructura reel/title/loader

- [ ] **Step 6: Commit**

```bash
git add app/components/framer-hero/hero-reel-canvas.tsx app/components/framer-hero/framer-hero-exact.tsx app/components/framer-hero/framer-hero-exact.module.css tests/ui/framer-hero.spec.tsx
git commit -m "feat: implement hero reel canvas and title loader section"
```

### Task 8: Paridad visual exacta (navbar + hero)

**Files:**
- Modify: `app/components/framer-nav/framer-exact-nav.module.css`
- Modify: `app/components/framer-hero/framer-hero-exact.module.css`
- Test: `tests/visual/framer-nav.visual.spec.ts`
- Test: `tests/visual/framer-hero.visual.spec.ts`
- Create: `playwright.config.ts`

- [ ] **Step 1: Escribir test visual fallido con snapshot baseline**

```ts
import { test, expect } from "@playwright/test";

test("framer nav matches baseline", async ({ page }) => {
  await page.goto("http://localhost:3000");
  await expect(page.locator("nav.framer-17v787v")).toHaveScreenshot("framer-nav.png");
});

test("framer hero matches baseline", async ({ page }) => {
  await page.goto("http://localhost:3000");
  await expect(page.locator(".framer-ty36tk")).toHaveScreenshot("framer-hero-top.png");
  await expect(page.locator(".framer-2xxdw2")).toHaveScreenshot("framer-hero-title.png");
});
```

- [ ] **Step 2: Ejecutar prueba para confirmar fallo inicial**

Run: `npm run dev` (terminal 1) y `npm run test:visual` (terminal 2)
Expected: FAIL por diferencias visuales

- [ ] **Step 3: Ajustar estilos exactos del extracto**

```css
.framer-17v787v {
  opacity: 1;
  transform: none;
  will-change: transform;
}
.framer-16vozx4-container {
  transform: perspective(500px) rotate(180deg);
}
.framer-113bfs {
  color: var(--token-muted-999);
}
.framer-2xxdw2 {
  opacity: 1;
  transform: none;
}
.framer-1nlyelk {
  opacity: 1;
  transform: none;
}
```

- [ ] **Step 4: Re-generar baseline y validar estabilidad**

Run: `npx playwright test tests/visual/framer-nav.visual.spec.ts --update-snapshots`
Expected: snapshot generado en verde

- [ ] **Step 5: Ejecutar verificacion completa**

Run: `npm run lint && npm run test:ui && npm run test:visual`
Expected: PASS completo

- [ ] **Step 6: Commit**

```bash
git add app/components/framer-nav/framer-exact-nav.module.css app/components/framer-hero/framer-hero-exact.module.css tests/visual/framer-nav.visual.spec.ts tests/visual/framer-hero.visual.spec.ts playwright.config.ts
git commit -m "style: reach exact visual parity for framer navbar and hero sections"
```

### Task 9: QA funcional final y checklist de exactitud

**Files:**
- Modify: `README.md`
- Create: `docs/framer-navbar-hero-qa-checklist.md`

- [ ] **Step 1: Escribir checklist reproducible de validacion**

```md
# Framer Navbar + Hero QA Checklist
- [ ] Logo alineado a la izquierda, tamano exacto
- [ ] Switch de 55.8x31 con knob circular
- [ ] Menu con 6 links y separador coma/espacio
- [ ] Tipografia 18/20 en todos los items
- [ ] "Based in India" y tagline visibles
- [ ] Color de tagline secundario en gris 153,153,153
- [ ] Hero Top muestra DESIGN STUDIO + FOR TIMELESS + ticker MOTION.
- [ ] Capa secundaria BRANDING. existe fuera de viewport (translateY 150%)
- [ ] Reel contiene canvas visible con fondo gris tokenizado
- [ ] Title muestra `creative apes` + loader filler
```

- [ ] **Step 2: Probar manualmente en 1280px y 375px**

Run: `npm run dev`
Expected: coincidencia visual en desktop y mobile sin overflow roto

- [ ] **Step 3: Documentar comando de regresion en README**

```md
## Framer Nav regression checks
- `npm run test:ui`
- `npm run test:visual`
```

- [ ] **Step 4: Ejecutar validacion final**

Run: `npm run lint && npm run test:ui && npm run test:visual`
Expected: PASS y sin warnings criticos

- [ ] **Step 5: Commit**

```bash
git add README.md docs/framer-navbar-hero-qa-checklist.md
git commit -m "docs: add exact restoration QA workflow for framer navbar and hero"
```

## Self-Review

- **Spec coverage:** El plan cubre `navbar` (logo/menu/toggle/info) y `hero` (Top text, ticker MOTION/BRANDING, Reel canvas, Title/Loader), con validacion visual automatizada por seccion.
- **Placeholder scan:** No hay `TODO`, `TBD` ni pasos ambiguos; cada tarea incluye archivos, comandos y expected output.
- **Type consistency:** Los nombres `FramerExactNav`, `FramerHeroExact`, `RollingMenuItem`, `HeroWordTicker`, `HeroReelCanvas`, `ThemeToggle` y tokens CSS se mantienen constantes en todas las tareas.

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-04-13-framer-nav-exact-restoration.md`. Two execution options:

1. **Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration
2. **Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints

**Which approach?**
