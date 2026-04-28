import useReveal from "../../hooks/useReveal";
import "./Now.css";

export default function Now() {
  const ref = useReveal();
  return (
    <section id="now" className="now" data-screen-label="03 Now" ref={ref}>
      <div className="container">
        <div className="now-inner">
          <div className="label reveal">
            <span className="live"></span> Now / 2026
          </div>
          <p className="copy reveal">
            Working as a Software Engineer at <em>Unimedia Technologies</em>,
            building Web and Mobile Applications. Learning a new tool or
            framework with every project.
          </p>
        </div>
      </div>
    </section>
  );
}
