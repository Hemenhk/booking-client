"use client";
import Image from "next/image";
import { useRef } from "react";
import useInView from "@/hooks/useInView";
import featureImage from "../../../public/home-screen-feature-1.png"

export default function TheFirstFeature() {
  const divRef = useRef(null);
  const isInView = useInView(divRef);
  return (
    <div
      ref={divRef}
      className="flex flex-row items-center justify-center gap-32"
    >
      <div className="flex flex-col w-2/5 gap-12">
        <h3
          className={`${
            isInView ? "animate-fade-in-right" : "opacity-0"
          } text-5xl font-extrabold text-[#A3A575]`}
        >
          Låt oss sköta <span className="text-[#A3A575]">dina bokningar</span>
        </h3>
        <p
          className={`${isInView ? "animate-fade-in-up" : "opacity-0"} text-lg`}
        >
          Låt oss hantera dina bokningar så att du kan fokusera på att driva din
          verksamhet. Med vår plattform{" "}
          <span className="text-[#A3A575] font-semibold">
            slipper du tidskrävande administration och manuella bokningar
          </span>
          . Vi ser till att dina kunder enkelt hittar tillgängliga tider och
          bokar direkt.{" "}
          <span className="text-[#A3A575] font-semibold">
            Vi tar hand om bokningsprocessen så att du kan fokusera på det du
            gör bäst.
          </span>
        </p>
      </div>
      <Image
        src={featureImage}
        alt="feature image"
        width={420}
        height={420}
        className={`${isInView ? "animate-fade-in" : "opacity-0"}`}
      />
    </div>
  );
}
