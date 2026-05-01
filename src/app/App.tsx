import { useCallback, useEffect, useState } from "react";
import "./App.css";
import Chrome from "../layouts/Chrome";
import SideProgress from "../layouts/SideProgress";
import Intro from "../modules/Intro";
import Hero from "../modules/Hero";
import About from "../modules/About";
import Skills from "../modules/Skills";
import Projects from "../modules/Projects";
import Photo from "../modules/Photo";
import Watch from "../modules/Watch";
import Contact from "../modules/Contact";

export default function App() {
  const [konami, setKonami] = useState(false);
  const [introDone, setIntroDone] = useState(false);
  const [heroRevealing, setHeroRevealing] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const onKonami = useCallback(() => {
    setKonami(true);
    setTimeout(() => setKonami(false), 1600);
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
      {konami && <div className="konami-flash">↑↑↓↓←→←→BA</div>}
    </>
  );
}
