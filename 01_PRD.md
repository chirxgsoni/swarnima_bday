# PRD — Interactive Birthday Experience Website

> Source: 46-second phone recording of a monitor showing the live site `second-birthday-version.vercel.app` (browser tab title "Create Next App").
> Goal: an AI coding agent must rebuild this site so it looks and behaves like the video.
> Companion files: `02_DESIGN.md` (visuals), `03_TRD.md` (tech/build), `reference_frames/` (one screenshot per scene).

## 0. Reading notes (important for the agent)

- The video is a camera recording of a screen, so exact pixel values, fonts and some small text are **estimated**. Items marked **[ASSUMED]** are inferred, not directly seen.
- All personal content (photos, name, messages, music) must live in **one editable content config** (see TRD) so the owner can swap in their own material.
- The site is a **single-page, scene-by-scene cinematic experience** (not a multi-page site).

## 1. Product summary

A personal, romantic birthday-surprise website. The viewer watches a short animated story: a theatre-curtain reveal, an age countdown (22 → 23), a "Happy Birthday Sweety" hero with a looping photo garland, a wall of captioned polaroids, a flip-through scrapbook, a floating photo galaxy, and a final iMessage-style chat that types out a heartfelt message. Background music plays throughout.

## 2. Goals and non-goals

**Goals**
1. Reproduce all 8 scenes and their transitions in the order shown.
2. Feel polished and emotional: smooth animation, glow, soft shadows, handwritten touches.
3. Work on desktop first; be usable on mobile.
4. Easy personalization (name, age, photos, captions, quotes, chat messages, song).

**Non-goals**
- No accounts, backend, database or CMS.
- No payments, analytics dashboards or admin panel.

## 3. Target user

- **Creator:** the person who built the gift; edits a config file and deploys to Vercel.
- **Viewer:** the birthday recipient, opening a private link, likely on desktop or phone.

## 4. Scene-by-scene requirements (video breakdown)

Approximate times are from the recording. Pacing may be timeline-driven, scroll-driven, or click-driven **[ASSUMED: timeline for scenes 1–3, scroll/click for 4–8]**.

### Scene 1 — Curtain reveal (0:00–0:02)
- Full screen shows **red vertical-striped theatre curtains** (left and right panels) with a dark gap in the middle.
- Curtains part/slide open to reveal a dark stage.
- Ref: `reference_frames/1_scene1_curtains.png`

### Scene 2 — Age countdown "22" (0:02–0:06)
- Near-black navy background with a **diagonal spotlight beam** from the top-left.
- Huge bold white number **22** centered, glowing; tiny dust/sparkle particles at its base.
- A **music player pill** sits at bottom-center: square album thumbnail, title "Sweety Song" (approximate), subtitle "BIRTHDAY PLAYLIST", thin progress bar with times, circular play/pause button.
- Number blurs/dims out, then a **red glowing heart/particle burst** appears on dark background (two glowing red lobes with floating embers).
- Ref: `2_scene2_countdown_22.png`, `3_scene2_heart_burst.png`

### Scene 3 — "23" + balloons (0:06–0:08)
- Number changes to a big white **23** over a **blurred, darkened photo background**.
- **Colorful balloons** (blue, orange, pink, green) float up; small cards/photos and individual letters of "Happy birthday" drift around the number; confetti-like bits.
- Ref: `4_scene3_23_balloons.png`

### Scene 4 — Hero: "Happy Birthday Sweety" + photo garland (0:08–0:16)
- Background switches to **clean white/off-white**.
- Left column text block:
  - "Happy" — large, light weight, dark navy/black
  - "Birthday" — large, bold, dark navy
  - "Sweety" — large, bold, **orange**
  - thin horizontal divider
  - small grey paragraph: *"wishing you a day filled with love, laughter, and all the happiness your heart can hold. May this year bring you endless joy and unforgettable memories. Happy Birthday!"*
- Right/bottom: a **garland of ~25–30 square grayscale (black-and-white) photos** tilted slightly, strung along an invisible **wavy S-curve that makes one circular loop** (like a ribbon with a loop-the-loop). Photos **travel slowly along the path** (continuous marquee-on-path animation).
- Tiny faint micro-labels exist in the top-left and bottom-right corners (illegible) **[ASSUMED: "scroll" hint / section index]**.
- Ref: `5_scene4_hero_garland.png`

### Scene 5 — Polaroid wall (0:16–0:26)
- Soft grey-white textured background.
- ~10 **polaroid cards** (white border, thicker bottom), each slightly rotated and overlapping, scattered across the screen. Each has:
  - a color photo,
  - a **handwritten caption + emoji** under it (seen: "Cutie 🥺", "Baddie 😎", "My Love", "Dream Girl 💫", "Sunshine 🌞", "Queen", "Beautiful 🌸", "Pretty ✨"),
  - a **red heart pin** at its top-right corner.
- Small decorative **flower / butterfly doodle stickers** are scattered between cards.
- Cards **drift and rearrange** over time (positions differ between frames) and are interactive (hover/click/drag) **[ASSUMED: hover lift; draggable optional]**.
- Clicking/hovering a butterfly sticker shows a **black tooltip card** (white serif text) and the scene dims slightly. Text read: *"Looks like you're really good at catching butterflies… no wonder you caught my heart so easily. ❤️"*
- Ref: `6_scene5_polaroid_wall.png`, `7_scene5_tooltip_butterfly.png`

### Scene 6 — Scrapbook / notebook (0:26–0:36)
- Background goes **dark/black** with blurred faded photos at the edges and a soft spotlight glow around the book.
- A **spiral-bound scrapbook** appears closed, with a collage cover (vintage camera, moon, red lips, stickers, scribbled title text).
- It **opens to a two-page spread** (spiral rings in the middle). Pages show collage: torn map paper, polaroid-style photo, film-strip of 3 photos, butterfly, hamster sticker, cat holding a strawberry, disco ball with pink stars, newspaper clippings, red ribbon bows, checkered cloth.
- Handwriting/typewriter quote strips on peach highlight:
  - *"You are the stars in my dark and cold nights— shining and unwavering."*
  - *"may the flowers remind us why the rain was so necessary."*
- **Pages flip** to at least 4 different spreads (one has a vinyl record, a cat, red stars and text). Ends on a back cover with vinyl/heart collage.
- Ref: `8_...cover`, `9_...spread`, `10_...spread_vinyl`

### Scene 7 — Floating photo galaxy (0:36–0:40)
- Black background with a **starfield** (tiny white dots).
- Small photo cards float in **3D space**, tilt and drift toward the viewer; some become large and fly past the camera. Rounded corners, subtle shadow.
- The back cover/notebook fades into this scene.
- Ref: `11_scene7_floating_photos.png`

### Scene 8 — "My love" iMessage chat (0:40–0:46)
- Bottom of screen rises as a **pink → blue gradient**; background becomes a **soft pink/lavender/blue mesh gradient** (pink left, blue right, pale lavender center).
- A **dark iPhone mockup** (rounded corners, dynamic-island pill) is centered and tall, about 280×600 px on desktop, taking roughly 70% of the viewport height.
- Phone UI: status bar "5:32 PM" (left) and battery/signal (right); chat header with round avatar, bold **"My love 💗"**, small subtitle "iMessage · online now"; centered pill timestamp ("Today 5:32 PM").
- Messages appear one after another as **glowing yellow-orange rounded bubbles** with dark bold text (Hinglish). Readable fragments:
  - Bubble 1: *"Happpyyyyyy Birthday love,"*
  - Bubble 2: a longer message about "aaj tu / aaj ke din ... special" (illegible) 
  - Bubble 3: a short follow-up (illegible)
- Input bar at bottom of phone: placeholder "iMessage", round **orange send button** with arrow.
- The **message types itself character-by-character** in the input field with a blinking caret, then is "sent" and becomes a new bubble. Example typed text read: *"i hope ye dekh ke apke chotu se face pe ek badi si smile to aai h"*.
- Tiny text **"replay"** under the phone — clicking restarts the whole experience.
- Ref: `12_...chat_start`, `13_...chat_end`

## 5. Functional requirements

| ID | Requirement | Priority |
|----|-------------|----------|
| F1 | Eight scenes play in the order above with the listed transitions | Must |
| F2 | Background music with a visible player (play/pause, progress, title) | Must |
| F3 | Autoplay is blocked by browsers → show a "Tap to begin" start gate that also starts audio **[ASSUMED]** | Must |
| F4 | Age countdown is configurable (`ageFrom` → `ageTo`) | Must |
| F5 | Garland of photos animates along a looped curve, photos grayscale | Must |
| F6 | Polaroid cards with captions, heart pins, rotation, overlap, hover effect | Must |
| F7 | Butterfly sticker reveals a quote tooltip | Should |
| F8 | Scrapbook with spiral binding and page-flip animation across ≥4 spreads | Must |
| F9 | Floating 3D photo starfield | Should |
| F10 | iMessage-style chat with typing animation and sequential bubbles | Must |
| F11 | "replay" restarts from scene 1 | Should |
| F12 | All text/photos/captions/messages come from `content.ts` | Must |
| F13 | Responsive layouts for ≤768px (phone) | Should |
| F14 | Respect `prefers-reduced-motion` (simplify animations) | Could |

## 6. Content inventory (user must supply)

- Recipient nickname (video: "Sweety"), ages (22 → 23)
- ~28 square photos for the garland (auto-converted to B&W by CSS)
- ~10 color photos for polaroids + captions + emoji
- 4–6 scrapbook spreads: collage images or hand-built from sticker PNGs, plus 2+ quote lines
- ~12 photos for the floating gallery (can reuse the others)
- Chat messages (3 received + 1 typed) and chat name/avatar
- 1 music track (mp3) + cover image + title

## 7. Success criteria / acceptance

- Side by side with the video, each scene matches in layout, color, motion style and order.
- Total experience is about 45–60 seconds before the chat ends.
- Lighthouse performance ≥ 80 on desktop with images optimized.
- No console errors; works in latest Chrome, Edge, Safari, Firefox.

## 8. Risks and open questions

1. Whether scene progression is timed, scroll-based or click-based is not visible → default recommended in TRD (timeline + scroll hybrid).
2. Exact fonts could not be identified; closest Google Fonts are given in the design file.
3. Chat message text is partly unreadable; use placeholders and let the owner edit.
4. Copyright: use only photos/music the creator owns or has rights to.
