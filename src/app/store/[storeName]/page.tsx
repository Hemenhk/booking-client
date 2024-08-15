"use client";

import TheStoreDetail from "@/components/single-store/TheStoreDetail";

export default function StoreDetailPage({
  params,
}: {
  params: { storeName: string };
}) {
  return (
    <>
      <TheStoreDetail storeName={params.storeName} />
    </>
  );
}
