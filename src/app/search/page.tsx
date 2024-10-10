
import TheSearch from "@/components/search-service/TheSearch";
import type { Metadata } from "next";
import { Suspense } from "react";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { city?: string; storeOrService?: string };
}): Promise<Metadata> {
  const city = searchParams.city ? decodeURIComponent(searchParams.city) : "";
  const service = searchParams.storeOrService
    ? decodeURIComponent(searchParams.storeOrService)
    : "";

  // Create a dynamic title and description based on search parameters
  const title = `Search Results for ${service || "Services"} in ${
    city || "Your Area"
  } | Bookely`;
  const description = `Find top-rated services${
    service ? ` like ${service}` : ""
  } in ${
    city || "your area"
  }. Bookely helps you discover the best businesses around you.`;

  return {
    title,
    description,
  };
}

export default function TheSearchPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TheSearch />
    </Suspense>
  );
}
