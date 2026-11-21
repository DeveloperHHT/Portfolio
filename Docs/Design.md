# Design spec

This is the working spec for the site. Keep it current when the design changes.

## Stack

- React 19, Vite, TypeScript (strict). No UI library, no CSS framework: plain CSS files next to the components.
- All copy lives in `Frontend/src/content/{en,tr}.ts`, typed by `types.ts`. Components never hard-code visible text; they read it with `useApp()` (`content`, `lang`, `theme`).
- Theme (`data-theme` on `<html>`) and language are handled by `src/context/AppContext.tsx`. Do not touch it.
- Shared look: `src/styles/tokens.css` (colours, spacing, radii, shadows, easing) and `src/styles/global.css` (`.container`, `.section`, `.card`, `.card--lift`, `.tag`, `.btn`, `.btn--primary`, `.gradient-text`, `.reveal`). Use the tokens; do not add raw hex colours except for brand colours of a service (Spotify green and so on).
- Scroll reveal: `useReveal()` from `src/hooks/useReveal.ts` plus the `.reveal` class. Stagger with `style={{ '--i': index }}`.
- Section headers: always `SectionHead` (numbered eyebrow, gradient title, animated rule). Pass `id` for the nav entry, or leave it out for a second heading in the same section.
- Effects live in `src/components/fx/` (`ScrollProgress`, `CursorGlow`, `NeuralField`) and `src/hooks/` (`useTilt` for the hero portrait and the Focus and private-work cards, `useMagnetic`, `useMotionAllowed`, `useScrollProgress` for the bead that rides the Experience timeline). The tagline reveals word by word, and the theme and language switches use the View Transitions API (a circle growing from the toggle, a soft crossfade for language). All of them switch off for reduced motion, and the pointer ones also for touch devices.

## Look

Dark by default, light as a first-class theme. Violet to cyan brand gradient, amber and rose as warm accents for the off-duty part. Soft glass cards, layered shadows, subtle grid or glow backgrounds, generous whitespace. Every interactive thing has hover, focus-visible and active states. Entrances and micro-interactions are CSS (transform and opacity only), and everything respects `prefers-reduced-motion`. Mobile first: nothing may scroll horizontally at 360px wide.

The site must look hand-made and confident, not like a template: no emoji as decoration, no lorem, no filler claims. Only facts that are in the content files.

## Sections

Each section lives in `src/components/<Name>.tsx` with its own `<Name>.css` imported by the component.

| Section id | Component | Content |
| --- | --- | --- |
| (header) | `Nav.tsx` | sticky glass bar, section links with scroll-spy, theme toggle, EN/TR switch, mobile menu |
| `hero` | `Hero.tsx` | name, rotating roles, tagline, CTAs, chips, portrait (`public/portrait.jpg`, tilts with the pointer), canvas network background, magnetic buttons |
| `about` | `About.tsx` | paragraphs, facts, language meters |
| `focus` | `Focus.tsx` | the five focus areas (`id` picks an icon), then the camera-to-dashboard pipeline and the agent terminal (`visuals/`) |
| `experience` | `Experience.tsx` | timeline of jobs, then education (university and high school), communities, academic projects. Certificates are not on the site; they belong on a CV |
| `work` | `Work.tsx` | projects that run in production at work but whose code cannot be shared (anonymous, locked cards) |
| `stack` | `Stack.tsx` | two drifting rows of every tool, then the stack groups |
| `offduty` | `OffDuty.tsx` | music (click-to-load Spotify player), links to the streaming platforms, rides, photography |
| `contact` | `Contact.tsx` | contact links |
| (footer) | `Footer.tsx` | back to top |

Section ids come from `content.nav`.

## Search and sharing

Built from the same content files as the page, by `Frontend/Scripts/seo.ts` (a Vite plugin):

- `index.html` holds two markers; the plugin fills them with the English `<head>` (title, description, canonical, hreflang, Open Graph, Twitter card, JSON-LD `Person`) and a no-script text version of the page.
- After the build it writes `tr/index.html` (the same page with the Turkish head, file links moved one folder up), `robots.txt` and `sitemap.xml`, so each language has its own address: `/` and `/tr/`.
- The page reads its language from the address first (`/tr/` is Turkish), then from the saved choice, then from the browser. Switching language updates the address.
- Files from `public/` are resolved from the site folder at run time (`src/utils/publicUrl.ts`), because relative paths break one folder deeper. Do not use `new URL(..., import.meta.url)` with a variable for this: Vite rewrites it to `/assets/undefined`.
- The share image is `public/og.png` (1200 by 630). The public address comes from `SITE_URL` and defaults to `https://hasanhuseyintayap.com/`.

## Privacy rules (hard)

- No phone number, email address, GPA, street or city (only "Türkiye"), and no CV files anywhere in the repo or the build.
- Private employer work is shown without client or product names.
- No analytics, no cookies, no third-party requests on page load. Players load only after a click (see below).

## Embeds

Click-to-load facades: the page shows a cover image and a play button; an `<iframe>` is created only after the click.

- Spotify track: `https://open.spotify.com/embed/track/<id>?utm_source=oembed` (height 152).
- YouTube: `https://www.youtube-nocookie.com/embed/<id>` (only if an id is available; otherwise a link card).
- Apple Music and Instagram: links only.

## Accessibility

Semantic landmarks, one `<h1>` (hero), headings in order, visible focus, 4.5:1 contrast in both themes, `aria-label`s on icon buttons, keyboard-operable menu and players, `lang` follows the language switch.

## Definition of done for a section

`npm run build` (typecheck and bundle) passes, it looks right in dark and light at 1440px and 390px wide, both languages render without overflow, no console errors.
