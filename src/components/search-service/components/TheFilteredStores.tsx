"use client";

import { Store } from "@/types/types";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Rating } from "@mui/material";
import { MapPin } from "lucide-react";
import Image from "next/image";

type Props = {
  filteredStores: Store[];
};

export default function TheFilteredStores({ filteredStores }: Props) {
  const maxWordsToShow = 30;

  return (
    <div className="h-[80vh] w-full  overflow-y-auto p-4">
      {filteredStores.length === 0 ? (
        <p>No stores found matching your search criteria.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredStores.map((store) => {
            const description = store.description || ""; // Ensure description is defined
            const wordsArray = description.split(" "); // Now we can safely split
            const isLongDescription = wordsArray.length > maxWordsToShow;

            const collapsedText = isLongDescription
              ? wordsArray.slice(0, maxWordsToShow).join(" ") + "..."
              : description; // Use the safe description

            return (
              <Card
                key={store._id}
                className="flex flex-row bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition"
              >
                <div className="size-64 rounded-lg relative overflow-hidden">
                  <Image
                    src={store.collageImages[0]}
                    alt="store image"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="w-2/4">
                  <CardHeader>
                    <CardTitle>{store.name}</CardTitle>
                    <div className="flex flex-row gap-3">
                      <div className="flex flex-col gap-2">
                        <p className="flex flex-row items-center gap-1 text-gray-500 text-sm">
                          <MapPin size={15} /> {store.address}
                        </p>
                        <div className="flex flex-row items-center gap-1 text-sm">
                          <span className="font-semibold">
                            {store.averageRating.toFixed(1)}
                          </span>
                          <Rating
                            name="read-only"
                            max={1}
                            value={store.averageRating.toFixed(1)}
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
                  <CardContent className="tracking-tight text-sm text-gray-600">
                    {isLongDescription && <p>{collapsedText}</p>}
                  </CardContent>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
