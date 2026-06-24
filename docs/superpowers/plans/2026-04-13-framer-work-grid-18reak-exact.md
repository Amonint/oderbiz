# Framer Work Grid (`framer-18reak`) — Plan de implementación exacta

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

> **Validación:** No hay suite de tests en el repo. Tras cada tarea, validar con `npm run lint` (tarea final obligatoria).

**Goal:** Reproducir el bloque `div.framer-18reak` > `div.framer-62qbuw` con **6 tarjetas enlace** (`a.framer-1lfswo.framer-lux5qc`), cada una con título `h4` (preset `p2sl1o` / `CZm_OeNEw`), subtítulo `h6` (preset `5i8emc` / `tb6OyQMXK`), letras en `span` por carácter, `div.framer-227wem`, y bloque `div.framer-1klr08c` con `transform: scale(...)` + contenedor `framer-22dy18-container` + **canvas Three.js r136** sobre fondo `var(--token-2d91bfb1-1bb0-467e-bf37-8ef020f4f815, rgb(217, 217, 217))`, dimensiones internas 1168×1176 y **CSS** 584×588 como en el extracto.

**Architecture:** Un componente de sección `FramerWorkGridExact` con CSS Modules. Datos de las 6 obras en un módulo `work-grid-items.ts` (href Next, grupos de palabras para `nowrap`, escala del preview). Subcomponente cliente `WorkGridCanvas` que monta **Three.js 0.136.x** (misma familia que `data-engine="three.js r136"`) en un `<canvas>` con los atributos del HTML. Utilidades puras `splitToLetterSpans` para no repetir JSX. Sin tests automatizados; ESLint al cierre.

**Tech Stack:** Next.js App Router, React 19, TypeScript, CSS Modules, `next/link`, `three@0.136.0`, ESLint.

---

## Estructura de archivos

| Archivo | Responsabilidad |
|---------|-----------------|
| `app/components/framer-work-grid/work-grid-items.ts` | Constantes: 6 entradas con `href`, `titleGroups`, `serviceGroups`, `previewScale` |
| `app/components/framer-work-grid/letter-spans.tsx` | Renderiza `h4`/`h6` con la misma jerarquía de `span` (nowrap + inline-block por letra) |
| `app/components/framer-work-grid/work-grid-canvas.tsx` | Cliente: `useEffect` + Three.js WebGL, `data-engine="three.js r136"`, estilos canvas |
| `app/components/framer-work-grid/framer-work-grid-exact.tsx` | Contenedor `framer-18reak` / `framer-62qbuw`, map de tarjetas |
| `app/components/framer-work-grid/framer-work-grid-exact.module.css` | Grid, proporciones de tarjeta, presets visuales, `framer-227wem`, escalas |
| `package.json` | Añadir dependencia `three@0.136.0` |
| `app/page.tsx` | Renderizar la sección (recomendado: después de `FramerAboutExact`) |

---

### Task 1: Dependencia Three.js y tipos

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Instalar Three r136**

Run:

```bash
cd /Users/lamnda/Documents/Agencia && npm install three@0.136.0
```

Expected: `package.json` y `package-lock.json` actualizados con `"three": "0.136.0"`.

- [ ] **Step 2: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add three 0.136.0 for work grid canvas parity"
```

---

### Task 2: Datos de las 6 obras (extracto 1:1)

**Files:**
- Create: `app/components/framer-work-grid/work-grid-items.ts`

- [ ] **Step 1: Crear el archivo con tipos y constantes**

```typescript
// app/components/framer-work-grid/work-grid-items.ts

export type WorkGridItem = {
  href: string;
  /** Grupos de caracteres; cada grupo se envuelve en un span con white-space:nowrap */
  titleGroups: string[];
  /** Palabras/frases en grupos nowrap; usar " " como elemento para espacio entre grupos si hace falta */
  serviceGroups: string[];
  /** style.transform scale en framer-1klr08c */
  previewScale: number;
};

export const WORK_GRID_ITEMS: readonly WorkGridItem[] = [
  {
    href: "/work/groww-ipo-launch-video",
    titleGroups: ["Groww"],
    serviceGroups: ["Launch", "Video", "Campaign"],
    previewScale: 0.939116,
  },
  {
    href: "/work/cult-smartwatch-launch-video",
    titleGroups: ["Cult"],
    serviceGroups: ["Smartwatch", "Launch", "Video"],
    previewScale: 0.939116,
  },
  {
    href: "/work/arovalis-brand-identity-packaging-design",
    titleGroups: ["Arovalis"],
    serviceGroups: ["Brand", "Identity", "Design"],
    previewScale: 0.8,
  },
  {
    href: "/work/pure-project-branding-packaging-design",
    titleGroups: ["Pure", "Project"],
    serviceGroups: ["Brand", "Identity", "&", "Packaging", "Design"],
    previewScale: 0.8,
  },
  {
    href: "/work/slice-feature-launch-commercial",
    titleGroups: ["Slice"],
    serviceGroups: ["Feature", "Launch", "Commercial"],
    previewScale: 0.8,
  },
  {
    href: "/work/maddrop-website-design-development",
    titleGroups: ["MadDrop"],
    serviceGroups: ["Website", "Design", "&", "Development"],
    previewScale: 0.8,
  },
] as const;
```

- [ ] **Step 2: Commit**

```bash
git add app/components/framer-work-grid/work-grid-items.ts
git commit -m "feat(work-grid): add Framer work grid item data"
```

---

### Task 3: Utilidad de spans por letra (h4 / h6)

**Files:**
- Create: `app/components/framer-work-grid/letter-spans.tsx`

- [ ] **Step 1: Implementar componentes de título y subtítulo**

```tsx
// app/components/framer-work-grid/letter-spans.tsx
import type { ReactNode } from "react";

const letterSpanStyle = {
  display: "inline-block",
  opacity: 1,
  transform: "none",
  willChange: "transform",
} as const;

function letters(word: string): ReactNode[] {
  return [...word].map((ch, i) => (
    <span key={i} style={letterSpanStyle}>
      {ch}
    </span>
  ));
}

export function TitleLetterSpans({ groups }: { groups: string[] }) {
  return (
    <>
      {groups.map((g, gi) => (
        <span key={gi}>
          {gi > 0 ? <span> </span> : null}
          <span style={{ whiteSpace: "nowrap" }}>{letters(g)}</span>
        </span>
      ))}
    </>
  );
}

export function ServiceLetterSpans({ groups }: { groups: string[] }) {
  const nodes: ReactNode[] = [];
  groups.forEach((g, gi) => {
    if (gi > 0) {
      nodes.push(<span key={`sp-${gi}`}> </span>);
    }
    nodes.push(
      <span key={gi} style={{ whiteSpace: "nowrap" }}>
        {letters(g)}
      </span>,
    );
  });
  return <>{nodes}</>;
}
```

- [ ] **Step 2: Commit**

```bash
git add app/components/framer-work-grid/letter-spans.tsx
git commit -m "feat(work-grid): letter span helpers for h4/h6"
```

---

### Task 4: Canvas Three.js (cliente)

**Files:**
- Create: `app/components/framer-work-grid/work-grid-canvas.tsx`

- [ ] **Step 1: Cliente con escena mínima WebGL**

```tsx
"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function WorkGridCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const width = 1168;
    const height = 1176;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(typeof window !== "undefined" ? window.devicePixelRatio : 1);
    renderer.setSize(width, height, false);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xd9d9d9);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 4;

    const geometry = new THREE.BoxGeometry(1.2, 1.2, 1.2);
    const material = new THREE.MeshNormalMaterial();
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let frame = 0;
    const animate = () => {
      frame = requestAnimationFrame(animate);
      mesh.rotation.x += 0.008;
      mesh.rotation.y += 0.012;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frame);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      data-engine="three.js r136"
      width={1168}
      height={1176}
      ref={ref}
      style={{
        display: "block",
        width: "584px",
        height: "588px",
      }}
    />
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/components/framer-work-grid/work-grid-canvas.tsx
git commit -m "feat(work-grid): add Three r136 canvas placeholder per Framer export"
```

---

### Task 5: CSS Module (grid, presets, tarjeta)

**Files:**
- Create: `app/components/framer-work-grid/framer-work-grid-exact.module.css`

- [ ] **Step 1: Añadir estilos**

```css
/* app/components/framer-work-grid/framer-work-grid-exact.module.css */
.root {
  width: 100%;
  box-sizing: border-box;
}

.inner {
  width: 100%;
  box-sizing: border-box;
  padding: 0 24px 48px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px;
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
}

@media (max-width: 900px) {
  .grid {
    grid-template-columns: 1fr;
  }
}

.cardLink {
  display: block;
  text-decoration: none;
  color: inherit;
  box-sizing: border-box;
}

.cardInner {
  display: flex;
  flex-direction: column;
  gap: 0;
  width: 100%;
}

.textColumn {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
}

.titleWrap {
  transform: none;
}

.servicesWrap {
  transform: none;
}

.titlePreset {
  margin: 0;
  font-family: "Inter Display", "Inter Display Placeholder", sans-serif;
  font-size: clamp(28px, 4vw, 48px);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: 0;
  color: var(--token-e5a511bf-849c-4ac6-b942-175c537ace13, rgb(13, 13, 13));
}

.servicesPreset {
  margin: 0;
  font-family: "Inter Display", "Inter Display Placeholder", sans-serif;
  font-size: 14px;
  font-weight: 700;
  line-height: 1.3;
  letter-spacing: 0;
  color: var(--token-e5a511bf-849c-4ac6-b942-175c537ace13, rgb(13, 13, 13));
}

.spacer227 {
  width: 100%;
  will-change: transform;
  opacity: 1;
  transform: none;
}

.previewShell {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  will-change: transform;
  opacity: 1;
}

.canvasHost {
  width: 100%;
  height: 100%;
  background: var(
    --token-2d91bfb1-1bb0-467e-bf37-8ef020f4f815,
    rgb(217, 217, 217)
  );
  overflow: hidden;
  cursor: pointer;
}
```

- [ ] **Step 2: Commit**

```bash
git add app/components/framer-work-grid/framer-work-grid-exact.module.css
git commit -m "style(work-grid): layout and typography presets for work cards"
```

---

### Task 6: Ensamblaje `FramerWorkGridExact`

**Files:**
- Create: `app/components/framer-work-grid/framer-work-grid-exact.tsx`

- [ ] **Step 1: Implementar el contenedor y las tarjetas**

```tsx
// app/components/framer-work-grid/framer-work-grid-exact.tsx
import Link from "next/link";
import { ServiceLetterSpans, TitleLetterSpans } from "./letter-spans";
import styles from "./framer-work-grid-exact.module.css";
import { WORK_GRID_ITEMS } from "./work-grid-items";
import { WorkGridCanvas } from "./work-grid-canvas";

export function FramerWorkGridExact() {
  return (
    <div className={`framer-18reak ${styles.root}`}>
      <div className={`framer-62qbuw ${styles.inner}`}>
        <div className="ssr-variant hidden-12a2gtg hidden-1tqphhv">
          <div className={styles.grid}>
            {WORK_GRID_ITEMS.map((item) => (
              <Link
                key={item.href}
                className="framer-1lfswo framer-lux5qc"
                href={item.href}
              >
                <div className="framer-1xcv0fb">
                  <div className="framer-t1w6l5" data-framer-name="text">
                    <div
                      className="framer-1d1we3i"
                      data-framer-name="Title"
                      style={{ transform: "none" }}
                      data-framer-component-type="RichTextContainer"
                    >
                      <h4
                        className="framer-text framer-styles-preset-p2sl1o"
                        data-styles-preset="CZm_OeNEw"
                      >
                        <TitleLetterSpans groups={item.titleGroups} />
                      </h4>
                    </div>
                    <div
                      className="framer-1v17aec"
                      data-framer-name="Services"
                      style={{ transform: "none" }}
                      data-framer-component-type="RichTextContainer"
                    >
                      <h6
                        className="framer-text framer-styles-preset-5i8emc"
                        data-styles-preset="tb6OyQMXK"
                      >
                        <ServiceLetterSpans groups={item.serviceGroups} />
                      </h6>
                    </div>
                  </div>
                  <div
                    className={`framer-227wem ${styles.spacer227}`}
                  />
                </div>
                <div
                  className={`framer-1klr08c ${styles.previewShell}`}
                  style={{
                    willChange: "transform",
                    opacity: 1,
                    transform: `scale(${item.previewScale})`,
                  }}
                >
                  <div
                    className="framer-22dy18-container hidden-1tqphhv hidden-12a2gtg"
                    data-code-component-plugin-id="84d4c1"
                    data-framer-cursor="1azdmuu"
                  >
                    <div className={styles.canvasHost}>
                      <WorkGridCanvas />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/components/framer-work-grid/framer-work-grid-exact.tsx
git commit -m "feat(work-grid): compose Framer 18reak work grid section"
```

---

### Task 7: Integración en la página

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Importar y colocar la sección**

Añadir:

```tsx
import { FramerWorkGridExact } from "@/app/components/framer-work-grid/framer-work-grid-exact";
```

Colocar `<FramerWorkGridExact />` **después** de `<FramerAboutExact />` y **antes** de `<FramerPoweredStrip />` (orden sugerido para flujo landing; si el diseño Framer coloca el grid en otro punto, mover solo esta línea).

Ejemplo:

```tsx
<FramerExactNav />
<FramerHeroExact />
<FramerAboutExact />
<FramerWorkGridExact />
<FramerPoweredStrip />
```

- [ ] **Step 2: Commit**

```bash
git add app/page.tsx
git commit -m "feat(home): render Framer work grid section"
```

---

### Task 8: ESLint

**Files:**
- (archivos tocados si el linter marca algo)

- [ ] **Step 1: Ejecutar ESLint**

Run:

```bash
cd /Users/lamnda/Documents/Agencia && npm run lint
```

Expected: código de salida 0.

- [ ] **Step 2: Commit de correcciones (si aplica)**

```bash
git add -A
git commit -m "chore: fix eslint for work grid"
```

---

## Autorevisión

1. **Cobertura del HTML:** Seis enlaces con mismas clases, `h4`/`h6` con presets y letras en `span`, `framer-227wem`, `framer-1klr08c` con escala por ítem, contenedor plugin y canvas 1168×1176 con estilo 584×588 — cubierto.
2. **Placeholders:** Sin “TBD”; la escena 3D es un cubo con `MeshNormalMaterial` como stand-in hasta tener assets GLTF del sitio original (si se requiere paridad de contenido 3D, sustituir geometría en `work-grid-canvas.tsx` en una tarea aparte).
3. **Consistencia:** `href` usan rutas absolutas de app (`/work/...`); escalas coinciden con el extracto (dos primeras `0.939116`, resto `0.8`).

---

**Plan completo guardado en** `docs/superpowers/plans/2026-04-13-framer-work-grid-18reak-exact.md`.

**Dos opciones de ejecución:**

1. **Subagent-Driven (recomendado)** — Un subagente por tarea, revisión entre tareas.
2. **Inline Execution** — Ejecutar tareas en esta sesión con checkpoints.

¿Cuál prefieres?
