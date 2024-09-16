"use client";

import { useState } from "react";
import Image from "next/image";

const SliderHero = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const charactersGifs = [
    { src: "/assets/slider/chunli.webp", alt: "Chun-li" },
    { src: "/assets/slider/guile.webp", alt: "Guile" },
    { src: "/assets/slider/ken.webp", alt: "Ken" },
    { src: "/assets/slider/marisa.webp", alt: "Marisa" },
    { src: "/assets/slider/akuma.webp", alt: "Akuma" },
    { src: "/assets/slider/blanka.webp", alt: "Blanka" },
    { src: "/assets/slider/juri.webp", alt: "Juri" },
    { src: "/assets/slider/zangief.webp", alt: "Zangief" },
    { src: "/assets/slider/kimberly.webp", alt: "Kimberly" },
    { src: "/assets/slider/aki.webp", alt: "A.K.I" },
    { src: "/assets/slider/ryu.webp", alt: "Ryu" },
  ];

  return (
    <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)] mb-4">
      <ul className="flex items-center justify-center md:justify-start [&_li]:mx-4 [&_img]:max-w-none animate-infinite-scroll h-[250px] cursor-flame">
        {charactersGifs.map((logo, index) => (
          <li
            key={index}
            className={`overflow-hidden w-[150px] h-[200px] aspect-card rounded-[32px] transition duration-300 ease-in-out hover:scale-110 hover:-rotate-6 ${hoveredIndex !== null && hoveredIndex !== index ? 'grayscale' : ''}`}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <Image
              className="object-cover w-full h-full"
              src={logo.src}
              alt={logo.alt}
              width={150}
              height={200}
              unoptimized
            />
          </li>
        ))}
      </ul>
      <ul
        className="flex items-center justify-center md:justify-start [&_li]:mx-4 [&_img]:max-w-none animate-infinite-scroll h-[250px] cursor-flame"
        aria-hidden="true"
      >
        {charactersGifs.map((logo, index) => (
          <li
            key={index}
            className={`overflow-hidden w-[150px] h-[200px] aspect-card rounded-[32px] transition duration-300 ease-in-out hover:scale-110 hover:-rotate-6 ${hoveredIndex !== null && hoveredIndex !== index ? 'grayscale' : ''}`}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <Image
              className="object-cover w-full h-full"
              src={logo.src}
              alt={logo.alt}
              width={150}
              height={200}
              unoptimized
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SliderHero;