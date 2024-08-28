"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { getAllStores } from "@/axios/stores";
import { Store } from "@/types/types";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function TheSearchService() {
  const router = useRouter();
  const [storeOrService, setStoreOrService] = useState("");
  const [address, setAddress] = useState("");
  const [filteredStores, setFilteredStores] = useState<Store[]>([]);
  const [filteredAddresses, setFilteredAddresses] = useState<Store[]>([]);
  const [storeSearchTimeout, setStoreSearchTimeout] =
    useState<NodeJS.Timeout | null>(null);
  const [addressSearchTimeout, setAddressSearchTimeout] =
    useState<NodeJS.Timeout | null>(null);

  const {
    data: storeData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["all-stores"],
    queryFn: getAllStores,
  });

  useEffect(() => {
    if (storeSearchTimeout) {
      clearTimeout(storeSearchTimeout);
    }

    const timeout = setTimeout(() => {
      if (storeOrService) {
        const filtered = storeData?.filter((store: Store) =>
          store.name.toLowerCase().includes(storeOrService.toLowerCase())
        );
        setFilteredStores(filtered || []);
      } else {
        setFilteredStores([]);
      }
    }, 500);

    setStoreSearchTimeout(timeout);
  }, [storeOrService, storeData]);

  useEffect(() => {
    if (addressSearchTimeout) {
      clearTimeout(addressSearchTimeout);
    }

    const timeout = setTimeout(() => {
      if (address) {
        const filtered = storeData?.filter((store: Store) =>
          store.address.toLowerCase().includes(address.toLowerCase())
        );
        setFilteredAddresses(filtered || []);
      } else {
        setFilteredAddresses([]);
      }
    }, 500);

    setAddressSearchTimeout(timeout);
  }, [address, storeData]);

  const handleSearch = (handle: string) => {
    router.push(`/store/${handle}`);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Failed to load stores. Please try again later.</p>;
  }
  return (
    <div className="flex flex-row items-center justify-center">
      <div>
        <Input
          type="text"
          className="h-14 rounded-r-none rounded-l-3xl w-64 focus-visible:ring-0 focus-visible:ring-offset-0"
          placeholder="Sök efter tjänst eller företag"
          value={storeOrService}
          onChange={(e) => setStoreOrService(e.target.value)}
        />
        {/* Display suggestions based on filtered stores */}
        {filteredStores.length > 0 && (
          <ul className="absolute mt-1 w-64 bg-white border border-gray-300 rounded-xl shadow-lg z-10">
            {filteredStores.map((store) => (
              <Link
                key={store._id}
                href={`/store/${store.handle}`}
                // onClick={() => handleSearch(store.handle)}
                className="flex flow-row gap-2 items-center px-4 py-2 cursor-pointer lowercase font-medium hover:bg-gray-100 hover:rounded-xl"
              >
                <Search className="text-gray-400" size={15} />
                {store.name}
              </Link>
            ))}
          </ul>
        )}
      </div>
      <div>
        <Input
          type="text"
          className="h-14 rounded-none w-64 focus-visible:ring-0 focus-visible:ring-offset-0"
          placeholder="Sök efter plats"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        {/* Display suggestions based on filtered addresses */}
        {filteredAddresses.length > 0 && (
          <ul className="absolute mt-1 w-64 bg-white border border-gray-300 rounded-xl shadow-lg z-10">
            {filteredAddresses.map((store) => (
              <Link
                key={store._id}
                // onClick={() => handleSearch(store.handle)}
                href={`/store/${store.handle}`}
                className="flex flow-row gap-2 items-center px-4 py-2 cursor-pointer lowercase font-medium hover:bg-gray-100 hover:rounded-xl"
              >
                <Search className="text-gray-400" size={15} />
                {store.address}
              </Link>
            ))}
          </ul>
        )}
      </div>
      <Button
        // onClick={() => handleSearch()}
        className="w-24 rounded-r-3xl rounded-l-none h-[54px]"
      >
        Sök
      </Button>
    </div>
  );
}
