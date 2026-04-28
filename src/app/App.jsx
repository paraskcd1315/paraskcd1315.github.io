import { useCallback, useEffect, useState } from "react";
import "./App.css";
import Chrome from "../components/Chrome";
import SideProgress from "../components/SideProgress";
import Hero from "../components/Hero";
import About from "../components/About";
import Now from "../components/Now";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Photo from "../components/Photo";
import Watch from "../components/Watch";
import Contact from "../components/Contact";

export default function App() {
  const [konami, setKonami] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const onKonami = useCallback(() => {
    setKonami(true);
    setTimeout(() => setKonami(false), 1600);
  }, []);

  return (
    <>
      <Chrome onKonami={onKonami} />
      <SideProgress />
      <Hero />
      <About />
      <Now />
      <Skills />
      <Projects />
      <Photo />
      <Watch />
      <Contact />
      {konami && <div className="konami-flash">↑↑↓↓←→←→BA</div>}
    </>
  );
}
