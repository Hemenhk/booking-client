import type { Metadata } from "next";
import TheStoreDetail from "@/components/single-store/TheStoreDetail";
import { getSingleStoreDetail } from "@/axios/stores";

export async function generateMetadata({
  params,
}: {
  params: { storeHandle: string };
}): Promise<Metadata> {
  const storeData = await getSingleStoreDetail(params.storeHandle);

  if (!storeData) {
    return {
      title: "Store Not Found | Bookely",
      description:
        "The store you are looking for does not exist on Bookely. Discover other great businesses around you.",
    };
  }

  const { name, city, description } = storeData.store;

  return {
    title: `${name} in ${city} | Bookely`,
    description: description
      ? description
      : `Discover the best services at ${name} in ${city}. Book appointments easily with Bookely.`,
  };
}

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
