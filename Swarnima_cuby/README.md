# Happy Birthday Swarnima 💗

A personal, animated birthday-surprise website built with Next.js 14, GSAP, Framer Motion, and Tailwind CSS.

## 🎬 Scenes

1. **Curtain Reveal** — Red theatre curtains part to reveal the stage
2. **Age Countdown** — "19" with spotlight + heart burst animation
3. **Birthday Balloons** — "20" with floating balloons, confetti, and letters
4. **Hero Section** — "Happy Birthday Swarnima" with grayscale photo garland on a looped path
5. **Polaroid Wall** — Captioned, rotated polaroids with heart pins and butterfly tooltip
6. **Scrapbook** — 3D page-flipping spiral-bound scrapbook
7. **Photo Galaxy** — Floating 3D photos on a starfield
8. **iMessage Chat** — iPhone-style chat with typewriter effect + replay

## 🚀 Run Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## 📸 Replace Photos

1. Replace files in `public/photos/` keeping the same filenames (see `public/photos/README.txt`)
2. Replace scrapbook images in `public/scrapbook/` (see `public/scrapbook/README.txt`)
3. Replace `public/audio/song.mp3` with your music
4. Edit all text, captions, and messages in `src/content/content.ts`

### Quick reference:
| Folder | Files | Purpose |
|--------|-------|---------|
| `photos/garland/` | g01-g28.webp | Garland photos (grayscale) |
| `photos/polaroids/` | p01-p10.webp | Polaroid wall photos |
| `photos/gallery/` | f01-f12.webp | Floating galaxy photos |
| `photos/avatar.webp` | 1 file | Chat contact avatar |
| `photos/cover.webp` | 1 file | Music player cover art |
| `scrapbook/` | cover + 8 spreads + stickers | Scrapbook pages |
| `audio/song.mp3` | 1 file | Background music |

## 🔧 Customize Content

All personal content is in **one file**: `src/content/content.ts`

- `name` — The name shown in orange on the hero
- `ageFrom` / `ageTo` — Countdown ages (19 → 20)
- `heroParagraph` — Text below the hero headline
- `polaroids` — Captions, positions, rotations
- `scrapbook.spreads` — Page images and quotes
- `chat.messages` — Chat bubble texts
- `chat.typedFinal` — The typewriter message

## 📦 Deploy to Vercel

### Option A: Import from GitHub
1. Push to GitHub: `git init && git add . && git commit -m "init" && git remote add origin <url> && git push -u origin main`
2. Go to [vercel.com](https://vercel.com), import the repo
3. Deploy automatically

### Option B: CLI
```bash
npx vercel --prod
```

## 🛠 Tech Stack

- **Next.js 14** (App Router, TypeScript)
- **Tailwind CSS** for styling
- **GSAP** for timeline and path animations
- **Framer Motion** for UI transitions
- **CSS 3D transforms** for scrapbook and galaxy
- **canvas-confetti** for particle effects

## 📝 Scripts

```bash
npm run dev        # Development server
npm run build      # Production build
npm run start      # Start production
npm run lint       # ESLint
npm run typecheck  # TypeScript check
```

## License

Private — personal birthday gift. Not for redistribution.
