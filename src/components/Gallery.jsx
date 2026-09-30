import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useChaos } from "../chaos";
import { HISTORY, MAP_SPOTS, MULTIVERSE, STATS, WALL_CAPTIONS } from "../content";
import { cutout, photo, PHOTOS } from "../photos";
import { ArepaWord, BreakfastWord, ChaosButton, FinanceWord, ParodyTag, SectionTitle, Sfx } from "./bits";

const CARD_COLORS = ["bg-hot", "bg-acid", "bg-cyber", "bg-yellow-300", "bg-orange-400", "bg-violet-400"];

export function Multiverse() {
  return (
    <section id="multiverse" className="relative bg-gradient-to-br from-indigo-950 via-purple-900 to-black px-4 py-24">
      <SectionTitle kicker="SELECT YOUR ELIAS">
        THE ELIAS <span className="text-stroke-white">MULTIVERSE</span>
      </SectionTitle>
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {MULTIVERSE.map((name, i) => (
          <motion.div
            key={name}
            className="group relative overflow-hidden rounded-2xl border-4 border-black bg-black shadow-[6px_6px_0_#000]"
            initial={{ opacity: 0, y: 80, rotate: i % 2 ? 8 : -8 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ type: "spring", delay: (i % 4) * 0.08 }}
            whileHover={{ scale: 1.12, rotate: i % 2 ? 3 : -3, zIndex: 10 }}
          >
            <img
              src={photo(i + 1)}
              alt={`Elias as ${name}`}
              className="aspect-[3/4] w-full object-cover transition-transform duration-500 group-hover:scale-150 group-hover:rotate-6"
            />
            <div className={`absolute inset-x-0 bottom-0 ${CARD_COLORS[i % CARD_COLORS.length]} border-t-4 border-black px-2 py-2 text-center font-bungee text-xs text-black sm:text-sm`}>
              {name === "FINANCE ELIAS" ? <FinanceWord>{name}</FinanceWord> : name === "AREPA ELIAS" ? <ArepaWord>{name}</ArepaWord> : name}
            </div>
            <span className="absolute left-2 top-2 rounded bg-black/70 px-2 py-0.5 font-pixel text-[8px] text-acid">#{String(i + 1).padStart(3, "0")}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

const SLIDE_CAPTIONS = [
  "ELIAS. UNBOTHERED.",
  "ELIAS. LOCKED IN.",
  "ELIAS. PROBABLY THINKING ABOUT FINANCE.",
  "ELIAS. IN HIS ELEMENT (UNCLEAR WHICH ONE).",
  "ELIAS. A CINEMATIC UNIVERSE.",
  "ELIAS. AGAIN.",
];
const SLIDE_FX = [
  { initial: { opacity: 0, scale: 2.5, rotate: 20 }, animate: { opacity: 1, scale: 1, rotate: 0 } },
  { initial: { opacity: 0, x: "100%", skewX: -30 }, animate: { opacity: 1, x: 0, skewX: 0 } },
  { initial: { opacity: 0, rotateY: 180 }, animate: { opacity: 1, rotateY: 0 } },
  { initial: { opacity: 0, filter: "blur(40px) hue-rotate(180deg)" }, animate: { opacity: 1, filter: "blur(0px) hue-rotate(0deg)" } },
  { initial: { opacity: 0, y: "-100%", rotate: -720 }, animate: { opacity: 1, y: 0, rotate: 0 } },
];

export function Slideshow() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((x) => x + 1), 3400);
    return () => clearInterval(t);
  }, []);
  const fx = SLIDE_FX[i % SLIDE_FX.length];
  return (
    <section className="relative overflow-hidden bg-black py-24 text-center" style={{ perspective: 1200 }}>
      <p className="font-lux text-sm uppercase tracking-[.8em] text-gold">A Film By Nobody</p>
      <h2 className="mt-3 px-4 font-lux text-4xl font-black italic text-white sm:text-6xl">The Unnecessarily Dramatic Slideshow</h2>
      <div className="relative mx-auto mt-12 aspect-[4/5] w-[86vw] max-w-lg overflow-hidden border-y-[28px] border-black shadow-[0_0_0_2px_#d4af37,0_0_100px_rgba(212,175,55,.35)] sm:aspect-video sm:max-w-4xl">
        <AnimatePresence>
          <motion.img
            key={i}
            src={photo(i + 4)}
            alt="Elias, dramatically"
            className="absolute inset-0 h-full w-full object-cover"
            initial={fx.initial}
            animate={{ ...fx.animate, scale: [null, 1.15] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, scale: { duration: 3.4, ease: "linear" } }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        <AnimatePresence mode="wait">
          <motion.p
            key={i}
            className="absolute inset-x-0 bottom-6 px-4 font-lux text-xl font-bold italic tracking-wide text-white sm:text-3xl"
            initial={{ opacity: 0, letterSpacing: "0.6em" }}
            animate={{ opacity: 1, letterSpacing: "0.05em" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            {SLIDE_CAPTIONS[i % SLIDE_CAPTIONS.length]}
          </motion.p>
        </AnimatePresence>
      </div>
      <p className="mt-6 font-lux text-xs italic text-white/50">Slide {(i % PHOTOS.length) + 1} of ∞ · Orchestral music playing in your imagination</p>
    </section>
  );
}

export function Stats() {
  return (
    <section id="stats" className="relative overflow-hidden bg-[#1b1b3a] px-4 py-24">
      <SectionTitle kicker="PLAYER 1 · LVL 99">ELIAS STATISTICS</SectionTitle>
      <div className="mx-auto grid max-w-5xl items-start gap-10 md:grid-cols-[260px_1fr]">
        <div className="mx-auto w-60 border-4 border-white bg-black p-3 text-center">
          <img src={cutout(9)} alt="Elias character portrait" className="aspect-square w-full object-cover [image-rendering:pixelated]" />
          <p className="mt-3 font-pixel text-xs text-acid">ELIAS SARWANA</p>
          <p className="mt-1 font-pixel text-[8px] text-white/70">CLASS: <FinanceWord>FINANCE</FinanceWord> MENACE</p>
          <p className="mt-1 font-pixel text-[8px] text-white/70">HP ♥♥♥♥♥♥♥♥♥♥</p>
        </div>
        <div className="space-y-5 font-pixel">
          {STATS.map((s, i) => {
            const unknown = s.value === null;
            const pct = unknown ? 100 : Math.min(100, (s.value / s.max) * 100);
            const over = !unknown && s.value > s.max;
            return (
              <div key={s.label}>
                <div className="mb-2 flex justify-between text-[10px] sm:text-xs">
                  <span className="text-white">
                    {s.label.includes("AREPA") ? <ArepaWord>{s.label}</ArepaWord> : s.label.includes("BREAKFAST") ? <BreakfastWord>{s.label}</BreakfastWord> : s.label}
                  </span>
                  <span className={over ? "rainbow" : unknown ? "blink text-hot" : "text-acid"}>
                    {unknown ? "??????????" : s.label === "BREAKFAST DECISIONS" ? `${s.value}/100` : s.value}
                  </span>
                </div>
                <div className={`h-6 border-4 border-white bg-black ${over ? "overflow-visible" : "overflow-hidden"}`}>
                  <motion.div
                    className={`h-full ${unknown ? "bg-[repeating-linear-gradient(45deg,#ff2d95_0_8px,#000_8px_16px)]" : over ? "bg-gradient-to-r from-hot via-yellow-300 to-cyber" : s.value < 10 ? "bg-red-600" : "bg-acid"}`}
                    initial={{ width: 0 }}
                    whileInView={{ width: over ? `${Math.min(s.value / s.max, 1.35) * 100}%` : `${pct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.4, delay: i * 0.12, ease: "easeOut" }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <p className="mx-auto mt-12 max-w-2xl text-center font-comic text-white/70">
        *Several statistics may have been calculated using absolutely no scientific methodology.
      </p>
    </section>
  );
}

export function History() {
  return (
    <section id="history" className="relative bg-[#f3e5c0] px-4 py-24 text-[#3b2a14]">
      <SectionTitle kicker="" className="text-[#3b2a14]">
        <span className="font-lux italic">Elias Through History</span>
      </SectionTitle>
      <p className="-mt-6 mb-12 text-center"><ParodyTag>Historically inaccurate</ParodyTag></p>
      <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {HISTORY.map((h, i) => (
          <motion.article
            key={h.title}
            className="relative border-2 border-[#3b2a14] bg-[#fbf3dc] p-4 shadow-[6px_6px_0_#3b2a14]"
            initial={{ opacity: 0, rotate: i % 2 ? 6 : -6, y: 50 }}
            whileInView={{ opacity: 1, rotate: i % 2 ? 1.5 : -1.5, y: 0 }}
            whileHover={{ rotate: 0, scale: 1.04 }}
            viewport={{ once: true }}
          >
            <div className="relative h-56 overflow-hidden border-2 border-[#3b2a14] bg-[radial-gradient(circle,#e8d49a,#b08d4a)]">
              <motion.img
                src={cutout(i + 2)}
                alt={h.title}
                className="absolute bottom-0 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full object-cover sepia"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2.5 + i * 0.3, repeat: Infinity }}
              />
              <span className="absolute left-2 top-2 bg-[#3b2a14] px-2 py-0.5 font-lux text-sm text-[#fbf3dc]">{h.year}</span>
            </div>
            <h3 className="mt-4 font-lux text-xl font-bold leading-tight">
              {h.title.includes("arepa") ? <ArepaWord>{h.title}</ArepaWord> : h.title}
            </h3>
            <p className="mt-2 font-lux text-sm italic">{h.note}</p>
            <p className="mt-3 font-comic text-[11px] uppercase tracking-widest text-red-800">Historically inaccurate.</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

export function SightingMap() {
  const [spot, setSpot] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setSpot((s) => (s + 1) % MAP_SPOTS.length), 2200);
    return () => clearInterval(t);
  }, []);
  const cur = MAP_SPOTS[spot];
  return (
    <section id="map" className="relative bg-sky-200 px-4 py-24 text-black">
      <SectionTitle kicker="" className="text-black">
        ELIAS SIGHTING MAP
      </SectionTitle>
      <div className="bg-map relative mx-auto aspect-[4/3] max-w-5xl overflow-hidden rounded-3xl border-8 border-black shadow-[12px_12px_0_#000] sm:aspect-[16/9]">
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <path d="M18 28 L44 40 L62 20 M44 40 L55 62 L82 52 M55 62 L30 70" stroke="#8d6e63" strokeWidth="1.2" strokeDasharray="2 1.5" fill="none" />
        </svg>
        <span className="absolute right-4 top-3 font-lux text-sm italic sm:text-lg">🧭 Here Be Elias</span>
        <span className="absolute bottom-3 left-4 text-2xl">🐉</span>
        {MAP_SPOTS.map((s, i) => (
          <button
            type="button"
            key={s.name}
            onClick={() => setSpot(i)}
            className="absolute -translate-x-1/2 -translate-y-1/2 text-center"
            style={{ left: `${s.x}%`, top: `${s.y}%` }}
          >
            <span className="text-2xl sm:text-4xl">{s.emoji}</span>
            <span className="mt-1 block whitespace-nowrap rounded border-2 border-black bg-white px-1.5 font-bungee text-[9px] sm:text-xs">
              {s.name.includes("AREPA") ? <ArepaWord>{s.name}</ArepaWord> : s.name}
            </span>
          </button>
        ))}
        <motion.div
          className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full"
          animate={{ left: `${cur.x}%`, top: `${cur.y - 6}%` }}
          transition={{ type: "spring", stiffness: 60, damping: 12 }}
        >
          <motion.img
            src={cutout(0)}
            alt="Elias map marker"
            className="h-12 w-12 rounded-full border-4 border-red-600 object-cover shadow-lg sm:h-16 sm:w-16"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 0.6, repeat: Infinity }}
          />
        </motion.div>
      </div>
      <p className="mt-6 text-center font-bungee text-lg">
        LAST SEEN: <span className="text-red-600">{cur.name}</span>
      </p>
      <p className="mt-2 text-center font-comic text-sm text-black/70">
        *Parody map. Not real-time location information. Fidelity HQ is included purely for the bit.
      </p>
    </section>
  );
}

export function PhotoWall() {
  const tiles = useMemo(
    () =>
      Array.from({ length: Math.max(24, PHOTOS.length) }, (_, i) => ({
        i,
        rot: ((i * 47) % 24) - 12,
        caption: WALL_CAPTIONS[(i * 7) % WALL_CAPTIONS.length],
        tall: i % 5 === 0,
      })),
    []
  );
  return (
    <section id="wall" className="relative overflow-hidden bg-hot px-3 py-24">
      <h2 className="text-center font-shade text-5xl text-yellow-300 sm:text-8xl">TOO MUCH ELIAS</h2>
      <p className="mt-3 text-center font-comic text-lg text-white">There is no such thing. (There is. This is it.)</p>
      <div className="mx-auto mt-12 max-w-6xl columns-2 gap-4 sm:columns-3 lg:columns-4">
        {tiles.map((t) => (
          <motion.figure
            key={t.i}
            className="relative mb-6 break-inside-avoid bg-white p-2 pb-8 shadow-xl"
            style={{ rotate: t.rot }}
            initial={{ opacity: 0, scale: 0.3 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            whileHover={{ rotate: 0, scale: 1.2, zIndex: 20, boxShadow: "0 30px 60px rgba(0,0,0,.5)" }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            <img src={photo(t.i)} alt={`Elias, ${t.caption}`} className={`w-full object-cover ${t.tall ? "aspect-[3/4]" : "aspect-square"}`} />
            <figcaption className="absolute inset-x-0 bottom-1 text-center font-comic text-base text-black">{t.caption}</figcaption>
            {t.i % 6 === 2 && <span className="absolute -right-3 -top-3 text-3xl">📌</span>}
          </motion.figure>
        ))}
      </div>
    </section>
  );
}

export function FinalBoss() {
  const { summon } = useChaos();
  const lines = ["Finance.", "CrossFit.", "Arepa lore.", "Breakfast controversy."];
  return (
    <section className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-black px-4 py-24 text-center">
      <motion.img
        src={photo(PHOTOS.length - 1)}
        alt="The final Elias"
        className="absolute inset-0 h-full w-full object-cover"
        initial={{ opacity: 0, scale: 1.4 }}
        whileInView={{ opacity: 0.45, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 4 }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#000_75%)]" />
      <div className="relative z-10">
        <motion.p
          className="font-lux text-2xl uppercase tracking-[.5em] text-white/80 sm:text-4xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2 }}
        >
          You have reached
        </motion.p>
        <motion.p
          className="mt-4 font-anton text-6xl text-red-600 sm:text-9xl"
          style={{ textShadow: "0 0 60px #ff0000" }}
          initial={{ opacity: 0, scale: 0.3 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 2, duration: 1.5 }}
        >
          THE FINAL ELIAS.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 4, duration: 1.5 }}
        >
          <h2 className="mt-16 font-lux text-5xl font-black text-gold sm:text-7xl">ELIAS SARWANA</h2>
          <div className="mt-6 space-y-1 font-lux text-xl italic text-white sm:text-2xl">
            <p><FinanceWord>Finance.</FinanceWord></p>
            <p>{lines[1]}</p>
            <p><ArepaWord>{lines[2]}</ArepaWord></p>
            <p><BreakfastWord>{lines[3]}</BreakfastWord></p>
          </div>
          <div className="mt-14">
            <ChaosButton peek={3} onClick={() => summon(60)} className="bg-gradient-to-r from-gold via-yellow-200 to-gold px-10 py-6 text-2xl text-black sm:text-4xl">
              SUMMON MORE ELIAS
            </ChaosButton>
          </div>
        </motion.div>
      </div>
      <Sfx text="BOSS FIGHT" className="left-4 top-10" color="bg-red-500" rotate={-8} />
    </section>
  );
}

export function Footer() {
  const [visitors] = useState(() => 4206900 + Math.floor(Math.random() * 999));
  return (
    <footer className="border-t-8 border-double border-acid bg-[#000080] px-4 py-10 text-center font-comic text-white">
      <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-3">
        {[0, 1, 2, 3, 4].map((i) => (
          <img key={i} src={cutout(i + 6)} alt="" className="h-10 w-10 rounded-full object-cover" />
        ))}
      </div>
      <p className="mt-4">
        You are visitor #<span className="bg-black px-2 font-pixel text-xs text-acid">{String(visitors).padStart(9, "0")}</span>
      </p>
      <p className="blink mt-3 font-bungee text-yellow-300">🚧 UNDER CONSTRUCTION SINCE ELIAS WAS BORN 🚧</p>
      <p className="mt-3 text-sm text-white/80">Best viewed in Netscape Navigator 4.0 at 800×600 with Elias mode enabled.</p>
      <p className="mt-6 max-w-2xl text-xs text-white/60 sm:mx-auto">
        This is a parody fan page made by Elias's friends. Quotes, stats, roasts, maps and history are jokes and inside jokes, not
        verified facts. No real location information is shown. <a className="underline" href="classic.html">Classic site</a>.
      </p>
      <p className="mt-4 text-[10px] text-white/40">psst: ↑ ↑ ↓ ↓ ← → ← → B A</p>
    </footer>
  );
}
