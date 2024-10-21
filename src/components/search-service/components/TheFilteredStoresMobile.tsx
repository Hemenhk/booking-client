
import { Store } from "@/types/types";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Rating } from "@mui/material";
import { MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Props = {
    filteredStores: Store[]
}

export default function TheFilteredStoresMobile( {filteredStores} : Props) {
    const maxWordsToShow = 15;
  return (
    <div className="grid grid-cols-1 gap-10 md:hidden">
    {filteredStores?.map((store) => {
      const description = store.description || ""; // Ensure description is defined
      const wordsArray = description.split(" "); // Now we can safely split
      const isLongDescription = wordsArray.length > maxWordsToShow;

      const collapsedText = isLongDescription
        ? wordsArray.slice(0, maxWordsToShow).join(" ") + "..."
        : description; // Use the safe description
      return (
        <Link href={`/store/${store.handle}`} key={store._id} className="border-b pb-10">
          <Card className="px-0 border-none border-b shadow-none">
            <div className="h-64 w-full rounded-lg relative overflow-hidden">
              <Image
                src={store?.collageImages[0]}
                alt="store image"
                layout="fill"
                objectFit="cover"
                priority={true}
              />
            </div>
            <CardHeader className="px-0">
              <CardTitle>{store?.name}</CardTitle>
              <div className="flex flex-row gap-3">
                <div className="flex flex-col gap-2">
                  <p className="flex flex-row items-center gap-1 text-gray-500 text-sm">
                    <MapPin size={15} /> {store?.address}
                  </p>
                  <div className="flex flex-row items-center gap-1 text-sm">
                    <span className="font-semibold">
                      {store?.averageRating.toFixed(1)}
                    </span>
                    <Rating
                      name="read-only"
                      max={1}
                      value={store?.averageRating}
                      readOnly
                      style={{ color: "goldenrod" }}
                    />
                    <span className="text-gray-500">
                      ({store?.totalReviews}) recensioner
                    </span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="tracking-tight text-sm px-0 text-gray-600">
              {isLongDescription && <p>{collapsedText}</p>}
            </CardContent>
          </Card>
        </Link>
      );
    })}
  </div>
  )
}
