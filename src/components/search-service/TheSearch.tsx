"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getAllStores } from "@/axios/stores";
import { Store } from "@/types/types";
import { MoonLoader } from "react-spinners";

import TheTopRatedStores from "@/components/search-service/components/TheTopRatedStores";
import TheFilteredStores from "@/components/search-service/components/TheFilteredStores";

export default function TheSearch() {
  const searchParams = useSearchParams();
  const [filteredStores, setFilteredStores] = useState<Store[]>([]);

  const {
    data: storeData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["all-stores"],
    queryFn: getAllStores,
  });

  // Get the storeOrService or address query from the URL
  const storeOrServiceQuery = searchParams.get("storeOrService")?.toLowerCase();
  let addressQuery = searchParams.get("city")?.toLowerCase();

  console.log("storeOrServiceQuery");

  // If no city is selected, use the default country "SE"
  if (!addressQuery) {
    addressQuery = "SE";
  }

  useEffect(() => {
    if (storeData) {
      // Initial filtering based on access
      let filtered = storeData.filter(
        (store) =>
          store.hasAccess &&
          store.categories.length > 0
          // store.admin.services.length > 0 &&
          // store.phone_number &&
          // store.opening_hours.length > 0
      );

      // If no address is given, default to "SE"
      if (!addressQuery) {
        addressQuery = "SE";
      }

      // Address filtering
      if (addressQuery === "SE") {
        filtered = filtered.filter(
          (store) => store.country?.toLowerCase() === "se"
        );
      } else {
        filtered = filtered.filter((store) =>
          store.city?.toLowerCase().includes(addressQuery)
        );
      }

      // Combined filtering for store/service and categories
      if (storeOrServiceQuery) {
        filtered = filtered.filter((store) => {
          const nameMatch = store.name
            .toLowerCase()
            .includes(storeOrServiceQuery);
          const categoryMatch = store.categories
            .map((category) => category.toLowerCase())
            .includes(storeOrServiceQuery);
          return nameMatch || categoryMatch; // Use OR logic here
        });
      }

      setFilteredStores(filtered);
      console.log("Filtered Stores:", filtered);
    }
  }, [storeData, storeOrServiceQuery, addressQuery]);

  if (isLoading) {
    return (
      <div className="flex h-[80vh] w-full justify-center items-center">
        <MoonLoader size={30} />
      </div>
    );
  }

  if (isError) {
    return <p>Failed to load stores. Please try again later.</p>;
  }

  return (
    <main className="flex flex-col mx-auto md:px-16 xl:px-32 my-10">
      <TheTopRatedStores
        filteredStores={filteredStores}
        addressQuery={addressQuery === "SE" ? "Sverige" : addressQuery} // Display "Sverige" for SE
      />
      <TheFilteredStores filteredStores={filteredStores} />
    </main>
  );
}
