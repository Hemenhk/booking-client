"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { getAllStores } from "@/axios/stores";
import { Store } from "@/types/types";
import { MapPin, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

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

  // Search logic for stores or services by name
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

  // Search logic for stores by city
  useEffect(() => {
    if (addressSearchTimeout) {
      clearTimeout(addressSearchTimeout);
    }

    const timeout = setTimeout(() => {
      if (address) {
        const filtered = storeData?.filter((store: Store) =>
          store.city?.toLowerCase().includes(address.toLowerCase())
        );
        setFilteredAddresses(filtered || []);
      } else {
        setFilteredAddresses([]);
      }
    }, 500);

    setAddressSearchTimeout(timeout);
  }, [address, storeData]);

  // New handleSearch function that redirects to /search
  const handleSearch = () => {
    const searchQuery = new URLSearchParams();
    if (storeOrService) searchQuery.append("storeOrService", storeOrService);
    if (address) searchQuery.append("address", address);

    router.push(`/search?${searchQuery.toString()}`);
  };

  // Function to handle link click inside the Popover
  const handleLinkStoreClick = (storeName: string) => {
    const searchQuery = new URLSearchParams();
    searchQuery.append("storeOrService", storeName);
    router.push(`/search?${searchQuery.toString()}`);
  };

  const handleLinkAddressClick = (storeName: string) => {
    const searchQuery = new URLSearchParams();
    searchQuery.append("city", storeName);
    router.push(`/search?${searchQuery.toString()}`);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Failed to load stores. Please try again later.</p>;
  }

  return (
    <div className="flex flex-row items-center w-2/4 justify-center bg-white h-20 px-5 rounded-full shadow-md">
      {/* Store/Service search input */}
      <div className="flex flex-row items-center text-gray-600 w-full">
        <Popover>
          <PopoverTrigger asChild>
            <div className="flex flex-row items-center w-full">
              <Search />
              <Input
                type="text"
                className="w-full border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                placeholder="Sök efter butik eller tjänst"
                value={storeOrService}
                onChange={(e) => setStoreOrService(e.target.value)}
              />
            </div>
          </PopoverTrigger>
          {/* Display suggestions based on filtered stores by name */}
          {filteredStores.length > 0 && (
            <PopoverContent className="w-96 relative top-3">
              <ul>
                {filteredStores.map((store) => (
                  <li
                    key={store._id}
                    onClick={() => handleLinkStoreClick(store.name)} // Redirect to /search with store name
                    className="flex flex-row gap-2 items-center px-4 py-2 cursor-pointer lowercase font-medium hover:bg-gray-100 hover:rounded-xl"
                  >
                    <Search className="text-gray-400" size={15} />
                    {store.name}
                  </li>
                ))}
              </ul>
            </PopoverContent>
          )}
        </Popover>
      </div>

      {/* Separator between store and city search */}
      <Separator orientation="vertical" className="h-3/4 mx-5" />

      {/* City search input */}
      <div className="flex flex-row items-center text-gray-600 w-full">
        <Popover>
          <PopoverTrigger asChild>
            <div className="flex flex-row items-center w-full">
              <MapPin />
              <Input
                type="text"
                className="w-full border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                placeholder="Sök efter plats (stad)"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </PopoverTrigger>
          {/* Display suggestions based on filtered stores by city */}
          {filteredAddresses.length > 0 && (
            <PopoverContent className="w-96 relative top-3">
              <ul>
                {filteredAddresses.map((store) => (
                  <li
                    key={store._id}
                    onClick={() => handleLinkAddressClick(store.city)} // Redirect to /search with city name
                    className="flex flex-row gap-2 items-center px-4 py-2 cursor-pointer lowercase font-medium hover:bg-gray-100 hover:rounded-xl"
                  >
                    <MapPin className="text-gray-400" size={15} />
                    {store.city}
                  </li>
                ))}
              </ul>
            </PopoverContent>
          )}
        </Popover>
      </div>

      {/* Search button */}
      <Button className="w-36 h-12 rounded-3xl" onClick={handleSearch}>
        Sök
      </Button>
    </div>
  );
}
