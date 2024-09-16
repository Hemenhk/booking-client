"use client";

import { Rating } from "@mui/material";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import TheStoreDetailMap from "../maps/TheStoreDetailMap";
import { useAdminQuery } from "@/hooks/useAdminQuery";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Service } from "@/types/types";
import TheOpeningHours from "./components/TheOpeningHours";

export default function TheStoreDetail({
  storeHandle,
}: {
  storeHandle: string;
}) {
  const router = useRouter();

  const { storeData, admin, subUsers, isError, isLoading } =
    useAdminQuery(storeHandle);
  if (isError) {
    return <div>Ett fel uppstod!</div>;
  }

  if (isLoading) {
    return <div>Laddar data</div>;
  }

  const lastIndexOfAdminServices = admin && admin?.services?.length - 1;

  const handleRedirect = (
    storeHandle: string,
    userId: string,
    service?: Service
  ) => {
    if (service) localStorage.setItem("service", JSON.stringify(service));

    console.log(service?.createdBy);

    router.push(`/store/${storeHandle}/${userId}`);
  };

  console.log("single store", storeData);
  return (
    <div className="flex h-full p-10 px-48">
      <div className="flex flex-col w-2/3 h-screen">
        <div className="border-b w-3/4 pb-8">
          <h2 className="text-4xl pb-5 font-semibold">{storeData?.name} </h2>
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
            <Accordion type="single" collapsible className="w-3/4">
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  <li
                    key={admin?._id}
                    className="flex flex-row items-center justify-between py-6 w-3/4"
                  >
                    <div className="flex flex-row items-center gap-3">
                      <Avatar className="size-20">
                        <AvatarImage
                          className="object-cover"
                          src={admin?.profileImage}
                        />
                        <AvatarFallback className="text-3xl">
                          {admin?.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex flex-col text-left">
                        <h3 className="font-medium text-lg">{admin?.name}</h3>
                        <p className="text-sm text-gray-500">{admin?.email}</p>
                      </div>
                    </div>
                  </li>{" "}
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-8">
                    {admin?.services.map((service, index) => (
                      <li
                        key={service._id}
                        className={`flex flex-row w-full justify-between ${
                          index === lastIndexOfAdminServices
                            ? "border-none"
                            : "border-b"
                        } pb-6`}
                      >
                        <p className="text-[16px] tracking-wide capitalize">
                          {service.name}
                        </p>
                        <div className="flex flex-row items-center gap-4">
                          <div className="flex flex-col gap-0.5">
                            <p className="font-medium">{service.price}kr</p>
                            <p className="text-xs text-gray-600">
                              {service.duration}min
                            </p>
                          </div>
                          <Button
                            onClick={() =>
                              handleRedirect(storeHandle, admin._id, service)
                            }
                          >
                            Boka
                          </Button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
              {subUsers?.map((user) => {
                const lastIndexOfUserServices = user?.services?.length - 1; // Get the last index for each sub-user's services

                return (
                  <AccordionItem value={user._id} key={user._id}>
                    <AccordionTrigger>
                      <li className="flex flex-row items-center justify-between py-6 w-3/4">
                        <div className="flex flex-row items-center gap-3">
                          <Avatar className="size-20">
                            <AvatarImage
                              className="object-cover"
                              src={user.profileImage}
                            />
                            <AvatarFallback className="text-3xl">
                              {user.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>

                          <div className="flex flex-col text-left">
                            <h3 className="font-medium text-lg">{user.name}</h3>
                            <p className="text-sm text-gray-500">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </li>
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-8">
                        {user?.services.map((service, index) => (
                          <li
                            key={service._id}
                            className={`flex flex-row w-full justify-between ${
                              index === lastIndexOfUserServices
                                ? "border-none"
                                : "border-b"
                            } pb-6`}
                          >
                            <p className="text-[16px] tracking-wide capitalize">
                              {service.name}
                            </p>
                            <div className="flex flex-row items-center gap-4">
                              <div className="flex flex-col gap-0.5">
                                <p className="font-medium">{service.price}kr</p>
                                <p className="text-xs text-gray-600">
                                  {service.duration}min
                                </p>
                              </div>
                              <Button
                                onClick={() =>
                                  handleRedirect(storeHandle, user._id, service)
                                }
                              >
                                Boka
                              </Button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </ul>
        </div>
      </div>
      <div className="w-1/3 h-[800px] bg-zinc-100 rounded-lg">
          {/* <TheStoreDetailMap storeData={storeData} /> */}
          <div className="h-64 rounded-t-lg bg-gray-300"></div>
        <div className="flex flex-row items-center gap-2 p-4 border-b w-[90%] mx-auto">
          <HiOutlineLocationMarker size={25} className="text-gray-600" />
          <p className="text-sm text-gray-400">{storeData?.address}</p>
        </div>
        <TheOpeningHours openingHours={storeData?.opening_hours} />
      </div>
    </div>
  );
}
