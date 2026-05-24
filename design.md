# Design System
*Based on brittanychiang.com — extracted from live site source.*

## Overview
A minimalist, editorial-style dark portfolio. Strong typographic hierarchy, generous whitespace, and a deep navy backdrop create a focused, high-trust feel. Visual noise is extremely low — subtle teal accents and muted slate tones guide attention to content. No shadows, no gradients, no decorative effects.

---

## Colors

### Base Palette
| Role | Value | Tailwind |
|------|-------|----------|
| Page background | `#0f172a` | slate-900 |
| Primary text (headings, active) | `rgb(226, 232, 240)` | slate-200 |
| Body / secondary text | `rgb(148, 163, 184)` | slate-400 |
| Tertiary / labels | `rgb(100, 116, 139)` | slate-500 |
| Muted text | `rgb(203, 213, 225)` | slate-300 |
| Inactive nav indicators | `rgb(71, 85, 105)` | slate-600 |
| Dark neutral | `rgb(51, 65, 85)` | slate-700 |

### Accent (Teal)
| Role | Value |
|------|-------|
| Primary accent, hover links | `rgb(45, 212, 191)` — teal-400 |
| Bright accent, selection highlight | `rgb(94, 234, 212)` — teal-300 |
| Tag/pill background | `rgba(45, 212, 191, 0.10)` — teal-400/10 |
| Tag/pill text | teal-300 |
| Selection text | `rgb(19, 78, 74)` — teal-900 |

### Secondary Accent
- Skip-to-content / rare highlight: `rgb(234, 179, 8)` — yellow-500 / `#eab308`

### Borders & Overlays
| Role | Value |
|------|-------|
| Subtle border (default) | `rgba(226, 232, 240, 0.10)` |
| Border on hover | `rgba(226, 232, 240, 0.30)` |
| Card hover background | `rgba(30, 41, 59, 0.50)` — slate-800/50 |
| Mobile nav backdrop | `rgba(15, 23, 42, 0.75)` |
| Inset shadow | `inset 0 1px 0 0 rgba(148, 163, 184, 0.10)` |

### Text Selection
- Background: teal-300 (`rgb(94, 234, 212)`)
- Text: teal-900 (`rgb(19, 78, 74)`)

---

## Typography

**Font**: Inter (variable font, WOFF2)  
**CSS variable**: `--font-inter`  
**Font features**: `"ss03", "cv02", "cv11"` (stylistic alternates)  
**Rendering**: `antialiased`

### Scale
| Role | Size | Line-height | Weight | Notes |
|------|------|-------------|--------|-------|
| Display / H1 | 3rem (48px) | 1 | 700 | `text-5xl font-bold` |
| Section heading | 1.25rem (20px) | 1.75rem | 600–700 | `text-xl` |
| Subheading | 1.125rem (18px) | 1.75rem | 500–600 | `text-lg` |
| Body | 1rem (16px) | 1.625 | 400 | `leading-relaxed` |
| Small body | 0.875rem (14px) | 1.25rem | 400 | `text-sm` |
| Labels / nav | 0.75rem (12px) | 1rem | 700 | `text-xs font-bold uppercase tracking-widest` |

### Letter Spacing
- All-caps labels: `tracking-widest` (0.1em)
- Headings: `tracking-tight` (−0.025em)
- Standard: `tracking-wide` (0.025em)

---

## Layout

### Page Container
- Max-width: `1280px`
- Padding: `px-6` mobile → `px-12` md+
- Vertical padding: `py-16` md → `py-24` lg

### Two-Column (Desktop)
- Left sidebar (sticky): `lg:w-[48%]`, `lg:max-h-screen`, `lg:sticky lg:top-0`
- Right content: `lg:w-[52%]`
- Sidebar uses `lg:flex lg:flex-col lg:justify-between`

### Responsive Breakpoints
- sm: 640px / md: 768px / lg: 1024px / xl: 1280px

---

## Spacing

| Token | Value | Use |
|-------|-------|-----|
| xs | 0.25rem | Internal tight spacing |
| sm | 0.5–0.75rem | Gaps within components |
| md | 1rem | Standard field/row gaps |
| lg | 2–3rem | Section internal padding |
| xl | 4–6rem | Between major sections |
| page | 6rem (py-24) | Top/bottom page padding |

Scroll margin top: `4rem` sm, `6rem` lg (for anchor nav).

---

## Components

### Navigation (Sidebar)
```
Line indicator: h-px w-8 bg-slate-600
  → hover/active: w-16 bg-slate-200
Label: text-xs font-bold uppercase tracking-widest text-slate-500
  → hover/active: text-slate-200
Transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1)
```

### Tags / Pills
```
bg-teal-400/10  rounded-full  px-3 py-1
text-xs font-medium leading-5 text-teal-300
```

### Cards / Project Items
```
Grid: group relative grid gap-4 pb-1 sm:grid-cols-8
Border: border-2 border-slate-200/10 rounded
  → hover: border-slate-200/30
Hover bg: rgba(30, 41, 59, 0.50) on the card
Sibling dimming: lg:group-hover/list:opacity-50, hover:!opacity-100
Transition: all 0.15s
```

### Links / CTAs
```
Base: text-slate-200 font-medium text-base
Arrow icon: h-4 w-4
  → hover: -translate-y-1 translate-x-1
```

### Buttons
- Primary (rare): yellow-500 bg, dark text, rectangular, ~4px radius
- Secondary: transparent, 1px muted border, light text
- Link-style: no border, no fill, inline subtle action

### Images
```
border-2 border-slate-200/10 object-cover aspect-video rounded
→ hover: border-slate-200/30
```

---

## Animations & Transitions

### Default Transition
```css
transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
```

### Icon Hover
```css
transform: translateY(-1px) translateX(1px);
transition: transform 75ms;
```

### Spotlight Effect
- Radial gradient background following the mouse cursor
- Position: fixed, z-30
- Transition: 300ms

### Dialog Fade
```css
@keyframes fadeIn  { from { opacity: 0 } to { opacity: 1 } }  /* 0.7s ease-out */
@keyframes fadeOut { from { opacity: 1 } to { opacity: 0 } }  /* 0.5s ease-in  */
```

### Staggered Hover (multi-element)
- Delays: 50ms → 300ms in 25ms increments
- Used for multi-color hover interactions on grouped elements

### Accessibility
- `motion-reduce:transition-none` — respects `prefers-reduced-motion`

---

## Elevation & Depth

**Flat design.** No drop shadows for layout separation.
- Separation via: color contrast, whitespace, fine borders
- Only inset shadow used: `inset 0 1px 0 0 rgba(148,163,184,0.1)` on hover cards
- Drop shadows (`drop-shadow-md/lg`) only on floating elements like modals

---

## Backdrop Effects
- Mobile nav: `backdrop-blur` (8px)
- Subtle overlay: `backdrop-blur-sm` (4px)

---

## Do's and Don'ts
- **Do** use a restrained, editorial layout with generous negative space.
- **Do** prioritize tight typographic hierarchy — confident, compact headlines.
- **Do** keep backgrounds dark (`#0f172a`) and surfaces flat.
- **Do** use muted slate (`slate-400`) for body copy; reserve `slate-200` for emphasis.
- **Do** use teal as the primary accent (links, tags, active states).
- **Do** apply `border-slate-200/10` as the default border; bump to `/30` on hover.
- **Do** dim sibling cards on hover to focus attention on the hovered item.
- **Don't** introduce heavy shadows, gradients, or glossy effects.
- **Don't** use bright or saturated colors outside teal/yellow accent moments.
- **Don't** make buttons overly rounded or decorative.
- **Don't** crowd content — preserve 48–96px breathing room between sections.
- **Don't** use borders as the primary separator when whitespace can do the work.
