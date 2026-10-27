// src/content/content.ts
// ───────────────────────────────────────────────────────────
// SINGLE SOURCE OF TRUTH for all personal content.
// The owner replaces photos, captions, messages, and the song.
// Items marked // REPLACE should be updated with real content.
// ───────────────────────────────────────────────────────────

export const content = {
  /** Display name shown on the hero section (in orange) */
  name: "Swarnima", // REPLACE with recipient's name or nickname

  /** Full name for page title / meta */
  fullName: "Swarnima Jaiswal",

  /** Ages for the countdown scene: ageFrom -> (heart burst) -> ageTo */
  ageFrom: 19,
  ageTo: 20,

  /** Date of birth – used in meta / potential future features */
  dob: "2006-10-27",

  /** Hero paragraph text */
  heroParagraph:
    "wishing you a day filled with love, laughter, and all the happiness your heart can hold. May this year bring you endless joy and unforgettable memories. Happy Birthday!",

  /** Background music */
  music: {
    src: "/audio/song.mp3",
    title: "Alfaaz",
    subtitle: "Hamza Malik & Zain Zohaib",
    cover: "/photos/cover.webp",
  },

  /** 28 garland photos – square, displayed in grayscale */
  garland: Array.from({ length: 28 }, (_, i) => ({
    src: `/photos/garland/g${String(i + 1).padStart(2, "0")}.webp`,
    alt: `Garland photo ${i + 1}`, // REPLACE with descriptive alt text
  })),

  /** 10 polaroid cards with captions, positions (% of container), and rotation */
  polaroids: [
    { src: "/photos/polaroids/p01.webp", caption: "Cutie 🥺",       x: 3,  y: 12, rot: -6 },
    { src: "/photos/polaroids/p02.webp", caption: "Baddie 😎",      x: 27, y: 6,  rot: 3  },
    { src: "/photos/polaroids/p03.webp", caption: "My Love",         x: 55, y: 8,  rot: -4 },
    { src: "/photos/polaroids/p04.webp", caption: "Dream Girl 💫",   x: 78, y: 5,  rot: 5  },
    { src: "/photos/polaroids/p05.webp", caption: "Sunshine 🌞",     x: 6,  y: 52, rot: -3 },
    { src: "/photos/polaroids/p06.webp", caption: "Queen",            x: 30, y: 52, rot: 4  },
    { src: "/photos/polaroids/p07.webp", caption: "Pretty ✨",        x: 52, y: 48, rot: 2  },
    { src: "/photos/polaroids/p08.webp", caption: "Beautiful 🌸",     x: 74, y: 50, rot: -5 },
    { src: "/photos/polaroids/p09.webp", caption: "Angel 👼",         x: 18, y: 35, rot: -2 }, // REPLACE caption
    { src: "/photos/polaroids/p10.webp", caption: "Forever 💕",       x: 62, y: 32, rot: 3  }, // REPLACE caption
  ],

  /** Quote shown when clicking the butterfly sticker */
  butterflyQuote:
    "Looks like you're really good at catching butterflies… no wonder you caught my heart so easily. ❤️",

  /** Scrapbook: cover image + 4 spreads (left/right pages) + quotes */
  scrapbook: {
    cover: "/photos/scrapbook/swarnima_portrait_smile.jpg",
    spreads: [
      {
        left: "/photos/scrapbook/swarnima_red_traditional.jpg",
        leftCaption: "Sweetest smile 👑",
        right: "/photos/scrapbook/flowers.jpg",
        rightCaption: "Flowers for you 🌸",
        quotes: [
          "You are the stars in my dark and cold nights— shining and unwavering.",
          "may the flowers remind us why the rain was so necessary.",
        ],
      },
      {
        left: "/photos/scrapbook/swarnima_outdoor_smile.jpg",
        leftCaption: "That million-dollar smile 🌞",
        right: "/photos/scrapbook/heart.jpg",
        rightCaption: "Two souls, one heart ❤️",
        quotes: ["Every love story is beautiful, but ours is my favorite."],
      },
      {
        left: "/photos/scrapbook/swarnima_blue_bindi.jpg",
        leftCaption: "Prettiest girl ✨",
        right: "/photos/scrapbook/swarnima_chin_rest.jpg",
        rightCaption: "Adoring you always 🥺",
        quotes: ["In a sea of people, my eyes will always search for you."],
      },
      {
        left: "/photos/scrapbook/swarnima_portrait_smile.jpg",
        leftCaption: "Happy 20th Birthday 🎂",
        right: "/photos/scrapbook/swarnima_lying_eyes.jpg",
        rightCaption: "Magic in your eyes 💫",
        quotes: ["You are my today and all of my tomorrows."],
      },
    ],
  },

  /** Stickers for scrapbook and polaroid scenes */
  stickers: {
    butterfly: "/scrapbook/stickers/butterfly.png",
    hamster: "/scrapbook/stickers/hamster.png",
    cat: "/scrapbook/stickers/cat.png",
    discoBall: "/scrapbook/stickers/disco-ball.png",
    vinyl: "/scrapbook/stickers/vinyl.png",
    bow: "/scrapbook/stickers/bow.png",
    star: "/scrapbook/stickers/star.png",
  },

  /** 12 photos for the floating galaxy scene */
  gallery: Array.from({ length: 12 }, (_, i) => ({
    src: `/photos/gallery/f${String(i + 1).padStart(2, "0")}.webp`,
    alt: `Gallery photo ${i + 1}`, // REPLACE with descriptive alt text
  })),

  /** iMessage-style chat scene */
  chat: {
    contactName: "My love 💗",
    status: "iMessage · online now",
    avatar: "/photos/chat_bg/girl.jpg",
    time: "5:32 PM",
    messages: [
      { text: "Happpyyyyyy Birthday love," },
      { text: "aaj ka din bohot special h, jaise tum mere liye ho. har pal tere saath guzaara meri zindagi ka sabse khoobsurat hissa h 💛" },
      { text: "bas yahi dua h ki hamesha khush raho aur muskurati raho 🌸" },
    ],
    typedFinal:
      "i hope ye dekh ke apke chotu se face pe ek badi si smile to aai h",
    /** Photos displayed in the chat scene: Left is Both 1, Middle is Heart, Right is Both 2 */
    backgroundPhotos: [
      {
        src: "/photos/chat_bg/both1.jpg",
        caption: "Us 💖",
        alt: "Both 1",
        role: "both1",
      },
      {
        src: "/photos/chat_bg/heart.jpg",
        caption: "Heart ❤️",
        alt: "Heart",
        role: "heart",
      },
      {
        src: "/photos/chat_bg/both2.jpg",
        caption: "Together 💫",
        alt: "Both 2",
        role: "both2",
      },
    ],
  },

  /** Floating letters for Scene 3 */
  birthdayLetters: "Happy birthday".split(""),

  /** Balloon colors for Scene 3 */
  balloonColors: ["#2aa7ff", "#ff9f1c", "#ff4d8d", "#4ade80", "#a78bfa"],
} as const;

export type Content = typeof content;
