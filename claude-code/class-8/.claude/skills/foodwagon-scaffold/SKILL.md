---
name: foodwagon-scaffold
description: Scaffold the FoodWagon food-delivery landing site with Next.js (App Router), TypeScript, Tailwind CSS v4, and shadcn/ui. Use when starting/bootstrapping the FoodWagon (or a similar food-delivery marketing) landing page project.
---

# FoodWagon Scaffold

Bootstraps a marketing landing-page foundation for the FoodWagon food-delivery
template. Everything is free, presentational, and needs no API keys (content is
mock data, buttons/search are placeholders).

## Stack
- **Next.js** (App Router) + **TypeScript**
- **Tailwind CSS v4** + **shadcn/ui** + **lucide-react** (icons)
- Fonts via `next/font/google`: **Source Sans 3** (headings/buttons — the Google
  successor to Source Sans Pro) and **Open Sans** (body)
- Mock content in `src/data/` (no database)

## Steps

1. **Create the app** (from `class-8/`):
   ```bash
   npx create-next-app@latest web --ts --tailwind --app --eslint --src-dir --import-alias "@/*" --no-turbopack
   cd web
   ```

2. **Init shadcn/ui and add base components:**
   ```bash
   npx shadcn@latest init -d
   npx shadcn@latest add button card badge input carousel
   ```

3. **Install icons:**
   ```bash
   npm install lucide-react
   ```

4. **Wire fonts** in `src/app/layout.tsx` with `next/font/google`
   (`Source_Sans_3` → `--font-heading`, `Open_Sans` → `--font-body`), and expose
   them in the `@theme` block of `globals.css`.

5. **Write the design tokens** into `src/app/globals.css` — see the
   `foodwagon-ui-kit` skill for the exact palette, fonts, and shadow recipes.

6. **Create the folder structure:**
   ```text
   src/app/
     layout.tsx      # fonts, metadata
     page.tsx        # composes all sections
     globals.css     # @theme tokens
   src/components/    # one file per section + ui/ (shadcn)
   src/data/          # mock content arrays
   src/types/         # shared TS types
   public/foodwagon/  # downloaded Figma assets
   ```

7. **Allow the asset directory** — downloaded Figma images live in
   `public/foodwagon/` and are referenced with `next/image` (local, so no
   `remotePatterns` needed).

## Next steps
Follow the `foodwagon-ui-kit` skill for styling conventions, then build each
section with the `landing-page-builder` subagent (or `/build-section <node>`),
pulling exact design context from the Figma file per node.

## Verify
`npm run dev` → page loads with fonts + amber theme and no console errors.
