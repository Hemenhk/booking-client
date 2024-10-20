"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

export default function TheCollageImages({
  collageImages,
}: {
  collageImages: string[];
}) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);
  
  const mappedImages = collageImages?.map((image, idx) => (
    <CarouselItem key={idx}>
      <div className="relative w-full h-64 md:h-96">
        {/* Use layout="fill" to ensure the image adjusts to container size */}
        <Image
          src={image}
          alt="collage image"
          layout="fill" // Takes up the parent container's space
          objectFit="cover" // Ensures image covers the container without distortion
          className="rounded-sm md:rounded-md"
        />
      </div>
    </CarouselItem>
  ));

  const circles = Array.from({ length: count }, (_, i) => i + 1);

  return (
    <div className="flex flex-col w-full">
      <Carousel className="w-full xl:w-[700px]" setApi={setApi}>
        <CarouselContent>{mappedImages}</CarouselContent>
        {collageImages.length > 1 ? (
          <div className="hidden md:flex">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        ) : (
          ""
        )}
      </Carousel>
      <div className="flex gap justify-center xl:w-[700px] pt-5 text-center text-sm text-muted-foreground">
        {collageImages.length > 1 &&
          circles.map((circle) => (
            <div
              key={circle}
              className={`size-2 rounded-full mx-1 cursor-pointer ${
                circle === current ? "bg-gray-700" : "bg-gray-300"
              }`}
              onClick={() => api?.scrollTo(circle - 1)}
            />
          ))}
      </div>
    </div>
  );
}
