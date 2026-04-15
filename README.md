# Aurélia — Luxury Salon Web App

New York's premier luxury salon website built with Next.js 16, React 19, Tailwind CSS v4, and Framer Motion.

---

## Tech Stack

| Layer      | Technology                              |
| ---------- | --------------------------------------- |
| Framework  | Next.js 16 (App Router)                 |
| Language   | TypeScript 5                            |
| Styling    | Tailwind CSS v4                         |
| Animations | Framer Motion 12                        |
| Forms      | React Hook Form + Zod                   |
| Icons      | Lucide React                            |
| Analytics  | Vercel Analytics (`@vercel/analytics`)  |
| Fonts      | Playfair Display + Inter (Google Fonts) |

---

## Project Structure

```
salon_webapp/
├── app/                        # Next.js App Router pages
│   ├── about/page.tsx
│   ├── booking/page.tsx
│   ├── contact/page.tsx
│   ├── gallery/page.tsx
│   ├── services/page.tsx
│   ├── team/page.tsx
│   ├── globals.css
│   ├── layout.tsx              # Root layout — Navbar, Footer, ScrollProgress, Analytics
│   └── page.tsx                # Home page
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx          # Sticky transparent→frosted navbar, mobile overlay
│   │   └── Footer.tsx          # 4-column footer with hours, links, social
│   ├── sections/               # Full-page section components (one per route)
│   │   ├── HomePage.tsx
│   │   ├── AboutPage.tsx
│   │   ├── BookingPage.tsx
│   │   ├── ContactPage.tsx
│   │   ├── GalleryPage.tsx
│   │   ├── ServicesPage.tsx
│   │   └── TeamPage.tsx
│   └── ui/                     # Reusable animation primitives
│       ├── AnimatedSection.tsx  # Scroll-triggered entrance animations
│       ├── Card3D.tsx           # Mouse-tracking 3D tilt card
│       ├── ParallaxLayer.tsx    # Scroll-speed parallax wrapper
│       └── ScrollProgress.tsx  # Gold progress bar fixed to top of viewport
├── hooks/
│   ├── useMouseParallax.ts     # Normalised mouse position relative to element
│   └── useScrollAnimation.ts  # Scroll-based value utilities
├── lib/
│   ├── content-mock.json       # All site content (CMS-ready)
│   └── useContent.ts           # Typed content access hook
├── public/images/
│   ├── gallery/                # gallery-1.jpg … gallery-12.jpg
│   ├── team/                   # stylist-1.jpg … stylist-6.jpg
│   └── *.jpg                   # hero, about, services, testimonials, sustainability
└── types/
    └── content.ts              # TypeScript interfaces for content-mock.json
```

---

## Pages & Functionality

### `/` — Home

Composed of seven stacked sections:

| Section           | Details                                                                                                                                        |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Hero              | Full-viewport image background, animated headline + subheadline, CTA button to `/booking`, animated scroll indicator, floating 3D ring element |
| Stats Bar         | 4 animated counters (15+ years, 25 000+ clients, 18 stylists, 98% satisfaction) that count up on scroll into view                              |
| Intro             | Two-column layout — brand copy on the left, `Card3D` image on the right with mouse-tracking tilt                                               |
| Featured Services | 4-card grid with staggered `rotateY` flip-in animation on scroll; each card uses `Card3D`                                                      |
| Why Choose Us     | 6-feature grid with alternating left/right entrance animations                                                                                 |
| Testimonials      | Auto-advancing carousel (5 s interval) with spring-animated 3D card stack; manual dot navigation                                               |
| CTA Banner        | Full-width dark section with floating gold orbs and a prominent booking CTA                                                                    |

---

### `/services` — Services

- Sticky category tab bar (Cuts & Styling, Color, Treatments, Skincare, Nails, Bridal) with a shared `layoutId` spring underline
- Animated `AnimatePresence` grid swap when switching categories
- Each service card uses `Card3D` tilt and shows name, description, duration, and price
- Bottom consultation CTA linking to `/booking`
- 6 categories, 26 services total with full pricing

---

### `/gallery` — Gallery

- Sticky filter bar (All, Hair, Color, Skincare, Nails, Bridal) with spring-animated active pill
- CSS `columns` masonry grid (1 → 2 → 3 columns) with alternating aspect ratios (3:4, 1:1, 4:3)
- Each image has a hover overlay showing title and category tag
- `AnimatePresence` scale fade when filtering
- Lightbox: click any image to open a full-screen modal with scale-in animation; close via button or backdrop click
- 12 gallery images across 5 categories

---

### `/team` — Team

- Intro paragraph followed by a 3-column responsive grid
- Each team member card is a CSS 3D flip card — front shows portrait + name/role, back reveals bio, specialty tags, and social links
- Flip triggered on hover via CSS `rotateY(180deg)` with `backface-hidden`
- 6 team members: Creative Director, Senior Colorist, Senior Stylist, Bridal Specialist, Skin Care Specialist, Nail Artist

---

### `/about` — About

| Section        | Details                                                                                                                   |
| -------------- | ------------------------------------------------------------------------------------------------------------------------- |
| Hero           | 70 vh dark hero with subheading + serif headline                                                                          |
| Brand Story    | Two-column layout with brand origin text and story image                                                                  |
| Timeline       | 7-event alternating left/right timeline; vertical gold line draws in as you scroll using `useScroll` + `scaleY` transform |
| Mission        | Full-width dark section with mission statement                                                                            |
| Values         | 4-card grid with `rotate3d` entrance animation (Artistry, Excellence, Inclusivity, Sustainability)                        |
| Sustainability | Two-column layout with certification badges (Green Circle, Cruelty-Free, B-Corp Pending, Carbon Neutral)                  |
| Awards Marquee | Infinite horizontal scroll marquee of 5 awards; pauses on `prefers-reduced-motion`                                        |

---

### `/contact` — Contact

- Split two-column layout:
  - Left: address, phone (tel: link), email (mailto: link), full business hours table with today's row highlighted, social icon links
  - Right: contact form card with name, email, subject, and message fields
- Form validation via Zod schema (`react-hook-form` + `@hookform/resolvers/zod`)
- Animated inline error messages on invalid fields
- Loading spinner on submit (1.5 s simulated delay), then success state with checkmark animation
- Map placeholder section at the bottom

---

### `/booking` — Booking

A 4-step wizard with animated step transitions:

| Step                 | Details                                                                             |
| -------------------- | ----------------------------------------------------------------------------------- |
| 1 — Select Service   | 8 services shown as selectable cards with name, duration, and price                 |
| 2 — Choose Stylist   | 6 stylist cards with name and role                                                  |
| 3 — Pick Date & Time | Horizontally scrollable 14-day date picker + 18 time slot pills (9:00 AM – 5:30 PM) |
| 4 — Your Details     | Form: first name, last name, email, phone, optional notes; validated with Zod       |

- Step indicator bar shows completed (gold checkmark), active (gold ring), and upcoming (muted) states
- Slide transitions between steps using `AnimatePresence` with directional `x` offset
- Next button disabled until current step selection is complete
- Confirmation screen with pulsing `PartyPopper` icon on successful submission

---

## UI Components

### `AnimatedSection`

Scroll-triggered entrance animation wrapper. Supports directions: `up`, `down`, `left`, `right`, `scale`, `rotate3d`. Respects `prefers-reduced-motion` — renders a plain `div` when reduced motion is preferred.

### `Card3D`

Mouse-tracking 3D tilt card using `useMouseParallax`. Configurable `depth` prop (default 15°). Disabled on reduced motion.

### `ParallaxLayer`

Scroll-speed parallax wrapper. Configurable `speed` prop. Uses `useScroll` with element target offset. Disabled on reduced motion.

### `ScrollProgress`

Fixed gold progress bar at the top of the viewport driven by `useScroll` + `useSpring` for smooth easing.

---

## Layout

### `Navbar`

- Fixed, transparent on load; transitions to frosted glass (`bg-charcoal/95 backdrop-blur-md`) after 80 px of scroll
- Active route underline with shared `layoutId` spring animation
- Mobile: full-screen overlay with staggered link entrance animations, closes on route change

### `Footer`

- 4-column grid: brand tagline, quick links, contact info, business hours
- Social links (Instagram, Facebook)
- Dynamic copyright year

---

## Content System

All site content lives in `lib/content-mock.json` — a single structured JSON file covering:

- `brand` — name, tagline, phone, email, address, hours, social links
- `navigation` — nav items
- `home` — hero, stats, intro, featured services, why-us features, testimonials, CTA banner
- `services` — 6 categories with full service listings (name, duration, price, description)
- `gallery` — 12 images with category and alt text
- `team` — 6 members with bio, specialties, and social links
- `booking` — services list, stylists, time slots, confirmation copy
- `about` — story, timeline, mission, values, sustainability, awards
- `contact` — form fields, success message

The `useContent` hook provides fully typed access throughout the app. Swapping to a real CMS (Contentful, Sanity, etc.) only requires updating `useContent.ts`.

---

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Commands

```bash
npm run build          # Production build
npm run start          # Start production server
npm run lint           # Run ESLint
npm run format         # Format all files with Prettier
npm run format:check   # Check formatting without writing
```

---

## Analytics

Vercel Analytics is integrated via `<Analytics />` from `@vercel/analytics/next` in `app/layout.tsx`. Page view tracking activates automatically on Vercel deployments — no configuration required.

---

## Deployment

```bash
npx vercel
```

Or connect the repository in the [Vercel dashboard](https://vercel.com/new) for automatic deployments on every push.
