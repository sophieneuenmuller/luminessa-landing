# PRD Gap Analysis — Luminessa Landing Page

Análisis de huecos en los documentos actuales comparado con lo que contendría un PRD robusto.
Este documento es temporal — su contenido se incorporará a los documentos existentes tras la revisión.

---

## Metodología

Los documentos se analizaron desde cinco perspectivas independientes:

1. **Usuario final** — experiencia percibida, flujos, estados del sitio
2. **Desarrollador externo** — ¿podría construirse solo con estos docs?
3. **QA / tester** — criterios de aceptación, definición de "hecho"
4. **Diseñador visual** — especificación visual suficiente para implementar sin ambigüedad
5. **Operaciones / mantenimiento** — qué pasa cuando algo falla, cambia o necesita actualizarse

---

## BLOQUE A — Huecos en REQUIREMENTS

### A1. Criterios de Aceptación ausentes
Los requisitos describen *qué* hay que construir pero no *cuándo está bien hecho*. Un PRD robusto incluye criterios de aceptación por sección. Ejemplo de lo que falta:

> "El Hero está completo cuando: [1] el nombre es visible en Cinzel Decorative, [2] el tagline aparece en EB Garamond, [3] es legible en mobile a 320px de ancho..."

Sin esto, no hay forma de verificar objetivamente si algo cumple los requisitos.

**Preguntas:**
- Q-A1a: ¿Quieres añadir criterios de aceptación por componente/sección? ¿O prefieres que sea más informal (revisión visual tuya)?
- Q-A1b: ¿Hay algún breakpoint mínimo de mobile que consideres el límite inferior? (¿320px? ¿375px?)

---

### A2. Estados vacíos / edge cases no especificados
El documento menciona que `BlogPreview` se oculta si el feed falla, y que `ProjectsPreview` arranca oculto. Pero no especifica:

- ¿Qué muestra `/proyectos` cuando no hay proyectos? ¿Página en blanco? ¿Mensaje de "próximamente"? ¿Redirige?
- ¿Qué aspecto tiene la landing si BlogPreview está oculto? ¿Queda un hueco raro? ¿Las secciones se reordenan?
- ¿Hay un estado "sitio en construcción" antes del primer deploy público?

**Preguntas:**
- Q-A2a: ¿Qué debe mostrar `/proyectos` mientras no haya proyectos reales? ¿Un placeholder elegante, un mensaje, o simplemente no existe la página aún?
- Q-A2b: Si el RSS falla en build time, ¿la sección desaparece silenciosamente o hay algún mensaje visible?
- Q-A2c: ¿Hay una fecha o condición en mente para el primer deploy público del sitio?

---

### A3. Flujos de usuario no documentados
No hay ningún user flow. Para una landing simple esto puede parecer innecesario, pero hay decisiones implícitas que no están explicitadas:

- ¿Qué hace el usuario cuando llega a `/proyectos` y hace clic en un proyecto? ¿Abre en nueva pestaña o en la misma?
- ¿Los links del blog preview abren el post en nueva pestaña?
- ¿El email del footer abre el cliente de correo (`mailto:`) o es solo texto visible?

**Preguntas:**
- Q-A3a: Links externos (proyectos, posts del blog) — ¿nueva pestaña o misma pestaña?
- Q-A3b: El email — ¿`mailto:` link (abre cliente de correo) o solo texto visible?

---

### A4. Internacionalización / idioma
El sitio no especifica el idioma del contenido. El código tiene `lang="es"` en el HTML pero:

- ¿El contenido será en español, inglés, o mezclado?
- ¿Los textos de UI (nav, footer tagline) serán en español o inglés?
- ¿Hay intención futura de tener el sitio en dos idiomas?

**Preguntas:**
- Q-A4a: ¿El contenido del sitio será en español, inglés, o una mezcla (ej: nav en inglés, contenido en español)?
- Q-A4b: ¿Hay alguna intención futura de soporte multi-idioma, o se descarta completamente?

---

### A5. Privacidad, analytics y rastreo
No se menciona nada sobre:

- ¿Hay analytics? ¿Google Analytics, Plausible, Umami, nada?
- ¿Hay cookies? ¿Se necesita banner de cookies?
- ¿Hay política de privacidad?
- Dado que es un sitio estático y personal, probablemente no, pero debería quedar explícito.

**Preguntas:**
- Q-A5a: ¿Quieres algún tipo de analytics en el sitio? (Plausible/Umami serían coherentes con la filosofía self-hosting)
- Q-A5b: ¿Se necesita banner de cookies / política de privacidad? (Depende de si hay analytics)

---

### A6. SEO y metadatos sociales
El documento menciona "meta tags completos (OG, Twitter card)" en FASE 5 como tarea pendiente, pero no especifica:

- ¿Hay una imagen OG definida? ¿Cuál sería?
- ¿El sitio quiere ser indexado por buscadores? ¿O es más personal y no le importa el SEO?
- ¿Hay `sitemap.xml`?

**Preguntas:**
- Q-A6a: ¿Quieres que el sitio aparezca en búsquedas de Google? ¿O es más un espacio personal donde el SEO no importa?
- Q-A6b: ¿Tienes en mente una imagen o visual para cuando alguien comparte el sitio en redes sociales (OG image)?

---

## BLOQUE B — Huecos en TECHNICAL DESIGN

### B1. Escala tipográfica no definida
El documento define las tres familias tipográficas y sus roles, pero no especifica tamaños. Un desarrollador externo no sabría qué tamaño usar para un H1 vs un H2 vs body text.

Falta:
- Tamaños de fuente por nivel (H1, H2, H3, body, small, caption)
- Line-height orientativo
- Font-weight por nivel (400, 500, 700...)
- ¿Se usan los tamaños por defecto de Tailwind o hay una escala custom?

**Preguntas:**
- Q-B1a: ¿Prefieres definir la escala tipográfica ahora con valores concretos, o lo vamos ajustando visualmente durante la implementación?

---

### B2. Espaciado y layout no especificados
No hay definición de:

- ¿Cuál es el max-width del contenido? (El código actual usa `max-w-4xl` — ¿es la decisión final?)
- ¿Qué padding/margin usan las secciones entre sí?
- ¿Hay un sistema de spacing definido o se usa Tailwind por defecto?

**Preguntas:**
- Q-B2a: ¿El `max-w-4xl` (~896px) te parece bien como ancho máximo del contenido, o prefieres algo más estrecho/ancho?
- Q-B2b: ¿Quieres definir un espaciado vertical estándar entre secciones, o lo vamos ajustando a ojo?

---

### B3. Estados interactivos no especificados para todos los elementos
Solo están descritos hover del nav y hover de cards. Faltan:

- ¿Estado `focus` para accesibilidad de teclado? (Links, si hay botones)
- ¿Estado `active` al hacer clic?
- ¿Estado `visited` para links?

**Preguntas:**
- Q-B3a: ¿Quieres que los links muestren estado `:visited` diferenciado, o todos igual independientemente de si se han visitado?

---

### B4. Gestión de imágenes no especificada
El documento menciona `<Image />` de Astro en FASE 5 pero no define:

- ¿Va a haber imágenes en el Hero? ¿Una foto de Sophie? ¿Ilustración? ¿Solo tipografía?
- ¿Las ProjectCards llevan imagen/screenshot del proyecto?
- ¿Hay algún asset visual decorativo (texturas, ilustraciones) para evocar el atelier?
- Si hay imágenes, ¿dónde se almacenan? ¿`public/` o `src/assets/`?

**Preguntas:**
- Q-B4a: ¿El Hero lleva algún elemento visual (foto tuya, ilustración, decoración)? ¿O es principalmente tipográfico?
- Q-B4b: ¿Las cards de proyectos llevarán screenshot o imagen representativa?
- Q-B4c: ¿Tienes en mente elementos decorativos visuales para evocar el atelier? (Texturas de pergamino, iconos de alquimia, bordes decorativos...)

---

### B5. Política de errores HTTP no definida
- ¿Hay página 404 custom? Astro permite crearla fácilmente.
- ¿Qué debe mostrar si alguien llega a una ruta que no existe?

**Preguntas:**
- Q-B5a: ¿Quieres una página 404 custom con la estética del atelier, o la de Astro por defecto?

---

### B6. Rendimiento — sin targets definidos
FASE 5 menciona "Lighthouse / performance básico" pero sin ningún target:

- ¿Hay un score mínimo de Lighthouse que consideres aceptable?
- ¿Importa el Core Web Vitals (LCP, CLS, FID)?

**Preguntas:**
- Q-B6a: ¿Tienes algún target de rendimiento en mente, o simplemente "que vaya bien" sin número concreto?

---

### B7. Dependencia de Google Fonts — privacidad e indisponibilidad
El sitio carga las fuentes desde Google Fonts externamente. Esto tiene implicaciones:

- Privacidad: Google registra las IPs de visitantes que cargan las fuentes
- Disponibilidad: si Google Fonts está caído, las fuentes fallan
- Coherente con valores de self-hosting: un tanto contradictorio

Alternativa: autoalojar las fuentes en `public/fonts/`.

**Preguntas:**
- Q-B7a: ¿Prefieres autoalojar las fuentes (más privado, más coherente con self-hosting) o te vale Google Fonts por simplicidad?

---

## BLOQUE C — Huecos en BUILD PLAN

### C1. Criterios de salida de fase no definidos
El BUILD_PLAN lista tareas pero no define cuándo una fase está "completa". Sin criterio de salida, una fase puede quedarse en 90% indefinidamente.

**Pregunta:**
- Q-C1a: ¿Quieres añadir un criterio explícito de "esta fase está completa cuando..." a cada fase?

---

### C2. Sin estrategia de control de versiones
No hay ninguna mención a git:

- ¿Hay un repo en Forgejo para este proyecto?
- ¿Hay convención de commits (conventional commits, libre...)?
- ¿Hay ramas o se trabaja en main directamente?

**Preguntas:**
- Q-C2a: ¿Este proyecto ya tiene (o va a tener) un repo en tu Forgejo?
- Q-C2b: ¿Tienes alguna preferencia de formato de commits o trabajamos libremente?
- Q-C2c: ¿Se trabaja en `main` directamente o quieres ramas por feature?

---

### C3. Deploy completamente abierto
La FASE 5 lista "Decidir plataforma de deploy" como tarea pendiente. Para un sitio self-hosted, esto es una decisión importante que afecta al BUILD_PLAN entero.

Opciones plausibles dado el ecosistema (Forgejo, servidor propio):
- Forgejo Actions → build → deploy a VPS via SSH/rsync
- Forgejo Actions → build → Nginx sirviendo el `dist/`
- Caddy como servidor web en lugar de Nginx

**Preguntas:**
- Q-C3a: ¿Ya tienes un servidor/VPS donde alojar el sitio? ¿Es el mismo donde corre Forgejo y el blog?
- Q-C3b: ¿Qué servidor web usas actualmente (Nginx, Caddy, Apache, otro)?
- Q-C3c: ¿Quieres que el deploy sea automático en cada push a main, o manual?

---

### C4. Sin plan de mantenimiento post-lanzamiento
¿Qué pasa después del deploy?

- ¿Cómo se actualizan los proyectos en `/proyectos`? ¿Editando un archivo, o hay algún sistema de contenido?
- ¿Quién (y cómo) va a añadir proyectos nuevos cuando los haya?
- ¿Qué pasa si hay que actualizar una dependencia de seguridad?

**Preguntas:**
- Q-C4a: Cuando tengas proyectos que mostrar, ¿cómo prefieres añadirlos? ¿Editando un archivo `.ts` con los datos, un archivo Markdown por proyecto, o algo más?
- Q-C4b: ¿Tienes pensado hacer actualizaciones de dependencias periódicas o solo cuando haya algo crítico?

---

## BLOQUE D — Huecos Transversales (no en ningún doc)

### D1. Sin definición visual del Hero
El Hero es el elemento más importante del sitio y apenas está especificado. No hay:

- Layout: ¿centrado, alineado a la izquierda, asimétrico?
- ¿Altura del hero? ¿Ocupa el viewport completo (100vh) o solo lo necesario?
- ¿Hay algún elemento decorativo o es solo texto?
- ¿Hay separación visual entre Hero y AboutSnippet o fluyen como uno?

**Preguntas:**
- Q-D1a: ¿El Hero ocupa toda la pantalla (100vh) o solo el espacio que necesita el contenido?
- Q-D1b: ¿El texto del Hero va centrado, a la izquierda, o algún otro layout?
- Q-D1c: ¿Hero y AboutSnippet son visualmente una misma sección continua, o hay separación?

---

### D2. Sin definición de ProjectCard
`ProjectCard` es el componente más complejo estructuralmente y no hay wireframe ni descripción visual:

- ¿Tiene imagen/screenshot o es solo texto?
- ¿Qué prominencia tienen las tecnologías usadas? ¿Chips/badges, lista, solo texto?
- ¿Hay fecha de proyecto?
- ¿Cómo se diferencia un proyecto destacado (en landing) de uno no destacado (en /proyectos)?
- ¿Las cards tienen una altura fija o se adaptan al contenido?

**Preguntas:**
- Q-D2a: ¿Las ProjectCards llevan imagen o son puramente textuales?
- Q-D2b: ¿Cómo se muestran las tecnologías? ¿Pequeños badges/chips, o lista de texto?
- Q-D2c: ¿Hay alguna diferencia visual entre las cards de la landing y las de `/proyectos`?
- Q-D2d: ¿Los proyectos tienen fecha? ¿Se muestra?

---

### D3. Sin definición del estado de `/proyectos` vacío
La página `/proyectos` existe en el plan pero su comportamiento cuando está vacía no está definido en ningún documento.

*(Relacionado con Q-A2a — se incluye aquí también por completitud transversal)*

---

### D4. Accesibilidad — mencionada pero no definida
REQUIREMENTS dice "se respetan buenas prácticas básicas". Pero no define qué significa eso:

- ¿Alt text en imágenes?
- ¿Contraste mínimo WCAG AA?
- ¿Navegación por teclado funcional?
- ¿Skip-to-content link?

**Pregunta:**
- Q-D4a: ¿Qué nivel mínimo de accesibilidad quieres garantizar? ¿"Nada roto" (contraste básico, alt text), WCAG AA, o algo intermedio?

---

## Resumen de Preguntas

### Sobre Requisitos (REQUIREMENTS)
| ID | Pregunta | Respuesta |
|----|----------|-----------|
| Q-A1a | ¿Criterios de aceptación formales o revisión visual informal? | Formales y verificables por componente + revisión visual adicional |
| Q-A1b | ¿Breakpoint mínimo de mobile? | 375px (iPhone estándar) |
| Q-A2a | ¿Qué muestra `/proyectos` mientras está vacía? | Placeholder elegante + animación curiosa |
| Q-A2b | ¿RSS fallido → sección desaparece o mensaje visible? | Mensaje sutil + tratamiento visual coherente, sin error visible |
| Q-A2c | ¿Fecha o condición para primer deploy público? | Sin fecha — cuando esté listo, al ritmo de aprendizaje |
| Q-A3a | ¿Links externos → nueva pestaña o misma? | Proyectos: nueva pestaña. Blog: misma pestaña |
| Q-A3b | ¿Email → `mailto:` o solo texto? | `mailto:` clickable |
| Q-A4a | ¿Idioma del contenido? | Bilingüe ES/EN con i18n nativo de Astro (rutas `/es/`, `/en/`) |
| Q-A4b | ¿Multi-idioma futuro, o descartado? | Implementado desde el inicio — objetivo: demostrar conocimiento de i18n |
| Q-A5a | ¿Analytics? ¿Cuál? | Umami self-hosted, cookieless, panel público visible |
| Q-A5b | ¿Banner de cookies / política de privacidad necesaria? | Banner informativo (no bloqueante), enlaza al panel público de Umami |
| Q-A6a | ¿Importa el SEO / indexación en Google? | Sí — indexable y descubrible |
| Q-A6b | ¿Imagen OG para redes sociales? | Estática de momento; generar cuando toque. Estudiar OG dinámico con Astro endpoints en el futuro |

### Sobre Diseño Técnico (TECHNICAL_DESIGN)
| ID | Pregunta | Respuesta |
|----|----------|-----------|
| Q-B1a | ¿Escala tipográfica definida ahora o ajustada visualmente? | Ajuste visual durante implementación; legibilidad y accesibilidad no negociables |
| Q-B2a | ¿`max-w-4xl` como ancho máximo de contenido es correcto? | No — cambiado a `max-w-5xl` (~1024px) |
| Q-B2b | ¿Espaciado entre secciones definido o a ojo? | Ajuste visual durante implementación |
| Q-B3a | ¿Links con estado `:visited` diferenciado? | No — todos los links igual independientemente de si se han visitado |
| Q-B4a | ¿El Hero lleva elemento visual (foto, ilustración, decoración)? | Solo tipografía de momento; elementos decorativos a explorar en el futuro |
| Q-B4b | ¿Cards de proyectos con imagen? | Híbrido — imagen opcional, fallback elegante si no existe |
| Q-B4c | ¿Elementos decorativos visuales tipo atelier? | Sí — sutiles con toques elaborados, combinación contextual por sección |
| Q-B5a | ¿Página 404 custom? | Sí — personalidad atelier (temática grimorio/receta inexistente), clara y memorable |
| Q-B6a | ¿Target de rendimiento Lighthouse? | ≥90 inicial → iterar hacia ≥95 |
| Q-B7a | ¿Autoalojar fuentes o Google Fonts? | Autoalojadas en producción. Google Fonts admisible temporalmente en dev para explorar estilos |

### Sobre Build Plan (BUILD_PLAN)
| ID | Pregunta | Respuesta |
|----|----------|-----------|
| Q-C1a | ¿Criterios de salida de fase explícitos? | Sí — añadir criterios de "fase completa cuando..." a cada fase |
| Q-C2a | ¿Repo en Forgejo para este proyecto? | Sí |
| Q-C2b | ¿Convención de commits? | A definir |
| Q-C2c | ¿Main directo o ramas por feature? | `dev` → staging, `main` → producción |
| Q-C3a | ¿VPS/servidor ya disponible? ¿Mismo que Forgejo/blog? | Sí — mismo VPS para todo el ecosistema |
| Q-C3b | ¿Servidor web actual? | Caddy (reverse proxy + HTTPS automático) |
| Q-C3c | ¿Deploy automático en push o manual? | Automático con Forgejo Actions (ya configurado) |
| Q-C4a | ¿Cómo añadir proyectos nuevos? | A definir durante implementación de ProjectCard |
| Q-C4b | ¿Actualizaciones de dependencias periódicas o solo críticas? | Renovate — PRs automáticos |

### Transversales
| ID | Pregunta | Respuesta |
|----|----------|-----------|
| Q-D1a | ¿Hero a 100vh o solo el espacio necesario? | A definir durante implementación |
| Q-D1b | ¿Texto del Hero centrado, izquierda, otro? | Centrado — elegancia atemporal, espíritu web clásica |
| Q-D1c | ¿Hero y About — sección continua o con separación? | A definir durante implementación |
| Q-D2a | ¿ProjectCards con imagen o solo texto? | Híbrido — ver Q-B4b |
| Q-D2b | ¿Tecnologías como badges/chips o texto? | A definir durante implementación |
| Q-D2c | ¿Cards de landing distintas a cards de /proyectos? | A definir durante implementación |
| Q-D2d | ¿Los proyectos tienen y muestran fecha? | A definir durante implementación |
| Q-D4a | ¿Nivel de accesibilidad mínimo? | Iterativo: funcional → WCAG AA → apuntar a AAA |

---

## Estado del Gap Analysis

✅ **COMPLETO** — todos los bloques A, B, C y D respondidos.

Las decisiones han sido incorporadas a `REQUIREMENTS.md`, `TECHNICAL_DESIGN.md` y `BUILD_PLAN.md`.
