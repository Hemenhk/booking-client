"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useAdminQuery } from "@/hooks/useAdminQuery";
import { KeyRound, MapPin, Pencil, Smartphone } from "lucide-react";
import { useParams } from "next/navigation";
import { US, SE, NO, DK, GB, DE, CA } from "country-flag-icons/react/3x2";
import TheUpdateAddressForm from "@/components/forms/updateAddress/TheUpdateAddressForm";
import TheUpdateImagesForm from "@/components/forms/updateImages/TheUpdateImagesForm";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function TheStoreAddressPage() {
  const { data: session } = useSession();
  const { storeHandle } = useParams<{
    storeHandle: string;
  }>();

  const { storeData, isLoading, isError } = useAdminQuery(storeHandle);

  if (!storeData?.country) {
    return <div>Finns inte något land registrerat.</div>;
  }

  if (isLoading) {
    return <div>Laddar data</div>;
  }

  if (!session?.user.store._id) {
    return <div>Inget användarID</div>;
  }

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
    <div className="flex flex-col gap-5">
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
              {storeData?.city}{" "}
              <div className="size-1 rounded-full bg-gray-400" />{" "}
              {getFlagComponent(storeData?.country)}
            </p>
          </div>
        </CardContent>
      </Card>
      <Card className="overflow-hidden max-w-[600px]">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Butiksbilder</CardTitle>
          <Dialog>
            <DialogTrigger asChild>
              <span className="cursor-pointer p-2 rounded-lg transition duration-300 ease-out hover:bg-gray-100">
                <Pencil size={15} />
              </span>
            </DialogTrigger>
            <TheUpdateImagesForm storeId={session?.user.store._id} />
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="p-3 border rounded-lg w-40 flex justify-center ">
            <div className="relative overflow-hidden size-32 rounded-lg">
              <Image
                src={storeData?.collageImages[0]}
                alt="butiksbilder"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
