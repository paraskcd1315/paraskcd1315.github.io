import { useCallback, useEffect, useState } from "react";
import "./App.css";
import Chrome from "../components/Chrome";
import SideProgress from "../components/SideProgress";
import Intro from "../components/Intro";
import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Photo from "../components/Photo";
import Watch from "../components/Watch";
import Contact from "../components/Contact";

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
