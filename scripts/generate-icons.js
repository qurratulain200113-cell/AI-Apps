import fs from 'fs';
import zlib from 'zlib';

function createPng(width, height, r, g, b) {
  // Simple uncompressed/deflated raw RGBA PNG generator
  const buffer = Buffer.alloc(height * (width * 4 + 1));
  let offset = 0;

  for (let y = 0; y < height; y++) {
    buffer[offset++] = 0; // Filter type: None
    for (let x = 0; x < width; x++) {
      // Draw rounded squircle / icon shape
      const dx = (x - width / 2) / (width / 2);
      const dy = (y - height / 2) / (height / 2);
      const distSq = dx * dx + dy * dy;

      if (distSq < 0.75) {
        // Center shield area
        if (distSq < 0.25) {
          buffer[offset++] = 255;
          buffer[offset++] = 255;
          buffer[offset++] = 255;
          buffer[offset++] = 255;
        } else {
          buffer[offset++] = r;
          buffer[offset++] = g;
          buffer[offset++] = b;
          buffer[offset++] = 255;
        }
      } else {
        buffer[offset++] = 15;  // #0f172a
        buffer[offset++] = 23;
        buffer[offset++] = 42;
        buffer[offset++] = 255;
      }
    }
  }

  const compressedData = zlib.deflateSync(buffer);

  // PNG Header
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR chunk
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // 8-bit depth
  ihdr[9] = 6; // Color type 6: RGBA
  ihdr[10] = 0; // Compression 0
  ihdr[11] = 0; // Filter 0
  ihdr[12] = 0; // Interlace 0

  function makeChunk(type, data) {
    const chunk = Buffer.alloc(8 + data.length + 4);
    chunk.writeUInt32BE(data.length, 0);
    chunk.write(type, 4, 4, 'ascii');
    data.copy(chunk, 8);

    // CRC32
    const crc = crc32(Buffer.concat([Buffer.from(type, 'ascii'), data]));
    chunk.writeUInt32BE(crc >>> 0, 8 + data.length);
    return chunk;
  }

  // Quick CRC32 table
  function crc32(buf) {
    let crc = -1;
    for (let i = 0; i < buf.length; i++) {
      crc = (crc >>> 8) ^ table[(crc ^ buf[i]) & 0xff];
    }
    return (crc ^ -1) >>> 0;
  }

  const table = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
    table[i] = c >>> 0;
  }

  const ihdrChunk = makeChunk('IHDR', ihdr);
  const idatChunk = makeChunk('IDAT', compressedData);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

// Generate 192x192, 512x512, and apple-touch-icon
fs.writeFileSync('public/pwa-192x192.png', createPng(192, 192, 30, 58, 138));
fs.writeFileSync('public/pwa-512x512.png', createPng(512, 512, 30, 58, 138));
fs.writeFileSync('public/pwa-maskable-512x512.png', createPng(512, 512, 30, 58, 138));
fs.writeFileSync('public/apple-touch-icon.png', createPng(180, 180, 30, 58, 138));

console.log('PWA PNG icons generated successfully in public/');
