# TRD — Interactive Birthday Experience Website

> Technical spec for an AI coding agent. Read `01_PRD.md` (what) and `02_DESIGN.md` (how it looks) first.
> Evidence from the video: browser tab title **"Create Next App"** and URL **`second-birthday-version.vercel.app`** → the original is a **Next.js** project deployed on **Vercel**.

## 1. Recommended stack

| Layer | Choice | Why |
|-------|--------|-----|
| Framework | **Next.js 14/15 (App Router) + TypeScript** | Matches the original (create-next-app) |
| Styling | **Tailwind CSS** + CSS variables from `02_DESIGN.md` | Fast, token-based |
| Animation (timeline, scroll, path) | **GSAP** (core, ScrollTrigger, MotionPathPlugin) | Garland-on-path, timelines, scene control |
| UI/micro animation | **Framer Motion** | Chat bubbles, tooltip, hover, page transitions |
| 3D starfield | **CSS 3D transforms** (simple) or **@react-three/fiber + drei** (richer) | Floating photo galaxy |
| Confetti / particles | **canvas-confetti** + a small custom canvas for embers/dust | Lightweight |
| Audio | **HTML5 Audio** wrapper (or Howler.js) | Music + player UI |
| Page flip | Custom CSS 3D flip (or `react-pageflip`) | Scrapbook spreads |
| Fonts | `next/font/google` | See design file §3 |
| Hosting | **Vercel** | Same as original |
| Package manager | pnpm or npm | — |

No backend and no database. Everything is static.

## 2. Project structure

```
birthday-site/
├─ public/
│  ├─ audio/song.mp3
│  ├─ photos/
│  │  ├─ garland/g01.webp … g28.webp
│  │  ├─ polaroids/p01.webp … p10.webp
│  │  ├─ gallery/f01.webp … f12.webp
│  │  └─ avatar.webp, cover.webp
│  └─ scrapbook/
│     ├─ cover.png
│     ├─ stickers/*.png        (butterfly, hamster, cat, disco-ball, vinyl, bows…)
│     └─ spreads/spread-1…5.png (optional pre-composed pages)
├─ src/
│  ├─ app/
│  │  ├─ layout.tsx            (fonts, metadata — change title from "Create Next App")
│  │  ├─ page.tsx              (mounts <Experience />)
│  │  └─ globals.css           (tokens from design file)
│  ├─ content/content.ts       ← ALL editable text/photos/messages
│  ├─ components/
│  │  ├─ Experience.tsx        (scene orchestrator / state machine)
│  │  ├─ StartGate.tsx         ("tap to begin" – unlocks audio)
│  │  ├─ MusicPlayer.tsx
│  │  ├─ scenes/
│  │  │  ├─ Curtains.tsx
│  │  │  ├─ Countdown.tsx      (22 → heart burst → 23 + balloons)
│  │  │  ├─ Hero.tsx           (headline + Garland)
│  │  │  ├─ Garland.tsx        (photos on looped path)
│  │  │  ├─ PolaroidWall.tsx
│  │  │  ├─ Scrapbook.tsx
│  │  │  ├─ PhotoGalaxy.tsx
│  │  │  └─ ChatScene.tsx
│  │  ├─ ui/ Polaroid.tsx, Balloon.tsx, Tooltip.tsx, PhoneFrame.tsx, ChatBubble.tsx
│  ├─ hooks/ useAudio.ts, useReducedMotion.ts, useTypewriter.ts
│  └─ lib/ path.ts (SVG path helpers), random.ts, preload.ts
├─ tailwind.config.ts
└─ next.config.js
```

## 3. Content config (single source of truth)

```ts
// src/content/content.ts
export const content = {
  name: "Sweety",
  ageFrom: 22,
  ageTo: 23,
  heroParagraph:
    "wishing you a day filled with love, laughter, and all the happiness your heart can hold. May this year bring you endless joy and unforgettable memories. Happy Birthday!",
  music: { src: "/audio/song.mp3", title: "Sweety Song", subtitle: "BIRTHDAY PLAYLIST", cover: "/photos/cover.webp" },
  garland: Array.from({ length: 28 }, (_, i) => ({ src: `/photos/garland/g${String(i + 1).padStart(2, "0")}.webp`, alt: "" })),
  polaroids: [
    { src: "/photos/polaroids/p01.webp", caption: "Cutie 🥺",     x: 3,  y: 12, rot: -6 },
    { src: "/photos/polaroids/p02.webp", caption: "Baddie 😎",    x: 27, y: 6,  rot: 3  },
    { src: "/photos/polaroids/p03.webp", caption: "My Love",       x: 6,  y: 52, rot: -4 },
    { src: "/photos/polaroids/p04.webp", caption: "Dream Girl 💫", x: 12, y: 62, rot: 5  },
    { src: "/photos/polaroids/p05.webp", caption: "Sunshine 🌞",   x: 30, y: 52, rot: -3 },
    { src: "/photos/polaroids/p06.webp", caption: "Queen",          x: 46, y: 48, rot: 4  },
    { src: "/photos/polaroids/p07.webp", caption: "Pretty ✨",      x: 70, y: 18, rot: 2  },
    { src: "/photos/polaroids/p08.webp", caption: "Beautiful 🌸",   x: 68, y: 52, rot: -5 },
    // add ~2 more
  ],
  butterflyQuote: "Looks like you're really good at catching butterflies… no wonder you caught my heart so easily. ❤️",
  scrapbook: {
    cover: "/scrapbook/cover.png",
    spreads: [
      { left: "/scrapbook/spreads/spread-1-left.png",  right: "/scrapbook/spreads/spread-1-right.png",
        quotes: ["You are the stars in my dark and cold nights— shining and unwavering.",
                 "may the flowers remind us why the rain was so necessary."] },
      // spreads 2–5: vinyl/cat page, disco-ball page, etc.
    ],
  },
  gallery: Array.from({ length: 12 }, (_, i) => `/photos/gallery/f${String(i + 1).padStart(2, "0")}.webp`),
  chat: {
    contactName: "My love 💗",
    status: "iMessage · online now",
    avatar: "/photos/avatar.webp",
    time: "5:32 PM",
    messages: [
      { text: "Happpyyyyyy Birthday love," },
      { text: "<replace: second message — video text unreadable>" },
      { text: "<replace: third message — video text unreadable>" },
    ],
    typedFinal: "i hope ye dekh ke apke chotu se face pe ek badi si smile to aai h",
  },
};
```

## 4. Architecture

### 4.1 Scene orchestrator (state machine)

```ts
type SceneId = "gate" | "curtains" | "countdown" | "hero" | "wall" | "scrapbook" | "galaxy" | "chat";
```

- `Experience.tsx` holds `scene` state and renders **one scene at a time** inside `<AnimatePresence mode="wait">`, except hero→wall→scrapbook which may be a scroll-driven stack (see 4.2).
- Each scene exports `onComplete()` which advances to the next scene.
- Global timeline lengths (defaults): curtains 2 s → countdown 4 s → balloons/23 3 s → hero until user scrolls/clicks (or 8 s auto) → wall until user scrolls/clicks → scrapbook (user flips pages or auto every 3 s) → galaxy 5 s auto → chat plays out, ends with "replay".
- `replay()` resets state to `curtains` and rewinds audio to 0 (or keeps music playing — configurable).

### 4.2 Navigation mode (original unknown → implement hybrid)

- Scenes 1–3 and 7: **auto timeline** (GSAP).
- Scenes 4–6: **advance via scroll / swipe / "next" arrow or auto-advance after N seconds**. Implement with a wheel/touch listener that triggers `next()` with a 900 ms lock, not native page scroll.
- Scene 8: **auto-play** chat sequence.
- Provide `?autoplay=1` URL param for hands-free mode matching the video pacing.

### 4.3 Start gate and audio

- Browsers block autoplay → show a minimal "tap to begin" overlay (heart icon). On click: create/resume `AudioContext`/play `<audio>`, then start Scene 1.
- `MusicPlayer` shows cover, title, subtitle, progress (`timeupdate`), play/pause. It appears from scene 2 onward (bottom-center) and persists across scenes (hide in chat scene or keep small).
- Persist nothing to localStorage (not needed).

### 4.4 Scene implementation notes

**Curtains.** Two `div`s with repeating-linear-gradient pleats; GSAP `x: ±100%`, `duration:1.4`, ease `power3.inOut`.

**Countdown.**
1. Show `ageFrom` with spotlight; GSAP fade in (scale .9 → 1, blur 12 → 0).
2. After 2 s: number blurs out → `HeartBurst` canvas (two glowing lobes + embers, 1.2 s).
3. Show `ageTo` on blurred photo background; spawn 10 balloons (random x, rise 6–9 s, sway), 40 confetti via `canvas-confetti`, floating letters of "happy birthday".
4. Transition: white flash → Hero.

**Garland (core effect).**
- Define an SVG `<path>` with a loop (cubic béziers). Example normalized (viewBox 0 0 1000 400):
  `M -50 330 C 150 380, 300 300, 420 280 C 520 262, 600 330, 540 200 C 490 90, 380 120, 410 220 C 440 320, 600 330, 760 250 C 880 190, 960 120, 1050 90`
  (Agent: tune so the path forms one visible circular loop near x≈50% and runs low-left → high-right.)
- Use GSAP **MotionPathPlugin**: for each photo `i` (N=28), animate `progress` from `i/N` → `i/N + 1` repeating linearly (`ease:"none"`, duration ≈ 55–70 s) with `autoRotate: true` plus random ±10° offset. Wrap progress with modulo so the loop is seamless.
- Render photos as absolutely positioned `<img>` (or DOM `div`) elements, `will-change: transform`, size 84 px, grayscale filter.
- Alternative lighter approach: compute positions in `requestAnimationFrame` via `path.getPointAtLength()`.

**PolaroidWall.**
- Absolutely positioned `Polaroid` components using config x/y (% of container) and rotation.
- Idle float with Framer Motion (`animate={{ y:[0,-4,0] }}` with random durations); hover lift.
- Optional: draggable (`drag` + `dragConstraints` to container) with z-index bring-to-front on drag.
- `ButterflySticker` toggles `Tooltip` (open on hover/click; close on outside click). Dim overlay while open.

**Scrapbook.**
- Build as a component with `perspective: 1800px`. State: `spreadIndex` (-1 = closed cover, 0..n-1 open).
- Closed → open: animate cover half `rotateY` 0 → -160°.
- Page turn: front/back faces with `backface-visibility: hidden`, `transform-origin: left center`, 0.9 s ease. Add moving gradient shade overlay.
- Pages are either pre-composed images or stickers placed absolutely (config: `{src,x,y,w,rot}`), plus quote strips.
- Controls: click right half = next, left half = prev, also swipe/arrow keys; auto-advance every 3 s when `autoplay`.

**PhotoGalaxy.**
- Container `perspective: 1000px; transform-style: preserve-3d`.
- 12–15 cards each with random `(x,y)` in ±40%, start `z = -1500..-300`, rotate `(rx,ry,rz)` ±25°. Animate `z` to `+500` over 8–12 s with GSAP, opacity from .3 → 1 → 0 near the end, then respawn at far z.
- Star layer: `<canvas>` with 200 twinkling points.
- If using r3f: planes with `TextureLoader`, `useFrame` to move on z; camera fixed at z=5.

**ChatScene.**
- `PhoneFrame` (SVG/CSS). Messages array rendered sequentially: delay 1.1 s between bubbles; each bubble animates in; auto-scroll to bottom.
- After received bubbles, `useTypewriter(typedFinal, 45ms)` fills the input; caret blinks; after finishing, 500 ms pause → "send" press animation → text becomes a new bubble → idle.
- "replay" text button below the phone calls `replay()`.

### 4.5 Preloading

- `lib/preload.ts` preloads first-scene assets immediately and the rest while the start gate is visible. Show a tiny progress heart if >1 s.
- Use `next/image` for static photos (`sizes`, `priority` for hero images); for dynamically animated DOM nodes plain `<img loading="eager" decoding="async">` is acceptable.

## 5. Performance requirements

- Target 60 fps on a mid-range laptop and 30+ fps on a mid-range phone.
- Animate only `transform` and `opacity`; apply `will-change` sparingly.
- Photos: WebP, ≤ 150 KB each, 800 px max; garland thumbnails 300 px.
- Total initial JS ≤ 250 KB gzip (GSAP core + ScrollTrigger only if used; skip r3f if using CSS 3D).
- Lazy-load later scenes with `dynamic(() => import(...), { ssr: false })`.
- Disable heavy effects (blur filters, many particles) when `navigator.hardwareConcurrency <= 4` or on mobile.

## 6. Browser and device support

- Chrome, Edge, Safari 16+, Firefox (latest 2 versions); iOS Safari and Android Chrome.
- Use `100dvh` and safe-area insets on mobile.
- `backdrop-filter` with `-webkit-` prefix.

## 7. SEO / metadata

- Replace default title "Create Next App" with e.g. `"Happy Birthday {name} 💗"`; set favicon (heart), `robots: noindex` (private gift), Open Graph image optional.

## 8. Testing / acceptance checklist

- [ ] Scenes appear in order: curtains → 22 → heart burst → 23 + balloons → hero + garland → polaroid wall → scrapbook → galaxy → chat.
- [ ] Music starts only after gate click; player UI reflects state; mute works.
- [ ] Garland loops seamlessly, photos grayscale, loop visible in the middle.
- [ ] Polaroid captions/hearts/rotation match the reference; butterfly tooltip works.
- [ ] Scrapbook opens, flips ≥4 spreads, spiral binding visible.
- [ ] Chat types the final message, sends it, "replay" restarts.
- [ ] No layout shift or horizontal scroll at 1920×1080, 1366×768, 390×844.
- [ ] `prefers-reduced-motion` yields simplified animation.
- [ ] `npm run build` passes with no type errors; Lighthouse performance ≥ 80.

## 9. Build and deploy

```bash
npx create-next-app@latest birthday-site --ts --tailwind --app --src-dir
cd birthday-site
npm i gsap framer-motion canvas-confetti
# optional: npm i three @react-three/fiber @react-three/drei
npm run dev
# deploy
npx vercel --prod
```

## 10. Suggested build order for the AI agent

1. Scaffold project, tokens, fonts, `content.ts`, `Experience` state machine with placeholders per scene.
2. Start gate + audio + music player.
3. Curtains → Countdown (22, burst, 23, balloons).
4. Hero + Garland (highest-risk effect; get the looped path right).
5. Polaroid wall + tooltip.
6. Scrapbook flip.
7. Photo galaxy.
8. Chat scene + replay.
9. Responsive pass, performance pass, reduced-motion pass.
10. Compare each scene against `reference_frames/` and fix differences.

## 11. Known unknowns (decide and document)

- Exact scroll/click navigation of the original.
- Exact chat messages 2 and 3 (illegible in the video).
- Exact fonts and photo content.
- Whether polaroids are draggable.
