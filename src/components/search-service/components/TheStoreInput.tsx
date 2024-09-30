"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Store } from "@/types/types";

type Props = {
  storeData: Store[];
  storeOrService: string;
  setStoreOrService: Dispatch<SetStateAction<string>>;
};

export default function TheStoreInput({
  setStoreOrService,
  storeData,
  storeOrService,
}: Props) {
  const router = useRouter();

  const [filteredStores, setFilteredStores] = useState<Store[]>([]);
  const [storeSearchTimeout, setStoreSearchTimeout] =
    useState<NodeJS.Timeout | null>(null);

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

  const handleLinkStoreClick = (storeName: string) => {
    const searchQuery = new URLSearchParams();
    searchQuery.append("storeOrService", storeName);
    router.push(`/search?${searchQuery.toString()}`);
  };
  return (
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
  );
}
