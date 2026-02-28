# Requirements — Luminessa Landing Page

## 1. ¿Qué es Luminessa?

Luminessa es un ecosistema digital personal autohospedado. No es un producto comercial ni un servicio B2B. Es el hub digital de Sophie: un espacio donde convergen su portfolio, su blog de aprendizaje, y sus servicios públicos autohospedados.

El tema transversal del ecosistema es **Sophie's Atelier** — un taller de alquimia como metáfora del aprendizaje, la experimentación y la creación.

---

## 2. Audiencia

| Tipo | Descripción |
|------|-------------|
| **Primaria** | Sophie — hub personal, referencia propia, aprendizaje en público |
| **Secundaria** | Desarrolladores y comunidad técnica — portfolio, colaboración, exploración |

---

## 3. Tono y Posicionamiento

- "Estudiante de DAW aprendiendo en público"
- Técnicamente competente sin pretensiones corporativas
- Estética *cozy alchemy workshop* — cálida, mágica, personal
- Soberanía digital y self-hosting como valores implícitos (no proclamados)
- Cercana, con personalidad, no genérica

---

## 4. Lo que NO es este sitio

- ❌ No tiene pricing ni planes
- ❌ No ofrece servicios B2B ni enterprise
- ❌ No es una landing de captación de clientes
- ❌ No hay sección de hiring ni investment pitch
- ❌ No pretende escalar en contenido de forma significativa

---

## 5. Idioma e Internacionalización

- **Bilingüe**: ES/EN con i18n nativo de Astro
- **Rutas**: `/es/` para español, `/en/` para inglés
- **Detección automática**: idioma del navegador → español = ES, resto = EN
- **Persistencia**: `localStorage`
- **Contenido externo** (blog preview, proyectos externos): se muestra en el idioma en que esté, sin traducir
- **Objetivo real**: demostrar conocimiento de i18n, no perfeccionismo de coordinación total

---

## 6. Estructura de Páginas

```
luminessa.net/[lang]/            → Landing principal
luminessa.net/[lang]/about       → About completo
luminessa.net/[lang]/proyectos   → Portfolio completo
blog.luminessa.net               → Blog (Hugo, proyecto separado — no forma parte de este repo)
git.luminessa.net                → Forgejo (servicio externo)
```

### 6.1 Landing (`/[lang]/`)

Página principal. Arranca directamente con contenido — sin hero separado, siguiendo el espíritu de las webs personales clásicas. Secciones en orden:

1. **About breve** — Primera sección. Nombre, tagline, quién es Sophie, qué es el atelier. 2-4 líneas, invitación a explorar.
2. **Proyectos destacados** — Grid de 3-4 proyectos. Oculto hasta tener proyectos reales. Link a `/proyectos`. Link de nav desactivado hasta que haya proyectos.
3. **Blog preview** — 2-3 entradas recientes leídas del RSS feed de `blog.luminessa.net`. Link al blog externo.
4. **Footer global** — Email, Forgejo, Discord, GitHub. Tagline del atelier.

### 6.2 About (`/[lang]/about`)

About completo para quien quiera profundizar. Más detalle que el snippet de la landing — formación, motivaciones, el atelier como concepto, servicios del ecosistema.

### 6.3 Proyectos (`/[lang]/proyectos`)

Portfolio completo. Lista de proyectos con cards individuales.

- **Estado vacío**: placeholder elegante + animación curiosa (no página en blanco ni error)
- Se activa con proyectos reales cuando los haya

### 6.4 Blog

**Externo.** Vive en `blog.luminessa.net` bajo Hugo. Este repo solo consume el RSS feed para mostrar un preview en la landing. No hay rutas `/blog` ni `/blog/[slug]` en este proyecto.

---

## 7. Contenido por Sección

### About breve (landing)
- Nombre: Sophie
- Rol/descripción: Estudiante de DAW, aprendiendo en público
- Tagline del sitio: a definir con contenido real
- Tono cálido y personal — no corporativo
- Sin CTA agresivo — invitación a explorar
- Sin hero separado — arranca directamente con contenido

### About completo (`/about`)
- Versión extendida del about breve
- Criterios iniciales de contenido (revisitar durante implementación):
  - Quién es Sophie
  - Dónde encontrarla en internet / cómo contactar
  - El propósito de Luminessa y el concepto del atelier
  - Qué servicios están alojados en el ecosistema (Forgejo, blog, Umami...)
- **Nota**: estos criterios son orientativos — revisitar y refinar durante la implementación de la página

### Proyectos destacados
- Máximo 3-4 cards visibles en landing
- Cada card: título, descripción breve, tecnologías usadas, link al proyecto
- **Imagen**: opcional (híbrido) — si existe se muestra, si no hay fallback elegante con icono/símbolo
- Estado inicial: **oculto** con comentario en código, listo para activar

### Blog preview
- 2-3 entradas más recientes
- Cada entrada: título, fecha, descripción breve
- Fuente: RSS feed de `blog.luminessa.net/index.xml`
- Link externo al blog completo
- Si el feed falla o está vacío: sección oculta con gracia (sin errores visibles)

### Footer
- Tagline: *"Sophie's Atelier — hecho con curiosidad y caffeine ✨"*
- Links: sophie@luminessa.net, Forgejo, Discord, GitHub
- Modular: añadir/quitar links editando solo `src/site.config.ts`

---

## 8. Navegación

- **Nav horizontal compacta** — visible en todas las páginas, sticky en top
- Logo/nombre "Luminessa" a la izquierda → link a `/`
- Links a la derecha: About · Proyectos · Blog
- Link a Proyectos: **oculto** hasta que haya proyectos reales (fácil de re-añadir)
- En mobile: misma barra, texto/padding compacto — sin menú hamburguesa
- Link activo: indicado visualmente (subrayado dorado)
- Blog abre en nueva pestaña (externo)
- **Selector de idioma**: en el nav, junto al selector de tema — desplegable o toggle compacto
- **Selector de tema**: en el nav, junto al selector de idioma — toggle claro/oscuro
- Ambos selectores persisten en `localStorage` entre sesiones

---

## 9. Tema Visual (Claro / Oscuro)

- **Por defecto**: si no se detecta preferencia del sistema → modo claro
- **Detección automática**: `prefers-color-scheme` del navegador/SO → respetar si existe
- **Toggle manual**: botón en el nav, junto al selector de idioma, para cambiar libremente
- **Persistencia**: preferencia guardada en `localStorage` — sobrescribe la detección del sistema en visitas posteriores
- **Paleta oscura**: a definir durante implementación — coherente con la estética atelier (fondos cálidos oscuros, no grises fríos)

---

## 10. Dispositivos y Navegadores

- **Rango**: Mobile a Desktop (hasta ~1024px de ancho útil, no necesita 4K)
- **Breakpoint mínimo**: 375px (iPhone estándar)
- **Enfoque**: Desktop-first sin descuidar mobile
- **Navegadores**: Modernos (sin soporte para IE11 ni navegadores muy antiguos)
- **Accesibilidad**: iterativa — funcional → WCAG AA → apuntar a AAA

---

## 11. Analytics y Privacidad

- **Analytics**: Umami self-hosted — cookieless, sin tracking de identidad
- **Panel**: público y visible — los visitantes pueden ver sus propios datos
- **Banner**: informativo (no bloqueante), enlaza al panel público de Umami
- **Filosofía**: transparencia total, coherente con los valores de self-hosting
- **Scope**: ecosistema Luminessa completo (landing + blog + futuros servicios)

---

## 12. SEO

- Indexable y descubrible en buscadores
- Meta tags completos: title, description, OG, Twitter card
- OG image: estática de momento (generar cuando toque)
- `robots.txt` y `sitemap.xml` — FASE 5
- Estudio futuro: generación dinámica de OG images con Astro endpoints

---

## 13. Página 404

- Custom — personalidad atelier (temática "esta receta no existe en el grimorio")
- Clara y funcional: mensaje comprensible + link a inicio
- Memorable sin sacrificar usabilidad

---

## 14. Datos Centralizados

Todos los datos del sitio (nombre, email, links, nav, footer) se gestionan desde un único archivo:

```
src/site.config.ts
```

Ningún componente hardcodea URLs, nombres o textos de contacto. Todo se importa desde `site.config.ts`.

---

## 15. Restricciones Técnicas

- El directorio `/mnt/data/` está montado sobre NTFS — los binarios de Node deben poder ejecutarse (opción `exec` en fstab)
- Sin requisitos de backend — sitio completamente estático
- Sin base de datos
- Sin autenticación
- El blog es un proyecto completamente separado (Hugo) y no se modifica desde este repo
