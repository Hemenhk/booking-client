"use client";
import { Store } from "@/types/types";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Rating } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type Props = {
  topRatedStores: Store[];
};

export default function TheTopRatedStoresMobile({ topRatedStores }: Props) {
  return (
    <div className="md:hidden mx-auto max-w-xs">
      <Carousel className="w-80 max-w-xs">
        <CarouselContent>
          {topRatedStores?.map((store, index) => (
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
        <CarouselNext className="size-16 shadow-xl absolute top-32" />
      </Carousel>
    </div>
  );
}
