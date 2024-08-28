"use client";

import { useQuery } from "@tanstack/react-query";
import { getAllStores } from "@/axios/stores";
import { useRouter } from "next/navigation";
import TheStoreCards from "./TheStoreCards";

export default function TheAllStores() {
  const router = useRouter();
  const {
    data: storeData,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["stores"],
    queryFn: getAllStores,
  });

  if (isError) {
    return <div>Ett fel uppstod!</div>;
  }

  if (isLoading) {
    return <div>Laddar data</div>;
  }

  const handleRedirect = (storeHandle: string) => {
    router.push(`/store/${storeHandle}`);
  };

  return (
    <ul className="flex flex-col space-y-5">
      <TheStoreCards data={storeData} />
    </ul>
  );
}
