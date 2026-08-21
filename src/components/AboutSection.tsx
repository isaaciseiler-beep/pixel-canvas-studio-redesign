import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import headshotUrl from "@/assets/headshot.jpg";
import { bioLines } from "@/lib/siteContent";

interface AboutSectionProps {
  revealEnabled?: boolean;
}

const AboutSection = ({ revealEnabled = true }: AboutSectionProps) => {
  const reduceMotion = useReducedMotion();

  return (
    <section className="about-compact" aria-labelledby="about-compact-title">
      <div className="about-compact-heading">
        <h2 id="about-compact-title">About</h2>
        <p>Seattle, Washington</p>
      </div>

      <motion.div
        className="about-compact-layout"
        initial={reduceMotion || !revealEnabled ? false : { opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: reduceMotion ? 0 : 0.44, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="about-compact-photo">
          <img src={headshotUrl} alt="Isaac Seiler" loading="lazy" decoding="async" />
        </div>

        <div className="about-compact-copy">
          <p className="about-compact-lede">
            I&apos;m Isaac—a Seattle-based strategist leading marketing and communications at Summation.
          </p>
          <div className="about-compact-bio">
            {bioLines.slice(1).map((line) => <p key={line}>{line}</p>)}
          </div>
          <div className="about-compact-links">
            <Link to="/experience">Experience <ArrowUpRight aria-hidden="true" /></Link>
            <a href="/isaac-seiler-resume.pdf">Résumé <ArrowUpRight aria-hidden="true" /></a>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutSection;
