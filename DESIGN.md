# VENOM SYMBIOTE DESIGN SYSTEM
## Project Design Specification & Art Direction | SVK Creationz

Author: Creative Director & Frontend Architect  
Brand: SVK Creationz (Vignesh)  
Project: Venom Symbiote Developer Portfolio  
Target URL: https://vignesh24portfolio.netlify.app/  

---

## 1. VISION & CREATIVE DIRECTIVE

Transform the portfolio into an organic, intelligent, evolving alien symbiote interface inspired by Marvel and Sony Pictures' **Venom**. The experience is neither a cheesy horror template nor a generic dark-mode site. It is a high-tech bio-digital organism that has bonded with Vignesh's developer identity:
- **Living Bio-Digital Organism**: Wet surfaces, fluid tendrils, undulating membranes, breathing animations, and tactile responsiveness.
- **Cinematic Production Quality**: Deep abyss contrast, specular liquid-metal reflections, subtle crimson bio-luminescence, and razor-sharp typographic hierarchy.
- **Professional Usability**: High legibility, crisp project descriptions, functional external links, accessible keyboard navigation, and responsive 60 FPS performance.

---

## 2. COLOR PALETTE & TOKENS

```css
:root {
    /* Primary Black Spectrum */
    --color-abyss: #050506;          /* Deepest background void */
    --color-symbiote-black: #0a0b0d; /* Primary surface container */
    --color-graphite: #151619;       /* Secondary card background */
    --color-gunmetal: #25272c;       /* Card borders & membrane highlights */
    --color-wet-sheen: #3a3d45;      /* Specular gloss reflection */

    /* Crimson Energy Spectrum */
    --color-venom-crimson: #b20d26;  /* Primary active accent, glowing tendril veins */
    --color-blood-deep: #640916;     /* Subsurface scattering glow */
    --color-crimson-glow: rgba(178, 13, 38, 0.45);
    --color-crimson-subtle: rgba(178, 13, 38, 0.12);

    /* Text & Bone Spectrum */
    --color-bone-white: #f4f2ee;     /* High-contrast headings and primary text */
    --color-cold-silver: #bfc4ca;    /* Secondary text & metallic accents */
    --color-ash: #828790;           /* Tertiary text, captions & metadata */

    /* Bioluminescent Cyber Accent */
    --color-bio-cyan: #00f2fe;       /* Subtle starlight / plasma highlights */
    --color-bio-cyan-glow: rgba(0, 242, 254, 0.25);

    /* Surface Finishes */
    --surface-glass-wet: rgba(10, 11, 13, 0.75);
    --surface-border-subtle: rgba(191, 196, 202, 0.12);
    --surface-border-active: rgba(178, 13, 38, 0.55);
    --surface-membrane: linear-gradient(135deg, rgba(37,39,44,0.6) 0%, rgba(10,11,13,0.9) 100%);

    /* Shadows & Glows */
    --shadow-symbiote: 0 20px 50px rgba(0, 0, 0, 0.85), 0 0 30px rgba(178, 13, 38, 0.08);
    --shadow-wet-rim: inset 0 1px 1px rgba(255, 255, 255, 0.18), inset 0 -1px 1px rgba(0, 0, 0, 0.8);
    --glow-crimson: 0 0 25px rgba(178, 13, 38, 0.5);
    --glow-tendril: 0 0 12px rgba(178, 13, 38, 0.8);

    /* Typography */
    --font-display: 'Space Grotesk', 'Outfit', sans-serif;
    --font-heading: 'Outfit', sans-serif;
    --font-body: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    --font-mono: 'JetBrains Mono', monospace;

    /* Motion Curves */
    --ease-organic: cubic-bezier(0.19, 1, 0.22, 1);
    --ease-elastic: cubic-bezier(0.34, 1.56, 0.64, 1);
    --ease-fluid: cubic-bezier(0.16, 1, 0.3, 1);
    --duration-snap: 200ms;
    --duration-flow: 450ms;
    --duration-breathe: 4000ms;
}
```

---

## 3. TYPOGRAPHIC HIERARCHY

1. **Hero Title / Apex Heading**:
   - Font: `Space Grotesk`, Weight: 800, Uppercase.
   - Letter-spacing: `0.08em`.
   - Effect: Subtle wet liquid-silver gradient with crimson specular rim lighting.
2. **Section Headings**:
   - Font: `Space Grotesk` / `Outfit`, Weight: 700.
   - Accented with a live organic symbiote tendril line indicator and glowing biological prefix (e.g. `// 01. THE HOST`, `// 02. SYMBIOTE PROJECTS`).
3. **Card Titles & Subheadings**:
   - Font: `Outfit`, Weight: 600-700, Color: `var(--color-bone-white)`.
4. **Body Copy & Descriptions**:
   - Font: `Inter`, Weight: 400-500, Color: `var(--color-cold-silver)` with `line-height: 1.6`.
5. **Tags & Meta Pills**:
   - Font: `Inter`, Weight: 500, Font Size: `0.75rem`, Background: `rgba(178, 13, 38, 0.08)`, Border: `rgba(178, 13, 38, 0.25)`, Color: `var(--color-bone-white)`.

---

## 4. SIGNATURE INTERACTION — SYMBIOTE GRAB BUTTON (`SymbioteGrabButton`)

### Concept
A button that acts like an aware organism detecting prey. When the mouse cursor enters its detection radius (~120px):
1. **Detection Phase (Hysteresis Active)**:
   - Button senses mouse position vector `(dx, dy)`.
   - Symbiote surface swells slightly toward the cursor.
2. **Reaching Phase (180ms - 280ms)**:
   - Dynamic SVG procedural tendril tentacles sprout from the button edge facing the cursor.
   - Curved cubic Bézier strands calculate an organic trajectory connecting the button anchor to the cursor coords.
3. **Grab & Tension Phase (120ms - 220ms)**:
   - Tendrils latch visually onto the cursor with an elastic pull line.
   - The button subtly shifts (magnetic pull of 4–8px) toward the pointer.
   - Glow pulse emanates along the tendrils into the button core.
4. **Release Phase (200ms - 320ms)**:
   - As cursor breaks beyond the threshold (~140px exit radius), tendrils snap back elastically and dissolve into droplets.
   - Button returns to rest with smooth damping.
5. **Click Contraction**:
   - High-energy impulse contraction (scale 0.95, crimson energy wave).
   - Instant activation of target action (no delay for user navigation).
6. **Mobile / Touch Behavior**:
   - Cursor proximity is gracefully replaced with a tactile touch tendril burst & pulse effect.

---

## 5. 3D HERO SYMBIOTE ENVIRONMENT (Three.js WebGL)

### Visual Anatomy
- **Central Organism Core**:
  - Sculpted organic procedural mesh with custom vertex displacement simulating pulsing breathing, shifting tendril tendrils, and organic membrane flow.
  - Specular wet gloss material (`MeshPhysicalMaterial` with `roughness: 0.15`, `metalness: 0.85`, `clearcoat: 1.0`, `clearcoatRoughness: 0.1`, black body color with blood-red and cold-silver rim lighting).
- **Branching Tendril Strands**:
  - 3D spline curves orbiting the organism, extending and retracting like sentient alien filaments.
- **Symbiote Spores & Atmospheric Embers**:
  - 400 floating micro-spores with gentle Brownian motion, reacting to mouse velocity and scroll speed.
- **Lighting Setup**:
  - Key Light: PointLight (Crimson #B20D26) casting blood-red reflections.
  - Rim Light: PointLight (Cold Silver #E0E4E8) highlighting wet gloss edges.
  - Ambient: Deep navy-black starlight (#050810).
  - Cursor Tracking Light: Dynamic point light following pointer in 3D space.

---

## 6. COMPONENT ARCHITECTURE & SECTION TREATMENTS

- **Exoskeleton Floating Nav**:
  - Dark glassmorphic capsule with glossy rim, symbiote logo icon, active crimson node, and mobile tendril drawer.
- **Hero Section**:
  - Cinematic split: Left side typography with `SymbioteGrabButton`, right side living 3D symbiote organism with portrait integrated into organic bio-frame.
- **About Section ("The Host")**:
  - Bio with high-contrast typography, live stat counter pods with crimson energy meters.
- **Background Section ("Symbiote Evolution")**:
  - Timeline styled as branching neural tendrils linking Education, Skills, and Expertise.
- **Projects Section ("Living Creations")**:
  - 2-column grid layout with wet gloss cards, moving tendril highlights on hover, 3D tilt, and direct action buttons.
- **My Work Section ("Mobile Neural Grid")**:
  - 3-column mobile-optimized circular showcase pods with auto-flowing rows.
- **Contact Section ("Synapse Chamber")**:
  - Biomechanical communication terminal with interactive form and signature grab button.
- **Footer**:
  - Monochromatic abyss footer with subtle tendril roots and SVK Creationz copyright.

---

## 7. PERFORMANCE & ACCESSIBILITY GUARANTEES

- Target 60 FPS across desktop, tablet, and mobile.
- Single WebGL canvas for background and hero organism.
- Procedural SVG tendrils rendered on a lightweight shared canvas/SVG layer with requestAnimationFrame batching.
- `prefers-reduced-motion` disables aggressive tendril tracking and replaces with smooth fade transitions.
- Full screen reader semantic structure and keyboard tab navigation preserved.
- No artificial loading barriers or external paid dependencies.
