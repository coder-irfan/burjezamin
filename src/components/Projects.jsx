import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";

import {
  Calendar,
  Folder,
  ChevronDown,
  ChevronUp,
  Send,
  X,
  LucideChevronsRight,
} from "lucide-react";
import { client, urlFor } from "../sanityClient";

function DoneProjects({ getDirection }) {
  const isRTL = getDirection() === "rtl";
  const { t, i18n } = useTranslation();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);

  // Show 6 projects initially
  const [showAll, setShowAll] = useState(false);

  const currentLang =
    i18n.language && i18n.language.startsWith("fa") ? "fa" : "en";

  useEffect(() => {
    const query = `*[_type == "project"] | order(_createdAt desc) {
      _id,
      _createdAt,
      title,
      description,
      image
    }`;

    client
      .fetch(query)
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Sanity fetch error:", err);
        setLoading(false);
      });
  }, []);

  // Lock background scrolling when modal is open + enable ESC key closing
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setSelectedProject(null);
    };

    if (selectedProject) {
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;

      // Lock both body and html elements to prevent background scrolling on all browsers
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;

      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.body.style.paddingRight = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.body.style.paddingRight = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedProject]);

  // Determine displayed list length (First 6 or All)
  const displayedProjects = showAll ? projects : projects.slice(0, 6);

  return (
    <section
      dir={getDirection()}
      id="projects"
      className="px-6 py-16 md:px-8 lg:px-16 lg:py-24 space-y-12 bg-colors-bg"
    >
      {/* Section Header */}
      <div className="text-center space-y-3 md:space-y-4">
        <div
          className={`inline-block tracking-wider ${
            isRTL ? "border-r-4" : "border-l-4"
          } border-colors-secondTextColor`}
        >
          <p className="mx-4 font-medium md:text-lg lg:text-xl text-colors-textDarkColor">
            {t("projectsSection")}
          </p>
        </div>

        <h2 className="text-h2 font-semibold leading-tight text-colors-textDarkColor">
          {t("projectsTitle")}{" "}
          <span className="text-colors-secondTextColor">
            {t("projectsHighlight")}
          </span>
        </h2>

        <p className="text-sm md:text-base text-colors-textDarkGray max-w-2xl mx-auto">
          {t("projectsDescription")}
        </p>
      </div>

      {/* Projects Grid */}
      {loading ? (
        <div className="text-center py-12 text-colors-textDarkGray font-medium">
          {t("loadingProjects")}
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-12 text-colors-textDarkGray font-medium">
          {t("noProjectsFound")}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {displayedProjects.map((project, index) => {
              const projectTitle =
                project.title?.[currentLang] || project.title?.en || "";
              const projectDesc =
                project.description?.[currentLang] ||
                project.description?.en ||
                "";
              const imageUrl = project.image
                ? urlFor(project.image)
                    .width(1200)
                    .quality(80)
                    .auto("format")
                    .url()
                : "";

              return (
                <div
                  key={project._id}
                  onClick={() => setSelectedProject(project)}
                  className="group cursor-pointer border border-colors-textDarkGray/20 rounded-xl overflow-hidden bg-colors-bg shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  <div className="relative overflow-hidden">
                    {imageUrl && (
                      <img
                        src={imageUrl}
                        alt={projectTitle}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-64 lg:h-72 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    )}

                    <span className="absolute top-3 left-3 bg-colors-textDarkGray/80 text-colors-textLightColor text-xs px-3 py-1 rounded-full">
                      {t("projectCount")} {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="p-6 space-y-3">
                    <h3 className="text-lg md:text-xl font-semibold text-colors-textDarkColor group-hover:text-colors-blueColorDark transition-colors">
                      {projectTitle}
                    </h3>

                    <p className="text-sm text-colors-textDarkGray line-clamp-3 leading-relaxed">
                      {projectDesc}
                    </p>

                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xs lg:text-sm text-colors-textDarkGray/80">
                        {t("completedProject")}
                      </span>

                      <button className="text-sm font-semibold text-colors-secondTextColor group-hover:translate-x-1 transition-transform flex items-center gap-1">
                        {t("seeDetails")} <LucideChevronsRight />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* See More / See Less Button Logic */}
          {projects.length > 6 && (
            <div className="flex justify-center pt-6">
              <button onClick={() => setShowAll(!showAll)} className="button">
                <span>{showAll ? t("showLess") : t("showMore")}</span>
                {showAll ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </button>
            </div>
          )}
        </>
      )}

      {/* Step 2 Modal Integration below */}
      <ProjectModal
        selectedProject={selectedProject}
        setSelectedProject={setSelectedProject}
        currentLang={currentLang}
        getDirection={getDirection}
        t={t}
      />
    </section>
  );
}

export default DoneProjects;

function ProjectModal({
  selectedProject,
  setSelectedProject,
  currentLang,
  getDirection,
  t,
}) {
  return (
    <AnimatePresence>
      {selectedProject && (
        <div
          className="fixed inset-0 -top-12 md:-top-16 z-[100] flex items-center justify-center p-4 sm:p-6 py-8 sm:py-12 overflow-hidden"
          dir={getDirection()}
        >
          {/* Animated Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-colors-secondBg/20 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          />

          {/* Modal Container - Added `my-auto`, `max-h-[80vh]`, and balanced inner spacing */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative w-full max-w-3xl max-h-[90vh] my-auto overflow-y-auto overscroll-contain bg-colors-bg rounded-2xl shadow-2xl z-10
             "
            style={{
              scrollbarWidth: "none",
            }}
          >
            {/* Header / Sticky Close Action */}
            <div className="sticky top-0 right-0 left-0 z-20 flex justify-end p-4 pointer-events-none bg-gradient-to-b from-black/50 via-black/20 to-transparent">
              <button
                onClick={() => setSelectedProject(null)}
                className="pointer-events-auto bg-colors-bg/90 hover:bg-colors-secondBg text-colors-textDarkColor p-2 rounded-full shadow-lg transition-all transform hover:scale-110 active:scale-95"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Image Header - Reduced image height so content fits comfortably */}
            {selectedProject.image && (
              <div className="-mt-20 relative">
                <div className="w-full h-80 lg:h-[350px] bg-colors-secondBg flex items-center justify-center text-center overflow-hidden rounded-t-xl">
                  <img
                    src={urlFor(selectedProject.image)
                      .width(1200)
                      .quality(85)
                      .auto("format")
                      .url()}
                    alt={
                      selectedProject.title?.[currentLang] ||
                      selectedProject.title?.en ||
                      "Project image"
                    }
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>
              </div>
            )}

            {/* Content Body */}
            <div className="p-6 sm:p-8 space-y-6">
              {/* Meta Tags */}
              <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-colors-textDarkGray border-b border-colors-textDarkGray/10 pb-4">
                <div className="flex items-center gap-1.5 bg-colors-secondBg px-3 py-1.5 rounded-lg">
                  <Calendar className="w-4 h-4 text-colors-buttonBg" />
                  <span>
                    {new Date(selectedProject._createdAt).toLocaleDateString(
                      currentLang === "fa" ? "fa-AF" : "en-US",
                      { year: "numeric", month: "long", day: "numeric" },
                    )}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 bg-colors-secondBg px-3 py-1.5 rounded-lg">
                  <Folder className="w-4 h-4 text-colors-buttonBg" />
                  <span>{t("completedProject") || "Completed"}</span>
                </div>
              </div>

              {/* Title */}
              <h3 className="text-2xl sm:text-3xl font-bold text-colors-textDarkColor leading-snug">
                {selectedProject.title?.[currentLang] ||
                  selectedProject.title?.en}
              </h3>

              {/* Description */}
              <p className="text-sm sm:text-base text-colors-textDarkGray leading-relaxed whitespace-pre-line font-normal">
                {selectedProject.description?.[currentLang] ||
                  selectedProject.description?.en}
              </p>

              {/* Modal Footer / Action CTA */}
              <div className="pt-6 border-t border-colors-textDarkGray/15 flex flex-col sm:flex-row items-center justify-between gap-4">
                <a
                  href="#contact"
                  onClick={() => setSelectedProject(null)}
                  className="w-full sm:w-auto"
                >
                  <button className="button">
                    <Send className="w-5 h-5" />
                    <span>{t("contactUs")}</span>
                  </button>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
