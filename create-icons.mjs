import { writeFileSync } from 'fs';
import { deflateSync } from 'zlib';

function crc32(buf) {
  const table = [];
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let j = 0; j < 8; j++) c = (c & 1) ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[i] = c;
  }
  let crc = 0xffffffff;
  for (const byte of buf) crc = table[(crc ^ byte) & 0xff] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const t = Buffer.from(type, 'ascii');
  const len = Buffer.alloc(4); len.writeUInt32BE(data.length);
  const crcVal = Buffer.alloc(4); crcVal.writeUInt32BE(crc32(Buffer.concat([t, data])));
  return Buffer.concat([len, t, data, crcVal]);
}

function createPNG(size) {
  const sig = Buffer.from([137,80,78,71,13,10,26,10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0); ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8; ihdr[9] = 2;

  const rowSize = size * 3 + 1;
  const raw = Buffer.alloc(size * rowSize);
  const cx = size / 2, cy = size / 2, radius = size * 0.42;

  for (let y = 0; y < size; y++) {
    raw[y * rowSize] = 0;
    for (let x = 0; x < size; x++) {
      const dx = x - cx, dy = y - cy;
      const inCircle = Math.sqrt(dx*dx + dy*dy) <= radius;
      // teal background: #0F766E, white inside circle
      const [r, g, b] = inCircle ? [255,255,255] : [15,118,110];
      raw[y * rowSize + 1 + x*3]     = r;
      raw[y * rowSize + 1 + x*3 + 1] = g;
      raw[y * rowSize + 1 + x*3 + 2] = b;
    }
  }

  return Buffer.concat([sig, chunk('IHDR', ihdr), chunk('IDAT', deflateSync(raw)), chunk('IEND', Buffer.alloc(0))]);
}

writeFileSync('public/icon-192.png', createPNG(192));
writeFileSync('public/icon-512.png', createPNG(512));
console.log('Ícones criados!');
