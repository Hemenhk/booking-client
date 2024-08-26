"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { getAllStores } from "@/axios/stores";
import { Store } from "@/types/types";
import { Search } from "lucide-react";

export default function Home() {
  const [storeOrService, setStoreOrService] = useState("");
  const [address, setAddress] = useState("");
  const [filteredStores, setFilteredStores] = useState<Store[]>([]);
  const [filteredAddresses, setFilteredAddresses] = useState<Store[]>([]);

  const {
    data: storeData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["all-stores"],
    queryFn: getAllStores,
  });

  useEffect(() => {
    // Filter stores based on storeOrService input
    if (storeOrService) {
      const filtered = storeData?.filter((store: Store) =>
        store.name.toLowerCase().includes(storeOrService.toLowerCase())
      );
      setFilteredStores(filtered || []);
    } else {
      setFilteredStores([]);
    }
  }, [storeOrService, storeData]);

  useEffect(() => {
    // Filter stores based on address input
    if (address) {
      const filtered = storeData?.filter((store: Store) =>
        store.address.toLowerCase().includes(address.toLowerCase())
      );
      setFilteredAddresses(filtered || []);
    } else {
      setFilteredAddresses([]);
    }
  }, [address, storeData]);

  const handleSearch = () => {
    // Handle the search logic here, possibly navigate to another page with the selected store and address
    console.log("Store or Service:", storeOrService);
    console.log("Address:", address);
    // You can use router.push or any other method to handle the search
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Failed to load stores. Please try again later.</p>;
  }
  return (
    <main className="flex flex-row justify-center items-center pb-24 pt-14 bg-gradient-to-r from-blue-50 via-pink-100 to-blue-50">
      <div className="flex flex-row items-center justify-center">
        <div>
          <Input
            type="text"
            className="h-[41px] rounded-r-none rounded-l-3xl w-64 focus-visible:ring-0 focus-visible:ring-offset-0"
            placeholder="Sök efter tjänst eller företag"
            value={storeOrService}
            onChange={(e) => setStoreOrService(e.target.value)}
          />
          {/* Display suggestions based on filtered stores */}
          {filteredStores.length > 0 && (
            <ul className="absolute mt-1 w-64 bg-white border border-gray-300 rounded-xl shadow-lg z-10">
              {filteredStores.map((store) => (
                <li
                  key={store._id}
                  onClick={() => setStoreOrService(store.name)}
                  className="flex flow-row gap-2 items-center px-4 py-2 cursor-pointer lowercase font-medium hover:bg-gray-100 hover:rounded-xl"
                >
                  <Search className="text-gray-400" size={15} />
                  {store.name}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <Input
            type="text"
            className="h-[41px] rounded-none w-64 focus-visible:ring-0 focus-visible:ring-offset-0"
            placeholder="Sök efter plats"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          {/* Display suggestions based on filtered addresses */}
          {filteredAddresses.length > 0 && (
            <ul className="absolute mt-1 w-64 bg-white border border-gray-300 rounded-xl shadow-lg z-10">
            {filteredAddresses.map((store) => (
              <li
                key={store._id}
                onClick={() => setAddress(store.address)}
                className="flex flow-row gap-2 items-center px-4 py-2 cursor-pointer lowercase font-medium hover:bg-gray-100 hover:rounded-xl"
              >
                <Search className="text-gray-400" size={15} />
                {store.address}
              </li>
            ))}
          </ul>
          )}
        </div>
        <Button
          onClick={handleSearch}
          className="w-24 rounded-r-3xl rounded-l-none h-10"
        >
          Sök
        </Button>
      </div>
    </main>
  );
}
