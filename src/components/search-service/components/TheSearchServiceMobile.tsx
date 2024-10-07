"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { getAllStores } from "@/axios/stores";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import TheStoreInput from "./TheStoreInput";
import { DialogContent, DialogHeader } from "@/components/ui/dialog";
import TheCityInput from "./TheCityInput";

export default function TheSearchServiceMobile() {
  const router = useRouter();
  const [storeOrService, setStoreOrService] = useState("");
  const [address, setAddress] = useState("");

  const {
    data: storeData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["all-stores"],
    queryFn: getAllStores,
  });

  if (!storeData) {
    return <div>Det finns inga butiker tillgängliga</div>;
  }

  // New handleSearch function that redirects to /search
  const handleSearch = () => {
    const searchQuery = new URLSearchParams();
    if (storeOrService) searchQuery.append("storeOrService", storeOrService);
    if (address) searchQuery.append("city", address);

    router.push(`/search?${searchQuery.toString()}`);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Failed to load stores. Please try again later.</p>;
  }
  return (
    <DialogContent className="w-[95%] rounded-xl">
      <DialogHeader className="my-10 space-y-5">
        <div className="flex md:hidden flex-col px-5 gap-10 border border-slate-400 rounded-xl">
          <TheStoreInput
            setStoreOrService={setStoreOrService}
            storeData={storeData}
            storeOrService={storeOrService}
          />
        </div>

        <div className="flex md:hidden flex-col px-5 gap-10 border border-slate-400 rounded-xl">
          <TheCityInput
            storeData={storeData}
            address={address}
            setAddress={setAddress}
          />
        </div>

        <Button
          className="h-11 font-light tracking-wide text-base rounded-xl"
          onClick={handleSearch}
        >
          Sök
        </Button>
      </DialogHeader>
    </DialogContent>
  );
}
