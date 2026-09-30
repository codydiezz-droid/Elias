// Loads every photo dropped into src/assets/elias/. Until real photos exist,
// cartoon stand-ins are generated so the site still works.
const files = import.meta.glob("./assets/elias/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}", {
  eager: true,
  import: "default",
});

const sorted = Object.keys(files)
  .sort()
  .map((path) => ({ src: files[path], cutout: /cutout/i.test(path) }));

const PALETTES = [
  ["#ff2d95", "#ffe600"],
  ["#00e5ff", "#ff3d00"],
  ["#7c4dff", "#00e676"],
  ["#ffd600", "#d500f9"],
  ["#00c853", "#ff1744"],
  ["#2979ff", "#ffea00"],
  ["#ff6d00", "#00b0ff"],
  ["#f50057", "#76ff03"],
];
const MOUTHS = [
  "M38 70 Q50 80 62 70", // smile
  "M38 74 L62 74", // unbothered
  "M40 76 Q50 66 60 76", // concerned
  "M36 68 Q50 88 64 68 Z", // yelling
];

function placeholder(i, transparent = false) {
  const [bg, accent] = PALETTES[i % PALETTES.length];
  const mouth = MOUTHS[i % MOUTHS.length];
  const shades = i % 3 === 0;
  const eyes = shades
    ? `<rect x="30" y="44" width="17" height="9" rx="3" fill="#111"/><rect x="53" y="44" width="17" height="9" rx="3" fill="#111"/><rect x="46" y="46" width="8" height="2" fill="#111"/>`
    : `<circle cx="40" cy="49" r="3.5" fill="#111"/><circle cx="60" cy="49" r="3.5" fill="#111"/>`;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
${transparent ? "" : `<rect width="100" height="100" fill="${bg}"/>`}
<ellipse cx="50" cy="56" rx="27" ry="31" fill="#c98d62"/>
<path d="M23 48 Q22 22 50 20 Q78 22 77 48 Q70 32 50 32 Q30 32 23 48Z" fill="#1d130d"/>
<path d="M30 40 L45 38 M55 38 L70 40" stroke="#1d130d" stroke-width="2.5" stroke-linecap="round"/>
${eyes}
<path d="M${mouth.slice(1)}" stroke="#4a1f10" stroke-width="3" fill="${mouth.endsWith("Z") ? "#4a1f10" : "none"}" stroke-linecap="round"/>
<path d="M36 80 Q50 92 64 80 Q60 88 50 88 Q40 88 36 80Z" fill="#1d130d" opacity=".55"/>
${transparent ? "" : `<text x="50" y="97" font-family="Impact,sans-serif" font-size="8" text-anchor="middle" fill="${accent}">ELIAS #${i + 1}</text>`}
</svg>`;
  return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
}

export const HAS_REAL_PHOTOS = sorted.length > 0;

export const PHOTOS = HAS_REAL_PHOTOS
  ? sorted.map((p) => p.src)
  : Array.from({ length: 12 }, (_, i) => placeholder(i));

const realCutouts = sorted.filter((p) => p.cutout).map((p) => p.src);
export const CUTOUTS = realCutouts.length
  ? realCutouts
  : HAS_REAL_PHOTOS
    ? PHOTOS
    : Array.from({ length: 12 }, (_, i) => placeholder(i, true));

// Deterministic "random" photo by index so every section gets a different Elias.
export const photo = (i) => PHOTOS[((i % PHOTOS.length) + PHOTOS.length) % PHOTOS.length];
export const cutout = (i) => CUTOUTS[((i % CUTOUTS.length) + CUTOUTS.length) % CUTOUTS.length];
// The sharpest photo, used for the giant dramatic spots.
export const bestPhoto = PHOTOS[0];

// Only a couple of photos? Filters and mirroring turn them into "variants".
const VARIANTS = [
  "",
  "-scale-x-100",
  "grayscale contrast-125",
  "sepia saturate-150",
  "hue-rotate-90 saturate-200",
  "-scale-x-100 hue-rotate-180 saturate-150",
  "contrast-150 saturate-200",
  "-scale-x-100 saturate-200 contrast-125",
  "-scale-x-100 sepia",
  "hue-rotate-[270deg] saturate-200",
];
export const variant = (i) => VARIANTS[((i % VARIANTS.length) + VARIANTS.length) % VARIANTS.length];

export const randomPhoto = () => PHOTOS[Math.floor(Math.random() * PHOTOS.length)];
