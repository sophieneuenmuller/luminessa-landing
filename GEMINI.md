# GEMINI.md - Instructional Context for Luminessa Landing

## Project Overview
**Luminessa Landing** is the central hub for Sophie's digital ecosystem (Sophie's Atelier). It is a personal portfolio and landing page built with **Astro 5.x** and **Tailwind CSS 3.x**. The project uses a "cozy alchemy workshop" aesthetic and serves as a gateway to Sophie's blog (Hugo), Forgejo instance, and other self-hosted services.

- **Primary Technologies:** Astro, Tailwind CSS, TypeScript.
- **Key Features:** i18n support (ES/EN), dark/light mode, RSS integration for blog previews, and a centralized configuration in `src/site.config.ts`.
- **Architecture:** Static Site Generation (SSG).

## Building and Running
The project uses standard npm scripts for development and deployment.

- **Development Server:** `npm run dev` (Starts Astro dev server at `localhost:4321`)
- **Build for Production:** `npm run build` (Generates static files in `dist/`)
- **Preview Build:** `npm run preview` (Previews the production build locally)
- **Linting/Formatting:** [TODO: Add linting/formatting commands once configured, e.g., Prettier/ESLint]

## Development Conventions
Adhere to these standards to maintain consistency with the established architectural design.

### Interaction Style (Mandatory) 📋💻🔍
- **Framework Synopsis:** Always initiate complex tasks with a succinct, one-sentence summary of the tech stack (Astro/Tailwind).
- **Emoji Usage:** Weave emojis into responses for clarity and personality (e.g., 😄🔧, 🧩💡).
- **Response Type:**
  - **Simple Queries:** Clear, direct answers.
  - **Complex Challenges:** 
    1. Detail the project structure/layout first.
    2. Use an **Incremental Coding Process**: small, defined steps.
    3. **Prompt User:** Ask the user to type 'next' or 'continue' after each segment.
- **Tone:** Professional yet approachable "programming maestro."

### Technical Constraints & Guidelines
- **Source of Truth:** All site data (URLs, emails, navigation labels) must be managed in `src/site.config.ts`.
- **Environment:** The project is on an NTFS mount (`/mnt/data/`). Ensure binaries have execution permissions if running shell commands.
- **Architecture:** 
  - Purely static (SSG). No backend, database, or authentication.
  - Integration with the Hugo blog is via build-time RSS fetch only.
- **Internationalization (i18n):** Use the Astro i18n routing pattern (`/[lang]/`). Content should be bilingual (ES/EN).

### Styling & UI
- **Tailwind Palette:** Use the custom colors defined in `tailwind.config.mjs` (e.g., `bg-cream`, `text-ink`, `text-gold`).
- **Typography:**
  - `font-display`: Cinzel Decorative (Titles, site name)
  - `font-body`: EB Garamond (General text)
  - `font-mono`: JetBrains Mono (Technical elements)
- **Dark Mode:** Support `darkMode: 'class'`. Use the `dark:` prefix with the palette defined in `tailwind.config.mjs` (e.g., `dark:bg-dark-bg`).
- **Aesthetic:** Aim for "cozy alchemy workshop" — warm, magical, and personal. Use subtle animations and decorative elements (SVG icons, ornamental separators).

### Component Structure
- **Layouts:** Use `src/layouts/BaseLayout.astro` for global structure.
- **Sections:** Keep large page sections in `src/components/sections/`.
- **Shared:** Reusable UI atoms go in `src/components/shared/`.
- **Naming:**
  - Components: `PascalCase.astro`
  - Pages: `kebab-case.astro`

### Roadmap & Status
The project is in **Early Development Phase**. 
- Refer to `docs/BUILD_PLAN.md` for current tasks and future milestones.
- Technical specifications are in `docs/TECHNICAL_DESIGN.md`.
- Functional requirements are in `docs/REQUIREMENTS.md`.
