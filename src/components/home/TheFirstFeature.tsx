"use client";
import Image from "next/image";
import featureImage from "../../../public/peep-1.png";
import { useRef } from "react";
import useInView from "@/hooks/useInView";

export default function TheFirstFeature() {
  const divRef = useRef(null);
  const isInView = useInView(divRef);
  return (
    <div
      ref={divRef}
      className="flex flex-row items-center justify-center gap-32"
    >
      <div className="flex flex-col w-1/3 gap-12">
        <h3
          className={`${
            isInView ? "animate-fade-in-right" : "opacity-0"
          } text-5xl font-extrabold text-gray-800`}
        >
          Lätta bokningar{" "}
          <span className="text-cyan-800">utan något krångel</span>
        </h3>
        <p
          className={`${isInView ? "animate-fade-in-up" : "opacity-0"} text-lg`}
        >
          Med vår enkla och smidiga bokningsprocess kan du snabbt hitta och boka
          tider för dina favoritbehandlingar. Oavsett om du letar efter en{" "}
          <span className="text-cyan-800 font-semibold">klipptid, massage eller skönhetsvård</span>
          , gör vi det enkelt för dig att
          hitta tillgängliga tider och boka på bara några klick.{" "}
          <span className="text-cyan-800 font-semibold">
            Inga fler samtal eller krångel, bara en stressfri upplevelse!
          </span>
        </p>
      </div>
      <Image
        src={featureImage}
        alt="feature image"
        width={225}
        height={225}
        className={`${isInView ? "animate-fade-in" : "opacity-0"}`}
      />
    </div>
  );
}
