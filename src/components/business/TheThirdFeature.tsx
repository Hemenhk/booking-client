"use client"
import useInView from "@/hooks/useInView";
import Image from "next/image";
import React, { useRef } from "react";
import featureImage from "../../../public/feature-3.png"

export default function TheThirdFeature() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef);
  return (
    <section
    ref={sectionRef}
    className={`flex flex-row items-center justify-center gap-32 bg-zinc-50 py-32 px-48`}
  >
    <div className="flex flex-col w-1/3">
      <h3
        className={`text-5xl font-extrabold mb-12 text-gray-800 ${
          isInView ? "animate-fade-in-right" : "opacity-0"
        }`}
      >
        2 anställda<span className="text-[#612F4D]"> för</span> priset av 1
      </h3>
      <p
        className={`text-xl ${isInView ? "animate-fade-in-up" : "opacity-0"}`}
      >
        Med vårt bokningssystem låter vi dig börja med{" "} 
        <span className="text-[#612F4D] font-bold">
          två stycken användare
       
        istället för en utan extra kostnad. </span>{" "} Lägg till fler användare vid ett senare skede.
      </p>
    </div>
    <div
      className={`flex items-center justify-center ${
        isInView ? "animate-fade-in" : "opacity-0"
      }`}
    >
      <Image
        src={featureImage}
        alt="third feature"
        className="relative"
        width={400}
        height={400}
      />
    </div>
  </section>
  );
}
