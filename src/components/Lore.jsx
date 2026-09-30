import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { INSIDE_JOKE, QUOTES, ROASTS } from "../content";
import { cutout, photo } from "../photos";
import { ArepaWord, ChaosButton, ParodyTag, SectionTitle, Sfx } from "./bits";

export function QuoteMachine() {
  const [quote, setQuote] = useState(null);
  const [spinning, setSpinning] = useState(false);
  const [count, setCount] = useState(0);

  const generate = () => {
    if (spinning) return;
    setSpinning(true);
    setTimeout(() => {
      const inside = Math.random() < 0.18;
      let text = inside ? INSIDE_JOKE : QUOTES[Math.floor(Math.random() * QUOTES.length)];
      if (!inside && quote && text === quote.text) text = QUOTES[(QUOTES.indexOf(text) + 1) % QUOTES.length];
      setQuote({ text, inside, id: Date.now() });
      setCount((c) => c + 1);
      setSpinning(false);
    }, 900);
  };

  return (
    <section id="quotes" className="bg-checker relative overflow-hidden px-4 py-24">
      <SectionTitle kicker="▶ PRESS START">ELIAS QUOTE MACHINE</SectionTitle>
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-10 md:flex-row">
        <motion.img
          src={cutout(5)}
          alt="Elias, dispensing wisdom"
          className="h-56 w-56 shrink-0 rounded-full border-8 border-cyber object-cover shadow-[0_0_60px_#00e5ff]"
          animate={spinning ? { rotate: [0, 20, -20, 360], scale: [1, 1.1, 0.9, 1] } : { rotate: 0, y: [0, -10, 0] }}
          transition={spinning ? { duration: 0.9 } : { duration: 2, repeat: Infinity }}
        />
        <div className="w-full flex-1">
          <div className="mb-3 flex flex-wrap items-center gap-3">
            <span className="rounded bg-red-600 px-3 py-1 font-pixel text-[10px] text-white sm:text-xs">⚠ UNVERIFIED ELIAS LORE</span>
            <span className="font-pixel text-[10px] text-white/60">WISDOM DISPENSED: {count}</span>
          </div>
          <div className="relative min-h-44 rounded-lg border-4 border-acid bg-black p-6 font-pixel text-acid shadow-[inset_0_0_40px_rgba(198,255,0,.25)]">
            <AnimatePresence mode="wait">
              {spinning ? (
                <motion.p key="spin" className="blink text-sm sm:text-base" exit={{ opacity: 0 }}>
                  CONSULTING THE ELIAS ARCHIVES…
                </motion.p>
              ) : quote ? (
                <motion.div
                  key={quote.id}
                  initial={{ opacity: 0, scale: 0.5, rotateX: 90 }}
                  animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                  exit={{ opacity: 0 }}
                >
                  {quote.inside && (
                    <p className="mb-3 inline-block bg-hot px-2 py-1 text-[10px] text-white">🔒 INSIDE JOKE · PARODY, NOT A REAL QUOTE</p>
                  )}
                  <p className="text-lg leading-relaxed sm:text-2xl">
                    "{quote.inside ? <ArepaWord>{quote.text}</ArepaWord> : quote.text}"
                  </p>
                  <p className="mt-4 text-[10px] text-white/60">— Elias (probably, maybe, not really)</p>
                </motion.div>
              ) : (
                <motion.p key="idle" className="text-sm text-white/70">INSERT COIN TO RECEIVE WISDOM_</motion.p>
              )}
            </AnimatePresence>
          </div>
          <div className="mt-6">
            <ChaosButton peek={9} onClick={generate} className="bg-cyber text-black">GENERATE ELIAS WISDOM</ChaosButton>
          </div>
          <p className="mt-4 font-comic text-sm text-white/60">
            Fictional quotes generated for comedy. Elias did not necessarily say any of these.
          </p>
        </div>
      </div>
    </section>
  );
}

export function ArepaSituation() {
  const hearts = Array.from({ length: 18 }, (_, i) => ({
    i,
    left: (i * 37) % 100,
    delay: (i * 0.7) % 6,
    dur: 7 + (i % 5),
    size: 18 + ((i * 13) % 30),
  }));
  return (
    <section id="arepa" className="relative overflow-hidden bg-black px-4 py-32 text-center">
      {hearts.map((h) => (
        <motion.span
          key={h.i}
          className="pointer-events-none absolute bottom-0"
          style={{ left: `${h.left}%`, fontSize: h.size }}
          animate={{ y: [0, -900], opacity: [0, 1, 0], x: [0, 30, -30, 0] }}
          transition={{ duration: h.dur, delay: h.delay, repeat: Infinity, ease: "easeOut" }}
        >
          {h.i % 3 ? "❤️" : "💕"}
        </motion.span>
      ))}

      <p className="font-lux text-sm uppercase tracking-[.6em] text-rose-300/80">A love story in one act</p>
      <h2 className="mt-2 font-lux text-4xl italic text-rose-100 sm:text-6xl">The <ArepaWord>Arepa</ArepaWord> Situation</h2>

      <div className="mx-auto mt-16 grid max-w-6xl items-center gap-12 md:grid-cols-2">
        <motion.div
          className="relative mx-auto"
          initial={{ opacity: 0, filter: "blur(20px)", scale: 1.2 }}
          whileInView={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 2.2 }}
        >
          <img
            src={photo(3)}
            alt="Elias, gazing dramatically into the distance"
            className="h-[70vh] max-h-[620px] w-[80vw] max-w-md rounded-t-full object-cover shadow-[0_0_120px_rgba(255,64,129,.45)] sepia-[.3]"
          />
          <div className="absolute inset-0 rounded-t-full bg-gradient-to-t from-black via-transparent to-transparent" />
          <p className="absolute bottom-6 left-0 right-0 font-lux text-sm italic text-rose-200">*gazes into the distance*</p>
        </motion.div>

        <div>
          <motion.p
            className="font-lux text-5xl font-black leading-none text-rose-50 sm:text-7xl"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
          >
            HIS LOVE IS <ArepaWord className="text-rose-400">AREPA.</ArepaWord>
          </motion.p>
          <motion.p
            className="mt-8 font-lux text-xl italic text-rose-200/80"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.8 }}
          >
            "No.
            <br />
            Not the food."
          </motion.p>

          <motion.div
            className="mt-12"
            initial={{ scale: 0, rotate: -30 }}
            whileInView={{ scale: [0, 1.5, 1], rotate: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 3.2, duration: 0.7 }}
          >
            <p className="font-anton text-6xl text-rose-500 sm:text-8xl" style={{ textShadow: "0 0 40px #ff1744" }}>
              ❤️ <ArepaWord>AREPA</ArepaWord> ❤️
            </p>
            <p className="mt-6 font-lux italic text-white/80">"No further questions will be answered at this time."</p>
          </motion.div>

          <motion.p
            className="mt-12 font-bungee text-2xl text-gold"
            initial={{ opacity: 0, letterSpacing: "1em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.1em" }}
            viewport={{ once: true }}
            transition={{ delay: 4.2, duration: 1.2 }}
          >
            THE ELIAS LORE DEEPENS.
          </motion.p>
          <ParodyTag className="mt-6 text-rose-300/70">Inside joke · parody · not a verified fact</ParodyTag>
        </div>
      </div>
    </section>
  );
}

export function RoastZone() {
  const [i, setI] = useState(0);
  const [n, setN] = useState(0);
  const roast = () => {
    setI((prev) => {
      let next = Math.floor(Math.random() * ROASTS.length);
      if (next === prev) next = (next + 1) % ROASTS.length;
      return next;
    });
    setN((x) => x + 1);
  };
  return (
    <section id="roast" className="relative overflow-hidden bg-yellow-300 px-4 py-24 text-black">
      <div
        className="pointer-events-none absolute inset-0 opacity-[.12]"
        style={{ backgroundImage: `url("${photo(6)}")`, backgroundSize: "260px", backgroundRepeat: "repeat" }}
      />
      <div className="relative">
        <p className="mx-auto mb-6 w-fit -rotate-2 border-8 border-black bg-black px-4 py-2 text-center font-anton text-3xl text-yellow-300 sm:text-5xl">
          ⚠️ PARODY / INSIDE JOKES ⚠️
        </p>
        {/* Elias appears behind (inside) the text */}
        <h2
          className="bg-cover bg-center bg-clip-text text-center font-anton text-[18vw] leading-none text-transparent sm:text-[11rem]"
          style={{ backgroundImage: `url("${photo(7)}")`, WebkitTextStroke: "3px #000" }}
        >
          FRIENDLY FIRE ONLY
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-center font-comic text-lg">
          Obviously fictional friend-group banter. Said with love. Mostly.
        </p>

        <div className="mx-auto mt-12 flex max-w-4xl flex-col items-center gap-8 md:flex-row">
          <motion.img
            key={n}
            src={cutout(n + 8)}
            alt="Elias, reacting to being roasted"
            className="h-48 w-48 shrink-0 rounded-full border-8 border-black object-cover"
            initial={{ rotate: -30, scale: 0.6 }}
            animate={{ rotate: 0, scale: 1, x: [0, -12, 12, -6, 0] }}
            transition={{ duration: 0.5 }}
          />
          <div className="relative w-full flex-1">
            <div className="relative min-h-40 rounded-3xl border-4 border-black bg-white p-6 shadow-[10px_10px_0_#000]">
              <AnimatePresence mode="wait">
                <motion.p
                  key={n}
                  className="whitespace-pre-line font-bungee text-2xl sm:text-3xl"
                  initial={{ x: 200, opacity: 0, rotate: 8 }}
                  animate={{ x: 0, opacity: 1, rotate: 0 }}
                  exit={{ x: -200, opacity: 0, rotate: -8 }}
                >
                  {ROASTS[i]}
                </motion.p>
              </AnimatePresence>
              <p className="mt-3 font-comic text-xs text-black/60">Roast #{n + 1} · 100% fictional · 0% HR-approved</p>
            </div>
            {n > 0 && <Sfx key={n} className="-right-2 -top-6" color="bg-hot" />}
          </div>
        </div>
        <div className="mt-10 text-center">
          <ChaosButton peek={11} onClick={roast} className="bg-red-600 px-10 py-5 text-2xl text-white">🔥 ROAST ELIAS 🔥</ChaosButton>
        </div>
      </div>
    </section>
  );
}
