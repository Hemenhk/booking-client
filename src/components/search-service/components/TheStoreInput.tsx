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
import { Categories, Store } from "@/types/types";

type Props = {
  storeData: Store[];
  storeOrService: string;
  setStoreOrService: Dispatch<SetStateAction<string>>;
  categoriesData?: Categories[];
};

export default function TheStoreInput({
  setStoreOrService,
  storeData,
  storeOrService,
  categoriesData,
}: Props) {
  const router = useRouter();

  const [filteredStores, setFilteredStores] = useState<Store[]>([]);
  const [storeSearchTimeout, setStoreSearchTimeout] =
    useState<NodeJS.Timeout | null>(null);
  const [popoverOpen, setPopoverOpen] = useState(false);

  // Filter the store data
  useEffect(() => {
    if (storeSearchTimeout) {
      clearTimeout(storeSearchTimeout);
    }

    const timeout = setTimeout(() => {
      if (storeOrService) {
        const filtered = storeData?.filter((store: Store) => 
          store.name.toLowerCase().includes(storeOrService.toLowerCase()) || 
          store.categories.map(category => category.toLowerCase()).includes(storeOrService.toLowerCase())
        );
        setFilteredStores(filtered || []);
      } else {
        setFilteredStores([]);
      }
    }, 500);

    setStoreSearchTimeout(timeout);
  }, [storeOrService, storeData]);

  const handleCategorySelect = (category: string) => {
    console.log('Selected category:', category); // Debugging
    setStoreOrService(category); 
    setPopoverOpen(false); 
  };
  return (
    <div className="flex flex-row items-center text-gray-600 w-full">
      <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
        <PopoverTrigger asChild>
          <div
            className="flex flex-row items-center w-full cursor-pointer"
            onClick={() => setPopoverOpen(true)}
          >
            <Search />
            <Input
              type="text"
              className="w-full border-none font-medium focus-visible:ring-0 focus-visible:ring-offset-0"
              placeholder="Sök efter butik eller tjänst"
              value={storeOrService}
              onChange={(e) => setStoreOrService(e.target.value)}
            />
          </div>
        </PopoverTrigger>

        {/* Display first 5 entries from categoriesData */}
        {popoverOpen && categoriesData.length > 0 && (
          <PopoverContent className="w-96 relative top-3">
            <ul>
              {categoriesData.slice(0, 5).map((category, index) => (
                <li
                  key={index}
                  onClick={() => handleCategorySelect(category)} // Fill the input with selected category
                  className="flex flex-row gap-2 items-center px-4 py-2 cursor-pointer lowercase font-medium hover:bg-gray-100 hover:rounded-xl"
                >
                  <Search className="text-gray-400" size={15} />
                  {category}
                </li>
              ))}
            </ul>
          </PopoverContent>
        )}
      </Popover>
    </div>
  );
}
