import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PHOTOS, randomPhoto } from "./photos";

const ChaosContext = createContext(null);
export const useChaos = () => useContext(ChaosContext);

let nextId = 0;
const uid = () => ++nextId;

const KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];

export function ChaosProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const [rain, setRain] = useState([]);
  const [birnahs, setBirnahs] = useState([]);
  const [flood, setFlood] = useState(false);
  const financeClicks = useRef(0);

  const toast = useCallback((text, emoji = "🚨") => {
    const id = uid();
    setToasts((t) => [...t, { id, text, emoji }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3500);
  }, []);

  const summon = useCallback((count = 40) => {
    const drops = Array.from({ length: count }, () => ({
      id: uid(),
      src: randomPhoto(),
      x: Math.random() * 100,
      size: 40 + Math.random() * 70,
      delay: Math.random() * 1.8,
      duration: 2.2 + Math.random() * 2.2,
      spin: (Math.random() - 0.5) * 900,
    }));
    setRain((r) => [...r, ...drops]);
    const ids = new Set(drops.map((d) => d.id));
    setTimeout(() => setRain((r) => r.filter((d) => !ids.has(d.id))), 6500);
  }, []);

  const flyBirnah = useCallback(() => {
    const id = uid();
    setBirnahs((b) => [...b, { id, y: 10 + Math.random() * 70, flip: Math.random() > 0.5 }]);
    setTimeout(() => setBirnahs((b) => b.filter((x) => x.id !== id)), 2600);
  }, []);

  const finance = useCallback(() => {
    financeClicks.current += 1;
    if (financeClicks.current % 5 === 0) toast("Please diversify your portfolio.", "📉");
  }, [toast]);

  // Konami code: fill the screen with Elias.
  useEffect(() => {
    let pos = 0;
    const onKey = (e) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      pos = key === KONAMI[pos] ? pos + 1 : key === KONAMI[0] ? 1 : 0;
      if (pos === KONAMI.length) {
        pos = 0;
        setFlood(true);
        toast("CHEAT CODE ACCEPTED: INFINITE ELIAS", "🎮");
        setTimeout(() => setFlood(false), 5000);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toast]);

  // Stay for 60 seconds: achievement.
  useEffect(() => {
    const t = setTimeout(() => toast("ACHIEVEMENT UNLOCKED: TOO MUCH ELIAS", "🏆"), 60000);
    return () => clearTimeout(t);
  }, [toast]);

  return (
    <ChaosContext.Provider value={{ toast, summon, flyBirnah, finance }}>
      {children}

      {/* Toasts */}
      <div className="pointer-events-none fixed inset-x-0 top-4 z-[100] flex flex-col items-center gap-2 px-4">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ y: -80, scale: 0.4, rotate: -8, opacity: 0 }}
              animate={{ y: 0, scale: 1, rotate: [0, 4, -3, 0], opacity: 1 }}
              exit={{ scale: 2, opacity: 0, filter: "blur(8px)" }}
              className="max-w-md rounded-xl border-4 border-black bg-acid px-5 py-3 text-center font-bungee text-lg text-black shadow-[6px_6px_0_#ff2d95] sm:text-xl"
            >
              {t.emoji} {t.text}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Elias rain */}
      <div className="pointer-events-none fixed inset-0 z-[90] overflow-hidden">
        {rain.map((d) => (
          <motion.img
            key={d.id}
            src={d.src}
            alt=""
            className="absolute rounded-full border-2 border-white object-cover shadow-lg"
            style={{ left: `${d.x}%`, width: d.size, height: d.size, top: -120 }}
            initial={{ y: 0, rotate: 0 }}
            animate={{ y: "115vh", rotate: d.spin }}
            transition={{ delay: d.delay, duration: d.duration, ease: "easeIn" }}
          />
        ))}
      </div>

      {/* Flying Birnah */}
      <div className="pointer-events-none fixed inset-0 z-[95] overflow-hidden">
        {birnahs.map((b) => (
          <motion.div
            key={b.id}
            className="absolute whitespace-nowrap font-shade text-5xl text-acid sm:text-7xl"
            style={{ top: `${b.y}%` }}
            initial={{ x: b.flip ? "110vw" : "-60vw", rotate: 0 }}
            animate={{ x: b.flip ? "-60vw" : "110vw", rotate: b.flip ? -720 : 720 }}
            transition={{ duration: 2.4, ease: "easeInOut" }}
          >
            🥣 BIRNAH 🥣
          </motion.div>
        ))}
      </div>

      {/* Konami flood */}
      <AnimatePresence>
        {flood && (
          <motion.div
            className="fixed inset-0 z-[98] grid grid-cols-5 gap-1 bg-black sm:grid-cols-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.4 }}
            onClick={() => setFlood(false)}
          >
            {Array.from({ length: 64 }, (_, i) => (
              <motion.img
                key={i}
                src={PHOTOS[i % PHOTOS.length]}
                alt="Elias"
                className="aspect-square h-full w-full object-cover"
                initial={{ scale: 0, rotate: 180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: i * 0.02, type: "spring" }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </ChaosContext.Provider>
  );
}
