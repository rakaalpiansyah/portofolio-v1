# Design System: Raka Alpiansyah Portfolio

## Aesthetic Direction
- **Mood**: Dark Cinematic Editorial
- **Visual Personality**: High-contrast, monumental typography, architectural spatial geometry, refined micro-physics.
- **Dials**: ENERGY 3 / RHYTHM 3 / MOTION 3

## Color Palette
```css
--ink: #0a0a0a;       /* Primary canvas background */
--ink-900: #0f0f0f;   /* Elevated card surface */
--ink-800: #151515;   /* Interactive tiles & inputs */
--bone: #f5f5f0;      /* Primary text (high contrast, 16.5:1 on ink) */
--bone-2: #a3a39f;    /* Secondary narrative text (7.9:1 on ink, WCAG AA pass) */
--bone-3: #8a8a85;    /* Tertiary metadata & timestamps (5.6:1 on ink, WCAG AA pass) */
--signal: #c6ff3d;    /* Single accent: electric lime signal */
--line: rgba(245, 245, 240, 0.12); /* Subtle architectural divider rules */
```

## Typography
- **Headings & Display**: `Clash Display` (Variable Woff2, self-hosted, 200–700 weight, tight tracking `-0.03em`, leading `0.88–0.9`).
- **Body & Editorial**: `Satoshi` (Variable Woff2, self-hosted, 300–900 weight, leading `1.6–1.7`).
- **Monospace & Metadata**: `ui-monospace, 'JetBrains Mono', monospace` for keycodes, coordinates, and telemetry.

## Layout & Geometry
- **Edge Language**: Sharp 0-radius for photographic and media frames; full-pill (`rounded-full`) for buttons and badges; bottom-line borders for form inputs.
- **Spacing**: Fluid gutter `clamp(1.25rem, 4vw, 3.5rem)`.
- **Grain**: Ambient SVG procedural grain overlay at 6% opacity.

## Motion & Easing
- Central registration in `src/lib/gsap.js`.
- Custom Eases:
  - `silk`: `0.65, 0, 0.35, 1` (used for smooth anchor scrolling, curtain preloader, lightbox transitions).
  - `expoSoft`: `0.16, 1, 0.3, 1` (used for character masks and line reveals).
  - `snapBack`: `0.34, 1.56, 0.64, 1` (used for magnetic cursor release and hover feedback).
- Scroll-Driven Architecture:
  - Lenis smooth scroll synced to `ScrollTrigger.update`.
  - Pinned text illumination scrub in About.
  - ScaleY timeline line scrub in Career Track & Education.
  - Clip-path entrance batch and parallax in Gallery.
  - Horizontal pin & scrub track in Projects (with `gsap.matchMedia` fallback on mobile).
