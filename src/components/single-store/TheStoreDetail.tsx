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
import TheStoreDetailMap from "../maps/TheStoreDetailMap";
import Image from "next/image";

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

  console.log("single store", storeData);
  return (
    <div className="flex h-full mb-20 p-10 px-48">
      <div className="flex flex-col w-2/3 space-y-16">
        <div className="border-b w-3/4 pb-8">
          <h2 className="text-4xl pb-5 font-semibold">{storeData?.name} </h2>
          <div className="flex flex-col">
            <div className="flex flex-row gap-2 items-center">
              <h3 className="font-medium text-gray-700">
                {storeData?.averageRating.toFixed(1)}
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

        <TheAboutStore description={storeData?.description} />
        <TheStoreStaff
          admin={admin}
          subUsers={subUsers}
          storeHandle={storeHandle}
        />
        {/* The Review Section */}
        <TheReviews storeData={storeData} />
      </div>
      <div className="w-1/3 h-full bg-gray-100 rounded-lg">
        {/* <div className="h-56">
          <TheStoreDetailMap storeData={storeData} />
        </div> */}
        <div className="relative overflow-hidden h-80 w-full rounded-t-lg brightness-90">
          <Image
            src={storeData?.collageImages[0]}
            alt="store images"
            layout="fill"
            objectFit="cover"
          />
        </div>
        {/* <div className="h-64 rounded-t-lg"></div> */}
        <div className="flex flex-col px-5 py-8">
          <h3 className="pb-4 border-b">Butiksinformation</h3>
          <div className="flex flex-row items-center gap-2 py-4 border-b">
            <HiOutlineLocationMarker size={15} className="text-gray-600" />
            <p className="text-sm text-gray-600 font-light">
              {storeData?.address}
            </p>
          </div>
          <div className="flex flex-row items-center gap-2 py-4 border-b">
            <Smartphone size={15} className="text-gray-600" />
            <p className="text-sm text-gray-600 font-light">
              {storeData?.phone_number}
            </p>
          </div>
          <TheOpeningHours openingHours={storeData?.opening_hours} />
          <TheSocialMedias />{" "}
        </div>
        {/* <div className="h-56">
          <TheStoreDetailMap storeData={storeData} />
        </div> */}
      </div>
    </div>
  );
}
