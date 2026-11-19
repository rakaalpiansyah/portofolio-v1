# Design Spec: Kinetix-Inspired Kinetic Engineering Film Portfolio (Opsi A)

**Date:** 2026-11-19
**Branch:** `ui-ux-update`
**Mode:** Persuade + Experience
**Design Read:** Software & AI Engineer portfolio for technical recruiters and project clients, in a Swiss kinetic editorial motion-film style, dial `ENERGY 3 / RHYTHM 3 / MOTION 3`.

## 1. Intent & Scope

Transform Raka Alpiansyah's portfolio into a cohesive, motion-driven web film inspired by Kinetix (`https://jiro.build/templates/portfolio/video-editor-portfolio-website-kinetix`), replacing uniform section fade-ins/fade-outs with distinct ScrollTrigger choreography connected by one continuous scroll-drawn SVG thread across high-contrast light, mist, obsidian dark, and full-bleed accent canvases.

### Non-Goals & Anti-Goals
- No fabricated metrics, star ratings, client testimonials, or generic FAQ filler sections.
- No `lucide-react` defaults or unmotivated decorative blurs/glows.
- No em-dashes (`—`) or AI marketing clichés anywhere in copy.
- No compromise to keyboard accessibility, contrast, SEO JSON-LD, or mobile usability.

## 2. Visual System & R-31 Rationales

### Color Tokens (WCAG AA Verified)
- **Light Paper Canvas (`#FFFFFF`):** Hero, About, Engineering Process. *Reason:* Crisp editorial baseline that anchors photography and Swiss typography.
- **Architectural Mist (`#F5F4F0`):** Experience & Toolkit chapter. *Reason:* Subtle warm-neutral tonal shift separating career index from Process without jarring contrast inversion.
- **Deep Cinematic Obsidian (`#080A12`, elevated `#111524`):** Selected Work, 3D Showreel, Contact. *Reason:* High-drama frame for 3D carousel plates, Three.js WebGL lighting, and final call to action.
- **Swiss Signal Vermilion (`#C92A1D` on light/full-bleed; `#FF5B4D` on dark; `#FFD8D2` large display highlight only >=36px):** Single deliberate brand accent. *Reason:* Gives Raka a distinct editorial identity instead of cloning Kinetix cobalt blue while maintaining WCAG AA contrast (`5.48:1` white/`#C92A1D`, `6.44:1` `#FF5B4D`/`#080A12`).
- **Ink Tokens:** `#0B0E1A` primary dark ink (`17.47:1` on Mist), `#4A5068` secondary dark ink (`7.96:1` on Paper, `7.23:1` on Mist), `#F8F9FC` primary light ink, `#A3AAC2` secondary light ink (`8.55:1` on Obsidian).

### Typography
- **Display (`Big Shoulders Display`, 700/800/900 uppercase):** Tight leading (`0.82` to `0.90`) for poster-scale motion headlines. *Reason:* Ultra-condensed vertical rhythm matches Kinetix's kinetic film poster voice.
- **Body & UI (`Inter Tight`, 400/500/600/700, `tabular-nums`):** Clean humanist neo-grotesque for readable paragraphs (`65ch` max), buttons, and ticking timecodes.
- **Mono (`JetBrains Mono`, 11px-12px):** Technical metadata only (route badges, timecodes, stack tags), never headlines.

### Iconography, Radius & Surface Discipline
- **`@phosphor-icons/react`** (`weight="bold"` / `"regular"`): Uniform icon family across the project.
- **Radius rules:** `rounded-full` reserved strictly for small pill buttons/tags/circular disc CTA; `rounded-xl` / `rounded-2xl` (`12px-16px`) for cards, panels, and monitor frames.
- **Glass cap:** Backdrop blur limited strictly to the floating scrolled navbar (1 element), keeping cards and overlays opaque and crisp.

## 3. Eight-Chapter Architecture & Motion Choreography

1. **Global Chrome (`Navbar`, `KineticThread`, `CustomCursor`):**
   - Theme-aware Navbar (`activeTheme` tracked via section ScrollTrigger boundaries so vermilion backgrounds never invert to cyan via blend mode), `.kx-roll-link` hover roll, `ID / EN` switcher, and full-bleed `#C92A1D` Vermilion Menu Overlay (`Escape` closable).
   - `KineticThread.jsx`: Continuous document-height SVG cubic Bezier path connecting `[data-thread-anchor]` targets with closed scribble loops, dual-clipped (`#C92A1D` on light/mist, `#FFFFFF` on dark/accent), scrubbed `0% -> 100%` on scroll (`< 768px` switches to clean edge progress hairline).
2. **Hero (`#hero`, Paper `#FFFFFF`):** Fits `100dvh`, scramble-decoded role line, 3-line display `<h1>` with clickable inline media pill cycling clean project plates, concise subcopy, dual single-line CTAs, and ticking SMPTE active-project strip.
3. **About & Credentials (`#about`, Paper `#FFFFFF`):** 12-col split with scroll-drawn double SVG scribble underline, 4 verified credential blocks (`01ST`, `06`, `03`, `CCNA`), 2-col human bio, and `RAKA ALPIANSYAH / BDG-01` ID card featuring `./foto1.webp` and email copy.
4. **Selected Work (`#projects`, Obsidian `#080A12` + `.kx-grain`):** Desktop pinned GSAP 3D cylindrical carousel rotating all 6 real projects, mobile touch snap carousel, keyboard arrow support, and Case Study Drawer (`Escape` closable) detailing challenge, solution, tech stack, live link, and GitHub link.
5. **Core Capabilities (`#capabilities`, Vermilion `#C92A1D` + `.kx-grid-accent`):** Opposing SVG elliptical arcs drawing downward on scroll to illuminate 6 engineering domains around centered display statement and CTA.
6. **Engineering Showreel (`#manifesto`, Obsidian `#080A12`):** Pinned GSAP split-expand revealing the lazy Three.js 3D `</>` sculpture & chains (retuned to vermilion `#ff5b4d` rim light + brushed silver) inside a full-bleed `.kx-scan` viewfinder as giant `CODE` and `CRAFT` words slide outward.
7. **Engineering Process (`#process`, Paper `#FFFFFF`):** Left sticky `4:5` dark viewfinder with scroll-driven vertical `clip-path` wipe; right 4 engineering phase cards with `#C92A1D` left progress rail and deliverables.
8. **Experience & Toolkit (`#experience`, Mist `#F5F4F0`):** Filterable career/education accordion + categorized 16-technology Toolkit inspector (real descriptions/highlights, zero fake `%` bars) + single page marquee (dual-row italic stack ticker).
9. **Contact & Footer (`#contact` Obsidian `#080A12`, `#footer` Vermilion `#C92A1D`):** Giant email + copy button, rotating-ring circular vermilion disc CTA opening/focusing the working direct message form (FormSubmit + `mailto:`), followed by 3-col footer, live Bandung WIB clock, `RAKA` clipped wordmark, and `BACK TO TOP` thread terminus.
