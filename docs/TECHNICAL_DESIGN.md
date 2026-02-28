# Technical Design — Luminessa Landing Page

## 1. Stack Tecnológico

| Capa | Tecnología | Versión | Motivo |
|------|-----------|---------|--------|
| Framework | Astro | ^5.x | Static site generation, componentes simples, sin JS innecesario |
| Styling | Tailwind CSS | ^3.x | Utility-first, paleta custom, demuestra conocimiento de industria |
| CSS manual | CSS en `<style>` de cada `.astro` | — | Para efectos y animaciones que Tailwind no cubre |
| Tipografía | Autoalojadas (`public/fonts/`) | — | Cinzel Decorative, EB Garamond, JetBrains Mono — Google Fonts admisible solo en desarrollo para explorar estilos |
| Lenguaje | TypeScript (strict) | — | Type safety en config y componentes |
| Runtime | Node.js | ^22.x | Entorno de desarrollo |
| Package manager | npm | — | Gestión de dependencias |

### Dependencias principales

```json
{
  "astro": "^5.x",
  "@astrojs/tailwind": "^6.x",
  "tailwindcss": "^3.x"
}
```

---

## 2. Paleta de Colores

Inspirada en **Atelier Sophie** — taller de alquimia soleado, cálido, mágico.

| Token Tailwind | HEX | Rol |
|----------------|-----|-----|
| `cream` | `#FDF6E3` | Background principal |
| `parchment` | `#FAF0D7` | Surface — cards, paneles |
| `border` | `#E8D5B0` | Bordes y separadores |
| `ink` | `#3D2B1F` | Texto primario |
| `ink-soft` | `#7A5C44` | Texto secundario, metadata |
| `gold` | `#C9922A` | Accent principal — CTAs, highlights, detalles mágicos |
| `herb` | `#5A8A5E` | Accent — elementos naturales, éxito |
| `mauve` | `#9B6B9B` | Accent — blog, elementos creativos |
| `recipe-blue` | `#4A7BA7` | Accent — links, servicios técnicos |

Definidos en `tailwind.config.mjs` bajo `theme.extend.colors`.

### Modo Oscuro

- **Implementación**: clase `dark` en `<html>` — estrategia `class` de Tailwind (`darkMode: 'class'`)
- **Detección**: `prefers-color-scheme` del SO/navegador al cargar por primera vez
- **Fallback**: modo claro si no se detecta preferencia
- **Toggle manual**: botón en el nav — sobrescribe la detección del sistema
- **Persistencia**: `localStorage` — tiene prioridad sobre `prefers-color-scheme` en visitas posteriores

#### Paleta oscura (tokens definidos)

Inspirada en el modo oscuro del blog Hugo — fondos cálidos oscuros, nunca grises fríos.

| Token Tailwind | HEX | Rol |
|----------------|-----|-----|
| `dark-bg` | `#1E1B16` | Fondo principal (referencia blog Hugo) |
| `dark-surface` | `#26221A` | Surface — cards, paneles |
| `dark-border` | `#3D3529` | Bordes y separadores |
| `dark-ink` | `#E8E0D5` | Texto primario (referencia blog Hugo) |
| `dark-ink-soft` | `#B8A898` | Texto secundario, metadata |

Los accents (`gold`, `herb`, `mauve`, `recipe-blue`) se mantienen igual en modo oscuro — ajustar luminosidad si el contraste lo requiere durante implementación.

---

## 3. Tipografía

| Token Tailwind | Fuente | Uso |
|----------------|--------|-----|
| `font-display` | Cinzel Decorative | Títulos de sección, nombre del sitio, elementos destacados |
| `font-body` | EB Garamond | Texto corriente, párrafos, nav, footer |
| `font-mono` | JetBrains Mono | Snippets de código, elementos técnicos |

Autoalojadas en `public/fonts/`. Definidas en `tailwind.config.mjs` bajo `theme.extend.fontFamily`. Google Fonts solo admisible en desarrollo local para explorar opciones — nunca en producción.

### Jerarquía tipográfica orientativa

```
font-display  → Títulos principales (H1, nombre sección)
font-body     → Todo el resto del texto
font-mono     → Código exclusivamente
```

---

## 4. Estructura de Carpetas

```
luminessa-landing/
├── docs/                         ← Documentación del proyecto
│   ├── REQUIREMENTS.md
│   ├── TECHNICAL_DESIGN.md
│   ├── BUILD_PLAN.md
│   └── PRD_GAP_ANALYSIS.md
├── public/
│   └── fonts/                    ← Fuentes autoalojadas (Cinzel Decorative, EB Garamond, JetBrains Mono)
├── src/
│   ├── site.config.ts            ← Fuente única de verdad de datos del sitio
│   ├── styles/
│   │   └── global.css            ← Imports de fuentes + directivas Tailwind + estilos base
│   ├── layouts/
│   │   └── BaseLayout.astro      ← HTML base, meta tags, Nav, Footer
│   ├── i18n/                     ← Traducciones y configuración de idiomas
│   ├── pages/
│   │   ├── index.astro           ← Redirect a /[lang]/
│   │   ├── 404.astro             ← Página 404 custom
│   │   └── [lang]/
│   │       ├── index.astro       ← Landing (/es/, /en/)
│   │       ├── about.astro       ← About completo (/es/about, /en/about)
│   │       └── proyectos.astro   ← Portfolio (/es/proyectos, /en/proyectos)
│   └── components/
│       ├── layout/
│       │   ├── Nav.astro
│       │   └── Footer.astro
│       ├── sections/             ← Secciones de página completas
│       │   ├── AboutSnippet.astro      ← Primera sección — About breve (sin hero separado)
│       │   ├── ProjectsPreview.astro   ← Oculto hasta tener proyectos
│       │   └── BlogPreview.astro
│       └── shared/               ← Componentes reutilizables pequeños
│           ├── SectionTitle.astro
│           └── ProjectCard.astro
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
└── package.json
```

---

## 5. Internacionalización (i18n)

- **Sistema**: i18n nativo de Astro (`astro:i18n`)
- **Idiomas**: `es` (default), `en`
- **Rutas**: `/es/`, `/en/` — redirect automático desde `/` según idioma del navegador
- **Persistencia**: `localStorage` — el usuario puede cambiar idioma manualmente
- **Strings de UI**: archivos en `src/i18n/` (un objeto por idioma)
- **Contenido externo** (blog preview, proyectos): se muestra en el idioma en que esté, sin traducir
- **Nav y footer**: los labels se traducen; las URLs llevan el prefijo de idioma (`/es/proyectos`, `/en/proyectos`)

```
src/i18n/
  es.ts    ← strings en español
  en.ts    ← strings en inglés
  index.ts ← helper useTranslations()
```

---

## 6. Archivo de Configuración del Sitio

`src/site.config.ts` es la **única fuente de verdad** para todos los datos del sitio. Ningún componente hardcodea URLs, nombres, emails ni textos de contacto.

Los labels traducibles (nav, footer) se gestionan en `src/i18n/` — `site.config.ts` contiene únicamente datos no traducibles (URLs, emails, identificadores).

```ts
export const site = {
  name: string,           // Nombre del sitio (no se traduce)
  url: string,            // URL de producción

  author: {
    name: string,
    email: string,
    discord: string,      // URL completa del perfil
    github: string,       // URL completa del perfil
    forgejo: string,      // URL de la instancia
    blogRss: string,      // URL del feed RSS del blog Hugo
  },

  nav: Array<{
    labelKey: string,     // Clave de traducción en src/i18n/
    href: string,         // Ruta sin prefijo de idioma (se añade en runtime)
    external?: boolean,
  }>,

  footer: {
    taglineKey: string,   // Clave de traducción
    links: Array<{
      labelKey: string,
      href: string,
      external?: boolean,
    }>,
  },
}
```

---

## 7. Componentes — Descripción y Responsabilidades

### Layout

#### `BaseLayout.astro`
- Envuelve todas las páginas
- Incluye `<head>` completo (meta, title, favicon, CSS)
- Monta `<Nav />` y `<Footer />` globalmente
- Props: `title?`, `description?` — con defaults desde `site.config.ts`

#### `Nav.astro`
- Barra horizontal sticky en top
- Logo "Luminessa" a la izquierda → link a `/`
- Links de navegación a la derecha, leídos de `site.nav`
- Link activo resaltado con subrayado dorado (`text-gold border-b border-gold`)
- En mobile: misma barra compacta, sin hamburguesa
- Background: `bg-cream/90` con `backdrop-blur-sm` para efecto cristal sobre contenido al hacer scroll
- **Controles de preferencias** (extremo derecho del nav):
  - Selector de idioma (ES / EN) — desplegable compacto, persiste en `localStorage`
  - Toggle de tema (claro / oscuro) — persiste en `localStorage`
  - Ubicados juntos, visualmente agrupados

#### `Footer.astro`
- Borde superior sutil, fondo `parchment`
- **Elemento decorativo atelier** — separador ornamental o símbolo alquímico en la parte superior del footer (tipo exacto a decidir en implementación, coherente con la sección que precede)
- Tagline a la izquierda, links a la derecha
- Links leídos de `site.footer.links`
- En mobile: columna centrada

### Sections (secciones de página)

#### `AboutSnippet.astro`
- **Primera sección visible de la landing** — sin hero separado
- **Layout: centrado** — espíritu clásico/ceremonial, coherente con la estética atelier
- Nombre, tagline, presentación breve de Sophie
- Quién es, qué estudia (DAW), qué motiva el proyecto
- Tono cálido y personal — no corporativo, sin CTA agresivo
- 2-4 líneas de texto, invitación a explorar el resto

#### `ProjectsPreview.astro`
- **Estado inicial: comentado/oculto en `index.astro`**
- Grid de 3-4 `ProjectCard` destacados
- Link a `/proyectos` al final
- Se activa cuando haya proyectos reales que mostrar

#### `BlogPreview.astro`
- Lee el RSS feed de `site.author.blogRss` en build time
- Muestra 2-3 entradas más recientes: título, fecha, descripción
- Link externo a `blog.luminessa.net`
- Si el feed falla o está vacío: oculta la sección sin errores visibles

### Shared (componentes reutilizables)

#### `SectionTitle.astro`
- Título de sección consistente en toda la web
- Props: `title`, `subtitle?`
- Usa `font-display` para el título

#### `ProjectCard.astro`
- Card individual de proyecto
- Props: `title`, `description`, `technologies: string[]`, `url?`, `repoUrl?`, `image?`
- **Imagen híbrida**: si `image` existe se muestra; si no, fallback elegante con icono/símbolo representativo (tipo exacto a decidir en implementación)
- Usada tanto en `ProjectsPreview` (landing) como en `/proyectos`

---

## 8. Integración con el Blog (RSS)

El blog vive en `blog.luminessa.net` (Hugo, repo separado en Forgejo, autodeploy via Forgejo Actions).

La landing consume el feed RSS en **build time** (no en runtime):

```
fetch(site.author.blogRss)  →  parsear XML  →  extraer 2-3 entradas  →  renderizar estático
```

- El fetch ocurre durante `astro build`, no en el navegador del usuario
- Si el feed no está disponible en build time, `BlogPreview` se oculta
- Formato esperado del feed: RSS 2.0 estándar (Hugo lo genera por defecto en `/index.xml`)

Para mantener el preview actualizado, el build de la landing debe re-ejecutarse cuando se publique un nuevo post. Esto se puede automatizar con un webhook de Forgejo Actions que triggeree el build de la landing. *(Pendiente — fuera del alcance de este repo)*

---

## 9. Efectos Visuales y Animaciones

### Filosofía
- **Nivel**: Moderados — sutiles con toques elaborados. La landing debe dejar impresión al entrar.
- **Espíritu**: web clásica — elegancia atemporal, no tendencias modernas al 100%
- **Concepto**: Transportan al universo del atelier sin distraer del contenido
- **Sorpresa caprichosa**: Efectos normalmente contenidos, pero ocasionalmente se "magnifican" como si la magia hubiera tenido más efecto de lo esperado. Crea deleite sin ser predecible.
- **Decoración contextual**: cada sección define sus propios elementos decorativos según su propósito:
  - Separadores ornamentales (✦, ❧, rombos...) entre secciones
  - Bordes decorativos / esquinas ornamentadas en cards
  - Iconografía alquímica SVG (frascos, estrellas, runas, plantas)
  - Patrones de fondo tipo pergamino/papel envejecido donde proceda

### Implementación
- Transiciones base: Tailwind (`transition-colors`, `transition-transform`, `duration-200`)
- Efectos especiales y animaciones más elaboradas: CSS manual en `<style>` del componente correspondiente
- JavaScript de animación: mínimo o nulo — preferir CSS puro

### Ejemplos orientativos
- Hover en links del nav: cambio de color suave (Tailwind)
- Hover en cards de proyecto: elevación sutil + sombra (Tailwind)
- Ocasionalmente: un hover que desencadena algo más dramático — partícula, brillo, desplazamiento inesperado (CSS manual)

*(Los efectos específicos se definirán durante FASE 4)*

---

## 10. Infraestructura y Deploy

| Elemento | Decisión |
|----------|----------|
| Servidor | VPS único para todo el ecosistema (Forgejo, blog, landing, Umami) |
| Servidor web | Caddy — reverse proxy + HTTPS automático |
| CI/CD | Forgejo Actions (ya configurado) |
| Rama staging | `dev` → staging |
| Rama producción | `main` → producción |
| Actualizaciones de deps | Renovate — PRs automáticos |

### Notas de deploy
- Build: `astro build` → genera `dist/` estático → Caddy sirve el directorio
- Webhook futuro: build de la landing se triggerea cuando el blog de Hugo publica un nuevo post (fuera del alcance de este repo)

---

## 11. Rendimiento

| Target | Valor |
|--------|-------|
| Lighthouse inicial | ≥ 90 en todas las categorías |
| Lighthouse objetivo | ≥ 95 (iterativo, fase post-lanzamiento) |
| Core Web Vitals | Cubiertos por el target de Lighthouse |

---

## 12. Accesibilidad

Enfoque iterativo:
1. **Fase actual**: funcional — contraste básico, alt text, navegación por teclado no rota
2. **Post-lanzamiento**: WCAG 2.1 AA
3. **Objetivo largo plazo**: apuntar a WCAG 2.1 AAA

---

## 13. Convenciones de Código

- Archivos de componentes: `PascalCase.astro`
- Archivos de páginas: `kebab-case.astro`
- Clases Tailwind: ordenadas por categoría (layout → spacing → typography → color → effects)
- Sin JavaScript en componentes salvo que sea estrictamente necesario
- TypeScript en frontmatter de `.astro` y en archivos `.ts`
- Imports siempre con rutas relativas explícitas (sin alias `@/` por ahora)
