"use client";

import { getSingleStoreDetail } from "@/axios/stores";
import { Rating } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export default function TheStoreDetail({ storeName }: { storeName: string }) {
  const router = useRouter();

  const {
    data: storeData,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["stores"],
    queryFn: () => getSingleStoreDetail(storeName),
  });

  if (isError) {
    return <div>Ett fel uppstod!</div>;
  }

  if (isLoading) {
    return <div>Laddar data</div>;
  }

  const handleRedirect = (storeName: string, userId: string) => {
    router.push(`/store/${storeName}/${userId}`);
  };

  console.log("single store", storeData);
  return (
    <div className="flex h-full p-10 px-48">
      <div className="flex flex-col w-2/3 h-screen">
        <div className="border-b w-3/4 pb-8">
          <h2 className="text-4xl pb-5 font-semibold">{storeData?.name}</h2>
          <div className="flex flex-col">
            <div className="flex flex-row gap-2 items-center">
              <h3 className="font-medium text-gray-700">
                {storeData?.averageRating}
              </h3>
              <Rating
                name="read-only"
                precision={0.5}
                size="medium"
                value={storeData?.averageRating}
                readOnly
                style={{ color: "black" }}
              />
              <p className="text-gray-500 font-light">
                ({storeData?.totalReviews} betyg)
              </p>
            </div>
            <div className="flex flex-row items-center gap-1 font-light text-gray-600 pt-1">
              <HiOutlineLocationMarker />
              <p>{storeData?.address}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col pt-14">
          <h3 className="text-3xl font-medium pb-5">Personal</h3>
          <ul>
            {storeData?.sub_users.map((user) => {
              return (
                <li
                  key={user._id}
                  className="flex flex-row items-center justify-between border-b py-6 w-3/4"
                >
                  <div className="flex flex-row items-center gap-3">
                    <div className="size-12 rounded-full flex justify-center items-center text-lg font-light bg-black text-white">
                      {user.name.charAt(0)}
                    </div>
                    <div className="flex flex-col">
                      <h3 className="font-medium text-lg">{user.name}</h3>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>
                  <Button
                    className="text-base font-light"
                    onClick={() => handleRedirect(storeName, user._id)}
                  >
                    Välj
                  </Button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="w-1/3 h-screen bg-red-100"></div>
    </div>
  );
}
