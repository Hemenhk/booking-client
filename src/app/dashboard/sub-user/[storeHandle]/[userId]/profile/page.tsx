"use client";
import TheOpeningHoursForm from "@/components/forms/openingHoursForm/TheOpeningHoursForm";
import TheUpdatePasswordForm from "@/components/forms/updatePassword/TheUpdatePasswordForm";
import TheUpdatePhoneNumber from "@/components/forms/updatePhone/TheUpdatePhoneNumber";
import TheUpdateProfileForm from "@/components/forms/updateProfile/TheUpdateProfileForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useAdminQuery } from "@/hooks/useAdminQuery";
import { KeyRound, Pencil, Smartphone } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function ProfilePage() {
  const { storeHandle, userId } = useParams<{
    storeHandle: string;
    userId: string;
  }>();

  const { storeData, isLoading, isError } = useAdminQuery(storeHandle);

  if (isLoading) {
    return <div>Laddar data</div>;
  }

  return (
    <div className="flex flex-col gap-5">
      <Card className="overflow-hidden max-w-[600px]">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Telefonnummer</CardTitle>
          <Dialog>
            <DialogTrigger asChild>
              <span className="cursor-pointer p-2 rounded-lg transition duration-300 ease-out hover:bg-gray-100">
                <Pencil size={15} />
              </span>
            </DialogTrigger>
            <TheUpdatePhoneNumber />
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="flex flex-row items-center gap-2 p-3 border rounded-lg">
            <Smartphone size={18} />
            <p>{storeData?.phone_number}</p>
          </div>
        </CardContent>
      </Card>
      {/* Profile image card */}

      <Card className="overflow-hidden max-w-[600px]">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Profilbild</CardTitle>
          <Dialog>
            <DialogTrigger asChild>
              <span className="cursor-pointer p-2 rounded-lg transition duration-300 ease-out hover:bg-gray-100">
                <Pencil size={15} />
              </span>
            </DialogTrigger>
            <TheUpdateProfileForm userId={userId} />
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="p-3 border rounded-lg w-40 flex justify-center ">
            <div className="relative overflow-hidden size-32 rounded-lg">
              <Image
                src={storeData?.admin?.profileImage}
                alt="profile image"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Password Card */}
      <Card className="overflow-hidden max-w-[600px]">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Lösenord</CardTitle>
          <Dialog>
            <DialogTrigger asChild>
              <span className="cursor-pointer p-2 rounded-lg transition duration-300 ease-out hover:bg-gray-100">
                <Pencil size={15} />
              </span>
            </DialogTrigger>
            <TheUpdatePasswordForm userId={userId} />
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="flex flex-row items-center gap-2 p-3 border rounded-lg">
            <KeyRound size={18} />
            <p>**********</p>
          </div>
        </CardContent>
      </Card>

     
    </div>
  );
}
