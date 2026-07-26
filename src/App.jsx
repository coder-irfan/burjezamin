import { useEffect, Suspense, lazy } from "react";
import { useTranslation } from "react-i18next";
import { Routes, Route, Navigate, useParams } from "react-router-dom";

// Above-the-fold components (Loaded immediately for instant LCP)
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Divider from "./components/Divider";
import WhatsApp from "./components/WhatsApp";

// Critical section below fold (Loaded directly to prevent layout layout jumps)
import Services from "./components/Services";
import CoreValues from "./components/CoreValues";

// Heavy or heavy-asset components lazy-loaded
const Divider2 = lazy(() => import("./components/Divider2"));
const Testimonial = lazy(() => import("./components/Testimonial"));
const FAQ = lazy(() => import("./components/FAQ"));
const Projects = lazy(() => import("./components/Projects"));
const Contact = lazy(() => import("./components/Contact"));
const Location = lazy(() => import("./components/Location"));
const NewsLetter = lazy(() => import("./components/NewsLetter"));
const Footer = lazy(() => import("./components/Footer"));

// Minimal Loader to avoid layout shifts
const SectionLoader = () => (
  <div className="w-full h-32 flex items-center justify-center opacity-30">
    <div className="w-6 h-6 border-2 border-colors-secondTextColor border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const LanguageSync = () => {
  const { lang } = useParams();
  const { i18n } = useTranslation();

  useEffect(() => {
    if (!lang) return;

    const validLangs = ["en", "fa", "ps"];
    const targetLang = validLangs.includes(lang) ? lang : "en";

    if (i18n.language !== targetLang) {
      i18n.changeLanguage(targetLang);
    }

    // Set HTML lang & dir attributes dynamically for SEO & Accessibility
    const isRtl = ["fa", "ps"].includes(targetLang);
    document.documentElement.setAttribute("lang", targetLang);
    document.documentElement.setAttribute("dir", isRtl ? "rtl" : "ltr");
  }, [lang, i18n]);

  return null;
};

const Landing = ({ getDirection }) => (
  <>
    <LanguageSync />

    <Header getDirection={getDirection} />

    {/* Hero Section */}
    <div className="bg-hero-bg bg-cover bg-no-repeat bg-center relative">
      <Hero getDirection={getDirection} />
      <div className="absolute inset-0 bg-colors-textDarkColor/70 lg:bg-colors-textDarkColor/75 pointer-events-none" />
    </div>

    {/* About Section */}
    <About getDirection={getDirection} />

    {/* Divider 1 */}
    <div className="bg-divider-bg bg-cover bg-no-repeat bg-right relative">
      <Divider />
      <div className="absolute inset-0 bg-colors-textDarkColor/70 pointer-events-none" />
    </div>

    {/* Directly Loaded Core Sections */}
    <Services getDirection={getDirection} />
    <CoreValues getDirection={getDirection} />

    {/* Lazy Loaded Lower Sections */}
    <Suspense fallback={<SectionLoader />}>
      <div className="bg-divider2-bg bg-cover bg-no-repeat bg-top relative">
        <Divider2 />
        <div className="absolute inset-0 bg-colors-textDarkColor/70 pointer-events-none" />
      </div>

      <FAQ getDirection={getDirection} />

      <div className="bg-testimonial-bg bg-contain bg-no-repeat bg-center bg-colors-secondBg">
        <Testimonial getDirection={getDirection} />
      </div>

      <Projects getDirection={getDirection} />

      <div className="bg-contact-bg bg-contain bg-no-repeat bg-right-top bg-colors-secondBg">
        <Contact getDirection={getDirection} />
      </div>

      <Location />

      <div className="bg-colors-secondBg">
        <NewsLetter />
      </div>

      <div className="bg-footer-bg bg-contain md:bg-cover bg-no-repeat bg-bottom relative">
        <Footer getDirection={getDirection} />
      </div>
    </Suspense>

    <WhatsApp />
  </>
);

function App() {
  const { i18n } = useTranslation();

  const getDirection = () => {
    const rtlLanguages = ["fa", "ps"];
    return rtlLanguages.includes(i18n.language) ? "rtl" : "ltr";
  };

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/en" replace />} />
      <Route path="/:lang" element={<Landing getDirection={getDirection} />} />
      <Route path="*" element={<Navigate to="/en" replace />} />
    </Routes>
  );
}

export default App;
