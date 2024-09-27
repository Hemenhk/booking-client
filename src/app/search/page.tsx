"use client"; // This must be placed at the very top of the file

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getAllStores } from "@/axios/stores";
import { Store } from "@/types/types";

import TheTopRatedStores from "@/components/search-service/components/TheTopRatedStores";
import TheFilteredStores from "@/components/search-service/components/TheFilteredStores";

export default function TheSearchPage() {
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
  const addressQuery = searchParams.get("city")?.toLowerCase();

  useEffect(() => {
    if (storeData && (storeOrServiceQuery || addressQuery)) {
      let filtered = storeData;

      if (storeOrServiceQuery) {
        filtered = filtered.filter((store: Store) =>
          store.name.toLowerCase().includes(storeOrServiceQuery)
        );
      }

      if (addressQuery) {
        filtered = filtered.filter((store: Store) =>
          store.city?.toLowerCase().includes(addressQuery)
        );
      }

      setFilteredStores(filtered);
    }
  }, [storeData, storeOrServiceQuery, addressQuery]);

  if (isLoading) {
    return <p>Loading stores...</p>;
  }

  if (isError) {
    return <p>Failed to load stores. Please try again later.</p>;
  }


  return (
    <main className="flex flex-col px-80 my-10">
      <TheTopRatedStores filteredStores={filteredStores} addressQuery={addressQuery} />
      <TheFilteredStores filteredStores={filteredStores} />
    </main>
  );
}
