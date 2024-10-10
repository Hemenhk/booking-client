"use client";
import { Store } from "@/types/types";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Rating } from "@mui/material";
import { MapPin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import TheTopRatedStoresMobile from "./TheTopRatedStoresMobile";

type Props = {
  filteredStores: Store[];
  addressQuery: string;
};

export default function TheTopRatedStores({
  filteredStores,
  addressQuery,
}: Props) {
  if (!addressQuery) {
    return <div>Ingen adress valdes</div>;
  }

  const topRatedStores = filteredStores
    .sort((a, b) => b.averageRating - a.averageRating) // Sort in descending order
    .slice(0, 4); // Get the top 4

  return (
    <div className="border-b pb-4 px-0">
      <h2 className="text-3xl tracking-wide font-semibold text-gray-700 pb-10">
        Populära verksamheter i{" "}
        <span className="capitalize">{addressQuery}</span>{" "}
        <span className="tracking-tight">({filteredStores.length})</span>
      </h2>
      {/* Render the first 4 stores in the city based on the highest average rating */}
      {topRatedStores.length === 0 ? (
        ""
      ) : (
        <>
          <TheTopRatedStoresMobile topRatedStores={topRatedStores} />
          <div className="hidden md:flex md:flex-row md:gap-4 md:mb-4">
            {topRatedStores.map((store) => (
              <Link href={`/store/${store.handle}`} key={store._id}>
                <Card className="flex flex-col bg-white border-none shadow-none rounded-lg hover:brightness-95 transition ease-out duration-300 cursor-pointer">
                  {store.collageImages[0] ? (
                    <div className="h-40 w-72 relative rounded-lg overflow-hidden">
                      <Image
                        src={store.collageImages[0]}
                        alt="store image"
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                  ) : (
                    ""
                  )}

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
        </>
      )}
    </div>
  );
}
