"use client";

import Image from "next/image";
import featureImage from "../../../public/features-2.png";
import { useRef } from "react";
import useInView from "@/hooks/useInView";

export default function TheSecondFeature() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef);
  return (
    <section
      ref={sectionRef}
      className="flex flex-row items-center justify-center gap-32 bg-zinc-50 py-16 pb-32 px-48"
    >
      <div className="relative">
        <Image
          src={featureImage}
          alt="feature image"
          className={`${isInView ? "animate-fade-in" : "opacity-0"}`}
          width={600}
          height={600}
        />
      </div>
      <div className="flex flex-col w-2/4">
        <h3 className={`text-5xl font-extrabold mb-12 text-gray-800 ${isInView ? "animate-fade-in-left" : "opacity-0"}`}>
          Undvik <span className="text-[#A58F7D]">stressen</span> av att driva
          företag
        </h3>
        <p className={`text-xl ${isInView ? "animate-fade-in-up" : "opacity-0"}`}>
          Med vårt system,{" "}
          <span className="font-bold text-[#A58F7D]">
            räknar vi din inkomst
          </span>{" "}
          baserat på dina bokningar och priser så att du kan luta dig tillbaka
          och njuta av det du brinner för.
        </p>
      </div>
    </section>
  );
}
