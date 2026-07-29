function AnimatedTracks() {
  return (
    <>
      <div dir="ltr" className="relative">
        <img
          src="/images/truck.png"
          alt="truck"
          loading="lazy"
          decoding="async"
          className="absolute bottom-0 w-12 md:w-16 object-contain truck truck-1"
        />
        <img
          src="/images/truck2.png"
          alt="truck"
          loading="lazy"
          decoding="async"
          className="absolute bottom-0 w-12 md:w-16 object-contain truck truck-2"
        />
        <img
          src="/images/truck3.png"
          alt="truck"
          loading="lazy"
          decoding="async"
          className="absolute bottom-0 w-12 md:w-16 object-contain truck truck-3"
        />

        <hr className="border border-colors-textDarkGray/80 mt-6" />
      </div>
    </>
  );
}

export default AnimatedTracks;
