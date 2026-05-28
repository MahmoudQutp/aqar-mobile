# AQAR Luxury Design SystemSpec (v1.0.0)

This system establishes the "Billion-Dollar Dubai Real Estate Platform" look and feel for **AQAR (عقار)**, aligning with the official braided emblem logo and premium mobile proportions.

---

## 1. Visual Identity & Mood
- **Mood**: High-prestige, elite, minimal, secure-portal feel, blending ultra-modern Swiss grid alignments with traditional Arabic luxury layout logic.
- **Reference Inspiration**: Stripe dashboard elegance, Airbnb whitespace density, Linear interaction polish.

---

## 2. Core Colors (The Royal Prestige Palette)
- **Deep Obsidian (Main Accent / Base Canvas Dark)**: `#090e1a` / `#070c18`
- **Aqar Corporate Royal Blue (Primary Brand Color)**: `#0b53c7`
- **Soft Electric Royal**: `#2563eb` / `#1062e5`
- **Prestige Sand Gold (Highlight / Elite Accent)**: `#c5a059` (Darker: `#a27e3d`, Shimmer: `#e4ca93`)
- **Luxury Light Canvas (Soft High-End Gray Background)**: `#F4F6FA` / `#F8FAFC`
- **Pristine White**: `#FFFFFF`
- **Status Soft Tones**:
  - Success Green: `#059669` (Background: rgba(5,150,105,0.04))
  - Warning Gold: `#d97706` (Background: rgba(217,119,6,0.04))
  - Rose Danger: `#e11d48` (Background: rgba(225,29,72,0.04))

---

## 3. Typography Rules
- **Font Stack**: `'Inter', 'Cairo', system-ui, sans-serif`
  - Integrated with double-direction support (English left-to-right, Arabic right-to-left) seamlessly.
- **Micro UI Labels**: `text-[10px] uppercase font-mono tracking-[0.152em] font-extrabold`
- **Section Titles**: `text-lg font-extrabold tracking-tight text-slate-900`
- **Main Headings**: `text-2xl or text-3xl font-black text-slate-950`
- **Body & Captions**: `text-xs or text-sm leading-relaxed text-slate-500`

---

## 4. Spacing Hierarchy (Fluid & Consistent)
- **Compact Padding**: `p-3` (12px) for item arrays & grid items.
- **Standard Card Padding**: `p-6` (24px) for dashboard cards and mobile views.
- **Generous Container Spacing**: `p-8` / `p-10` for premium centered credentials / login.
- **Aesthetic White Space**: Avoid stacking interactive elements. Ensure at least `space-y-4` or `space-y-6`.

---

## 5. Shadow Scales (Luxurious Depths)
- **Micro (Shadow-3xs)**: `0 1px 2px rgba(11, 83, 199, 0.02)`
- **SaaS Subtle (Shadow-sm)**: `0 4px 16px -2px rgba(11, 83, 199, 0.03)`
- **Card Soft Shadow**: `0 12px 30px -4px rgba(11, 83, 199, 0.05), 0 4px 12px -2px rgba(11, 83, 199, 0.01)`
- **Extreme Elite Glow**: `0 32px 80px -20px rgba(11, 83, 199, 0.08), 0 0 1px rgba(11, 83, 199, 0.12)`

---

## 6. Border Radius Framework
- **Micro Badges**: `rounded-md` / `rounded-full`
- **Inputs & Select fields**: `rounded-2xl` (16px) for sleek, modern thumb contact.
- **Buttons**: `rounded-2xl` matching the input radius for consistent geometric alignment.
- **Standard Cards**: `rounded-[28px]` or `rounded-[32px]` for high-end boutique look.
- **Elite Main Card**: `rounded-[40px]` (Dubai premium finish).

---

## 7. Custom Global Component Definitions (CSS Classes)
These are integrated in `/src/index.css` and applied across all screens:
1. `.luxury-card`: background white, discrete blue border, refined animations on hover.
2. `.luxury-input`: rounded-2xl inputs with a soft `#0b53c7/6` focus ripple.
3. `.luxury-btn-primary`: elegant gradients, high-performance press/tilt effects, soft drop shadow.
4. `.luxury-btn-secondary`: thick contrast white button with delicate slate outline.
5. `.luxury-badge`: elegant status tracking.

---

## 8. Screen Specific Redesign Protocols
1. **Onboarding**: Soft lighting, premium typography pairing, clean navigation circles, custom braided icon logo.
2. **Auth/Login**: Ultra-modern, card layout with precise gold accents, demo credential boxes with luxurious design.
3. **Home & Explorers**: Replaced generic house indicator with `AQarLogoSVG`, streamlined status tabs, high contrast grid columns, luxurious card proportions.
4. **CRM & Admin Workspace**: Elegant stats, micro golden details, clean borders, high fidelity responsive drawers.
