import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useChaos } from "../chaos";
import { cutout, photo, randomPhoto } from "../photos";
import { SFX } from "../content";

// A button where an Elias peeks out from behind it on hover.
export function ChaosButton({ children, className = "", peek = 0, onClick, onMouseMove, onMouseEnter, onMouseLeave, href }) {
  const [hover, setHover] = useState(false);
  const Tag = href ? motion.a : motion.button;
  return (
    <Tag
      href={href}
      onClick={onClick}
      onMouseMove={onMouseMove}
      onMouseEnter={(e) => { setHover(true); onMouseEnter?.(e); }}
      onMouseLeave={(e) => { setHover(false); onMouseLeave?.(e); }}
      whileHover={{ scale: 1.08, rotate: -2 }}
      whileTap={{ scale: 0.9, rotate: 4 }}
      className={`relative inline-block rounded-full border-4 border-black px-6 py-3 font-bungee text-base shadow-[5px_5px_0_#000] sm:text-lg ${className}`}
    >
      <AnimatePresence>
        {hover && (
          <motion.img
            src={cutout(peek)}
            alt=""
            className="pointer-events-none absolute -top-14 left-1/2 -z-10 h-16 w-16 -translate-x-1/2 rounded-full object-cover"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1, rotate: [0, -10, 10, 0] }}
            exit={{ y: 40, opacity: 0 }}
          />
        )}
      </AnimatePresence>
      {children}
    </Tag>
  );
}

// Hover the word AREPA: hearts appear.
export function ArepaWord({ children = "AREPA", className = "" }) {
  const [hearts, setHearts] = useState([]);
  const burst = () => {
    const batch = Array.from({ length: 8 }, (_, i) => ({ id: Date.now() + i, x: (Math.random() - 0.5) * 160, r: (Math.random() - 0.5) * 60 }));
    setHearts((h) => [...h, ...batch]);
    setTimeout(() => setHearts((h) => h.filter((x) => !batch.includes(x))), 1400);
  };
  return (
    <span className={`relative inline-block ${className}`} onMouseEnter={burst} onClick={burst}>
      {children}
      {hearts.map((h) => (
        <motion.span
          key={h.id}
          className="pointer-events-none absolute left-1/2 top-0 text-2xl"
          initial={{ x: 0, y: 0, opacity: 1, scale: 0.5 }}
          animate={{ x: h.x, y: -120, opacity: 0, scale: 1.4, rotate: h.r }}
          transition={{ duration: 1.3 }}
        >
          ❤️
        </motion.span>
      ))}
    </span>
  );
}

// Click BREAKFAST: Birnah flies across the screen.
export function BreakfastWord({ children = "BREAKFAST", className = "" }) {
  const { flyBirnah } = useChaos();
  return (
    <button type="button" onClick={flyBirnah} className={`underline decoration-wavy decoration-acid underline-offset-4 ${className}`}>
      {children}
    </button>
  );
}

// Click "Finance" five times: portfolio advice.
export function FinanceWord({ children = "Finance", className = "" }) {
  const { finance } = useChaos();
  return (
    <button type="button" onClick={finance} className={`underline decoration-dotted decoration-gold underline-offset-4 ${className}`}>
      {children}
    </button>
  );
}

// Comic-book sound-effect sticker.
export function Sfx({ text, className = "", color = "bg-yellow-300", rotate = -12 }) {
  const word = text ?? SFX[Math.floor(Math.random() * SFX.length)];
  return (
    <motion.div
      className={`pointer-events-none absolute z-20 select-none rounded-[40%] border-4 border-black px-3 py-1 font-bungee text-xl text-black shadow-[4px_4px_0_#000] sm:text-3xl ${color} ${className}`}
      initial={{ scale: 0, rotate: 0 }}
      whileInView={{ scale: [0, 1.4, 1], rotate }}
      viewport={{ once: false, amount: 0.8 }}
      transition={{ duration: 0.5 }}
    >
      {word}
    </motion.div>
  );
}

export function ParodyTag({ children = "PARODY / INSIDE JOKES", className = "" }) {
  return (
    <span className={`inline-block rotate-[-2deg] border-2 border-dashed border-current px-2 py-0.5 font-comic text-xs uppercase tracking-widest sm:text-sm ${className}`}>
      {children}
    </span>
  );
}

export function SectionTitle({ kicker, children, className = "" }) {
  return (
    <div className={`mb-10 text-center ${className}`}>
      {kicker && <p className="mb-3 font-pixel text-[10px] tracking-widest text-acid sm:text-xs">{kicker}</p>}
      <motion.h2
        className="font-anton text-5xl uppercase leading-none sm:text-7xl md:text-8xl"
        initial={{ opacity: 0, y: 80, skewY: 8 }}
        whileInView={{ opacity: 1, y: 0, skewY: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ type: "spring", stiffness: 120, damping: 12 }}
      >
        {children}
      </motion.h2>
    </div>
  );
}

// "Okay, this is definitely enough Elias." ... and then another Elias.
export function EnoughElias({ seed = 0, line = "Okay. That is definitely enough Elias." }) {
  return (
    <div className="relative overflow-hidden bg-white py-16 text-center text-black">
      <motion.p
        className="px-4 font-comic text-2xl sm:text-4xl"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.8 }}
      >
        {line}
      </motion.p>
      <motion.div
        className="mt-6 flex items-center justify-center gap-4"
        initial={{ scale: 0, rotate: -720 }}
        whileInView={{ scale: 1, rotate: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ delay: 1.1, type: "spring", stiffness: 90 }}
      >
        <img src={photo(seed)} alt="Another Elias" className="h-40 w-40 rounded-2xl border-4 border-black object-cover shadow-[8px_8px_0_#ff2d95] sm:h-56 sm:w-56" />
        <span className="font-bungee text-3xl text-hot sm:text-5xl">JK.<br />MORE ELIAS.</span>
      </motion.div>
    </div>
  );
}

// Tiny Elias heads slowly spinning in the corners.
export function SpinningCorners() {
  return (
    <div className="pointer-events-none fixed inset-0 z-40 hidden sm:block" aria-hidden="true">
      <img src={cutout(1)} alt="" className="spin-slow absolute bottom-3 left-3 h-14 w-14 rounded-full object-cover opacity-90 shadow-lg ring-2 ring-acid" />
      <img src={cutout(2)} alt="" className="spin-slow absolute bottom-3 right-3 h-14 w-14 rounded-full object-cover opacity-90 shadow-lg ring-2 ring-hot [animation-direction:reverse]" />
    </div>
  );
}

// Random Elias pop-ups, early-2000s ad style.
const POPUP_LINES = [
  "🎉 CONGRATULATIONS! You are the 1,000,000th Elias viewer!",
  "⚠️ Elias is typing…",
  "📈 Elias would like to discuss your portfolio.",
  "🥣 Have you had your Birnah today?",
  "🏋️ Elias just finished a WOD. He'd like you to know.",
  "💬 bro.",
];
export function RandomPopups() {
  const [pop, setPop] = useState(null);
  useEffect(() => {
    let t;
    const schedule = () => {
      t = setTimeout(() => {
        setPop({
          id: Date.now(),
          src: randomPhoto(),
          line: POPUP_LINES[Math.floor(Math.random() * POPUP_LINES.length)],
          left: Math.random() > 0.5,
        });
        schedule();
      }, 16000 + Math.random() * 14000);
    };
    t = setTimeout(schedule, 6000);
    return () => clearTimeout(t);
  }, []);
  return (
    <AnimatePresence>
      {pop && (
        <motion.div
          key={pop.id}
          className={`fixed bottom-20 z-[80] w-64 border-2 border-gray-400 bg-[#ece9d8] font-sans text-black shadow-2xl ${pop.left ? "left-4" : "right-4"}`}
          initial={{ y: 300, rotate: pop.left ? -20 : 20 }}
          animate={{ y: 0, rotate: 0 }}
          exit={{ scale: 0, rotate: 360, opacity: 0 }}
          transition={{ type: "spring", stiffness: 160, damping: 14 }}
        >
          <div className="flex items-center justify-between bg-gradient-to-r from-blue-800 to-blue-500 px-2 py-1 text-xs font-bold text-white">
            <span>ELIAS_ALERT.exe</span>
            <button type="button" onClick={() => setPop(null)} className="rounded-sm bg-red-600 px-1.5 leading-tight" aria-label="Close">✕</button>
          </div>
          <div className="flex gap-2 p-2">
            <img src={pop.src} alt="Elias" className="h-16 w-16 shrink-0 object-cover" />
            <p className="text-sm font-semibold">{pop.line}</p>
          </div>
          <div className="flex justify-end gap-2 px-2 pb-2">
            <button type="button" onClick={() => setPop(null)} className="border border-gray-500 bg-white px-3 text-xs">OK</button>
            <button type="button" onClick={() => setPop(null)} className="border border-gray-500 bg-white px-3 text-xs">Also OK</button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
