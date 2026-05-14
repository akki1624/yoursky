# The Sky Kept Your Wishes ✨

A cinematic, interactive birthday website built as an 11-day journey from May 15 to May 25, 2026. Crafted with a magical romantic fairytale aesthetic — dreamy nights, glowing lanterns, floating hearts, animated fireflies, and an enchanted night world palette.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | TanStack Start |
| Frontend | React 19, TanStack Router v1 |
| Build | Vite 7 |
| Styling | Tailwind CSS 4 + custom CSS animations |
| Fonts | Playfair Display, Dancing Script, Cormorant Garamond |
| Storage | Netlify Blobs (reactions, replies, wish jar) |
| Deployment | Netlify |

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home — Hero, Countdown, Timeline Preview, Wish Jar Preview, Tonight's Sky |
| `/birthday` | Full 11-day journey overview with all timeline cards |
| `/birthday/$day` | Individual day page (poem, memory, song, surprise, reactions) |
| `/memories` | Polaroid memory wall with 15 placeholder cards |
| `/wish-jar` | Interactive firefly mini-game |
| `/feeling` | I Am Feeling — emoji grid with rotating romantic messages |
| `/gift` | May 25 final page with animated envelope reveal |

## Running Locally

```bash
npm install
npm run dev        # Start dev server at localhost:3000
npm run build      # Production build
```

Or with Netlify CLI for full feature emulation (blobs, etc.):
```bash
netlify dev
```

## Customizing Content

All content is stored in `src/data/`:

- **`journey.ts`** — The 11-day journey: poems, song titles, memory notes, bonus surprises, lock/unlock dates
- **`memories.ts`** — 15 polaroid memory cards with titles, dates, notes, and tags
- **`feelings.ts`** — 10 emotional states each with 15 romantic messages
- **`wishJar.ts`** — The relationship question, answer options, and 3 wish choices

### What you need to replace:
- Text in `src/data/journey.ts` — poems, song titles, memory notes
- Photos — add actual image paths in `src/data/memories.ts` and `src/routes/birthday_.$day.tsx`
- Audio files — add the audio src in `src/components/MusicPlayer.tsx`
- Gift URL in `src/routes/gift.tsx` — replace `GIFT_URL` with the second website URL
- Question + correct answer in `src/data/wishJar.ts`
- Wishes in `src/data/wishJar.ts`
- Lock/unlock dates: set `locked: true` and `unlockDate` values in `journey.ts`

## Environment Variables

No environment variables required for local development. Netlify Blobs is automatically available in Netlify deployments.
