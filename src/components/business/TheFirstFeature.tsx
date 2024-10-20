"use client";
import Image from "next/image";
import phone from "../../../public/phone-1.png";
import { useRef } from "react";
import useInView from "@/hooks/useInView";

export default function TheFirstFeature() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef);
  return (
    <section
      ref={sectionRef}
      className={`flex flex-row items-center justify-center gap-32 bg-zinc-50 p-32`}
    >
      <div className="flex flex-col w-1/3">
        <h3
          className={`text-5xl font-extrabold mb-12 text-gray-800 ${
            isInView ? "animate-fade-in-right" : "opacity-0"
          }`}
        >
          Håll dig bokad <span className="text-[#612F4D]">utan</span> att jaga
          kunder
        </h3>
        <p
          className={`text-xl ${isInView ? "animate-fade-in-up" : "opacity-0"}`}
        >
          Fyll ditt schema och skapa en lojal kundbas med vårt{" "}
          <span className="text-[#612F4D] font-bold">
            lätta online bokningssystem
          </span>{" "}
          som automatiserar processen åt dig.
        </p>
      </div>
      <div
        className={`flex items-center justify-center ${
          isInView ? "animate-fade-in" : "opacity-0"
        }`}
      >
        <Image
          src={phone}
          alt="phone"
          className="relative"
          width={400}
          height={400}
        />
      </div>
    </section>
  );
}
