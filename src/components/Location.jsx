import { useState } from "react";
import { useTranslation } from "react-i18next";

function Location() {
  const [loaded, setLoaded] = useState(false);
  const { t } = useTranslation();

  return (
    <section
      id="location"
      className="w-full py-12 md:py-14 lg:py-16 scroll-mt-52"
    >
      <div className="relative w-full h-[250px] lg:h-[350px] overflow-hidden rounded-xl shadow-[0_0_0_0.5] shadow-colors-textDarkGray/40">
        {/* Skeleton Layer */}
        {!loaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse flex flex-col items-center justify-center gap-4">
            {/* Spinner */}
            <div className="w-8 h-8 border-4 border-colors-secondTextColor border-t-transparent rounded-full animate-spin"></div>

            {/* Text */}
            <p className="text-sm md:text-base text-colors-textDarkGray/70 font-medium">
              {t("LoadingMap")}
            </p>
          </div>
        )}

        {/* Map */}
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3286.8816203082406!2d69.16641617573714!3d34.53122707298024!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzTCsDMxJzUyLjQiTiA2OcKwMTAnMDguNCJF!5e0!3m2!1sen!2spl!4v1785327942640!5m2!1sen!2spl"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
          className={`w-full h-full border-0 transition-opacity duration-700 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setLoaded(true)}
        />
      </div>
    </section>
  );
}

export default Location;
