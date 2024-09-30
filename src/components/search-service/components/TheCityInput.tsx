"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Store } from "@/types/types";

type Props = {
  storeData: Store[];
  address: string;
  setAddress: Dispatch<SetStateAction<string>>;
};

export default function TheCityInput({
  storeData,
  address,
  setAddress,
}: Props) {
  const router = useRouter();

  const [filteredAddresses, setFilteredAddresses] = useState<string[]>([]);
  const [addressSearchTimeout, setAddressSearchTimeout] =
    useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (addressSearchTimeout) {
      clearTimeout(addressSearchTimeout);
    }

    const timeout = setTimeout(() => {
      if (address) {
        const filtered = storeData
          ?.filter((store: Store) =>
            store.city?.toLowerCase().includes(address.toLowerCase())
          )
          // Use a Set to ensure unique city names
          .reduce((uniqueCities: Set<string>, store: Store) => {
            if (store.city && !uniqueCities.has(store.city.toLowerCase())) {
              uniqueCities.add(store.city.toLowerCase());
            }
            return uniqueCities;
          }, new Set<string>());

        // Convert Set back to an array and set the filtered addresses
        setFilteredAddresses(Array.from(filtered || []));
      } else {
        setFilteredAddresses([]);
      }
    }, 500);

    setAddressSearchTimeout(timeout);
  }, [address, storeData]);

  const handleLinkAddressClick = (cityName: string) => {
    const searchQuery = new URLSearchParams();
    searchQuery.append("city", cityName);
    router.push(`/search?${searchQuery.toString()}`);
  };
  return (
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
              {filteredAddresses.map((city, index) => (
                <li
                  key={index} // Use index as key because city names are now unique
                  onClick={() => handleLinkAddressClick(city)} // Redirect to /search with city name
                  className="flex flex-row gap-2 items-center px-4 capitalize py-2 cursor-pointer font-medium hover:bg-gray-100 hover:rounded-xl"
                >
                  <MapPin className="text-gray-400" size={15} />
                  {city}
                </li>
              ))}
            </ul>
          </PopoverContent>
        )}
      </Popover>
    </div>
  );
}
