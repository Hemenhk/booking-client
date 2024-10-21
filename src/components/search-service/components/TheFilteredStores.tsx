"use client";

import { Store } from "@/types/types";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Rating } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import TheFilteredStoresMobile from "./TheFilteredStoresMobile";

type Props = {
  filteredStores: Store[];
};

export default function TheFilteredStores({ filteredStores }: Props) {
  const maxWordsToShow = 15;

  console.log("filtered", filteredStores);

  return (
    <div className="h-[80vh] w-full p-4 pt-10">
      {filteredStores.length === 0 ? (
        <p>Det finns inga verksamheter som matchar din sökning.</p>
      ) : (
        <>
          <TheFilteredStoresMobile filteredStores={filteredStores} />
          <div className="hidden md:grid md:grid-cols-1 md:gap-12">
            {filteredStores.map((store) => {
              const description = store.description || ""; // Ensure description is defined
              const wordsArray = description.split(" "); // Now we can safely split
              const isLongDescription = wordsArray.length > maxWordsToShow;

              const collapsedText = isLongDescription
                ? wordsArray.slice(0, maxWordsToShow).join(" ") + "..."
                : description; // Use the safe description

              return (
                <Link
                  href={`/store/${store.handle}`}
                  className="border-b pb-12"
                  key={store._id}
                >
                  <Card
                    key={store._id}
                    className="flex flex-row bg-white border-none shadow-none hover:brightness-95 ease-out duration-300 cursor-pointer transition"
                  >
                    {store?.collageImages[0] ? (
                      <div className="h-64 w-96 rounded-lg relative overflow-hidden">
                        <Image
                          src={store.collageImages[0]}
                          alt="store image"
                          layout="fill"
                          objectFit="cover"
                          priority={true}
                        />
                      </div>
                    ) : (
                      ""
                    )}

                    <div className="w-2/4">
                      <CardHeader>
                        <CardTitle className="text-3xl">{store.name}</CardTitle>
                        <div className="flex flex-row gap-3">
                          <div className="flex flex-col gap-2">
                            <p className="text-gray-500">{store.address}</p>
                            <div className="flex flex-row items-center gap-1 text-base">
                              <span className="font-semibold">
                                {store.averageRating.toFixed(1)}
                              </span>
                              <Rating
                                name="read-only"
                                max={1}
                                value={store.averageRating}
                                readOnly
                                style={{ color: "goldenrod" }}
                              />
                              <span className="text-gray-500">
                                ({store.totalReviews}) recensioner
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="tracking-tight text-gray-600">
                        {isLongDescription && <p>{collapsedText}</p>}
                      </CardContent>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
