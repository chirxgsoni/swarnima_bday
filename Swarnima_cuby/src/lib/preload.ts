/** Asset preloading utilities */

export function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
}

export function preloadImages(srcs: string[]): Promise<void[]> {
  return Promise.all(srcs.map(preloadImage));
}

export function preloadAudio(src: string): Promise<void> {
  return new Promise((resolve) => {
    const audio = new Audio();
    audio.preload = "auto";
    audio.oncanplaythrough = () => resolve();
    audio.onerror = () => resolve(); // Don't block on audio errors
    audio.src = src;
  });
}

/** Preload critical assets for first scenes */
export async function preloadCriticalAssets(): Promise<void> {
  const criticalImages = [
    "/photos/cover.webp",
    "/photos/avatar.webp",
  ];

  await Promise.allSettled([
    ...criticalImages.map(preloadImage),
    preloadAudio("/audio/song.mp3"),
  ]);
}
