import { useEffect, Suspense, lazy } from "react";
import { useTranslation } from "react-i18next";
import { Routes, Route, Navigate, useParams, Outlet } from "react-router-dom";

// Shared Layout
import Layout from "./components/Layout";

// Page Components
import Home from "./pages/Home";

// Lazy-loaded Pages
const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const Projects = lazy(() => import("./pages/Projects"));
const ProjectDetails = lazy(() => import("./pages/ProjectDetails"));
const Contact = lazy(() => import("./pages/Contact"));

// Sync Language and Direction
const LanguageSync = () => {
  const { lang } = useParams();
  const { i18n } = useTranslation();

  useEffect(() => {
    if (!lang) return;

    const validLangs = ["en", "fa"];
    const targetLang = validLangs.includes(lang) ? lang : "en";

    if (i18n.language !== targetLang) {
      i18n.changeLanguage(targetLang);
    }

    const isRtl = ["fa"].includes(targetLang);
    document.documentElement.setAttribute("lang", targetLang);
    document.documentElement.setAttribute("dir", isRtl ? "rtl" : "ltr");
  }, [lang, i18n]);

  return <Outlet />;
};

// ---------------- MAIN APP ROUTER ---------------- //

function App() {
  const { i18n } = useTranslation();

  const getDirection = () => {
    const rtlLanguages = ["fa", "ps"];
    return rtlLanguages.includes(i18n.language) ? "rtl" : "ltr";
  };

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/en" replace />} />

      {/* Language Wrapper Route */}
      <Route path="/:lang" element={<LanguageSync />}>
        {/* Layout Shell Wrapper */}
        <Route element={<Layout getDirection={getDirection} />}>
          <Route index element={<Home getDirection={getDirection} />} />
          <Route
            path="about"
            element={
              <Suspense>
                <About getDirection={getDirection} />
              </Suspense>
            }
          />
          <Route
            path="services"
            element={
              <Suspense>
                <Services getDirection={getDirection} />
              </Suspense>
            }
          />
          <Route
            path="projects"
            element={
              <Suspense>
                <Projects getDirection={getDirection} />
              </Suspense>
            }
          />
          <Route
            path="projects/:slug"
            element={
              <Suspense>
                <ProjectDetails getDirection={getDirection} />
              </Suspense>
            }
          />
          <Route
            path="contact"
            element={
              <Suspense>
                <Contact getDirection={getDirection} />
              </Suspense>
            }
          />
        </Route>
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/en" replace />} />
    </Routes>
  );
}

export default App;
