"use client";

import { useQuery } from "@tanstack/react-query";
import { getAllStores } from "@/axios/stores";

import { Card, CardHeader } from "@/components/ui/card";
import { Rating } from "@mui/material";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { useRouter } from "next/navigation";

export default function TheAllStores() {
  const router = useRouter();
  const {
    data: storeData,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["stores"],
    queryFn: getAllStores,
  });

  if (isError) {
    return <div>Ett fel uppstod!</div>;
  }

  if (isLoading) {
    return <div>Laddar data</div>;
  }

  const handleRedirect = (storeName: string) => {
    router.push(`/store/${storeName}`);
  };

  console.log("stores", storeData?.stores);
  return (
    <ul className="flex flex-col space-y-3">
      {storeData?.stores?.map((store) => {
        const firstLetter = store.name.charAt(0);
        const firstLetterCap = firstLetter.toUpperCase();
        const remainingLetters = store.name.slice(1);
        return (
          <Card
            className="border-none shadow-md cursor-pointer"
            onClick={() => handleRedirect(store.name)}
          >
            <CardHeader>
              <h2 className="font-semibold tracking-wide">
                {firstLetterCap + remainingLetters}
              </h2>
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
              <p className="flex flex-row items-center gap-1 text-sm text-gray-500">
                <HiOutlineLocationMarker />
                {store.address}
              </p>
            </CardHeader>
          </Card>
        );
      })}
    </ul>
  );
}
