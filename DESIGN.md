# DESIGN SYSTEM — MINIMAL BLACK & WHITE VENOM SYMBIOTE

A minimal, premium, monochromatic design system inspired by Marvel and Sony Pictures' **VENOM symbiote**, crafted exclusively for a high-performance developer portfolio.

---

## 1. Core Philosophy: Less is More

**Minimal interface + monochromatic palette + subtle symbiote behavior.**

The Venom symbiote theme is conveyed through:
- **Materiality**: Glossy obsidian surfaces, deep charcoal panels, and sharp pure-white specular highlights.
- **Form**: Thin organic tendril contours, delicate biological edge filigree, and liquid-smooth transitions.
- **Motion**: Fluid, intelligent cursor-proximity response via the signature `SymbioteGrabButton`.
- **Restraint**: Strict elimination of unnecessary clutter, horror-tropes, colored lights, smoke/fog overlays, and noisy backgrounds.

---

## 2. Monochromatic Color Tokens

Strictly black, white, and neutral gray. No chromatic accents (no red, cyan, blue, green, purple, or rainbow gradients).

```css
:root {
  /* Core Palette */
  --venom-black:        #000000; /* Pure void / deep canvas */
  --venom-abyss:        #080808; /* Obsidian dark surfaces */
  --venom-surface:      #111111; /* Section backgrounds & navigation */
  --venom-card:         #171717; /* Card containers & elevated panels */
  --venom-card-hover:   #1f1f1f; /* Card hover elevation */
  
  /* Borders & Dividers */
  --venom-border:       #292929; /* Subtle boundaries & separators */
  --venom-border-hover: #444444; /* Interactive element border hover */
  --venom-border-light: rgba(255, 255, 255, 0.15); /* Delicate specular rim */
  --venom-border-focus: #ffffff; /* Accessible focus rings */

  /* Typography & Contrast */
  --venom-gray:         #888888; /* Secondary captions & metadata */
  --venom-muted:        #b8b8b8; /* Paragraph body & descriptions */
  --venom-soft-white:   #f5f5f5; /* Primary body text & subheadings */
  --venom-white:        #ffffff; /* Main headings, CTA text & highlights */

  /* Organic Sheen & Tendril Accents */
  --venom-sheen:        rgba(255, 255, 255, 0.08); /* Wet organic sheen */
  --venom-tendril:      #ffffff;                    /* Tendril strand color */
  --venom-tendril-dark: #000000;                    /* Contrast tendril on light */
}
```

---

## 3. Typography & Hierarchy

Clean, modern, and highly legible typography prioritizing content clarity:

- **Display & Headings**: `Outfit`, `Space Grotesk`, sans-serif.
  - Weights: `700`, `800`
  - Letter-spacing: `-0.02em` for large headers, `+0.05em` for uppercase labels
- **Body & Captions**: `Inter`, system-ui, sans-serif.
  - Weights: `400` (body), `500` (medium), `600` (semi-bold)
  - Line-height: `1.6`
- **Monospace & Metadata**: `monospace`, `JetBrains Mono` for tags and code elements.

---

## 4. Signature Interaction: Symbiote Grab Button

The signature interaction provides a tactile, bio-digital illusion of an intelligent symbiote extending toward the user's cursor without ever trapping or altering the physical operating system cursor.

### Parameters & Physics
- **Proximity Detection Radius**: `110px` around the button bounding box.
- **Tendril Reach**: `60px` to `120px` dynamic length based on cursor distance.
- **Geometry**: Procedural SVG cubic Bézier spline (`C` command) with dual control points creating a natural organic curvature that stretches and bows under tension.
- **End-Tip Suction Bulb**: A `2.5px` to `3.5px` radius terminal droplet rendered at the cursor point to visually connect the strand.
- **Magnetic Button Translation**: Subtle spring translation (`3px` to `6px`) in the direction of the cursor.
- **Click Contraction**: Immediate `scale(0.97)` contraction with instantaneous execution of the button's native action (zero latency for links and forms).
- **Mobile / Touch Devices**: Proximity detection is bypassed entirely; replaced with a lightweight CSS touch-feedback ripple.
- **Accessibility**: Standard Tab key focus displays a clean `2px solid #ffffff` outline. Fully respects `prefers-reduced-motion: reduce`.

---

## 5. Subtle 3D Organism & Particle Architecture

- **Engine**: Three.js WebGL Renderer (`#bg-3d-canvas`).
- **Visuals**:
  - Monochrome materials with high specular shininess (`MeshPhongMaterial`, `MeshStandardMaterial` in `#080808` and `#111111` with white highlights).
  - Floating icosahedral geometric core with delicate white wireframe segments.
  - Monochromatic starlight / spore particles (`0xffffff`, `0x888888`) drifting slowly in 3D depth.
  - White point light (`0xffffff`, intensity `1.2`) following cursor coordinates with smooth damping.
- **Performance**:
  - Automatically pauses when the browser tab is hidden or backgrounded (`document.hidden`).
  - Capped pixel ratio (`Math.min(window.devicePixelRatio, 1.5)`).

---

## 6. Layout & Grid Preservation

- **Projects Grid (`.projects-grid`)**:
  - Strictly 2 columns per row across desktop and tablet screens (`grid-template-columns: repeat(2, 1fr)`).
  - Auto-flowing rows accommodating all projects.
- **My Work Grid (`.more-work-grid`)**:
  - Desktop: 3-column / 4-column balanced grid.
  - Mobile (`<= 768px`): Strictly 3 columns per row (`grid-template-columns: repeat(3, 1fr)`) with compact cards.

---

## 7. Quality & Safety Constraints

- 100% preservation of all portfolio data, personal details, project links, APK downloads, and contact methods.
- Zero external tracking or breaking dependencies.
- Strict Content Security Policy (CSP) alignment.
