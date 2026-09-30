import { motion } from "framer-motion";
import { MARQUEE } from "../content";
import { photo } from "../photos";
import { ArepaWord, BreakfastWord, FinanceWord, Sfx } from "./bits";

export function BreakingNews() {
  const chunks = MARQUEE.split("🚨").map((s) => s.trim()).filter(Boolean);
  const Run = () => (
    <span className="flex shrink-0 items-center">
      {chunks.map((c, i) => (
        <span key={i} className="flex items-center">
          <span className="px-4">
            {c.includes("AREPAS") ? <ArepaWord>{c}</ArepaWord> : c.includes("BREAKFAST") ? <BreakfastWord className="decoration-black">{c}</BreakfastWord> : c}
          </span>
          🚨
        </span>
      ))}
    </span>
  );
  return (
    <div className="sticky top-0 z-50 flex border-y-4 border-black bg-red-600 font-anton text-lg uppercase tracking-wide text-white sm:text-2xl">
      <span className="z-10 shrink-0 bg-yellow-300 px-3 py-2 text-black shadow-[6px_0_0_#000]">🔴 LIVE</span>
      <div className="flex overflow-hidden py-2">
        <div className="animate-marquee flex whitespace-nowrap">
          <Run />
          <Run />
        </div>
      </div>
    </div>
  );
}

export default function Breakfast() {
  return (
    <section id="breakfast" className="relative overflow-hidden bg-gradient-to-b from-amber-100 to-orange-200 px-4 py-24 text-black">
      <motion.h2
        className="mx-auto max-w-5xl text-center font-lux text-4xl font-black italic leading-tight sm:text-6xl"
        initial={{ opacity: 0, letterSpacing: "0.5em" }}
        whileInView={{ opacity: 1, letterSpacing: "0em" }}
        viewport={{ once: true }}
        transition={{ duration: 1.4 }}
      >
        What does greatness eat for <BreakfastWord>breakfast</BreakfastWord>?
      </motion.h2>

      <div className="mx-auto mt-16 grid max-w-6xl items-center gap-12 md:grid-cols-2">
        <div className="relative text-center">
          <motion.p
            className="font-anton text-[24vw] leading-none text-red-600 md:text-[8rem] lg:text-[10rem]"
            style={{ textShadow: "8px 8px 0 #000" }}
            initial={{ scale: 0, rotate: -40 }}
            whileInView={{ scale: [0, 1.6, 1], rotate: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.9, delay: 0.5 }}
          >
            BIRNAH.
          </motion.p>
          <motion.p
            className="font-comic text-2xl italic"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 2 }}
          >
            Apparently.
          </motion.p>
          <Sfx text="CRUNCH!" className="right-4 top-0" color="bg-lime-300" rotate={14} />

          <blockquote className="mx-auto mt-10 max-w-md font-lux text-xl italic leading-relaxed">
            "Some people start their mornings with eggs.
            <br />
            Some people choose oatmeal.
            <br />
            <span className="font-black not-italic text-red-600">Elias chooses chaos.</span>"
          </blockquote>
        </div>

        <div className="flex flex-col items-center gap-8 sm:flex-row md:flex-col lg:flex-row">
          <motion.figure
            className="relative rotate-2 border-[14px] border-gold bg-black p-2 shadow-[0_20px_60px_rgba(0,0,0,.5)]"
            initial={{ opacity: 0, rotate: 20, y: 60 }}
            whileInView={{ opacity: 1, rotate: 2, y: 0 }}
            viewport={{ once: true }}
          >
            <img src={photo(2)} alt="Elias, looking ridiculously serious about breakfast" className="h-80 w-60 object-cover grayscale contrast-125" />
            <figcaption className="mt-2 text-center font-lux text-xs uppercase tracking-[.3em] text-gold">A serious man. Allegedly.</figcaption>
          </motion.figure>

          <div className="w-64 border-4 border-black bg-white p-2 font-sans text-black shadow-[8px_8px_0_#000]">
            <p className="text-3xl font-black leading-none">Nutrition Facts</p>
            <p className="border-b-8 border-black pb-1 text-sm font-bold">ELIAS BREAKFAST · Serving size: 1 Elias</p>
            {[
              ["Confidence", "400%"],
              ["Protein", "probably"],
              [<FinanceWord key="f">Finance</FinanceWord>, "knowledge: excessive"],
              ["Common sense", "unavailable before 10 AM"],
              ["Birnah", "MAXIMUM"],
            ].map(([k, v], i) => (
              <div key={i} className="flex justify-between gap-2 border-b border-black py-1 text-sm">
                <span className="font-bold">{k}</span>
                <span className="text-right">{v}</span>
              </div>
            ))}
            <p className="pt-1 text-[10px] leading-tight">* Percent Daily Values are based on a 2,000-calorie parody. Not nutritional advice. Not any advice.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
