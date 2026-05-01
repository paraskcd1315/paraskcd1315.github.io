import { useCallback, useEffect, useState } from "react";
import styles from "./App.module.scss";
import PORTFOLIO_CONTENT from "../content";
import { Chrome, SideProgress } from "../shared/components";
import {
  About,
  Contact,
  Hero,
  Intro,
  Photo,
  Projects,
  Skills,
  Watch,
} from "../modules";

const KONAMI_FLASH_DURATION_MS = 1600;

export default function App() {
  const [konami, setKonami] = useState(false);
  const [introDone, setIntroDone] = useState(false);
  const [heroRevealing, setHeroRevealing] = useState(false);
  const { branding } = PORTFOLIO_CONTENT;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const onKonami = useCallback(() => {
    setKonami(true);
    setTimeout(() => setKonami(false), KONAMI_FLASH_DURATION_MS);
  }, []);

  const onIntroReveal = useCallback(() => setHeroRevealing(true), []);
  const onIntroDone = useCallback(() => setIntroDone(true), []);

  return (
    <>
      {!introDone && <Intro onReveal={onIntroReveal} onDone={onIntroDone} />}
      <Chrome onKonami={onKonami} />
      <SideProgress />
      <Hero startReveal={heroRevealing} />
      <About />
      <Skills />
      <Projects />
      <Photo />
      <Watch />
      <Contact />
      {konami && (
        <div className={styles.konamiFlash}>{branding.konamiFlashText}</div>
      )}
    </>
  );
}
