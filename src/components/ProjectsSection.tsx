import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { projectItems, type ProjectItem } from "@/lib/siteContent";

type ProjectFilter = "ALL" | Exclude<ProjectItem["source"], "PROJECT">;

const filters: { label: string; value: ProjectFilter }[] = [
  { label: "All", value: "ALL" },
  { label: "Research", value: "RESEARCH" },
  { label: "Work", value: "WORK" },
  { label: "Reporting", value: "REPORTING" },
];

const ProjectsSection = () => {
  const [filter, setFilter] = useState<ProjectFilter>("ALL");

  const projects = useMemo(() => {
    const matches = filter === "ALL"
      ? projectItems
      : projectItems.filter((project) =>
          filter === "WORK"
            ? project.source === "WORK" || project.source === "PROJECT"
            : project.source === filter,
        );
    return matches.slice(0, filter === "ALL" ? 9 : 12);
  }, [filter]);

  return (
    <section className="work-library" aria-labelledby="work-library-title">
      <div className="work-library-header">
        <h1 id="work-library-title">Work</h1>
        <Link to="/projects" className="work-library-all-link">
          View all <ArrowUpRight aria-hidden="true" />
        </Link>
      </div>

      <div className="work-library-tabs" role="tablist" aria-label="Filter work">
        {filters.map((item) => (
          <button
            key={item.value}
            type="button"
            role="tab"
            aria-selected={filter === item.value}
            onClick={() => setFilter(item.value)}
            className={filter === item.value ? "is-active" : ""}
          >
            {item.label}
          </button>
        ))}
      </div>

      <motion.div layout className="work-library-grid">
        <AnimatePresence mode="popLayout" initial={false}>
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.985 }}
              transition={{ duration: 0.28, delay: Math.min(index * 0.025, 0.16) }}
            >
              <Link
                to={`/projects/${project.id}`}
                className="work-library-card group"
                aria-label={`Read more about ${project.title}`}
              >
                <img
                  src={project.image}
                  alt=""
                  loading={index < 3 ? "eager" : "lazy"}
                  decoding="async"
                  fetchpriority={index < 3 ? "high" : "low"}
                />
                <div className="work-library-scrim" />
                <div className="work-library-card-top">
                  <span>{project.source === "PROJECT" ? "WORK" : project.source}</span>
                  <span>{project.year}</span>
                </div>
                <div className="work-library-card-bottom">
                  <h2>{project.title}</h2>
                  <ArrowUpRight aria-hidden="true" />
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default ProjectsSection;
