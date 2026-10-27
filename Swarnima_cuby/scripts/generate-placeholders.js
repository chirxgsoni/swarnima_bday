// Script to generate placeholder images
// Run: node scripts/generate-placeholders.js

const fs = require('fs');
const path = require('path');

// Create a minimal WebP placeholder (1x1 pixel, light gray)
// This is the smallest valid WebP file
const WEBP_HEADER = Buffer.from([
  0x52, 0x49, 0x46, 0x46, // RIFF
  0x24, 0x00, 0x00, 0x00, // File size - 8
  0x57, 0x45, 0x42, 0x50, // WEBP
  0x56, 0x50, 0x38, 0x4C, // VP8L
  0x17, 0x00, 0x00, 0x00, // Chunk size
  0x2F, 0x00, 0x00, 0x00, // Signature
  0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00,
]);

// Create a minimal PNG placeholder (1x1 pixel, light gray)
const PNG_PLACEHOLDER = Buffer.from([
  0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, // PNG signature
  0x00, 0x00, 0x00, 0x0D, 0x49, 0x48, 0x44, 0x52, // IHDR chunk
  0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01,
  0x08, 0x02, 0x00, 0x00, 0x00, 0x90, 0x77, 0x53,
  0xDE, 0x00, 0x00, 0x00, 0x0C, 0x49, 0x44, 0x41, // IDAT chunk
  0x54, 0x08, 0xD7, 0x63, 0xD8, 0xD0, 0xD0, 0x00,
  0x00, 0x00, 0x14, 0x00, 0x05, 0x14, 0xC5, 0x3F,
  0x8F, 0x00, 0x00, 0x00, 0x00, 0x49, 0x45, 0x4E, // IEND chunk
  0x44, 0xAE, 0x42, 0x60, 0x82
]);

// A silent MP3 file (minimal valid MP3)
const SILENT_MP3 = Buffer.from([
  0xFF, 0xFB, 0x90, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x58, 0x69, 0x6E, 0x67,
  0x00, 0x00, 0x00, 0x0F, 0x00, 0x00, 0x00, 0x01,
  0x00, 0x00, 0x01, 0x04, 0x00,
]);

const publicDir = path.join(__dirname, '..', 'public');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

// Garland photos (g01-g28.webp)
ensureDir(path.join(publicDir, 'photos', 'garland'));
for (let i = 1; i <= 28; i++) {
  const name = `g${String(i).padStart(2, '0')}.webp`;
  fs.writeFileSync(path.join(publicDir, 'photos', 'garland', name), WEBP_HEADER);
}

// Polaroid photos (p01-p10.webp)
ensureDir(path.join(publicDir, 'photos', 'polaroids'));
for (let i = 1; i <= 10; i++) {
  const name = `p${String(i).padStart(2, '0')}.webp`;
  fs.writeFileSync(path.join(publicDir, 'photos', 'polaroids', name), WEBP_HEADER);
}

// Gallery photos (f01-f12.webp)
ensureDir(path.join(publicDir, 'photos', 'gallery'));
for (let i = 1; i <= 12; i++) {
  const name = `f${String(i).padStart(2, '0')}.webp`;
  fs.writeFileSync(path.join(publicDir, 'photos', 'gallery', name), WEBP_HEADER);
}

// avatar.webp, cover.webp
fs.writeFileSync(path.join(publicDir, 'photos', 'avatar.webp'), WEBP_HEADER);
fs.writeFileSync(path.join(publicDir, 'photos', 'cover.webp'), WEBP_HEADER);

// Scrapbook cover
ensureDir(path.join(publicDir, 'scrapbook'));
fs.writeFileSync(path.join(publicDir, 'scrapbook', 'cover.png'), PNG_PLACEHOLDER);

// Scrapbook spreads
ensureDir(path.join(publicDir, 'scrapbook', 'spreads'));
for (let i = 1; i <= 4; i++) {
  fs.writeFileSync(path.join(publicDir, 'scrapbook', 'spreads', `spread-${i}-left.png`), PNG_PLACEHOLDER);
  fs.writeFileSync(path.join(publicDir, 'scrapbook', 'spreads', `spread-${i}-right.png`), PNG_PLACEHOLDER);
}

// Stickers
ensureDir(path.join(publicDir, 'scrapbook', 'stickers'));
const stickers = ['butterfly', 'hamster', 'cat', 'disco-ball', 'vinyl', 'bow', 'star'];
for (const name of stickers) {
  fs.writeFileSync(path.join(publicDir, 'scrapbook', 'stickers', `${name}.png`), PNG_PLACEHOLDER);
}

// Silent MP3
ensureDir(path.join(publicDir, 'audio'));
fs.writeFileSync(path.join(publicDir, 'audio', 'song.mp3'), SILENT_MP3);

console.log('✅ All placeholder files created!');
