import { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useChaos } from "../chaos";
import { bestPhoto, cutout, photo, variant } from "../photos";
import { ChaosButton, FinanceWord, Sfx } from "./bits";

function FloatingHeads({ count = 16 }) {
  const heads = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        i,
        size: 44 + Math.random() * 60,
        left: Math.random() * 92,
        top: Math.random() * 88,
        dx: (Math.random() - 0.5) * 260,
        dy: (Math.random() - 0.5) * 220,
        dur: 12 + Math.random() * 14,
        spin: (Math.random() - 0.5) * 120,
      })),
    [count]
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {heads.map((h) => (
        <motion.img
          key={h.i}
          src={cutout(h.i + 3)}
          alt=""
          className={`absolute rounded-full border-2 border-white/70 object-cover object-[50%_30%] opacity-70 shadow-xl ${variant(h.i)}`}
          style={{ width: h.size, height: h.size, left: `${h.left}%`, top: `${h.top}%` }}
          animate={{ x: [0, h.dx, -h.dx / 2, 0], y: [0, h.dy, h.dy / 3, 0], rotate: [0, h.spin, -h.spin, 0] }}
          transition={{ duration: h.dur, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

function MoreEliasButton() {
  const { summon } = useChaos();
  const [pos, setPos] = useState(null);
  const ring = [0, 72, 144, 216, 288];
  return (
    <>
      <ChaosButton
        peek={7}
        href="#wall"
        className="bg-hot text-white"
        onMouseEnter={(e) => setPos({ x: e.clientX, y: e.clientY })}
        onMouseMove={(e) => setPos({ x: e.clientX, y: e.clientY })}
        onMouseLeave={() => setPos(null)}
        onClick={() => summon(25)}
      >
        MORE ELIAS
      </ChaosButton>
      <AnimatePresence>
        {pos && (
          <div className="pointer-events-none fixed z-[70]" style={{ left: pos.x, top: pos.y }}>
            {ring.map((deg, i) => {
              const r = 95;
              const x = Math.cos((deg * Math.PI) / 180) * r;
              const y = Math.sin((deg * Math.PI) / 180) * r;
              return (
                <motion.img
                  key={deg}
                  src={photo(i + 1)}
                  alt=""
                  className="absolute -ml-9 -mt-9 h-[72px] w-[72px] max-w-none rounded-full border-4 border-acid object-cover shadow-2xl"
                  initial={{ x: 0, y: 0, scale: 0, rotate: -180 }}
                  animate={{ x, y, scale: 1, rotate: 0 }}
                  exit={{ x: 0, y: 0, scale: 0 }}
                  transition={{ type: "spring", stiffness: 260, damping: 16, delay: i * 0.04 }}
                />
              );
            })}
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function Hero() {
  const { toast } = useChaos();
  const clicks = useRef(0);
  const [wobble, setWobble] = useState(0);

  const pokeFace = () => {
    clicks.current += 1;
    setWobble((w) => w + 1);
    if (clicks.current % 10 === 0) toast("WHY ARE YOU CLICKING ME?", "😤");
  };

  return (
    <header className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_center,#3a0a2a_0%,#0a0a0a_70%)] px-4 pb-16 pt-24">
      <div className="bg-glitter absolute inset-0 opacity-40" />
      <FloatingHeads count={16} />

      <motion.div
        className="blink absolute left-1/2 top-6 z-30 -translate-x-1/2 whitespace-nowrap rounded-md border-4 border-yellow-300 bg-red-600 px-4 py-2 font-bungee text-sm text-yellow-300 shadow-[0_0_30px_#ff0000] sm:text-lg"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", delay: 0.2 }}
      >
        🚨 OFFICIAL ELIAS WEBSITE 🚨
      </motion.div>

      <div className="relative z-10 flex w-full max-w-6xl flex-col items-center">
        <motion.h1
          className="text-stroke font-anton text-[26vw] uppercase leading-[0.8] tracking-tight text-acid sm:text-[20vw] lg:text-[13rem]"
          initial={{ scale: 3, opacity: 0, rotate: -10 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 70, damping: 10 }}
        >
          ELIAS
        </motion.h1>

        <motion.button
          type="button"
          onClick={pokeFace}
          aria-label="Click Elias (we dare you)"
          className="relative z-20 -my-3 sm:-my-8"
          initial={{ y: 400, rotate: 25 }}
          animate={{ y: 0, rotate: wobble % 2 ? 6 : -3 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.92 }}
          transition={{ type: "spring", stiffness: 140, damping: 9 }}
        >
          <div className="absolute -inset-4 -z-10 animate-pulse rounded-[2.5rem] bg-gradient-to-tr from-hot via-yellow-300 to-cyber blur-2xl" />
          <img
            src={bestPhoto}
            alt="Elias Sarwana, looking extremely like Elias Sarwana"
            className="object-[50%_35%] h-[42vh] max-h-[480px] w-[70vw] max-w-[380px] rounded-[2rem] border-8 border-white object-cover shadow-2xl"
          />
          <Sfx text="THE MAN!" className="-left-6 top-6 sm:-left-16" color="bg-cyber" rotate={-14} />
          <Sfx text="THE MYTH!" className="-right-4 top-1/3 sm:-right-20" color="bg-yellow-300" rotate={10} />
        </motion.button>

        <motion.h1
          className="font-anton text-[20vw] uppercase leading-[0.8] tracking-tight text-white sm:text-[15vw] lg:text-[10rem]"
          style={{ textShadow: "6px 6px 0 #ff2d95, 12px 12px 0 #00e5ff" }}
          initial={{ x: "-100vw" }}
          animate={{ x: 0 }}
          transition={{ type: "spring", stiffness: 60, delay: 0.4 }}
        >
          SARWANA
        </motion.h1>

        <motion.div
          className="mt-8 space-y-1 text-center font-bungee text-xl sm:text-3xl"
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.35, delayChildren: 0.9 } } }}
        >
          {["THE MAN.", "THE MYTH.", "THE ABSOLUTE MENACE."].map((line, i) => (
            <motion.p
              key={line}
              className={i === 2 ? "rainbow text-2xl sm:text-4xl" : "text-white"}
              variants={{ hidden: { opacity: 0, scale: 4, filter: "blur(10px)" }, show: { opacity: 1, scale: 1, filter: "blur(0px)" } }}
            >
              {line}
            </motion.p>
          ))}
        </motion.div>

        <motion.p
          className="mt-6 text-center font-comic text-lg text-white/90 sm:text-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
        >
          "<FinanceWord>Finance</FinanceWord> student by day.
          <br />
          Absolute nonsense by night."
        </motion.p>
        <motion.a
          href="#origin"
          className="mt-4 rounded-full border-2 border-white/40 bg-[#01411C] px-4 py-1 font-bungee text-sm text-white sm:text-base"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.4 }}
        >
          📍 Born in Karachi, Pakistan 🇵🇰
        </motion.a>

        <motion.div
          className="mt-10 flex flex-wrap justify-center gap-5"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5 }}
        >
          <ChaosButton href="#multiverse" peek={4} className="bg-acid text-black">MEET ELIAS</ChaosButton>
          <ChaosButton href="#roast" peek={5} className="bg-yellow-300 text-black">WHY IS HE LIKE THIS?</ChaosButton>
          <MoreEliasButton />
        </motion.div>
      </div>

      <p className="absolute bottom-3 left-1/2 -translate-x-1/2 font-comic text-xs text-white/50">
        A parody fan page made by friends. Nothing here is a verified fact.
      </p>
    </header>
  );
}
