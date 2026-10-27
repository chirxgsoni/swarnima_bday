const fs = require('fs');
const path = require('path');

const srcDir = 'c:/Users/chira/Downloads/Swarnima_Cuby/Swarnima_cuby/photos and song';
const basePublic = 'c:/Users/chira/Downloads/Swarnima_Cuby/Swarnima_cuby/public/photos';
const chatBgDir = path.join(basePublic, 'chat_bg');
const scrapbookDir = path.join(basePublic, 'scrapbook');

if (!fs.existsSync(chatBgDir)) {
  fs.mkdirSync(chatBgDir, { recursive: true });
}
if (!fs.existsSync(scrapbookDir)) {
  fs.mkdirSync(scrapbookDir, { recursive: true });
}

// 1. Setup chat_bg
// User requirement:
// Left: the girl's pic
// Middle: heart named (heart.jpeg)
// Right: yashasvi named (yashasvi.jpeg)
fs.copyFileSync(path.join(srcDir, 'WhatsApp Image 2026-10-27 at 4.40.29 PM11111.jpeg'), path.join(chatBgDir, 'girl.jpg'));
fs.copyFileSync(path.join(srcDir, 'heart.jpeg'), path.join(chatBgDir, 'heart.jpg'));
fs.copyFileSync(path.join(srcDir, 'yashasvi.jpeg'), path.join(chatBgDir, 'yashasvi.jpg'));
console.log('Copied chat_bg photos: girl.jpg, heart.jpg, yashasvi.jpg');

// 2. Setup scrapbook photos
// User requirement:
// "have folower photo , heart and other girl"
fs.copyFileSync(path.join(srcDir, '1.jpeg'), path.join(scrapbookDir, 'flowers.jpg'));
fs.copyFileSync(path.join(srcDir, 'heart.jpeg'), path.join(scrapbookDir, 'heart.jpg'));
fs.copyFileSync(path.join(srcDir, 'yashasvi.jpeg'), path.join(scrapbookDir, 'yashasvi.jpg'));

// Swarnima photos
const swarnimaMap = [
  { file: 'WhatsApp Image 2026-10-27 at 4.40.29 PM11111.jpeg', name: 'swarnima_red_traditional.jpg' },
  { file: 'WhatsApp Image 2026-10-27 at 4.40.30 PM.jpeg',       name: 'swarnima_outdoor_smile.jpg' },
  { file: 'WhatsApp Image 2026-10-27 at 4.4011.30 PM.jpeg',     name: 'swarnima_blue_bindi.jpg' },
  { file: 'WhatsApp Image 2026-10-27 at 4.41.25 PM11.jpeg',     name: 'swarnima_chin_rest.jpg' },
  { file: 'WhatsApp Image 2026-10-27 at 4.41.26 PM.jpeg',       name: 'swarnima_lying_eyes.jpg' },
  { file: 'WhatsApp Image 2026-10-27 at 4.41.26 PM11.jpeg',     name: 'swarnima_night_tilted.jpg' },
  { file: '1111.jpeg',                                         name: 'swarnima_portrait_smile.jpg' },
];

swarnimaMap.forEach(p => {
  fs.copyFileSync(path.join(srcDir, p.file), path.join(scrapbookDir, p.name));
});

console.log('Copied scrapbook photos successfully.');
