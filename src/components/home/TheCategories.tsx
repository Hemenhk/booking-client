"use client";

import { useRouter } from "next/navigation";
import { categories as allCategories } from "@/lib/services"; // Assuming categories are coming from here
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

export default function TheCategories() {
  const router = useRouter();

  // Featured services/categories to display (first 4 categories)
  const featuredServices = allCategories.slice(0, 4);

  // Handle category selection and redirect to search page with the category as a query parameter
  const handleCategorySelect = (category: string) => {
    const searchQuery = new URLSearchParams();
    searchQuery.append("storeOrService", category);

    // Redirect to the search page with the selected category as a query param
    router.push(`/search?${searchQuery.toString()}`);
  };

  return (
    <div className="w-full px-8 m-auto">
      <ul className="flex flex-row items-center justify-center gap-5">
        {featuredServices.map((service) => (
          <button
            key={service.name}
            onClick={() => handleCategorySelect(service.name)}
            className="text-red hover:before:bg-redborder-red-500 rounded-md relative h-[50px] w-40 overflow-hidden border border-neutral-800 bg-transparent px-3 text-neutral-800 shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-neutral-800 before:transition-all before:duration-500 hover:text-white hover:shadow-neutral-500 hover:before:left-0 hover:before:w-full"
          >
            <span className="relative z-10 uppercase text-sm tracking-wider">
              {service.name}
            </span>
          </button>
        ))}
        <button className="text-red hover:before:bg-redborder-red-500 rounded-md relative h-[50px] w-40 overflow-hidden border border-neutral-800 bg-transparent px-3 text-neutral-800 shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-neutral-800 before:transition-all before:duration-500 hover:text-white hover:shadow-neutral-500 hover:before:left-0 hover:before:w-full">
          <span className="relative z-10 uppercase text-sm tracking-wider flex flex-row justify-center items-center gap-1">
            Fler <ArrowRight size={17}/>
          </span>
        </button>
      </ul>
    </div>
  );
}
