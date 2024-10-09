"use client";

import { Rating } from "@mui/material";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { useAdminQuery } from "@/hooks/useAdminQuery";

import TheOpeningHours from "./components/TheOpeningHours";
import { Smartphone } from "lucide-react";
import TheReviews from "./components/TheReviews";
import TheAboutStore from "./components/TheAboutStore";
import TheStoreStaff from "./components/TheStoreStaff";
import TheSocialMedias from "./components/TheSocialMedias";
// import TheStoreDetailMap from "../maps/TheStoreDetailMap";
import Image from "next/image";
import TheCollageImages from "./components/TheCollageImages";
import dynamic from "next/dynamic";
const TheStoreDetailMap = dynamic(() => import("../maps/TheStoreDetailMap"), {
  ssr: false, // Disable server-side rendering
});

export default function TheStoreDetail({
  storeHandle,
}: {
  storeHandle: string;
}) {
  const { storeData, admin, subUsers, isError, isLoading } =
    useAdminQuery(storeHandle);
  if (isError) {
    return <div>Ett fel uppstod!</div>;
  }

  if (isLoading) {
    return <div>Laddar data</div>;
  }

  if (!storeData) {
    return <div>Ingen data</div>;
  }

  console.log("single store", storeData.store);
  return (
    <div className="flex flex-col md:flex-row md:gap-20 xl:gap-0 h-full mb-20 p-2 md:p-10 xl:px-48">
      <div className="flex flex-col gap-12 w-full md:w-2/3">
        <div className="md:hidden">
          <TheCollageImages collageImages={storeData?.store.collageImages} />
        </div>
        <div className="w-full px-2 md:w-3/4">
          <h2 className="text-4xl pb-5 font-semibold">
            {storeData?.store.name}{" "}
          </h2>
          <div className="flex flex-col">
            <div className="flex flex-row gap-2 items-center">
              <h3 className="font-medium text-gray-700">
                {storeData?.store.averageRating.toFixed(1)}
              </h3>
              <Rating
                name="read-only"
                precision={0.5}
                size="medium"
                value={storeData?.store.averageRating}
                readOnly
                style={{ color: "black" }}
              />
              <p className="text-gray-500 font-light">
                ({storeData?.store.totalReviews} betyg)
              </p>
            </div>
            <div className="flex flex-row items-center gap-1 font-light text-gray-600 pt-1">
              <HiOutlineLocationMarker />
              <p>{storeData?.store.address}</p>
            </div>
          </div>
        </div>
        <div className="hidden md:flex">
          <TheCollageImages collageImages={storeData?.store.collageImages} />
        </div>
        <TheAboutStore description={storeData?.store?.description} />
        <TheStoreStaff
          admin={admin}
          subUsers={subUsers}
          storeHandle={storeHandle}
        />
        <div className="hidden md:flex">
          <TheReviews storeData={storeData.store} />
        </div>
      </div>
      <div className="mx-2 md:mx-0 md:w-1/3 mt-10 xl:mt-0 h-full bg-gray-100 rounded-lg">
        <div className="h-56">
          <TheStoreDetailMap storeData={storeData.store} />
        </div>

        <div className="flex flex-col px-5 py-8">
          <h3 className="pb-4 border-b">Butiksinformation</h3>
          <div className="flex flex-row items-center gap-2 py-4 border-b">
            <HiOutlineLocationMarker size={15} className="text-gray-600" />
            <p className="text-sm text-gray-600 font-light">
              {storeData?.store.address}
            </p>
          </div>
          <div className="flex flex-row items-center gap-2 py-4 border-b">
            <Smartphone size={15} className="text-gray-600" />
            <p className="text-sm text-gray-600 font-light">
              {storeData?.store.phone_number}
            </p>
          </div>
          <TheOpeningHours openingHours={storeData?.store.opening_hours} />
          {!storeData?.store?.social_media ||
          Object.keys(storeData?.store?.social_media).length === 0 ? (
            ""
          ) : (
            <TheSocialMedias social_media={storeData?.store.social_media} />
          )}
        </div>
      </div>
      <div className="flex flex-col w-full md:hidden">
        <TheReviews storeData={storeData.store} />
      </div>
    </div>
  );
}
