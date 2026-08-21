import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { newsItems } from "@/lib/siteContent";

const NewsSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const scroller = scrollRef.current;
    if (!scroller) return;

    const check = () => {
      setCanScrollLeft(scroller.scrollLeft > 2);
      setCanScrollRight(scroller.scrollLeft < scroller.scrollWidth - scroller.clientWidth - 2);
    };

    check();
    scroller.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      scroller.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, []);

  const scroll = (direction: -1 | 1) => {
    const scroller = scrollRef.current;
    if (!scroller) return;
    scroller.scrollBy({ left: direction * scroller.clientWidth * 0.72, behavior: "smooth" });
  };

  return (
    <section className="news-compact" aria-labelledby="news-compact-title">
      <div className="news-compact-heading">
        <h2 id="news-compact-title">News</h2>
        <div className="news-compact-controls">
          <AnimatePresence initial={false}>
            {canScrollLeft ? (
              <motion.button
                key="left"
                type="button"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => scroll(-1)}
                aria-label="Previous news"
              >
                <ChevronLeft aria-hidden="true" />
              </motion.button>
            ) : null}
          </AnimatePresence>
          <AnimatePresence initial={false}>
            {canScrollRight ? (
              <motion.button
                key="right"
                type="button"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => scroll(1)}
                aria-label="Next news"
              >
                <ChevronRight aria-hidden="true" />
              </motion.button>
            ) : null}
          </AnimatePresence>
        </div>
      </div>

      <div ref={scrollRef} className="news-compact-track">
        {newsItems.map((item, index) => (
          <a
            key={item.id}
            href={item.href}
            target={item.href === "#" ? undefined : "_blank"}
            rel={item.href === "#" ? undefined : "noopener noreferrer"}
            className="news-compact-card group"
          >
            {item.imageUrl ? (
              <img
                src={item.imageUrl}
                alt=""
                className="news-compact-image"
                loading={index < 3 ? "eager" : "lazy"}
                decoding="async"
              />
            ) : null}
            <div className="news-compact-scrim" />
            <div className="news-compact-logo-row">
              <img src={item.logoUrl} alt={item.logoAlt} className="news-compact-logo" loading="lazy" />
            </div>
            <div className="news-compact-title-row">
              <h3>{item.title}</h3>
              <ArrowUpRight aria-hidden="true" />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default NewsSection;
