"use client";

import { useQuery } from "@tanstack/react-query";
import { getAllStores } from "@/axios/stores";
import { Card } from "@/components/ui/card";
import { Rating } from "@mui/material";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { useRouter } from "next/navigation";
import Image from "next/image";
import TheStoreCards from "./TheStoreCards";
import { EyeIcon } from "lucide-react";

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

  const handleRedirect = (storeHandle: string) => {
    router.push(`/store/${storeHandle}`);
  };

  return (
    <ul className="flex flex-col space-y-5">
      <TheStoreCards data={storeData} />
    </ul>
  );
}
