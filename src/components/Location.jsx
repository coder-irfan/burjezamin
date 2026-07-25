import { useState } from "react";

function Location() {
  const [loaded, setLoaded] = useState(false);

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
              Loading map...
            </p>
          </div>
        )}

        {/* Map */}
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6573.97207402934!2d69.17013029210091!3d34.52858173083567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38d16f001c6461ef%3A0xbd7b68c5760c0250!2zQ2xvY2sgVG93ZXIg2KjYsdisINiz2KfYudiq!5e0!3m2!1spl!2spl!4v1784995955647!5m2!1spl!2spl"
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
