
import { Card } from "@/components/ui/card";
import { CardContent, Rating } from "@mui/material";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { StoresResponse } from "@/types/types";

type Props = {
  data: StoresResponse | undefined;
};

export default function TheStoreCards({ data }: Props) {
  const router = useRouter();

  const handleRedirect = (storeHandle: string) => {
    router.push(`/store/${storeHandle}`);
  };

  return (
    <>
      {data?.stores?.map((store) => {
        const firstLetter = store.name.charAt(0);
        const firstLetterCap = firstLetter.toUpperCase();
        const remainingLetters = store.name.slice(1);
        return (
          <Card
            className="border-none shadow-md cursor-pointer"
            onClick={() => handleRedirect(store.handle)}
          >
            <CardContent className="flex flex-row gap-5">
              <div className="h-72 w-96 relative overflow-hidden rounded-lg">
                <Image
                  src={store.logo}
                  alt="store logo"
                  layout="fill" // Make the image fill the div
                  objectFit="cover" // Cover the entire div
                  className="rounded-lg" // Additional safety for rounding corners
                />
              </div>
              <div className="flex flex-col space-y-4">
                <h2 className="text-3xl font-medium tracking-wide">
                  {firstLetterCap + remainingLetters}
                </h2>
                <div className="flex flex-row gap-2">
                  {" "}
                  {store.logo ? (
                    <div className="size-16 relative overflow-hidden rounded-md">
                      <Image
                        src={store.logo}
                        alt="store logo"
                        layout="fill" // Make the image fill the div
                        objectFit="cover" // Cover the entire div
                        className="rounded-lg"
                      />
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="flex flex-col">
                    <div className="flex flex-row gap-1 items-center">
                      <p className="text-gray-500 font-medium">
                        {store.averageRating}
                      </p>
                      <Rating
                        name="read-only"
                        precision={0.5}
                        size="small"
                        value={store.averageRating}
                        readOnly
                        style={{ color: "black" }}
                      />
                      <p className="text-gray-500">({store.totalReviews})</p>
                    </div>
                    <p className="flex flex-row items-center gap-1 text-sm text-gray-600">
                      <HiOutlineLocationMarker />
                      {store.address}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </>
  );
}
