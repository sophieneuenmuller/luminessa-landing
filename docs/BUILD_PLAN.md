# Build Plan — Luminessa Landing Page

## Estado General

| Fase | Nombre | Estado |
|------|--------|--------|
| 1 | Planificación Detallada | ✅ Completa |
| 2 | Setup Inicial | ✅ Completa |
| 3 | Componentes Base | 🔄 En progreso |
| 4 | Contenido y Efectos | ⏳ Pendiente |
| 5 | Refinamiento y Deploy | ⏳ Pendiente |

---

## FASE 1 — Planificación Detallada ✅

Todas las decisiones tomadas y documentadas antes de escribir código.

**Criterio de salida**: todos los documentos (REQUIREMENTS, TECHNICAL_DESIGN, BUILD_PLAN, PRD_GAP_ANALYSIS) completos y sin preguntas abiertas.

- [x] Estructura de páginas definida (`/[lang]/`, `/[lang]/proyectos`, blog externo)
- [x] i18n decidido: ES/EN con rutas `/es/` y `/en/`, detección por navegador, persistencia en localStorage
- [x] Navegación decidida (horizontal compacta, sin hamburguesa)
- [x] Contacto/sociales: en footer global, no página propia
- [x] Paleta de colores definida (9 tokens, inspirada en Atelier Sophie)
- [x] Tipografía definida (Cinzel Decorative, EB Garamond, JetBrains Mono) — autoalojadas en producción
- [x] Hero descartado — landing arranca directamente con About breve (espíritu web clásica)
- [x] Página `/about` completa añadida a la estructura
- [x] ProjectCard decidido: híbrido imagen+fallback con icono/símbolo
- [x] Página 404 custom con personalidad atelier
- [x] Decoración: sutil con toques elaborados, contextual por sección
- [x] Lista de componentes definida
- [x] Integración blog via RSS decidida (build time, no runtime)
- [x] Analytics: Umami self-hosted, cookieless, panel público
- [x] SEO: indexable, OG estático de momento
- [x] Infraestructura: VPS único, Caddy, Forgejo Actions, Renovate
- [x] Targets de calidad: Lighthouse ≥90 → ≥95, accesibilidad iterativa
- [x] Documentos de Requirements, Technical Design, Build Plan y PRD Gap Analysis redactados y completos

---

## FASE 2 — Setup Inicial ✅

Proyecto Astro funcional con Tailwind configurado.

**Criterio de salida**: `astro build` sin errores, estructura de carpetas completa, fuentes cargando correctamente.

- [x] `package.json` con scripts (`dev`, `build`, `preview`)
- [x] Astro instalado (`astro ^5.x`)
- [x] Tailwind instalado y configurado (`@astrojs/tailwind`, `tailwindcss ^3.x`)
- [x] `astro.config.mjs` con integración Tailwind
- [x] `tailwind.config.mjs` con paleta de colores y tipografías custom
- [x] `src/styles/global.css` con directivas Tailwind (fuentes: Google Fonts en dev, migrar a autoalojadas antes de producción)
- [x] `src/site.config.ts` — fuente única de verdad de datos del sitio
- [x] `src/layouts/BaseLayout.astro` — layout base con meta tags
- [x] `src/pages/index.astro` — página de inicio (placeholder)
- [x] Estructura de carpetas creada
- [x] Build sin errores ni warnings verificado
- [ ] **Pendiente**: migrar fuentes a `public/fonts/` (autoalojadas) antes de FASE 5

---

## FASE 3 — Componentes Base 🔄

Construir todos los componentes sin contenido real todavía — estructura y estilos.

**Criterio de salida**: todos los componentes renderizan sin errores, son visualmente coherentes con la paleta y tipografía, y pasan revisión visual en desktop y mobile (375px mínimo).

### i18n y Tema

- [ ] Configurar i18n nativo de Astro (rutas `/es/`, `/en/`)
- [ ] Archivo(s) de traducciones con strings de UI (`src/i18n/es.ts`, `src/i18n/en.ts`)
- [ ] Detección de idioma por navegador + persistencia en `localStorage`
- [ ] Redirect desde `/` al idioma detectado
- [ ] Configurar modo oscuro: estrategia `class` en Tailwind, clase `dark` en `<html>`
- [ ] Detección de `prefers-color-scheme` + fallback a claro
- [ ] Persistencia de tema en `localStorage`

### Layout

- [x] `Nav.astro` — barra horizontal sticky, lee de `site.config.ts`
- [x] `Footer.astro` — modular, lee de `site.config.ts`
- [ ] `BaseLayout.astro` — revisar integración Nav/Footer, añadir soporte i18n y modo oscuro
- [ ] Selector de idioma en Nav — desplegable compacto, persistencia en `localStorage`
- [ ] Toggle de tema en Nav — junto al selector de idioma, persistencia en `localStorage`

### Shared

- [ ] `SectionTitle.astro` — título de sección reutilizable (props: `title`, `subtitle?`)
- [ ] `ProjectCard.astro` — card de proyecto (props: `title`, `description`, `technologies`, `url?`, `repoUrl?`, `image?`) con fallback icono/símbolo

### Sections — Landing

- [ ] `AboutSnippet.astro` — primera sección, nombre + tagline + presentación breve (sin hero separado)
- [ ] `ProjectsPreview.astro` — grid de ProjectCards (**oculto por defecto**, comentado en `index.astro`)
- [ ] `BlogPreview.astro` — 2-3 entradas del RSS feed de Hugo

### Páginas

- [ ] `src/pages/[lang]/index.astro` — landing con todas las secciones
- [ ] `src/pages/[lang]/about.astro` — about completo
- [ ] `src/pages/[lang]/proyectos.astro` — portfolio con placeholder elegante + animación curiosa (estado vacío)
- [ ] `src/pages/404.astro` — página 404 custom con personalidad atelier

---

## FASE 4 — Contenido y Efectos ⏳

Añadir contenido real y las animaciones/efectos visuales.

**Criterio de salida**: contenido real en todos los componentes, efectos visuales implementados, sitio listo para revisión final antes de deploy.

### Contenido

- [ ] Texto real del About breve (landing) — en ES y EN
- [ ] Texto real del About completo (`/about`) — en ES y EN
- [ ] Verificar RSS feed de `blog.luminessa.net` — confirmar URL (`/index.xml` o `/feed.xml`)
- [ ] Actualizar placeholders en `site.config.ts` (Discord ID, GitHub username)
- [ ] Favicon (`public/favicon.svg`)
- [ ] OG image estática (para redes sociales)

### Efectos y Animaciones

- [ ] Transiciones hover en Nav (ya parcialmente con Tailwind)
- [ ] Hover en `ProjectCard` — elevación sutil
- [ ] Elementos decorativos por sección (separadores ornamentales, iconografía alquímica, patrones)
- [ ] Efectos "caprichosos" ocasionales (CSS manual) — definir cuáles y dónde durante implementación
- [ ] Transiciones entre secciones si procede

### Umami

- [ ] Añadir script de Umami al `BaseLayout.astro`
- [ ] Verificar que el tracking funciona en staging
- [ ] Banner informativo (no bloqueante) con link al panel público

---

## FASE 5 — Refinamiento y Deploy ⏳

**Criterio de salida**: Lighthouse ≥90 en todas las categorías, sitio accesible en `luminessa.net`, deploy automático funcionando.

### Testing

- [ ] Testing responsive — 375px, tablet, desktop (~1024px)
- [ ] Verificar en navegadores modernos (Chrome, Firefox, Safari)
- [ ] Verificar que el RSS feed se parsea correctamente en build
- [ ] Lighthouse — objetivo ≥90 (Performance, Accessibility, Best Practices, SEO)
- [ ] Revisión accesibilidad básica (contraste, alt text, navegación por teclado)

### Optimizaciones

- [ ] Migrar fuentes de Google Fonts a autoalojadas en `public/fonts/`
- [ ] Imágenes optimizadas si las hay (`<Image />` de Astro)
- [ ] Meta tags completos (OG, Twitter card)
- [ ] `robots.txt`
- [ ] `sitemap.xml` con rutas de ambos idiomas (`/es/`, `/en/`) y `hreflang`

### Deploy

- [ ] Configurar Forgejo Actions: pipeline `dev` → staging, `main` → producción
- [ ] Configurar Caddy para servir `luminessa.net` desde el `dist/` generado
- [ ] Verificar HTTPS automático con Caddy
- [ ] Opcional: webhook desde el blog de Hugo para re-triggerear build de la landing al publicar posts
- [ ] Configurar Renovate para PRs automáticos de dependencias
- [ ] Verificar dominio `luminessa.net` apuntando correctamente

---

## Notas Transversales

- **`site.config.ts`** es la única fuente de verdad — cualquier dato del sitio se edita ahí
- **`ProjectsPreview`** arranca oculto (comentado en `index.astro`) — se activa cuando haya proyectos reales
- **Los efectos caprichosos** se implementan en FASE 4, no antes
- **El blog** es un proyecto completamente separado — este repo solo lo consume via RSS
- **Desktop-first** pero siempre verificar mobile antes de considerar algo terminado
