---
name: Raka Alpiansyah Portfolio
description: Swiss Signal Vermilion kinetic engineering film portfolio design system
colors:
  paper: "#FFFFFF"
  mist: "#F5F4F0"
  obsidian: "#080A12"
  obsidian-elevated: "#111524"
  ink: "#0B0E1A"
  ink-muted: "#4A5068"
  ink-light: "#F8F9FC"
  ink-light-muted: "#A3AAC2"
  vermilion: "#C92A1D"
  vermilion-bright: "#FF5B4D"
  vermilion-tint: "#FFD8D2"
  vermilion-dark: "#9E1F14"
typography:
  display:
    fontFamily: "\"Big Shoulders Display\", \"Inter Tight\", sans-serif"
    fontSize: "clamp(2.8rem, 9.2vw, 8rem)"
    fontWeight: 900
    lineHeight: 0.86
    letterSpacing: "-0.02em"
  body:
    fontFamily: "\"Inter Tight\", system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "\"JetBrains Mono\", monospace"
    fontSize: "0.75rem"
    fontWeight: 600
    letterSpacing: "0.1em"
rounded:
  sm: "8px"
  md: "12px"
  lg: "16px"
  pill: "9999px"
spacing:
  sm: "16px"
  md: "32px"
  lg: "80px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
    padding: "10px 24px"
  button-primary-hover:
    backgroundColor: "{colors.vermilion}"
    textColor: "{colors.paper}"
  button-accent:
    backgroundColor: "{colors.vermilion}"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
    padding: "12px 28px"
---

# Design System: Raka Alpiansyah Portfolio

## Overview

**Creative North Star: "The Kinetic Engineering Reel"**

This design system structures Raka Alpiansyah's portfolio as a continuous architectural motion sequence rather than a static grid of boxes. Eight alternating chapters transition across white paper, warm stone mist, deep cinematic obsidian, and full-bleed Swiss Signal Vermilion, bound together by one scroll-drawn SVG thread that passes through focal anchors from the opening headline to the footer.

Typography pairs ultra-condensed uppercase display lettering for immediate poster authority with clean humanist body copy and tabular monospace metadata.

**Key Characteristics:**
- High-contrast alternating chapter canvases (`#FFFFFF`, `#F5F4F0`, `#080A12`, `#C92A1D`)
- Single continuous dual-clipped SVG thread synchronized to scroll progress
- Condensed uppercase display headlines paired with `60ch` readable body columns
- Keyboard-accessible controls, visible focus indicators, and full `prefers-reduced-motion` parity

## Colors

One deliberate accent family (Swiss Signal Vermilion) activates alternating neutral light and obsidian dark grounds.

### Primary
- **Swiss Signal Vermilion** (`#C92A1D`): Primary brand accent used on light/mist grounds (`5.48:1` white/`#C92A1D` and `#C92A1D`/`#FFFFFF`; `4.98:1` on Mist), full-bleed Capabilities and Footer chapters, active process indicators, and the contact disc CTA.
- **Signal Vermilion Bright** (`#FF5B4D`): High-contrast dark-ground accent (`6.44:1` against `#080A12`) used on Selected Work, 3D Showreel split titles, and dark-surface active states.
- **Vermilion Display Tint** (`#FFD8D2`): Reserved strictly for large bold display headlines (`>= 36px`, `4.18:1` large-text WCAG AA pass) on `#C92A1D` backgrounds.
- **Vermilion Deep** (`#9E1F14`): Hover/pressed depth shift on `#C92A1D` interactive controls.

### Neutral
- **Paper Canvas** (`#FFFFFF`): Hero, About, and Engineering Process ground.
- **Architectural Mist** (`#F5F4F0`): Experience and Toolkit ground plus secondary editorial card background on light sections.
- **Cinematic Obsidian** (`#080A12`) and **Obsidian Elevated** (`#111524`): Selected Work, 3D Showreel, and Contact grounds/panels.
- **Midnight Ink** (`#0B0E1A`) and **Slate Secondary** (`#4A5068`, `7.96:1` on Paper, `7.23:1` on Mist): Primary and secondary typography on light grounds.
- **Chalk Ink** (`#F8F9FC`) and **Cool Slate Secondary** (`#A3AAC2`, `8.55:1` on Obsidian): Primary and secondary typography on dark grounds.

**The Single-Accent Rule.** Only Swiss Signal Vermilion and its calibrated dark-surface tint (`#FF5B4D`) act as brand color; no secondary neon or purple gradients appear anywhere on the site.

**The Canvas Contrast Rule.** Body text over `#C92A1D` always uses pure white (`#FFFFFF`); `#FFD8D2` is restricted exclusively to oversized display text.

## Typography

**Display Font:** `Big Shoulders Display` (weights 700, 800, 900; uppercase; fallback `Inter Tight, sans-serif`)
**Body Font:** `Inter Tight` (weights 400, 500, 600, 700; fallback `system-ui, sans-serif`)
**Label/Mono Font:** `JetBrains Mono` (weights 400, 500, 600; fallback `monospace`)

**Character:** Compressed industrial Swiss poster lettering contrasts sharply with crisp neo-grotesque reading paragraphs and tabular technical readouts.

### Hierarchy
- **Display** (900, `clamp(2.8rem, 9.2vw, 8rem)`, line-height `0.86`, letter-spacing `-0.02em`): Hero headline, chapter headings, split manifesto words, and edge-to-edge footer wordmark.
- **Section Sub-display** (900, `clamp(2.5rem, 6.2vw, 5.5rem)`, line-height `0.86`): Chapter headings in About, Projects, Capabilities, Process, Experience, and Contact.
- **Card / Phase Title** (900, `1.5rem` to `2.5rem`, line-height `0.95` to `1.0`): Project cards, capability nodes, process cards, and role rows.
- **Body** (400/500, `0.875rem` to `1rem`, line-height `1.6`, max measure `60ch`): Bio columns, engineering challenges/solutions, and phase descriptions.
- **Technical Label** (600, `10px` to `12px`, `JetBrains Mono`, letter-spacing `0.08em` to `0.12em`, `tabular-nums`): Chapter indices, timecodes, live Bandung WIB clock, and stack pills.

## Layout

Content lives inside a `1440px` maximum-width container (`px-4 sm:px-8`) with 12-column desktop compositions (`8 + 4` in About, `5 + 7` in Process, `7 + 5` in Experience and Contact) collapsing cleanly to single-column mobile layouts below `768px`/`1024px`. Section vertical rhythm alternates between generous editorial spacing (`py-20 md:py-28`) and full-viewport pinned stages (`100dvh` in Hero, Desktop Projects, and Desktop 3D Showreel).

## Elevation & Depth

Surfaces rely primarily on canvas tonal contrast and crisp `1px` hairline borders rather than diffuse drop shadows. Backdrop blur is strictly capped to one element: the fixed header bar (`bg-*/90 backdrop-blur-md`) once scrolled past `28px`.

**The Sharp-Surface Rule.** Cards stay flat against their host ground with `1px` borders (`border-[#0B0E1A]/12` on light, `border-white/15` on dark); only the active center card in the 3D carousel uses directional depth (`shadow-[0_28px_70px_rgba(0,0,0,0.75)]`).

## Shapes

- **Pill Controls (`9999px`):** Primary CTAs, nav menu triggers, filter tabs, language switchers, and circular contact disc.
- **Editorial Containers (`12px` to `16px`):** ID card, case study drawer, sticky viewfinder monitor, process cards, toolkit container, and project carousel plates.

## Components

### Buttons
- **Shape:** Full pill (`9999px`), minimum `44px` interactive height (`min-h-[44px]`).
- **Primary (Light):** `#0B0E1A` fill with `#FFFFFF` label, shifting to `#C92A1D` on hover and `scale(0.98)` on press.
- **Primary (Dark/Accent):** `#FF5B4D` or `#FFFFFF` high-contrast fill or `1px` border inversion on hover.

### Navigation
- Single-line desktop header (`64px`–`72px` height) switching surface/ink colors per active section (`light`, `mist`, `dark`, `accent`) via ScrollTrigger boundary tracking.
- Rolling vertical dual-span text links (`.kx-roll-link`) and full-screen `#C92A1D` menu overlay closable with `Escape`.

### Inputs / Fields
- Visible uppercase field labels stacked above `44px`-tall `#080A12` inputs with `#6B728E` borders (`3.82:1` boundary contrast against `#111524`), `#9BA3BC` placeholders (`7.23:1`), and `#FF5B4D` focus states.

### Signature Motion Components
- **KineticThread:** Document-spanning dual-clipped Bezier SVG path (`#C92A1D` on light/mist, `#FFFFFF` on dark/accent) scrubbed via ScrollTrigger on desktop; clean edge progress bar on mobile (`< 768px`).
- **3D Cylindrical Carousel (`Projects`):** Pinned GSAP ScrollTrigger rotating 6 project plates in `perspective(1800px)` with horizontal mobile fallback and `Escape`-closable Case Study Drawer.
- **Split-Expand 3D Viewfinder (`EngineeringManifesto`):** Pinned symmetric clip-path reveal framing the lazy-loaded Three.js `</>` sculpture & chains with scanlines and SMPTE readout.

## Do's and Don'ts

### Do:
- **Do** validate every color pair against WCAG AA before introducing new states or accents.
- **Do** keep backdrop blur restricted solely to the scrolled navbar (`1` element maximum).
- **Do** update `ScrollTrigger.refresh()` after font loading or language switches so `KineticThread` and pinned sections align accurately.

### Don't:
- **Don't** add em-dashes (`—`), invented metrics, percentage skill bars, or unverified testimonials.
- **Don't** animate string `clip-path: inset(... round ...)` shorthands directly in GSAP; drive symmetric inset percentages numerically so Chromium shorthand serialization cannot skew edges.
- **Don't** render multiple marquees on the page; keep the stack ticker exclusively at the bottom of Experience.
