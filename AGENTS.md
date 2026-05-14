# AGENTS.md

## Project Overview

"The Sky Kept Your Wishes ✨" is a cinematic interactive birthday website for a romantic 11-day birthday journey (May 15–25, 2026). It is a personal, emotional experience — NOT a product site, portfolio, or corporate site.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | TanStack Start (SSR-capable) |
| Frontend | React 19, TanStack Router v1 |
| Build | Vite 7 |
| Styling | Tailwind CSS 4 + custom keyframe animations in `src/styles.css` |
| Fonts | Google Fonts — Playfair Display (serif headings), Dancing Script (romantic script), Cormorant Garamond (body) |
| Storage | Netlify Blobs via `@netlify/blobs` |

## Directory Structure

```
src/
├── components/
│   ├── Navbar.tsx            # Sticky glassmorphism navbar
│   ├── Countdown.tsx         # Live countdown to May 22, 2026
│   ├── StarField.tsx         # Canvas — stars, floating lanterns, purple particles
│   ├── SparkleCanvas.tsx     # Canvas — ambient sparkle particles
│   ├── FloatingHearts.tsx    # Ambient floating heart particles
│   ├── TimelineCard.tsx      # Journey day card (linked, lock/unlock state)
│   ├── MemoryCard.tsx        # Polaroid memory card + modal
│   ├── WishJarGame.tsx       # Interactive firefly catch → question → 3 wishes
│   ├── MusicPlayer.tsx       # Floating vinyl player (add audio src to activate)
│   ├── EnvelopeReveal.tsx    # Animated envelope → final letter + gift button
│   ├── TonightsSky.tsx       # Daily moon phase + constellation + quote widget
│   ├── ReactionPanel.tsx     # Emoji reactions + text reply (posts to /api/reactions)
│   └── Footer.tsx            # Branded footer with nav links
│
├── data/
│   ├── journey.ts            # 11-day journey data (poems, songs, memory notes)
│   ├── memories.ts           # 15 polaroid memory placeholders
│   ├── feelings.ts           # 10 feelings × 15 romantic messages each
│   └── wishJar.ts            # Question, answer options, 6 wish choices
│
├── routes/
│   ├── __root.tsx            # Root layout: Google Fonts, meta tags
│   ├── index.tsx             # Home page (hero, countdown, timeline, wish jar preview, sky widget)
│   ├── birthday.tsx          # Full 11-day journey overview
│   ├── birthday_.$day.tsx    # Individual day page (flat route — no layout inheritance from birthday.tsx)
│   ├── memories.tsx          # Polaroid memory wall
│   ├── wish-jar.tsx          # Wish jar mini-game page
│   ├── feeling.tsx           # "I Am Feeling" emotional message grid
│   ├── gift.tsx              # May 25 gift reveal with envelope animation
│   ├── api.reactions.ts      # GET/POST reactions and replies per day (Netlify Blobs)
│   └── api.wish-jar.ts       # GET/POST wish jar results (Netlify Blobs)
│
├── styles.css                # All custom CSS: variables, animations, utility classes, glassmorphism
└── router.tsx                # TanStack Router setup
```

## Key Architecture Decisions

### Route Naming — `birthday_.$day.tsx`
The underscore suffix in `birthday_.$day.tsx` is the TanStack Router v1 convention for a "flat" (non-nested) route. It creates the URL `/birthday/$day` without inheriting the layout from `birthday.tsx`. This means each day page is fully self-contained.

### Visual System
All colors, animations, and glassmorphism styles are defined as CSS custom properties and keyframe animations in `src/styles.css`. Never use raw color values in components — use the CSS variables (e.g., `var(--purple-bright)`) or the defined utility classes (`.glass`, `.glass-gold`, `.glow-purple`, etc.).

### Background Layers (z-index stacking)
1. `StarField` canvas (z-index: 0) — stars, lanterns, particles
2. `SparkleCanvas` (z-index: 1) — star-shaped sparkles
3. `FloatingHearts` (z-index: 3) — ambient hearts
4. Main content (z-index: 10+)
5. `Navbar` (z-index: 50)
6. `MusicPlayer` (z-index: 40)
7. Modals/overlays (z-index: 50+)

### Palette
```
Night deep: #05020d
Night mid: #0d0520
Purple: #6b21a8 → #a855f7 → #c084fc
Pink: #ec4899 → #f472b6
Gold: #f59e0b → #fbbf24 → #fde68a
Cream: #fdf4e7
```

### Data Persistence
All user interactions (reactions, replies, wish jar results) are persisted via Netlify Blobs using the `@netlify/blobs` package. API routes are in `src/routes/api.*.ts` using TanStack Start's `createAPIFileRoute`.

### Lock/Unlock System
Each day in `src/data/journey.ts` has `locked: boolean` and `unlockDate: string`. Currently all days are `locked: false` for testing. To enable time-locked reveal:
```ts
locked: true,
unlockDate: '2026-05-15',
```
The locked state shows a glowing lock icon and countdown. The logic is in `birthday_.$day.tsx` — `LockedScreen` component.

## Coding Conventions

- Font classes: `font-serif` (Playfair Display), `font-script` (Dancing Script), `font-body` (Cormorant Garamond)
- All inline styles use the night palette CSS variables or hex values from the palette above
- Glassmorphism cards: use `.glass`, `.glass-gold`, or `.glass-pink` CSS classes
- Hover effects: apply via `onMouseEnter`/`onMouseLeave` — avoid relying on CSS `:hover` for complex animations
- Canvas animations: use `requestAnimationFrame`, always clean up with `cancelAnimationFrame` on unmount

## Content Customization Points

Everything a user needs to replace is marked with `[...]` brackets in the data files:

1. `src/data/journey.ts` — poems, song titles, memory notes, bonus surprises, locked/unlockDate
2. `src/data/memories.ts` — memory titles, dates, notes, image paths
3. `src/data/feelings.ts` — already complete with 150 messages (10 × 15)
4. `src/data/wishJar.ts` — relationship question, answer options, correct answer, 6 wish choices
5. `src/routes/gift.tsx` → `GIFT_URL` constant — the second website URL
6. `src/components/MusicPlayer.tsx` → `track.src` — the audio file path
