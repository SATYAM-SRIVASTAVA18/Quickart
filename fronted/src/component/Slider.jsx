import React, { useState, useEffect } from "react";

const slides = [
  {
    id: 1,
    img: "https://images.stockcake.com/public/8/e/8/8e87d3fe-180e-4232-b005-0aad196b2441_large/cricket-action-shot-stockcake.jpg",
  },
  {
    id: 2,
    img: "https://i.ytimg.com/vi/xuas_Yc7VNQ/maxresdefault.jpg",
  },
  {
    id: 3,
    img: "https://t4.ftcdn.net/jpg/10/13/55/19/360_F_1013551992_JVfqERQgQmTCPNDrnGfVzzGleMcrgva4.jpg",
  },
  {
    id: 4,
    img: "https://image.adsoftheworld.com/u272vqmxaqkzxav1al0eaj9zmy2r",
  },
  {
    id: 5,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTg8z57q2nkCoFSkI_Te8afD-X6kc-9oVDPCw&s",
  },
];

function Slider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) =>
        prev === slides.length - 1 ? 0 : prev + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () =>
    setCurrent(current === slides.length - 1 ? 0 : current + 1);

  const prevSlide = () =>
    setCurrent(current === 0 ? slides.length - 1 : current - 1);

  return (
    <div className="relative h-[250px] sm:h-[350px] md:h-[500px] lg:h-[65vh] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border border-gray-800 group">
      
      {/* Images */}
      <div
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${current * 100}%)`,
        }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="w-full h-full shrink-0 relative"
          >
            <img
              src={slide.img}
              alt="slide"
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-gray-950/70 via-transparent to-transparent" />
          </div>
        ))}
      </div>

      {/* Text */}
      <div className="absolute bottom-4 md:bottom-8 left-4 md:left-8 z-10">
        <div className="text-yellow-400 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-1">
          Featured
        </div>

        <div className="text-white font-black text-lg sm:text-xl md:text-2xl">
          Top Sports Gear
        </div>
      </div>

      {/* Prev */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-2 md:left-4 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-gray-950/70 hover:bg-yellow-400 text-white hover:text-gray-950 rounded-xl flex items-center justify-center transition-all opacity-100 md:opacity-0 md:group-hover:opacity-100 font-bold"
      >
        ‹
      </button>

      {/* Next */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-2 md:right-4 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-gray-950/70 hover:bg-yellow-400 text-white hover:text-gray-950 rounded-xl flex items-center justify-center transition-all opacity-100 md:opacity-0 md:group-hover:opacity-100 font-bold"
      >
        ›
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 md:bottom-8 right-4 md:right-8 flex gap-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              current === index
                ? "bg-yellow-400 w-6"
                : "bg-gray-500 w-2"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default Slider;