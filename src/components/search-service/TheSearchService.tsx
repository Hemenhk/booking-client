"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { getAllStores } from "@/axios/stores";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import TheCityInput from "./components/TheCityInput";
import TheStoreInput from "./components/TheStoreInput";
import { getAllCategories } from "@/axios/categories";

export default function TheSearchService() {
  const router = useRouter();
  const [storeOrService, setStoreOrService] = useState("");
  const [address, setAddress] = useState("");

  const { data: categoriesData } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });

  console.log("categories:", categoriesData);

  const {
    data: storeData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["all-stores"],
    queryFn: getAllStores,
  });

  if (!categoriesData) {
    return <div>Det finns inga kategorier tillgängliga</div>;
  }

  if (!storeData) {
    return <div>Det finns inga butiker tillgängliga</div>;
  }

  // New handleSearch function that redirects to /search
  const handleSearch = () => {
    const searchQuery = new URLSearchParams();
    if (storeOrService) searchQuery.append("storeOrService", storeOrService);
    if (address) searchQuery.append("city", address); // Change here to "city"

    router.push(`/search?${searchQuery.toString()}`);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Failed to load stores. Please try again later.</p>;
  }

  return (
    <div className="hidden md:flex flex-row items-center w-2/4 justify-center bg-white h-20 px-5 rounded-full shadow-md">
      {/* Store/Service search input */}
      <TheStoreInput
        setStoreOrService={setStoreOrService}
        storeData={storeData}
        storeOrService={storeOrService}
        categoriesData={categoriesData}
      />

      {/* Separator between store and city search */}
      <Separator orientation="vertical" className="h-3/4 mx-5" />

      {/* City search input */}
      <TheCityInput
        address={address}
        setAddress={setAddress}
        storeData={storeData}
      />

      {/* Search button */}
      <Button className="w-36 h-12 rounded-3xl" onClick={handleSearch}>
        Sök
      </Button>
    </div>
  );
}
