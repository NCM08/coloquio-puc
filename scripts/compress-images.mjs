// scripts/compress-images.mjs
// Comprime las imágenes del carrusel a máx 500KB manteniendo calidad visual

import sharp from "sharp";
import { readdir, stat, rename } from "fs/promises";
import { join, extname, basename } from "path";

const IMAGES_DIR = "./public/images";
const TARGET_FILES = [
  "slide-1.jpg",
  "slide-2.jpg",
  "slide-3.JPG",
  "slide-4.JPG",
  "slide-5.JPG",
  "slide-6.jpg",
  "coloquio2026.png",
  "logo-puc-azul.png",
  "logo-puc-blanco.png",
];

const MAX_WIDTH = 1920; // máximo ancho para pantallas grandes
const JPEG_QUALITY = 82;
const PNG_QUALITY = 85;

async function compressImage(filename) {
  const inputPath = join(IMAGES_DIR, filename);
  const outputPath = join(IMAGES_DIR, `_compressed_${filename}`);
  const ext = extname(filename).toLowerCase();
  const isJpeg = ext === ".jpg" || ext === ".jpeg";

  let pipeline = sharp(inputPath).resize(MAX_WIDTH, null, {
    withoutEnlargement: true, // no agrandar si ya es más pequeña
    fit: "inside",
  });

  if (isJpeg) {
    pipeline = pipeline.jpeg({ quality: JPEG_QUALITY, progressive: true });
  } else {
    pipeline = pipeline.png({ quality: PNG_QUALITY, compressionLevel: 9 });
  }

  await pipeline.toFile(outputPath);

  const before = (await stat(inputPath)).size;
  const after = (await stat(outputPath)).size;

  // Reemplazar original solo si la versión comprimida es más pequeña
  if (after < before) {
    await rename(outputPath, inputPath);
    const saved = (((before - after) / before) * 100).toFixed(1);
    console.log(
      `✓ ${filename}: ${(before / 1024).toFixed(0)}KB → ${(after / 1024).toFixed(0)}KB (${saved}% menos)`
    );
  } else {
    // Ya estaba optimizada, borrar el temporal
    const { unlink } = await import("fs/promises");
    await unlink(outputPath);
    console.log(`— ${filename}: ya estaba optimizada (${(before / 1024).toFixed(0)}KB), sin cambios`);
  }
}

console.log("Comprimiendo imágenes...\n");

for (const file of TARGET_FILES) {
  try {
    await compressImage(file);
  } catch (err) {
    console.error(`✗ Error en ${file}:`, err.message);
  }
}

console.log("\n¡Listo! Sube el sitio y las imágenes cargarán mucho más rápido.");
