import { motion, useScroll, useSpring } from "framer-motion";
import { ChaosProvider } from "./chaos";
import { HAS_REAL_PHOTOS } from "./photos";
import Hero from "./components/Hero";
import Origin from "./components/Origin";
import Breakfast, { BreakingNews } from "./components/Breakfast";
import { ArepaSituation, QuoteMachine, RoastZone } from "./components/Lore";
import { FinalBoss, Footer, History, Multiverse, PhotoWall, SightingMap, Slideshow, Stats } from "./components/Gallery";
import { EnoughElias, RandomPopups, SpinningCorners } from "./components/bits";

function ScrollBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 20 });
  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-[60] h-2 origin-left bg-gradient-to-r from-hot via-yellow-300 to-cyber"
      style={{ scaleX }}
    />
  );
}

export default function App() {
  return (
    <ChaosProvider>
      <ScrollBar />
      {!HAS_REAL_PHOTOS && (
        <div className="bg-black px-4 py-2 text-center font-comic text-xs text-yellow-300">
          🖼️ Cartoon stand-ins shown. Drop real Elias photos into <code>src/assets/elias/</code> and they appear everywhere.
        </div>
      )}
      <Hero />
      <BreakingNews />
      <Origin />
      <Breakfast />
      <QuoteMachine />
      <EnoughElias seed={8} />
      <ArepaSituation />
      <RoastZone />
      <Multiverse />
      <Slideshow />
      <Stats />
      <EnoughElias seed={10} line="Surely we're done with Elias now." />
      <History />
      <SightingMap />
      <PhotoWall />
      <EnoughElias seed={5} line="Final answer: that's enough Elias." />
      <FinalBoss />
      <Footer />
      <SpinningCorners />
      <RandomPopups />
    </ChaosProvider>
  );
}
