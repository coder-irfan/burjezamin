import { useTranslation } from "react-i18next";
import { NavLink, useParams } from "react-router-dom";
import {
  LucideCheckCircle2,
  LucideArrowRight,
  LucideAward,
} from "lucide-react";

function AboutDetails({ getDirection }) {
  const { t } = useTranslation();
  const isRTL = getDirection() === "rtl";
  const { lang = "en" } = useParams();

  return (
    <section
      dir={getDirection()}
      className="py-14 md:py-20 xl:py-28 px-2 md:px-6 lg:px-16"
    >
      <div
        className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-10 bg-colors-secondBg p-6 md:p-10 lg:p-10 xl:p-8
          rounded-2xl relative"
      >
        {/* Left Column: Visual Stack with Floating Badge */}
        <div className="relative">
          {/* Main Visual Image */}
          <div className="">
            <img
              src="/images/download (5)-optimized.webp" // Place your new image here
              alt="About Us Feature"
              loading="lazy"
              decoding="async"
              className="rounded-lg w-[500px] sm:h-96 xl:h-auto lg:w-auto object-cover"
            />
          </div>

          {/* Floating Experience / Stats Badge */}
          <div
            className="absolute z-20 bottom-3 lg:bottom-6 start-3 sm:-start-6 
            bg-white p-3 sm:p-6 rounded-md lg:rounded-lg shadow-xl flex items-center gap-4 max-w-[240px]"
          >
            <div className="p-3 bg-colors-blueColorDark/10 text-colors-blueColorDark rounded-xl">
              <LucideAward className="w-5 h-5 lg:w-8 lg:h-8" />
            </div>
            <div>
              <h3 className="block text-h3 font-extrabold text-colors-textDarkGray">
                10+
              </h3>
              <span className="text-xs sm:text-sm font-medium text-gray-500">
                {t("yearsExperience")}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Detailed Text Content */}
        <div
          className={`max-w-[500px] md:max-w-[350px] lg:max-w-[400px] xl:max-w-2xl mx-auto space-y-4 lg:space-y-6 text-center ${isRTL ? "md:text-right" : "md:text-left"}`}
        >
          {/* Tag & Subtitle */}
          <div
            className={`inline-block tracking-wider ${isRTL ? "border-r-4" : "border-l-4"} border-colors-blueColorDarkesh`}
          >
            <p className="mx-4 font-medium md:text-lg lg:text-xl">
              {t("aboutDetailTag")}
            </p>
          </div>

          {/* Description */}
          <p
            className={`text-colors-textDarkGray text-center md:text-justify text-description ${isRTL ? "md:pr-0" : "md:pr-10"}`}
          >
            {t("aboutDetailDescription")}
          </p>

          {/* Key Value Points / Features List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              t("aboutFeature1"),
              t("aboutFeature2"),
              t("aboutFeature3"),
              t("aboutFeature4"),
            ].map((feature, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 bg-colors-blueColorLightesh/10 p-3.5 rounded-md lg:rounded-lg"
              >
                <LucideCheckCircle2 className="w-5 h-5 text-colors-blueColorDark shrink-0" />
                <span className="text-sm lg:text-md font-semibold text-colors-textDarkGray">
                  {feature}
                </span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="pt-2 flex flex-wrap items-center justify-center xl:justify-start">
            <NavLink to={`/${lang}/projects`} className="button">
              <span>{t("projectsCompleted")}</span>
              <LucideArrowRight
                className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`}
              />
            </NavLink>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutDetails;
