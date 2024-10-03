"use client";
import { Store } from "@/types/types";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Rating } from "@mui/material";
import { MapPin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";

type Props = {
  filteredStores: Store[];
  addressQuery: string;
};

export default function TheTopRatedStores({
  filteredStores,
  addressQuery,
}: Props) {
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
  if (!addressQuery) {
    return <div>Ingen adress valdes</div>;
  }
  const topRatedStores = filteredStores
    .sort((a, b) => b.averageRating - a.averageRating) // Sort in descending order
    .slice(0, 4); // Get the top 4

  return (
    <div className="border-b pb-10">
      <h2 className="text-2xl font-semibold text-gray-700 pb-10">
        Rekommenderade verksamheter i{" "}
        <span className="capitalize">{addressQuery}</span>
      </h2>
      {/* Render the first 4 stores in the city based on the highest average rating */}
      {topRatedStores.length === 0 ? (
        ""
      ) : (
        <div className="mx-auto max-w-xs">
          <Carousel setApi={setApi} className="w-80 max-w-xs">
            <CarouselContent>
              {topRatedStores.map((store, index) => (
                <Link href={`/store/${store.handle}`} key={store._id}>
                  <CarouselItem>
                    <Card className="bg-white border-none shadow-none rounded-lg">
                      <CardContent className="flex flex-col p-0">
                        <div className="h-48 w-72 relative rounded-lg overflow-hidden">
                          {" "}
                          <Image
                            src={store.collageImages[0]}
                            alt="store image"
                            layout="fill"
                            objectFit="cover"
                          />
                        </div>
                        <CardHeader className="space-y-0.5 px-0 pt-2">
                          <CardTitle className="text-lg font-medium">
                            {store.name}
                          </CardTitle>
                          <div className="flex flex-row gap-3 p-0">
                            <div className="flex flex-col gap-2 text-xs">
                              <p className="flex flex-row items-center gap-1 text-gray-500">
                                {store.address}
                              </p>
                              <div className="flex flex-row items-center gap-1 text-sm">
                                <span className="font-semibold">
                                  {store.averageRating.toFixed(1)}
                                </span>
                                <Rating
                                  name="read-only"
                                  max={1}
                                  value={store.averageRating}
                                  readOnly
                                  sx={{
                                    fontSize: "1rem",
                                  }}
                                  style={{ color: "goldenrod" }}
                                />
                              </div>
                            </div>
                          </div>
                        </CardHeader>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                </Link>
              ))}
            </CarouselContent>
            <CarouselPrevious className="size-16 border-none shadow-lg absolute top-32 right-14" />
            <CarouselNext className="size-16 border-none shadow-lg absolute top-32" />
          </Carousel>
        </div>
      )}
      {/* {topRatedStores.length === 0 ? (
        <p>No stores found matching your search criteria.</p>
      ) : (
        <div className="flex flex-row gap-4 mb-4">
          {topRatedStores.map((store) => (
            <Link href={`/store/${store.handle}`} key={store._id}>
              <Card className="flex flex-col bg-white border-none shadow-none rounded-lg hover:brightness-95 transition ease-out duration-300 cursor-pointer">
                <div className="h-40 w-72 relative rounded-lg overflow-hidden">
                  <Image
                    src={store.collageImages[0]}
                    alt="store image"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <CardHeader className="space-y-0.5 p-2">
                  <CardTitle className="text-lg font-medium">
                    {store.name}
                  </CardTitle>
                  <div className="flex flex-row gap-3">
                    <div className="flex flex-col gap-2 text-xs">
                      <p className="flex flex-row items-center gap-1 text-gray-500">
                        <MapPin size={12} /> {store.address}
                      </p>
                      <div className="flex flex-row items-center gap-1 text-sm">
                        <span className="font-semibold">
                          {store.averageRating.toFixed(1)}
                        </span>
                        <Rating
                          name="read-only"
                          max={1}
                          value={store.averageRating}
                          readOnly
                          sx={{
                            fontSize: "1rem",
                          }}
                          style={{ color: "goldenrod" }}
                        />
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="tracking-tight text-sm text-gray-600"></CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )} */}
    </div>
  );
}
