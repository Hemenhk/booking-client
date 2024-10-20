"use client";
import Image from "next/image";
import featureImage from "../../../public/home-screen-feature-2.png";
import { useRef } from "react";
import useInView from "@/hooks/useInView";

export default function TheSecondFeature() {
  const divRef = useRef(null);
  const isInView = useInView(divRef);
  return (
    <div
      ref={divRef}
      className="flex flex-row items-center justify-center gap-32"
    >
      <Image
        src={featureImage}
        alt="feature image"
        width={420}
        height={420}
        className={`${isInView ? "animate-fade-in" : "opacity-0"}`}
      />
      <div className="flex flex-col w-2/5 gap-12">
        <h3
          className={`${
            isInView ? "animate-fade-in-left" : "opacity-0"
          } text-5xl font-extrabold text-[#8175A5]`}
        >
          Boka din nya tid <span className="text-[#8175A5]">enkelt & utan krångel</span>
        </h3>
        <p
          className={`${isInView ? "animate-fade-in-up" : "opacity-0"} text-lg`}
        >
          Med vår enkla och smidiga bokningsprocess kan du snabbt hitta och boka
          tider för dina favoritbehandlingar. Oavsett om du letar efter en{" "}
          <span className="text-[#8175A5] font-semibold">
            klipptid, massage eller skönhetsvård
          </span>
          , gör vi det enkelt för dig att hitta tillgängliga tider och boka på
          bara några klick.{" "}
          <span className="text-[#8175A5] font-semibold">
            Inga fler samtal eller krångel, bara en stressfri upplevelse!
          </span>
        </p>
      </div>
    </div>
  );
}
