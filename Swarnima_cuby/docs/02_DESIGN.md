# DESIGN — Interactive Birthday Experience Website

> Visual and motion spec reverse-engineered from the video. Values are **closest estimates** (the source is a camera recording of a screen). Use `reference_frames/*.png` to compare.

## 1. Design principles

1. **Cinematic, then intimate.** Dark, dramatic stage scenes first; light, soft, scrapbook-like scenes next; a private chat at the end.
2. **Handmade warmth.** Polaroids, doodles, handwriting, torn paper, stickers.
3. **Glow and depth.** White glows on dark, soft shadows on light, blur for depth.
4. **One accent color per mood.** Orange = celebration/name, red = love/hearts, pink-blue gradient = chat.

## 2. Color tokens

```css
:root {
  /* neutrals */
  --ink-900: #05060c;      /* stage / starfield black */
  --navy-950: #0a0e1a;     /* countdown bg */
  --navy-800: #1f2a44;     /* "Birthday" headline */
  --grey-500: #8a8f98;     /* body copy */
  --paper-50: #fbfaf7;     /* hero background */
  --paper-100: #ecebe7;    /* polaroid wall background (soft textured grey) */
  --white: #ffffff;

  /* accents */
  --orange-500: #f28c1b;   /* "Sweety", send button */
  --orange-300: #ffc566;   /* chat bubble light end */
  --red-500: #e5173f;      /* heart pins, curtains base */
  --red-700: #b3122f;      /* curtain shadow stripes */
  --pink-400: #ff6b8b;     /* gradient left */
  --lavender-200: #e3d4f5; /* gradient center */
  --blue-500: #5b6ee8;     /* gradient right */

  /* effects */
  --glow-white: 0 0 40px rgba(255,255,255,.55);
  --glow-orange: 0 0 24px rgba(255,170,60,.65);
  --shadow-card: 0 10px 24px rgba(0,0,0,.18);
}
```

## 3. Typography

| Use | Look in video | Suggested font (Google Fonts) | Weight / size |
|-----|--------------|-------------------------------|---------------|
| Countdown numbers (22, 23) | Heavy geometric sans, white | **Plus Jakarta Sans** or **Outfit** | 800, `clamp(8rem, 22vw, 18rem)` |
| Hero "Happy" | Light geometric grotesk | **Plus Jakarta Sans** | 300, `clamp(3rem, 6vw, 5.5rem)` |
| Hero "Birthday" / "Sweety" | Bold, tight tracking | same | 700–800, same size, letter-spacing -0.02em |
| Hero paragraph | Small, light grey, relaxed leading | **Inter** | 400, 0.8–0.9rem, line-height 1.7, max-width ~340px |
| Polaroid captions | Casual handwriting, italic slant | **Caveat** or **Reenie Beanie** | 600, 1.1–1.3rem |
| Quote tooltip + scrapbook quotes | Elegant serif | **Lora** or **Cormorant Garamond** | 400, 0.9–1rem |
| Chat text | Bold rounded sans | **Outfit** | 600–700, 0.8rem |
| Music player title / "replay" | Tiny, uppercase, wide tracking | **Space Mono** / **Inter** | 500, 0.55–0.7rem, letter-spacing .15em |

## 4. Layout system

- Every scene is a **full-viewport section** (`100dvh`, `overflow:hidden`), stacked in one page.
- Desktop reference size: 1920×1080. Design for 16:9 first.
- Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64.
- Hero (Scene 4): 2-column grid. Left text block at ~8% from left, vertically near the upper-middle. Right area holds the garland canvas that spans nearly full width and sits in the lower 55% of the viewport.
- Polaroid wall (Scene 5): absolutely positioned cards inside a relative container, positions given in % so they scale.
- Chat (Scene 8): phone mockup centered, height ≈ 70vh, aspect ratio ≈ 9:19.5.

## 5. Scene designs

### Scene 1 — Curtains
- Two panels each 50vw wide, with **vertical pleat stripes**: repeating gradient `linear-gradient(90deg, #b3122f 0 6%, #e5173f 6% 14%, #b3122f 14% 20% ...)` (≈ 20 px per pleat), subtle vertical shading.
- Slight drop shadow on inner edge. Gap in the middle shows `--ink-900`.
- Motion: panels translate to ±100% over 1.4 s, `cubic-bezier(.7,0,.2,1)`; pleats stretch slightly (scaleX) during motion.

### Scene 2 — Countdown 22
- Background: `--navy-950` with a **conic/linear spotlight**: `conic-gradient(from 200deg at 15% -10%, rgba(255,255,255,.28), transparent 25%)` or a rotated white-to-transparent triangle with blur(40px).
- "22": white, `text-shadow: var(--glow-white)`, centered.
- Dust particles: 30–40 tiny dots (1–3 px) near the baseline, opacity 0.3–0.9, slow upward drift.
- Music pill (bottom-center, 24px from bottom): `width: 260px; height: 56px; border-radius: 14px; background: rgba(20,22,32,.7); backdrop-filter: blur(12px)`. Contains a 36px rounded-square cover, two text lines, 2px progress bar, 22px circular white play/pause button.
- Exit: "22" scales to 1.15 and blurs out (0.6 s).
- **Heart burst:** a dark screen with two red glowing lobes forming a heart (blurred radial gradients `#ff2a2a → transparent`) and 40–60 small ember dots rising. Duration ~1.2 s.

### Scene 3 — "23" + balloons
- Background: blurred (`blur(18px)`) darkened photo (brightness .4) behind a dark overlay.
- "23": same style as 22 but slightly larger, enters with scale 0.8 → 1 and a light-ray flare.
- Balloons: 8–12 SVG ovals with highlight + string; colors `#2aa7ff`, `#ff9f1c`, `#ff4d8d`, `#4ade80`, `#a78bfa`. Size 70–120 px. Float up with sine sway; z-index mixed above/below the number.
- Small photo cards (60–90 px) and individual letters "H a p p y  b i r t h d a y" drift in white, 1–1.4rem.
- Confetti: 40 small rectangles in the balloon colors.

### Scene 4 — Hero + garland
- Background `--paper-50`.
- Headline stack per §3. A 40 px × 1 px grey line sits between "Sweety" and the paragraph.
- **Garland:** square photos 74–96 px, `border-radius: 2px`, `filter: grayscale(1) contrast(1.05)`, slight random rotation (−12° to +12°), 1 px white inner border, very soft shadow. Photos follow an SVG path: left edge near the bottom → gentle wave → one **loop (≈ 220 px diameter circle)** at ~48% width → continues up to the right edge. Rotation of each photo follows the tangent of the path (+ random jitter).
- Motion: all photos translate along the path in a loop (`speed ≈ 30–40 px/s`); entering from the left, exiting at the right; loop repeats seamlessly.
- On hover (desktop): photos near the cursor scale to 1.15 and become colored (grayscale 0).

### Scene 5 — Polaroid wall
- Background `--paper-100` with a subtle paper/linen noise texture (3% opacity noise).
- Polaroid: width ~150–190 px, padding 8 px 8 px 34 px, white (#fff), `box-shadow: 0 8px 18px rgba(0,0,0,.18)`, rotation −8° to +8°. Photo area square. Caption centered in the bottom padding.
- Heart pin: 22 px red heart (`--red-500`) overlapping the top-right corner, with a small highlight.
- Overlap: some pairs overlap by 15–25% (z-order varies).
- Doodle stickers: tiny flowers (pink), small green leaf blobs, and **butterfly stickers (blue/beige)**, 18–28 px, semi-transparent, floating gently.
- Hover: card lifts (`translateY(-6px) rotate(0deg) scale(1.05)`), shadow grows. Idle: tiny float ±4 px, 6–9 s ease-in-out loop, desynced per card.
- Tooltip: black rounded rectangle (`#0b0b0b`, radius 6 px, padding 10×14 px), serif text ~0.8rem white, appears next to the butterfly with a 0.25 s fade/scale. Page gets a subtle `rgba(0,0,0,.25)` overlay while visible.

### Scene 6 — Scrapbook
- Background: black with 6–8 faded photo blobs (opacity .12–.25, blur 8 px) pinned at the edges, and a **radial glow** (`radial-gradient(circle, rgba(255,255,255,.18), transparent 60%)`) behind the book.
- Book: width ≈ 46vw (max 880 px), aspect ≈ 1.65:1 spread. Spiral binding: a vertical column of ~16 metal rings (SVG), dark blue-grey with light highlights, centered.
- Cover: collage image (camera, moon, red lips, stars, handwritten word).
- Pages: off-white paper with slight grain. Collage elements are **PNG stickers with transparent backgrounds** placed with rotation: torn map-paper, polaroid, film-strip, butterfly, hamster, cat+strawberry, disco ball, stars, newspaper scraps, ribbon bows, red-white checkered cloth, vinyl record.
- Quote strips: text on a peach highlight bar (`#f7d9c4`), serif 0.75rem, slight rotation.
- Motion: cover opens (rotateY of the right half, -160°, 1 s), then each page turn rotateY 0 → -180° with `transform-origin: left center`, paper shading gradient during flip; 3D perspective 1800 px.

### Scene 7 — Floating photo galaxy
- Background `--ink-900` + 150–250 star dots (1–2 px, twinkle opacity .3–1).
- 12–15 photo cards (rounded 8–12 px, 80–260 px) positioned in 3D (translateZ −1200 → +400), rotate on X/Y/Z, drifting towards the camera over 8–10 s then recycling to the back.
- Some are large and tilted (like passing the camera). Slight motion blur / lower opacity at far depth.
- Bottom: a pink→blue gradient bar rises (this is the transition into scene 8).

### Scene 8 — Chat
- Background: mesh gradient — `radial-gradient(circle at 15% 40%, #ff6b8b, transparent 55%), radial-gradient(circle at 85% 45%, #5b6ee8, transparent 55%), #e3d4f5`. Subtle moiré/wave pattern overlay optional.
- Phone: `border-radius: 44px`, bezel 8 px `#0b0b12`, inner screen `#06070d`, dynamic island 90×24 px pill at top.
- Header: avatar 28 px circle, name **"My love 💗"** white 0.85rem bold, subtitle "iMessage · online now" grey 0.6rem. Centered date pill (grey translucent, 0.55rem).
- Bubbles (received style used for all messages): `background: linear-gradient(135deg, #ffd27a, #ff9f43); color:#1a1205; border-radius: 16px; padding: 8px 12px; max-width: 80%; box-shadow: 0 0 24px rgba(255,170,60,.55)` — they **glow** against the dark screen. Right-aligned in the video (sent-style alignment).
- Input bar: pill `rgba(255,255,255,.08)` with 1 px border, white 0.65rem text; send button 30 px circle orange `--orange-500` with white arrow; glow `--glow-orange`.
- "replay": 0.6rem, letter-spacing .2em, lowercase, grey-white, centered 10 px below the phone.
- Motion: each bubble enters with `translateY(10px) scale(.9)` → normal, 0.35 s, spring; typing of composer text at ~45 ms/char with caret blink 1 Hz; sending animates the text into a new bubble.

## 6. Motion language

| Token | Value |
|-------|-------|
| Easing standard | `cubic-bezier(.22,.61,.36,1)` |
| Easing dramatic | `cubic-bezier(.7,0,.2,1)` |
| Fast | 200–300 ms (hover, tooltip) |
| Medium | 600–900 ms (scene elements) |
| Slow | 1.2–2 s (curtain, scene transition) |
| Idle loops | 6–10 s ease-in-out, desynchronized |

Scene transitions: **fade through black** (0.6 s) for scenes 1→2→3; **white wipe / blur dissolve** for 3→4; **crossfade with dim** for 4→5→6; **zoom through stars** for 6→7; **gradient rise** for 7→8.

## 7. Iconography and assets

- Hearts, flowers, butterflies, stars, balloons, ribbon bows, vinyl, disco ball → SVG or transparent PNG stickers (not emoji, except captions).
- Captions keep **emoji** (🥺 😎 💫 🌞 🌸 ✨).
- Photos: square crops, min 800 px; export WebP.

## 8. Responsive behavior

- ≤768px: hero text on top, garland under it (smaller loop 160 px); polaroid wall → 2-column scatter with fewer cards (6); scrapbook shows single page at a time; chat phone fills ~90% width; countdown number `clamp` scales down.
- Touch: tap replaces hover (tap butterfly → tooltip; tap polaroid → lift).

## 9. Accessibility

- All photos need `alt` from content config; decorative stickers `aria-hidden`.
- Respect `prefers-reduced-motion`: disable parallax/floating, use simple fades.
- Contrast: body copy on `--paper-50` must be ≥ 4.5:1 (use `#6b7078` if `#8a8f98` fails).
- Audio never starts without a user gesture; provide a mute button.
