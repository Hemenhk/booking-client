"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useAdminQuery } from "@/hooks/useAdminQuery";
import { Briefcase, MapPin, Pencil, TriangleAlert } from "lucide-react";
import { useParams } from "next/navigation";
import { US, SE, NO, DK, GB, DE, CA } from "country-flag-icons/react/3x2";
import TheUpdateAddressForm from "@/components/forms/updateAddress/TheUpdateAddressForm";
import TheUpdateImagesForm from "@/components/forms/updateImages/TheUpdateImagesForm";
import { useSession } from "next-auth/react";
import Image from "next/image";
import TheUpdateCategoriesForm from "@/components/forms/updateCategories/TheUpdateCategoriesForm";
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import TheUpdateMediaForm from "@/components/forms/updateMediaForm/TheUpdateMediaForm";
import { TheSkeletonCard } from "@/components/skeletons/TheSkeletonCard";

export default function TheStoreAddressPage() {
  const { data: session } = useSession();
  const { storeHandle } = useParams<{
    storeHandle: string;
  }>();

  // const hasCategories = session?.user?.store?.categories;

  const { storeData, isLoading, isError } = useAdminQuery(storeHandle);

  const hasCategories = storeData && storeData?.store?.categories?.length > 0;
  const hasPhonenumber = storeData && storeData?.store?.phone_number;

  console.log("stoer info", storeData?.store.categories);

  if (isLoading) {
    return (
      <div className="h-[80vh] w-full p-4 pt-10">
        {/* Render multiple skeleton cards as a placeholder while loading */}
        <div className="grid md:grid-cols-1 md:gap-12">
          {[...Array(4)].map((_, index) => (
            <TheSkeletonCard key={index} /> // Render 4 skeleton cards as a placeholder
          ))}
        </div>
      </div>
    );
  }

  if (!session?.user.store._id) {
    return <div>Inget användarID</div>;
  }
  const iconMapping = {
    instagram: <FaInstagram size={18} />,
    facebook: <FaFacebookF size={18} />,
    tiktok: <FaTiktok size={18} />,
    x: <FaXTwitter size={18} />,
    youtube: <FaYoutube size={18} />,
  };

  const getFlagComponent = (countryCode: string) => {
    switch (countryCode) {
      case "SE":
        return <SE className="size-6" />;
      case "US":
        return <US className="size-6" />;
      case "NO":
        return <NO className="size-6" />;
      case "DK":
        return <DK className="size-6" />;
      case "GB":
        return <GB className="size-6" />;
      case "DE":
        return <DE className="size-6" />;
      case "CA":
        return <CA className="size-6" />;
      default:
        return null; // Return null or a default icon if country is not in the list
    }
  };

  return (
    <div className="flex flex-col gap-5 mx-2 md:mx-0">
      {!hasCategories && (
        <Card className="overflow-hidden max-w-[600px] border-red-700">
          <CardContent className="flex flex-row items-center gap-3 py-2">
            <TriangleAlert size={18} className="text-red-700" />
            <p className="flex flex-row items-center gap-5 text-sm">
              Lägg till åtminstone en kategori för att synas i sökmotorn
            </p>
          </CardContent>
        </Card>
      )}
      {!hasPhonenumber && (
        <Card className="overflow-hidden max-w-[600px] border-red-700">
          <CardContent className="flex flex-row items-center gap-3 py-2">
            <TriangleAlert size={18} className="text-red-700" />
            <p className="flex flex-row items-center gap-5 text-sm">
              Lägg till ett telefonnummer för att synas i sökmotorn
            </p>
          </CardContent>
        </Card>
      )}

      <Card className="overflow-hidden max-w-[600px]">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Butiksadressen</CardTitle>
          <Dialog>
            <DialogTrigger asChild>
              <span className="cursor-pointer p-2 rounded-lg transition duration-300 ease-out hover:bg-gray-100">
                <Pencil size={15} />
              </span>
            </DialogTrigger>
            <TheUpdateAddressForm />
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="flex flex-row items-center gap-2 p-3 border rounded-lg">
            <MapPin size={18} />
            <p className="flex flex-row items-center gap-5">
              {storeData?.store?.city}{" "}
              <div className="size-1 rounded-full bg-gray-400" />{" "}
              {storeData?.store?.country
                ? getFlagComponent(storeData?.store?.country)
                : ""}
            </p>
          </div>
        </CardContent>
      </Card>
      <Card className="overflow-hidden max-w-[600px]">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Verksamhetskategorier</CardTitle>
          <Dialog>
            <DialogTrigger asChild>
              <span className="cursor-pointer p-2 rounded-lg transition duration-300 ease-out hover:bg-gray-100">
                <Pencil size={15} />
              </span>
            </DialogTrigger>
            <TheUpdateCategoriesForm />
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="flex flex-row items-center gap-2 p-3 border rounded-lg">
            <Briefcase size={18} />
            <p className="flex flex-row items-center gap-5 capitalize">
              {storeData?.store?.categories.map((category) => (
                <>
                  <p key={category}>{category}</p>
                  <div className="size-1 rounded-full bg-gray-400" />
                </>
              ))}{" "}
            </p>
          </div>
        </CardContent>
      </Card>
      <Card className="overflow-hidden max-w-[600px]">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">
            Butiksbilder:{" "}
            <span className="font-normal">
              {storeData?.store?.collageImages?.length} av 10
            </span>
          </CardTitle>
          <Dialog>
            <DialogTrigger asChild>
              <span className="cursor-pointer p-2 rounded-lg transition duration-300 ease-out hover:bg-gray-100">
                <Pencil size={15} />
              </span>
            </DialogTrigger>
            <TheUpdateImagesForm
              storeId={session?.user.store._id}
              existingImages={storeData?.store.collageImages}
            />
          </Dialog>
        </CardHeader>
        <CardContent>
          <ul className="grid grid-cols-3">
            {storeData?.store &&
              storeData?.store?.collageImages.map((image, idx) => (
                <div
                  key={idx}
                  className="relative overflow-hidden size-32 rounded-lg"
                >
                  <Image
                    src={image}
                    alt="butiksbilder"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              ))}
          </ul>
        </CardContent>
      </Card>
      <Card className="overflow-hidden max-w-[600px]">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Sociala medier</CardTitle>
          <Dialog>
            <DialogTrigger asChild>
              <span className="cursor-pointer p-2 rounded-lg transition duration-300 ease-out hover:bg-gray-100">
                <Pencil size={15} />
              </span>
            </DialogTrigger>
            <TheUpdateMediaForm storeHandle={storeData?.store?.handle} />
          </Dialog>
        </CardHeader>
        <CardContent className="space-y-3">
          {Object.entries(storeData?.store?.social_media).map(
            ([platform, link]) => (
              <div
                key={platform}
                className="flex flex-row items-center gap-2 p-3 border rounded-lg"
              >
                {iconMapping[platform]}
                {link !== "" ? (
                  <p className="flex flex-row w-full bg-neutral-100 p-1 rounded-md items-center gap-5 text-sm text-neutral-700">
                    {link}
                  </p>
                ) : (
                  ""
                )}
              </div>
            )
          )}
        </CardContent>
      </Card>
    </div>
  );
}
