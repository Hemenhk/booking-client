"use client";

import TheStoreDetail from "@/components/single-store/TheStoreDetail";

export default function StoreDetailPage({
  params,
}: {
  params: { storeHandle: string };
}) {
  return (
    <>
      <TheStoreDetail storeHandle={params.storeHandle} />
    </>
  );
}
