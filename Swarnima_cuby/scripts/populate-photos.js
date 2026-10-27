const fs = require('fs');
const path = require('path');

const srcDir = 'c:/Users/chira/Downloads/Swarnima_Cuby/Swarnima_cuby/photos and song';
const basePublic = 'c:/Users/chira/Downloads/Swarnima_Cuby/Swarnima_cuby/public/photos';

// List of the 8 unique photos of Swarnima & flowers (EXCLUDING heart.jpeg and yashasvi.jpeg)
const swarnimaPhotos = [
  { file: 'WhatsApp Image 2026-10-27 at 4.40.29 PM11111.jpeg', name: 'swarnima_red_traditional.jpg' },
  { file: 'WhatsApp Image 2026-10-27 at 4.40.30 PM.jpeg',       name: 'swarnima_outdoor_smile.jpg' },
  { file: 'WhatsApp Image 2026-10-27 at 4.4011.30 PM.jpeg',     name: 'swarnima_blue_bindi.jpg' },
  { file: 'WhatsApp Image 2026-10-27 at 4.41.25 PM11.jpeg',     name: 'swarnima_chin_rest.jpg' },
  { file: 'WhatsApp Image 2026-10-27 at 4.41.26 PM.jpeg',       name: 'swarnima_lying_eyes.jpg' },
  { file: 'WhatsApp Image 2026-10-27 at 4.41.26 PM11.jpeg',     name: 'swarnima_night_tilted.jpg' },
  { file: '1111.jpeg',                                         name: 'swarnima_portrait_smile.jpg' },
  { file: '1.jpeg',                                            name: 'swarnima_flowers.jpg' },
];

// Ensure swarnima directory exists
const swarnimaDir = path.join(basePublic, 'swarnima');
if (!fs.existsSync(swarnimaDir)) {
  fs.mkdirSync(swarnimaDir, { recursive: true });
}

// 1. Copy each to public/photos/swarnima/
swarnimaPhotos.forEach(p => {
  const from = path.join(srcDir, p.file);
  const to = path.join(swarnimaDir, p.name);
  fs.copyFileSync(from, to);
  console.log(`Copied ${p.name}`);
});

// 2. Setup chat_bg with ONLY Swarnima's photos (delete any old yashasvi or heart)
const chatBgDir = path.join(basePublic, 'chat_bg');
if (!fs.existsSync(chatBgDir)) {
  fs.mkdirSync(chatBgDir, { recursive: true });
}

// Remove old yashasvi.jpg and heart.jpg if they exist
['yashasvi.jpg', 'heart.jpg'].forEach(f => {
  const oldPath = path.join(chatBgDir, f);
  if (fs.existsSync(oldPath)) {
    fs.unlinkSync(oldPath);
    console.log(`Removed ${f}`);
  }
});

// Copy 3 distinct Swarnima photos for chat background
fs.copyFileSync(path.join(swarnimaDir, 'swarnima_red_traditional.jpg'), path.join(chatBgDir, 'swarnima_traditional.jpg'));
fs.copyFileSync(path.join(swarnimaDir, 'swarnima_outdoor_smile.jpg'), path.join(chatBgDir, 'swarnima_outdoor.jpg'));
fs.copyFileSync(path.join(swarnimaDir, 'swarnima_chin_rest.jpg'), path.join(chatBgDir, 'swarnima_chin_rest.jpg'));
fs.copyFileSync(path.join(swarnimaDir, 'swarnima_portrait_smile.jpg'), path.join(chatBgDir, 'swarnima_portrait.jpg'));

// 3. Avatar and Cover
fs.copyFileSync(path.join(swarnimaDir, 'swarnima_portrait_smile.jpg'), path.join(basePublic, 'avatar.webp'));
fs.copyFileSync(path.join(swarnimaDir, 'swarnima_portrait_smile.jpg'), path.join(basePublic, 'avatar.jpg'));
fs.copyFileSync(path.join(swarnimaDir, 'swarnima_red_traditional.jpg'), path.join(basePublic, 'cover.webp'));
fs.copyFileSync(path.join(swarnimaDir, 'swarnima_red_traditional.jpg'), path.join(basePublic, 'cover.jpg'));

// 4. Overwrite polaroids (p01..p10)
const polaroidDir = path.join(basePublic, 'polaroids');
for (let i = 1; i <= 10; i++) {
  const pName = `p${String(i).padStart(2, '0')}.webp`;
  const photo = swarnimaPhotos[(i - 1) % swarnimaPhotos.length];
  fs.copyFileSync(path.join(swarnimaDir, photo.name), path.join(polaroidDir, pName));
}

// 5. Overwrite garland photos (g01..g28)
const garlandDir = path.join(basePublic, 'garland');
for (let i = 1; i <= 28; i++) {
  const gName = `g${String(i).padStart(2, '0')}.webp`;
  const photo = swarnimaPhotos[(i - 1) % swarnimaPhotos.length];
  fs.copyFileSync(path.join(swarnimaDir, photo.name), path.join(garlandDir, gName));
}

// 6. Overwrite galaxy photos (f01..f12)
const galleryDir = path.join(basePublic, 'gallery');
for (let i = 1; i <= 12; i++) {
  const fName = `f${String(i).padStart(2, '0')}.webp`;
  const photo = swarnimaPhotos[(i - 1) % swarnimaPhotos.length];
  fs.copyFileSync(path.join(swarnimaDir, photo.name), path.join(galleryDir, fName));
}

console.log('Successfully populated all photos with Swarnima photos (heart and yashasvi excluded).');
