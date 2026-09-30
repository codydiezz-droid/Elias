import { motion } from "framer-motion";
import familyPhoto from "../assets/family/family.webp";
import { photo } from "../photos";

// The one section on the site with no jokes at anyone's expense.
export default function Origin() {
  return (
    <section id="origin" className="relative overflow-hidden bg-[#01411C] px-4 py-24 text-white">
      {/* Pakistan flag motif */}
      <div className="absolute inset-y-0 left-0 w-[12%] bg-white" aria-hidden="true" />
      <svg className="pointer-events-none absolute -right-24 top-10 h-[420px] w-[420px] opacity-15" viewBox="0 0 100 100" aria-hidden="true">
        <circle cx="50" cy="50" r="40" fill="#fff" />
        <circle cx="59" cy="41" r="36" fill="#01411C" />
        <polygon fill="#fff" points="78.5,19.5 74.9,27.3 80.8,33.5 72.3,32.3 68.3,39.9 66.8,31.4 58.3,29.9 65.9,25.9 64.7,17.4 70.9,23.3" />
      </svg>

      <div className="relative mx-auto max-w-6xl pl-[10%]">
        <p className="font-pixel text-[10px] tracking-widest text-acid sm:text-xs">CHAPTER 0 · THE ORIGIN STORY</p>
        <motion.h2
          className="mt-3 font-anton text-5xl uppercase leading-none sm:text-7xl md:text-8xl"
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 90 }}
        >
          Where it all began
        </motion.h2>
        <p className="mt-4 font-bungee text-xl sm:text-3xl">📍 KARACHI, PAKISTAN 🇵🇰</p>

        <div className="mt-12 grid items-center gap-10 md:grid-cols-[1.4fr_1fr]">
          <motion.figure
            className="relative -rotate-1 border-[12px] border-gold bg-black p-2 shadow-[0_30px_80px_rgba(0,0,0,.5)]"
            initial={{ opacity: 0, y: 60, rotate: -6 }}
            whileInView={{ opacity: 1, y: 0, rotate: -1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1 }}
          >
            <img src={familyPhoto} alt="Elias's parents" className="w-full object-cover" />
            <figcaption className="mt-2 text-center font-lux text-sm uppercase tracking-[.3em] text-gold">
              The original executive board
            </figcaption>
          </motion.figure>

          <div>
            <p className="font-lux text-2xl italic leading-relaxed sm:text-3xl">
              Every final boss has an origin story.
            </p>
            <p className="mt-4 font-sans text-lg leading-relaxed text-white/85">
              Elias's starts in Karachi, with the two people who have known him the longest, put up with him the most, and
              are the real reason he turned out this good.
            </p>

            <div className="mt-8 flex items-center gap-4">
              <motion.img
                src={photo(1)}
                alt="Early-game Elias"
                className="h-28 w-20 rounded-lg border-4 border-white object-cover shadow-lg"
                whileHover={{ scale: 1.3, rotate: -6 }}
              />
              <p className="font-comic text-base text-white/85">
                ← Early-game Elias.
                <br />
                Already locked in.
              </p>
            </div>

            <p className="mt-8 inline-block rounded-full border-2 border-acid px-4 py-2 font-bungee text-sm text-acid">
              🫡 Respect zone: no roasts allowed in this section
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
